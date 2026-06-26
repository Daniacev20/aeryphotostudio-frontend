// galleries.events.js

import {
	getClientsList,
	getClientGalleries,
	getGalleryAndImagesBySlug,
	toggleFavorite,
	downloadImage,
	downloadGallery,
	validateGalleryPin,
	verifyGalleryAccess
} from "../../services/gallery.service.js";

import {
	renderClientsPreview,
	renderClientGalleries,
	renderGalleryImages,
	renderModal
} from './galleries.views.js';

import {
	galleryState,
	GalleryModal,
	PinModal
} from '../../conf/gallery.state.js';

const galleries = document.querySelector("#galleries");

function getCircularIndex(array, index) {
	return ((index % array.length) + array.length) % array.length;
}

function handleInfoBarDisplay(params) {
	// show the back, download button and title based on the stage
	const backTo = document.querySelector(".back-to");
	const galleryTitle = document.querySelector("#gallery-title");
	const downloadAll =
		document.querySelector("#download-full-gallery");

	backTo.hidden = params.size === 0;
	downloadAll.hidden = !params.has("slug");

	if (params.size === 0) {
		galleryTitle.textContent = "Personas";
	}
	else if (params.has("client")) {
		galleryTitle.textContent = "Galer\u00EDas";
	}
	else if (params.has("slug")) {
		galleryTitle.textContent = "Im\u00E1genes";
	}
}

async function getClients_loadEvents(event) {
	const params = new URLSearchParams(location.search);
	const client = params.get("client");
	const slug = params.get("slug");

	handleInfoBarDisplay(params);

	if (!client && !slug) {
		const clients = await getClientsList();
		renderClientsPreview(galleries, clients);
	}
	else if (client && !slug) {
		const clientGalleries =
			await getClientGalleries(params.get("client"));

		renderClientGalleries(galleries, clientGalleries);
	}
	else if (!client && slug) {
		try {
			const galleryAndImages =
				await getGalleryAndImagesBySlug(
					params.get("slug")
				);
			
			renderGalleryImages(
				galleries,
				galleryAndImages,
				galleryState
			);
		} catch (err) {
			console.log(err);
			return;
		}
	}
}

async function toggleFavorite_clickEvents(event) {
	const btnFavorite = event.target.closest(".btn-favorite");

	if (!btnFavorite || btnFavorite.disabled)
		return;

	const imageId = btnFavorite.dataset.imageId;
	btnFavorite.disabled = true;

	try {
		const image = await toggleFavorite(imageId);

		if (!image) return;

		btnFavorite.classList.toggle("is-favorite", image.favorite);
	}
	finally {
		btnFavorite.disabled = false;
	}
}

async function downloadImage_clickEvents(event) {
	const btnDownload = event.target.closest(".btn-download");

	if (!btnDownload) return;

	await downloadImage(
		btnDownload.dataset.imageId,
		btnDownload.dataset.filename
	);
}

async function downloadGallery_clickEvents(event) {
	const btnDownloadAll =
		event.target.closest("#download-full-gallery");

	if (!btnDownloadAll) return;

	const params = new URLSearchParams(location.search);
	const slug = params.get("slug");

	if (!slug) return; // wip

	btnDownloadAll.disabled = true;

	try {
		await downloadGallery(slug);
	} finally {
		btnDownloadAll.disabled = false;
	}
}

function openImage_clickEvents(event) {
	const params = new URLSearchParams(location.search);
	if (!params.get("client")) return;

	const img = event.target.closest(".gallery-image");
	if (!img) return;

	galleryState.currentImageIndex = Number(img.dataset.index);
	renderModal(galleryState);
	GalleryModal.dialog.showModal();
}

function closeImage_clickEvents(event) {
	const btnClose = event.target.closest(".btn-close-modal");

	if (!btnClose) return;

	GalleryModal.dialog.close();
}

function previousImage_clickEvents(event) {
	const btnPrev = event.target.closest("#prev-image");

	if (!btnPrev) return;

	galleryState.currentImageIndex--;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function nextImage_clickEvents(event) {
	const btnNext = event.target.closest("#next-image");

	if (!btnNext) return;

	galleryState.currentImageIndex++;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

async function protectedGallery_clickEvents(event) {
	const gallery = event.target.closest("[data-slug]");

	if (!gallery) return;

	if (gallery.dataset.isProtected !== "true") return;

	event.preventDefault();

	galleryState.slug = gallery.dataset.slug;

	// const result = await verifyGalleryAccess(slug);
	// if (result.hasAccess) {
	// 	location.href = `/entrega.html?slug=${slug}`;
	// }

	PinModal.dialog.showModal();
}

async function sendPin_clickEvents(event) {
	const btnSendPin = event.target.closest("#btn-send-pin");

	if (!btnSendPin) return;

	const PIN_REQUIRED_LENGTH = 4;
	const pin = PinModal.txtPin.value.trim();

	// validacion preliminar
	if (!pin) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = "Pin requerido.";
		return;
	}
	else if (pin.length < PIN_REQUIRED_LENGTH) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = "Pin muy corto.";
		return;
	}

	btnSendPin.disabled = true;

	try {
		await validateGalleryPin(pin, galleryState.slug);

		PinModal.lblError.textContent = "";
		PinModal.lblError.hidden = true;
		PinModal.dialog.close();

		location.href = `/entrega.html?slug=${galleryState.slug}`;
	} catch (err) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = err.message;
	} finally {
		btnSendPin.disabled = false;
	}
}

export {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	downloadGallery_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents,
	protectedGallery_clickEvents,
	sendPin_clickEvents
};