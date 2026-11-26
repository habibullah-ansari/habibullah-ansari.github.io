/* ShopSphere logic: E-commerce website demo */
(function(){
var P=[
{i:1,n:"Wireless Headphones",c:"Electronics",p:1999,o:2999,r:4.5,m:"images/products/wireless-headphones.jpg",d:"Soft cushioned ear cups, clear sound and deep bass for all-day listening."},
{i:2,n:"Smart Watch",c:"Electronics",p:3499,o:4999,r:4.3,m:"images/products/smart-watch.jpg",d:"Tracks steps, sleep and heart rate. Water resistant with a bright display."},
{i:3,n:"Bluetooth Party Speaker",c:"Electronics",p:3999,o:5499,r:4.4,m:"images/products/bluetooth-speaker.jpg",d:"Powerful bass speaker for parties, events and karaoke nights."},
{i:4,n:"Leather Jacket",c:"Fashion",p:4999,o:6999,r:4.2,m:"images/products/leather-jacket.jpg",d:"Classic brown leather jacket with a comfortable fit and a clean finish."},
{i:5,n:"Running Shoes",c:"Fashion",p:2799,o:3499,r:4.6,m:"images/products/running-shoes.jpg",d:"Light, breathable shoes with a cushioned sole for daily running and walking."},
{i:6,n:"Leather Wallet",c:"Fashion",p:799,o:1199,r:4.1,m:"images/products/leather-wallet.jpg",d:"Slim brown leather wallet with card slots and a smooth, durable finish."},
{i:7,n:"Handmade Ceramic Cup",c:"Home",p:599,o:799,r:4.7,m:"images/products/ceramic-cup.jpg",d:"Handmade stoneware cup with a speckled finish. Perfect for tea and coffee."},
{i:8,n:"Ceramic Table Lamp",c:"Home",p:1299,o:1699,r:4.3,m:"images/products/table-lamp.jpg",d:"Sculpted ceramic lamp with a soft fabric shade for a warm, calm glow."}];
var $=function(x){return document.getElementById(x)},R=function(v){return "₹"+v.toLocaleString("en-IN")};
var cat="All",C={},W=[],cp=false;
function by0(id){return P.filter(function(p){return p.i==id})[0]}
try{C=JSON.parse(localStorage.getItem("ss-c")||"{}");W=JSON.parse(localStorage.getItem("ss-w")||"[]")}catch(e){}
try{Object.keys(C).forEach(function(k){if(!by0(k))delete C[k]});W=W.filter(function(i){return by0(i)})}catch(e){}
function save(){try{localStorage.setItem("ss-c",JSON.stringify(C));localStorage.setItem("ss-w",JSON.stringify(W))}catch(e){}}
function by(id){return P.filter(function(p){return p.i==id})[0]}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
function toast(t){var el=$("toast");el.textContent=t;el.classList.add("on");setTimeout(function(){el.classList.remove("on")},1800)}
function stars(r){return "★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r))+" "+r}
function chips(){$("chips").innerHTML=["All","Electronics","Fashion","Home","Wishlist"].map(function(c){return '<button class="chip" aria-pressed="'+(c===cat)+'" data-c="'+c+'">'+(c==="Wishlist"?"♡ ":"")+c+'</button>'}).join("")}
function cats(){var E=["Electronics","Fashion","Home"];$("cats").innerHTML=E.map(function(c){var L=P.filter(function(x){return x.c===c}),n=L.length;return '<button class="cat" data-c="'+c+'"><img src="'+L[0].m+'" alt=""><b>'+c+'</b><small>'+n+' products</small></button>'}).join("")}
function grid(){
 var t=$("q").value.trim().toLowerCase(),s=$("s").value;
 var L=P.filter(function(x){return (cat==="All"||(cat==="Wishlist"?W.indexOf(x.i)>-1:x.c===cat))&&x.n.toLowerCase().indexOf(t)>-1});
 if(s==="l")L.sort(function(a,b){return a.p-b.p});if(s==="h")L.sort(function(a,b){return b.p-a.p});if(s==="r")L.sort(function(a,b){return b.r-a.r});
 $("grid").innerHTML=L.map(function(x){var w=W.indexOf(x.i)>-1,pc=Math.round((1-x.p/x.o)*100);return '<article class="p" data-v="'+x.i+'"><div class="pic"><img src="'+x.m+'" alt="'+x.n+'" loading="lazy" decoding="async"><span class="off'+(pc>=30?' hot':'')+'">'+(pc>=30?'HOT ':'')+'-'+pc+'%</span><button class="hrt" data-w="'+x.i+'" aria-label="'+(w?"Remove from":"Add to")+' wishlist">'+(w?"♥":"♡")+'</button></div><div class="pb"><small>'+x.c+'</small><h2>'+x.n+'</h2><span class="st" aria-label="Rating '+x.r+' out of 5">'+stars(x.r)+' <small style="color:var(--muted)">('+(x.i*47+60)+')</small></span><span class="stk">● In stock</span><div class="row"><span class="price"><b>'+R(x.p)+'</b><s>'+R(x.o)+'</s></span><button class="add" data-a="'+x.i+'" aria-label="Add '+x.n+' to cart">Add</button></div></div></article>'}).join("");
 $("empty").style.display=L.length?"none":"block";$("count").textContent=L.length+" products";$("wn").textContent=W.length}
function tot(){var s=0,n=0;Object.keys(C).forEach(function(k){s+=by(k).p*C[k];n+=C[k]});var d=cp?Math.round(s*.1):0,a=s-d,sh=(!s||a>=1499)?0:99;return {s:s,n:n,d:d,sh:sh,t:a+sh}}
function draw(){
 var T=tot(),ids=Object.keys(C);
 $("items").innerHTML=ids.length?ids.map(function(id){var x=by(id);return '<div class="it"><img class="th" src="'+x.m+'" alt=""><div><b>'+x.n+'</b><div class="q"><button data-m="'+id+'" aria-label="Decrease quantity">−</button><span>'+C[id]+'</span><button data-p="'+id+'" aria-label="Increase quantity">+</button></div></div><b>'+R(x.p*C[id])+'</b></div>'}).join(""):'<p style="color:var(--muted)">Your cart is empty.</p>';
 $("n").textContent=T.n;$("sub").textContent=R(T.s);$("ds").textContent=T.d?"-"+R(T.d):"₹0";$("dl").textContent=T.s?(T.sh?R(T.sh):"Free"):"₹0";$("tot").textContent=R(T.t);$("go").disabled=!T.n;save()}
function open(id){var x=by(id),w=W.indexOf(x.i)>-1;
 $("pd").innerHTML='<div class="det"><div class="pic"><img src="'+x.m+'" alt="'+x.n+'"></div><div><small style="color:var(--muted)">'+x.c+'</small><h2>'+x.n+'</h2><span class="st">'+stars(x.r)+'</span><p>'+x.d+'</p><p><b style="font-size:1.4rem;color:var(--text)">'+R(x.p)+'</b> <s>'+R(x.o)+'</s></p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-a="'+x.i+'" data-x="1">Add to cart</button><button class="ic" data-w="'+x.i+'" data-x="1">'+(w?"♥ Saved":"♡ Wishlist")+'</button></div></div></div>';$("pm").classList.add("on")}
function checkout(){var T=tot();
 $("cb").innerHTML='<h2 style="margin:0 0 14px">Checkout</h2><form class="co" id="cf"><label>Full name<input id="fn" required maxlength="40" autocomplete="name"></label><label>Phone<input id="fp" required inputmode="numeric" pattern="[0-9]{10}" maxlength="10" placeholder="10 digits" autocomplete="tel"></label><label class="w">Email<input id="fe" type="email" required autocomplete="email"></label><label class="w">Address<textarea id="fa" rows="2" required maxlength="120" autocomplete="street-address"></textarea></label><label>City<input id="fc" required autocomplete="address-level2"></label><label>PIN code<input id="fz" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="postal-code"></label><label class="w">Payment method<select id="fm"><option>Cash on delivery</option><option>UPI</option><option>Credit or debit card</option></select></label><div class="w sum"><div class="t"><span>Order total</span><span>'+R(T.t)+'</span></div></div><button class="btn w" type="submit">Place order</button></form>';
 $("co").classList.add("on");set(false);
 $("cf").onsubmit=function(e){e.preventDefault();var o="SS"+Math.floor(100000+Math.random()*899999),dt=new Date(Date.now()+4*864e5).toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"short"}),nm=$("fn").value.trim(),pay=$("fm").value;
  $("cb").innerHTML='<div class="done"><div style="font-size:3rem">🎉</div><h2>Order placed!</h2><p>Thank you, <b>'+esc(nm)+'</b>. Your order <b>'+o+'</b> of <b>'+R(T.t)+'</b> ('+pay+') will arrive by <b>'+dt+'</b>.</p><button class="btn" data-x="1">Continue shopping</button></div>';C={};cp=false;draw()}}
function set(o){document.body.classList.toggle("open",o)}
document.addEventListener("click",function(e){var t=e.target,b=t.closest("button"),d=b?b.dataset:{};
 if(d.c){cat=d.c;chips();grid();if(b.classList.contains("cat")||b.classList.contains("pr"))$("grid").scrollIntoView({behavior:"smooth"})}
 else if(d.w){var i=+d.w,k=W.indexOf(i);if(k>-1)W.splice(k,1);else{W.push(i);toast("Saved to wishlist")}save();grid()}
 else if(d.a){C[d.a]=(C[d.a]||0)+1;draw();toast("Added to cart")}
 else if(d.p){C[d.p]++;draw()}
 else if(d.m){if(--C[d.m]<1)delete C[d.m];draw()}
 else if(!b){var a=t.closest("[data-v]");if(a)open(a.dataset.v)}
 if(d.x||t.classList.contains("ov")){$("pm").classList.remove("on");$("co").classList.remove("on")}});
$("oc").onclick=function(){set(true)};$("cc").onclick=$("shade").onclick=function(){set(false)};
$("wb").onclick=function(){cat="Wishlist";chips();grid();scrollTo({top:300,behavior:"smooth"})};
$("sh").onclick=function(){$("grid").scrollIntoView({behavior:"smooth"})};
addEventListener("keydown",function(e){if(e.key==="Escape"){set(false);$("pm").classList.remove("on");$("co").classList.remove("on")}});
$("q").oninput=$("s").onchange=grid;
$("ap").onclick=function(){var v=$("cd").value.trim().toUpperCase();if(v==="WELCOME10"){cp=true;$("cm").textContent="Coupon applied: 10% off."}else{cp=false;$("cm").textContent="Invalid code. Try WELCOME10."}draw()};
$("go").onclick=checkout;
chips();cats();grid();draw();
})();
