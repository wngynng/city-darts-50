'use strict';
const CONFIG = Object.freeze({ darts:12, flightMs:480, settleMs:400, minHoldMs:140, scoreGoal:300, streakGoal:3, spreadStable:16, spreadMoving:30, spreadTired:38, bestStartMs:500, bestEndMs:1200, fatigueStartMs:1500, fatigueFullMs:3300, windPixelsPerMps:6, saveKey:'cityDarts50Save_v1' });
function sampleAimDisk(radius,random=Math.random){const distance=radius*Math.sqrt(random()),angle=random()*Math.PI*2;return{x:Math.cos(angle)*distance,y:Math.sin(angle)*distance};}
function windDeflection(angle,speed){return{x:Math.cos(angle)*speed*CONFIG.windPixelsPerMps,y:Math.sin(angle)*speed*CONFIG.windPixelsPerMps};}
function aimTiming(heldMs,stillMs){
 const clip=v=>Math.max(0,Math.min(1,v)),held=Math.max(0,heldMs),steady=clip(stillMs/CONFIG.settleMs),ready=clip(held/CONFIG.bestStartMs);
 const fatigue=clip((held-CONFIG.fatigueStartMs)/(CONFIG.fatigueFullMs-CONFIG.fatigueStartMs));
 const late=clip((held-CONFIG.bestEndMs)/(CONFIG.fatigueStartMs-CONFIG.bestEndMs));
 const stage=held>=CONFIG.fatigueStartMs?'fatigue':held>CONFIG.bestEndMs?'late':held>=CONFIG.bestStartMs&&steady===1?'best':'settling';
 return{held,steady,fatigue,stage,best:stage==='best',progress:clip(held/CONFIG.fatigueFullMs),radius:Math.min(48,CONFIG.spreadMoving+(CONFIG.spreadStable-CONFIG.spreadMoving)*steady*ready+late*2+fatigue*(CONFIG.spreadTired-CONFIG.spreadStable-2))};
}
function rotationSpeedForLevel(index,total=50){return(8+12*Math.max(0,Math.min(1,index/Math.max(1,total-1))))*Math.PI/180;}
let CITY = { id:'chengdu', name:'成都', required:['hotpot','tea','alley'] };
const CATALOG = [
{id:'hotpot',name:'成都火锅',tag:'烟火滋味',color:'#bd5d42',description:'红汤翻滚，热气升腾。把成都的热闹滋味，收进一张小小的纪念卡。'},
{id:'tea',name:'盖碗茶',tag:'茶馆日常',color:'#527660',description:'一盖、一碗、一托。在成都的茶馆里，喝茶也是让脚步慢下来的方式。'},
{id:'alley',name:'宽窄巷子',tag:'街巷漫游',color:'#6b8190',description:'青砖灰瓦，院落街巷。沿着宽窄巷子走一走，留一页属于成都的街头印象。'},
{id:'panda',name:'熊猫印象',tag:'城市名片',color:'#7b8061',description:'圆耳朵、黑眼圈，憨态可掬的大熊猫，是这趟成都旅行里让人会心一笑的相遇。'},
{id:'bamboo',name:'竹影清风',tag:'闲适片刻',color:'#658870',description:'把茶馆边的一抹竹影带回手账。这张旅行氛围卡，记录闲适的片刻。'},
{id:'noodle',name:'担担面',tag:'街头小吃',color:'#c08c43',description:'一碗小面，也是一份城市记忆。成都的街头小吃，是下一次漫游的好理由。'}];
// Descriptive content is embedded so the story cards remain readable offline.
const STORIES = {
 hotpot: {
  category: '美食名片', subtitle: '一锅红汤里的成都烟火',
  facts: [['地域', '四川 · 成都'], ['看点', '地方饮食与传统技艺']],
  sections: [
   ['地方故事', '成都的火锅文化包含不同流派。皇城坝清真牛肉火锅就是其中一支：据成都市非遗保护中心记载，这项制作技艺始创于1903年，与晚清至民国时期皇城坝的回民饮食生活有关。'],
   ['认识这一味', '这一流派以牛油、花椒、辣椒和香料制成锅底，以铜锅炭火涮煮牛肉、牛杂。它是理解成都火锅多样性的一个例子，不能把某一流派的历史当作所有火锅的统一起源。']
  ],
  sources: [['成都市非遗保护中心 · 皇城坝清真牛肉火锅制作技艺', 'https://www.cdich.cn/index.php/cms/dbxxm/3229.html']]
 },
 tea: {
  category: '茶俗名片', subtitle: '一盖一碗一托，坐下来摆龙门阵',
  facts: [['地域', '四川 · 成都'], ['看点', '茶具与茶馆生活']],
  sections: [
   ['茶馆里的日常', '盖碗茶是成都茶馆生活的代表。喝茶、看报、聊天，在茶馆里“摆龙门阵”，让一盏茶连接起人们的日常交往。'],
   ['三件茶具的巧思', '盖碗由茶盖、茶碗和茶托组成，茶托也称“茶船”。茶盖可拨开浮叶、帮助保温，茶船则便于托举茶碗。这套器具把实用与饮茶的从容结合在一起。']
  ],
  sources: [['央视网 · 漫游成都：摆不完的龙门阵喝不够的盖碗茶', 'https://sannong.cntv.cn/2014/11/18/ARTI1416303022354224.shtml'], ['四川地方志 · 生活习俗', 'https://www.scsqw.cn/upload/main/contentmanage/article/file/201701161555421063.pdf']]
 },
 alley: {
  category: '街巷名片', subtitle: '从清代满城，走进今天的成都',
  facts: [['地域', '成都 · 少城片区'], ['历史线索', '清代满城街巷']],
  sections: [
   ['街巷从哪里来', '宽窄巷子的历史与成都少城片区有关。据成都市地方志工作办公室介绍，1718年，清代满城在少城旧址修筑，形成街道与胡同相连的格局。今天的宽窄巷子保留着这段城市历史的线索。'],
   ['从驻防城到城市会客厅', '民国初年，满城城墙陆续拆除，街区经历了生活与用途的变化。如今宽窄巷子成为成都的文化地标；看院落与街巷，也是在阅读城市如何随时代生长。']
  ],
  sources: [['成都市地方志工作办公室 · 重走少城逛逛街', 'https://app.xinhuanet.com/news/article.html?articleId=20260423f68e579562d443aca38d90f25566a5a5']]
 },
 panda: {
  category: '自然名片', subtitle: '可爱之外，还有一段保护的故事',
  facts: [['地域', '四川 · 成都'], ['历史线索', '1987年 · 熊猫基地成立']],
  sections: [
   ['成都与大熊猫', '成都大熊猫繁育研究基地成立于1987年，开展大熊猫等珍稀动物的保护、科研、繁育和科普教育工作。熊猫成为城市名片，也让更多人认识到物种保护的重要性。'],
   ['这张卡记录什么', '游戏里的“熊猫印象”是一张城市主题插画卡，不对应某一只真实大熊猫。它邀请你在欣赏动物的同时，了解背后的研究与保护工作。']
  ],
  sources: [['成都大熊猫繁育研究基地 · 基地简介', 'https://www.panda.org.cn/cn/about/']]
 },
 bamboo: {
  category: '园林名片', subtitle: '循着竹影，认识望江楼的诗意',
  facts: [['文化关联', '成都 · 望江楼公园'], ['看点', '竹园与薛涛纪念文化']],
  sections: [
   ['竹影里的成都', '成都望江楼公园以古建筑、唐代女诗人薛涛的纪念文化及珍奇竹类闻名。公园里的竹园，把植物景观与城市的人文记忆联系起来。'],
   ['从氛围卡到文化线索', '“竹影清风”是游戏创作的旅行氛围卡，不是一件古董或某株古竹的写照。把它收进手账，也记下一个可以继续认识成都园林与诗歌文化的入口。']
  ],
  sources: [['望江楼公园官网 · 望江楼简介', 'https://www.wangjianglou.com/about.html']]
 },
 noodle: {
  category: '美食名片', subtitle: '从挑担叫卖，到一碗川味小吃',
  facts: [['地域', '四川 · 成都等地'], ['名称线索', '挑担沿街售面']],
  sections: [
   ['名字里藏着老行当', '担担面的名称与挑担卖面有关。过去的小贩把煮面和调味用具放在担子两端，走街串巷、现煮现卖。这种售卖方式也成为小吃名称的一部分。'],
   ['关于起源的说法', '一种常见说法把担担面追溯到清代自贡小贩陈包包，后来流传到成都、重庆等地。各地味型和经营传统逐渐形成差异，因此不把它写成仅起源于成都的食物。']
  ],
  sources: [['重庆市人民政府 · 正东担担面的传承故事', 'https://www.cq.gov.cn/ywdt/zwhd/bmdt/201911/t20191113_8626459.html']]
 }
};
// Standard steel-tip clock board. Lengths are in millimetres, uniformly scaled.
const DARTBOARD = Object.freeze({
 size:720, cx:360, cy:360, scale:1.82,
 numbers:[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5],
 innerBull:6.35, outerBull:15.9, trebleInner:99, trebleOuter:107,
 doubleInner:162, doubleOuter:170,
 get topics(){return currentTopics();},
 get bullTopic(){return CITY.bullTopic;}

});
function boardPoint(number,radiusMm=130,rotation=0){
 const index=DARTBOARD.numbers.indexOf(number);
 if(index<0)throw new Error('Unknown board number');
 const angle=-Math.PI/2+index*Math.PI/10+rotation;
 return {x:DARTBOARD.cx+Math.cos(angle)*radiusMm*DARTBOARD.scale,y:DARTBOARD.cy+Math.sin(angle)*radiusMm*DARTBOARD.scale};
}
function scoreImpact(x,y){
 const b=DARTBOARD,dx=(x-b.cx)/b.scale,dy=(y-b.cy)/b.scale,r=Math.hypot(dx,dy);
 const miss={target:null,points:0,bull:false,number:0,multiplier:0,label:'脱靶'};
 if(!Number.isFinite(r)||r>b.doubleOuter+1e-9)return miss;
 if(r<=b.outerBull+1e-9){
  const bull=r<=b.innerBull+1e-9;
  return {target:CATALOG.find(t=>t.id===b.bullTopic),points:bull?50:25,bull,number:25,multiplier:bull?2:1,label:bull?'中心牛眼':'外牛眼'};
 }
 // Each sector spans 18 degrees; 20 is centred at twelve o'clock.
 const angle=(Math.atan2(dy,dx)+Math.PI/2+Math.PI/20+Math.PI*2)%(Math.PI*2);
 const index=Math.floor(angle/(Math.PI/10))%20,number=b.numbers[index];
 const multiplier=r>=b.doubleInner-1e-9?2:r>=b.trebleInner-1e-9&&r<=b.trebleOuter+1e-9?3:1;
 return {target:CATALOG.find(t=>t.id===b.topics[index]),points:number*multiplier,bull:false,number,multiplier,label:`${multiplier===3?'三倍':multiplier===2?'双倍':'单倍'} ${number}`};
}
function rateRound(round){const passed=round.challenge?!!round.challenge.done:CITY.required.every(id=>round.collected.has(id));return{passed,stars:passed?1+Number(round.score>=CONFIG.scoreGoal)+Number(round.challenge?round.challenge.errors<=2:round.maxStreak>=CONFIG.streakGoal):0};}
function rotateBoardPoint(point,angle){const dx=point.x-DARTBOARD.cx,dy=point.y-DARTBOARD.cy;return{x:DARTBOARD.cx+dx*Math.cos(angle)-dy*Math.sin(angle),y:DARTBOARD.cy+dx*Math.sin(angle)+dy*Math.cos(angle)};}
function scoreRotatedImpact(x,y,rotation){const p=rotateBoardPoint({x,y},-rotation);return scoreImpact(p.x,p.y);}
