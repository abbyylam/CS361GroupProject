const { hash } = require('./helper/hash')

const Session = require('./helper/session')

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
                    'message': 'An error occurred'
                });
            }

            if (result.length > 0) {
                return res.status(200).json({
                    'success': false,
                    'message': 'Email address is not available'
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
                        'message': 'An error occurred'
                    });
                }

                return res.status(200).json({
                    'success': true,
                    'message': 'Account created successfully'
                });
            })
        });
    }

    // Login and create a session
    module.login = function(req, res) {
        const email = req.body.email

        const setSessionCookie = ({ sessionString, res }) => {
            res.cookie('sessionId', sessionString, {
                expire: Date.now() + 3600000, // 1 hour
                httpOnly: false,
                encode: String
            })
        }

        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT Id, Password, SessionId FROM user WHERE Email = ?;', 
                [email], 
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return reject('An error occurred');
                    }

                    resolve({ account: result[0] })
            })
        })
        // Verify password
        .then(({ account }) => {
            const hashedPassword = hash(req.body.password) 

            if (account && account.Password === hashedPassword) {
                return { 
                    id: account.Id,
                    sessionId: account.SessionId
                }
            } else {
                const error = new Error('Incorrect email address or password')

                throw error
            }
        })
        // Update session
        .then(({ id, sessionId }) => {
            let sessionString

            // If session is already existed 
            if (sessionId) {
                sessionString = Session.generateSessionId({ email, sessionId }) 

                console.log(sessionString)

                setSessionCookie({ sessionString, res })
            } else {
                let session = new Session({ email })
                const newSessionId = session.getId()

                sessionString = Session.generateSessionId({ email, sessionId: newSessionId }) 

                return new Promise((resolve, reject) => {
                    pool.query(
                        'UPDATE user SET SessionId = ? WHERE Id = ?;',
                        [newSessionId, id],
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return reject('An error occurred');
                            }

                            resolve()
                        }
                    )
                })
                .then(() => {
                    setSessionCookie({ sessionString, res })
                })
            }
        })
        .then(() => {
            return res.status(200).json({
                'success': true,
                'message': 'Login successful!'
            });
        })
        .catch(err => {
            res.status(500).json({
                'success': false,
                'message': err
            })
        })
    }

    module.logout = function(req, res) {
        let email

        if (req.cookies.sessionId) {
            email = req.cookies.sessionId.split('|')[0]
        } 

        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE user SET SessionId = ? WHERE email = ?;',
                [null, email],
                (error, result) => {
                    if (error) {
                        const err = new Error('Logout failed') 
                        
                        throw err
                    }

                    resolve()
                }
            )
        })
        .then(() => {
            res.clearCookie('sessionId')

            return res.status(200).json({
                'success': true,
                'message': 'Logout successful!'
            })
        })
        .catch(err => {
            res.status(500).json({
                'success': false,
                'message': err.toString().slice(7)
            })
        })
    }

    return module;
}

return module;