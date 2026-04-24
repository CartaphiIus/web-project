document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('regionNavList');
    const navContainer = document.querySelector('.region-nav-container');
    const regionBtns = Array.from(document.querySelectorAll('.region-btn'));
    const regionContents = Array.from(document.querySelectorAll('.region-content'));
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    if (!navList || !navContainer || !btnLeft || !btnRight || regionBtns.length === 0) {
        return;
    }

    let currentIndex = 0;

    function getMaxIndex() {
        const firstBtn = regionBtns[0];

        if (!firstBtn) {
            return 0;
        }

        const buttonWidth = firstBtn.getBoundingClientRect().width || 1;
        const visibleItems = Math.max(1, Math.floor(navContainer.clientWidth / buttonWidth));

        return Math.max(0, regionBtns.length - visibleItems);
    }

    function updateCarousel() {
        const targetButton = regionBtns[currentIndex];
        const offset = targetButton ? targetButton.offsetLeft : 0;

        navList.style.transform = `translateX(-${offset}px)`;
        btnLeft.disabled = currentIndex === 0;
        btnRight.disabled = currentIndex >= getMaxIndex();
    }

    btnRight.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        updateCarousel();
    });

    btnLeft.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    regionBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.region;

            regionBtns.forEach((button) => button.classList.remove('active'));
            btn.classList.add('active');

            regionContents.forEach((content) => {
                content.classList.toggle('active', content.id === targetId);
            });

            currentIndex = Math.min(index, getMaxIndex());
            updateCarousel();

            const element = document.getElementById(targetId);

            if (!element) {
                return;
            }

            const yOffset = -150;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    window.addEventListener('resize', () => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
    });

    updateCarousel();
});
