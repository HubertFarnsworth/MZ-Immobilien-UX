Immobilien.Merkliste = (function() {
	var that = {},

	init = function() {
		console.log("init von Merkliste aufgerufen");
		merklisteHeadTemplate = _.template($("#merkliste-head-tpl").html());
        $("#content").html(merklisteHeadTemplate);

        merklisteBotTemplate = _.template($("#empty-tpl").html());
        $("#results").html(merklisteBotTemplate);

        $("#gesuche-button").attr('class', 'btn btn-default');
        $("#anbieten-button").attr('class', 'btn btn-default');
        $("#merkliste-button").attr('class', 'btn btn-primary');


        $("#gesuche-button").click(function() {
        	if (Immobilien.Results.getFirstSearch() === false) {
        		Immobilien.Startscreen.init();
        	} else {
        		Immobilien.Startscreen.reloadStartscreen(); 
        	}
        });
	};


	that.init = init;

	return that;
}());