const baseItems = {
    granum: "Granum", calx: "Calx", saburra: "Saburra", tephra: "Tephra", bor: "Bor", gabore: "Gabore", kimurite: "Kimurite", lodestone: "Lodestone", risensacrificecarcass: "Risen Sacrifice",
    sp: "Saburra Powder", cp: "Calx Powder", gaborepowder: "Gabore Powder", lodestonepowder: "Lodestone Powder",
    bo: "Blood Ore", gs: "Grain Steel",
    cuprum: "Cuprum", bron: "Bron", messing: "Messing", tmessing: "Tindremic Messing", tungsteel: "Tungsteel", cronite: "Cronite", oghmium: "Oghmium",
    amarantum: "Amarantum", flakestone: "Flakestone", granumpowder: "Granum Powder", malachite: "Malachite", bleckblende: "Bleckblende", calamine: "Calamine",
    jadeite: "Jadeite", calspar: "Calspar", galbinum: "Galbinum", redbleckblende: "Red Bleckblende", pyroxene: "Pyroxene", almine: "Almine", acronite: "Acronite",
    sanguinite: "Sanguinite", fumingsalt: "Fuming Salt", lupium: "Lupium", gemmetal: "Gem Metal",
    tallow: "Tallow", dragonsalt: "Dragon Salt", ichor: "Ichor", sulfur: "Sulfur", rockoil: "Rock Oil",
    bleck: "Bleck", chalkglance: "Chalk Glance", cinnabar: "Cinnabar", magmum: "Magmum", aabam: "Aabam",
    gold: "Gold", silver: "Silver", skadite: "Skadite", pitch: "Pitch", kyanite: "Kyanite", maalite: "Maalite",
    pyropite: "Pyropite", nyx: "Nyx", volcanicash: "Volcanic Ash", waterstone: "Waterstone", ritualash: "Ritual Ash", pyrite: "Pyrite",
    water: "Water", coal: "Coal", coke: "Coke", steel: "Steel", pi: "Pig Iron"
};

const i18n = {
    en: {
        tabPrefs: "Preferences", tabData: "Data", tabHelp: "Help", tabView: "View", tabGuide: "Guide", tabLegend: "Legend",
        resetDesc: "Clear all your saved inventory, market cart quantities, and targets.",
        shareTitle: "Share / Import Setup", shareDesc: "Generate a code to share your current inventory, market cart, and target with others, or paste a code to load theirs.",
        btnGenCode: "Generate & Copy", btnLoadCode: "Load Code", importSuccess: "Setup loaded successfully!", importError: "Invalid code provided.", exportSuccess: "Code copied to clipboard!",
        format: "Display Format", optUnits: "Units", optStacks: "Stacks (10k)", webhook: "Discord Webhook URL",

        btnProd: "Production", prodCmdTitle: "Production Command", targetMetalLabel: "Target Resource", crafters: "Crafters", target: "Amount",

        btnAutoFill: "Fill", btnClearCart: "Clear",
        yieldMods: "Preferences", mastery: "Mastery (+6%)", refining: "Refining (+3%)", extraction: "Extraction (+3%)",
        btnDiscord: "Copy to Clipboard", btnSend: "Send Order to Discord",
        btnPrefs: "Preferences", yieldModsModal: "Preferences",

        btnBank: "Inventory",
        invBankTitle: "Inventory",

        invBank: "Inventory", showAllBank: "Show All Materials", showAllCart: "Show All Materials", btnReset: "Reset All", defGather: "Missing Components", mfgPipe: "Manufacturing Pipeline", marketCart: "Market Cart", marketCartTitle: "Market Cart",
        tblPrice: "Price", tblBuy: "Amount to Buy", tblCost: "Cost", tblStash: "Stash", cartTotal: "Cart Total:",
        tblOrder: "Order",

        noTarget: "No target set.", allCovered: "Inventory & Cart cover all required materials!",
        searchPlaceholder: "Search...",

        verbCrush: "Crush", verbGrind: "Grind", verbExtract: "Extract", verbSmelt: "Smelt", verbBake: "Bake", verbAlloy: "Alloy", verbProcess: "Process",
        inMachine: "in the", stepWith: "with", stepAnd: "and", perCrafter: "(Per Crafter)", stepPrefix: "Step",
        stepYieldsMain: "Yields:", stepByproducts: "Byproducts:", none: "None",

        pipeCompleted: "Production Progress",
        btnPipeReset: "Reset",

        tooltipBestYield: "Most Efficient (Lowest Total Material Cost)", tooltipMaxYield: "Max Byproducts Generated", tooltipRegionLocked: "Region Locked Machine",
        tooltipMaxCraft: "Calculate how much you can make with just your inventory", tooltipShowAll: "Show items not strictly related to the target metal",

        resetPrompt: "Reset all inventory values and shopping cart to zero?",
        restartPrompt: "Restart the pipeline? This will un-check all steps and remove their yields from your inventory.",
        modalActionsTitle: "Pipeline Actions",

        discHeader: "LOGISTICS ORDER", discReq: "MISSING COMPONENTS:", discStock: "All gathering covered.", discCopied: "Copied to clipboard!",
        discMarket: "MARKET PURCHASES:", errWebhook: "Please enter a valid Discord Webhook URL.", errSend: "Failed to send to Discord.", sucSend: "Order dispatched to Discord!",

        qAdd: "+10k", qAddStk: "+1 Stk", qSub: "-10k", qSubStk: "-1 Stk", byproductsTitle: "TOTAL RECOVERED BYPRODUCTS", bpTitle: "TOTAL RECOVERED BYPRODUCTS", btnBp: "Byproducts",
        btnPrefEfficient: "Efficient Path", btnPrefYield: "Max Yield",
        lblEfficient: "Efficient", lblMaxYield: "Max Yield", lblRegionLocked: "Region Locked",

        chkBp: "Show byproducts",

        colorAccent: "Primary Color", colorBg: "Secondary Color", colorText: "Text Color", btnResetColors: "Reset Colors to Default",
        viewPers: "Personalization", viewVis: "Module Visibility", viewLang: "Language", viewGather: "Missing Components", viewPipe: "Manufacturing Pipeline", viewProdCmd: "Production Command",
        btnCart: "Cart", btnSettings: "Settings", btnHelp: "Help", btnExportCSV: "Export to CSV", actDiscord: "Discord Dispatch",

        btnMaxText: "Calculate Max Craftable",
        maxTitle: "Crafting Limit Reached", maxAcknowledge: "Acknowledge",
        maxCraftAny: "Cannot craft any [item] with your current bank.",
        maxMissing: "To reach your original target of [target], you are still missing:",
        maxTotalCraft: "You have enough materials to craft",
        maxCalculatedGoal: "You have enough to meet or exceed your target.",

        legAcronyms: "Acronyms",
        legEff: "Efficient", legYld: "Max Yield", legReg: "Region Locked",

        helpSubtitle: "The ultimate MO2 manufacturing calculator and logistics dashboard.",
        helpFeatures: "Feature Overview",
        helpFeat1: "<strong>Pipeline Intelligence:</strong> Automatically maps out multi-step extraction, refining, and smelting tasks.",
        helpFeat3: "<strong>Dynamic Recipe Routing:</strong> Use the route badges (E, Y, R) to choose the Most Efficient path or the path with Max Byproducts.",
        helpFeat4: "<strong>Smart Market Cart:</strong> Enter market prices and buy quantities. Use Auto-Fill to calculate exactly how much you need to buy and see the total gold cost.",
        helpFeat5: "<strong>Discord Dispatch:</strong> Generates a beautifully formatted Markdown work order—separating Market Purchases from Manual Gathering—ready to paste directly into Discord.",
        helpHowTo: "How to Use",
        helpHow1: "<strong>Set Your Objective:</strong> Select your Target Metal and desired Amount. Set your Crafters count to automatically divide the workload.",
        helpHow2: "<strong>Check Your Inventory:</strong> Input your current supply into the Inventory.",
        helpHow3: "<strong>Go Shopping:</strong> Check the Market Cart module. Set local prices, then click Fill in the Cart to calculate your missing deficit.",
        helpHow4: "<strong>Dispatch the Order:</strong> Review the Missing Components and Manufacturing Pipeline. Push the final order to your Discord via Webhook in the Settings menu.",

        categories: {
            raw: "Raw Materials", basicExt: "Basic Extractions", intOre: "Intermediate Ores", advOre: "Advanced Ores", catalyst: "Catalysts", refined: "Refined Metals",
            "Raw Materials": "Raw Materials", "Basic Extractions": "Basic Extractions", "Intermediate Ores": "Intermediate Ores", "Advanced Ores": "Advanced Ores", "Catalysts": "Catalysts", "Refined Metals": "Refined Metals"
        },
        items: baseItems
    },

    fr: {
        tabPrefs: "Préférences", tabData: "Données", tabHelp: "Aide", tabView: "Vue", tabGuide: "Aide", tabLegend: "Légende",
        resetDesc: "Effacez tout votre inventaire, les quantités du panier et les objectifs.",
        shareTitle: "Partager / Importer", shareDesc: "Générez un code pour partager votre inventaire, votre panier et votre objectif, ou collez un code pour charger celui d'un autre.",
        btnGenCode: "Générer & Copier", btnLoadCode: "Charger le Code", importSuccess: "Configuration chargée avec succès !", importError: "Code invalide fourni.", exportSuccess: "Code copié dans le presse-papiers !",
        format: "Format d'affichage", optUnits: "Unités", optStacks: "Piles (10k)", webhook: "URL du Webhook Discord",

        btnProd: "Production", prodCmdTitle: "Commande de Production", targetMetalLabel: "Ressource Cible", crafters: "Artisans", target: "Quantité",

        btnAutoFill: "Remplir", btnClearCart: "Vider",
        yieldMods: "Préférences", mastery: "Maîtrise (+6%)", refining: "Raffinage (+3%)", extraction: "Extraction (+3%)",
        btnDiscord: "Copier dans le presse-papiers", btnSend: "Envoyer l'ordre sur Discord",
        btnPrefs: "Préférences", yieldModsModal: "Préférences",

        btnBank: "Inventaire",
        invBankTitle: "Inventaire",

        invBank: "Inventaire", showAllBank: "Afficher tous les matériaux", showAllCart: "Afficher tous les matériaux", btnReset: "Tout réinitialiser", defGather: "Composants manquants", mfgPipe: "Pipeline de fabrication", marketCart: "Panier du marché", marketCartTitle: "Panier du marché",
        tblPrice: "Prix", tblBuy: "Quantité à acheter", tblCost: "Coût", tblStash: "Stock", cartTotal: "Total du panier :",
        tblOrder: "Commande",

        noTarget: "Aucun objectif défini.", allCovered: "L'inventaire et le panier couvrent tous les matériaux requis !",
        searchPlaceholder: "Rechercher...",

        verbCrush: "Concassez", verbGrind: "Broyez", verbExtract: "Extrayez", verbSmelt: "Fondez", verbBake: "Cuisez", verbAlloy: "Alliez", verbProcess: "Traitez",
        inMachine: "dans le", stepWith: "avec", stepAnd: "et", perCrafter: "(Par artisan)", stepPrefix: "Étape",
        stepYieldsMain: "Produits :", stepByproducts: "Sous-produits :", none: "Aucun",

        pipeCompleted: "Progression de la production",
        btnPipeReset: "Réinitialiser",

        tooltipBestYield: "Plus efficace (Coût matériel total le plus bas)", tooltipMaxYield: "Maximum de sous-produits générés",
        tooltipRegionLocked: "Restreint par région",
        tooltipMaxCraft: "Calculez ce que vous pouvez fabriquer uniquement avec votre inventaire", tooltipShowAll: "Afficher les éléments non strictement liés au métal cible",

        resetPrompt: "Réinitialiser toutes les valeurs d'inventaire et le panier à zéro ?",
        restartPrompt: "Redémarrer le pipeline ? Cela décochea toutes les étapes et supprimera leurs produits de votre inventaire.",
        modalActionsTitle: "Actions du pipeline",

        discHeader: "ORDRE LOGISTIQUE", discReq: "COMPOSANTS MANQUANTS :", discStock: "Toute la récolte est couverte.", discCopied: "Copié dans le presse-papiers !",
        discMarket: "ACHATS AU MARCHÉ :", errWebhook: "Veuillez entrer une URL de Webhook Discord valide.", errSend: "Échec de l'envoi vers Discord.", sucSend: "Ordre envoyé sur Discord !",

        qAdd: "+10k", qAddStk: "+1 Pile", qSub: "-10k", qSubStk: "-1 Pile", byproductsTitle: "TOTAL DES SOUS-PRODUITS RÉCUPÉRÉS", bpTitle: "TOTAL DES SOUS-PRODUITS RÉCUPÉRÉS", btnBp: "Sous-produits",
        btnPrefEfficient: "Route Efficace", btnPrefYield: "Rendement Max",
        lblEfficient: "Efficace", lblMaxYield: "Rendement Max",
        lblRegionLocked: "RESTREINT PAR RÉGION",

        chkBp: "Afficher les sous-produits",

        colorAccent: "Couleur primaire", colorBg: "Couleur secondaire", colorText: "Couleur du texte", btnResetColors: "Réinitialiser les couleurs par défaut",
        viewPers: "Personnalisation", viewVis: "Visibilité des modules", viewLang: "Langue", viewGather: "Composants manquants", viewPipe: "Pipeline de fabrication", viewProdCmd: "Commande de production",
        btnCart: "Panier", btnSettings: "Paramètres", btnHelp: "Aide", btnExportCSV: "Exporter en CSV", actDiscord: "Envoi Discord",

        btnMaxText: "Calculer le max fabricable",
        maxTitle: "Limite de fabrication atteinte", maxAcknowledge: "Accepter",
        maxCraftAny: "Impossible de fabriquer du [item] avec votre banque actuelle.",
        maxMissing: "Pour atteindre votre objectif initial de [target], il vous manque encore :",
        maxTotalCraft: "Vous avez assez de matériaux pour fabriquer",
        maxCalculatedGoal: "Vous avez tout ce qu'il faut pour atteindre votre objectif !",

        legAcronyms: "Acronymes",
        legEff: "Efficace", legYld: "Rendement Max",
        legReg: "Restreint par région",

        helpSubtitle: "L'ultime calculateur de fabrication et tableau de bord logistique pour MO2.",
        helpFeatures: "Aperçu des fonctionnalités",
        helpFeat1: "<strong>Intelligence du Pipeline:</strong> Cartographie automatiquement les étapes d'extraction, de raffinage et de fusion.",
        helpFeat3: "<strong>Routage Dynamique:</strong> Utilisez les badges (E, Y, R) pour forcer le moteur à calculer le chemin le Plus Efficace, ou avec le Rendement Max.",
        helpFeat4: "<strong>Panier Intelligent:</strong> Entrez les prix du marché et les quantités d'achat. Utilisez Remplir pour calculer exactement combien vous devez acheter.",
        helpFeat5: "<strong>Envoi Discord:</strong> Génère un ordre de travail Markdown magnifiquement formaté, prêt à être collé directement dans Discord.",
        helpHowTo: "Comment utiliser",
        helpHow1: "<strong>Définissez votre objectif:</strong> Sélectionnez votre Ressource Cible et la quantité désirée. Définissez le nombre d'Artisans pour diviser la charge.",
        helpHow2: "<strong>Vérifiez votre inventaire:</strong> Entrez votre stock actuel dans le module Inventaire.",
        helpHow3: "<strong>Faites vos achats:</strong> Consultez le module Panier. Définissez les prix locaux, puis cliquez sur Remplir pour calculer votre déficit.",
        helpHow4: "<strong>Envoyez l'ordre:</strong> Passez en revue les Composants Manquants et le Pipeline. Poussez l'ordre vers votre Discord via Webhook.",

        categories: {
            raw: "Matières premières", basicExt: "Extractions de base", intOre: "Minerais intermédiaires", advOre: "Minerais avancés", catalyst: "Catalyseurs", refined: "Métaux raffinés",
            "Raw Materials": "Matières premières", "Basic Extractions": "Extractions de base", "Intermediate Ores": "Minerais intermédiaires", "Advanced Ores": "Minerais avancés", "Catalysts": "Catalyseurs", "Refined Metals": "Métaux raffinés"
        },
        items: baseItems
    }
};