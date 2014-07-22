Immobilien.Results = (function() {
	var that = {},
  database = new Array(),
  enteredData = new Array(),
  searchResults, 
  numberOfResults,

	init = function() {
		console.log("Results.js aufgerufen");
    //getData();

    database = Immobilien.Startscreen.getRessources();
    filterDataBase(); 
    console.log(database); 

		var resultsTemplate = _.template($("#results-tpl").html());
    var resultingHtml = resultsTemplate({Properties : searchResults});

    $("#results").html(resultingHtml);

    $(document).on("click", ".Property", function(event){
      var PropertyID = event.target.id;
      for (var i = 0; i < database.length; i++) {
        if (database[i].id === PropertyID) {
          Immobilien.MainController.startDetail(database[i]);
        }
      }
    });

    $( ".Property" ).mouseenter(function() {
      $(this).addClass("hover");
      $(this).css("cursor", "pointer");
    });

    $( ".Property" ).mouseleave(function() {
      $(this).removeClass("hover");
    });

    setupScrollButtons(); 
	},

  setupScrollButtons = function () {
    $(".scrollToResults").css({"visibility":"visible"});
    if (numberOfResults === 0) {
      $(".scrollToResults").text(numberOfResults + " Treffer gefunden");
    } else {
      $(".scrollToResults").text(numberOfResults + " Treffer anzeigen");
    }

    if (numberOfResults !== 0) {
      $(".scrollToTop").css({"visibility":"visible"});
      $('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
      });
    } else {
      $(".scrollToTop").css({"visibility":"hidden"});
    }
    
    if (numberOfResults !== 0) {
      $('.scrollToResults').click(function(){
        $('html, body').animate({scrollTop : $("#results").offset().top},800);
        $(".scrollToResults").css({"visibility":"visible"});
        return false;
      });  
    }
  },

  getData = function () {
        var xmlArray = new Array(); 
        xmlArray[0] = loadXMLDoc("res/properties/4696025.xml");
        xmlArray[1] = loadXMLDoc("res/properties/4699501.xml");
        xmlArray[2] = loadXMLDoc("res/properties/4699604.xml");
        xmlArray[3] = loadXMLDoc("res/properties/4700505.xml");
        xmlArray[4] = loadXMLDoc("res/properties/4703070.xml");
        xmlArray[5] = loadXMLDoc("res/properties/4704162.xml");
        xmlArray[6] = loadXMLDoc("res/properties/4707083.xml");
        xmlArray[7] = loadXMLDoc("res/properties/5123397.xml");
        xmlArray[8] = loadXMLDoc("res/properties/5135982.xml");
        xmlArray[9] = loadXMLDoc("res/properties/5630932.xml");
        xmlArray[10] = loadXMLDoc("res/properties/5923747.xml");

        for (var i = 0; i < xmlArray.length; i++) {
          data[i] = getImmoData(xmlArray[i]); 
        }
  },

	getImmoData = function (xml) {
    var immo = new Array();

    immo ["id"] = xml.getElementsByTagName("id")[0].innerHTML;
    immo ["rooms"] = xml.getElementsByTagName("number_of_rooms")[0].innerHTML; 
    immo ["type"] =  xml.getElementsByTagName("type")[0].innerHTML; 
    immo ["city"] =  xml.getElementsByTagName("city")[0].innerHTML;
    immo ["plz"] =  xml.getElementsByTagName("zipcode")[0].innerHTML;
    immo ["size"] =  xml.getElementsByTagName("living_space")[0].innerHTML;
    immo ["price"] =  xml.getElementsByTagName("price")[0].innerHTML;

    return immo; 
	},

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

  filterDataBase = function () {
    enteredData = Immobilien.MainController.getEnteredData();
    searchResults = new Array(); 
    numberOfResults = 0; 
    for (var i = 0 ; i < database.length; i++) {
      if (filterCityName(i) && filterType(i) && filterCosts(i) && filterRooms(i) && filterSpace(i)){
        searchResults[numberOfResults] = database[i];
        numberOfResults++;
      }
    }
    Immobilien.MainController.setMarkersForResults(searchResults);
  },

  filterCityName = function(index) {
    if ((database[index].city.toLowerCase().indexOf(enteredData.city.toLowerCase()) > -1) || (enteredData.city.toLowerCase().indexOf(database[index].city.toLowerCase()) > -1) ){
      return true; 
    }
  },

  filterType = function (index) {
    if ((database[index].type.toLowerCase().indexOf(enteredData.type.toLowerCase()) > -1)){
      return true; 
    }
  },

  filterCosts = function (index) {
    if ((enteredData.moneyMin <= database[index].price)&&(enteredData.moneyMax >= database[index].price)){
      return true; 
    }
  },

  filterRooms = function (index) {
    if ((enteredData.roomsMin <= database[index].rooms)&&(enteredData.roomsMax >= database[index].rooms)){
      return true; 
    }
  },

  filterSpace = function (index) {
    if ((enteredData.sizeMin <= database[index].living_space)&&(enteredData.sizeMax >= database[index].living_space)){
      return true; 
    }
  };

	that.init = init;

	return that;

}());