const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const Keycloak = require("keycloak-connect");
const path = require("path");
const redis = require("redis");

const app = express();
app.use(bodyParser.json());

const RedisStore = require("connect-redis")(session);
const store = new RedisStore({ host: 'localhost', port: 6379, client: redis.createClient(), ttl: 86400 });

app.use(session({
    name: "web-app.session",
    secret: "mySecret",
    resave: false,
    store
}));

const keycloak = new Keycloak({
        store
    }, 
    {
        clientId: "web-app",
        publicClient: true,
        enabled: true,
        bearerOnly: false,
        serverUrl: "http://localhost:8080/auth",
        realm: "web-app",
        realmPublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrVrCuTtArbgaZzL1hvh0xtL5mc7o0NqPVnYXkLvgcwiC3BjLGw1tGEGoJaXDuSaRllobm53JBhjx33UNv+5z/UMG4kytBWxheNVKnL6GgqlNabMaFfPLPCF8kAgKnsi79NMo+n6KnSY8YeUmec/p2vjO2NjsSAVcWEQMVhJ31LwIDAQAB"
    }
);

app.use(keycloak.middleware({
    logout: "/logout",
    admin: "/"
}));

app.get("/", keycloak.protect(), (req, res) => {
    res.sendFile(path.join(__dirname + "../../../client/src/index.html"));
});

app.get("/protected", keycloak.protect(), (req, res) => {
    res.json({ message: "protected" })
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
	console.log(`Started on http://10.0.2.15:${app.get("port")}`);
})