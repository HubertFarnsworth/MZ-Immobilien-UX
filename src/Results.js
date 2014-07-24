Immobilien.Results = (function() {
	var that = {},
  database = new Array(),
  enteredData = new Array(),
  searchResults, 
  numberOfResults,
  firstSearch = false,
  sortArray,

	init = function() {
		console.log("Results.js aufgerufen");
    firstSearch = true; 
    database = Immobilien.Startscreen.getRessources();
    filterDataBase(); 
    console.log(database); 

    sortImmo ($("#select-immo-sort-results").val());
    drawResults(); 

    $("#select-immo-sort-results").change(function() {
      sortImmo ($(this).val());
      drawResults(); 
    });



       
	},

  drawResults = function () {
    var resultsTemplate = _.template($("#results-tpl").html());
    var resultingHtml = resultsTemplate({Properties : sortArray});

    $("#results").html(resultingHtml); 

    $(document).on("click", ".Property", function(event){
      var PropertyID = event.target.id;
      for (var i = 0; i < database.length; i++) {
        if (database[i].id === PropertyID) {
          Immobilien.MainController.startDetail(database[i]);
          event.stopImmediatePropagation();
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
      $("#select-immo-sort-results").css({"visibility":"hidden"});
    } else {
      $(".scrollToResults").text(numberOfResults + " Treffer anzeigen");
      $("#select-immo-sort-results").css({"visibility":"visible"});
    }

    if (numberOfResults !== 0) {
      $(".scrollToTop").css({"visibility":"visible"});
      $('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0},100);
      return false;
      });
    } else {
      $(".scrollToTop").css({"visibility":"hidden"});
    }
    
    if (numberOfResults !== 0) {
      $('.scrollToResults').click(function(){
        $('html, body').animate({scrollTop : $("#select-immo-sort-results").offset().top},100);
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
      if (filterCityName(i)&& filterType(i) && filterCosts(i) && filterRooms(i) && filterSpace(i) && filterCommission(i) && filterBuyRent(i) && filterDate(i)){
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
    return false;
  },

  filterType = function (index) {
    if ((database[index].type.toLowerCase().indexOf(enteredData.type.toLowerCase()) > -1)){
      return true; 
    }
    return false;
  },

  filterCosts = function (index) {
    if ((enteredData.moneyMin <= database[index].price)&&(enteredData.moneyMax >= database[index].price)){
      return true; 
    }
    return false;


  },

  filterRooms = function (index) {
    if ((enteredData.roomsMin <= database[index].rooms)&&(enteredData.roomsMax >= database[index].rooms)){
      return true; 
    }
    return false;
  },

  filterSpace = function (index) {
    if ((enteredData.sizeMin <= database[index].living_space)&&(enteredData.sizeMax >= database[index].living_space)){
      return true; 
    }
    return false;
  },

  filterCommission = function (index) {
    if (enteredData.commission === false) {
      return true;
    }
    if ((enteredData.commission === true) && (database[index].commission == ("0"))) {
      return true;
    }
    return false;
  },

  filterBuyRent = function (index) {
    if (enteredData.rent === true) {
      if (database[index].buy_or_rent == "rent") {
        return true; 
      } else if (database[index].buy_or_rent == "buy") {
        return false; 
      }
    } else {
      if (database[index].buy_or_rent == "rent") {
        return false; 
      } else if (database[index].buy_or_rent == "buy") {
        return true; 
      }
    }
  },

  filterDate = function (index) {
    if (database[index].vacant_from != "") { 
      var enteredMinDay = parseInt(enteredData.dateMin.substring(0, 2));
      var enteredMinMonth = parseInt(enteredData.dateMin.substring(2, 4));
      var enteredMinYear = parseInt(enteredData.dateMin.substring(4, 8));

      var enteredMaxDay = parseInt(enteredData.dateMax.substring(0, 2));
      var enteredMaxMonth = parseInt(enteredData.dateMax.substring(2, 4));
      var enteredMaxYear = parseInt(enteredData.dateMax.substring(4, 8));

      var cleanVacantFrom = database[index].vacant_from.split('.').join("");
      var vacantFromDay = parseInt(cleanVacantFrom.toString().substring(0, 2));
      var vacantFromMonth = parseInt(cleanVacantFrom.toString().substring(2, 4));
      var vacantFromYear = parseInt(cleanVacantFrom.toString().substring(4, 8));

      var enteredDateMin = new Date(enteredMinYear, enteredMinMonth-1 , enteredMinDay);
      var enteredDateMax = new Date(enteredMaxYear, enteredMaxMonth-1 , enteredMaxDay);
      var vacantFrom = new Date(vacantFromYear, vacantFromMonth-1 , vacantFromDay);

      if ((enteredData.dateMin == "") && (enteredData.dateMax == "")) {
        return true; 
      }

      if ((enteredData.dateMin == "") && (enteredData.dateMax != "")) {
        if (enteredDateMax >= vacantFrom) {
          return true; 
        } else {
          return false; 
        }
      }

      if ((enteredData.dateMin != "") && (enteredData.dateMax == "")) {
        return true; 
      }

      if ((enteredData.dateMin != "") && (enteredData.dateMax != "")) {
        if (enteredDateMax >= vacantFrom) {
          return true;
        } else {
          return false; 
        }
      }
    }
    return true; 
  },

  getEnteredData = function () {
    return enteredData; 
  },

  getFirstSearch = function () {
    return firstSearch; 
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
      console.log(sortArray);
      console.log(searchResults);
  },

  sortPreisAufsteigend = function () {
    var priceList = new Array(); 
    for (var i = 0; i < searchResults.length; i++) {
        priceList[i] = searchResults[i].price;
    }
    console.log(searchResults);
    console.log("pricelist " + priceList);
    priceList.sort(function(a, b){return a-b});
    for (var i = 0; i < searchResults.length; i++) {
        for (var j = 0; j < searchResults.length; j++) {
            if (priceList[i] == searchResults[j].price) {
              sortArray[i] = searchResults[j];
            }
        }
    }
  },

  sortPreisAbsteigend = function () {
    console.log("Preis absteigend");
    var priceList = new Array(); 
    for (var i = 0; i < searchResults.length; i++) {
      priceList[i] = searchResults[i].price;
    }
    priceList.sort(function(a, b){return b-a});
    for (var i = 0; i < searchResults.length; i++) {
      for (var j = 0; j < searchResults.length; j++) {
        if (priceList[i] == searchResults[j].price) {
          sortArray[i] = searchResults[j];
        }
      }
    } 
  };

  sortFlächeAufsteigend = function () {
    console.log("Fläche aufsteigend");
    var sizeList = new Array(); 
    for (var i = 0; i < searchResults.length; i++) {
      sizeList[i] = searchResults[i].size;
    }
    sizeList.sort(function(a, b){return a-b});
    console.log(sizeList);
    for (var i = 0; i < searchResults.length; i++) {
      for (var j = 0; j < searchResults.length; j++) {
        if (sizeList[i] == searchResults[j].size) {
          sortArray[i] = searchResults[j];
        }
      }
    }
  },

  sortFlächeAbsteigend = function () {
    console.log("Fläche absteigend");
    var sizeList = new Array(); 
    for (var i = 0; i < searchResults.length; i++) {
      sizeList[i] = searchResults[i].size;
    }
    sizeList.sort(function(a, b){return b-a});
    console.log(sizeList);
    for (var i = 0; i < searchResults.length; i++) {
      for (var j = 0; j < searchResults.length; j++) {
        if (sizeList[i] == searchResults[j].size) {
          sortArray[i] = searchResults[j];
        }
      }
    }
  },

  sortZimmerAufsteigend = function () {
    console.log("Zimmeranzahl aufsteigend");
    var roomList = new Array(); 
    var takenID = new Array();

    for (var i = 0; i < searchResults.length; i++) {
      roomList[i] = searchResults[i].rooms;
    }
    roomList.sort(function(a, b){return a-b});
    console.log(roomList);
    for (var i = 0; i < searchResults.length; i++) {
      for (var j = 0; j < searchResults.length; j++) {
        if (roomList[i] == searchResults[j].rooms) {
          //console.log(checkIfIdTaken(searchResults[j].id, takenID));
          if (checkIfIdTaken(searchResults[j].id, takenID) === false) {
            console.log("check ist true");
            sortArray[i] = searchResults[j];
            takenID[takenID.length] = searchResults[j].id;
          }  
        }
      }
    }
  },

  sortZimmerAbsteigend = function () {
    console.log("Zimmeranzahl absteigend");
    var roomList = new Array(); 
    for (var i = 0; i < searchResults.length; i++) {
        roomList[i] = searchResults[i].rooms;                  
    }
    roomList.sort(function(a, b){return b-a});
    for (var i = 0; i < searchResults.length; i++) {
      for (var j = 0; j < searchResults.length; j++) {
        if (roomList[i] == searchResults[j].rooms) {
          sortArray[i] = searchResults[j];
        }
      }
    }
  },

  checkIfIdTaken = function (id, array) {

    for (var i = 0; i < array.length; i++) {
      if (array[i] == id) {
        console.log("taken");
        return true;
      } 
    }
    console.log("not taken");
    return false; 

    console.log(array);
    console.log(array.length);
  }

	that.init = init;
  that.getEnteredData = getEnteredData;  
  that.getFirstSearch = getFirstSearch; 

	return that;

}());