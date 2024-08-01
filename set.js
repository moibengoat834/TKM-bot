const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1OdUNQY3dTNVdmVWFHak8zQWpYdWgzOTAwcWhycHhoc3VEL0M5RkVWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2VDZ3NFdWlDaXM0YVRRRG9MNGtJdmxhMjViWnQvbjBZRjNjc1BpbURoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjT3ZpSFBrdDRqeG1maVBnTVpvVVMrRUpOS1dOTHJjVU9IR096V09OTTA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYUERLZ3JrN1dHdlFucUlSNUNYMnEvMFU3emlUdFZaMGNaSWJLaEk2TUg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlHM1VaV3Zwa1RhT3RERngyL2pMenFVNVQ3aXdUbUErU2UzaE1abll6VVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis1QXRFSEs3dlpxRzJuRDc2M2lYME5uaDgxYmdxdVhXT1FPS1NJaWUzUW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdHd1dkT2pHOWVwZmM4OHljdU9yakVjdHkwTFFhZWdyR2pGU2Q0V3htUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZG53aU1GWmZ6dG4rVzFGblR6WlRRRzVicy9ua3NPeGlmWEhMVFhrUVpWUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko2ZTByMi9GUlYrczBtOE55Vm52RXhvTU5jbGVVWGlBV0owbWVzcHp5MnFLWmNYVUQ3enlKM3dhcUtsN2hBWmRWalpqbnhLVzdZZmhRNmJhSHl1VUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6InRIY1JtUVl6SXhoVU1yTXd6M1NzSVhwRTM5ZmJqckZ1Y01TZ0dTRVlIamM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlQ4M052SmlhUl9PaXhkWkZRQ3RqUFEiLCJwaG9uZUlkIjoiODYzMDQwMmMtOTI3Yy00NTI2LWJmNjktMTk1NTExNTk4ZDdhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkIwdUEycm4zNW0wTFVGTTFlcTczWG5UeUtwaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtb0ZpalgrbC9GRjdDa2FUYklvbDVybTk1akE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUUoyRkdGU1AiLCJtZSI6eyJpZCI6IjI1NDcyNDI2NTQ0NDo4NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGFTdGVnSEVPdUxyclVHR0NjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZTlvck8wV2xHRFBZZ25FZjJJeHRKRUR6V1d3VjhWUkkvV2tpclQyOU5pQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTWpQUHA3N1RvWFZLOG8zRjRDSURmVFFQTW5nZXlic00yOUx3V2JHUlJwWU1uSk4xMGp0QSs2Sm1iQmlqaVNKMzJSaTI1Ti92L080RVN0K3Bjd01kQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IlgyUnA1SDFHbVJCQVd5STJNcnZIRjhWZ3gwZjZvU2tXTFdydEZZTWdWdnIraGd1bDNQc0tLclN1SmRMRHZ6cjE2Zjl6K1Y1aEE4bHFBZlErSTAwYUR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzI0MjY1NDQ0Ojg1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh2YUt6dEZwUmd6MklKeEg5aU1iU1JBODFsc0ZmRlVTUDFwSXEwOXZUWWcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI1MTY5ODN9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Kevoh",
    NUMERO_OWNER : process.env.OWNER_NUM || "254724265444",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
