"use strict";

var crypto = require("crypto");

var checkFields = [
	"action","orderSumAmount","orderSumCurrencyPaycash","orderSumBankPaycash","shopId","invoiceId","customerNumber"
];

function req_checksum (opts, secret){

	if(typeof(secret) !== "string"){
		throw new TypeError("secret must be a string");
	}
	
	try{
		
		var md5Hash = crypto.createHash("md5"),
			raw = "";

		for(var i = 0; i < checkFields.length; ++i){

			raw += opts[checkFields[i]];
			raw += ';';
		}
		raw += secret;

		md5Hash.update(raw, "utf-8");
		return md5Hash.digest("hex").toUpperCase();
	}
	catch(err){
		
		return false;
	}
}

module.exports = req_checksum;
