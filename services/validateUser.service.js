"use strict";

const fs = require('fs');
var request = require('request');

let userList = null;

module.exports = {
	name: "validateUser",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		addUser: {
			params: {
				username: "string",
				password: "string"
			},
			handler(ctx) {

				let newUser = {
					"username": ctx.params.username,
					"password": ctx.params.password
				};

				userList.users.push(newUser);
				return `User add, ${ctx.params.newUser}`;
			}
		},


		checkPrice() {


			let promise1 = new Promise(function (resolve, reject) {



				request('https://acx.io:443//api/v2/tickers/btcaud.json', function (error, response, body) {


					if (error) {
						reject({ "msg": error })
					}


					console.log('body:', body); // Print the HTML for the Google homepage.
					resolve(JSON.parse(body));



				});


			}).then(values => {


				// adding commisnon

				return values;
			}).catch(e => {

				throw error("service not avaialble");
			});

		},

		// 


		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		validate: {
			params: {
				username: "string",
				password: "string"
			},
			handler(ctx) {

				// 1 Read my JSON (contains user info)

				// 2 Check against loaded users for the UN & PW


				let isValid = false;

				userList.users.forEach(user => {

					console.log(user)

					if (user.username == ctx.params.username && user.password == ctx.params.password) {
						isValid = true;
					}
				});

				if (isValid) {
					return { "isValid": true, "user": `${ctx.params.username}` };
				}else{
					return { "isValid": false, "user": null };
				}

				// 3 send the response



				// JSON

			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

		let rawdata = fs.readFileSync('users.json');
		userList = JSON.parse(rawdata);
		console.log(userList);

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};