Immobilien.Detail = (function() {
	var that = {},


	init = function() {
	console.log("Detail.js aufgerufen");
	},

	startDetail = function (id) {
		var detailTemplate = _.template($("#detail-tpl").html());
		$("#content").html(detailTemplate);

	    document.getElementById("test-Text").innerHTML = id;
	};

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());