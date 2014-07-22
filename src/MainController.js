Immobilien.MainController = (function() {
	var that = {},
	

	init = function() {
		console.log("MainController.js aufgerufen");

		Startscreen = Immobilien.Startscreen;
		//Results = Immobilien.Results;
		Startscreen.init(); 
		//Results.init(); 
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
	}

	that.init = init;
	that.startDetail = startDetail;
	that.startResults = startResults; 
	that.getEnteredData = getEnteredData;

	return that;
}());