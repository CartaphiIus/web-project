document.addEventListener('DOMContentLoaded', () => {
    // Yeni haber eklemek icin bu diziye ayni formatta obje eklemen yeterli.
    const newsData = [
        {
            id: 1,
            title: 'Special Costume for Faker!',
            category: 'New Costume',
            date: '14 April 2026',
            image: 'update-ahri.jpg',
            imagePosition: 'center 10%',
            teaser: 'Experience the legend with the latest skin dedicated to the Unkillable Demon King, complete with high-end splashes and event flavor.',
            subtitle: 'The spotlight bundle arrives with themed VFX, event missions and a prestige showcase made for the home teaser.',
            featuredOnHome: true,
            video: {
                title: 'Skin Showcase',
                url: 'https://www.youtube.com/watch?v=ZGZgrlVDhMM',
                caption: 'Hall Of Legends Ahri Showcase'
            },
            content: [
                'Celebrate the legacy of League\'s greatest player with an exclusive spotlight bundle.',
                'This special collection features a meticulously crafted skin that embodies the spirit of the T1 legend.',
                'The modal layout on this page is designed so each featured card can expand into a richer story without breaking the flow of the updates grid.'
            ]
        },
        {
            id: 2,
            title: 'Breath Taking Zoe Prestige',
            category: 'New Costume',
            date: '12 April 2026',
            image: 'update-zoe.avif',
            teaser: 'Sparkle with elegance in the new Zoe Prestige Edition, featuring exclusive golden particle effects and polished ability visuals.',
            subtitle: 'A radiant skin release focused on celestial particles, dreamy recall animation and event-token rewards.',
            featuredOnHome: true,
            video: {
                title: 'Prestige Showcase',
                url: 'https://www.youtube.com/watch?v=Ilcy9_5pZRY',
                caption: 'Zoe Prestige Showcase'
            },
            content: [
                'The Aspect of Twilight has never looked more radiant. The Prestige Edition Zoe skin introduces a new standard for particle density and visual clarity.ensuring you stand out in every teamfight.',
                'Golden VFX bring extra identity to every Paddle Star and Sleepy Trouble Bubble cast.',
                'Players can follow a dedicated prestige track to earn event tokens, mythic essence and limited-edition cosmetics.',
                'This release will rotate through the Mythic Shop for a limited time.'
            ]
        },
        {
            id: 3,
            title: 'Good News for Master Yi Players',
            category: 'Balance Update',
            date: '09 April 2026',
            image: 'update-master.jpg',
            teaser: 'The Wuju Master is getting a focused quality-of-life pass with early jungle help and smoother responsiveness.',
            subtitle: 'A focused pass on responsiveness, jungle clear feel and a cleaner power curve for ranked play.',
            featuredOnHome: true,
            content: [
                'This update is built to make Master Yi more rewarding for skilled players while smoothing out his jungle pathing.',
                'Base durability has been nudged upward so early invades are less punishing.',
                'Alpha Strike gets better early access for objective control and faster clear routing.',
                'Meditate is now more rewarding when timed precisely into burst windows.'
            ],
            abilityChanges : [
                {
                    champion : 'Master Yi',
                    skill : 'Alpha Strike (Q)',
                    image : 'Master_Yi_Alpha_Strike.png',
                    changes : [
                        
                        'Blinking updated for consistency when near walls (to avoid Master Yi reappearing on the other side of a jungle camp).'
                    ]
                },
                {
                    champion : 'Master Yi',
                    skill : 'Alpha Strike (Q)',
                    image : 'master_yi_passive.png',
                    changes : [
                        'On-hit modifier increased to 75% from 65%.'
                        
                    ]
                }
            ]
        },
        {
            id: 4,
            title: 'Patch 26.8 Notes',
            category: 'Patch Notes',
            date: '31 March 2026',
            image: 'patch_upd.jpg',
            teaser: 'A larger gameplay patch featuring champion tuning, jungle pacing updates and a cleaner in-modal breakdown for individual skills.',
            subtitle: 'Champion tuning, jungle pacing and item follow-ups arrive in a larger gameplay patch.',
            featuredOnHome: false,
            content: [
                'In this week’s patch we’ve got some changes to some of the more powerful picks right now like Morgana and Graves while we’re also helping out some struggling champions like Heimerdinger',
                'In other news, we’ve also got updates to ARAM, ARAM: Mayhem, and Arena, not to mention a bunch of cool and funky skins coming to the Rift this patch.'
            ],
            bullets: [
                'Lane sustain and early push power were slightly reduced for safer blind-pick top laners.',
                'Dragon setup windows now reward earlier warding and more committed river control.',
                'Several core items received small cost and cooldown adjustments to smooth mid-game spikes.'
            ],
            abilityChanges: [
                {
                    champion: 'Morgana',
                    skill: 'Dark Binding (Q)',
                    image: 'MorganaQ.png',
                    changes: [
                        'Base cooldown lowered in early ranks to make pick windows more reliable.',
                        'Missile width slightly increased for cleaner visual feedback on max range casts.'
                    ]
                },
                {
                    champion: 'Graves',
                    skill: 'End of the Line (Q)',
                    image: 'GravesQLineSpell.png',
                    changes: [
                        'Primary hit damage trimmed slightly to reduce early jungle burst.',
                        'Return explosion damage increased later in the game to preserve high-skill payoff.'
                    ]
                },
                {
                    champion: 'Heimerdinger',
                    skill: 'H-28G Evolution Turret (Q)',
                    image: 'HeimerdingerQ.png',
                    changes: [
                        'Turret beam charge cadence improved when landing grenade stuns.',
                        'Turret health growth adjusted so lane control stays strong without becoming oppressive.'
                    ]
                }
            ]
        },
        {
            id: 5,
            title: 'Titans Clash: Misa Esports Dominates the Rift!',
            category: 'Esports',
            date: '26 March 2026',
            image: 'Demacia_Hall_Of_Valor.jpg',
            teaser: 'The team-based tournament experience returns with refreshed rewards, clearer trophies and a cleaner weekend schedule.',
            subtitle: '⚔️ The Match Breakdown: Misas New Era',
            featuredOnHome: false,
            content: [
                'The battle for supremacy in the Championship League has reached a new fever pitch. Following the latest high-stakes showdown between Misa Esports and SuperMassive (SUP), the hierarchy of the Rift is being rewritten.',
                'In a highly anticipated BO3 series, Misa Esports showcased why they are currently the team to beat. Despite recent roster changes, the synergy between 113 and Köfte proved lethal.'
            ],
            video : {
                title : 'THE MIND FREEZING MATCH ! ',
                url : 'https://www.youtube.com/watch?v=WNO6RR9FrNU',
                caption : 'PCF 🆚 PHX — MISA 🆚 SU — GAMEON '
            }
        },
        {
            id: 6,
            title: '🌸 Step Into the Spirit Realm: Arena Rotation Preview',
            category: 'Game Modes',
            date: '22 March 2026',
            image: 'spirit_blossom_festival.jpg',
            teaser: 'Arena gets a new augment pool, updated map variants and a faster round cadence in the next rotation.',
            subtitle: '⚔️ What’s Changing?',
            featuredOnHome: false,
            content: [
                'The petals are falling, and the spirits are calling. A brand-new rotation is descending upon the Arena, bringing with it a mystical atmosphere and high-stakes combat.',
                'Whether you’re a seasoned gladiator or a newcomer to the rings, prepare for a revitalized experience that blends magic with absolute mayhem.'
            ],
            bullets : [
                'Accelerated Match Pacing: We’ve tuned the rounds to get you into the action faster. Less downtime, more duels.',
                'Sharper Combat Spikes: Expect more explosive power shifts. When you hit your item and level power spikes, you’ll feel like a true legend of the Spirit Blossom.',
                'Fresh Augment Mix: We’ve pruned the old pool and added a flurry of new Augments. Experiment with ethereal abilities that can turn a losing streak into a dominant victory.'
            ]
        },
        {
            id: 7,
            title: 'The Cosmos Aligns: Champion Roadmap - Summer 2026',
            category: 'Dev Update',
            date: '18 March 2026',
            image: 'AurelionSol_0.jpg',
            teaser: 'A seasonal roadmap covering new champion hints, VGU priorities and long-term developer goals.',
            subtitle: 'A seasonal roadmap covering upcoming champions, reworks and long-term gameplay priorities.',
            featuredOnHome: false,
            content: [
                'Two new champions are emerging from the stars and the depths of Runeterra, each bringing mechanics that will challenge your mastery:',
                'The cosmic dust is settling, and the constellations are shifting. The fate of the Rift is about to be reshaped by powers beyond mortal comprehension.',
                'Aurelion Sol (Cosmic Polish): While his core remains, we’re sharpening his "Star Forger" identity. Expect enhanced visual effects that truly capture the scale of a galaxy-crushing entity and minor tuning to his late-game scaling',
'Sivir (Tactical Refined): A mid-scope update focused on her "Battle Mistress" fantasy. We are shifting her power budget to reward high-octane kiting and perfectly timed Spell Shields, making her a premier choice for coordinated team compositions.'
            ],
            bullets : [
                'The Harbinger of Infinity: A high-skill ceiling cosmic mage capable of manipulating space-time. This champion introduces "Gravity Wells"—zones that alter projectile speed and enemy positioning, forcing teams to rethink their approach to 5v5 skirmishes.',
                'The Warden of the Eternal Grove: A primal Skirmisher designed for the jungle. Utilizing "Living Brush" mechanics, this champion can temporarily extend terrain, creating new ambush paths and reshaping the map in real-time.'

            ],
        },
        {
            id: 8,
            title: 'Conquer the Climb: Ranked Queue Adjustments',
            category: 'Competitive',
            date: '11 March 2026',
            image: 'noxian-legion.png',
            teaser: 'Queue time tuning, role-balance improvements and player-experience updates are bundled into this competitive systems note.',
            subtitle: 'Queue health changes aim to reduce wait times while keeping match quality stable across ranks.',
            featuredOnHome: false,
            content: [
                'The path to the top is paved with iron and blood. We’re rolling out a series of targeted updates to the Ranked Queue to ensure that your journey from Bronze to Challenger is defined by skill, fair play, and faster action. No more waiting in the shadows—its time to step into the light of victory.',
                'Our primary mission is to protect the integrity of the climb while respecting your time. This update focuses on two major pillars.We believe in transparency. In the expanded modal view, you can find the raw data and logic behind these shifts.'
            ],bullets:[
                'High-Elo Precision: Specific adjustments have been made to Master+ queues to reduce "autofill" frequency during peak hours.',
                'Loss Mitigation: We’ve refined the LP (League Points) mitigation system for games impacted by early leavers or AFKs. Your climb shouldnt suffer because of someone elses disconnect',
                'Player Impact Sections: Check out the "Impact Analysis" tab to see how these changes are expected to affect your specific rank and region.'


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
    const modalScrollArea = document.getElementById('modalScrollArea');
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

    function buildBulletSection(points, heading = 'Highlights') {
        if (!points || !points.length) {
            return '';
        }

        return `
            <section class="modal-section">
                <h4 class="modal-section-heading">${heading}</h4>
                <ul class="modal-bullet-list">
                    ${points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </section>
        `;
    }

    function buildAbilityChangesSection(changes) {
        if (!changes || !changes.length) {
            return '';
        }

        return `
            <section class="modal-section">
                <h4 class="modal-section-heading">Ability Changes</h4>
                <div class="ability-change-stack">
                    ${changes.map(change => `
                        <article class="ability-change-card">
                            <img class="ability-change-icon" src="${change.image}" alt="${change.champion} ${change.skill}">
                            <div class="ability-change-body">
                                <div class="ability-change-overline">${change.champion}</div>
                                <h5 class="ability-change-skill">${change.skill}</h5>
                                <ul class="ability-change-list">
                                    ${change.changes.map(point => `<li>${point}</li>`).join('')}
                                </ul>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    }

    function normalizeVideoUrl(rawUrl) {
        if (!rawUrl) {
            return '';
        }

        const trimmedUrl = rawUrl.trim();

        if (!trimmedUrl) {
            return '';
        }

        if (trimmedUrl.includes('youtube.com/embed/') || trimmedUrl.includes('player.vimeo.com/video/')) {
            return trimmedUrl;
        }

        try {
            const parsedUrl = new URL(trimmedUrl);
            const host = parsedUrl.hostname.replace('www.', '');
            const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

            if (host === 'youtube.com' || host === 'm.youtube.com') {
                const videoId = parsedUrl.searchParams.get('v');

                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}`;
                }

                if (pathParts[0] === 'shorts' && pathParts[1]) {
                    return `https://www.youtube.com/embed/${pathParts[1]}`;
                }
            }

            if (host === 'youtu.be' && pathParts[0]) {
                return `https://www.youtube.com/embed/${pathParts[0]}`;
            }

            if (host === 'vimeo.com' && pathParts[0]) {
                return `https://player.vimeo.com/video/${pathParts[0]}`;
            }
        } catch (error) {
            return trimmedUrl;
        }

        return trimmedUrl;
    }

    function isDirectVideoFile(url) {
        return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
    }

    function buildVideoSection(video) {
        if (!video || !video.url || !video.url.trim()) {
            return '';
        }

        const normalizedUrl = normalizeVideoUrl(video.url);
        const videoTitle = video.title || 'Showcase Video';
        const videoCaption = video.caption || '';
        const videoMarkup = isDirectVideoFile(normalizedUrl)
            ? `
                <video class="modal-video-player" controls preload="metadata" ${video.poster ? `poster="${video.poster}"` : ''}>
                    <source src="${normalizedUrl}">
                    Tarayicin video etiketini desteklemiyor.
                </video>
            `
            : `
                <iframe
                    class="modal-video-frame"
                    src="${normalizedUrl}"
                    title="${videoTitle}"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
            `;

        return `
            <section class="modal-section">
                <h4 class="modal-section-heading">${videoTitle}</h4>
                <div class="modal-video-shell">
                    ${videoMarkup}
                </div>
                ${videoCaption ? `<p class="modal-video-caption">${videoCaption}</p>` : ''}
            </section>
        `;
    }

    function buildModalContent(item) {
        const paragraphs = (item.content || []).map(paragraph => `<p>${paragraph}</p>`).join('');

        return [
            paragraphs,
            buildVideoSection(item.video),
            buildBulletSection(item.bullets),
            buildAbilityChangesSection(item.abilityChanges)
        ].join('');
    }

    function openModal(newsId) {
        const item = newsData.find(entry => entry.id === newsId);
        if (!item) {
            return;
        }

        modalMedia.style.backgroundImage = `url('${item.image}')`;
        modalMedia.style.backgroundPosition = item.imagePosition || 'center';
        modalCategory.textContent = item.category;
        modalDate.textContent = item.date;
        modalTitle.textContent = item.title;
        modalSubtitle.textContent = item.subtitle;
        modalContent.innerHTML = buildModalContent(item);
        modalScrollArea.scrollTop = 0;

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
