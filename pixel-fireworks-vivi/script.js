
const c=document.getElementById('c'),x=c.getContext('2d');
function rs(){c.width=innerWidth;c.height=innerHeight}onresize=rs;rs();
const parts=[];let mode=0,t0=performance.now();
function fire(){parts.push({x:Math.random()*c.width,y:c.height,vx:0,vy:-6-Math.random()*2,col:`hsl(${Math.random()*360} 100% 60%)`,life:60,rocket:true})}
setInterval(fire,600);
function textPoints(){
 const oc=document.createElement('canvas'),o=oc.getContext('2d');oc.width=500;oc.height=220;
 o.fillStyle='#fff';o.font='bold 120px sans-serif';o.textAlign='center';o.fillText('薇薇',250,140);
 const d=o.getImageData(0,0,500,220).data,p=[];
 for(let y=0;y<220;y+=6)for(let xx=0;xx<500;xx+=6){if(d[(y*500+xx)*4+3]>0)p.push({x:c.width/2-250+xx,y:c.height/2-110+y});}
 return p;
}
const target=textPoints();
function boom(r){
 for(let i=0;i<80;i++){const a=Math.random()*6.28,s=1+Math.random()*4;
 parts.push({x:r.x,y:r.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,col:r.col,life:80});
 }}
function loop(ts){
 requestAnimationFrame(loop);
 x.fillStyle='rgba(2,8,23,.25)';x.fillRect(0,0,c.width,c.height);
 if(ts-t0>8000)mode=1;
 parts.forEach((p,i)=>{
   if(p.rocket){
     p.y+=p.vy;
     if(--p.life<0){p.rocket=false;boom(p);parts.splice(i,1);}
   }else{
     if(mode&&target[i%target.length]){
       const tg=target[i%target.length];
       p.vx+=(tg.x-p.x)*0.002;p.vy+=(tg.y-p.y)*0.002;
     }else p.vy+=0.03;
     p.x+=p.vx;p.y+=p.vy; if(--p.life<0)parts.splice(i,1);
     x.fillStyle=p.col;x.fillRect(p.x,p.y,4,4);
   }
 });
 if(mode){
   x.fillStyle='rgba(255,255,255,.08)';
   x.font='bold 120px sans-serif';x.textAlign='center';
   x.fillText('薇薇',c.width/2,c.height/2+40);
 }
}
requestAnimationFrame(loop);
