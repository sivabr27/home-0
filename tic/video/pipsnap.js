const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('file://'+__dirname+'/'+(process.env.SCENE||'scenes.html'));await p.evaluate(()=>document.fonts.ready);
await p.addStyleTag({content:'#pip{position:fixed;right:30px;bottom:30px;width:300px;height:169px;border:3px solid #fff;background:rgba(255,0,0,.35);z-index:99}'});await p.evaluate(()=>{const d=document.createElement('div');d.id='pip';document.body.appendChild(d)});
for(const t of (process.env.TS||"5,22,40,54,84,97,108,121").split(",").map(Number)){await p.evaluate(t=>render(t,false),t);await p.screenshot({path:S+'/pip_'+t+'.jpg',type:'jpeg',quality:50})}await b.close()})();
