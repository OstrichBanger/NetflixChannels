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

						// start of seasonData code

						var seasons = null;
					    // assume the current window location is the series page
					    var seriesHref = window.location.href.replace("#","");
					    seasons = $("#seasonsNav .seasonItem a");
					    var seasonsData;
					    var hrefs=[];
					    if(seasons.length) {
					    	var testvar1 = 0;
					        // multiple seasons listed, load each tab and get the episodes					        
					        seasons.each(function (i,e) {
					        	console.log(seriesHref + "&actionMethod=seasonDetails&seasonId=" + $(e).attr("data-vid") + "&seasonKind=ELECTRONIC");
					            var whatever = $.getJSON(seriesHref + "&actionMethod=seasonDetails&seasonId=" + $(e).attr("data-vid") + "&seasonKind=ELECTRONIC", function(data,textStatus) {
					                
					                // var href = [];// var columndata = data.html.querySelector('.episodeList');
					                var stringData = data.html;
					                stringData = stringData.replace(/(\r\n|\n|\r)/gm,"");
					                stringData = stringData.replace(/\>\s+\</g,'\>\<');
					                stringData = stringData.replace(/\s{3,}/g,'');
					                // stringData = stringData.replace(/&/g,"&amp;");
					                stringData = stringData.match(/<ul.*ul>/g);
					                // console.log(stringData);
					                var whatever = stringData[0];
					                // console.log(whatever);
					                return whatever;
					            });
					            whatever=whatever.responseText;
					            console.log(whatever);
					            var why = $(whatever).find("li");
					            $(whatever).find('a').each(function(){
					                var href = $(this).attr('href');
					                hrefs.push(href);
					            });

					        });
					    } else {
					        // just one season, no need to load more tabs
					        $("#seasonDetail").find("a").each(function () {
					            hrefs.push($(this).attr('href'));
					        });
					    }
						console.log(seasonsData);
						console.log(hrefs);
					});
				}
    		}
    	}
	});
});