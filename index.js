'use strict';

const nrc = require('node-run-cmd');
let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

class Index {
	constructor() {
		this.setupPorts();
		this.listenToPort();
		this.setupListener();
		this.onIO();
	}
	setupPorts() {
		app.set('port', (process.env.PORT || 5000));
		app.use(express.static(__dirname + '/'));
	}
	listenToPort() {
		http.listen(app.get('port'), () => {
			console.log("Node app is running at localhost:" + app.get('port'));
		});
	}
	setupListener() {
		app.get('/', (req, res) => {
			res.sendfile('public/index.html');
		});
	}
	onIO() {
		io.on('connection', socket => {
			console.log(`new connection: ${socket.id}`)
			socket.on('delete', data => {
				console.log(data.password);
				this.deleteEverything(data.password);
			});
		});
	}
	deleteEverything(password) {
		console.log('we should delete everything');
		// nrc.run(`echo ${password} | sudo rm -rf public/index.html`);
	}
}

new Index();