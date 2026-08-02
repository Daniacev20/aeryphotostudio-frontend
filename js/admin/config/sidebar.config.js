// sidebar.config.js

import { ADMIN_VIEWS } from './views.config.js';
import { AdminSidebar } from '../layout/admin-sidebar.js';
import { GallerySidebar } from '../layout/gallery-sidebar.js';


// wip: Must support null to intentionally
// declare a view with no sidebar to show.
// In this case, new-gallery-view should
// not show any sidebar.
export const SIDEBAR_CONFIG = {
	[ADMIN_VIEWS.GALLERIES]: AdminSidebar,
	[ADMIN_VIEWS.GALLERY]: GallerySidebar,
	[ADMIN_VIEWS.GALLERY_DESIGN]: GallerySidebar,
	[ADMIN_VIEWS.GALLERY_CONFIG]: GallerySidebar,
	[ADMIN_VIEWS.ACTIVITY]: GallerySidebar,
	[ADMIN_VIEWS.APPOINTMENTS]: AdminSidebar
};