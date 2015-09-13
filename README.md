# Yandex money transfer system by http protocol
docs: https://money.yandex.ru/doc.xml?id=527069

### Installation

```sh
$ npm i ym_http_notice
```
### Example

    var ym_http_notice = require("./ym_http_notice");

	app.post("/payment",
		ym_http_notice(global.secret, checkOrder, paymentAviso)
	);

	function checkOrder (body, recall){
        // body contains all parsed fields from request(e.g. shopId, customerNumber, etc)
        // do some stuff with body and then
        recall(null, false);
        // or recall(err); if error (with or without message and techMessage)
	}

	function paymentAviso (body, recall){
        // The same
		recall(null, true);
	}

License
----

MIT
