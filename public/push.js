var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BJTYNF3cqlRRU9ZCVU2tV5HCedZDbMPXJil2ppA9ZRVng-pg-pOdLTPF8r-DXD9rRELZ5UcbmXRnQUh_zlQtCTY",
    "privateKey": "EjjnQHmAtbfe0ZHWHfcUD9YPeY2xD1Q_uLENhzLjKAE"
};
webPush.setVapidDetails(
    'mailto:kaisaryusuf@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dHJqH8AzNm4:APA91bE6OjQnglxIyeYvp1uOfBD-BFV1EbM94BuqjEpDd0iY0RVYA55-soo8M829wV2HVdT-4Rv1mgGd2jSgbwaPFuCHIkWIhal0Yz6HlOdRlQH4sS189rZFZIlI6RnthSsAX5fLxUtE",
    "keys": {
        "p256dh": "BGpojBR6vLHrz90b9QUx7O3NsNgLCCKtR0krP0ftPFYckz2mD2f8dXIMi19xkt9YGvKQayxgnJx+hKufJ+btPjY=",
        "auth": "Iwj7ZcYhiF+w07JUN1PF9Q=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '727370263343',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);