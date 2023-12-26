



function(array,i) {
    for (var i = 0; i < array.length; i++) {
        Game.LoadMod('http://marrrrrrme6.github.io/CookieClickerMods/' + array[i] + '/main.js')
    };
}(['CCSE','cookie-percentage-graph','GoldenMemory','bulkBuy50','bulkBuyX','ReloadGameButton','cws-betterGoldenAchievements','CookieAssistant','StockAssistant','IdleTrading','autoSacrifice'])
