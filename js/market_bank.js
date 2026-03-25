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
    
    let html = `<div class="market-row market-header desktop-only"><div></div><div style="text-align:center">${t.tblPrice || 'Price'}</div><div style="text-align:center">${t.tblBuy || 'Buy'}</div><div style="text-align:right">${t.tblCost || 'Cost'}</div><div style="text-align:right">${t.tblStash || 'Stash'}</div></div>`; 

    CATEGORIES.forEach(cat => {
        html += `<div id="m_cat_${cat.id}" style="display:none;"><div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</div>`;

        cat.items.forEach(k => {
            if(!marketData[k]) return;
            const tiers = marketData[k];
            let priceHtml = '';
            let buyHtml = '';

            tiers.forEach((tier, idx) => {
                priceHtml += `<div style="margin-bottom: 4px; display: flex; align-items: center; justify-content: center;">
                    <input type="number" style="width: 70px; margin: 0;" value="${tier.p}" title="Price" oninput="updateMarketTier('${k}', ${idx}, 'p', this.value)">
                </div>`;
                
                buyHtml += `<div style="display:flex; gap: 4px; margin-bottom: 4px; justify-content: center; align-items: center; flex-wrap: wrap;">
                    <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSubMarket('${k}', ${idx})">${subLabel}</button>
                    <input type="number" style="width: 75px; margin: 0;" value="${tier.q}" title="Qty" oninput="updateMarketTier('${k}', ${idx}, 'q', this.value)">
                    <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAddMarket('${k}', ${idx})">${addLabel}</button>
                    <button class="btn-clear btn-sq" style="margin: 0;" title="Clear Qty" onclick="clearMarketTier('${k}', ${idx})">✖</button>
                    ${idx > 0 ? `<button class="btn-clear btn-sq" style="margin: 0; background:var(--border);" title="Remove Tier" onclick="removeMarketTier('${k}', ${idx})">➖</button>` : `<button class="btn-cart btn-sq" style="margin: 0;" title="Add Tier" onclick="addMarketTier('${k}')">➕</button>`}
                </div>`;
            });

            let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));
            html += `<div class="market-row" id="row_m_${k}" style="display:none; border-bottom: 1px dashed var(--border); padding-bottom: 10px;">
                <div style="font-weight:bold; color:var(--accent); align-self: start; margin-top: 5px;">${itemName}</div>
                <div style="text-align:center; align-self: start;">${priceHtml}</div>
                <div style="text-align:center; align-self: start;">${buyHtml}</div>
                <div style="text-align:right; align-self: start; margin-top: 5px;"><span class="mobile-label">${t.tblCost || 'Cost'}</span><span style="font-weight:bold; color:var(--accent); font-size: 1.1em;" id="cost_${k}">0.00</span></div>
                <div style="text-align:right; align-self: start; margin-top: 5px;"><span class="mobile-label">${t.tblStash || 'Stash'}</span><span style="color:var(--text-dim);" id="stash_${k}">0</span></div>
            </div>`;
        });
        html += `</div>`;
    });
    
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px; padding-top:15px; border-top:1px solid var(--border);"><div style="font-weight:bold; text-transform:uppercase; color:var(--text-dim);">${t.cartTotal || 'Total'}</div><div id="cartTotalGold" style="font-weight:bold; color:var(--accent); font-size:1.3em;">0.00 g</div></div>`;
    container.innerHTML = html;
    
    if(document.getElementById('targetMetal')) {
        updateVisibility(document.getElementById('targetMetal').value);
    }
}

function renderBankTable() {
    const table = document.getElementById('bankTable');
    if(!table) return;
    const t = i18n[currentLang] || i18n['en'];
    const addLabel = document.getElementById('mode').value === 'stacks' ? (t.qAddStk || '+1 Stk') : (t.qAdd || '+10k');
    const subLabel = document.getElementById('mode').value === 'stacks' ? (t.qSubStk || '-1 Stk') : (t.qSub || '-10k');
    
    let html = ""; 
    CATEGORIES.forEach(cat => {
        html += `<tbody id="cat_${cat.id}">`;
        html += `<tr><td colspan="2" class="bank-category">${(t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id}</td></tr>`;
        cat.items.forEach(k => {
            const val = Number(document.getElementById('b_'+k)?.value) || 0;
            let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));
            
            html += `<tr id="row_b_${k}">
                <td style="width:35%; font-weight:bold; padding-left:10px;">${itemName}</td>
                <td style="text-align:right;">
                    <div style="display:flex; gap: 4px; justify-content: flex-end; align-items:center; flex-wrap: wrap;">
                        <button class="btn-stack q-sub" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickSub('b_${k}')">${subLabel}</button>
                        <input type="number" id="b_${k}" value="${val}" oninput="handlePipelineChange()" style="width: 75px; margin: 0;">
                        <button class="btn-stack q-add" style="margin: 0; min-width:30px; padding:0 4px;" onclick="quickAdd('b_${k}')">${addLabel}</button>
                        <button class="btn-clear btn-clear-bank" style="margin: 0;" onclick="clearItem('b_${k}')">Clear</button>
                    </div>
                </td>
            </tr>`;
        });
        html += `</tbody>`;
    });
    table.innerHTML = html;
}

function updateVisibility(targetMetal) {
    const relevant = getRelevantItems(targetMetal);
    const showAllBank = document.getElementById('showAllBank')?.checked;
    const showAllCart = document.getElementById('showAllCart')?.checked;
    
    CATEGORIES.forEach(cat => {
        let catHasVisibleBank = false;
        let catHasVisibleMarket = false;

        cat.items.forEach(k => {
            const rowB = document.getElementById('row_b_' + k);
            if (rowB) {
                if (k === targetMetal && !showAllBank) {
                    rowB.style.display = 'none';
                } else if (showAllBank || relevant.has(k)) {
                    rowB.style.display = '';
                    catHasVisibleBank = true;
                } else {
                    rowB.style.display = 'none';
                }
            }

            const rowM = document.getElementById('row_m_' + k);
            if (rowM) {
                if (k === targetMetal && !showAllCart) {
                    rowM.style.display = 'none';
                } else if (showAllCart || relevant.has(k)) {
                    rowM.style.display = 'grid';
                    catHasVisibleMarket = true;
                } else {
                    rowM.style.display = 'none';
                }
            }
        });

        const catTbody = document.getElementById('cat_' + cat.id);
        if (catTbody) catTbody.style.display = catHasVisibleBank ? '' : 'none';

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