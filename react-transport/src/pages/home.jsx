import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

import carouselOne from '../assets/images/carousel1.avif'
import carouselTwo from '../assets/images/carousel-2.jpg'
import carouselThree from '../assets/images/carousel-3.jpg'

import luxFeatured from '../assets/images/lux-featured.jpg'
import yasuoFeatured from '../assets/images/yasuo-featured.jpg'
import jinxFeatured from '../assets/images/jinx-featured.jpg'
import aatroxFeatured from '../assets/images/aatrox-featured.jpg'

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

import updateAhri from '../assets/images/update-ahri.jpg'
import updateZoe from '../assets/images/update-zoe.avif'
import updateMaster from '../assets/images/update-master.jpg'

const carouselSlides = [carouselOne, carouselTwo, carouselThree]

const featuredChampions = [
  { name: 'LUX', role: 'Support/Mage', image: luxFeatured, href: '/champions#lux' },
  { name: 'YASUO', role: 'Slayer', image: yasuoFeatured, href: '/champions#yasuo' },
  { name: 'JINX', role: 'Marksman', image: jinxFeatured, href: '/champions#jinx' },
  { name: 'AATROX', role: 'Fighter', image: aatroxFeatured, href: '/champions#aatrox' },
]

const exploreChampions = [
  { name: 'Ahri', image: ahriImage, href: '/champions#ahri' },
  { name: 'Zed', image: zedImage, href: '/champions#zed' },
  { name: 'Kindred', image: kindredImage, href: '/champions#kindred' },
  { name: 'Akali', image: akaliImage, href: '/champions#akali' },
  { name: 'Aurora', image: auroraImage, href: '/champions#aurora' },
  { name: 'Ambessa', image: ambessaImage, href: '/champions#ambessa' },
  { name: 'Briar', image: briarImage, href: '/champions#briar' },
  { name: 'Yasuo', image: yasuoImage, href: '/champions#yasuo' },
  { name: 'Akshan', image: akshanImage, href: '/champions#akshan' },
  { name: 'Aatrox', image: aatroxImage, href: '/champions#aatrox' },
  { name: 'Ashe', image: asheImage, href: '/champions#ashe' },
  { name: 'Darius', image: dariusImage, href: '/champions#darius' },
  { name: 'Mordekaiser', image: mordekaiserImage, href: '/champions#mordekaiser' },
  { name: 'Malzahar', image: malzaharImage, href: '/champions#malzahar' },
  { name: "Kai'Sa", image: kaisaImage, href: '/champions#kaisa' },
  { name: 'Lissandra', image: lissandraImage, href: '/champions#lissandra', imageStyle: { objectPosition: '80%' } },
]

const updates = [
  { label: 'New Costume', title: 'Special Costume for Faker!', image: updateAhri, href: '/updates' },
  { label: 'New Costume', title: 'Breath taking Zoe prestige', image: updateZoe, href: '/updates' },
  { label: 'New Costume', title: 'Good news for Master Yi players', image: updateMaster, href: '/updates' },
]

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % carouselSlides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [])

  function goToPreviousSlide() {
    setCurrentSlide((previousSlide) => (previousSlide - 1 + carouselSlides.length) % carouselSlides.length)
  }

  function goToNextSlide() {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % carouselSlides.length)
  }

  return (
    <div className="home-page">
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-carousel">
            {carouselSlides.map((slide, index) => (
              <div
                key={slide}
                className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              />
            ))}

            <button type="button" className="carousel-arrow prev" onClick={goToPreviousSlide}>
              &lt;
            </button>
            <button type="button" className="carousel-arrow next" onClick={goToNextSlide}>
              &gt;
            </button>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">MASTER THE RIFT:</h1>
            <div className="hero-subtitle">EXPLORE THE ADVENTURE !</div>
            <button type="button" className="cta-link cta-button">
              JOIN THE STORY
            </button>
          </div>

          <div className="carousel-controls">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide}
                type="button"
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <div className="container">
          <div className="main-content">
            <section className="featured-section">
              <h2 className="section-title">FEATURED CHAMPIONS</h2>
              <div className="champions-grid">
                {featuredChampions.map((champion) => (
                  <div className="champion-card" key={champion.name}>
                    <Link to={champion.href}>
                      <img src={champion.image} alt={champion.name} className="champion-image" />
                      <div className="champion-info">
                        <div className="champion-name">{champion.name}</div>
                        <div className="champion-role">{champion.role}</div>
                        <div className="champion-link">View Details</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section className="explore-section">
              <div className="explore-header">
                <h2 className="section-title">EXPLORE CHAMPIONS</h2>
              </div>

              <div className="champions-list">
                {exploreChampions.map((champion) => (
                  <div className="champion-avatar-item" key={champion.name}>
                    <Link to={champion.href}>
                      <div className="champion-avatar">
                        <img src={champion.image} alt={champion.name} style={champion.imageStyle} />
                      </div>
                      <div className="champion-avatar-name">{champion.name}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="updates-section">
            <h3 className="updates-title">LATEST UPDATES & NEWS</h3>
            {updates.map((update) => (
              <div className="update-item" key={update.title}>
                <Link to={update.href} className="update-link">
                  <div className="update-icon" style={{ backgroundImage: `url(${update.image})` }} />
                  <div className="update-content">
                    <div className="update-label">{update.label}</div>
                    <div className="update-heading">{update.title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Home
