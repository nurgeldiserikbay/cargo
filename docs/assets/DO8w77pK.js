import{v as q,_ as G}from"./DEsE7NMS.js";import{_ as U}from"./C9VzoxVe.js";import{_ as H}from"./NrRhoOlY.js";import{_ as J}from"./DA7wHOdZ.js";import{d as Q,u as W,G as X,E as ee,a as se,b as oe,k as ae,M as re,C as ne,r as p,o as te,c as le,e as u,j as ie,z as _,f as o,t as g,h as e,i as me,m as i,x as de,L as ce,g as v,_ as ue}from"./BL35Lc_y.js";import{t as pe,z as n,u as fe,a as m}from"./FrhPwdqL.js";import"./BebbxeDx.js";import"./CJIBvVXL.js";const _e={class:"flex-grow-1 d-flex flex-col justify-center items-center pt-6"},be={class:"text-2xl mb-4 capitalize lg:text-3xl"},ge={class:"d-flex justify-center md:col-span-2"},xe=Q({__name:"register",setup(he){const{$api:z}=ie(),{t:a}=W(),P=X(),y=ee(),{setLoading:h}=se(),{setError:w,setSuccess:C}=oe(),x=pe(n.object({firstName:n.string().min(1).max(200),lastName:n.string().min(1).max(200),email:n.string().email(),password:n.string().min(4),confirmPassword:n.string().min(4),phoneNumber:n.string().refine(s=>q.isMobilePhone(s.replace(/\D/g,""),"kk-KZ")),warehouseId:n.number(),promoCode:n.string().min(1).max(200).optional()}).superRefine(({confirmPassword:s,password:d},r)=>{s!==d&&r.addIssue({code:"custom",message:"The passwords did not match"})})),{errors:t,values:I,handleSubmit:S,defineComponentBinds:l}=fe({validationSchema:x}),k=l("firstName"),T=l("lastName"),L=l("email"),O=l("phoneNumber"),$=l("password"),V=l("confirmPassword"),j=l("warehouseId"),f=ae(),A=l("promoCode");function B(){E()}const E=S(async()=>{var s,d;try{h("global",!0);const r=re({...I,phoneNumber:ne(I.phoneNumber||"")},["confirmPassword"]),{status:c,error:b}=await z.auth.register(r);c.value==="success"&&(y.push(P("/auth/login")),C({title:a("messages.successRegister")})),c.value==="error"&&w({title:a(`errors.${((s=b.value)==null?void 0:s.data)||""}`)})}catch(r){(d=r==null?void 0:r.response)!=null&&d._data&&w({title:r.response._data.error||""})}finally{h("global",!1)}},()=>{});return(s,d)=>{const r=p("v-icon"),c=p("v-text-field"),b=G,N=U,F=H,M=J,R=p("v-btn"),D=ue,Y=p("v-card"),K=p("v-container");return te(),le(K,null,{default:u(()=>[_("div",_e,[o(Y,{class:"d-flex flex-col items-center w-full max-w-600px px-5 py-5 pb-6 mb-12 rounded-lg"},{default:u(()=>[_("div",be,g(e(a)("pages.register")),1),_("form",{class:"w-full grid gap-x-2 gap-y-2 md:grid-cols-2",onSubmit:me(B,["prevent"])},[o(c,i(e(k),{label:e(a)("labels.firstName"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).firstName)}),{"append-inner":u(()=>[o(r,{icon:"mdi mdi-asterisk",size:"x-small",color:"red"})]),_:1},16,["label","error-messages"]),o(c,i(e(T),{label:e(a)("labels.lastName"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).lastName)}),{"append-inner":u(()=>[o(r,{icon:"mdi mdi-asterisk",size:"x-small",color:"red"})]),_:1},16,["label","error-messages"]),o(c,i(e(L),{label:e(a)("labels.email"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).email)}),{"append-inner":u(()=>[o(r,{icon:"mdi mdi-asterisk",size:"x-small",color:"red"})]),_:1},16,["label","error-messages"]),o(b,i(e(O),{label:e(a)("labels.phoneNumber"),required:!0,"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).phoneNumber)}),null,16,["label","error-messages"]),o(N,i(e($),{label:e(a)("labels.password"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).password)}),null,16,["label","error-messages"]),o(N,i(e(V),{label:e(a)("labels.confirmPassword"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).confirmPassword)}),null,16,["label","error-messages"]),o(F,{modelValue:e(f),"onUpdate:modelValue":d[0]||(d[0]=Z=>de(f)?f.value=Z:null),"location-filter":("LOCATION_TYPES"in s?s.LOCATION_TYPES:e(ce)).KZ},null,8,["modelValue","location-filter"]),o(M,i(e(j),{"city-id":e(f),errors:("zodI18n"in s?s.zodI18n:e(m))(e(t).warehouseId)}),null,16,["city-id","errors"]),o(c,i(e(A),{label:e(a)("labels.promoCode"),"error-messages":("zodI18n"in s?s.zodI18n:e(m))(e(t).promoCode)}),null,16,["label","error-messages"]),_("div",ge,[o(R,{class:"me-4",variant:"elevated",type:"submit",disabled:!1},{default:u(()=>[v(g(e(a)("commands.submit")),1)]),_:1})])],32),o(D,{to:"/auth/login",class:"mt-8 no-underline text-color1"},{default:u(()=>[v(g(e(a)("pages.login")),1)]),_:1})]),_:1})])]),_:1})}}});export{xe as default};