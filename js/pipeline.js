function clearPipelineProgress() {
    if (completedSteps.length === 0) return;
    
    const isStacks = document.getElementById('mode').value === 'stacks';
    
    completedSteps.forEach(index => {
        const stepObj = pipelineStepsRaw[index];
        if(!stepObj) return;
        
        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let sub = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = Math.max(0, current - sub).toFixed(isStacks ? 4 : 0);
            }
        });
    });
    
    completedSteps = [];
    focusIndex = 0;
}

function handlePipelineChange() {
    clearPipelineProgress();
    save();
    run();
}

function toggleGlobalPref(prefType) {
    clearPipelineProgress();
    if (globalRoutePref === prefType) {
        globalRoutePref = null;
        document.getElementById('btnPrefEfficient')?.classList.remove('active-global');
        document.getElementById('btnPrefYield')?.classList.remove('active-global');
    } else {
        globalRoutePref = prefType;
        if(prefType === 'efficient') {
            document.getElementById('btnPrefEfficient')?.classList.add('active-global');
            document.getElementById('btnPrefYield')?.classList.remove('active-global');
        } else if (prefType === 'yield') {
            document.getElementById('btnPrefYield')?.classList.add('active-global');
            document.getElementById('btnPrefEfficient')?.classList.remove('active-global');
        }
    }
    save();
    run();
}

function updatePathChoice(e, stepKey, selectedRoute) {
    if (e) e.stopPropagation(); 
    
    clearPipelineProgress();
    if (globalRoutePref !== null) {
        globalRoutePref = null;
        document.getElementById('btnPrefEfficient')?.classList.remove('active-global');
        document.getElementById('btnPrefYield')?.classList.remove('active-global');
    }
    userPathChoices[stepKey] = selectedRoute;
    save();
    run();
}

function setPipelineView(mode) {
    pipelineViewMode = mode;
    document.getElementById('btnOverview').classList.toggle('active', mode === 'overview');
    document.getElementById('btnFocus').classList.toggle('active', mode === 'focus');
    
    const container = document.getElementById('stepsOutput');
    const nav = document.getElementById('focusNav');
    
    if (mode === 'focus') {
        container.classList.add('focus-mode');
        if(nav) nav.style.display = 'flex';
        focusIndex = 0;
        for(let i=0; i<pipelineStepsRaw.length; i++) {
            if(!completedSteps.includes(i)) { focusIndex = i; break; }
        }
        updateFocusView();
    } else {
        container.classList.remove('focus-mode');
        if(nav) nav.style.display = 'none';
        document.querySelectorAll('#stepsOutput .step-card').forEach(c => c.classList.remove('active-focus'));
    }
}

function navFocus(dir) {
    focusIndex += dir;
    if (focusIndex < 0) focusIndex = 0;
    if (focusIndex >= pipelineStepsRaw.length) focusIndex = pipelineStepsRaw.length - 1;
    updateFocusView();
}

function updateFocusView() {
    if (pipelineViewMode !== 'focus') return;
    const cards = document.querySelectorAll('#stepsOutput .step-card');
    cards.forEach((card, index) => {
        if (index === focusIndex) card.classList.add('active-focus');
        else card.classList.remove('active-focus');
    });
    const navText = document.getElementById('focusProgressText');
    if (navText && pipelineStepsRaw.length > 0) {
        navText.innerText = `Step ${focusIndex + 1} of ${pipelineStepsRaw.length}`;
    }
}

function updatePipelineVisuals() {
    document.querySelectorAll('#stepsOutput .step-card').forEach((card, index) => {
        if (completedSteps.includes(index)) card.classList.add('completed');
        else card.classList.remove('completed');
    });
    
    let percent = pipelineStepsRaw.length === 0 ? 100 : Math.round((completedSteps.length / pipelineStepsRaw.length) * 100);
    if(percent > 100) percent = 100;
    
    const progBar = document.getElementById('projectProgress');
    const progText = document.getElementById('projectProgressText');
    if(progBar) progBar.style.width = percent + '%';
    if(progText) progText.innerText = percent + '% Pipeline Completed';
}

function toggleStep(index) {
    const idx = completedSteps.indexOf(index);
    const stepObj = pipelineStepsRaw[index];
    const isStacks = document.getElementById('mode').value === 'stacks';
    
    if (idx > -1) {
        completedSteps.splice(idx, 1);
        
        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let sub = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = Math.max(0, current - sub).toFixed(isStacks ? 4 : 0);
            }
        });
        
    } else {
        completedSteps.push(index);
        
        let allYields = [];
        if (stepObj.mainYields) allYields.push(...stepObj.mainYields);
        if (stepObj.byproducts) allYields.push(...stepObj.byproducts);

        allYields.forEach(y => {
            const bankInput = document.getElementById('b_' + y.item);
            if (bankInput) {
                let current = Number(bankInput.value) || 0;
                let add = isStacks ? y.amount / 10000 : y.amount;
                bankInput.value = (current + add).toFixed(isStacks ? 4 : 0);
            }
        });
        if (pipelineViewMode === 'focus') navFocus(1);
    }
    
    updatePipelineVisuals();
    save();
}

function restartPipeline() {
    if (!confirm(i18n[currentLang].restartPrompt || "Restart the pipeline? This will un-check all steps and remove their yields from your bank.")) return;
    clearPipelineProgress();
    updatePipelineVisuals();
    if(pipelineViewMode === 'focus') updateFocusView();
    save();
}