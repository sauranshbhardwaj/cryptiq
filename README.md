Readme
=====================================================


Getting started
---------------
After cloning the repository

- run `docker compose up -d --build`
- the website should be live on localhost:5000 and the api on localhost:3000

NOTE: The docker is able to read the environment variables automatically from .env in UNIX style systems (Linux, Mac) but on Windows it is unable to do so, if running on windows, please manually copy the values of the environment variables over from .env to compose.yaml. For example:

MYSQL_CONNECTION_URI: ${SUPERTOKENS_MYSQL_CONNECTION_URI} changes to

MYSQL_CONNECTION_URI: "mysql://supertokens_user:8e61a18eb0bdb21277560f96f06b2b87@mysql:3306/supertokens"

Additionally we have a hosted version on [https://cryptiq.live](https://cryptiq.live) which works fine except that sometimes cloudflare drops the connections and hangs the entire app up. There is no available fix for the issue as of right now. (Source: [https://community.cloudflare.com/t/internal-tunnel-connections-keep-dropping/767607](https://community.cloudflare.com/t/internal-tunnel-connections-keep-dropping/767607) and [https://github.com/cloudflare/cloudflared/issues/1012](https://github.com/cloudflare/cloudflared/issues/1012))