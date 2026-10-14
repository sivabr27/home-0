const {chromium}=require('playwright');const S=process.argv[2];const TS=process.argv[3].split(',').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
await p.goto('file://'+__dirname+'/scenes5.html');for(const t of TS){await p.evaluate(t=>render(t),t);await p.screenshot({path:`${S}/q_${t}.jpg`,type:'jpeg',quality:55})}await b.close()})();
