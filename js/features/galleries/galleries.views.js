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
			"thumbnail overlay-wrapper",
	});

	if (locked)
		divThumbnail.classList.add("locked-gallery");

	const divOverlay = makeTag("div", {
		className: "overlay"
	});

	const imgCover = makeTag("img", {
		src: imgSrc
	});

	const iconBox = makeTag("div", {
		className: "icon-box"
	});

	const spanIconWrapper = makeTag("span", {
		className: "icon-wrapper"
	});

	spanIconWrapper.appendChild(
		makeTag("i", {
			className: "fas fa-lock"
		})
	);

	iconBox.appendChild(spanIconWrapper);

	const spanCaption = makeTag("span", {
		className: "img-captions",
		textContent: caption
	});

	divThumbnail.append(
		divOverlay,
		imgCover,
		...(locked ? [iconBox] : []),
		spanCaption
	);

	a.appendChild(divThumbnail);

	return a;
}

function buildImageCard(src, {
		imageId,
		filename = "",
		favoriteStatus = false,
		downloadButton = false,
		downloadedStatus = false
	}) {
	
	const divFrame = makeTag("div", {
		classes: [
			"thumbnail"
		]
	});

	const img = makeTag("img", {
		src
	});

	const iconBox = makeTag("div", {
		className: "icon-box"
	});

	const spanStarWrapper = makeTag("span", {
		className: "icon-wrapper btn-favorite",
		"data-image-id": imageId,
		"data-filename": filename
	});

	if (favoriteStatus)
		spanStarWrapper.classList.add("is-favorite");

	const spanDownloadWrapper = makeTag("span", {
		className: "icon-wrapper btn-download",
		"data-image-id": imageId,
		"data-filename": filename
	});

	if (downloadedStatus)
		spanDownloadWrapper.classList.add("is-downloaded");

	spanStarWrapper.appendChild(
		makeTag("i", {
			className: "fas fa-star"
		})
	);
	
	spanDownloadWrapper.appendChild(
		makeTag("i", {
			className: "fas fa-download"
		})
	);

	iconBox.append(
		spanStarWrapper,
		...(downloadButton ? [spanDownloadWrapper] : [])
	);

	divFrame.append(img, iconBox);

	return divFrame;
}

export {
	buildGalleryCard,
	buildImageCard
}