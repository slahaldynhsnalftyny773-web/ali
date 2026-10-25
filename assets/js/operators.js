(()=>{
const E=window.EXAMPLES;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines=a=>'<div style="font:14px/2 Arial,sans-serif;color:#28334a">'+a.map(x=>'<div>'+esc(x)+'</div>').join('')+'</div>';
const num=(id,label,value)=>({id,label,value:String(value),type:'number'});
const txt=(id,label,value)=>({id,label,value,type:'text'});
const sel=(id,label,value,options)=>({id,label,value,type:'select',options:options.map(x=>({value:String(x),label:String(x)}))});
function add(id,category,title,short,description,explanation,tip,code,inputs,run){const pages={'Arithmetic Operators':5,'Comparison Operators':6,'Logical Operators':7,'Bitwise Operators':8,'Assignment Operators':9,'Type Operators':10};E.push({id,page:pages[category]||4,category,title,short,description,explanation,tip,code,inputs,run});}
add('operators-overview','مقدمة إلى العوامل','العوامل في JavaScript','Operators','تعرّف على مجموعات العوامل الستة قبل تجربة كل مجموعة بالتفصيل.','العوامل رموز تنفذ عمليات على القيم: حسابية، مقارنة، منطقية، بتّية، إسناد، ومعرفة النوع. خصصنا لكل مجموعة صفحة مستقلة من الخامسة إلى العاشرة.','اختر رقم الصفحة من المرشحات الجانبية، ثم افتح أي مثال وغيّر المدخلات وشغّله.','let a = 10;\nlet b = 3;\nlet sum = a + b;\nlet isGreater = a > b;\nlet bothTrue = true && false;\nlet valueType = typeof a;\n\nconsole.log(sum, isGreater, bothTrue, valueType);',[],()=>({html:lines(['10 + 3 = 13','10 > 3 = true','true && false = false','typeof 10 = number']),log:'تمهيد: الحساب، المقارنة، المنطق، والنوع.'}));
const binaryInputs=[num('a','قيمة a',10),num('b','قيمة b',3)];
const arithmetic=[
['op-add','الجمع Addition','+','a + b',(a,b)=>a+b],
['op-sub','الطرح Subtraction','−','a - b',(a,b)=>a-b],
['op-mul','الضرب Multiplication','×','a * b',(a,b)=>a*b],
['op-div','القسمة Division','/','a / b',(a,b)=>b===0?'لا يمكن القسمة على صفر':a/b],
['op-mod','باقي القسمة Modulo','%','a % b',(a,b)=>b===0?'لا يمكن القسمة على صفر':a%b],
['op-exp','الأس Exponentiation','**','a ** b',(a,b)=>a**b]
];
arithmetic.forEach(([id,title,short,code,fn])=>add(id,'Arithmetic Operators',title,short,'نفّذ عملية حسابية على رقمين.','تأخذ العملية قيمتي a وb وتنتج قيمة جديدة. العامل % يعيد باقي القسمة، بينما ** يحسب الأس.','غيّر الرقمين وشاهد كيف تتغير النتيجة.',`let a = 10;\nlet b = 3;\nlet result = ${code};`,binaryInputs,v=>{let a=Number(v.a),b=Number(v.b),r=fn(a,b);return {html:lines(['a = '+a,'b = '+b,'result = '+r]),log:`${a} ${short} ${b} = ${r}`}}));
add('op-assign','Arithmetic Operators','إسناد قيمة Assignment','=','ضع قيمة في متغير.','العامل = لا يعني مقارنة المساواة؛ بل يضع القيمة الموجودة على اليمين داخل المتغير الموجود على اليسار.','جرّب تغيير قيمة b لتشاهد القيمة التي ستُخزّن في a.',"let b = 20;\nlet a = b;\nconsole.log(a);",[num('b','القيمة التي سنسندها إلى a',20)],v=>{let b=Number(v.b),a=b;return {html:lines(['b = '+b,'a = '+a]),log:'تم إسناد قيمة b إلى a.'}});
add('op-unary','Arithmetic Operators','الموجب والسالب Unary + / -','+a / -a','حوّل قيمة نصية رقمية إلى رقم، أو غيّر إشارتها.','العامل الأحادي + يحاول تحويل القيمة إلى رقم، والعامل - يعكس إشارتها.','جرّب إدخال قيمة سالبة.',"let value = '12';\nlet positive = +value;\nlet negative = -value;",[txt('value','قيمة رقمية مكتوبة كنص','12')],v=>{let p=+v.value,n=-v.value;return {html:lines(['+value = '+p,'-value = '+n]),log:'typeof (+value) = '+typeof p}});
add('op-inc','Arithmetic Operators','الزيادة Increment','++','زد المتغير بمقدار واحد.','العامل ++ يضيف 1 إلى قيمة المتغير. هنا نعرض قيمة ما بعد الزيادة لتكون الفكرة واضحة.','العامل ++ يغيّر قيمة المتغير نفسه.',"let a = 5;\na++;\n// a is now 6",[num('a','القيمة الابتدائية',5)],v=>{let a=Number(v.a);a++;return {html:lines(['قبل الزيادة = '+v.a,'بعد الزيادة = '+a]),log:'a++ يجعل قيمة a تزيد بمقدار 1.'}});
add('op-dec','Arithmetic Operators','النقصان Decrement','--','أنقص المتغير بمقدار واحد.','العامل -- ينقص 1 من قيمة المتغير.','جرّب قيمة ابتدائية أخرى.',"let a = 5;\na--;\n// a is now 4",[num('a','القيمة الابتدائية',5)],v=>{let a=Number(v.a);a--;return {html:lines(['قبل النقصان = '+v.a,'بعد النقصان = '+a]),log:'a-- يجعل قيمة a تنقص بمقدار 1.'}});
const comparisons=[
['eq','يساوي بالقيمة ==','==','a == b',(a,b)=>a==b],
['strict-eq','يساوي بالقيمة والنوع ===','===','a === b',(a,b)=>a===b],
['neq','لا يساوي !=','!=','a != b',(a,b)=>a!=b],
['strict-neq','القيمة أو النوع مختلف !==','!==','a !== b',(a,b)=>a!==b],
['gt','أكبر من >','>','a > b',(a,b)=>a>b],
['lt','أصغر من <','<','a < b',(a,b)=>a<b],
['gte','أكبر من أو يساوي >=','>=','a >= b',(a,b)=>a>=b],
['lte','أصغر من أو يساوي <=','<=','a <= b',(a,b)=>a<=b]
];
comparisons.forEach(([id,title,short,code,fn])=>add('cmp-'+id,'Comparison Operators',title,short,'قارن بين قيمتين لمعرفة ما إذا كان الشرط صحيحًا.','نتيجة المقارنة تكون true أو false. الفرق المهم أن == يقارن القيمة بعد التحويل أحيانًا، بينما === يشترط تطابق النوع والقيمة.','جرّب مقارنة رقم 5 بالنص "5".',`let a = 5;\nlet b = '5';\nlet result = ${code};`,[txt('a','قيمة a','5'),txt('b','قيمة b','5'),sel('types','نوع القيم','number-number',['number-number','number-string'])],v=>{let a=v.a,b=v.types==='number-string'?v.b:Number(v.b);let r=fn(a,b);return {html:lines(['a = '+a+' ('+typeof a+')','b = '+b+' ('+typeof b+')','result = '+r]),log:`${String(a)} ${short} ${String(b)} → ${r}`}}));
add('cmp-ternary','Comparison Operators','العامل الشرطي Ternary','?:','اختر نتيجة بناءً على شرط.','العامل الشرطي يكتب شرطًا ثم ? ثم قيمة عند تحقق الشرط، وبعد : قيمة عند عدم تحققه.','يمكنك استخدامه لاختيار رسالة بسيطة.',"let age = 18;\nlet result = age >= 18 ? 'Adult' : 'Under 18';",[num('age','العمر',18)],v=>{let age=Number(v.age),r=age>=18?'Adult':'Under 18';return {html:lines(['age = '+age,'result = '+r]),log:'تم اختيار النتيجة حسب الشرط.'}});
add('logical-and','Logical Operators','العامل المنطقي AND','&&','يكون الناتج true إذا كان الشرطان صحيحين.','العامل && يحتاج تحقق الشرطين معًا.','غيّر حالة كل شرط لتجربة الاحتمالات.',"let hasID = true;\nlet isAdult = false;\nlet allowed = hasID && isAdult;",[sel('a','hasID','true',['true','false']),sel('b','isAdult','false',['true','false'])],v=>{let r=v.a==='true'&&v.b==='true';return {html:lines(['hasID = '+v.a,'isAdult = '+v.b,'allowed = '+r]),log:'AND يحتاج أن تكون القيمتان true.'}});
add('logical-or','Logical Operators','العامل المنطقي OR','||','يكون الناتج true إذا تحقق شرط واحد على الأقل.','العامل || يعيد true إذا كانت واحدة من القيمتين true أو كلتاهما.','جرّب جعل الشرطين false.',"let hasTicket = true;\nlet hasPass = false;\nlet canEnter = hasTicket || hasPass;",[sel('a','hasTicket','true',['true','false']),sel('b','hasPass','false',['true','false'])],v=>{let r=v.a==='true'||v.b==='true';return {html:lines(['hasTicket = '+v.a,'hasPass = '+v.b,'canEnter = '+r]),log:'OR يكفيه تحقق شرط واحد.'}});
add('logical-not','Logical Operators','العامل المنطقي NOT','!','اعكس القيمة المنطقية.','العامل ! يحوّل true إلى false، وfalse إلى true.','لاحظ أن ! تعكس النتيجة.',"let isRaining = true;\nlet isNotRaining = !isRaining;",[sel('a','isRaining','true',['true','false'])],v=>{let r=!(v.a==='true');return {html:lines(['isRaining = '+v.a,'!isRaining = '+r]),log:'NOT يعكس القيمة المنطقية.'}});
const bitOps=[
['and','Bitwise AND','&',(a,b)=>a&b],
['or','Bitwise OR','|',(a,b)=>a|b],
['xor','Bitwise XOR','^',(a,b)=>a^b]
];
bitOps.forEach(([id,title,short,fn])=>add('bit-'+id,'Bitwise Operators',title,short,'نفّذ عملية على التمثيل الثنائي لعددين صحيحين.','تعمل عوامل البتات على تمثيل الأعداد كبتات. AND يتطلب 1 في الموضعين، OR يكفيه 1 في أحدهما، وXOR يكون 1 عندما يختلف البتان.','جرّب أعدادًا صغيرة مثل 5 و3.',`let a = 5;\nlet b = 3;\nlet result = a ${short} b;`,binaryInputs,v=>{let a=Number(v.a)|0,b=Number(v.b)|0,r=fn(a,b);return {html:lines(['a = '+a+' (binary '+a.toString(2)+')','b = '+b+' (binary '+b.toString(2)+')','result = '+r+' (binary '+(r>>>0).toString(2)+')']),log:`${a} ${short} ${b} = ${r}`}}));
[['not','Bitwise NOT','~',a=>~a],['left','Left shift','<<',(a,b)=>a<<b],['right','Right shift','>>',(a,b)=>a>>b]].forEach(([id,title,short,fn])=>add('bit-'+id,'Bitwise Operators',title,short,'غيّر تمثيل العدد باستخدام عامل البتات.','~ يقلب البتات وفق تمثيل JavaScript للأعداد الصحيحة 32-bit. و<< و>> يزيحان البتات بعدد خانات محدد.','ابدأ بأعداد صغيرة لتسهيل فهم التمثيل الثنائي.',`let a = 5;\nlet result = ${id==='not'?'~a':id==='left'?'a << 1':'a >> 1'};`,id==='not'?[num('a','قيمة a',5)]:[num('a','قيمة a',5),num('b','عدد خانات الإزاحة',1)],v=>{let a=Number(v.a)|0,b=Math.max(0,Math.min(31,Number(v.b)||0)),r=id==='not'?fn(a):fn(a,b);return {html:lines(['a = '+a,'binary = '+a.toString(2),'result = '+r,'result binary = '+(r>>>0).toString(2)]),log:'عملية على بتات عدد صحيح 32-bit.'}}));
const assignments=[
['assign','إسناد أساسي =','=',(a,b)=>b],
['add','إسناد الجمع +=','+=',(a,b)=>a+b],
['sub','إسناد الطرح -=','-=',(a,b)=>a-b],
['mul','إسناد الضرب *=','*=',(a,b)=>a*b],
['div','إسناد القسمة /=','/=',(a,b)=>a/b],
['mod','إسناد باقي القسمة %=','%=',(a,b)=>a%b],
['and','إسناد AND للبتات &=','&=',(a,b)=>a&b],
['or','إسناد OR للبتات |=','|=',(a,b)=>a|b],
['xor','إسناد XOR للبتات ^=','^=',(a,b)=>a^b],
['left','إسناد الإزاحة لليسار <<=','<<=',(a,b)=>a<<b],
['right','إسناد الإزاحة لليمين >>=','>>=',(a,b)=>a>>b]
];
assignments.forEach(([id,title,short,fn])=>add('as-'+id,'Assignment Operators',title,short,'غيّر قيمة المتغير باستخدام عامل الإسناد المختصر.','تجمع عوامل الإسناد بين العملية الحسابية وإسناد النتيجة إلى المتغير a. مثلًا a += b تعادل a = a + b.','غيّر قيمة a وb. بعض العوامل هنا تعمل على البتات.',`let a = 10;\nlet b = 3;\na ${short} b;`,binaryInputs,v=>{let a=Number(v.a),b=Number(v.b);let r=(id==='div'||id==='mod')&&b===0?'لا يمكن القسمة على صفر':fn(a|0,b|0);if(id==='assign')r=b;return {html:lines(['قبل العملية: a = '+a,'b = '+b,'بعد '+short+': a = '+r]),log:`a ${short} b → a = ${r}`}}));
add('as-exp','Assignment Operators','إسناد الأس **=','**=','احسب الأس وخزّن النتيجة في المتغير نفسه.','العامل **= اختصار للعملية a = a ** b؛ مثلًا 2 **= 3 يجعل قيمة a تساوي 8.','استخدم أعدادًا صغيرة لأن الأس قد ينتج أرقامًا كبيرة.',"let a = 2;\nlet b = 3;\na **= b;\nconsole.log(a);",[num('a','القيمة الابتدائية لـ a',2),num('b','الأس b',3)],v=>{let a=Number(v.a),b=Number(v.b),r=a**b;return {html:lines(['قبل العملية: a = '+a,'b = '+b,'بعد **=: a = '+r]),log:`${a} **= ${b} → ${r}`}});
add('type-typeof','Type Operators','معرفة نوع القيمة typeof','typeof','اعرف نوع القيمة المخزنة في متغير.','يعيد typeof اسم نوع القيمة مثل string أو number أو boolean.','لاحظ أن typeof null يعيد object في JavaScript لأسباب تاريخية.',"typeof value;",[sel('value','القيمة المختارة','Hello',['Hello','42','true','undefined','null'])],v=>{let x=v.value==='42'?42:v.value==='true'?true:v.value==='undefined'?undefined:v.value==='null'?null:v.value;return {html:lines(['value = '+String(x),'typeof value = '+typeof x]),log:'typeof يعيد اسم النوع.'}});
add('type-instanceof','Type Operators','اختبار instanceof','instanceof','تحقق مما إذا كان الكائن من نوع محدد.','يختبر instanceof ما إذا كان prototype الخاص بالباني موجودًا في سلسلة prototype للكائن.','هذا الاختبار مناسب للكائنات مثل المصفوفات والتواريخ.',"let fruits = ['Apple', 'Banana'];\nfruits instanceof Array;",[sel('kind','نوع القيمة','Array',['Array','Date','Object'])],v=>{let x=[1,2],r=v.kind==='Array'?x instanceof Array:v.kind==='Date'?new Date() instanceof Date:x instanceof Object;return {html:lines(['kind = '+v.kind,'result = '+r]),log:'تم اختبار instanceof.'}});
})();