import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parse} from '../../../../../node_modules/dotenv/lib/main.js';
import pg from '../../../../../node_modules/pg/lib/index.js';
import {encode} from '../../../../../node_modules/next-auth/jwt.js';
const env=parse(readFileSync(resolve('web/.env')));const emails=env.ADMIN_EMAILS.split(',').map(x=>x.trim().toLowerCase());const client=new pg.Client({connectionString:env.DATABASE_URL_UNPOOLED||env.DATABASE_URL});await client.connect();
try{
 const user=(await client.query('SELECT id,email,name,"sessionVersion","suspendedAt" FROM "User" WHERE LOWER(email)=ANY($1::text[]) ORDER BY "createdAt" LIMIT 1',[emails])).rows[0];if(!user||user.suspendedAt)throw Error('Owner account unavailable');
 const owned=(await client.query('SELECT COUNT(*)::int AS n FROM "Purchase" WHERE "userId"=$1 AND ("templateId" IS NULL OR "templateId"=$2)',[user.id,'t19'])).rows[0].n;
 const salt='__Secure-authjs.session-token';const token=await encode({secret:env.AUTH_SECRET,salt,maxAge:120,token:{uid:user.id,sub:user.id,email:user.email,name:user.name,sessionVersion:user.sessionVersion}});
 const result=await fetch('https://forgezone.store/api/download?id=t19',{headers:{Cookie:`${salt}=${token}`}});
 const report={date:new Date().toISOString(),readonlyDatabase:true,ownerEntitlement:Boolean(owned),downloadStatus:result.status,expectedStatus:owned?200:403,realPaymentFlow:'NOT TESTED; no payment or purchase records created'};
 writeFileSync(resolve('web/product/giao-dien-web/velora/reviews/1.2.1/download-online.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(result.status!==report.expectedStatus)process.exitCode=1;
}finally{await client.end()}
