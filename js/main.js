/* Portfolio scripts: intro, theme toggle, menu, typing text, resume viewer, contact form */
(function(){
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
// split text hero
var h=document.getElementById("name"),t=h.textContent;h.textContent="";
t.split(" ").forEach(function(w,i){var s=document.createElement("span");s.textContent=w;s.style.animationDelay=(i*0.12)+"s";h.appendChild(s);h.appendChild(document.createTextNode(" "))});
// typing role
var roles=["Frontend Developer"],r=0,c=0,del=false,el=document.getElementById("role");
function tick(){var w=roles[r];el.textContent=w.slice(0,c);
 if(reduce){el.textContent=roles[0];return}
 if(!del&&c<w.length){c++;setTimeout(tick,80)}else if(!del){del=true;setTimeout(tick,2200)}else if(c>0){c--;setTimeout(tick,40)}else{del=false;r=(r+1)%roles.length;setTimeout(tick,300)}}
tick();
// reveal + skill bars
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll(".bar i").forEach(function(b){b.style.width=b.dataset.w})}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(n){io.observe(n)});
// spotlight + tilt cards
document.querySelectorAll(".card").forEach(function(cd){
 cd.addEventListener("pointermove",function(e){var b=cd.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;cd.style.setProperty("--x",x+"px");cd.style.setProperty("--y",y+"px");
  if(!reduce&&e.pointerType==="mouse"){cd.style.transform="perspective(700px) rotateX("+((y/b.height-.5)*-6)+"deg) rotateY("+((x/b.width-.5)*6)+"deg)"}});
 cd.addEventListener("pointerleave",function(){cd.style.transform=""})});
// intro: big photo on open
var intro=document.getElementById("intro");
intro.querySelector("img").src=document.querySelector(".photo img").src;
intro.classList.add("on");document.body.style.overflow="hidden";
function closeIntro(){if(!intro.parentNode)return;intro.classList.add("out");document.body.style.overflow="";setTimeout(function(){intro.remove()},800)}
document.getElementById("enter").onclick=closeIntro;
addEventListener("keydown",function(e){if(e.key==="Escape")closeIntro()});
setTimeout(closeIntro,5000);
// count up stats
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var n=+e.target.dataset.count,t0=performance.now();(function s(t){var k=reduce?1:Math.min(1,(t-t0)/1200);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(s)})(t0)})},{threshold:.6});
document.querySelectorAll("[data-count]").forEach(function(n){cio.observe(n)});
// cursor glow (mouse only)
var gl=document.querySelector(".glow");
addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||reduce)return;gl.style.opacity=1;gl.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)"},{passive:true});
// copy email
var cp=document.getElementById("cp");
cp.onclick=function(){var m="ansarihabibullah95374@gmail.com";function ok(){cp.textContent="Copied!";setTimeout(function(){cp.textContent="Copy"},1800)}
 try{navigator.clipboard.writeText(m).then(ok,function(){cp.textContent="Press and hold to copy"})}catch(e){cp.textContent="Copy failed"}};
// mobile menu
var mb=document.getElementById("mb"),lk=document.getElementById("links");
function menu(o){lk.classList.toggle("on",o);mb.setAttribute("aria-expanded",o);mb.setAttribute("aria-label",o?"Close menu":"Open menu")}
mb.onclick=function(){menu(!lk.classList.contains("on"))};
lk.addEventListener("click",function(e){if(e.target.tagName==="A")menu(false)});
addEventListener("keydown",function(e){if(e.key==="Escape")menu(false)});
addEventListener("resize",function(){if(innerWidth>1000)menu(false)});
// Resume download (the PDF file is stored next to index.html)
function downloadResume(){var a=document.createElement("a");a.href="Habibullah_Ansari_Resume.pdf";a.download="Habibullah_Ansari_Resume.pdf";document.body.appendChild(a);a.click();a.remove()}
document.querySelectorAll(".cv-dl").forEach(function(b){b.onclick=downloadResume});
// lightbox
var lb=document.getElementById("lb"),lbi=lb.querySelector("img");
function openLb(img,res){lbi.src=img.dataset.full||img.src;lbi.alt=img.alt;lb.classList.toggle("res",!!res);lb.classList.remove("zoom");lb.classList.add("on");lb.scrollTop=0;document.body.style.overflow="hidden"}
function closeLb(){lb.classList.remove("on","zoom");if(!document.getElementById("intro"))document.body.style.overflow=""}
document.querySelectorAll("[data-lb]").forEach(function(b){b.onclick=function(){openLb(b.querySelector("img"),b.classList.contains("rprev"))}});
document.getElementById("vr").onclick=function(){openLb(document.querySelector(".rprev img"),true)};
lbi.onclick=function(e){e.stopPropagation();lb.classList.toggle("zoom")};
lb.onclick=function(e){if(e.target===lb||e.target.id==="lbx")closeLb()};
addEventListener("keydown",function(e){if(e.key==="Escape")closeLb()});
// scroll progress + back to top
var pg=document.getElementById("prog"),tp=document.getElementById("top");
addEventListener("scroll",function(){var d=document.documentElement,m=d.scrollHeight-innerHeight;pg.style.width=(m>0?scrollY/m*100:0)+"%";tp.classList.toggle("show",scrollY>600)},{passive:true});
tp.onclick=function(){scrollTo({top:0,behavior:reduce?"auto":"smooth"})};
// theme toggle
var root=document.documentElement;
var S={m:null,p:"violet"},th=document.getElementById("theme");
try{S.m=localStorage.getItem("th-m");S.p="violet"}catch(e){}
if(S.m!=="light"&&S.m!=="dark")S.m=matchMedia("(prefers-color-scheme:light)").matches?"light":"dark";
function apply(){root.setAttribute("data-theme",S.m);root.setAttribute("data-pal",S.p);
 th.textContent=S.m==="dark"?"\u2600":"\u263E";th.setAttribute("aria-label",S.m==="dark"?"Switch to light mode":"Switch to dark mode");
 document.querySelectorAll(".dots button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.p===S.p)});
 try{localStorage.setItem("th-m",S.m);localStorage.setItem("th-pal",S.p)}catch(e){}}
apply();
th.onclick=function(){S.m=S.m==="dark"?"light":"dark";apply()};
document.querySelectorAll(".dots button").forEach(function(b){b.onclick=function(){S.p=b.dataset.p;apply()}});
// contact form opens email app
var cf=document.getElementById("f"),V=function(i){return document.getElementById(i).value.trim()};
function brief(){return ["Name: "+V("fn"),"Email: "+V("fe"),"Phone/WhatsApp: "+(V("fp")||"-"),"Business: "+(V("fb")||"-"),"Project type: "+V("ft"),"Deadline: "+V("fd"),"Preferred contact: "+V("fc"),"Reference link: "+(V("fl")||"-"),"","Project details:",V("fm")].join("\n")}
var FORMSPREE_ID="xljbzvao"; // paste your Formspree form ID here after hosting the site, e.g. "xyzabcde"
function viaEmail(){location.href="mailto:ansarihabibullah95374@gmail.com?subject="+encodeURIComponent("Project enquiry: "+V("ft")+" ("+V("fn")+")")+"&body="+encodeURIComponent(brief());document.getElementById("fs").textContent="Your email app is opening with all your details. Press send there."}
cf.onsubmit=function(e){e.preventDefault();var fs=document.getElementById("fs");
 if(!FORMSPREE_ID)return viaEmail();
 fs.textContent="Sending...";
 fetch("https://formspree.io/f/"+FORMSPREE_ID,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({_subject:"Portfolio enquiry: "+V("ft")+" ("+V("fn")+")",_replyto:V("fe"),name:V("fn"),email:V("fe"),phone:V("fp"),business:V("fb"),project_type:V("ft"),deadline:V("fd"),preferred_contact:V("fc"),reference_link:V("fl"),message:V("fm")})})
 .then(function(r){if(!r.ok)throw 0;cf.reset();fs.textContent="Thank you! Your message was sent. I will reply soon."})
 .catch(function(){viaEmail()})};
document.getElementById("wa").onclick=function(){if(!cf.reportValidity())return;window.open("https://wa.me/919586813157?text="+encodeURIComponent("Hi Habibullah, I found you through your portfolio.\n\n"+brief()),"_blank","noopener");document.getElementById("fs").textContent="Opening WhatsApp with your details."};
})();
