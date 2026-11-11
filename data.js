(function(root){
 'use strict';
 const make=(id,name,english,icon,tribe,tier,a,h,k,text,effect={})=>({id,name,english,icon,tribe,tier,a,h,k,text,effect});
 const cards=[
  make('buzzing-vermin','Buzzing Vermin','Buzzing Vermin','🪲','야수',1,1,1,['taunt'],'도발. 죽음의 메아리: 2/2 딱정벌레를 소환합니다.',{deathSummon:{a:2,h:2,count:1,tribe:'야수',name:'딱정벌레',icon:'🪲',k:[]}}),
  make('cord-puller','Cord Puller','Cord Puller','🤖','기계',1,1,1,['shield'],'천상의 보호막. 죽음의 메아리: 1/1 초소형 로봇을 소환합니다.',{deathSummon:{a:1,h:1,count:1,tribe:'기계',name:'초소형 로봇',icon:'🔩',k:[]}}),
  make('crackling-cyclone','짜릿한 회오리','Crackling Cyclone','🌪️','정령',1,2,1,['shield','wind'],'천상의 보호막. 질풍.'),
  make('harmless-bonehead','Harmless Bonehead','Harmless Bonehead','💀','언데드',1,1,1,[],'죽음의 메아리: 1/1 해골을 둘 소환합니다.',{deathSummon:{a:1,h:1,count:2,tribe:'언데드',name:'해골',icon:'💀',k:[]}}),
  make('risen-rider','되살아난 탈것','Risen Rider','🦴','언데드',1,2,1,['taunt','reborn'],'도발. 환생.'),
  make('razorfen-geomancer','가시덩굴 흙점쟁이','Razorfen Geomancer','🐗','가시멧돼지',1,2,1,[],'전투의 함성: 혈석을 2개 얻습니다.',{battlecry:{type:'gems',count:2}}),
  make('dune-dweller','Dune Dweller','Dune Dweller','🏜️','정령',1,3,3,[],'전투의 함성: 이번 게임 동안 선술집의 정령들에게 +1/+1을 부여합니다.',{battlecry:{type:'tavernBuff',a:1,h:1,tribe:'정령'}}),
  make('bubble-gunner','Bubble Gunner','Bubble Gunner','🐟','멀록',1,2,3,[],'전투의 함성: 무작위 보너스 키워드를 얻습니다.',{battlecry:{type:'randomKeyword'}}),
  make('southsea-busker','남쪽바다 거리 연주가','Southsea Busker','🪕','해적',1,3,1,[],'전투의 함성: 다음 턴에 1골드를 얻습니다.',{battlecry:{type:'nextGold',amount:1}}),
  make('glim-guardian','Glim Guardian','Glim Guardian','🐲','용족',1,1,4,[],'집결: 공격력을 +2 얻습니다.',{rally:{type:'selfBuff',a:2,h:0}}),
  make('tusked-camper','Tusked Camper','Tusked Camper','⛺','가시멧돼지',1,2,3,[],'집결: 이 하수인에게 혈석을 냅니다.',{rally:{type:'selfGem'}}),
  make('bronze-warden','청동 감시자','Bronze Warden','🐉','용족',2,2,1,['shield','reborn'],'천상의 보호막. 환생.'),
  make('sellemental','판다네 정령','Sellemental','💧','정령',2,3,3,[],'이 하수인을 팔면 3/3 정령을 얻습니다.',{sellToken:{a:3,h:3,tribe:'정령',name:'물방울',icon:'💧',k:[]}}),
  make('scarlet-skull','진홍십자군 해골','Scarlet Skull','☠️','언데드',2,2,1,['reborn'],'환생. 죽음의 메아리: 아군 언데드에게 +1/+2를 부여합니다.',{deathBuff:{a:1,h:2,tribe:'언데드',count:1}}),
  make('humming-bird','Humming Bird','Humming Bird','🐦','야수',2,1,4,[],'전투 시작: 이번 전투 동안 내 야수들의 공격력이 +1 증가합니다.',{combatTeam:{a:1,h:0,tribe:'야수'}}),
  make('electric-synthesizer','전기 합성사','Electric Synthesizer','🎹','용족',2,3,4,[],'전투의 함성과 전투 시작: 내 다른 용족들에게 +1/+1을 부여합니다.',{battlecry:{type:'teamBuff',a:1,h:1,tribe:'용족'},combatTeam:{a:1,h:1,tribe:'용족'}}),
  make('dark-paradox-t2','Dark Paradox · 2단계','Dark Paradox','🌀','모두',2,6,2,[],'내가 카드를 낼 때마다 생명력을 +2 얻습니다. · 37.0.2',{playHealth:{amount:2}}),
  make('murcules','Murcules','Murcules','🔱','멀록',2,5,3,[],'이 하수인이 하수인을 처치할 때마다 내 손의 하수인 하나에게 +3/+3을 부여합니다. · 37.0.2',{murcules:{a:3,h:3}}),
  make('nerubian-deathswarmer','네루비안 죽음거미','Nerubian Deathswarmer','🕷️','언데드',2,1,4,[],'전투의 함성: 이번 게임 동안 내 언데드들의 공격력이 +1 증가합니다.',{battlecry:{type:'undeadAttack',amount:1}}),
  make('roadboar','길멧돼지','Roadboar','🐗','가시멧돼지',2,2,4,[],'집결: 혈석을 얻습니다.',{rally:{type:'getGem'}}),
  make('annoy-o-module','안녕모듈','Annoy-o-Module','🛡️','기계',3,2,4,['taunt','shield'],'합체. 천상의 보호막. 도발.',{magnetic:true}),
  make('handless-forsaken','손 없는 포세이큰','Handless Forsaken','🧟','언데드',3,2,1,[],'죽음의 메아리: 환생 능력이 있는 2/1 손을 소환합니다.',{deathSummon:{a:2,h:1,count:1,tribe:'언데드',name:'포세이큰의 손',icon:'🖐️',k:['reborn']}}),
  make('mummifier','미라 제작자','Mummifier','⚰️','언데드',3,5,2,[],'죽음의 메아리: 다른 아군 언데드에게 환생을 부여합니다.',{deathGrantReborn:true}),
  make('amber-guardian','호박 수호자','Amber Guardian','🟠','용족',3,3,2,['taunt'],'도발. 전투 시작: 내 다른 용족 하나에게 +2/+2와 천상의 보호막을 부여합니다.',{combatRandom:{a:2,h:2,tribe:'용족',k:['shield']}}),
  make('prosthetic-hand','의수','Prosthetic Hand','🦾','기계/언데드',3,3,1,['reborn'],'합체. 환생. 기계 또는 언데드에게 합체할 수 있습니다.',{magnetic:true,magneticTribes:['기계','언데드']}),
  make('blade-collector','칼날 수집가','Blade Collector','🗡️','해적',4,3,2,['cleave'],'공격하는 대상 양옆의 하수인들에게도 피해를 줍니다.'),
  make('sacrificial-wrathguard','Sacrificial Wrathguard','Sacrificial Wrathguard','👿','악마',4,6,3,[],'죽음의 메아리: 이번 게임 동안 선술집 하수인들에게 +2/+1을 부여합니다. 활성화(1): 강화합니다. · 37.0.2',{tavernDeathBuff:{a:2,h:1},activate:{type:'improveDeath',cost:1,a:2,h:1}}),
  make('twilight-tidehunter','Twilight Tidehunter','Twilight Tidehunter','🐠','멀록',4,3,7,[],'이 하수인에게 주문을 시전할 때마다 내 손의 가장 왼쪽 하수인에게 +9/+9를 부여합니다. · 37.0.2',{targetSpellHand:{a:9,h:9}}),
  make('glambot','Glambot','Glambot','🪩','기계',4,5,5,[],'기계에게 주문을 시전할 때마다 그 기계에 5/5 위성을 합체시킵니다. · 37.0.2',{spellMech:{a:5,h:5}}),
  make('holy-vanguard','Holy Vanguard','Holy Vanguard','✨','중립',4,10,10,['shield'],'천상의 보호막. 내 영웅의 생명력이 15 이하면 +30/+30을 얻습니다.',{lowHealth:{threshold:15,a:30,h:30}}),
  make('living-azerite','살아있는 아제라이트','Living Azerite','💎','정령',5,6,6,[],'선술집 주문을 시전할 때마다 선술집의 정령들에게 +3/+3을 부여합니다. · 37.0.2',{spellElementals:{a:3,h:3}}),
  make('ship-master-eudora','Ship Master Eudora','Ship Master Eudora','🏴‍☠️','해적',5,10,3,[],'죽음의 메아리: 내 하수인들에게 +8/+8을 부여합니다. 황금 하수인은 영구히 얻습니다. · 37.0.2',{deathBuff:{a:8,h:8,permanentGolden:true}}),
  make('sanguine-refiner','Sanguine Refiner','Sanguine Refiner','🩸','가시멧돼지',5,4,9,[],'집결: 이번 게임 동안 내 혈석이 부여하는 능력치가 +1/+1 증가합니다. · 37.0.2',{rally:{type:'gems',a:1,h:1}}),
  make('shamanic-tidecaller','Shamanic Tidecaller','Shamanic Tidecaller','🌊','멀록',5,6,9,[],'멀록에게 주문을 시전할 때마다 내 손과 전장의 멀록들에게 +3/+4를 부여합니다. · 37.0.2',{spellMurlocs:{a:3,h:4}}),
  make('spark-snapper','Spark Snapper','Spark Snapper','⚡','기계',5,8,8,[],'기계를 낼 때마다 그 기계에 2/2 위성을 합체시키고 이 효과를 강화합니다. · 37.0.2',{playMechSatellite:{a:2,h:2}}),
  make('goldrinn','위대한 늑대 골드린','Goldrinn, the Great Wolf','🐺','야수',5,7,7,[],'죽음의 메아리: 다음 턴까지 내 야수들에게 +7/+7을 부여합니다.',{deathBuff:{a:7,h:7,tribe:'야수'}}),
  make('bile-spitter','Bile Spitter','Bile Spitter','🧪','멀록',5,1,10,['venom'],'독소. 집결: 다른 아군 멀록에게 독소를 부여합니다.',{rally:{type:'grantVenom',tribe:'멀록'}}),
  make('crimson-vindicator','Crimson Vindicator','Crimson Vindicator','🔴','용족',6,9,7,['shield','wind'],'천상의 보호막. 질풍. 집결: 강력한 용의 숨결을 시전합니다. · 37.0.2',{rally:{type:'dragonbreath'}}),
  make('ultraviolet-ascendant','Ultraviolet Ascendant','Ultraviolet Ascendant','🔮','정령',6,8,8,[],'전투 시작: 내 다른 정령들에게 +4/+4를 부여합니다. 정령을 낼 때마다 강화됩니다. · 37.0.2',{combatScaling:{a:4,h:4,tribe:'정령',perPlay:true}}),
  make('unbound-tempest','Unbound Tempest','Unbound Tempest','🌩️','정령',6,3,9,[],'정령을 3번 낸 후 선술집에서 생명력이 가장 높은 하수인의 능력치를 얻습니다. · 37.0.2',{elementalProgress:{count:3}})
 ];
 // Official Korean names, transcribed from Blizzard's Korean patch notes and card library.
 const koreanNames={
  'buzzing-vermin':'윙윙거리는 해충','cord-puller':'코드 뽑는 로봇','harmless-bonehead':'무해한 해골바가지','risen-rider':'되살아난 기수','dune-dweller':'모래살이','bubble-gunner':'풍선검 사수','southsea-busker':'남쪽바다 악사','glim-guardian':'등불 수호자','tusked-camper':'엄니 야영자','scarlet-skull':'진홍빛 해골','humming-bird':'지저귀는 새','electric-synthesizer':'전자음악 합성연주가','dark-paradox-t2':'어둠의 모순','murcules':'멀로클레스','mummifier':'미라 활성가','prosthetic-hand':'로봇 의수','amber-guardian':'호박색 수호자','sacrificial-wrathguard':'희생의 격노수호병','twilight-tidehunter':'황혼의 바다사냥꾼','glambot':'호화로봇','holy-vanguard':'신성한 선봉대원','living-azerite':'살아 있는 아제라이트','ship-master-eudora':'함선의 지배자 유도라','sanguine-refiner':'핏빛 정제사','shamanic-tidecaller':'주술적 파도술사','spark-snapper':'불꽃 덥썩이','bile-spitter':'담즙뱉기 지네','crimson-vindicator':'진홍빛 구원자','ultraviolet-ascendant':'자외선 승천자','unbound-tempest':'속박 풀린 폭풍우'
 };
 cards.forEach(c=>{if(koreanNames[c.id])c.name=koreanNames[c.id];c.text=c.text.replaceAll('전투 시작:','기선 제압:').replaceAll('활성화(1):','사용 (1):').replaceAll('강력한 용의 숨결','강력한 용숨결');if(c.id==='handless-forsaken')c.effect.deathSummon.name='도움의 손길';});
 cards.find(c=>c.id==='crackling-cyclone').name='파지직거리는 회오리';
 cards.push(
  make('joyous','희락','Joyous','👁️','돌연변이',1,2,3,[],'전투의 함성: 내 현신에게 +2/+1을 부여합니다.',{battlecry:{type:'manifestBuff',a:2,h:1}}),
  make('zoatroid','조아트로이드','Zoatroid','🦑','돌연변이',1,3,2,[],'이 하수인을 팔면 도발 능력이 있는 0/2 촉수를 얻습니다.',{sellToken:{a:0,h:2,tribe:'돌연변이',name:'돌연변이 촉수',icon:'🐙',k:['taunt']}}),
  make('brain-rotter','뇌수 부패자','Brain Rotter','🧠','돌연변이',2,3,4,[],'사용 (0): 카드를 버리고 내 현신에게 +2/+2를 부여합니다.',{activate:{type:'discardManifest',cost:0,requiresDiscard:true,a:2,h:2}}),
  make('underrot-spawn','썩은굴 피조물','Underrot Spawn','🦠','돌연변이',2,2,2,[],'죽음의 메아리: 도발 능력이 있는 0/2 촉수를 소환합니다. 내 하수인들에게 공격력을 +1 부여합니다.',{deathSummon:{a:0,h:2,count:1,tribe:'돌연변이',name:'돌연변이 촉수',icon:'🐙',k:['taunt']},deathBuff:{a:1,h:0}}),
  make('drifting-sacrifice','방황하는 제물','Drifting Sacrifice','🕯️','돌연변이',3,2,1,['reborn'],'환생. 죽음의 메아리: 내 현신에게 +2/+2를 부여합니다.',{deathManifestBuff:{a:2,h:2}}),
  make('vicious-mindslasher','흉포한 정신절단자','Vicious Mindslasher','🗡️','돌연변이',3,1,2,[],'내가 선술집 주문을 시전할 때마다 이 하수인과 내 현신에게 +1/+2를 부여합니다.',{spellSelfManifest:{a:1,h:2}}),
  make('cutthroat-kthir','칼잡이 크시르',"Cutthroat K'Thir",'🦑','돌연변이',4,4,4,[],'내가 카드를 버릴 때마다 이 하수인과 내 현신에게 +4/+4를 부여합니다.',{discardSelfManifest:{a:4,h:4}}),
  make('parasitic-fleshling','새끼 기생 살덩이괴물','Parasitic Fleshling','🫀','돌연변이',4,4,6,[],'내 턴이 끝날 때 가장 왼쪽에 있는 내 하수인에게 +2/+2를 부여합니다. 이번 게임에서 버린 카드의 수만큼 강화됩니다.',{endLeftBuff:{a:2,h:2,perDiscard:true}}),
  make('faceless-converter','얼굴 없는 변환사','Faceless Converter','🎭','돌연변이',5,5,5,[],'죽음의 메아리: 내 현신에게 +2/+1을 부여합니다. 이번 게임에서 시전한 선술집 주문의 수만큼 강화됩니다.',{deathManifestBuff:{a:2,h:1,perSpell:true}}),
  make('harbinger-aphlass','선구자 아프라스',"Harbinger Aph'lass",'🔮','돌연변이',5,3,6,[],'내가 카드를 버릴 때마다 내 현신에게 +1/+1을 부여하고 이 하수인을 강화합니다.',{discardManifestScaling:{a:1,h:1}}),
  make('shadow-of-doubt','의심의 그림자','The Shadow of Doubt','🌑','돌연변이',6,6,8,[],'내 손으로 카드를 가져올 때마다 내 현신에게 +4/+5를 부여합니다.',{cardGainManifest:{a:4,h:5}}),
  make('wrath-weaver','분노의 명인','Wrath Weaver','👿','악마',1,1,3,[],'내가 악마를 낸 후에 내 영웅에게 피해를 1 주고 +2/+2를 얻습니다.',{playDemonSelf:{a:2,h:2,damage:1}}),
  make('soul-rewinder','영혼 역행자','Soul Rewinder','⏪','악마',2,4,2,[],'내 영웅이 피해를 받은 후 그 피해를 되돌리고 생명력을 +2 얻습니다.',{rewindHero:{h:2}}),
  make('devout-hellcaller','헌신적인 지옥소환사','Devout Hellcaller','🦇','악마',3,4,4,[],'다른 아군 악마가 피해를 준 후에 영구히 +2/+2를 얻습니다.',{otherDemonDamageBuff:{a:2,h:2,permanent:true}}),
  make('insatiable-urzul','허기진 우르줄',"Insatiable Ur'zul",'👹','악마',5,4,6,['taunt'],'도발. 내가 악마를 낸 후에 선술집의 무작위 하수인을 잡아먹어 능력치를 얻습니다.',{playDemonConsume:true}),
  make('deft-deserter','날렵한 탈영병','Deft Deserter','😈','악마',5,8,8,[],'사용 (1): 선술집의 모든 하수인에게 +8/+8과 도발, 천상의 보호막 또는 질풍을 부여합니다.',{activate:{type:'shopBuff',cost:1,a:8,h:8,randomKeyword:true}}),
  make('suspicious-prisonguard','수상한 감옥 경비병','Suspicious Prisonguard','🗝️','중립',1,3,3,[],'사용 (1): 다른 하수인에게 +3/+3을 부여합니다.',{activate:{type:'targetBuff',cost:1,a:3,h:3}}),
  make('deadly-spore','치명적인 포자','Deadly Spore','🍄','중립',3,1,1,['venom'],'독소.')
 );
 const tribes=['야수','악마','용족','정령','기계','멀록','해적','가시멧돼지','언데드','돌연변이'];
 const manifests=[
  {id:'cthun',name:'크툰',english:"C'Thun",icon:'👁️',tribe:'돌연변이',tier:1,a:1,h:1,k:['manifest'],isManifest:true,text:'현신. 깨어난 후 이 하수인의 능력치를 내 다른 하수인들에게 나누어 부여합니다.',effect:{manifestAwaken:{type:'distributeStats'}}},
  {id:'yshaarj',name:'이샤라즈',english:"Y'Shaarj",icon:'🐙',tribe:'돌연변이',tier:1,a:1,h:1,k:['manifest'],isManifest:true,text:'현신. 죽음의 메아리: 이번 전투에서 가장 먼저 죽은 내 돌연변이 2마리를 최대 능력치로 소환합니다. (현신 제외)',effect:{deathResurrectAberrations:2}}
 ];
 // One eligible version is selected for the entire lobby, before the shared pool is built.
 const paradoxVariants=[
  {...make('dark-paradox-t2','어둠의 모순','Dark Paradox','🌀','모두',2,6,2,[],'내가 카드를 낼 때마다 생명력을 +2 얻습니다. · 37.0.2',{playHealth:{amount:2}}),dbfId:134704,giftName:'단단한 방패'},
  {...make('dark-paradox-t3','어둠의 모순','Dark Paradox','🌀','모두',3,4,4,[],'이번 게임에서 내가 전투의 함성을 발동시킬 때마다 +4/+4를 얻습니다. (어디에 있든) · 37.0.2',{battlecryScaling:{a:4,h:4,wherever:true}}),dbfId:134710,giftName:'전쟁의 상흔'},
  {...make('dark-paradox-t4','어둠의 모순','Dark Paradox','🌀','모두',4,2,6,[],'집결: 내가 가장 많이 보유한 종족의 무작위 하수인을 얻습니다.',{rally:{type:'mostCommonMinion'}}),dbfId:134708,giftName:'카리스마'},
  {...make('dark-paradox-t5','어둠의 모순','Dark Paradox','🌀','모두',5,8,4,['shield'],'천상의 보호막. 이 하수인의 천상의 보호막이 3번 피해를 받아야 부서집니다.',{shieldHits:3}),dbfId:134706,giftName:'토레스의 축복',bannedTribes:['언데드'],bannedDeities:['yshaarj']},
  {...make('dark-paradox-t6','어둠의 모순','Dark Paradox','🌀','모두',6,10,2,[],'죽음의 메아리: 이 하수인의 능력치를 가진 골렘을 소환합니다.',{deathStatGolem:true}),dbfId:134716,giftName:'골렘술',bannedDeities:['yshaarj']}
 ].map(c=>({...c,paradox:true,family:'dark-paradox',variantLabel:c.tier+'단계 · '+c.giftName}));
 const heroes=[
 {id:'alakir',name:'알아키르',english:"Al'Akir",icon:'🌪️',armor:15,power:{name:'파리 같은 놈들',cost:0,type:'alakir',passive:true,text:'기선 제압: 가장 왼쪽 하수인에게 질풍, 천상의 보호막, 도발을 부여합니다.'}},
 {id:'lichking',name:'리치 왕',english:'The Lich King',icon:'👑',armor:14,power:{name:'환생 의식',cost:0,type:'reborn',text:'아군 하수인 하나에게 다음 턴까지 환생을 부여합니다.'}},
 {id:'reno',name:'리노 잭슨',english:'Reno Jackson',icon:'💰',armor:12,power:{name:'부자가 될 거야!',cost:0,type:'golden',once:true,text:'아군 하수인 하나를 황금 하수인으로 만듭니다. (게임당 1회)'}},
 {id:'patchwerk',name:'패치워크',english:'Patchwerk',icon:'🧟',armor:0,power:{name:'더 놀아줘!',cost:0,type:'extraHealth',amount:30,passive:true,text:'생명력이 30 높은 상태로 시작합니다.'}},
 {id:'pyramad',name:'피라마드',english:'Pyramad',icon:'🧱',armor:14,power:{name:'벽돌 쌓기',cost:2,type:'randomBuyHealth',text:'선술집의 무작위 하수인 하나를 가져옵니다. 그 하수인의 생명력이 2배가 됩니다.'}},
 {id:'sindragosa',name:'신드라고사',english:'Sindragosa',icon:'❄️',armor:10,power:{name:'싸늘하게',cost:0,type:'sindragosa',passive:true,text:'하수인 비용이 2골드입니다. 선술집 하수인이 하나 줄고 턴 종료 시 선술집이 빙결됩니다.'}},
 {id:'nozdormu',name:'노즈도르무',english:'Nozdormu',icon:'⏳',armor:13,power:{name:'투시',cost:0,type:'freeRefreshStart',amount:1,passive:true,text:'내 턴이 시작될 때, 무료 새로고침을 얻습니다.'}},
 {id:'kaelthas',name:'캘타스 선스트라이더',english:"Kael'thas Sunstrider",icon:'🟢',armor:18,power:{name:'신록의 구슬',cost:0,type:'buyCoin',every:3,passive:true,text:'내가 하수인을 셋 산 후에, 선술집 동전을 얻습니다.'}},
 {id:'george',name:'타락한 조지',english:'George the Fallen',icon:'🛡️',armor:15,power:{name:'빛의 은혜',cost:1,type:'shield',target:'board',text:'하수인에게 천상의 보호막을 부여합니다.'}},
 {id:'millificent',name:'밀리피센트 마나스톰',english:'Millificent Manastorm',icon:'🔧',armor:15,requiredTribe:'기계',power:{name:'땜질',cost:1,type:'discoverMagnetic',minTier:4,requiredTribe:'기계',text:'합체 기계를 발견합니다. (선술집 4단계에서 잠금 해제)'}},
 {id:'chenvaala',name:'첸바라',english:'Chenvaala',icon:'🧊',armor:15,requiredTribe:'정령',power:{name:'눈사태',cost:0,type:'elementalDiscount',requiredTribe:'정령',every:3,amount:3,passive:true,text:'내가 정령을 셋 낸 후에, 선술집을 강화하는 비용이 (3) 감소합니다.'}},
 {id:'yogg',name:'희망의 끝 요그사론',english:"Yogg-Saron, Hope's End",icon:'👁️',armor:10,power:{name:'수수께끼 상자',cost:0,type:'randomSpellStart',fromTurn:3,cast:true,passive:true,text:'내 턴이 시작될 때, 무작위 선술집 주문을 시전합니다. (3턴에 잠금 해제)'}},
 {id:'saurfang',name:'대군주 사울팽',english:'Overlord Saurfang',icon:'🪓',armor:15,power:{name:'호드를 위하여!',cost:0,type:'shopBuffProgress',a:1,h:1,every:3,improveA:1,improveH:1,passive:true,text:'선술집에 있는 하수인들이 +1/+1을 얻습니다. 내가 하수인을 3마리 산 후에 개선됩니다.'}},
 {id:'rakanishu',name:'라카니슈',english:'Rakanishu',icon:'🕯️',armor:10,power:{name:'선술집 불빛',cost:0,type:'spellStats',a:1,h:1,everyTurns:3,improveA:1,improveH:1,passive:true,text:'내 선술집 주문들이 +1/+1을 추가로 부여합니다. 3턴이 시작될 때마다 강화됩니다.'}}
 ];
 const spells=[
 {id:'tavern-coin',name:'선술집 동전',icon:'🪙',kind:'spell',tier:1,cost:1,text:'1골드를 얻습니다.',effect:{type:'gold',amount:1}},
 {id:'tavern-dish-banana',name:'선술집 바나나 요리',icon:'🍌',kind:'spell',tier:1,cost:1,text:'하수인에게 +2/+2를 부여합니다.',effect:{type:'buff',a:2,h:2}},
 {id:'misplaced-tea-set',name:'잘못 놓인 다기 세트',icon:'🫖',kind:'spell',tier:4,cost:2,text:'내 하수인 종족마다 하나에게 +3/+3을 부여합니다. · 37.0.2',effect:{type:'eachType',a:3,h:3}},
 {id:'natural-blessing',name:'자연적 축복',icon:'🌿',kind:'spell',tier:4,cost:2,text:'하수인을 선택합니다. 그 하수인과 종족이 같은 모든 하수인에게 +2/+2를 부여합니다. · 37.0.2',effect:{type:'tribeBuff',a:2,h:2}},
 {id:'wave-of-gold',name:'금의 파도',icon:'🌟',kind:'spell',tier:5,cost:2,text:'내 하수인들에게 +3/+3을 부여합니다. 황금 하수인은 추가로 +3/+3을 얻습니다. · 37.0.2',effect:{type:'waveGold',a:3,h:3}}
 ];
 const trinkets=[
 {id:'cursed-crystal',name:'저주받은 수정',icon:'💠',cost:2,turn:6,type:'refreshShopBuff',effect:{type:'refreshShopBuff',a:2,h:2},a:2,h:2,text:'선술집이 새로고침된 후 이번 턴 동안 그 하수인들에게 +2/+2를 부여합니다. · 37.0.2'},
 {id:'nerglish-phrasebook',name:'옳옳어 구문집',english:'Nerglish Phrasebook',icon:'📖',cost:1,turn:6,tribe:'멀록',type:'playHandBuff',effect:{type:'playHandBuff',a:5,h:5},a:5,h:5,text:'하수인을 낸 후 내 손의 가장 왼쪽 하수인에게 +5/+5를 부여합니다. · 37.0.2'},
 {id:'defensive-shell',name:'방어 등딱지',english:'Defensive Shell',icon:'🐚',cost:1,turn:6,type:'firstPlayShield',effect:{type:'firstPlayShield'},text:'내 턴마다 처음 내는 하수인이 천상의 보호막을 얻습니다.'},
 {id:'glowing-crystal',name:'빛나는 수정',english:'Glowing Crystal',icon:'🔮',cost:0,turn:6,type:'startGoldPerType',effect:{type:'startGoldPerType',amount:1},text:'내 턴이 시작될 때, 서로 다른 아군 하수인 종족 하나당 1골드를 얻습니다.'},
 {id:'lovely-locket',name:'사랑스러운 로켓',english:'Lovely Locket',icon:'💝',cost:0,turn:6,type:'repeatFriendlySpell',effect:{type:'repeatFriendlySpell'},text:'내가 아군 하수인에게 주문을 시전한 후에, 이 장신구가 다른 아군 하수인에게 그 주문을 시전합니다.'},
 {id:'goblin-wallet',name:'고블린 지갑',english:'Goblin Wallet',icon:'👛',cost:1,turn:6,type:'endMaxGold',effect:{type:'endMaxGold',amount:1},text:'매 턴이 끝날 때, 내 최대 골드가 1 증가합니다.'},
 {id:'frigid-blossom',name:'혹한의 꽃',english:'Frigid Blossom',icon:'❄️',cost:0,turn:6,tribe:'정령',type:'refreshUpgradeDiscount',effect:{type:'refreshUpgradeDiscount',amount:1},text:'내가 새로고침한 후, 선술집을 강화하는 비용이 (1) 감소합니다.'},
 {id:'miniature-ship',name:'초소형 함선',english:'Miniature Ship',icon:'⛵',cost:1,turn:9,tribe:'해적',type:'spellPirateBuff',effect:{type:'spellPirateBuff',a:4,h:4},a:4,h:4,text:'선술집 주문을 시전한 후 내 해적들에게 +4/+4를 부여합니다. · 37.0.2'},
 {id:'nerglish-phrasebook-greater',name:'옳옳어 구문집',english:'Nerglish Phrasebook',icon:'📚',cost:2,turn:9,tribe:'멀록',type:'playHandBuff',effect:{type:'playHandBuff',a:10,h:10},a:10,h:10,text:'하수인을 낸 후 내 손의 가장 왼쪽 하수인에게 +10/+10을 부여합니다. · 37.0.2'},
 {id:'weighted-gauntlet',name:'추를 넣은 건틀릿',english:'Weighted Gauntlet',icon:'🥊',cost:3,turn:9,type:'endTeamDoubling',effect:{type:'endTeamDoubling',a:7,h:7},a:7,h:7,text:'내 턴이 끝날 때, 내 하수인들에게 +7/+7을 부여합니다. (매 턴이 시작될 때 2배가 됩니다!) · 37.0.2'},
 {id:'bobs-tip-jar',name:'밥의 팁 병',english:"Bob's Tip Jar",icon:'🫙',cost:0,turn:9,type:'gainGoldMax',effect:{type:'gainGoldMax',amount:4},text:'4골드를 얻습니다. 내 최대 골드가 4 증가합니다.'},
 {id:'sphere-of-memory',name:'기억의 구슬',english:'Sphere of Memory',icon:'🔵',cost:2,turn:9,type:'endLastSpellCopies',effect:{type:'endLastSpellCopies',count:3},text:'내 턴이 끝날 때, 내가 마지막으로 시전한 선술집 주문을 3개 복사하여 얻습니다.'},
 {id:'multilayered-shield',name:'겹겹 방패',english:'Multilayered Shield',icon:'🛡️',cost:4,turn:9,type:'spellStatsPerType',effect:{type:'spellStatsPerType',a:1,h:2},a:1,h:2,text:'내 선술집 주문들이 +1/+2를 추가로 부여합니다. (서로 다른 아군 하수인 종족 하나당 강화됩니다!)'},
 {id:'ironforge-anvil',name:'아이언포지 모루',english:'Ironforge Anvil',icon:'⚒️',cost:1,turn:9,type:'combatNoTypeTriple',effect:{type:'combatNoTypeTriple'},text:'기선 제압: 종족이 없는 내 하수인들의 능력치가 3배가 됩니다.'}
 ];
 const gifts=[
 {id:'toughened-shield',name:'단단한 방패',english:'Toughened Shield',icon:'🛡️',turns:[3,5],minTurn:3,maxTurn:5,type:'toughened_shield',amount:2,text:'카드를 낼 때마다 생명력을 +2 얻습니다. 3~5턴에 등장합니다. · 37.0.2'},
 {id:'incubation',name:'배양',english:'Incubation',icon:'🥚',minTurn:6,maxTurn:8,type:'incubation',a:6,h:6,delay:2,text:'+6/+6을 얻습니다. 2턴 후 이 하수인의 능력치가 2배가 됩니다. · 37.0.2'},
 {id:'hostility',name:'적대성',english:'Hostility',icon:'⚔️',minTurn:7,maxTurn:10,type:'hostility',a:15,h:0,text:'공격력을 +15 얻습니다. 기선 제압: 공격력이 2배가 됩니다. · 37.0.2'},
 {id:'resistance',name:'저항',english:'Resistance',icon:'❤️',minTurn:7,maxTurn:10,type:'resistance',a:0,h:15,text:'생명력을 +15 얻습니다. 전투 시작: 생명력이 2배가 됩니다. · 37.0.2'},
 {id:'harpys-talons',name:'하피의 발톱',english:"Harpy's Talons",icon:'🪽',minTurn:3,type:'keywords',k:['shield','wind'],text:'천상의 보호막과 질풍을 얻습니다.'},
 {id:'fortitude',name:'인내',english:'Fortitude',icon:'💪',minTurn:3,maxTurn:3,type:'fortitude',a:5,h:5,text:'+5/+5를 얻습니다. (3턴에만 등장)'},
 {id:'sharpened-sword',name:'날카로운 칼',english:'Sharpened Sword',icon:'🗡️',minTurn:3,maxTurn:5,type:'sharpened_sword',amount:3,text:'카드를 낼 때마다 공격력을 +3 얻습니다.'},
 {id:'steady-growth',name:'지속적인 성장',english:'Steady Growth',icon:'🌱',minTurn:3,maxTurn:5,type:'steady_growth',a:2,h:2,growthByTurn:{3:{a:2,h:2},4:{a:2,h:3},5:{a:3,h:4}},text:'턴 종료 시 능력치를 얻습니다. 획득 턴에 따라 3턴 +2/+2, 4턴 +2/+3, 5턴 +3/+4.'},
 {id:'toxicity',name:'독성',english:'Toxicity',icon:'☠️',minTurn:9,type:'keywords',k:['venom'],tribe:'멀록',text:'독소를 얻습니다. (멀록 전용)'},
 {id:'titanic-strength',name:'티탄급 힘',english:'Titanic Strength',icon:'🗿',minTurn:11,type:'fortitude',a:1000,h:0,text:'공격력을 +1000 얻습니다. (용족 제외)'}
 ];
 const patchChanges=[
 '살아 있는 아제라이트: 6/6, 선술집 정령 강화 +3/+3.',
 '진홍빛 구원자: 9/7, 천상의 보호막과 질풍.',
 '멀로클레스 복귀: 처치 시 손의 하수인에게 +3/+3. 숙련 비행사 제외.',
 '속박 풀린 폭풍우: 3/9, 정령 3회 조건. 자외선 승천자: 8/8, 기본 +4/+4.',
 '어둠의 선물: 배양 +6/+6, 적대성 공격력 +15, 저항 생명력 +15.',
 '7턴부터 어둠의 선물 발견에 최다 종족 하수인을 최소 2개 제시.',
 '선술집 주문: 잘못 놓인 다기 세트 2골드 +3/+3, 금의 파도 +3/+3, 자연적 축복 +2/+2.',
 '장신구: 저주받은 수정 2골드 +2/+2, 옳옳어 구문집 1골드 +5/+5, 초소형 함선 +4/+4.',
 '현신: 36.6.3부터 돌연변이 4마리가 죽으면 깨어납니다. 크툰·이샤라즈는 1단계입니다.',
 '어둠의 모순: 2~6단계의 다섯 변형 중 하나를 게임마다 선택합니다. 종족·현신 금지 조건을 적용합니다.',
 '나가를 제외한 10종족 중 매 게임 5종족을 선택합니다.'
 ];
 const sources=[
 {title:'블리자드 공식 한국어 37.0.2 패치 노트',url:'https://news.blizzard.com/ko-kr/article/24307311/37-0-2'},
 {title:'블리자드 공식 한국어 36.2 영웅 변경',url:'https://hearthstone.blizzard.com/ko-kr/news/24290432'},
 {title:'블리자드 공식 14시즌 장신구 원문',url:'https://us.forums.blizzard.com/en/hearthstone/t/battlegrounds-season-14-trinket-updates/163710'},
 {title:'블리자드 개발팀 장신구 선택지·할인 규칙',url:'https://us.forums.blizzard.com/en/hearthstone/t/battlegrounds-developer-insights-updated-trinket-rules/158955'},
 {title:'블리자드 공식 노즈도르무 현재 능력',url:'https://hearthstone.blizzard.com/en-us/battlegrounds/61489-nozdormu'},
 {title:'블리자드 공식 한국어 36.4.2 영웅 방어도·장신구 비용',url:'https://hearthstone.blizzard.com/ko-kr/news/24296231'},
 {title:'블리자드 공식 밥의 팁 병 강화',url:'https://hearthstone.blizzard.com/en-gb/news/24128997'},
 {title:'블리자드 공식 한국어 장신구·영웅 카드 라이브러리',url:'https://hearthstone.blizzard.com/ko-kr/battlegrounds?viewMode=table'},
 {title:'블리자드 공식 돌연변이·현신 개요',url:'https://hearthstone.blizzard.com/ko-kr/news/24302091'},
 {title:'블리자드 공식 한국어 36.6.3 패치 노트',url:'https://news.blizzard.com/ko-kr/article/24303864/36-6-3'},
 {title:'블리자드 공식 36.6.2 긴급 수정',url:'https://us.forums.blizzard.com/en/hearthstone/t/3662-hotfix-patch/166264/1'},
 {title:'블리자드 공식 36.6.1 모순·현신 금지 조건',url:'https://us.forums.blizzard.com/en/hearthstone/t/3661-hotfix-patch/165846/1'},
 {title:'블리자드 공식 한국어 36.2.2 선물 변경',url:'https://news.blizzard.com/ko-kr/article/24293284/36-2-2'},
 {title:'블리자드 공식 한국어 33.6 영웅 개편',url:'https://hearthstone.blizzard.com/ko-kr/news/24232759'},
 {title:'Blizzard 공식 신드라고사 카드',url:'https://hearthstone.blizzard.com/en-us/battlegrounds/58435-sindragosa'},
 {title:'Blizzard 개발팀 암흑의 선물 규칙',url:'https://us.forums.blizzard.com/en/hearthstone/t/battlegrounds-developer-insight-dark-gifts/163606'},
 {title:'Blizzard 공식 36.4.2 기본 카드·주문 수치',url:'https://news.blizzard.com/en-us/article/24296231/36-4-2-patch-notes'},
 {title:'Blizzard 공식 34.2 선술집 업그레이드·주문 규칙',url:'https://hearthstone.blizzard.com/en-gb/news/24244423'},
 {title:'현재 카드 목록 교차 확인',url:'https://hsbg.cards/patch-notes/37.0.2'}
 ];
 const limitations=['선별한 하수인·영웅·주문·장신구를 사용하는 싱글 플레이 연습판입니다. 전체 공식 카드 풀과 서버 판정을 완전히 재현하지 않습니다.','어둠의 모순은 각 로비에서 사용 가능한 변형 하나만 등장합니다. 언데드 로비에서는 5단계, 이샤라즈 돌연변이 로비에서는 5·6단계가 제외됩니다.','현신은 별도로 구매하는 카드가 아닙니다. 게임마다 정해진 크툰 또는 이샤라즈가 전투 중 아군 돌연변이 4마리의 죽음으로 깨어납니다.'];
 gifts.forEach(g=>g.text=g.text.replaceAll('전투 시작:','기선 제압:'));
 const mechanics={manifest:{name:'현신',threshold:4,oncePerCombat:true,tier:1,text:'게임마다 크툰 또는 이샤라즈가 정해집니다. 아군 돌연변이 4마리가 죽으면 그 전투에서 현신이 깨어납니다. 현신 강화는 게임 내내 유지됩니다.'},tribes:{available:tribes,excluded:['나가'],perGame:5},trinkets:{lesserTurn:6,greaterTurn:9,options:4,offTypeDiscount:2,guaranteedUntyped:true,guaranteedAtMostCost:2,text:'6턴에 하급, 9턴에 상급 장신구 네 가지를 제시합니다. 종족이 없는 장신구와 비용 2 이하 장신구를 각각 최소 하나 포함합니다.'}};
 const data={version:'37.0.2',build:256589,cards,heroes,spells,trinkets,gifts,tribes,manifests,paradoxVariants,mechanics,patchChanges,PATCH_CHANGES:patchChanges,sources,limitations,keywords:{taunt:'도발',shield:'천상의 보호막',venom:'독소',reborn:'환생',wind:'질풍',stealth:'은신',manifest:'현신',cleave:'양옆 공격'}};
 root.BG_DATA=data;if(typeof module!=='undefined')module.exports=data;
})(typeof window!=='undefined'?window:globalThis);
