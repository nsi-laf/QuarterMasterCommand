function openModal(modalId) {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    document.getElementById(modalId).style.display = 'block';
    if(modalId === 'settingsModal') switchTab('prefs');
    if(modalId === 'helpModal') switchHelpTab('guide');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) { 
    ['settingsModal', 'actionsModal', 'helpModal'].forEach(id => {
        if (event.target == document.getElementById(id)) closeModal(id); 
    });
}

function switchTab(tabId) {
    document.querySelectorAll('#settingsModal .tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('#settingsModal .tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab_' + tabId).style.display = 'block';
    document.getElementById('tabBtn_' + tabId).classList.add('active');
}

function switchHelpTab(tabId) {
    document.querySelectorAll('#helpModal .tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('#helpModal .tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab_help_' + tabId).style.display = 'block';
    document.getElementById('tabBtn_help_' + tabId).classList.add('active');
}

function toggleCollapse(id) {
    const el = document.getElementById(id);
    if (el.classList.contains('collapsed')) {
        el.classList.remove('collapsed');
        collapsedState[id] = false;
    } else {
        el.classList.add('collapsed');
        collapsedState[id] = true;
    }
    save();
}

function toggleMainModule(modId, isVisible = null) {
    const el = document.getElementById(modId);
    if (!el) return;

    if (isVisible === null) {
        isVisible = el.classList.contains('module-hidden');
    }

    if (isVisible) el.classList.remove('module-hidden');
    else el.classList.add('module-hidden');

    moduleVisibility[modId] = isVisible;
    
    const checkboxId = modId.replace('mod_', 'view_');
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) checkbox.checked = isVisible;

    if (modId === 'mod_invBank') document.getElementById('btnHeaderBank').classList.toggle('active', isVisible);
    if (modId === 'mod_marketCart') document.getElementById('btnHeaderCart').classList.toggle('active', isVisible);

    save();
}

function setLang(code) {
    document.getElementById('lang').value = code;
    changeLang();
    save();
}

function changeLang() {
    currentLang = document.getElementById('lang').value;
    const t = i18n[currentLang];
    
    document.getElementById('flag_en').classList.toggle('active', currentLang === 'en');
    document.getElementById('flag_fr').classList.toggle('active', currentLang === 'fr');
    
    const standardElements = [
        'tabPrefs', 'tabInteg', 'tabData', 'tabHelp', 'tabView', 'tabActions', 'resetDesc', 'themeToggle', 'format', 
        'optUnits', 'optStacks', 'webhook', 'prodCmd', 'targetMetalLabel', 'target', 'crafters', 
        'yieldMods', 'mastery', 'refining', 'extraction', 'btnMaxText', 'btnDiscord', 'btnSend', 
        'invBank', 'showAllBank', 'btnReset', 'defGather', 'mfgPipe', 'marketCart', 'btnAutoFill', 
        'shareTitle', 'shareDesc', 'btnGenCode', 'btnLoadCode', 'helpFeatures', 'helpHowTo',
        'colorAccent', 'colorBg', 'colorText', 'btnResetColors', 'viewProd', 'viewYield',
        'viewBank', 'viewCart', 'viewGather', 'viewPipe', 'btnRestart', 'legend', 'legCP', 'legSP',
        'legBO', 'legPI', 'legGS', 'legStk', 'legBest', 'legMax', 'legRegion', 'viewLegend', 'btnBank', 'btnCart', 
        'btnSettings', 'btnActions', 'btnHelp', 'btnClearCart', 'modalActionsTitle', 'viewLang',
        'prefRoute', 'actCart', 'actDiscord', 'actPipe', 'viewPers', 'viewVis', 'tabGuide', 'tabLegend', 'legBestTxt', 'legMaxTxt', 'legRegionTxt'
    ];
    
    const htmlElements = [
        'helpSubtitle', 'helpFeat1', 'helpFeat2', 'helpFeat3', 'helpFeat4', 'helpFeat5',
        'helpHow1', 'helpHow2', 'helpHow3', 'helpHow4'
    ];

    standardElements.forEach(id => {
        let el = document.getElementById('ui_' + id);
        if (el) el.innerText = t[id] || i18n.en[id];
    });

    htmlElements.forEach(id => {
        let el = document.getElementById('ui_' + id);
        if (el) el.innerHTML = t[id] || i18n.en[id];
    });

    renderBankTable(); 
    renderMarketTable(); 
    run();
}