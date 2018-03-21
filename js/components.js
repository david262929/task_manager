function validate_text(text) {
    var re = /^[a-zA-Z0-9\s\@\!\#\$\%\^\&\*\(\)\-\_\=\+\'\"\<\>\/']{3,}$/;
    return re.test(text);
}
function timeCalc(){
    d = parseInt(document.getElementById("days").value, 0),
    h = parseInt(document.getElementById("hours").value, 0),
    m = parseInt(document.getElementById("minutes").value, 0);
    return (d * 86400) + (h * 3600) + (m * 60);
}	
function id_generator(){
	return '_' + Math.random().toString(36).substr(2, 9) + '_';
}
function date_convert_to_normal (date) {
	var yyyy = date.getFullYear();
	var mm = date.getMonth() < 9 ? "/0" + (date.getMonth() + 1) +'/': (date.getMonth() + 1) +'/'; // getMonth() is zero-based
	var dd  = date.getDate() < 10 ? "/0" + date.getDate() : date.getDate();
	var hh = date.getHours() < 10 ? " 0" + date.getHours() :" " + date.getHours();
	var min = date.getMinutes() < 10 ? ":0" + date.getMinutes() :":" + date.getMinutes();
	var ss = date.getSeconds() < 10 ? ":0" + date.getSeconds() : ":" +date.getSeconds();
	return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
}
function format_date_y_m_d(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
