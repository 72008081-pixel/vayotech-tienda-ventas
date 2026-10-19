(function(root){
'use strict';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
const money=n=>'S/ '+Number(n).toFixed(2);
const aliases={'edx-lite':['edx lite'],'edx-pro':['edx pro'],'edx-prox':['edx pro x','edx prox'],'edx-pro2':['edx pro 2','edx pro2'],castor:['castor harman','castor bass','castor'],'castor-pro':['castor pro'],gale:['gale metal','gale'],vader:['vader'],dqs:['dqs'],pisces:['pisces'],'zsn-pro2':['zsn pro 2','zsn pro2'],duonic:['duonic'],az09:['az09','az 09'],'cable-cobre':['cable de cobre','cable cobre'],'cable-silver':['cable silver','cable de plata','cable plateado'],'cable-m2':['cable m2'],'adaptador-dac':['adaptador dac','adaptador type c','adaptador tipo c','dac'],estuche:['estuche']};
function createState(){return {use:null,budget:null,connector:null,mic:false,sound:null,location:null,deliveryFee:null,totalBudget:false,step:null,last:[],excluded:[],turn:0};}
function matching(q,catalog){
 let remaining=q;const result=[];
 const list=catalog.flatMap(p=>(aliases[p.id]||[norm(p.name)]).map(alias=>({p,alias}))).sort((a,b)=>b.alias.length-a.alias.length);
 for(const {p,alias} of list){
   const safe=alias.replace(/[.*+?^$()|[\]\\{}]/g,'\\$&');
   const re=new RegExp('(^|[^a-z0-9])'+safe+'(?=$|[^a-z0-9])');
   if(re.test(remaining)){if(!result.some(x=>x.id===p.id))result.push(p);remaining=remaining.replace(re,' ');}
 }return result;
}
function parseBudget(q,step){
 if(/\bdolares?\b|\busd\b/.test(q))return {foreign:true};
 let m=q.match(/(?:entre|de)\s*(\d+(?:[.,]\d+)?)\s*(?:y|a|-)\s*(\d+(?:[.,]\d+)?)/);
 if(m)return {value:Number(m[2].replace(',','.'))};
 for(const re of [/\bs\s*\/?\.?\s*(-?\d+(?:[.,]\d+)?)/,/(-?\d+(?:[.,]\d+)?)\s*soles\b/,/(?:presupuesto(?: es| de)?|hasta|maximo|menos de|tengo(?: unos)?|por)\s*(?:s\/\.?\s*)?(-?\d+(?:[.,]\d+)?)/]){
   m=q.match(re);if(m)return {value:Number(m[1].replace(',','.'))};
 }
 if(step==='budget'&&/^-?\d+(?:[.,]\d+)?$/.test(q))return {value:Number(q.replace(',','.'))};
 return {};
}
function update(s,q){
 const next={...s,last:[...s.last],excluded:[...s.excluded],turn:s.turn+1};
 if(/dota|gaming|gamer|juega|jugar|juegos|valorant|free\s*fire|cs2|warzone|mobile legends|competitivo/.test(q))next.use='gaming';
 else if(/musica|hi[\s-]?fi|audiofilo|voces|instrumento|cantar|monitoreo/.test(q))next.use='music';
 else if(/clases|estudi|zoom|meet|trabaj|llamad|oficina/.test(q)){next.use='calls';next.mic=true;}
 else if(/uso diario|para todo|general/.test(q))next.use='daily';
 if(/bajos|graves|bass/.test(q))next.sound='bass';
 if(/voces|detalle|acustic/.test(q))next.sound='detail';
 if(/sin micro|no necesito micro/.test(q))next.mic=false;
 else if(/con micro|necesito micro|microfono|hablar en discord/.test(q))next.mic=true;
 if(/lightning/.test(q))next.connector='lightning';
 else if(/(?:no tengo|no tiene|sin)\s*(?:entrada\s*(?:de\s*)?)?jack|type[\s-]?c|tipo[\s-]?c|usb[\s-]?c|solo usb/.test(q))next.connector=/(?:no tengo|no tiene|sin)\s*(?:usb[\s-]?c|type[\s-]?c)/.test(q)&&/jack/.test(q)?'jack':'typec';
 else if(/jack|3[.,]5|auxiliar/.test(q))next.connector='jack';
 if(/wanchaq|huayruropata|recojo gratis|recoger en almacen/.test(q)){next.location='Wanchaq';next.deliveryFee=0;}
 else if(/provincia|shalom|olva|quillabamba|sicuani|espinar|abancay|urubamba|calca|puno/.test(q)){next.location='Provincias';next.deliveryFee=12;}
 else if(/san francisco|real plaza|unsaac|san jeronimo|san sebastian|cusco centro|entrega local/.test(q)){next.location=q.includes('real plaza')?'Real Plaza':q.includes('unsaac')?'UNSAAC':'Punto local en Cusco';next.deliveryFee=3;}
 if(/\b(?:incluye|incluido|incluyendo|incluir|con)\b.*(?:envio|delivery)|total con/.test(q))next.totalBudget=true;
 if(/sin (?:envio|delivery)|solo (?:audifono|producto)/.test(q))next.totalBudget=false;
 const budget=parseBudget(q,s.step||(!s.last.length?'budget':null));if(budget.value!==undefined)next.budget=budget.value;
 return {state:next,budget};
}
function offer(p,s,catalog){
 const native=p.id==='pisces'?'typec':'jack',accessory=p.category==='accesorios';
 let addon=null,warning='';
 if(!accessory&&s.connector==='typec'&&native==='jack'){addon=catalog.find(x=>x.id==='adaptador-dac');if(!addon)return null;warning='Incluye adaptador DAC del catálogo. Confirma compatibilidad con tu equipo.';}
 else if(!accessory&&s.connector==='jack'&&native==='typec')return null;
 else if(!accessory&&s.connector==='lightning')return null;
 else if(!accessory&&native==='jack')warning='Jack 3.5 mm. Si tu equipo solo tiene USB-C, necesitarás un DAC compatible.';
 else if(!accessory)warning='Type-C directo. Confirma compatibilidad con tu equipo.';
 if(p.id==='az09')warning='Módulo Bluetooth para IEM compatibles: no incluye audífonos. Confirma los pines antes de comprar.';
 return {product:p,addon,total:Math.round((p.price+(addon?addon.price:0))*100)/100,warning,micKnown:/microfono/.test(norm(p.description)),reason:p.description};
}
function options(s,catalog){return catalog.filter(p=>p.category!=='accesorios'&&!s.excluded.includes(p.id)).map(p=>offer(p,s,catalog)).filter(Boolean).filter(p=>!s.mic||p.micKnown);}
function askMissing(s){
 if(!s.use){s.step='use';return {kind:'question',text:'¿Para qué los usarás principalmente? Así elijo modelos adecuados del catálogo.',choices:['Para gaming','Para música','Para clases y llamadas','Para uso diario']};}
 if(s.budget===null){s.step='budget';return {kind:'question',text:'¿Cuál es tu presupuesto máximo en soles? Incluyo el DAC si necesitas USB-C. El envío se muestra aparte, salvo que me pidas incluirlo.',choices:['Hasta S/ 40','Hasta S/ 60','Hasta S/ 90']};}
 if(!s.connector){s.step='connector';return {kind:'question',text:'¿Qué conexión tiene tu equipo? Así incluyo cualquier adaptador necesario en tu presupuesto.',choices:['Tiene jack 3.5 mm','Solo tiene USB-C','Tiene Lightning','No sé qué entrada tiene']};}
 if(s.totalBudget&&s.deliveryFee===null){s.step='location';return {kind:'question',text:'Para incluir el envío en tu presupuesto, ¿dónde lo recibirías?',choices:['Recojo en Wanchaq','Entrega en Real Plaza','Envío a provincias']};}
 return null;
}
function rank(o,s){
 const id=o.product.id;
 if(s.use==='gaming')return ({'edx-pro':110,'edx-prox':94,'edx-pro2':90,castor:85,vader:82,'edx-lite':75}[id]||50)+(o.micKnown?5:0);
 if(s.use==='calls')return (o.micKnown?120:60)-o.total/20;
 if(s.sound==='bass')return ({castor:120,'castor-pro':115,vader:95,'edx-pro':80}[id]||50);
 if(s.sound==='detail')return ({'zsn-pro2':120,duonic:105,gale:95,castor:90}[id]||50);
 if(s.use==='music')return ({'zsn-pro2':110,castor:105,'castor-pro':103,duonic:102,gale:95,dqs:90,pisces:85}[id]||50);
 return 100-o.total/10;
}
function recommend(s,catalog,cheaper=false){
 const missing=askMissing(s);if(missing)return missing;s.step=null;
 const cap=s.budget-(s.totalBudget?s.deliveryFee:0),all=options(s,catalog);
 const affordable=all.filter(o=>o.total<=cap+0.001);
 if(!affordable.length){
   const cheapest=[...all].sort((a,b)=>a.total-b.total)[0];
   if(!cheapest)return {kind:'message',text:s.mic?'No encuentro una opción con micrófono confirmado y esta conexión. Puedo revisar versiones cuyo micrófono necesita confirmación, o derivarte a Ulianov.':'No encuentro una combinación compatible confirmada con esas condiciones.',choices:['Consultar con Ulianov','Cambiar conector']};
   const minimum=cheapest.total+(s.totalBudget?s.deliveryFee:0);
   return {kind:'message',text:'Con ese presupuesto no alcanza para una opción completa con esa conexión. La más económica que cumple es '+cheapest.product.name+(cheapest.addon?' + '+cheapest.addon.name:'')+' por '+money(cheapest.total)+(s.totalBudget?' + envío '+money(s.deliveryFee)+' = '+money(minimum):' (envío aparte)')+'. No te recomiendo comprar solo el adaptador.',choices:['Ampliar presupuesto a '+money(minimum),'Cambiar conector','Consultar con Ulianov']};
 }
 affordable.sort((a,b)=>cheaper?a.total-b.total:rank(b,s)-rank(a,s)||a.total-b.total);
 const chosen=affordable[0],low=[...affordable].filter(o=>o.product.id!==chosen.product.id).sort((a,b)=>a.total-b.total)[0];
 chosen.choiceReason='Encaja en tu presupuesto'+(chosen.addon?' incluyendo el adaptador DAC':'')+'.'+(s.use==='gaming'&&chosen.micKnown?' La ficha lo orienta a gaming y menciona micrófono.':'');
 if(low)low.choiceReason=low.total<chosen.total?'Ahorras '+money(chosen.total-low.total)+' frente a la recomendación principal.':'Otra referencia dentro de tu presupuesto.';
 s.last=[chosen,...(low?[low]:[])];
 return {kind:'recommendations',text:'Mi recomendación para '+({gaming:'gaming',music:'música',calls:'clases y llamadas',daily:'uso diario'}[s.use])+' con presupuesto de '+money(s.budget)+':',items:s.last,choices:['Una opción más barata','Cambiar presupuesto','Cambiar conector','Consultar con Ulianov'],note:s.totalBudget?'Abajo incluyo el costo de entrega.':'El precio incluye el DAC indicado. Envío aparte: recojo gratis, puntos locales S/ 3 o provincias S/ 12.'};
}
function respond(previous,text,catalog){
 const q=norm(text);let {state:s,budget}=update(previous,q);const result=value=>({...value,state:s});
 if(!q)return result({kind:'message',text:'Cuéntame qué necesitas o elige una opción.'});
 if(/reiniciar|empezar de nuevo|desde cero/.test(q)){s=createState();return result(askMissing(s));}
 if(budget.foreign)return result({kind:'message',text:'Los precios están en soles. ¿Cuál es tu presupuesto en S/?',choices:['Hasta S/ 40','Hasta S/ 60','Hasta S/ 90']});
 if(s.budget!==null&&(!Number.isFinite(s.budget)||s.budget<=0||s.budget>10000)){s.budget=null;s.step='budget';return result({kind:'message',text:'Indícame un presupuesto válido en soles, por ejemplo S/ 50.'});}
 if(/cambiar presupuesto/.test(q)){s.budget=null;s.step='budget';return result({kind:'question',text:'¿Hasta cuánto quieres gastar ahora? Mantengo tu uso y conexión.',choices:['Hasta S/ 40','Hasta S/ 60','Hasta S/ 90']});}
 if(/cambiar conector/.test(q)){s.connector=null;return result(askMissing(s));}
 if(/cambiar uso/.test(q)){s.use=null;return result(askMissing(s));}
 if(/no se.*(?:entrada|conexion|conector)|no se que.*tiene/.test(q)){s.step='connector';return result({kind:'message',text:'Busca si tu equipo tiene un orificio redondo para audífonos (jack 3.5 mm). Si solo tiene USB-C, elige USB-C. Si no estás seguro, consulta tu modelo exacto con Ulianov.',choices:['Tiene jack 3.5 mm','Solo tiene USB-C','Consultar con Ulianov']});}
 if(/ulianov|asesor real|humano|persona|no me ayuda/.test(q))return result({kind:'handoff',text:'Prepararé tu consulta con el uso, presupuesto y modelos que vimos. Al abrir WhatsApp, pulsa Enviar para que Ulianov la reciba.',choices:['Seguir eligiendo']});
 if(/ver (?:mi |el )?carrito|como compro|como comprar|quiero pagar|finalizar/.test(q))return result({kind:'checkout',text:'Revisa el carrito, elige entrega y pago y abre el pedido en WhatsApp. Debes pulsar Enviar; el pago y el stock se confirman al coordinar.'});
 if(/(?:agrega|anade|lo quiero|la quiero|me quedo|quiero (?:la |el )?(?:primera|segunda|primer|segund))/.test(q)&&s.last.length){
   const item=s.last[/segunda|segundo/.test(q)?1:0];
   if(!item)return result({kind:'message',text:'No hay segunda opción en esta selección. Elige una tarjeta.'});
   const m=q.match(/(\d+)\s*(?:unidades|pares)|(?:quiero|agrega|anade)\s+(\d+)/),quantity=m?Number(m[1]||m[2]):1;
   if(quantity<1||quantity>20)return result({kind:'message',text:'Para cantidades mayores, consulta una cotización con Ulianov.',choices:['Consultar con Ulianov']});
   if(item.product.id==='az09')return result({kind:'handoff',text:'Antes de agregar el módulo AZ09, confirmemos con Ulianov los pines de tus audífonos. No es un audífono completo.'});
   return result({kind:'add',item,quantity,text:'Agregaré '+quantity+' x '+item.product.name+(item.addon?' con su adaptador DAC':'')+' al carrito. Allí eliges entrega y pago.'});
 }
 let found=matching(q,catalog);
 if(found.length&&found.every(p=>p.category==='accesorios')&&/gaming|dota|musica|clases/.test(q)&&!/solo.*(?:adaptador|cable)|quiero un adaptador/.test(q))found=[];
 if(!found.length&&/stock|disponib|queda|agotad/.test(q))return result({kind:'message',text:'Puedo mostrarte las referencias publicadas, pero no tengo inventario en tiempo real. '+(s.last.length?'Tu selección sigue siendo '+s.last.map(o=>o.product.name+' ('+money(o.total)+')').join(' y ')+'. ':'')+'Ulianov confirma existencias y versión antes de reservar.',choices:['Consultar con Ulianov','Seguir eligiendo']});
 if(!found.length&&/tiene.*micro|trae.*micro|incluye.*micro/.test(q)&&s.last.length){
   const o=s.last[0];return result({kind:'message',text:o.micKnown?'La descripción del catálogo de '+o.product.name+' indica micrófono. Confirma la versión exacta y compatibilidad del micrófono con tu equipo.':'No tengo el micrófono confirmado para esa versión de '+o.product.name+'. Para no prometerte algo incorrecto, consulta la versión con Ulianov.',choices:['Consultar con Ulianov','Seguir eligiendo']});
 }
 if(/bluetooth|inalambric|sin cable/.test(q)&&!found.length){const module=catalog.find(p=>p.id==='az09');return result({kind:'message',text:'No veo audífonos inalámbricos completos confirmados en el catálogo. '+(module?'El AZ09 cuesta '+money(module.price)+', pero es un módulo para IEM compatibles, no unos audífonos completos. Hay que confirmar los pines.':''),choices:['Consultar con Ulianov','Para gaming','Para música']});}
 if(/lightning/.test(q)||s.connector==='lightning')return result({kind:'message',text:'No encuentro una opción Lightning compatible confirmada en el catálogo. No te recomendaré USB-C para esa entrada. Ulianov puede revisar si dispone de un adaptador adecuado.',choices:['Consultar con Ulianov','Cambiar conector']});
 if(/por mayor|mayorista|revend|lote|packs?/.test(q))return result({kind:'wholesale',text:'Precios publicados: Pack Gamer S/ 249, Pack Audiófilo S/ 207, Pack Accesorios S/ 136 y lote de 34 productos S/ 849. Confirma disponibilidad y composición antes de comprar. ¿Qué cantidad y modelos te interesan?',choices:['Ver packs en la tienda','Consultar con Ulianov']});
 if(/airpods|sony|jbl|logitech|razer|hyperx|diadema/.test(q)&&!found.length)return result({kind:'message',text:'No encuentro ese modelo o formato en el catálogo actual. Puedo ayudarte a elegir KZ in-ear y sus accesorios.',choices:['Para gaming','Para música','Consultar con Ulianov']});
 if(found.length){
   const items=found.slice(0,3).map(p=>offer(p,s,catalog)).filter(Boolean);
   if(!items.length)return result({kind:'message',text:'Ese modelo no coincide con la conexión elegida. Puedo revisar otra opción.',choices:['Cambiar conector','Consultar con Ulianov']});
   s.last=items;const compare=/compar|diferencia|\bvs\b|versus|cual.*mejor/.test(q)||items.length>1;
   let explanation='Esta es la referencia publicada en el catálogo:';
   if(compare){
     const sorted=[...items].sort((a,b)=>a.total-b.total),micItem=items.find(o=>o.micKnown);
     explanation='La opción más económica de estas referencias es '+sorted[0].product.name+' ('+money(sorted[0].total)+').';
     if(micItem)explanation+=' Si necesitas micrófono, la ficha de '+micItem.product.name+' lo menciona.';
     if(s.use){
       const fit=items.filter(o=>s.budget===null||o.total+(s.totalBudget?(s.deliveryFee||0):0)<=s.budget);
       const preferred=[...fit].sort((a,b)=>rank(b,s)-rank(a,s))[0];
       if(preferred)explanation+=' Para tu uso, mi primera opción entre estas sería '+preferred.product.name+'.';
       else explanation+=' Ninguna de estas opciones entra en el presupuesto indicado.';
     }else explanation+=' Dime tu uso y presupuesto para elegir entre ellas.';
   }
   return result({kind:compare?'comparison':'products',text:explanation,items,note:'Referencia: descripción del catálogo. Stock y compatibilidad se confirman antes de pagar.',choices:['Recomiéndame según mi presupuesto','Consultar con Ulianov']});
 }
 const delivery=/entrega|delivery|envio|recojo|wanchaq|cuanto tarda/.test(q),shopping=/gaming|gamer|dota|musica|clases|presupuesto|soles|\bs\s*\//.test(q);
 if(delivery&&!shopping&&previous.step!=='location'){
   const answer=s.deliveryFee===0?'El recojo en el almacén Wanchaq figura gratis.':s.deliveryFee===12?'El carrito muestra S/ 12 para provincias; confirma cobertura y condiciones.':s.deliveryFee===3?'Los puntos locales listados figuran a S/ 3.':'El carrito muestra recojo gratis en Wanchaq, S/ 3 para puntos locales y S/ 12 para provincias.';
   return result({kind:'message',text:answer+' El horario se coordina con Ulianov; no tengo seguimiento de repartos en vivo.',choices:previous.last.length?['Ver mi carrito','Seguir eligiendo','Consultar con Ulianov']:['Para gaming','Para música','Para clases y llamadas']});
 }
 if(/garantia|devolucion|fall[ao]|soporte/.test(q))return result({kind:'message',text:'La tienda anuncia garantía de 6 meses contra defectos. Confirma las condiciones del modelo y conserva tu comprobante. Para un caso concreto, escribe a Ulianov con el pedido.',choices:['Consultar con Ulianov','Seguir eligiendo']});
 if(/yape|plin|efectivo|transferencia|metodo.*pago|como.*pago/.test(q))return result({kind:'message',text:'En el carrito puedes elegir Yape / Plin, efectivo contraentrega o transferencia BCP. No se cobra automáticamente. Coordina la confirmación del pago por WhatsApp.',choices:['Ver mi carrito','Seguir eligiendo']});
 if(/gracias|perfecto/.test(q)&&!shopping)return result({kind:'message',text:'Con gusto. Puedes agregar una opción al carrito o ajustar tu presupuesto.',choices:['Ver mi carrito','Cambiar presupuesto']});
 if(/otra opcion|otras opciones|otro modelo/.test(q)&&s.last.length)s.excluded=[...new Set([...s.excluded,...s.last.map(o=>o.product.id)])];
 const relevant=s.use!==previous.use||s.budget!==previous.budget||s.connector!==previous.connector||s.location!==previous.location||s.mic!==previous.mic;
 const advice=/recom|aconsej|cual|elegir|busco|quiero|necesito|barat|econom|seguir eligiendo|uso diario|otra opcion|otras opciones|otro modelo/.test(q);
 if(!relevant&&!advice&&!s.step&&previous.last.length)return result({kind:'message',text:'Puedo ayudarte con modelos, precios, presupuesto, conexión, entrega y compra. ¿Ajustamos lo elegido?',choices:['Otra opción','Cambiar presupuesto','Consultar con Ulianov']});
 return result(recommend(s,catalog,/barat|econom/.test(q)));
}
root.VayoAdvisor=Object.freeze({norm,money,createState,respond,matching,offer,recommend});
})(typeof globalThis!=='undefined'?globalThis:window);
