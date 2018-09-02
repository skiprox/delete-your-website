'use strict';

var socket = io({
	autoConnect: false
});

class App {
	constructor() {
		console.log('hello world');
		socket.open();
		this.deleteBtn = document.getElementById('delete');
		this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		this.addListeners();
	}
	addListeners() {
		this.deleteBtn.addEventListener('click', this.onDeleteBtnClick);
		socket.on('delete', this.refreshPage);
	}
	onDeleteBtnClick(e) {
		e.preventDefault();
		socket.emit('delete', {
			delete: true
		});
	}
	refreshPage() {
		window.location.reload(false);
	}
}

new App();