import{d as Y,u as Z,a as G,b as J,L as B,l as Q,w as oe,r as s,o as $,c as j,e as a,f as e,g as _,t as p,h as t,m as U,i as H,j as W,k as E,n as ne,p as se,q as le,F as ce,s as re,v as ie}from"./Btt9-x6i.js";import{t as de,z as T,u as ue,a as q}from"./JuTIJzDm.js";import{_ as me}from"./BMrB4LQB.js";const _e=Y({__name:"CreateLocation",props:{selectedLocation:{}},emits:["clear","added"],setup(K,{emit:f}){const{$api:w}=W(),{t:c}=Z(),i=K,x=f,{setLoading:k}=G(),{setError:I,setSuccess:g}=J(),y=de(T.object({name:T.string().min(1).max(500),code:T.string().min(1).max(500),type:T.enum([B.BORDER,B.CHINA,B.KZ])})),{errors:b,values:n,handleSubmit:N,defineComponentBinds:L,handleReset:S,setValues:R}=ue({validationSchema:y}),V=L("name"),F=L("type"),d=L("code"),u=Q(()=>Object.values(B).filter(o=>o!=="NULL").map(o=>({id:o,label:c("places."+o)})));oe(()=>i.selectedLocation,()=>{i.selectedLocation&&R(i.selectedLocation)});const C=N(async()=>{var o,m;try{if(!n.name||!n.type||!n.code)return;k("global",!0);const{status:l,data:v,error:h}=i.selectedLocation?await w.location.updateLocation(i.selectedLocation.id,{name:n.name,code:n.code,type:n.type}):await w.location.createLocation({name:n.name,code:n.code,type:n.type});l.value==="success"&&(x("added",v.value),g({title:c("messages.successLocationCreate")}),S()),l.value==="error"&&I({title:c(`errors.${((o=h.value)==null?void 0:o.data)||""}`)})}catch(l){(m=l==null?void 0:l.response)!=null&&m._data&&I({title:l.response._data.error||""})}finally{k("global",!1)}},()=>{});function r(){S(),x("clear")}return(o,m)=>{const l=s("v-col"),v=s("v-row"),h=s("v-text-field"),O=s("v-select"),A=s("v-btn"),P=s("v-container"),D=s("v-form");return $(),j(D,null,{default:a(()=>[e(P,null,{default:a(()=>[e(v,{class:"text-h6 text-left",justify:"space-between"},{default:a(()=>[e(l,null,{default:a(()=>[_(p(t(c)("titles.locations")),1)]),_:1})]),_:1}),e(v,{align:"stretch"},{default:a(()=>[e(l,{cols:"12",md:"4"},{default:a(()=>[e(h,U(t(V),{label:t(c)("labels.cityName"),"error-messages":("zodI18n"in o?o.zodI18n:t(q))(t(b).name),"hide-details":""}),null,16,["label","error-messages"])]),_:1}),e(l,{cols:"12",md:"4"},{default:a(()=>[e(O,U(t(F),{label:t(c)("labels.cityType"),items:t(u),"item-value":"id","item-title":"label","error-messages":("zodI18n"in o?o.zodI18n:t(q))(t(b).type)}),null,16,["label","items","error-messages"])]),_:1}),e(l,{cols:"12",md:"4"},{default:a(()=>[e(h,U(t(d),{label:t(c)("labels.code"),"error-messages":("zodI18n"in o?o.zodI18n:t(q))(t(b).code),"hide-details":""}),null,16,["label","error-messages"])]),_:1}),e(l,{cols:"12",md:"4",class:"flex center gap-5"},{default:a(()=>[e(A,{variant:"elevated",type:"submit",color:"secondary",size:"x-large",onClick:H(t(C),["prevent"])},{default:a(()=>[_(p(o.selectedLocation?t(c)("commands.update"):t(c)("commands.submit")),1)]),_:1},8,["onClick"]),e(A,{variant:"elevated",color:"error",size:"x-large",onClick:H(r,["prevent"])},{default:a(()=>[_(p(t(c)("commands.clear")),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}}),ge=Y({__name:"locations",async setup(K){let f,w;const{$api:c}=W(),{t:i}=Z(),{setLoading:x}=G(),{setError:k,setSuccess:I}=J(),g=E(),y=E(1),b=E(5),n=E([]),N=Q(()=>Math.ceil(n.value.length/b.value)),{data:L}=([f,w]=ne(()=>c.location.getLocations()),f=await f,w(),f);L.value&&(n.value=L.value);function S(d){g.value?n.value=n.value.map(u=>u.id===d.id?d:u):n.value.unshift(d),V()}function R(d){g.value=d}function V(){g.value=void 0}async function F(d){var u,C;try{x("global",!0);const{status:r,error:o}=await c.location.removeLocation(d.id);r.value==="success"&&(n.value=n.value.filter(m=>m.id!==d.id),I({title:i("messages.successLocationRemove")})),r.value==="error"&&k({title:i(`errors.${((u=o.value)==null?void 0:u.data)||""}`)})}catch(r){(C=r==null?void 0:r.response)!=null&&C._data&&k({title:r.response._data.error||""})}finally{x("global",!1)}}return(d,u)=>{const C=_e,r=s("v-divider"),o=s("v-col"),m=s("v-tooltip"),l=s("v-icon"),v=s("v-btn"),h=s("v-row"),O=s("v-list-item"),A=s("v-list"),P=me,D=s("v-data-iterator"),X=s("v-pagination"),ee=s("v-container");return $(),j(ee,null,{default:a(()=>[e(C,{"selected-location":t(g),onClear:V,onAdded:S},null,8,["selected-location"]),e(r,{inset:"",class:"my-4 !max-w-full !ms-0"}),e(D,{items:t(n),page:t(y),"items-per-page":t(b)},{default:a(({items:M})=>[e(A,{variant:"elevated"},{default:a(()=>[($(!0),se(ce,null,le(M,(z,te)=>($(),j(O,{key:te,variant:"elevated",class:"mb-4 cursor-pointer",onClick:ae=>R(z.raw)},{default:a(()=>[e(h,null,{default:a(()=>[e(o,{"align-self":"center",class:"border !border-r-2px !border-r-solid !border-r-color1"},{default:a(()=>[_(p(z.raw.name),1)]),_:2},1024),e(o,{"align-self":"center"},{default:a(()=>[_(p(t(i)(`places.${z.raw.type}`)),1)]),_:2},1024),e(o,{"align-self":"center"},{default:a(()=>[_(p(z.raw.code),1)]),_:2},1024),e(o,{class:"flex justify-end gap-2"},{default:a(()=>[e(v,{variant:"plain",color:"primary",icon:!0},{default:a(()=>[e(m,{activator:"parent",location:"top"},{default:a(()=>[_(p(t(i)("commands.select")),1)]),_:1}),e(l,{icon:"mdi mdi-button-pointer",size:"large"})]),_:1}),e(v,{variant:"plain",color:"error",icon:!0,class:"cursor-pointer",onClick:H(ae=>F(z.raw),["stop"])},{default:a(()=>[e(m,{activator:"parent",location:"top"},{default:a(()=>[_(p(t(i)("commands.clear")),1)]),_:1}),e(l,{icon:"mdi mdi-delete",size:"large"})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:2},1024)]),"no-data":a(()=>[e(P)]),_:1},8,["items","page","items-per-page"]),e(r,{inset:"",class:"my-4 !max-w-full !ms-0"}),t(N)>1?($(),j(X,{key:0,modelValue:t(y),"onUpdate:modelValue":u[0]||(u[0]=M=>re(y)?y.value=M:null),length:t(N),size:"x-small"},null,8,["modelValue","length"])):ie("",!0)]),_:1})}}});export{ge as default};
