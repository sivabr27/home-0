const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/scenes.html');await p.evaluate(()=>document.fonts.ready);
const ts=process.argv.slice(2).map(Number);
for(const t of ts){await p.evaluate(t=>render(t,false),t);await p.screenshot({path:`/tmp/claude-0/-home-user-home-0/1b439f37-0a0e-5eb6-9ec0-183a677f9f12/scratchpad/s_${t}.jpg`,type:'jpeg',quality:70});}
await b.close();})();
