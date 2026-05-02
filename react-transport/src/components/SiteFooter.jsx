import './site-shell.css'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-links">
          <a
            href="https://www.riotgames.com/tr/?utm_medium=card1%2Bsupport.riotgames.com&utm_source=riotbar"
            className="site-footer-link"
          >
            About
          </a>
          <a href="https://support.riotgames.com/hc/tr" className="site-footer-link">
            Support
          </a>
        </div>
        <div className="site-footer-bottom">Riot Games (c) 2024. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default SiteFooter
