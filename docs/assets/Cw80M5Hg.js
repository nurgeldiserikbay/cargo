import{d as v,a as i,N as c,o as l,j as s,ac as k,ah as y,u as t}from"./9z15omkZ.js";import{V}from"./BT9LgsZd.js";const b=v({__name:"PasswordField",props:{modelValue:{default:""},errorMessages:{default:""},label:{default:""},required:{type:Boolean,default:!1}},emits:["update:modelValue","onBlur"],setup(B,{emit:d}){const u=d,n=i({value:""}),o=i(!1);function m(e){n.value={value:e}}function p(){u("update:modelValue",n.value.value),u("onBlur")}return(e,a)=>{const r=c("v-icon");return l(),s(t(V),{type:t(o)?"text":"password","model-value":t(n).value,label:e.label,"error-messages":e.errorMessages,"onUpdate:modelValue":m,onBlur:p},{"append-inner":k(()=>[e.required?(l(),s(r,{key:0,icon:"mdi mdi-asterisk",size:"x-small",color:"red"})):y("",!0),t(o)?(l(),s(r,{key:2,icon:"mdi mdi-eye-outline",size:"small",onClick:a[1]||(a[1]=f=>o.value=!1)})):(l(),s(r,{key:1,icon:"mdi mdi-eye-off-outline",size:"small",onClick:a[0]||(a[0]=f=>o.value=!0)}))]),_:1},8,["type","model-value","label","error-messages"])}}});export{b as _};