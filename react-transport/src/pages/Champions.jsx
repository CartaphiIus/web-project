import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Champions.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

import ahriImage from '../assets/images/ahri.avif'
import zedImage from '../assets/images/zed.avif'
import kindredImage from '../assets/images/kindred.webp'
import akaliImage from '../assets/images/akali.avif'
import auroraImage from '../assets/images/aurora.avif'
import ambessaImage from '../assets/images/Ambessa.png'
import briarImage from '../assets/images/briar.avif'
import yasuoImage from '../assets/images/yasuo.avif'
import akshanImage from '../assets/images/akshan.jpg'
import aatroxImage from '../assets/images/aatrox.avif'
import asheImage from '../assets/images/ASHE.avif'
import dariusImage from '../assets/images/darius.avif'
import mordekaiserImage from '../assets/images/Mordekaiser_0.jpg'
import malzaharImage from '../assets/images/Malzahar_0.jpg'
import kaisaImage from '../assets/images/Kaisa_0.jpg'
import lissandraImage from '../assets/images/Lissandra_0.jpg'

const champions = [
  { id: 'ahri', name: 'Ahri', title: 'the Nine-Tailed Fox', image: ahriImage },
  { id: 'zed', name: 'Zed', title: 'the Master of Shadows', image: zedImage },
  { id: 'kindred', name: 'Kindred', title: 'the Eternal Hunters', image: kindredImage },
  { id: 'akali', name: 'Akali', title: 'the Rogue Assassin', image: akaliImage },
  { id: 'aurora', name: 'Aurora', title: 'the Witch Between Worlds', image: auroraImage },
  { id: 'ambessa', name: 'Ambessa', title: 'Matriarch of War', image: ambessaImage },
  { id: 'briar', name: 'Briar', title: 'the Restrained Hunger', image: briarImage },
  { id: 'yasuo', name: 'Yasuo', title: 'the Unforgiven', image: yasuoImage },
  { id: 'akshan', name: 'Akshan', title: 'the Rogue Sentinel', image: akshanImage },
  { id: 'aatrox', name: 'Aatrox', title: 'the Darkin Blade', image: aatroxImage },
  { id: 'ashe', name: 'Ashe', title: 'the Frost Archer', image: asheImage },
  { id: 'darius', name: 'Darius', title: 'the Hand of Noxus', image: dariusImage },
  { id: 'mordekaiser', name: 'Mordekaiser', title: 'the Iron Revenant', image: mordekaiserImage },
  { id: 'malzahar', name: 'Malzahar', title: 'the Prophet of the Void', image: malzaharImage },
  { id: 'kaisa', name: "Kai'Sa", title: 'Daughter of the Void', image: kaisaImage },
  { id: 'lissandra', name: 'Lissandra', title: 'the Ice Witch', image: lissandraImage },
]

function Champions() {
  const location = useLocation()
  const championMap = useMemo(
    () => Object.fromEntries(champions.map((champion) => [champion.id, champion])),
    [],
  )

  useEffect(() => {
    const hashId = location.hash.replace('#', '')
    if (!hashId) return

    const target = document.getElementById(hashId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [location.hash])

  const selectedChampion = championMap[location.hash.replace('#', '')] || null

  return (
    <div className="champions-page">
      <SiteHeader />

      <main className="champions-main">
        <section className="champions-hero">
          <div>
            <p className="champions-kicker">React Migration</p>
            <h1>Champion Explorer</h1>
            <p className="champions-copy">
              This is the first real React version of the champions route. Search,
              API filters and the large detail panel will be the next layer.
            </p>
          </div>

          <div className="champions-status">
            <span className="status-badge live">Static React Version</span>
            <span className="status-badge next">API + Filters Next</span>
          </div>
        </section>

        {selectedChampion ? (
          <section className="champion-focus">
            <div className="champion-focus-copy">
              <p className="champions-kicker">Selected From Link</p>
              <h2>{selectedChampion.name}</h2>
              <p>{selectedChampion.title}</p>
            </div>
            <div className="champion-focus-image">
              <img src={selectedChampion.image} alt={selectedChampion.name} />
            </div>
          </section>
        ) : null}

        <section className="champion-grid-section">
          <div className="section-head">
            <h2>Popular Champions</h2>
            <p>Starting set migrated from the home page champion links.</p>
          </div>

          <div className="champion-grid-react">
            {champions.map((champion) => (
              <Link
                key={champion.id}
                id={champion.id}
                to={`/champions#${champion.id}`}
                className={`champion-orb-card ${selectedChampion?.id === champion.id ? 'is-selected' : ''}`}
              >
                <div className="champion-orb">
                  <img src={champion.image} alt={champion.name} />
                </div>
                <div className="champion-orb-name">{champion.name}</div>
                <div className="champion-orb-title">{champion.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Champions
