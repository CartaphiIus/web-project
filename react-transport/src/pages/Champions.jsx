import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Champions.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { championVideoIds } from '../data/championVideoIds.js'

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
  { id: 'ahri', key: 'Ahri', name: 'Ahri', title: 'the Nine-Tailed Fox', image: ahriImage },
  { id: 'zed', key: 'Zed', name: 'Zed', title: 'the Master of Shadows', image: zedImage },
  { id: 'kindred', key: 'Kindred', name: 'Kindred', title: 'the Eternal Hunters', image: kindredImage },
  { id: 'akali', key: 'Akali', name: 'Akali', title: 'the Rogue Assassin', image: akaliImage },
  { id: 'aurora', key: 'Aurora', name: 'Aurora', title: 'the Witch Between Worlds', image: auroraImage },
  { id: 'ambessa', key: 'Ambessa', name: 'Ambessa', title: 'Matriarch of War', image: ambessaImage },
  { id: 'briar', key: 'Briar', name: 'Briar', title: 'the Restrained Hunger', image: briarImage },
  { id: 'yasuo', key: 'Yasuo', name: 'Yasuo', title: 'the Unforgiven', image: yasuoImage },
  { id: 'akshan', key: 'Akshan', name: 'Akshan', title: 'the Rogue Sentinel', image: akshanImage },
  { id: 'aatrox', key: 'Aatrox', name: 'Aatrox', title: 'the Darkin Blade', image: aatroxImage },
  { id: 'ashe', key: 'Ashe', name: 'Ashe', title: 'the Frost Archer', image: asheImage },
  { id: 'darius', key: 'Darius', name: 'Darius', title: 'the Hand of Noxus', image: dariusImage },
  { id: 'mordekaiser', key: 'Mordekaiser', name: 'Mordekaiser', title: 'the Iron Revenant', image: mordekaiserImage },
  { id: 'malzahar', key: 'Malzahar', name: 'Malzahar', title: 'the Prophet of the Void', image: malzaharImage },
  { id: 'kaisa', key: 'Kaisa', name: "Kai'Sa", title: 'Daughter of the Void', image: kaisaImage },
  { id: 'lissandra', key: 'Lissandra', name: 'Lissandra', title: 'the Ice Witch', image: lissandraImage },
]

const laneSummaries = [
  { label: 'Top Lane', count: 4 },
  { label: 'Jungle', count: 2 },
  { label: 'Mid Lane', count: 6 },
  { label: 'ADC', count: 2 },
  { label: 'Support', count: 2 },
]

const ddragonVersion = '16.8.1'
const ddragonBase = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}`
const abilityKeys = ['P', 'Q', 'W', 'E', 'R']

function stripHtml(value) {
  return (value || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/([a-z])\.([A-Z])/g, '$1. $2')
    .replace(/\.{2,}/g, '.')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function formatAbilityValue(value, suffix = '') {
  if (value === undefined || value === null || value === '' || value === '0' || value === '-1') {
    return null
  }

  return suffix ? `${value} ${suffix}` : String(value)
}

function getReadableResourceName(champion, spell) {
  const normalizedPartype = String(champion?.partype || '')
    .replace(/\{\{\s*abilityresourcename\s*\}\}/gi, '')
    .trim()

  const normalizedResource = String(spell?.resource || spell?.costType || '')
    .replace(/\{\{\s*abilityresourcename\s*\}\}/gi, '')
    .replace(/\{\{\s*cost\s*\}\}/gi, '')
    .trim()

  const rawValue = normalizedPartype || normalizedResource
  const compactValue = rawValue.toLowerCase().replace(/\s+/g, '')

  if (!rawValue || compactValue === 'nocost' || compactValue === 'none') {
    return 'No Cost'
  }

  const resourceMap = {
    mana: 'Mana',
    energy: 'Energy',
    fury: 'Fury',
    rage: 'Rage',
    heat: 'Heat',
    ferocity: 'Ferocity',
    grit: 'Grit',
    courage: 'Courage',
    health: 'Health',
    bloodwell: 'Blood Well',
    flow: 'Flow',
    shield: 'Shield',
    ammo: 'Ammo',
  }

  return resourceMap[compactValue] || rawValue.replace(/\b\w/g, (char) => char.toUpperCase())
}

function getResourcePresentation(champion, spell) {
  const resourceName = getReadableResourceName(champion, spell)
  const compactValue = resourceName.toLowerCase().replace(/\s+/g, '-')
  const presentationMap = {
    mana: { icon: 'MP', className: 'resource-mana' },
    energy: { icon: 'EN', className: 'resource-energy' },
    fury: { icon: 'FY', className: 'resource-fury' },
    rage: { icon: 'RG', className: 'resource-rage' },
    heat: { icon: 'HT', className: 'resource-heat' },
    grit: { icon: 'GR', className: 'resource-grit' },
    courage: { icon: 'CG', className: 'resource-courage' },
    health: { icon: 'HP', className: 'resource-health' },
    'blood-well': { icon: 'BW', className: 'resource-blood-well' },
    flow: { icon: 'FL', className: 'resource-flow' },
    shield: { icon: 'SH', className: 'resource-shield' },
    ammo: { icon: 'AM', className: 'resource-ammo' },
    'no-cost': { icon: 'NC', className: 'resource-no-cost' },
  }

  const presentation = presentationMap[compactValue] || { icon: 'RS', className: 'resource-generic' }
  return { ...presentation, name: resourceName }
}

function buildAbilityMetaRows(champion, spell) {
  const resourcePresentation = getResourcePresentation(champion, spell)
  return [
    { label: 'Cooldown', value: formatAbilityValue(spell.cooldownBurn, 'sec') },
    {
      label: 'Cost',
      value:
        spell.costBurn && spell.costBurn !== '0'
          ? `${spell.costBurn} ${resourcePresentation.name}`.trim()
          : resourcePresentation.name === 'No Cost'
            ? resourcePresentation.name
            : null,
      accent: resourcePresentation,
    },
    { label: 'Range', value: formatAbilityValue(spell.rangeBurn) },
    { label: 'Max Rank', value: formatAbilityValue(spell.maxrank) },
  ].filter((item) => item.value)
}

function buildLevelTips(spell) {
  if (!spell.leveltip || !Array.isArray(spell.leveltip.label) || !Array.isArray(spell.leveltip.effect)) {
    return []
  }

  return spell.leveltip.label
    .map((label, index) => {
      const effectText = stripHtml(spell.leveltip.effect[index] || '')
      if (!effectText || effectText.includes('{{')) return null
      return { label: stripHtml(label), value: effectText }
    })
    .filter(Boolean)
}

function Champions() {
  const location = useLocation()
  const navigate = useNavigate()
  const [championDataMap, setChampionDataMap] = useState({})
  const championMap = useMemo(
    () => Object.fromEntries(champions.map((champion) => [champion.id, champion])),
    [],
  )
  const selectedChampion = championMap[location.hash.replace('#', '')] || null
  const selectedChampionData = selectedChampion ? championDataMap[selectedChampion.key] : null

  useEffect(() => {
    let isMounted = true

    async function loadChampionData() {
      try {
        const response = await fetch(`${ddragonBase}/data/en_US/championFull.json`)
        if (!response.ok) throw new Error(`Failed to fetch champion data: ${response.status}`)
        const data = await response.json()
        if (isMounted) {
          setChampionDataMap(data.data || {})
        }
      } catch (error) {
        console.warn('Champion data could not be loaded for detail modal.', error)
      }
    }

    loadChampionData()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const hashId = location.hash.replace('#', '')
    if (!hashId) return

    const target = document.getElementById(hashId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [location.hash])

  useEffect(() => {
    document.body.style.overflow = selectedChampion ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedChampion])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Escape') return

      navigate({ pathname: location.pathname, search: location.search, hash: '' }, { replace: true })
    }

    if (selectedChampion) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [location.pathname, location.search, navigate, selectedChampion])

  const selectedAbilities = useMemo(() => {
    if (!selectedChampionData) return []

    return [
      {
        key: 'P',
        name: selectedChampionData.passive?.name || 'Passive',
        description: stripHtml(selectedChampionData.passive?.description || ''),
        image: `${ddragonBase}/img/passive/${selectedChampionData.passive?.image?.full || ''}`,
        metaRows: [],
        levelTips: [],
      },
      ...selectedChampionData.spells.map((spell, index) => ({
        key: abilityKeys[index + 1],
        name: spell.name,
        description: stripHtml(spell.description || spell.tooltip || ''),
        image: `${ddragonBase}/img/spell/${spell.image?.full || `${spell.id}.png`}`,
        metaRows: buildAbilityMetaRows(selectedChampionData, spell),
        levelTips: buildLevelTips(spell),
      })),
    ]
  }, [selectedChampionData])

  const selectedStats = useMemo(() => {
    if (!selectedChampionData) return []

    return [
      { label: 'Class', value: (selectedChampionData.tags || []).join(' / ') || 'Unknown' },
      { label: 'Resource', value: selectedChampionData.partype || 'None' },
      { label: 'Health', value: `${selectedChampionData.stats.hp} + ${selectedChampionData.stats.hpperlevel}/lvl` },
      { label: 'Mana', value: `${selectedChampionData.stats.mp} + ${selectedChampionData.stats.mpperlevel}/lvl` },
      { label: 'Attack Damage', value: `${selectedChampionData.stats.attackdamage}` },
      { label: 'Armor', value: `${selectedChampionData.stats.armor}` },
      { label: 'Magic Resist', value: `${selectedChampionData.stats.spellblock}` },
      { label: 'Range', value: `${selectedChampionData.stats.attackrange}` },
      { label: 'Move Speed', value: `${selectedChampionData.stats.movespeed}` },
      { label: 'Difficulty', value: `${selectedChampionData.info?.difficulty ?? 'Unknown'}/10` },
    ]
  }, [selectedChampionData])

  const selectedTips = useMemo(() => {
    if (!selectedChampionData) return { ally: [], enemy: [] }
    return {
      ally: (selectedChampionData.allytips || []).map((tip) => stripHtml(tip)).filter(Boolean),
      enemy: (selectedChampionData.enemytips || []).map((tip) => stripHtml(tip)).filter(Boolean),
    }
  }, [selectedChampionData])

  const videoId = selectedChampion ? championVideoIds[selectedChampion.name] : ''
  const watchUrl = selectedChampion
    ? videoId
      ? `https://www.youtube.com/watch?v=${videoId}`
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(`League of Legends ${selectedChampion.name} Champion Spotlight Riot Games`)}`
    : '#'
  const thumbnailUrl = selectedChampion
    ? videoId
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.key}_0.jpg`
    : ''
  const splashUrl = selectedChampion
    ? `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.key}_0.jpg`
    : ''

  function openChampionModal(championId) {
    navigate({ pathname: location.pathname, search: location.search, hash: `#${championId}` }, { replace: true })
  }

  function closeChampionModal() {
    navigate({ pathname: location.pathname, search: location.search, hash: '' }, { replace: true })
  }

  return (
    <div className="champions-page">
      <SiteHeader />

      <main className="champions-main">
        <section className="champions-toolbar-react">
          <div className="champions-filter-pills-react">
            <span className="champions-pill-react">All Champions {champions.length}</span>
            {laneSummaries.map((lane) => (
              <span className="champions-pill-react" key={lane.label}>
                {lane.label} <strong>{lane.count}</strong>
              </span>
            ))}
          </div>
          <div className="champions-toolbar-meta-react">
            <span>{champions.length} official Riot champions loaded. Version: {ddragonVersion}</span>
            <span className="champions-toolbar-note-react">React migration showcase set.</span>
          </div>
          <div className="champions-api-status-react">
            <span className="champions-api-dot-react" />
            <span>Live champion data loaded successfully. Version: {ddragonVersion}</span>
          </div>
        </section>

        <section className="champion-grid-section">
          <div className="section-head">
            <h2>{selectedChampion ? selectedChampion.name : 'React Showcase'}</h2>
            <span>{champions.length} champions</span>
          </div>

          <div className="champion-grid-react">
            {champions.map((champion) => (
              <button
                key={champion.id}
                id={champion.id}
                type="button"
                onClick={() => openChampionModal(champion.id)}
                className={`champion-orb-card ${selectedChampion?.id === champion.id ? 'is-selected' : ''}`}
              >
                <div className="champion-orb">
                  <img src={champion.image} alt={champion.name} />
                </div>
                <div className="champion-card-body-react">
                  <div className="champion-orb-name">{champion.name}</div>
                  <div className="champion-orb-title">{champion.title}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {selectedChampion ? (
        <div className="champion-modal-overlay-react active" onClick={closeChampionModal}>
          <div
            className="champion-detail-panel-react active"
            role="dialog"
            aria-modal="true"
            aria-labelledby="championPanelTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="panel-close-react" type="button" aria-label="Close" onClick={closeChampionModal}>
              X
            </button>

            <div className="panel-left-react">
              <div className="panel-left-inner-react">
                <div className="panel-video-section-react">
                  <div className="panel-section-label-react">CHAMPION VIDEO</div>
                  <div className="panel-video-wrapper-react">
                    <a
                      className="panel-video-preview-react"
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={thumbnailUrl} alt={`${selectedChampion.name} Champion Spotlight`} />
                      <span className="panel-video-preview-overlay-react">
                        <span className="panel-video-preview-tag-react">Champion Spotlight</span>
                        <span className="panel-video-preview-cta-react">Watch on YouTube</span>
                      </span>
                    </a>
                  </div>
                  <a className="panel-video-link-react" href={watchUrl} target="_blank" rel="noopener noreferrer">
                    {videoId ? 'Watch on YouTube' : `Search ${selectedChampion.name} on YouTube`}
                  </a>
                </div>

                <div className="panel-divider-react">
                  <span className="divider-line-react" />
                  <span className="divider-icon-react">ABILITIES</span>
                  <span className="divider-line-react" />
                </div>

                <div className="panel-abilities-section-react">
                  <div className="panel-section-label-react">ABILITIES</div>
                  <div className="abilities-grid-react">
                    {selectedAbilities.length ? (
                      selectedAbilities.map((ability) => (
                        <div className="ability-card-react" key={ability.key}>
                          <div className="ability-header-react">
                            <div className="ability-icon-wrap-react">
                              <img className="ability-icon-react" src={ability.image} alt={ability.name} />
                              <span className="ability-key-badge-react">{ability.key}</span>
                            </div>
                            <div className="ability-title-block-react">
                              <span className="ability-name-react">{ability.name}</span>
                            </div>
                          </div>
                          <div className="ability-desc-react">{ability.description || 'No details available.'}</div>

                          {ability.metaRows.length ? (
                            <div className="ability-meta-grid-react">
                              {ability.metaRows.map((item) => (
                                <div
                                  className={`ability-meta-item-react ${item.accent ? item.accent.className : ''}`}
                                  key={`${ability.key}-${item.label}`}
                                >
                                  <span>{item.label}</span>
                                  <strong>
                                    {item.accent ? (
                                      <span className={`resource-pill-react ${item.accent.className}`}>
                                        <span className="resource-icon-react">{item.accent.icon}</span>
                                        <span>{item.value}</span>
                                      </span>
                                    ) : (
                                      item.value
                                    )}
                                  </strong>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {ability.levelTips.length ? (
                            <div className="ability-scale-block-react">
                              <div className="ability-subtitle-react">Level Scaling</div>
                              <div className="ability-scale-list-react">
                                {ability.levelTips.map((tip) => (
                                  <div className="ability-scale-item-react" key={`${ability.key}-${tip.label}`}>
                                    <span>{tip.label}</span>
                                    <strong>{tip.value}</strong>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <div className="ability-loading-react">Loading abilities...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-right-react">
              <div className="panel-hero-react">
                <img src={splashUrl || selectedChampion.image} alt={selectedChampion.name} />
                <div className="panel-hero-gradient-react" />
                <div className="panel-hero-text-react">
                  <div className="panel-tag-react">CHAMPION</div>
                  <h1 id="championPanelTitle">{selectedChampion.name}</h1>
                  <p>{selectedChampionData?.title || selectedChampion.title}</p>
                </div>
              </div>

              <div className="panel-lore-section-react">
                <h3 className="panel-lore-heading-react">LORE</h3>
                <p className="panel-lore-text-react">
                  {stripHtml(selectedChampionData?.lore || '') || 'Lore for this champion will be added soon.'}
                </p>

                <div className="panel-detail-block-react">
                  <h3 className="panel-lore-heading-react">STATS</h3>
                  <div className="panel-stats-grid-react">
                    {selectedStats.length ? selectedStats.map((item) => (
                      <div className="panel-stat-card-react" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    )) : <div className="panel-empty-text-react">Stats could not be loaded.</div>}
                  </div>
                </div>

                <div className="panel-detail-block-react">
                  <h3 className="panel-lore-heading-react">TIPS</h3>
                  <div className="panel-tips-react">
                    {selectedTips.ally.length ? (
                      <div className="panel-tip-group-react">
                        <h4>Playing As</h4>
                        <ul>{selectedTips.ally.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                      </div>
                    ) : null}
                    {selectedTips.enemy.length ? (
                      <div className="panel-tip-group-react">
                        <h4>Playing Against</h4>
                        <ul>{selectedTips.enemy.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                      </div>
                    ) : null}
                    {!selectedTips.ally.length && !selectedTips.enemy.length ? (
                      <div className="panel-empty-text-react">No extra tips available.</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SiteFooter />
    </div>
  )
}

export default Champions
