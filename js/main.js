// main.js

import { initEffects } from './ui/effects.js';
import { loadView } from './ui/profile.view.js';

initEffects();

if (/perfil.html?/.test(document.location)) loadView();
