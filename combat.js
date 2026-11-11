(function(root){
'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const hasTribe=(c,t)=>c.tribe==='모두'||(c.tribe||'').split('/').includes(t);
function BGCombat(input,options={}){
 const rng=options.rng||Math.random,record=options.record!==false,events=[],permanent=[[],[]],next=[null,null],cursor=[0,0],gems=clone(options.gems||[{a:1,h:1},{a:1,h:1}]),auras=[[],[]],manifests=clone(options.manifests||[null,null]),manifestProgress=[0,0],awakened=[false,false],fallenAberrations=[[],[]],damageQueue=[];let serial=0,steps=0;
 const boards=input.map((list,s)=>list.map((card,i)=>{const c=clone(card);c.uid=c.uid||`c${s}-${i}`;c.maxH=c.h;c.printed=clone(c.base||{a:c.a,h:c.h,k:c.k});c.k=c.k||[];return c;}));
 const pick=a=>a[Math.floor(rng()*a.length)],emit=(type,text,extra={})=>{if(record&&(events.length<220||type==='end'))events.push({type,text,boards:clone(boards),manifests:clone(manifests),manifestProgress:manifestProgress.map((deaths,s)=>({deaths,awakened:awakened[s]})),...extra});};
 const buff=(c,a=0,h=0)=>{c.a=Math.max(0,c.a+a);c.h+=h;c.maxH=(c.maxH||c.h-h)+h;};
 function strike(from,to){if(from.a<=0)return;if(to.k.includes('shield')){const charges=to.shieldCharges>0?to.shieldCharges:(to.effect?.shieldHits||1);to.shieldCharges=charges-1;if(to.shieldCharges<=0)to.k=to.k.filter(k=>k!=='shield');return;}to.h-=from.a;if(from.uid&&hasTribe(from,'악마'))damageQueue.push({uid:from.uid,side:boards[0].some(c=>c.uid===from.uid)?0:1});if(from.k.includes('venom')){to.h=0;from.k=from.k.filter(k=>k!=='venom');}}
 function damageRandom(side,amount){const t=pick(boards[1-side].filter(x=>x.h>0));if(t)strike({a:amount,k:[]},t);}
 function manifestBuff(s,a,h){if(!manifests[s])return;manifests[s].a+=a;manifests[s].h+=h;for(const c of boards[s])if(c.isManifest)buff(c,a,h);permanent[s].push({type:'manifestBuff',a,h});}
 function addSummons(s,list,index=boards[s].length){const admitted=list.slice(0,Math.max(0,7-boards[s].length));for(const unit of admitted)for(const aura of auras[s])if(!aura.tribe||hasTribe(unit,aura.tribe))buff(unit,aura.a,aura.h);boards[s].splice(Math.min(index,boards[s].length),0,...admitted);return admitted;}
 function awaken(s){const m=manifests[s];if(!m||awakened[s]||manifestProgress[s]<(m.threshold??4)||boards[s].length>=7)return;awakened[s]=true;const c={...clone(m),name:m.name||(m.id==='cthun'?'크툰':'이샤라즈'),icon:m.icon||(m.id==='cthun'?'👁️':'🐙'),tribe:'돌연변이',tier:1,k:[...(m.k||[])],uid:`manifest-${s}-${++serial}`,isManifest:true,maxH:m.h,effect:clone(m.effect||{}),base:{a:1,h:1,k:[]}};addSummons(s,[c]);if(m.id==='cthun'){const targets=boards[s].filter(x=>x!==c&&x.h>0);if(targets.length){for(let n=0;n<c.a;n++)buff(pick(targets),1,0);for(let n=0;n<c.h;n++)buff(pick(targets),0,1);}}emit('manifest',`${c.name} 현신 각성 · 돌연변이 ${manifestProgress[s]}마리 희생`,{side:s,manifestId:c.uid});}
 function cleanup(){let depth=0;while(depth++<35){for(const hit of damageQueue.splice(0)){for(const c of boards[hit.side]){const e=c.effect?.otherDemonDamageBuff;if(e&&c.uid!==hit.uid&&c.h>0){const g=c.golden?2:1;buff(c,e.a*g,e.h*g);if(e.permanent)permanent[hit.side].push({type:'unitBuff',uid:c.uid,a:e.a*g,h:e.h*g});}}}const deaths=[];for(let s=0;s<2;s++){const t=boards[s],ni=t.findIndex(c=>c.uid===next[s]);if(ni>=0&&t[ni].h<=0){next[s]=null;for(let n=1;n<t.length;n++){const c=t[(ni+n)%t.length];if(c.h>0){next[s]=c.uid;break;}}}boards[s].forEach((c,i)=>{if(c.h<=0)deaths.push({s,c,i});});boards[s]=boards[s].filter(c=>c.h>0);}if(!deaths.length){awaken(0);awaken(1);return;}for(const {s,c,i}of deaths){const e=c.effect||{},g=c.golden?2:1;
  if(hasTribe(c,'돌연변이')&&!c.isManifest){manifestProgress[s]++;const fallen=clone(c);fallen.h=c.maxH;fallen.maxH=c.maxH;fallenAberrations[s].push(fallen);}
  if(e.deathManifestBuff){const d=e.deathManifestBuff,m=d.perSpell?1+(options.spellsCast?.[s]||0):1;manifestBuff(s,(d.a??0)*g*m,(d.h??0)*g*m);}
  if(e.deathBuff){const d=e.deathBuff;if(c.id==='goldrinn')auras[s].push({a:(d.a||0)*g,h:(d.h||0)*g,tribe:d.tribe});let targets=boards[s].filter(x=>!d.tribe||hasTribe(x,d.tribe));if(d.count)targets=targets.length?[pick(targets)]:[];targets.forEach(x=>{buff(x,(d.a||0)*g,(d.h||0)*g);if(d.permanentGolden&&x.golden)permanent[s].push({type:'unitBuff',uid:x.uid,a:(d.a||0)*g,h:(d.h||0)*g});});}
  if(e.deathGrantReborn){const t=pick(boards[s].filter(x=>hasTribe(x,'언데드')&&!x.k.includes('reborn')));if(t)t.k.push('reborn');}
  if(e.deathDamage)for(let n=0;n<(e.deathDamage.count||1)*g;n++)damageRandom(s,e.deathDamage.amount||1);
  if(e.tavernDeathBuff)permanent[s].push({type:'tavernBuff',a:(e.tavernDeathBuff.a||0)*g,h:(e.tavernDeathBuff.h||0)*g});
  const toSummon=[];
  if(e.deathStatGolem||e.deathSummonStats){const a=c.a*g,h=c.maxH*g;toSummon.push({id:'stat-golem',name:'골렘',icon:'🗿',tribe:'중립',tier:1,a,h,maxH:h,k:[],effect:{},uid:`golem-${++serial}`,base:{a,h,k:[]}});}
  if(e.deathSummon){const d=e.deathSummon;for(let n=0;n<(d.count||1)*(d.countScales?g:1);n++)toSummon.push({id:d.id||'token',name:d.name||'소환된 하수인',icon:d.icon||'✦',tribe:d.tribe||c.tribe,tier:1,a:(d.a??1)*g,h:(d.h??1)*g,k:clone(d.k||[]),effect:clone(d.effect||{}),base:{a:(d.a??1)*g,h:(d.h??1)*g,k:d.k||[]},uid:`token-${++serial}`,maxH:(d.h??1)*g});}
  if(c.isManifest&&(c.id==='yshaarj'||e.deathResurrectAberrations)){for(const fallen of fallenAberrations[s].slice(0,(e.deathResurrectAberrations||2)*g)){const unit=clone(fallen);unit.uid=`resurrected-${++serial}`;unit.h=unit.maxH;unit.k=[...new Set([...(unit.base?.k||[]),...unit.k])];toSummon.push(unit);}}
  if(c.k.includes('reborn')){const b=c.base||c.printed;toSummon.push({...clone(c),uid:`reborn-${++serial}`,a:b.a*(c.golden?2:1)+(hasTribe(c,'언데드')?(options.undeadAttack?.[s]||0):0),h:1,maxH:b.h*(c.golden?2:1),k:(b.k||[]).filter(k=>k!=='reborn'),shieldCharges:b.k?.includes('shield')?(e.shieldHits||1):0,gift:null});}
  const admitted=addSummons(s,toSummon,i);awaken(s);
  emit('death',`${c.name} 처치${admitted.length?' · '+admitted.length+'명 소환':''}`,{side:s,deadId:c.uid});
 }} }
 for(let s=0;s<2;s++)for(const c of [...boards[s]]){const e=c.effect||{},g=c.golden?2:1;if(e.combatTeam){const b=e.combatTeam;if(c.id==='humming-bird')auras[s].push({a:(b.a||0)*g,h:(b.h||0)*g,tribe:b.tribe});boards[s].filter(x=>(c.id==='humming-bird'||x!==c)&&(!b.tribe||hasTribe(x,b.tribe))).forEach(x=>buff(x,(b.a||0)*g,(b.h||0)*g));}if(e.combatRandom){const b=e.combatRandom,t=pick(boards[s].filter(x=>x!==c&&(!b.tribe||hasTribe(x,b.tribe))));if(t){buff(t,(b.a||0)*g,(b.h||0)*g);t.k=[...new Set([...t.k,...(b.k||[])])];}}if(e.combatScaling){const b=e.combatScaling,m=1+(c.elementalsPlayed||0);boards[s].filter(x=>x!==c&&(!b.tribe||hasTribe(x,b.tribe))).forEach(x=>buff(x,(b.a||0)*m*g,(b.h||0)*m*g));}if(c.gift){const gift=c.gift.type||c.gift.id;if(gift==='hostility')c.a*=2;if(gift==='resistance'){c.h*=2;c.maxH*=2;}}}
 emit('start','전투 시작');
 let side=boards[0].length===boards[1].length?(rng()<.5?0:1):(boards[0].length>boards[1].length?0:1);
 while(boards[0].length&&boards[1].length&&steps++<400){const t=boards[side];let index=next[side]?t.findIndex(x=>x.uid===next[side]):-1;if(index<0)index=Math.min(cursor[side],Math.max(0,t.length-1));let a=null;for(let n=0;n<t.length;n++){const candidate=t[(index+n)%t.length];if(candidate.a>0){a=candidate;index=(index+n)%t.length;break;}}if(!a){if(!boards[1-side].some(x=>x.a>0))break;side=1-side;continue;}
 const nextUnit=t[(index+1)%t.length];next[side]=nextUnit!==a?nextUnit.uid:null;cursor[side]=index;
 const swings=a.k.includes('wind')?2:1;
 for(let swing=0;swing<swings&&boards[side].includes(a)&&boards[1-side].length;swing++){
  if(!boards[1-side].some(x=>!x.k.includes('stealth')))break;
  a.k=a.k.filter(k=>k!=='stealth');
  const rally=(a.effect||{}).rally;
  if(['mostCommonMinion','getMajorityMinion'].includes(rally?.type))permanent[side].push({type:'getMajorityMinion',count:a.golden?2:1});
  if(rally?.type==='grantVenom'){const candidates=boards[side].filter(c=>c!==a&&(!rally.tribe||hasTribe(c,rally.tribe))&&!c.k.includes('venom'));const count=a.golden?2:1;for(let n=0;n<count&&candidates.length;n++){const t=pick(candidates);t.k.push('venom');candidates.splice(candidates.indexOf(t),1);}}
  if(rally?.type==='manifestBuff')manifestBuff(side,(rally.a??0)*(a.golden?2:1),(rally.h??0)*(a.golden?2:1));
  if(rally){const g=a.golden?2:1;if(rally.type==='teamBuff')boards[side].filter(x=>!rally.tribe||hasTribe(x,rally.tribe)).forEach(x=>buff(x,(rally.a||0)*g,(rally.h||0)*g));if(rally.type==='selfBuff')buff(a,(rally.a||0)*g,(rally.h||0)*g);if(rally.type==='selfGem')buff(a,(gems[side].a||1)*g,(gems[side].h||1)*g);if(rally.type==='gems'){gems[side].a+=(rally.a||1)*g;gems[side].h+=(rally.h||1)*g;permanent[side].push({type:'gemBuff',a:(rally.a||1)*g,h:(rally.h||1)*g});}if(rally.type==='getGem')permanent[side].push({type:'gems',count:g});if(rally.type==='dragonbreath')boards[side].forEach(x=>{const m=(1+(hasTribe(x,'용족')?1:0)+(x.k.includes('shield')?1:0))*g;buff(x,3*m,2*m);});if(rally.type==='damage')damageRandom(side,(rally.amount||1)*g);emit('rally',`${a.name} 집결`,{side});cleanup();if(!boards[1-side].length)break;}
  const enemy=boards[1-side],visible=enemy.filter(x=>!x.k.includes('stealth')),taunts=visible.filter(x=>x.k.includes('taunt'));if(!visible.length)break;const target=pick(taunts.length?taunts:visible),targetIndex=enemy.indexOf(target),retaliation={...target,k:[...target.k]},targetHealth=target.h,ak=[...a.k];
  strike(a,target);strike(retaliation,a);if(target.k.includes('venom')&&!retaliation.k.includes('venom'))target.k=target.k.filter(k=>k!=='venom');
  if(ak.includes('cleave'))for(const adjacent of [enemy[targetIndex-1],enemy[targetIndex+1]].filter(Boolean))strike({a:a.a,k:ak.filter(k=>k!=='venom')},adjacent);
  emit('attack',`${side===0?'아군':'상대'} ${a.name} → ${target.name}`,{side,attackerId:a.uid,targetId:target.uid,damage:a.a,shielded:target.h===targetHealth});
  if(target.h<=0&&a.effect?.murcules){const b=a.effect.murcules,m=a.golden?2:1;permanent[side].push({type:'handBuff',a:b.a*m,h:b.h*m});}if(a.h<=0&&target.effect?.murcules){const b=target.effect.murcules,m=target.golden?2:1;permanent[1-side].push({type:'handBuff',a:b.a*m,h:b.h*m});}
  cleanup();if(a.h>0&&boards[side].includes(a)&&a.effect?.afterAttackHighestDamage&&boards[1-side].length){const most=[...boards[1-side]].sort((x,y)=>y.h-x.h)[0];strike({a:a.a,k:[]},most);emit('ability',`${a.name} → ${most.name} 추가 피해`,{side,attackerId:a.uid,targetId:most.uid});cleanup();}
 }
 side=1-side;
 }
 const result=!boards[0].length&&!boards[1].length?0:!boards[1].length?1:!boards[0].length?-1:0;
 const winner=result===1?0:result===-1?1:null,damage=winner===null?0:(options.tiers?.[winner]||1)+boards[winner].reduce((n,c)=>n+(c.tier||1),0);
 emit('end',result===1?'내 전장 승리':result===-1?'상대 전장 승리':'무승부',{result});return {result,damage,boards,events,log:events.map(x=>x.text),permanent,steps,manifests,manifestProgress};
}
root.BGCombat=BGCombat;if(typeof module!=='undefined')module.exports={BGCombat};
})(typeof window!=='undefined'?window:globalThis);
