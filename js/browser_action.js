$(function() {

	for(var i in localStorage){
		localKey = localStorage.key(i);
   		val = localStorage.getItem(i); 
   		value = "<div class='chan-names' id='" + localKey + "'>" + val + "<input type='button' class='removeButton' value='x' id='remove" + localKey + "'></div>";
		$(".nc-channel-name").append(value);
		document.getElementById('remove' + localKey).addEventListener('click',function(){
			localStorage.removeItem(i);
			$("#" + localKey).remove();
		});
	};

	document.getElementById('channels').addEventListener('click',function(){
    	newChannelName = prompt("Enter New Channel Name:", "");
    	if (newChannelName!=null) {
    		var nospace = newChannelName.replace(/ /g, '');
    		localStorage['chan-'+nospace] = newChannelName;
    		$(".nc-channel-name").append("<div class='chan-name' id='chan-" + nospace + "'>" + newChannelName + "<input type='button' class='removeButton' value='x' id='remove" + nospace + "'></div>");
    		
    		document.getElementById('remove' + nospace).addEventListener('click',function(){
				localStorage.removeItem("chan-"+nospace);
				$("#chan-" + nospace).remove();
			});
    	}
  	});
});