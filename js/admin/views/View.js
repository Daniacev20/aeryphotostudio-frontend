// View.js

export class View {
	constructor(selector) {
		this.element =
			document.querySelector(selector);
	}

	show() {
		this.element.hidden = false;
	}

	hide() {
		this.element.hidden = true;
	}
}