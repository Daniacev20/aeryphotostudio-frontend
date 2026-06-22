// galleries.views.js

import { makeTag } from '../../ui/dom.js';
import { Modal } from '../../conf/gallery.state.js';

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

function buildImageCard(src, index, {
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
		src,
		classes: ["gallery-image"],
		"data-index": index,
	});

	const iconBox = makeTag("div", {
		className: "icon-box"
	});

	const spanStarWrapper = makeTag("button", {
		className: "icon-wrapper btn-favorite",
		"data-image-id": imageId,
		"data-filename": filename
	});

	if (favoriteStatus)
		spanStarWrapper.classList.add("is-favorite");

	const spanDownloadWrapper = makeTag("button", {
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

async function renderClientsPreview(container, clients) {
	if (clients.length === 0) return; // wip

	container.innerHTML = "";

	const fragment = document.createDocumentFragment();

	for (let currentClient of clients) {
		if (!currentClient.preview)
			continue;

		fragment.appendChild(
			buildGalleryCard(
				currentClient.preview,
				currentClient.name,
				`/entrega.html?client=${currentClient._id}`,
				false
			)
		);
	}

	container.appendChild(fragment);
}


async function renderClientGalleries(container, galleries) {		
	if (galleries.length === 0) return; // wip
	
	container.innerHTML = "";

	const params = new URLSearchParams(location.search);
	const fragment = document.createDocumentFragment();

	for (let gallery of galleries) {
		if (!gallery.preview)
			continue;

		fragment.appendChild(
			buildGalleryCard(
				gallery.preview,
				gallery.title,
				`/entrega.html?slug=${gallery.slug}`
			)
		);
	}

	container.appendChild(fragment);
}

async function renderGalleryImages(container, galleryAndImages, stateObject) {
	if (!galleryAndImages) {
		console.log("Error abriendo galeria.");
		return; // wip
	}

	container.innerHTML = "";
	
	const params = new URLSearchParams(location.search);

	// track gallery status for events
	stateObject.images = galleryAndImages.images;
	stateObject.title = galleryAndImages.title;
	stateObject.downloadsEnabled = galleryAndImages.downloadsEnabled;

	const fragment = document.createDocumentFragment();
	let index = 0;

	for (const image of stateObject.images) {
		fragment.appendChild(
			buildImageCard(image.src, index, {
				imageId: image._id,
				filename: image.filename,
				favoriteStatus: image.favorite,
				downloadButton: galleryAndImages.downloadsEnabled,
				downloadedStatus: image.downloaded
			})
		);

		index++;
	}

	container.appendChild(fragment);
}

function renderModal(stateObject) {
	const image =
		stateObject.images[stateObject.currentImageIndex];

	Modal.image.src = image.src;
	Modal.image.alt = image.filename;

	Modal.btnFavorite.classList.toggle(
		"is-favorite",
		image.favorite
	);


	Modal.btnDownload.classList.toggle(
		"is-downloaded",
		image.downloaded
	);

	Modal.btnDownload.hidden = !stateObject.downloadsEnabled;

	Modal.btnFavorite.dataset.imageId = image._id;
	Modal.btnDownload.dataset.imageId = image._id;
	Modal.btnDownload.dataset.filename = image.filename;

	Modal.count.textContent =
		`${stateObject.currentImageIndex + 1}/${stateObject.images.length}`;

	Modal.title.textContent = stateObject.title;

}

export {
	buildGalleryCard,
	buildImageCard,
	renderClientsPreview,
	renderClientGalleries,
	renderGalleryImages,
	renderModal
}