document.getElementById('year').textContent=new Date().getFullYear();
var tw=['apps','jeux','outils','launchers'],ti=0,tc=0,del=false,el=document.getElementById('typed');
if(!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){(function tick(){var w=tw[ti];tc+=del?-1:1;el.textContent=w.slice(0,tc);var d=del?50:110;if(!del&&tc===w.length){del=true;d=1400}else if(del&&tc===0){del=false;ti=(ti+1)%tw.length;d=300}setTimeout(tick,d)})()}
var topBtn=document.querySelector('.top');
addEventListener('scroll',function(){topBtn.classList.toggle('show',scrollY>500)},{passive:true});

var cards=document.querySelectorAll('.card');
var D={
'AllInfo':{lead:'Un site web qui affiche les informations de ton appareil.',items:['Un site web : rien à installer','Accessible depuis ton navigateur, sur PC comme sur mobile'],links:[['Ouvrir le site','https://styventhedev.github.io/Allinfo/']]},
'PlombierTool':{lead:'Une application pensée pour les plombiers.',items:['Version Android (APK, environ 3,7 Mo)','Version Windows (installateur, environ 78 Mo)'],links:[['APK Android','plombiertool.apk',1],['Windows','PlombierTool-Setup.exe',1]]},
'StyvenShop':{lead:'Ma boutique de produits digitaux.',items:['Boutique hébergée sur Ko-fi','Produits 100 % numériques'],links:[['Visiter la boutique','https://ko-fi.com/styvenshop']]},
'STYVEN Glass':{lead:'Un launcher Android au style Liquid Glass, en développement.',items:['Gratuit, sans pub et sans compte','Grilles 4×5, 5×5 ou 5×6, dock de 4 à 6 applications','Icônes normales, monochromes ou Glass','Pensé pour rester fluide sur les appareils modestes','Développé en Kotlin avec Jetpack Compose'],links:[]},
'Cyber Toolkit':{lead:'Un menu de cybersécurité en console, en développement.',items:['Thème hacker noir et bleu','Fonctionne sur Android avec Pydroid 3, sans root','Scan des appareils du réseau Wi-Fi en cours d’ajout (ton propre réseau uniquement, avec autorisation)'],links:[]},
'RAVYX':{lead:'Un bot Discord multifonction, en préparation.',items:['Créé avec Bot Designer For Discord (BDFD), directement sur Android','Préfixe des commandes : !','Style cyberpunk, noir et bleu néon','Prévu : aide, modération, gestion de serveur, réponses personnalisées, modules ajoutés progressivement'],links:[]}
};
var modal=document.getElementById('modal'),mb=document.getElementById('mbody');
function openM(k){var d=D[k];var h='<h3>'+k+'</h3><p class="lead">'+d.lead+'</p><ul>'+d.items.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul>';
  h+=d.links.map(function(l,i){return '<a class="btn'+(i?'':' main')+'" href="'+l[1]+'"'+(l[2]?' download':' target="_blank" rel="noopener"')+'>'+l[0]+'</a>'}).join('');
  mb.innerHTML=h;modal.hidden=false;document.body.style.overflow='hidden'}
function closeM(){modal.hidden=true;document.body.style.overflow=''}
cards.forEach(function(c){var k=c.querySelector('h3').textContent;if(!D[k])return;var b=document.createElement('button');b.type='button';b.className='btn more';b.textContent='Détails';b.addEventListener('click',function(){openM(k)});c.appendChild(b)});
modal.addEventListener('click',function(e){if(e.target===modal||e.target.classList.contains('mx'))closeM()});
addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});
document.getElementById('filters').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('.filters button').forEach(function(x){x.classList.toggle('on',x===b)});
  var f=b.dataset.f;
  cards.forEach(function(c){c.hidden=!(f==='all'||c.dataset.c.split(' ').indexOf(f)>-1)});
});
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});
  cards.forEach(function(c){io.observe(c)});
}else{cards.forEach(function(c){c.classList.add('in')})}
