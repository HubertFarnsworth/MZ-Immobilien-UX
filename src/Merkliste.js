Immobilien.Merkliste = (function() {
	var that = {},
        list = new Array, 

	init = function() {
        	console.log("init von Merkliste aufgerufen");

                var merklisteHeadTemplate = _.template($("#merkliste-head-tpl").html());
                var resultingHtml = merklisteHeadTemplate({Properties : list});

                $("#content").html(resultingHtml);

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

                $( ".Property" ).mouseenter(function() {
                        $(this).addClass("hover");
                        $(this).css("cursor", "pointer");
                });

                $( ".Property" ).mouseleave(function() {
                        $(this).removeClass("hover");
                });

                $('.dropdown').change(function() {
                        console.log($('#dropdownMenu').text(this.val()));
                });
	},


        addToMerkliste = function (informations) {
                list[list.length] = informations; 
                console.log(list);

        };


	that.init = init;
        that.addToMerkliste = addToMerkliste; 

	return that;
}());