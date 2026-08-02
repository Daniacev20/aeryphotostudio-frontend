// view.js

import { ADMIN_VIEWS } from '../config/views.config.js';
import { GalleriesView } from './galleries.view.js';
import { NewGalleryView } from './new-gallery.view.js';
import { GalleryDesignView } from './gallery-design.view.js';
import { GalleryConfigView } from './gallery-config.view.js';
import { ActivityView } from './activity.view.js';
import { AppointmentsView } from './appointments.view.js';

const VIEWS = {
	[ADMIN_VIEWS.GALLERIES]: new GalleriesView(),
	[ADMIN_VIEWS.GALLERY]: new GalleriesView(),
	[ADMIN_VIEWS.NEW_GALLERY]: new NewGalleryView(),
	[ADMIN_VIEWS.GALLERY_DESIGN]: new GalleryDesignView(),
	[ADMIN_VIEWS.GALLERY_CONFIG]: new GalleryConfigView(),
	[ADMIN_VIEWS.ACTIVITY]: new ActivityView(),
	[ADMIN_VIEWS.APPOINTMENTS]: new AppointmentsView()
};

export const Views = {
	current: null,
	configure(view = ADMIN_VIEWS.GALLERIES) {
		Object.values(VIEWS).forEach(v => v.hide());

		this.current = VIEWS[view];
		this.current.show();
	}
};