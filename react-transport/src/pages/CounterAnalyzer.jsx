import { useEffect, useMemo, useState } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import {
  CounterAnalysisSidebar,
  CounterEnemyPicker,
} from '../components/CounterAnalyzerSections.jsx'
import './CounterAnalyzer.css'
import {
  fetchCounterChampionPool,
  getCounterAnalyzerState,
  getCounterClassOptions,
} from '../utils/counterAnalysis.js'

const slotRoles = ['Top', 'Jungle', 'Mid', 'Bot', 'Support']
const tabOptions = ['items', 'strategy', 'runes', 'threats', 'analysis']

function CounterAnalyzer() {
  const [championPool, setChampionPool] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [enemyTeam, setEnemyTeam] = useState([null, null, null, null, null])
  const [activeSlot, setActiveSlot] = useState(null)
  const [filterRole, setFilterRole] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('items')

  useEffect(() => {
    let isMounted = true

    async function loadChampions() {
      try {
        setLoading(true)
        const champions = await fetchCounterChampionPool()
        if (!isMounted) return
        setChampionPool(champions)
      } catch (error) {
        if (!isMounted) return
        console.warn('Counter analyzer data could not be loaded.', error)
        setLoadError('Champion data could not be loaded right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadChampions()
    return () => {
      isMounted = false
    }
  }, [])

  const championMap = useMemo(
    () => Object.fromEntries(championPool.map((champion) => [champion.id, champion])),
    [championPool],
  )

  const selectedTeam = useMemo(
    () => enemyTeam.map((championId) => (championId ? championMap[championId] : null)).filter(Boolean),
    [championMap, enemyTeam],
  )

  const analysis = useMemo(() => getCounterAnalyzerState(selectedTeam), [selectedTeam])
  const classOptions = useMemo(() => getCounterClassOptions(championPool), [championPool])

  const filteredChampions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return championPool.filter((champion) => {
      const roleOk = filterRole === 'all' || champion.roles.includes(filterRole)
      const typeOk = filterType === 'all' || champion.type === filterType
      const classOk = filterClass === 'all' || champion.class === filterClass
      const searchOk = !query || champion.name.toLowerCase().includes(query)
      const notSelected = !enemyTeam.includes(champion.id)
      return roleOk && typeOk && classOk && searchOk && notSelected
    })
  }, [championPool, enemyTeam, filterClass, filterRole, filterType, searchTerm])

  function pickChampion(championId) {
    setEnemyTeam((current) => {
      if (current.includes(championId)) return current
      const next = [...current]
      const slotIndex = activeSlot ?? next.findIndex((entry) => entry === null)
      if (slotIndex === -1) return current
      next[slotIndex] = championId
      return next
    })
    setActiveSlot(null)
  }

  function clearSlot(slotIndex) {
    setEnemyTeam((current) => current.map((entry, index) => (index === slotIndex ? null : entry)))
    setActiveSlot(null)
  }

  function toggleSlot(slotIndex) {
    if (enemyTeam[slotIndex]) {
      clearSlot(slotIndex)
      return
    }
    setActiveSlot(slotIndex)
  }

  function resetEnemyTeam() {
    setEnemyTeam([null, null, null, null, null])
    setActiveSlot(null)
    setActiveTab('items')
  }

  function renderThreatRingOffset(score) {
    const circumference = 2 * Math.PI * 54
    return circumference - (score / 100) * circumference
  }

  function renderThreatRingColor(score) {
    if (score >= 80) return '#c03030'
    if (score >= 60) return '#e88a2e'
    if (score >= 40) return '#c8aa6e'
    return '#3dba6a'
  }

  function renderDonutDash(percent) {
    const circumference = 2 * Math.PI * 38
    const visible = (percent / 100) * circumference
    return `${visible} ${circumference - visible}`
  }

  const selectedCount = selectedTeam.length
  const threatScore = analysis?.threatScore ?? 0
  const threatOffset = renderThreatRingOffset(threatScore)
  const threatRingColor = renderThreatRingColor(threatScore)
  const dominantDamageLabel = analysis
    ? analysis.damage.phys >= analysis.damage.magic
      ? `${analysis.damage.phys}% Physical`
      : `${analysis.damage.magic}% Magic`
    : '—'

  return (
    <div className="counter-analyzer-page">
      <SiteHeader compact />

      <main className="counter-main">
        <div className="counter-main-wrap">
          <CounterEnemyPicker
            slotRoles={slotRoles}
            enemyTeam={enemyTeam}
            championMap={championMap}
            activeSlot={activeSlot}
            onToggleSlot={toggleSlot}
            onClearSlot={clearSlot}
            filterRole={filterRole}
            onFilterRole={setFilterRole}
            filterType={filterType}
            onFilterType={setFilterType}
            filterClass={filterClass}
            onFilterClass={setFilterClass}
            classOptions={classOptions}
            searchTerm={searchTerm}
            onSearchTerm={setSearchTerm}
            loading={loading}
            loadError={loadError}
            filteredChampions={filteredChampions}
            onPickChampion={pickChampion}
          />

          <CounterAnalysisSidebar
            tabOptions={tabOptions}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedCount={selectedCount}
            threatScore={threatScore}
            threatOffset={threatOffset}
            threatRingColor={threatRingColor}
            analysis={analysis}
            dominantDamageLabel={dominantDamageLabel}
            renderDonutDash={renderDonutDash}
            onResetEnemyTeam={resetEnemyTeam}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default CounterAnalyzer
