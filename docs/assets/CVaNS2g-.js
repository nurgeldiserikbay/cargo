import{_ as H}from"./C4OMlPvu.js";import{_ as I}from"./8XHwsNhV.js";import{d as M,c as Q,a as _,an as S,w as T,N as o,o as m,j as b,ac as e,Q as n,aa as r,ab as l,u as s,m as U,ai as G,P as J,ah as K,a7 as L,ae as O}from"./9z15omkZ.js";import{h as W,g as X,f as Y,a as Z,c as tt,k as et}from"./BT9LgsZd.js";const at={class:"text-h4 ml-4 mb-5 mt-6"},ot={class:"flex gap-x-2 grow-1"},st={class:"text-md basis-50 grow-1 max-w-[42%]"},nt={class:"text-xs grow-1 max-w-[46%]"},ct=M({__name:"archive",async setup(rt){let C,k;const N=W(),V=X(),v=Y(),{$api:f}=tt(),{setLoading:i}=Z(),g=Q(()=>Number(v.query.page||1)),h=_(10),P=_([]),w=_(0),$=_(null);[C,k]=S(()=>x()),await C,k(),T(()=>v.query,()=>{x()});async function x(){var t,a;try{i("global",!0);const c={paged:!0,page:g.value-1,size:h.value,state:"ARCHIVED"},{status:y,data:u}=await f.product.getAllProducts(c);y.value==="success"&&(P.value=((t=u.value)==null?void 0:t.content)||[],w.value=((a=u.value)==null?void 0:a.totalPages)||0);const{data:p}=await f.product.getProductsCount();p&&($.value=p.value)}catch(c){throw new Error(c)}finally{i("global",!1)}}async function B(t){try{i("global",!0);const{status:a}=await f.product.sendFromArchive(t);a.value==="success"&&x()}catch(a){throw new Error(a)}finally{i("global",!1)}}function E(t){V.push({path:N(v.path),query:{page:t}})}return(t,a)=>{const c=o("v-btn"),y=H,u=o("v-expansion-panel"),p=o("v-expansion-panels"),z=I,q=o("v-data-iterator"),F=o("v-pagination"),R=o("v-card"),j=o("v-container");return m(),b(j,{class:"product-list flex-grow-1 d-flex flex-col justify-start items-center"},{default:e(()=>[n(R,{class:"w-full"},{default:e(()=>[r("div",at,l(t.$t("pages.archive")),1),n(q,{items:s(P),"items-per-page":s(h)},{default:e(({items:D})=>[(m(!0),U(J,null,G(D,(d,A)=>(m(),b(p,{key:A,variant:"accordion",class:"condensed"},{default:e(()=>[n(u,{size:"small"},{title:e(()=>[r("div",ot,[r("div",st,[r("span",null,l((s(g)-1)*s(h)+A+1),1),L(" "+l(d.raw.trackCode),1)]),r("div",nt,l(d.raw.description),1),n(c,{size:"small",color:"secondary",class:"relative !color-color1",onClick:O(lt=>B(d.raw.id),["stop","prevent"])},{default:e(()=>[L(l(t.$t("commands.backArchive")),1)]),_:2},1032,["onClick"])])]),text:e(()=>[n(y,{id:d.raw.id},null,8,["id"])]),_:2},1024)]),_:2},1024))),128))]),"no-data":e(()=>[n(z,{class:"mt-5 mb-10"})]),_:1},8,["items","items-per-page"]),s(w)>1?(m(),b(F,{key:0,"model-value":s(g),length:s(w),class:"mt-4 mb-5",size:"x-small","onUpdate:modelValue":E},null,8,["model-value","length"])):K("",!0)]),_:1})]),_:1})}}}),_t=et(ct,[["__scopeId","data-v-0d371a8d"]]);export{_t as default};
