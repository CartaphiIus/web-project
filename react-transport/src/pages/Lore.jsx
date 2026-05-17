import { useMemo, useState } from 'react'
import './Lore.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

import runeterraMap from '../assets/images/Runeterra Map.png'
import demaciaHall from '../assets/images/Demacia_Hall_Of_Valor.jpg'
import garenImage from '../assets/images/Garen_0.jpg'
import luxImage from '../assets/images/Lux_0.jpg'
import jarvanImage from '../assets/images/JarvanIV_0.jpg'
import demacianArmyImage from '../assets/images/demacian-army.jpg'
import sylasImage from '../assets/images/Sylas_0.jpg'
import shurimaImage from '../assets/images/500px-Shurima_Risen_From_The_Sands_02.jpg'
import azirImage from '../assets/images/Azir_0.jpg'
import nasusImage from '../assets/images/Nasus_0.jpg'
import renektonImage from '../assets/images/Renekton_0.jpg'
import desertRuinsImage from '../assets/images/desert-ruins.jpg'
import xerathImage from '../assets/images/Xerath_0.jpg'
import piltoverImage from '../assets/images/hextech.jpg'
import jinxImage from '../assets/images/Jinx_0.jpg'
import viImage from '../assets/images/Vi_0.jpg'
import jayceImage from '../assets/images/Jayce_0.jpg'
import caitlynImage from '../assets/images/Caitlyn_0.jpg'
import noxusImage from '../assets/images/Noxus_The_Immortal_Bastion_01.jpg'
import dariusImage from '../assets/images/Darius_0.jpg'
import swainImage from '../assets/images/Swain_0.jpg'
import dravenImage from '../assets/images/Draven_0.jpg'
import katarinaImage from '../assets/images/Katarina_0.jpg'
import noxianLegionImage from '../assets/images/noxian-legion.png'
import spiritBlossomPromoImage from '../assets/images/498px-2025_Season_2_Promo_01.png'
import yasuoImage from '../assets/images/Yasuo_0.jpg'
import ahriImage from '../assets/images/ahri.avif'
import ireliaImage from '../assets/images/Irelia_0.jpg'
import ancientTempleImage from '../assets/images/ancient-temple.jpg'
import zedImage from '../assets/images/zed.avif'
import freljordImage from '../assets/images/Freljord_Pilgrim_Site_Of_Rakelstake.jpg'
import asheImage from '../assets/images/ASHE.avif'
import lissandraImage from '../assets/images/Lissandra_0.jpg'
import sejuaniImage from '../assets/images/Sejuani_0.jpg'
import howlingAbyssImage from '../assets/images/Howling_Abyss_Landscape.png'
import braumImage from '../assets/images/Braum_0.jpg'
import bilgewaterImage from '../assets/images/Bilgewater_A_New_Beginning.jpg'
import gangplankImage from '../assets/images/Gangplank_0.jpg'
import missFortuneImage from '../assets/images/MissFortune_0.jpg'
import nautilusImage from '../assets/images/Nautilus_0.jpg'
import gravesImage from '../assets/images/Graves_0.jpg'
import shadowIslesImage from '../assets/images/black-mist.jpg'
import threshImage from '../assets/images/Thresh_0.jpg'
import viegoImage from '../assets/images/Viego_0.jpg'
import karthusImage from '../assets/images/Karthus_0.jpg'
import hecarimImage from '../assets/images/Hecarim_0.jpg'
import ruinedTempleImage from '../assets/images/ruined-temple.jpg'
import targonImage from '../assets/images/targon-mount.jpg'
import pantheonImage from '../assets/images/Pantheon_0.jpg'
import aurelionImage from '../assets/images/AurelionSol_0.jpg'
import leonaImage from '../assets/images/Leona_0.jpg'
import dianaImage from '../assets/images/Diana_0.jpg'
import celestialRealmImage from '../assets/images/celestial-realm.jpg'
import voidImage from '../assets/images/the-void.jpg'
import kaisaImage from '../assets/images/Kaisa_0.jpg'
import kassadinImage from '../assets/images/Kassadin_0.jpg'
import kogMawImage from '../assets/images/kog-maw.jpg'
import velkozImage from '../assets/images/Velkoz_0.jpg'
import ruinsIcathiaImage from '../assets/images/ruins-icathşa.jpg'
import zaunImage from '../assets/images/Zaun_Arcane_01.jpg'
import ekkoImage from '../assets/images/Ekko_0.jpg'
import warwickImage from '../assets/images/Warwick_0.jpg'
import singedImage from '../assets/images/Singed_0.jpg'
import zaunNeonImage from '../assets/images/zaun-arcane-undercity.png'
import ixtalImage from '../assets/images/ixtal-jungle.jpg'
import qiyanaImage from '../assets/images/Qiyana_0.jpg'
import nidaleeImage from '../assets/images/Nidalee_0.jpg'
import zyraImage from '../assets/images/Zyra_0.jpg'
import ixtalRuinsImage from '../assets/images/ixtal-ruins.jpg'
import rengarImage from '../assets/images/Rengar_0.jpg'
import bandleImage from '../assets/images/bandle-city,.png'
import teemoImage from '../assets/images/Teemo_0.jpg'
import luluImage from '../assets/images/Lulu_0.jpg'
import tristanaImage from '../assets/images/Tristana_0.jpg'
import yordleRealmImage from '../assets/images/the-yordle-realm.jpg'
import heimerdingerImage from '../assets/images/Heimerdinger_0.jpg'

const regions = [
  {
    id: 'demacia',
    name: 'DEMACIA',
    code: 'DM',
    icon: '⚔',
    subtitle: 'Kingdom of Justice',
    tagline: 'Kingdom of Justice & Honor',
    quote: '"Demacia stands not because of magic, but in spite of it. Our walls are built with courage, our laws with sacrifice."',
    images: [
      { src: garenImage, label: 'Garen - The Might of Demacia', position: '80% center' },
      { src: demaciaHall, label: 'The Great City' },
      { src: luxImage, label: 'Lux - The Lady of Luminosity', position: '70% center' },
    ],
    rightImages: [
      { src: jarvanImage, label: 'Jarvan IV - The Exemplar', position: '70% center' },
      { src: demacianArmyImage, label: 'Demacian Army' },
      { src: sylasImage, label: 'Sylas - The Unshackled' },
    ],
    body: [
      'Demacia is a powerful, lawful kingdom with a strict moral code and a long history of military excellence. Founded in the aftermath of the Rune Wars, its citizens long ago learned to be wary of magic, viewing it with fear and suspicion.',
      'Surrounded by towering mountains and dense forests, Demacia grew as an isolated kingdom that valued its independence from outside influences. Its people are known for their stoic discipline, self-reliance, and strong sense of civic duty - virtues that have allowed the kingdom to survive and thrive for centuries.',
      'The kingdom is ruled by a proud and noble royal family, supported by an elite fighting force known as the Demacian military. These soldiers train from youth, forging themselves into warriors capable of defending their homeland against any threat - be it the armies of Noxus, the creatures of the Void, or the dangers of wild magic.',
      'Yet beneath the gleaming white stone walls and golden banners, a silent tension grows. Magic has never truly been absent from Demacia - it has only been hidden. Those born with magical abilities face a grim choice: suppress their gifts or face imprisonment in the Mageseekers dark facilities. As more mages begin to resist, the foundations of Demacian society are tested like never before.',
    ],
    champions: ['Garen', 'Lux', 'Jarvan IV', 'Fiora', 'Poppy', 'Sylas'],
  },
  {
    id: 'shurima',
    name: 'SHURIMA',
    code: 'SH',
    icon: '☀',
    subtitle: 'Empire of the Sun',
    tagline: 'Empire of the Eternal Sun',
    quote: '"Shurima! Your emperor has returned!" - Azir',
    images: [
      { src: azirImage, label: 'Azir - Emperor of the Sands', position: '90% center' },
      { src: shurimaImage, label: 'The Great Pyramid' },
      { src: nasusImage, label: 'Nasus - The Curator', position: '70% center' },
    ],
    rightImages: [
      { src: renektonImage, label: 'Renekton - Butcher of the Sands', position: '70% center' },
      { src: desertRuinsImage, label: 'Desert Ruins' },
      { src: xerathImage, label: 'Xerath - The Magus Ascendant' },
    ],
    body: [
      'Shurima is a vast continent and a former empire of immense power, now largely a desert wasteland dotted with ruins that speak of its ancient glory. Once the greatest civilization the world had ever seen, Shurima fell thousands of years ago in a cataclysmic event that shattered its empire and scattered its people.',
      'At its height, the Shuriman Empire stretched across much of the known world, its cities gleaming with golden towers and its armies led by legendary Ascended warriors - god-warriors empowered by the light of the sun itself. Its scholars and mages pushed the boundaries of knowledge, creating wonders that still baffle modern understanding.',
      'But pride and betrayal brought ruin. When Emperor Azir attempted the Ascension ritual for himself rather than the champion Xerath, the Ascension went catastrophically wrong. Xerath seized the moment - shattering the sun disc, killing the emperor, and reducing the magnificent capital to dust in an instant.',
      'Today, the desert hides ancient tombs, lost treasures, and slumbering horrors. Wandering tribes survive in the harsh wastes, while treasure hunters brave the ruins. And in those ruins, something ancient stirs once more - Azir has returned, and with him, the dream of a reborn empire.',
    ],
    champions: ['Azir', 'Nasus', 'Renekton', 'Xerath', 'Sivir', 'Taliyah'],
  },
  {
    id: 'piltover',
    name: 'PILTOVER',
    code: 'PT',
    icon: '⚙',
    subtitle: 'City of Progress',
    tagline: 'City of Progress & Innovation',
    quote: '"In Piltover, they say that hextech can solve any problem. In Zaun, we say they just have not met our problems."',
    images: [
      { src: jinxImage, label: 'Jinx - Loose Cannon', position: '80% center' },
      { src: zaunImage, label: 'The Undercity Zaun' },
      { src: viImage, label: 'Vi - The Piltover Enforcer', position: '80% center' },
    ],
    rightImages: [
      { src: jayceImage, label: 'Jayce - The Defender of Tomorrow', position: '80% center' },
      { src: piltoverImage, label: 'Hextech Crystals' },
      { src: caitlynImage, label: 'Caitlyn - The Sheriff', position: '80% center' },
    ],
    body: [
      'Piltover is a shining city of industry, innovation, and ingenuity. Perched atop massive locks that control the flow of the river Pilt, it has grown from a modest port into one of the most powerful cities in the known world, driven by the discovery and harnessing of a mysterious energy called Hextech.',
      'The city is governed by a council of powerful merchant clans - old families who have shaped Piltover and jealously guard their influence. These clans fund academies and workshops, competing to produce the next great Hextech breakthrough that might revolutionize industry, medicine, or warfare.',
      "But beneath the gleaming spires of Piltover lies Zaun - the undercity. Once a separate settlement, Zaun has grown in Piltover's shadow, a place of gray skies, chemical smog, and people struggling to survive. The chem-barons of Zaun rule through fear and bribery, while enforcers from above maintain an uneasy order.",
      "The tension between Piltover and Zaun defines the region. Hextech, the miraculous technology that powers Piltover's rise, remains out of reach for most Zaunites - a reminder that progress, without justice, only deepens division.",
    ],
    champions: ['Jinx', 'Vi', 'Jayce', 'Caitlyn', 'Ekko', 'Viktor'],
  },
  {
    id: 'noxus',
    name: 'NOXUS',
    code: 'NX',
    icon: '🛡',
    subtitle: 'Empire of Strength',
    tagline: 'Empire of Strength & Conquest',
    quote: '"Noxus does not conquer to destroy. Noxus conquers to make stronger." - Darius',
    images: [
      { src: dariusImage, label: 'Darius - Hand of Noxus' },
      { src: noxusImage, label: 'The Immortal Bastion' },
      { src: dravenImage, label: 'Draven - The Glorious Executioner', position: '80% center' },
    ],
    rightImages: [
      { src: katarinaImage, label: 'Katarina - The Sinister Blade', position: '80% center' },
      { src: noxianLegionImage, label: 'Noxian Legion', position: '40% center' },
      { src: swainImage, label: 'Swain - The Noxian Grand General', position: '80% center' },
    ],
    body: [
      'Noxus is a brutal and powerful empire that has conquered a vast portion of the known world through military might and cunning strategy. Unlike the rigid hierarchies of other kingdoms, Noxus values strength above all else - strength of body, mind, or will. Anyone who proves their worth can rise to power, regardless of birth.',
      'The empire is built upon a foundation of relentless expansion. Noxian generals are expected to push borders outward, to bring more peoples and resources under the imperial banner. Those who resist face total subjugation; those who submit are absorbed into the empire, their cultures slowly reshaped to serve Noxian ideals.',
      'At the heart of Noxus stands the Immortal Bastion, a fortress-city of dark stone and iron, where the ruling Trifarix council governs the empire. Three thrones represent three principles of Noxian leadership - vision, might, and guile - and the council must balance all three to rule effectively.',
      "But the empire's greatest weapon may also be its greatest weakness. A culture that worships power breeds endless ambition - and ambitious men do not always aim outward. Internal rivalries, assassinations, and sudden coups have reshaped Noxian leadership many times, and the chaos of ambition may one day consume the empire from within.",
    ],
    champions: ['Darius', 'Swain', 'Draven', 'Katarina', 'Riven', 'Samira'],
  },
  {
    id: 'ionia',
    name: 'IONIA',
    code: 'IO',
    icon: '🌸',
    subtitle: 'The First Lands',
    tagline: 'The First Lands - Where Magic Breathes',
    quote: '"The sword that cuts without purpose is as dangerous as the fist that strikes in anger." - Master Yi',
    images: [
      { src: yasuoImage, label: 'Yasuo - The Unforgiven', position: '90% center' },
      { src: spiritBlossomPromoImage, label: 'Spirit Blossom Festival', position: '40% center' },
      { src: ahriImage, label: 'Ahri - The Nine-Tailed Fox' },
    ],
    rightImages: [
      { src: ireliaImage, label: 'Irelia - Blade Dancer' },
      { src: ancientTempleImage, label: 'Ancient Temples' },
      { src: zedImage, label: 'Zed - Master of Shadows' },
    ],
    body: [
      'Ionia is an archipelago of incredible natural beauty, steeped in ancient spiritual tradition and a deep connection to the magical world known as the Spirit Realm. Its people have long believed that all living things are part of a great spiritual balance - and that maintaining that balance is the highest calling a person can have.',
      'Unlike most regions, Ionia has no unified government or standing army. Instead, it is organized around a loose confederation of provinces, each led by elders and spiritual guides. Its warriors are monks, wandering swordsmen, and nature spirits - not professional soldiers. For centuries, this was enough, because Ionia was protected by its isolation and its formidable spiritual defenses.',
      'That changed when Noxus invaded. The Noxian conquest was brutal and swift, shattering Ionian society and forcing its peaceful people to confront a terrible question: how do you preserve your values when survival demands you abandon them? The resistance that grew from this conflict produced some of the greatest warriors in the world - and some of the most broken souls.',
      'Today, Ionia struggles to heal. Some provinces lie in ruins, others have been rebuilt, and the spiritual balance that once made the land seem magical has been deeply disturbed. Ancient spirits grow restless, and a dark power known as the Void creeps at the edges of reality. Yet in this broken land, hope endures - carried by warriors who fight not for conquest, but for something they believe is worth protecting.',
    ],
    champions: ['Yasuo', 'Irelia', 'Akali', 'Shen', 'Yone', 'Syndra'],
  },
  {
    id: 'freljord',
    name: 'THE FRELJORD',
    code: 'FR',
    icon: '❄',
    subtitle: 'Land of Ice',
    tagline: 'Land of Ice, Fury & Ancient Powers',
    quote: '"The Freljord does not care about your past. Only your survival." - Sejuani',
    images: [
      { src: asheImage, label: 'Ashe - The Frost Archer' },
      { src: freljordImage, label: 'The Frozen Tundra', position: '80% center' },
      { src: sejuaniImage, label: 'Sejuani - Fury of the North' },
    ],
    rightImages: [
      { src: lissandraImage, label: 'Lissandra - The Ice Witch', position: '80% center' },
      { src: howlingAbyssImage, label: 'Ancient Ice Ruins' },
      { src: braumImage, label: 'Braum - Heart of the Freljord', position: '80% center' },
    ],
    body: [
      'The Freljord is a vast, frozen tundra in the far north of Runeterra, a brutal land of howling blizzards, endless ice fields, and ancient mysteries buried beneath the permafrost. Life here is defined by survival - every tribe, every warrior, every child learns early that the Freljord does not forgive weakness.',
      "The land is divided among three major tribes, each led by a powerful warmother with her own vision for the Freljord's future. Ashe of the Avarosan seeks to unite the tribes through diplomacy and shared purpose. Sejuani of the Winter's Claw believes only strength and conquest can bring unity. And Lissandra, the oldest and most mysterious of the three, pursues her own ancient agenda in the shadows.",
      'Beneath the politics of the three tribes lies a far older conflict. The Freljord holds secrets from before recorded history - a time when demigods called the Iceborn walked the land, and a great evil known as the Watchers threatened to consume all of reality. That darkness was defeated and sealed beneath the ice, but the seals grow thin, and the cold deepens with each passing year.',
      'Warriors of the Freljord are among the toughest in the world - hardened by cold, shaped by struggle, and guided by ancient traditions that blend battle, spirituality, and a fierce respect for the natural world. To survive the Freljord is to be forged like iron: tested until only the strongest remains.',
    ],
    champions: ['Ashe', 'Lissandra', 'Sejuani', 'Braum', 'Olaf', 'Tryndamere'],
  },
  {
    id: 'bilgewater',
    name: 'BILGEWATER',
    code: 'BW',
    icon: '⚓',
    subtitle: 'City of Iron & Glass',
    tagline: 'City of Iron, Salt & Lawless Ambition',
    quote: '"In Bilgewater, every man is worth exactly what he can take - and no more." - Gangplank',
    images: [
      { src: missFortuneImage, label: 'Miss Fortune - The Bounty Hunter', position: '80% center' },
      { src: bilgewaterImage, label: 'The Port of Bilgewater' },
      { src: gangplankImage, label: 'Gangplank - The Saltwater Scourge' },
    ],
    rightImages: [
      { src: nautilusImage, label: 'Nautilus - Titan of the Depths' },
      { src: bilgewaterImage, label: 'The Slaughter Docks', position: 'right center' },
      { src: gravesImage, label: 'Graves - The Outlaw', position: '80% center' },
    ],
    body: [
      'Bilgewater is a port city unlike any other - a lawless, dangerous, and utterly alive metropolis built on the bones of ships, monsters, and broken dreams. Clinging to the Blue Flame Isles in the middle of the sea, it is the crossroads of the known world, where merchants, pirates, bounty hunters, and monsters meet on equal and equally dangerous footing.',
      "There is no formal government in Bilgewater. Power belongs to whoever can hold it. For years, that man was Gangplank - the Saltwater Scourge, whose iron grip and brutal reputation kept the port's many factions in check. His fall shattered the fragile balance of power, unleashing a violent scramble among the city's chem-lords, pirate captains, and criminal guilds.",
      'The seas around Bilgewater are treacherous beyond measure. Massive creatures known as the Beasts of the Deep patrol the waters, and the mist that drifts from the nearby Shadow Isles carries dangers more terrifying than any sea monster. Yet fortunes are made here that cannot be made anywhere else - and so the ships keep coming.',
      'Bilgewater has its own mythology, born of salt and blood. Shamans commune with the dead. Hunters pursue leviathans for sport. And somewhere in the depths below the city, ancient things sleep and dream of rising. This is not a place for the faint of heart - but for those with nerve, it is a place where anything is possible.',
    ],
    champions: ['Miss Fortune', 'Gangplank', 'Illaoi', 'Pyke', 'Graves', 'Twisted Fate'],
  },
  {
    id: 'shadow-isles',
    name: 'SHADOW ISLES',
    code: 'SI',
    icon: '☠',
    subtitle: 'Land of the Dead',
    tagline: 'Land of the Undying Dead',
    quote: '"Death is not the end. On the Shadow Isles, it is only the beginning of suffering." - Thresh',
    images: [
      { src: threshImage, label: 'Thresh - The Chain Warden', position: '80% center' },
      { src: shadowIslesImage, label: 'The Black Mist' },
      { src: karthusImage, label: 'Karthus - The Deathsinger' },
    ],
    rightImages: [
      { src: hecarimImage, label: 'Hecarim - Shadow of War' },
      { src: ruinedTempleImage, label: 'Ruined Temple' },
      { src: viegoImage, label: 'Viego - The Ruined King', position: '80% center' },
    ],
    body: [
      'The Shadow Isles were once a beautiful archipelago known as the Blessed Isles - a place of extraordinary magical power and harmony, where scholars came from across the world to study the secrets of life and death. Today, they are among the most terrifying places in all of Runeterra, shrouded in the Black Mist and haunted by the restless dead.',
      'The catastrophe that destroyed the Blessed Isles is known as the Ruination. A Noxian king named Viego, consumed by grief over the death of his queen Isolde, brought her body to the Isles to be resurrected using their legendary healing waters. When the ritual went wrong, a wave of corrupting death magic - the Black Mist - erupted from the isles, killing everything and trapping their souls in a state of eternal undeath.',
      'Now the Shadow Isles exist in a twilight between life and death. Every year, the Black Mist reaches further across the sea, dragging the living into its cold embrace. The spirits that dwell within it are not simply dead - they are tortured, driven mad by their inability to pass on, and consumed by hungers they can never satisfy.',
      'Beneath the Mist, ancient architecture stands preserved in eerie silence. The spirits of great scholars, warriors, and mages wander the ruins, reliving their deaths in endless loops. Only the most powerful of the undead - entities like Thresh, Hecarim, and the Ruined King himself - retain enough will to act with purpose in this wretched domain.',
    ],
    champions: ['Thresh', 'Viego', 'Hecarim', 'Kalista', 'Gwen', 'Karthus'],
  },
  {
    id: 'targon',
    name: 'TARGON',
    code: 'TG',
    icon: '⭐',
    subtitle: 'Peak of Celestials',
    tagline: 'Where Mortals Touch the Sky',
    quote: '"The peak does not reward the strong. It rewards those who are willing to become something more." - Leona',
    images: [
      { src: leonaImage, label: 'Leona - The Radiant Dawn', position: '80% center' },
      { src: targonImage, label: "Mount Targon's Peak" },
      { src: dianaImage, label: 'Diana - Scorn of the Moon' },
    ],
    rightImages: [
      { src: pantheonImage, label: 'Pantheon - The Unbreakable Spear', position: '80% center' },
      { src: celestialRealmImage, label: 'The Celestial Realm' },
      { src: aurelionImage, label: 'Aurelion Sol - Star Forger' },
    ],
    body: [
      'Mount Targon is the tallest peak in the known world - a place where the boundary between the mortal realm and the realm of the celestials grows impossibly thin. Those who attempt to climb it are testing themselves against something far greater than physical endurance. The mountain itself seems to judge those who dare its slopes, and only a handful in all of history have ever reached the summit.',
      'At the base of the mountain, a warrior culture has grown up around the idea of the Ascent - the legendary journey to the peak. The Rakkor people are fierce, disciplined warriors who believe that fighting and dying in battle is the highest honor. Among them, elite warriors called the Solari worship the sun, while a secret order of Lunari worship the moon in hiding.',
      'Those who reach the summit do not return unchanged. Powerful celestial beings called Aspects sometimes choose to inhabit the bodies of worthy climbers, lending their immense cosmic power to a mortal host. To be Aspect-Touched is to become something between a god and a person - blessed with power beyond imagining, but fundamentally altered, often losing pieces of the self they once were.',
      'Above even the Aspects, ancient cosmic entities watch over reality itself. The Targon region sits at the crossroads of celestial politics that span millennia - and what happens on that sacred peak has consequences far beyond the mortal world.',
    ],
    champions: ['Pantheon', 'Diana', 'Leona', 'Taric', 'Zoe', 'Aurelion Sol'],
  },
  {
    id: 'void',
    name: 'THE VOID',
    code: 'VD',
    icon: '◉',
    subtitle: 'Realm of Nothing',
    tagline: 'The End of All Things',
    quote: '"There is no after the Void. There is only the Void, and what it has not yet consumed." - Kassadin',
    images: [
      { src: kassadinImage, label: 'Kassadin - The Void Walker' },
      { src: voidImage, label: 'The Void Rift' },
      { src: kogMawImage, label: "Kog'Maw - The Mouth of the Abyss" },
    ],
    rightImages: [
      { src: kaisaImage, label: "Kai'Sa - Daughter of the Void", position: '80% center' },
      { src: ruinsIcathiaImage, label: 'Ruins of Icathia' },
      { src: velkozImage, label: "Vel'Koz - Eye of the Void" },
    ],
    body: [
      'The Void is not truly a place - it is the absence of everything. An incomprehensible dimension beyond the physical universe, it exists in contrast to all of creation: where Runeterra has life, form, and meaning, the Void has only hunger. And that hunger is directed, always, at the world of the living.',
      'Long ago, ancient mages discovered the Void as a source of incredible power. They tore open rifts to harness it, not understanding that on the other side, incomprehensible entities were waiting. Those rifts allowed Void creatures to seep into Runeterra, corrupting the land of Icathia into a wasteland and beginning a war that nearly ended the world.',
      'Today, the Void bleeds into Runeterra through cracks in the fabric of reality - places where the barrier between dimensions has grown thin. Void creatures range from mindless, ravenous beasts to vast, ancient intelligences with agendas mortals cannot begin to comprehend. The largest and most dangerous of these are known as Watchers, colossal entities of immense power that have long sought to unmake all that exists.',
      "Against this threat stand unlikely defenders - Kassadin, a man who sacrificed his humanity to fight the Void from within; his daughter Kai'Sa, who survived years inside a Void-consumed territory; and the ravenous creature Kog'Maw, one of the strangest horrors ever to emerge from the abyss.",
    ],
    champions: ['Kassadin', "Kai'Sa", "Kog'Maw", "Vel'Koz", "Cho'Gath", "Bel'Veth"],
  },
  {
    id: 'zaun',
    name: 'ZAUN',
    code: 'ZN',
    icon: '⚗',
    subtitle: 'The Undercity',
    tagline: 'The Gray - City Beneath the City',
    quote: '"They say we live in the gutter. They forget that gutters are what carry away the things that would drown the city above." - Ekko',
    images: [
      { src: jinxImage, label: 'Jinx - The Loose Cannon', position: '80% center' },
      { src: zaunImage, label: 'Zaun - The Undercity' },
      { src: singedImage, label: 'Singed - The Mad Chemist' },
    ],
    rightImages: [
      { src: ekkoImage, label: 'Ekko - The Boy Who Shattered Time', position: '80% center' },
      { src: zaunNeonImage, label: "Zaun's Neon Streets" },
      { src: warwickImage, label: 'Warwick - The Uncaged Wrath' },
    ],
    body: [
      "Zaun lies beneath Piltover, a city of perpetual twilight where sunlight barely penetrates through the bridges and platforms of the city above. The air is thick with chemical smog called the Gray - a toxic haze that coats everything and slowly poisons those who breathe it. Yet Zaun is alive in a way Piltover's gleaming streets are not: raw, desperate, creative, and fiercely proud.",
      "Where Piltover innovates for profit, Zaun innovates for survival. Chemtech - a rougher, cheaper cousin of hextech - powers everything from crude prosthetics to illegal combat enhancements. The undercity's engineers, called chem-techs, work miracles with salvage and refuse, building remarkable machines from what Piltover throws away.",
      "Power in Zaun belongs to the chem-barons - crime lords who control entire districts through a combination of chemical supply, hired muscle, and dark charisma. Their rule is brutal and arbitrary. Yet in the absence of Piltover's Enforcers, the chem-barons are the only law the undercity has, and some of them are no worse - and occasionally better - than the merchant councils above.",
      'Zaunites possess a resilience and dark humor that outsiders often mistake for resignation. They are not broken people - they are people who have learned to build beauty in the dark. Their art, their music, their food, and their loyalty to one another create a culture that, in its own grimed and gaslit way, shines.',
    ],
    champions: ['Ekko', 'Jinx', 'Singed', 'Warwick', 'Urgot', 'Twitch'],
  },
  {
    id: 'ixtal',
    name: 'IXTAL',
    code: 'IX',
    icon: '🌿',
    subtitle: 'Hidden Jungle',
    tagline: 'The Hidden Jungle Civilization',
    quote: '"The jungle provides everything we need. The question is whether we are brave enough to ask for only what we need." - Zyra',
    images: [
      { src: qiyanaImage, label: 'Qiyana - Empress of the Elements' },
      { src: ixtalImage, label: 'The Ixtal Rainforest' },
      { src: nidaleeImage, label: 'Nidalee - The Bestial Huntress' },
    ],
    rightImages: [
      { src: zyraImage, label: 'Zyra - Rise of the Thorns', position: '80% center' },
      { src: ixtalRuinsImage, label: 'Ancient Ixtal Ruins' },
      { src: rengarImage, label: 'Rengar - The Pridestalker' },
    ],
    body: [
      "Ixtal is one of Runeterra's greatest secrets - an ancient civilization that has spent centuries hiding from the outside world deep within the vast jungles of the continent's southern interior. While other kingdoms rise and fall, wage wars, and reshape the world, Ixtal watches from the shadows of its canopy, certain that isolation is the only path to survival.",
      "The Ixtali are masters of elemental magic - specifically the manipulation of nature's fundamental forces: earth, water, fire, and air. Their magic is old, precise, and extraordinarily powerful, developed over thousands of years in perfect isolation. The ruling class of Ixtal, the Yun Tal, are elemental mages of supreme ability who control every aspect of Ixtali society.",
      'This isolation was born from hard experience. Ixtal was once part of the Shuriman Empire, and the Ruination that swept the continent left deep scars. The Ixtali withdrew, sealed their borders, and began the long project of protecting themselves - first from the outside world, then from the monsters of the jungle, and finally from their own internal divisions.',
      "Today, younger Ixtali are beginning to question whether isolation is truly protection or merely a comfortable illusion. The world is changing - the Void grows, ancient evils stir, and the jungles themselves seem to be responding to some unseen disturbance. Whatever Ixtal's future holds, it can no longer be kept entirely hidden.",
    ],
    champions: ['Qiyana', 'Nidalee', 'Zyra', 'Rengar', 'Malphite', 'Neeko'],
  },
  {
    id: 'bandle-city',
    name: 'BANDLE CITY',
    code: 'BC',
    icon: '🎪',
    subtitle: 'Realm of Yordles',
    tagline: 'Where Magic Lives Between the Worlds',
    quote: '"We do not come from this world. We merely visit it - and we always bring a little magic with us." - Lulu',
    images: [
      { src: teemoImage, label: 'Teemo - The Swift Scout' },
      { src: bandleImage, label: 'Bandle City - Realm of Yordles' },
      { src: luluImage, label: 'Lulu - The Fae Sorceress' },
    ],
    rightImages: [
      { src: tristanaImage, label: 'Tristana - The Yordle Gunner', position: '80% center' },
      { src: yordleRealmImage, label: 'The Yordle Realm' },
      { src: heimerdingerImage, label: 'Heimerdinger - Revered Inventor' },
    ],
    body: [
      'Bandle City is not quite a place - or rather, it is too many places at once. The home of the yordles exists in a magical dimension that overlaps with the physical world but is not quite part of it. A yordle walking through a Bandle City doorway might emerge in a forest outside Demacia, a market in Piltover, or nowhere in particular, depending on the will of the city itself.',
      'Yordles are small, fuzzy, and almost maddeningly cheerful creatures who are, at their core, beings of pure magic. They live in Bandle City not because they are trapped there but because they choose to return - the city reflects their emotional landscape, shifting and changing as yordle moods shift and change. It is simultaneously the safest place in the world and the most bewildering.',
      'Despite their harmless appearance, yordles are neither weak nor naive. Many of them wander into the human world out of curiosity, and their experiences there range from delightful to traumatic. A yordle separated from Bandle City for too long will begin to change - growing stranger, more serious, sometimes darker - as the magic that defines them slowly fades.',
      'The yordle relationship with the physical world has produced some of the most peculiar warriors, inventors, and mages in Runeterra. Whether firing toxic darts in Demacia, playing tricks in Noxus, or building improbable machines in Piltover, yordles carry a piece of Bandle City with them - a spark of pure, impossible magic that refuses to be extinguished.',
    ],
    champions: ['Teemo', 'Lulu', 'Tristana', 'Rumble', 'Corki', 'Heimerdinger'],
  },
]

function Lore() {
  const [activeRegionId, setActiveRegionId] = useState('demacia')
  const [visibleStart, setVisibleStart] = useState(0)
  const activeRegion = useMemo(
    () => regions.find((region) => region.id === activeRegionId) || regions[0],
    [activeRegionId],
  )

  function selectRegion(regionId) {
    setActiveRegionId(regionId)
    const regionIndex = regions.findIndex((region) => region.id === regionId)
    if (regionIndex < visibleStart) {
      setVisibleStart(regionIndex)
    } else if (regionIndex > visibleStart + 4) {
      setVisibleStart(regionIndex - 4)
    }
    window.scrollTo({ top: 228, behavior: 'smooth' })
  }

  function shiftRegions(direction) {
    setVisibleStart((currentStart) => {
      const nextStart = currentStart + direction
      return Math.max(0, Math.min(nextStart, regions.length - 5))
    })
  }

  return (
    <div className="lore-page-react" style={{ '--runeterra-map': `url(${runeterraMap})` }}>
      <SiteHeader hideProfile />

      <section className="lore-hero-react">
        <div className="lore-hero-content-react">
          <div className="lore-hero-label-react">WORLD OF RUNETERRA</div>
          <h1>THE LORE</h1>
          <p>Explore the regions, stories and legends that shape the world of League of Legends.</p>
        </div>
      </section>

      <section className="region-selector-react" aria-label="Runeterra regions">
        <div className="region-selector-wrapper-react">
          <button
            type="button"
            className="region-scroll-btn-react left"
            aria-label="Scroll regions left"
            onClick={() => shiftRegions(-1)}
            disabled={visibleStart === 0}
          >
            ‹
          </button>
          <div className="region-nav-container-react">
            <div
              className="region-nav-list-react"
              style={{
                '--region-count': regions.length,
                transform: `translateX(-${visibleStart * (100 / regions.length)}%)`,
              }}
            >
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  className={`region-btn-react ${region.id === activeRegion.id ? 'active' : ''}`}
                  onClick={() => selectRegion(region.id)}
                >
                  <span className="region-btn-icon-react">{region.icon}</span>
                  <span className="region-btn-name-react">{region.name}</span>
                  <span className="region-btn-sub-react">{region.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="region-scroll-btn-react right"
            aria-label="Scroll regions right"
            onClick={() => shiftRegions(1)}
            disabled={visibleStart >= regions.length - 5}
          >
            ›
          </button>
        </div>
      </section>

      <main className="lore-main-react">
        <section className="region-layout-react" key={activeRegion.id}>
          <aside className="region-side-images-react">
            {activeRegion.images.map((image) => (
              <figure className="side-img-react" key={image.label}>
                <img src={image.src} alt={image.label} style={{ objectPosition: image.position || 'center' }} />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </aside>

          <article className="region-text-react">
            <header className="region-header-react">
              <div className="region-emblem-react">{activeRegion.icon}</div>
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
            {(activeRegion.rightImages || activeRegion.images).map((image) => (
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
