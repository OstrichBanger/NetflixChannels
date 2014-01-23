$(function() {

	chrome.storage.sync.get(null, function (result) {
		for(var key in result){
			if (key.substring(0,5) == 'chan-'){
   				val = result[key]; 
   				value = "<div class='chan-names' id='" + key + "'>" + val + "<input type='button' class='removeButton' value='x' id='remove" + key + "'></div>";
				$(".nc-channel-name").append(value);
				document.getElementById('remove' + key).addEventListener('click',function(){
					chrome.storage.sync.remove(keyName);
					$("#" + key).remove();
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
    		$(".nc-channel-name").append("<div class='chan-name' id='chan-" + nospace + "'>" + newChannelName + "<input type='button' class='removeButton' value='x' id='remove" + nospace + "'></div>");
    		
    		document.getElementById('remove' + nospace).addEventListener('click',function(){
				chrome.storage.sync.remove(keyName);
				$("#chan-" + nospace).remove();
			});
    	};
  	});
});