import { NavLink } from 'react-router-dom'
import './Updates.css'

function Updates() {
  return (
    <div className="placeholder-page">
      <header className="placeholder-header">
        <div className="placeholder-header-inner">
          <div className="placeholder-logo">
            <span>LOL</span>
            <strong>CHAMPIONS HUB</strong>
          </div>
          <nav className="placeholder-nav">
            <NavLink to="/" end>HOME</NavLink>
            <NavLink to="/champions">CHAMPIONS</NavLink>
            <NavLink to="/updates">UPDATES</NavLink>
          </nav>
        </div>
      </header>

      <main className="placeholder-main">
        <section className="placeholder-card">
          <p className="placeholder-kicker">React Migration</p>
          <h1>Updates Page Is Ready For Transfer</h1>
          <p>
            Router is now working correctly. The next step is to move the updates
            cards and modal flow into React components.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Updates
