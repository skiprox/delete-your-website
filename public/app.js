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
		this.addListeners();
	}
	addListeners() {
		this.deleteBtn.addEventListener('click', this.onDeleteBtnClick);
	}
	onDeleteBtnClick(e) {
		console.log('we click');
		e.preventDefault();
		socket.emit('delete', {
			password: this.deleteInput.value
		});
	}
}

new App();