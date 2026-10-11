import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
const root=resolve('web/product/giao-dien-web/music-app/source');
createServer((req,res)=>{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root)||!existsSync(file)){res.writeHead(404);res.end();return;}
  const body=readFileSync(file);
  const type={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.wav':'audio/wav'};
  res.setHeader('Content-Type',type[extname(file)]||'application/octet-stream');
  res.setHeader('Accept-Ranges','bytes');
  const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),body.length-1):body.length-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${body.length}`,'Content-Length':end-start+1});res.end(body.subarray(start,end+1));}
  else{res.setHeader('Content-Length',body.length);res.end(body);}
}).listen(5133,'127.0.0.1',()=>console.log('Music App candidate: http://127.0.0.1:5133'));
