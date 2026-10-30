'use strict';
// Code-native illustrations: self-contained SVG artwork, available offline.
const ART = {
 hotpot:'<ellipse cx="0" cy="28" rx="52" ry="12" fill="#733d30"/><path d="M-49-5Q-46 43 0 42Q46 43 49-5" fill="#bb573d"/><ellipse cy="-5" rx="49" ry="18" fill="#e6b666"/><ellipse cy="-5" rx="41" ry="13" fill="#aa452f"/><path d="M0-17Q-19-3 0 9" fill="none" stroke="#edca91" stroke-width="5"/><path d="M-49 0H-60V14H-45M49 0H60V14H45" fill="none" stroke="#714b37" stroke-width="6"/><g fill="#84945b"><ellipse cx="-24" cy="-5" rx="10" ry="4" transform="rotate(20)"/><ellipse cx="23" cy="0" rx="8" ry="4"/></g><path d="M-20-30Q-30-43-18-55M4-30Q-6-43 6-55M27-29Q17-42 29-54" stroke="#f6eed6" stroke-width="4" fill="none" stroke-linecap="round"/>',
 tea:'<ellipse cy="36" rx="55" ry="12" fill="#a5b394"/><ellipse cy="32" rx="46" ry="8" fill="#e5dfbf"/><path d="M-43-5Q-36 36 0 34Q36 36 43-5Z" fill="#f4ebd0" stroke="#879a78" stroke-width="2"/><path d="M-33 8Q0 22 33 8" fill="none" stroke="#93a582" stroke-width="3"/><ellipse cy="-5" rx="46" ry="10" fill="#d4ddba"/><path d="M-35-8Q0-40 35-8" fill="#f4ebd0" stroke="#879a78" stroke-width="2"/><ellipse cy="-28" rx="9" ry="5" fill="#6d8767"/><path d="M14-45Q2-55 17-67" fill="none" stroke="#f6f0da" stroke-width="4" stroke-linecap="round"/>',
 alley:'<path d="M-55 45V-16H55V45" fill="#b0b0a1"/><path d="M-64-16L-44-34H44L64-16Z" fill="#52635d"/><path d="M-60-22Q-30-23-21-38H21Q30-23 60-22" fill="#687c6f"/><path d="M-24 45V3Q0-22 24 3V45" fill="#455a50"/><path d="M-16 45V7Q0-9 16 7V45" fill="#d0bc91"/><path d="M0 2V45M-55 5H-27M27 5H55M-55 23H-27M27 23H55" stroke="#e7dfc5" stroke-width="2"/><path d="M-44-15V0M44-15V0" stroke="#5a4e35" stroke-width="2"/><ellipse cx="-44" cy="8" rx="7" ry="10" fill="#bd5d42"/><ellipse cx="44" cy="8" rx="7" ry="10" fill="#bd5d42"/>',
 panda:'<ellipse cy="25" rx="37" ry="30" fill="#f5efdc"/><ellipse cx="-32" cy="23" rx="13" ry="22" fill="#34443d"/><ellipse cx="32" cy="23" rx="13" ry="22" fill="#34443d"/><circle cx="-28" cy="-37" r="15" fill="#34443d"/><circle cx="28" cy="-37" r="15" fill="#34443d"/><ellipse cy="-13" rx="42" ry="37" fill="#f5efdc"/><ellipse cx="-17" cy="-13" rx="11" ry="15" transform="rotate(20 -17 -13)" fill="#34443d"/><ellipse cx="17" cy="-13" rx="11" ry="15" transform="rotate(-20 17 -13)" fill="#34443d"/><circle cx="-15" cy="-16" r="3" fill="white"/><circle cx="15" cy="-16" r="3" fill="white"/><ellipse cy="2" rx="7" ry="5" fill="#34443d"/><path d="M0 6V11M-7 11Q0 18 7 11" fill="none" stroke="#34443d" stroke-width="2"/>',
 bamboo:'<path d="M-15 53L-10-53M18 53L25-43" stroke="#47795e" stroke-width="9"/><path d="M-20-27H-3M-22 3H-5M-23 32H-7M18-16H32M15 16H29M13 42H28" stroke="#d3d5a0" stroke-width="3"/><g fill="#668b5f"><path d="M-10-20Q-61-62-54-22Q-32-7-10-20M-10 10Q-58-13-46 20Q-29 28-10 10M23-8Q65-48 57-12Q40 1 23-8M20 27Q65-7 58 25Q41 38 20 27M-8-43Q24-74 26-47Q11-33-8-43"/></g>',
 noodle:'<ellipse cy="39" rx="44" ry="9" fill="#b3a47e"/><path d="M-47-2Q-40 43 0 43Q40 43 47-2" fill="#ede3c4" stroke="#9a8a65" stroke-width="2"/><path d="M-37 18Q0 34 37 18" stroke="#68897a" stroke-width="5" fill="none"/><ellipse cy="-2" rx="47" ry="16" fill="#bc763f"/><g fill="none" stroke="#f1d487" stroke-width="3"><path d="M-30-5Q-20-18-8-3T17-3T35-4M-31 2Q-18-10-7 4T20 3M-18-10Q-7 1 5-10T31-7"/></g><g fill="#537a4a"><ellipse cx="-25" cy="-7" rx="9" ry="5"/><ellipse cx="25" cy="-5" rx="8" ry="5"/></g><path d="M11-10L45-60M21-8L56-55" stroke="#70553d" stroke-width="4" stroke-linecap="round"/>'
};
Object.assign(ART,{
 sunbird:'<circle r="49" fill="#c6a34f"/><circle r="36" fill="#e6e8d5"/><g fill="#c6a34f"><path d="M0-30L9-11 30 0 11 9 0 30-9 11-30 0-11-9Z"/><path id="bird" d="M-16-47Q17-68 43-31L26-38 17-26 14-42Z"/><use href="#bird" transform="rotate(90)"/><use href="#bird" transform="rotate(180)"/><use href="#bird" transform="rotate(270)"/></g>',
 brocade:'<path d="M-48-56H42V53H-48Z" fill="#b7624c"/><path d="M-48-56Q-65-56-59-41H42Q60-41 51-56Z" fill="#d9b85d"/><path d="M-48 53Q-65 53-59 38H42Q60 38 51 53Z" fill="#d9b85d"/><g fill="none" stroke="#edcf82" stroke-width="3"><path d="M-42-18L-18-35 6-18 30-35 44-18M-42 9L-18-8 6 9 30-8 44 9M-42 33L-18 16 6 33 30 16 44 33"/></g>',
 mask:'<path d="M-43-43Q0-65 43-43L36 23Q0 72-36 23Z" fill="#b4523c"/><path d="M-35-32L-10-14-28 10-38-2M35-32L10-14 28 10 38-2M-5-47L-13-13 0 2 13-13 5-47" fill="#f2e8c9"/><path d="M-31-11L-12-7M12-7L31-11M-18 27Q0 39 18 27" stroke="#293b32" stroke-width="6" fill="none"/><path d="M0 6L-8 18H8Z" fill="#293b32"/>',
 doupi:'<ellipse cy="42" rx="62" ry="13" fill="#b2bba0"/><g fill="#d49a41" stroke="#8e6539" stroke-width="2"><path d="M-52 6L-10-8 32 7-10 22Z"/><path d="M-52 6V30L-10 46V22Z"/><path d="M-10 22L32 7V31L-10 46Z"/><path d="M-12-23L28-37 60-23 21-8Z"/><path d="M21-8L60-23V0L21 16Z"/><path d="M-12-23V0L21 16V-8Z"/></g><path d="M-42 13L-18 22M-42 21L-18 29M-4 29L23 20" stroke="#f2dfb0" stroke-width="4"/><g fill="#4f7a46"><circle cx="-15" cy="5" r="4"/><circle cx="31" cy="-24" r="4"/><circle cx="-31" cy="2" r="3"/></g>',
 mianwo:'<ellipse cy="23" rx="58" ry="18" fill="#b2bba0"/><ellipse cy="-3" rx="50" ry="39" fill="#be843d"/><ellipse cy="-11" rx="46" ry="33" fill="#d6a34b"/><ellipse cy="-11" rx="16" ry="11" fill="#e6e8d5"/><g stroke="#f3dd96" stroke-width="3"><path d="M-31-20L-26-19M-10-34L-6-32M21-27L26-24M31-5L36-3M-24 8L-20 9M7 12L11 13"/></g>',
 tower:'<path d="M-33 44V-32H33V44Z" fill="#d4ad62"/><path d="M-62 38L-35 21H35L62 38ZM-55 11L-30-8H30L55 11ZM-44-17L-22-38H22L44-17Z" fill="#845339"/><path d="M-21-42L0-62 21-42Z" fill="#845339"/><path d="M-40 47H40M-26 12V32M0 12V32M26 12V32M-17-15V6M17-15V6" stroke="#f3dfaf" stroke-width="5"/><path d="M0-60V-70" stroke="#997247" stroke-width="3"/>',
 lake:'<path d="M-65 18Q-35-55-6 3Q23-47 65 16Z" fill="#86a485"/><path d="M-65 14Q-27 4 0 17T65 14V43H-65Z" fill="#769fac"/><path d="M-55 27H-15M4 31H52M-32 40H10" stroke="#dce3c9" stroke-width="3"/><path d="M-18 8H24L15 17H-9Z" fill="#6a5340"/><path d="M3-21V9M3-20L23 3H3Z" fill="#eee2b6" stroke="#736049" stroke-width="2"/>',
 bridge:'<path d="M-67 33H67M-65 6H65M-65 12H65" stroke="#637e7d" stroke-width="5"/><path d="M-48 5V-38H-36V5M36 5V-38H48V5" fill="#b7a47a"/><path d="M-65 5L-42-33 0 5 42-33 65 5M-42-33V26M42-33V26" stroke="#526a67" stroke-width="3" fill="none"/><path d="M-65 47Q-38 34-9 47T65 47" fill="none" stroke="#7da3af" stroke-width="5"/>',
 sword:'<g transform="rotate(35)"><path d="M0-65L12-43 7 28H-7L-12-43Z" fill="#a6ad84" stroke="#586d55" stroke-width="2"/><path d="M0-57V27M-8-29L8-15-8-1 8 13" stroke="#687e62" stroke-width="2" fill="none"/><path d="M-23 28H23V37H-23Z" fill="#887440"/><path d="M-5 37H5V60H-5Z" fill="#6d6841"/><ellipse cy="61" rx="12" ry="5" fill="#a58e4b"/></g>',
 bells:'<path d="M-61-44H61M-55-46V53M55-46V53M-60 53H60" stroke="#755638" stroke-width="7"/><g fill="#a48b4e" stroke="#665734" stroke-width="2"><path d="M-42-35V-19Q-55 2-29 2Q-18 2-28-19V-35Z"/><path d="M-7-35V-6Q-23 22 3 22Q25 22 7-6V-35Z"/><path d="M29-35V-18Q16 3 43 3Q56 3 42-18V-35Z"/></g><path d="M-43-11H-28M-7 5H9M30-10H43" stroke="#d9c37d" stroke-width="3"/>',
 tigerdrum:'<path d="M-55 43Q-43 15-19 32H19Q43 15 55 43L45 52H-45Z" fill="#9b653b"/><path d="M-29 34Q-53-38-26-50L-10-35-26-31 0 8M29 34Q53-38 26-50L10-35 26-31 0 8" fill="#374d3c" stroke="#a27240" stroke-width="3"/><circle cy="3" r="26" fill="#ba6a41" stroke="#d6b369" stroke-width="5"/><circle cy="3" r="17" fill="none" stroke="#644f36" stroke-width="2"/>',
 duckmeal:'<ellipse cy="34" rx="64" ry="20" fill="#abb99b"/><ellipse cy="28" rx="57" ry="17" fill="#f2e6c6"/><ellipse cy="5" rx="42" ry="25" fill="#aa6238"/><path d="M19-4Q47-32 49-12Q50 1 30 14" fill="#aa6238"/><circle cx="45" cy="-16" r="3" fill="#243f38"/><path d="M52-16L66-12 52-8" fill="#d7ae5e"/><path d="M-30 0L-3-13M-17 18L12 0M-6 23L24 7" stroke="#d79a53" stroke-width="4"/>',
 douzhi:'<ellipse cx="-12" cy="30" rx="40" ry="10" fill="#adba98"/><path d="M-51-15Q-46 33-12 32Q23 32 29-15" fill="#e9dec0" stroke="#8e9c7b" stroke-width="2"/><ellipse cx="-12" cy="-15" rx="40" ry="13" fill="#b7c09b"/><ellipse cx="40" cy="24" rx="24" ry="18" fill="#c19547"/><ellipse cx="40" cy="24" rx="11" ry="7" fill="#e6e8d5"/><path d="M-24-38Q-32-50-19-61" stroke="#f5efd9" stroke-width="4" fill="none"/>',
 temple:'<path d="M-42 36V-11H42V36" fill="#b77850"/><path d="M-59 39H59V49H-59ZM-48 29H48V38H-48Z" fill="#d1c9ad"/><path d="M-58-9Q-16-14 0-32Q16-14 58-9ZM-45-29Q-11-33 0-49Q11-33 45-29ZM-30-47Q-9-50 0-65Q9-50 30-47Z" fill="#4d7382"/><path d="M-26-6V28M-9-6V28M9-6V28M26-6V28" stroke="#d8bd83" stroke-width="4"/><circle cy="-67" r="5" fill="#c49b4f"/>',
 palace:'<path d="M-56 8H56V46H-56Z" fill="#b55e45"/><path d="M-68 5L-48-16H48L68 5Z" fill="#c3a155"/><path d="M-39-15V-36H39V-15" fill="#b55e45"/><path d="M-51-37L-27-55H27L51-37Z" fill="#c3a155"/><path d="M-14 46V21Q0 4 14 21V46" fill="#4b5847"/><path d="M-43 16V32M-27 16V32M27 16V32M43 16V32M-23-30V-17M0-30V-17M23-30V-17" stroke="#edd397" stroke-width="5"/>',
 wall:'<path d="M-63 31L-22 9 9 20 49-21 63-8 14 46-20 34-63 56Z" fill="#8e9785"/><path d="M-63 17L-22-5 9 6 49-35 63-22 14 32-20 20-63 42Z" fill="#c1bda0"/><path d="M-29-9V-36H-20V-29H-11V-36H-2V-9ZM37-36V-63H46V-56H55V-63H64V-36Z" fill="#8c9785"/><path d="M-63 30L-20 7 12 19 56-24" stroke="#657660" stroke-width="3" fill="none"/>',
 riverscroll:'<path d="M-59-44H54V43H-59Z" fill="#e5d4a3"/><path d="M-59-48V48M54-48V48" stroke="#9a744a" stroke-width="9" stroke-linecap="round"/><path d="M-49 29Q-20-8 1 19T46-2M-42 36Q-20 15 1 30T42 12" fill="none" stroke="#7a9895" stroke-width="4"/><path d="M-36 0Q-11-38 17 0M-36 0H17" fill="none" stroke="#8f7951" stroke-width="4"/><path d="M26-10V-28H43V-10M21-28L34-38 47-28" fill="#99a189" stroke="#6d765e" stroke-width="2"/>',
 landscape:'<path d="M-61-49H57V48H-61Z" fill="#e8d6ac"/><path d="M-61-52V52M57-52V52" stroke="#9a744a" stroke-width="8" stroke-linecap="round"/><path d="M-51 32L-25-27-8-4 10-39 44 32Z" fill="#447a79"/><path d="M-51 32L-26-5-12 12 12-18 45 32Z" fill="#7b9e78"/><path d="M-48 39Q-12 26 45 41" stroke="#5e98a2" stroke-width="6" fill="none"/><circle cx="-36" cy="-30" r="9" fill="#c4ab6b"/>',
 vase:'<path d="M-18-58H18V-32Q49-7 37 35Q33 52 0 53Q-33 52-37 35Q-49-7-18-32Z" fill="#547e95" stroke="#c4a452" stroke-width="3"/><path d="M-20-58H20M-20-42H20M-35 32H35M-28 48H28" stroke="#d9bc67" stroke-width="4"/><path d="M0-24Q-32-4 0 14Q32-4 0-24ZM0 14Q-28 25 0 39Q28 25 0 14Z" fill="none" stroke="#d9bc67" stroke-width="3"/>'
});
ART.jingju=ART.mask.replaceAll('#b4523c','#496e81');
Object.assign(ART,{
 dumpling:'<path d="M-58 23Q-48-43 0-43Q48-43 58 23Q0 62-58 23Z" fill="#e8d6a3" stroke="#ad8f56" stroke-width="3"/><path d="M-41 17L-26-22M-20 22L-12-28M0 25V-30M20 22L12-28M41 17L26-22" stroke="#c5a66c" stroke-width="4"/>',
 pastry:'<path d="M-48-26H48V36H-48Z" fill="#d6a568"/><path d="M-48-26Q0-57 48-26V-10H-48Z" fill="#f0d29b"/><path d="M-44 2H44M-44 20H44" stroke="#a36c42" stroke-width="7"/><circle cx="-23" cy="-24" r="3" fill="#bc8750"/><circle cx="5" cy="-29" r="3" fill="#bc8750"/><circle cx="29" cy="-23" r="3" fill="#bc8750"/>',
 fish:'<path d="M-49 0Q0-48 42 0Q0 48-49 0ZM42 0L67-29V29Z" fill="#7eaaa9"/><circle cx="-24" cy="-6" r="5" fill="#2e554c"/><path d="M-8-20Q5 0-8 20M8-18Q19 0 8 18" stroke="#dbdec0" stroke-width="3" fill="none"/>',
 rice:'<path d="M-50-7Q0-67 50-7Z" fill="#f4ebd2"/><path d="M-52-7H52Q42 44 0 44Q-42 44-52-7" fill="#8aab9e"/><path d="M-37 12H37M-20 40H20" stroke="#d7ddbd" stroke-width="4"/>',
 museum:'<path d="M-61-23L0-59 61-23Z" fill="#b79a62"/><path d="M-54-17H54M-54 43H54M-62 53H62" stroke="#84978c" stroke-width="9"/><path d="M-40-12V37M-13-12V37M13-12V37M40-12V37" stroke="#a8b6a1" stroke-width="13"/>',
 mountain:'<circle cx="34" cy="-36" r="17" fill="#d5b879"/><path d="M-67 45L-20-51 19 45Z" fill="#759a8b"/><path d="M-12 45L29-31 68 45Z" fill="#a0b29b"/><path d="M-36-18L-20-51-5-18-20-24Z" fill="#ecedd8"/>',
 church:'<path d="M-45 44V-22H-18V-47H18V-22H45V44" fill="#cba780"/><path d="M-58-23L-32-48-11-23M-24-46L0-69 24-46M11-23L32-48 58-23" fill="#7d8f83"/><path d="M-12 44V15Q0-2 12 15V44" fill="#5f766b"/><circle cy="-25" r="9" fill="#d8d4a7"/>'
});
// Architectural stickers use tiered roofs, railings and masonry detail.
ART.palace='<path d="M-69 43H69V55H-69ZM-61 34H61V43H-61Z" fill="#eee3c3"/><path d="M-57 2H57V34H-57Z" fill="#b55e45"/><path d="M-69 1Q-55-4-47-19H47Q55-4 69 1L61 7H-61Z" fill="#d6a568"/><path d="M-38-19V-40H38V-19" fill="#b55e45"/><path d="M-51-39Q-35-39-27-55H27Q35-39 51-39L43-33H-43Z" fill="#d6a568"/><path d="M-16 34V16Q-16 2-7 2Q2 2 2 16V34M13 34V15Q13 8 20 8Q27 8 27 15V34M-43 34V15Q-43 8-36 8Q-29 8-29 15V34" fill="#704b36"/><path d="M-52 8V33M-22 8V33M7 8V33M36 8V33M52 8V33M-30-30V-20M-10-30V-20M10-30V-20M30-30V-20" stroke="#edd397" stroke-width="3"/><path d="M-56-2H56M-40-42H40M-65 45H65M-64 51H64M-59 33V43M-46 34V43M-33 34V43M33 34V43M46 34V43M59 34V43" stroke="#9a744a" stroke-width="1.5"/>';
ART.temple='<path d="M-59 40H59V52H-59ZM-49 30H49V40H-49Z" fill="#eee3c3"/><path d="M-39 4H39V30H-39ZM-27-20H27V1H-27ZM-16-42H16V-24H-16Z" fill="#b77850"/>'+[[-56,4,-20],[-43,-20,-42],[-29,-42,-61]].map(([x,y,peak])=>`<path d="M${x} ${y}Q${x/2} ${y-3} 0 ${peak}Q${-x/2} ${y-3} ${-x} ${y}L${-x-5} ${y+5}H${x+5}Z" fill="#4d7382"/><path d="M${x+7} ${y+1}H${-x-7}" stroke="#d4ad62" stroke-width="2"/>`).join('')+'<path d="M-29 8V28M-10 8V28M10 8V28M29 8V28M-18-16V-4M0-16V-4M18-16V-4M0-36V-27" stroke="#edd397" stroke-width="3"/><circle cy="-64" r="4" fill="#d4ad62"/><path d="M-52 42V49M-39 42V49M-26 42V49M26 42V49M39 42V49M52 42V49" stroke="#9a744a" stroke-width="1.5"/>';
function cardArt(id){
 const card=CATALOG.find(item=>item.id===id);
 const artwork=(ART[card?.art||id]||ART.tea).replace(/#[0-9a-f]{6}/gi,hex=>{
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255),max=Math.max(...rgb),min=Math.min(...rgb),light=(max+min)/2;
  if(light>.82)return '#fff3d5';
  if(light<.28)return '#303329';
  const d=max-min;if(d<.035)return hex;
  let hue=(max===rgb[0]?(rgb[1]-rgb[2])/d+(rgb[1]<rgb[2]?6:0):max===rgb[1]?(rgb[2]-rgb[0])/d+2:(rgb[0]-rgb[1])/d+4)*60;
  return `hsl(${hue.toFixed(1)},${Math.max(50,Math.min(78,d/(1-Math.abs(2*light-1))*100+24)).toFixed(1)}%,${Math.min(76,light*100+6).toFixed(1)}%)`;
 });
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-83 -83 166 166"><defs><filter id="sticker" x="-30%" y="-30%" width="160%" height="170%"><feMorphology in="SourceAlpha" operator="dilate" radius="3.8" result="edge"/><feFlood flood-color="#fffdf2"/><feComposite in2="edge" operator="in" result="white"/><feDropShadow in="white" dx="0" dy="2" stdDeviation="1.2" flood-color="#503c29" flood-opacity=".25"/><feMerge><feMergeNode/><feMergeNode in="white"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#sticker)" stroke="#37362b" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" paint-order="stroke fill">${artwork}</g></svg>`;
}
function cityArt(){if(CITY.id!=='chengdu')return cityPanorama(CITY);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" role="img" aria-label="成都茶馆插画：青瓦院落、盖碗茶和竹影"><rect width="800" height="360" fill="#dbe0c9"/><circle cx="620" cy="90" r="54" fill="#eacb8e"/><path d="M0 190Q120 75 270 175T540 160T800 160V360H0" fill="#bccab3"/><path d="M0 250Q130 155 300 215T570 210T800 185V360H0" fill="#9eB6a0"/><path d="M90 310V191H320V310" fill="#e9dfbf"/><path d="M62 192L110 150H299L347 192Z" fill="#436c5e"/><path d="M75 177Q160 183 181 140H234Q253 183 335 177" fill="#5c7d66"/><path d="M140 310V224H192V310M226 310V224H278V310" fill="#8d9d84"/><path d="M155 235H177V310M241 235H263V310" fill="#4d7060"/><path d="M90 213H320" stroke="#bba886" stroke-width="6"/><path d="M80 329H350" stroke="#c4b78f" stroke-width="14"/><path d="M0 334H800V360H0" fill="#587760"/><g transform="translate(590 246) scale(1.7)">${ART.tea}</g><g transform="translate(740 100) scale(1.6)">${ART.bamboo}</g><path d="M112 193V213M298 193V213" stroke="#86664b" stroke-width="2"/><ellipse cx="112" cy="220" rx="10" ry="15" fill="#bf7150"/><ellipse cx="298" cy="220" rx="10" ry="15" fill="#bf7150"/><text x="395" y="80" fill="#466958" font-family="serif" font-size="26" letter-spacing="10">闲坐 · 吃茶</text><text x="397" y="104" fill="#668370" font-family="sans-serif" font-size="9" letter-spacing="4">A SLOW AFTERNOON</text></svg>`;}
function cityPanorama(city){
 const wuhan=city.id==='wuhan',background=wuhan?'#d8e4dc':'#e9dfcc',motif=ART[city.motif];
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" role="img" aria-label="${city.name}城市主题插画"><rect width="800" height="360" fill="${background}"/><circle cx="615" cy="80" r="48" fill="#e5bf78"/><path d="M0 243Q160 130 300 220T590 175T800 210V360H0" fill="${wuhan?'#a1bcb3':'#c6b69a'}"/><path d="M0 291Q170 235 400 270T800 253V360H0" fill="${wuhan?'#7eaaa8':'#ae9f82'}"/><g transform="translate(235 213) scale(2.45)">${motif}</g><g transform="translate(595 255) scale(1.4)">${ART[wuhan?'bridge':'wall']}</g><text x="424" y="112" fill="${city.color}" font-size="28" font-family="serif" letter-spacing="7">${city.theme}</text><text x="426" y="142" fill="${city.color}" font-size="10" letter-spacing="4">${city.en} / A CITY TO REMEMBER</text><path d="M0 344H800" stroke="${city.color}" stroke-width="32"/></svg>`;
}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
class DartScene {
 constructor(canvas,callbacks){
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.callbacks=callbacks;this.active=false;this.raf=0;
  this.images={};

  this.width=DARTBOARD.size;this.height=DARTBOARD.size;
  this.aim=boardPoint(20,130);
 }
 setLayout(){
  // A square coordinate system preserves all impacts when the device rotates.
  if(this.canvas.width!==this.width||this.canvas.height!==this.height){this.canvas.width=this.width;this.canvas.height=this.height;}
 }
 prepareCityImages(){
  const tiles=this.images={};
  for(const card of cityCatalog()){
   const image=new Image();
   image.onload=()=>{const tile=document.createElement('canvas');tile.width=220;tile.height=220;tile.getContext('2d').drawImage(image,0,0,220,220);tiles[card.id]=tile;};
   image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(cardArt(card.id));
  }
 }
 start(){this.stop();this.prepareCityImages();this.active=true;this.reading=false;this.remaining=CONFIG.darts;this.score=0;this.hits=0;this.streak=0;this.maxStreak=0;this.collected=new Set();this.stuck=[];this.flight=null;this.charging=false;this.settle=0;this.lastMove=0;this.aim=boardPoint(20,130);this.callbacks.change(this);this.frame(performance.now());}
 stop(){this.active=false;this.reading=false;this.charging=false;this.settle=0;this.flight=null;cancelAnimationFrame(this.raf);}
 begin(now=performance.now()){
  if(!this.active||this.reading||this.flight||this.charging||this.remaining<=0)return false;
  this.charging=true;this.holdStart=now;this.lastMove=now;this.settle=0;this.readyBuzz=false;
  this.callbacks.sound('charge');return true;
 }
 move(dx,dy,now=performance.now()){
  if(!this.charging)return;
  this.aim.x=clamp(this.aim.x+dx,15,this.width-15);
  this.aim.y=clamp(this.aim.y+dy,45,this.height-65);
  if(Math.hypot(dx,dy)>.3){this.lastMove=now;this.settle=0;this.readyBuzz=false;}
 }
 aimPoint(){return {...this.aim};}
 cancel(){this.charging=false;this.settle=0;this.callbacks.change(this);}
 throw(now=performance.now()){
  if(!this.active||this.reading||!this.charging||this.flight)return false;
  if(now-this.holdStart<CONFIG.minHoldMs){this.cancel();this.callbacks.message('按住滑动瞄准，再松手投镖');return false;}
  const aim=this.aimPoint();this.flight={start:now,x:aim.x,y:aim.y};
  this.remaining--;this.charging=false;this.settle=0;
  this.callbacks.sound('throw');this.callbacks.message('飞镖飞行中…');this.callbacks.change(this);return true;
 }
 land(now){
  const f=this.flight;if(!f)return;this.flight=null;const hit=scoreImpact(f.x,f.y);
  this.stuck.push({x:f.x,y:f.y,time:now,hit:!!hit.target});
  this.score+=hit.points;this.streak=hit.bull?this.streak+1:0;this.maxStreak=Math.max(this.maxStreak,this.streak);
  const firstThisRound=hit.target&&!this.collected.has(hit.target.id);
  if(hit.target){this.hits++;this.collected.add(hit.target.id);this.callbacks.collect(hit.target.id);this.callbacks.sound(hit.bull?'bull':'hit');this.callbacks.message(`${hit.label} · ${hit.target.name} +${hit.points}${this.streak>1?' · 连续牛眼 '+this.streak:''}`);}
  else{this.callbacks.sound('miss');this.callbacks.message('擦肩而过 · 看落点调整下一镖');}
  this.reading=!!hit.target;
  this.callbacks.change(this);
  if(hit.target)this.callbacks.introduce(hit.target,{points:hit.points,bull:hit.bull,label:hit.label,firstThisRound});
  else if(this.remaining===0){this.active=false;this.callbacks.finish(this);}
 }
 continueAfterStory(){
  if(!this.active||!this.reading)return;
  this.reading=false;
  if(this.remaining===0){this.active=false;this.callbacks.finish(this);}
  this.callbacks.change(this);
 }
 frame(now){
  if(!this.active)return;
  if(this.charging){this.settle=clamp((now-this.lastMove)/CONFIG.settleMs,0,1);if(this.settle===1&&!this.readyBuzz){this.readyBuzz=true;this.callbacks.stable();}}
  if(this.flight&&now-this.flight.start>=CONFIG.flightMs)this.land(now);
  this.draw(now);this.callbacks.gesture(this);
  if(this.active)this.raf=requestAnimationFrame(t=>this.frame(t));
 }
 drawDart(ctx,x,y,scale,shake=0){ctx.save();ctx.translate(x,y);ctx.rotate(-.5+shake);ctx.scale(scale,scale);ctx.shadowColor='#25372e50';ctx.shadowBlur=3;ctx.shadowOffsetX=4;ctx.shadowOffsetY=4;ctx.strokeStyle='#cbd3ce';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-43);ctx.stroke();ctx.fillStyle='#c26848';ctx.beginPath();ctx.moveTo(0,-29);ctx.lineTo(-12,-49);ctx.lineTo(-10,-68);ctx.lineTo(0,-53);ctx.lineTo(10,-68);ctx.lineTo(12,-49);ctx.closePath();ctx.fill();ctx.strokeStyle='#466357';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,-13);ctx.lineTo(0,-33);ctx.stroke();ctx.restore();}
 paintBoard(c){
  const b=DARTBOARD,palette=CITY_PALETTES[CITY.id];c.clearRect(0,0,this.width,this.height);
  const mix=(a,z,t)=>'#'+[1,3,5].map(k=>Math.round(parseInt(a.slice(k,k+2),16)*(1-t)+parseInt(z.slice(k,k+2),16)*t).toString(16).padStart(2,'0')).join('');
  const colors=['#ffae8c','#ffe6a7','#65c1c2','#a4d194','#c5e8cf','#83c1d7','#ffd17d','#ffa998','#fff0c4'];
  c.fillStyle=palette.paper;c.fillRect(0,0,this.width,this.height);
  c.save();c.translate(b.cx,b.cy);
  const diskRadius=b.doubleOuter*b.scale;
  // Broken rainbow trim, like the supplied travel-sticker reference.
  for(let ring=0;ring<3;ring++)for(let i=0;i<6;i++){
   c.beginPath();c.arc(0,0,333+ring*6,i*Math.PI/3+.025,(i+1)*Math.PI/3-.025);
   c.strokeStyle=['#7dd8cf','#ffc15d','#f49eae'][(i+ring)%3];c.lineWidth=ring===1?2:3;c.lineCap='round';c.stroke();
  }
  c.beginPath();c.arc(0,0,diskRadius+5,0,Math.PI*2);c.fillStyle='#fff9e5';c.fill();
  c.strokeStyle='#e8b862';c.lineWidth=2;c.stroke();
  const groups=[];
  for(let i=0;i<20;i++){
   const id=b.topics[i],last=groups[groups.length-1];
   if(last?.id===id)last.end=i;else groups.push({id,start:i,end:i});
  }
  const wedge=(start,end,inner,outer,color)=>{c.beginPath();c.arc(0,0,outer,start,end);c.arc(0,0,inner,end,start,true);c.closePath();c.fillStyle=color;c.fill();};
  const offset=CITIES.indexOf(CITY)%9;
  for(let i=0;i<groups.length;i++){
   const g=groups[i],start=-Math.PI/2+(g.start-.5)*Math.PI/10,end=-Math.PI/2+(g.end+.5)*Math.PI/10;
   wedge(start+.004,end-.004,0,diskRadius,mix(colors[(i+offset)%9],palette.accent,.055));
   c.strokeStyle='#fff9e7';c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(start)*diskRadius,Math.sin(start)*diskRadius);c.stroke();
  }
  // Fine white multiplier outlines preserve exact scoring without heavy belts.
  for(const radius of [b.trebleInner,b.trebleOuter,b.doubleInner]){
   c.beginPath();c.arc(0,0,radius*b.scale,0,Math.PI*2);c.strokeStyle='#fffdf04a';c.lineWidth=1;c.stroke();
  }
  for(let i=0;i<100;i++){
   const angle=-Math.PI/2+i*Math.PI/50,outer=diskRadius-7,inner=outer-(i%5===0?13:7);
   c.beginPath();c.moveTo(Math.cos(angle)*inner,Math.sin(angle)*inner);c.lineTo(Math.cos(angle)*outer,Math.sin(angle)*outer);
   c.strokeStyle='#fffdf0';c.lineWidth=i%5===0?3:1.7;c.stroke();
  }
  c.textAlign='center';c.textBaseline='middle';
  for(let i=0;i<20;i++){
   const angle=-Math.PI/2+i*Math.PI/10;
   c.fillStyle=palette.ink;c.font='bold 12px sans-serif';c.fillText(String(b.numbers[i]),Math.cos(angle)*322,Math.sin(angle)*322);
  }
  for(const g of groups){
   const angle=-Math.PI/2+(g.start+g.end)/2*Math.PI/10,x=Math.cos(angle)*222,y=Math.sin(angle)*222;
   const target=CATALOG.find(card=>card.id===g.id),im=this.images[g.id];
   if(im?.width)c.drawImage(im,x-73,y-85,146,146);
   const name=({'侵华日军第七三一部队罪证陈列馆':'七三一罪证陈列馆','打狗英国领事馆文化园区':'打狗英国领事馆'})[target.name]||target.name,split=Math.ceil(name.length/2),lines=name.length>6?[name.slice(0,split),name.slice(split)]:[name];
   c.font='900 '+(name.length>6?'18':'21')+'px Microsoft YaHei';c.textAlign='center';c.textBaseline='middle';
   c.lineJoin='round';c.strokeStyle='#fff8e5';c.lineWidth=4.5;c.fillStyle='#302e29';
   lines.forEach((line,i)=>{c.strokeText(line,x,y+58+i*21);c.fillText(line,x,y+58+i*21);});
   if(this.collected?.has(g.id)){
    c.save();c.translate(x+48,y-61);c.rotate(.15);c.fillStyle='#fff9e5';c.fillRect(-12,-12,24,24);c.strokeStyle=palette.green;c.lineWidth=2;c.strokeRect(-12,-12,24,24);
    c.fillStyle=palette.green;c.font='bold 21px sans-serif';c.fillText('✓',0,1);c.restore();
   }
  }
  c.save();c.shadowColor='#57452e33';c.shadowBlur=8;c.shadowOffsetY=3;
  c.beginPath();c.arc(0,0,57,0,Math.PI*2);c.fillStyle='#fff9e6';c.fill();c.restore();
  for(let i=0;i<4;i++){
   c.beginPath();c.arc(0,0,50,i*Math.PI/2,(i+1)*Math.PI/2);c.strokeStyle=['#f29c72','#64bec1','#a7d197','#ffd179'][i];c.lineWidth=4;c.stroke();
  }
  c.fillStyle=palette.ink;c.font='bold 15px Microsoft YaHei';c.fillText(CITY.name,0,-35);
  c.beginPath();c.arc(0,0,b.outerBull*b.scale,0,Math.PI*2);c.fillStyle='#ffe1a6';c.fill();
  c.beginPath();c.arc(0,0,b.innerBull*b.scale,0,Math.PI*2);c.fillStyle='#ed955c';c.fill();
  c.fillStyle='#6e5438';c.font='10px sans-serif';c.fillText('25 / 50',0,36);
  // Small illustrated pointer caps the wheel; it is decorative, not a new control.
  c.save();c.translate(0,-326);c.beginPath();c.moveTo(0,25);c.bezierCurveTo(-5,11,-19,-12,-12,-21);c.bezierCurveTo(-5,-34,12,-31,15,-18);c.bezierCurveTo(18,-8,5,14,0,25);c.fillStyle='#ffbc53';c.fill();c.strokeStyle='#a64e35';c.lineWidth=2;c.stroke();c.restore();
  c.restore();
 }
 draw(now){
  const c=this.ctx,key=CITY.id+'|'+Object.keys(this.images).length+'|'+this.collected.size;
  if(this.boardCacheKey!==key){
   if(!this.boardCache){this.boardCache=document.createElement('canvas');this.boardCache.width=this.width;this.boardCache.height=this.height;}
   this.paintBoard(this.boardCache.getContext('2d'));this.boardCacheKey=key;
  }
  c.clearRect(0,0,this.width,this.height);c.drawImage(this.boardCache,0,0);
  for(const d of this.stuck){const age=Math.max(0,now-d.time);this.drawDart(c,d.x,d.y,.72,age<400?Math.sin(age*.08)*.12*(1-age/400):0);if(age<700){c.strokeStyle=d.hit?'#f9f1c9':'#8e644a';c.lineWidth=2;c.globalAlpha=1-age/700;c.beginPath();c.arc(d.x,d.y,8+age/24,0,Math.PI*2);c.stroke();c.globalAlpha=1;}}
  if(this.flight){const f=this.flight,t=clamp((now-f.start)/CONFIG.flightMs,0,1),x=this.width*.55+(f.x-this.width*.55)*t,y=this.height+30+(f.y-this.height-30)*t-Math.sin(t*Math.PI)*85;this.drawDart(c,x,y,1.9-t*1.18);}
  else if(this.active){const a=this.aimPoint(now);c.strokeStyle=this.charging&&this.settle===1?'#f4ce58':'#f4f6ee';c.lineWidth=2;c.beginPath();c.arc(a.x,a.y,10+(this.charging?12*(1-this.settle):0),0,Math.PI*2);c.stroke();c.strokeStyle='#fff9e8';c.lineWidth=2;c.beginPath();c.arc(a.x,a.y,12,0,Math.PI*2);c.stroke();c.fillStyle='#233e35';c.beginPath();c.arc(a.x,a.y,2.5,0,Math.PI*2);c.fill();
   c.save();c.translate(this.width-85,this.height-1);c.fillStyle='#d6aa7b';c.beginPath();c.ellipse(0,0,25,48,-.3,0,Math.PI*2);c.fill();c.restore();this.drawDart(c,this.width-100,this.height-38+(this.charging?6:0),1.2);
  }
 }
}
