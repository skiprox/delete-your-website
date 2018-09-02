'use strict';

var socket = io({
	autoConnect: false
});

class App {
	constructor() {
		console.log('hello world');
		socket.open();
		this.deleteBtn = document.getElementById('delete');
		this.deleteInput = document.getElementById('delete-input');
		this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		this.addListeners();
	}
	addListeners() {
		this.deleteBtn.addEventListener('click', this.onDeleteBtnClick);
		socket.on('delete', this.refreshPage);
	}
	onDeleteBtnClick(e) {
		console.log('we click');
		e.preventDefault();
		socket.emit('delete', {
			password: this.deleteInput.value
		});
	}
	refreshPage() {
		window.location.reload(false);
	}
}

new App();