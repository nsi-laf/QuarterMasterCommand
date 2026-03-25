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
    pyropite: "Pyropite", nyx: "Nyx", volcanicash: "Volcanic Ash", waterstone: "Waterstone", water: "Water", ritualash: "Ritual Ash", pyrite: "Pyrite", coal: "Coal", coke: "Coke", steel: "Steel", pi: "Pig Iron"
};

const i18n = {
    en: {
        tabPrefs: "Preferences", tabInteg: "Integrations", tabData: "Data", tabHelp: "Help", tabView: "View", tabActions: "Actions", tabGuide: "Guide", tabLegend: "Legend",
        resetDesc: "Clear all your saved bank inventory, market cart quantities, and targets.",
        shareTitle: "Share / Import Setup", shareDesc: "Generate a code to share your current bank, market cart, and target with others, or paste a code to load theirs.",
        btnGenCode: "📤 Generate & Copy", btnLoadCode: "📥 Load Code", importSuccess: "Setup loaded successfully!", importError: "Invalid code provided.", exportSuccess: "Code copied to clipboard!",
        themeToggle: "☀️ / 🌙 Toggle Day/Night Mode", format: "Display Format", optUnits: "Units", optStacks: "Stacks (10k)", webhook: "Discord Webhook URL",
        prodCmd: "Production Command", targetMetalLabel: "Target Resource", targetRecipeLabel: "Recipe Variant", crafters: "Crafters", target: "Amount", 
        btnMaxText: "⚡ Calculate Craftable From Inventory", btnAutoFill: "🛒 Auto-Fill Cart", btnClearCart: "🧹 Clear Cart",
        yieldMods: "Yield Modifiers", mastery: "Mastery (+6%)", refining: "Refining (+3%)", extraction: "Extraction (+3%)",
        btnDiscord: "📋 Copy to Clipboard", btnSend: "🚀 Send Order to Discord",
        invBank: "Inventory Bank", showAllBank: "Show All Materials", btnReset: "🧹 Reset All Bank & Cart", defGather: "Missing Components", mfgPipe: "Manufacturing Pipeline", marketCart: "Market Cart",
        tblPrice: "Price/10k", tblBuy: "Amount to Buy", tblCost: "Cost (g)", tblStash: "Bank + Buy", cartTotal: "Cart Total:",
        noTarget: "No target set.", allCovered: "✅ Bank & Cart cover all required materials!",
        
        stepCrush: "Crush", stepGrind: "Grind", stepExtract: "Extract from",
        stepFurnace: "Use furnace with", stepBlastFurnace: "Use blast furnace with",
        stepAlloy: "Alloy", stepSmelt: "Smelt", stepBake: "Bake", stepRefine: "Refine",
        stepYieldsMain: "Yields:", stepByproducts: "Byproducts:", stepWith: "with", stepAnd: "and", perCrafter: "(Per Crafter)", stepPrefix: "Step",

        tooltipBestYield: "Most Efficient (Lowest Total Material Cost)", tooltipMaxYield: "Max Byproducts Generated", tooltipRegionLocked: "Region Locked Machine",

        resetPrompt: "Reset all bank values and shopping cart to zero?", 
        restartPrompt: "Restart the pipeline? This will un-check all steps and remove their yields from your bank.",
        btnRestart: "🔄 Restart Pipeline", modalActionsTitle: "Pipeline Actions",
        
        discHeader: "⚔️ LOGISTICS ORDER", discReq: "MANUAL GATHER REQUIRED:", discStock: "All gathering covered.", discCopied: "Copied to clipboard!",
        discMarket: "MARKET PURCHASES:", errWebhook: "Please enter a valid Discord Webhook URL.", errSend: "Failed to send to Discord.", sucSend: "Order dispatched to Discord!",
        
        qAdd: "+10k", qAddStk: "+1 Stk", qSub: "-10k", qSubStk: "-1 Stk", byproductsTitle: "TOTAL RECOVERED BYPRODUCTS",
        
        colorAccent: "Primary Color", colorBg: "Secondary Color", colorText: "Text Color", btnResetColors: "Reset Colors",
        viewProd: "Production Command", viewYield: "Yield Modifiers", viewBank: "Inventory Bank", viewCart: "Market Cart", viewGather: "Deficit to Gather", viewPipe: "Manufacturing Pipeline", viewLegend: "Acronym Legend", viewLang: "Language",
        btnBank: "Bank", btnCart: "Cart", btnSettings: "Settings", btnActions: "Actions", btnHelp: "Help",

        legend: "Acronym Legend", legCP: "CP = Calx Powder", legSP: "SP = Saburra Powder", legBO: "BO = Blood Ore", legPI: "PI = Pig Iron", legGS: "GS = Grain Steel", legStk: "Stk = Stack (10,000 units)", legBest: "Most Efficient (Override)", legMax: "Max Byproducts (Override)", legRegion: "🌍 = Region Locked",
        prefRoute: "Global Routing Preference", actCart: "Cart & Inventory Actions", actDiscord: "Discord Dispatch", actPipe: "Pipeline Control", viewPers: "Personalization", viewVis: "Module Visibility",

        categories: { raw: "Raw Materials", basicExt: "Basic Extractions", intOre: "Intermediate Ores", advOre: "Advanced Ores", catalyst: "Catalysts", refined: "Refined Metals" },
        items: baseItems,
        helpSubtitle: "The ultimate MO2 manufacturing calculator and logistics dashboard.",
        helpFeatures: "🌟 Feature Overview",
        helpFeat1: "<b>Pipeline Intelligence:</b> Automatically maps out multi-step refining, extraction, and smelting tasks.",
        helpFeat2: "<b>Calculate Craftable:</b> Scans your current bank inventory to calculate the absolute maximum amount of target metal you can produce.",
        helpFeat3: "<b>Dynamic Recipe Routing:</b> Use the <i>Settings</i> menu to force the engine to calculate the <b>⭐ Most Efficient</b> path, or the path with <b>💎 Max Byproducts</b>.",
        helpFeat4: "<b>Smart Market Cart:</b> Enter market prices and buy quantities. Use <i>Auto-Fill All</i> to calculate exactly how much you need to buy and see the <b>Total Gold Cost</b>.",
        helpFeat5: "<b>Discord Dispatch:</b> Generates a beautifully formatted Markdown work order—separating Market Purchases from Manual Gathering—ready to paste directly into Discord.",
        helpHowTo: "📖 How to Use",
        helpHow1: "<b>Set Your Objective:</b> Select your <i>Target Metal</i> (e.g., Steel) and desired <i>Amount</i>. Set your <i>Crafters</i> count to automatically divide the workload.",
        helpHow2: "<b>Check Your Bank:</b> Input your current inventory into the <i>Inventory Bank</i>. <br><i>Tip: If you don't know what to make, enter your materials and click <b>⚡ Calculate Craftable From Inventory</b> to see your limits.</i>",
        helpHow3: "<b>Go Shopping:</b> Check the <i>Market Cart</i> module. Set local prices, then click <b>🛒 Auto-Fill All</b> in the <i>⚡ Actions</i> tab to calculate your missing deficit.",
        helpHow4: "<b>Dispatch the Order:</b> Review the <i>Deficit to Gather</i> and <i>Manufacturing Pipeline</i>. Push the final order to your Discord via Webhook."
    },
    
    fr: {
        tabPrefs: "Préférences", tabInteg: "Intégrations", tabData: "Données", tabHelp: "Aide", tabView: "Affichage", tabActions: "Actions", tabGuide: "Guide", tabLegend: "Légende",
        resetDesc: "Effacez tout votre inventaire, les quantités du panier et les objectifs.",
        shareTitle: "Partager / Importer", shareDesc: "Générez un code pour partager votre banque, panier et objectif, ou collez un code pour charger celui d'un autre joueur.",
        btnGenCode: "📤 Générer & Copier", btnLoadCode: "📥 Charger", importSuccess: "Configuration chargée avec succès !", importError: "Code invalide.", exportSuccess: "Code copié dans le presse-papiers !",
        themeToggle: "☀️ / 🌙 Mode Jour/Nuit", format: "Format d'affichage", optUnits: "Unités", optStacks: "Piles (10k)", webhook: "URL Webhook Discord",
        prodCmd: "Commande de Production", targetMetalLabel: "Ressource Cible", targetRecipeLabel: "Recette", crafters: "Artisans", target: "Quantité", 
        btnMaxText: "⚡ Calculer la production possible", btnAutoFill: "🛒 Remplir le Panier", btnClearCart: "🧹 Vider le Panier",
        yieldMods: "Modificateurs", mastery: "Maîtrise (+6%)", refining: "Raffinage (+3%)", extraction: "Extraction (+3%)",
        btnDiscord: "📋 Copier l'ordre", btnSend: "🚀 Envoyer sur Discord",
        invBank: "Banque d'Inventaire", showAllBank: "Afficher Tout", btnReset: "🧹 Réinitialiser Tout", defGather: "Composants Manquants", mfgPipe: "Pipeline de Fabrication", marketCart: "Panier", 
        tblPrice: "Prix/10k", tblBuy: "Qté à Acheter", tblCost: "Coût (o)", tblStash: "Banque + Achat", cartTotal: "Total Panier :",
        noTarget: "Aucun objectif défini.", allCovered: "✅ La banque couvre tout !",
        
        stepCrush: "Concassez", stepGrind: "Broyez", stepExtract: "Extrayez de",
        stepFurnace: "Utilisez le four avec", stepBlastFurnace: "Utilisez le haut-fourneau avec",
        stepAlloy: "Alliez", stepSmelt: "Fondez", stepBake: "Cuisez", stepRefine: "Raffinez",
        stepYieldsMain: "Produits :", stepByproducts: "Sous-produits :", stepWith: "avec", stepAnd: "et", perCrafter: "(Par Artisan)", stepPrefix: "Étape",

        tooltipBestYield: "Plus Efficace (Coût Total le Plus Bas)", tooltipMaxYield: "Maximum de Sous-produits Générés", tooltipRegionLocked: "Machine Limitée par Région",

        resetPrompt: "Réinitialiser toutes les valeurs à zéro ?", 
        restartPrompt: "Redémarrer le pipeline ? Cela décochea toutes les étapes et supprimera leurs rendements de votre banque.",
        btnRestart: "🔄 Redémarrer le Pipeline", modalActionsTitle: "Actions du Pipeline",
        
        discHeader: "⚔️ ORDRE LOGISTIQUE", discReq: "RÉCOLTE MANUELLE REQUISE :", discStock: "Toute la récolte est couverte.", discCopied: "Copié dans le presse-papiers !",
        discMarket: "ACHATS AU MARCHÉ :", errWebhook: "URL Webhook invalide.", errSend: "Échec de l'envoi.", sucSend: "Ordre envoyé sur Discord !",
        
        qAdd: "+10k", qAddStk: "+1 Pile", qSub: "-10k", qSubStk: "-1 Pile", byproductsTitle: "SOUS-PRODUITS RÉCUPÉRÉS TOTAL",
        
        colorAccent: "Couleur Primaire", colorBg: "Couleur Secondaire", colorText: "Couleur du Texte", btnResetColors: "Réinitialiser les Couleurs",
        viewProd: "Commande de Production", viewYield: "Modificateurs de Rendement", viewBank: "Banque d'Inventaire", viewCart: "Panier", viewGather: "Déficit à Récolter", viewPipe: "Pipeline de Fabrication", viewLegend: "Légende des Acronymes", viewLang: "Langue",
        btnBank: "Banque", btnCart: "Panier", btnSettings: "Paramètres", btnActions: "Actions", btnHelp: "Aide",

        legend: "Légende des Acronymes", legCP: "CP = Calx Powder", legSP: "SP = Saburra Powder", legBO: "BO = Blood Ore", legPI: "PI = Pig Iron (Fonte)", legGS: "GS = Grain Steel", legStk: "Stk = Pile (10,000 unités)", legBest: "Plus Efficace (Priorité)", legMax: "Max Sous-produits (Priorité)", legRegion: "🌍 = Limitée par Région",
        prefRoute: "Préférence de Routage Globale", actCart: "Actions du Panier et Banque", actDiscord: "Envoi Discord", actPipe: "Contrôle du Pipeline", viewPers: "Personnalisation", viewVis: "Visibilité des Modules",

        categories: { raw: "Matières Premières", basicExt: "Extractions de Base", intOre: "Minerais Intermédiaires", advOre: "Minerais Avancés", catalyst: "Catalyseurs", refined: "Métaux Raffinés" },
        items: baseItems,
        helpSubtitle: "L'ultime calculateur de fabrication et tableau de bord logistique pour MO2.",
        helpFeatures: "🌟 Aperçu des Fonctionnalités",
        helpFeat1: "<b>Intelligence du Pipeline :</b> Cartographie automatiquement les étapes d'extraction, de raffinage et de fusion.",
        helpFeat2: "<b>Calculer la Production Possible :</b> Analyse votre inventaire bancaire actuel pour calculer la quantité maximale absolue du métal ciblé que vous pouvez produire.",
        helpFeat3: "<b>Routage Dynamique :</b> Utilisez le menu <i>Paramètres</i> pour forcer le moteur à calculer le chemin <b>⭐ Plus Efficace</b>, ou le chemin avec <b>💎 Max Sous-produits</b>.",
        helpFeat4: "<b>Panier Intelligent :</b> Entrez les prix du marché et les quantités d'achat. Utilisez <i>Tout Remplir</i> pour calculer exactement combien vous devez acheter et voir le <b>Coût Total en Or</b>.",
        helpFeat5: "<b>Envoi Discord :</b> Génère un ordre de travail Markdown magnifiquement formaté, séparant les achats au marché de la récolte manuelle, prêt à être collé directement dans Discord.",
        helpHowTo: "📖 Comment utiliser",
        helpHow1: "<b>Définissez votre Objectif :</b> Sélectionnez votre <i>Métal Cible</i> (ex. Acier) et la <i>Quantité</i> désirée. Définissez le nombre d'<i>Artisans</i> pour diviser automatiquement la charge de travail.",
        helpHow2: "<b>Vérifiez votre Banque :</b> Entrez votre inventaire actuel dans la <i>Banque d'Inventaire</i>. <br><i>Astuce : Si vous ne savez pas quoi fabriquer, entrez vos matériaux et cliquez sur <b>⚡ Calculer la production possible</b> pour voir vos limites.</i>",
        helpHow3: "<b>Faites vos Achats :</b> Consultez le module <i>Panier</i>. Définissez les prix locaux, puis cliquez sur <b>🛒 Tout Remplir</b> dans <i>⚡ Actions</i> pour calculer votre déficit manquant.",
        helpHow4: "<b>Envoyez l'Ordre :</b> Passez en revue le <i>Déficit à Récolter</i> et le <i>Pipeline de Fabrication</i>. Poussez l'ordre sur votre Discord via Webhook."
    }
};