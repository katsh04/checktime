exports.handler = function(context, event, callback) {
  let moment = require('moment-timezone');
	let timezone = event.timezone || 'Asia/Tokyo';
	console.log("+ timezone: " + timezone);
	
    // 日本祝日判定用のモジュール
    // https://github.com/holiday-jp/holiday_jp-js/blob/master/release/holiday_jp.js
    let holiday_jp = require('@holiday-jp/holiday_jp');
    let todays_date = new Date();
    let is_holiday = false;
	let holidays = holiday_jp.between(todays_date, todays_date);
	console.log(holidays);
	// 祝日判定
	if(holidays.length === 0){
	    is_holiday = false;
	}else{
	    is_holiday = true;
  }
	
    const hour = moment().tz(timezone).format('Hmm');
    const dayOfWeek = moment().tz(timezone).format('d');
    if ((hour >= 900 && hour < 1730) && (dayOfWeek >= 1 && dayOfWeek <= 5) && !is_holiday) {
        // “open” from 9am to 17:30.
        response = "open";
    } else {
        response = "close";
    }
    theResponse = response + " : " + hour + " " + dayOfWeek + " " + is_holiday;
    console.log("+ Time request: " + theResponse);
    callback(null, response);
};
