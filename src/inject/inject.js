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
   						chrome.storage.sync.remove(checkKey + '-dataVid');
						chrome.storage.sync.remove(checkKey + '-morethanone');
						chrome.storage.sync.remove(checkKey + '-seriesHref');
						chrome.storage.sync.remove(checkKey + '-showURL');
						var getShows = key.substring(5) + '-shows';
						chrome.storage.sync.get(getShows,function (showNames){
							var channelShows = showNames[getShows];
							var showObj = {};
							if (channelShows.indexOf(',') != -1){
								if (channelShows.indexOf(showName) != (channelShows.length - showName.length)) {
									showObj[getShows] = channelShows.replace(showName + ',', '');
								}
								else {
									showObj[getShows] = channelShows.replace(',' + showName, '');
								}
							}
							else {
								showObj[getShows] = null;
							}
							chrome.storage.sync.set(showObj);
						});
   					});
   				}		
   				else {
    				var addButton = "<span class='addChannel btnWrap mltBtn mltBtn-s60'><a id='" + key + "' class='svf-button svfb-silver addlk evo-btn save2add svf-button-add'><span class='inr'>Add to " + val + "</span></a></span>";
					$('.actions').append(addButton);
					document.getElementById(key).addEventListener('click',function () {
						Obj = {};
						Obj[key.substring(5) + '-' + showName] = showName.replace(/_/g, " ");
						var getShows = key.substring(5) + '-shows';
						console.log(getShows);
						chrome.storage.sync.get(getShows, function (showNames) {
							var showObj = {};
							console.log(showNames);
							if (showNames[getShows] == null) {
								showObj[getShows] = showName;
							}
							else {
								showObj[getShows] = showNames[getShows] + ',' + showName;
							}
							console.log(showObj);
							chrome.storage.sync.set(showObj);
						});
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
							seasonStorage[checkKey + '-seriesHref']=seriesHref;
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
					});
				}
    		}
    	}
	});
});