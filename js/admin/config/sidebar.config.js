// sidebar.config.js

import { ADMIN_VIEWS } from './views.config.js';
import { AdminSidebar } from '../layout/admin-sidebar.js';
import { GallerySidebar } from '../layout/gallery-sidebar.js';

export const SIDEBAR_CONFIG = {
	[ADMIN_VIEWS.GALLERIES]: AdminSidebar,
	[ADMIN_VIEWS.GALLERY_CONFIG]: GallerySidebar
};