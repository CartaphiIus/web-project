(function () {
  const laneToRole = {
    Top: "top",
    Jungle: "jungle",
    Middle: "mid",
    Bottom: "bot",
    Support: "support"
  };

  const classTemplates = {
    tank: { engage: 8, peel: 7, tankiness: 8, utility: 6, carry: 3, waveclear: 4, split: 3, mobile: 3 },
    fighter: { engage: 6, peel: 3, tankiness: 6, utility: 4, carry: 7, waveclear: 6, split: 7, mobile: 5 },
    marksman: { engage: 3, peel: 4, tankiness: 2, utility: 4, carry: 9, waveclear: 6, split: 3, mobile: 4 },
    mage: { engage: 5, peel: 4, tankiness: 2, utility: 6, carry: 7, waveclear: 7, split: 2, mobile: 3 },
    assassin: { engage: 7, peel: 2, tankiness: 3, utility: 3, carry: 8, waveclear: 6, split: 5, mobile: 8 },
    support: { engage: 6, peel: 8, tankiness: 3, utility: 9, carry: 3, waveclear: 3, split: 1, mobile: 4 },
    enchanter: { engage: 4, peel: 9, tankiness: 2, utility: 10, carry: 3, waveclear: 4, split: 1, mobile: 3 }
  };

  const enchanterIds = new Set([
    "Janna", "Karma", "Lulu", "Milio", "Nami", "Renata", "Seraphine", "Sona", "Soraka", "Yuumi"
  ]);
  const hypercarryIds = new Set([
    "Aphelios", "Jinx", "KaiSa", "KogMaw", "Smolder", "Twitch", "Vayne", "Xayah", "Zeri"
  ]);
  const sustainIds = new Set([
    "Aatrox", "Briar", "Darius", "DrMundo", "Fiddlesticks", "Fiora", "Garen", "Illaoi",
    "Mordekaiser", "Nasus", "Nidalee", "Nilah", "Nunu", "Olaf", "Rhaast", "Senna",
    "Soraka", "Swain", "Sylas", "Trundle", "Vladimir", "Volibear", "Warwick", "XinZhao", "Yuumi"
  ]);
  const globalIds = new Set([
    "Ashe", "Briar", "Ezreal", "Galio", "Gangplank", "Karthus", "Nocturne", "Pantheon",
    "Senna", "Shen", "TahmKench", "TwistedFate"
  ]);
  const aoeIds = new Set([
    "Amumu", "Annie", "Brand", "Fiddlesticks", "Galio", "Hecarim", "Karthus", "Kennen",
    "Lissandra", "Malphite", "MissFortune", "Nunu", "Orianna", "Rakan", "Seraphine",
    "Swain", "Wukong", "Yone", "Ziggs", "Zyra"
  ]);
  const mobileIds = new Set([
    "Ahri", "Akali", "Aurora", "Camille", "Diana", "Ekko", "Ezreal", "Fizz", "Hecarim",
    "Irelia", "Kaisa", "Kassadin", "Katarina", "Kayn", "Kindred", "LeeSin", "LeBlanc",
    "Lillia", "Lucian", "Naafiri", "Nilah", "Pyke", "Qiyana", "Rakan", "Riven", "Samira",
    "Tristana", "Vayne", "Yasuo", "Yone", "Zed", "Zeri", "Zoe"
  ]);

  const specialCc = {
    hook: new Set(["Blitzcrank", "Nautilus", "Pyke", "Thresh"]),
    charm: new Set(["Ahri", "Evelynn", "Rakan", "Seraphine"]),
    fear: new Set(["Fiddlesticks", "Hecarim", "Nocturne", "Shaco", "Vex", "Yone"]),
    knockup: new Set(["Alistar", "ChoGath", "Diana", "Galio", "JarvanIV", "Malphite", "Nautilus", "Ornn", "Rakan", "Sett", "Vi", "Wukong", "Yasuo", "Yone", "Zac"]),
    silence: new Set(["Blitzcrank", "ChoGath", "Fiddlesticks", "Garen", "Soraka"]),
    snare: new Set(["Caitlyn", "Jhin", "Jinx", "Lux", "Morgana", "Neeko", "Senna", "Varus", "Zyra"]),
    stun: new Set(["Annie", "Braum", "Leona", "Lissandra", "Pantheon", "Renekton", "Syndra", "TwistedFate", "Veigar", "Zoe"]),
    suppress: new Set(["Malzahar", "Skarner", "Warwick"])
  };

  function clampStat(value) {
    return Math.max(1, Math.min(10, Math.round(value)));
  }

  function normalizeId(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function getChampionBundle() {
    const bundle = window.__LOL_CHAMPION_FULL__;
    if (!bundle || !bundle.data) return null;
    return bundle;
  }

  function resolvePrimaryLane(champion) {
    if (typeof window.__resolveChampionLane === "function") {
      return window.__resolveChampionLane(champion.id, champion) || "Middle";
    }

    const tags = Array.isArray(champion.tags) ? champion.tags : [];
    if (tags.includes("Marksman")) return "Bottom";
    if (tags.includes("Support")) return "Support";
    if (tags.includes("Assassin") || tags.includes("Mage")) return "Middle";
    if (tags.includes("Tank") || tags.includes("Fighter")) return "Top";
    return "Middle";
  }

  function resolveClass(champion, primaryLane) {
    const tags = Array.isArray(champion.tags) ? champion.tags : [];
    const hasSupport = tags.includes("Support") || primaryLane === "Support";

    if (enchanterIds.has(champion.id)) return "enchanter";
    if (tags.includes("Marksman")) return "marksman";
    if (tags.includes("Assassin")) return "assassin";
    if (hasSupport && tags.includes("Mage")) return primaryLane === "Support" ? "support" : "mage";
    if (tags.includes("Tank")) return "tank";
    if (hasSupport) return "support";
    if (tags.includes("Mage")) return "mage";
    if (tags.includes("Fighter")) return "fighter";
    return primaryLane === "Support" ? "support" : "fighter";
  }

  function resolveRoles(champion, primaryLane) {
    const tags = Array.isArray(champion.tags) ? champion.tags : [];
    const roles = [];
    const primaryRole = laneToRole[primaryLane] || "mid";
    roles.push(primaryRole);

    if (tags.includes("Support") && !roles.includes("support")) roles.push("support");
    if (tags.includes("Marksman") && !roles.includes("bot")) roles.push("bot");
    if ((tags.includes("Mage") || tags.includes("Assassin")) && !roles.includes("mid")) roles.push("mid");
    if ((tags.includes("Tank") || tags.includes("Fighter")) && !roles.includes("top")) roles.push("top");

    return roles;
  }

  function resolveType(champion) {
    const range = Number(champion?.stats?.attackrange || 0);
    return range > 250 ? "ranged" : "melee";
  }

  function resolveDamageProfile(champion, resolvedClass) {
    const tags = Array.isArray(champion.tags) ? champion.tags : [];
    let phys = 55;
    let magic = 40;
    let trueDamage = 5;

    if (resolvedClass === "marksman") {
      phys = 82;
      magic = 13;
    } else if (resolvedClass === "mage") {
      phys = 8;
      magic = 87;
    } else if (resolvedClass === "support" || resolvedClass === "enchanter") {
      phys = resolvedClass === "support" ? 20 : 12;
      magic = resolvedClass === "support" ? 70 : 63;
    } else if (resolvedClass === "tank") {
      phys = 28;
      magic = 67;
    } else if (resolvedClass === "assassin") {
      phys = tags.includes("Mage") ? 35 : 82;
      magic = tags.includes("Mage") ? 60 : 13;
    } else if (resolvedClass === "fighter") {
      phys = tags.includes("Mage") ? 52 : 72;
      magic = tags.includes("Mage") ? 43 : 18;
      trueDamage = 10;
    }

    if (hypercarryIds.has(champion.id)) phys = Math.max(phys, 80);
    if (["Darius", "Fiora", "Garen", "Olaf", "Vayne", "Warwick"].includes(champion.id)) trueDamage = 15;

    return { phys, magic, true: trueDamage };
  }

  function resolveCc(champion, resolvedClass) {
    const cc = new Set();
    const primaryLane = resolvePrimaryLane(champion);

    if (resolvedClass === "tank" || resolvedClass === "support") {
      cc.add("stun");
      cc.add("slow");
    } else if (resolvedClass === "enchanter") {
      cc.add("slow");
    } else if (resolvedClass === "mage") {
      cc.add("slow");
      cc.add("stun");
    } else if (resolvedClass === "fighter") {
      cc.add("slow");
      if (primaryLane !== "Bottom") cc.add("stun");
    } else if (resolvedClass === "marksman") {
      cc.add("slow");
    } else if (resolvedClass === "assassin") {
      cc.add("slow");
    }

    Object.entries(specialCc).forEach(([type, ids]) => {
      if (ids.has(champion.id)) cc.add(type);
    });

    return Array.from(cc);
  }

  function resolveTags(champion, resolvedClass) {
    const tags = Array.isArray(champion.tags)
      ? champion.tags.map((tag) => String(tag || "").toLowerCase())
      : [];

    if (resolvedClass === "tank" || resolvedClass === "support" || resolvedClass === "enchanter") tags.push("utility");
    if (resolvedClass === "assassin" || resolvedClass === "marksman" || resolvedClass === "fighter") tags.push("carry");
    if (aoeIds.has(champion.id)) tags.push("aoe");
    if (mobileIds.has(champion.id)) tags.push("mobile");
    if (globalIds.has(champion.id)) tags.push("global");
    if (hypercarryIds.has(champion.id)) tags.push("hypercarry");
    if (sustainIds.has(champion.id)) tags.push("sustain");
    if (["Amumu", "Leona", "Malphite", "Nautilus", "Rakan", "Vi", "Wukong"].includes(champion.id)) tags.push("engage");
    if (["Galio", "Morgana", "Poppy", "Shen", "TahmKench", "Thresh"].includes(champion.id)) tags.push("peel");

    return Array.from(new Set(tags));
  }

  function resolveRatings(champion, resolvedClass, roles, type, cc) {
    const base = { ...(classTemplates[resolvedClass] || classTemplates.fighter) };
    const stats = champion.stats || {};
    const tags = Array.isArray(champion.tags) ? champion.tags : [];

    if (roles.includes("jungle")) {
      base.engage += 1;
      base.mobile += 1;
    }
    if (roles.includes("support")) {
      base.peel += 1;
      base.utility += 1;
    }
    if (roles.includes("top")) {
      base.split += 1;
      base.tankiness += 1;
    }
    if (roles.includes("bot")) {
      base.carry += 1;
    }
    if (type === "ranged") {
      base.tankiness -= 1;
      if (resolvedClass === "marksman" || resolvedClass === "mage") base.carry += 1;
    }
    if (tags.includes("Tank")) base.tankiness += 1;
    if (tags.includes("Mage")) base.waveclear += 1;
    if ((stats.movespeed || 0) >= 340 || mobileIds.has(champion.id)) base.mobile += 1;
    if ((stats.attackrange || 0) >= 500 && resolvedClass === "marksman") base.carry += 1;
    if (cc.includes("hook") || cc.includes("knockup") || cc.includes("suppress")) base.engage += 1;
    if (cc.includes("stun") || cc.includes("snare") || cc.includes("slow")) base.utility += 1;
    if (hypercarryIds.has(champion.id)) base.carry += 1;

    return {
      engage: clampStat(base.engage),
      peel: clampStat(base.peel),
      tankiness: clampStat(base.tankiness),
      utility: clampStat(base.utility),
      carry: clampStat(base.carry),
      waveclear: clampStat(base.waveclear),
      split: clampStat(base.split),
      mobile: clampStat(base.mobile)
    };
  }

  function createGeneratedChampion(champion) {
    const primaryLane = resolvePrimaryLane(champion);
    const roles = resolveRoles(champion, primaryLane);
    const type = resolveType(champion);
    const resolvedClass = resolveClass(champion, primaryLane);
    const damage = resolveDamageProfile(champion, resolvedClass);
    const cc = resolveCc(champion, resolvedClass);
    const ratings = resolveRatings(champion, resolvedClass, roles, type, cc);
    const tags = resolveTags(champion, resolvedClass);

    return {
      id: champion.id,
      name: champion.name || champion.id,
      title: champion.title || "",
      roles,
      type,
      class: resolvedClass,
      damage,
      cc,
      engage: ratings.engage,
      peel: ratings.peel,
      tankiness: ratings.tankiness,
      utility: ratings.utility,
      carry: ratings.carry,
      waveclear: ratings.waveclear,
      split: ratings.split,
      mobile: ratings.mobile,
      tags,
      synergies: {}
    };
  }

  async function ensureFullChampionRoster(existingChampions) {
    if (!Array.isArray(existingChampions) || !existingChampions.length) return existingChampions;

    const bundle = getChampionBundle();
    if (!bundle || !bundle.data) return existingChampions;

    const seenIds = new Set(existingChampions.map((champion) => normalizeId(champion.id)));
    const generated = [];

    Object.values(bundle.data).forEach((champion) => {
      const key = normalizeId(champion.id);
      if (seenIds.has(key)) return;
      generated.push(createGeneratedChampion(champion));
      seenIds.add(key);
    });

    existingChampions.push(...generated);
    existingChampions.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "en"));
    return existingChampions;
  }

  window.ensureFullChampionRoster = ensureFullChampionRoster;
})();
