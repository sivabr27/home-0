const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('file://'+__dirname+'/scenes4.html');
const env=await p.evaluate(()=>ENV);let hi=0,lo=0;for(let i=30;i<300;i++){if(env[i]>env[hi])hi=i;}lo=5;
for(const [n,f] of [['hi',hi],['lo',lo]]){await p.evaluate(t=>render(t,false),f/30);await p.screenshot({path:S+'/av_'+n+'.png',clip:{x:1590,y:760,width:320,height:320}})}
await b.close();console.log(hi)})();
