const SteamUser = require('steam-user');
const fs = require('fs');
const blacklist = require("./blacklist.json");
const collectCredentials = require('./collect_credentials');

let client = new SteamUser();

collectCredentials().then((credentials) => {
    client.logOn({
        accountName: credentials.accountName,
        password: credentials.password
    });
});


client.on('loggedOn', function (details) {
    console.log('Logged into Steam as ' + client.steamID.getSteam3RenderedID());
    blacklist.map((steam_id, i) => {
        client.blockUser(steam_id);
        console.clear();
        console.log(
            `[Blacklist] ${steam_id} ${i + 1}/${blacklist.length}`
        );
    });
    client.logOff();
});

client.on('error', function (e) {
    console.log(e);
});