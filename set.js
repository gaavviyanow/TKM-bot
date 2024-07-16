const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUx1RGNvOUpVNlUwa1ZQcThPZEFEUVNzTWtkcXRqb2w2WXJQamtuUUhGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXBNWVBjSnlUZlpVOXhBOW1KZnhmdTV0S01VZFF3UXkzd3ZxUUVTeGl6OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQVJja3FsRnppd0ZlNVFEM2JFaWRONUMxWHpsV2ZibEFRQ3lTQ1d5MVVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqR2pMc3dXV3k5K1ZJZXdLUlhCekpENjNYdHdBb1NxbUVFRFRaRTNncXhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNJL3NLaE1jZS8yZ0xKTmE3THE0WWF0V3pSZEowbVNEbFdCOHhPeDNXbVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB3RHNRUGoxTThnV0lyOGJpb0RkMTZYblQxcDR6c1BxbjRCaGZEWlBUbFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0JGVUFMK1lQOUVPcDg2UERvZHhwaTM4TWU0ZVkvcXFCdTZiaXZ1WE9WRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJNalBHOEl6YjVlVTlnUk9RdCtsVG9PS1VCSzAxOXQ2aTJ4Tk51d1FtRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhidisxS2RPT3FaYitwN2lBbUpCbEdOV0VVbTVhZ3VGZTZXZ1dCUWtEZTVuODMwaGQyR2w1ZFlnWGZOa2ZLRkQxUW1DQ2lyUStrRFBDbnRLcUZReEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJPeVpwejVadDlGbUJZQWdSeVdYbk9pbGEzSmdCYTdyb2lRVTVEV2U5MHFJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1NTgzNTA1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3Q0QzODMzRUM5NDkyNTQ5MjBDMzUwN0JEQ0VEQTg3RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTYyMDM1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqM1h4MmJNalFoR09TUE1ZZTJfNFVRIiwicGhvbmVJZCI6IjZhNWY1Yzc3LTA1MzUtNDRkNC1iOTM1LWUyNmI1ZDNmNDQyNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpT2pjU2g2c1VUb3hhNXE5bjZ2ayt2VktpY3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVM4bzZLV0lKaFpJb09MSk9rMGpiazNpSnFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdaQkVEOUVGIiwibWUiOnsiaWQiOiIyNTQ3NTU4MzUwNTQ6MTVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05uSG5vUUVFS0t5MjdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhvWWhReWpKTTBuQTlRRUk5bXo4RldVbHlIOXB1TlR3WjNKVkZwNHRrRjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBYSXU5R2QyRVpIUy9kSVZmd1Y0TWw3T0YwdFdQTlo0eDZnSjl1cVB1YWZSRUhWWm5wM2FmR2NVQlRzVmFnbmRSWU11RmFjdmxLVXlCM2liOW1tUEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpOFRVUWVjL0RieU9CVnZFNXlpcU1UWDQ3QUErc0UycERMa0JOT2pvREJsQjV0UjcwQ1NFbVd3NGZEcnVvVnp4c2d4czlEOURFMjhJZFpWcndwRStDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1NTgzNTA1NDoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmS0dJVU1veVROSndQVUJDUFpzL0JWbEpjaC9hYmpVOEdkeVZSYWVMWkJmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTYyMDMxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUg1MiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
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
