'use strict';
const MODE_NAMES={identify:'博物馆鉴宝',memory:'记忆旅行',route:'城市连线',rhythm:'节拍投镖',bounce:'反弹挑战',budget:'限额旅行',hazard:'移动禁区',combo:'综合关'};
const MODE_ORDER=['identify','memory','route','rhythm','bounce','budget','hazard','combo'];
function challengeSpec(index){
 const tier=Math.floor(index/8),mode=MODE_ORDER[index%8];
 return {mode,tier,name:MODE_NAMES[mode],count:mode==='memory'?Math.min(5,3+Math.floor(tier/2)):mode==='route'?4:3,
  preview:Math.max(3200,6000-tier*400),beat:1000-tier*45,tolerance:Math.max(100,190-tier*15),
  combo: tier%2?'memory':'identify',rotation:(8+tier*1.5+(index%3))*Math.PI/180};
}
function renderChallenge(scene,now){
 const q=scene.challenge,panel=document.getElementById('challengePanel');if(!q||!panel)return;
 const byId=id=>document.getElementById(id),name=id=>CATALOG.find(c=>c.id===id).name,time=q.elapsed(scene,now),preview=q.previewing(scene,now);
 const key=[q.progress,q.errors,q.spent,q.combo,q.done,q.message,preview?Math.ceil((q.spec.preview-time)/1000):0,q.has('rhythm')?Math.floor(time/q.spec.beat):0,q.has('rhythm')&&q.beatInfo(time).good,scene.reading,scene.active].join('|');
 if(q.uiKey===key)return;q.uiKey=key;
 byId('challengeTitle').textContent=q.spec.name+(q.spec.mode==='combo'?' · '+(q.spec.combo==='identify'?'鉴宝 × 反弹':'记忆 × 禁区'):'');
 byId('challengeRule').textContent=q.rule;
 byId('challengeProgress').textContent=q.done?'✓ 挑战完成':`${q.progress} / ${q.goal} · 失误 ${q.errors} 次`;
 const image=byId('challengePhoto');image.hidden=!q.has('identify')||!!q.done;
 byId('challengePhotoButton').hidden=image.hidden;
 if(!image.hidden){const id=q.sequence[q.progress];if(image.dataset.id!==id){image.dataset.id=id;image.src=PHOTOS[id].src;}}
 let cue=q.message||'每次命中都会打开文化名片';
 if(q.has('memory')&&!q.done)cue=preview?`记忆 ${Math.ceil((q.spec.preview-time)/1000)} 秒：${q.sequence.map(name).join(' → ')}`:`提示已隐藏 · 下一张是第 ${q.progress+1} 张`;
 if(q.has('route'))cue=q.sequence.map((id,i)=>(i<q.progress?'✓ ':i===q.progress?'→ ':'')+name(id)).join(' — ');
 if(q.has('identify')&&!q.done)cue=`第 ${q.progress+1} 题：照片对应哪个图标？`;
 if(q.has('budget'))cue=`剩余 ${q.limit-q.spent} 点 · 已收集 ${q.categories.size} 类｜`+q.city.cardIds.map(id=>`${name(id)} ${q.costs[id]}点·${STORIES[id].category}`).join(' / ');
 if(q.has('rhythm')){const beat=q.beatInfo(time),n=Math.floor(time/q.spec.beat);cue=`${beat.good?'● 现在松手':'○ 等待下一拍'} · 连击 ${q.combo} / 3`;panel.classList.toggle('beat-on',beat.good&&!scene.reading);if(n!==q.lastBeat){q.lastBeat=n;if(scene.active&&!scene.reading)scene.callbacks.sound('hit');}}
 else panel.classList.remove('beat-on');
 byId('challengeCue').textContent=cue;
 byId('challengeCue').classList.toggle('budget-cue',q.has('budget'));
 if(preview){byId('padTitle').textContent='先记住目标顺序';byId('throwPad').setAttribute('aria-disabled','true');}
}
function drawChallengeBoard(scene,c,now){
 const q=scene.challenge,time=q.elapsed(scene,now);c.save();
 if(q.has('hazard')){const h=q.hazard(time);c.fillStyle='#c5314770';c.strokeStyle='#a31530';c.lineWidth=3;c.beginPath();c.moveTo(360,360);c.arc(360,360,310,h.angle-h.width,h.angle+h.width);c.closePath();c.fill();c.stroke();c.font='bold 18px sans-serif';c.fillStyle='#73112b';c.fillText('禁区',360+Math.cos(h.angle)*180-18,360+Math.sin(h.angle)*180);}
 if(q.has('bounce')){
  const box=q.obstacle;c.fillStyle='#3d4a56';c.fillRect(box.x,box.y,box.w,box.h);c.fillStyle='white';c.font='bold 17px sans-serif';c.fillText('挡板 · 请绕行',box.x+20,box.y+25);
  c.strokeStyle='#217ba1';c.lineWidth=9;c.beginPath();c.moveTo(36,60);c.lineTo(36,710);c.stroke();
  const end=scene.flight||scene.prediction(now),path=reflectedPath(end);c.strokeStyle=q.shot(scene,now,end).blocked?'#bb3344':'#217ba1';c.lineWidth=3;c.setLineDash([9,7]);c.beginPath();path.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();c.setLineDash([]);
 }
 if(q.has('route')){
  const points=q.sequence.map(id=>{const indices=DARTBOARD.topics.map((t,i)=>t===id?i:-1).filter(i=>i>=0),a=-Math.PI/2+(indices[0]+indices[indices.length-1])/2*Math.PI/10+scene.rotationAt(now);return{x:360+Math.cos(a)*222,y:360+Math.sin(a)*222};});
  c.lineWidth=4;c.strokeStyle='#17635dcc';c.setLineDash([7,5]);c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();c.setLineDash([]);
  points.forEach((p,i)=>{c.beginPath();c.arc(p.x,p.y-65,18,0,Math.PI*2);c.fillStyle=i<q.progress?'#238060':'#fff6d4';c.fill();c.fillStyle=i<q.progress?'white':'#243e35';c.font='bold 20px sans-serif';c.textAlign='center';c.fillText(i<q.progress?'✓':String(i+1),p.x,p.y-58);});
 }
 c.restore();
}
function segmentHitsBox(a,b,box){
 let lo=0,hi=1;
 for(const [v,d,min,max] of [[a.x,b.x-a.x,box.x,box.x+box.w],[a.y,b.y-a.y,box.y,box.y+box.h]]){
  if(Math.abs(d)<1e-8){if(v<min||v>max)return false;}else{let p=(min-v)/d,q=(max-v)/d;if(p>q)[p,q]=[q,p];lo=Math.max(lo,p);hi=Math.min(hi,q);if(lo>hi)return false;}
 }return true;
}
function reflectedPath(end){const start={x:396,y:750},wall=36,virtual={x:2*wall-start.x,y:start.y},t=(wall-virtual.x)/(end.x-virtual.x);return[start,{x:wall,y:virtual.y+(end.y-virtual.y)*t},end];}
class TravelChallenge{
 constructor(city,index){
  this.spec=challengeSpec(index);this.city=city;this.progress=0;this.errors=0;this.combo=0;this.maxCombo=0;this.spent=0;this.accepted=new Set();this.categories=new Set();this.message='';this.lastBeat=-1;
  const ids=city.cardIds,shift=(index*2)%ids.length;this.sequence=Array.from({length:this.spec.count},(_,i)=>ids[(shift+i*2)%ids.length]);
  if(this.has('identify')){const artifacts=ids.filter(id=>/文物|书画|藏品/.test(STORIES[id].category));this.sequence=[...artifacts,...ids.filter(id=>!artifacts.includes(id))].slice(0,3);}
  this.costs=Object.fromEntries(ids.map((id,i)=>[id,1+(i%3)]));
  this.limit=7;this.categoryGoal=3;this.obstacle={x:285,y:510,w:150,h:38};
 }
 has(type){return this.spec.mode===type||(this.spec.mode==='combo'&&(this.spec.combo===type||(this.spec.combo==='identify'?type==='bounce':type==='hazard')));}
 elapsed(scene,now){return Math.max(0,scene.rotationAt(now)/scene.rotationSpeed*1000);}
 previewing(scene,now){return this.has('memory')&&this.elapsed(scene,now)<this.spec.preview;}
 beatInfo(time){const phase=((time%this.spec.beat)+this.spec.beat)%this.spec.beat;return {phase:phase/this.spec.beat,good:Math.min(phase,this.spec.beat-phase)<=this.spec.tolerance};}
 hazard(time){return {angle:time/1000*(.42+this.spec.tier*.04),width:.42+this.spec.tier*.025};}
 blocked(end,time){if(!this.has('hazard'))return false;const h=this.hazard(time),a=Math.atan2(end.y-360,end.x-360),d=Math.atan2(Math.sin(a-h.angle),Math.cos(a-h.angle));return Math.hypot(end.x-360,end.y-360)<315&&Math.abs(d)<h.width;}
 shot(scene,now,end){const time=this.elapsed(scene,now),path=this.has('bounce')?reflectedPath(end):null;
  return {onBeat:this.beatInfo(time).good,blocked:this.blocked(end,time+CONFIG.flightMs)||(path&&path.slice(1).some((p,i)=>segmentHitsBox(path[i],p,this.obstacle))),path};
 }
 apply(id,shot){
  if(this.done)return '挑战已完成 · 继续收集名片';
  if(shot.blocked){this.errors++;this.combo=0;return this.message='碰到障碍，本镖不计任务';}
  if(!id){this.errors++;this.combo=0;return this.message='脱靶，调整下一镖';}
  if(this.has('rhythm')){if(!shot.onBeat){this.errors++;this.combo=0;return this.message='未踩中节拍 · 连击归零';}this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);this.progress=this.maxCombo;this.done=this.progress>=3;}
  else if(this.has('budget')){const cost=this.costs[id];if(this.accepted.has(id))return this.message='重复地点，不扣行程点';if(this.spent+cost>this.limit){this.errors++;return this.message='行程点不足，换个地点';}this.spent+=cost;this.accepted.add(id);this.categories.add(STORIES[id].category);this.progress=this.categories.size;this.done=this.progress>=this.categoryGoal;}
  else if(this.has('identify')||this.has('memory')||this.has('route')){if(id!==this.sequence[this.progress]){this.errors++;return this.message='顺序不符，当前目标不变';}this.accepted.add(id);this.progress++;this.done=this.progress===this.sequence.length;}
  else{this.accepted.add(id);this.progress=this.accepted.size;this.done=this.progress>=3;}
  return this.message=this.done?'挑战完成！剩余飞镖可继续集卡':`任务推进 · ${this.progress} / ${this.goal}`;
 }
 get goal(){return this.has('memory')||this.has('route')||this.has('identify')?this.sequence.length:3;}
 get rule(){if(this.spec.mode==='combo')return this.spec.combo==='identify'?'看照片按序认出 3 张名片，并反弹绕过挡板。':'记住 3 张名片的顺序，避开旋转禁区。';return {identify:'看真实照片，在盘上认出对应名片。连续完成 3 题。',memory:`记住 ${this.sequence.length} 张名片顺序，提示隐藏后按序命中。错镖不重置。`,route:'沿标出的路线，按顺序连接 4 个地点。',rhythm:'闪光时松手并命中，连续 3 镖过关。声音可关闭。',bounce:'滑动选择落点，虚线经左侧墙反弹。绕过挡板，命中 3 种名片。',budget:'用 7 点行程费，收集 3 个不同类别。重复地点不扣费。',hazard:'避开红色移动禁区，命中 3 种名片。按抵达时的位置判定。'}[this.spec.mode];}
}
