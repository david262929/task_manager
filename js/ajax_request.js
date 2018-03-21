//send AJAX with native javascript
function sendRequest (method,url,params='',callback) {
		var xhr = new XMLHttpRequest();
		var get = method=='GET'? '?'+params : '';
		xhr.open(method,url+get,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onload= function  () {
			callback(JSON.parse(this.responseText));
		}

		var post = method=='POST'? params : '';
		xhr.send(post);
}
//send AJAX with JQUERY
function sendRequestJquery (method,url,data={},callback) {
	$.ajax({
			type: method,
	    url: url, 
	    data: data,                             
	    dataType : "json",                     
	    success: function (data, textStatus) {
	        callback(data);
	    } 
	})
}