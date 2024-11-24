const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVBZMHZRREo1anE2UExXZUJRUjhWTm9wRDhYRnd1d0cybGJWQi96WVJtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDNnNDJlOWdJRDdMWXZMNTJlY1VJbDJ5a0cxVUhHVzdaS0FpanVScU9Ycz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RHJ6Sm45YWFZQWVGVXN1UjdXa1h0dlhlalUrdENRM0NvY21POTJxL25rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTTd1dUkrTUxPcFVwT0ZSOTFscnc2V3JHTnU3RFArdHVoR0QvclZvUjJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFNYnZWY2JoOTJ6aEZFMzg2Um1WTE9BdkpHczZFaHp4K3ZYOXJhVkRIVTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GUE9FYmRjN3NRQW5xYzNQS1BjeXJ4QVZGek0xWDQwVkdqcjZaSWUvMTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUcwU3lDQklRNWxhKzdhajlMV0FxUkVzTGFLRVQ1VnpiQnhTcmw2QWtIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGRVZ2ZZclJUU3hYekI3Ni8xeXAraEVzVldRa3RSUXU2Wllxbys3dEhSQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndINlovY2N6U2RqSGFJOGowcXF2UTVlYm1YRFNYMnZuM1ZzQUFXWGFtQUF4ZWxzZFZtOWpVekxEY0lWcGUwQzNJNmdCcXBkbGhQODNma0psK1lKdWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE2LCJhZHZTZWNyZXRLZXkiOiJ0T3ZaVzZxSW5VQ3ZKVnpnWjIxMDg4VGRKQ213eFA1bGlDWU1VS1JwNkJZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzQxMDI2MzcxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZGQUREOEY2QkQ3QjEzNTc3OTNEQkEwRjY3RDRBNDgwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzI0MzcxMjB9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzQxMDI2MzcxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQwQ0NFN0YzQTc4M0VDNEZEQUU1OUZENzlFOTQ4RDJDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzI0MzcxMjV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJ3eWRzNlRhUzR5bVhNMHJieDdVWlEiLCJwaG9uZUlkIjoiZGUxZjE2MjctYmFjOC00ZGRjLWE0ZmQtNWY4YTE0NDEyMWE4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldyMnhPV3VpdzNNZkZNRUdPQ053UmZWaks5dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqRkVyVTVQM1lVdTM2ZzkrTmtTL09ldDBuSHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFJaRVFLWUUiLCJtZSI6eyJpZCI6Ijk0NzQxMDI2MzcxOjYwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKNmlpSUFERU96SWk3b0dHQmdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiWUsyd3lZMFBMbWkveWxmZk5CRWEzd05XdmhhSGY1WVFFOHFOMmlMMWg4PSIsImFjY291bnRTaWduYXR1cmUiOiJuZXJZVG90RWhpZDdzNWRBRVVHR0ZnVjlOZ052eVVjZ3F0VHhQVmFudVFDTllaY1YvbHV4UlpLVEZMdmtaUGZRdWo1ZldjdnBBN1dHK0prb0QvbHVBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoib2xQV052SnFHa1VxVTFTQVRsK0NBZkdSRUMyY0ZLaVVWY2E1QkVFb1RBS0ZDMFEyYkI2eHU0SXVtdm0ybWFOaWFTaFIwNkRHWU1WSk45L2l6TGNYaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc0MTAyNjM3MTo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXMkN0c01tTkR5NW92OHBYM3pRUkd0OERWcjRXaDMrV0VCUEtqZG9pOVlmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNDM3MTE1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV6ayJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94741026371",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
