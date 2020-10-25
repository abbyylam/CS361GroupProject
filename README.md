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