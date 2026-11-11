/* Local Hearthstone artwork presentation; card data and game state stay unchanged. */
(function(root){
'use strict';
const installed=new WeakSet();
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const own=(object,key)=>object&&typeof object==='object'&&Object.prototype.hasOwnProperty.call(object,key)?object[key]:undefined;
function localSource(value){
 if(typeof value!=='string'||!value||value!==value.trim()||/[\\\u0000-\u001f]/.test(value)||value.startsWith('/')||/^[a-z][a-z0-9+.-]*:/i.test(value))return null;
 if(value.split(/[/?#]/).some(part=>part==='..'))return null;
 return value;
}
function resolve(card){
 const manifest=root.BG_ART,assets=manifest?.byId,catalog=root.BG_CATALOG;
 if(!assets||!card)return null;
 const candidates=typeof card==='string'?[card]:[card.id,card.cardId];
 const ids=[];
 for(const candidate of candidates){
  if(typeof candidate!=='string'||!candidate)continue;
  if(!ids.includes(candidate))ids.push(candidate);
  const alias=own(catalog?.legacyIds,candidate);
  if(typeof alias==='string'&&!ids.includes(alias))ids.push(alias);
 }
 // Prefer an exact normal/golden identity before considering the same card's base art.
 for(const id of ids){
  const asset=own(assets,id),src=localSource(asset?.src);
  if(src)return {...asset,id,src};
 }
 for(const id of ids){
  const metadata=own(catalog?.byId,id),normal=metadata?.normalId;
  if(typeof normal!=='string')continue;
  const asset=own(assets,normal),src=localSource(asset?.src);
  if(src)return {...asset,id:normal,src};
 }
 // A supplied normalId is safe only when the catalog verifies its golden relation.
 if(typeof card==='object'&&typeof card.normalId==='string'){
  const base=own(catalog?.byId,card.normalId);
  if(base&&ids.some(id=>base.goldenId===id)){
   const asset=own(assets,card.normalId),src=localSource(asset?.src);
   if(src)return {...asset,id:card.normalId,src};
  }
 }
 return null;
}
function html(card,options={}){
 options=options||{};
 const asset=resolve(card),fallback=options.fallback??(typeof card==='object'?card?.icon:undefined)??'✦';
 const classes=['card-art',asset?'has-art':'',typeof options.className==='string'?options.className:''].filter(Boolean).join(' ');
 const loading=options.loading==='lazy'?'lazy':'eager';
 return `<span class="${escape(classes)}"><span class="art-fallback" aria-hidden="true">${escape(fallback)}</span>${asset?`<img class="art-image" src="${escape(asset.src)}" data-art-id="${escape(asset.id)}" alt="" aria-hidden="true" width="256" height="256" loading="${loading}" decoding="async" draggable="false">`:''}</span>`;
}
function imageError(event){
 const img=event?.target;
 if(!img||String(img.tagName).toUpperCase()!=='IMG'||!img.classList?.contains('art-image')||img.hidden)return;
 // Hiding the failed element reveals its sibling fallback; never change src or retry.
 img.hidden=true;
 img.setAttribute?.('data-art-failed','true');
 img.closest?.('.card-art')?.classList?.add('art-failed');
}
function install(document){
 if(!document||typeof document.addEventListener!=='function'||installed.has(document))return false;
 document.addEventListener('error',imageError,true);
 installed.add(document);
 return true;
}
const api={resolve,html,install};
root.BGCardArt=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
