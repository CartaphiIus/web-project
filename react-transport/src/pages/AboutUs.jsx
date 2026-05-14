import './AboutUs.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

import aboutBackground from '../assets/images/aboutus-background.jpg'
import kindredImage from '../assets/images/Kindred_0.jpg'
import sonaImage from '../assets/images/Sona_0.jpg'

const profiles = [
  {
    name: 'Abdulkadir Onder',
    role: 'Developer',
    image: kindredImage,
    bio: 'We brought our passion for the League of Legends universe into code. Together with Cem Ali Akgul, I worked on both the frontend and backend of this project. Blending our interests with software development has been an exciting and rewarding experience.',
    links: [
      { label: 'GitHub Profile', href: 'https://github.com/CartaphiIus' },
      { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/abdulkadir-%C3%B6nder-159964404/' },
      { label: 'Email: abdulkadirondr@gmail.com' },
      { label: 'Phone: (+90) 533 160 96 55' },
    ],
  },
  {
    name: 'Cem Ali Akgul',
    role: 'Developer',
    image: sonaImage,
    imagePosition: '80% center',
    bio: 'Our passion for League of Legends went beyond simply playing the game, so we turned that interest into a software project. Abdulkadir and I built both the frontend and backend together. Turning our ideas into something real through code has been a pleasure for us.',
    links: [
      { label: 'GitHub Profile', href: 'https://github.com/LocalinTheEngineer' },
      {
        label: 'LinkedIn Profile',
        href: 'https://www.linkedin.com/in/cem-ali-akg%C3%BCl-9a1581399?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      { label: 'Email: cemali0220@gmail.com' },
      { label: 'Phone: (+90) 543 928 76 86' },
    ],
  },
]

function AboutUs() {
  return (
    <div className="about-page-react" style={{ '--about-bg': `url(${aboutBackground})` }}>
      <SiteHeader />

      <main className="about-container-react">
        {profiles.map((profile, index) => (
          <section className={`about-profile-react ${index % 2 ? 'reverse' : ''}`} key={profile.name}>
            <div className="about-profile-info-react">
              <h1 className="about-profile-name-react">
                {profile.name}
                <span>{profile.role}</span>
              </h1>
              <p className="about-profile-bio-react">{profile.bio}</p>

              <div className="about-profile-links-react">
                {profile.links.map((link) => (
                  link.href ? (
                    <a href={link.href} target="_self" key={link.label}>{link.label}</a>
                  ) : (
                    <span key={link.label}>{link.label}</span>
                  )
                ))}
              </div>
            </div>

            <div className="about-profile-image-wrap-react">
              <div
                className="about-profile-circle-react"
                style={{
                  backgroundImage: `url(${profile.image})`,
                  backgroundPosition: profile.imagePosition || 'center',
                }}
              />
            </div>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}

export default AboutUs
