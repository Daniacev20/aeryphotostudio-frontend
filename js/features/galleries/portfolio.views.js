// portfolio.views.js

import { makeTag } from '../../ui/dom.js';
import { PortfolioModal } from '../../conf/gallery.state.js';

function buildPortfolioGalleryCard(
	imgSrc,
	slug,
	caption = "",
	href = "#") {
	
	const a = makeTag("a", {
		href,
		"data-slug": slug
	});

	const divThumbnail = makeTag("div", {
		className:
			"thumbnail overlay-wrapper unlocked-gallery",
	});

	const divOverlay = makeTag("div", {
		className: "overlay"
	});

	const imgCover = makeTag("img", {
		src: imgSrc
	});

	const spanCaption = makeTag("span", {
		className: "img-captions",
		textContent: caption
	});

	divThumbnail.append(
		divOverlay,
		imgCover,
		spanCaption
	);

	a.appendChild(divThumbnail);

	return a;
}

function buildPortfolioImage(src, index) {
	const divFrame = makeTag("div", {
		classes: [
			"thumbnail",
			"overlay-wrapper",
			"gallery-image"
		],
		"data-index": index
	});

	const divOverlay = makeTag("div", {
		className: "overlay"
	});

	const img = makeTag("img", {
		src
	});

	divFrame.append(divOverlay, img);

	return divFrame;
}

function renderPortfolioGalleries(container, galleries) {
	if (galleries.length === 0) return; // wip
	
	container.innerHTML = "";

	const fragment = document.createDocumentFragment();

	for (let gallery of galleries) {
		if (!gallery.preview)
			continue;

		fragment.appendChild(
			buildPortfolioGalleryCard(
				gallery.preview,
				gallery.slug,
				gallery.title,
				`/portafolio.html?slug=${gallery.slug}`
			)
		);
	}

	container.appendChild(fragment);
}

function renderPortfolioGalleryImages(container,
	galleryAndImages, stateObject) {

	if (!galleryAndImages) return;

	container.innerHTML = "";
	
	// track gallery status for events
	stateObject.images = galleryAndImages.images;
	stateObject.title = galleryAndImages.title;

	const fragment = document.createDocumentFragment();
	let index = 0;

	for (const image of stateObject.images) {
		fragment.appendChild(
			buildPortfolioImage(image.src, index)
		);

		index++;
	}

	container.appendChild(fragment);
}

function renderModal(stateObject) {
	const image =
		stateObject.images[stateObject.currentImageIndex];

	PortfolioModal.image.src = image.src;
	PortfolioModal.image.alt = image.filename;
	PortfolioModal.count.textContent =
		`${stateObject.currentImageIndex + 1}/${stateObject.images.length}`;
	PortfolioModal.title.textContent = stateObject.title;
}

export {
	renderPortfolioGalleries,
	renderPortfolioGalleryImages,
	renderModal
}