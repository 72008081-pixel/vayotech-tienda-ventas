/* Conversational catalog UI with explicit buying actions and summarized lead notifications. */
(function(){
'use strict';
const E=window.VayoAdvisor;
const $=id=>document.getElementById(id);
const modal=$('vayotech-chat-modal'),overlay=$('vayotech-chat-overlay'),messages=$('vayotech-chat-messages'),input=$('vayotech-user-input'),launcher=$('btn-vayotech-chat');
if(!E||!modal||!overlay||!messages||!input||!launcher)return;
let prefs=E.createState(),pending='',previousFocus=null,history=[],timer=null,revision=0,sentRevision=-1,request=null,resetGeneration=0;
const status=document.createElement('p');status.id='advisor-status';status.className='advisor-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
modal.insertBefore(status,$('vayotech-chat-form'));
const context=document.createElement('p');context.id='advisor-context';context.className='advisor-context';modal.insertBefore(context,messages);
modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Asesor de compras VayoTech');
messages.setAttribute('role','log');messages.setAttribute('aria-live','polite');messages.setAttribute('aria-relevant','additions');
launcher.setAttribute('aria-controls',modal.id);launcher.setAttribute('aria-expanded','false');
input.maxLength=1600;input.placeholder='Ej. Dota 2, S/ 50 y solo USB-C';input.setAttribute('aria-label','Tu consulta al asesor de compras');
const title=modal.querySelector('h4>span:first-child');if(title)title.textContent='Asesor de compras VayoTech';
const badge=modal.querySelector('h4>span:last-child');if(badge)badge.textContent='CATÁLOGO';
const subtitle=modal.querySelector('h4')?.parentElement.querySelector('p');if(subtitle)subtitle.textContent='Modelos, precios y combinaciones para tu equipo';
const footer=modal.querySelector('#vayotech-chat-form + div .text-deal-emerald.font-bold');if(footer)footer.textContent='Precios del catálogo';
const close=modal.querySelector('button[onclick="toggleVayoChat(false)"]');if(close)close.setAttribute('aria-label','Cerrar chat');

function catalog(){
 return Array.from(document.querySelectorAll('.product-card')).map(card=>{
   const action=card.querySelector('button[onclick^="addToCart("]')?.getAttribute('onclick')||'';
   const m=action.match(/^addToCart\('([^']+)',\s*([\d.]+),\s*'([^']+)'/);
   const image=card.querySelector('img[id]');if(!m||!image)return null;
   const id=image.id.replace(/^img-/,'');if(!card.id)card.id='producto-'+id;
   return {id,name:m[1],price:Number(m[2]),image:m[3],category:card.dataset.category,description:card.querySelector('p')?.textContent.trim()||'',anchor:card.id};
 }).filter(Boolean);
}
function scroll(){messages.scrollTop=messages.scrollHeight;}
function bubble(text,user){
 const row=document.createElement('div');row.className=user?'advisor-row advisor-user':'advisor-row advisor-bot';
 const box=document.createElement('div');box.className='advisor-bubble';box.textContent=text;row.append(box);messages.append(row);scroll();return box;
}
function button(text,fn,primary=false){
 const b=document.createElement('button');b.type='button';b.textContent=text;b.className=primary?'advisor-button advisor-primary':'advisor-button';b.onclick=fn;return b;
}
function choices(items){
 if(!items?.length)return;const group=document.createElement('div');group.className='advisor-choices';
 for(const text of items)group.append(button(text,()=>ask(text)));messages.append(group);scroll();
}
function summary(){
 return [
  'Consulta desde el asesor VayoTech',
  prefs.use?'Uso: '+({gaming:'Gaming',music:'Música',calls:'Clases y llamadas',daily:'Uso diario'}[prefs.use]):'',
  prefs.budget!==null?'Presupuesto: '+E.money(prefs.budget)+(prefs.totalBudget?' incluyendo entrega':''):'',
  prefs.connector?'Conexión: '+({typec:'USB-C',jack:'Jack 3.5 mm',lightning:'Lightning'}[prefs.connector]):'',
  prefs.location?'Entrega: '+prefs.location:'',
  ...prefs.last.map(o=>'Referencia: '+o.product.name+(o.addon?' + '+o.addon.name:'')+' = '+E.money(o.total)),
  '',
  'Conversación:',
  ...history.slice(-12).map(h=>(h.user?'Cliente: ':'Asesor: ')+h.text)
 ].filter(Boolean).join(String.fromCharCode(10)).slice(0,9000);
}
async function notify(force=false){
 if((revision===sentRevision&&!force)||!history.some(h=>h.user))return;
 const version=revision,generation=resetGeneration;
 if(request)request.abort();
 request=new AbortController();const controller=request;
 const timeout=setTimeout(()=>controller.abort(),9000);
 status.textContent='Registrando tu consulta para la tienda…';
 try{
  const response=await fetch(window.VAYOTECH_N8N_WEBHOOK,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
   tipo:'consulta_chatbot',idEvento:'ASESOR-'+(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2)),
   preguntaCliente:summary(),timestamp:new Date().toISOString()
  }),signal:controller.signal});
  if(!response.ok)throw Error('HTTP '+response.status);
  if(generation===resetGeneration&&version===revision){sentRevision=version;status.textContent='Consulta registrada para la tienda. El pedido se completa desde el carrito.';}
 }catch(error){
  if(generation===resetGeneration&&version===revision)status.textContent='El aviso no pudo registrarse. Puedes consultar por WhatsApp o continuar con el carrito.';
 }finally{clearTimeout(timeout);if(request===controller)request=null;}
}
function queue(){clearTimeout(timer);timer=setTimeout(()=>notify(),12000);}
function updateContext(){
 const parts=[];
 if(prefs.use)parts.push({gaming:'Gaming',music:'Música',calls:'Clases y llamadas',daily:'Uso diario'}[prefs.use]);
 if(prefs.budget!==null)parts.push('Hasta '+E.money(prefs.budget));
 if(prefs.connector)parts.push({typec:'USB-C',jack:'Jack 3.5 mm',lightning:'Lightning'}[prefs.connector]);
 context.textContent=parts.length?parts.join(' · '):'Elige según tu uso, presupuesto y conexión.';
}
window.toggleVayoChat=function(open){
 const show=typeof open==='boolean'?open:modal.classList.contains('hidden');
 document.body.classList.toggle('chat-open',show);
 if(show){
  previousFocus=document.activeElement;
  if(document.body.classList.contains('cart-open')&&window.toggleCartDrawer)window.toggleCartDrawer(false);
  modal.classList.remove('hidden','opacity-0','scale-95');modal.classList.add('flex');overlay.classList.remove('hidden','opacity-0');launcher.setAttribute('aria-expanded','true');input.focus();scroll();
 }else{
  modal.classList.add('hidden','opacity-0','scale-95');modal.classList.remove('flex');overlay.classList.add('hidden','opacity-0');launcher.setAttribute('aria-expanded','false');
  (previousFocus?.isConnected?previousFocus:launcher).focus();
 }
};
function showCart(){window.toggleVayoChat(false);window.toggleCartDrawer(true);}
function viewCatalog(anchor='catalogo'){
 window.toggleVayoChat(false);
 if(window.clearCatalogFilters)window.clearCatalogFilters();
 document.getElementById(anchor)?.scrollIntoView({behavior:'smooth',block:'start'});
}
function showProduct(p){
 window.toggleVayoChat(false);
 window.openModal(p.name,[p.image],E.money(p.price),p.description);
 $('modal-add-btn').onclick=()=>{window.closeModal();window.addToCart(p.name,p.price,p.image);};
 $('product-modal').querySelector('button').focus();
}
function handoff(box){
 const link=document.createElement('a');link.className='advisor-button advisor-primary';link.textContent='Abrir consulta en WhatsApp';
 link.href='https://wa.me/51918404281?text='+encodeURIComponent('Hola Ulianov, necesito ayuda para elegir mis audifonos.'+String.fromCharCode(10,10)+summary());
 link.target='_blank';link.rel='noopener noreferrer';link.onclick=()=>{clearTimeout(timer);void notify();};box.append(document.createElement('br'),link);
}
function applyDelivery(){
 if(!prefs.location)return;const select=$('pickup-location');let index=-1;
 Array.from(select.options).forEach((option,i)=>{
  const n=E.norm(option.getAttribute('data-name')||option.textContent);
  if(prefs.location==='Wanchaq'&&n.includes('wanchaq'))index=i;
  else if(prefs.location==='Provincias'&&/provincia|shalom/.test(n))index=i;
  else if(prefs.location==='Real Plaza'&&n.includes('real plaza'))index=i;
  else if(prefs.location==='UNSAAC'&&n.includes('unsaac'))index=i;
 });
 if(index>=0){select.selectedIndex=index;window.updateDeliveryFee();}
}
let addLock=false;
function addOffer(item,quantity=1){
 if(addLock)return;
 if(item.product.id==='az09'){ask('Consultar con Ulianov');return;}
 addLock=true;setTimeout(()=>addLock=false,1200);
 const latest=catalog(),product=latest.find(p=>p.id===item.product.id),addon=item.addon?latest.find(p=>p.id===item.addon.id):null;
 if(!product||(item.addon&&!addon)){bubble('Esta referencia ya no está disponible en el catálogo. Consulta con Ulianov.',false);return;}
 window.toggleVayoChat(false);applyDelivery();
 for(let i=0;i<quantity;i++){
  window.addToCart(product.name,product.price,product.image);
  if(addon)window.addToCart(addon.name,addon.price,addon.image);
 }
 history.push({user:false,text:'Selección agregada al carrito: '+quantity+' x '+product.name+(addon?' con DAC':'')});
 revision++;queue();
}
function cards(items,kind){
 items.forEach((o,index)=>{
  const card=document.createElement('article');card.className='advisor-product';card.dataset.productId=o.product.id;
  const tag=document.createElement('span');tag.className='advisor-tag';tag.textContent=kind==='recommendations'?(index===0?'RECOMENDADO PARA TI':'ALTERNATIVA DEL CATÁLOGO'):'REFERENCIA DEL CATÁLOGO';
  const head=document.createElement('div');head.className='advisor-product-head';
  const img=document.createElement('img');img.src=o.product.image;img.alt=o.product.name;img.loading='lazy';
  const copy=document.createElement('div');const name=document.createElement('h5');name.textContent=o.product.name;const price=document.createElement('strong');price.textContent=E.money(o.total)+(o.addon?' con DAC':'');copy.append(name,price);head.append(img,copy);
  const description=document.createElement('p');description.textContent=o.reason;
  const connection=document.createElement('p');connection.className='advisor-compatibility';connection.textContent=o.warning;
  const mic=document.createElement('p');mic.className='advisor-source';mic.textContent=o.product.category==='accesorios'?'Accesorio del catálogo.':o.micKnown?'Micrófono indicado en el catálogo; confirma la versión.':'Micrófono: confirmar la versión antes de comprar.';
  card.append(tag,head,description);
  if(o.addon){const breakdown=document.createElement('p');breakdown.className='advisor-breakdown';breakdown.textContent=E.money(o.product.price)+' audífonos + '+E.money(o.addon.price)+' adaptador DAC = '+E.money(o.total);card.append(breakdown);}
  if(prefs.totalBudget&&prefs.deliveryFee!==null){
   const delivered=document.createElement('p');delivered.className='advisor-breakdown';delivered.textContent='Con entrega en '+prefs.location+': '+E.money(o.total+prefs.deliveryFee);card.append(delivered);
  }
  card.append(connection,mic);
  const source=document.createElement('a');source.className='advisor-reference';source.href='#'+o.product.anchor;source.textContent='Referencia: ficha de '+o.product.name;source.onclick=event=>{event.preventDefault();viewCatalog(o.product.anchor);};
  card.append(source);
  const actions=document.createElement('div');actions.className='advisor-product-actions';
  actions.append(button(o.product.id==='az09'?'Consultar pines':o.addon?'Agregar audífonos + DAC':'Agregar al carrito',()=>addOffer(o),true),button('Ver ficha',()=>showProduct(o.product)));
  card.append(actions);messages.append(card);
 });
 scroll();
}
function render(answer){
 updateContext();const box=bubble(answer.text,false);
 history.push({user:false,text:answer.text+(answer.items?' '+answer.items.map(o=>o.product.name+' '+E.money(o.total)).join('; '):'')});
 if(answer.items?.length)cards(answer.items,answer.kind);
 if(answer.note){const note=document.createElement('p');note.className='advisor-note';note.textContent=answer.note;messages.append(note);}
 if(answer.kind==='handoff')handoff(box);
 if(answer.kind==='checkout')box.append(document.createElement('br'),button('Revisar mi carrito',showCart,true));
 if(answer.kind==='add')addOffer(answer.item,answer.quantity);
 choices(answer.choices);scroll();
}
function ask(text,alreadyShown=false){
 const q=String(text||'').trim().slice(0,1600);if(!q)return;
 if(!alreadyShown)bubble(q,true);history.push({user:true,text:q});history=history.slice(-24);
 revision++;status.textContent='';
 if(q==='Ver packs en la tienda'){viewCatalog('ofertas');return;}
 const answer=E.respond(prefs,q,catalog());prefs=answer.state;render(answer);queue();
}
window.appendUserMessage=text=>{pending=String(text||'').trim().slice(0,1600);if(pending)bubble(pending,true);};
window.processBotResponse=topic=>{const q=pending||String(topic||'');const shown=!!pending;pending='';ask(q,shown);};
window.handleUserChatSubmit=function(event){event.preventDefault();const q=input.value.trim();if(!q)return false;input.value='';ask(q);return false;};
window.resetVayoChat=function(){
 clearTimeout(timer);if(request)request.abort();resetGeneration++;prefs=E.createState();pending='';history=[];revision=0;sentRevision=-1;input.value='';status.textContent='';messages.replaceChildren();
 updateContext();bubble('Te ayudo a elegir y comprar con precios del catálogo. Dime para qué usarás tus audífonos, cuánto quieres gastar y si tu equipo tiene jack 3.5 mm o USB-C. También puedes preguntar por un modelo concreto.',false);
 choices(['Para gaming','Para música','Para clases y llamadas','Precios por mayor']);
 const example=document.createElement('p');example.className='advisor-note';example.textContent='Ejemplo: “Para Dota 2, hasta S/ 50, solo USB-C”.';messages.append(example);input.focus();
};
modal.addEventListener('keydown',event=>{
 if(event.key==='Escape'){event.preventDefault();event.stopPropagation();window.toggleVayoChat(false);}
 else if(event.key==='Tab'){
  const list=Array.from(modal.querySelectorAll('button,input,a[href]')).filter(el=>!el.disabled&&el.getClientRects().length);
  if(!list.length)return;const first=list[0],last=list[list.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
catalog();window.resetVayoChat();
// Initializing a hidden dialog must not steal keyboard focus from the page.
if(modal.classList.contains('hidden')&&document.activeElement===input)input.blur();
})();
