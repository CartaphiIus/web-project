import { initCarousel, initFilterButtons } from '@scripts/carousel-utils.js';
import {
    closeDropdownOnOutsideClick,
    initProfileWidget,
    logout,
    toggleDropdown
} from '@scripts/profile-widget.js';

window.toggleDropdown = toggleDropdown;
window.logout = logout;

document.addEventListener('click', closeDropdownOnOutsideClick);

initCarousel();
initFilterButtons();
initProfileWidget();
