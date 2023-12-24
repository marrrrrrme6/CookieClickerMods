Game.registerMod("goldenCookieClicker",{
	init:function(){
		var autoGoldenCookie = setInterval(function() { for (var h in Game.shimmers){if(Game.shimmers[h].type=="golden"){Game.shimmers[h].pop();}} }, 100);
		
		Game.Notify(`Clicking Golden Cookies!`,'',[16,5]);

	},
});