import { useMemo, useState } from 'react'
import './Lore.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

import runeterraMap from '../assets/images/Runeterra Map.png'
import demaciaHall from '../assets/images/Demacia_Hall_Of_Valor.jpg'
import garenImage from '../assets/images/Garen_0.jpg'
import luxImage from '../assets/images/Lux_0.jpg'
import shurimaImage from '../assets/images/500px-Shurima_Risen_From_The_Sands_02.jpg'
import azirImage from '../assets/images/Azir_0.jpg'
import nasusImage from '../assets/images/Nasus_0.jpg'
import piltoverImage from '../assets/images/hextech.jpg'
import jinxImage from '../assets/images/Jinx_0.jpg'
import viImage from '../assets/images/Vi_0.jpg'
import noxusImage from '../assets/images/Noxus_The_Immortal_Bastion_01.jpg'
import dariusImage from '../assets/images/Darius_0.jpg'
import swainImage from '../assets/images/Swain_0.jpg'
import ioniaImage from '../assets/images/spirit_blossom_festival.jpg'
import yasuoImage from '../assets/images/Yasuo_0.jpg'
import ireliaImage from '../assets/images/Irelia_0.jpg'
import freljordImage from '../assets/images/Freljord_Pilgrim_Site_Of_Rakelstake.jpg'
import asheImage from '../assets/images/ASHE.avif'
import lissandraImage from '../assets/images/Lissandra_0.jpg'
import bilgewaterImage from '../assets/images/Bilgewater_A_New_Beginning.jpg'
import gangplankImage from '../assets/images/Gangplank_0.jpg'
import illaoiImage from '../assets/images/Illaoi_0.jpg'
import shadowIslesImage from '../assets/images/black-mist.jpg'
import threshImage from '../assets/images/Thresh_0.jpg'
import viegoImage from '../assets/images/Viego_0.jpg'
import targonImage from '../assets/images/targon-mount.jpg'
import pantheonImage from '../assets/images/Pantheon_0.jpg'
import aurelionImage from '../assets/images/AurelionSol_0.jpg'
import voidImage from '../assets/images/the-void.jpg'
import kaisaImage from '../assets/images/Kaisa_0.jpg'
import kassadinImage from '../assets/images/Kassadin_0.jpg'
import zaunImage from '../assets/images/Zaun_Arcane_01.jpg'
import ekkoImage from '../assets/images/Ekko_0.jpg'
import warwickImage from '../assets/images/Warwick_0.jpg'
import ixtalImage from '../assets/images/ixtal-jungle.jpg'
import qiyanaImage from '../assets/images/Qiyana_0.jpg'
import nidaleeImage from '../assets/images/Nidalee_0.jpg'
import bandleImage from '../assets/images/bandle-city,.png'
import teemoImage from '../assets/images/Teemo_0.jpg'
import luluImage from '../assets/images/Lulu_0.jpg'

const regions = [
  {
    id: 'demacia',
    name: 'DEMACIA',
    code: 'DM',
    subtitle: 'Kingdom of Justice',
    tagline: 'Kingdom of Justice & Honor',
    quote: 'Demacia stands not because of magic, but in spite of it.',
    images: [
      { src: garenImage, label: 'Garen - The Might of Demacia', position: '80% center' },
      { src: demaciaHall, label: 'The Great City' },
      { src: luxImage, label: 'Lux - The Lady of Luminosity', position: '70% center' },
    ],
    body: [
      'Demacia is a powerful, lawful kingdom with a strict moral code and a long history of military excellence. Founded in the aftermath of the Rune Wars, its people learned to fear magic and value discipline above all.',
      'Behind the white stone walls and golden banners, hidden tension grows. Mages are forced to suppress their gifts while the kingdom tries to protect an ideal that is becoming harder to hold.',
    ],
    champions: ['Garen', 'Lux', 'Jarvan IV', 'Fiora', 'Poppy', 'Sylas'],
  },
  {
    id: 'shurima',
    name: 'SHURIMA',
    code: 'SH',
    subtitle: 'Empire of the Sun',
    tagline: 'Empire of the Eternal Sun',
    quote: 'Shurima! Your emperor has returned!',
    images: [
      { src: azirImage, label: 'Azir - Emperor of the Sands', position: '90% center' },
      { src: shurimaImage, label: 'The Great Pyramid' },
      { src: nasusImage, label: 'Nasus - The Curator', position: '70% center' },
    ],
    body: [
      'Shurima was once the greatest empire Runeterra had ever seen, crowned by the Sun Disc and defended by Ascended warriors. Its fall left the desert filled with ruins, tombs and buried power.',
      'Now Azir has returned, and with him the dream of a reborn empire. The sands still hide ancient betrayal, old monsters and treasures that can reshape the world.',
    ],
    champions: ['Azir', 'Nasus', 'Renekton', 'Xerath', 'Sivir', 'Taliyah'],
  },
  {
    id: 'piltover',
    name: 'PILTOVER',
    code: 'PT',
    subtitle: 'City of Progress',
    tagline: 'City of Progress & Innovation',
    quote: 'Progress is never free. Someone always pays the cost.',
    images: [
      { src: jinxImage, label: 'Jinx - Loose Cannon', position: '80% center' },
      { src: piltoverImage, label: 'Hextech Crystals' },
      { src: viImage, label: 'Vi - The Piltover Enforcer', position: '80% center' },
    ],
    body: [
      'Piltover is a shining city of industry, trade and invention. Hextech transformed it into a beacon of progress, where merchant clans and brilliant minds compete to define the future.',
      'Under its polished towers lies Zaun, the undercity that pays for much of Piltover’s prosperity. The divide between innovation and survival shapes every story from this region.',
    ],
    champions: ['Jinx', 'Vi', 'Jayce', 'Caitlyn', 'Ekko', 'Viktor'],
  },
  {
    id: 'noxus',
    name: 'NOXUS',
    code: 'NX',
    subtitle: 'Empire of Strength',
    tagline: 'Strength Above All',
    quote: 'In Noxus, anyone can rise if they have the will.',
    images: [
      { src: dariusImage, label: 'Darius - Hand of Noxus' },
      { src: noxusImage, label: 'The Immortal Bastion' },
      { src: swainImage, label: 'Swain - Grand General', position: '75% center' },
    ],
    body: [
      'Noxus is a brutal, expansionist empire that respects strength in every form. Birth matters less than ambition, talent and the courage to seize power.',
      'Its armies march across Runeterra, but Noxus is more than conquest. It is a promise that anyone can become more, if they can survive the price.',
    ],
    champions: ['Darius', 'Swain', 'Draven', 'Katarina', 'Riven', 'Samira'],
  },
  {
    id: 'ionia',
    name: 'IONIA',
    code: 'IO',
    subtitle: 'The First Lands',
    tagline: 'Balance, Spirit and Resistance',
    quote: 'The land remembers every wound.',
    images: [
      { src: yasuoImage, label: 'Yasuo - The Unforgiven' },
      { src: ioniaImage, label: 'Spirit Blossom Festival' },
      { src: ireliaImage, label: 'Irelia - The Blade Dancer' },
    ],
    body: [
      'Ionia is a land where the physical and spirit worlds breathe together. Its people have long followed balance, tradition and the quiet guidance of ancient magic.',
      'The Noxian invasion changed that forever. Some Ionians still seek peace, while others believe the First Lands must learn to fight back.',
    ],
    champions: ['Yasuo', 'Irelia', 'Akali', 'Shen', 'Yone', 'Syndra'],
  },
  {
    id: 'freljord',
    name: 'THE FRELJORD',
    code: 'FR',
    subtitle: 'Land of Ice',
    tagline: 'Ancient Ice and Tribal War',
    quote: 'The cold does not forgive weakness.',
    images: [
      { src: asheImage, label: 'Ashe - The Frost Archer' },
      { src: freljordImage, label: 'Pilgrim Site of Rakelstake' },
      { src: lissandraImage, label: 'Lissandra - The Ice Witch' },
    ],
    body: [
      'The Freljord is a harsh northern land of snow, spirits and ancient power. Tribes fight for survival while legends sleep beneath the ice.',
      'Ashe dreams of unity, Sejuani demands strength, and Lissandra guards secrets older than human memory. The future of the north is still unwritten.',
    ],
    champions: ['Ashe', 'Lissandra', 'Sejuani', 'Braum', 'Olaf', 'Tryndamere'],
  },
  {
    id: 'bilgewater',
    name: 'BILGEWATER',
    code: 'BW',
    subtitle: 'City of Iron & Glass',
    tagline: 'Salt, Blood and Fortune',
    quote: 'Fortune favors the bold, and Bilgewater buries the rest.',
    images: [
      { src: gangplankImage, label: 'Gangplank - The Saltwater Scourge' },
      { src: bilgewaterImage, label: 'Bilgewater Harbor' },
      { src: illaoiImage, label: 'Illaoi - Kraken Priestess' },
    ],
    body: [
      'Bilgewater is a port city of pirates, hunters and desperate bargains. Its docks welcome anyone with coin, nerve or nowhere else to go.',
      'Sea monsters, crime lords and old gods shape daily life here. In Bilgewater, every fortune is temporary and every debt comes due.',
    ],
    champions: ['Miss Fortune', 'Gangplank', 'Illaoi', 'Pyke', 'Graves', 'Twisted Fate'],
  },
  {
    id: 'shadow-isles',
    name: 'SHADOW ISLES',
    code: 'SI',
    subtitle: 'Land of the Dead',
    tagline: 'Where the Black Mist Hungers',
    quote: 'Death is not the end here. It is the beginning of torment.',
    images: [
      { src: threshImage, label: 'Thresh - The Chain Warden' },
      { src: shadowIslesImage, label: 'The Black Mist' },
      { src: viegoImage, label: 'Viego - The Ruined King' },
    ],
    body: [
      'The Shadow Isles were once blessed lands, but the Ruination turned them into a realm of mist, ghosts and endless suffering.',
      'The Black Mist reaches beyond the islands, carrying the will of the dead into the living world. Few who enter return unchanged.',
    ],
    champions: ['Thresh', 'Viego', 'Hecarim', 'Kalista', 'Gwen', 'Karthus'],
  },
  {
    id: 'targon',
    name: 'TARGON',
    code: 'TG',
    subtitle: 'Peak of Celestials',
    tagline: 'Mortals Beneath the Stars',
    quote: 'The mountain does not grant power. It reveals what survives the climb.',
    images: [
      { src: pantheonImage, label: 'Pantheon - The Unbreakable Spear' },
      { src: targonImage, label: 'Mount Targon' },
      { src: aurelionImage, label: 'Aurelion Sol - Star Forger' },
    ],
    body: [
      'Mount Targon pierces the heavens, drawing pilgrims, warriors and dreamers to a climb few survive. At its peak, mortal lives touch cosmic forces.',
      'Celestial Aspects shape the fate of Runeterra from this region, but their gifts often demand more than mortals know how to give.',
    ],
    champions: ['Pantheon', 'Diana', 'Leona', 'Taric', 'Zoe', 'Aurelion Sol'],
  },
  {
    id: 'void',
    name: 'THE VOID',
    code: 'VD',
    subtitle: 'Realm of Nothing',
    tagline: 'The End of All Things',
    quote: 'There is no after the Void. There is only what it has not consumed.',
    images: [
      { src: kassadinImage, label: 'Kassadin - The Void Walker' },
      { src: voidImage, label: 'The Void Rift' },
      { src: kaisaImage, label: "Kai'Sa - Daughter of the Void" },
    ],
    body: [
      'The Void is not a place so much as an absence, a dimension of hunger pressing against the world. Wherever the barrier thins, reality begins to break.',
      'Voidborn creatures range from ravenous beasts to ancient intelligences. Against them stand survivors like Kassadin and Kai’Sa, scarred by the thing they fight.',
    ],
    champions: ['Kassadin', "Kai'Sa", "Kog'Maw", "Vel'Koz", "Cho'Gath", "Bel'Veth"],
  },
  {
    id: 'zaun',
    name: 'ZAUN',
    code: 'ZN',
    subtitle: 'The Undercity',
    tagline: 'The Gray Beneath Progress',
    quote: 'They call it the gutter. We call it home.',
    images: [
      { src: ekkoImage, label: 'Ekko - The Boy Who Shattered Time' },
      { src: zaunImage, label: 'Zaun - The Undercity' },
      { src: warwickImage, label: 'Warwick - The Uncaged Wrath' },
    ],
    body: [
      'Zaun lies beneath Piltover, breathing chemical smog and surviving on salvage, chemtech and stubborn creativity.',
      'Its people build miracles from scraps while chem-barons fight for control. Zaun is dangerous, wounded and alive in a way the city above often forgets.',
    ],
    champions: ['Ekko', 'Jinx', 'Singed', 'Warwick', 'Urgot', 'Twitch'],
  },
  {
    id: 'ixtal',
    name: 'IXTAL',
    code: 'IX',
    subtitle: 'Hidden Jungle',
    tagline: 'The Hidden Jungle Civilization',
    quote: 'The jungle provides. The jungle also remembers.',
    images: [
      { src: qiyanaImage, label: 'Qiyana - Empress of the Elements' },
      { src: ixtalImage, label: 'The Ixtal Rainforest' },
      { src: nidaleeImage, label: 'Nidalee - The Bestial Huntress' },
    ],
    body: [
      'Ixtal is an ancient civilization hidden deep within the jungle, protected by isolation and mastery of elemental magic.',
      'Younger Ixtali are beginning to question whether hiding is survival or fear. The outside world is changing, and the jungle cannot stay silent forever.',
    ],
    champions: ['Qiyana', 'Nidalee', 'Zyra', 'Rengar', 'Malphite', 'Neeko'],
  },
  {
    id: 'bandle-city',
    name: 'BANDLE CITY',
    code: 'BC',
    subtitle: 'Realm of Yordles',
    tagline: 'Where Magic Lives Between Worlds',
    quote: 'A little impossible magic goes a long way.',
    images: [
      { src: teemoImage, label: 'Teemo - The Swift Scout' },
      { src: bandleImage, label: 'Bandle City' },
      { src: luluImage, label: 'Lulu - The Fae Sorceress' },
    ],
    body: [
      'Bandle City exists between places, a magical home whose doors may open almost anywhere. It reflects the impossible nature of the yordles who live there.',
      'Yordles carry a spark of Bandle City into the world, whether as inventors, scouts, tricksters or mages. Their cheer often hides power older than most kingdoms.',
    ],
    champions: ['Teemo', 'Lulu', 'Tristana', 'Rumble', 'Corki', 'Heimerdinger'],
  },
]

function Lore() {
  const [activeRegionId, setActiveRegionId] = useState('demacia')
  const activeRegion = useMemo(
    () => regions.find((region) => region.id === activeRegionId) || regions[0],
    [activeRegionId],
  )

  function selectRegion(regionId) {
    setActiveRegionId(regionId)
    window.scrollTo({ top: 260, behavior: 'smooth' })
  }

  return (
    <div className="lore-page-react" style={{ '--runeterra-map': `url(${runeterraMap})` }}>
      <SiteHeader />

      <section className="lore-hero-react">
        <div className="lore-hero-content-react">
          <div className="lore-hero-label-react">WORLD OF RUNETERRA</div>
          <h1>THE LORE</h1>
          <p>Explore the regions, stories and legends that shape the world of League of Legends.</p>
        </div>
      </section>

      <section className="region-selector-react" aria-label="Runeterra regions">
        <div className="region-nav-list-react">
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              className={`region-btn-react ${region.id === activeRegion.id ? 'active' : ''}`}
              onClick={() => selectRegion(region.id)}
            >
              <span className="region-btn-icon-react">{region.code}</span>
              <span className="region-btn-name-react">{region.name}</span>
              <span className="region-btn-sub-react">{region.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      <main className="lore-main-react">
        <section className="region-layout-react" key={activeRegion.id}>
          <aside className="region-side-images-react">
            {activeRegion.images.slice(0, 2).map((image) => (
              <figure className="side-img-react" key={image.label}>
                <img src={image.src} alt={image.label} style={{ objectPosition: image.position || 'center' }} />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </aside>

          <article className="region-text-react">
            <header className="region-header-react">
              <div className="region-emblem-react">{activeRegion.code}</div>
              <h2>{activeRegion.name}</h2>
              <p>{activeRegion.tagline}</p>
              <span />
            </header>

            <div className="region-body-react">
              {activeRegion.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote>{activeRegion.quote}</blockquote>
            </div>

            <div className="region-champions-react">
              <div className="region-champions-title-react">NOTABLE CHAMPIONS</div>
              <div className="champion-tags-react">
                {activeRegion.champions.map((champion) => (
                  <span className="champion-tag-react" key={champion}>{champion}</span>
                ))}
              </div>
            </div>
          </article>

          <aside className="region-side-images-react">
            {activeRegion.images.slice(2).map((image) => (
              <figure className="side-img-react" key={image.label}>
                <img src={image.src} alt={image.label} style={{ objectPosition: image.position || 'center' }} />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Lore
