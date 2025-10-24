const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const ENV_FILE_NAME = ".env";

function randomString(length) {
    return crypto.randomBytes(length).toString("hex");
}

function generateTemplate() {
    return `# auth MySQL env variables
AUTH_MYSQL_ROOT_PASSWORD: ${randomString(16)}
AUTH_MYSQL_USER: supertokens_user
AUTH_MYSQL_PASSWORD: ${randomString(16)}
AUTH_MYSQL_DATABASE: supertokens

# supertokens env variables
SUPERTOKENS_MYSQL_CONNECTION_URI: "mysql://supertokens_user:\${AUTH_MYSQL_PASSWORD}@mysql:3306/supertokens"
SUPERTOKENS_API_KEY: ${randomString(16)}

# backend env variables
BACKEND_ADMIN_EMAIL: admin@cryptiq.live
BACKEND_ADMIN_PASSWORD: ${randomString(16)}

# google sign in
GOOGLE_CLIENT_ID: {google-client-id-here}
GOOGLE_CLIENT_SECRET: {google-client-secret-here}

# postgres
POSTGRES_PASSWORD: ${randomString(16)}
POSTGRES_DB: cryptiq
POSTGRES_URL: "postgres://postgres:\${POSTGRES_PASSWORD}@db:5432/cryptiq"

# onesignal
ONESIGNAL_APP_ID: {opensignal-api-id-here}
ONESIGNAL_API_KEY: {opensignal-api-key-here}

# coindesk
COINDESK_API_KEY: {coindesk-api-key-here}

# twelvedata
TWELVEDATA_API_KEY_SPY: {twelvedata-api-key-1-here}
TWELVEDATA_API_KEY_XAU: {twelvedata-api-key-2-here}

# config
BACKEND_URL: http://localhost:3000
FRONTEND_URL: http://localhost:5000
`;
}

async function writeEnvFile() {
    const envPath = path.join(__dirname, ENV_FILE_NAME);

    try {
        await fs.access(envPath);
        console.log(`❌ ${ENV_FILE_NAME} already exists. Aborting.`);
        return;
    } catch {
        // File doesn't exist, proceed
    }

    const content = generateTemplate();
    await fs.writeFile(envPath, content);
    console.log(`✅ Created ${ENV_FILE_NAME} at ${envPath}`);
}

async function copyEnvFile() {
    const sourcePath = path.join(__dirname, ENV_FILE_NAME);
    const targets = [path.join(__dirname, "frontend", ENV_FILE_NAME), path.join(__dirname, "backend", ENV_FILE_NAME)];

    try {
        const content = await fs.readFile(sourcePath);
        for (const target of targets) {
            await fs.mkdir(path.dirname(target), {recursive: true});
            await fs.writeFile(target, content);
            console.log(`📄 Copied to ${target}`);
        }
    } catch (err) {
        console.error("❌ Error copying .env file:", err.message);
    }
}

(async () => {
    const command = process.argv[2];

    switch (command) {
        case "init":
            console.log("🛠 Initializing .env file...");
            await writeEnvFile();
            break;
        case "copy":
            console.log("📂 Copying .env to frontend/ and backend/...");
            await copyEnvFile();
            break;
        default:
            console.log("❓ Unknown command.");
            console.log("Usage:");
            console.log("  node env.js init    # Generate .env file");
            console.log("  node env.js copy    # Copy .env to frontend/ and backend/");
    }
})();
