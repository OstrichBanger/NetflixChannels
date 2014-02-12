$(function() {
	chrome.storage.sync.get(null, function (result) {
		for(var key in result){
			if (key.substring(0,5) == 'chan-'){
   				var channelNoSpace = key.substring(5);
   				val = result[key]; 
   				value = "<div class='chan-names' id='" + key + "'><input type='button' class='playButton' id='play" + key + "'>" + val + "<input type='button' class='removeButton' value='x' id='remove" + key + "'></div>";
				$(".nc-channel-name").append(value);
				document.getElementById('play' + key).addEventListener('click',function(){
					var showToPlay = null;
					var promiseDone;
					chrome.storage.sync.get(channelNoSpace + '-shows', function (channelShows) {
						var showArr = channelShows[channelNoSpace + '-shows'].split(',');
						showToPlay = showArr[Math.floor((Math.random()*showArr.length))];
						console.log(showToPlay);
						var hrefs = [];
						console.log(showToPlay);
						var morethanone = channelNoSpace + '-' + showToPlay + '-morethanone';
						console.log(morethanone);
						chrome.storage.sync.get(morethanone, function (hrefObj) {
							console.log(hrefObj);
							var yesorno = hrefObj[morethanone];
							if (yesorno == 1) {
								console.log(showToPlay);
								var storageGetIds = channelNoSpace + '-' + showToPlay + '-dataVid';
								chrome.storage.sync.get(storageGetIds, function (dataVids) {
									console.log(dataVids);
									var dataVidsArr = dataVids[storageGetIds].split(',');
									console.log(dataVidsArr.length);
									var storageGetHref = channelNoSpace + '-' + showToPlay + '-seriesHref';
									chrome.storage.sync.get(storageGetHref, function (seriesHref) {
										var count = 0;
										dataVidsArr.forEach(function (i) {
											console.log(seriesHref);
							        		var episodeList = [];
							            	var asyncJSON = $.getJSON(seriesHref[storageGetHref] + "&actionMethod=seasonDetails&seasonId=" + i + "&seasonKind=ELECTRONIC", function(data,textStatus) {
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
												$(test2).find("a").each(function () {
													var test1 = $(this);
													hrefs.push($(this).attr('href'));
												});
												++count;
												if (count == dataVidsArr.length){
													var newTab = {};
													newTab['url'] = hrefs[Math.floor((Math.random()*hrefs.length))];
													chrome.tabs.create(newTab);
													chrome.tabs.reload();
												}
											});
							        	});
									});
								});
							} else {
				        		var storageGetHref = channelNoSpace + '-' + showToPlay + '-showURL';
				        		console.log(storageGetHref);
								chrome.storage.sync.get(storageGetHref, function (showURL) {
									console.log(showURL[storageGetHref]);
				        			promiseDone = $.get(showURL[storageGetHref], function(data) {
							        	data = data.replace(/(\r\n|\n|\r)/gm,"");
							        	data = data.replace(/\>\s+\</g,'\>\<');
							        	data = data.replace(/\s{3,}/g,'');
							        	data = data.replace(/\\n/g,'');
							        	data = data.replace(/\\\"/g,'"');
						        		$(data).find(".episodeList a").each(function () {
						       		    	hrefs.push($(this).attr('href'));
						        		});
						        		console.log(hrefs);
						        		var newTab = {};
										newTab['url'] = hrefs[Math.floor((Math.random()*hrefs.length))];
										chrome.tabs.create(newTab);
									});
				        		});
							}
						});
					});
				});
				document.getElementById('remove' + key).addEventListener('click',function(){
					chrome.storage.sync.remove(key);
					$('#' + key).remove();
				});
			};
		};
	});

	document.getElementById('channels').addEventListener('click',function(){
		$('#newChannel').remove();
    	$('<input type="text" id="newChannel" maxlength="24" placeholder="Enter..." width="100">').insertAfter('#channels');
    	$('#newChannel').bind('keypress', function(e) {
			if(e.keyCode==13){
				var newChannelName = $(this).val()
		    	if (newChannelName!=null) {
		    		var nospace = newChannelName.replace(/ /g, '');
		    		var keyName = 'chan-' + nospace;
		    		var Obj = {};
		    		Obj[keyName]=newChannelName;
		    		Obj[nospace + '-shows']= null;
		    		chrome.storage.sync.set(Obj);
		    		$(".nc-channel-name").append("<div class='chan-names' id='"+keyName+"'><input type='button' class='playButton' id='play" + keyName + "'>" + newChannelName + "<input type='button' class='removeButton' value='x' id='remove" + nospace + "'></div>");
		    		document.getElementById('play' + keyName).addEventListener('click',function(){
		    			alert('Visit Netflix and add TV shows to play this channel.');
		    		})
		    		document.getElementById('remove' + nospace).addEventListener('click',function(){
						chrome.storage.sync.remove(keyName);
						$("#chan-" + nospace).remove();
					});
					$(this).remove();
		    	};
			}
		});
  	});
});	