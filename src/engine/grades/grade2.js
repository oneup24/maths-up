/**
 * grade2.js — P2 question generators (2N1, 2N2, 2N3, 2N4, 2N5, 2N6, 2M, 2S, 2D1)
 * Extracted from engine.js
 * Enriched by HK Band 1 Top Math Teacher - featuring logical reasoning & distractor traps
 */
import { ri, pk, FIG } from '../core.js';
import { nm, pl, it, CTX } from '../config.js';

export const grade2={
/* ═══════════ 2N1 三位數 ═══════════ */
'2N1':[
  ()=>{var a=ri(100,999);return{d:1,tp:'fill',q:a+'的百位是____，十位是____，個位是____。',a:Math.floor(a/100)+','+Math.floor(a%100/10)+','+a%10,s:['位值'],sc:2}},
  ()=>{var nums=[];for(var i=0;i<4;i++)nums.push(ri(100,999));var sorted=[...nums].sort((a,b)=>b-a);return{d:1,tp:'fill',q:'把 '+nums.join('、')+' 由大到小排列：____',a:sorted.join(','),s:['比較三位數'],sc:2}},
  ()=>{var h=ri(1,8),t=ri(0,9),u=ri(0,9);return{d:2,tp:'fill',q:'一個三位數，百位是 '+h+'，十位比百位大 '+Math.abs(t-h)+'，個位是 '+u+'。這個數是____。',a:String(h*100+t*10+u),s:['逐位推算：百位='+h+'，十位='+h+'+'+Math.abs(t-h)+'='+t+'，個位='+u],sc:2}},
  ()=>{var a=ri(300,700),b=a+pk([-10,-1,1,10]);return{d:3,tp:'mc',q:a+' 和 '+b+' 哪個較大？相差多少？',isMC:false,a:(Math.max(a,b))+','+Math.abs(a-b),s:['比較: '+Math.max(a,b)+'較大','差: '+Math.abs(a-b)],sc:2}}
],

/* ═══════════ 2N2 加法和減法 (二/三) ═══════════ */
'2N2':[
  ()=>{var a=ri(200,500),b=ri(150,300),c=ri(100,200);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['由左至右：先加再減'],sc:2}},
  ()=>{var have=ri(300,600),sell=ri(100,200),buy=ri(80,180);var dHours=ri(8,10),dFloors=ri(1,3);return{d:2,tp:'work',q:pl()+'有'+dFloors+'層樓，每天營業'+dHours+'小時，現存書籍'+have+'本。賣出'+sell+'本後，又進貨'+buy+'本，現在有多少本？',a:String(have-sell+buy),trap:'樓層數和營業時間',s:['🔍 樓層和營業時間均無關',have+'−'+sell+'='+(have-sell),(have-sell)+'+'+buy+'='+(have-sell+buy)],sc:2}},
  // HK context: 書展
  ()=>{var have=ri(300,600),sell=ri(100,200),buy=ri(80,180);var dDays=ri(5,7),dPrice=ri(20,50);return{d:2,tp:'work',q:'香港書展為期 '+dDays+' 天，某書商的特價書每本 '+dPrice+' 元。倉庫原有存貨 '+have+' 本。上午賣出 '+sell+' 本後，下午又從柴灣補貨 '+buy+' 本，現在倉庫有多少本存貨？',a:String(have-sell+buy),trap:'書展日數及書本價錢',s:['🔍 書展日數和書本價錢均與存貨數量無關。','賣出減少：'+have+' − '+sell+' = '+(have-sell),'補貨增加：'+(have-sell)+' + '+buy+' = '+(have-sell+buy)],sc:3}},
  ()=>{var a=ri(200,400),b=ri(150,350);var dTeacher=ri(10,20);return{d:2,tp:'work',q:pk(CTX.school)+'有甲班'+a+'人、乙班'+b+'人。學校共有'+dTeacher+'位老師。甲班比乙班多多少人？',a:String(Math.abs(a-b)),trap:'老師人數（'+dTeacher+'位）',s:['🔍 老師人數無關','差: |'+a+'−'+b+'| = '+Math.abs(a-b)],sc:2}},
  // give-and-compare with proper name variables
  ()=>{var a=ri(150,300),b=ri(100,250),give=ri(30,80);var n1=nm(),n2=nm();return{d:3,tp:'work',q:n1+'有 '+a+' 張閃卡，'+n2+'有 '+b+' 張閃卡。'+n1+'給了'+n2+' '+give+' 張後，誰的閃卡較多？多多少張？',a:((a-give)>(b+give)?n1:n2)+','+Math.abs((a-give)-(b+give)),s:[n1+' 現在有：'+a+' − '+give+' = '+(a-give),n2+' 現在有：'+b+' + '+give+' = '+(b+give),'比較後相減：|'+(a-give)+' − '+(b+give)+'| = '+Math.abs((a-give)-(b+give))],sc:3}}
],

/* ═══════════ 2N3 基本乘法 ═══════════ */
'2N3':[
  ()=>{var a=ri(2,9),b=ri(2,9),c=ri(1,9);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var price=ri(3,8),n=ri(4,8),extra=ri(5,15);var dItem=it(),dPrice=ri(1,3);return{d:2,tp:'work',q:'每個蛋糕'+price+'元，每枝'+dItem+' '+dPrice+'元。'+nm()+'買了'+n+'個蛋糕，另付包裝費'+extra+'元。買蛋糕共需多少元？',a:String(price*n+extra),trap:dItem+'價錢（'+dPrice+'元）',s:['🔍 '+dItem+'價錢無關',price+'×'+n+'='+price*n,price*n+'+'+extra+'='+(price*n+extra)],sc:2}},
  // HK context: 酒樓點心
  ()=>{var price=ri(4,8),n=ri(4,8),extra=ri(5,15);var dTea=ri(3,8);return{d:2,tp:'work',q:'酒樓裏每籠燒賣有 '+price+' 粒。'+nm()+'一家人點了 '+n+' 籠燒賣，另外加了一碟 '+extra+' 粒的粉果。他們每人的茶錢是 '+dTea+' 元。他們共點了多少粒點心？',a:String(price*n+extra),trap:'茶錢（'+dTea+'元）',s:['🔍 茶錢是價錢，與點心數量無關。','燒賣數量：'+price+' × '+n+' = '+price*n,price*n+' + '+extra+' = '+(price*n+extra)],sc:3}},
  ()=>{var a=ri(3,8),b=ri(3,6),add=ri(5,15);var dBirds=ri(10,25);return{d:2,tp:'work',q:'果園每行有'+a+'棵樹，共'+b+'行。果園裏還有'+dBirds+'隻'+pk(['小鳥','蝴蝶','蜜蜂'])+'。如果再種'+add+'棵，共有多少棵樹？',a:String(a*b+add),trap:'動物數目',s:['🔍 動物數無關',a+'×'+b+'='+a*b,a*b+'+'+add+'='+(a*b+add)],sc:2}},
  ()=>{var rows=ri(3,6),cols=ri(3,6),add=ri(2,5);var total=rows*cols;return{d:2,tp:'short',q:nm()+'的書架有'+rows+'層，每層放'+cols+'本書。書架共有多少本書？再放'+add+'本後，共有多少本？',a:total+','+(total+add),s:[rows+'×'+cols+'='+total+'本',total+'+'+add+'='+(total+add)+'本'],sc:2}},
  // 禮堂椅子：broken chairs trap
  ()=>{var row=ri(4,8),col=ri(4,8),missing=ri(2,5);return{d:3,tp:'work',q:'禮堂的椅子排成 '+row+' 行，每行有 '+col+' 張。其中有 '+missing+' 張椅子壞了被搬走。現在禮堂裏有多少張完好的椅子？',a:String(row*col-missing),s:['總椅子數：'+row+' × '+col+' = '+row*col,'減去壞掉的：'+row*col+' − '+missing+' = '+(row*col-missing)],sc:3}},
  ()=>{var ans=ri(3,9),b=ri(4,8);return{d:3,tp:'work',q:nm()+'把一些糖果平均分成'+b+'份，每份有'+ans+'顆。原來共有多少顆糖果？',a:String(ans*b),s:['反向思考: '+ans+'×'+b+'='+ans*b],sc:2}}
],

/* ═══════════ 2N4 四位數 ═══════════ */
'2N4':[
  ()=>{const th=ri(1,9),h=ri(0,9),t=ri(0,9),u=ri(0,9);const n=th*1000+h*100+t*10+u;return{d:1,tp:'fill',q:'用數字寫：'+th+'千'+h+'百'+t+'十'+u+'個 = ____',a:String(n),s:['千位='+th+'，百位='+h+'，十位='+t+'，個位='+u],sc:1}},
  ()=>{const n=ri(1000,9999);return{d:1,tp:'fill',q:n+'的千位數字是____，百位數字是____。',a:Math.floor(n/1000)+','+Math.floor(n%1000/100),s:['千位='+Math.floor(n/1000)+'，百位='+Math.floor(n%1000/100)],sc:1}},
  ()=>{var a=ri(1000,9999),b=ri(1000,9999);while(a===b)b=ri(1000,9999);const big=Math.max(a,b),small=Math.min(a,b);return{d:2,tp:'fill',q:'比較'+a+'和'+b+'：較大的是____，較小的是____。',a:big+','+small,s:[big+' > '+small],sc:2}},
  ()=>{const arr=[ri(1000,4999),ri(5000,7999),ri(8000,9999)];const shuffled=[arr[1],arr[0],arr[2]];const sorted=[...arr].sort((a,b)=>a-b);return{d:2,tp:'fill',q:'由小到大排列：'+shuffled.join('、')+' → ____',a:sorted.join(','),s:[sorted.join(' < ')],sc:2}},
  // pattern sequence
  ()=>{const start=ri(1,5)*1000+ri(1,5)*100;const step=pk([50,100,200]);return{d:2,tp:'fill',q:'找出規律並填上空格：'+start+'、'+(start+step)+'、____、____、'+(start+step*4),a:(start+step*2)+','+(start+step*3),s:['觀察規律：每次增加 '+step],sc:2}},
  ()=>{const stock=ri(1000,5000),sell=ri(200,800),buy=ri(100,500);return{d:3,tp:'work',q:'超市有'+stock+'件貨品，賣出'+sell+'件後，又入貨'+buy+'件。現在有多少件？',a:String(stock-sell+buy),s:[stock+'−'+sell+'='+(stock-sell),(stock-sell)+'+'+buy+'='+(stock-sell+buy)],sc:2}},
  // 4-digit code logic puzzle
  ()=>{const th=ri(2,5),h=th+2,t=ri(1,3),u=10-t;return{d:3,tp:'work',q:'一個四位數密碼，千位數字是 '+th+'，百位數字比千位大 2，十位和個位數字加起來是 10。如果十位數字是 '+t+'，這個密碼是多少？',a:String(th*1000+h*100+t*10+u),s:['千位 = '+th,'百位 = '+th+' + 2 = '+h,'個位 = 10 − '+t+' = '+u,'密碼是 '+th+''+h+''+t+''+u],sc:3}}
],

/* ═══════════ 2N5 分數(一) ═══════════ */
'2N5':[
  ()=>{const d=pk([2,3,4]);return{d:1,tp:'fill',q:'把一個圖形分成'+d+'等份，塗了1份，塗色部分是____。',a:'1/'+d,s:['1/'+d+' 讀作：'+d+'分之一'],sc:1}},
  ()=>{const a=pk([2,3,4,6]),b=pk([2,3,4,6]);let bb=b;while(bb===a)bb=pk([2,3,4,6]);return{d:1,tp:'mc',q:'1/'+a+' 和 1/'+bb+'，哪個較大？',isMC:true,opts:[{l:'A',v:'1/'+a,c:a<bb},{l:'B',v:'1/'+bb,c:bb<a},{l:'C',v:'一樣大',c:false}],a:a<bb?'A':'B',s:['分母越小，分數越大：1/'+Math.min(a,bb)+' > 1/'+Math.max(a,bb)],sc:1}},
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(2,5);return{d:2,tp:'calc',q:total+'個橙，'+frac+'分之一是多少個？',a:String(total/frac),s:[total+'÷'+frac+'='+(total/frac)],sc:1}},
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(3,6);const ate=total/frac;const n=nm();return{d:2,tp:'work',q:n+'有'+total+'粒糖果，吃了'+frac+'分之一。吃了多少粒？',a:String(ate),s:[total+'÷'+frac+'='+ate+'粒'],sc:2}},
  // fraction with candy trap
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(3,6);const n=nm();const dItems=ri(2,5);return{d:3,tp:'work',q:n+'有 '+total+' 粒朱古力，他把其中的 '+frac+' 分之一送給妹妹。妹妹本身已經有 '+dItems+' 粒糖果。妹妹從'+n+'那裏得到多少粒朱古力？',a:String(total/frac),trap:'妹妹原本的糖果（'+dItems+'粒）',s:['🔍 妹妹原本的糖果與題目所問「得到的朱古力」無關。',total+' 粒的 '+frac+' 分之一是：'+total+' ÷ '+frac+' = '+(total/frac)+' 粒'],sc:3}}
],

/* ═══════════ 2N6 基本除法 ═══════════ */
'2N6':[
  ()=>{const a=ri(2,9),b=ri(2,9);return{d:1,tp:'calc',q:(a*b)+' ÷ '+b+' = ?',a:String(a),s:[a+'×'+b+'='+a*b+'，反過來÷'+b+'='+a],sc:1}},
  ()=>{const div=ri(3,8),quot=ri(3,7),rem=ri(1,div-1);return{d:1,tp:'fill',q:(div*quot+rem)+' ÷ '+div+' = ____…____',a:quot+','+rem,s:[(div*quot+rem)+'÷'+div+'='+quot+'餘'+rem],sc:1}},
  ()=>{const groups=ri(2,5);const total=groups*ri(3,8);const n=nm();return{d:2,tp:'work',q:n+'有'+total+'個橙，平均分成'+groups+'份，每份有多少個？',a:String(total/groups),s:[total+'÷'+groups+'='+(total/groups)],sc:2}},
  ()=>{const div=ri(3,7);const total=div*ri(4,7)+ri(1,div-1);const q=Math.floor(total/div);const r=total%div;return{d:2,tp:'short',q:'有'+total+'個'+pk(CTX.food)+'，每'+div+'個裝一袋。可以裝幾袋？還剩多少個？',a:q+','+r,s:[total+'÷'+div+'='+q+'餘'+r,'裝'+q+'袋，剩'+r+'個'],sc:2}},
  ()=>{const each=ri(3,6);const total=each*ri(4,8);return{d:3,tp:'work',q:'共有'+total+'個蘋果，每盒放'+each+'個，需要多少個盒子？',a:String(total/each),s:[total+'÷'+each+'='+(total/each)+'個盒子'],sc:2}},
  // 進一法: cable car rounding up
  ()=>{const each=ri(4,6);const quot=ri(5,8);const rem=ri(1,each-1);const total=each*quot+rem;return{d:3,tp:'work',q:'學校旅行有 '+total+' 個學生參加。每輛纜車最多可載 '+each+' 人。最少需要多少輛纜車才足夠接載所有學生？',a:String(quot+1),trap:'餘數處理（進一法）',s:['計算：'+total+' ÷ '+each+' = '+quot+' ... '+rem,'剩下的 '+rem+' 人也需要一輛纜車，所以要 '+quot+' + 1 = '+(quot+1)+' 輛。'],sc:3}}
],

/* ═══════════ 2M 度量 (長度/重量/貨幣/時間) ═══════════ */
'2M':[
  ()=>{var m=ri(2,5),cm=ri(10,90),m2=ri(1,3),cm2=ri(10,80);return{d:1,tp:'calc',q:m+'米'+cm+'厘米 + '+m2+'米'+cm2+'厘米 = ____厘米',a:String(m*100+cm+m2*100+cm2),s:['化成厘米再加'],sc:2}},
  ()=>{var total,part;do{total=ri(200,500);part=ri(80,110);}while(2*part-30>=total);var dWidth=ri(2,5);return{d:2,tp:'short',q:'繩子長'+total+'厘米、闊'+dWidth+'厘米。用去'+part+'厘米後再用去'+(part-30)+'厘米，還剩多長？',a:String(total-part-(part-30)),trap:'繩子闊度（'+dWidth+'厘米）',s:['🔍 闊度無關',total+'−'+part+'='+(total-part),(total-part)+'−'+(part-30)+'='+(total-part-(part-30))],sc:2}},
  ()=>{var price=ri(3,8),n=ri(3,6);var cost=price*n;var pay=pk([20,50,100].filter(p=>p>cost));if(!pay)pay=50+cost;return{d:2,tp:'short',q:nm()+'在'+pk(CTX.places)+'買了'+n+'個'+pk(CTX.food)+'，每個'+price+'元。她付了'+pay+'元，應找回多少元？用了幾成錢？',a:String(pay-cost)+','+(cost/pay*10).toFixed(0)+'成',s:[price+'×'+n+'='+cost+'元','找回: '+pay+'−'+cost+'='+(pay-cost)+'元'],sc:2}},
  ()=>{var w1=ri(2,5),w2=ri(1,4);var dColor=pk(['紅','藍','綠']);return{d:2,tp:'short',q:dColor+'色袋重'+w1+'公斤，白色袋重'+w2+'公斤。兩袋共重多少公斤？哪袋較重？重多少？',a:(w1+w2)+','+(w1>w2?dColor+'色':'白色')+','+Math.abs(w1-w2),trap:'袋的顏色（'+dColor+'）',s:['共: '+w1+'+'+w2+'='+(w1+w2)+'公斤','差: '+Math.abs(w1-w2)+'公斤'],sc:3}},
  ()=>{var kg=ri(1,3),g=ri(100,800);return{d:3,tp:'fill',q:kg+'公斤'+g+'克 = ____克',a:String(kg*1000+g),s:[kg+'×1000+'+g+'='+(kg*1000+g)],sc:2}},
  // MTR travel time trap
  ()=>{var price=ri(15,35),n=ri(2,4);var cost=price*n;var pay=100;var dTime=ri(10,20);return{d:2,tp:'short',q:nm()+'乘搭港鐵用了 '+dTime+' 分鐘到文具店。買了 '+n+' 本筆記簿，每本 '+price+' 元。他用一張 100 元紙幣付款，應找回多少元？',a:String(pay-cost),trap:'乘車時間（'+dTime+'分鐘）',s:['🔍 乘車時間與金錢無關。','總花費：'+price+' × '+n+' = '+cost+' 元','找回：100 − '+cost+' = '+(pay-cost)+' 元'],sc:3}}
],

/* ═══════════ 2S 空間與圖形 ═══════════ */
'2S':[
  // 4 right angles + unequal sides → must be rectangle (not square)
  ()=>({d:1,tp:'mc',q:'一個四邊形有 4 個直角，而且 4 條邊長度不相等，它是什麼形狀？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['4 個直角且邊長不全等，必定是長方形。'],sc:1}),
  ()=>({d:3,tp:'mc',q:'以下哪項是正確的？',isMC:true,opts:[{l:'A',v:'所有正方形都是長方形',c:true},{l:'B',v:'所有長方形都是正方形',c:false},{l:'C',v:'三角形有4個角',c:false}],a:'A',s:['正方形是特殊的長方形'],sc:2}),
  // two squares spatial reasoning
  ()=>({d:3,tp:'short',q:'把兩個完全相同的正方形拼在一起（邊貼邊），會得出一個什麼形狀？這個新圖形有多少個直角？',a:'長方形,4',s:['兩個正方形拼合會拉長一邊，變成長方形。','長方形依然有 4 個直角。'],sc:3})
],

/* ═══════════ 2D1 象形圖和棒形圖 ═══════════ */
'2D1':[
  ()=>{const labels=['蘋果','橙','香蕉','芒果'];const data=labels.map(l=>({l,v:ri(2,9)}));const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);return{d:1,tp:'fill',q:'棒形圖顯示各種水果數量。最多的是____，共____個。',fig:FIG.bars(data),a:mx.l+','+mx.v,s:['最高的棒 = '+mx.l+': '+mx.v+'個'],sc:2}},
  ()=>{const labels=['一月','二月','三月','四月'];const data=labels.map(l=>({l,v:ri(3,9)}));const total=data.reduce((s,d)=>s+d.v,0);return{d:2,tp:'fill',q:'棒形圖顯示四個月的書本數量。四個月共有多少本？',fig:FIG.bars(data),a:String(total),s:['加總: '+data.map(d=>d.v).join('+')+' = '+total],sc:2}},
  ()=>{const rows=[{name:'小明',count:ri(2,5)},{name:'小芬',count:ri(2,5)},{name:'家俊',count:ri(2,5)}];const sym='★';const total=rows.reduce((s,r)=>s+r.count,0);return{d:2,tp:'work',q:'圖表中每個'+sym+'代表2本書。\n'+rows.map(r=>r.name+': '+sym.repeat(r.count)).join('\n')+'\n三人共有多少本書？',a:String(total*2),s:['每個★=2本','共'+total+'個★='+total+'×2='+total*2],sc:2}},
  // HK transport bar chart
  ()=>{const labels=['巴士','港鐵','小巴','的士'];const data=labels.map(l=>({l,v:ri(10,40)}));const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);return{d:1,tp:'fill',q:'棒形圖顯示同學上學的交通工具。最多人乘搭的是____，共有____人。',fig:FIG.bars(data),a:mx.l+','+mx.v,s:['尋找最高的棒條，對應項目是 '+mx.l+'，數值是 '+mx.v+'。'],sc:2}},
  // pictograph: 1 symbol = 10 units
  ()=>{const rows=[{name:'草莓',count:ri(2,5)},{name:'芒果',count:ri(3,6)},{name:'西瓜',count:ri(1,4)}];const sym='🍓';const total=rows.reduce((s,r)=>s+r.count,0);return{d:3,tp:'work',q:'果欄的象形圖中，每個 '+sym+' 代表 10 箱水果。\n'+rows.map(r=>r.name+': '+sym.repeat(r.count)).join('\n')+'\n果欄共有多少箱這三款水果？',a:String(total*10),s:['先數出 '+sym+' 的總數量：'+rows.map(r=>r.count).join('+')+' = '+total,'每個 '+sym+' 代表 10 箱：'+total+' × 10 = '+total*10+' 箱'],sc:3}}
],

/* ═══════════ 2M1 長度和距離(三) [Phase 1B] ═══════════ */
'2M1':[
  // d:1 m+cm addition to cm
  ()=>{var m=ri(2,8),cm=ri(10,90),m2=ri(1,4),cm2=ri(10,90);return{d:1,tp:'calc',q:m+'米'+cm+'厘米 + '+m2+'米'+cm2+'厘米 = ____ 厘米',a:String(m*100+cm+m2*100+cm2),s:['先把米化為厘米：'+m+'米 = '+m*100+' 厘米，'+m2+'米 = '+m2*100+' 厘米','相加：'+(m*100+cm)+' + '+(m2*100+cm2)+' = '+(m*100+cm+m2*100+cm2),'✅ 答案：'+(m*100+cm+m2*100+cm2)+' 厘米'],sc:2}},
  // d:2 rope cut with weight trap
  ()=>{var total,part,part2;do{total=ri(300,600);part=ri(80,150);part2=ri(30,part-10);}while(total<=part+part2||part+part2<0);var dWeight=ri(2,5);return{d:2,tp:'work',q:nm()+'有一條長 '+total+' 厘米的繩子，重 '+dWeight+' 公斤。她先剪去 '+part+' 厘米，再剪去 '+part2+' 厘米。繩子還剩多少厘米？',a:String(total-part-part2),trap:'繩子的重量（'+dWeight+'公斤）',s:['🔍 繩子的重量與長度無關。','先減：'+total+' − '+part+' = '+(total-part),'再減：'+(total-part)+' − '+part2+' = '+(total-part-part2)+' 厘米'],sc:2}},
  // d:3 who-ran-further MC with age trap
  ()=>{var n1=nm(),n2=nm();while(n1===n2)n2=nm();var m1=ri(50,200),cm1=ri(10,90);var m2=ri(50,200),cm2=ri(10,90);var d1=m1*100+cm1,d2=m2*100+cm2;if(d1===d2){m2+=1;d2=m2*100+cm2;}var who=d1>d2?n1:n2;var diff=Math.abs(d1-d2);var wrongDiff=diff+ri(1,9)*10;var dAge=ri(7,9);return{d:3,tp:'mc',q:n1+' 今年 '+dAge+' 歲，跑了 '+m1+' 米 '+cm1+' 厘米。'+n2+' 跑了 '+m2+' 米 '+cm2+' 厘米。誰跑得較遠？遠多少厘米？',isMC:true,opts:[{l:'A',v:who===n1?(n1+','+diff):(n1+','+wrongDiff),c:who===n1},{l:'B',v:who===n2?(n2+','+diff):(n2+','+wrongDiff),c:who===n2},{l:'C',v:'一樣遠',c:false}],a:who===n1?'A':'B',trap:'年齡（'+dAge+'歲）',s:['🔍 年齡與距離無關。',n1+'：'+m1+'米'+cm1+'厘米 = '+(m1*100+cm1)+' 厘米',n2+'：'+m2+'米'+cm2+'厘米 = '+(m2*100+cm2)+' 厘米','相減：|'+d1+' − '+d2+'| = '+diff+' 厘米'],sc:3}},
  // d:1 m → cm conversion (fill)
  ()=>{var m=ri(2,9);return{d:1,tp:'fill',q:m+' 米 = ____ 厘米',a:String(m*100),s:['1 米 = 100 厘米',m+' × 100 = '+(m*100)+' 厘米'],sc:1}},
  // d:1 cm → m + cm conversion (fill, with remainder)
  ()=>{var total=ri(120,950);var m=Math.floor(total/100),cm=total%100;return{d:1,tp:'fill',q:total+' 厘米 = ____ 米 ____ 厘米',a:m+','+cm,s:['1 米 = 100 厘米',total+' ÷ 100 = '+m+' 餘 '+cm+'，即 '+m+' 米 '+cm+' 厘米'],sc:2}},
  // d:2 m+cm subtraction → cm
  ()=>{var m1=ri(3,9),cm1=ri(20,80);var m2=ri(1,m1-1),cm2=ri(10,90);var d1=m1*100+cm1,d2=m2*100+cm2;if(d1<=d2){m1+=1;d1=m1*100+cm1;}var diff=d1-d2;var rM=Math.floor(diff/100),rCm=diff%100;return{d:2,tp:'calc',q:m1+'米'+cm1+'厘米 − '+m2+'米'+cm2+'厘米 = ____ 厘米',a:String(diff),s:['化成厘米：'+m1+'米'+cm1+'厘米 = '+d1+' 厘米',m2+'米'+cm2+'厘米 = '+d2+' 厘米','相減：'+d1+' − '+d2+' = '+diff+' 厘米（即 '+rM+' 米 '+rCm+' 厘米）'],sc:2}},
  // d:2 choose measuring unit (mc)
  ()=>{var items=[{n:'一支鉛筆的長度',u:'厘米'},{n:'課室的長度',u:'米'},{n:'從學校到公園的路程',u:'米'}];var it=pk(items);return{d:2,tp:'mc',q:'量度 '+it.n+'，應該用什麼單位？',isMC:true,opts:[{l:'A',v:'厘米',c:it.u==='厘米'},{l:'B',v:'米',c:it.u==='米'},{l:'C',v:'公里',c:false}],a:it.u==='厘米'?'A':'B',s:[it.n+' 適宜用 '+it.u+' 量度。'],sc:1}},
  // d:2 round trip total (work)
  ()=>{var n=nm();var mAB=ri(50,300);return{d:2,tp:'work',q:n+' 由學校走到公園，單程 '+mAB+' 米。'+n+' 去程和回程共走了多少米？',a:String(mAB*2),s:['單程：'+mAB+' 米','去程＋回程：'+mAB+' × 2 = '+(mAB*2)+' 米'],sc:2}},
  // d:3 three-runner, who ran furthest (mc)
  ()=>{var m=[ri(50,150),ri(50,150),ri(50,150)],cm=[ri(10,90),ri(10,90),ri(10,90)];var d0=m[0]*100+cm[0],d1v=m[1]*100+cm[1],d2=m[2]*100+cm[2];while(d0===d1v||d1v===d2||d0===d2){cm[2]+=1;d2=m[2]*100+cm[2];}var maxI=d0>d1v?(d0>d2?0:2):(d1v>d2?1:2);return{d:3,tp:'mc',q:'甲跑了 '+m[0]+'米'+cm[0]+'厘米，乙跑了 '+m[1]+'米'+cm[1]+'厘米，丙跑了 '+m[2]+'米'+cm[2]+'厘米。誰跑得最遠？',isMC:true,opts:[{l:'A',v:'甲',c:maxI===0},{l:'B',v:'乙',c:maxI===1},{l:'C',v:'丙',c:maxI===2}],a:maxI===0?'A':(maxI===1?'B':'C'),s:['化成厘米：甲 '+d0+'、乙 '+d1v+'、丙 '+d2,'最遠的是 '+(maxI===0?'甲':(maxI===1?'乙':'丙'))+'（'+Math.max(d0,d1v,d2)+' 厘米）'],sc:3}},
  // d:3 multi-step rope (work, with even-half safeguard)
  ()=>{var total,cut1;do{total=ri(500,800);cut1=ri(100,200);}while((total-cut1)%2!==0);var dColor=pk(['紅','藍','綠']);return{d:3,tp:'work',q:'一條 '+dColor+' 色繩子長 '+total+' 厘米。先剪去 '+cut1+' 厘米，再用剩下的一半。還剩多少厘米？',a:String((total-cut1)/2),trap:dColor+'色',s:['🔍 顏色與長度無關','先剪：'+total+' − '+cut1+' = '+(total-cut1)+' 厘米','再用一半：'+(total-cut1)+' ÷ 2 = '+((total-cut1)/2)+' 厘米'],sc:3}}
],

/* ═══════════ 2M2 時間(二) [Phase 1B] ═══════════ */
'2M2':[
  // d:1 clock face fill
  ()=>{var h=ri(1,12);var min=pk([0,5,10,15,20,25,30,35,40,45,50,55]);return{d:1,tp:'fill',q:'分針指着 '+((min/5)||12)+'，時針指着 '+h+'。現在是 ____ 時 ____ 分。',a:h+','+min,s:['時針：'+h,'分針：'+min+' 分（每個數字代表 5 分鐘）','時間：'+h+' 時 '+min+' 分'],sc:1}},
  // d:1 hours → minutes conversion (fill)
  ()=>{var h=ri(2,5);return{d:1,tp:'fill',q:h+' 小時 = ____ 分鐘',a:String(h*60),s:['1 小時 = 60 分鐘',h+' × 60 = '+(h*60)+' 分鐘'],sc:1}},
  // d:1 minutes → hours+minutes conversion (fill)
  ()=>{var total=ri(70,300);var h=Math.floor(total/60),m=total%60;return{d:1,tp:'fill',q:total+' 分鐘 = ____ 小時 ____ 分鐘',a:h+','+m,s:['1 小時 = 60 分鐘',total+' ÷ 60 = '+h+' 餘 '+m],sc:2}},
  // d:2 activity end-time with student-count trap
  ()=>{var h=ri(8,10),m=pk([0,10,20,30,40,50]),dur=pk([15,20,25,30,45]);var endM=m+dur;var endH=h+Math.floor(endM/60);endM=endM%60;if(endH>12)endH=endH-12;var dStu=ri(20,35);return{d:2,tp:'work',q:'課外活動有 '+dStu+' 位同學參加，於上午 '+h+' 時 '+m+' 分開始，活動歷時 '+dur+' 分鐘。活動何時結束？(用 12 小時制作答)',a:endH+'時'+endM+'分',trap:'學生人數（'+dStu+'位）',s:['🔍 學生人數與時間無關。',h+' 時 '+m+' 分 + '+dur+' 分鐘','分鐘：'+m+' + '+dur+' = '+(m+dur),'結束：'+endH+' 時 '+endM+' 分'],sc:2}},
  // d:3 cinema end-time with ticket price trap
  ()=>{var h=ri(2,4),m=40;var dur=pk([55,65,80,95]);var endM=m+dur;var endH=h+Math.floor(endM/60);endM=endM%60;if(endH>12)endH=endH-12;var price=ri(80,120);return{d:3,tp:'work',q:'一場電影在下午 '+h+' 時 '+m+' 分開始播放，門票每張 $'+price+'。電影片長 '+dur+' 分鐘。電影在下午什麼時間結束？',a:endH+'時'+endM+'分',trap:'門票價錢（$'+price+'）',s:['🔍 門票價錢與時間無關。',h+':'+m+' + '+dur+' 分鐘','分鐘：'+m+' + '+dur+' = '+(m+dur),'進位：'+Math.floor((m+dur)/60)+' 小時 '+endM+' 分','結束：下午 '+endH+' 時 '+endM+' 分'],sc:3}}
],

/* ═══════════ 2M3 貨幣(二) [Phase 1B] ═══════════ */
'2M3':[
  // d:1 coins total
  ()=>{var n10=ri(1,3),n5=ri(1,3),n2=ri(1,4),n1=ri(1,5);var total=n10*10+n5*5+n2*2+n1*1;return{d:1,tp:'calc',q:'錢包裏有 '+n10+' 個 $10 硬幣、'+n5+' 個 $5 硬幣、'+n2+' 個 $2 硬幣和 '+n1+' 個 $1 硬幣。共有多少元？',a:String(total),s:['$10 × '+n10+' = $'+(n10*10),'$5 × '+n5+' = $'+(n5*5),'$2 × '+n2+' = $'+(n2*2),'$1 × '+n1+' = $'+(n1*1),'合計：$'+total],sc:1}},
  // d:1 single coin × N fill
  ()=>{var coin=pk([2,5,10]);var n=ri(2,9);return{d:1,tp:'fill',q:n+' 個 $'+coin+' 硬幣合共 $ ____',a:String(coin*n),s:[n+' × $'+coin+' = $'+(coin*n)],sc:1}},
  // d:2 which combination equals $X (mc)
  ()=>{var target=pk([20,30,40,50]);return{d:2,tp:'mc',q:'以下哪一組硬幣合共 $'+target+'？',isMC:true,opts:[{l:'A',v:'$10 + $'+(target-10),c:false},{l:'B',v:'$'+target,c:true},{l:'C',v:'$10 + $'+(target+10),c:false}],a:'B',s:['$'+target+' 直接等於 $'+target],sc:1}},
  // d:2 simple change calculation (calc)
  ()=>{var cost=ri(15,40);var pay=pk([50,100].filter(p=>p>cost));if(!pay)pay=50;return{d:2,tp:'calc',q:'買了 $'+cost+' 的文具，付了 $'+pay+'。應找回多少元？',a:String(pay-cost),s:['找回：$'+pay+' − $'+cost+' = $'+(pay-cost)],sc:1}},
  // d:2 two-item change with distance trap
  ()=>{var p1=ri(8,25),p2=ri(5,20);var total=p1+p2;var pay=pk([50,100].filter(p=>p>total));if(!pay)pay=100;var change=pay-total;var dDist=ri(100,500);return{d:2,tp:'work',q:nm()+'走 '+dDist+' 米到文具店。買了一把 $'+p1+' 的尺和一盒 $'+p2+' 的鉛筆。他付了 $'+pay+'。應找回多少元？',a:String(change),trap:'到文具店的距離（'+dDist+'米）',s:['🔍 距離與金錢無關。','總花費：$'+p1+' + $'+p2+' = $'+total,'找回：$'+pay+' − $'+total+' = $'+change],sc:2}},
  // d:3 去尾法 how-many-can-buy
  ()=>{var money=pk([50,60,80,100]);var cost=pk([7,9,11,13,15]);var max=Math.floor(money/cost);var rem=money%cost;return{d:3,tp:'work',q:nm()+'有 $'+money+'，他想買每支 $'+cost+' 的原子筆。他最多可以買到多少支？還剩多少元？',a:max+','+rem,s:['計算：$'+money+' ÷ $'+cost+' = '+max+' ... $'+rem,'餘下的 $'+rem+' 不夠買多一支（去尾法）。','最多買 '+max+' 支，剩 $'+rem+'。'],sc:3}}
],

/* ═══════════ 2S1 立體圖形(二) [Phase 1B] ═══════════ */
'2S1':[
  // d:1 cube faces/edges/vertices fill (fixed answer)
  ()=>{return{d:1,tp:'fill',q:'正方體有 ____ 個面，____ 條棱，____ 個頂點。',a:'6,12,8',s:['正方體有 6 個面、12 條棱、8 個頂點。'],sc:1}},
  // d:1 identify shape by description (mc)
  ()=>{var shapes=[{n:'正方體',d:'6 個面，每個面都是正方形'},{n:'長方體',d:'6 個面，每個面都是長方形'},{n:'圓柱體',d:'2 個圓形平面和 1 個曲面'}];var sh=pk(shapes);return{d:1,tp:'mc',q:'一個立體有 '+sh.d+'。這是甚麼立體？',isMC:true,opts:[{l:'A',v:'正方體',c:sh.n==='正方體'},{l:'B',v:'長方體',c:sh.n==='長方體'},{l:'C',v:'圓柱體',c:sh.n==='圓柱體'}],a:sh.n==='正方體'?'A':(sh.n==='長方體'?'B':'C'),s:['按描述判斷：'+sh.d+' → '+sh.n],sc:1}},
  // d:2 which-shape-has-no-vertex with toy-count trap
  ()=>{var dToy=ri(3,8);return{d:2,tp:'mc',q:'以下哪個立體圖形沒有頂點？(圖書館裏有 '+dToy+' 個正方體積木)',isMC:true,opts:[{l:'A',v:'球體',c:true},{l:'B',v:'正方體',c:false},{l:'C',v:'三棱柱',c:false}],a:'A',trap:'正方體積木數量（'+dToy+'個）',s:['🔍 正方體積木的數量與答案無關。','球體由一條曲面圍成，沒有棱，也沒有頂點。'],sc:2}},
  // d:2 cylinder properties fill (fixed)
  ()=>{return{d:2,tp:'fill',q:'圓柱體有 ____ 個平面和 ____ 個曲面。',a:'2,1',s:['圓柱體有 2 個圓形平面（上下底），1 個曲面（側面）。'],sc:1}},
  // d:3 cube vs cuboid face comparison (mc)
  ()=>{return{d:3,tp:'mc',q:'正方體和長方體的面數、棱數、頂點數都一樣。它們最大的分別是？',isMC:true,opts:[{l:'A',v:'正方體的 6 個面都是正方形；長方體的 6 個面都是長方形（不一定每個都是正方形）',c:true},{l:'B',v:'面數不同',c:false},{l:'C',v:'棱數不同',c:false}],a:'A',s:['面數都是 6，棱數都是 12，頂點數都是 8。','分別在於「每個面是否都是正方形」：正方體全部正方形；長方體全部長方形。'],sc:2}},
  // d:3 identify shape from faces/edges/vertices description
  ()=>{return{d:3,tp:'work',q:'有一個立體圖形，它有 5 個頂點、8 條棱、5 個面。這是什麼形狀？它有幾個三角形的面？',a:'四棱錐,4',s:['5頂點、8棱、5面 → 四棱錐（底為正方形，4個三角側面）','四棱錐的 5 個面中，4 個是三角形。'],sc:3}}
],

/* ═══════════ 2S2 角 [Phase 1B] ═══════════ */
'2S2':[
  // d:1 mc identify right/acute/obtuse angle
  ()=>{var angle=pk([{n:'直角',d:90,c:0},{n:'銳角',d:45,c:1},{n:'鈍角',d:120,c:2}]);return{d:1,tp:'mc',q:'一個角是 '+angle.d+' 度，這是甚麼角？',isMC:true,opts:[{l:'A',v:'直角',c:angle.c===0},{l:'B',v:'銳角',c:angle.c===1},{l:'C',v:'鈍角',c:angle.c===2}],a:angle.c===0?'A':angle.c===1?'B':'C',s:[angle.d+' 度是'+angle.n+'。','直角 = 90°，銳角 < 90°，鈍角 > 90° 且 < 180°'],sc:1}},
  // d:1 right angle = 90° fill (fixed)
  ()=>{return{d:1,tp:'fill',q:'一個直角是 ____ 度。',a:'90',s:['直角 = 90°。'],sc:1}},
  // d:2 clock hands angle type (mc)
  ()=>{var h=pk([3,9,6]);var angleType=(h===3||h===9)?'直角':'平角';return{d:2,tp:'mc',q:'鐘面顯示 '+h+' 點整，時針和分針成甚麼角？',isMC:true,opts:[{l:'A',v:'直角',c:angleType==='直角'},{l:'B',v:'平角',c:angleType==='平角'},{l:'C',v:'銳角',c:false}],a:angleType==='直角'?'A':'B',s:[h+'點鐘時分針指 12，時針指 '+h+'。','3點和9點：時針與分針成 90° 直角。','6點鐘：時針與分針成 180° 平角。'],sc:2}},
  // d:2 fill right-angles in shapes (fixed)
  ()=>{return{d:2,tp:'fill',q:'長方形有 ____ 個直角；三角形最多有 ____ 個直角。',a:'4,1',s:['長方形 4 個角都是直角 → 4 個。','三角形最多只有 1 個直角。'],sc:2}},
  // d:3 triangle angle sum (work)
  ()=>{var a=ri(40,80);var b=ri(30,a-10);var c=180-a-b;return{d:3,tp:'work',q:'三角形三隻內角的和是 180°。已知一個三角形的兩個角是 '+a+'° 和 '+b+'°，第三個角是多少度？',a:String(c),s:['三角形內角和 = 180°','180° − '+a+'° − '+b+'° = '+c+'°'],sc:2}},
  // d:3 mc quadrilateral one-pair-parallel no-right-angle
  ()=>{var dColor=pk(['紅色','藍色','綠色']);return{d:3,tp:'mc',q:nm()+'畫了一個'+dColor+'的四邊形，它只有一組對邊平行，而且沒有任何直角。這是什麼形狀？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'梯形',c:true},{l:'C',v:'正方形',c:false}],a:'B',trap:'圖形顏色（'+dColor+'）',s:['🔍 顏色與形狀判斷無關。','只有一組對邊平行 + 沒有直角 = 梯形'],sc:3}}
],

/* ═══════════ 2S3 方向和位置(二) [Phase 1B] ═══════════ */
'2S3':[
  // d:1 sun rises/sets direction fill
  ()=>{return{d:1,tp:'fill',q:'太陽從 ____ 方升起，從 ____ 方落下。',a:'東,西',s:['太陽從東方升起，從西方落下。'],sc:1}},
  // d:1 facing direction → left side (mc)
  ()=>{var facing=[{d:'北',left:'西',right:'東'},{d:'南',left:'東',right:'西'},{d:'東',left:'北',right:'南'},{d:'西',left:'南',right:'北'}];var f=pk(facing);return{d:1,tp:'mc',q:nm()+'面對'+f.d+'方，他左手邊是哪個方向？',isMC:true,opts:[{l:'A',v:f.left,c:true},{l:'B',v:f.right,c:false},{l:'C',v:f.d,c:false}],a:'A',s:['面對'+f.d+'方，左手是'+f.left+'方（右手是'+f.right+'方）。'],sc:1}},
  // d:2 grid relative-position fill with distance trap
  ()=>{var dDist=ri(100,500);return{d:2,tp:'fill',q:'在一張地圖上，學校在公園的南方（兩地相距 '+dDist+' 米），圖書館在學校的西方。圖書館在公園的 ____ 方。',a:'西南方',trap:'兩地距離（'+dDist+'米）',s:['🔍 距離與方向無關。','先看學校在公園的南方，再看圖書館在學校的西方','圖書館在公園的西南方。'],sc:2}},
  // d:2 two-step direction combine (short)
  ()=>{var pairs=[{a:'北',b:'東',c:'東北'},{a:'北',b:'西',c:'西北'},{a:'南',b:'東',c:'東南'},{a:'南',b:'西',c:'西南'}];var p=pk(pairs);return{d:2,tp:'short',q:nm()+'先向'+p.a+'走一段路，再向'+p.b+'走一段路。最終位置在出發點的哪個方向？',a:p.c+'方',s:['先'+p.a+'再'+p.b+'，兩段方向合成 → '+p.c+'方。'],sc:2}},
  // d:3 map reasoning with 8-direction compass
  ()=>{return{d:3,tp:'work',q:'地圖上，學校 A 在郵局 B 的北方 4 km 處，圖書館 C 在郵局 B 的東方 3 km 處。'+nm()+'從學校 A 經郵局 B 走到圖書館 C。\n(1) 第二段路（B→C）向哪個方向？\n(2) 從 A 直望 C，是哪個方向？',a:'東,東南方',s:['(1) B→C：郵局在 B，向東走到 C → 東方。','(2) A 在 B 北 4 km，C 在 B 東 3 km，從 A 看 C 位於東南方向。'],sc:3}}
],

/* ═══════════ 2S4 四邊形(一) [Phase 1B] ═══════════ */
'2S4':[
  // d:1 square properties fill (fixed)
  ()=>{return{d:1,tp:'fill',q:'正方形有 ____ 條等長的邊和 ____ 個直角。',a:'4,4',s:['正方形 4 條邊等長，4 個角都是直角。'],sc:1}},
  // d:1 which is a quadrilateral (mc)
  ()=>{return{d:1,tp:'mc',q:'以下哪一個圖形是四邊形？',isMC:true,opts:[{l:'A',v:'正方形',c:true},{l:'B',v:'三角形',c:false},{l:'C',v:'圓形',c:false}],a:'A',s:['四邊形有 4 條邊和 4 個角。','正方形是四邊形；三角形有 3 條邊；圓形沒有直邊。'],sc:1}},
  // d:2 mc correct-statement with student-count trap
  ()=>{var dStu=ri(20,30);return{d:2,tp:'mc',q:'以下哪個說法是正確的？('+dStu+' 位同學討論四邊形)',isMC:true,opts:[{l:'A',v:'所有正方形都是長方形',c:true},{l:'B',v:'所有長方形都是正方形',c:false},{l:'C',v:'菱形一定有 4 個直角',c:false}],a:'A',trap:'學生人數（'+dStu+'位）',s:['🔍 學生人數與答案無關。','正方形是特殊的長方形（邊長相等）。','長方形不一定四邊等長，所以不一定是正方形。','菱形只要求四邊等長，不一定有直角。'],sc:2}},
  // d:3 dynamic shape from property description
  ()=>{var combos=pk([{eq:4,rt:4,n:'正方形'},{eq:2,rt:4,n:'長方形'},{eq:4,rt:0,n:'菱形'},{eq:2,rt:0,n:'平行四邊形'}]);return{d:3,tp:'mc',q:'一個四邊形有 '+combos.eq+' 條等長的邊和 '+combos.rt+' 個直角。這是什麼形狀？',isMC:true,opts:[{l:'A',v:'正方形',c:combos.n==='正方形'},{l:'B',v:'長方形',c:combos.n==='長方形'},{l:'C',v:'菱形',c:combos.n==='菱形'},{l:'D',v:'平行四邊形',c:combos.n==='平行四邊形'}],a:combos.n==='正方形'?'A':combos.n==='長方形'?'B':combos.n==='菱形'?'C':'D',s:[combos.eq+'條等邊 + '+combos.rt+'個直角 = '+combos.n],sc:3}},
  // d:3 classify shape from property description (short)
  ()=>{var shapes=[{n:'正方形',p:'4 條邊等長、4 個直角'},{n:'長方形',p:'對邊等長、4 個直角'},{n:'平行四邊形',p:'對邊等長、沒有直角'},{n:'梯形',p:'只有一組對邊平行'}];var sh=pk(shapes);return{d:3,tp:'short',q:'一個四邊形的特徵是：'+sh.p+'。這是甚麼形狀？',a:sh.n,s:['按特性判斷：'+sh.p+' → '+sh.n],sc:2}}
]
};

// Topics: 2N1, 2N2, 2N3, 2N4, 2N5, 2N6, 2M, 2S, 2D1, 2M1, 2M2, 2M3, 2S1, 2S2, 2S3, 2S4
// Export: grade2 (object with 16 topic keys, 70 generators total)
