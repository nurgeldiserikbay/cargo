import{l as s,c as o}from"./BT9LgsZd.js";import{a as u,c as h}from"./9z15omkZ.js";const p=s("branch",()=>{const{$api:e}=o(),t=u([]),r=h(()=>a=>t.value.find(c=>c.id===a));async function n(){const a=await e.branch.getBranchs();return t.value=a.data.value||[],a}return{branches:t,fetchBranches:n,getBranchById:r}});export{p as u};