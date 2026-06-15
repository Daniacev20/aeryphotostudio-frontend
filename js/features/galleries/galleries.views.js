// galleries.views.js

import { makeTag } from '../../ui/dom.js';

function buildGalleryCard(
	imgSrc,
	caption,
	href = "#",
	locked = true) {
	
	const a = makeTag("a", { href });
	
	const divThumbnail = makeTag("div", {
		className:
			"thumbnail-item overlay-wrapper",
	});

	if (locked)
		divThumbnail.classList.add("locked-gallery");

	const divOverlay = makeTag("div", {
		className: "overlay"
	});

	const imgCover = makeTag("img", {
		src: imgSrc
	});

	const spanIconWrapper = makeTag("span", {
		className: "icon-wrapper"
	});

	spanIconWrapper.appendChild(
		makeTag("i", {
			className: "fas fa-lock"
		})
	);

	const spanCaption = makeTag("span", {
		className: "img-captions",
		textContent: caption
	});

	divThumbnail.append(
		divOverlay,
		imgCover,
		locked ? spanIconWrapper : "",
		spanCaption
	);

	a.appendChild(divThumbnail);

	return a;
}

function buildCardsRow() {
	const articleRow = makeTag("article", {
		className: "thumbnails"
	});

	return articleRow;
}

function buildImage(src) {
	const divFrame = makeTag("div", {
		classes: [
			"thumbnail-item"
		]
	});

	const img = makeTag("img", {
		src
	});

	divFrame.append(img);

	return divFrame;
}

export {
	buildGalleryCard,
	buildCardsRow,
	buildImage
}