import{d as K,u as Q,a as W,b as X,D as Z,E as ee,G as te,k as w,l as u,H as oe,L as se,w as j,n as re,B as ae,r as d,p as le,o as p,c as A,e as b,I as ce,f as i,g as ne,t as l,h as t,q as de,s as k,z as o,F as ie,v as ue,y as be,j as pe,J as _e}from"./DBCDSuVQ.js";import{u as he}from"./BtxfaNxF.js";import{u as me}from"./BVTReDcz.js";const ve={class:"overflow-y-hidden w-full hidden-scroll select-none"},fe={class:"w-full"},ye={class:"w-full"},ge=o("th",{class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"}," № ",-1),we={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},ke={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},xe={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},Ne={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},Ce={class:"w-full"},Be={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Te={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Ie={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Le={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Pe={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Ae=K({__name:"products",async setup($e){let x,N;const C=me(),B=he(),{$api:E}=pe(),{t:n}=Q(),{setLoading:T}=W(),{setError:z}=X(),I=Z(),D=ee(),O=te(),L=w(10),P=w(0),v=u(()=>Number(I.query.page)||1),$=w([]),_=oe({locationType:null});let h=null;const S=u(()=>Math.ceil(P.value/L.value)),f=u(()=>e=>B.getBranchById(e)),q=u(()=>e=>{var s;return((s=f.value(e))==null?void 0:s.address)||""}),F=u(()=>e=>{var c,a;const s=(c=f.value(e))==null?void 0:c.locationId;return s===void 0?"":((a=C.getCityById(s))==null?void 0:a.name)||""||""}),U=u(()=>Object.values(se).filter(e=>e!=="NULL").map(e=>({id:e,label:n("places."+e)})));j(()=>v.value,()=>{y()}),j(()=>_,()=>{h&&(clearTimeout(h),h=null),h=setTimeout(()=>{y()},500)},{deep:!0}),[x,N]=re(()=>y()),await x,N(),ae(async()=>{await B.fetchBranches(),await C.fetchCities()});async function y(){var e,s,c;try{T("global",!0);const a=ce({paged:!0,page:v.value-1,size:L.value,locationType:_.locationType}),{status:g,data:m}=await E.product.getAllProducts(a);g.value==="success"&&($.value=((e=m.value)==null?void 0:e.content)||[],P.value=((s=m.value)==null?void 0:s.totalElements)||0)}catch(a){(c=a==null?void 0:a.response)!=null&&c._data&&z({title:a.response._data.error||""})}finally{T("global",!1)}}function M(e){D.push({path:O(I.path),query:{page:e}})}return(e,s)=>{const c=d("v-col"),a=d("v-row"),g=d("v-select"),m=d("v-table"),R=d("v-divider"),G=d("v-pagination"),H=d("v-container"),J=le("dragscroll");return p(),A(H,null,{default:b(()=>[i(a,{class:"text-h6 text-left",justify:"space-between"},{default:b(()=>[i(c,null,{default:b(()=>[ne(l(t(n)("titles.products")),1)]),_:1})]),_:1}),i(a,{class:"filters",justify:"space-between"},{default:b(()=>[i(c,{cols:"12",md:"4"},{default:b(()=>[i(g,{value:t(_).locationType,label:t(n)("labels.cityType"),items:t(U),"item-value":"id","item-title":"label","onUpdate:modelValue":s[0]||(s[0]=r=>t(_).locationType=r)},null,8,["value","label","items"])]),_:1})]),_:1}),de((p(),k("div",ve,[i(m,{density:"comfortable",hover:!0,class:"table w-full mt-2 min-w-[700px]"},{default:b(()=>[o("thead",fe,[o("tr",ye,[ge,o("th",we,l(t(n)("labels.user")),1),o("th",ke,l(t(n)("labels.email")),1),o("th",xe,l(t(n)("labels.phoneNumber")),1),o("th",Ne,l(t(n)("labels.branch")),1)])]),o("tbody",Ce,[(p(!0),k(ie,null,ue(t($),(r,Y)=>{var V;return p(),k("tr",{key:r.id,class:_e(["w-full",{"bg-gray-300":Y%2===0}])},[o("td",Be,l(r.id),1),o("td",Te,l(`${r.lastName} ${r.firstName}`),1),o("td",Ie,l(r.email),1),o("td",Le,l(r.phoneNumber),1),o("td",Pe,[o("div",null,l(`${t(F)(r.warehouseId)} - ${t(q)(r.warehouseId)}`),1),o("div",null,l((V=t(f)(r.warehouseId))==null?void 0:V.description),1)])],2)}),128))])]),_:1})])),[[J]]),i(R,{inset:"",class:"my-4 !max-w-full !ms-0"}),t(S)>1?(p(),A(G,{key:0,"model-value":t(v),length:t(S),size:"x-small","onUpdate:modelValue":s[1]||(s[1]=r=>M(r))},null,8,["model-value","length"])):be("",!0)]),_:1})}}});export{Ae as default};