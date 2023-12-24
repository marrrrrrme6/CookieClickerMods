



function(array,i) {
    for (var i = 0; i < array.length; i++) {
        Game.LoadMod('http://192.168.123.28:8000/' + array[i] + '/main.js')
    };
}(['CCSE','CookieAssistant','GoldenMemory','IdleTrading','ReloadGameButton','StockAssistant','autoSacrifice','bulkBuy50','bulkBuyX','cookie-percentage-graph','cws-betterGoldenAchievements'])
