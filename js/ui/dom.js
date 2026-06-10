// dom.js

function makeTag(tag, {
	className,
	text,
	id,
	src,
	href
} = {}) {
	const element = document.createElement(tag);

	if (className)
		element.className = className;

	if (text)
		element.textContent = text;

	if (id)
		element.id = id;

	if (src)
		element.src = src;

	if (href)
		element.id = href;

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