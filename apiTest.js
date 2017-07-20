var RTM = require("satori-rtm-sdk");

var endpoint = "wss://open-data.api.satori.com";
var appKey = "34F7F1Dc5e2B3d384DDABF2ab48CA04e";
var channel = "USGS-Earthquakes";

var client = new RTM(endpoint, appKey);

client.on('enter-connected', function () {
  console.log('Connected to Satori RTM!');
});

var subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE);

subscription.on('rtm/subscription/data', function (pdu) {
  pdu.body.messages.forEach(function (msg) {
    console.log('Got message:', msg);
  });
});

client.start();