/* TableTap logic: Restaurant management dashboard (frontend demo) */
(function(){
var MENU=[["Paneer Tikka",249],["Veg Spring Rolls",169],["Butter Paneer",299],["Gujarati Thali",349],["Butter Naan",49],["Jeera Rice",129],["Masala Chaas",59],["Gulab Jamun",99]];
var $=function(x){return document.getElementById(x)},R=function(v){return "₹"+v.toLocaleString("en-IN")};
var S;try{S=JSON.parse(localStorage.getItem("tt")||"null")}catch(e){}
if(!S){S={t:[1,2,3,4,5,6,7,8].map(function(i){return {n:i,o:{}}}),sales:0};S.t[1].o={"Paneer Tikka":1,"Masala Chaas":2};S.t[4].o={"Gujarati Thali":2}}
var sel=null;
function save(){try{localStorage.setItem("tt",JSON.stringify(S))}catch(e){}}
function sub(o){return Object.keys(o).reduce(function(a,k){return a+o[k]*MENU.filter(function(m){return m[0]===k})[0][1]},0)}
function draw(){
 $("sl").textContent=R(S.sales);
 $("tb").innerHTML=S.t.map(function(t){var b=Object.keys(t.o).length>0;return '<button class="tb '+(b?'busy':'free')+'" data-n="'+t.n+'" aria-pressed="'+(sel===t.n)+'"><b>Table '+t.n+'</b><small>'+(b?R(sub(t.o))+' open':'Free')+'</small></button>'}).join("");
 var t=S.t.filter(function(x){return x.n===sel})[0];
 $("ot").textContent=t?"Order for Table "+t.n:"Select a table";
 $("mn").innerHTML=MENU.map(function(m){return '<button class="mi" data-a="'+m[0]+'"'+(t?'':' disabled')+'><b>'+m[0]+'</b><span>'+R(m[1])+'</span></button>'}).join("");
 var o=t?t.o:{},ks=Object.keys(o);
 $("ol").innerHTML=ks.length?ks.map(function(k){return '<div class="ln"><span>'+k+'</span><div><button data-m="'+k+'" aria-label="Remove one '+k+'">−</button><b>'+o[k]+'</b><button data-p="'+k+'" aria-label="Add one '+k+'">+</button></div></div>'}).join(""):'<p class="muted">'+(t?"No items yet. Tap a dish above.":"Choose a table to start an order.")+'</p>';
 var s=sub(o),g=Math.round(s*.05);
 $("tt").innerHTML=ks.length?'<div><span>Subtotal</span><span>'+R(s)+'</span></div><div><span>GST (5%)</span><span>'+R(g)+'</span></div><div class="g"><span>Total</span><span>'+R(s+g)+'</span></div>':"";
 $("pay").disabled=!ks.length;save()}
document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var t=S.t.filter(function(x){return x.n===sel})[0],d=b.dataset;
 if(d.n){sel=+d.n;$("msg").textContent=""}
 if(d.a&&t){t.o[d.a]=(t.o[d.a]||0)+1}
 if(d.p&&t){t.o[d.p]++}
 if(d.m&&t){if(--t.o[d.m]<1)delete t.o[d.m]}
 if(b.id==="pay"&&t){var s=sub(t.o),g=Math.round(s*.05);S.sales+=s+g;t.o={};$("msg").textContent="Table "+t.n+" billed "+R(s+g)+" and is free now."}
 draw()});
draw();
})();
