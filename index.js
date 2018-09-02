'use strict';

const fs = require('fs');
let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Taken from stack overflow: https://stackoverflow.com/a/32197381
const deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index){
			console.log(file);
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

class Index {
	constructor() {
		this.setupPorts();
		this.listenToPort();
		this.setupListener();
		this.onIO();
	}
	setupPorts() {
		app.set('port', (process.env.PORT || 5002));
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
				this.deleteEverything();
				socket.emit('delete');
			});
		});
	}
	deleteEverything() {
		let path = 'public';
		deleteFolderRecursive('public');
	}
}

new Index();