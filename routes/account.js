const bcrypt = require('bcryptjs'); // Can't get the same result and verify the password
const { hash } = require('./helper')
const { v4: uuid } = require('uuid')

module.exports = function(pool) {
    var module = {};

    module.create = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
    
        var sql = 'SELECT Email FROM user WHERE Email = ?;';
        var values = [email];
    
        return pool.query(sql, values, function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'an error occurred'
                });
            }

            if (result.length > 0) {
                return res.status(200).json({
                    'success': false,
                    'message': 'email address is not available'
                });
            }

            var sql = 'INSERT INTO user (Email, Password) VALUES (?, ?);';
            var hashedPassword = hash(password) 
            var values = [email, hashedPassword];

            pool.query(sql, values, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'success': false,
                        'message': 'an error occurred'
                    });
                }

                return res.status(200).json({
                    'success': true,
                    'message': 'thank you, come again'
                });
            })
        });
    }

    // Login and create a session
    module.login = function(req, res) {
        const email = req.body.email

        const setSessionCookie = ({ sessionId, res }) => {
            res.cookie('sessionId', sessionId, {
                expire: Date.now() + 3600000, // 1 hour
                httpOnly: true
            })
        }

        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT Password, SessionId FROM user WHERE Email = ?;', 
                [email], 
                (error, result) => {
                    if (error) return reject(error)

                    resolve({ account: result[0] })
            })
        })
        // Verify password
        .then(({ account }) => {
            const hashedPassword = hash(req.body.password) 

            if (account && account.Password === hashedPassword) {
                return { sessionId: account.SessionId }
            } else {
                const error = new Error('Incorrect username/password')            

                throw error
            }
        })
        // Update session
        .then(({ sessionId }) => {
            let sessionString

            // If session is already existed 
            if (sessionId) {
                sessionString = `${email}|${sessionId}`

                setSessionCookie({ sessionString, res })
            } else {
                const id = uuid()
                sessionString = `${email}|${id}`

                return new Promise((resolve, reject) => {
                    pool.query(
                        'UPDATE user SET SessionId = ? WHERE Email = ?;',
                        [id, email],
                        (error, result) => {
                            if (error) return reject(error)

                            resolve()
                        }
                    )
                })
                .then(() => {
                    setSessionCookie({ sessionString, res })
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }

    return module;
}

return module;