var assert 			= require("assert"),
	req_checksum 	= require("../lib/req_checksum.js"),
	xml_response 	= require("../lib/xml_response.js"),
	xmlParser		= require("xml-parser"),
	_ 				= require("underscore");

describe("ym_http_notice", function (){

	it("tests req_checksum function", function (){

		var body = {
			action: "checkOrder",
			orderSumAmount: "87.10",
			orderSumCurrencyPaycash: "643",
			orderSumBankPaycash: "1001",
			shopId: "13",
			invoiceId: "55",
			customerNumber: "8123294469"
		};

		assert.equal( "1B35ABE38AA54F2931B0C58646FD1321", req_checksum(body, "s<kY23653f,{9fcnshwq") );
	});

	it("tests xml_response function", function (){

		var xmlToCheck = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\
<checkOrderResponse performedDatetime=\"2011-05-04T16:38:01.000Z\"\
code=\"0\" invoiceId=\"1234567\"shopId=\"13\"/>";

		var res = xml_response("checkOrder", {
			code: 0,
			performedDatetime: new Date("2011-05-04T16:38:01.000Z").toISOString(),
			invoiceId: 1234567,
			shopId: 13
		});

		assert.ok( 
			_.isEqual(xmlParser(xmlToCheck), xmlParser(res)) 
		);

	});
});