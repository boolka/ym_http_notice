"use strict";

var reqChecksum 	= require("./lib/req_checksum.js"),
	xmlRes			= require("./lib/xml_response.js");

/**
* @arg {string} secret - the secret word specified during registration
* @arg {function} checkOrderCb - invoked when comes the checkOrder request
* 	arguments:
* 		err - if error occurred
* 		isGranted - tells if the permission is granted
* 		message - the error reason
* 		techMessage - additional information on error
*
* @arg {function} paymentAvisoCb - invoked when comes the paymentAvisoCb request
*	arguments:
* 		err - if error occurred
*
* @returns {function} express/connect-style middleware
*
*/

module.exports = function (secret, checkOrderCb, paymentAvisoCb){

	return function (req, res, next){

		var performedDatetime = new Date().toISOString();

		if( !("body" in req) || req.body.toString().slice(1,7) !== "object" ){

			throw new TypeError("req.body type mismatch");
		}

		res.type("application/xml");

		try {

			var md5 			= req.body.md5,
				shopId 			= req.body.shopId,
				invoiceId 		= req.body.invoiceId,
				orderSumAmount	= req.body.orderSumAmount;

			if( reqChecksum(req.body, secret) !== md5 ){

				throw new Error("md5 mismatch");
			}

			switch(req.body.action){

				case "checkOrder": {

					checkOrderCb(req.body, function (err, isGranted, message, techMessage){
						if(err) throw err;

						if(isGranted){

							res.send(xmlRes(req.body.action, {
								performedDatetime: performedDatetime,
								code: 0,
								shopId: shopId,
								invoiceId: invoiceId,
								orderSumAmount: orderSumAmount
							}));
						}
						else {

							res.send(xmlRes(req.body.action, {
								performedDatetime: performedDatetime,
								code: 100,
								shopId: shopId,
								invoiceId: invoiceId
							}, message, techMessage));
						}
					});

					break;
				}

				case "paymentAviso": {

					paymentAvisoCb(req.body, function (err){
						if(err) throw err;

						res.send(xmlRes(req.body.action, {
							performedDatetime: performedDatetime,
							code: 0,
							shopId: shopId,
							invoiceId: invoiceId
						}));
					});

					break;
				}
				default: {

					throw new Error();
					break;
				}
			}
			
		}
		catch(err){

			if(err.message === "md5 mismatch"){

				res.send(xmlRes(req.body.action, {
					performedDatetime: performedDatetime,
					code: 1,
					shopId: shopId,
					invoiceId: invoiceId
				}));
			}
			else {

				res.send(xmlRes(req.body.action, {
					performedDatetime: performedDatetime,
					code: 200,
					shopId: shopId,
					invoiceId: invoiceId
				}));
			}
		}

	}
};
