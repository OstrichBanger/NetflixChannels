$(document).ready(function() {
    var showURL = document.URL;
	var splitURL = showURL.split("/");
	var showName = splitURL[splitURL.length - 2];
	chrome.storage.sync.get(null, function (result) {
    	for (var key in result){
   			val = result[key];
   			if (key.substring(0,5) == "chan-") {
   				var containCheck = Object.keys(result);
   				var checkKey = key.substring(5) + '-' + showName;
   				if (containCheck.indexOf(checkKey) > -1) {
   					var addButton = "<span class='addChannel btnWrap mltBtn mltBtn-s60'><a id='" + key + "' class='svf-button svfb-silver addlk evo-btn save2add svf-button-add'><span class='remove'>Remove from " + val + "</span></a></span>";
   					$('.actions').append(addButton);
   					document.getElementById(key).addEventListener('click',function () {
   						chrome.storage.sync.remove(checkKey);
   						var checkKeyUrls = checkKey + "-urls";
   						chrome.storage.sync.remove(checkKeyUrls);
   					});
   				}		
   				else {
    				var addButton = "<span class='addChannel btnWrap mltBtn mltBtn-s60'><a id='" + key + "' class='svf-button svfb-silver addlk evo-btn save2add svf-button-add'><span class='inr'>Add to " + val + "</span></a></span>";
					$('.actions').append(addButton);
					document.getElementById(key).addEventListener('click',function () {
						Obj = {};
						Obj[key.substring(5) + '-' + showName] = showName.replace(/_/g, " ");
						console.log(Obj);
						chrome.storage.sync.set(Obj);
						document.getElementById(key).innerHTML="<span class='inr'>Added to " + val + "</span>";
						var seasons = null;
					    var seriesHref = window.location.href.replace("#","");
					    seasons = $("#seasonsNav .seasonItem a");

						if(seasons.length) {
							var seasonStorage = {};
							var dataVid;
							var q = 0;
							seasons.each(function (i,e){
								var j = $(e).attr("data-vid");
								if (q == 0) {
									dataVid = j;
									q = 1;
								}
								else{
									dataVid += ',';
									dataVid += j;
								}
							});
							console.log(dataVid);
							seasonStorage[checkKey + '-dataVid']=dataVid;
							seasonStorage[checkKey + '-morethanone']=1;
							chrome.storage.sync.set(seasonStorage);
							chrome.storage.sync.get(null, function (resulting) {
								console.log(resulting);
							});
						}
						else{
							var seasonStorage = {};
							seasonStorage[checkKey + '-morethanone']=0;
							seasonStorage[checkKey + '-showURL']=document.URL;
							chrome.storage.sync.set(seasonStorage);
							chrome.storage.sync.get(null, function (resulting) {
								console.log(resulting);
							});
						}

					    var hrefs = [];
						var promiseDone;
/*					    if(seasons.length) {
					        // multiple seasons listed, load each tab and get the episodes					        
					        seasons.each(function (i,e) {
					        	var episodeList = [];
					            var asyncJSON = $.getJSON(seriesHref + "&actionMethod=seasonDetails&seasonId=" + $(e).attr("data-vid") + "&seasonKind=ELECTRONIC", function(data,textStatus) {
					                var stringData = data.html;
					                stringData = stringData.replace(/(\r\n|\n|\r)/gm,"");
					                stringData = stringData.replace(/\>\s+\</g,'\>\<');
					                stringData = stringData.replace(/\s{3,}/g,'');
					                // stringData = stringData.replace(/&/g,"&amp;");
					                stringData = stringData.match(/<ul.*ul>/g);
					                episodeList.push(stringData);
					            });
					            promiseDone = asyncJSON.promise().done(function () {
									var test2 = JSON.stringify(episodeList[0]);
									test2 = test2.replace(/\[\"/g,"");
									test2 = test2.replace(/\"\]/g,"");
									test2 = test2.replace(/\\\"/g,'"');
									/* console.log(test2); 
									$(test2).find("a").each(function () {
										var test1 = $(this);
										hrefs.push($(this).attr('href'));
									});
								});
					        });
						
							promiseDone.promise().done(function () {
								var showHREFS = JSON.stringify(hrefs);
								var showStorageKey = checkKey + "-urls";
								var urlObj = {};
								urlObj[showStorageKey] = showHREFS;
								console.log(urlObj);
								chrome.storage.sync.set(urlObj);
								chrome.storage.sync.get(null, function (gaysults){
									console.log(gaysults);
								});
							});
						
					    } else {
					        // just one season, no need to load more tabs
					        $("#seasonDetail").find("a").each(function () {
								console.log($(this));
					            hrefs.push($(this).attr('href'));
					        });
							var showHREFS = JSON.stringify(hrefs);
							var showStorageKey = checkKey + "-urls";
							var urlObj = {};
							urlObj[showStorageKey] = showHREFS;
							chrome.storage.sync.set(urlObj);
					    } */
					});
				}
    		}
    	}
	});
});