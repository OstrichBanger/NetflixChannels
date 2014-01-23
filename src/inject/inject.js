$(document).ready(function() {
    var showURL = document.URL;
	var splitURL = showURL.split("/");
	var showName = splitURL[splitURL.length - 2];
	chrome.storage.sync.get(null, function (result) {
    	for (var key in result){
   			val = result[key];
   			if (key.substring(0,5) == "chan-") {
   				var containCheck = Object.keys(result);
   				var checkKey = key.substring(5) + showName;
   				if (containCheck.indexOf(checkKey) > -1) {
   					var addButton = "<span class='addChannel btnWrap mltBtn mltBtn-s60'><a id='" + key + "' class='svf-button svfb-silver addlk evo-btn save2add svf-button-add'><span class='remove'>Remove from " + val + "</span></a></span>";
   					$('.actions').append(addButton);
   					document.getElementById(key).addEventListener('click',function () {
   						chrome.storage.sync.remove(checkKey);
   					});
   				}		
   				else {
    				var addButton = "<span class='addChannel btnWrap mltBtn mltBtn-s60'><a id='" + key + "' class='svf-button svfb-silver addlk evo-btn save2add svf-button-add'><span class='inr'>Add to " + val + "</span></a></span>";
					$('.actions').append(addButton);
					document.getElementById(key).addEventListener('click',function () {
						Obj = {};
						Obj[key.substring(5) + showName] = showName.replace(/_/g, " ");
						chrome.storage.sync.set(Obj);
						document.getElementById(key).innerHTML="<span class='inr'>Added to " + val + "</span>";
					});
				}
    		}
    	}
	});
});