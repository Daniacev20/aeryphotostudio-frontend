// main.js

import { initEffects } from './ui/effects.js';
import { loadView, showGuestOrUserOnMenu } from './ui/profile.view.js';

initEffects();
showGuestOrUserOnMenu();

if (/perfil.html?/.test(document.location)) loadView();