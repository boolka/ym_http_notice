"use strict";

var xml = require("xml");

function xmlRes (action, opts, message, techMessage){

	var xmlObj = {
	};

	var attrs;

	switch(action){
		case "checkOrder": {
			xmlObj["checkOrderResponse"] = attrs = {
				_attr: opts
			};
			break;
		}
		case "paymentAviso": {
			xmlObj["paymentAvisoResponse"] = attrs = {
				_attr: opts
			};
			break;
		}
		default: {
			throw new TypeError("action is not valid");
			break;
		}
	}

	attrs._attr.code = parseInt(opts.code);

	if(message){
		attrs._attr.message = message;
	}
	if(techMessage){
		attrs._attr.techMessage = techMessage;
	}

	return xml(xmlObj, {declaration: {encoding: "UTF-8"}});
}

module.exports = xmlRes;