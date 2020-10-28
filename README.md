# Ethical-Eating
## Project Team
- Steve Peters-Luciani (peterst5@oregonstate.edu)
- Jack Edwards (edwajack@oregonstate.edu)
- Abigail Lam (lamab@oregonstate.edu)
- Kyeongnam Kim (kimkyeon@oregonstate.edu)
- Ryan Murphy (murphyr2@oregonstate.edu)


## MySQL Setup
First, follow [these instructions](https://oregonstate.teamdynamix.com/TDClient/1935/Portal/KB/ArticleDet?ID=76790) to connect to the OSU VPN service.

Next, get your username, password, and the database host name from [Canvas](https://canvas.oregonstate.edu/courses/1784230/pages/course-resources?module_item_id=20023110).  Enter the information from Canvas in the `db_config.js` file.

**DO NOT COMMIT YOUR CREDENTIALS TO GITHUB!**

Finally, run the `db_conn_test.js` script to make sure everything is working:
1. cd ./Ethical-Eating/node
2. npm install mysql
3. node scripts/db_conn_test.js

---

## Running the application
1. Create 2 terminal windows, 1 for Node and 1 for React
    - Leave the node terminal in the core directory
    - Change the directory to client 'cd client'
2. Make sure all node_modules are installed from the core (Node) and client (React) directories
    - In the Node terminal, run 'npm install'
    - In the React terminal, run 'npm install'
3. Start Node and React
    - If starting Node terminal for Development*, run 'npm run dev'
    - If starting Node terminal for Production, run 'npm start'
    - To start the React terminal, run 'npm start'

> *The Development run will watch for updates in Node and update htem in the browser in real time.

---

## Creating Page Routes - Express portion
You should only have to create a route in Express if you are importing data from the database to use in a page.
1. Check to see if a category for your route exists in the ./routes directory before creating a new one
2. Add the function call for the route into the ./routes/{category}.js and setting an export keyword that describes the functionality

        exports.index = function(req, res) {
            /* Routes all non-assigned routes to React home */
            res.sendFile(path.join(__dirname + '/client/build/index.html'));
        }

3. In server.js, if a new category was created, require the file path for the category file

        const site = require('./routes/site')

4. Create the API call (GET, POST, PUT) with the route and the function

        app.get('*', site.index)


---

## Creating Page Routes - React portion
If you're creating a page that doesn't require database access, you can just create it in React
1. Create a {pagename}.jsx file in ./client/src/App/pages and fill with the necessary code
2. Add the page export to the index.js file in the pages directory
3. Add the page to the ./pages import array on App.js
4. Add a new Route to the Switch in the Router, setting the path to be your desired URL path and the component to your page function
