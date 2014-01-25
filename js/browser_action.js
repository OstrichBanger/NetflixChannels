$(function() {

	chrome.storage.sync.get(null, function (result) {
		for(var key in result){
			if (key.substring(0,5) == 'chan-'){
   				var channelNoSpace = key.substring(5);
   				val = result[key]; 
   				value = "<div class='chan-names' id='" + key + "'><input type='button' class='playButton' id='play" + key + "'>" + val + "<input type='button' class='removeButton' value='x' id='remove" + key + "'></div>";
				$(".nc-channel-name").append(value);
				document.getElementById('play' + key).addEventListener('click',function(){
					chrome.storage.sync.get(null, function (hrefObj) {
						for (var key in hrefObj){
   							var playLinks = result[key];
   							var hrefs = {};
   							console.log(key.indexOf(channelNoSpace));
   							/*if (key.indexOf(channelNoSpace) == 0) {
   								playLinks = playLinks.split(',');
   								console.log(playLinks);
   								// hrefs.push()
   							}*/
   						}
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
    	newChannelName = prompt("Enter New Channel Name:", "");
    	if (newChannelName!=null) {
    		var nospace = newChannelName.replace(/ /g, '');
    		var keyName = 'chan-' + nospace;
    		var Obj = {};
    		Obj[keyName]=newChannelName;
    		chrome.storage.sync.set(Obj);
    		$(".nc-channel-name").append("<div class='chan-name' id='"+keyName+"'>" + newChannelName + "<input type='button' class='removeButton' value='x' id='remove" + nospace + "'></div>");
    		
    		document.getElementById('remove' + nospace).addEventListener('click',function(){
				chrome.storage.sync.remove(keyName);
				$("#chan-" + nospace).remove();
			});
    	};
  	});
});