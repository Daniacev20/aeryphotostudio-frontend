// gallery.utils.js

export function getCircularIndex(array, index) {
	return ((index % array.length) + array.length) % array.length;
}