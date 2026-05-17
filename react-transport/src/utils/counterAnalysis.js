import { fetchChampionPool } from './draftAnalysis.js'

const counterRunes = {
  tank: {
    keystone: 'Grasp of the Undying',
    primary: ['Demolish', 'Bone Plating', 'Unflinching'],
    secondary: ['Conditioning', 'Overgrowth'],
  },
  fighter: {
    keystone: 'Conqueror',
    primary: ['Triumph', 'Legend: Tenacity', 'Last Stand'],
    secondary: ['Bone Plating', 'Revitalize'],
  },
  mage: {
    keystone: 'Phase Rush',
    primary: ['Manaflow Band', 'Transcendence', 'Scorch'],
    secondary: ['Bone Plating', 'Conditioning'],
  },
  assassin: {
    keystone: 'Electrocute',
    primary: ['Sudden Impact', 'Eyeball Collection', 'Treasure Hunter'],
    secondary: ['Bone Plating', 'Unflinching'],
  },
  marksman: {
    keystone: 'Lethal Tempo',
    primary: ['Presence of Mind', 'Legend: Bloodline', 'Cut Down'],
    secondary: ['Bone Plating', 'Revitalize'],
  },
  support: {
    keystone: 'Glacial Augment',
    primary: ['Hextech Flashtraption', 'Biscuit Delivery', 'Cosmic Insight'],
    secondary: ['Bone Plating', 'Revitalize'],
  },
  specialist: {
    keystone: 'First Strike',
    primary: ['Magical Footwear', 'Biscuit Delivery', 'Cosmic Insight'],
    secondary: ['Bone Plating', 'Overgrowth'],
  },
  vsCC: {
    keystone: 'Fleet Footwork',
    primary: ['Presence of Mind', 'Legend: Tenacity', 'Coup de Grace'],
    secondary: ['Second Wind', 'Unflinching'],
  },
  vsAssassin: {
    keystone: 'Phase Rush',
    primary: ['Nimbus Cloak', 'Transcendence', 'Scorch'],
    secondary: ['Bone Plating', 'Overgrowth'],
  },
}

const championProfiles = {
  Malphite: {
    threats: [
      'Unstoppable Force can start a full fight instantly.',
      'He is difficult to burn down once armor stacks start coming in.',
      'His magic-heavy burst can punish teams that only itemize armor.',
    ],
    weaknesses: [
      'Low mobility makes him kiteable after the first engage.',
      'He can be punished through side-lane pressure and spacing.',
    ],
  },
  Yasuo: {
    threats: [
      'Airborne setups turn into massive Last Breath punish windows.',
      'He snowballs hard when fights stay messy and extended.',
      'Wind Wall can delete the impact of key projectiles.',
    ],
    weaknesses: [
      'Armor and point-and-click crowd control reduce his freedom a lot.',
      'He is much easier to punish before he gets tempo.',
    ],
  },
  Yone: {
    threats: [
      'He threatens both backline access and mixed damage.',
      'Soul Unbound gives him deceptively safe pressure windows.',
      'AoE engage from Fate Sealed can flip a full teamfight.',
    ],
    weaknesses: [
      'He is punishable when snapping back after E.',
      'He is weaker before his major item spikes arrive.',
    ],
  },
  Ahri: {
    threats: [
      'Charm can turn one mistake into a lost skirmish.',
      'Her burst can erase squishy targets quickly.',
      'Triple dash mobility makes her hard to pin down.',
    ],
    weaknesses: [
      'Much of her pressure depends on landing Charm.',
      'Spell shields and disciplined spacing lower her pick threat.',
    ],
  },
  Lux: {
    threats: [
      'Long-range pick tools create dangerous objective setups.',
      'Full combo burst can one-shot fragile carries.',
      'Her ult keeps pressure high even from very long range.',
    ],
    weaknesses: [
      'She has almost no mobility when forced on defense.',
      'Missing her skillshots removes a lot of immediate threat.',
    ],
  },
  Jinx: {
    threats: [
      'A single reset can let her take over an entire fight.',
      'Her objective DPS and cleanup potential are extremely high.',
      'Waveclear makes sieges and lane pressure safer for her team.',
    ],
    weaknesses: [
      'Hard engage and dive still punish her limited mobility.',
      'She is vulnerable before she can fully set up front-to-back fights.',
    ],
  },
  MissFortune: {
    threats: [
      'Bullet Time can decide a fight if your team is locked down.',
      'Her lane poke and early skirmish damage are oppressive.',
      'AoE follow-up makes clustered fights dangerous.',
    ],
    weaknesses: [
      'She has no true dash when a dive reaches her.',
      'Interrupts and hard engage lower the value of her ultimate.',
    ],
  },
  Thresh: {
    threats: [
      'Hook angles can create picks from outside vision.',
      'Lantern can rescue an ally and reset a fight instantly.',
      'He offers both engage and peel in the same draft.',
    ],
    weaknesses: [
      'Missing hook removes a lot of his tempo.',
      'He contributes limited damage on his own.',
    ],
  },
  Leona: {
    threats: [
      'Layered hard CC makes her engage one of the cleanest in the game.',
      'She can absorb a lot while starting fights.',
      'Bot-lane all-ins become very threatening around her cooldowns.',
    ],
    weaknesses: [
      'She gives less peel than many other supports.',
      'Failed engages leave her team with limited flexibility.',
    ],
  },
  Vi: {
    threats: [
      'Her ultimate guarantees access to a priority target.',
      'She can force fights before carries are ready.',
      'Pick pressure stays high around fog and flanks.',
    ],
    weaknesses: [
      'QSS and peel tools blunt her strongest pattern.',
      'Once committed, she can be kited and isolated.',
    ],
  },
  Zed: {
    threats: [
      'Death Mark can delete a carry through a short mistake.',
      'Shadow angles create pressure even before full commit.',
      'He punishes side lanes and isolated targets well.',
    ],
    weaknesses: [
      'Armor and stasis effects reduce his payoff heavily.',
      'Coordinated CC gives him very little room to play.',
    ],
  },
}

const ccLabels = {
  knockup: 'Knock-Up',
  knockback: 'Knockback',
  stun: 'Stun',
  snare: 'Root',
  root: 'Root',
  slow: 'Slow',
  charm: 'Charm',
  silence: 'Silence',
  hook: 'Hook',
  suppress: 'Suppress',
  fear: 'Fear',
  taunt: 'Taunt',
  pull: 'Pull',
  flay: 'Flay',
}

function average(values) {
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))]
}

function titleCase(value) {
  return String(value || '')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getChampionProfile(champion) {
  if (championProfiles[champion.id]) {
    return championProfiles[champion.id]
  }

  const threats = []
  const weaknesses = []
  const carry = champion.ratings?.carry || 0
  const engage = champion.ratings?.engage || 0
  const tankiness = champion.ratings?.tankiness || 0
  const mobility = champion.ratings?.mobility || 0
  const utility = champion.ratings?.utility || 0
  const split = champion.ratings?.split || 0
  const waveclear = champion.ratings?.waveclear || 0

  if (engage >= 8) threats.push('This champion starts fights very reliably and can punish poor spacing.')
  if (carry >= 8) threats.push('High carry potential means they can take over extended fights quickly.')
  if (mobility >= 8) threats.push('High mobility makes them difficult to trap or finish off cleanly.')
  if (tankiness >= 8) threats.push('Their durability can stall fights and buy time for allied carries.')
  if (utility >= 8) threats.push('Strong utility tools let them shape fights without needing huge gold leads.')
  if (split >= 7) threats.push('They can pressure side lanes and force map decisions constantly.')

  if (mobility <= 2) weaknesses.push('Low mobility makes them easier to punish with layered CC.')
  if (tankiness <= 2) weaknesses.push('Burst windows matter a lot because their durability is limited.')
  if ((champion.ratings?.peel || 0) <= 2) weaknesses.push('They give limited peel when your team reaches the backline.')
  if (waveclear <= 3) weaknesses.push('Waveclear is weak enough that side pressure can become awkward for them.')
  if (engage <= 2) weaknesses.push('They depend more on reaction than on forcing clean starts.')

  return {
    threats: threats.length ? threats : ['This champion still creates threat through role pressure and matchup execution.'],
    weaknesses: weaknesses.length ? weaknesses : ['No obvious weakness stands out yet, so matchup execution matters more.'],
  }
}

function buildThreatCombos(team) {
  const combos = []

  for (let index = 0; index < team.length; index += 1) {
    for (let innerIndex = index + 1; innerIndex < team.length; innerIndex += 1) {
      const left = team[index]
      const right = team[innerIndex]
      let score = 0
      let reason = ''

      if (left.class === 'tank' && ['marksman', 'mage'].includes(right.class)) {
        score = 20
        reason = `${left.name} creates a stable engage window for ${right.name} to unload damage.`
      } else if (right.class === 'tank' && ['marksman', 'mage'].includes(left.class)) {
        score = 20
        reason = `${right.name} creates a stable engage window for ${left.name} to unload damage.`
      } else if (left.class === 'support' && right.class === 'marksman') {
        score = 22
        reason = `${left.name} can front-load setup and protection for ${right.name}.`
      } else if (right.class === 'support' && left.class === 'marksman') {
        score = 22
        reason = `${right.name} can front-load setup and protection for ${left.name}.`
      } else if (left.tags?.includes('engage') && right.tags?.includes('carry')) {
        score = 18
        reason = `${left.name} creates hard commit windows that ${right.name} can exploit.`
      } else if (right.tags?.includes('engage') && left.tags?.includes('carry')) {
        score = 18
        reason = `${right.name} creates hard commit windows that ${left.name} can exploit.`
      } else if (left.tags?.includes('poke') && right.tags?.includes('pick')) {
        score = 15
        reason = `${left.name} softens targets while ${right.name} threatens the actual catch.`
      } else if (right.tags?.includes('poke') && left.tags?.includes('pick')) {
        score = 15
        reason = `${right.name} softens targets while ${left.name} threatens the actual catch.`
      }

      if (score > 0) {
        combos.push({
          pair: `${left.id}-${right.id}`,
          names: [left.name, right.name],
          score,
          reason,
          images: [left.image, right.image],
        })
      }
    }
  }

  return combos.sort((left, right) => right.score - left.score).slice(0, 6)
}

function getCounterItems(champion) {
  const items = []
  const magicDamage = champion.damage?.magic || 0
  const physicalDamage = champion.damage?.phys || 0

  if (champion.tags?.includes('sustain') || ['Aatrox', 'Fiora', 'Garen', 'Darius', 'Warwick', 'Vladimir'].includes(champion.id)) {
    items.push({ icon: 'GH', name: 'Grievous Wounds', type: 'core', reason: `Cut ${champion.name}'s sustain before longer fights start.` })
  }

  if (champion.class === 'tank' || (champion.ratings?.tankiness || 0) >= 8) {
    items.push({ icon: 'BOTRK', name: 'Blade of the Ruined King', type: 'core', reason: `Current-health damage stays valuable into ${champion.name}.` })
    items.push({ icon: 'LDR', name: "Lord Dominik's Regards", type: 'core', reason: 'Armor penetration matters much more into this frontline.' })
    items.push({ icon: 'LIA', name: "Liandry's Anguish", type: 'core', reason: 'Burn damage is excellent when the enemy wants longer fights.' })
  }

  if (magicDamage > 60) {
    items.push({ icon: 'MR', name: "Banshee's Veil", type: 'core', reason: `Spell shield helps absorb ${champion.name}'s opening burst.` })
    items.push({ icon: 'FON', name: 'Force of Nature', type: 'situational', reason: 'Reliable magic resistance for repeated AP pressure.' })
    items.push({ icon: 'MERC', name: "Mercury's Treads", type: 'core', reason: 'Tenacity plus MR is efficient into magic-heavy threats.' })
  }

  if (physicalDamage > 60) {
    items.push({ icon: 'ARM', name: 'Thornmail', type: 'core', reason: `Efficient armor and anti-heal value into ${champion.name}.` })
    items.push({ icon: 'FH', name: 'Frozen Heart', type: 'core', reason: 'Armor plus attack-speed reduction punishes AD-centric patterns.' })
    items.push({ icon: 'STEEL', name: 'Plated Steelcaps', type: 'situational', reason: 'Strong value when the damage pattern is auto-attack heavy.' })
  }

  if (champion.class === 'assassin' || ((champion.ratings?.engage || 0) >= 7 && (champion.ratings?.tankiness || 0) <= 3)) {
    items.push({ icon: 'ZH', name: "Zhonya's Hourglass", type: 'core', reason: `Stasis can deny the all-in payoff from ${champion.name}.` })
    items.push({ icon: 'GA', name: 'Guardian Angel', type: 'core', reason: 'Second-life effects reduce the punish value of assassin dives.' })
    items.push({ icon: 'STER', name: "Sterak's Gage", type: 'situational', reason: 'Shielded durability helps survive burst windows.' })
  }

  if (champion.cc?.some((cc) => ['stun', 'knockup', 'snare', 'root', 'suppress', 'fear', 'taunt'].includes(cc))) {
    items.push({ icon: 'TEN', name: 'Tenacity Options', type: 'situational', reason: `Reduce the lockout created by ${champion.name}'s crowd control.` })
  }

  if ((champion.ratings?.mobility || 0) >= 7) {
    items.push({ icon: 'SLOW', name: "Rylai's Crystal Scepter", type: 'situational', reason: `Extra slows help limit ${champion.name}'s repositioning.` })
  }

  if ((champion.ratings?.split || 0) >= 7) {
    items.push({ icon: 'TP', name: 'Teleport + Vision', type: 'situational', reason: `Answer ${champion.name}'s side-lane pressure with map coverage.` })
  }

  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item.name)) return false
    seen.add(item.name)
    return true
  }).slice(0, 5)
}

function getStrategyCards(team, ratings, damage, hasCC) {
  const cards = []
  const engage = ratings.engage >= 7
  const tankiness = ratings.tankiness >= 7
  const carry = ratings.carry >= 7
  const mobility = ratings.mobility >= 7
  const layeredCC = hasCC.stun && (hasCC.knockup || hasCC.snare || hasCC.root)

  cards.push({
    cls: 'phase-early',
    icon: 'EARLY',
    title: 'Early Game (1-15 min)',
    desc: engage
      ? 'The enemy can force fights early. Respect fog, cover river entrances, and avoid giving over easy 2v2 or 3v3 windows.'
      : 'This draft likely wants time. Use lane priority, invades, and early objective setups to pressure before scaling kicks in.',
  })

  cards.push({
    cls: 'phase-mid',
    icon: 'MID',
    title: 'Mid Game (15-30 min)',
    desc: layeredCC
      ? 'Layered crowd control makes grouped fights dangerous. Buy tenacity, hold spacing, and avoid blind face-checks.'
      : 'Do not give free map tempo. Force them to answer side pressure before you commit to central fights.',
  })

  cards.push({
    cls: 'phase-late',
    icon: 'LATE',
    title: 'Late Game (30+ min)',
    desc: carry && !tankiness
      ? 'Their carries are scary, but the frontline is softer. Dive or flank the damage dealers before front-to-back becomes comfortable.'
      : tankiness
        ? 'A thicker frontline means patience matters. Let them commit first or strain them through side lanes and vision traps.'
        : 'Their structure is punishable. If you control vision and objective timing, you can dictate how the late game is played.',
  })

  if (hasCC.suppress) {
    cards.push({
      cls: 'tip',
      icon: 'QSS',
      title: 'Suppress Warning',
      desc: 'Point-and-click suppress effects raise the value of QSS and disciplined peel immediately.',
    })
  }

  if (mobility) {
    cards.push({
      cls: 'tip',
      icon: 'MOB',
      title: 'Versus Mobile Teams',
      desc: 'Prefer chokes, slows, and short decision windows. Open-space chases usually favor them.',
    })
  }

  if (damage.magic >= 70) {
    cards.push({
      cls: 'tip',
      icon: 'AP',
      title: 'Versus Heavy AP',
      desc: `They lean ${damage.magic}% magic damage. Early MR across the team returns high value.`,
    })
  }

  if (damage.phys >= 70) {
    cards.push({
      cls: 'tip',
      icon: 'AD',
      title: 'Versus Heavy AD',
      desc: `They lean ${damage.phys}% physical damage. Armor stacking and anti-auto tech become efficient quickly.`,
    })
  }

  if (ratings.split >= 7) {
    cards.push({
      cls: 'tip',
      icon: 'SPLIT',
      title: 'Split Push Threat',
      desc: 'Maintain side vision and answer long side-lane pressure before starting neutral objectives.',
    })
  }

  return cards
}

function getRuneGroups(team, hasCC) {
  const groups = []
  const seen = new Set()
  const assassinPresent = team.some((champion) => champion.class === 'assassin')
  const heavyCC = hasCC.stun || hasCC.knockup || hasCC.snare || hasCC.root || hasCC.suppress

  team.forEach((champion) => {
    const preset =
      heavyCC && ['mage', 'marksman'].includes(champion.class)
        ? 'vsCC'
        : assassinPresent && ['mage', 'marksman'].includes(champion.class)
          ? 'vsAssassin'
          : champion.class

    if (seen.has(preset)) return
    seen.add(preset)

    groups.push({
      championName: champion.name,
      runes: counterRunes[preset] || counterRunes.fighter,
    })
  })

  return groups
}

function buildThreatGrade(score) {
  if (score >= 80) {
    return {
      label: 'Deadly Threat',
      subtitle: 'This enemy draft can start and finish fights cleanly. Counter itemization and spacing matter a lot.',
    }
  }

  if (score >= 65) {
    return {
      label: 'High Threat',
      subtitle: 'A powerful composition with real punish tools. Respect vision and engage ranges.',
    }
  }

  if (score >= 50) {
    return {
      label: 'Medium Threat',
      subtitle: 'This team is balanced enough to punish mistakes, but still leaves openings.',
    }
  }

  if (score >= 35) {
    return {
      label: 'Low Threat',
      subtitle: 'A manageable draft. If you stay disciplined, you can usually dictate the pace.',
    }
  }

  return {
    label: 'Minor Threat',
    subtitle: 'This composition is punishable if you do not hand over free engages or scaling.',
  }
}

function buildAnalysis(team, ratings, damage, hasCC) {
  const weaknesses = []
  const strengths = []
  const classes = team.map((champion) => champion.class)

  team.forEach((champion) => {
    const profile = getChampionProfile(champion)

    profile.threats.slice(0, 3).forEach((threat) => {
      strengths.push({
        type: (champion.ratings?.carry || 0) >= 8 || (champion.ratings?.engage || 0) >= 8 ? 'crit' : 'warn',
        icon: 'THR',
        title: `${champion.name} Threat`,
        desc: threat,
      })
    })

    profile.weaknesses.slice(0, 2).forEach((weakness) => {
      weaknesses.push({
        type: 'ok',
        icon: 'PUN',
        title: `${champion.name} Weakness`,
        desc: weakness,
      })
    })
  })

  if (team.length >= 2) {
    if (ratings.tankiness < 3) {
      weaknesses.push({
        type: 'ok',
        icon: 'FRONT',
        title: 'No Frontline',
        desc: 'The enemy team lacks a true tank backbone, so decisive dive and burst windows become easier to find.',
      })
    }

    if (ratings.mobility < 3) {
      weaknesses.push({
        type: 'ok',
        icon: 'SLOW',
        title: 'Low Mobility',
        desc: 'A slower composition is easier to trap in corridors, chain-CC, and force into bad terrain.',
      })
    }

    if (ratings.waveclear < 3) {
      weaknesses.push({
        type: 'ok',
        icon: 'WAVE',
        title: 'Weak Waveclear',
        desc: 'They can struggle to answer side pressure and repeated shove patterns.',
      })
    }

    if (!classes.includes('support')) {
      weaknesses.push({
        type: 'ok',
        icon: 'PEEL',
        title: 'Thin Protection Layer',
        desc: 'Without a dedicated support-style anchor, their carry protection can crack under direct pressure.',
      })
    }

    if (ratings.peel < 3) {
      weaknesses.push({
        type: 'ok',
        icon: 'BACK',
        title: 'Weak Peel',
        desc: 'Reaching the backline should feel more realistic if your entry timing is coordinated.',
      })
    }

    if (damage.phys >= 80) {
      weaknesses.push({
        type: 'ok',
        icon: 'ARM',
        title: 'Almost Full Physical Damage',
        desc: `They deal ${damage.phys}% physical damage. Armor-heavy answers become much more efficient.`,
      })
    }

    if (damage.magic >= 80) {
      weaknesses.push({
        type: 'ok',
        icon: 'MR',
        title: 'Almost Full Magic Damage',
        desc: `They deal ${damage.magic}% magic damage. MR itemization gains a lot of value.`,
      })
    }

    if (!hasCC.stun && !hasCC.knockup && !hasCC.snare && !hasCC.root) {
      weaknesses.push({
        type: 'ok',
        icon: 'CC',
        title: 'Low Hard CC',
        desc: 'A lack of reliable lockdown lets you play more aggressively around spacing and mechanics.',
      })
    }

    if (ratings.engage >= 8) {
      strengths.push({
        type: 'crit',
        icon: 'ENG',
        title: 'Extremely Strong Team Engage',
        desc: 'They can start fights quickly and decisively. Vision control and formation discipline are critical.',
      })
    }

    if (ratings.carry >= 8) {
      strengths.push({
        type: 'crit',
        icon: 'DMG',
        title: 'High-Damage Carries',
        desc: 'Their carries can end fights fast if left untouched. Pressure and target access matter.',
      })
    }

    if (ratings.tankiness >= 8) {
      strengths.push({
        type: 'warn',
        icon: 'TANK',
        title: 'Durable Frontline',
        desc: 'A thick frontline raises the value of anti-tank damage and layered target access.',
      })
    }

    if (hasCC.suppress) {
      strengths.push({
        type: 'crit',
        icon: 'QSS',
        title: 'Suppress Threat',
        desc: 'Point-and-click suppress effects force cleaner defensive itemization and peel timing.',
      })
    }

    if ((hasCC.knockup || hasCC.stun || hasCC.snare || hasCC.root) && ratings.engage >= 7) {
      strengths.push({
        type: 'crit',
        icon: 'LOCK',
        title: 'Heavy Crowd Control',
        desc: 'They combine engage with reliable lockdown. Tenacity and spacing become premium.',
      })
    }

    if (ratings.mobility >= 7) {
      strengths.push({
        type: 'warn',
        icon: 'MOB',
        title: 'Highly Mobile Team',
        desc: 'This composition repositions quickly, so slows and point-and-click control rise in value.',
      })
    }

    if (damage.true >= 15) {
      strengths.push({
        type: 'warn',
        icon: 'TRUE',
        title: 'True Damage Threat',
        desc: `They deal ${damage.true}% true damage. Raw resist stacking will not answer that portion.`,
      })
    }

    if (team.some((champion) => champion.tags?.includes('hypercarry'))) {
      strengths.push({
        type: 'crit',
        icon: 'HC',
        title: 'Hypercarry Presence',
        desc: 'At least one enemy scales into a serious late-fight win condition if left comfortable.',
      })
    }

    if (ratings.split >= 7) {
      strengths.push({
        type: 'warn',
        icon: 'SIDE',
        title: 'Strong Split Push',
        desc: 'They can pull pressure side-lane and distort objective timings if untracked.',
      })
    }

    if (ratings.utility >= 8) {
      strengths.push({
        type: 'warn',
        icon: 'UTIL',
        title: 'High Utility Composition',
        desc: 'Strong shields, setup, zoning, or peel can make direct front-to-back fights more awkward.',
      })
    }
  }

  return { weaknesses, strengths }
}

function normalizeThreatScore(team, ratings, damage) {
  let score = 0
  score += ratings.engage * 4
  score += ratings.carry * 5
  score += ratings.tankiness * 3
  score += ratings.mobility * 2

  if (damage.phys > 70 || damage.magic > 70) score += 10
  if (ratings.engage > 7 && ratings.carry > 7) score += 15
  if (team.some((champion) => champion.class === 'assassin')) score += 6
  if (team.some((champion) => champion.tags?.includes('hypercarry'))) score += 8

  return Math.min(Math.round(score), 100)
}

export async function fetchCounterChampionPool() {
  return fetchChampionPool()
}

export function getCounterClassOptions(championPool) {
  return uniq(championPool.map((champion) => champion.class)).sort()
}

export function getCcTypeList(team) {
  return uniq(team.flatMap((champion) => champion.cc || []))
}

export function getThreatScore(champion) {
  return Math.round(
    average([
      champion.ratings?.carry || 0,
      champion.ratings?.engage || 0,
      champion.ratings?.mobility || 0,
    ]),
  )
}

export function getThreatBadgeClass(score) {
  if (score >= 7) return 'high'
  if (score >= 4) return 'mid'
  return 'low'
}

export function getCounterAnalyzerState(team) {
  if (!team.length) {
    return null
  }

  const damageBase = {
    phys: Math.round(average(team.map((champion) => champion.damage?.phys || 0))),
    magic: Math.round(average(team.map((champion) => champion.damage?.magic || 0))),
    true: Math.round(average(team.map((champion) => champion.damage?.true || 0))),
  }
  const totalDamage = Math.max(damageBase.phys + damageBase.magic + damageBase.true, 1)
  const damage = {
    phys: Math.round((damageBase.phys / totalDamage) * 100),
    magic: Math.round((damageBase.magic / totalDamage) * 100),
    true: Math.round((damageBase.true / totalDamage) * 100),
  }

  const ratings = {
    engage: Number(average(team.map((champion) => champion.ratings?.engage || 0)).toFixed(1)),
    carry: Number(average(team.map((champion) => champion.ratings?.carry || 0)).toFixed(1)),
    tankiness: Number(average(team.map((champion) => champion.ratings?.tankiness || 0)).toFixed(1)),
    mobility: Number(average(team.map((champion) => champion.ratings?.mobility || 0)).toFixed(1)),
    waveclear: Number(average(team.map((champion) => champion.ratings?.waveclear || 0)).toFixed(1)),
    peel: Number(average(team.map((champion) => champion.ratings?.peel || 0)).toFixed(1)),
    utility: Number(average(team.map((champion) => champion.ratings?.utility || 0)).toFixed(1)),
    split: Number(average(team.map((champion) => champion.ratings?.split || 0)).toFixed(1)),
  }

  const hasCC = {}
  const ccTypes = getCcTypeList(team)
  ccTypes.forEach((cc) => {
    hasCC[cc] = true
  })

  const threatScore = normalizeThreatScore(team, ratings, damage)
  const threatGrade = buildThreatGrade(threatScore)
  const threatCombos = buildThreatCombos(team)
  const { weaknesses, strengths } = buildAnalysis(team, ratings, damage, hasCC)

  return {
    damage,
    ratings,
    ccSummary: Object.entries(ccLabels).map(([key, label]) => ({
      key,
      label,
      active: Boolean(hasCC[key]),
    })),
    threatScore,
    threatGrade,
    threatCombos,
    weaknesses,
    strengths,
    itemBuilds: team.map((champion) => ({
      champion,
      items: getCounterItems(champion),
    })),
    strategyCards: getStrategyCards(team, ratings, damage, hasCC),
    runeGroups: getRuneGroups(team, hasCC),
  }
}

export function getCounterClassesLabel(value) {
  return titleCase(value)
}
