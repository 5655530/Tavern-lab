/* Browser bridge for the MIT-licensed TavernGym engine. See licenses/. */
(function(root){
'use strict';
let compiled=null;
const encoder=new TextEncoder(),decoder=new TextDecoder();
function bytesFromBase64(value){const raw=atob(value),out=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out;}
class CoreInstance{
 constructor(module){this.instance=new WebAssembly.Instance(module,{});this.exports=this.instance.exports;}
 call(request){const bytes=encoder.encode(JSON.stringify(request)),e=this.exports,ptr=e.tg_alloc(bytes.length);if(!ptr)throw new Error('요청 데이터가 너무 큽니다.');let result;try{new Uint8Array(e.memory.buffer,ptr,bytes.length).set(bytes);const out=e.tg_call(ptr,bytes.length),len=e.tg_result_len();result=JSON.parse(decoder.decode(new Uint8Array(e.memory.buffer,out,len)));}finally{e.tg_free(ptr,bytes.length);}if(!result||result.ok!==true)throw new Error(result?.error||'시뮬레이션 요청을 처리하지 못했습니다.');return result.value;}
}
const api={
 async install(bytes){compiled=bytes instanceof WebAssembly.Module?bytes:await WebAssembly.compile(bytes);return api;},
 create(){if(!compiled)throw new Error('시뮬레이터가 아직 준비되지 않았습니다.');return new CoreInstance(compiled);},
 get loaded(){return !!compiled;},
 CoreInstance
};
api.ready=(async()=>{if(root.TAVERN_CORE_BASE64)return api.install(bytesFromBase64(root.TAVERN_CORE_BASE64));if(typeof document!=='undefined'){const script=document.currentScript?.src,base=script?new URL('./tavern_core.wasm',script):'./tavern_core.wasm',response=await fetch(base);if(!response.ok)throw new Error('시뮬레이터를 다운로드하지 못했습니다.');return api.install(await response.arrayBuffer());}return api;})();
root.TavernCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
