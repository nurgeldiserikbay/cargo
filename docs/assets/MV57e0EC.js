import{_ as le}from"./CQyW7zkg.js";import{u as O,a as W,b as Y,c as Z}from"./BT9LgsZd.js";import{d as ee,w as ce,N as o,o as y,j as E,ac as t,Q as a,a7 as B,ab as v,u as e,X as L,ae as q,a as j,c as H,an as ie,a2 as de,a1 as me,m as J,P as ue,ai as _e,A as pe,ah as ve,aa as K}from"./9z15omkZ.js";import{t as fe,z as k,u as he,a as D}from"./Bidafszn.js";import{_ as ge}from"./8XHwsNhV.js";import{u as be}from"./B4L4hn--.js";const we=ee({__name:"CreateBranch",props:{selectedBranch:{}},emits:["clear","added"],setup(G,{emit:g}){const{$api:C}=Z(),{t:d}=O(),p=G,f=g,{setLoading:I}=W(),{setError:x,setSuccess:P}=Y(),b=fe(k.object({name:k.string().min(1).max(500),address:k.string().min(1).max(500),description:k.string().min(1).max(500),locationId:k.number()})),{errors:u,values:r,handleSubmit:m,defineComponentBinds:h,handleReset:$,setValues:S}=he({validationSchema:b}),F=h("name"),R=h("address"),M=h("locationId"),T=h("description");ce(()=>p.selectedBranch,()=>{p.selectedBranch&&S(p.selectedBranch)});const c=m(async()=>{var s,l;try{if(!r.name||!r.address||!r.locationId||!r.description)return;I("global",!0);const{status:n,data:_,error:w}=p.selectedBranch?await C.branch.updateBranch(p.selectedBranch.id,{name:r.name,address:r.address,description:r.description,locationId:r.locationId}):await C.branch.createBranch({name:r.name,address:r.address,description:r.description,locationId:r.locationId});n.value==="success"&&(f("added",_.value),P({title:d("messages.successBranchCreate")}),$()),n.value==="error"&&x({title:d(`errors.${((s=w.value)==null?void 0:s.data)||""}`)})}catch(n){(l=n==null?void 0:n.response)!=null&&l._data&&x({title:n.response._data.error||""})}finally{I("global",!1)}},()=>{});function i(){$(),f("clear")}return(s,l)=>{const n=o("v-col"),_=o("v-row"),w=o("v-text-field"),N=le,V=o("v-btn"),A=o("v-textarea"),Q=o("v-container"),U=o("v-form");return y(),E(U,null,{default:t(()=>[a(Q,null,{default:t(()=>[a(_,{class:"text-h6 text-left",justify:"space-between"},{default:t(()=>[a(n,null,{default:t(()=>[B(v(e(d)("titles.branches")),1)]),_:1})]),_:1}),a(_,{align:"stretch"},{default:t(()=>[a(n,{cols:"12",md:"4",order:"1"},{default:t(()=>[a(w,L(e(F),{label:e(d)("labels.branchName"),"error-messages":("zodI18n"in s?s.zodI18n:e(D))(e(u).name),"hide-details":""}),null,16,["label","error-messages"])]),_:1}),a(n,{cols:"12",md:"4",order:"2"},{default:t(()=>[a(N,L(e(M),{label:e(d)("labels.city"),"error-messages":("zodI18n"in s?s.zodI18n:e(D))(e(u).locationId)}),null,16,["label","error-messages"])]),_:1}),a(n,{cols:"12",md:"4",order:"4","order-md":"3",class:"flex justify-end gap-5"},{default:t(()=>[a(V,{variant:"elevated",type:"submit",color:"secondary",size:"x-large",onClick:q(e(c),["prevent"])},{default:t(()=>[B(v(s.selectedBranch?e(d)("commands.update"):e(d)("commands.submit")),1)]),_:1},8,["onClick"]),a(V,{variant:"elevated",color:"error",size:"x-large",onClick:q(i,["prevent"])},{default:t(()=>[B(v(e(d)("commands.clear")),1)]),_:1})]),_:1}),a(n,{cols:"12",md:"6",order:"3","order-md":"4"},{default:t(()=>[a(A,L(e(R),{rows:1,label:e(d)("labels.branchAddress"),"error-messages":("zodI18n"in s?s.zodI18n:e(D))(e(u).address)}),null,16,["label","error-messages"])]),_:1}),a(n,{cols:"12",md:"6",order:"3","order-md":"4"},{default:t(()=>[a(A,L(e(T),{rows:1,label:e(d)("labels.branchDescription"),"error-messages":("zodI18n"in s?s.zodI18n:e(D))(e(u).description)}),null,16,["label","error-messages"])]),_:1})]),_:1})]),_:1})]),_:1})}}}),ye={class:"overflow-y-hidden w-full hidden-scroll select-none"},$e=ee({__name:"branchs",async setup(G){let g,C;const d=be(),{$api:p}=Z(),{t:f}=O(),{setLoading:I}=W(),{setError:x,setSuccess:P}=Y(),b=j(),u=j(1),r=j(5),m=j([]),h=H(()=>Math.ceil(m.value.length/r.value)),$=H(()=>c=>{var i;return((i=d.getCityById(c))==null?void 0:i.name)||""}),{data:S}=([g,C]=ie(()=>p.branch.getBranchs()),g=await g,C(),g);S.value&&(m.value=S.value);function F(c){b.value?m.value=m.value.map(i=>i.id===c.id?c:i):m.value.unshift(c)}function R(c){b.value=c}function M(){b.value=void 0}async function T(c){var i,s;try{I("global",!0);const{status:l,error:n}=await p.branch.removeBranch(c.id);l.value==="success"&&(m.value=m.value.filter(_=>_.id!==c.id),P({title:f("messages.successBranchRemove")})),l.value==="error"&&x({title:f(`errors.${((i=n.value)==null?void 0:i.data)||""}`)})}catch(l){(s=l==null?void 0:l.response)!=null&&s._data&&x({title:l.response._data.error||""})}finally{I("global",!1)}}return(c,i)=>{const s=we,l=o("v-divider"),n=o("v-col"),_=o("v-tooltip"),w=o("v-icon"),N=o("v-btn"),V=o("v-row"),A=o("v-list-item"),Q=o("v-list"),U=ge,ae=o("v-data-iterator"),te=o("v-pagination"),ne=o("v-container"),oe=de("dragscroll");return y(),E(ne,null,{default:t(()=>[a(s,{"selected-branch":e(b),onClear:M,onAdded:F},null,8,["selected-branch"]),a(l,{inset:"",class:"my-4 !max-w-full !ms-0"}),me((y(),J("div",ye,[a(ae,{items:e(m),page:e(u),"items-per-page":e(r),class:"min-w-[600px]"},{default:t(({items:X})=>[a(Q,{variant:"elevated"},{default:t(()=>[(y(!0),J(ue,null,_e(X,(z,se)=>(y(),E(A,{key:se,variant:"elevated",class:"mb-4 cursor-pointer",onClick:re=>R(z.raw)},{default:t(()=>[a(V,null,{default:t(()=>[a(n,{cols:"6","align-self":"center",class:"border !!border-r-2px !border-r-solid !border-r-color1"},{default:t(()=>[K("div",null,v(z.raw.name),1),K("div",null,v(z.raw.address),1)]),_:2},1024),a(n,{"align-self":"center"},{default:t(()=>[B(v(e($)(z.raw.locationId)),1)]),_:2},1024),a(n,{class:"flex justify-end gap-2"},{default:t(()=>[a(N,{variant:"plain",color:"primary",icon:!0},{default:t(()=>[a(_,{activator:"parent",branch:"top"},{default:t(()=>[B(v(e(f)("commands.select")),1)]),_:1}),a(w,{icon:"mdi mdi-button-pointer",size:"large"})]),_:1}),a(N,{variant:"plain",color:"error",icon:!0,class:"cursor-pointer",onClick:q(re=>T(z.raw),["stop"])},{default:t(()=>[a(_,{activator:"parent",branch:"top"},{default:t(()=>[B(v(e(f)("commands.clear")),1)]),_:1}),a(w,{icon:"mdi mdi-delete",size:"large"})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:2},1024)]),"no-data":t(()=>[a(U)]),_:1},8,["items","page","items-per-page"])])),[[oe]]),a(l,{inset:"",class:"my-4 !max-w-full !ms-0"}),e(h)>1?(y(),E(te,{key:0,modelValue:e(u),"onUpdate:modelValue":i[0]||(i[0]=X=>pe(u)?u.value=X:null),length:e(h),size:"x-small"},null,8,["modelValue","length"])):ve("",!0)]),_:1})}}});export{$e as default};
