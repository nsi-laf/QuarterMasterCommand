let timer = null;
let prevMode = 'units';
let currentLang = 'en';
let collapsedState = {};
let completedSteps = [];
let pureDeficits = {}; 
let pipelineStepsRaw = []; 
let byproductsRaw = {}; 
let pipelineViewMode = 'overview';
let marketData = {}; 
let focusIndex = 0;
let userPathChoices = {};
let globalRoutePref = null; 

let moduleVisibility = {
    'mod_prodCmd': true, 'mod_yieldMods': true, 'mod_legend': false,
    'mod_invBank': false, 'mod_marketCart': false, 'mod_defGather': true, 'mod_mfgPipe': true
};
let customColors = { accent: null, bg: null, text: null };

function save() {
    const data = { collapsed: collapsedState, completedSteps: completedSteps, market: marketData, moduleVisibility: moduleVisibility, customColors: customColors, userPathChoices: userPathChoices, globalRoutePref: globalRoutePref };
    document.querySelectorAll('input:not([type="checkbox"]):not([type="password"]):not([type="color"]), select:not(.step-route-select)').forEach(el => data[el.id] = el.value);
    document.querySelectorAll('input[type="checkbox"]').forEach(el => data[el.id] = el.checked);
    data.webhookUrl = document.getElementById('webhookUrl').value;
    data.theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    data.lang = currentLang;
    localStorage.setItem('QM_Steel_v8', JSON.stringify(data));
}

function load() {
    const d = JSON.parse(localStorage.getItem('QM_Steel_v8'));
    if (!d) {
        resetColors();
        return;
    }
    
    Object.keys(d).forEach(id => {
        const el = document.getElementById(id);
        if (el && el.id !== 'webhookUrl' && id !== 'collapsed' && id !== 'completedSteps' && id !== 'market' && id !== 'moduleVisibility' && id !== 'customColors' && id !== 'userPathChoices' && id !== 'globalRoutePref') {
            if(el.type === 'checkbox') el.checked = d[id];
            else el.value = d[id];
        }
    });
    
    if (d.market) marketData = d.market;
    if (d.userPathChoices) userPathChoices = d.userPathChoices;
    if (d.globalRoutePref) globalRoutePref = d.globalRoutePref;
    if (d.webhookUrl) document.getElementById('webhookUrl').value = d.webhookUrl;
    if (d.theme === 'light') document.body.classList.add('light-theme');
    if (d.lang) currentLang = (d.lang === 'en' || d.lang === 'fr') ? d.lang : 'en';
    if (d.completedSteps) completedSteps = d.completedSteps;
    
    if (d.collapsed) {
        collapsedState = d.collapsed;
        Object.keys(collapsedState).forEach(id => {
            if (collapsedState[id]) {
                const el = document.getElementById(id);
                if (el) el.classList.add('collapsed');
            }
        });
    }

    if (d.moduleVisibility) {
        moduleVisibility = d.moduleVisibility;
        Object.keys(moduleVisibility).forEach(modId => {
            const isVisible = moduleVisibility[modId];
            const checkboxId = modId.replace('mod_', 'view_');
            const checkbox = document.getElementById(checkboxId); 
            if(checkbox) checkbox.checked = isVisible;
            
            const el = document.getElementById(modId);
            if(el) {
                if(isVisible) el.classList.remove('module-hidden');
                else el.classList.add('module-hidden');
            }
            
            if(modId === 'mod_invBank') document.getElementById('btnHeaderBank').classList.toggle('active', isVisible);
            if(modId === 'mod_marketCart') document.getElementById('btnHeaderCart').classList.toggle('active', isVisible);
        });
    }
    
    if (d.customColors && d.customColors.accent && d.customColors.bg && d.customColors.text) {
        customColors = d.customColors;
        document.getElementById('colorAccent').value = customColors.accent;
        document.documentElement.style.setProperty('--accent', customColors.accent);
        document.getElementById('colorBg').value = customColors.bg;
        document.documentElement.style.setProperty('--bg-card', customColors.bg);
        document.getElementById('colorText').value = customColors.text;
        document.documentElement.style.setProperty('--text', customColors.text);
    } else {
        resetColors();
    }
    
    prevMode = document.getElementById('mode').value || 'units';

    if (globalRoutePref === 'efficient') document.getElementById('btnPrefEfficient')?.classList.add('active-global');
    if (globalRoutePref === 'yield') document.getElementById('btnPrefYield')?.classList.add('active-global');
}

function clearAll() {
    if(confirm(i18n[currentLang].resetPrompt)) {
        document.querySelectorAll('input[id^="b_"]').forEach(el => el.value = 0);
        Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => marketData[k] = [{ p: defaultPrices[k] || 0, q: 0 }]);
        document.getElementById('targetAmount').value = document.getElementById('mode').value === 'stacks' ? 1 : 10000;
        completedSteps = [];
        closeModal('settingsModal');
        closeModal('actionsModal');
        renderMarketTable();
        handlePipelineChange();
    }
}

function generateShareCode() {
    let state = { b: {}, m: {}, s: {}, c: userPathChoices };
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let v = Number(document.getElementById('b_'+k)?.value);
        if (v) state.b[k] = v;
    });
    
    state.m = marketData;
    state.s.t = document.getElementById('targetMetal').value;
    state.s.a = document.getElementById('targetAmount').value;
    state.s.c = document.getElementById('crafters').value;
    state.s.m = document.getElementById('mode').value;
    
    const code = btoa(JSON.stringify(state));
    document.getElementById('shareCode').value = code;
    navigator.clipboard.writeText(code);
    alert(i18n[currentLang].exportSuccess || "Code copied to clipboard!");
}

function loadShareCode() {
    try {
        const code = document.getElementById('shareCode').value.trim();
        if (!code) return;
        const state = JSON.parse(atob(code));
        
        document.querySelectorAll('input[id^="b_"]').forEach(el => el.value = 0);
        if (state.b) Object.keys(state.b).forEach(k => { const el = document.getElementById('b_'+k); if(el) el.value = state.b[k]; });
        if (state.m) marketData = state.m;
        if (state.c) userPathChoices = state.c;
        
        if (state.s) {
            if(state.s.t) document.getElementById('targetMetal').value = state.s.t;
            if(state.s.a) document.getElementById('targetAmount').value = state.s.a;
            if(state.s.c) document.getElementById('crafters').value = state.s.c;
            if(state.s.m) {
                document.getElementById('mode').value = state.s.m;
                prevMode = state.s.m;
            }
        }
        save(); renderBankTable(); renderMarketTable(); handlePipelineChange();
        alert(i18n[currentLang].importSuccess || "Setup loaded successfully!");
    } catch(e) {
        alert(i18n[currentLang].importError || "Invalid code provided.");
    }
}