import{l as c,c as n}from"./BT9LgsZd.js";import{a as r,c as u}from"./9z15omkZ.js";const p=c("location",()=>{const{$api:a}=n(),o=r([]),i=u(()=>e=>o.value.find(t=>t.id===e));async function s(e){const t=await a.location.getLocations(e);return o.value=t.data.value||[],t}return{cities:o,fetchCities:s,getCityById:i}});export{p as u};