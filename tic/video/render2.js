const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{const nosub=process.argv[2]==='nosub';const out=process.argv[3];const FPS=30;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/'+(process.env.FILM||'film.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
const SEG=JSON.parse(process.env.STRETCH||'[]');// [[a,b,factor]] film-time spans played slower
const DUR=120.4+SEG.reduce((s,[a,b,f])=>s+(b-a)*(f-1),0);
const tmap=T=>{let off=0;for(const [a,b,f] of SEG){const A=a+off;if(T<A)return T-off;const B=A+(b-a)*f;if(T<B)return a+(T-A)/f;off+=(b-a)*(f-1);}return T-off;};
const N=Math.round(DUR*FPS);console.log('duration',DUR);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
for(let i=0;i<N;i++){await p.evaluate(([t,ns])=>render(t,{nosub:ns}),[tmap(i/FPS),nosub]);const buf=await p.screenshot({type:'jpeg',quality:93});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%300===0)console.log(out,i,'/',N);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',out);})();
