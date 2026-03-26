function handleModeChange() {
    const mode = document.getElementById('mode').value;
    const targetEl = document.getElementById('targetAmount');
    let targetVal = Number(targetEl.value) || 0;

    if (prevMode === 'units' && mode === 'stacks') targetEl.value = (targetVal / 10000).toFixed(4);
    else if (prevMode === 'stacks' && mode === 'units') targetEl.value = Math.round(targetVal * 10000);

    const convert = (id) => {
        const el = document.getElementById(id);
        if (el) {
            let val = Number(el.value) || 0;
            if (prevMode === 'units' && mode === 'stacks') el.value = (val / 10000).toFixed(4);
            else if (prevMode === 'stacks' && mode === 'units') el.value = Math.round(val * 10000);
        }
    };

    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => convert('b_' + k));

    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        if (marketData[k]) {
            marketData[k].forEach(tier => {
                if (prevMode === 'units' && mode === 'stacks') tier.q = parseFloat((tier.q / 10000).toFixed(4));
                else if (prevMode === 'stacks' && mode === 'units') tier.q = Math.round(tier.q * 10000);
            });
        }
    });

    prevMode = mode;
    renderBankTable();
    renderMarketTable();
    handlePipelineChange();
}

function targetMetalChanged() {
    handlePipelineChange();
}

function run() { clearTimeout(timer); timer = setTimeout(calculate, 150); }

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
}

function calculateMax() {
    const t = i18n[currentLang] || i18n['en'];
    const targetMetal = document.getElementById('targetMetal').value;
    const mode = document.getElementById('mode').value;
    const mult = mode === 'stacks' ? 10000 : 1;
    let originalTarget = Number(document.getElementById('targetAmount').value) || 0;
    let targetUnits = originalTarget * mult;

    if (targetUnits <= 0) {
        if (typeof showToast === 'function') showToast(t.noTarget || "Please set a valid target amount first.");
        return;
    }

    const mR = document.getElementById('modRef').checked ? 1.03 : 1;
    const mE = document.getElementById('modExt').checked ? 1.03 : 1;
    const mM = document.getElementById('modMast').checked ? 1.06 : 1;

    let bank = {};
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        bank[k] = (Number(document.getElementById('b_' + k)?.value) || 0) * mult;
    });

    let origTree = resolveTree(targetMetal, targetUnits, bank, mR);
    let origExts = resolveExtractions(origTree.deficits, mE, mM, bank);

    let origMissing = { ...origExts.raw };
    if (origTree.intermediates) {
        Object.keys(origTree.intermediates).forEach(k => {
            origMissing[k] = (origMissing[k] || 0) + origTree.intermediates[k];
        });
    }

    let low = 0;
    let high = 10000000;
    let best = 0;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let tree = resolveTree(targetMetal, mid, bank, mR);
        let exts = resolveExtractions(tree.deficits, mE, mM, bank);
        let hasDeficit = Object.values(exts.raw).some(v => v > 0);
        if (!hasDeficit) { best = mid; low = mid + 1; } else { high = mid - 1; }
    }

    let targetName = (t.items && t.items[targetMetal]) ? t.items[targetMetal] : targetMetal;
    let fmtOrig = mode === 'stacks' ? originalTarget + " Stk" : originalTarget.toLocaleString();
    let bestFmt = mode === 'stacks' ? (best / 10000).toFixed(4) : best.toLocaleString();

    let bodyHtml = '';

    document.getElementById('ui_maxTitle').innerText = t.maxTitle;
    const acknowledgeBtn = document.getElementById('ui_maxAcknowledge');
    if (acknowledgeBtn) acknowledgeBtn.innerText = t.maxAcknowledge;

    if (best > 0) {
        bodyHtml += `<p style="color:var(--text-dim); margin-top:0;">${t.maxTotalCraft} <strong style="color:var(--accent); font-size:1.1em;">${bestFmt} ${targetName}</strong>.</p>`;
    } else {
        let craftAnyMsg = t.maxCraftAny.replace('[item]', targetName);
        bodyHtml += `<p style="color:var(--danger); font-weight:bold; margin-top:0;">${craftAnyMsg}</p>`;
    }

    let hasMissing = Object.values(origMissing).some(v => v > 0);

    if (best < targetUnits && hasMissing) {
        let missingMsg = t.maxMissing.replace('[target]', `${fmtOrig} ${targetName}`);
        bodyHtml += `<p style="margin-bottom: 15px; border-top: 1px dashed var(--border); padding-top: 15px;">${missingMsg}</p>`;

        CATEGORIES.forEach(cat => {
            let catItems = [];
            cat.items.forEach(k => {
                if (origMissing[k] > 0) {
                    let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));
                    let amt = mode === 'stacks' ? (origMissing[k] / 10000).toFixed(2) + " Stk" : origMissing[k].toLocaleString();
                    catItems.push(`
                        <div style="display:flex; justify-content:space-between; padding: 8px 12px; background: rgba(0,0,0,0.1); border: 1px solid var(--border); border-radius: 4px; margin-bottom: 4px;">
                            <span>${itemName}</span>
                            <span style="color:var(--danger); font-weight:bold;">${amt}</span>
                        </div>
                    `);
                }
            });
            if (catItems.length > 0) {
                let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id;
                bodyHtml += `<div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${catName}</div>` + catItems.join('');
            }
        });
    } else if (best >= targetUnits) {
        bodyHtml += `<p style="color:var(--success); font-weight:bold; margin-top: 15px;">${t.maxCalculatedGoal}</p>`;
    }

    document.getElementById('maxCraftBody').innerHTML = bodyHtml;
    closeModal('bankModal');
    openModal('maxCraftModal');

    if (best > 0) {
        document.getElementById('targetAmount').value = mode === 'stacks' ? (best / 10000).toFixed(4) : best;
        handlePipelineChange();
    }
}

function toggleGlobalPref(prefType, isChecked) {
    if (typeof clearPipelineProgress === "function") clearPipelineProgress();

    if (isChecked) {
        globalRoutePref = prefType;
        if (prefType === 'efficient') {
            document.getElementById('chkYld').checked = false;
        } else if (prefType === 'yield') {
            document.getElementById('chkEff').checked = false;
        }
    } else {
        if (globalRoutePref === prefType) {
            globalRoutePref = null;
        }
    }

    save();
    run();
}

function calculate() {
    const mode = document.getElementById('mode').value;
    const t = i18n[currentLang] || i18n['en'];
    const targetRaw = Number(document.getElementById('targetAmount').value) || 0;
    const crafters = Math.max(1, Number(document.getElementById('crafters').value));
    const targetMetal = document.getElementById('targetMetal').value;
    const mult = mode === 'stacks' ? 10000 : 1;

    const chkBp = document.getElementById('chkBp');
    const showBp = chkBp ? chkBp.checked : false;

    if (targetRaw <= 0) {
        document.getElementById('gatherOutput').innerHTML = `<div class="empty-msg">${t.noTarget || 'No target set.'}</div>`;
        document.getElementById('stepsOutput').innerHTML = "";
        document.getElementById('statStacks').innerText = "0.00";
        if (document.getElementById('cartTotalGold')) document.getElementById('cartTotalGold').innerText = "0.00 g";
        pipelineStepsRaw = []; byproductsRaw = {}; pureDeficits = {};

        document.getElementById('row_chkBp').style.display = 'none';
        document.getElementById('bpContainer').style.display = 'none';
        if (document.getElementById('gatherProgressBar')) document.getElementById('gatherProgressBar').style.width = '0%';
        if (document.getElementById('projectProgressBar')) document.getElementById('projectProgressBar').style.width = '0%';
        if (document.getElementById('projectProgressText')) {
            document.getElementById('projectProgressText').innerText = "0%";
            document.getElementById('projectProgressText').style.color = "var(--text)";
        }

        Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
            if (document.getElementById('cost_' + k)) document.getElementById('cost_' + k).innerText = "0.00";
            if (document.getElementById('stash_' + k)) document.getElementById('stash_' + k).innerText = "0";
        });
        updateVisibility(targetMetal);
        save(); return;
    }

    const mR = document.getElementById('modRef').checked ? 1.03 : 1;
    const mE = document.getElementById('modExt').checked ? 1.03 : 1;
    const mM = document.getElementById('modMast').checked ? 1.06 : 1;

    const bank = {};
    const purchased = {};
    let totalGold = 0;

    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        bank[k] = (Number(document.getElementById('b_' + k)?.value) || 0) * mult;

        let buyQtyUnits = 0;
        if (marketData[k]) {
            marketData[k].forEach(tier => {
                const tierUnits = tier.q * mult;
                buyQtyUnits += tierUnits;
                totalGold += (tierUnits / 10000) * tier.p;
            });
        }
        purchased[k] = buyQtyUnits;

        const costEl = document.getElementById('cost_' + k);
        const stashEl = document.getElementById('stash_' + k);

        if (costEl) {
            let totalCostThisItem = 0;
            if (marketData[k]) {
                marketData[k].forEach(tier => { totalCostThisItem += (tier.q * (mode === 'stacks' ? 1 : 0.0001)) * tier.p; });
            }
            costEl.innerText = totalCostThisItem.toFixed(2);
        }
        if (stashEl) {
            const stashRaw = (bank[k] + purchased[k]) / mult;
            stashEl.innerText = mode === 'stacks' ? stashRaw.toFixed(2) + " Stk" : stashRaw.toLocaleString();
        }
    });

    if (document.getElementById('cartTotalGold')) document.getElementById('cartTotalGold').innerText = totalGold.toFixed(2) + " g";

    // --- NEW LOGIC: Ghost calculation for Absolute Gross requirements (Empty Bank) ---
    const grossTree = resolveTree(targetMetal, targetRaw * mult, {}, mR);
    const grossExtractions = resolveExtractions(grossTree.deficits, mE, mM, {});

    // --- ACTUAL Net calculation (Virtual Bank) ---
    const virtualBank = {};
    Object.keys(bank).forEach(k => virtualBank[k] = bank[k] + purchased[k]);

    const actualTree = resolveTree(targetMetal, targetRaw * mult, virtualBank, mR);
    const actualExtractions = resolveExtractions(actualTree.deficits, mE, mM, virtualBank);

    // --- Pure Base calculation for Auto-Fill ---
    const baseTree = resolveTree(targetMetal, targetRaw * mult, bank, mR);
    const baseExtractions = resolveExtractions(baseTree.deficits, mE, mM, bank);
    pureDeficits = { ...baseExtractions.raw };

    // Calculate exactly what we still need to gather/craft
    const finalDeficits = {};
    [...Object.keys(actualTree.intermediates), ...Object.keys(actualExtractions.raw), ...Object.keys(actualExtractions.extracted)].forEach(k => {
        let missing = 0;
        if (actualExtractions.raw[k]) missing += actualExtractions.raw[k];
        if (actualTree.intermediates[k]) missing += actualTree.intermediates[k];
        if (actualExtractions.extracted[k]) missing += actualExtractions.extracted[k];
        if (missing > 0) finalDeficits[k] = missing;
    });

    byproductsRaw = actualExtractions.bp;

    // Push everything required into active resources for Market/Bank visibility
    window.activeResources = new Set();
    [...Object.keys(grossExtractions.raw), ...Object.keys(grossTree.intermediates), ...Object.keys(grossExtractions.extracted)].forEach(k => {
        window.activeResources.add(k);
    });

    let gHTML = '';
    let totalGatherUnits = 0;
    let totalAcquiredUnits = 0;
    let totalNeededUnits = 0;

    CATEGORIES.forEach(cat => {
        let catHtml = '';
        cat.items.forEach(k => {
            // How much of this item is needed from scratch?
            let totalNeeded = (grossExtractions.raw[k] || 0) + (grossTree.intermediates[k] || 0) + (grossExtractions.extracted[k] || 0);

            // Display EVERY required component except the Target Metal itself
            if (totalNeeded > 0 && k !== targetMetal) {
                let isComplete = false;
                let missingAmt = finalDeficits[k] || 0;

                // Only true raw resources count towards your missing Stacks total
                if (actualExtractions.raw[k]) {
                    totalGatherUnits += actualExtractions.raw[k];
                }

                if (missingAmt <= 0) {
                    missingAmt = 0;
                    isComplete = true;
                }

                const fmtVal = mode === 'stacks' ? (missingAmt / 10000).toFixed(2) + " Stk" : missingAmt.toLocaleString();

                let amountAcquired = totalNeeded - missingAmt;
                let progressPct = totalNeeded > 0 ? Math.min(100, Math.max(0, (amountAcquired / totalNeeded) * 100)) : 0;

                totalAcquiredUnits += amountAcquired;
                totalNeededUnits += totalNeeded;

                let hue = Math.floor((progressPct / 100) * 120);
                let colorStr = `hsl(${hue}, 80%, 50%)`;

                let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));

                if (isComplete) {
                    catHtml += `<div class="logistics-item" style="border-left-color: ${colorStr}; --prog: 100%; --hue: 120;">
                        <span style="font-weight:bold; color:var(--text); text-decoration: line-through; opacity: 0.5;">${itemName}</span>
                        <div style="display: flex; align-items: center; justify-content: flex-end;">
                            <span style="color:var(--text-dim); font-weight:normal; margin-right: 12px; text-align: right; text-decoration: line-through; opacity: 0.5;">${fmtVal}</span>
                            <span style="color:${colorStr}; font-weight: bold; text-align: right; min-width: 40px;">100%</span>
                        </div>
                    </div>`;
                } else {
                    catHtml += `<div class="logistics-item" style="border-left-color: ${colorStr}; --prog: ${progressPct}%; --hue: ${hue};">
                        <span style="font-weight:bold; color:var(--text);">${itemName}</span>
                        <div style="display: flex; align-items: center; justify-content: flex-end;">
                            <span style="color:var(--text-dim); font-weight:normal; margin-right: 12px; text-align: right;">${fmtVal}</span>
                            <span style="color:${colorStr}; font-weight: bold; text-align: right; min-width: 40px;">${progressPct.toFixed(0)}%</span>
                        </div>
                    </div>`;
                }
            }
        });
        if (catHtml !== '') {
            let catName = (t.categories && t.categories[cat.id]) ? t.categories[cat.id] : cat.id;
            gHTML += `<div class="bank-category" style="margin-top:10px; margin-bottom:5px;">${catName}</div>` + catHtml;
        }
    });

    document.getElementById('gatherOutput').innerHTML = totalNeededUnits > 0 ? gHTML : `<div class="empty-msg">${t.allCovered || 'All covered!'}</div>`;
    document.getElementById('statStacks').innerText = (totalGatherUnits / 10000).toFixed(2);

    let gatherOverallPct = totalNeededUnits > 0 ? (totalAcquiredUnits / totalNeededUnits) * 100 : 100;
    if (document.getElementById('gatherProgressBar')) {
        let hueBar = Math.floor((gatherOverallPct / 100) * 120);
        document.getElementById('gatherProgressBar').style.width = gatherOverallPct + '%';
        document.getElementById('gatherProgressBar').style.backgroundColor = `hsl(${hueBar}, 70%, 50%)`;
    }

    let newPipeline = [...actualExtractions.extSteps, ...actualTree.steps];

    if (JSON.stringify(newPipeline) !== JSON.stringify(pipelineStepsRaw)) {
        completedSteps = [];
        focusIndex = 0;
    }
    pipelineStepsRaw = newPipeline;

    const perCr = crafters > 1 ? ` <span style="color:var(--warning); font-size:0.8em;">${t.perCrafter || '(Per Crafter)'}</span>` : "";

    let outputHTML = pipelineStepsRaw.map((stepObj, index) => {
        let isCompleted = completedSteps.includes(index);
        let completedClass = isCompleted ? 'completed' : '';
        let checkIcon = isCompleted ? '[X]' : '[ ]';

        let modAction = stepObj.htmlAction.replace(/<span class="highlight">([\d,]+)/g, (match, p1) => {
            let num = parseInt(p1.replace(/,/g, ''));
            return `<span class="highlight">${Math.ceil(num / crafters).toLocaleString()}`;
        });

        let mainYieldsStr = (stepObj.mainYields && stepObj.mainYields.length > 0) ? stepObj.mainYields.map(y => {
            let yName = (t.items && t.items[y.item]) ? t.items[y.item] : (y.item.charAt(0).toUpperCase() + y.item.slice(1));
            return `<span class="highlight">${y.amount.toLocaleString()} ${yName}</span>`;
        }).join(', ') : "";

        let bpHtml = "";
        if (showBp) {
            let bpYieldsStr = (stepObj.byproducts && stepObj.byproducts.length > 0) ? stepObj.byproducts.map(y => {
                let yName = (t.items && t.items[y.item]) ? t.items[y.item] : (y.item.charAt(0).toUpperCase() + y.item.slice(1));
                return `${y.amount.toLocaleString()} ${yName}`;
            }).join(', ') : (t.none || "None");
            bpHtml = `<br><span style="color:var(--text-dim); font-weight:bold;">${t.stepByproducts || 'Byproducts:'}</span> <span style="color:var(--text-dim);">${bpYieldsStr}</span>`;
        }

        let routeHtml = '';
        if (stepObj.routeStats && stepObj.routeStats.length > 1) {
            let btns = stepObj.routeStats.map(rs => {
                let classes = ['btn-route'];
                let badges = [];

                if (rs.name === stepObj.selectedRoute) classes.push('active');

                if (rs.isBestYield) { classes.push('rt-eff'); badges.push('<span class="acronym-box acronym-eff">E</span>'); }
                if (rs.isMaxYield) { classes.push('rt-max'); badges.push('<span class="acronym-box acronym-max">Y</span>'); }
                if (rs.isRegionLocked) { classes.push('rt-reg'); badges.push('<span class="acronym-box acronym-reg">R</span>'); }

                let badgeHtml = badges.length > 0 ? `<span style="margin-left:8px; display:inline-flex; gap:4px;">${badges.join('')}</span>` : '';

                let safeStepKey = stepObj.stepKey.replace(/'/g, "\\'");
                let safeRouteName = rs.name.replace(/'/g, "\\'");

                return `<button class="${classes.join(' ')}" onclick="updatePathChoice(event, '${safeStepKey}', '${safeRouteName}')"><span>${rs.name}</span>${badgeHtml}</button>`;
            }).join('');
            routeHtml = `<div class="route-choices">${btns}</div>`;
        }

        return `<div class="step-card ${completedClass}" id="step_${index}" onclick="toggleStep(${index})">
            <div>
                <span style="cursor:pointer; margin-right:8px; font-size: 1.1em; font-weight: bold;">${checkIcon}</span>
                <span style="color:var(--text-dim); font-weight:bold; margin-right:5px;">${t.stepPrefix || 'Step'} ${index + 1}.</span>${modAction}${perCr}
            </div>
            <div style="margin-top: 6px; font-size: 11px; padding-left: 28px;">
                <span style="color:var(--success); font-weight:bold;">${t.stepYieldsMain || 'Yields:'}</span> ${mainYieldsStr}${bpHtml}
            </div>
            <div style="padding-left: 28px;">${routeHtml}</div>
        </div>`;
    }).join('');

    let byproductsString = "";
    Object.keys(byproductsRaw).forEach(k => {
        if (byproductsRaw[k] > 0) {
            let itemName = (t.items && t.items[k]) ? t.items[k] : (k.charAt(0).toUpperCase() + k.slice(1));
            byproductsString += `<div style="display:flex; justify-content:space-between; margin-bottom: 2px; font-size: 13px;">
                <span>${itemName}</span>
                <span style="color: var(--accent); font-weight: bold;">${byproductsRaw[k].toLocaleString()}</span>
            </div>`;
        }
    });

    if (byproductsString !== "") {
        document.getElementById('bpOutput').innerHTML = byproductsString;
        if (showBp) {
            document.getElementById('bpContainer').style.display = 'block';
        } else {
            document.getElementById('bpContainer').style.display = 'none';
        }
    } else {
        document.getElementById('bpContainer').style.display = 'none';
    }

    document.getElementById('stepsOutput').innerHTML = outputHTML;

    updatePipelineVisuals();
    if (pipelineViewMode === 'focus') updateFocusView();

    updateVisibility(targetMetal);
    save();
}

window.onload = () => {
    initMarketData();
    load();
    document.getElementById('lang').value = currentLang;
    changeLang();
    syncColorPickers();
    syncThemeSwitch();
    calculate();
};