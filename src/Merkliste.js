Immobilien.Merkliste = (function() {
	var that = {},
        list = new Array, 
        sortArray,
        contains = 0,  

	init = function() {
        	console.log("init von Merkliste aufgerufen");
                sortImmo ($("#select-immo-sort").val());
                

                var merklisteHeadTemplate = _.template($("#merkliste-head-tpl").html());
                $("#content").html(merklisteHeadTemplate);
                sortImmo($("#select-immo-sort").val());
                drawList(); 


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

                

                $('#select-immo-sort').change(function() {
                        sortImmo ($(this).val());
                        drawList();
                });

                $(".delete-immo").on("click", function(e){
                        //console.log(event.target.id);
                        deleteOneElement(event.target.id);
                        sortImmo($("#select-immo-sort").val());
                        drawList(); 
                        e.stopImmediatePropagation();
                });
	},

        drawList = function() {
                var merklisteBotTemplate = _.template($("#merkliste-result-tpl").html());
                var resultingHtml = merklisteBotTemplate({Properties : sortArray});
                $("#results").html(resultingHtml);

                $(".delete-immo").on("click", function(e){
                        //console.log(event.target.id);
                        deleteOneElement(event.target.id);
                        sortImmo($("#select-immo-sort").val());
                        drawList(); 
                        e.stopImmediatePropagation();
                });
        },

        sortImmo = function (sortType) {
                sortArray = new Array(); 
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
                var priceList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        priceList[i] = list[i].price;
                }
                priceList.sort(function(a, b){return a-b});

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (priceList[i] == list[j].price) {
                                        sortArray[i] = list[j];
                                }
                        }
                }
        },

        sortPreisAbsteigend = function () {
                console.log("Preis absteigend");
                var priceList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        priceList[i] = list[i].price;
                }
                priceList.sort(function(a, b){return b-a});

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (priceList[i] == list[j].price) {
                                        sortArray[i] = list[j];
                                }
                        }
                } 
        },

        sortFlächeAufsteigend = function () {
                console.log("Fläche aufsteigend");
                var sizeList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        sizeList[i] = list[i].size;
                }
                sizeList.sort(function(a, b){return a-b});
                console.log(sizeList);

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (sizeList[i] == list[j].size) {
                                        sortArray[i] = list[j];
                                }
                        }
                }
        },

        sortFlächeAbsteigend = function () {
                console.log("Fläche absteigend");
                var sizeList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        sizeList[i] = list[i].size;
                }
                sizeList.sort(function(a, b){return b-a});
                console.log(sizeList);

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (sizeList[i] == list[j].size) {
                                        sortArray[i] = list[j];
                                }
                        }
                }
        },

        sortZimmerAufsteigend = function () {
                console.log("Zimmeranzahl aufsteigend");
                var roomList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        roomList[i] = list[i].rooms;
                }
                roomList.sort(function(a, b){return a-b});
                console.log(roomList);

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (roomList[i] == list[j].rooms) {
                                        sortArray[i] = list[j];
                                }
                        }
                }
        },

        sortZimmerAbsteigend = function () {
                console.log("Zimmeranzahl absteigend");
                var roomList = new Array(); 
                for (var i = 0; i < list.length; i++) {
                        roomList[i] = list[i].rooms;
                }
                roomList.sort(function(a, b){return b-a});

                for (var i = 0; i < list.length; i++) {
                        for (var j = 0; j < list.length; j++) {
                                if (roomList[i] == list[j].rooms) {
                                        sortArray[i] = list[j];
                                }
                        }
                }
        },

        deleteOneElement = function (id) {
                console.log(id);
                for (var i = 0; i < list.length; i++) {
                        if (list[i].id === id) {
                                list.splice(i,1);
                        }
                }
                console.log(list);
                

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