import{d as x,o as l,s as c,z as d,f as w,t as k,J as f,S as $,a as B,k as D,l as L,w as N,p as z,y as A,F as g,v as h,q as C,c as R,h as y,j as V}from"./DBCDSuVQ.js";const E={class:"relative rounded-full mb-1"},F=x({__name:"ReferalItem",props:{user:{},active:{type:Boolean,default:!1}},setup(m){return(e,p)=>{const i=$;return l(),c("div",{class:f(["flex flex-col items-center text-center",{arrow:e.active}])},[d("div",E,[w(i,{"level-type":e.user.level,active:e.user.active,class:"z-10",count:e.user.referals||0},null,8,["level-type","active","count"])]),d("div",{class:f(["text-[10px] whitespace-pre-line font-700 text-gray-800 text-xs py-1 px-2 bg-gray-200 rounded-md",{"bg-green-500 text-white":e.active}])},k(`ID: ${e.user.id}`),3)],2)}}}),I={class:"flex flex-col items-center max-h-full"},S={key:0,class:"mb-4 px-5 pt-2 rounded-lg"},j={class:"flex-grow-1 max-w-full max-h-full"},q={class:"relative px-5 py-2 pt-4 rounded-lg flex gap-3 w-min"},G=x({__name:"ReferalsItem",props:{active:{type:Boolean,default:!1},user:{}},setup(m){const{$api:e}=V(),{setLoading:p}=B(),i=m,u=D([]),b=L(()=>(a,r)=>{var s;return((s=u.value[a+1])==null?void 0:s.seleted)===r});N(()=>i.user,()=>{_(0,i.user)},{immediate:!0});async function _(a,r){var s;try{if(r.referals===0)return;p("global",!0);const o={paged:!0,id:r.id},{status:v,data:n}=await e.user.getReferrals(o);if(v.value==="success"&&(s=n.value)!=null&&s.content){const t=u.value.slice(0,a);t[a]={seleted:r.id,list:n.value.content},u.value=t}}catch(o){throw new Error(o)}finally{p("global",!1)}}return(a,r)=>{const s=F,o=z("dragscroll");return l(),c("div",I,[a.user?(l(),c("div",S,[w(s,{user:a.user,active:!0},null,8,["user"])])):A("",!0),d("div",j,[(l(!0),c(g,null,h(y(u),(v,n)=>C((l(),c("div",{key:n,class:"pb-2 overflow-y-hidden w-full hidden-scroll select-none drag-none"},[d("div",q,[(l(!0),c(g,null,h(v.list,t=>(l(),R(s,{key:t.id,user:t,active:y(b)(n,t.id),class:f({"cursor-pointer":t.referals>0}),onDblclick:J=>_(n+1,t)},null,8,["user","active","class","onDblclick"]))),128))])])),[[o]])),128))])])}}});export{G as _};