import { resolveChampionLane } from './championLane.js'

const ddragonVersion = '16.8.1'
const SAVED_DRAFT_KEY = 'lol_draftbuilder_saved_draft'

const ccMap = {
  Aatrox: ['knockup', 'pull'],
  Ahri: ['charm'],
  Alistar: ['knockup', 'stun'],
  Amumu: ['stun', 'snare'],
  Ashe: ['slow', 'stun'],
  Blitzcrank: ['hook', 'knockup'],
  Braum: ['slow', 'stun'],
  Darius: ['pull', 'slow'],
  Fiddlesticks: ['fear', 'silence'],
  Galio: ['knockup', 'taunt'],
  Janna: ['knockup', 'slow'],
  Leona: ['stun', 'snare'],
  Lulu: ['slow', 'knockup'],
  Malphite: ['knockup', 'slow'],
  Maokai: ['snare', 'knockback'],
  Morgana: ['snare'],
  Nautilus: ['hook', 'knockup', 'root'],
  Neeko: ['root', 'stun'],
  Ornn: ['knockup'],
  Poppy: ['stun', 'knockback'],
  Rakan: ['knockup', 'charm'],
  Sejuani: ['stun', 'slow'],
  Shen: ['taunt'],
  Sion: ['knockup', 'slow'],
  Skarner: ['suppress'],
  Sona: ['stun', 'slow'],
  Swain: ['pull', 'slow'],
  Thresh: ['hook', 'flay'],
  Veigar: ['stun'],
  Vi: ['knockup'],
  Wukong: ['knockup'],
  Zac: ['knockup'],
  Zyra: ['snare', 'knockup'],
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getChampionType(champion) {
  return champion.stats?.attackrange <= 200 ? 'melee' : 'ranged'
}

function normalizeChampionClass(tags = []) {
  if (tags.includes('Marksman')) return 'marksman'
  if (tags.includes('Support')) return 'support'
  if (tags.includes('Tank')) return 'tank'
  if (tags.includes('Assassin')) return 'assassin'
  if (tags.includes('Mage')) return 'mage'
  if (tags.includes('Fighter')) return 'fighter'
  return 'specialist'
}

function getChampionDamageProfile(championClass) {
  const profiles = {
    marksman: { phys: 74, magic: 16, true: 10 },
    support: { phys: 22, magic: 63, true: 15 },
    tank: { phys: 28, magic: 57, true: 15 },
    assassin: { phys: 70, magic: 24, true: 6 },
    mage: { phys: 12, magic: 80, true: 8 },
    fighter: { phys: 61, magic: 26, true: 13 },
    specialist: { phys: 40, magic: 45, true: 15 },
  }

  return profiles[championClass] || profiles.specialist
}

function getChampionTags(champion, championClass, lane) {
  const tags = new Set([championClass, lane.toLowerCase()])
  const normalizedTags = champion.tags || []

  if (normalizedTags.includes('Tank')) tags.add('engage')
  if (normalizedTags.includes('Support')) tags.add('utility')
  if (normalizedTags.includes('Marksman')) tags.add('carry')
  if (normalizedTags.includes('Assassin')) tags.add('pick')
  if (normalizedTags.includes('Mage')) tags.add('poke')
  if (normalizedTags.includes('Fighter')) tags.add('skirmish')

  if ((champion.stats?.movespeed || 0) >= 340) tags.add('mobile')
  if ((champion.info?.difficulty || 0) >= 7) tags.add('playmaker')
  if ((champion.stats?.attackrange || 0) >= 500) tags.add('ranged')
  if ((champion.stats?.attackrange || 0) <= 200) tags.add('frontline')

  return [...tags]
}

function getChampionRatings(champion, championClass) {
  const hp = champion.stats?.hp || 600
  const armor = champion.stats?.armor || 30
  const speed = champion.stats?.movespeed || 330
  const range = champion.stats?.attackrange || 175
  const difficulty = champion.info?.difficulty || 5

  const tankiness = clamp(Math.round((hp / 85 + armor / 6) / 2), 2, 10)
  const mobility = clamp(Math.round((speed - 300) / 8 + (range < 250 ? 2 : 0)), 2, 10)
  const carry = clamp(
    championClass === 'marksman' ? 9
      : championClass === 'assassin' ? 8
        : championClass === 'fighter' ? 7
          : championClass === 'mage' ? 7
            : championClass === 'support' ? 4
              : championClass === 'tank' ? 3
                : 6,
    1,
    10,
  )
  const engage = clamp(
    championClass === 'tank' ? 8
      : championClass === 'support' ? 7
        : championClass === 'fighter' ? 6
          : championClass === 'assassin' ? 6
            : 4,
    1,
    10,
  )
  const peel = clamp(championClass === 'support' ? 8 : championClass === 'tank' ? 6 : 4, 1, 10)
  const utility = clamp(championClass === 'support' ? 9 : championClass === 'mage' ? 6 : championClass === 'tank' ? 6 : 4, 1, 10)
  const waveclear = clamp(championClass === 'mage' ? 8 : championClass === 'marksman' ? 6 : championClass === 'fighter' ? 6 : 5, 1, 10)
  const split = clamp(championClass === 'fighter' || championClass === 'assassin' ? 7 : championClass === 'marksman' ? 6 : 4, 1, 10)

  return {
    tankiness,
    mobility,
    carry,
    engage,
    peel,
    utility,
    waveclear,
    split,
    difficulty: clamp(difficulty, 1, 10),
  }
}

export function getDraftStorageKey() {
  return SAVED_DRAFT_KEY
}

export function getDdragonVersion() {
  return ddragonVersion
}

export function formatDraftTimestamp(isoString) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return 'Unknown time'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export async function fetchChampionPool() {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/championFull.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch champion data: ${response.status}`)
  }

  const payload = await response.json()
  return Object.values(payload.data || {})
    .map((champion) => {
      const lane = resolveChampionLane(champion.id, champion)
      const championClass = normalizeChampionClass(champion.tags)
      return {
        id: champion.id,
        key: champion.id,
        name: champion.name,
        title: champion.title,
        lane,
        roles: [lane.toLowerCase()],
        type: getChampionType(champion),
        class: championClass,
        image: `https://ddragon.leagueoflegends.com/cdn/${payload.version}/img/champion/${champion.image.full}`,
        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`,
        damage: getChampionDamageProfile(championClass),
        ratings: getChampionRatings(champion, championClass),
        cc: ccMap[champion.id] || [],
        tags: getChampionTags(champion, championClass, lane),
      }
    })
    .sort((left, right) => left.name.localeCompare(right.name))
}

function average(values) {
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function getDraftWarnings(selected, ratings, damage) {
  const warnings = []
  const classes = selected.map((champion) => champion.class)
  const lanes = new Set(selected.map((champion) => champion.lane)).size
  const totalCc = new Set(selected.flatMap((champion) => champion.cc)).size

  if (lanes <= 3 && selected.length >= 4) {
    warnings.push({
      type: 'crit',
      icon: '⚠',
      title: 'Role Coverage Is Thin',
      desc: 'This draft stacks too many picks into the same lanes, so your comp may fight over the same jobs.',
    })
  }

  if (ratings.frontline <= 4) {
    warnings.push({
      type: 'warn',
      icon: '🛡',
      title: 'Light Frontline',
      desc: 'You have plenty of damage, but teamfights may become fragile without a durable engage champion.',
    })
  }

  if (damage.balance <= 55) {
    warnings.push({
      type: 'warn',
      icon: '⚔',
      title: 'Damage Profile Is Predictable',
      desc: 'The draft leans too hard into one damage type, so itemization against you becomes easier.',
    })
  }

  if (totalCc <= 2 && selected.length >= 4) {
    warnings.push({
      type: 'warn',
      icon: '🌀',
      title: 'Limited Crowd Control',
      desc: 'You may struggle to start fights or lock down mobile carries without more reliable CC.',
    })
  }

  if (classes.includes('marksman') && (classes.includes('support') || ratings.peel >= 6)) {
    warnings.push({
      type: 'ok',
      icon: '🏹',
      title: 'Carry Protection Online',
      desc: 'Your backline has enough tools to let a scaling damage dealer play front-to-back fights.',
    })
  }

  if (selected.length === 5 && warnings.filter((warning) => warning.type !== 'ok').length === 0) {
    warnings.push({
      type: 'ok',
      icon: '🏆',
      title: 'Well-Rounded Composition',
      desc: 'This draft covers engage, damage, and utility cleanly. It looks ready for most standard games.',
    })
  }

  return warnings
}

function buildSynergyCombos(selected) {
  const combos = []

  for (let index = 0; index < selected.length; index += 1) {
    for (let innerIndex = index + 1; innerIndex < selected.length; innerIndex += 1) {
      const left = selected[index]
      const right = selected[innerIndex]
      let score = 0
      let reason = ''

      if (left.class === 'tank' && ['marksman', 'mage'].includes(right.class)) {
        score = 18
        reason = `${left.name} can start fights cleanly so ${right.name} gets safe damage windows.`
      } else if (right.class === 'tank' && ['marksman', 'mage'].includes(left.class)) {
        score = 18
        reason = `${right.name} can start fights cleanly so ${left.name} gets safe damage windows.`
      } else if (left.class === 'support' && right.class === 'marksman') {
        score = 20
        reason = `${left.name} enables ${right.name} through peel, tempo, and lane control.`
      } else if (right.class === 'support' && left.class === 'marksman') {
        score = 20
        reason = `${right.name} enables ${left.name} through peel, tempo, and lane control.`
      } else if (left.tags.includes('engage') && right.tags.includes('carry')) {
        score = 16
        reason = `${left.name} creates hard commit windows that ${right.name} can cash in on.`
      } else if (right.tags.includes('engage') && left.tags.includes('carry')) {
        score = 16
        reason = `${right.name} creates hard commit windows that ${left.name} can cash in on.`
      } else if (left.type === 'ranged' && right.class === 'mage') {
        score = 12
        reason = `${left.name} and ${right.name} can layer ranged pressure before objectives.`
      } else if (right.type === 'ranged' && left.class === 'mage') {
        score = 12
        reason = `${right.name} and ${left.name} can layer ranged pressure before objectives.`
      }

      if (score > 0) {
        combos.push({
          pair: `${left.id}-${right.id}`,
          names: [left.name, right.name],
          score,
          reason,
        })
      }
    }
  }

  return combos.sort((left, right) => right.score - left.score).slice(0, 5)
}

function getScoreTier(score) {
  if (score >= 85) return { grade: 'S TIER', summary: 'Exceptional synergy. This comp has a clear, powerful game plan.' }
  if (score >= 70) return { grade: 'A TIER', summary: 'Strong composition with good synergies and minimal gaps.' }
  if (score >= 55) return { grade: 'B TIER', summary: 'Playable composition with a few meaningful strengths.' }
  if (score >= 40) return { grade: 'C TIER', summary: 'Some ideas connect, but the draft still has visible holes.' }
  return { grade: 'D TIER', summary: 'This composition needs much better role balance and synergy.' }
}

export function buildDraftSnapshot(selected, draftIds) {
  const rolesCovered = new Set(selected.map((champion) => champion.lane)).size
  const avgDamage = {
    phys: Math.round(average(selected.map((champion) => champion.damage.phys))),
    magic: Math.round(average(selected.map((champion) => champion.damage.magic))),
    true: Math.round(average(selected.map((champion) => champion.damage.true))),
  }
  avgDamage.balance = 100 - Math.min(Math.abs(avgDamage.phys - avgDamage.magic), 100)

  const ratings = {
    engage: Math.round(average(selected.map((champion) => champion.ratings.engage))),
    frontline: Math.round(average(selected.map((champion) => champion.ratings.tankiness))),
    utility: Math.round(average(selected.map((champion) => champion.ratings.utility))),
    scaling: Math.round(average(selected.map((champion) => champion.ratings.carry))),
    mobility: Math.round(average(selected.map((champion) => champion.ratings.mobility))),
    waveclear: Math.round(average(selected.map((champion) => champion.ratings.waveclear))),
  }

  const synergyCombos = buildSynergyCombos(selected)
  const baseScore = Math.round(
    average([
      ratings.engage * 8,
      ratings.frontline * 8,
      ratings.utility * 7,
      ratings.scaling * 7,
      rolesCovered * 13,
      avgDamage.balance,
      Math.min(synergyCombos.reduce((sum, combo) => sum + combo.score, 0), 100),
    ]),
  )
  const score = clamp(baseScore, 25, 96)
  const tier = getScoreTier(score)
  const warnings = getDraftWarnings(selected, ratings, avgDamage)
  const ccCoverage = [...new Set(selected.flatMap((champion) => champion.cc))]

  return {
    savedAt: new Date().toISOString(),
    score,
    grade: tier.grade,
    summary: tier.summary,
    champions: draftIds.map((draftId) => selected.find((champion) => champion.id === draftId)).filter(Boolean),
    damage: avgDamage,
    ratings,
    combos: synergyCombos,
    warnings,
    ccCoverage,
  }
}

export function buildDraftShareText(snapshot) {
  return [
    `${snapshot.grade} • ${snapshot.score} Synergy`,
    `Champions: ${snapshot.champions.map((champion) => champion.name).join(', ')}`,
    `Summary: ${snapshot.summary}`,
    `Damage: ${snapshot.damage.phys}% Physical / ${snapshot.damage.magic}% Magic / ${snapshot.damage.true}% True`,
    `Saved: ${formatDraftTimestamp(snapshot.savedAt)}`,
  ].join('\n')
}
