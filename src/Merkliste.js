Immobilien.Merkliste = (function() {
	var that = {},
        list = new Array, 
        sortArray = new Array, 

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

                sortImmo ($("#select-immo-sort").val());

                $('#select-immo-sort').change(function() {
                        sortImmo ($(this).val());
                });
	},

        sortImmo = function (sortType) {
                switch(sortType) {
                        case "Preis aufsteigend":
                                sortPreisAufsteigend(); 
                                break;
                        case "Preis absteigend":
                                sortPreisAbsteigend(); 
                                break;
                        case "Fläche aufsteigend":
                                sortFlächeAufsteigend();
                                break;
                        case "Fläche absteigend":
                                sortFlächeAbsteigend();
                                break;
                        case "Zimmeranzahl aufsteigend":
                                sortZimmerAufsteigend();
                                break;
                        case "Zimmeranzahl absteigend":
                                sortZimmerAbsteigend(); 
                                break;
                }
        },

        sortPreisAufsteigend = function () {
                console.log("Preis aufsteigend");
        },

        sortPreisAbsteigend = function () {
                console.log("Preis absteigend");
        },

        sortFlächeAufsteigend = function () {
                console.log("Fläche aufsteigend");
        },

        sortFlächeAbsteigend = function () {
                console.log("Fläche absteigend");
        },

        sortZimmerAufsteigend = function () {
                console.log("Zimmeranzahl aufsteigend");
        },

        sortZimmerAbsteigend = function () {
                console.log("Zimmeranzahl absteigend");
        },

        addToMerkliste = function (informations) {
                list[list.length] = informations; 
                console.log(list);
        };


	that.init = init;
        that.addToMerkliste = addToMerkliste; 

	return that;
}());