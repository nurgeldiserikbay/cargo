import{_ as J}from"./yYVEc77-.js";import{_ as Q}from"./D-PUWHoF.js";import{d as W,G as X,E as ee,D as te,a as ae,l as q,k as C,n as oe,w as se,r as c,o as r,c as p,e as s,L as b,z as _,s as P,v as B,h as t,O as ne,F as V,f,y as T,j as re,t as i,g as E,i as Y,N as le}from"./DBCDSuVQ.js";const ce={class:"w-full md:max-w-70vw flex justify-around items-center gap-x-2 mt-15 relative mb-12"},ie={key:0,class:"absolute left-0 top-0 z-1 px-2 py-0 rounded-xl text-sm transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200"},ue={class:"mr-2 font-500"},de={class:"flex gap-x-2 grow-1"},pe={class:"text-md basis-50 grow-1 max-w-[42%]"},_e={class:"text-xs grow-1 max-w-[46%]"},me=W({__name:"product-list",async setup(ve){let O,$;const A=X(),z=ee(),m=te(),{$api:y}=re(),{setLoading:u}=ae(),n=q(()=>String(m.query.type||"")),x=q(()=>Number(m.query.page||1)),N=C(10),S=C([]),L=C(0),v=C(null);[O,$]=oe(()=>g()),await O,$(),se(()=>m.query,()=>{g()});async function g(){var e,a;try{u("global",!0);const l={paged:!0,page:x.value-1,size:N.value};n.value&&n.value!==b.NULL&&(l.locationType=n.value);const{status:k,data:h}=await y.product.getAllProducts(l);k.value==="success"&&(S.value=((e=h.value)==null?void 0:e.content)||[],L.value=((a=h.value)==null?void 0:a.totalPages)||0);const{data:w}=await y.product.getProductsCount();w&&(v.value=w.value)}catch(l){throw new Error(l)}finally{u("global",!1)}}async function j(e){try{u("global",!0);const{status:a}=await y.product.sendToArchive(e);a.value==="success"&&g()}catch(a){throw new Error(a)}finally{u("global",!1)}}async function D(e){try{u("global",!0);const{status:a}=await y.product.deleteProduct(e);a.value==="success"&&g()}catch(a){throw new Error(a)}finally{u("global",!1)}}function U(e){z.push({path:A(m.path),query:{type:e||""}})}function F(e){z.push({path:A(m.path),query:{type:n.value||"",page:e}})}return(e,a)=>{const l=c("v-btn"),k=J,h=c("v-expansion-panel"),w=c("v-expansion-panels"),R=Q,G=c("v-data-iterator"),H=c("v-pagination"),K=c("v-card"),M=c("v-container");return r(),p(M,{class:"product-list flex-grow-1 d-flex flex-col justify-start items-center"},{default:s(()=>[_("div",ce,[(r(!0),P(V,null,B(("CONTENT"in e?e.CONTENT:t(ne)).places,o=>(r(),p(l,{key:o.id,size:e.$vuetify.display.mdAndDown?"small":"default",active:o.type===t(n),color:o.type===t(n)?"teal-accent-2":"light-blue-lighten-2",class:"relative",onClick:d=>U(o.type)},{default:s(()=>[t(v)&&t(v)[o.type]?(r(),P("div",ie,i(t(v)[o.type]>100?"+99":t(v)[o.type]),1)):T("",!0),_("span",ue,i(o.type?e.$t(`places.${o.type}`):e.$t("labels.shop")),1)]),_:2},1032,["size","active","color","onClick"]))),128))]),f(K,{class:"w-full"},{default:s(()=>[f(G,{items:t(S),"items-per-page":t(N)},{default:s(({items:o})=>[f(w,{variant:"accordion",class:"condensed"},{default:s(()=>[(r(!0),P(V,null,B(o,(d,I)=>(r(),p(h,{key:I,size:"small"},{title:s(()=>[_("div",de,[_("div",pe,[_("span",null,i((t(x)-1)*t(N)+I+1),1),E(" "+i(d.raw.trackCode),1)]),_("div",_e,i(d.raw.description),1),t(n)===("LOCATION_TYPES"in e?e.LOCATION_TYPES:t(b)).KZ?(r(),p(l,{key:0,size:"small",color:"secondary",class:"relative !color-color1",onClick:Y(Z=>j(d.raw.id),["stop","prevent"])},{default:s(()=>[E(i(e.$t("commands.archive")),1)]),_:2},1032,["onClick"])):T("",!0),t(n)===("LOCATION_TYPES"in e?e.LOCATION_TYPES:t(b)).NULL||t(n)===""?(r(),p(l,{key:1,size:"small",color:"error",class:"relative !color-color1",onClick:Y(Z=>D(d.raw.id),["stop","prevent"])},{default:s(()=>[E(i(e.$t("commands.delete")),1)]),_:2},1032,["onClick"])):T("",!0)])]),text:s(()=>[f(k,{id:d.raw.id},null,8,["id"])]),_:2},1024))),128))]),_:2},1024)]),"no-data":s(()=>[f(R)]),_:1},8,["items","items-per-page"]),t(L)>1?(r(),p(H,{key:0,"model-value":t(x),length:t(L),class:"mt-4 mb-5",size:"x-small","onUpdate:modelValue":F},null,8,["model-value","length"])):T("",!0)]),_:1})]),_:1})}}}),he=le(me,[["__scopeId","data-v-a2860715"]]);export{he as default};