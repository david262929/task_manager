/*
    Created by David Ghazaryan (in github as 'david262929') 
*/
// loading page
function loading(){
	function onReady(callback) {
	    var intervalID = window.setInterval(checkReady, 500);
	    function checkReady() {
			if (document.getElementsByTagName('body')[0] !== undefined) {
			    window.clearInterval(intervalID);
			    callback.call(this);
			}
	    }
	}
	function show(id, value) {
	    document.getElementById(id).style.display = value ? 'block' : 'none';
	}
	onReady(function () {
	    show('page', true);
	    show('loading', false);
	});
}
// loading page end
// custom loading for proccesses
function sendind_request_loading(flag){
	// flag = true kbace ejt
	// flag = false ej@ kpage gif-ov 
	function show(id, value) {
	    document.getElementById(id).style.display = value ? 'block' : 'none';
	}
    show('page', flag);
    show('loading', !flag);
}
// custom loading for proccesses end
/*
    Created by David Ghazaryan (in github as 'david262929') 
*/

















