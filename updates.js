document.addEventListener('DOMContentLoaded', () => {
    // Yeni haber eklemek icin bu diziye ayni formatta obje eklemen yeterli.
    const newsData = [
        {
            id: 1,
            title: 'Special Costume for Faker!',
            category: 'New Costume',
            date: '14 April 2026',
            image: 'update-ahri.jpg',
            imagePosition: 'center 90%',
            teaser: 'Home sayfasındaki kostüm duyurusunu burada genişletilmiş haber halinde gösteriyoruz. Kart küçük görünür, açıldığında tüm detaylar ekrana gelir.',
            subtitle: 'The spotlight bundle arrives with themed VFX, event missions and a prestige showcase made for the home teaser.',
            featuredOnHome: true,
            content: [
                'Bu alan tam haber detayının geldiği yer. İstersen bunu doğrudan gerçek duyuru metniyle değiştirebilir, istediğin kadar paragraf ekleyebilirsin.',
                'Modal açıldığında oyuncu; kostüm seti, etkinlik takvimi, ödül yolu ve çıkış tarihi gibi tüm bilgilere tek ekranda ulaşır. Bu yapı özellikle ana sayfadaki kısa update kartlarını tam içeriğe bağlamak için hazırlandı.',
                'Görselleri değiştirmek için sadece ilgili haber objesindeki `image` alanını güncellemen yeterli. İçeriğin uzunluğunu arttırdıkça modal otomatik scroll olur.'
            ]
        },
        {
            id: 2,
            title: 'Breath Taking Zoe Prestige',
            category: 'New Costume',
            date: '12 April 2026',
            image: 'update-zoe.avif',
            teaser: 'Prestige çizgisine çıkan yeni Zoe görünümü için ayrı efektler, altın tonlu parçacıklar ve etkinlik görevleri öne çıkıyor.',
            subtitle: 'A radiant skin release focused on celestial particles, dreamy recall animation and event-token rewards.',
            featuredOnHome: true,
            content: [
                'Bu haberde prestij kostümünün teması, koleksiyon paketleri ve oyun içi animasyon detayları anlatılabilir.',
                'Kart görünümünde yalnızca ilk birkaç satır gösterilir. Kullanıcı kartın içine ya da "Open Story" butonuna bastığında tam haber metni açılır.',
                'İstersen bu bölüme liste yapısı da ekleyebilirsin: fiyat bilgisi, etkinlik tarihi, görev zinciri ya da içerdiği chroma sayısı gibi.'
            ]
        },
        {
            id: 3,
            title: 'Good News for Master Yi Players',
            category: 'Balance Update',
            date: '09 April 2026',
            image: 'update-master.jpg',
            teaser: 'Master Yi tarafında beklenen yaşam kalitesi güncellemeleri ve erken oyun rahatlatmaları için özet haber kartı hazır.',
            subtitle: 'A focused pass on responsiveness, jungle clear feel and a cleaner power curve for ranked play.',
            featuredOnHome: true,
            content: [
                'Bu haber örneğinde denge değişiklikleri, geliştirici yorumu ve oynanış hedefleri için uzun metin alanı kullanılıyor.',
                'İlk ekranda haberler galeri mantığında dizilirken detay görünümünde daha editoryal, daha dergi benzeri bir yapı sunuluyor.',
                'Ana sayfadaki update başlıklarının burada birebir karşılıklarının bulunması, iki sayfa arasında mantıksal bağlantıyı netleştirir.'
            ]
        },
        {
            id: 4,
            title: 'Patch 26.8 Notes',
            category: 'Patch Notes',
            date: '31 March 2026',
            image: 'morgana.jpg',
            teaser: 'Şampiyon ayarları, rune düzeltmeleri ve harita etkileşimleri için kapsamlı bir patch notu kartı.',
            subtitle: 'Champion tuning, jungle pacing and item follow-ups arrive in a larger gameplay patch.',
            featuredOnHome: false,
            content: [
                'Patch notları için bu düzen çok uygun: önce kısa özet, sonra oynanış hedefleri, en sonda madde madde değişiklikler.',
                'Örneğin burada aşağıdaki gibi alt başlıklar veya maddeler kullanabilirsin.'
            ],
            bullets: [
                'Üst koridor baskısını azaltan minion ve sustain ayarları',
                'Erken ejder savaşları için görüş ve hareket temposu iyileştirmeleri',
                'Bazı eşyalarda maliyet ve bekleme süresi düzenlemeleri'
            ]
        },
        {
            id: 5,
            title: 'Clash Returns to the Rift',
            category: 'Esports',
            date: '26 March 2026',
            image: 'Demacia_Hall_Of_Valor.jpg',
            teaser: 'Takım tabanlı turnuva deneyimi yeni ödüller, kupa ilerlemesi ve haftalık takvimle geri dönüyor.',
            subtitle: 'Competitive weekends get a refreshed reward loop and more visible tournament progression.',
            featuredOnHome: false,
            content: [
                'Turnuva haberleri için ödül tablosu, katılım adımları ve tarih çizelgesi bu modal yapısında rahatça gösterilebilir.',
                'İçeriği ne kadar büyütürsen büyüt, sayfanın ana görünümü bozulmadan kalır. Kullanıcı sadece istediği haberi büyütüp inceler.'
            ]
        },
        {
            id: 6,
            title: 'Arena Rotation Preview',
            category: 'Game Modes',
            date: '22 March 2026',
            image: 'spirit_blossom_festival.jpg',
            teaser: 'Arena moduna gelen yeni augment havuzu, harita varyasyonları ve round temposu değişiklikleri özetleniyor.',
            subtitle: 'New match pacing, sharper combat spikes and a fresh augment mix headline the next Arena rotation.',
            featuredOnHome: false,
            content: [
                'Geçici mod haberlerinde genelde hızlı okunabilir özetler daha iyi çalışır. Bu yüzden kart metni kısa tutuldu, detay metni ise açılır pencerede sunuldu.',
                'Senin ekleyeceğin her yeni haber aynı şablonu kullanacağı için sayfa görsel bütünlüğünü kaybetmez.',
                'Senin ekleyeceğin her yeni haber aynı şablonu kullanacağı için sayfa görsel bütünlüğünü kaybetmez.',
                'Senin ekleyeceğin her yeni haber aynı şablonu kullanacağı için sayfa görsel bütünlüğünü kaybetmez.',
                'Senin ekleyeceğin her yeni haber aynı şablonu kullanacağı için sayfa görsel bütünlüğünü kaybetmez.'
            ]
        },
        {
            id: 7,
            title: 'Champion Roadmap: Summer 2026',
            category: 'Dev Update',
            date: '18 March 2026',
            image: 'AurelionSol_0.jpg',
            teaser: 'Yeni şampiyon ipuçları, VGU planları ve geliştirici önceliklerinin toplandığı yol haritası duyurusu.',
            subtitle: 'A seasonal roadmap covering upcoming champions, reworks and long-term gameplay priorities.',
            featuredOnHome: false,
            content: [
                'Roadmap haberleri daha uzun olur; bu nedenle modal görünüm tam ekran hissi vererek okunabilirliği artırır.',
                'Başlık, alt başlık ve uzun paragraf yapısını ayrı tuttuğumuz için içerik yönetimi oldukça kolaylaşır.'
            ]
        },
        {
            id: 8,
            title: 'Ranked Queue Adjustments',
            category: 'Competitive',
            date: '11 March 2026',
            image: 'noxian-legion.png',
            teaser: 'Sıra süreleri, rol eşleştirme dengesi ve oyuncu deneyimi tarafındaki iyileştirmeler bu haberde toplanıyor.',
            subtitle: 'Queue health changes aim to reduce wait times while keeping match quality stable across ranks.',
            featuredOnHome: false,
            content: [
                'Rekabetçi sistem haberleri için geliştirici açıklaması, veriye dayalı notlar ve oyuncu etkisi gibi bölümler eklenebilir.',
                'Sen sadece `newsData` içine yeni obje ekleyerek 3-4 sayfalık içerik akışına çok rahat çıkabilirsin.'
            ]
        }
    ];

    const cardsPerPage = 6;
    let currentPage = 1;

    const newsGrid = document.getElementById('newsGrid');
    const homeLinks = document.getElementById('homeLinks');
    const newsSection = document.querySelector('.news-section');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const pageIndicator = document.getElementById('pageIndicator');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const heroNewsCount = document.getElementById('heroNewsCount');
    const heroPageCount = document.getElementById('heroPageCount');
    const newsModal = document.getElementById('newsModal');
    const closeModalButton = document.getElementById('closeModal');
    const modalMedia = document.getElementById('modalMedia');
    const modalCategory = document.getElementById('modalCategory');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalContent = document.getElementById('modalContent');

    const totalPages = Math.max(1, Math.ceil(newsData.length / cardsPerPage));

    function renderHomeLinks() {
        const featuredItems = newsData.filter(item => item.featuredOnHome).slice(0, 3);

        homeLinks.innerHTML = featuredItems.map(item => `
            <button class="home-link-card" type="button" data-news-id="${item.id}" style="--card-image: url('${item.image}')">
                <div class="home-link-meta">
                    <span>${item.category}</span>
                    <span>${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.teaser}</p>
                <span class="home-link-action">Open Full Story <span>-&gt;</span></span>
            </button>
        `).join('');

        homeLinks.querySelectorAll('[data-news-id]').forEach(button => {
            button.addEventListener('click', () => openModal(Number(button.dataset.newsId)));
        });
    }

    function renderNewsPage() {
        const startIndex = (currentPage - 1) * cardsPerPage;
        const visibleNews = newsData.slice(startIndex, startIndex + cardsPerPage);

        newsGrid.innerHTML = visibleNews.map(item => `
            <article class="news-card" data-news-id="${item.id}" tabindex="0" role="button" aria-label="${item.title} haberini ac">
                <div class="news-card-visual">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="news-card-badge">${item.category}</span>
                </div>
                <div class="news-card-body">
                    <div class="news-card-meta">
                        <span>${item.date}</span>
                        <span>#0${item.id}</span>
                    </div>
                    <h3 class="news-card-title">${item.title}</h3>
                    <p class="news-card-excerpt">${item.teaser}</p>
                    <div class="news-card-footer">
                        <span class="news-read-more">Preview only <span>-&gt;</span></span>
                        <span class="news-open-btn">Open Story</span>
                    </div>
                </div>
            </article>
        `).join('');

        newsGrid.querySelectorAll('[data-news-id]').forEach(card => {
            card.addEventListener('click', () => openModal(Number(card.dataset.newsId)));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(Number(card.dataset.newsId));
                }
            });
        });

        pageIndicator.textContent = `${currentPage} / ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    function renderPagination() {
        paginationNumbers.innerHTML = Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return `<button type="button" class="page-number ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
        }).join('');

        paginationNumbers.querySelectorAll('[data-page]').forEach(button => {
            button.addEventListener('click', () => {
                currentPage = Number(button.dataset.page);
                refreshPage();
            });
        });
    }

    function buildModalContent(item) {
        const paragraphs = item.content.map(paragraph => `<p>${paragraph}</p>`).join('');
        const bullets = item.bullets
            ? `<ul>${item.bullets.map(point => `<li>${point}</li>`).join('')}</ul>`
            : '';

        return `${paragraphs}${bullets}`;
    }

    function openModal(newsId) {
        const item = newsData.find(entry => entry.id === newsId);
        if (!item) {
            return;
        }

        modalMedia.style.backgroundImage = `url('${item.image}')`;
        modalCategory.textContent = item.category;
        modalDate.textContent = item.date;
        modalTitle.textContent = item.title;
        modalSubtitle.textContent = item.subtitle;
        modalContent.innerHTML = buildModalContent(item);

        newsModal.classList.add('is-open');
        newsModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        newsModal.classList.remove('is-open');
        newsModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    function refreshPage() {
        renderNewsPage();
        renderPagination();
        const sectionTop = newsSection.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: Math.max(0, sectionTop), behavior: 'smooth' });
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            refreshPage();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            refreshPage();
        }
    });

    closeModalButton.addEventListener('click', closeModal);
    newsModal.addEventListener('click', event => {
        if (event.target.hasAttribute('data-close-modal')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && newsModal.classList.contains('is-open')) {
            closeModal();
        }
    });

    heroNewsCount.textContent = newsData.length;
    heroPageCount.textContent = totalPages;

    renderHomeLinks();
    renderNewsPage();
    renderPagination();
});
