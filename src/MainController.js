Immobilien.MainController = (function() {
	var that = {},
	

	init = function() {

		Startscreen = Immobilien.Startscreen;
		Startscreen.init(); 
	},

	startResults = function() {
		Results = Immobilien.Results;
		Results.init(); 
	}

	startDetail = function(id)  {
		Detail = Immobilien.Detail; 
		Detail.startDetail(id); 
	},

	getEnteredData = function() {
		var enteredData = Immobilien.Startscreen.getEnteredData(); 
		return enteredData;
	},

	setMarkersForResults = function(results) {
		Startscreen.setMarkersForResults(results);
	},

	reloadStartscreen = function () {
		Startscreen.reloadStartscreen(); 
	},

	loadMerkliste = function() {
		Immobilien.Merkliste.init(); 
	},

	addToMerkliste = function (informations) {
		Immobilien.Merkliste.addToMerkliste(informations); 
	},

	startBiete = function () {
		Immobilien.Biete.init(); 
	};


	that.init = init;
	that.startDetail = startDetail;
	that.startResults = startResults; 
	that.getEnteredData = getEnteredData;
	that.setMarkersForResults = setMarkersForResults;
	that.reloadStartscreen = reloadStartscreen; 
	that.loadMerkliste = loadMerkliste; 
	that.addToMerkliste = addToMerkliste; 
	that.startBiete = startBiete;

	return that;
}());