const rawKeys = ['granum', 'calx', 'saburra', 'tephra', 'gabore', 'kimurite', 'bor', 'rockoil', 'dragonsalt', 'ichor', 'sulfur', 'tallow'];
const defaultPrices = { granum: 15, calx: 35, saburra: 15, tephra: 50, gabore: 25, kimurite: 200, bor: 120, rockoil: 50, dragonsalt: 100, ichor: 150, sulfur: 30, tallow: 10 };

const CATEGORIES = [
    { id: 'raw', items: ['granum', 'calx', 'saburra', 'tephra', 'gabore', 'kimurite', 'lodestone', 'water'] },
    { id: 'catalyst', items: ['coal', 'coke', 'sp', 'cp', 'fumingsalt', 'bor', 'rockoil', 'dragonsalt', 'ichor', 'sulfur', 'tallow'] },
    { id: 'basicExt', items: ['granumpowder', 'gaborepowder', 'malachite', 'bleckblende', 'calamine', 'amarantum', 'flakestone', 'calspar', 'jadeite', 'pyrite', 'magmum'] },
    { id: 'intOre', items: ['bo', 'galbinum', 'pyroxene', 'redbleckblende', 'bleck', 'cinnabar', 'maalite', 'pyropite', 'kyanite', 'aabam'] },
    { id: 'advOre', items: ['lupium', 'almine', 'acronite', 'sanguinite', 'gemmetal', 'skadite', 'chalkglance', 'waterstone'] },
    { id: 'refined', items: ['pi', 'cuprum', 'gs', 'steel', 'bron', 'messing', 'tmessing', 'tungsteel', 'cronite', 'oghmium', 'gold', 'silver', 'electrum'] }
];

const EXTRACT_MAP = {
    skadite: 'chalkglance', electrum: 'amarantum', gemmetal: 'waterstone', sanguinite: 'redbleckblende',
    almine: 'pyroxene', acronite: 'pyroxene', lupium: 'galbinum',
    pyroxene: 'galbinum', galbinum: 'tephra', redbleckblende: 'tephra',
    bo: 'granum', maalite: 'magmum', pyropite: 'magmum', kyanite: 'magmum', aabam: 'redbleckblende', calamine: 'amarantum', 
    silver: 'redbleckblende', chalkglance: 'calspar', cuprum: 'malachite', pi: 'bo', coke: 'coal', pitch: 'coal', ichor: 'cinnabar', sulfur: 'cinnabar',
    bleck: 'bleckblende', bleckblende: 'saburra', jadeite: 'saburra', malachite: 'saburra', sp: 'saburra',
    granumpowder: 'granum', amarantum: 'granum', flakestone: 'granum', calspar: 'calx', coal: 'calx', 
    cp: 'calx', cinnabar: 'tephra', magmum: 'tephra', volcanicash: 'tephra', pyrite: 'saburra',
    gaborepowder: 'gabore', lodestonepowder: 'lodestone', ritualash: 'risensacrificecarcass', gold: 'electrum'
};

const RECIPES = {
    oghmium: { type: 'alloy', primary: 'tungsteel', cat1: 'cronite', cat2: 'sanguinite' },
    tungsteel: { type: 'alloy', primary: 'gs', cat1: 'lupium', cat2: 'granumpowder' },
    cronite: { type: 'alloy', primary: 'gs', cat1: 'almine', cat2: 'acronite' },
    steel: { type: 'alloy', primary: 'gs', cat1: 'coal', cat2: 'sp' },
    gs: { type: 'alloy', primary: 'pi', cat1: 'cp', cat2: 'coke' },
    tmessing: { type: 'alloy', primary: 'messing', cat1: 'almine', cat2: 'gemmetal' },
    messing: { type: 'alloy', primary: 'cuprum', cat1: 'calamine', cat2: 'sp' },
    bron: { type: 'alloy', primary: 'cuprum', cat1: 'bleckblende', cat2: 'sp' }
};

const EXTRACTION_ROUTES = {
    calx: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { calspar: 0.0360, cp: 0.1361, coal: 0.2160, flakestone: 0.0180, malachite: 0.0891 } },
        "Grinder": { action: 'stepGrind', cat: "water", catReq: 0.1000, yields: { calspar: 0.2000, cp: 0.2058, coal: 0.1140, flakestone: 0.0036, malachite: 0.0528 } },
        "Furnace": { action: 'stepFurnace', cat: "water", catReq: 0.1000, yields: { calspar: 0.2560, flakestone: 0.0028, malachite: 0.0506 } }
    },
    gabore: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { bo: 0.0510, gaborepowder: 0.2340, galbinum: 0.0720, nyx: 0.0036 } },
        "Grinder": { action: 'stepGrind', cat: "bor", catReq: 0.0715, yields: { bo: 0.0226, gaborepowder: 0.4186, galbinum: 0.1050 } },
        "Furnace": { action: 'stepFurnace', cat: "coke", catReq: 0.0385, yields: { bo: 0.0595, galbinum: 0.0243, nyx: 0.0168 } }
    },
    granum: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { amarantum: 0.0882, bo: 0.0770, flakestone: 0.0140, granumpowder: 0.2940 } },
        "Attractor": { action: 'stepExtract', cat: "cp", catReq: 0.0715, yields: { bo: 0.1980 } }
    },
    kimurite: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { magmum: 0.3520, pyrite: 0.0200, waterstone: 0.3800 } }
    },
    lodestone: {
        "Grinder (Tallow)": { action: 'stepGrind', cat: "tallow", catReq: 0.0001, yields: { lodestonepowder: 0.0950 } },
        "Grinder (Water)": { action: 'stepGrind', cat: "water", catReq: 0.0001, yields: { lodestonepowder: 0.0931 } }
    },
    risensacrificecarcass: {
        "Furnace": { action: 'stepFurnace', cat: null, catReq: 0, yields: { ritualash: 0.0108 } }
    },
    saburra: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { bleckblende: 0.1584, jadeite: 0.0128, malachite: 0.1584, pyrite: 0.0032, sp: 0.2000 } },
        "Grinder": { action: 'stepGrind', cat: "water", catReq: 0.1000, yields: { bleckblende: 0.1901, jadeite: 0.0016, malachite: 0.0950, sp: 0.4275 } },
        "Attractor": { action: 'stepExtract', cat: "coal", catReq: 0.0525, yields: { pyrite: 0.0120 } }
    },
    tephra: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { cinnabar: 0.0144, galbinum: 0.1200, magmum: 0.0288, redbleckblende: 0.0312, volcanicash: 0.2220 } },
        "Grinder (Bor)": { action: 'stepGrind', cat: "bor", catReq: 0.0715, yields: { cinnabar: 0.0090, galbinum: 0.2000, magmum: 0.0259, redbleckblende: 0.0807, volcanicash: 0.2753 } },
        "Grinder (Water)": { action: 'stepGrind', cat: "water", catReq: 0.1000, yields: { cinnabar: 0.0088, galbinum: 0.1900, magmum: 0.0259, redbleckblende: 0.0774, volcanicash: 0.2960 } },
        "Greater Natorus (CP)": { action: 'stepExtract', cat: "cp", catReq: 0.0715, yields: { cinnabar: 0.0036, galbinum: 0.0250, magmum: 0.0122, redbleckblende: 0.2600, volcanicash: 0.0148 } },
        "Greater Natorus (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { cinnabar: 0.0094, galbinum: 0.1250, magmum: 0.0036, redbleckblende: 0.1976, volcanicash: 0.0326 } },
        "Furnace": { action: 'stepFurnace', cat: "cp", catReq: 0.0715, yields: { cinnabar: 0.0054, galbinum: 0.0299, magmum: 0.0259, redbleckblende: 0.2080, volcanicash: 0.0444 } }
    },
    amarantum: {
        "Crusher": { action: 'stepCrush', cat: null, catReq: 0, yields: { bleck: 0.0135, calamine: 0.0090, cuprum: 0.0270, electrum: 0.0180, waterstone: 0.0900 } },
        "Furnace": { action: 'stepFurnace', cat: "bor", catReq: 0.0715, yields: { bleck: 0.0960, calamine: 0.0563, cuprum: 0.2400, electrum: 0.0480 } },
        "Blast Furnace": { action: 'stepBlastFurnace', cat: "bor", catReq: 0.0715, yields: { bleck: 0.0600, calamine: 0.0624, cuprum: 0.3000, electrum: 0.0800 } }
    },
    bleckblende: {
        "Greater Natorus (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { bleck: 0.6000 } },
        "Greater Natorus (Rock Oil)": { action: 'stepExtract', cat: "rockoil", catReq: 0.0417, yields: { bleck: 0.6000 } },
        "Natorus (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { bleck: 0.5400 } },
        "Natorus (Rock Oil)": { action: 'stepExtract', cat: "rockoil", catReq: 0.0417, yields: { bleck: 0.5400 } },
        "Furnace (Bor)": { action: 'stepFurnace', cat: "bor", catReq: 0.0715, yields: { bleck: 0.1920 } },
        "Furnace (Rock Oil)": { action: 'stepFurnace', cat: "rockoil", catReq: 0.0417, yields: { bleck: 0.1920 } }
    },
    bo: {
        "Furnace": { action: 'stepFurnace', cat: "coke", catReq: 0.0385, yields: { pi: 0.4000 } },
        "Blast Furnace": { action: 'stepBlastFurnace', cat: "coke", catReq: 0.0385, yields: { pi: 0.5000 } }
    },
    calspar: {
        "Blast Furnace (Dragon Salt)": { action: 'stepBlastFurnace', cat: "dragonsalt", catReq: 0.0187, yields: { chalkglance: 0.0700, electrum: 0.0224, malachite: 0.2064 } },
        "Blast Furnace (Ichor)": { action: 'stepBlastFurnace', cat: "ichor", catReq: 0.0660, yields: { chalkglance: 0.0490, electrum: 0.0426, malachite: 0.3302 } },
        "Blast Furnace (Sulfur)": { action: 'stepBlastFurnace', cat: "sulfur", catReq: 0.0560, yields: { chalkglance: 0.0448, electrum: 0.0291, malachite: 0.2374 } },
        "Furnace (Dragon Salt)": { action: 'stepFurnace', cat: "dragonsalt", catReq: 0.0187, yields: { chalkglance: 0.0245, electrum: 0.0088, malachite: 0.1445 } },
        "Furnace (Ichor)": { action: 'stepFurnace', cat: "ichor", catReq: 0.0660, yields: { chalkglance: 0.0159, electrum: 0.0212, malachite: 0.2793 } },
        "Furnace (Sulfur)": { action: 'stepFurnace', cat: "sulfur", catReq: 0.0560, yields: { chalkglance: 0.0142, electrum: 0.0129, malachite: 0.1782 } },
        "Furnace (Water)": { action: 'stepFurnace', cat: "water", catReq: 0.1000, yields: { chalkglance: 0.0074, electrum: 0.0109, malachite: 0.3468 } },
        "Furnace (Bor)": { action: 'stepFurnace', cat: "bor", catReq: 0.0715, yields: { chalkglance: 0.0074, electrum: 0.0294, malachite: 0.4816 } },
        "Furnace (Coke)": { action: 'stepFurnace', cat: "coke", catReq: 0.0385, yields: { chalkglance: 0.0074, electrum: 0.0212, malachite: 0.3468 } },
        "Fabricula (Dragon Salt)": { action: 'stepExtract', cat: "dragonsalt", catReq: 0.0187, yields: { chalkglance: 0.0420 } },
        "Fabricula (Ichor)": { action: 'stepExtract', cat: "ichor", catReq: 0.0660, yields: { chalkglance: 0.0210, electrum: 0.0336, malachite: 0.1376 } },
        "Fabricula (Sulfur)": { action: 'stepExtract', cat: "sulfur", catReq: 0.0560, yields: { chalkglance: 0.0168, electrum: 0.0112, malachite: 0.0344 } },
        "Fabricula (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { electrum: 0.0560, malachite: 0.3440 } }
    },
    cinnabar: {
        "Furnace": { action: 'stepFurnace', cat: "bor", catReq: 0.0715, yields: { ichor: 0.3900, sulfur: 0.0296 } },
        "Greater Natorus": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { sulfur: 0.0672 } },
        "Fabricula": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { ichor: 0.0960, sulfur: 0.0160 } }
    },
    coal: {
        "Furnace (Coal)": { action: 'stepFurnace', cat: "coal", catReq: 0.0525, yields: { coke: 0.7200, pitch: 0.0418 } },
        "Furnace (CP)": { action: 'stepFurnace', cat: "cp", catReq: 0.0715, yields: { coke: 0.7200, pitch: 0.0379 } },
        "Blast Furnace (Coal)": { action: 'stepBlastFurnace', cat: "coal", catReq: 0.0525, yields: { coke: 0.7200 } },
        "Blast Furnace (CP)": { action: 'stepBlastFurnace', cat: "cp", catReq: 0.0715, yields: { coke: 0.7200 } }
    },
    galbinum: {
        "Blast Furnace (CP)": { action: 'stepBlastFurnace', cat: "cp", catReq: 0.0715, yields: { lupium: 0.0315, pyroxene: 0.1280 } },
        "Blast Furnace (Coke)": { action: 'stepBlastFurnace', cat: "coke", catReq: 0.0385, yields: { lupium: 0.0246, pyroxene: 0.1760 } },
        "Blast Furnace (Bor)": { action: 'stepBlastFurnace', cat: "bor", catReq: 0.0720, yields: { lupium: 0.0246, pyroxene: 0.1400 } },
        "Furnace": { action: 'stepFurnace', cat: "cp", catReq: 0.0715, yields: { lupium: 0.0171, pyrite: 0.0037, pyroxene: 0.0696 } },
        "Greater Natorus": { action: 'stepExtract', cat: "coke", catReq: 0.0385, yields: { lupium: 0.0062, pyrite: 0.0653, pyroxene: 0.4200 } }
    },
    magmum: {
        "Grizzly": { action: 'stepExtract', cat: null, catReq: 0, yields: { kyanite: 0.2500, maalite: 0.0650, pyropite: 0.0200 } },
        "Kiln (Bor)": { action: 'stepBake', cat: "bor", catReq: 0.0715, yields: { maalite: 0.2080, pyropite: 0.0480 } },
        "Kiln (Coke)": { action: 'stepBake', cat: "coke", catReq: 0.0385, yields: { maalite: 0.4264, pyropite: 0.0221 } },
        "Hearth": { action: 'stepBake', cat: "bor", catReq: 0.0715, yields: { maalite: 0.0780, pyropite: 0.0600 } }
    },
    malachite: {
        "Blast Furnace (Bor)": { action: 'stepBlastFurnace', cat: "bor", catReq: 0.0715, yields: { cuprum: 0.5000 } },
        "Blast Furnace (Coke)": { action: 'stepBlastFurnace', cat: "coke", catReq: 0.0385, yields: { cuprum: 0.5000 } },
        "Fabricula (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0715, yields: { cuprum: 0.4000, sulfur: 0.0064 } },
        "Fabricula (Coke)": { action: 'stepExtract', cat: "coke", catReq: 0.0385, yields: { cuprum: 0.4000, sulfur: 0.0320 } },
        "Fabricula (Coal)": { action: 'stepExtract', cat: "coal", catReq: 0.0525, yields: { cuprum: 0.2400, sulfur: 0.0640 } },
        "Furnace (Bor)": { action: 'stepFurnace', cat: "bor", catReq: 0.0715, yields: { cuprum: 0.4000, sulfur: 0.0047 } },
        "Furnace (Coke)": { action: 'stepFurnace', cat: "coke", catReq: 0.0385, yields: { cuprum: 0.4000, sulfur: 0.0083 } }
    },
    redbleckblende: {
        "Blast Furnace (Rock Oil)": { action: 'stepBlastFurnace', cat: "rockoil", catReq: 0.0417, yields: { aabam: 0.3000, calamine: 0.0240, sanguinite: 0.0140, silver: 0.0200 } },
        "Blast Furnace (Fuming Salt)": { action: 'stepBlastFurnace', cat: "fumingsalt", catReq: 0.0315, yields: { aabam: 0.3000, calamine: 0.0456, sanguinite: 0.0200, silver: 0.0350 } },
        "Furnace": { action: 'stepFurnace', cat: "coke", catReq: 0.0385, yields: { aabam: 0.2322, calamine: 0.0569, sanguinite: 0.0023, silver: 0.0198 } }
    },
    chalkglance: {
        "Fabricula (Dragon Salt)": { action: 'stepExtract', cat: "dragonsalt", catReq: 0.0187, yields: { skadite: 0.3200 } },
        "Fabricula (Ichor)": { action: 'stepExtract', cat: "ichor", catReq: 0.0660, yields: { skadite: 0.3200 } }
    },
    electrum: {
        "Blast Furnace": { action: 'stepBlastFurnace', cat: "cp", catReq: 0.0715, yields: { cuprum: 0.3500, gold: 0.1750, silver: 0.2500 } },
        "Furnace": { action: 'stepFurnace', cat: "cp", catReq: 0.0715, yields: { cuprum: 0.2600, gold: 0.1400, silver: 0.1600 } }
    },
    pyroxene: {
        "Blast Furnace": { action: 'stepBlastFurnace', cat: "cp", catReq: 0.0715, yields: { almine: 0.0400, acronite: 0.0800, calamine: 0.2040, electrum: 0.2720 } },
        "Greater Natorus": { action: 'stepExtract', cat: "cp", catReq: 0.0715, yields: { almine: 0.2000, acronite: 0.0160, calamine: 0.3400, electrum: 0.2720 } }
    },
    waterstone: {
        "Fabricula (Rock Oil)": { action: 'stepExtract', cat: "rockoil", catReq: 0.0417, yields: { gemmetal: 0.3200 } },
        "Fabricula (Bor)": { action: 'stepExtract', cat: "bor", catReq: 0.0720, yields: { gemmetal: 0.1920, lupium: 0.0960 } },
        "Fabricula (Fuming Salt)": { action: 'stepExtract', cat: "fumingsalt", catReq: 0.0315, yields: { gemmetal: 0.0640, lupium: 0.2400 } },
        "Blast Furnace (Fuming Salt)": { action: 'stepBlastFurnace', cat: "fumingsalt", catReq: 0.0315, yields: { gemmetal: 0.1248, lupium: 0.3200 } },
        "Blast Furnace (Bor)": { action: 'stepBlastFurnace', cat: "bor", catReq: 0.0715, yields: { gemmetal: 0.1824, lupium: 0.2048 } }
    }
};