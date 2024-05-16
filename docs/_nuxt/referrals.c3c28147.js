import{d as K,D as O,C as Q,B as W,u as X,a as Y,l as Z,k as v,n as ee,w as te,r as a,o as h,c as B,e as o,j as se,f as t,g as k,t as r,h as e,m as oe,i as ae,x as s,p as L,q as re,F as le,v as ne,H as ce}from"./entry.d5f47969.js";import{t as de,z as $,u as ue,a as ie}from"./vee-validate-zod.esm.88281908.js";const be={class:"mt-4"},_e={class:"w-full"},me={class:"w-full"},pe=s("th",{class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"}," ID ",-1),fe={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},ve={class:"border-r-1 border-r-black border-r-solid px-2 py-1 border-b-1 border-b-black border-b-solid"},he={class:"w-full"},ge={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},ye={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},we={class:"border-r-1 border-r-black border-r-solid px-2 py-1"},Ie=K({__name:"referrals",async setup(xe){let C,I;const q=O(),S=Q(),g=W(),{$api:j}=se(),{t:n}=X(),{setLoading:m}=Y(),D=de($.object({userId:$.string().min(1).max(200)})),{errors:E,values:F,handleSubmit:R,defineComponentBinds:A}=ue({validationSchema:D}),y=A("userId"),T=R(async()=>{try{if(!F.userId)return;m("global",!0),await x()}finally{m("global",!1)}},()=>{}),N=Z(()=>Number(g.query.page||1)),H=v(10),z=v([]),w=v(0),P=v(0);[C,I]=ee(()=>x()),await C,I(),te(()=>g.query,()=>{x()});async function x(){var l,i,c,b,p;try{if(!((l=y.value)!=null&&l.modelValue))return;m("global",!0);const _={paged:!0,page:N.value-1,size:H.value,id:y.value.modelValue},{status:f,data:d}=await j.user.getReferrals(_);f.value==="success"&&((i=d.value)!=null&&i.content&&(z.value=(c=d.value)==null?void 0:c.content),w.value=((b=d.value)==null?void 0:b.totalPages)||0,P.value=((p=d.value)==null?void 0:p.totalElements)||0)}catch(_){throw new Error(_)}finally{m("global",!1)}}function M(l){S.push({path:q(g.path),query:{page:l}})}return(l,i)=>{const c=a("v-col"),b=a("v-row"),p=a("v-text-field"),_=a("v-btn"),f=a("v-container"),d=a("v-form"),V=a("v-divider"),U=a("v-table"),G=a("v-pagination");return h(),B(f,null,{default:o(()=>[t(d,null,{default:o(()=>[t(f,null,{default:o(()=>[t(b,{class:"text-h6 text-left",justify:"space-between"},{default:o(()=>[t(c,null,{default:o(()=>[k(r(e(n)("labels.referrals")),1)]),_:1})]),_:1}),t(b,{align:"stretch"},{default:o(()=>[t(c,{cols:"12",md:"4"},{default:o(()=>[t(p,oe(e(y),{label:e(n)("labels.userId"),"error-messages":("zodI18n"in l?l.zodI18n:e(ie))(e(E).userId)}),null,16,["label","error-messages"])]),_:1}),t(c,{cols:"12",md:"4",class:"flex center gap-5"},{default:o(()=>[t(_,{variant:"elevated",type:"submit",color:"secondary",size:"x-large",onClick:ae(e(T),["prevent"])},{default:o(()=>[k(r(e(n)("commands.view")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),t(V,{inset:"",class:"my-4 !max-w-full !ms-0"}),s("div",be,[s("span",null,r(e(n)("labels.totalCount")),1),k(": "),s("span",null,r(e(P)),1)]),t(U,{density:"comfortable",hover:!0,class:"table w-full mt-2"},{default:o(()=>[s("thead",_e,[s("tr",me,[pe,s("th",fe,r(e(n)("labels.firstName")),1),s("th",ve,r(e(n)("labels.lastName")),1)])]),s("tbody",he,[(h(!0),L(le,null,re(e(z),(u,J)=>(h(),L("tr",{key:u.id,class:ce(["w-full",{"bg-gray-300":J%2===0}])},[s("td",ge,r(u.id),1),s("td",ye,r(`${u.firstName}`),1),s("td",we,r(`${u.firstName}`),1)],2))),128))])]),_:1}),t(V,{inset:"",class:"my-4 !max-w-full !ms-0"}),e(w)>1?(h(),B(G,{key:0,"model-value":e(N),length:e(w),size:"x-small","onUpdate:modelValue":i[0]||(i[0]=u=>M(u))},null,8,["model-value","length"])):ne("",!0)]),_:1})}}});export{Ie as default};
