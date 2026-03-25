function buildDiscordMessage() {
    const t = i18n[currentLang];
    const mode = document.getElementById('mode').value;
    const targetVal = document.getElementById('targetAmount').value;
    const targetMetal = document.getElementById('targetMetal').value;
    const relevant = getRelevantItems(targetMetal);
    let msg = `**${t.discHeader}: ${t.items[targetMetal].toUpperCase()}**\n*Targeting ${targetVal} ${mode === 'stacks' ? 'Stacks' : 'Units'} of ${t.items[targetMetal]}*\n\n`;
    
    let bankString = "";
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let bankRaw = Number(document.getElementById('b_'+k)?.value) || 0;
        if (bankRaw > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? bankRaw.toFixed(2) + " Stacks" : bankRaw.toLocaleString();
            bankString += `- ${t.items[k]||k}: ${fmtAmt}\n`;
        }
    });
    if (bankString !== "") msg += `**CURRENT BANK STOCK:**\n\`\`\`\n${bankString}\`\`\`\n`;

    let marketString = ""; let hasMarket = false;
    Object.values(CATEGORIES).flatMap(c => c.items).forEach(k => {
        let totalQty = 0;
        if(marketData[k]) {
            marketData[k].forEach(tier => totalQty += tier.q);
        }
        if (totalQty > 0 && relevant.has(k)) {
            let fmtAmt = mode === 'stacks' ? totalQty.toFixed(2) + " Stacks" : totalQty.toLocaleString();
            marketString += `- ${t.items[k]||k}: ${fmtAmt}\n`;
            hasMarket = true;
        }
    });

    if (hasMarket) msg += `**${t.discMarket}**\n\`\`\`\n${marketString}\nTotal Budget: ${document.getElementById('cartTotalGold').innerText}\n\`\`\`\n`;

    const stacks = document.getElementById('statStacks').innerText;
    msg += `**${t.discReq}**\n\`\`\`\n`;
    const items = document.querySelectorAll('.logistics-item');
    if (items.length === 0) msg += `${t.discStock}\n`;
    items.forEach(el => msg += `- ${el.innerText.replace('\n', ': ')}\n`);
    msg += `\nTotal: ${stacks} Stacks to Gather\`\`\`\n`;

    if (pipelineStepsRaw.length > 0) {
        msg += `**MANUFACTURING PIPELINE:**\n\`\`\`\n`;
        pipelineStepsRaw.forEach((stepObj, index) => {
            let checkmark = completedSteps.includes(index) ? '[x] ' : '[ ] ';
            let textAction = stepObj.htmlAction.replace(/<[^>]*>?/gm, '');
            msg += `${index + 1}. ${checkmark}${textAction}\n`;
        });
        msg += `\`\`\`\n`;
    }
    
    let hasByproducts = false;
    let bpString = `**${t.byproductsTitle}**\n\`\`\`\n`;
    Object.keys(byproductsRaw).forEach(k => {
        if (byproductsRaw[k] > 0) {
            let fmtAmt = mode === 'stacks' ? (byproductsRaw[k]/10000).toFixed(2) + " Stacks" : byproductsRaw[k].toLocaleString();
            bpString += `- ${t.items[k]||k}: ${fmtAmt}\n`;
            hasByproducts = true;
        }
    });
    if (hasByproducts) msg += bpString + `\`\`\``;
    return msg;
}

function copyDiscord() { navigator.clipboard.writeText(buildDiscordMessage()); alert(i18n[currentLang].discCopied); }

async function sendToDiscord() {
    const t = i18n[currentLang];
    const webhookUrl = document.getElementById('webhookUrl').value;
    if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) { alert(t.errWebhook); openModal('settingsModal'); return; }

    try {
        const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: buildDiscordMessage(), username: "Quartermaster Command", avatar_url: "https://i.imgur.com/B1pE1H7.png" }) });
        if (response.ok) alert(t.sucSend); else alert(t.errSend);
    } catch (error) { alert(t.errSend); }
}