Game.registerMod("GoldenMemory",{

// DATA
shimmerTimes: {},	// Will store times




// INIT - Automatically called at mod startup
init:function()
{
	// No init, keeping function to prevent errors
},




// SAVE - Automatically called when game is saved
save:function()
{
	// Save elapsed times for shimmers: gives a string like "shimmer1,time1;shimmer2;time2..."

	//Clear previous data
	this.shimmerTimes = {};

	// Loop on all shimmer types
	for (var i in Game.shimmerTypes)	// here, i is a string
	{
		var CD = Game.shimmerTypes[i];
		// If shimmer can spawn, we save it's time
		if (CD.spawnsOnTimer && CD.spawnConditions()) { this.shimmerTimes[i] = CD.time; }
	}

	// Convert into JSON string
	return JSON.stringify(this.shimmerTimes);
},




// LOAD - Automatically called when game stats are loaded
load:function(str)
{
	// Analyze save string: if no ",", no save, so no load
	try {
		this.shimmerTimes = JSON.parse(str);
	} catch (error) {
		this.shimmerTimes = {};
		return;
	}

	// For each found time, apply time to corresponding shimmer, if it can spawn
	for (var i in this.shimmerTimes) {
		if (Game.shimmerTypes[i] && Game.shimmerTypes[i].spawnsOnTimer && Game.shimmerTypes[i].spawnConditions()) {
			// Shimmer exists and can spawn
			Game.shimmerTypes[i].time = this.shimmerTimes[i];
			console.log('Setting age for "' + i + '" : ' + String(this.shimmerTimes[i]));
		}
	}

	// Notification that the mod is loaded
	let Duration = 11 + Math.random() * 10;
	Game.Notify(loc('Golden Memory loaded'), loc('Golden/Wrath cookies and Reindeers age restored.') + "<br><q>" + loc("Got it memorized?") + "</q>", [11,3], Duration, 1);
	
},

});




//=================================================




// Traduction française / French translation
ModLanguage('FR',{
	'Golden Memory loaded' : 'Golden Memory a été chargé',
	'Golden/Wrath cookies and Reindeers age restored.' : "L'âge des cookies dorés / de colère et des Rennes a été restauré.",
	'Got it memorized?' : "C'est bon, c'est retenu ?",
});