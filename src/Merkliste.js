Immobilien.Merkliste = (function() {
	var that = {},
        list = new Array, 
        sortArray = new Array,
        contains = 0,  

	init = function() {
        	console.log("init von Merkliste aufgerufen");
                drawPage(); 

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

        drawPage = function() {
                var merklisteHeadTemplate = _.template($("#merkliste-head-tpl").html());
                var resultingHtml = merklisteHeadTemplate({Properties : list});

                $("#content").html(resultingHtml);

                merklisteBotTemplate = _.template($("#empty-tpl").html());
                $("#results").html(merklisteBotTemplate);
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
                var priceList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        priceList[i] = list[i].price;
                }
                console.log(priceList);

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
                list[contains] = informations; 
                console.log(list.length);
                contains++;
        };


	that.init = init;
        that.addToMerkliste = addToMerkliste; 

	return that;
}());