/* IronFit logic: Gym management dashboard (frontend demo) */
(function(){
var PL={"Monthly":[1,1000],"Quarterly":[3,2700],"Yearly":[12,9600]};
var $=function(x){return document.getElementById(x)},R=function(v){return "₹"+v.toLocaleString("en-IN")};
function add(d,m){var x=new Date(d);x.setMonth(x.getMonth()+m);return x}
function iso(d){return d.toISOString().slice(0,10)}
function nice(s){return new Date(s).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
var today=iso(new Date()),S;
try{S=JSON.parse(localStorage.getItem("gym")||"null")}catch(e){}
if(!S){S={m:[{id:1,n:"Aarav Shah",ph:"9876500011",p:"Monthly",s:today,e:iso(new Date(Date.now()+12*864e5)),paid:1000},{id:2,n:"Priya Patel",ph:"9876500022",p:"Yearly",s:today,e:iso(add(today,10)),paid:9600},{id:3,n:"Rahul Mehta",ph:"9876500033",p:"Quarterly",s:today,e:iso(new Date(Date.now()+3*864e5)),paid:2700},{id:4,n:"Sana Khan",ph:"9876500044",p:"Monthly",s:today,e:iso(new Date(Date.now()-5*864e5)),paid:1000}],c:[],id:5}}
function save(){try{localStorage.setItem("gym",JSON.stringify(S))}catch(e){}}
function st(m){var d=(new Date(m.e)-new Date(today))/864e5;return d<0?"Expired":d<=7?"Expiring":"Active"}
$("pl").innerHTML=Object.keys(PL).map(function(k){return "<option value=\""+k+"\">"+k+" ("+R(PL[k][1])+")</option>"}).join("");
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
function draw(){
 var q=$("q").value.toLowerCase(),f=$("fl").value,a=0,x=0,r=0;
 S.m.forEach(function(m){var s=st(m);if(s==="Active")a++;if(s==="Expiring")x++;r+=m.paid});
 $("k").innerHTML=[["Total members",S.m.length],["Active",a],["Expiring in 7 days",x],["Revenue collected",R(r)]].map(function(k){return '<div class="card k"><small>'+k[0]+'</small><b>'+k[1]+'</b></div>'}).join("");
 var L=S.m.filter(function(m){return m.n.toLowerCase().indexOf(q)>-1&&(f==="All"||st(m)===f)});
 $("tb").innerHTML=L.length?L.map(function(m){var s=st(m);return '<tr><td><b>'+esc(m.n)+'</b><br><small style="color:var(--muted)">'+m.ph+'</small></td><td>'+m.p+'</td><td>'+nice(m.e)+'</td><td><span class="b '+s+'">'+s+'</span></td><td><button class="sm" data-ci="'+m.id+'"'+(s==="Expired"?' disabled':'')+'>Check in</button><button class="sm" data-rn="'+m.id+'">Renew</button><button class="sm" data-dl="'+m.id+'" aria-label="Delete '+esc(m.n)+'">✕</button></td></tr>'}).join(""):'<tr><td colspan="5" class="none">No members found.</td></tr>';
 var C=S.c.filter(function(c){return c.d===today});
 $("ci").innerHTML=C.length?C.map(function(c){return '<tr><td>'+c.t+'</td><td>'+esc(c.n)+'</td><td>'+c.p+'</td></tr>'}).join(""):'<tr><td colspan="3" class="none">No check-ins yet today.</td></tr>';
 save()}
function msg(t){$("msg").textContent=t;setTimeout(function(){$("msg").textContent=""},3000)}
function get(id){return S.m.filter(function(m){return m.id==id})[0]}
document.addEventListener("click",function(e){var t=e.target,m;
 if(t.dataset.ci&&(m=get(t.dataset.ci))){if(S.c.some(function(c){return c.d===today&&c.mid===m.id}))return msg(m.n+" is already checked in today.");S.c.push({d:today,t:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),n:m.n,p:m.p,mid:m.id});msg(m.n+" checked in.");draw()}
 if(t.dataset.rn&&(m=get(t.dataset.rn))){var b=new Date(m.e)>new Date(today)?m.e:today;m.e=iso(add(b,PL[m.p][0]));m.paid+=PL[m.p][1];msg(m.n+" renewed until "+nice(m.e)+".");draw()}
 if(t.dataset.dl){S.m=S.m.filter(function(x){return x.id!=t.dataset.dl});draw()}
 if(t.dataset.t){document.querySelectorAll(".tabs button").forEach(function(b){b.setAttribute("aria-selected",b===t)});$("pm").hidden=t.dataset.t!=="m";$("pc").hidden=t.dataset.t!=="c"}});
$("tg").onclick=function(){$("add").classList.toggle("on")};
$("q").oninput=$("fl").onchange=draw;
$("f").onsubmit=function(e){e.preventDefault();var p=$("pl").value;S.m.unshift({id:S.id++,n:$("nm").value.trim(),ph:$("ph").value,p:p,s:today,e:iso(add(today,PL[p][0])),paid:PL[p][1]});e.target.reset();$("add").classList.remove("on");msg("Member added.");draw()};
draw();
})();
