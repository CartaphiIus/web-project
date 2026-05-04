import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './site-shell.css'

function SiteHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('lol_current') || 'null')
    setCurrentUser(storedUser)

    if (storedUser?.email) {
      const storedProfile = JSON.parse(localStorage.getItem(`lol_profile_${storedUser.email}`) || '{}')
      setProfile(storedProfile)
    } else {
      setProfile({})
    }
  }, [])

  useEffect(() => {
    function handleOutsideClick(event) {
      const widget = document.getElementById('siteProfileWidget')
      if (widget && !widget.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const displayName = profile.username || currentUser?.username || 'Summoner'
  const avatar = profile.avatar || ''
  const rank = profile.rank ? `Rank: ${profile.rank}` : 'Rank not set'

  function handleLogout() {
    localStorage.removeItem('lol_current')
    window.location.reload()
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-kicker">LOL</span>
          <strong className="site-logo-title">CHAMPIONS</strong>
          <span className="site-logo-sub">HUB</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" end>HOME</NavLink>
          <NavLink to="/champions">CHAMPIONS</NavLink>
          <NavLink to="/lore">LORE</NavLink>
          <NavLink to="/updates">UPDATES</NavLink>
          <span className="site-nav-disabled">DRAFT BUILDER</span>
          <span className="site-nav-disabled">COUNTER ANALYZER</span>
          <span className="site-nav-disabled">QUIZ</span>
          <span className="site-nav-disabled">ABOUT US</span>
        </nav>

        <div className={`site-profile-widget ${dropdownOpen ? 'open' : ''}`} id="siteProfileWidget">
          {!currentUser ? (
            <button type="button" className="site-profile-trigger site-guest-button">
              <div className="site-avatar-small site-guest-avatar">
                <span>G</span>
              </div>
              <div className="site-guest-copy">
                <span className="site-profile-name-small site-guest-name">Guest</span>
                <span className="site-guest-cta">Auth page soon</span>
              </div>
            </button>
          ) : (
            <>
              <button
                type="button"
                className="site-profile-trigger site-logged-trigger"
                onClick={() => setDropdownOpen((isOpen) => !isOpen)}
              >
                <div className="site-avatar-small">
                  {avatar ? (
                    <img src={avatar} alt={displayName} className="site-inline-avatar" />
                  ) : (
                    <span className="site-fallback-avatar">U</span>
                  )}
                </div>
                <span className="site-profile-name-small">{displayName}</span>
                <span className="site-profile-caret">v</span>
              </button>

              <div className="site-profile-dropdown">
                <div className="site-dropdown-header">
                  <div className="site-avatar-large">
                    {avatar ? (
                      <img src={avatar} alt={displayName} className="site-inline-avatar" />
                    ) : (
                      <span className="site-fallback-avatar site-fallback-avatar-large">U</span>
                    )}
                  </div>
                  <div>
                    <div className="site-dropdown-name">{displayName}</div>
                    <div className="site-dropdown-rank">{rank}</div>
                  </div>
                </div>
                <button type="button" className="site-dropdown-item">Edit Profile</button>
                <button type="button" className="site-dropdown-item site-dropdown-item-danger" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
