import updateAhri from '../assets/images/update-ahri.jpg'
import updateZoe from '../assets/images/update-zoe.avif'
import updateMaster from '../assets/images/update-master.jpg'
import patchImage from '../assets/images/patch_upd.jpg'
import misaImage from '../assets/images/Demacia_Hall_Of_Valor.jpg'
import spiritImage from '../assets/images/spirit_blossom_festival.jpg'
import roadmapImage from '../assets/images/AurelionSol_0.jpg'
import rankedImage from '../assets/images/noxian-legion.png'
import masterYiQ from '../assets/images/Master_Yi_Alpha_Strike.png'
import masterYiPassive from '../assets/images/master_yi_passive.png'
import morganaQ from '../assets/images/MorganaQ.png'
import gravesQ from '../assets/images/GravesQLineSpell.png'
import heimerQ from '../assets/images/HeimerdingerQ.png'

export const newsData = [
  {
    id: 1,
    title: 'Special Costume for Faker!',
    category: 'New Costume',
    date: '14 April 2026',
    image: updateAhri,
    imagePosition: 'center 10%',
    teaser: 'Experience the legend with the latest skin dedicated to the Unkillable Demon King, complete with high-end splashes and event flavor.',
    subtitle: 'The spotlight bundle arrives with themed VFX, event missions and a prestige showcase made for the home teaser.',
    featuredOnHome: true,
    video: {
      title: 'Skin Showcase',
      url: 'https://www.youtube.com/watch?v=ZGZgrlVDhMM',
      caption: 'Hall Of Legends Ahri Showcase',
    },
    content: [
      "Celebrate the legacy of League's greatest player with an exclusive spotlight bundle.",
      'This special collection features a meticulously crafted skin that embodies the spirit of the T1 legend.',
      'The modal layout on this page is designed so each featured card can expand into a richer story without breaking the flow of the updates grid.',
    ],
  },
  {
    id: 2,
    title: 'Breath Taking Zoe Prestige',
    category: 'New Costume',
    date: '12 April 2026',
    image: updateZoe,
    teaser: 'Sparkle with elegance in the new Zoe Prestige Edition, featuring exclusive golden particle effects and polished ability visuals.',
    subtitle: 'A radiant skin release focused on celestial particles, dreamy recall animation and event-token rewards.',
    featuredOnHome: true,
    video: {
      title: 'Prestige Showcase',
      url: 'https://www.youtube.com/watch?v=Ilcy9_5pZRY',
      caption: 'Zoe Prestige Showcase',
    },
    content: [
      'The Aspect of Twilight has never looked more radiant. The Prestige Edition Zoe skin introduces a new standard for particle density and visual clarity, ensuring you stand out in every teamfight.',
      'Golden VFX bring extra identity to every Paddle Star and Sleepy Trouble Bubble cast.',
      'Players can follow a dedicated prestige track to earn event tokens, mythic essence and limited-edition cosmetics.',
      'This release will rotate through the Mythic Shop for a limited time.',
    ],
  },
  {
    id: 3,
    title: 'Good News for Master Yi Players',
    category: 'Balance Update',
    date: '09 April 2026',
    image: updateMaster,
    teaser: 'The Wuju Master is getting a focused quality-of-life pass with early jungle help and smoother responsiveness.',
    subtitle: 'A focused pass on responsiveness, jungle clear feel and a cleaner power curve for ranked play.',
    featuredOnHome: true,
    content: [
      'This update is built to make Master Yi more rewarding for skilled players while smoothing out his jungle pathing.',
      'Base durability has been nudged upward so early invades are less punishing.',
      'Alpha Strike gets better early access for objective control and faster clear routing.',
      'Meditate is now more rewarding when timed precisely into burst windows.',
    ],
    abilityChanges: [
      {
        champion: 'Master Yi',
        skill: 'Alpha Strike (Q)',
        image: masterYiQ,
        changes: [
          'Blinking updated for consistency when near walls (to avoid Master Yi reappearing on the other side of a jungle camp).',
        ],
      },
      {
        champion: 'Master Yi',
        skill: 'Wuju Style Passive',
        image: masterYiPassive,
        changes: [
          'On-hit modifier increased to 75% from 65%.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Patch 26.8 Notes',
    category: 'Patch Notes',
    date: '31 March 2026',
    image: patchImage,
    teaser: 'A larger gameplay patch featuring champion tuning, jungle pacing updates and a cleaner in-modal breakdown for individual skills.',
    subtitle: 'Champion tuning, jungle pacing and item follow-ups arrive in a larger gameplay patch.',
    featuredOnHome: false,
    content: [
      "In this week's patch we've got changes to some of the more powerful picks right now like Morgana and Graves while we're also helping out struggling champions like Heimerdinger.",
      "We've also got updates to ARAM, ARAM: Mayhem, and Arena, not to mention a bunch of skins coming to the Rift this patch.",
    ],
    bullets: [
      'Lane sustain and early push power were slightly reduced for safer blind-pick top laners.',
      'Dragon setup windows now reward earlier warding and more committed river control.',
      'Several core items received small cost and cooldown adjustments to smooth mid-game spikes.',
    ],
    abilityChanges: [
      {
        champion: 'Morgana',
        skill: 'Dark Binding (Q)',
        image: morganaQ,
        changes: [
          'Base cooldown lowered in early ranks to make pick windows more reliable.',
          'Missile width slightly increased for cleaner visual feedback on max range casts.',
        ],
      },
      {
        champion: 'Graves',
        skill: 'End of the Line (Q)',
        image: gravesQ,
        changes: [
          'Primary hit damage trimmed slightly to reduce early jungle burst.',
          'Return explosion damage increased later in the game to preserve high-skill payoff.',
        ],
      },
      {
        champion: 'Heimerdinger',
        skill: 'H-28G Evolution Turret (Q)',
        image: heimerQ,
        changes: [
          'Turret beam charge cadence improved when landing grenade stuns.',
          'Turret health growth adjusted so lane control stays strong without becoming oppressive.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Titans Clash: Misa Esports Dominates the Rift!',
    category: 'Esports',
    date: '26 March 2026',
    image: misaImage,
    teaser: 'The team-based tournament experience returns with refreshed rewards, clearer trophies and a cleaner weekend schedule.',
    subtitle: "The Match Breakdown: Misa's New Era",
    featuredOnHome: false,
    content: [
      'The battle for supremacy in the Championship League has reached a new fever pitch. Following the latest high-stakes showdown between Misa Esports and SuperMassive, the hierarchy of the Rift is being rewritten.',
      'In a highly anticipated BO3 series, Misa Esports showcased why they are currently the team to beat. Despite recent roster changes, the synergy between 113 and Köfte proved lethal.',
    ],
    video: {
      title: 'Esports Match Recap',
      url: 'https://www.youtube.com/watch?v=WNO6RR9FrNU',
      caption: 'PCF vs PHX — MISA vs SUP — GAMEON',
    },
  },
  {
    id: 6,
    title: 'Step Into the Spirit Realm: Arena Rotation Preview',
    category: 'Game Modes',
    date: '22 March 2026',
    image: spiritImage,
    teaser: 'Arena gets a new augment pool, updated map variants and a faster round cadence in the next rotation.',
    subtitle: "What's Changing?",
    featuredOnHome: false,
    content: [
      'A brand-new rotation is descending upon the Arena, bringing with it a mystical atmosphere and high-stakes combat.',
      "Whether you're a seasoned gladiator or a newcomer to the rings, prepare for a revitalized experience that blends magic with absolute mayhem.",
    ],
    bullets: [
      'Accelerated Match Pacing: Less downtime, more duels.',
      'Sharper Combat Spikes: Expect more explosive power shifts when you hit item and level thresholds.',
      'Fresh Augment Mix: A new pool of augments aimed at turning losing streaks into dominant victories.',
    ],
  },
  {
    id: 7,
    title: 'The Cosmos Aligns: Champion Roadmap - Summer 2026',
    category: 'Dev Update',
    date: '18 March 2026',
    image: roadmapImage,
    teaser: 'A seasonal roadmap covering new champion hints, VGU priorities and long-term developer goals.',
    subtitle: 'A seasonal roadmap covering upcoming champions, reworks and long-term gameplay priorities.',
    featuredOnHome: false,
    content: [
      'Two new champions are emerging from the stars and the depths of Runeterra, each bringing mechanics that will challenge your mastery.',
      'The cosmic dust is settling, and the constellations are shifting. The fate of the Rift is about to be reshaped by powers beyond mortal comprehension.',
      "Aurelion Sol (Cosmic Polish): Expect enhanced visual effects and minor tuning to his late-game scaling.",
      "Sivir (Tactical Refined): A mid-scope update focused on rewarding high-octane kiting and perfectly timed Spell Shields.",
    ],
    bullets: [
      'The Harbinger of Infinity: A high-skill cosmic mage capable of manipulating space-time.',
      'The Warden of the Eternal Grove: A primal skirmisher designed for the jungle with terrain-shaping tools.',
    ],
  },
  {
    id: 8,
    title: 'Conquer the Climb: Ranked Queue Adjustments',
    category: 'Competitive',
    date: '11 March 2026',
    image: rankedImage,
    teaser: 'Queue time tuning, role-balance improvements and player-experience updates are bundled into this competitive systems note.',
    subtitle: 'Queue health changes aim to reduce wait times while keeping match quality stable across ranks.',
    featuredOnHome: false,
    content: [
      "We're rolling out targeted updates to Ranked Queue so the climb from Bronze to Challenger is defined by skill, fair play and faster action.",
      'This update focuses on protecting competitive integrity while also respecting player time.',
    ],
    bullets: [
      'High-Elo Precision: Master+ queues see fewer autofill moments during peak hours.',
      'Loss Mitigation: LP mitigation is being refined for games impacted by AFKs and early leavers.',
      'Player Impact Sections: Added clearer communication for how system changes affect each rank and region.',
    ],
  },
]

export const cardsPerPage = 6
