const fs=require('node:fs');const path=require('node:path');const esbuild=require('../../../../../../_design/.tooling/node_modules/esbuild');
const source=path.resolve(__dirname,'../../source');const data=fs.readFileSync(path.join(__dirname,'products.json'),'utf8');
const script="/* Chronoform — self-contained showroom, filters and enquiry bag. */\n(() => {\n  'use strict';\n  const PRODUCTS = "+data+';\n'+fs.readFileSync(path.join(__dirname,'app-body.js'),'utf8');
fs.writeFileSync(path.join(source,'assets/js/main.js'),esbuild.transformSync(script,{loader:'js',minify:false,legalComments:'inline',target:'es2020'}).code);
const html=path.join(source,'index.html');fs.writeFileSync(html,fs.readFileSync(html,'utf8').replaceAll('<path fill=','<path data-strap fill='));
console.log('Assembled readable vanilla JS with the exact product data.');
