# node-server-side-auth
keycloak-connect based node pure server side auth example to 
demonstrate basic auth flow

Supports login/logout and invalidating session via Keycloak console

### run instructions

1. Start Keycloak server
    docker run -p 8080:8080 -e KEYCLOAK_USER=ADMIN -e KEYCLOAK_PASSWORD=ADMIN jboss/keycloak

2. Import realm.json

3. Start server
    npm run start

4. Open browser
    http://10.0.2.15

NOTE:
    Because Keycloak needs to be able to call admin URL localhost doesn't work inside
    Docker and thus ip address 10.0.2.15 must be used



