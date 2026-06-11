// dom.js

function makeTag(tag, properties = {}) {
	const element = document.createElement(tag);

	for (const [k, v] of Object.entries(properties)) {

		if (k === "classes")
			element.classList.add(...v);
		else if (k === "style")
			Object.assign(element.style, v);
		else if (k in element)
			element[k] = v;
		else
			element.setAttribute(k, v);
	}

	return element;
}

function removeChild(query) {
	const child = document.querySelector(query);
	
	if (!child) return false;
	
	Element.remove(child);
	
	return true;
}

export {
	makeTag,
	removeChild
};