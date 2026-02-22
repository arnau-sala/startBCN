const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/features/localTrends/localTrends.mock.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// The new user requests
const newTopics = {
    barcelona: {
        id: "housing",
        name: "Housing regulation",
        icon: "🏠",
        pct: 35,
        delta: 5,
        whatsGoingOn: [
            "Catalonia rent cap proposal approved for 2026 after 2025 housing protests.",
            "Large property owners restricted from acquiring homes in high-pressure areas."
        ],
        forInvestorsUpside: "Increased demand for inflation-linked REITs and rental property ETFs.",
        forInvestorsRisk: "Regulatory uncertainty for Spanish real estate exposure.",
        category: "Real estate",
        keyDriverArticle: {
            source: "El País",
            title: "Catalonia approves 5% rent cap for 2026",
            timeAgo: "4h"
        }
    },
    berlin: {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 40,
        delta: 15,
        whatsGoingOn: [
            "Sentix investor sentiment +4.2 (highest since July 2025).",
            "EU50 index up 1.29% to 6133 on Feb 20 amid ECB rate pause."
        ],
        forInvestorsUpside: "Small cap rotation potential as ECB holds deposit rate at 2.00%.",
        forInvestorsRisk: "Fragile liquidity; EU50 volatility persists post-rate pause.",
        category: "Equity",
        keyDriverArticle: {
            source: "Bloomberg",
            title: "ECB holds rates but signals deeper cuts ahead",
            timeAgo: "2h"
        }
    },
    paris: {
        id: "crypto",
        name: "Crypto",
        icon: "₿",
        pct: 30,
        delta: 8,
        whatsGoingOn: [
            "ECB digital euro pilot approved for March 2026 (€1.3B cost).",
            "European crypto ETF flows turned positive (€340M YTD inflows)."
        ],
        forInvestorsUpside: "Euro stablecoin opportunity as digital euro timeline clarifies.",
        forInvestorsRisk: "Regulatory uncertainty for BTC/ETH exposure in Europe.",
        category: "Crypto",
        keyDriverArticle: {
            source: "FT",
            title: "ECB launches digital euro pilot with €1.3B price tag",
            timeAgo: "6h"
        }
    }
};

// Replace whyTrending string with the new fields
content = content.replace(/whyTrending:\s*"([^"]*)",/g, (match, text) => {
    return `whatsGoingOn: [
            "${text}",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",`;
});

// Now we need to manually inject the highly specific top articles into the first element of each array (Today versions).
function injectTopTopic(arrayName, newObj) {
    const regex = new RegExp(`const ${arrayName}: Topic\\[\\] = \\[\n\\s*\\{[\\s\\S]*?\\},`);
    content = content.replace(regex, `const ${arrayName}: Topic[] = [
    {
        id: "${newObj.id}",
        name: "${newObj.name}",
        icon: "${newObj.icon}",
        pct: ${newObj.pct},
        delta: ${newObj.delta},
        whatsGoingOn: ${JSON.stringify(newObj.whatsGoingOn, null, 12).trim().replace(/"/g, '"')},
        forInvestorsUpside: "${newObj.forInvestorsUpside}",
        forInvestorsRisk: "${newObj.forInvestorsRisk}",
        category: "${newObj.category}",
        keyDriverArticle: ${JSON.stringify(newObj.keyDriverArticle)},
        articles: ARTICLES.${newObj.id}
    },`);
}

injectTopTopic("barcelonaTopicsToday", newTopics.barcelona);
injectTopTopic("berlinTopicsToday", newTopics.berlin);
injectTopTopic("franceCityTopicsToday", newTopics.paris);

// Also update the week ones to avoid typescript issues or mismatched tops if they switch timeframes
injectTopTopic("barcelonaTopicsWeek", newTopics.barcelona);
injectTopTopic("berlinTopicsWeek", newTopics.berlin);
injectTopTopic("franceCityTopicsWeek", newTopics.paris);

fs.writeFileSync(filePath, content);
console.log("Mock data updated successfully.");
