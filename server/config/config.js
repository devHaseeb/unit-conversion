require('dotenv').config();
const config = {
    env: process.env.node_env,
    url: process.env.server_url,
    port: process.env.server_port ?? 3000
};
module.exports = config;