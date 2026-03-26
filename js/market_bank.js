function initMarketData() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let p = defaultPrices[k];
        if (!p) p = (k === 'tephra') ? 40 : 15;
        if (!marketData[k]) marketData[k] = [{ p: p, q: 0 }];
    });
}

function addMarketTier(k) {
    let p = defaultPrices[k];
    if (!p) p = (k === 'tephra') ? 40 : 15;
    marketData[k].push({ p: p, q: 0 });
    renderMarketTable();
}

function removeMarketTier(k, idx) {
    marketData[k].splice(idx, 1);
    renderMarketTable();
    handlePipelineChange();
}

function clearMarketTier(k, idx) {
    marketData[k][idx].q = 0;
    renderMarketTable();
    handlePipelineChange();
}

function clearCart() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let p = defaultPrices[k];
        if (!p) p = (k === 'tephra') ? 40 : 15;
        marketData[k] = [{ p: p, q: 0 }];
    });
    renderMarketTable();
    handlePipelineChange();
}

function updateMarketTier(k, idx, field, val) {
    marketData[k][idx][field] = Number(val) || 0;
    handlePipelineChange();
}

function quickAddMarket(k, idx) {
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(marketData[k][idx].q) || 0;
    marketData[k][idx].q = isStacks ? parseFloat((current + 1).toFixed(4)) : current + 10000;
    renderMarketTable();
    handlePipelineChange();
}

function quickSubMarket(k, idx) {
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(marketData[k][idx].q) || 0;
    marketData[k][idx].q = Math.max(0, isStacks ? parseFloat((current - 1).toFixed(4)) : current - 10000);
    renderMarketTable();
    handlePipelineChange();
}

function autoFillMarketItem(k) {
    const mode = document.getElementById('mode').value;
    let needed = pureDeficits[k] || 0;
    let defaultP = defaultPrices[k];
    if (!defaultP) defaultP = (k === 'tephra') ? 40 : 15;

    let currentP = marketData[k]?.[0]?.p || defaultP;

    marketData[k] = [{
        p: currentP,
        q: mode === 'stacks' ? parseFloat((needed / 10000).toFixed(4)) : needed
    }];

    renderMarketTable();
    handlePipelineChange();
}

function autoFillCart() {
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        const mode = document.getElementById('mode').value;
        let needed = pureDeficits[k] || 0;
        let defaultP = defaultPrices[k];
        if (!defaultP) defaultP = (k === 'tephra') ? 40 : 15;
        marketData[k] = [{
            p: marketData[k]?.[0]?.p || defaultP,
            q: mode === 'stacks' ? parseFloat((needed / 10000).toFixed(4)) : needed
        }];
    });
    renderMarketTable();
    handlePipelineChange();
    closeModal('cartModal');
}

function renderMarketTable() {
    const container = document.getElementById('marketContainer');
    if (!container) return;
    const t = i18n[currentLang] || i18n['en'];
    const addLabel = document.getElementById('mode').value === 'stacks' ? (t.qAddStk || '+1 Stk') : (t.qAdd || '+10k');
    const subLabel = document.getElementById('mode').value === 'stacks' ? (t.qSubStk || '-1 Stk') : (t.qSub || '-10k');

    let html = ``;

    CATEGORIES.forEach(cat => {
        html += `<div id="m_cat_${cat.id}" style="display:none;"><div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</div>`;

        cat.items.forEach(k => {
            if (!marketData[k]) return;
            const tiers = marketData[k];
            let tiersHtml = '';

            tiers.forEach((tier, idx) => {
                let addRemoveBtn = idx > 0 ?
                    `<button class="btn-warning btn-sq" style="margin: 0; padding: 0; font-size:14px;" title="Remove Tier" onclick="removeMarketTier('${k}', ${idx})">-</button>` :
                    `<button class="btn-accent btn-sq" style="margin: 0; padding: 0; font-size:14px; color:#000;" title="Add Tier" onclick="addMarketTier('${k}')">+</button>`;

                tiersHtml += `
                    <div class="market-tier-row">
                        <div style="display: flex; align-items: center; gap: 8px; min-width: 130px;">
                            <span style="color:var(--text-dim); font-size:11px; font-weight:bold; white-space: nowrap;">↳ ${t.tblOrder || 'Order'} ${idx + 1}</span>
                            <input type="number" style="width: 55px; margin: 0;" value="${tier.p}" title="Price" max="999" oninput="updateMarketTier('${k}', ${idx}, 'p', this.value)"> 
                        </div>
                        <div style="display:flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                            <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSubMarket('${k}', ${idx})">${subLabel}</button>
                            <input type="number" style="width: 95px; margin: 0;" value="${tier.q}" title="Qty" oninput="updateMarketTier('${k}', ${idx}, 'q', this.value)">
                            <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAddMarket('${k}', ${idx})">${addLabel}</button>
                            <button class="btn-cart btn-success" style="margin: 0; padding: 0 8px;" title="Auto-Fill Missing" onclick="autoFillMarketItem('${k}')">${t.btnAutoFill || 'Fill'}</button>
                            <button class="btn-clear" style="margin: 0; padding: 0 8px;" title="Clear Qty" onclick="clearMarketTier('${k}', ${idx})">${t.btnClearCart || 'Clear'}</button>
                            ${addRemoveBtn}
                        </div>
                    </div>`;
            });

            let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));

            html += `<div class="market-card" id="row_m_${k}" style="display:none;">
                <div class="market-card-header">
                    <div style="font-weight:bold; color:var(--text); font-size: 1.1em;">${itemName}</div>
                    <div style="display: flex; gap: 15px; text-align: right;">
                        <div><span style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${t.tblCost || 'Cost'}</span> <br><span style="font-weight:bold; color:var(--accent); font-size: 1.1em;" id="cost_${k}">0.00</span></div>
                        <div><span style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${t.tblStash || 'Stash'}</span> <br><span style="color:var(--text-dim);" id="stash_${k}">0</span></div>
                    </div>
                </div>
                <div>${tiersHtml}</div>
            </div>`;
        });
        html += `</div>`;
    });

    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:10px; border-top:1px solid var(--border);"><div style="font-weight:bold; text-transform:uppercase; color:var(--text-dim);">${t.cartTotal || 'Total'}</div><div id="cartTotalGold" style="font-weight:bold; color:var(--accent); font-size:1.3em;">0.00 g</div></div>`;
    container.innerHTML = html;

    if (document.getElementById('targetMetal')) {
        updateVisibility(document.getElementById('targetMetal').value);
    }
}

function renderBankTable() {
    const container = document.getElementById('bankContainer');
    if (!container) return;
    const t = i18n[currentLang] || i18n['en'];
    const addLabel = document.getElementById('mode').value === 'stacks' ? (t.qAddStk || '+1 Stk') : (t.qAdd || '+10k');
    const subLabel = document.getElementById('mode').value === 'stacks' ? (t.qSubStk || '-1 Stk') : (t.qSub || '-10k');

    let html = "";
    CATEGORIES.forEach(cat => {
        html += `<div id="b_cat_${cat.id}" style="display:none;"><div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</div>`;

        cat.items.forEach(k => {
            const val = Number(document.getElementById('b_' + k)?.value) || 0;
            let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));

            html += `<div class="bank-row" id="row_b_${k}" style="display:none;">
                <div style="font-weight:bold; color:var(--text);">${itemName}</div>
                <div style="text-align:right;">
                    <div style="display:flex; gap: 4px; justify-content: flex-end; align-items:center; flex-wrap: wrap;">
                        <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSub('b_${k}')">${subLabel}</button>
                        <input type="number" id="b_${k}" value="${val}" oninput="handlePipelineChange()" style="width: 95px; margin: 0;">
                        <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAdd('b_${k}')">${addLabel}</button>
                        <button class="btn-clear" style="margin: 0; padding: 0 8px;" title="Clear Qty" onclick="clearItem('b_${k}')">${t.btnClearCart || 'Clear'}</button>
                    </div>
                </div>
            </div>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

function updateVisibility(targetMetal) {
    const relevant = getRelevantItems(targetMetal);
    const showAllBank = document.getElementById('showAllBank')?.checked;
    const showAllCart = document.getElementById('showAllCart')?.checked;

    const searchBank = (document.getElementById('searchBank')?.value || "").toLowerCase();
    const searchCart = (document.getElementById('searchCart')?.value || "").toLowerCase();
    const t = i18n[currentLang] || i18n['en'];

    CATEGORIES.forEach(cat => {
        let catHasVisibleBank = false;
        let catHasVisibleMarket = false;

        cat.items.forEach(k => {
            let itemName = ((t.items && t.items[k]) ? t.items[k] : k).toLowerCase();
            let matchBankSearch = searchBank === "" || itemName.includes(searchBank);
            let matchCartSearch = searchCart === "" || itemName.includes(searchCart);

            let isActive = window.activeResources && window.activeResources.has(k);

            const rowB = document.getElementById('row_b_' + k);
            if (rowB) {
                let shouldShow = false;
                if (searchBank !== "") {
                    shouldShow = matchBankSearch;
                } else {
                    shouldShow = (showAllBank || relevant.has(k) || isActive);
                    // Hide the target metal explicitly unless "Show All" is checked
                    if (!showAllBank && k === targetMetal) shouldShow = false;
                }

                rowB.style.display = shouldShow ? 'grid' : 'none';
                if (shouldShow) catHasVisibleBank = true;
            }

            const rowM = document.getElementById('row_m_' + k);
            if (rowM) {
                let shouldShow = false;
                if (searchCart !== "") {
                    shouldShow = matchCartSearch;
                } else {
                    shouldShow = (showAllCart || relevant.has(k) || isActive);
                    // Hide the target metal explicitly unless "Show All" is checked
                    if (!showAllCart && k === targetMetal) shouldShow = false;
                }

                rowM.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) catHasVisibleMarket = true;
            }
        });

        const catDivB = document.getElementById('b_cat_' + cat.id);
        if (catDivB) catDivB.style.display = catHasVisibleBank ? 'block' : 'none';

        const mCatDiv = document.getElementById('m_cat_' + cat.id);
        if (mCatDiv) mCatDiv.style.display = catHasVisibleMarket ? 'block' : 'none';
    });
}

function quickAdd(id) {
    const el = document.getElementById(id);
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(el.value) || 0;
    el.value = isStacks ? parseFloat((current + 1).toFixed(4)) : current + 10000;
    handlePipelineChange();
}

function quickSub(id) {
    const el = document.getElementById(id);
    const isStacks = document.getElementById('mode').value === 'stacks';
    let current = Number(el.value) || 0;
    el.value = Math.max(0, isStacks ? parseFloat((current - 1).toFixed(4)) : current - 10000);
    handlePipelineChange();
}

function clearItem(id) {
    const el = document.getElementById(id);
    if (el) { el.value = 0; handlePipelineChange(); }
}