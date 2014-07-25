Immobilien.Startscreen = (function() {
	var that = {},
    globalMap = null,
    autocomplete  = null,
    geocoder = null,
    enteredPlace = false,
    resLoaded = false, 
    enteredValues = new Array(),
    ressources = new Array (),
    markersArray = new Array(),
    markersGeodataArray = new Array(),
    markersIDs = new Array(),

	init = function() {

        startScreenTemplate = _.template($("#startscreen-tpl").html());
        $("#content").html(startScreenTemplate);
        
		setupGoogleComponents();
		createMietenKaufenButton();
		setupDatepicker(); 
		setupSliders(); 
		setupAutocompleteWas(); 
        setupTopButtons();
        setupCheckbox();
        setupInputListener();

        if(resLoaded === false) {
            loadRessources(); 
            resLoaded = true; 
        }
        
	},

	//Funktionen für Mieten/Kaufen-Buttons werden gesetzt
	createMietenKaufenButton = function () {
		$("#Mieten-Button").click(function() {
            //user clicks on rent-button
            //give user feedback (change button states)
            $("#Mieten-Button").attr('class', 'btn btn-primary');
            $("#Kaufen-Button").attr('class', 'btn btn-default');

            //refresh moneyslider with rent-values
            $("#moneyslider").slider({
                values: [ 50, 400 ],
                step: 10,
                min: 50,
                max: 2000,
                range: true,
                slide: function(event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                    }
                }
            });

            //refill money-input-fields with the current values of the slider
            $("#money-lower-input").val(250 + "€");
            $("#money-upper-input").val(400 + "€");
        });

        $("#Kaufen-Button").click(function() {
            //user clicks on buy-button
            //give user feedback (change button states)
            $("#Kaufen-Button").attr('class', 'btn btn-primary');
            $("#Mieten-Button").attr('class', 'btn btn-default');

            //refresh moneyslider with buy-values
            $("#moneyslider").slider({
                values: [ 10000, 250000 ],
                step: 250,
                min: 10000,
                max: 800000,
                range: true,
                slide: function(event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                    }
                }
            });
            
            //refill money-input-fields with the current values of the slider
            $("#money-lower-input").val(10000 + "€");
            $("#money-upper-input").val(250000 + "€");
        });
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
            //$("#gesuche-button").attr('class', 'btn btn-default');
            //$("#anbieten-button").attr('class', 'btn btn-primary');
            //$("#merkliste-button").attr('class', 'btn btn-default');


            Immobilien.MainController.startBiete(); 
        });

        $("#merkliste-button").click(function() {
            //user clicks on merkliste-button
            //give user feedback (change button states)
            //$("#gesuche-button").attr('class', 'btn btn-default');
            //$("#anbieten-button").attr('class', 'btn btn-default');
            //$("#merkliste-button").attr('class', 'btn btn-primary');

            Immobilien.MainController.loadMerkliste(); 
        });
    },

	//Google-Autocomplete für Wo-Input 
	setupGoogleComponents = function () {
		google.maps.event.addDomListener(window, 'load', initializeGoogleComponents);
            
	},

    initializeGoogleComponents = function() {

        var mapOptions = {
                center: new google.maps.LatLng(49.0167, 11.0833),
                zoom: 7,
            };

        map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions); 

        globalMap = map;

        var input = document.getElementById('wo-input');

        var options = {
            types: ['(cities)'],
            componentRestrictions: {country: 'de'}
        };  

        autocomplete = new google.maps.places.Autocomplete(input, options);

        google.maps.event.addListener(autocomplete, 'place_changed', onAutocompletePlaceChanged);


  
    },

    loadGoogleComponents = function() {
        initialize();
    },

    onAutocompletePlaceChanged = function() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(13);
            enteredPlace = true;
            getInputValues();
        } else {
            $('wo-input').placeholder = 'Stadt eingeben';
        }
    } 

	//Datepicker-Funktion
	setupDatepicker = function () {
		$(function() {
            $( "#datepicker-min" ).datepicker({
                inline: true,
                showOtherMonths: true,
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                minDate: 0,
                onClose: function( selectedDate ) {
                    $( "#datepicker-max" ).datepicker( "option", "minDate", selectedDate );
                }
            });

            $( "#datepicker-max" ).datepicker({
                inline: true,
                showOtherMonths: true,
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                minDate: 0,
                onClose: function( selectedDate ) {
                    $( "#datepicker-min" ).datepicker( "option", "maxDate", selectedDate );
                }
            });
        });
	},

	//Setup der Slider für Kosten, Zimmer, Wohnfläche
	setupSliders = function() {
		 $("#moneyslider").slider({
            values: [ 50, 500 ],
            step: 10,
            min: 50,
            max: 5000,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                }
            }
        });

        sliderInputChanged(0, $("#money-lower-input").val());
        sliderInputChanged(1, $("#money-upper-input").val());

        $("#roomsslider").slider({
            values: [ 1, 4 ],
            step: 1,
            min: 1,
            max: 20,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.roomsInput[data-index=" + i + "]").val(ui.values[i]);
                }
            }
        });

        sliderInputChanged(2, $("#rooms-lower-input").val());
        sliderInputChanged(3, $("#rooms-upper-input").val());

        $("input.sliderValue").change(function() {
            var $this = $(this);
            $("#roomsslider").slider("values", $this.data("index"), $this.val());
        });

        $("#sizeslider").slider({
            values: [ 10, 100 ],
            step: 10,
            min: 10,
            max: 600,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.sizeInput[data-index=" + i + "]").val(ui.values[i] + "m²");
                }
            }
        });

        $("input.sliderValue").change(function() {
            var $this = $(this);
            $("#sizeslider").slider("values", $this.data("index"), $this.val());
        });

        sliderInputChanged(4, $("#size-lower-input").val());
        sliderInputChanged(5, $("#size-upper-input").val());
	},

    sliderInputChanged = function (id, oldValue) {
        //input fields manually changed by user
        //update the slider

        /*
        id: give id of input-field
        id 0: money-lower-input was changed
        id 1: money-upper-input was changed
        id 2: rooms-lower-input was changed
        id 3: rooms-upper-input was changed
        id 4: size-lower-input was changed
        id 5: size-upper-input was changed
        */
        var specialSign;
        var slider;
        var inputID;
        var oppositeInputID;

        switch (id) {
            case 0:
                inputID = "#money-lower-input";
                oppositeInputID = "#money-upper-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 1:
                inputID = "#money-upper-input";
                oppositeInputID = "#money-lower-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 2:
                inputID = "#rooms-lower-input";
                oppositeInputID = "#rooms-upper-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 3:
                inputID = "#rooms-upper-input";
                oppositeInputID = "#rooms-lower-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 4:
                inputID = "#size-lower-input";
                oppositeInputID = "#size-upper-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
            case 5:
                inputID = "#size-upper-input";
                oppositeInputID = "#size-lower-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
        }

        var signLength = specialSign.length;

        $(inputID).change(function() {
            var value = $(this).val();
            var current = $(this);

            //check if entered value is below or above the value of the oppsite input
            //if so, user gets notification that this is not allowed

            if (parseInt(value) <= 0) {
                //user typed a negative number
                //reset input-field to old value
                $(inputID).val(oldValue);
                //tell user
                alert("Fehlerhafte Eingabe! Der Wert muss größer als Null sein.");
            }

            else {
                if (parseInt(id) % 2 != 0) {
                    //input of this field should be lower than opposite input value
                    if (value.indexOf("€") > -1) {
                        value = value.substring(0, value.length - 1);
                    }

                    if (parseInt(value) >=  parseInt($(oppositeInputID).val())) {
                        //is allowed
                        refreshSliderFillInput(value, specialSign, signLength, inputID, slider, current);
                    }
                    else {
                        //is not allowed
                        //reset input-field to old value
                        $(inputID).val(oldValue);
                        //tell user
                        alert("Fehlerhafte Eingabe! Der Wert darf nicht unter dem minimal-Wert liegen.");
                    }
                }

                else {
                    //input of this field should be lower than opposite input value
                    if (parseInt(value) <=  parseInt($(oppositeInputID).val())) {
                        //is allowed
                        refreshSliderFillInput(value, specialSign, signLength, inputID, slider, current);
                    }
                    else {
                        //is not allowed
                        //reset input-field to old value
                        $(inputID).val(oldValue);
                        //tell user
                        alert("Fehlerhafte Eingabe! Der Wert darf nicht über dem maximal-Wert liegen.");
                    }
                }
            }
            
            
        });
    }

    refreshSliderFillInput = function (value, specialSign, signLength, inputID, slider, current) {
        if  (value.slice(- signLength) === specialSign) {
                //user entered special sign as last charater
                //delete this sign from the value
                //otherwise input field might have two special signs
                value = current.val().slice(0, - signLength);
            }

            //var $this = $(this);
            $(slider).slider("values", current.data("index"), value);

            //add special sign to value
            $(inputID).val(value + specialSign);
    },

	//Setup von Autocomplete für Was-Input
	setupAutocompleteWas = function () {
		$(function() {
            var availableTags = [
                "Haus",
                "Wohnung",
                "Doppelhaushälfte",
                "Grundstück",
                "Garage",
                "Reihenhaus"
            ];

            $( "#was-input" ).autocomplete({
                source: availableTags,
                minLength: 0
            }).focus(function(){            
                $(this).trigger('keydown.autocomplete');
            });
        });
	},

    setupCheckbox = function () {
        $("#checkbox-commission").prettyCheckable();
    },

    placeMarkerOnMap = function(address, id, propertyID) {

        geocoder = new google.maps.Geocoder();

        var latitude, longitude;

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                
                var markerGeodata = new google.maps.LatLng(latitude, longitude);

                //path for numbered icons
                var iconPath = "res/markers/marker" + parseInt(id + 1) + ".png";

                var marker = new google.maps.Marker({
                    map: globalMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: iconPath
                });

                google.maps.event.addListener(marker, 'click', function() {
                    //user clicks on marker
                    //scroll to result
                    var markerID = markersArray.indexOf(marker) + 1;
                    var element = document.getElementById(propertyID);
                    alignWithTop = true;
                    element.scrollIntoView(false);
                    //window.scroll(0,findPos(document.getElementById(propertyID)));
                    //$("Property." + markerID).scrollTo(200, 0);
                    //$('html, body').animate({scrollTop : document.getElementById(propertyID).offset().top},100)
                });

                markersArray.push(marker);
                markersIDs.push(propertyID);
                //google.maps.event.addListener(marker,"click",function(){});
            }
        });
    },

    setupInputListener = function() {
        //sets up listeners for all input-fields

        $(".userInput").change( function() {
            getInputValues();
        });

        $(".userInputButton").click( function() {
            getInputValues();
        });

        $(".slider").slider({
            change: function(event, ui) {
                /*
                * problem: this function is called whenever
                * the user clicks on Mieten or Kaufen
                */
                getInputValues();
            }
        });
    },

    getInputValues = function() {
        //get input values from input fields
        var city = null,
        type = null,
        rent = null,
        moneyMin = null,
        moneyMax = null,
        roomsMin = null,
        roomsMax = null,
        sizeMin = null,
        sizeMax = null,
        commission = null,
        dateMin = null,
        dateMax = null;

        if (autocomplete.getPlace() === undefined) {
            city = $("#wo-input").val();
        }

        else {
            if (enteredPlace) {
                city = autocomplete.getPlace().name;
            }
            else {
                city = "";
            }
        }
        
        enteredValues["city"] = city;

        type = $("#was-input").val();
        enteredValues["type"] = type;
        /*
        * rent contains true or false:
        * checks if Mieten-Button contains "btn-primary" in classes
        * if yes, button is active and user searches to rent
        * otherwise, user searches to buy
        */
        enteredValues["rent"] = $("#Mieten-Button").attr('class').indexOf("btn-primary") > 0;
        enteredValues["moneyMin"] = parseInt($("#money-lower-input").val());
        enteredValues["moneyMax"] = parseInt($("#money-upper-input").val());
        enteredValues["roomsMin"] = parseInt($("#rooms-lower-input").val());
        enteredValues["roomsMax"] = parseInt($("#rooms-upper-input").val());
        enteredValues["sizeMin"] = parseInt($("#size-lower-input").val());
        enteredValues["sizeMax"] = parseInt($("#size-upper-input").val());
        enteredValues["commission"] = $("#checkbox-commission").is(':checked'); //checkbox; true or false

        dateMin = $("#datepicker-min").val();
        enteredValues["dateMin"] = dateMin.split('.').join("");
        
        dateMax = $("#datepicker-max").val();
        enteredValues["dateMax"] = dateMax.split('.').join("");

        Immobilien.MainController.startResults();
    },

    getEnteredData = function () {
        return enteredValues; 
    },

    //load XML-Files from res-folder
    loadRessources = function() {
        var xmlArray = new Array(); 
        xmlArray[0] = loadXMLDoc("res/properties/0000001.xml");
        xmlArray[1] = loadXMLDoc("res/properties/0000002.xml");
        xmlArray[2] = loadXMLDoc("res/properties/0000003.xml");
        xmlArray[3] = loadXMLDoc("res/properties/0000004.xml");
        xmlArray[4] = loadXMLDoc("res/properties/0000005.xml");
        xmlArray[5] = loadXMLDoc("res/properties/0000006.xml");
        xmlArray[6] = loadXMLDoc("res/properties/0000007.xml");
        xmlArray[7] = loadXMLDoc("res/properties/0000008.xml");
        xmlArray[8] = loadXMLDoc("res/properties/0000009.xml");
        xmlArray[9] = loadXMLDoc("res/properties/0000010.xml");
        xmlArray[10] = loadXMLDoc("res/properties/0000011.xml");
        xmlArray[11] = loadXMLDoc("res/properties/0000012.xml");

        for (var i = 0; i < xmlArray.length; i++) {
          ressources[i] = getImmoData(xmlArray[i]); 
        }
    },

    //loads one xml file 
    loadXMLDoc = function (filename) {
            if (window.XMLHttpRequest)
              {
              xhttp=new XMLHttpRequest();
              }
            else // code for IE5 and IE6
              {
              xhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xhttp.open("GET",filename,false);
            xhttp.send();
            return xhttp.responseXML;
    },

    //gets the data from xml file
    getImmoData = function (xml) {
        var immo = new Array();

        immo ["id"] = xml.getElementsByTagName("id")[0].innerHTML;
        immo ["rooms"] = xml.getElementsByTagName("number_of_rooms")[0].innerHTML; 
        immo ["type"] =  xml.getElementsByTagName("type")[0].innerHTML; 
        immo ["city"] =  xml.getElementsByTagName("city")[0].innerHTML;
        immo ["plz"] =  xml.getElementsByTagName("zipcode")[0].innerHTML;
        immo ["size"] =  xml.getElementsByTagName("living_space")[0].innerHTML;
        immo ["price"] =  xml.getElementsByTagName("price")[0].innerHTML;
        immo ["description"] = xml.getElementsByTagName("description")[0].innerHTML;
        immo ["streetname"] = xml.getElementsByTagName("streetname")[0].innerHTML;
        immo ["housenumber"] = xml.getElementsByTagName("housenumber")[0].innerHTML;
        immo ["status"] = xml.getElementsByTagName("status")[0].innerHTML;
        immo ["size_of_property"] = xml.getElementsByTagName("size_of_property")[0].innerHTML;
        immo ["living_space"] = xml.getElementsByTagName("living_space")[0].innerHTML;
        immo ["commission"] = xml.getElementsByTagName("commission")[0].innerHTML;
        immo ["buy_or_rent"] = xml.getElementsByTagName("buy_or_rent")[0].innerHTML;
        immo ["extra_cost"] = xml.getElementsByTagName("extra_cost")[0].innerHTML;
        immo ["bail"] = xml.getElementsByTagName("bail")[0].innerHTML;
        immo ["floors"] = xml.getElementsByTagName("floors")[0].innerHTML;
        immo ["year_of_construction"] = xml.getElementsByTagName("year_of_construction")[0].innerHTML;
        immo ["heatingtype"] = xml.getElementsByTagName("heatingtype")[0].innerHTML;
        immo ["rent"] = xml.getElementsByTagName("rent")[0].innerHTML;
        immo ["vacant_from"] = xml.getElementsByTagName("vacant_from")[0].innerHTML;
        immo ["extra"] = xml.getElementsByTagName("extra")[0].innerHTML;
        immo ["cellar"] = xml.getElementsByTagName("cellar")[0].innerHTML;
        immo ["built_in_kitchen"] = xml.getElementsByTagName("built_in_kitchen")[0].innerHTML;
        immo ["email"] = xml.getElementsByTagName("email")[0].innerHTML;
        immo ["telephone"] = xml.getElementsByTagName("telephone")[0].innerHTML;
        immo ["parking_space"] = xml.getElementsByTagName("parking_space")[0].innerHTML;
        immo ["parking_space_amount"] = xml.getElementsByTagName("parking_space_amount")[0].innerHTML;
        immo ["parking_space_buy_or_rent"] = xml.getElementsByTagName("parking_space_buy_or_rent")[0].innerHTML;
        immo ["parking_space_price"] = xml.getElementsByTagName("parking_space_price")[0].innerHTML;
        immo ["commission"] = xml.getElementsByTagName("commission")[0].innerHTML;

        return immo; 
    },

    setMarkersForResults = function (results) {
        //gets result-array from Results.js and sets markers for every result

        //delete previous markers
        clearOverlays();

        for (var i = 0; i < results.length; i++) {
            var address = results[i].city + ", " + results[i].streetname + " " + results[i].housenumber;
            placeMarkerOnMap(address, i, results[i].id);
        }
    },

    clearOverlays = function () {
        for (var i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
        markersGeodataArray.length = 0;
    },

    getRessources = function() {
        return ressources; 
    },

    reloadStartscreen = function () {
        startScreenTemplate = _.template($("#startscreen-tpl").html());
        $("#content").html(startScreenTemplate);

        emptyTemplate = _.template($("#empty-tpl").html());
        $("#results").html(emptyTemplate);
        
        initializeGoogleComponents();
        createMietenKaufenButton();
        setupDatepicker(); 
        setupSliders(); 
        setupAutocompleteWas(); 
        setupTopButtons();
        setupCheckbox();
        setEnteredValues(); 
        setupInputListener();
        
    },

    setEnteredValues = function () {
        var values = Immobilien.Results.getEnteredData();


        $("#wo-input").val(values.city);
        $("#was-input").val(values.type);

        if (values.rent === true) {
            $("#Mieten-Button").attr('class', 'btn btn-primary');
            $("#Kaufen-Button").attr('class', 'btn btn-default');
        } else {
            $("#Mieten-Button").attr('class', 'btn btn-default');
            $("#Kaufen-Button").attr('class', 'btn btn-primary');
        }

        if (isNaN(values.moneyMin)) {
            //enter standard-values
            $("#money-lower-input").val("50€");
            $("#money-upper-input").val("400€");
            $("#moneyslider").slider("values", [50, 400]);

            $("#rooms-upper-input").val(1);
            $("#rooms-lower-input").val(4);
            $("#roomsslider").slider("values", [1, 4]);

            $("#size-upper-input").val("10m²");
            $("#size-lower-input").val("100m²");
            $("#sizeslider").slider("values", [10, 100]);

        }

        else {
            $("#money-lower-input").val(values.moneyMin + "€");
            $("#money-upper-input").val(values.moneyMax + "€");
            $("#moneyslider").slider("values", [values.moneyMin, values.moneyMax]);

            $("#rooms-upper-input").val(values.roomsMax);
            $("#rooms-lower-input").val(values.roomsMin);
            $("#roomsslider").slider("values", [values.roomsMin, values.roomsMax]);

            $("#size-upper-input").val(values.sizeMax + "m²");
            $("#size-lower-input").val(values.sizeMin + "m²");
            $("#sizeslider").slider("values", [values.sizeMin, values.sizeMax]);


            if (values.commission) {
                $("#checkbox-commission").prettyCheckable("check");
            }

            if (values.dateMin != "" && values.dateMin != null) {
                $("#datepicker-min").val(values.dateMin.toString().substring(0,2) + "." + values.dateMin.toString().substring(2,4) + "." + values.dateMin.toString().substring(4,8));
            }
            
            if (values.dateMax != "" && values.dateMin != null) {
                $("#datepicker-max").val(values.dateMax.toString().substring(0,2) + "." + values.dateMax.toString().substring(2,4) + "." + values.dateMax.toString().substring(4,8));
            }
        }

        //show found results
        getInputValues();
    };


	that.init = init;
    that.getEnteredData = getEnteredData;
    that.getRessources = getRessources;
    that.setMarkersForResults = setMarkersForResults;
    that.reloadStartscreen = reloadStartscreen; 

	return that;
}());