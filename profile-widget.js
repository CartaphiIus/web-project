export function initProfileWidget() {
    const user = JSON.parse(localStorage.getItem('lol_current') || 'null');
    const ctaButton = document.getElementById('ctaBtn');
    const guestTrigger = document.getElementById('guestTrigger');
    const loggedTrigger = document.getElementById('loggedTrigger');

    if (!guestTrigger || !loggedTrigger) {
        return;
    }

    if (user) {
        guestTrigger.style.display = 'none';
        loggedTrigger.style.display = 'flex';
        if (ctaButton) ctaButton.style.display = 'none';

        const profile = JSON.parse(localStorage.getItem('lol_profile_' + user.email) || '{}');
        const name = profile.username || user.username || 'Summoner';
        const avatar = profile.avatar || '';
        const rank = profile.rank ? 'Rank: ' + profile.rank : 'Rank not set';

        const navImage = document.getElementById('navAvatar');
        if (avatar && navImage) {
            navImage.src = avatar;
        } else {
            const avatarWrap = document.getElementById('navAvatarWrap');
            if (avatarWrap) {
                avatarWrap.innerHTML = '<span style="font-size:18px;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">⚔</span>';
            }
        }

        const navUsername = document.getElementById('navUsername');
        const dropImage = document.getElementById('dropAvatar');
        const dropName = document.getElementById('dropName');
        const dropRank = document.getElementById('dropRank');

        if (navUsername) navUsername.textContent = name;
        if (dropImage && avatar) dropImage.src = avatar;
        if (dropName) dropName.textContent = name;
        if (dropRank) dropRank.textContent = rank;
    } else {
        guestTrigger.style.display = 'flex';
        loggedTrigger.style.display = 'none';
        if (ctaButton) ctaButton.style.display = 'inline';
    }
}

export function toggleDropdown() {
    const widget = document.getElementById('profileWidget');
    if (widget) {
        widget.classList.toggle('open');
    }
}

export function closeDropdownOnOutsideClick(event) {
    const widget = document.getElementById('profileWidget');
    if (widget && !widget.contains(event.target)) {
        widget.classList.remove('open');
    }
}

export function logout() {
    localStorage.removeItem('lol_current');
    location.reload();
}
