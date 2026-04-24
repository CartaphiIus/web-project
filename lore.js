document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('regionNavList');
    const regionBtns = document.querySelectorAll('.region-btn');
    const regionContents = document.querySelectorAll('.region-content');
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    let currentIndex = 0;
    const visibleItems = 5;
    const totalItems = regionBtns.length;

    // 1. CAROUSEL KAYDIRMA FONKSİYONU
    function updateCarousel() {
        const offset = -(currentIndex * 20); // Her buton %20 genişlikte
        navList.style.transform = `translateX(${offset}%)`;
    }

    btnRight.addEventListener('click', () => {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });

    btnLeft.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // 2. BUTON TIKLAMA VE SAYFA SCROLL
    regionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.region;

            // Buton aktiflik durumunu güncelle
            regionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // İçerik aktiflik durumunu güncelle
            regionContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                    
                    // Yumuşak kaydırma düzeltmesi
                    // Header ve Nav yüksekliğini hesaba katarak kaydırır
                    const yOffset = -150; // Yukarıda bırakmak istediğin boşluk
                    const element = document.getElementById(targetId);
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });
    });
});