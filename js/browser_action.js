$(function() {

	for(var i in localStorage){
		localKey = localStorage.key(i);
   		val = localStorage.getItem(i); 
   		value = "<div class='" + localKey + "'>" + val + "<input type='button' value='remove' id='remove" + localKey + "'></div>";
		$(".nc-channel-name").append(value);
		document.getElementById('remove' + localKey).addEventListener('click',function(){
			localStorage.removeItem(i);
			$("." + localKey).remove();
		});
	};

	document.getElementById('channels').addEventListener('click',function(){
    	newChannelName = prompt("Enter New Channel Name:", "");
    	if (newChannelName!=null) {
    		var nospace = newChannelName.replace(/ /g, '');
    		localStorage[nospace] = newChannelName;
    		$(".nc-channel-name").append("<div>",newChannelName,"</div><br>");
    	}
  	});
});