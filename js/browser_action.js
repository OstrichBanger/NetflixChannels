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
						console.log(hrefObj);
						var hrefs = [];
						for (var key in hrefObj){
   							var yesorno = result[key];
   							var test = (key.indexOf(channelNoSpace) == 0) && key.substring(key.length-12) == '-morethanone';
   							if (test && yesorno == 1) {
   								playLinks = playLinks.replace(/\[\"/g,'');
   								playLinks = playLinks.replace(/\"\]/g,'');
   								playLinks = playLinks.replace(/\"\,\"/g,',');
   								playLinks = playLinks.split(',');
   								for (var i in playLinks){
   									hrefs.push(playLinks[i]);
   								}
   							}
   						}
   						console.log(hrefs);
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
    		$(".nc-channel-name").append("<div class='chan-names' id='"+keyName+"'><input type='button' class='playButton' id='play" + keyName + "'>" + newChannelName + "<input type='button' class='removeButton' value='x' id='remove" + nospace + "'></div>");
    		document.getElementById('play' + keyName).addEventListener('click',function(){
    			alert('Visit Netflix and add TV shows to play this channel.');
    		})
    		document.getElementById('remove' + nospace).addEventListener('click',function(){
				chrome.storage.sync.remove(keyName);
				$("#chan-" + nospace).remove();
			});
    	};
  	});
});