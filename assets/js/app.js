(()=>{const $=id=>document.getElementById(id),all=window.EXAMPLES;let current=all[0],page='all';const defaults={};const pageNames={1:'البدء مع JavaScript',2:'المتغيرات',3:'أنواع البيانات',4:'مقدمة إلى العوامل',5:'العوامل الحسابية',6:'عوامل المقارنة',7:'العوامل المنطقية',8:'العوامل البتّية',9:'عوامل الإسناد',10:'عوامل النوع'};
all.forEach(e=>defaults[e.id]=Object.fromEntries(e.inputs.map(i=>[i.id,i.value])));
function filtered(){let q=$('search').value.trim().toLowerCase();return all.filter(e=>(page==='all'||String(e.page)===page)&&(!q||[e.title,e.short,e.category,e.description].join(' ').toLowerCase().includes(q)))}
function list(){let items=filtered();$('count').textContent=items.length;$('list').innerHTML='';if(!items.length){$('list').textContent='لا توجد أمثلة مطابقة.';return}items.forEach((e,i)=>{let b=document.createElement('button');b.className='item'+(e.id===current.id?' active':'');b.innerHTML='<i>'+esc(e.short.slice(0,4))+'</i><span>'+esc(e.title)+'</span>';b.onclick=()=>choose(e.id);$('list').appendChild(b)})}
function inputUI(){let area=$('inputs');area.innerHTML='';current.inputs.forEach(i=>{let w=document.createElement('div');w.className='field';let l=document.createElement('label');l.htmlFor='in-'+i.id;l.textContent=i.label;let el;if(i.type==='select'){el=document.createElement('select');i.options.forEach(o=>{let op=document.createElement('option');op.value=o.value;op.textContent=o.label||o.value;el.appendChild(op)})}else{el=document.createElement(i.type==='textarea'?'textarea':'input');if(i.type!=='textarea')el.type=i.type}el.id='in-'+i.id;el.value=i.value;w.append(l,el);if(i.hint){let h=document.createElement('div');h.className='hint';h.textContent=i.hint;w.append(h)}area.appendChild(w)})}
function choose(id){current=all.find(e=>e.id===id)||all[0];list();$('pageName').textContent=pageNames[current.page];$('crumb').textContent=current.short;$('category').textContent=current.category+' · مثال '+(all.filter(e=>e.page===current.page).findIndex(e=>e.id===id)+1);$('title').textContent=current.title;$('desc').textContent=current.description;$('explain').textContent=current.explanation;$('tip').textContent=current.tip;$('badge').textContent=current.page===1?'JS':current.page===2?'{}':current.page===3?'TYP':current.page===4?'OP':current.page===5?'AR':current.page===6?'CMP':current.page===7?'LOG':current.page===8?'BIT':current.page===9?'ASG':'TYP';$('code').textContent=current.code;inputUI();$('status').textContent='جاهز للتشغيل';$('console').textContent='اضغط تشغيل المثال لعرض النتيجة.';preview('<div style="font:14px Arial;color:#8b94a7;padding:15px">شغّل المثال لمشاهدة النتيجة هنا.</div>')}
function values(){let v={};current.inputs.forEach(i=>v[i.id]=$('in-'+i.id).value);return v}
function preview(html){$('preview').srcdoc='<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:16px;font:14px Arial,sans-serif;overflow-wrap:anywhere}*{box-sizing:border-box}</style></head><body>'+String(html||'')+'</body></html>'}
function run(){try{let r=current.run(values());preview(r.html);$('console').textContent=r.log||'تم التشغيل.';$('status').textContent='اكتمل التشغيل ✓';$('status').style.color='#159a72'}catch(e){preview('<p style="color:#b42332">حدث خطأ أثناء تشغيل المثال.</p>');$('console').textContent=String(e.message||e);$('status').textContent='حدث خطأ';$('status').style.color='#d45c66'}}
$('search').addEventListener('input',list);document.querySelector('.filters').addEventListener('click',e=>{let b=e.target.closest('[data-page]');if(!b)return;page=b.dataset.page;document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('active',x===b));list()});
$('run').onclick=run;$('reset').onclick=()=>{current.inputs.forEach(i=>{let el=$('in-'+i.id);if(el)el.value=defaults[current.id][i.id]});$('status').textContent='تمت إعادة الضبط';$('status').style.color='';$('console').textContent='تمت استعادة القيم الأصلية.';preview('<div style="font:14px Arial;color:#8b94a7;padding:15px">شغّل المثال لمشاهدة النتيجة هنا.</div>')};
$('clear').onclick=()=>{preview('');$('console').textContent='تم مسح المخرجات.';$('status').textContent='تم المسح'};$('theme').onclick=()=>document.body.classList.toggle('dark');
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText(current.code);$('copy').textContent='تم النسخ ✓'}catch{$('copy').textContent='انسخ الكود يدويًا'}setTimeout(()=>$('copy').textContent='نسخ الكود',1400)};
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus()}if((e.ctrlKey||e.metaKey)&&e.key==='Enter')run()});
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
list();choose(all[0].id);
})();

// التحكم في فتح وإغلاق القائمة الجانبية
const sidebarToggle = document.getElementById('sidebarToggle');
const mainLayout = document.getElementById('mainLayout');

if (sidebarToggle && mainLayout) {
  sidebarToggle.addEventListener('click', () => {
    // تبديل كلاس الإخفاء والإظهار
    mainLayout.classList.toggle('sidebar-hidden');
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mainLayout = document.getElementById('mainLayout');

  if (sidebarToggle && mainLayout) {
    sidebarToggle.addEventListener('click', () => {
      // تبديل حالة الإخفاء والإظهار عند النقر
      mainLayout.classList.toggle('sidebar-hidden');
    });
  }
});