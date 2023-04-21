import KhaltiCheckout from "khalti-checkout-web";

let config = {
    // replace this key with yours
    "publicKey": "test_public_key_9df6a476434945f4a118424a7bead0e2",
    "productIdentity": "64422c1cb17c9dd1eff81536",
    "productName": "check22",
    "productUrl": "http://localhost:3000/rooms/64422c1cb17c9dd1eff81536",
    "eventHandler": {
        onSuccess (payload:any) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error:any) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};


export let checkout = new KhaltiCheckout(config);