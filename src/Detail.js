Immobilien.Detail = (function() {
	var that = {},
	informations = new Array (), 
	map = false, 



	init = function() {
	console.log("Detail.js aufgerufen");	
	},

	startDetail = function (data) {
		//Scolls to 0,0
		window.scrollTo(0, 0);

		//Templates
		var detailTemplateTop = _.template($("#detail-tpl-top").html());
		var detailTemplateBot = _.template($("#detail-tpl-bot").html());
		$("#content").html(detailTemplateTop);
		$("#results").html(detailTemplateBot);

		//Sets the Text 
		informations = data; 
		setText();
		setupTopButtons(); 

	    $(document).on("click", "#backToStart", function(event){
      		Immobilien.MainController.init(); 
    	});

	    //Minimieren bzw. maximieren der Map-Ansicht
    	$(document).on("click", "#map-size-button", function(event){
    		if (map === true) {
    			$("#map-content").height(0);
      			$("#map-size-button").removeClass("glyphicon-minus");
      			$("#map-size-button").addClass("glyphicon-plus");
      			map = false; 
    		} else {
    			$("#map-content").height(300);
    			$("#map-size-button").removeClass("glyphicon-plus");
      			$("#map-size-button").addClass("glyphicon-minus");
    			map = true;
    		}
    	});
	},

	setText = function () {
		document.getElementById("immo-headline").innerHTML = informations.rooms + " Zimmer "+ informations.type;
	},

	//Setup der Navigationsbuttons
    setupTopButtons = function () {
        $("#gesuche-button").attr('class', 'btn btn-primary');
        $("#anbieten-button").attr('class', 'btn btn-default');
        $("#merkliste-button").attr('class', 'btn btn-default');

        $("#gesuche-button").click(function() {
            //user clicks on gesuche-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-primary');
            $("#anbieten-button").attr('class', 'btn btn-default');
            $("#merkliste-button").attr('class', 'btn btn-default');
        });

        $("#anbieten-button").click(function() {
            //user clicks on anbieten-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-default');
            $("#anbieten-button").attr('class', 'btn btn-primary');
            $("#merkliste-button").attr('class', 'btn btn-default');
        });

        $("#merkliste-button").click(function() {
            //user clicks on merkliste-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-default');
            $("#anbieten-button").attr('class', 'btn btn-default');
            $("#merkliste-button").attr('class', 'btn btn-primary');
        });
    };

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());