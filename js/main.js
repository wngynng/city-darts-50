'use strict';
const $=id=>document.getElementById(id);
let toastTimer,saveAvailable=true;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600);}
function readSave(){
 let raw,legacy=false;
 try{const current=localStorage.getItem(CONFIG.saveKey);legacy=!current;raw=JSON.parse(current||'{}');}catch{raw={};}
 if(!raw||typeof raw!=='object')raw={};
 const clean=value=>({bestScore:Number.isFinite(value?.bestScore)?Math.max(0,value.bestScore):0,bestStars:Number.isFinite(value?.bestStars)?clamp(Math.floor(value.bestStars),0,3):0,visits:Number.isFinite(value?.visits)?Math.max(0,value.visits):0});
 const cities={};for(const city of CITIES)cities[city.id]=clean(raw.cities?.[city.id]||{});
 return {version:1,cards:Array.isArray(raw.cards)?[...new Set(raw.cards.filter(id=>CATALOG.some(t=>t.id===id)))]:[],cities,lastCity:CITIES.some(c=>c.id===raw.lastCity)?raw.lastCity:CITIES[0].id,muted:raw.muted===true};
}

const save=readSave();
CITY=CITIES.find(city=>city.id===save.lastCity);
const progress=()=>save.cities[CITY.id];
const collectedCount=()=>cityCatalog().filter(card=>save.cards.includes(card.id)).length;
function persist(){try{localStorage.setItem(CONFIG.saveKey,JSON.stringify(save));}catch{if(saveAvailable)toast('浏览器未允许保存，收藏暂时保留在本次页面中');saveAvailable=false;}}
const sound={ctx:null,play(kind){if(save.muted)return;try{if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});const c=this.ctx,o=c.createOscillator(),g=c.createGain(),t=c.currentTime;const pair={charge:[220,240],throw:[450,95],hit:[370,160],bull:[660,1100],miss:[120,60],win:[520,1040]}[kind]||[300,100];o.type=kind==='throw'?'triangle':'sine';o.frequency.setValueAtTime(pair[0],t);o.frequency.exponentialRampToValueAtTime(pair[1],t+.15);g.gain.setValueAtTime(.075,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.22);}catch{/* Audio is optional. */}}};
let currentScreen='home',chargeOwner=null;
let gesture=null;
let storyInRound=false;
function visibleRoute(){
 const query=$('citySearch').value.trim().toLowerCase();
 if(query)return CITIES.filter(city=>[city.name,city.en,city.region,city.theme].join(' ').toLowerCase().includes(query));
 return CITIES;
}
function routeButtons(cities=visibleRoute()){return cities.map(city=>{const i=CITIES.indexOf(city);return `<button data-city="${city.id}" class="city-choice ${CITY.id===city.id?'selected':''}" aria-pressed="${CITY.id===city.id}"><span class="stop-number">${String(i+1).padStart(2,'0')}</span><span><b>${city.name}</b><small>${challengeSpec(i).name} · ${city.cardIds.filter(id=>save.cards.includes(id)).length} / 9 张</small></span><span class="route-stars">${'★'.repeat(save.cities[city.id].bestStars)}${'☆'.repeat(3-save.cities[city.id].bestStars)}</span></button>`;}).join('');}
function updateHome(){
 const i=CITIES.indexOf(CITY),stats=progress();
 $('homeCityName').textContent=CITY.name+'。';$('homeIntro').textContent=CITY.intro;
 $('cityPostmark').innerHTML=`中国 · ${CITY.name}<small>${CITY.en}</small><b>${String(i+1).padStart(2,'0')}</b>`;
 $('cityChoices').innerHTML=routeButtons()||'<p class=empty-route>没有找到这座城市，试试城市名或省份。</p>';$('routeSummary').textContent=`已打卡 ${Object.values(save.cities).filter(city=>city.bestStars>0).length} / 50 城`; $('homeRegion').textContent=`${CITY.region} / ${CITY.en}`;
 $('homeTheme').textContent=CITY.theme;$('cityCardTitle').textContent=CITY.name+'来信';$('cityArt').innerHTML=cityArt();
 $('startBtn').textContent=`启程，去${CITY.name} ↗`;
 const challenge=new TravelChallenge(CITY,i);$('requiredIntro').textContent=challenge.spec.name+'：'+challenge.rule;
 $('bestLine').textContent=`本城 ${collectedCount()} / 9 张 · 最佳 ${stats.bestScore} 分 · ${'★'.repeat(stats.bestStars)}${'☆'.repeat(3-stats.bestStars)} · 全国累计 ${save.cards.length} / 450 张`;
}
function syncCityUI(){
 const i=CITIES.indexOf(CITY);
 $('playStop').textContent=`STOP ${String(i+1).padStart(2,'0')} / ${CITY.en}`;$('playTitle').textContent=`${CITY.name} · ${CITY.theme}`;
 $('topicLegend').innerHTML=cityCatalog().map(t=>`<span>${t.name} <small>${DARTBOARD.numbers.filter((n,i)=>DARTBOARD.topics[i]===t.id).join(' / ')}${t.id===DARTBOARD.bullTopic?' · 牛眼':''}</small></span>`).join('');
 $('resultCityLabel').textContent=`POSTCARD FROM ${CITY.en}`;$('storyCityLabel').textContent=`${CITY.en} / 城市故事`;
 document.body.dataset.city=CITY.id;
 for(const [name,value] of Object.entries(CITY_PALETTES[CITY.id]))document.documentElement.style.setProperty('--'+name,value);
}
function selectCity(id){
 const city=CITIES.find(c=>c.id===id);if(!city)return;
 if(scene.active)scene.stop();CITY=city;$('citySearch').value='';save.lastCity=id;persist();syncCityUI();updateHome();
 if(currentScreen==='book')renderBook();
}

function show(screen){cancelGesture();scene.stop();if($('challengeZoom').open)$('challengeZoom').close();storyInRound=false;if($('photoViewer').open)$('photoViewer').close();if($('targetCard').open)$('targetCard').close();document.body.classList.toggle('playing',screen==='play');if($('result').open)$('result').close();currentScreen=screen;for(const name of ['home','play','book'])$(name).hidden=name!==screen;if(screen==='home')updateHome();if(screen==='book')renderBook();window.scrollTo(0,0);}
function updateScene(s){
 $('dartsText').textContent=s.remaining;$('scoreText').textContent=s.score;
 $('tasks').innerHTML=(s.challenge?[]:CITY.required).map(id=>{const t=CATALOG.find(t=>t.id===id),done=s.collected.has(id);return `<div class="task ${done?'done':''}">${done?'✓':'○'} ${t.name}</div>`;}).join('');
 $('throwPad').setAttribute('aria-disabled',String(s.reading||!!s.flight||s.remaining===0||!s.active));
 renderGesture(s);
}
let lastGestureView='';
function renderGesture(s,now=performance.now()){
 renderChallenge(s,now);
 const forecast=s.prediction(now),arrival=s.flight?s.flight.impactRotation:s.rotationAt(now+CONFIG.flightMs),hit=scoreRotatedImpact(forecast.x,forecast.y,arrival),degrees=forecast.wind.angle*180/Math.PI,speed=forecast.wind.speed.toFixed(1),timing=forecast.timing;
 $('timingNeedle').style.left=`${timing.progress*100}%`;
 const direction=['右','右下','下','左下','左','左上','上','右上'][((Math.round(forecast.wind.angle/(Math.PI/4))%8)+8)%8];
 const view=[s.challenge?.previewing(s,now),CITY.id,hit.target?.id,s.reading,!!s.flight,s.charging,!!gesture?.cancel,timing.stage,Math.floor(timing.held/100),Math.round(forecast.radius),Math.round(degrees),speed].join('|');
 if(view===lastGestureView)return;lastGestureView=view;
 $('aimReadout').textContent=hit.target?`预计：${hit.target.name}附近 · 圈内随机落点`:'预计范围接近盘外 · 注意脱靶';
 $('windArrow').style.transform=`rotate(${Math.round(degrees)}deg)`;
 $('windText').textContent=`吹向${direction} · ${speed} m/s`;
 $('rotationReadout').textContent=`${s.rotationSpeed>=0?'↻ 顺时针':'↺ 逆时针'} ${(Math.abs(s.rotationSpeed)*180/Math.PI).toFixed(1)}°/秒`;
 const stage=s.flight?'flying':s.reading?'reading':timing.stage;
 const timingLabel={idle:'按住后，在绿区松手',settling:'蓄稳中',best:'最佳出手窗口',late:'窗口已过',fatigue:'疲劳扩散',flying:'已出手',reading:'阅读中'}[stage];
 $('releaseTiming').dataset.stage=stage;
 $('timingText').textContent=s.charging?`${(timing.held/1000).toFixed(1)}秒 · ${timingLabel}`:timingLabel;
 const cancel=!!gesture?.cancel,stable=s.charging&&timing.best;
 const pad=$('throwPad');pad.classList.toggle('holding',s.charging);pad.classList.toggle('cancelling',cancel);pad.classList.toggle('stable',stable&&!cancel);
 $('padTitle').textContent=s.reading?'阅读名片后继续':cancel?'松手取消，不消耗飞镖':s.flight?'飞镖飞行中…':stable?'最佳窗口 · 现在松手':s.charging?(timing.stage==='fatigue'?'手部疲劳 · 散布扩大':timing.stage==='late'?'窗口已过 · 尽快出手':'稳住圆圈，准备出手'):'按住滑动，松手投镖';
 $('padHint').textContent=cancel?'滑回上方可继续瞄准':s.charging?'看准旋转提前量 · 向下滑入取消区可收回':'逆风微调，在绿色窗口松手';
 $('padRing').textContent=cancel?'×':stable?'≈':'↗';
 if(s.challenge?.previewing(s,now)){$('padTitle').textContent='先记住目标顺序';$('padHint').textContent='倒计时结束后开始投镖';}
}

function finish(s){
 const rating=rateRound(s),stats=progress();stats.bestScore=Math.max(stats.bestScore,s.score);stats.bestStars=Math.max(stats.bestStars,rating.stars);stats.visits++;persist();
 $('resultStamp').textContent=CITY.name+(rating.passed?' · 已打卡':' · 再会');
 $('resultTitle').textContent=rating.passed?`把${CITY.name}，装进回忆里。`:'还有风景，等你收集。';
 $('resultDescription').textContent=rating.passed?'城市印章已收入手账，可以继续下一站或再次挑战。':'名片已保留。'+(s.challenge?.rule||'重试本关挑战。');
 $('resultStats').innerHTML=`<div><b>${s.score}</b><span>本局得分</span></div><div><b>${s.hits} / 12</b><span>命中飞镖</span></div><div><b>${s.collected.size} / 9</b><span>本局特色卡</span></div>`;
 const goals=[rating.passed,rating.passed&&s.score>=CONFIG.scoreGoal,rating.passed&&(s.challenge?s.challenge.errors<=2:s.maxStreak>=CONFIG.streakGoal)];
 $('resultStars').innerHTML=[`完成${s.challenge?.spec.name||"打卡"}（${s.challenge?.progress||0} / ${s.challenge?.goal||3}）`,`通关且达到 ${CONFIG.scoreGoal} 分（${s.score}）`,`通关且任务失误不超过 2 次（本局 ${s.challenge?.errors||0} 次）`].map((text,i)=>`<div>${goals[i]?'★':'☆'} ${text}</div>`).join('');
 $('resultCards').textContent=`${CITY.name}手账：${collectedCount()} / 9 张${collectedCount()===9?' · 本城明信片已集齐':''} · 全国共 ${save.cards.length} / 450 张`;
 const next=CITIES[CITIES.indexOf(CITY)+1];$('nextCityBtn').hidden=!rating.passed||!next;if(next)$('nextCityBtn').textContent=`下一站：${next.name} →`;
 chargeOwner=null;gesture=null;renderGesture(s);$('result').showModal();if(rating.passed)sound.play('win');
}

const scene=new DartScene($('board'),{
 change:updateScene,message:text=>$('feedback').textContent=text,sound:kind=>sound.play(kind),
 collect:id=>{if(!save.cards.includes(id)){save.cards.push(id);persist();}},finish,
 introduce:(target,hit)=>openTargetCard(target,hit),
 gesture:renderGesture,stable:()=>{if(!gesture?.cancel&&navigator.vibrate)navigator.vibrate(12);}
});
function syncLayout(){scene.setLayout();}
function start(){show('play');syncCityUI();syncLayout();$('feedback').textContent='阅读本关规则，按住滑动、松手投镖';scene.start();}

function renderBook(){
 const stats=progress();$('bookTitle').textContent=CITY.name+'旅行手账';
 $('bookSummary').textContent=`本城已收集 ${collectedCount()} / 9 张 · ${stats.bestStars?'城市旅行印章已获得':'完成本关挑战，领取城市印章'} · 最佳 ${'★'.repeat(stats.bestStars)}${'☆'.repeat(3-stats.bestStars)} · 全国累计 ${save.cards.length} / 450 张`;
 $('bookCityTabs').innerHTML=routeButtons([CITY]);$('bookCitySelect').value=CITY.id;
 const filter=$('categoryFilter'),previous=filter.value,categories=[...new Set(cityCatalog().map(t=>STORIES[t.id].category))];
 filter.replaceChildren(new Option('全部类别','all'),...categories.map(c=>new Option(c,c)));
 filter.value=categories.includes(previous)?previous:'all';
 const cards=cityCatalog().filter(t=>filter.value==='all'||STORIES[t.id].category===filter.value);
 $('collection').innerHTML=cards.map(t=>{const owned=save.cards.includes(t.id);return `<article class="collect-card ${owned?'':'unknown'}"><figure class="real-photo collection-photo" data-photo="${t.id}"></figure><small>${STORIES[t.id].category} / ${owned?'已收入手账':'尚未收集'}</small><h2>${t.name}</h2><p>${owned?t.description:`在${CITY.name}飞镖盘上命中对应分区，即可收入手账。`}</p>${owned?`<button class="story-button" data-story="${t.id}">查看故事 →</button>`:''}</article>`;}).join('');
 for(const figure of $('collection').querySelectorAll('[data-photo]'))renderRealPhoto(figure,figure.dataset.photo);
}

function renderRealPhoto(container,id,enlarged=false){
 const photo=PHOTOS[id];container.replaceChildren();container.dataset.card=id;
 container.classList.toggle('artwork-photo',/文物|书画/.test(STORIES[id].category));
 const image=document.createElement('img');image.src=photo.src;image.alt=photo.caption;image.decoding='async';
 if(photo.width&&photo.height){image.width=photo.width;image.height=photo.height;}
 // Main and enlarged images load immediately; collection images may load as they scroll into view.
 image.loading=container.classList.contains('collection-photo')?'lazy':'eager';
 if(enlarged)container.append(image);
 else{
  const button=document.createElement('button');button.type='button';button.className='photo-open';button.setAttribute('aria-label','查看'+CATALOG.find(c=>c.id===id).name+'真实大图');button.append(image);
  const zoom=document.createElement('span');zoom.className='photo-zoom';zoom.textContent='查看大图 ↗';button.append(zoom);
  button.onclick=()=>{renderRealPhoto($('largePhoto'),id,true);$('photoViewerTitle').textContent=photo.caption;$('photoViewer').showModal();};container.append(button);
 }
 const caption=document.createElement('figcaption');
 const title=document.createElement('span');title.className='photo-caption';title.textContent=photo.caption;
 const credit=document.createElement('span');credit.className='photo-credit';
 const link=document.createElement('a');link.href=photo.page;link.target='_blank';link.rel='noopener noreferrer';link.textContent=photo.author||'Wikimedia Commons';
 credit.append(link,document.createTextNode(' · '));
 const license=document.createElement('a');license.textContent=photo.license;license.href=photo.licenseUrl||photo.page;license.target='_blank';license.rel='noopener noreferrer';credit.append(license);
 if(enlarged){const changes=document.createElement('span');changes.textContent=photo.changes;changes.className='photo-changes';credit.append(changes);}
 caption.append(title,credit);container.append(caption);
}
$('closePhotoViewer').onclick=()=>$('photoViewer').close();
function openTargetCard(target,hit=null){
 const story=STORIES[target.id];
 storyInRound=hit!==null;
 $('targetCategory').textContent=story.category;
 $('targetHit').textContent=hit?`${hit.label||'命中'} +${hit.points} · ${hit.firstThisRound?'本局新发现':'再次相遇'}`:'旅行手账 · 已收藏';
 $('targetArt').innerHTML=cardArt(target.id);
 renderRealPhoto($('targetPhoto'),target.id);
 $('targetName').textContent=target.name;
 $('targetSubtitle').textContent=story.category+' · '+CITY.name;
 $('targetFacts').replaceChildren();
 const facts=story.facts.filter(([label,value])=>label!=='看点'&&!(label==='城市'&&value===CITY.name));$('targetFacts').hidden=facts.length===0;
 for(const [label,value] of facts){const item=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;item.append(dt,dd);$('targetFacts').append(item);}
 $('targetStory').replaceChildren();
 const brief=document.createElement('p');brief.textContent=story.brief||story.sections.map(section=>section[1]).join('');$('targetStory').append(brief);
 $('targetSources').replaceChildren();
 for(const [title,url] of story.sources){const link=document.createElement('a');link.textContent=title;link.href=url;link.target='_blank';link.rel='noopener noreferrer';$('targetSources').append(link);}
 $('targetCard').querySelector('details').open=false;
 $('targetSaved').textContent='已收入旅行手账，随时可回看';
 $('continueBtn').textContent=hit?(scene.remaining===0?'查看本局成绩 →':'继续投镖 ↗'):'收起名片';
 $('targetCard').showModal();
 $('targetCard').querySelector('.target-card-scroll').scrollTop=0;
}
function dismissTargetCard(){
 if(!$('targetCard').open)return;
 const resume=storyInRound;storyInRound=false;$('targetCard').close();
 if(resume){scene.continueAfterStory();if(scene.active)pad.focus({preventScroll:true});}
}
$('continueBtn').onclick=dismissTargetCard;
$('targetCard').addEventListener('cancel',e=>{e.preventDefault();dismissTargetCard();});
$('collection').addEventListener('click',e=>{const button=e.target.closest('[data-story]');if(!button)return;const target=CATALOG.find(t=>t.id===button.dataset.story);if(target&&save.cards.includes(target.id))openTargetCard(target);});
for(const id of ['cityChoices','bookCityTabs'])$(id).addEventListener('click',e=>{const button=e.target.closest('[data-city]');if(button)selectCity(button.dataset.city);});
$('categoryFilter').onchange=renderBook;
$('citySearch').addEventListener('input',updateHome);

$('bookCitySelect').innerHTML=CITIES.map((city,i)=>`<option value="${city.id}">${String(i+1).padStart(2,'0')} · ${city.name} / ${city.region}</option>`).join('');
$('bookCitySelect').onchange=()=>selectCity($('bookCitySelect').value);


$('nextCityBtn').onclick=()=>{const next=CITIES[CITIES.indexOf(CITY)+1];if(next){selectCity(next.id);start();}};
$('startBtn').onclick=start;$('retryBtn').onclick=start;
$('homeLink').onclick=e=>{e.preventDefault();show('home');};$('exitBtn').onclick=()=>show('home');$('bookBack').onclick=()=>show('home');$('resultHome').onclick=()=>show('home');$('bookBtn').onclick=()=>show('book');$('resultBook').onclick=()=>show('book');
$('result').addEventListener('cancel',e=>{e.preventDefault();show('home');});
function syncSound(){$('soundBtn').textContent=save.muted?'声音：关':'声音：开';$('soundBtn').setAttribute('aria-pressed',String(save.muted));}
$('soundBtn').onclick=()=>{save.muted=!save.muted;persist();syncSound();};syncSound();
$('fullscreenBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('当前浏览器不支持全屏，可直接游玩');}catch{toast('全屏暂不可用，可直接游玩');}};
document.addEventListener('fullscreenchange',()=>$('fullscreenBtn').textContent=document.fullscreenElement?'退出全屏':'全屏');
const pad=$('throwPad');
function inputTime(e){const now=performance.now();return Number.isFinite(e.timeStamp)&&Math.abs(e.timeStamp-now)<60000?e.timeStamp:now;}
function inCancelZone(x,y){const r=$('cancelZone').getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;}
function cancelGesture(message){
 const owner=chargeOwner;chargeOwner=null;gesture=null;
 if(typeof owner==='number'&&pad.hasPointerCapture(owner))pad.releasePointerCapture(owner);
 if(scene.active)scene.cancel();
 if(message)$('feedback').textContent=message;
 renderGesture(scene);
}
pad.addEventListener('contextmenu',e=>e.preventDefault());
pad.addEventListener('pointerdown',e=>{
 if(e.button!==0||chargeOwner!==null||!e.isPrimary||inCancelZone(e.clientX,e.clientY))return;
 e.preventDefault();if(!scene.begin(inputTime(e)))return;
 chargeOwner=e.pointerId;gesture={x:e.clientX,y:e.clientY,time:inputTime(e),cancel:false};
 pad.setPointerCapture(e.pointerId);pad.focus({preventScroll:true});renderGesture(scene);
});
pad.addEventListener('pointermove',e=>{
 if(e.pointerId!==chargeOwner||!gesture)return;e.preventDefault();
 const now=inputTime(e),dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
 const cancelled=inCancelZone(e.clientX,e.clientY);
 if(!cancelled&&!gesture.cancel){
  const speed=Math.hypot(dx,dy)/Math.max(8,now-gesture.time);
  const gain=.3+Math.min(1.7,speed*1.7);
  const area=pad.querySelector('.pad-main').getBoundingClientRect();
  scene.move(dx*gain*scene.width/area.width,dy*gain*scene.height/area.height,now);
 }
 gesture={x:e.clientX,y:e.clientY,time:now,cancel:cancelled};renderGesture(scene);
});
pad.addEventListener('pointerup',e=>{
 if(e.pointerId!==chargeOwner)return;e.preventDefault();
 const cancelled=inCancelZone(e.clientX,e.clientY);chargeOwner=null;gesture=null;
 if(pad.hasPointerCapture(e.pointerId))pad.releasePointerCapture(e.pointerId);
 if(cancelled){scene.cancel();$('feedback').textContent='已收回飞镖 · 按住即可重新瞄准';}else scene.throw(inputTime(e));
 renderGesture(scene);
});
pad.addEventListener('pointercancel',e=>{if(e.pointerId===chargeOwner)cancelGesture('投掷已取消，飞镖未消耗');});
pad.addEventListener('lostpointercapture',e=>{if(e.pointerId===chargeOwner)cancelGesture();});
window.addEventListener('keydown',e=>{
 if(currentScreen!=='play'||!scene.active||$('result').open||$('targetCard').open||$('challengeZoom').open)return;
 if(e.code==='Escape'){e.preventDefault();cancelGesture('已收回飞镖');}
 else if(e.code==='Space'){
  if(document.activeElement!==pad&&document.activeElement!==document.body)return;
  e.preventDefault();if(!e.repeat&&chargeOwner===null&&scene.begin(inputTime(e)))chargeOwner='keyboard';
 }else if(chargeOwner==='keyboard'&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code)){
  e.preventDefault();const step=e.shiftKey?2:10;scene.move(e.code==='ArrowLeft'?-step:e.code==='ArrowRight'?step:0,e.code==='ArrowUp'?-step:e.code==='ArrowDown'?step:0);
 }
});
window.addEventListener('keyup',e=>{if(e.code==='Space'&&chargeOwner==='keyboard'){e.preventDefault();chargeOwner=null;scene.throw(inputTime(e));}});
window.addEventListener('blur',()=>cancelGesture());
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelGesture();});
window.addEventListener('resize',()=>{if(currentScreen==='play'){cancelGesture();syncLayout();}});
$('rankingSource').href=RANKING.source;
syncCityUI();
updateHome();

$('challengePhotoButton').onclick=()=>{if(!scene.active||scene.reading||scene.flight)return;cancelGesture();scene.pauseRotation();$('challengeZoomImage').src=$('challengePhoto').src;$('challengeZoom').showModal();};
$('closeChallengeZoom').onclick=()=>$('challengeZoom').close();
$('challengeZoom').addEventListener('close',()=>{if(scene.active&&!scene.reading){scene.resumeRotation();pad.focus({preventScroll:true});}});
