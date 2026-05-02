import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Updates.css'
import { cardsPerPage, newsData } from '../data/newsData.js'

function normalizeVideoUrl(rawUrl) {
  if (!rawUrl) return ''

  const trimmedUrl = rawUrl.trim()
  if (!trimmedUrl) return ''

  if (trimmedUrl.includes('youtube.com/embed/') || trimmedUrl.includes('player.vimeo.com/video/')) {
    return trimmedUrl
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    const host = parsedUrl.hostname.replace('www.', '')
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const videoId = parsedUrl.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
      if (pathParts[0] === 'shorts' && pathParts[1]) {
        return `https://www.youtube.com/embed/${pathParts[1]}`
      }
    }

    if (host === 'youtu.be' && pathParts[0]) {
      return `https://www.youtube.com/embed/${pathParts[0]}`
    }

    if (host === 'vimeo.com' && pathParts[0]) {
      return `https://player.vimeo.com/video/${pathParts[0]}`
    }
  } catch {
    return trimmedUrl
  }

  return trimmedUrl
}

function Updates() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeNewsId, setActiveNewsId] = useState(null)

  const totalPages = Math.max(1, Math.ceil(newsData.length / cardsPerPage))
  const featuredItems = useMemo(
    () => newsData.filter((item) => item.featuredOnHome).slice(0, 3),
    [],
  )

  const visibleNews = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage
    return newsData.slice(startIndex, startIndex + cardsPerPage)
  }, [currentPage])

  const activeItem = useMemo(
    () => newsData.find((item) => item.id === activeNewsId) || null,
    [activeNewsId],
  )

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveNewsId(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeItem ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeItem])

  function openModal(newsId) {
    setActiveNewsId(newsId)
  }

  function closeModal() {
    setActiveNewsId(null)
  }

  return (
    <div className="updates-page">
      <header className="updates-header">
        <div className="updates-header-inner">
          <div className="updates-logo">
            <span>LOL</span>
            <strong>CHAMPIONS HUB</strong>
          </div>

          <nav className="updates-nav">
            <NavLink to="/" end>HOME</NavLink>
            <NavLink to="/champions">CHAMPIONS</NavLink>
            <NavLink to="/updates">UPDATES</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <section className="updates-hero-react">
          <div className="updates-hero-content-react">
            <p className="hero-eyebrow-react">LIVE FROM RUNETERRA</p>
            <h1>UPDATES & PATCH NOTES</h1>
            <p className="hero-copy-react">
              Stay ahead of the game with a focused breakdown of balance changes,
              champion reworks and meta shifts. This is the first React transfer of
              the original updates page, including cards, pagination and modal flow.
            </p>
            <div className="hero-stats-react">
              <div className="hero-stat-react">
                <span className="hero-stat-value-react">{newsData.length}</span>
                <span className="hero-stat-label-react">Total News</span>
              </div>
              <div className="hero-stat-react">
                <span className="hero-stat-value-react">{totalPages}</span>
                <span className="hero-stat-label-react">Total Pages</span>
              </div>
            </div>
          </div>
        </section>

        <section className="updates-section-react">
          <div className="section-shell-react">
            <div className="section-heading-react">
              <p className="section-kicker-react">HOME CONNECTION</p>
              <h2>Spotlight headlines featured on the home page</h2>
            </div>

            <div className="home-links-react">
              {featuredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="home-link-card-react"
                  style={{ '--card-image': `url(${item.image})` }}
                  onClick={() => openModal(item.id)}
                >
                  <div className="home-link-meta-react">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.teaser}</p>
                  <span className="home-link-action-react">Open Full Story →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="updates-section-react news-section-react">
          <div className="section-shell-react">
            <div className="section-heading-react section-heading-wide-react">
              <div>
                <p className="section-kicker-react">NEWS GRID</p>
                <h2>Runeterra headlines</h2>
              </div>
              <div className="page-indicator-react">
                {currentPage} / {totalPages}
              </div>
            </div>

            <div className="news-grid-react">
              {visibleNews.map((item) => (
                <article
                  key={item.id}
                  className="news-card-react"
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openModal(item.id)
                    }
                  }}
                >
                  <div className="news-card-visual-react">
                    <img src={item.image} alt={item.title} />
                    <span className="news-card-badge-react">{item.category}</span>
                  </div>
                  <div className="news-card-body-react">
                    <div className="news-card-meta-react">
                      <span>{item.date}</span>
                      <span>#{String(item.id).padStart(2, '0')}</span>
                    </div>
                    <h3 className="news-card-title-react">{item.title}</h3>
                    <p className="news-card-excerpt-react">{item.teaser}</p>
                    <div className="news-card-footer-react">
                      <span className="news-read-more-react">Preview only →</span>
                      <span className="news-open-btn-react">Open Story</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pagination-bar-react">
              <button
                type="button"
                className="page-btn-react"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Prev
              </button>

              <div className="pagination-numbers-react">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`page-number-react ${page === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="page-btn-react"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

      {activeItem ? (
        <div className="news-modal-react" aria-hidden={activeItem ? 'false' : 'true'}>
          <div className="news-modal-backdrop-react" onClick={closeModal} />
          <article className="news-modal-card-react" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <button type="button" className="modal-close-react" onClick={closeModal} aria-label="Close article">
              ×
            </button>

            <div className="news-modal-shell-react">
              <div
                className="modal-media-react"
                style={{
                  backgroundImage: `url(${activeItem.image})`,
                  backgroundPosition: activeItem.imagePosition || 'center',
                }}
              />

              <div className="modal-scroll-area-react">
                <div className="modal-body-react">
                  <div className="modal-meta-react">
                    <span>{activeItem.category}</span>
                    <span className="meta-divider-react" />
                    <span>{activeItem.date}</span>
                  </div>

                  <h3 id="modalTitle">{activeItem.title}</h3>
                  <p className="modal-subtitle-react">{activeItem.subtitle}</p>

                  <div className="modal-content-react">
                    {activeItem.content?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {activeItem.video ? (
                      <section className="modal-section-react">
                        <h4 className="modal-section-heading-react">{activeItem.video.title || 'Showcase Video'}</h4>
                        <div className="modal-video-shell-react">
                          <iframe
                            className="modal-video-frame-react"
                            src={normalizeVideoUrl(activeItem.video.url)}
                            title={activeItem.video.title || activeItem.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
                        {activeItem.video.caption ? (
                          <p className="modal-video-caption-react">{activeItem.video.caption}</p>
                        ) : null}
                      </section>
                    ) : null}

                    {activeItem.bullets?.length ? (
                      <section className="modal-section-react">
                        <h4 className="modal-section-heading-react">Highlights</h4>
                        <ul className="modal-bullet-list-react">
                          {activeItem.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </section>
                    ) : null}

                    {activeItem.abilityChanges?.length ? (
                      <section className="modal-section-react">
                        <h4 className="modal-section-heading-react">Ability Changes</h4>
                        <div className="ability-change-stack-react">
                          {activeItem.abilityChanges.map((change) => (
                            <article className="ability-change-card-react" key={`${change.champion}-${change.skill}`}>
                              <img
                                className="ability-change-icon-react"
                                src={change.image}
                                alt={`${change.champion} ${change.skill}`}
                              />
                              <div className="ability-change-body-react">
                                <div className="ability-change-overline-react">{change.champion}</div>
                                <h5 className="ability-change-skill-react">{change.skill}</h5>
                                <ul className="ability-change-list-react">
                                  {change.changes.map((point) => (
                                    <li key={point}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  )
}

export default Updates
