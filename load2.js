!async function(a) {
  for (let url of a) {
    try {
        await new Promise((resolve, reject) => {
            Game.LoadMod('https://marrrrrrme6.github.io/CookieClickerMods/' + url + '/main.js',resolve,()=>{console.log(`Failed to load mod file:`,file);resolve();});
        })
      } catch (err) {
            // エラーハンドリングをここで行うことができます
            // または、エラーを外部に伝播させるために再度throwすることもできます
            throw err
      }
  }
  // ループが完全に終了した後に実行されます
  console.log('ループ終了！')
}(['CCSE','cookie-percentage-graph','GoldenMemory','bulkBuy50','bulkBuyX','ReloadGameButton','cws-betterGoldenAchievements','CookieAssistant','StockAssistant','IdleTrading','autoSacrifice']);
