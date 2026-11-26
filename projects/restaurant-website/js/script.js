/* Spice Route Kitchen logic: Restaurant landing page */
(function(){
var D={"Starters":[["Paneer Tikka","Smoky cottage cheese with mint chutney",249],["Khaman Dhokla","Soft steamed gram flour cakes",129],["Veg Spring Rolls","Crispy rolls with sweet chilli sauce",169]],
"Main course":[["Surti Undhiyu","Winter vegetables in green masala",279],["Butter Paneer Masala","Creamy tomato gravy",299],["Gujarati Thali","Dal, kadhi, sabzi, roti, rice and sweet",349]],
"Desserts":[["Gulab Jamun","Warm milk dumplings in syrup",99],["Shrikhand","Saffron strained yogurt",119],["Kulfi Falooda","Pistachio kulfi with vermicelli",149]]};
var T=document.querySelector(".tabs"),M=document.getElementById("mn");
Object.keys(D).forEach(function(k,i){var b=document.createElement("button");b.textContent=k;b.setAttribute("role","tab");b.onclick=function(){show(k)};T.appendChild(b)});
function show(k){Array.prototype.forEach.call(T.children,function(b){b.setAttribute("aria-selected",b.textContent===k)});
 M.innerHTML=D[k].map(function(x){return '<div class="m"><div><b>'+x[0]+'</b><span>'+x[1]+'</span></div><em>₹'+x[2]+'</em></div>'}).join("")}
show("Starters");
var d=document.getElementById("d");d.min=new Date().toISOString().slice(0,10);
document.getElementById("f").onsubmit=function(e){e.preventDefault();
 document.getElementById("ok").textContent="Thank you, "+document.getElementById("n").value+"! Your request for "+document.getElementById("g").value+" on "+d.value+" is received. (Demo form)";e.target.reset()};
})();
