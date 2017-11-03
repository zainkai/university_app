import * as mysql from 'mysql';
export const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'mysql.eecs.oregonstate.edu',
    user            : 'cs290_yourengrusername',
    password        : 'last-4-digits-of-your-osu-id',
    database        : 'cs290_yourengrusername'
  });