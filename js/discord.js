function buildDiscordMessage() {
    const t = i18n[currentLang] || i18n['en'];
    const mode = document.getElementById('mode').value;
    const targetVal = document.getElementById('targetAmount').value;
    const targetMetal = document.getElementById('targetMetal').value;
    const relevant = getRelevantItems(targetMetal);
    
    const targetName = (t.items && t.items[targetMetal]) ? t.items[targetMetal] : targetMetal;
    let msg = `**${t.discHeader || 'LOGISTICS ORDER'}: ${targetName.toUpperCase()}**\n*Targeting ${targetVal} ${mode === 'stacks' ? 'Stacks' : 'Units'} of ${targetName}*\n\n`;
    
    let bankString = "";
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let bankRaw = Number(document.getElementById('b_'+k)?.value) || 0;
        if (bankRaw > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? bankRaw.toFixed(2) + " Stacks" : bankRaw.toLocaleString();
            let itemName = (t.items && t.items[k]) ? t.items[k] : k;
            bankString += `- ${itemName}: ${fmtAmt}\n`;
        }
    });
    if (bankString !== "") msg += `**CURRENT BANK STOCK:**\n\`\`\`\n${bankString}\`\`\`\n`;

    let marketString = ""; let hasMarket = false; let totalGold = 0;
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let totalQty = 0;
        if(marketData[k]) {
            marketData[k].forEach(tier => {
                totalQty += tier.q;
                totalGold += (tier.q / (mode === 'stacks' ? 1 : 10000)) * tier.p;
            });
        }
        if (totalQty > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? totalQty.toFixed(2) + " Stacks" : totalQty.toLocaleString();
            let itemName = (t.items && t.items[k]) ? t.items[k] : k;
            marketString += `- ${itemName}: ${fmtAmt}\n`;
            hasMarket = true;
        }
    });
    
    if (hasMarket) {
        msg += `**${t.discMarket || 'MARKET PURCHASES:'}**\n\`\`\`\n${marketString}\`\`\`\n*Total Estimated Gold Cost: ${totalGold.toFixed(2)} g*\n\n`;
    }

    let gatherString = ""; let hasGather = false;
    Object.keys(pureDeficits).forEach(k => {
        if (pureDeficits[k] > 0) {
            let fmtAmt = mode === 'stacks' ? (pureDeficits[k]/10000).toFixed(2) + " Stacks" : pureDeficits[k].toLocaleString();
            let itemName = (t.items && t.items[k]) ? t.items[k] : k;
            gatherString += `- ${itemName}: ${fmtAmt}\n`;
            hasGather = true;
        }
    });

    const reqLabel = t.discReq || "MANUAL GATHER REQUIRED:";
    if (hasGather) msg += `**${reqLabel}**\n\`\`\`diff\n- ${gatherString.replace(/\n/g, '\n- ')}\`\`\`\n`;
    else msg += `**${reqLabel}**\n\`\`\`yaml\n${t.discStock || 'All gathering covered.'}\`\`\`\n`;

    if (pipelineStepsRaw.length > 0) {
        msg += `**MANUFACTURING PIPELINE**\n\`\`\`md\n`;
        pipelineStepsRaw.forEach((stepObj, index) => {
            let checkmark = completedSteps.includes(index) ? '[x] ' : '[ ] ';
            let textAction = stepObj.htmlAction.replace(/<[^>]*>?/gm, '');
            msg += `${index + 1}. ${checkmark}${textAction}\n`;
        });
        msg += `\`\`\`\n`;
    }
    
    let hasByproducts = false;
    const bpLabel = t.byproductsTitle || "TOTAL RECOVERED BYPRODUCTS";
    let bpString = `**${bpLabel}**\n\`\`\`\n`;
    Object.keys(byproductsRaw).forEach(k => {
        if (byproductsRaw[k] > 0) {
            let fmtAmt = mode === 'stacks' ? (byproductsRaw[k]/10000).toFixed(2) + " Stacks" : byproductsRaw[k].toLocaleString();
            let itemName = (t.items && t.items[k]) ? t.items[k] : k;
            bpString += `- ${itemName}: ${fmtAmt}\n`;
            hasByproducts = true;
        }
    });
    if (hasByproducts) msg += bpString + `\`\`\``;
    return msg;
}

function copyDiscord() { 
    const t = i18n[currentLang] || i18n['en'];
    navigator.clipboard.writeText(buildDiscordMessage()); 
    alert(t.discCopied || "Copied to clipboard!"); 
}

async function sendToDiscord() {
    const t = i18n[currentLang] || i18n['en'];
    const webhookUrl = document.getElementById('webhookUrl').value;
    if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) { 
        alert(t.errWebhook || "Invalid Webhook URL"); 
        openModal('settingsModal'); 
        return; 
    }

    const msg = buildDiscordMessage();

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: msg })
        });

        if (response.ok) alert(t.sucSend || "Order dispatched to Discord!");
        else alert((t.errSend || "Failed to send.") + ` Status: ${response.status}`);
    } catch (e) {
        alert((t.errSend || "Failed to send.") + " " + e.message);
    }
}