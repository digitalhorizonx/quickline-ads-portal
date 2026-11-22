import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';
const validIds=new Set([...Array.from({length:10},(_,i)=>'c'+(i+1)),...Array.from({length:14},(_,i)=>'t'+(i+1))]);
const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8'};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
const equal=(a,b)=>{const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));return x.length>0&&x.length===y.length&&timingSafeEqual(x,y)};
export default async function handler(request){
 try{
  const store=getStore({name:'quickline-project-status',consistency:'strong'});
  if(request.method==='GET') return json(await store.get('milestones',{type:'json'})||{statuses:{},updatedAt:null});
  if(request.method!=='POST')return json({error:'Method not allowed'},405);
  const secret=Netlify.env.get('QUICKLINE_ADMIN_PASSWORD');
  if(!secret||!equal(request.headers.get('X-Admin-Password'),secret))return json({error:'Unauthorized'},401);
  const data=await request.json();
  if(data.action==='verify')return json({ok:true});
  if(!validIds.has(data.id)||typeof data.done!=='boolean')return json({error:'Invalid status'},400);
  const current=await store.get('milestones',{type:'json'})||{statuses:{}};
  const next={statuses:{...current.statuses,[data.id]:data.done},updatedAt:new Date().toISOString()};
  await store.setJSON('milestones',next);return json({ok:true,...next});
 }catch(error){console.error('Quickline status error',error);return json({error:'Service unavailable'},500)}
}
export const config={path:'/api/quickline-status'};
