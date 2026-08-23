'use strict'
const enhancedModule = { exports: {} }
const insightsModule = { exports: {} }

;(function loadEnhanced(module, exports, require) {
let e=require("obsidian");const t=globalThis.Temporal,n=(e,t)=>`Non-positive ${e}: ${t}`,r=(e,t)=>`Non-finite ${e}: ${t}`,i=e=>`Cannot convert bigint to ${e}`,a=(e,t,n,r)=>o(e,t)+`; must be between ${n}-${r}`,o=(e,t)=>`Invalid ${e}: ${t}`;function s(e){return e===void 0?Object.create(null):m(e)}function c(e,t=`number`){if(typeof e==`bigint`)throw TypeError(i(t));if(e=Number(e),!Number.isFinite(e))throw RangeError(r(t,e));return e}function l(e,t){return Math.trunc(c(e,t))||0}function u(e,t){return d(l(e,t),t)}function d(e,t=`number`){if(e<=0)throw RangeError(n(t,e));return e}function f(e,t,n){return Math.min(Math.max(e,t),n)}function p(e){return e!==null&&(typeof e==`object`||typeof e==`function`)}function m(e){if(!p(e))throw TypeError(`Invalid object`);return e}const h=o,g=e=>`Missing ${e}`,_=e=>`No valid fields: `+e.join(),v=(e,t,n)=>o(e,t)+`; must be `+Object.keys(n).join(),y=e=>`Missing year`+(e?`/era/eraYear`:``),b=`Invalid leap month`,x=e=>o(`Calendar`,e),ee=(e,t)=>`Unknown calendar ${e}; might need ${t}`,te=e=>o(`TimeZone`,e),ne=e=>`Cannot parse: ${e}`,re=e=>`Invalid substring: ${e}`,ie=f,ae=p;function S(e){throw RangeError(e)}function C(e){throw TypeError(e)}function oe(e,t,n,r,i){return se(t,((e,t)=>{let n=e[t];return n===void 0&&C(g(t)),n})(e,t),n,r,i)}function se(e,t,n,r,i,o){let s=ie(t,n,r);return i&&t!==s&&S(((e,t,n,r,i)=>i?a(e,i[t],i[n],i[r]):a(e,t,n,r))(e,t,n,r,o)),s}function ce(e,t=Map){let n=new t;return(t,...r)=>{if(n.has(t))return n.get(t);let i=e(t,...r);return n.set(t,i),i}}const le=e=>ue({name:e},1),ue=(e,t)=>fe(e=>({value:e,configurable:1,writable:!t}),e),de=e=>({[Symbol.toStringTag]:{value:e,configurable:1}});function fe(e,t){let n={};for(let r in t)n[r]=e(t[r],r);return n}function pe(e,t){let n={};for(let r of e)n[r]=t;return n}function me(e){let t={};for(let n of e)t[n]=e=>e[n];return t}function he(e,t,n=Object.create(null)){for(let r of e)n[r]=t[r];return n}function ge(e,t,n){for(let r of e)if(t[r]!==n[r])return 0;return 1}function _e(e,t,n){let r={...n};for(let n=0;n<t;n++)r[e[n]]=0;return r}function ve(e,...t){return(...n)=>e(...t,...n)}function ye(){}function be(e){return e[0].toUpperCase()+e.substring(1)}function w(...e){return[].concat(...e).sort()}function xe(e){return RegExp(`^${e}$`,`i`)}function Se(e){return parseInt(e.padEnd(9,`0`))}function Ce(e){return e&&e!==`+`?-1:1}function we(e){return e===void 0?0:parseInt(e)}function Te(e,t){return String(t).padStart(e,`0`)}const Ee=ve(Te,2);function De(e,t){return Math.sign(e-t)}function T(e,t){return e<t?-1:+(e>t)}function Oe(e,t){let n=e/t;return e%t<0n?n-1n:n}function ke(e,t){let n=Oe(e,t);return[n,e-n*t]}function Ae(e,t){return[Math.floor(e/t),je(e,t)]}function je(e,t){return(e%t+t)%t}function Me(e,t){return Math.trunc(e/t)||0}function Ne(e,t){return e%t||0}function Pe(e,t=1){return t*(.5+e/5)}function Fe(e){return Math.abs(e%1)===.5}const Ie={bce:-1,ce:0};function Le(e){let t=e.normalize(`NFD`).toLowerCase().replace(/[^a-z0-9]/g,``);return t===`bc`||t===`b`?`bce`:t===`ad`||t===`a`?`ce`:t}function Re(e){return e===void 0?`iso8601`:e===0?`gregory`:e.id}const ze=/^M(\d{2})(L?)$/;function Be(e){let t=ze.exec(e);return t||S((e=>`Invalid monthCode: ${e}`)(e)),[parseInt(t[1]),!!t[2]]}function Ve(e,t){return`M`+Ee(e)+(t?`L`:``)}function He(e,t,n){return e+(t||n&&e>=n?1:0)}const Ue={nanosecond:0,microsecond:1,millisecond:2,second:3,minute:4,hour:5,day:6,week:7,month:8,year:9},We=Object.keys(Ue),Ge=1e3,Ke=1e6,qe=1e9,Je=6e10,Ye=36e11,Xe=864e11,Ze=[1,Ge,Ke,qe,Je,Ye,Xe],Qe=BigInt(Ge),$e=BigInt(Ke),et=BigInt(qe),tt=BigInt(Je),nt=BigInt(Ye),E=BigInt(Xe);function rt(e,t){let n=Number(e/E),r=Number(e%E);return Xe/t*n+(Math.trunc(r/t)+r%t/t)}const D=We.slice(0,6),it=me(D),at=[`year`],ot=[`day`],st=[`day`,`month`,`year`],ct=[`offset`],lt=[`timeZone`],ut=[`era`,`eraYear`],dt=[`era`,`eraYear`,`year`],ft=[`month`,`monthCode`],pt=[`day`,`month`,`monthCode`],mt=w(D),ht=w(ut,at),gt=w(ft,at),_t=w(ut,gt),vt=w([`monthCode`],at),yt=w(ut,vt),bt=w(ot,[`monthCode`]),xt=w(ot,gt),St=w(ot,ut,gt),Ct=w(xt,D),wt=w(St,D),Tt=w(xt,D,ct),Et=w(St,D,ct),Dt=w(xt,D,ct,lt),Ot=w(St,D,ct,lt),kt=w(ot,vt),At=w(ot,ut,vt),jt=pe(D,0);function Mt(e){return Pt(e,1),e}const Nt={hour:23,minute:59,second:59};function Pt(e,t){let n={};for(let r of D)n[r]=se(r,e[r],0,Nt[r]||999,t);return n}function Ft(e){return Lt(e)*qe+Rt(e)}function It(e){return 1e3*Lt(e)+e.millisecond}function Lt(e){return 3600*e.hour+60*e.minute+e.second}function Rt(e){return e.millisecond*Ke+e.microsecond*Ge+e.nanosecond}function zt(e){let[t,n]=Ae(e,Xe);return[Bt(n),t]}function Bt(e){let[t,n]=Ae(e,Ke),[r,i]=Ae(n,Ge);return Vt(t,r,i)}function Vt(e,t=0,n=0){let[r,i]=Ae(e,36e5),[a,o]=Ae(i,6e4),[s,c]=Ae(o,1e3);return{hour:r,minute:a,second:s,millisecond:c,microsecond:t,nanosecond:n}}function Ht(e){let[t,n]=ke(e,et);return[Number(t),Number(n)]}function Ut(e){return Gt(e)+BigInt(Ft(e))}function Wt(e){return Kt(e)+It(e)}function Gt(e){return BigInt(qt(e))*E}function Kt(e){return 864e5*qt(e)}function qt(e){return Jt(e.year,e.month,e.day)}function Jt(e,t=1,n=1){let r=t-1;return e+=Math.floor(r/12),t=je(r,12),Date.UTC(e%400-400,t,0)/864e5+146097*(Me(e,400)+1)+n}function Yt(e){let[t,n]=ke(e,E);return{...Xt(Number(t)),...Bt(Number(n))}}function Xt(e){let t=new Date(864e5*je(e,146097));return{year:t.getUTCFullYear()+400*Math.floor(e/146097),month:t.getUTCMonth()+1,day:t.getUTCDate()}}function Zt(e){return[e,0]}function Qt(e,t){if(!t)return{year:1972,month:e}}function $t(e,t,n){return{year:e,month:t,day:n}}function en(e,t){switch(t){case 2:return nn(e)?29:28;case 4:case 6:case 9:case 11:return 30}return 31}function tn(e){return nn(e)?366:365}function nn(e){return e%4==0&&(e%100!=0||e%400==0)}function rn(e,t,n){return e+=Me(n,12),(t+=Ne(n,12))<1?(e--,t+=12):t>12&&(e++,t-=12),{year:e,month:t}}function an(e,t,n,r){return 12*(n-e)+r-t}function on(e){return je(Jt(e.year,e.month,e.day)+4,7)||7}function sn(e){return Jt(e.year,e.month,e.day)-Jt(e.year)+1}function cn(e){let t=e.year,n=Math.floor((sn(e)-on(e)+10)/7),r=ln(t);return n<1?n=r=ln(--t):n>r&&(n=1,r=ln(++t)),{weekOfYear:n,yearOfWeek:t,Be:r}}function ln(e){let t=on({year:e,month:1,day:1});return t===4||t===3&&nn(e)?53:52}function un({year:e}){return e<1?{era:`bce`,eraYear:1-e}:{era:`ce`,eraYear:e}}function dn(e){return fn(e),Mt(e)}function fn(e){return mn(e,1),e}function pn(e){return ge(st,e,mn(e))}function mn(e,t){let{year:n}=e,r=oe(e,`month`,1,12,t);return{year:n,month:r,day:oe(e,`day`,1,en(n,r),t)}}function O(e,t){return e?e.ae(t):t}function hn(e,t,n){return e?e.L(t,n):Zt(n)}function gn(e,t){return e===0?un(t):e&&e.h?.(t)||{}}function _n(e,t,n,r){return e?e.de(t,n,r):$t(t,n,r)}function vn(e,t){return e?e.j(t):12}function yn(e,t,n){return e?e.o(t,n):en(t,n)}function bn(e,t){let{year:n,month:r}=O(e,t),[i,a]=hn(e,n,r);return Ve(i,a)}function xn(e,t){let{year:n}=O(e,t);return e?e.q(n):nn(n)}function Sn(e,t){let{year:n}=O(e,t);return vn(e,n)}function Cn(e,t){let{year:n,month:r}=O(e,t);return yn(e,n,r)}function wn(e,t){let{year:n}=O(e,t);return e?e.i(n):tn(n)}function Tn(e,t){if(!e)return sn(t);let{year:n}=O(e,t),r=_n(e,n,1,1);return qt(t)-qt(r)+1}function En(e,t){return e===void 0?cn(t).weekOfYear:void 0}function Dn(e,t){return e===void 0?cn(t).yearOfWeek:void 0}const k=We.map(e=>e+`s`),On=me(k),kn=w(k),An=k.slice(0,6),jn=k.slice(6),Mn=jn.slice(1),A=pe(k,0),Nn=pe(An,0),Pn=ve(_e,k);function Fn(e,t){return t??S(g(e)),t}const j=ve(In,`string`);function In(e,t,n=e){return typeof t!==e&&C(h(n,t)),t}function Ln(e,t=`number`){return Number.isInteger(e)||S(((e,t)=>`Non-integer ${e}: ${t}`)(t,e)),e||0}function Rn(e){return typeof e==`symbol`&&C(`Cannot convert Symbol to string`),String(e)}function zn(e,t){return p(e)?String(e):j(e,t)}function Bn(e){return typeof e==`boolean`?BigInt(+!!e):typeof e==`string`?BigInt(e):(typeof e!=`bigint`&&C(`Invalid bigint: ${e}`),e)}function Vn(e,t){return Ln(c(e,t),t)}function Hn(e,t){return typeof e==`string`?((e,t)=>{let n=Object.create(null);return n[e]=t,n})(t,e):m(e)}const Un=`smallestUnit`,Wn={constrain:0,reject:1},Gn={compatible:0,reject:1,earlier:2,later:3},Kn={reject:0,use:1,prefer:2,ignore:3},qn={auto:0,never:1,critical:2,always:3},Jn={auto:0,never:1,critical:2},Yn={auto:0,never:1},Xn={floor:0,halfFloor:1,ceil:2,halfCeil:3,trunc:4,halfTrunc:5,expand:6,halfExpand:7,halfEven:8},Zn=[Math.floor,e=>Fe(e)?Math.floor(e):Math.round(e),Math.ceil,e=>Fe(e)?Math.ceil(e):Math.round(e),Math.trunc,e=>Fe(e)?Math.trunc(e)||0:Math.round(e),e=>e<0?Math.floor(e):Math.ceil(e),e=>Math.sign(e)*Math.round(Math.abs(e))||0,e=>Fe(e)?(e=Math.trunc(e)||0)+e%2:Math.round(e)],Qn={previous:-1,next:1};function $n(e){let t=e.roundingIncrement;return t===void 0?1:l(t,`roundingIncrement`)}function er(e){let t=e.fractionalSecondDigits;if(t!==void 0){if(typeof t!=`number`){if(Rn(t)===`auto`)return;S(h(`fractionalSecondDigits`,t))}t=se(`fractionalSecondDigits`,Math.floor(t),0,9,1)}return t}function tr(e,t,n=0,r){let i=t[e];if(i===void 0)return r?n:void 0;if(i=Rn(i),i===`auto`)return r?n:null;let a=Ue[i];return a===void 0&&(a=k.indexOf(i)),a<0&&S(v(e,i,Ue)),a}function nr(e,t,n,r=0){let i=n[e];if(i===void 0)return r;let a=Rn(i),o=t[a];return o===void 0&&S(v(e,a,t)),o}const rr=ve(tr,Un),ir=ve(tr,`largestUnit`),ar=ve(tr,`unit`),or=ve(nr,`overflow`,Wn),sr=ve(nr,`disambiguation`,Gn),cr=ve(nr,`offset`,Kn),lr=ve(nr,`calendarName`,qn),ur=ve(nr,`timeZoneName`,Jn),dr=ve(nr,`offset`,Yn),fr=ve(nr,`roundingMode`,Xn),pr=ve(nr,`direction`,Qn);function mr(e,t,n,r){let i=r?Xe:Ze[t+1];if(i){let n=Ze[t];i%((e=se(`roundingIncrement`,e,1,i/n-+!r,1))*n)&&S(h(`roundingIncrement`,e))}else e=se(`roundingIncrement`,e,1,n?10**9:1,1);return e}function hr(e,t,n,r){return t!=null&&se(e,t,n,r,1,We),t}function gr(e,t){t>e&&S(`smallestUnit > largestUnit`)}function _r(e,t,n,r=9,i=0,a=4){t=s(t);let o=ir(t,i),c=$n(t),l=fr(t,a),u=rr(t,i,1);return o=hr(`largestUnit`,o,i,r),u=hr(Un,u,i,r),o==null?o=Math.max(n,u):gr(o,u),c=mr(c,u,1),e&&(l=(e=>e<4?(e+2)%4:e)(l)),[o,u,c,l]}function vr(e,t=6,n){let r=$n(e=Hn(e,Un)),i=fr(e,7),a=rr(e);return a=Fn(Un,a),a=hr(Un,a,0,t),r=mr(r,a,void 0,n),[a,r,i]}function M(e,t){return he(st,e,he(D,t))}function N(e){return e===void 0?0:or(m(e))}function yr(e,t=0){e=s(e);let n=sr(e),r=cr(e,t);return[or(e),r,n]}const br=BigInt(1e8)*E,xr=BigInt(-1e8)*E,Sr=xr-E,Cr=-3261848;function wr(e){let t=12*e.year+e.month;return(t<Cr||t>3309129)&&S(`Out-of-bounds date`),e}function Tr(e,t=1){return Dr(Gt(e),t),e}function Er(e){let t=Gt(e);return Dr(t),t!==Sr||Ft(e)||S(`Out-of-bounds date`),e}function Dr(e,t=1){(e<(t?Sr:xr)||e>br)&&S(`Out-of-bounds date`)}function Or(e){return(e<xr||e>br)&&S(`Out-of-bounds date`),e}function kr(e,t){return Or(Gt(e)+BigInt(Ft(e)-t))}function Ar(e){return{epochNanoseconds:e}}function jr(e,t,n){return{calendar:n,timeZone:t,epochNanoseconds:e}}function Mr(e,t){return he(D,e,P(e,t))}function P(e,t){return he(st,e,{calendar:t})}function Nr(e){return he(D,e)}function F(e){return he(k,e,{sign:na(e)})}function Pr(e){return t=e.epochNanoseconds,Number(Oe(t,$e));var t}function Fr(e){return e.epochNanoseconds}function Ir(e,t,n){let r=da(t),[i,a]=((e,t)=>{let n=t((e=Hn(e,`unit`)).relativeTo),r=ar(e);return r=Fn(`unit`,r),[r,n]})(n,e),o=Math.max(i,r),s=a&&qi(a);if(!a&&Ji(o,s))return Rr(t,i);if(a||S(`Missing relativeTo`),!t.sign&&Ji(i,s))return 0;let[c,l,u]=Gi(a,t,i);return Ji(i,s)?Rr(c,i):Lr(c,l,i,u)}function Lr(e,t,n,r){let i=na(e)||1,a=zr(Pn(n,e),n,i,r,t),o=a.ee,s=a.te,c=Number(s-o),l=Number(t-o);return a.pe[k[n]]+l/c*i}function Rr(e,t){return rt(aa(e),Ze[t])}function zr(e,t,n,r,i){let a=k[t],o=e,s=0,c=Br(o,a,n,r);return i&&!((e,t,n,r)=>r>0?T(t,e)<=0&&T(e,n)<=0:T(n,e)<=0&&T(e,t)<=0)(i,c.ee,c.te,Math.sign(n))&&(o={...e,[a]:e[a]+n},s=1,c=Br(o,a,n,r)),{...c,pe:o,Ae:s}}function Br(e,t,n,r){let i={...e,[t]:e[t]+n};return{ee:Wi(r,e),te:Wi(r,i),se:i}}function Vr(e,t,n){let r=n-t,i=e-t;if(!i)return 0;let a=i<0n?-i:i,o=r<0n?-r:r,s=T(i,0n)===T(r,0n)?1:-1;return T(a,o)<=0?a===o?s:Pe(T(2n*a,o),s):Number(i)/Number(r)}function Hr(e,t,n,r){let{epochNanoseconds:i}=e,{timeZone:a,calendar:o}=e;if(t===0&&n===1)return{epochNanoseconds:i,timeZone:a,calendar:o};if(t===6){let t=M(I(e),jt),n=M(yi(t,1),jt),o=di(a,t),s=di(a,n);i=ri(Gr(i,o,s),r)?s:o}else{let o=I(e),s=o.offsetNanoseconds;i=li(a,Kr(o,Yr(t,n),r),s,2,0,1)}return{epochNanoseconds:i,timeZone:a,calendar:o}}function Ur(e){let{timeZone:t}=e,n=M(I(e),jt),r=M(yi(n,1),jt),i=di(t,n);return rt(di(t,r)-i,Ye)}function Wr(e){let{timeZone:t,calendar:n}=e;return jr(di(t,M(I(e),jt)),t,n)}function Gr(e,t,n){return Vr(e<n?e:n-1n,t,n)}function Kr(e,t,n){let[r,i]=qr(e,t,n),a=M(yi(e,i),r);return Er(a),a}function qr(e,t,n){return zt(ni(Ft(e),t,n))}function Jr(e){return ni(e,Je,7)}function Yr(e,t){return Ze[e]*t}function Xr(e,t){return BigInt(Ze[e])*BigInt(t)}function Zr(e,t,n){let r=Math.min(da(e),6);return ca($r(aa(e),BigInt(t),n),r)}function Qr(e,t,n,r,i,a,o,s){if(r===0&&i===1)return e;let c=na(e)||1,[l,u,d]=(Ji(r,s)?s&&r<6&&n>=6?ai:ii:oi)(c,e,t,n,r,i,a,o);return d&&r!==7&&(l=((e,t,n,r,i,a)=>{for(let o=r+1;o<=n;o++){if(o===7&&n!==7)continue;let r=Pn(o,e);r[k[o]]+=i;let s=T(t,Wi(a,r));if(s&&s!==i)break;e=r}return e})(l,u,n,Math.max(6,r),c,o)),l}function $r(e,t,n){return ti(e,t,n,e/t%2n)}function ei(e,t,n){let[r,i]=ke(e,E),a=r*E;return a+ti(i,t,n,(a/t+i/t)%2n)}function ti(e,t,n,r){let i=e/t,a=e%t,o=0;a&&(o=Pe(T(2n*(a<0n?-a:a),t),Math.sign(Number(a))));let s=ri(Number(r)+o,n);return(i-r+BigInt(s))*t}function ni(e,t,n){return ri(e/t,n)*t}function ri(e,t){return Zn[t](e)}function ii(e,t,n,r,i,a,o){let s=aa(t),c=$r(s,Xr(i,a),o),l=c-s,u=Math.sign(Number(c/E)-Number(s/E))===e,d=ca(c,Math.min(r,6));return[{...t,...d},n+l,u]}function ai(e,t,n,r,i,a,o,s){let c=Number(oa(t)),l=Yr(i,a),u=ni(c,l,o),d=zr({...t,...Nn},6,e,s,n),f=d.ee,p=d.te,m=u-Number(p-f),h=0;m&&Math.sign(m)!==e?n=f+BigInt(u):(h+=e,u=ni(m,l,o),n=p+BigInt(u));let g=la(u);return[{...t,...g,days:t.days+h},n,!!h]}function oi(e,t,n,r,i,a,o,s){let c=k[i],l=Pn(i,t);i===7&&(t={...t,weeks:t.weeks+Math.trunc(t.days/7)}),l[c]=Me(t[c],a)*a;let u=zr(l,i,a*e,s,n),d=u.ee,f=u.te,p=Vr(n,d,f),m=u.pe[c],h=u.se[c],g=ni(m+p*e*a,a,o),_=g===h;return l[c]=g,[l,_?f:d,u.Ae||_]}function si(e,t){return e.timeZone.O(e.epochNanoseconds,(e=>{let t=Hn(e,`direction`),n=pr(t,0);return n||S(h(`direction`,n)),n})(t))}const I=ce(ci,WeakMap);function ci(e){let{epochNanoseconds:t,timeZone:n}=e,r=n.B(t);return{...Yt(t+BigInt(r)),offsetNanoseconds:r}}function li(e,t,n,r=0,i=0,a,o){if(n!==void 0&&r===1&&(r===1||o))return kr(t,n);r!==2&&r!==0||Tr(t,0);let s=e.N(t);if(n!==void 0&&r!==3){let e=((e,t,n,r)=>{let i=Ut(t);r&&(n=Jr(n));for(let t of e){let e=Number(i-t);if(r&&(e=Jr(e)),e===n)return t}})(s,t,n,a);if(e!==void 0)return e;r===0&&S(`Invalid TimeZone offset`)}return o?Ut(t):ui(e,t,i,s)}function ui(e,t,n=0,r=e.N(t)){if(r.length===1)return r[0];if(n===1&&S(`Ambiguous offset`),r.length)return r[+(n===3)];let i=Ut(t),a=((e,t)=>{let n=e.B(t-E);return(e=>(e>864e11&&S(`Out-of-bounds TimeZone gap`),e))(e.B(t+E)-n)})(e,i),o=Yt(i+BigInt(a*(n===2?-1:1)));return(r=e.N(o))[n===2?0:r.length-1]}function di(e,t){let n=e.N(t);if(n.length)return n[0];let r=Ut(t)-E;return e.O(r,1)}function fi(e,t,n,r,i){let a=N(i);return r.sign&&da(r)<8&&S(`Cannot use small units`),_i(t,bi(t,Tr(_i(t,n)),e?L(r):r,a))}function pi(e,t){return Or(e+(ua(n=t)&&S(`Cannot use large units`),oa(n)));var n}function mi(e,t,n){let{calendar:r,epochNanoseconds:i,timeZone:a}=e,o=oa(t),s=i;if(ua(t)){let i=I(e);s=ui(a,M(gi(r,i,{...t,...Nn},n),i))+o}else s+=o,N(n);return{...e,epochNanoseconds:Or(s)}}function hi(e,t,n,r){let[i,a]=vi(t,n);return Er(M(gi(e,t,{...n,...Nn,days:n.days+a},r),i))}function gi(e,t,n,r){if(n.years||n.months||n.weeks)return bi(e,t,n,N(r));N(r);let i=n.days+Number(oa(n)/E);return i?Tr(yi(t,i)):t}function _i(e,t){return yi(t,1-O(e,t).day)}function vi(e,t){let n=oa(t),r=Number(n/E),i=Number(n%E),[a,o]=zt(Ft(e)+i);return[a,r+o]}function yi(e,t){return t?Xt(qt(e)+t):e}function bi(e,t,n,r){let{years:i,months:a,weeks:o,days:s}=n,c;if(s+=Number(oa(n)/E),i||a)c=xi(e,t,i,a,r);else{if(!o&&!s)return t;c=t}return(o||s)&&(c=yi(c,7*o+s)),Tr(c)}function xi(e,t,n,r,i){let{year:a,month:o,day:s}=O(e,t);if(n){let[t,r]=hn(e,a,o);a+=n,o=Si(e,t,r,e?e.p(a):void 0,i),o=se(`month`,o,1,vn(e,a),i)}if(r){let t=e?e.K(a,o,r):rn(a,o,r);({year:a,month:o}=t)}return s=se(`day`,s,1,yn(e,a,o),i),_n(e,a,o,s)}function Si(e,t,n,r,i){if(n){let n=e?e.l:void 0;return r!==void 0&&(n<0||r===t+1)?r:(i===1&&S(b),n<0?-n:t)}return He(t,0,r)}function Ci(e,t){return Re(e)!==Re(t)&&S(`Mismatching Calendars`),e}function wi(e,t){return e.m!==t.m&&S(`Mismatching TimeZones`),e}function Ti(e){return e.timeZone.id}function Ei(e,t,n,r){let[i,a,o,s]=_r(e,r,3,5),c=zi(t.epochNanoseconds,n.epochNanoseconds,i,a,o,s);return F(e?L(c):c)}function Di(e,t,n,r,i){let[a,o,s,c]=_r(e,i,5),l=n.epochNanoseconds,u=r.epochNanoseconds,d;if(T(u,l)){if(a<6)d=zi(l,u,a,o,s,c);else{let e=wi(n.timeZone,r.timeZone);d=Ni(e,t,n,r,a),d=Qr(d,u,a,o,s,c,Ui(t,e,n),1)}}else d=A;return F(e?L(d):d)}function Oi(e,t,n,r,i){let[a,o,s,c]=_r(e,i,6),l=Ut(n),u=Ut(r),d=T(u,l),f;return d?a<=6?f=zi(l,u,a,o,s,c):(f=Fi(t,n,r,d,a),f=Qr(f,u,a,o,s,c,Hi(t,n))):f=A,F(e?L(f):f)}function ki(e,t,n,r,i){let[a,o,s,c]=_r(e,i,6,9,6);return ji(e,t,n,r,a,o,s,c)}function Ai(e,t,n,r,i){let[a,o,s,c]=_r(e,i,9,9,8),l=_i(t,n),u=_i(t,r);return Li(l,u)?ji(e,t,Tr(l),Tr(u),a,o,s,c,8):F(A)}function ji(e,t,n,r,i,a,o,s,c=6){let l=Gt(n),u=Gt(r),d;return T(u,l)?i===6?d=zi(l,u,i,a,o,s):(d=Ii(t,n,r,i),a===c&&o===1||(d=Qr(d,u,i,a,o,s,Vi(t,n)))):d=A,F(e?L(d):d)}function Mi(e,t,n,r){let[i,a,o,s]=_r(e,r,5,5),c=ni(Ft(n)-Ft(t),Yr(a,o),s),l={...A,...la(c,i)};return F(e?L(l):l)}function Ni(e,t,n,r,i){let a=T(r.epochNanoseconds,n.epochNanoseconds);if(!a)return A;if(i<6)return{...A,...ca(r.epochNanoseconds-n.epochNanoseconds,i)};if(!Li(I(n),I(r)))return{...A,...ca(r.epochNanoseconds-n.epochNanoseconds,5)};let[o,s,c]=Ri(e,n,r,a);return{...i===6?{...A,days:Bi(o,s)}:Ii(t,o,s,i),...la(c)}}function Pi(e,t,n,r){let i=Ut(t),a=Ut(n),o=T(a,i);return o?r<=6?{...A,...ca(a-i,r)}:Fi(e,t,n,o,r):A}function Fi(e,t,n,r,i){let a=n,o=Ft(n)-Ft(t);return Math.sign(o)===-r&&(a=yi(n,-r),o+=864e11*r),{...Ii(e,t,a,i),...la(o)}}function Ii(e,t,n,r){if(r<=7){let e=Bi(t,n);return r===7?{...A,weeks:Me(e,7),days:Ne(e,7)}:{...A,days:e}}let i=O(e,t),a=O(e,n);if(r===8){let{year:r,month:o,day:s}=i,{year:c,month:l,day:u}=a,d=Math.sign(De(c,r)||De(l,o)||Bi(t,n)),f=0,p=0;if(d){f=e?e._(r,o,c,l):an(r,o,c,l);let i=xi(e,t,0,f,0);d*De(s,u)>0&&(f-=d,i=xi(e,t,0,f,0)),p=Bi(i,n)}return{...A,months:f,days:p}}let{year:o,month:s,day:c}=i,{year:l,month:u,day:d}=a,f=l-o,p=u-s,m=d-c;if(f||p){let t=Math.sign(f||p),n=yn(e,l,u),r=0;if(Math.sign(d-c)===-t){let i=n,a=e?e.K(l,u,-t):rn(l,u,-t);({year:l,month:u}=a),f=l-o,p=u-s,n=yn(e,l,u),r=t<0?-i:n}if(m=d-Math.min(c,n)+r,f){let[n,r]=hn(e,o,s),[i,a]=hn(e,l,u),c=e?e.l:void 0;if(p=c!==void 0&&r&&!a&&(c<0?t>0&&i===-c:t<0&&i===n)?0:i-n||Number(a)-Number(r),Math.sign(p)===-t){let i=t<0&&-vn(e,l);l-=t,f=l-o,p=u-Si(e,n,r,e?e.p(l):void 0,0)+(i||vn(e,l))}else if(e){let t=Si(e,n,r,e.p(l),0);p=e._(l,t,l,u)}}}return{...A,years:f,months:p,days:m}}function Li(e,t){return De(e.year,t.year)||De(e.month,t.month)||De(e.day,t.day)}function Ri(e,t,n,r){let i=I(t),a=I(n),o=n.epochNanoseconds,s=0,c=Ft(a)-Ft(i);Math.sign(c)===-r&&s++;let l=s+ +(r>0);for(;s<=l;s++){let t=yi(a,s*-r),n=ui(e,M(t,i));if(T(o,n)!==-r)return[i,t,Number(o-n)]}}function zi(e,t,n,r,i,a){return{...A,...ca($r(t-e,Xr(r,i),a),n)}}function Bi(e,t){return qt(t)-qt(e)}function Vi(e,t){return{origin:t,ie:Gt(t),calendar:e,he:Gt}}function Hi(e,t){return{origin:t,ie:Ut(t),calendar:e,he:e=>Ut(M(e,t))}}function Ui(e,t,n){let r=I(n);return{origin:r,ie:n.epochNanoseconds,calendar:e,he:e=>ui(t,M(e,r))}}function Wi(e,t){return ua(t)?e.he(gi(e.calendar,e.origin,t)):e.ie}function Gi(e,t,n){let{calendar:r}=e;if(qi(e)){let{timeZone:i}=e,a=mi(e,t);return[Ni(i,r,e,a,n),a.epochNanoseconds,Ui(r,i,e)]}let i=Er(M(e,jt)),a=hi(r,i,t);return[Pi(r,i,a,n),Ut(a),Vi(r,e)]}function Ki(e,t){return qi(e)?mi(e,t).epochNanoseconds:Ut(hi(e.calendar,M(e,jt),t))}function qi(e){return`timeZone`in e}function Ji(e,t){return e<=6-!!t}function Yi(e,t,n){let r={};for(let i=t;i>=0;i--){let t=Ze[i];r[n[i]]=Me(e,t),e=Ne(e,t)}return r}const Xi=2**53;function Zi(e,t,n,r,i){let a=e(s(i).relativeTo),o=Math.max(da(n),da(r));return Ji(o,a&&qi(a))?Qi(t,n,r,o):(a||S(`Missing relativeTo`),t&&(r=L(r)),F(((e,t,n,r)=>{let{calendar:i}=e;if(qi(e)){let{timeZone:a}=e;return Ni(a,i,e,mi(mi(e,t),n),r)}let a=M(e,jt);return Pi(i,a,hi(i,hi(i,a,t),n),r)})(a,n,r,o)))}function Qi(e,t,n,r){return F(ra(((e,t,n,r)=>{let i=aa(e)+aa(t)*BigInt(r?-1:1);return Number.isFinite(Number(i/E))||S(`Out-of-bounds date`),{...A,...ca(i,n)}})(t,n,r,e)))}function $i(e,t,n){let r=da(t),[i,a,o,s,c]=((e,t,n)=>{e=Hn(e,Un);let r=ir(e),i=n(e.relativeTo),a=$n(e),o=fr(e,7),s=rr(e);return r===void 0&&s===void 0&&S(`Required smallestUnit or largestUnit`),s??=0,r??=Math.max(s,t),gr(r,s),a=mr(a,s,1),a>1&&s>5&&r!==s&&S(`For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit`),[r,s,a,o,i]})(n,r,e);if(!c&&Math.max(r,i)<=6)return F(ra(((e,t,n,r,i)=>{let a=$r(aa(e),Xr(n,r),i);return{...A,...ca(a,t)}})(t,i,a,o,s)));let l=c&&qi(c),u=l&&i>=6&&a<6;if(!t.sign&&!u)return t;c||S(`Missing relativeTo`);let[d,f,p]=Gi(c,t,i);return F(Qr(d,f,i,a,o,s,p,l))}function ea(e){return e.sign===-1?ta(e):e}function ta(e){return F(L(e))}function L(e){let t={};for(let n of k)t[n]=-1*e[n]||0;return t}function na(e,t=k){let n=0;for(let r of t){let t=Math.sign(e[r]);t&&(n&&n!==t&&S(`Cannot mix duration signs`),n=t)}return n}function ra(e){for(let t of Mn)se(t,e[t],-4294967295,4294967295,1);let t=aa(e);return ia(Number(t/et)),e}function ia(e){Number.isSafeInteger(e)||S(`Out-of-bounds duration`)}function aa(e){return BigInt(e.days)*E+oa(e)}function oa(e){return BigInt(e.hours)*nt+BigInt(e.minutes)*tt+sa(e)}function sa(e){return BigInt(e.seconds)*et+BigInt(e.milliseconds)*$e+BigInt(e.microseconds)*Qe+BigInt(e.nanoseconds)}function ca(e,t=6){let n=Number(e/E),r=Number(e%E),i=Ze[t],a=t<=3?Number(e/BigInt(i)):Xe/i*n+Me(r,i);Number.isFinite(a)||S(`Out-of-bounds date`),t<=3&&Math.abs(a)/(qe/Ze[t])>=Xi&&S(`Out-of-bounds date`);let o=Yi(r,t,k);return o[k[t]]=a,o}function la(e,t=5){return Yi(e,t,k)}function ua(e){return!!na(e,jn)}function da(e){let t=9;for(;t>0&&!e[k[t]];t--);return t}function fa(e,t){return T(e.epochNanoseconds,t.epochNanoseconds)}function pa(e,t,n,r){let i=e(s(r).relativeTo),a=Math.max(da(t),da(n));return ge(k,t,n)?0:Ji(a,i&&qi(i))?T(aa(t),aa(n)):(i||S(`Missing relativeTo`),T(Ki(i,t),Ki(i,n)))}function ma(e,t){return ha(e,t)||ga(e,t)}function ha(e,t){return De(qt(e),qt(t))}function ga(e,t){return De(Ft(e),Ft(t))}function _a(e,t){return!fa(e,t)}function va(e,t){return!fa(e,t)&&e.timeZone.m===t.timeZone.m&&e.calendar===t.calendar}function ya(e,t){return!ma(e,t)&&e.calendar===t.calendar}function ba(e,t){return!ha(e,t)&&e.calendar===t.calendar}function xa(e,t){return!ha(e,t)&&e.calendar===t.calendar}function Sa(e,t){return!ha(e,t)&&e.calendar===t.calendar}function Ca(e,t){return!ga(e,t)}function wa(e){return e===0?Ie:e?e.k:void 0}function R(e,t,n=t){return wa(e)?n:t}function Ta(e,t){let n=e||void 0,r=wa(e),{era:i,eraYear:a,year:o}=t;if(o!==void 0&&(o=l(o,`year`)),a!==void 0&&(a=l(a,`eraYear`)),i!==void 0||a!==void 0){i!==void 0&&a!==void 0||C(`Mismatching era/eraYear`),r||S(`Forbidden era/eraYear`);let e=Le(i),t=r[e];t===void 0&&S((e=>`Invalid era: ${e}`)(i));let s=n?.$?n.$(a,e,t):Oa(a,t);o!==void 0&&o!==s&&S(`Mismatching year/eraYear`),o=s}else o===void 0&&C(y(r));return o}function Ea(e,t,n,r,i){let{month:a,monthCode:o}=t;if(o!==void 0){let t=((e,t,n,r,i=Be(t))=>{let a=e?e.p(n):void 0,[o,s]=i,c=He(o,s,a);if(s){let t=e?e.l:void 0;t===void 0&&S(b),t>0?(c>t&&S(b),a!==c&&(r===1&&S(b),c=He(o,0,a))):(c!==-t&&S(b),a===void 0&&r===1&&S(b))}return c})(e,o,n,r,i);a!==void 0&&a!==t&&S(`Mismatching month/monthCode`),a=t,r=1}else a===void 0&&C(`Missing month/monthCode`);return se(`month`,a,1,vn(e,n),r)}function Da(e,t,n,r,i){return oe(t,`day`,1,yn(e,r,n),i)}function Oa(e,t){return(t+e)*(Math.sign(t)||1)||0}function ka(e,t){return Pt(he(D,{...jt,...e}),t)}const Aa=xe(`([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?`);function ja(e){let t=Ma(e);return t===void 0&&S(ne(e)),t}function Ma(e,t){let n=Aa.exec(e);if(n&&(e=>(e=>{e[0]!==`T`&&e[0]!==`t`||(e=e.slice(1));let t=e.search(/[.,]/),n=t<0?e:e.slice(0,t),r=n.split(`:`);return r.length===1?/^(?:\d{2}|\d{4}|\d{6})$/i.test(n):(r.length===2||r.length===3)&&r.every(e=>e.length===2&&/^\d{2}$/i.test(e))})(e.slice(1)))(n[0]))return((e,t)=>{let n=e[4]||e[5];return t&&n&&S(re(n)),r=(we(e[2])*Ye+we(e[3])*Je+we(e[4])*qe+Se(e[5]||``))*Ce(e[1]),Math.abs(r)>=864e11&&S(`Out-of-bounds offset`),r;var r})(n,t)}const Na={era:zn,month:u,monthCode(e,t){if(typeof e==`string`)return e;if(e&&typeof e==`object`){let n=e.toString;if(typeof n==`function`)return j(n.call(e),t)}return j(e,t)},day:u},Pa=pe(D,l),Fa=pe(k,Vn),Ia=Object.assign({},Na,Pa),La={offset(e){return ja(zn(e))},...Ia};function z(e,t,n,r,i=!r){let a={},o=0;for(let i of t){let t=e[i];if(t!==void 0){o=1;let e=n[i];e&&(t=e(t,i)),a[i]=t}else r&&r.includes(i)&&C(g(i))}return i&&!o&&C(_(t)),a}function Ra(e,t=jt,n){let r=M(e,t);return Er(r),Mr(r,n)}function za(e,t,n){return Va(e,t,Ua(e,t),N(n))}function Ba(e,t,n){let r=Ua(e,t),i=n();return[Va(e,t,r,i[0]),...i]}function Va(e,t,n,r){let i=n[1],a=Ea(e,t,i,r,n[0]);return P(Tr(_n(e,i,a,Da(e,t,a,i,r))),e)}function Ha(e){if(e.monthCode!==void 0)return Be(e.monthCode)}function Ua(e,t){let n=wa(e);return t.year!==void 0||t.era!==void 0&&t.eraYear!==void 0||C(y(n)),t.monthCode===void 0&&t.month===void 0&&C(`Missing month/monthCode`),t.day===void 0&&C(g(`day`)),[Ha(t),Ta(e,t)]}function Wa(e,t,n){let r=wa(e);t.year!==void 0||t.era!==void 0&&t.eraYear!==void 0||C(y(r)),t.monthCode===void 0&&t.month===void 0&&C(`Missing month/monthCode`);let i=Ha(t),a=Ta(e,t);return P(wr(_n(e,a,Ea(e,t,a,N(n),i),1)),e)}function Ga(e,t,n){let r=e===void 0,i=wa(e);t.day===void 0&&C(g(`day`)),r||t.month===void 0||t.year!==void 0||t.era!==void 0&&t.eraYear!==void 0||C(y(i));let a=Ha(t),o=t.eraYear!==void 0||t.year!==void 0?Ta(e,t):void 0,s=N(n),c,l,u;if(o===void 0&&r&&(o=1972),o!==void 0){r||Tr(_n(e,o,1,1));let n=Ea(e,t,o,s,a);c=Da(e,t,n,o,s),[l,u]=hn(e,o,n)}else{t.monthCode===void 0&&C(`Missing month/monthCode`),[l,u]=a;let n=e?e.ne:1972;if(n!==void 0)c=Da(e,t,Ea(e,t,n,s,a),n,s);else{let n=s===0&&e?e.fe?.(l,u,t.day):void 0;c=n===void 0?t.day:n}}u&&((e&&e.U?.[l])??1/0)<t.day&&(s===1&&S(b),u=0,c=ie(t.day,1,(e&&e.R)??1/0));let d=e?e.u(l,!!u,c):Qt(l,!!u);for(;!d&&s===0&&c>1;)c--,d=e?e.u(l,!!u,c):Qt(l,!!u);d||S(`Cannot guess year`);let{year:f,month:p}=d;return P(Tr(_n(e,f,p,c)),e)}const Ka=Intl.DateTimeFormat;function qa(e,t){t<-864e13&&S(`Out-of-bounds date`);let n=e.formatToParts(t),r={};for(let e of n)r[e.type]=e.value;return r}const Ja={El_Aaiun:17,Tucuman:12,Tirane:11,Riga:10,Simferopol:9,Vienna:9,Tunis:8,Boa_Vista:6,Fortaleza:6,Maceio:6,Noronha:6,Recife:6,Gaza:6,Hebron:6,DeNoronha:6},Ya=-388152e4;function Xa(e,t=4){let n=er(e),r=fr(e,4),i=rr(e);return[r,...$a(hr(Un,i,0,t),n)]}function Za(e){return lr(s(e))}function Qa(e,t){return Xa(s(e),t)}function $a(e,t){return e==null?[t===void 0?1:10**(9-t),t]:[Ze[e],e<4?9-3*e:-1]}function eo(e,t,n){let[r,i,a,o]=(e=>{let t=er(e=s(e)),n=fr(e,4),r=rr(e);return[e.timeZone,n,...$a(hr(Un,r,0,4),t)]})(n),c=r!==void 0;return((e,t,n,r,i,a)=>{n=ei(n,BigInt(i),r);let o=t.B(n);return po(Yt(n+BigInt(o)),a)+(e?vo(Jr(o)):`Z`)})(c,Mo(c?e(r):`UTC`),t.epochNanoseconds,i,a,o)}function to(e,t){let n=(e=>{e=s(e);let t=lr(e),n=er(e),r=dr(e),i=fr(e,4),a=rr(e);return[t,ur(e),r,i,...$a(hr(Un,a,0,4),n)]})(t);return((e,t,n,r,i,a,o,s,c,l)=>{r=ei(r,BigInt(c),s);let u=n.B(r);return po(Yt(r+BigInt(u)),l)+vo(Jr(u),o)+yo(t,a)+bo(e,i)})(e.calendar,e.timeZone.id,e.timeZone,e.epochNanoseconds,...n)}function no(e,t){let n=(e=>(e=s(e),[lr(e),...Xa(e)]))(t);return((e,t,n,r,i,a)=>po(Kr(t,i,r),a)+bo(e,n))(e.calendar,e,...n)}function ro(e,t){return n=e.calendar,r=e,i=Za(t),mo(r)+bo(n,i);var n,r,i}function io(e,t){return oo(e.calendar,ho,e,Za(t))}function ao(e,t){return oo(e.calendar,go,e,Za(t))}function oo(e,t,n,r){return r===1?e===void 0?t(n):mo(n):r>1||r===0&&e!==void 0?mo(n)+xo(Re(e),r===2):t(n)}function so(e,t){return((e,t,n,r)=>_o(qr(e,n,t)[0],r))(e,...Qa(t))}function co(e,t){let[n,r,i]=Qa(t,3);return r>1&&ra(e={...e,...Zr(e,r,n)}),lo(e,i)}function lo(e,t){let{sign:n}=e,r=n===-1?L(e):e,{hours:i,minutes:a}=r,o=sa(r),s=Number(o/et),c=Number(o%et);ia(s);let l=Co(c,t),u=t>=0||!n||l;return(n<0?`-`:``)+`P`+uo({Y:fo(r.years),M:fo(r.months),W:fo(r.weeks),D:fo(r.days)})+(i||a||s||u?`T`+uo({H:fo(i),M:fo(a),S:fo(s,u)+l}):``)}function uo(e){let t=[];for(let n in e){let r=e[n];r&&t.push(r,n)}return t.join(``)}function fo(e,t){if(!e&&!t)return``;let n=Object.create(null);return n.useGrouping=0,e.toLocaleString(`fullwide`,n)}function po(e,t){return mo(e)+`T`+_o(e,t)}function mo(e){return ho(e)+`-`+Ee(e.day)}function ho(e){let{year:t}=e;return(t<0||t>9999?wo(t)+Te(6,Math.abs(t)):Te(4,t))+`-`+Ee(e.month)}function go(e){return Ee(e.month)+`-`+Ee(e.day)}function _o(e,t){let n=[Ee(e.hour),Ee(e.minute)];return t!==-1&&n.push(Ee(e.second)+((e,t,n,r)=>Co(e*Ke+t*Ge+n,r))(e.millisecond,e.microsecond,e.nanosecond,t)),n.join(`:`)}function vo(e,t=0){if(t===1)return``;let[n,r]=Ae(Math.abs(e),Ye),[i,a]=Ae(r,Je),[o,s]=Ae(a,qe);return wo(e)+Ee(n)+`:`+Ee(i)+(o||s?`:`+Ee(o)+Co(s):``)}function yo(e,t){return t===1?``:`[`+(t===2?`!`:``)+e+`]`}function bo(e,t){return t>1||t===0&&e!==void 0?xo(Re(e),t===2):``}function xo(e,t){return`[`+(t?`!`:``)+`u-ca=`+e+`]`}const So=/0+$/;function Co(e,t){let n=Te(9,e);return n=t===void 0?n.replace(So,``):n.slice(0,t),n?`.`+n:``}function wo(e){return e<0?`-`:`+`}const To=/^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/,Eo=/[^\w\/:+-]+/;function Do(e){return Oo(j(e))}function Oo(e){return ko(e).id}function ko(e){let t=e.toUpperCase(),n=(e=>{let t=Ma(e,1);if(t!==void 0)return{id:vo(t),X:t,m:t}})(t);if(n)return{kind:`fixed`,...n};let r=t===`UTC`?`UTC`:(e=>(Eo.test(e)&&S(te(e)),To.test(e)&&S(`Forbidden ICU TimeZone`),e.toLowerCase().split(`/`).map((e,t)=>(e.length<=3||/\d/.test(e))&&!/etc|yap/.test(e)?e.toUpperCase():e.replace(/baja|dumont|[a-z]+/g,(e,n)=>e.length<=2&&!t||e===`in`||e===`chat`?e.toUpperCase():e.length>2||!n?be(e).replace(/island|noronha|murdo|rivadavia|urville/,be):e)).join(`/`)))(e);return Ao(r)}const Ao=ce(e=>{if(e===`UTC`)return{kind:`utc`,id:e,m:e};let t=e.toUpperCase(),n=jo(t);return{kind:`named`,id:e,format:n,m:n.resolvedOptions().timeZone}}),jo=ce(e=>new Ka(`en-u-hc-h23`,{calendar:`iso8601`,timeZone:e,era:`short`,year:`numeric`,month:`numeric`,day:`numeric`,hour:`numeric`,minute:`numeric`,second:`numeric`}));function Mo(e){let t=ko(e);return No(t.id,t)}const No=ce((e,t)=>t.kind===`named`?new Fo(e,t.m,t.format):new Po(e,t.m,t.kind===`fixed`?t.X:0));var Po=class{constructor(e,t,n){this.id=e,this.m=t,this.X=n}B(){return this.X}N(e){return[kr(e,this.X)]}O(){}},Fo=class{constructor(e,t,n){this.id=e,this.m=t,this.ke=((e,t)=>{let n=ce(e),r=ce(Lo),i=86400*t;function a(e){let[t,a]=Ro(e,i),s=zo(t),c=zo(a),l=n(s),u=n(c);return l===u?l:o(r(s,c),l,u,e)}function o(t,n,r,i){let a,o;for(;(i===void 0||(a=i<t[0]?n:i>=t[1]?r:void 0)===void 0)&&(o=t[1]-t[0]);){let n=t[0]+Math.floor(o/2);e(n)===r?t[1]=n:t[0]=n+1}return a}return{xe(e){let t=a(e-86400),n=a(e+86400),r=e-t,i=e-n;if(t===n)return[r];let o=a(r);return o===a(i)?[e-o]:t>n?[r,i]:[]},we:a,O:function e(t,a){if(a>0&&t>=864e10)return;if(a<0){if(t<=Ya)return;let n=Io()+94867200;if(t>n)return e(n,-1)}let[s,c]=Ro(a>0?Math.max(t,Ya):t,i),l=i*a,u=a>0?Math.max(t,Io())+94867200:Ya,d=()=>a<0?c>u:s<u;for(;d();){let e=zo(s),i=zo(c),u=n(e),d=n(i);if(u!==d){let n=r(e,i);o(n,u,d);let s=n[0];if((De(s,t)||1)===a)return s}s+=l,c+=l}}}})((e=>t=>{let n=qa(e,1e3*t);return 86400*Jt((e=>{let t=e.relatedYear;if(t!==void 0)return parseInt(t);let n=parseInt(e.year);return e.era!==void 0&&Le(e.era)===`bce`?1-n:n})(n),parseInt(n.month),parseInt(n.day))+3600*parseInt(n.hour)+60*parseInt(n.minute)+parseInt(n.second)-t})(n),(e=>{let t=e.split(`/`).pop();return Ja[t]||60})(e))}B(e){return this.ke.we((e=>Ht(e)[0])(e))*qe}N(e){let t=86400*qt(e)+Lt(e),n=Rt(e);return this.ke.xe(t).map(e=>Or(BigInt(e)*et+BigInt(n)))}O(e,t){let[n,r]=Ht(e),i=this.ke.O(n+(t>0||r?1:0),t);if(i!==void 0)return BigInt(i)*et}};function Io(){return Math.floor(Date.now()/1e3)}function Lo(e,t){return[e,t]}function Ro(e,t){let n=Math.floor(e/t)*t;return[n,n+t]}function zo(e){return ie(e,-1e10,864e10)}function Bo(e,t,n){let r=z(n,R(t,Dt,Ot),La,[],0);if(r.timeZone!==void 0){let n=za(t,r),i=ka(r),a=Mo(e(r.timeZone));return{epochNanoseconds:li(a,M(n,i),r.offset),timeZone:a,calendar:t}}return za(t,r)}function Vo(e,t,n,r){let i=z(n,R(t,Dt,Ot),La,lt,0),a=e(i.timeZone),[o,s,c,l]=Ba(t,i,()=>yr(r)),u=ka(i,s),d=Mo(a);return jr(li(d,M(o,u),i.offset,c,l),d,t)}function Ho(e,t,n){let r=z(t,R(e,Ct,wt),Ia,[],0),[i,a]=Ba(e,r,()=>[N(n)]);return Ra(i,ka(r,a),e)}function Uo(e,t,n,r=[]){return za(e,z(t,R(e,xt,St),Na,r),n)}function Wo(e,t,n,r){return Wa(e,z(t,R(e,gt,_t),Na,r),n)}function Go(e,t,n,r){let i=z(n,R(e,xt,St),Na,ot,0);return t&&i.month!==void 0&&i.monthCode===void 0&&i.year===void 0&&(i.year=1972),Ga(e,i,r)}function Ko(e,t){return ka(z(e,mt,Pa,[],1),N(t))}function qo(e){let t=z(e,kn,Fa);return F(ra({...A,...t}))}function Jo(e){S(ne(e))}function Yo(e){let t=Ss(e=zn(e)),n;return t||Jo(e),t.C?n=0:t.offset?n=ja(t.offset):Jo(e),t.timeZoneId&&Ma(t.timeZoneId,1),dn(t),Ar(kr(t,n))}function Xo(e,t){let n=Ss(j(e));return n||Jo(e),n.timeZoneId?ds(n,t,void 0):(n.C&&Jo(e),ps(n,t))}function Zo(e,t,n){let r=Ss(j(e));return r&&r.timeZoneId||Jo(e),ds(r,t,n)}function Qo(e,t){let n=Ss(j(e));return n&&!n.C||Jo(e),fs(n,t)}function $o(e,t){let n=cs(ss(j(e)),void 0,t);return P(n,n.calendar)}function es(e,t){let n=Cs(j(e));if(n)return ts(n),P(wr(fn(n)),t(n.calendarId));let r=cs(ss(e),ls,t),{calendar:i}=r;return P(_i(i,r),i)}function ts(e){e.calendarId!==`iso8601`&&S(re(e.calendarId))}function ns(e,t){let n=ws(j(e));if(n)return ts(n),P(fn(n),t(n.calendarId));let r=cs(ss(e),us,t),{calendar:i}=r,{year:a,month:o,day:s}=O(i,r),[c,l]=hn(i,a,o),{year:u,month:d}=((e,t,n,r)=>{let i=e?e.u(t,n,r):Qt(t,n);return i||S(`Cannot guess year`),i})(i,c,l,s);return P(Tr(_n(i,u,d,s)),i)}function rs(e){let t=(e=>{let t=Ts(e);return t?(Os(t[13]),Es(t,1)):void 0})(e=j(e));if(!t){let n=Ss(e);n&&n.re||Jo(e),n.C&&S(re(`Z`)),ts(n),t=n}let n;return(n=Cs(e))&&pn(n)&&Jo(e),(n=ws(e))&&pn(n)&&Jo(e),Nr(Mt(t))}function is(e){let t=xs.exec(j(e));return t||Jo(e),F(ra((e=>{let t=0,n=0,r=0,i={years:a(e[2]),months:a(e[3]),weeks:a(e[4]),days:a(e[5]),hours:a(e[6],e[7],5),minutes:a(e[8],e[9],4),seconds:a(e[10],e[11],3),...Yi(r,2,k)};return t||S(_(k)),Ce(e[1])<0&&(i=L(i)),i;function a(e,i,a){let o=0,s=0;return a&&([o,r]=Ae(r,Ze[a])),e!==void 0&&(n&&S(re(e)),s=(e=>{let t=parseInt(e);return Number.isFinite(t)||S(re(e)),t})(e),t=1,i&&(r=Se(i)*(Ze[a]/qe),n=1)),o+s}})(t)))}function as(e){let t=Ss(e)||Cs(e)||ws(e);if(t)return t.calendarId;let n=Ts(e);return n?Os(n[13]).calendarId:e}function os(e){let t=Ss(e);return t&&(t.timeZoneId||t.C&&`UTC`||t.offset)||e}function ss(e){let t=Ss(e);return t&&!t.C||Jo(e),t}function cs(e,t,n){return t&&e.calendarId===`iso8601`?(fn(e),e.re&&Mt(e),ps(t(e),n)):e.re?fs(e,n):ps(e,n)}function ls(e){let t=12*e.year+e.month===Cr?20:1;return{...e,day:t}}function us(e){return{...e,year:1972}}function ds(e,t,n){let r=Mo(Oo(e.timeZoneId)),i;if(dn(e),e.re){let t=e.offset?ja(e.offset):void 0,[,o,s]=yr(n);i=li(r,e,t,o,s,!(r.X||e.offset===void 0||(a=e.offset,a.replace(/\D/g,``).length>4)),e.C)}else yr(n),i=di(r,e);var a;return Or(i),jr(i,r,t(e.calendarId))}function fs(e,t){return dn(e),Er(e),{...M(e,e),calendar:t(e.calendarId)}}function ps(e,t){return fn(e),Tr(e),{calendar:t(e.calendarId),year:e.year,month:e.month,day:e.day}}function ms(e){return`(\\d{2})(?:(:?)(\\d{2})(?:\\${e}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`}const hs=`(?:(?:([+-])(\\d{6}))|(\\d{4}))(-?)(\\d{2})\\4(\\d{2})(?:[T ]`+ms(8)+`(Z|([+-])`+ms(15)+`)?)?`,gs=xe(`(?:(?:([+-])(\\d{6}))|(\\d{4}))-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})`),_s=xe(`(?:--)?(\\d{2})-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})`),vs=xe(hs+`((?:\\[(!?)([^\\]]*)\\]){0,9})`),ys=xe(`T?`+ms(2)+`(([+-])${ms(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`),bs=RegExp(`\\[(!?)([^\\]]*)\\]`,`g`),xs=xe(`([+-])?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?!$)(?:(\\d+)(?:[.,](\\d{1,9}))?H)?(?:(\\d+)(?:[.,](\\d{1,9}))?M)?(?:(\\d+)(?:[.,](\\d{1,9}))?S)?)?`);function Ss(e){let t=vs.exec(e);return t?(e=>{let t=e[12],n=(t||``).toUpperCase()===`Z`;return{year:Ds(e),month:parseInt(e[5]),day:parseInt(e[6]),...Es(e,7),...Os(e[19]),re:!!e[7],C:n,offset:n?void 0:t}})(t):void 0}function Cs(e){let t=gs.exec(e);if(t)return(e=>({year:Ds(e),month:parseInt(e[4]),day:1,...Os(e[5])}))(t)}function ws(e){let t=_s.exec(e);return t?(e=>({year:1972,month:parseInt(e[1]),day:parseInt(e[2]),...Os(e[3])}))(t):void 0}function Ts(e){let t=ys.exec(e);if(t)return t[6]&&ja(t[6]),t}function Es(e,t){let n=we(e[t+3]);return{...zt(Se(e[t+4]||``))[0],hour:we(e[t]),minute:we(e[t+2]),second:n===60?59:n}}function Ds(e){let t=Ce(e[1]),n=parseInt(e[2]||e[3]);return t<0&&!n&&S(re(-0)),t*n}function Os(e){let t,n,r=[];return e.replace(bs,(e,i,a)=>{let o=!!i,[s,c]=a.split(`=`).reverse();return c?c===`u-ca`?(r.push(s.toLowerCase()),t||=o):(o||/[A-Z]/.test(c))&&S(re(e)):(n&&S(re(e)),n=s),``}),r.length>1&&t&&S(re(e)),{timeZoneId:n,calendarId:r[0]||`iso8601`}}function ks(e,t,n){let r=Object.assign(Object.create(null),t);return As(r,n,ft),wa(e)&&(As(r,n,dt),e&&e.ge&&As(r,n,pt,ut)),r}function As(e,t,n,r){let i=0,a=[];for(let e of n)t[e]===void 0?a.push(e):i=1;if(Object.assign(e,t),i)for(let t of r||a)delete e[t]}function js(e,t,n){let{calendar:r,timeZone:i}=e,a=R(r,Tt,Et),o=I(e),{year:s,month:c,day:l}=O(r,o),u={year:s,monthCode:Rs(r,s,c),day:l,hour:o.hour,minute:o.minute,second:o.second,millisecond:o.millisecond,microsecond:o.microsecond,nanosecond:o.nanosecond,offset:o.offsetNanoseconds},d=z(t,a,La),f=ks(r,u,d),p={...u,...d},[m,h,g,_]=Ba(r,f,()=>yr(n,2));return jr(li(i,M(m,Pt(p,h)),p.offset,g,_),i,r)}function Ms(e,t,n){let{calendar:r}=e,i=R(r,Ct,wt),{year:a,month:o,day:s}=O(r,e),c={year:a,monthCode:Rs(r,a,o),day:s,hour:e.hour,minute:e.minute,second:e.second,millisecond:e.millisecond,microsecond:e.microsecond,nanosecond:e.nanosecond},l=z(t,i,Ia),u=ks(r,c,l),d={...c,...l},[f,p]=Ba(r,u,()=>[N(n)]);return Ra(f,Pt(d,p),r)}function Ns(e,t,n){let{calendar:r}=e,i=R(r,xt,St),{year:a,month:o,day:s}=O(r,e);return za(r,ks(r,{year:a,monthCode:Rs(r,a,o),day:s},z(t,i,Na)),n)}function Ps(e,t,n){let{calendar:r}=e,i=R(r,gt,_t),{year:a,month:o}=O(r,e);return Wa(r,ks(r,{year:a,monthCode:Rs(r,a,o)},z(t,i,Na)),n)}function Fs(e,t,n){let{calendar:r}=e,i=R(r,xt,St),{year:a,month:o,day:s}=O(r,e);return Ga(r,ks(r,{monthCode:Rs(r,a,o),day:s},z(t,i,Na)),n)}function Is(e,t,n){return((e,t,n)=>ka({...he(mt,e),...z(t,mt,Pa)},N(n)))(e,t,n)}function Ls(e,t){return F((n=e,r=t,ra({...n,...z(r,kn,Fa)})));var n,r}function Rs(e,t,n){let[r,i]=hn(e,t,n);return Ve(r,i)}function zs(e,t,n){return jr(e.epochNanoseconds,t,n)}function Bs(e){return Ar(e.epochNanoseconds)}function Vs(e){return Mr(I(e),e.calendar)}function Hs(e){return P(I(e),e.calendar)}function Us(e){return Nr(I(e))}function Ws(e,t,n){return jr(Or(ui(t,e,(e=>sr(s(e)))(n))),t,e.calendar)}function Gs(e,t,n,r){let i=e(r.timeZone),a=r.plainTime,o=a===void 0?void 0:t(a),s=Mo(i),c;return c=o?ui(s,M(n,o)):di(s,M(n,jt)),jr(c,s,n.calendar)}function Ks(e,t,n){return Xs(e,he(R(e,vt,yt),t),z(m(n),ot,Na,[]))}function qs(e,t,n){let r=R(e,at,ht);return Xs(e,he(bt,t),z(m(n),r,Na,[]))}function Js(e,t){return Ga(e,z(t,bt,Na))}function Ys(e,t,n){return Wa(e,z(t,R(e,vt,yt),Na),n)}function Xs(e,t,n){let r=R(e,kt,At),i=ks(e,t,n);return i=z(i,r,Na,[]),za(e,i)}function Zs(e){return Ar(Or(BigInt(Vn(e))*$e))}function Qs(e){return Ar(Or(Bn(e)))}function $s(e){return e.timeZone=`UTC`,[`full`,`long`].includes(e.timeStyle)&&(e.timeStyle=`medium`),e}function ec(e,t){return e.timeZone!==void 0&&C(`Cannot specify TimeZone`),e.timeZone=t,e}function tc(e,t,n){let r=e.resolvedOptions().calendar;!n&&t.calendar===void 0||Re(t.calendar)===r||S(`Mismatching Calendars`)}function nc(e,t,n,r,i){let a=new Set(e),o=new Set(t),s=new Set(n);return(e,t)=>{let n,c,l={},u={},d={},f=0,p=0;for(let t of Object.keys(e)){let r=e[t];r===void 0||s.has(t)||(a.has(t)?t===`dateStyle`?n=r:t===`timeStyle`?c=r:l[t]=r:t===`era`?u[t]=r:o.has(t)?t===`dateStyle`||t===`timeStyle`?p=1:f=1:d[t]=r)}let m=n!==void 0,h=c!==void 0,g=m||h,_=Object.keys(l).length>0,v=f||p,y=_||m||h,b=Object.keys(u).length>0;(!t&&v||t&&v&&!y||g&&(_||b||f))&&C(`Invalid formatting options`);let x={};return g||y||Object.assign(x,r),Object.assign(x,l,u,d),m&&(i?Object.assign(x,i[n]):x.dateStyle=n),h&&(x.timeStyle=c),x}}const rc={year:`numeric`,month:`numeric`,day:`numeric`},ic={hour:`numeric`,minute:`numeric`,second:`numeric`},ac=Object.assign({},rc,ic),oc=[`weekday`,`year`,`month`,`day`,`dateStyle`],sc=[`dayPeriod`,`hour`,`minute`,`second`,`fractionalSecondDigits`,`timeStyle`],cc=oc.concat(sc),lc=[`weekday`,`day`].concat(sc),uc=[`weekday`,`year`].concat(sc),dc=nc(cc,[],[],ac),fc=nc(cc,[],[],{...ac,timeZoneName:`short`}),pc=nc(cc,[],[`timeZoneName`],ac),mc=nc(oc,sc,[`timeZoneName`],rc),hc=nc(sc,oc,[`timeZoneName`,`era`],ic),gc=nc([`year`,`month`,`dateStyle`],lc,[`timeZoneName`],{year:`numeric`,month:`numeric`},{full:{year:`numeric`,month:`long`},long:{year:`numeric`,month:`long`},medium:{year:`numeric`,month:`short`},short:{year:`2-digit`,month:`numeric`}}),_c=nc([`month`,`day`,`dateStyle`],uc,[`timeZoneName`,`era`],{month:`numeric`,day:`numeric`},{full:{month:`long`,day:`numeric`},long:{month:`long`,day:`numeric`},medium:{month:`short`,day:`numeric`},short:{month:`numeric`,day:`numeric`}});function vc(e,t){let{timeZone:n}=e,r=I(e),{offsetNanoseconds:i}=r,a=t||jt,o;return o=t?li(n,M(r,a),i,2):di(n,M(r,a)),jr(o,n,e.calendar)}function yc(e){let t=bc(),n=e.B(t);return Yt(t+BigInt(n))}function bc(){return BigInt(Date.now())*$e}function xc(){return new Ka().resolvedOptions().timeZone}const Sc=`PlainYearMonth`,Cc=`PlainMonthDay`,wc=`PlainDate`,Tc=`PlainDateTime`,Ec=`PlainTime`,Dc=`ZonedDateTime`,Oc=`Instant`,kc=`Duration`;function Ac(e,t,n,...r){return Object.defineProperties(t,le(e)),Object.defineProperties(t.prototype,de(`Temporal.`+e)),Object.defineProperties(t.prototype,fe(e=>({get(){return e(n(this))},configurable:1}),Object.assign({},...r))),t}const jc=ye.name===`noop`?e=>{Object.defineProperty(e,"_str_",{value:e.toJSON()})}:ye;function Mc(){C(`Invalid calling context`)}function Nc(){C(`Cannot use valueOf`)}const Pc={era(e){return gn(e.calendar,e).era},eraYear(e){return gn(e.calendar,e).eraYear},year(e){return O(e.calendar,e).year},month(e){return O(e.calendar,e).month},monthCode(e){return bn(e.calendar,e)}},Fc={era(e){return gn(e.calendar,e).era},eraYear(e){return gn(e.calendar,e).eraYear},year(e){return O(e.calendar,e).year},month(e){return O(e.calendar,e).month},monthCode(e){return bn(e.calendar,e)},day(e){return O(e.calendar,e).day}},Ic={monthCode(e){return bn(e.calendar,e)},day(e){return O(e.calendar,e).day}},Lc={daysInMonth(e){return Cn(e.calendar,e)},daysInYear(e){return wn(e.calendar,e)},monthsInYear(e){return Sn(e.calendar,e)},inLeapYear(e){return xn(e.calendar,e)}},Rc={dayOfWeek(e){return on(e)},dayOfYear(e){return Tn(e.calendar,e)},weekOfYear(e){return En(e.calendar,e)},yearOfWeek(e){return Dn(e.calendar,e)},daysInWeek(){return 7},daysInMonth(e){return Cn(e.calendar,e)},daysInYear(e){return wn(e.calendar,e)},monthsInYear(e){return Sn(e.calendar,e)},inLeapYear(e){return xn(e.calendar,e)}};function zc(e){return me(Object.keys(e))}zc(Lc),zc(Rc);function Bc(e){let t=j(e).toLowerCase();return t===`iso8601`?void 0:t===`gregory`?0:void S(ee(e,`temporal-polyfill/full`))}function Vc(e=`iso8601`){return Bc(e)}const Hc=new WeakMap,Uc=Ac(Dc,class{constructor(e,t,n=void 0){let r=Or(Bn(e)),i=Mo(Do(t)),a=Vc(n);Jc(this,jr(r,i,a))}static from(e,t=void 0){return Wc(qc(e,t))}static compare(e,t){return fa(qc(e),qc(t))}get calendarId(){return Re(B(this).calendar)}get timeZoneId(){return B(this).timeZone.id}get epochMilliseconds(){return Pr(B(this))}get epochNanoseconds(){return Fr(B(this))}get offset(){return vo(I(B(this)).offsetNanoseconds)}get offsetNanoseconds(){return I(B(this)).offsetNanoseconds}get hoursInDay(){return Ur(B(this))}with(e,t=void 0){return Wc(js(B(this),yl(e),t))}withCalendar(e){return Wc({...B(this),calendar:Hl(e)})}withTimeZone(e){return Wc({...B(this),timeZone:Mo(Yc(e))})}withPlainTime(e=void 0){return Wc(vc(B(this),El(e)))}add(e,t=void 0){return Wc(mi(B(this),W(e),t))}subtract(e,t=void 0){return Wc(mi(B(this),L(W(e)),t))}until(e,t=void 0){let n=B(this),r=qc(e);return U(F(Di(0,Ci(n.calendar,r.calendar),n,r,t)))}since(e,t=void 0){let n=B(this),r=qc(e);return U(F(Di(1,Ci(n.calendar,r.calendar),n,r,t)))}round(e){let t=B(this),[n,r,i]=vr(e);return Wc(Hr(t,n,r,i))}startOfDay(){return Wc(Wr(B(this)))}equals(e){return va(B(this),qc(e))}toInstant(){return Qc(Bs(B(this)))}toPlainDateTime(){return Al(Vs(B(this)))}toPlainDate(){return Il(Hs(B(this)))}toPlainTime(){return Sl(Us(B(this)))}toLocaleString(e=void 0,t={}){let n=B(this),r=new Ka(e,ec(fc(t),Ti(n)));return tc(r,n),r.format(Pr(n))}toString(e=void 0){return to(B(this),e)}toJSON(){return to(B(this))}getTimeZoneTransition(e){let t=B(this),n=si(t,e);return n?Wc({...t,epochNanoseconds:n}):null}valueOf(){return Nc()}},Gc,Fc,Rc,it);function Wc(e){return Jc(Object.create(Uc.prototype),e)}function B(e){return Kc(e)||Mc()}function Gc(e){let t=B(e);return{...I(t),calendar:t.calendar}}function Kc(e){return Hc.get(e)}function qc(e,t){if(ae(e)){let n=Kc(e);return n?(yr(t),n):Vo(Yc,Bl(e),e,t)}return Zo(e,Bc,t)}function Jc(e,t){return Hc.set(e,t),jc(e),e}function Yc(e){if(ae(e)){let t=Kc(e);return t||C(te(e)),t.timeZone.id}return(e=>Oo(os(j(e))))(e)}const Xc=new WeakMap,Zc=Ac(Oc,class{constructor(e){let t=Or(Bn(e));rl(this,Ar(t))}static from(e){return Qc(tl(e))}static fromEpochMilliseconds(e){return Qc(Zs(e))}static fromEpochNanoseconds(e){return Qc(Qs(e))}static compare(e,t){return fa(tl(e),tl(t))}get epochMilliseconds(){return Pr($c(this))}get epochNanoseconds(){return Fr($c(this))}add(e){return Qc(Ar(pi($c(this).epochNanoseconds,W(e))))}subtract(e){return Qc(Ar(pi($c(this).epochNanoseconds,L(W(e)))))}until(e,t=void 0){return U(Ei(0,$c(this),tl(e),t))}since(e,t=void 0){return U(Ei(1,$c(this),tl(e),t))}round(e){let t=$c(this),[n,r,i]=vr(e,5,1);return Qc(Ar(ei(t.epochNanoseconds,Xr(n,r),i)))}equals(e){return _a($c(this),tl(e))}toZonedDateTimeISO(e){return Wc(zs($c(this),Mo(Yc(e))))}toLocaleString(e=void 0,t={}){let n=$c(this);return new Ka(e,dc(t)).format(Pr(n))}toString(e=void 0){return eo(Yc,$c(this),e)}toJSON(){return eo(Yc,$c(this))}valueOf(){return Nc()}});function Qc(e){return rl(Object.create(Zc.prototype),e)}function $c(e){return el(e)||Mc()}function el(e){return Xc.get(e)}function tl(e){if(ae(e)){let t=el(e);if(t)return t;let n=Kc(e);if(n)return Ar(n.epochNanoseconds)}return Yo(e)}const{toTemporalInstant:nl}={toTemporalInstant(){let e=Date.prototype.valueOf.call(this);return Qc(Ar(BigInt(Ln(e))*$e))}};function rl(e,t){return Xc.set(e,t),jc(e),e}const il=new WeakMap,al=Ac(Cc,class{constructor(e,t,n=void 0,r){let i=l(e),a=l(t),o=Vc(n),s=Tr(fn({year:l(r??1972),month:i,day:a}));ul(this,P(s,o))}static from(e,t=void 0){return ol(ll(e,t))}get calendarId(){return Re(sl(this).calendar)}with(e,t=void 0){return ol(Fs(sl(this),yl(e),t))}equals(e){return Sa(sl(this),ll(e))}toPlainDate(e){return Il(qs(sl(this).calendar,this,e))}toLocaleString(e=void 0,t={}){let n=sl(this),r=new Ka(e,$s(_c(t)));return tc(r,n,1),r.format(Kt(n))}toString(e=void 0){return ao(sl(this),e)}toJSON(){return ao(sl(this))}valueOf(){return Nc()}},sl,Ic);function ol(e){return ul(Object.create(al.prototype),e)}function sl(e){return cl(e)||Mc()}function cl(e){return il.get(e)}function ll(e,t){if(ae(e)){let n=cl(e);if(n)return N(t),n;let r=Vl(e);return Go(r===void 0?void 0:r,r===void 0,e,t)}let n=ns(e,Bc);return N(t),n}function ul(e,t){return il.set(e,t),jc(e),e}const dl=new WeakMap,fl=Ac(Sc,class{constructor(e,t,n=void 0,r){let i=l(e),a=l(t),o=Vc(n),s=wr(fn({year:i,month:a,day:l(r??1)}));_l(this,P(s,o))}static from(e,t=void 0){return pl(gl(e,t))}static compare(e,t){return ha(gl(e),gl(t))}get calendarId(){return Re(ml(this).calendar)}with(e,t=void 0){return pl(Ps(ml(this),yl(e),t))}add(e,t=void 0){let n=ml(this);return pl(P(fi(0,n.calendar,n,W(e),t),n.calendar))}subtract(e,t=void 0){let n=ml(this);return pl(P(fi(1,n.calendar,n,W(e),t),n.calendar))}until(e,t=void 0){let n=ml(this),r=gl(e);return U(Ai(0,Ci(n.calendar,r.calendar),n,r,t))}since(e,t=void 0){let n=ml(this),r=gl(e);return U(Ai(1,Ci(n.calendar,r.calendar),n,r,t))}equals(e){return xa(ml(this),gl(e))}toPlainDate(e){return Il(Ks(ml(this).calendar,this,e))}toLocaleString(e=void 0,t={}){let n=ml(this),r=new Ka(e,$s(gc(t)));return tc(r,n,1),r.format(Kt(n))}toString(e=void 0){return io(ml(this),e)}toJSON(){return io(ml(this))}valueOf(){return Nc()}},ml,Pc,Lc);function pl(e){return _l(Object.create(fl.prototype),e)}function ml(e){return hl(e)||Mc()}function hl(e){return dl.get(e)}function gl(e,t){if(ae(e)){let n=hl(e);return n?(N(t),n):Wo(Bl(e),e,t)}let n=es(e,Bc);return N(t),n}function _l(e,t){return dl.set(e,t),jc(e),e}function vl(e){if(!ae(e))return;let t=el(e);return t?[Oc,t]:(t=Kc(e),t?[Dc,t]:(t=jl(e),t?[Tc,t]:(t=Ll(e),t?[wc,t]:(t=wl(e),t?[Ec,t]:(t=hl(e),t?[Sc,t]:(t=cl(e),t?[Cc,t]:(t=Kl(e),t?[kc,t]:void 0)))))))}function yl(e){return(vl(e)||e.calendar!==void 0||e.timeZone!==void 0)&&C(`Invalid bag`),e}const bl=new WeakMap,xl=Ac(Ec,class{constructor(e=0,t=0,n=0,r=0,i=0,a=0){let o=Mt(fe(l,{hour:e,minute:t,second:n,millisecond:r,microsecond:i,nanosecond:a}));Dl(this,Nr(o))}static from(e,t=void 0){return Sl(Tl(e,t))}static compare(e,t){return ga(Tl(e),Tl(t))}with(e,t=void 0){return Sl(Is(Cl(this),yl(e),t))}add(e){return Sl(vi(Cl(this),W(e))[0])}subtract(e){return Sl(vi(Cl(this),L(W(e)))[0])}until(e,t=void 0){return U(Mi(0,Cl(this),Tl(e),t))}since(e,t=void 0){return U(Mi(1,Cl(this),Tl(e),t))}round(e){let t=Cl(this),[n,r,i]=vr(e,5);return Sl(qr(t,Yr(n,r),i)[0])}equals(e){return Ca(Cl(this),Tl(e))}toLocaleString(e=void 0,t={}){let n=Cl(this);return new Ka(e,$s(hc(t))).format(It(n))}toString(e=void 0){return so(Cl(this),e)}toJSON(){return so(Cl(this))}valueOf(){return Nc()}},Cl,it);function Sl(e){return Dl(Object.create(xl.prototype),e)}function Cl(e){return wl(e)||Mc()}function wl(e){return bl.get(e)}function Tl(e,t){if(ae(e)){let n=wl(e);if(n)return N(t),n;let r=jl(e);if(r)return N(t),Nr(r);let i=Kc(e);return i?(N(t),Us(i)):Ko(e,t)}let n=rs(e);return N(t),n}function El(e){return e===void 0?void 0:Tl(e)}function Dl(e,t){return bl.set(e,t),jc(e),e}const Ol=new WeakMap,kl=Ac(Tc,class{constructor(e,t,n,r=0,i=0,a=0,o=0,s=0,c=0,u=void 0){let d=Er(dn(fe(l,{year:e,month:t,day:n,hour:r,minute:i,second:a,millisecond:o,microsecond:s,nanosecond:c}))),f=Vc(u);Nl(this,Mr(d,f))}static from(e,t=void 0){return Al(Ml(e,t))}static compare(e,t){return ma(Ml(e),Ml(t))}get calendarId(){return Re(V(this).calendar)}with(e,t=void 0){return Al(Ms(V(this),yl(e),t))}withCalendar(e){return Al(Mr(V(this),Hl(e)))}withPlainTime(e=void 0){let t=V(this);return Al(Ra(t,El(e),t.calendar))}add(e,t=void 0){let n=V(this);return Al(Mr(hi(n.calendar,n,W(e),t),n.calendar))}subtract(e,t=void 0){let n=V(this);return Al(Mr(hi(n.calendar,n,L(W(e)),t),n.calendar))}until(e,t=void 0){let n=V(this),r=Ml(e);return U(Oi(0,Ci(n.calendar,r.calendar),n,r,t))}since(e,t=void 0){let n=V(this),r=Ml(e);return U(Oi(1,Ci(n.calendar,r.calendar),n,r,t))}round(e){let t=V(this),[n,r,i]=vr(e);return Al(Mr(Kr(t,Yr(n,r),i),t.calendar))}equals(e){return ya(V(this),Ml(e))}toZonedDateTime(e,t=void 0){return Wc(Ws(V(this),Mo(Yc(e)),t))}toPlainDate(){let e=V(this);return Il(P(e,e.calendar))}toPlainTime(){return Sl(Nr(V(this)))}toLocaleString(e=void 0,t={}){let n=V(this),r=new Ka(e,$s(pc(t)));return tc(r,n),r.format(Wt(n))}toString(e=void 0){return no(V(this),e)}toJSON(){return no(V(this))}valueOf(){return Nc()}},V,Fc,Rc,it);function Al(e){return Nl(Object.create(kl.prototype),e)}function V(e){return jl(e)||Mc()}function jl(e){return Ol.get(e)}function Ml(e,t){if(ae(e)){let n=jl(e);if(n)return N(t),n;let r=Ll(e);if(r)return N(t),Mr(M(r,jt),r.calendar);let i=Kc(e);return i?(N(t),Vs(i)):Ho(Bl(e),e,t)}let n=Qo(e,Bc);return N(t),n}function Nl(e,t){return Ol.set(e,t),jc(e),e}const Pl=new WeakMap,Fl=Ac(wc,class{constructor(e,t,n,r=void 0){let i=Tr(fn(fe(l,{year:e,month:t,day:n}))),a=Vc(r);zl(this,P(i,a))}static from(e,t=void 0){return Il(Rl(e,t))}static compare(e,t){return ha(Rl(e),Rl(t))}get calendarId(){return Re(H(this).calendar)}with(e,t=void 0){return Il(Ns(H(this),yl(e),t))}withCalendar(e){return Il(P(H(this),Hl(e)))}add(e,t=void 0){let n=H(this);return Il(P(gi(n.calendar,n,W(e),t),n.calendar))}subtract(e,t=void 0){let n=H(this);return Il(P(gi(n.calendar,n,L(W(e)),t),n.calendar))}until(e,t=void 0){let n=H(this),r=Rl(e);return U(ki(0,Ci(n.calendar,r.calendar),n,r,t))}since(e,t=void 0){let n=H(this),r=Rl(e);return U(ki(1,Ci(n.calendar,r.calendar),n,r,t))}equals(e){return ba(H(this),Rl(e))}toZonedDateTime(e){let t=ae(e)?{timeZone:e.timeZone,plainTime:e.plainTime}:{timeZone:e};return Wc(Gs(Yc,Tl,H(this),t))}toPlainDateTime(e=void 0){let t=H(this);return Al(Ra(t,El(e),t.calendar))}toPlainYearMonth(){return pl(Ys(H(this).calendar,this))}toPlainMonthDay(){return ol(Js(H(this).calendar,this))}toLocaleString(e=void 0,t={}){let n=H(this),r=new Ka(e,$s(mc(t)));return tc(r,n),r.format(Kt(n))}toString(e=void 0){return ro(H(this),e)}toJSON(){return ro(H(this))}valueOf(){return Nc()}},H,Fc,Rc);function Il(e){return zl(Object.create(Fl.prototype),e)}function H(e){return Ll(e)||Mc()}function Ll(e){return Pl.get(e)}function Rl(e,t){if(ae(e)){let n=Ll(e);if(n)return N(t),n;let r=jl(e);if(r)return N(t),P(r,r.calendar);let i=Kc(e);return i?(N(t),Hs(i)):Uo(Bl(e),e,t)}let n=$o(e,Bc);return N(t),n}function zl(e,t){return Pl.set(e,t),jc(e),e}function Bl(e){let t=Vl(e);return t===void 0?void 0:t}function Vl(e){let{calendar:t}=e;if(t!==void 0)return Hl(t)}function Hl(e){if(ae(e)){let t=Ll(e)||jl(e)||Kc(e)||cl(e)||hl(e);return t||C(x(e)),t.calendar}return(e=>Bc(as(j(e))))(e)}const Ul=new WeakMap,Wl=Ac(kc,class{constructor(e=0,t=0,n=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0){let u=ra(fe(Vn,{years:e,months:t,weeks:n,days:r,hours:i,minutes:a,seconds:o,milliseconds:s,microseconds:c,nanoseconds:l}));Jl(this,F(u))}static from(e){return U(W(e))}static compare(e,t,n=void 0){return pa(ql,W(e),W(t),n)}get sign(){return Gl(this).sign}get blank(){return!Gl(this).sign}with(e){return U(Ls(Gl(this),e))}negated(){return U(ta(Gl(this)))}abs(){return U(ea(Gl(this)))}add(e,t=void 0){return U(Zi(ql,0,Gl(this),W(e),t))}subtract(e,t=void 0){return U(Zi(ql,1,Gl(this),W(e),t))}round(e){return U($i(ql,Gl(this),e))}total(e){return Ir(ql,Gl(this),e)}toLocaleString(e=void 0,t){let n=Gl(this);return Intl.DurationFormat?new Intl.DurationFormat(e,t).format(n):co(n,t)}toString(e=void 0){return co(Gl(this),e)}toJSON(){return co(Gl(this))}valueOf(){return Nc()}},Gl,On);function U(e){return Jl(Object.create(Wl.prototype),e)}function Gl(e){return Kl(e)||Mc()}function Kl(e){return Ul.get(e)}function W(e){return ae(e)?Kl(e)||qo(e):is(e)}function ql(e){if(e!==void 0){if(ae(e)){let t=Kc(e);if(t)return t;let n=Ll(e);if(n)return n;let r=jl(e);return r?P(r,r.calendar):Bo(Yc,Bl(e),e)}return Xo(e,Bc)}}function Jl(e,t){return Ul.set(e,t),jc(e),e}const Yl=Object.defineProperties({},{...de(`Temporal.Now`),...ue({timeZoneId(){return xc()},instant(){return Qc(Ar(bc()))},zonedDateTimeISO(e=xc()){let t=Mo(Yc(e));return Wc(jr(bc(),t))},plainDateTimeISO(e=xc()){return Al(Mr(yc(Mo(Yc(e)))))},plainDateISO(e=xc()){return Il(P(yc(Mo(Yc(e)))))},plainTimeISO(e=xc()){return Sl(Nr(yc(Mo(Yc(e)))))}})}),Xl=Object.defineProperties({},{...de(`Temporal`),...ue({PlainYearMonth:fl,PlainMonthDay:al,PlainDate:Fl,PlainTime:xl,PlainDateTime:kl,ZonedDateTime:Uc,Instant:Zc,Duration:Wl,Now:Yl})}),G=t||Xl;t&&Date.prototype.toTemporalInstant;function Zl(){return G.Now.plainDateISO()}function K(e){if(!e)return null;try{return G.PlainDate.from(e)}catch{return null}}function Ql(e){let t=K(e);return t?t.toLocaleString(void 0,{year:`numeric`,month:`short`,day:`numeric`}):``}function $l(e,t=Zl()){let n=K(e);if(!n)return null;let r=t.until(n,{largestUnit:`day`}).days;return r<0?{text:`已逾期 ${-r} 天`,tone:`overdue`}:r===0?{text:`今天`,tone:`today`}:r===1?{text:`明天`,tone:`today`}:r<=6?{text:`${r} 天后`,tone:`soon`}:null}function eu(e,t){let n=K(e),r=K(t);if(!n||!r)return null;let i=n.until(r,{largestUnit:`day`}).days;return{text:i>0?`晚 ${i} 天`:`按时完成`,tone:`outcome`}}const tu={projectsFolder:`04.项目`,defaultView:`table`,ganttGranularity:`week`,ganttWeekLabel:`weekNumber`,stages:[{id:`wait`,label:`未开始`,color:`#8a94a0`,icon:``},{id:`planned`,label:`已计划`,color:`#7d8fa6`,icon:``},{id:`projected`,label:`研发立项`,color:`#6f86a6`,icon:``},{id:`design`,label:`设计`,color:`#9a7fb8`,icon:``},{id:`ui`,label:`界面`,color:`#9a7fb8`,icon:``},{id:`designing`,label:`设计中`,color:`#9a7fb8`,icon:``},{id:`designed`,label:`设计完成`,color:`#9175ae`,icon:``},{id:`devel`,label:`开发`,color:`#8b72be`,icon:``},{id:`developing`,label:`研发中`,color:`#8b72be`,icon:``},{id:`developed`,label:`研发完毕`,color:`#6f8fbd`,icon:``},{id:`test`,label:`测试`,color:`#b89b62`,icon:``},{id:`testing`,label:`测试中`,color:`#b89b62`,icon:``},{id:`tested`,label:`测试完毕`,color:`#a68f62`,icon:``},{id:`verifying`,label:`验收中`,color:`#79a8b5`,icon:``},{id:`verified`,label:`已验收`,color:`#79b58d`,icon:``},{id:`verifyfailed`,label:`验收失败`,color:`#c47070`,icon:``},{id:`released`,label:`已发布`,color:`#5fa879`,icon:``},{id:`delivering`,label:`交付中`,color:`#7898b8`,icon:``},{id:`delivered`,label:`已交付`,color:`#79b58d`,icon:``},{id:`closed`,label:`已关闭`,color:`#767491`,icon:``},{id:`request`,label:`需求`,color:`#718ca8`,icon:``},{id:`study`,label:`研究`,color:`#7f8fa6`,icon:``},{id:`discuss`,label:`讨论`,color:`#8f7fa6`,icon:``},{id:`affair`,label:`事务`,color:`#8a94a0`,icon:``},{id:`misc`,label:`其他`,color:`#8a94a0`,icon:``},{id:`sprint`,label:`迭代`,color:`#8b72be`,icon:``},{id:`execution`,label:`迭代`,color:`#8b72be`,icon:``},{id:`local-management`,label:`项目管理`,color:`#718ca8`,icon:``},{id:`release-preparation`,label:`上线准备`,color:`#b89b62`,icon:``}],statuses:[{id:`draft`,label:`草稿`,color:`#8a94a0`,icon:``,complete:!1},{id:`reviewing`,label:`评审中`,color:`#b8a06b`,icon:``,complete:!1},{id:`active`,label:`激活`,color:`#8b72be`,icon:``,complete:!1},{id:`changing`,label:`变更中`,color:`#b8a06b`,icon:``,complete:!1},{id:`changed`,label:`已变更`,color:`#b8a06b`,icon:``,complete:!1},{id:`wait`,label:`未开始`,color:`#8a94a0`,icon:``,complete:!1},{id:`doing`,label:`进行中`,color:`#8b72be`,icon:``,complete:!1},{id:`pause`,label:`已暂停`,color:`#c47070`,icon:``,complete:!1},{id:`paused`,label:`已暂停`,color:`#c47070`,icon:``,complete:!1},{id:`suspended`,label:`已挂起`,color:`#c47070`,icon:``,complete:!1},{id:`done`,label:`已完成`,color:`#79b58d`,icon:``,complete:!0},{id:`closed`,label:`已关闭`,color:`#647c6e`,icon:``,complete:!0},{id:`cancel`,label:`已取消`,color:`#767491`,icon:``,complete:!0},{id:`cancelled`,label:`已取消`,color:`#767491`,icon:``,complete:!0},{id:`todo`,label:`待处理`,color:`#8a94a0`,icon:``,complete:!1},{id:`in-progress`,label:`进行中`,color:`#8b72be`,icon:``,complete:!1},{id:`blocked`,label:`已阻塞`,color:`#c47070`,icon:``,complete:!1},{id:`review`,label:`待评审`,color:`#b8a06b`,icon:``,complete:!1}],priorities:[{id:`critical`,label:`紧急`,color:`#c47070`,icon:``},{id:`high`,label:`高`,color:`#b8a06b`,icon:``},{id:`medium`,label:`中`,color:`#8a94a0`,icon:``},{id:`low`,label:`低`,color:`#79b58d`,icon:``}],globalTeamMembers:[],kanbanShowSubtasks:!1,kanbanShowDescriptionPreview:!1,showTagColors:!0,notificationsEnabled:!0,notificationLeadDays:2,autoSchedule:!0,pullForwardOnEarlyFinish:!1,saveTaskOnClose:!0,projectFilters:{},collapsedTasks:{},tableColumnWidths:{}};function nu(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36)}function ru(e={}){let t=new Date().toISOString();return{id:nu(),title:`新任务`,description:``,type:`task`,stage:`local-management`,status:`todo`,priority:`medium`,start:Zl().toString(),due:``,progress:0,completed:``,assignees:[],tags:[],subtasks:[],dependencies:[],customFields:{},collapsed:!1,createdAt:t,updatedAt:t,...e}}function iu(e,t){let n=new Date().toISOString();return{id:nu(),title:e,description:``,color:`#8b72be`,icon:`📋`,tasks:[],customFields:[],teamMembers:[],createdAt:n,updatedAt:n,filePath:t,savedViews:[],taskIndex:new Map}}function au(){return{text:``,stages:[],statuses:[],priorities:[],assignees:[],participants:[],tags:[],dueDateFilter:`any`,showArchived:!1,quickSource:`all`,quickWorkType:`all`,quickCompletion:`all`,quickOwnership:`all`,quickAttention:[],quickOwner:``,quickPreset:``}}function q(e,t=0,n=null,r=!1){let i=[];for(let a of e){let e=!r;i.push({task:a,depth:t,parentId:n,visible:e}),a.subtasks.length>0&&i.push(...q(a.subtasks,t+1,a.id,r||a.collapsed))}return i}function ou(e,t){for(let n of e){if(n.id===t)return n;let e=ou(n.subtasks,t);if(e)return e}return null}function su(e,t,n){for(let r of e){if(r.id===t)return Object.assign(r,n,{updatedAt:new Date().toISOString()}),!0;if(su(r.subtasks,t,n))return!0}return!1}function cu(e,t){for(let n=0;n<e.length;n++){if(e[n].id===t)return e.splice(n,1),!0;if(cu(e[n].subtasks,t))return!0}return!1}function lu(e,t,n){if(!n){e.push(t);return}let r=ou(e,n);r?r.subtasks.push(t):e.push(t)}function uu(e,t){let n=new Map,r=du(e,t,n);return t&&fu(r,n),r}function du(e,t,n){let r=new Date().toISOString(),i=nu();return n.set(e.id,i),{...e,id:i,filePath:void 0,createdAt:r,updatedAt:r,collapsed:!1,subtasks:t?e.subtasks.map(e=>du(e,!0,n)):[],dependencies:[...e.dependencies],assignees:[...e.assignees],tags:[...e.tags],customFields:{...e.customFields},timeLogs:e.timeLogs?e.timeLogs.map(e=>({...e})):void 0,recurrence:e.recurrence?{...e.recurrence}:void 0}}function fu(e,t){e.dependencies=e.dependencies.map(e=>t.get(e)??e);for(let n of e.subtasks)fu(n,t)}function pu(e,t,n,r){let i=e.findIndex(e=>e.id===t),a=e.findIndex(e=>e.id===n);if(i!==-1&&a!==-1){let[t]=e.splice(i,1),a=e.findIndex(e=>e.id===n);return e.splice(r===`before`?a:a+1,0,t),!0}for(let i of e)if(pu(i.subtasks,t,n,r))return!0;return!1}function mu(e,t){let n=new Set;if(t)for(let e of t)n.add(e);let r=e=>{for(let t of e){for(let e of t.assignees)n.add(e);r(t.subtasks)}};return r(e),[...n].filter(Boolean).sort()}function hu(e){let t=new Set,n=e=>{for(let r of e){for(let e of r.tags)t.add(e);n(r.subtasks)}};return n(e),[...t].filter(Boolean).sort()}function projectSyncedHours(e,t){let n=e.customFields?.[t];if(n===void 0||n===null||n===``)return null;n=Number(n);return Number.isFinite(n)&&n>=0?n:null}function projectEstimateHours(e){return projectSyncedHours(e,`displayEstimatedHours`)??projectSyncedHours(e,`estimatedHours`)??e.timeEstimate??0}function gu(e){return projectSyncedHours(e,`displayConsumedHours`)??projectSyncedHours(e,`consumedHours`)??(e.timeLogs?.length?e.timeLogs.reduce((e,t)=>e+t.hours,0):0)}function _u(e){let t=new Map,n=(e,r)=>{for(let i of e)t.set(i.id,{task:i,parentId:r}),i.subtasks.length&&n(i.subtasks,i.id)};return n(e,null),t}function vu(e){e.taskIndex=_u(e.tasks)}function J(e,t){return e.taskIndex.get(t)?.task??null}function yu(e,t){return e.taskIndex.get(t)?.parentId??null}function bu(e,t,n){e.taskIndex.set(t.id,{task:t,parentId:n});for(let n of t.subtasks)bu(e,n,t.id)}function xu(e,t){e.taskIndex.delete(t.id);for(let n of t.subtasks)xu(e,n)}function Su(e,t,n){let r=e.taskIndex.get(t);r&&(r.parentId=n)}async function Cu(t,n,r){let i=(0,e.normalizePath)(n.replace(/\.md$/,``)),a=(0,e.normalizePath)(r.replace(/\.md$/,``));if(i===a)return null;let o=t.vault.getAbstractFileByPath(i);return!(o instanceof e.TFolder)||t.vault.getAbstractFileByPath(a)?null:(await t.vault.rename(o,a),{from:i,to:a})}async function wu(t,n){let r=(0,e.normalizePath)(n);if(!(t.vault.getAbstractFileByPath(r)instanceof e.TFolder))try{await t.vault.createFolder(r)}catch(e){if(!Tu(e))throw e}}function Tu(e){let t=e instanceof Error?e.message:String(e);return/already exists/i.test(t)}function Eu(e){return/\/00\.[^/]+\.md$/.test(e.filePath)?e.filePath.replace(/\/00\.[^/]+\.md$/,`/01.需求与任务`):e.filePath.replace(/\.md$/,`_tasks`)}function Du(e){return[e,...e.subtasks.flatMap(Du)]}async function Ou(t,n,r,i){if(!n.filePath)return!1;let a=n.filePath.split(`/`).pop();if(!a)return!1;let o=(0,e.normalizePath)(r+`/`+a);if(o===n.filePath)return!0;let s=t.vault.getAbstractFileByPath(n.filePath);if(!(s instanceof e.TFile))return!1;let c=n.filePath;return i(c),i(o),i(c.replace(/\.md$/,``)),i(o.replace(/\.md$/,``)),await t.vault.rename(s,o),await Cu(t,c,o),n.filePath=o,!0}async function ku(t,n,r,i){let a=J(n,r);if(!a)return;let o=(0,e.normalizePath)(Eu(n)+`/Archive`);await wu(t,o);for(let e of Du(a))await Ou(t,e,o,i)&&(e.archived=!0)}async function Au(t,n,r,i){let a=J(n,r);if(!a)return;let o=(0,e.normalizePath)(Eu(n));for(let e of Du(a))await Ou(t,e,o,i)&&(e.archived=!1)}const ju=`#8a94a0`;function Mu(e,t){let n=e.config;return{stages:Nu(n?.stages?.length?n.stages:t.stages,t.stages,e,e=>e.stage,e=>({id:e,label:e||`未设置`,color:ju,icon:``})),statuses:Nu(n?.statuses?.length?n.statuses:t.statuses,t.statuses,e,e=>e.status,e=>({id:e,label:e,color:ju,icon:``,complete:!1})),priorities:Nu(n?.priorities?.length?n.priorities:t.priorities,t.priorities,e,e=>e.priority,e=>({id:e,label:e,color:ju,icon:``})),defaultView:n?.defaultView??t.defaultView,autoSchedule:n?.autoSchedule??t.autoSchedule,pullForwardOnEarlyFinish:n?.pullForwardOnEarlyFinish??t.pullForwardOnEarlyFinish,kanbanShowSubtasks:n?.kanbanShowSubtasks??t.kanbanShowSubtasks,kanbanShowDescriptionPreview:n?.kanbanShowDescriptionPreview??t.kanbanShowDescriptionPreview}}function Nu(e,t,n,r,i){let a=new Set(e.map(e=>e.id)),o=null;for(let{task:e}of q(n.tasks)){let n=r(e);a.has(n)||(a.add(n),o??=[],o.push(t.find(e=>e.id===n)??i(n)))}return o?[...e,...o]:e}function Pu(e,t){return G.PlainDate.from(t).since(G.PlainDate.from(e),{largestUnit:`days`}).days}function Fu(e,t){return G.PlainDate.from(e).add({days:t}).toString()}function Iu(e,t,n){let r=q(e).map(e=>e.task),i=new Map;for(let e of r)for(let t of e.dependencies){let n=i.get(t)??[];n.push(e.id),i.set(t,n)}let a=new Set,o=[t];for(;o.length>0;){let e=o.shift();if(e===void 0)break;if(e===n)return!0;if(!a.has(e)){a.add(e);for(let t of i.get(e)??[])o.push(t)}}return!1}function Lu(e,t,n=[],r=!1){let i=q(e).map(e=>e.task),a=new Map,o=new Map,s=new Map;for(let e of i)a.set(e.id,e);for(let e of i){let t=[];for(let n of e.dependencies){if(!a.has(n))continue;t.push(n);let r=o.get(n)??[];r.push(e.id),o.set(n,r)}s.set(e.id,t)}let c=null;if(t){c=new Set;let e=[t];for(;e.length>0;){let t=e.shift();if(t===void 0)break;if(!c.has(t)){c.add(t);for(let n of o.get(t)??[])e.push(n)}}}let l=new Map,u=c?[...c]:i.map(e=>e.id),d=c;for(let e of u){let t=s.get(e)??[],n=d?t.filter(e=>d.has(e)):t;l.set(e,n.length)}let f=[];for(let[e,t]of l)t===0&&f.push(e);let p=[];for(;f.length>0;){let e=f.shift();if(e===void 0)break;p.push(e);for(let t of o.get(e)??[]){let e=l.get(t);if(e===void 0)continue;let n=e-1;l.set(t,n),n===0&&f.push(t)}}let m=new Set(p),h=u.filter(e=>!m.has(e)),g=h.length>0?[h]:[],_=new Map,v=new Map,y=new Map;for(let e of i)_.set(e.id,e.start),v.set(e.id,e.due),!(!r||!e.completed||!e.due||e.completed>=e.due)&&(v.set(e.id,e.completed),y.set(e.id,Pu(e.completed,e.due)));let b=[];for(let e of p){let t=a.get(e);if(!t||t.completed)continue;let n=s.get(e)??[];if(n.length===0)continue;let r=``,i=``;for(let e of n){if(a.get(e)?.archived)continue;let t=v.get(e)??``;if(!t)continue;(!r||t>r)&&(r=t);let n=Fu(t,y.get(e)??0);(!i||n>i)&&(i=n)}if(!r)continue;let o=Fu(r,1),c=Pu(r,i),l=_.get(e)??``,u=v.get(e)??``,d=e=>Math.min(c,Math.max(0,Pu(o,e))),f=l,p=u,m=0;if(t.type===`milestone`||!l&&u)!u||u<o?p=o:c>0&&(m=d(u),p=Fu(u,-m));else if(l&&u){if(l<o){let e=Pu(l,u)+1;f=o,p=Fu(o,e-1)}else c>0&&(m=d(l),f=Fu(l,-m),p=Fu(u,-m))}else l&&!u?l<o?f=o:c>0&&(m=d(l),f=Fu(l,-m)):f=o;(f!==l||p!==u)&&(_.set(e,f),v.set(e,p),m>0&&y.set(e,m),b.push({taskId:e,start:f,due:p}))}return{patches:b,cycles:g}}function Ru(t){if(!t.startsWith(`---`))return{frontmatter:null,body:t};let n=t.indexOf(`
---`,4);if(n===-1)return{frontmatter:null,body:t};let r=t.slice(4,n),i=t.slice(n+4).trim();try{return{frontmatter:(0,e.parseYaml)(r),body:i}}catch{return{frontmatter:null,body:t}}}function zu(e){let t=e;return t=t.replace(/^Project: \[\[.*\]\]$/gm,``),t=t.replace(/^Parent: \[\[.*\]\]$/gm,``),t=t.replace(/\n## Subtasks[\s\S]*$/,``),t.trim()}function Bu(e,t,n){let r=`  `.repeat(n);for(let[i,a]of Object.entries(t))if(a==null)e.push(`${r}${i}:`);else if(typeof a==`boolean`)e.push(`${r}${i}: ${a}`);else if(typeof a==`number`)e.push(`${r}${i}: ${a}`);else if(typeof a==`string`){let t=a.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`);e.push(`${r}${i}: "${t}"`)}else if(Array.isArray(a)){if(a.length===0)e.push(`${r}${i}: []`);else if(typeof a[0]==`object`){e.push(`${r}${i}:`);for(let t of a){let n=Object.entries(t);if(n.length===0)continue;let[i,a]=n[0];e.push(`${r}  - ${i}: ${JSON.stringify(a)}`);for(let[t,i]of n.slice(1))e.push(`${r}    ${t}: ${JSON.stringify(i)}`)}}else{let t=a.map(e=>JSON.stringify(e)).join(`, `);e.push(`${r}${i}: [${t}]`)}}else typeof a==`object`&&(Object.keys(a).length===0?e.push(`${r}${i}: {}`):(e.push(`${r}${i}:`),Bu(e,a,n+1)))}function Vu(e){return Array.isArray(e.tasks)&&e.tasks.length>0&&!Array.isArray(e.taskIds)}function Hu(e){return Array.isArray(e)?e.filter(e=>e&&typeof e==`object`).map(e=>{let t=e,n=t.filter??{},r=t.viewMode,i=r===`table`||r===`gantt`||r===`kanban`?r:void 0;return{id:t.id??``,name:t.name??`Untitled`,filter:{text:n.text??``,stages:Array.isArray(n.stages)?n.stages:[],statuses:Array.isArray(n.statuses)?n.statuses:[],priorities:Array.isArray(n.priorities)?n.priorities:[],assignees:Array.isArray(n.assignees)?n.assignees:[],participants:Array.isArray(n.participants)?n.participants:[],tags:Array.isArray(n.tags)?n.tags:[],dueDateFilter:n.dueDateFilter??`any`,showArchived:n.showArchived??!1,quickSource:n.quickSource??`all`,quickWorkType:n.quickWorkType??`all`,quickCompletion:n.quickCompletion??`all`,quickOwnership:n.quickOwnership??`all`,quickAttention:Array.isArray(n.quickAttention)?n.quickAttention:[],quickOwner:n.quickOwner??``,quickPreset:n.quickPreset??``},sortKey:t.sortKey??`stage`,sortDir:t.sortDir??`asc`,groupBy:t.groupBy===`status`?`status`:`stage`,...i?{viewMode:i}:{}}}):[]}function Uu(e,t){return ru({id:e.id,title:e.title??`未命名事项`,description:e.description??``,type:e.type===`milestone`?`milestone`:e.type===`subtask`?`subtask`:`task`,stage:e.stage??``,status:e.status??`todo`,priority:e.priority??`medium`,start:e.start??``,due:e.due??``,progress:typeof e.progress==`number`?e.progress:0,completed:e.completed??``,assignees:Array.isArray(e.assignees)?[...e.assignees]:[],tags:Array.isArray(e.tags)?[...e.tags]:[],subtasks:[],dependencies:Array.isArray(e.dependencies)?[...e.dependencies]:[],recurrence:e.recurrence&&typeof e.recurrence==`object`?{...e.recurrence}:void 0,timeEstimate:typeof e.timeEstimate==`number`?e.timeEstimate:void 0,timeLogs:Array.isArray(e.timeLogs)?e.timeLogs.map(e=>({...e})):void 0,customFields:typeof e.customFields==`object`&&e.customFields!==null?{...e.customFields}:{},collapsed:e.collapsed===!0,createdAt:e.createdAt??new Date().toISOString(),updatedAt:e.updatedAt??new Date().toISOString(),...t})}function Wu(e){return Array.isArray(e)?e.map(e=>{let t=e;return Uu(t,{subtasks:Array.isArray(t.subtasks)?Wu(t.subtasks):[]})}):[]}function Gu(e,t,n){return{task:Uu(e,{description:zu(t),filePath:n}),subtaskIds:Array.isArray(e.subtaskIds)?e.subtaskIds:[],parentId:typeof e.parentId==`string`&&e.parentId?e.parentId:null}}function Ku(e,t,n,r){let i=e.description??t.trim(),a=e.status??(typeof i==`string`?i.match(/禅道状态：([^。\n]+)/)?.[1]:void 0)??``;return{id:e.id??r,title:e.title??r,description:i,color:e.color??`#8b72be`,icon:e.icon??`📋`,status:a,tasks:[],customFields:Array.isArray(e.customFields)?[...e.customFields]:[],teamMembers:Array.isArray(e.teamMembers)?[...e.teamMembers]:[],createdAt:e.createdAt??new Date().toISOString(),updatedAt:e.updatedAt??new Date().toISOString(),filePath:n,savedViews:Hu(e.savedViews??[]),config:qu(e.config),taskIndex:new Map}}function qu(e){if(!e||typeof e!=`object`||Array.isArray(e))return;let t=e,n={},r=Ju(t.stages);r&&(n.stages=r);let i=Yu(t.statuses);i&&(n.statuses=i);let a=Xu(t.priorities);return a&&(n.priorities=a),(t.defaultView===`table`||t.defaultView===`gantt`||t.defaultView===`kanban`)&&(n.defaultView=t.defaultView),typeof t.autoSchedule==`boolean`&&(n.autoSchedule=t.autoSchedule),typeof t.pullForwardOnEarlyFinish==`boolean`&&(n.pullForwardOnEarlyFinish=t.pullForwardOnEarlyFinish),typeof t.kanbanShowSubtasks==`boolean`&&(n.kanbanShowSubtasks=t.kanbanShowSubtasks),typeof t.kanbanShowDescriptionPreview==`boolean`&&(n.kanbanShowDescriptionPreview=t.kanbanShowDescriptionPreview),Object.keys(n).length?n:void 0}function Ju(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n;typeof e.id!=`string`||!e.id||t.push({id:e.id,label:typeof e.label==`string`?e.label:e.id,color:typeof e.color==`string`?e.color:`#8a94a0`,icon:typeof e.icon==`string`?e.icon:``})}return t.length?t:void 0}function Yu(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n;typeof e.id!=`string`||!e.id||t.push({id:e.id,label:typeof e.label==`string`?e.label:e.id,color:typeof e.color==`string`?e.color:`#8a94a0`,icon:typeof e.icon==`string`?e.icon:``,complete:e.complete===!0})}return t.length?t:void 0}function Xu(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n;typeof e.id!=`string`||!e.id||t.push({id:e.id,label:typeof e.label==`string`?e.label:e.id,color:typeof e.color==`string`?e.color:`#8a94a0`,icon:typeof e.icon==`string`?e.icon:``})}return t.length?t:void 0}function Zu(e){let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return`hsl(${Math.abs(t)%360}, 55%, 45%)`}function Qu(e){return e?new Date(e).toLocaleDateString(void 0,{month:`short`,day:`numeric`}):``}function $u(e){return e?new Date(e).toLocaleDateString(void 0,{month:`short`,day:`numeric`,year:`2-digit`}):``}function ed(e){return e.some(e=>e.id===`todo`)?`todo`:e.length>0?e[0].id:`todo`}function td(e){return e.some(e=>e.id===`medium`)?`medium`:e.length>0?e[Math.floor(e.length/2)].id:`medium`}function nd(e,t){let n=t.findIndex(t=>t.id===e);return n>=0?n:999}function rd(e,t){let n=K(e.due);if(!n||e.completed)return`normal`;let r=Zl().until(n,{largestUnit:`day`}).days;return r<0?`overdue`:r<3?`near`:`normal`}function id(e){return e==null?``:typeof e==`string`?e:typeof e==`number`||typeof e==`boolean`?String(e):Array.isArray(e)?e.map(e=>String(e)).join(`, `):``}function ad(e,t=20){return e.length<=t?e:e.slice(0,t-1)+`…`}function od(e){return e.replace(/[\\/:*?"<>|]/g,`-`)}function sd(e,t){return e.find(e=>e.id===t)}function cd(e,t){return e.find(e=>e.id===t)}function ld(e,t){let n=t.findIndex(t=>t.id===e);return n>=0?n:999}function ud(e,t){return e.find(e=>e.id===t)}const dd=new Map;function fd(t){let n=dd.get(t);if(n===void 0){let r=createSpan();(0,e.setIcon)(r,t),n=r.childElementCount>0,dd.set(t,n)}return n}function pd(e,t){return e&&fd(e)?t:[e,t].filter(Boolean).join(` `)}function Y(t){return(...n)=>{(async()=>{try{await t(...n)}catch(t){console.error(`[PM]`,t),new e.Notice(`操作失败，请查看控制台了解详情。`)}})()}}function X(e,t){let n=activeDocument.createElementNS(`http://www.w3.org/2000/svg`,e);if(t)for(let[e,r]of Object.entries(t))n.setAttribute(e,String(r));return n}function md(e){if(!e)return null;let t={};return e.stages?.length&&(t.stages=e.stages),e.statuses?.length&&(t.statuses=e.statuses),e.priorities?.length&&(t.priorities=e.priorities),e.defaultView&&(t.defaultView=e.defaultView),e.autoSchedule!==void 0&&(t.autoSchedule=e.autoSchedule),e.pullForwardOnEarlyFinish!==void 0&&(t.pullForwardOnEarlyFinish=e.pullForwardOnEarlyFinish),e.kanbanShowSubtasks!==void 0&&(t.kanbanShowSubtasks=e.kanbanShowSubtasks),e.kanbanShowDescriptionPreview!==void 0&&(t.kanbanShowDescriptionPreview=e.kanbanShowDescriptionPreview),Object.keys(t).length?t:null}function hd(e,t=[]){let n=new Set,r=[];for(let t of e.tasks)n.has(t.id)||(n.add(t.id),r.push(t));let i=r.map(e=>e.id),a={"pm-project":!0,id:e.id,title:e.title,description:e.description,color:e.color,icon:e.icon,status:e.status,taskIds:i,customFields:e.customFields,teamMembers:e.teamMembers,savedViews:e.savedViews.length?e.savedViews:[],createdAt:e.createdAt,updatedAt:e.updatedAt},o=md(e.config);o&&(a.config=o);let s=[`---`];if(Bu(s,a,0),s.push(`---`),s.push(``),s.push(`# ${e.icon} ${e.title}`),s.push(``),e.description&&(s.push(e.description),s.push(``)),r.length){s.push(`## Tasks`);for(let e of r)if(e.filePath){let t=e.filePath.replace(/^.*\//,``).replace(/\.md$/,``),n=e.completed?`x`:` `;s.push(`- [${n}] [[${t}|${e.title}]]`)}s.push(``)}return s.join(`
`)}function gd(e,t,n){let r={"pm-task":!0,projectId:t.id,parentId:n?.id??null,id:e.id,title:e.title,type:e.type,stage:e.stage,status:e.status,priority:e.priority,start:e.start,due:e.due,progress:e.progress,assignees:e.assignees,tags:e.tags,subtaskIds:e.subtasks.map(e=>e.id),dependencies:e.dependencies,createdAt:e.createdAt,updatedAt:e.updatedAt};return e.completed&&(r.completed=e.completed),e.recurrence&&(r.recurrence=e.recurrence),e.timeEstimate!==void 0&&(r.timeEstimate=e.timeEstimate),e.timeLogs?.length&&(r.timeLogs=e.timeLogs),Object.keys(e.customFields).length&&(r.customFields=e.customFields),r}function _d(e,t,n,r=[]){let i=gd(e,t,n),a=[`---`];Bu(a,i,0),a.push(`---`),a.push(``);let o=zu(e.description);if(o&&(a.push(o),a.push(``)),n?.filePath){let e=n.filePath.replace(/^.*\//,``).replace(/\.md$/,``);a.push(`Parent: [[${e}|${n.title}]]`)}else{let e=t.filePath.replace(/^.*\//,``).replace(/\.md$/,``);a.push(`Project: [[${e}|${t.title}]]`)}if(e.subtasks.length){a.push(``),a.push(`## Subtasks`);for(let t of e.subtasks){let e=t.filePath?t.filePath.replace(/^.*\//,``).replace(/\.md$/,``):vd(t.title),n=t.completed?`x`:` `;a.push(`- [${n}] [[${e}|${t.title}]]`)}}return a.join(`
`)}function vd(e){return od(e).toLowerCase().replace(/\s+/g,`-`).slice(0,60)}function yd(e,t){return`${t}/${vd(e)}.md`}function bd(e){return e.description!==void 0||e.archived!==void 0||e.subtasks!==void 0}function xd(e,t,n){let r=yd(e.title,t);if(!n)return r;let i=r.slice(r.lastIndexOf(`/`)+1).replace(/\.md$/,``),a=n.slice(0,n.lastIndexOf(`/`)),o=n.slice(n.lastIndexOf(`/`)+1).replace(/\.md$/,``);return a===t&&(o===`${i}-${e.id.slice(0,8)}`||o.length===40&&o===i.slice(0,40))?n:r}var Sd=class extends Error{path;constructor(e){super(`A note named "${Cd(e)}" already exists.`),this.path=e,this.name=`TaskFileNameConflictError`}get fileName(){return Cd(this.path)}};function Cd(e){return e.slice(e.lastIndexOf(`/`)+1).replace(/\.md$/,``)}function wd(e){return/\/00\.[^/]+\.md$/.test(e)?e.replace(/\/00\.[^/]+\.md$/,`/01.需求与任务`):e.replace(/\.md$/,`_tasks`)}var Td=class t{app;getSettings;saveQueues=new Map;dirtyTasks=new Map;hydratedBodies=new WeakSet;projectCache=new Map;changeHandlers=new Set;reloadTimers=new Map;static RELOAD_DEBOUNCE_MS=300;selfWrites=new Map;static SELF_WRITE_WINDOW_MS=5e3;constructor(e,t=()=>tu){this.app=e,this.getSettings=t}configFor(e){return Mu(e,this.getSettings())}statusesFor(e){return this.configFor(e).statuses}markDirty(e,t,n){let r=this.dirtyTasks.get(e.filePath);r||(r=new Map,this.dirtyTasks.set(e.filePath,r));for(let e of t)r.get(e)!==`full`&&r.set(e,n)}markSubtreeDirty(e,t,n){let r=J(e,t);if(r){this.markDirty(e,[t],n);for(let t of q(r.subtasks))this.markDirty(e,[t.task.id],n)}}markAllDirty(e,t){let n=[];for(let t of q(e.tasks))n.push(t.task.id);this.markDirty(e,n,t)}clearDirty(e){this.dirtyTasks.delete(e.filePath)}markSelfWrite(e){if(this.selfWrites.size>256){let e=Date.now()-t.SELF_WRITE_WINDOW_MS;for(let[t,n]of this.selfWrites)n<e&&this.selfWrites.delete(t)}this.selfWrites.set(e,Date.now())}peekSelfWrite(e){let n=this.selfWrites.get(e);return n!==void 0&&Date.now()-n<t.SELF_WRITE_WINDOW_MS}onProjectChanged(e){return this.changeHandlers.add(e),()=>this.changeHandlers.delete(e)}emitChange(e){for(let t of this.changeHandlers)t(e)}registerVaultSync(e){let t=e=>this.syncPath(e.path);e.registerEvent(this.app.vault.on(`create`,t)),e.registerEvent(this.app.vault.on(`modify`,t)),e.registerEvent(this.app.vault.on(`delete`,t)),e.registerEvent(this.app.vault.on(`rename`,(e,t)=>{this.syncPath(e.path),this.syncPath(t)})),e.register(()=>{for(let e of this.reloadTimers.values())window.clearTimeout(e);this.reloadTimers.clear()})}syncPath(e){if(this.projectCache.size!==0&&!this.peekSelfWrite(e)){for(let n of this.projectCache.keys())if(e===n||e.startsWith(wd(n)+`/`)){let e=this.reloadTimers.get(n);e!==void 0&&window.clearTimeout(e),this.reloadTimers.set(n,window.setTimeout(()=>{this.reloadTimers.delete(n),this.reloadProject(n)},t.RELOAD_DEBOUNCE_MS))}}}async reloadProject(t){let n=await this.projectCache.get(t);n&&await this.queue(t,async()=>{let r=this.app.vault.getAbstractFileByPath(t);if(!(r instanceof e.TFile)){this.projectCache.delete(t),this.emitChange(t);return}let i=await this.readProject(r);i&&(this.adopt(n,i),this.emitChange(t))})}adopt(e,t){let{taskIndex:n,...r}=t;Object.assign(e,r),vu(e),this.hydratedBodies.has(t)?this.hydratedBodies.add(e):this.hydratedBodies.delete(e)}queue(e,t){let n=this.saveQueues.get(e)??Promise.resolve(),r=(async()=>(await n,t()))();return this.saveQueues.set(e,(async()=>{try{await r}catch{}})()),r}async ensureFolder(e){await wu(this.app,e)}projectTaskFolder(e){return wd(e.filePath)}async loadAllProjects(t){await this.ensureFolder(t);let n=this.app.vault.getAbstractFileByPath(t),r=[],i=t=>{for(let n of t.children)n instanceof e.TFile&&n.extension===`md`?r.push(n):n instanceof e.TFolder&&i(n)};return n instanceof e.TFolder&&i(n),(await Promise.all(r.map(e=>this.loadProject(e)))).filter(e=>e!==null).sort((e,t)=>e.title.localeCompare(t.title))}async loadProject(e){let t=this.projectCache.get(e.path);if(t)return t;let n=this.readProject(e);this.projectCache.set(e.path,n);let r=await n;return r||this.projectCache.delete(e.path),r}async readProject(t){try{let e=this.app.metadataCache.getFileCache(t)?.frontmatter,n=e&&e[`pm-project`]===!0&&!Array.isArray(e.tasks)&&Array.isArray(e.taskIds),r=null,i=``,a=!1;if(n)r=e;else{let e=Ru(await this.app.vault.cachedRead(t));r=e.frontmatter,i=e.body,a=!0}if(!r||r[`pm-project`]!==!0)return null;let o=Array.isArray(r.tasks)&&r.tasks.length>0,s=Ku(r,i,t.path,t.basename);if(a&&this.hydratedBodies.add(s),o)s.tasks=Wu(r.tasks??[]),vu(s),this.markAllDirty(s,`full`);else{let e=this.projectTaskFolder(s),t=Array.isArray(r.taskIds)?r.taskIds:[];s.tasks=await this.loadTasksFromFolder(e,t),vu(s),this.clearDirty(s)}return s}catch(n){return console.error(`[PM] Failed to load project ${t.path}:`,n),new e.Notice(`Project Manager: Failed to load "${t.basename}". Check console for details.`),null}}async loadTasksFromFolder(t,n){let r=this.app.vault.getAbstractFileByPath(t);if(!(r instanceof e.TFolder))return[];let i=new Map,a=new Map,o=new Map,s=(0,e.normalizePath)(t+`/Archive`)+`/`,c=[],l=t=>{for(let n of t.children)n instanceof e.TFile&&n.extension===`md`?c.push(n):n instanceof e.TFolder&&l(n)};l(r);let u=await Promise.all(c.map(e=>this.loadTaskFile(e)));for(let e=0;e<c.length;e++){let{task:t,subtaskIds:n,parentId:r}=u[e];t&&(c[e].path.startsWith(s)&&(t.archived=!0),i.set(t.id,t),n.length&&a.set(t.id,n),r&&o.set(t.id,r))}for(let[e,t]of a){let n=i.get(e);if(n){n.subtasks=[];for(let e of t){let t=i.get(e);t&&n.subtasks.push(t)}}}let d=new Set;for(let e of i.values())for(let t of e.subtasks)d.add(t.id);for(let[e,t]of o){if(d.has(e))continue;let n=i.get(t);if(!n)continue;let r=i.get(e);if(!r)continue;n.subtasks.push(r),d.add(e),a.has(t)||a.set(t,[]);let o=a.get(t);o&&!o.includes(e)&&o.push(e),console.warn(`[PM] Self-healed orphan: re-parented task "${r.title}" (${e}) under "${n.title}" (${t})`)}let f=[],p=new Set;for(let e of n){if(p.has(e))continue;let t=i.get(e);t&&(f.push(t),p.add(e))}for(let e of i.values())p.has(e.id)||d.has(e.id)||f.push(e);return f}async loadTaskFile(t){try{let e=this.app.metadataCache.getFileCache(t)?.frontmatter;if(e&&e[`pm-task`]===!0)return Gu(e,``,t.path);let{frontmatter:n,body:r}=Ru(await this.app.vault.cachedRead(t));if(!n||n[`pm-task`]!==!0)return{task:null,subtaskIds:[],parentId:null};let i=Gu(n,r,t.path);return this.hydratedBodies.add(i.task),i}catch(n){return n instanceof Error&&n.message.includes(`ENOENT`)?console.warn(`[PM] Task file no longer exists, skipping: ${t.path}`):(console.error(`[PM] Failed to load task ${t.path}:`,n),new e.Notice(`Project Manager: Failed to load task "${t.basename}". Check console for details.`)),{task:null,subtaskIds:[],parentId:null}}}async loadTaskBody(t){if(this.hydratedBodies.has(t))return;if(!t.filePath){this.hydratedBodies.add(t);return}let n=this.app.vault.getAbstractFileByPath(t.filePath);if(!(n instanceof e.TFile)){this.hydratedBodies.add(t);return}let{body:r}=Ru(await this.app.vault.cachedRead(n));t.description=zu(r),this.hydratedBodies.add(t)}async loadProjectBody(t){if(this.hydratedBodies.has(t))return;let n=this.app.vault.getAbstractFileByPath(t.filePath);if(!(n instanceof e.TFile)){this.hydratedBodies.add(t);return}let{frontmatter:r,body:i}=Ru(await this.app.vault.cachedRead(n)),a=r?.description;t.description=typeof a==`string`?a:i.trim(),this.hydratedBodies.add(t)}async saveProject(e){return this.queue(e.filePath,()=>this.doSaveProject(e))}async updateProject(e,t){Object.assign(e,t),t.description!==void 0&&this.hydratedBodies.add(e),await this.saveProject(e)}async doSaveProject(t){let n=this.dirtyTasks.get(t.filePath)??new Map;this.dirtyTasks.delete(t.filePath);try{t.updatedAt=new Date().toISOString();let r=this.projectTaskFolder(t);await this.ensureFolder(r),await this.saveDirtyTasks(t,r,n);let i=this.app.vault.getAbstractFileByPath(t.filePath);if(i instanceof e.TFile)this.markSelfWrite(t.filePath),await this.app.vault.process(i,e=>{if(!this.hydratedBodies.has(t)){let{frontmatter:n,body:r}=Ru(e),i=n?.description;t.description=typeof i==`string`?i:r.trim()}return hd(t,this.statusesFor(t))}),this.hydratedBodies.add(t);else{let e=hd(t,this.statusesFor(t));this.markSelfWrite(t.filePath),await this.app.vault.create(t.filePath,e),this.hydratedBodies.add(t)}this.projectCache.has(t.filePath)||this.projectCache.set(t.filePath,Promise.resolve(t)),this.emitChange(t.filePath)}catch(r){for(let[e,r]of n)this.markDirty(t,[e],r);throw r instanceof Sd?r:(console.error(`[PM] Failed to save project "${t.title}":`,r),new e.Notice(`Project Manager: Failed to save "${t.title}". Check console for details.`),r)}}async saveDirtyTasks(t,n,r){for(let[e,n]of t.taskIndex)!n.task.filePath&&!r.has(e)&&r.set(e,`full`);if(r.size===0)return;let i=[],a=new Set,o=!1;for(let[s,c]of r){let r=t.taskIndex.get(s);if(!r)continue;let{task:l,parentId:u}=r,d=l.archived?(0,e.normalizePath)(n+`/Archive`):n;l.archived&&(o=!0);let f=(0,e.normalizePath)(xd(l,d,l.filePath));if(a.has(f))throw new Sd(f);a.add(f),i.push({task:l,parentTask:u?J(t,u):null,folder:d,kind:c})}o&&await this.ensureFolder((0,e.normalizePath)(n+`/Archive`));let s=[];for(let e=0;e<i.length;e+=16){let n=await Promise.allSettled(i.slice(e,e+16).map(e=>this.saveTaskFile(e.task,t,e.parentTask,e.folder,e.kind)));for(let e of n)e.status===`rejected`&&s.push(e.reason instanceof Error?e.reason:Error(String(e.reason)))}if(s.length)throw s.length===1&&s[0]instanceof Sd?s[0]:Error(`Failed to save ${s.length} task(s): ${s.map(e=>e.message).join(`; `)}`)}async saveTaskFile(t,n,r,i,a){let o=t.filePath,s=(0,e.normalizePath)(xd(t,i,o)),c=o!==void 0&&o!==s;try{if(a===`fm`&&o&&!c){let i=this.app.vault.getAbstractFileByPath(s);if(i instanceof e.TFile){this.markSelfWrite(s);let e=gd(t,n,r);await this.app.fileManager.processFrontMatter(i,t=>{for(let e of Object.keys(t))Reflect.deleteProperty(t,e);Object.assign(t,e)});return}}let i=this.app.vault.getAbstractFileByPath(s);if(i instanceof e.TFile&&i.path!==o)throw new Sd(s);if(i instanceof e.TFile)this.markSelfWrite(s),await this.app.vault.process(i,e=>(this.hydratedBodies.has(t)||(t.description=zu(Ru(e).body)),_d(t,n,r,this.statusesFor(n))));else{if(!this.hydratedBodies.has(t)&&o){let n=this.app.vault.getAbstractFileByPath(o);n instanceof e.TFile&&(t.description=zu(Ru(await this.app.vault.cachedRead(n)).body))}let i=_d(t,n,r,this.statusesFor(n));this.markSelfWrite(s),await this.app.vault.create(s,i)}if(t.filePath=s,this.hydratedBodies.add(t),c&&o){let t=this.app.vault.getAbstractFileByPath(o);t instanceof e.TFile&&(this.markSelfWrite(o),await this.app.fileManager.trashFile(t)),this.markSelfWrite(this.taskFolder(o)),this.markSelfWrite(this.taskFolder(s)),await Cu(this.app,o,s)}}catch(e){throw e instanceof Sd||console.error(`[PM] Failed to save task "${t.title}" (${t.id}):`,e),e}}findTaskFileConflict(t,n){let r=this.projectTaskFolder(t),i=n.archived?(0,e.normalizePath)(r+`/Archive`):r,a=(0,e.normalizePath)(xd(n,i,n.filePath));return a===n.filePath?null:this.app.vault.getAbstractFileByPath(a)instanceof e.TFile?new Sd(a):null}async createProject(t,n){let r=t.replace(/[\\/:*?"<>|]/g,`-`),i=iu(t,(0,e.normalizePath)(`${n}/${r}.md`));return await this.ensureFolder(this.projectTaskFolder(i)),await this.saveProject(i),i}async insertTask(e,t,n=null){this.hydratedBodies.add(t),lu(e.tasks,t,n),bu(e,t,n),this.markDirty(e,[t.id],`full`),n&&this.markDirty(e,[n],`full`),await this.saveProject(e)}async importNoteAsTask(t,n,r){let{frontmatter:i,body:a}=Ru(await this.app.vault.read(n));if(i?.[`pm-task`]===!0)return`skipped`;let o=ru({title:n.basename,description:a,status:r.status,priority:r.priority}),s=this.projectTaskFolder(t);await this.ensureFolder(s);let c=yd(o.title,s),l=_d(o,t,null,this.statusesFor(t));if(r.handling===`move`){await this.app.fileManager.renameFile(n,c);let t=this.app.vault.getAbstractFileByPath(c);t instanceof e.TFile&&await this.app.vault.process(t,()=>l)}else await this.app.vault.create(c,l);return`imported`}async importTaskForest(t,n,r,i){let a=this.projectTaskFolder(t);await this.ensureFolder(a);let o=0,s=async(n,c)=>{let l=n.archived?(0,e.normalizePath)(a+`/Archive`):a;n.archived&&await this.ensureFolder(l);let u=r.get(n.id);if(u){let{body:e}=Ru(await this.app.vault.read(u));n.description=e}let d=yd(n.title,l),f=this.uniqueChildPath(l,d.slice(d.lastIndexOf(`/`)+1)),p=_d(n,t,c,this.statusesFor(t));if(i===`move`&&u){await this.app.fileManager.renameFile(u,f);let t=this.app.vault.getAbstractFileByPath(f);t instanceof e.TFile&&await this.app.vault.process(t,()=>p)}else await this.app.vault.create(f,p);o++;for(let e of n.subtasks)await s(e,n)};for(let e of n)await s(e,null);return o}async duplicateTask(t,n,r){let i=J(t,n);if(!i)return null;let a=uu(i,r),o=this.projectTaskFolder(t),s=new Set,c=new Set(q(t.tasks).map(e=>e.task.title)),l=t=>{let n=t.archived?(0,e.normalizePath)(o+`/Archive`):o;this.assignCopyName(t,n,c,s)};l(a),this.hydratedBodies.add(a);for(let e of q(a.subtasks))l(e.task),this.hydratedBodies.add(e.task);let u=yu(t,n);return lu(t.tasks,a,u),pu(t.tasks,a.id,n,`after`),bu(t,a,u),this.markSubtreeDirty(t,a.id,`full`),u&&this.markDirty(t,[u],`full`),await this.saveProject(t),a}assignCopyName(t,n,r,i){let a=t.title.replace(/(?: \(copy(?: \d+)?\))+$/,``);for(let o=1;;o++){let s=o===1?` (copy)`:` (copy ${o})`,c=60-s.length,l=(a.length>c?a.slice(0,c).trimEnd():a)+s,u=(0,e.normalizePath)(yd(l,n));if(!r.has(l)&&!i.has(u)&&!(this.app.vault.getAbstractFileByPath(u)instanceof e.TFile)){r.add(l),i.add(u),t.title=l;return}}}async moveTask(e,t,n){let r=J(e,t);if(!r)return;let i=yu(e,t);cu(e.tasks,t),lu(e.tasks,r,n),Su(e,t,n),this.markDirty(e,[t],`full`),i&&this.markDirty(e,[i],`full`),n&&this.markDirty(e,[n],`full`),await this.saveProject(e)}async moveTasks(e,t,n){for(let r of t){let t=J(e,r);if(!t)continue;let i=yu(e,r);cu(e.tasks,r),lu(e.tasks,t,n),Su(e,r,n),this.markDirty(e,[r],`full`),i&&this.markDirty(e,[i],`full`)}n&&this.markDirty(e,[n],`full`),await this.saveProject(e)}stampCompletion(e,t,n){}completionMoved(e,t){return t.completed!==void 0&&t.completed!==e.completed}async scheduleAfterEarlyFinish(e,t){if(t.length!==0&&this.configFor(e).pullForwardOnEarlyFinish)for(let n of t)await this.scheduleAfterChange(e,n)}async updateTask(e,t,n){let r=J(e,t),i=r?.title;r&&this.stampCompletion(e,r,n);let a=r!==null&&this.completionMoved(r,n),o=r&&n.subtasks!==void 0?q(r.subtasks).map(e=>e.task):[];su(e.tasks,t,n);let s=r&&n.title!==void 0&&n.title!==i,c=bd(n)||s?`full`:`fm`;if(this.markDirty(e,[t],c),r&&n.description!==void 0&&this.hydratedBodies.add(r),r&&n.subtasks!==void 0)await this.reconcileSubtasks(e,r,o);else if(r&&s)for(let t of r.subtasks)this.markDirty(e,[t.id],`full`);await this.saveProject(e),a&&await this.scheduleAfterEarlyFinish(e,[t])}async reconcileSubtasks(e,t,n){bu(e,t,yu(e,t.id));let r=new Map(n.map(e=>[e.id,e])),i=new Set;for(let{task:n}of q(t.subtasks)){i.add(n.id);let t=r.get(n.id);t?t.title===n.title?(t.status!==n.status||t.completed!==n.completed||t.progress!==n.progress)&&this.markDirty(e,[n.id],`fm`):this.markDirty(e,[n.id],`full`):(this.hydratedBodies.add(n),this.markDirty(e,[n.id],`full`))}let a=this.projectTaskFolder(e);for(let t of n)i.has(t.id)||(e.taskIndex.delete(t.id),t.filePath&&await this.deleteTaskFiles({...t,subtasks:[]},a))}async updateTasks(e,t,n){let r=[];for(let i of t){let t=J(e,i);if(!t)continue;let a=typeof n==`function`?n(t):n;if(!a)continue;let o={...a};this.stampCompletion(e,t,o),this.completionMoved(t,o)&&r.push(i);let s=t.title;su(e.tasks,i,o);let c=o.title!==void 0&&o.title!==s,l=bd(o)||c?`full`:`fm`;if(this.markDirty(e,[i],l),o.description!==void 0&&this.hydratedBodies.add(t),c)for(let n of t.subtasks)this.markDirty(e,[n.id],`full`)}await this.saveProject(e),await this.scheduleAfterEarlyFinish(e,r)}async reorderTask(e,t,n,r){if(!pu(e.tasks,t,n,r))return;let i=yu(e,n);i&&this.markDirty(e,[i],`full`),await this.saveProject(e)}async deleteTasks(e,t){let n=this.projectTaskFolder(e),r=new Set;for(let i of t){let t=yu(e,i);t&&r.add(t);let a=J(e,i);a&&(await this.deleteTaskFiles(a,n),xu(e,a)),cu(e.tasks,i)}r.size&&this.markDirty(e,r,`full`),await this.saveProject(e)}async archiveTask(e,t){await ku(this.app,e,t,e=>this.markSelfWrite(e)),await this.saveProject(e)}async unarchiveTask(e,t){await Au(this.app,e,t,e=>this.markSelfWrite(e)),await this.saveProject(e)}async deleteTask(e,t){let n=yu(e,t),r=J(e,t);r&&(await this.deleteTaskFiles(r,this.projectTaskFolder(e)),xu(e,r)),cu(e.tasks,t),n&&this.markDirty(e,[n],`full`),await this.saveProject(e)}async deleteTaskFiles(t,n){for(let e of t.subtasks)await this.deleteTaskFiles(e,n);if(t.filePath){let n=this.app.vault.getAbstractFileByPath(t.filePath);n instanceof e.TFile&&(this.markSelfWrite(t.filePath),await this.app.fileManager.trashFile(n));let r=this.app.vault.getAbstractFileByPath(this.taskFolder(t.filePath));r instanceof e.TFolder&&await this.deleteFolderRecursive(r)}}taskFolder(e){return e.replace(/\.md$/,``)}async saveTaskAttachment(t,n,r,i){let a=n.filePath??yd(n.title,this.projectTaskFolder(t)),o=(0,e.normalizePath)(`${this.taskFolder(a)}/attachments`);this.markSelfWrite(this.taskFolder(a)),this.markSelfWrite(o),await this.ensureFolder(o);let s=this.uniqueChildPath(o,r);return this.markSelfWrite(s),this.app.vault.createBinary(s,i)}uniqueChildPath(t,n){let r=n.lastIndexOf(`.`),i=r>0?n.slice(0,r):n,a=r>0?n.slice(r):``,o=(0,e.normalizePath)(`${t}/${i}${a}`);for(let n=1;this.app.vault.getAbstractFileByPath(o);n++)o=(0,e.normalizePath)(`${t}/${i} ${n}${a}`);return o}async deleteProject(t){let n=this.projectTaskFolder(t),r=this.app.vault.getAbstractFileByPath(n);r instanceof e.TFolder&&await this.deleteFolderRecursive(r);let i=this.app.vault.getAbstractFileByPath(t.filePath);i instanceof e.TFile&&(this.markSelfWrite(t.filePath),await this.app.fileManager.trashFile(i)),this.clearDirty(t),this.saveQueues.delete(t.filePath),this.projectCache.delete(t.filePath),this.emitChange(t.filePath)}async deleteFolderRecursive(t){for(let n of t.children.slice())n instanceof e.TFile?(this.markSelfWrite(n.path),await this.app.fileManager.trashFile(n)):n instanceof e.TFolder&&await this.deleteFolderRecursive(n);await this.app.fileManager.trashFile(t)}async scheduleAfterChange(e,t){let n=this.configFor(e);if(!n.autoSchedule)return 0;let{patches:r}=Lu(e.tasks,t,n.statuses,n.pullForwardOnEarlyFinish);if(r.length===0)return 0;for(let t of r)su(e.tasks,t.taskId,{start:t.start,due:t.due}),this.markDirty(e,[t.taskId],`fm`);return await this.saveProject(e),r.length}};function projectSearchMatchesZentaoId(e,t){let n=String(e.customFields.zentaoId??``).trim().toLowerCase();if(!n)return!1;let r=t.trim().toLowerCase().replace(/^(?:需求|任务|里程碑|事项)\s*/u,``).replace(/^#\s*/,``).trim();return n===r}function quickSourceType(e){let t=String(e.customFields.zentaoSourceType??``);return t===`story`||e.tags.includes(`zentao-requirement`)?`requirement`:t===`task`||e.tags.includes(`zentao-task`)?`task`:t===`execution`||e.type===`milestone`?`milestone`:e.type===`task`||e.type===`subtask`?`task`:`local`}function quickCurrentUser(e){for(let t of [`zentao-my-work`,`zentao-my-participated`]){let n=e.savedViews.find(e=>e.id===t),r=n?.filter.participants?.[0]??n?.filter.assignees?.[0];if(r)return r}return``}function quickIsComplete(e,t=[]){let n=t.find(t=>t.id===e.status);return Boolean(e.completed)||n?.complete===!0||[`done`,`closed`,`finished`].includes(String(e.status))}function quickFilterActive(e){return(e.quickSource??`all`)!==`all`||(e.quickWorkType??`all`)!==`all`||(e.quickCompletion??`all`)!==`all`||(e.quickOwnership??`all`)!==`all`||(Array.isArray(e.quickAttention)&&e.quickAttention.length>0)}function detailedFilterCount(e){let t=0;return e.stages?.length&&t++,e.statuses.length&&t++,e.priorities.length&&t++,e.assignees.length&&t++,e.participants?.length&&t++,e.tags.length&&t++,e.dueDateFilter!==`any`&&t++,e.showArchived&&t++,t}function quickMatches(e,t,n=[]){let r=t.quickSource??`all`,i=quickSourceType(e);if(r!==`all`&&i!==r)return!1;let a=t.quickWorkType??`all`;if(a!==`all`&&(i!==`task`&&i!==`requirement`||e.stage!==a))return!1;let o=quickIsComplete(e,n),s=t.quickCompletion??`all`;if(s===`unfinished`&&o||s===`completed`&&!o)return!1;let c=t.quickOwnership??`all`,l=String(t.quickOwner??``),u=String(e.customFields.completedBy??``);if(c===`mine`&&(!l||!e.assignees.includes(l))||c===`participated`&&(!l||!e.assignees.includes(l)&&u!==l)||c===`unassigned`&&e.assignees.length>0)return!1;let d=Array.isArray(t.quickAttention)?t.quickAttention:[];for(let r of d){if(r===`high`&&![`critical`,`high`].includes(e.priority))return!1;if(r===`overdue`&&!jd(e,`overdue`,n))return!1;if(r===`blocked`&&![`blocked`,`pause`,`paused`,`suspended`].includes(String(e.status)))return!1}return!0}function quickStageOptions(e,t,n){let r=new Set(q(e.tasks).map(e=>e.task).filter(e=>quickSourceType(e)===n).map(e=>e.stage).filter(Boolean)),i=[];for(let e of t)r.has(e.id)&&(i.push({id:e.id,label:e.label}),r.delete(e.id));for(let e of r)i.push({id:e,label:e});return i}function quickPreferredStage(e,t,n,r=[]){let i=quickStageOptions(e,t,`task`);return i.find(e=>e.label.includes(n))?.id??i.find(e=>r.includes(e.id))?.id??r[0]??`all`}function Ed(e){return!!(quickFilterActive(e)||e.text||e.stages?.length||e.statuses.length||e.priorities.length||e.assignees.length||e.participants?.length||e.tags.length||e.dueDateFilter!==`any`)}function Dd(e){let t=0;return e.stages?.length&&t++,e.statuses.length&&t++,e.priorities.length&&t++,e.assignees.length&&t++,e.participants?.length&&t++,e.tags.length&&t++,e.dueDateFilter!==`any`&&t++,e.showArchived&&t++,t}function Od(e,t,n=[]){if(e.archived&&!t.showArchived||!quickMatches(e,t,n))return!1;let r=t.text.trim().toLowerCase(),i=String(e.customFields.completedBy??``);return!(r&&!(e.id.toLowerCase()===r||projectSearchMatchesZentaoId(e,r)||e.title.toLowerCase().includes(r)||e.stage.includes(r)||e.status.includes(r)||e.priority.includes(r)||e.assignees.some(e=>e.toLowerCase().includes(r))||i.toLowerCase().includes(r)||e.tags.some(e=>e.toLowerCase().includes(r)))||t.stages?.length&&!t.stages.includes(e.stage)||t.statuses.length&&!t.statuses.includes(e.status)||t.priorities.length&&!t.priorities.includes(e.priority)||t.assignees.length&&!e.assignees.some(e=>t.assignees.includes(e))||t.participants?.length&&!e.assignees.some(e=>t.participants.includes(e))&&!t.participants.includes(i)||t.tags.length&&!e.tags.some(e=>t.tags.includes(e))||t.dueDateFilter!==`any`&&!jd(e,t.dueDateFilter,n))}function kd(e,t,n=[]){let r=[];for(let i of e){let e=i.subtasks.length?kd(i.subtasks,t,n):[];Od(i,t,n)?r.push({...i,subtasks:e}):r.push(...e)}return r}function Ad(e,t,n=[]){return e.filter(({task:e})=>Od(e,t,n))}function jd(e,t,n){if(t===`no-date`)return!e.due;let r=K(e.due);if(!r)return!1;let i=Zl();switch(t){case`overdue`:return G.PlainDate.compare(r,i)<0&&!e.completed;case`this-week`:{let e=7-i.dayOfWeek%7,t=i.add({days:e});return G.PlainDate.compare(r,i)>=0&&G.PlainDate.compare(r,t)<=0}case`this-month`:return r.year===i.year&&r.month===i.month&&G.PlainDate.compare(r,i)>=0;default:return!0}}function Md(e){let t=e.plugins?.getPlugin?.(`tasknotes`);return t&&typeof t==`object`?t:null}function Nd(e){return Md(e)!==null}function Pd(e){let t=Md(e)?.api;return!t||t.apiVersion!==1||!t.hasCapability(`catalog.read`)?null:t}function Fd(e,t){let n=0,r=0,i=-1;for(let a of t){let t=e.findIndex(e=>e.id===a.id);t>=0?(i=t,a.differs(e[t])&&(a.apply(e[t]),r++)):(i+=1,e.splice(i,0,a.make()),n++)}return{added:n,updated:r}}function Id(e,t){let n=0,r=0;for(let i of t){let t=e.find(e=>e.id===i.id);t?i.differs(t)&&r++:n++}return{added:n,updated:r}}function Ld(e,t,n){let r=t.replace(/^\[\[/,``).replace(/\]\]$/,``).split(`|`)[0].split(`#`)[0].trim();return r?e.vault.getFileByPath(r)?r:e.metadataCache.getFirstLinkpathDest(r,n)?.path??null:null}function Rd(e,t,n,r){let i=0;for(let r of e.getStatuses())n.has(r.value)&&!t.statuses.some(e=>e.id===r.value)&&(t.statuses.push({id:r.value,label:r.label,color:r.color,icon:``,complete:r.isCompleted}),i++);for(let n of e.getPriorities())r.has(n.value)&&!t.priorities.some(e=>e.id===n.value)&&(t.priorities.push({id:n.value,label:n.label,color:n.color,icon:``}),i++);return i}function zd(e){return[...e.getStatuses()].sort((e,t)=>e.order-t.order).map(e=>({id:e.value,make:()=>({id:e.value,label:e.label,color:e.color,icon:``,complete:e.isCompleted}),differs:t=>t.label!==e.label||t.color!==e.color||t.complete!==e.isCompleted,apply:t=>{t.label=e.label,t.color=e.color,t.complete=e.isCompleted}}))}function Bd(e){return[...e.getPriorities()].sort((e,t)=>t.weight-e.weight).map(e=>({id:e.value,make:()=>({id:e.value,label:e.label,color:e.color,icon:``}),differs:t=>t.label!==e.label||t.color!==e.color,apply:t=>{t.label=e.label,t.color=e.color}}))}function Vd(e,t){let n=Fd(t.statuses,zd(e)),r=Fd(t.priorities,Bd(e));return{added:n.added+r.added,updated:n.updated+r.updated}}function Hd(e,t){let n=Id(t.statuses,zd(e)),r=Id(t.priorities,Bd(e));return{added:n.added+r.added,updated:n.updated+r.updated}}var Ud=class{el;button;constructor(t){this.button=new e.ExtraButtonComponent(t),this.el=this.button.extraSettingsEl,this.el.addClass(`pm-icon-btn`)}setIcon(e){return this.button.setIcon(e),this}setTooltip(e){return this.button.setTooltip(e),this}setRevealOnHover(e){return this.el.toggleClass(`pm-icon-btn--hover-only`,e),this}onClick(e){return this.el.addEventListener(`click`,e),this}},Wd=class extends e.AbstractInputSuggest{getSuggestions(t){let n=t.trim().toLowerCase();return n?(0,e.getIconIds)().filter(e=>e.includes(n)).slice(0,24):[]}renderSuggestion(t,n){n.addClass(`pm-icon-suggestion`),(0,e.setIcon)(n.createSpan({cls:`pm-icon-suggestion-glyph`}),t),n.createSpan({text:t})}};function Gd(e,t){let n=new Wd(e,t);n.onSelect(e=>{n.setValue(e),t.dispatchEvent(new Event(`change`)),n.close()})}function Kd(e,t,n,r){e.createSpan({text:`⠿`,cls:`pm-settings-drag-handle`}),e.draggable=!0,e.addEventListener(`dragstart`,n=>{n.dataTransfer?.setData(`text/plain`,String(t)),e.addClass(`pm-settings-row--dragging`)}),e.addEventListener(`dragend`,()=>{e.removeClass(`pm-settings-row--dragging`)}),e.addEventListener(`dragover`,e=>{e.preventDefault()}),e.addEventListener(`drop`,e=>{e.preventDefault();let i=parseInt(e.dataTransfer?.getData(`text/plain`)??``,10);if(isNaN(i)||i===t)return;let[a]=n.splice(i,1);n.splice(t,0,a),r()})}function qd(e,t,n,r){let i=e.createEl(`input`,{type:`text`,value:n.icon});i.addClass(`pm-settings-status-icon`),i.placeholder=`图标`,Gd(t,i),i.addEventListener(`change`,()=>{n.icon=i.value,r()});let a=e.createEl(`input`,{type:`text`,value:n.label});a.addClass(`pm-settings-status-label`),a.addEventListener(`change`,()=>{n.label=a.value,r()});let o=e.createEl(`input`,{type:`color`,value:n.color});o.addEventListener(`change`,()=>{n.color=o.value,r()})}function Jd(t,n){let r=()=>Jd(t,n);t.empty(),n.items.forEach((i,a)=>{let o=t.createDiv(`pm-settings-status-row`);Kd(o,a,n.items,()=>{n.onChanged(),r()}),qd(o,n.app,i,n.onChanged),n.renderExtra?.(o,i),new Ud(o).setIcon(`x`).setTooltip(`移除`).onClick(()=>{if(n.items.length<=1){new e.Notice(n.minOneMessage);return}n.items.splice(a,1),n.onChanged(),r(),n.onDeleted?.(i)})})}function Yd(e,t){Jd(e,{app:t.app,items:t.statuses,onChanged:t.onChanged,onDeleted:t.onDeleted,minOneMessage:`至少需要保留一个状态。`})}function Xd(e,t){Jd(e,{app:t.app,items:t.priorities,onChanged:t.onChanged,onDeleted:t.onDeleted,minOneMessage:`至少需要保留一个优先级。`})}function Zd(e,t){return`${e} 个${t}`}var Qd=class extends e.PluginSettingTab{plugin;constructor(e,t){super(e,t),this.plugin=t,this.icon=`chart-gantt`}getSettingDefinitions(){return[{type:`group`,heading:`常规`,items:[{name:`项目目录`,desc:`保存项目文件的库内目录。`,control:{type:`folder`,key:`projectsFolder`,defaultValue:`04.项目`,placeholder:`04.项目`,validate:e=>e.trim()?void 0:`请输入目录名称。`}},{name:`默认视图`,desc:`打开项目时默认显示的视图。`,control:{type:`dropdown`,key:`defaultView`,options:{table:`表格`,gantt:`甘特图`,kanban:`看板`}}},{name:`关闭时保存任务`,desc:`关闭任务编辑器时自动保存改动。`,control:{type:`toggle`,key:`saveTaskOnClose`}}]},{type:`group`,heading:`样式`,items:[{name:`显示标签颜色`,desc:`根据标签名称显示不同颜色。`,aliases:[`appearance`],control:{type:`toggle`,key:`showTagColors`}}]},{type:`group`,heading:`甘特图`,items:[{name:`默认时间粒度`,desc:`时间轴每列使用的时间单位。`,aliases:[`timeline`,`zoom`],control:{type:`dropdown`,key:`ganttGranularity`,options:{day:`日`,week:`周`,month:`月`,quarter:`季度`}}},{name:`周标签`,desc:`周视图表头显示的内容。`,aliases:[`timeline`],control:{type:`dropdown`,key:`ganttWeekLabel`,options:{weekNumber:`周数（第15周）`,dateRange:`日期范围（4月7日至13日）`,both:`周数和日期范围`}}}]},{type:`group`,heading:`看板`,items:[{name:`显示子任务`,desc:`将子任务作为独立卡片显示。`,aliases:[`kanban`],control:{type:`toggle`,key:`kanbanShowSubtasks`}},{name:`显示描述预览`,desc:`在卡片中显示任务描述的前几行。`,aliases:[`kanban`],control:{type:`toggle`,key:`kanbanShowDescriptionPreview`}}]},{type:`group`,heading:`排期`,items:[{name:`自动排期`,desc:`任务日期变化时自动调整依赖任务。`,aliases:[`dependencies`],control:{type:`toggle`,key:`autoSchedule`}},{name:`提前后续任务`,desc:`任务提前完成时，将依赖任务相应提前。`,aliases:[`dependencies`],control:{type:`toggle`,key:`pullForwardOnEarlyFinish`,disabled:()=>!this.plugin.settings.autoSchedule}}]},{type:`group`,heading:`通知`,items:[{name:`截止日期提醒`,desc:`任务临近截止日期时显示提醒。`,aliases:[`notifications`,`banner`],control:{type:`toggle`,key:`notificationsEnabled`}},{name:`提前天数`,desc:`在截止日期前多少天提醒。`,aliases:[`notifications`,`reminders`,`lead time`],control:{type:`slider`,key:`notificationLeadDays`,min:1,max:14,step:1,disabled:()=>!this.plugin.settings.notificationsEnabled}}]},{type:`group`,heading:`任务字段`,items:[this.stagesPage(),this.statusesPage(),this.prioritiesPage(),this.teamMembersPage()]},{type:`group`,heading:`集成`,visible:()=>Nd(this.app),items:[this.taskNotesPage()]}]}async setControlValue(e,t){await super.setControlValue(e,t),e===`kanbanShowDescriptionPreview`&&this.plugin.refreshProjectViews(),this.refreshDomState()}stagesPage(){let e=this.plugin.settings.stages;return{type:`page`,name:`阶段`,desc:`阶段原始值的中文名称、颜色和显示顺序。`,displayValue:()=>Zd(e.length,`阶段`),items:[{type:`list`,heading:`阶段`,emptyState:`暂无阶段。`,items:e.map(e=>({name:e.label,render:t=>{t.setClass(`pm-palette-row`),qd(t.controlEl,this.app,e,()=>this.persist())}})),onReorder:(t,n)=>this.reorder(e,t,n),onDelete:e=>this.deleteEntry(`stage`,e),addItem:{name:`添加阶段`,action:()=>{e.push({id:`stage-`+nu().slice(0,6),label:`新阶段`,color:`#8a94a0`,icon:``}),this.persist(),this.update()}}}]}}statusesPage(){let e=this.plugin.settings.statuses;return{type:`page`,name:`状态`,desc:`状态原始值的中文名称、颜色和显示顺序。完成判断不再依赖状态。`,displayValue:()=>Zd(this.plugin.settings.statuses.length,`状态`),items:[{type:`list`,heading:`状态`,emptyState:`暂无状态。`,items:e.map(e=>({name:e.label,render:t=>{t.setClass(`pm-palette-row`),qd(t.controlEl,this.app,e,()=>this.persist())}})),onReorder:(t,n)=>this.reorder(e,t,n),onDelete:e=>this.deleteEntry(`status`,e),addItem:{name:`添加状态`,action:()=>{e.push({id:`status-`+nu().slice(0,6),label:`新状态`,color:`#8a94a0`,icon:``,complete:!1}),this.persist(),this.update()}}}]}}prioritiesPage(){let e=this.plugin.settings.priorities;return{type:`page`,name:`优先级`,desc:`优先级的中文名称、颜色和显示顺序。`,displayValue:()=>Zd(this.plugin.settings.priorities.length,`优先级`),items:[{type:`list`,heading:`优先级`,emptyState:`暂无优先级。`,items:e.map(e=>({name:e.label,render:t=>{t.setClass(`pm-palette-row`),qd(t.controlEl,this.app,e,()=>this.persist())}})),onReorder:(t,n)=>this.reorder(e,t,n),onDelete:e=>this.deleteEntry(`priority`,e),addItem:{name:`添加优先级`,action:()=>{e.push({id:`priority-`+nu().slice(0,6),label:`新优先级`,color:`#8a94a0`,icon:``}),this.persist(),this.update()}}}]}}taskNotesPage(){let e=()=>Pd(this.app)!==null;return{type:`page`,name:`TaskNotes`,desc:`与 TaskNotes 插件共享状态和优先级。`,displayValue:()=>this.taskNotesStatus(),status:()=>e()?null:`warning`,items:[{type:`list`,extraButtons:[t=>t.setIcon(`refresh-cw`).setTooltip(`从 TaskNotes 导入`).setDisabled(!e()).onClick(()=>this.importFromTaskNotes())],items:[{name:`状态和优先级`,desc:`从 TaskNotes 4.10 或更高版本复制标签、颜色和完成配置。`,render:e=>{e.controlEl.createDiv({cls:`setting-item-value`,text:this.taskNotesStatus()})}}]}]}}taskNotesStatus(){let e=Pd(this.app);if(!e)return`需要更新`;let{added:t,updated:n}=Hd(e,this.plugin.settings),r=t+n;return r===0?`已是最新`:Zd(r,`改动`)}teamMembersPage(){let e=this.plugin.settings.globalTeamMembers;return{type:`page`,name:`团队成员`,desc:`所有项目中可以选择的负责人。`,displayValue:()=>Zd(this.plugin.settings.globalTeamMembers.length,`成员`),items:[{type:`list`,heading:`团队成员`,emptyState:`暂无团队成员。`,items:e.map((e,t)=>({name:e||`未命名成员`,render:n=>{n.setClass(`pm-palette-row`),n.addText(n=>n.setPlaceholder(`姓名`).setValue(e).onChange(e=>{this.plugin.settings.globalTeamMembers[t]=e,this.persist()}))}})),onReorder:(t,n)=>this.reorder(e,t,n),onDelete:t=>{e.splice(t,1),this.persist(),this.update()},addItem:{name:`添加成员`,action:()=>{e.push(``),this.persist(),this.update()}}}]}}persist(){this.plugin.saveSettings()}reorder(e,t,n){let[r]=e.splice(t,1);e.splice(n,0,r),this.persist(),this.update()}deleteEntry(t,n){let r=t===`stage`?this.plugin.settings.stages:t===`status`?this.plugin.settings.statuses:this.plugin.settings.priorities;if(r.length<=1){new e.Notice(`至少需要保留一个选项。`);return}let[i]=r.splice(n,1);this.persist(),this.update(),this.remapOrphanTasks(t,i.id,i.label)}importFromTaskNotes(){let t=Pd(this.app);if(!t){new e.Notice(`需要安装 TaskNotes 4.10 或更高版本。`);return}let{added:n,updated:r}=Vd(t,this.plugin.settings);this.persist(),this.update(),new e.Notice(n||r?`已从 TaskNotes 导入：新增 ${n} 项，更新 ${r} 项。`:`状态和优先级已与 TaskNotes 一致。`)}async remapOrphanTasks(t,n,r){let i=t===`stage`?this.plugin.settings.stages:t===`status`?this.plugin.settings.statuses:this.plugin.settings.priorities;if(i.length===0)return;let a=i[0],o=this.plugin.settings.projectsFolder,s=await this.plugin.store.loadAllProjects(o),c=0;for(let e of s){if((t===`stage`?e.config?.stages:t===`status`?e.config?.statuses:e.config?.priorities)?.some(e=>e.id===n))continue;let r=q(e.tasks).filter(({task:e})=>e[t]===n).map(({task:e})=>e.id);r.length&&(await this.plugin.store.updateTasks(e,r,{[t]:a.id}),c+=r.length)}c>0&&new e.Notice(`已将 ${c} 个事项从“${r}”调整为“${a.label}”。`)}},Z=class{el;labelEl;dotEl=null;iconEl=null;constructor(e){this.el=e.createSpan({cls:`pm-chip`}),this.labelEl=this.el.createSpan({cls:`pm-chip-label`})}setLeadingIcon(t){return this.iconEl||(this.iconEl=this.el.createSpan({cls:`pm-chip-icon`}),this.el.prepend(this.iconEl)),(0,e.setIcon)(this.iconEl,t),this}setLabel(e){return this.labelEl.setText(e),this}setColor(e){return this.el.style.setProperty(`--pm-chip-color`,e),this}setVariant(e){return this.el.toggleClass(`pm-chip--solid`,e===`solid`),this.el.toggleClass(`pm-chip--outline`,e===`outline`),this.el.toggleClass(`pm-chip--plain`,e===`plain`),this}setDot(e=!0){return e&&!this.dotEl?(this.dotEl=this.el.createSpan({cls:`pm-chip-dot`}),this.el.prepend(this.dotEl)):!e&&this.dotEl&&(this.dotEl.remove(),this.dotEl=null),this}setTag(e=!0){return this.el.toggleClass(`pm-chip--tag`,e),this}setStrong(e=!0){return this.el.toggleClass(`pm-chip--strong`,e),this}setShape(e){return this.el.toggleClass(`pm-chip--pill`,e===`pill`),this}setSize(e){return this.el.toggleClass(`pm-chip--sm`,e===`sm`),this}setTooltip(t){return(0,e.setTooltip)(this.el,t),this}setRemovable(t){let n=this.el.createEl(`button`,{cls:`pm-chip-rm`});return(0,e.setIcon)(n,`x`),n.onclick=e=>{e.preventDefault(),e.stopPropagation(),t()},this}onClick(e){return this.el.addClass(`pm-chip--interactive`),this.el.addEventListener(`click`,e),this}};function $d(t,n,r,i){let a=t.createDiv(`pm-prop-row`),o=a.createSpan({cls:`pm-prop-label`});if(i){o.addClass(`pm-prop-label--with-icon`);let t=o.createSpan({cls:`pm-prop-label-icon`});(0,e.setIcon)(t,i),o.createSpan({text:n})}else o.setText(n);let s=r();return a.appendChild(s),a}function ef(t,n,r){t.empty();let i=r.variant??`default`,a=r.shape??`pill`;for(let e of n){let n=new Z(t).setLabel(r.labelFn?r.labelFn(e):e).setShape(a).setRemovable(()=>r.onRemove(e));i===`accent`?n.setVariant(`solid`).setColor(`var(--interactive-accent)`):n.setVariant(`outline`)}if(r.renderAdd)r.renderAdd(t);else if(r.onAdd){let n=r.onAdd;new e.ButtonComponent(t).setButtonText(r.addLabel??`+ Add`).onClick(e=>n(e))}}function tf(e){return e?.icon&&fd(e.icon)?e.icon:null}function nf(t,n,r,i){let a=sd(r,n.status),o=new Z(t).setLabel(pd(a?.icon,a?.label??n.status)).setColor(a?.color??`var(--text-muted)`).setVariant(`solid`).setDot(!a?.icon).onClick(t=>{let a=new e.Menu;for(let e of r)a.addItem(t=>{t.setTitle(pd(e.icon,e.label)).setChecked(e.id===n.status).onClick(()=>i(e.id));let r=tf(e);r&&t.setIcon(r)});a.showAtMouseEvent(t)}),s=tf(a);return s&&o.setLeadingIcon(s),o.el}function rf(t,n,r,i){let a=cd(r,n.stage),o=new Z(t).setLabel(pd(a?.icon,a?.label??(n.stage||`未设置`))).setColor(a?.color??`var(--text-muted)`).setVariant(`solid`).setDot(!a?.icon).onClick(t=>{let a=new e.Menu;for(let e of r)a.addItem(t=>{t.setTitle(pd(e.icon,e.label)).setChecked(e.id===n.stage).onClick(()=>i(e.id));let r=tf(e);r&&t.setIcon(r)});a.showAtMouseEvent(t)}),s=tf(a);return s&&o.setLeadingIcon(s),o.el}function af(e,t,n){let r=new Z(e).setLabel(pd(n?.icon,n?.label??(t||`未设置`))).setColor(n?.color??`var(--text-muted)`).setVariant(`solid`).setDot(!n?.icon),i=tf(n);return i&&r.setLeadingIcon(i),r.el}const of={critical:`chevrons-up`,high:`chevron-up`,medium:`equal`,low:`chevron-down`};function sf(t,n,r,i){let a=ud(r,n.priority),o=new Z(t).setLabel(pd(a?.icon,a?.label??n.priority)).setColor(a?.color??`var(--text-muted)`).setVariant(`plain`),s=tf(a);return s?o.setLeadingIcon(s):a?.icon||o.setLeadingIcon(of[n.priority]??`equal`),o.onClick(t=>{let a=new e.Menu;for(let e of r)a.addItem(t=>{t.setTitle(pd(e.icon,e.label)).setChecked(e.id===n.priority).onClick(()=>i(e.id));let r=tf(e);r&&t.setIcon(r)});a.showAtMouseEvent(t)}),o.el}function cf(e,t,n,r=`pm-subtask-dot`){let i=sd(n,t),a=e.createSpan({cls:r});return a.style.background=i?.color??`var(--text-muted)`,a}function lf(t,n,r,i){let a=n.customFields[t.id],o=createDiv(`pm-prop-value`);switch(t.type){case`text`:case`url`:{let e=o.createEl(`input`,{type:t.type===`url`?`url`:`text`,cls:`pm-prop-text`});e.value=id(a),e.placeholder=t.name,e.addEventListener(`change`,()=>{n.customFields[t.id]=e.value});break}case`number`:{let e=o.createEl(`input`,{type:`number`,cls:`pm-prop-text`});e.value=id(a),e.addEventListener(`change`,()=>{n.customFields[t.id]=parseFloat(e.value)});break}case`date`:{let e=o.createEl(`input`,{type:`date`,cls:`pm-prop-date`});e.value=id(a),e.addEventListener(`change`,()=>{n.customFields[t.id]=e.value});break}case`checkbox`:{let e=o.createEl(`input`,{type:`checkbox`,cls:`pm-prop-checkbox`});e.checked=!!a,e.addEventListener(`change`,()=>{n.customFields[t.id]=e.checked});break}case`select`:{let e=o.createEl(`select`,{cls:`pm-prop-select`});e.createEl(`option`,{value:``,text:`—`});for(let n of t.options??[]){let t=e.createEl(`option`,{value:n,text:n});n===a&&(t.selected=!0)}e.addEventListener(`change`,()=>{n.customFields[t.id]=e.value});break}case`multiselect`:{let r=Array.isArray(a)?a:[],i=()=>{ef(o,r,{shape:`pill`,onRemove:e=>{let a=r.indexOf(e);a>-1&&r.splice(a,1),n.customFields[t.id]=[...r],i()},onAdd:a=>{let o=new e.Menu;for(let e of t.options??[])r.includes(e)||o.addItem(a=>a.setTitle(e).onClick(()=>{r.push(e),n.customFields[t.id]=[...r],i()}));o.showAtMouseEvent(a)}})};i();break}case`person`:{let e=o.createEl(`input`,{type:`text`,cls:`pm-prop-text`});e.value=id(a),e.placeholder=`人员姓名`;let s=[...new Set([...r.teamMembers,...i.settings.globalTeamMembers])];e.setAttribute(`list`,`pm-persons-${t.id}`);let c=o.createEl(`datalist`,{attr:{id:`pm-persons-${t.id}`}});for(let e of s)c.createEl(`option`,{value:e});e.addEventListener(`change`,()=>{n.customFields[t.id]=e.value});break}}return o}var uf=class{contentEl;el;anchor;host;win;doc;align;width;onCloseCb;opened=!1;constructor(t){this.anchor=t.anchor,this.win=activeWindow,this.doc=activeDocument,this.host=t.host??this.anchor.closest(`.modal`)??this.doc.body,this.align=t.align??`left`,this.width=t.width,this.onCloseCb=t.onClose,this.el=createDiv(`pm-pop`),e.Platform.isPhone&&this.el.addClass(`pm-pop--sheet`),this.width!=null&&this.el.setCssProps({"--pop-width":`${this.width}px`}),this.contentEl=this.el.createDiv(`pm-pop-body`)}get isOpen(){return this.opened}open(){this.opened||(this.opened=!0,this.anchor.setAttribute(`aria-expanded`,`true`),this.host.appendChild(this.el),this.reposition(),this.doc.addEventListener(`mousedown`,this.onOutsideDown,!0),this.doc.addEventListener(`keydown`,this.onKeyDown,!0),this.win.addEventListener(`scroll`,this.reposition,!0),this.win.addEventListener(`resize`,this.reposition))}close(){this.opened&&(this.opened=!1,this.anchor.setAttribute(`aria-expanded`,`false`),this.doc.removeEventListener(`mousedown`,this.onOutsideDown,!0),this.doc.removeEventListener(`keydown`,this.onKeyDown,!0),this.win.removeEventListener(`scroll`,this.reposition,!0),this.win.removeEventListener(`resize`,this.reposition),this.el.remove(),this.onCloseCb?.())}reposition=()=>{if(!this.opened||e.Platform.isPhone)return;let t=this.anchor.getBoundingClientRect(),n=this.win.innerWidth,r=this.win.innerHeight,i=this.el.offsetWidth||this.width||200,a=this.el.offsetHeight||200,o=t.bottom+4;o+a>r-12&&(o=Math.max(12,t.top-a-4));let s=this.align===`right`?t.right-i:t.left;s=Math.max(12,Math.min(s,n-i-12)),this.el.setCssProps({"--pop-top":`${o}px`,"--pop-left":`${s}px`})};onOutsideDown=e=>{let t=e.target;this.el.contains(t)||this.anchor.contains(t)||this.close()};onKeyDown=e=>{e.key===`Escape`&&(e.stopPropagation(),this.close())}};function df(t){let n=t.trim(),r=n.match(/^\[\[([^\]]+)\]\]$/);if(!r)return n;let i=r[1],a=i.indexOf(`|`);if(a>=0){let e=i.slice(a+1).trim();if(e)return e}let o=a>=0?i.slice(0,a):i,{path:s}=(0,e.parseLinktext)(o),c=s.split(`/`).pop()??s;return(c.endsWith(`.md`)?c.slice(0,-3):c).trim()}function ff(e){let t=e.trim().split(/\s+/).filter(Boolean);return(t.length>=2?t[0][0]+t[1][0]:e.slice(0,2)).toUpperCase()}var pf=class{el;constructor(e){this.el=e.createSpan({cls:`pm-avatar`})}setName(t){let n=df(t);return this.el.setText(ff(n)),this.el.style.background=Zu(n),(0,e.setTooltip)(this.el,n),this}setSize(e){return this.el.toggleClass(`pm-avatar--sm`,e===`sm`),this}};function mf(t,n){if(n.icon&&fd(n.icon)){let r=t.createSpan({cls:`pm-glyph-icon`});(0,e.setIcon)(r,n.icon),n.color&&r.setCssProps({"--pm-glyph-color":n.color})}else n.icon?t.createSpan({cls:`pm-glyph-icon pm-glyph-text`,text:n.icon}):n.color&&t.createSpan({cls:`pm-glyph-dot`}).setCssProps({"--pm-glyph-color":n.color})}function hf(t,n){let r=t.createEl(`button`,{cls:`pm-pop-item`});n.accent&&r.addClass(`pm-pop-item--accent`),n.avatar?new pf(r).setName(n.avatar).setSize(`sm`):mf(r,n),r.createSpan({cls:`pm-pop-item-label`,text:n.label});let i=r.createSpan({cls:`pm-pop-check`});return(0,e.setIcon)(i,`check`),n.selected||i.addClass(`pm-pop-check--hidden`),r.addEventListener(`click`,n.onPick),r}function gf(t){let n=t.options.find(e=>e.id===t.value)??null,r=t.container.createEl(`button`,{cls:`pm-prop-inline`});n||r.addClass(`pm-prop-inline--empty`),mf(r,{color:n?.color,icon:n?.icon}),r.createSpan({cls:`pm-prop-inline-label`,text:n?.label??t.placeholder??`请选择`});let i=r.createSpan({cls:`pm-prop-chevron`});(0,e.setIcon)(i,`chevron-down`);let a=null;r.addEventListener(`click`,()=>{if(a?.isOpen){a.close();return}a=new uf({anchor:r,width:t.width??r.offsetWidth,onClose:()=>a=null});let e=t.search?a.contentEl.createEl(`input`,{cls:`pm-pop-field`,attr:{placeholder:t.searchPlaceholder??`搜索……`,spellcheck:`false`}}):null,n=a.contentEl.createDiv(`pm-pop-list`),i=()=>{n.empty();let r=e?.value.trim().toLowerCase()??``;for(let e of t.options.filter(e=>!r||e.label.toLowerCase().includes(r)))hf(n,{label:e.label,color:e.color,icon:e.icon,selected:e.id===t.value,onPick:()=>{a?.close(),t.onChange(e.id)}})};e?.addEventListener(`input`,()=>i()),i(),a.open(),e?.focus()})}function _f(t){let n=!!t.value,r=t.container.createEl(`button`,{cls:`pm-prop-inline`});n||r.addClass(`pm-prop-inline--empty`);let i=r.createSpan({cls:`pm-glyph-icon`});(0,e.setIcon)(i,`calendar`),r.createSpan({cls:`pm-prop-inline-label`,text:n?Ql(t.value):t.emptyLabel??`Set date`}),t.hint&&r.createSpan({cls:`pm-due pm-due--${t.hint.tone}`,text:t.hint.text});let a=null;r.addEventListener(`click`,()=>{if(a?.isOpen){a.close();return}let e=null;a=new uf({anchor:r,width:160,onClose:()=>{a=null;let n=e??i.value;n!==t.value&&t.onChange(n)}});let i=a.contentEl.createEl(`input`,{type:`date`,cls:`pm-pop-field`});i.value=t.value,i.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),a?.close())});let o=a.contentEl.createDiv(`pm-pop-actions`);o.createEl(`button`,{cls:`pm-pop-item pm-pop-item--center`,text:`今天`}).addEventListener(`click`,()=>{e=Zl().toString(),a?.close()}),n&&o.createEl(`button`,{cls:`pm-pop-item pm-pop-item--center pm-pop-item--danger`,text:`清除`}).addEventListener(`click`,()=>{e=``,a?.close()}),a.open(),i.focus()})}function vf(e){let{container:t,display:n,inputType:r,value:i,onSave:a}=e,o=t.createEl(`input`,{type:r,cls:`pm-inline-edit`,value:i});n.replaceWith(o),o.focus(),r!==`date`&&o.select();let s=!1,c=Y(async()=>{if(s)return;s=!0;let e=o.value.trim();e===i?o.replaceWith(n):await a(e)});o.addEventListener(`blur`,c),r===`date`?o.addEventListener(`change`,c):o.addEventListener(`keydown`,e=>{e.key===`Enter`&&c(),e.key===`Escape`&&o.replaceWith(n)})}function yf(e){let t=e.inputType??`text`,n=e.value!==``,r=e.container.createEl(`button`,{cls:`pm-prop-inline`});n||r.addClass(`pm-prop-inline--empty`),r.createSpan({cls:`pm-prop-inline-label`,text:n?`${e.value}${e.suffix??``}`:e.placeholder??`设置值`}),r.addEventListener(`click`,()=>{vf({container:e.container,display:r,inputType:t,value:e.value,onSave:async n=>{e.onChange(t===`number`&&e.number?bf(n,e.number):n)}})})}function bf(e,t){let n=Math.round(parseFloat(e)||0);return String(Math.min(t.max??1/0,Math.max(t.min??-1/0,n)))}function xf(t){let n=e=>t.labelFor?t.labelFor(e):e,r=!!t.avatarStack,i=!!t.depsList,a=r||i?null:t.container.createDiv(`pm-prop-chips`),o=i?t.container.createDiv(`pm-prop-deps`):null,s=r?t.container.createEl(`button`):t.container.createEl(`button`,{cls:`pm-prop-add`}),c=null;r||((0,e.setIcon)(s.createSpan({cls:`pm-glyph-icon`}),`plus`),c=s.createSpan({cls:`pm-prop-add-label`,text:t.addLabel}));let l=()=>{s.empty();let r=t.selected();if(r.length===0){s.className=`pm-prop-add`,(0,e.setIcon)(s.createSpan({cls:`pm-glyph-icon`}),`plus`),s.createSpan({cls:`pm-prop-add-label`,text:t.addLabel});return}s.className=`pm-prop-inline pm-assignees-trigger`;let i=s.createSpan({cls:`pm-avatar-stack`});for(let e of r)new pf(i).setName(n(e)).setSize(`sm`);r.length===1&&s.createSpan({cls:`pm-assignees-label`,text:n(r[0])})},u=()=>{if(a){a.empty();for(let e of t.selected()){let r=new Z(a).setLabel(n(e)).setVariant(`outline`).setRemovable(()=>{t.remove(e),f()});t.tag?r.setTag():r.setShape(`pill`);let i=t.colorFor?.(e);i&&r.setDot(!0).setColor(i)}}},d=()=>{if(o){o.empty();for(let r of t.selected()){let i=o.createDiv(`pm-dep-row`);(0,e.setIcon)(i.createSpan({cls:`pm-dep-icon`}),`link-2`),i.createSpan({cls:`pm-dep-id`,text:r}),i.createSpan({cls:`pm-dep-title`,text:n(r)}),new Ud(i).setIcon(`x`).setTooltip(`移除依赖`).onClick(()=>{t.remove(r),f()})}}},f=()=>{r?l():i?d():u(),c&&c.setText(t.selected().length&&t.addLabelMore?t.addLabelMore:t.addLabel)};f();let p=null;s.addEventListener(`click`,()=>{if(p?.isOpen){p.close();return}let e=new uf({anchor:s,width:230,onClose:()=>p=null});p=e;let n=``,i=t.search?e.contentEl.createEl(`input`,{cls:`pm-pop-field`,attr:{placeholder:t.placeholder??`搜索……`,spellcheck:`false`}}):null,a=e.contentEl.createDiv(`pm-pop-list`),o=()=>{a.empty();let e=n.trim().toLowerCase(),s=new Set(t.selected()),c=t.options().filter(t=>!e||t.label.toLowerCase().includes(e));for(let e of c)hf(a,{label:e.label,color:e.color??t.colorFor?.(e.id),icon:e.icon,avatar:r?e.label:void 0,selected:s.has(e.id),onPick:()=>{s.has(e.id)?t.remove(e.id):t.add(e.id),f(),o()}});let l=t.create;if(l&&e&&!t.options().some(t=>t.label.toLowerCase()===e)){let e=n.trim();hf(a,{label:`Create "${e}"`,icon:`plus`,accent:!0,onPick:()=>{l(e),n=``,i&&(i.value=``),f(),o()}})}};i&&i.addEventListener(`input`,()=>{n=i.value,o()}),o(),e.open(),i?.focus()})}function Sf(t,n,r){let i=t.createEl(`button`,{cls:`pm-prop-add`});return(0,e.setIcon)(i.createSpan({cls:`pm-glyph-icon`}),`plus`),i.createSpan({cls:`pm-prop-add-label`,text:n}),i.addEventListener(`click`,r),i}function Cf(t,n,r){if(n.length===0)return;let i=null,a=Sf(t,`Add property`,()=>{if(i?.isOpen){i.close();return}i=new uf({anchor:a,width:190,onClose:()=>i=null});let t=i.contentEl.createDiv(`pm-pop-list`);for(let a of n){let n=t.createEl(`button`,{cls:`pm-pop-item`}),o=n.createSpan({cls:`pm-glyph-icon`});(0,e.setIcon)(o,a.icon),n.createSpan({cls:`pm-pop-item-label`,text:a.label}),n.addEventListener(`click`,()=>{i?.close(),r(a.id)})}i.open()})}const wf=[{id:`task`,label:`任务`,icon:`square-check-big`},{id:`subtask`,label:`子任务`,icon:`git-branch`},{id:`milestone`,label:`里程碑`,icon:`diamond`}],Tf=[{id:`none`,label:`不重复`,icon:`repeat`},{id:`daily`,label:`每天`,icon:`repeat`},{id:`weekly`,label:`每周`,icon:`repeat`},{id:`monthly`,label:`每月`,icon:`repeat`},{id:`yearly`,label:`每年`,icon:`repeat`}];function Ef(e,t){let{task:n,project:r,plugin:i,rerender:a,shownExtras:o}=t,{stages:s,statuses:c,priorities:l}=i.store.configFor(r),u=!!n.customFields.zentaoSourceType,d=e.createDiv(`pm-prop-grid`);if($d(d,`类型`,()=>{let e=createDiv(`pm-prop-value`);return gf({container:e,value:n.type,options:wf,onChange:e=>{n.type=e,e===`milestone`&&(n.start=``,n.progress=0),e!==`subtask`&&t.setParentId(null),a()}}),e},`shapes`),n.type===`subtask`?$d(d,`父任务`,()=>{let e=createDiv(`pm-prop-value`),i=q(r.tasks).map(e=>e.task).filter(e=>e.id!==n.id);return gf({container:e,value:t.parentId,options:[{id:``,label:`无父任务`},...i.map(e=>({id:e.id,label:e.title}))],placeholder:`选择父任务`,search:!0,searchPlaceholder:`搜索任务…`,width:230,onChange:e=>{t.setParentId(e||null),a()}}),e},`corner-up-right`):d.createDiv(),$d(d,`阶段`,()=>{let e=createDiv(`pm-prop-value`),t=cd(s,n.stage);return u?e.createSpan({text:(t?.label??n.stage)||`未设置`,cls:`pm-source-value`}):gf({container:e,value:n.stage,options:s.map(e=>({id:e.id,label:e.label,color:e.color,icon:e.icon||void 0})),onChange:e=>{n.stage=e,a()}}),e},`git-branch`),$d(d,`状态`,()=>{let e=createDiv(`pm-prop-value`),t=sd(c,n.status);return u?e.createSpan({text:(t?.label??n.status)||`未设置`,cls:`pm-source-value`}):gf({container:e,value:n.status,options:c.map(e=>({id:e.id,label:e.label,color:e.color,icon:e.icon||void 0})),onChange:e=>{n.status=e,a()}}),e},`circle-dot`),$d(d,`优先级`,()=>{let e=createDiv(`pm-prop-value`);return gf({container:e,value:n.priority,options:l.map(e=>({id:e.id,label:e.label,color:e.color,icon:e.icon||of[e.id]})),onChange:e=>{n.priority=e,a()}}),e},`flag`),$d(d,n.type===`milestone`?`日期`:`截止日期`,()=>{let e=createDiv(`pm-prop-value`);return _f({container:e,value:n.due,emptyLabel:`设置截止日期`,hint:n.completed?null:$l(n.due),onChange:e=>{n.due=e,a()}}),e},`calendar-clock`),n.type===`milestone`?d.createDiv():$d(d,`开始日期`,()=>{let e=createDiv(`pm-prop-value`);return _f({container:e,value:n.start,emptyLabel:`设置开始日期`,onChange:e=>{n.start=e,a()}}),e},`play`),$d(d,`负责人`,()=>{let e=createDiv(`pm-prop-value`),t=()=>[...new Set([...r.teamMembers,...i.settings.globalTeamMembers])];return xf({container:e,avatarStack:!0,search:!0,addLabel:`分配负责人`,placeholder:`搜索人员…`,selected:()=>n.assignees,options:()=>t().map(e=>({id:e,label:e})),add:e=>{n.assignees.includes(e)||n.assignees.push(e)},remove:e=>{n.assignees=n.assignees.filter(t=>t!==e)},create:e=>{n.assignees.includes(e)||n.assignees.push(e)}}),e},`users`),(n.completed||o.has(`completed`))&&$d(d,`完成日期`,()=>{let e=createDiv(`pm-prop-value`);return u?e.createSpan({text:n.completed||`未设置`,cls:`pm-source-value`}):_f({container:e,value:n.completed,emptyLabel:`设置日期`,hint:eu(n.due,n.completed),onChange:e=>{n.completed=e,a()}}),e},`circle-check-big`),n.type!==`milestone`&&(n.progress>0||o.has(`progress`))&&$d(d,`进度`,()=>{let e=createDiv(`pm-prop-value`);return yf({container:e,value:String(n.progress),inputType:`number`,suffix:`%`,number:{min:0,max:100},onChange:e=>{n.progress=Number(e),a()}}),e},`percent`),(n.recurrence||o.has(`repeat`))&&$d(d,`重复`,()=>{let e=createDiv(`pm-prop-value`);return gf({container:e,value:n.recurrence?.interval??`none`,options:Tf,onChange:e=>{e===`none`?n.recurrence=void 0:n.recurrence={interval:e,every:n.recurrence?.every??1,endDate:n.recurrence?.endDate},a()}}),e},`repeat`),$d(d,`标签`,()=>{let e=createDiv(`pm-prop-value`),t=[...new Set(q(r.tasks).flatMap(e=>e.task.tags))];return xf({container:e,search:!0,addLabel:`添加标签`,placeholder:`查找或创建…`,tag:!0,colorFor:i.settings.showTagColors?e=>Zu(e):void 0,selected:()=>n.tags,options:()=>t.map(e=>({id:e,label:e})),add:e=>{n.tags.includes(e)||n.tags.push(e)},remove:e=>{n.tags=n.tags.filter(t=>t!==e)},create:e=>{n.tags.includes(e)||n.tags.push(e)}}),e},`tag`).addClass(`pm-prop-row--wide`),n.dependencies.length>0||o.has(`depends`)){let e=q(r.tasks).map(e=>e.task).filter(e=>e.id!==n.id),t=t=>e.find(e=>e.id===t)?.title??t;$d(d,`依赖项`,()=>{let i=createDiv(`pm-prop-value`);return xf({container:i,search:!0,addLabel:`添加依赖`,addLabelMore:`继续添加`,placeholder:`搜索任务…`,depsList:!0,labelFor:t,selected:()=>n.dependencies.filter(t=>e.some(e=>e.id===t)),options:()=>e.filter(e=>n.dependencies.includes(e.id)||!Iu(r.tasks,n.id,e.id)).map(e=>({id:e.id,label:e.title})),add:e=>{n.dependencies.includes(e)||n.dependencies.push(e)},remove:e=>{n.dependencies=n.dependencies.filter(t=>t!==e)}}),i},`link-2`).addClass(`pm-prop-row--wide`)}let f=[];if(!u&&!n.completed&&!o.has(`completed`)&&f.push({id:`completed`,label:`完成日期`,icon:`circle-check-big`}),n.type!==`milestone`&&n.progress===0&&!o.has(`progress`)&&f.push({id:`progress`,label:`进度`,icon:`percent`}),!n.recurrence&&!o.has(`repeat`)&&f.push({id:`repeat`,label:`重复`,icon:`repeat`}),n.dependencies.length===0&&!o.has(`depends`)&&f.push({id:`depends`,label:`依赖项`,icon:`link-2`}),f.length>0&&Cf(d.createDiv(`pm-prop-add-cell`),f,e=>{o.add(e),a()}),r.customFields.length>0){let t=e.createDiv(`pm-modal-section`);t.createEl(`h4`,{text:`自定义字段`,cls:`pm-modal-section-title`});let a=t.createDiv(`pm-prop-grid`);for(let e of r.customFields)$d(a,e.name,()=>lf(e,n,r,i))}}function Df(e,t){if(t.type===`milestone`)return;let n=e.createDiv(`pm-modal-section`),r=n.createDiv(`pm-modal-section-header`),i=gu(t),a=projectEstimateHours(t),o=a>0?`工时记录（${i}h / ${a}h）`:`工时记录（已登记 ${i}h）`;r.createEl(`h4`,{text:o,cls:`pm-modal-section-title`});let s=n.createDiv(`pm-time-est-row`);s.createSpan({text:`预计：`,cls:`pm-time-label`});let c=s.createEl(`input`,{type:`number`,cls:`pm-prop-text pm-time-est-input`});c.value=a>0?String(a):``,c.placeholder=`小时`,c.min=`0`,c.step=`0.5`,c.addEventListener(`change`,()=>{let e=parseFloat(c.value);t.timeEstimate=isNaN(e)||e<=0?void 0:e});let l=n.createDiv(`pm-time-log-list`),u=()=>{l.empty(),t.timeLogs||=[];let e=t.timeLogs;for(let t=0;t<e.length;t++){let n=e[t],r=l.createDiv(`pm-time-log-row`),i=r.createEl(`input`,{type:`date`,cls:`pm-prop-date pm-time-log-date`});i.value=n.date,i.addEventListener(`change`,()=>{n.date=i.value});let a=r.createEl(`input`,{type:`number`,cls:`pm-prop-text pm-time-log-hours`});a.value=String(n.hours),a.min=`0`,a.step=`0.25`,a.placeholder=`小时`,a.addEventListener(`change`,()=>{n.hours=parseFloat(a.value)||0});let o=r.createEl(`input`,{type:`text`,cls:`pm-prop-text pm-time-log-note`});o.value=n.note,o.placeholder=`备注…`,o.addEventListener(`change`,()=>{n.note=o.value}),new Ud(r).setIcon(`x`).setTooltip(`移除记录`).onClick(()=>{e.splice(t,1),u()})}};u(),Sf(n,`登记工时`,()=>{t.timeLogs||=[],t.timeLogs.push({date:Zl().toString(),hours:0,note:``}),u()})}function Of(e,t,n,r){let i=e.createDiv(`pm-modal-section`),a=i.createDiv(`pm-subtasks-header`).createEl(`h4`,{text:`子任务 `,cls:`pm-modal-section-title`}).createSpan({cls:`pm-subtasks-count`}),o=i.createDiv(`pm-modal-subtask-list`),s=()=>{let e=t.subtasks.length;if(e===0){a.setText(``);return}let n=t.subtasks.filter(e=>!!e.completed).length;a.setText(`${n}/${e}`)},c=()=>{o.empty();for(let e of t.subtasks){let n=o.createDiv(`pm-modal-subtask-row`),r=!!e.completed,i=n.createEl(`input`,{type:`checkbox`,cls:`pm-subtask-checkbox`});i.checked=r,i.addEventListener(`change`,()=>{e.completed=i.checked?Zl().toString():``,e.progress=i.checked?100:0,c(),d(),s()});let a=n.createSpan({text:e.title,cls:r?`pm-subtask-title pm-subtask-title--done`:`pm-subtask-title`});a.contentEditable=`true`,a.addEventListener(`blur`,()=>{e.title=a.textContent?.trim()??e.title}),new Ud(n).setIcon(`x`).setTooltip(`删除子任务`).setRevealOnHover(!0).onClick(()=>{t.subtasks=t.subtasks.filter(t=>t.id!==e.id),c(),d(),s()})}},d=()=>{window.setTimeout(()=>{try{let e=o.querySelectorAll(`.pm-modal-subtask-row:not(.pm-subtask-add-row)`);e.forEach((e,n)=>{if(e.querySelector(`.pm-subtask-role-meta`))return;let r=t.subtasks[n],i=Array.isArray(r?.assignees)?r.assignees.filter(e=>typeof e===`string`&&e.trim()).join(`、`):``,a=typeof r?.customFields?.completedBy===`string`?r.customFields.completedBy.trim():``;if(!i&&!a)return;let o=e.createDiv(`pm-subtask-role-meta`);i&&o.createSpan({text:`负责人 · ${i}`,cls:`pm-subtask-role pm-subtask-role--assignee`}),a&&o.createSpan({text:`完成者 · ${a}`,cls:`pm-subtask-role pm-subtask-role--completed`})})}catch(e){console.warn(`[PM] Failed to render subtask role metadata`,e)}},0)};c(),d(),s();let l=i.createDiv(`pm-modal-subtask-row pm-subtask-add-row`);l.createSpan({cls:`pm-subtask-checkbox-ghost`,attr:{"aria-hidden":`true`}});let u=l.createEl(`input`,{cls:`pm-subtask-add-input`,attr:{placeholder:`添加子任务…`}});u.addEventListener(`keydown`,e=>{if(e.key!==`Enter`)return;let n=u.value.trim();n&&(t.subtasks.push(ru({title:n,type:`subtask`})),u.value=``,c(),d(),s())})}const kf={canvas:`Canvas`,base:`Database`};var Af=class{app;textarea;onInsert;container;mirror;items=[];activeIndex=0;open=!1;query=``;triggerStart=-1;constructor(e,t,n){this.app=e,this.textarea=t,this.onInsert=n,this.container=createDiv(`pm-note-suggest`),this.mirror=createDiv(`pm-note-suggest-mirror`),activeDocument.body.appendChild(this.mirror),this.textarea.addEventListener(`input`,this.onInput),this.textarea.addEventListener(`keydown`,this.onKeydown),this.textarea.addEventListener(`blur`,this.onBlur),this.textarea.addEventListener(`scroll`,this.onScroll)}attach(e){e.appendChild(this.container)}destroy(){this.textarea.removeEventListener(`input`,this.onInput),this.textarea.removeEventListener(`keydown`,this.onKeydown),this.textarea.removeEventListener(`blur`,this.onBlur),this.textarea.removeEventListener(`scroll`,this.onScroll),this.container.remove(),this.mirror.remove()}onInput=()=>{let e=this.textarea.selectionStart,t=this.textarea.value.slice(0,e).match(/\[\[([^\]]{0,80})$/);t?(this.triggerStart=e-t[0].length,this.query=t[1],this.updateItems(),this.items.length>0?this.show():this.hide()):this.hide()};onKeydown=e=>{if(this.open)switch(e.key){case`ArrowDown`:e.preventDefault(),e.stopPropagation(),this.activeIndex=(this.activeIndex+1)%this.items.length,this.renderItems();break;case`ArrowUp`:e.preventDefault(),e.stopPropagation(),this.activeIndex=(this.activeIndex-1+this.items.length)%this.items.length,this.renderItems();break;case`Enter`:case`Tab`:e.preventDefault(),e.stopPropagation(),this.accept(this.items[this.activeIndex]);break;case`Escape`:e.preventDefault(),e.stopPropagation(),this.hide()}};onBlur=()=>{window.setTimeout(()=>this.hide(),150)};onScroll=()=>{this.open&&this.position()};updateItems(){let t=this.app.vault.getFiles().filter(e=>/\.(md|canvas|base)$/.test(e.extension?`.${e.extension}`:e.path));if(!this.query)this.items=t.sort((e,t)=>t.stat.mtime-e.stat.mtime).slice(0,8);else{let n=(0,e.prepareFuzzySearch)(this.query),r=this.query.toLowerCase(),i=[];for(let e of t){let t=n(e.basename);if(!t)continue;let a=t.score,o=e.basename.toLowerCase();o.startsWith(r)?a-=10:o.includes(r)&&(a-=5),a+=e.basename.length*.01,i.push({file:e,score:a})}i.sort((e,t)=>e.score-t.score),this.items=i.slice(0,8).map(e=>e.file)}this.activeIndex=0}accept(e){if(!e)return;let t=this.textarea.value.slice(0,this.triggerStart),n=this.textarea.value.slice(this.textarea.selectionStart),r=`[[${e.extension===`md`?e.basename:`${e.basename}.${e.extension}`}]]`,i=t+r+n;this.textarea.value=i;let a=t.length+r.length;this.textarea.setSelectionRange(a,a),this.onInsert(i),this.hide(),this.textarea.focus()}show(){this.open=!0,this.container.addClass(`pm-note-suggest--visible`),this.position(),this.renderItems()}hide(){this.open&&(this.open=!1,this.container.removeClass(`pm-note-suggest--visible`),this.triggerStart=-1)}position(){let e=activeWindow.getComputedStyle(this.textarea);for(let t of[`fontFamily`,`fontSize`,`fontWeight`,`lineHeight`,`letterSpacing`,`paddingTop`,`paddingRight`,`paddingBottom`,`paddingLeft`,`borderTopWidth`,`borderRightWidth`,`borderBottomWidth`,`borderLeftWidth`,`boxSizing`,`wordWrap`,`whiteSpace`,`overflowWrap`])this.mirror.style.setProperty(t.replace(/[A-Z]/g,e=>`-`+e.toLowerCase()),e.getPropertyValue(t.replace(/[A-Z]/g,e=>`-`+e.toLowerCase())));this.mirror.style.width=this.textarea.clientWidth+`px`;let t=this.textarea.value.slice(0,this.textarea.selectionStart);this.mirror.textContent=``;let n=activeDocument.createTextNode(t);this.mirror.appendChild(n);let r=activeDocument.createSpan();r.textContent=`​`,this.mirror.appendChild(r);let i=r.offsetTop,a=r.offsetLeft,o=parseFloat(e.lineHeight)||parseFloat(e.fontSize)*1.4,s=this.textarea.getBoundingClientRect(),c=this.container.offsetParent?this.container.offsetParent.getBoundingClientRect():s,l=s.top-c.top+i-this.textarea.scrollTop+o+4,u=s.left-c.left+a;this.container.style.top=l+`px`,this.container.style.left=u+`px`;let d=(this.container.offsetParent?.clientWidth??600)-280;u>d&&(this.container.style.left=Math.max(0,d)+`px`)}renderItems(){this.container.empty(),this.items.forEach((e,t)=>{let n=this.container.createDiv({cls:`pm-note-suggest-item`+(t===this.activeIndex?` pm-note-suggest-item--active`:``)}),r=n.createDiv({cls:`pm-note-suggest-name-row`});r.createSpan({cls:`pm-note-suggest-name`,text:e.basename});let i=kf[e.extension];i&&r.createSpan({cls:`pm-note-suggest-type`,text:i}),e.parent&&e.parent.path!==`/`&&n.createDiv({cls:`pm-note-suggest-path`,text:e.parent.path}),n.addEventListener(`mousedown`,t=>{t.preventDefault(),this.accept(e)}),n.addEventListener(`mouseenter`,()=>{this.activeIndex=t,this.renderItems()})});let e=this.container.querySelector(`.pm-note-suggest-item--active`);e&&e.scrollIntoView({block:`nearest`})}},jf=class extends e.Modal{plugin;project;parentId;onSave;task;original;isNew;originalParentId;cancelled=!1;saved=!1;persistPromise=null;noteSuggest=null;shownExtras=new Set;saveKeyHandler=null;constructor(e,t,n,r,i,a,o){if(super(e),this.plugin=t,this.project=n,this.parentId=i,this.onSave=a,r){if(this.task=JSON.parse(JSON.stringify(r)),this.isNew=!1,i==null){let e=q(n.tasks).find(e=>e.task.id===r.id);this.parentId=e?.parentId??null}}else{let e=t.store.configFor(n);this.task=ru({status:ed(e.statuses),priority:td(e.priorities),type:i?`subtask`:`task`,...o}),this.isNew=!0}this.original=JSON.parse(JSON.stringify(this.task)),this.originalParentId=this.parentId}onOpen(){let{contentEl:e}=this;e.empty(),e.addClass(`pm-task-modal`),this.modalEl.addClass(`pm-modal`,`pm-modal--task`),this.render()}onClose(){if(this.plugin.settings.saveTaskOnClose&&!this.isNew&&!this.cancelled&&!this.saved&&this.task.title.trim()){let t=this.plugin.store.findTaskFileConflict(this.project,this.task);t?new e.Notice(`任务未保存：已存在名为“${t.fileName}”的笔记。`):this.persistTask()}this.saveKeyHandler&&=(this.modalEl.removeEventListener(`keydown`,this.saveKeyHandler),null),this.noteSuggest?.destroy(),this.noteSuggest=null,this.contentEl.empty()}persistTask(){if(this.persistPromise)return this.persistPromise;let e=(async()=>{try{await this.runPersist()}catch(e){throw this.persistPromise=null,e}})();return this.persistPromise=e,e}async insertAttachments(t,n,r){for(let{blob:i,name:a}of n)try{let e=await i.arrayBuffer(),n=`![[${(await this.plugin.store.saveTaskAttachment(this.project,this.task,a,e)).name}]]`;t.setRangeText(n,t.selectionStart,t.selectionEnd,`end`),this.task.description=t.value,r()}catch(t){console.error(`附件保存失败`,t),new e.Notice(`附件保存失败`)}}changedFields(){let e={};for(let t of Object.keys(this.task))JSON.stringify(this.task[t])!==JSON.stringify(this.original[t])&&Object.assign(e,{[t]:this.task[t]});return e}async runPersist(){if(this.isNew)await this.plugin.store.insertTask(this.project,this.task,this.parentId);else{let e=this.changedFields(),t=this.parentId!==this.originalParentId;if(Object.keys(e).length===0&&!t)return;await this.plugin.store.updateTask(this.project,this.task.id,e),t&&await this.plugin.store.moveTask(this.project,this.task.id,this.parentId)}await this.plugin.store.scheduleAfterChange(this.project,this.task.id),await this.onSave(this.task)}openOverflowMenu(t){let n=new e.Menu;if(this.task.filePath){let e=this.task.filePath;n.addItem(t=>t.setTitle(`作为笔记打开`).setIcon(`file-text`).onClick(()=>{this.saved=!1,this.cancelled=!1,this.close(),this.app.workspace.openLinkText(e,``,!0)})),n.addSeparator()}this.task.archived?n.addItem(t=>t.setTitle(`取消归档`).setIcon(`archive-restore`).onClick(Y(async()=>{await this.plugin.store.unarchiveTask(this.project,this.task.id),new e.Notice(`任务已取消归档`),await this.onSave(this.task),this.cancelled=!0,this.close()}))):n.addItem(t=>t.setTitle(`归档`).setIcon(`archive`).onClick(Y(async()=>{await this.plugin.store.archiveTask(this.project,this.task.id),new e.Notice(`任务已归档`),await this.onSave(this.task),this.cancelled=!0,this.close()}))),n.addItem(e=>e.setTitle(`删除`).setIcon(`trash-2`).setWarning(!0).onClick(Y(async()=>{await Wf(this.app,`确定删除“${this.task.title}”吗？`)&&(await this.plugin.store.deleteTask(this.project,this.task.id),await this.onSave(this.task),this.cancelled=!0,this.close())})));let r=t.getBoundingClientRect();n.showAtPosition({x:r.left,y:r.bottom+4})}render(){let{contentEl:t}=this;t.empty();let n=t.createDiv(`pm-te-header`),r=ud(this.plugin.store.configFor(this.project).priorities,this.task.priority);r?.color&&n.setCssProps({"--pm-accent-strip":r.color});let i=n.createDiv(`pm-te-crumb`);if(this.project.icon){let t=i.createSpan({cls:`pm-te-crumb-icon`});/^[a-z0-9-]+$/.test(this.project.icon)?(0,e.setIcon)(t,this.project.icon):t.setText(this.project.icon)}i.createSpan({cls:`pm-te-crumb-name`,text:this.project.title});let a=i.createSpan({cls:`pm-te-crumb-sep`});(0,e.setIcon)(a,`chevron-right`);let o=i.createSpan({cls:`pm-te-crumb-id pm-te-copyable`,text:this.task.id});if((0,e.setTooltip)(o,`复制任务 ID`),o.addEventListener(`click`,Y(async()=>{await navigator.clipboard.writeText(this.task.id),new e.Notice(`任务 ID 已复制`)})),n.createDiv(`pm-te-header-spacer`),!this.isNew){let t=new e.ExtraButtonComponent(n).setIcon(`more-horizontal`).setTooltip(`更多操作`);t.extraSettingsEl.addClass(`pm-te-header-btn`),t.onClick(()=>this.openOverflowMenu(t.extraSettingsEl))}let s=new e.ExtraButtonComponent(n).setIcon(`x`).setTooltip(`关闭`);s.extraSettingsEl.addClass(`pm-te-header-btn`),s.onClick(()=>{this.cancelled=!0,this.close()});let c=t.createDiv(`pm-te-body`),l=c.createDiv(`pm-te-title-wrap`),u=l.createEl(`textarea`,{cls:`pm-te-title`});u.rows=1,u.value=this.task.title,u.placeholder=`任务标题`,u.spellcheck=!1;let d=()=>{u.setCssProps({"--te-title-height":`auto`}),u.setCssProps({"--te-title-height":u.scrollHeight+`px`})},f=l.createDiv({cls:`pm-modal-title-error`,attr:{hidden:``}}),p=()=>{f.hasAttribute(`hidden`)||(f.setAttribute(`hidden`,``),f.setText(``),u.classList.remove(`pm-input-error`))},m=e=>{f.setText(e),f.removeAttribute(`hidden`),u.classList.add(`pm-input-error`),u.focus(),u.select()};u.addEventListener(`input`,()=>{this.task.title=u.value,p(),d()}),u.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&e.preventDefault()}),window.setTimeout(d,0),u.focus(),this.isNew&&u.select(),Ef(c.createDiv(`pm-te-props`),{task:this.task,project:this.project,plugin:this.plugin,parentId:this.parentId,setParentId:e=>{this.parentId=e},rerender:()=>this.render(),shownExtras:this.shownExtras}),c.createEl(`hr`,{cls:`pm-te-divider`});let h=c.createDiv(`pm-modal-section pm-modal-desc-section`);h.createEl(`h4`,{text:`描述`,cls:`pm-modal-section-title`});let g=h.createDiv(`pm-modal-desc-preview`),_=h.createEl(`textarea`,{cls:`pm-modal-description`});_.placeholder=`添加描述…`,_.value=this.task.description;let v=()=>{let e=[],t=_.parentElement;for(;t;)t.scrollTop>0&&e.push([t,t.scrollTop]),t=t.parentElement;_.setCssProps({"--desc-height":`auto`}),_.setCssProps({"--desc-height":_.scrollHeight+`px`});for(let[t,n]of e)t.scrollTop=n},y=()=>this.task.description.trim().length>0,b=this.task.filePath||this.project.filePath||``,x=new e.Component;x.load();let ee=e=>{let t=0;this.task.description=this.task.description.replace(/^([ \t]*[-*+] \[)([ x])(\])/gm,(n,r,i,a)=>t++===e?r+(i===` `?`x`:` `)+a:n),_.value=this.task.description,re()},te=()=>{g.querySelectorAll(`input[type="checkbox"]`).forEach((e,t)=>{let n=e;n.removeAttribute(`disabled`),n.addEventListener(`click`,e=>{e.preventDefault(),ee(t)})})},ne=()=>{g.querySelectorAll(`a.external-link`).forEach(e=>{e.href.startsWith(`file://`)&&e.addEventListener(`click`,t=>{t.preventDefault(),activeWindow.open(e.href)})})},re=async()=>{x.unload(),x=new e.Component,x.load(),g.empty(),await e.MarkdownRenderer.render(this.app,this.task.description,g,b,x),te(),ne()},ie=e=>{g.classList.add(`pm-hidden`),_.classList.remove(`pm-hidden`),_.value=this.task.description,window.setTimeout(()=>{v(),_.focus(),e!==void 0&&_.setSelectionRange(e,e)},0)},ae=()=>{y()&&(re(),_.classList.add(`pm-hidden`),g.classList.remove(`pm-hidden`))};_.addEventListener(`input`,()=>{this.task.description=_.value,v()}),_.addEventListener(`blur`,()=>ae()),_.addEventListener(`paste`,e=>{let t=e.clipboardData?.items;if(!t)return;let n=[];for(let e of Array.from(t))if(e.kind===`file`&&e.type.startsWith(`image/`)){let t=e.getAsFile();if(t){let r=new Date().toISOString().replace(/[:.]/g,`-`),i=(e.type.split(`/`)[1]||`png`).split(`+`)[0],a=i===`jpeg`?`jpg`:i;n.push({blob:t,name:`Pasted-${r}.${a}`})}}n.length!==0&&(e.preventDefault(),this.insertAttachments(_,n,v))}),h.addEventListener(`dragover`,e=>{e.dataTransfer&&Array.from(e.dataTransfer.types).includes(`Files`)&&e.preventDefault()}),h.addEventListener(`drop`,e=>{let t=e.dataTransfer?.files;if(!t||t.length===0)return;e.preventDefault(),_.classList.contains(`pm-hidden`)&&(ie(),_.selectionStart=_.selectionEnd=_.value.length);let n=Array.from(t).map(e=>({blob:e,name:e.name}));this.insertAttachments(_,n,v)}),this.noteSuggest?.destroy(),this.noteSuggest=new Af(this.app,_,e=>{this.task.description=e,v()}),this.noteSuggest.attach(h);let S=e=>{let t=g.textContent||``,n=this.task.description,r=e=>/\s/.test(e)?` `:e,i=0;for(let a=0;a<e&&a<t.length;a++){let e=r(t[a]);for(;i<n.length&&r(n[i])!==e;)i++;i++}return Math.min(i,n.length)},C=e=>{let t=g.ownerDocument,n=t.caretPositionFromPoint?.(e.clientX,e.clientY),r=n?.offsetNode;if(!r||r.nodeType!==Node.TEXT_NODE||!g.contains(r))return;let i=t.createTreeWalker(g,NodeFilter.SHOW_TEXT),a=0,o=i.nextNode();for(;o&&o!==r;)a+=(o.textContent||``).length,o=i.nextNode();return o?S(a+n.offset):void 0};g.addEventListener(`click`,e=>{let t=e.target;if(t.instanceOf(HTMLInputElement)&&t.type===`checkbox`)return;let n=t.closest(`a`);if(n){if(n.classList.contains(`internal-link`)){e.preventDefault(),e.stopPropagation();let t=n.getAttribute(`data-href`)||n.getAttribute(`href`)||``;this.saved=!1,this.cancelled=!1,this.close(),this.app.workspace.openLinkText(t,b);return}return}if(t.instanceOf(HTMLImageElement))return;let r=activeWindow.getSelection();r&&!r.isCollapsed&&g.contains(r.anchorNode)||ie(C(e))}),y()?(_.classList.add(`pm-hidden`),re()):(g.classList.add(`pm-hidden`),window.setTimeout(v,0)),Of(c,this.task,this.plugin,this.plugin.store.configFor(this.project).statuses),Df(c,this.task);let oe=t.createDiv(`pm-te-footer`);if(!this.isNew&&this.task.filePath){let t=this.task.filePath,n=oe.createSpan({cls:`pm-te-footer-path pm-te-copyable`}),r=n.createSpan({cls:`pm-te-footer-icon`});(0,e.setIcon)(r,`file-text`),n.createSpan({text:t}),(0,e.setTooltip)(n,`复制文件路径`),n.addEventListener(`click`,Y(async()=>{await navigator.clipboard.writeText(t),new e.Notice(`文件路径已复制`)}))}oe.createDiv(`pm-footer-spacer`),new e.ButtonComponent(oe).setButtonText(`取消`).onClick(()=>{this.cancelled=!0,this.close()});let se=new e.ButtonComponent(oe).setButtonText(this.isNew?`创建（Shift+Enter）`:`保存（Shift+Enter）`).setCta(),ce=!1,le=async()=>{if(!ce){ce=!0;try{if(!this.task.title.trim()){u.focus(),u.classList.add(`pm-input-error`);return}p(),await this.persistTask(),this.saved=!0,this.close()}catch(t){if(t instanceof Sd){m(`已存在名为“${t.fileName}”的笔记，请使用其他标题。`);return}console.error(`[PM]`,t),new e.Notice(`操作失败，请查看控制台了解详情。`)}finally{ce=!1}}};se.onClick(()=>{le()}),this.saveKeyHandler&&this.modalEl.removeEventListener(`keydown`,this.saveKeyHandler),this.saveKeyHandler=e=>{e.key===`Enter`&&e.shiftKey&&(e.preventDefault(),le())},this.modalEl.addEventListener(`keydown`,this.saveKeyHandler)}};const Mf=[`#8b72be`,`#7c6b9a`,`#b07d9e`,`#c47070`,`#b8a06b`,`#79b58d`,`#6ba8a0`,`#7a9ec4`,`#767491`,`#8aab6b`],Nf=[`📋`,`🚀`,`💡`,`🎯`,`🔬`,`🏗`,`📊`,`🎨`,`📱`,`🛠`,`📝`,`⚡`];function Pf(e){let{title:t,description:n,color:r,icon:i,customFields:a,teamMembers:o,config:s}=e;return JSON.parse(JSON.stringify({title:t,description:n,color:r,icon:i,customFields:a,teamMembers:o,config:s}))}var Ff=class extends e.Modal{plugin;existingProject;onSave;draft;original;isNew;constructor(e,t,n,r){super(e),this.plugin=t,this.existingProject=n,this.onSave=r,this.isNew=n===null;let i=n??iu(`新项目`,``);this.draft=Pf(i),this.original=Pf(i)}changedFields(){let e={};for(let t of Object.keys(this.draft))JSON.stringify(this.draft[t])!==JSON.stringify(this.original[t])&&Object.assign(e,{[t]:this.draft[t]});return e}onOpen(){this.modalEl.addClass(`pm-modal`,`pm-modal--project`);let e=this.contentEl;e.empty(),e.addClass(`pm-project-modal`),this.buildForm(e)}onClose(){this.contentEl.empty()}buildForm(t){let n=t.createDiv(`pm-project-modal-header`);n.createSpan({text:`✦`,cls:`pm-project-modal-header-icon`}),n.createEl(`h2`,{text:this.isNew?`新建项目`:`项目设置`,cls:`pm-modal-heading`});let r=t.createDiv(`pm-project-top-row`),i=r.createDiv(`pm-icon-picker`),a=i.createEl(`button`,{text:this.draft.icon,cls:`pm-icon-picker-btn`}),o=i.createDiv(`pm-icon-grid`);o.addClass(`pm-hidden`);for(let e of Nf)o.createEl(`button`,{text:e,cls:`pm-icon-option`}).addEventListener(`click`,()=>{this.draft.icon=e,a.textContent=e,o.addClass(`pm-hidden`)});a.addEventListener(`click`,()=>{o.toggleClass(`pm-hidden`,!o.hasClass(`pm-hidden`))});let s=r.createDiv(`pm-project-title-wrap`);s.createEl(`label`,{text:`项目名称`,cls:`pm-label`});let c=s.createEl(`input`,{type:`text`,value:this.draft.title,cls:`pm-input pm-input--lg`});c.placeholder=`请输入项目名称`,c.addEventListener(`input`,()=>{this.draft.title=c.value}),window.setTimeout(()=>{c.focus(),c.select()},50);let l=t.createDiv(`pm-project-modal-section`);l.createEl(`label`,{text:`颜色`,cls:`pm-label`});let u=l.createDiv(`pm-color-palette`);for(let e of Mf){let t=u.createEl(`button`,{cls:`pm-color-swatch`});t.setCssStyles({background:e}),e===this.draft.color&&t.addClass(`pm-color-swatch--selected`),t.addEventListener(`click`,()=>{this.draft.color=e,u.querySelectorAll(`.pm-color-swatch`).forEach(e=>e.removeClass(`pm-color-swatch--selected`)),t.addClass(`pm-color-swatch--selected`)})}let d=u.createEl(`input`,{type:`color`,cls:`pm-color-custom`});d.value=this.draft.color,d.title=`自定义颜色`,d.addEventListener(`change`,()=>{this.draft.color=d.value,u.querySelectorAll(`.pm-color-swatch`).forEach(e=>e.removeClass(`pm-color-swatch--selected`))});let f=t.createDiv(`pm-project-modal-section`);f.createEl(`label`,{text:`描述`,cls:`pm-label`});let p=f.createEl(`textarea`,{cls:`pm-input pm-project-desc`});p.placeholder=`请输入项目说明`,p.value=this.draft.description,p.addEventListener(`input`,()=>{this.draft.description=p.value});let m=t.createDiv(`pm-modal-section`);m.createEl(`label`,{text:`团队成员`,cls:`pm-label`});let h=m.createDiv(`pm-member-list`),g=()=>{h.empty();for(let e=0;e<this.draft.teamMembers.length;e++){let t=h.createDiv(`pm-member-row`),n=this.draft.teamMembers[e]||`?`;new pf(t).setName(n);let r=t.createEl(`input`,{type:`text`,value:this.draft.teamMembers[e],cls:`pm-input pm-member-input`});r.placeholder=`姓名`,r.addEventListener(`change`,()=>{this.draft.teamMembers[e]=r.value,g()}),new Ud(t).setIcon(`x`).setTooltip(`删除成员`).onClick(()=>{this.draft.teamMembers.splice(e,1),g()})}Sf(h,`添加成员`,()=>{this.draft.teamMembers.push(``),g(),window.setTimeout(()=>{let e=h.querySelectorAll(`input`);e[e.length-1]?.focus()},50)})};g();let _=t.createDiv(`pm-modal-section`),v=_.createDiv(`pm-modal-section-header`);v.createSpan({text:`自定义字段`,cls:`pm-modal-subheading`}),v.createSpan({text:`任务的额外属性`,cls:`pm-modal-hint`});let y=_.createDiv(`pm-cf-list`),b=()=>{y.empty();for(let e=0;e<this.draft.customFields.length;e++)this.renderCustomFieldEditor(y,this.draft.customFields[e],e,b);Sf(y,`添加自定义字段`,()=>{this.draft.customFields.push({id:nu(),name:`新字段`,type:`text`,options:[]}),b()})};b(),this.renderPaletteOverride(t,{heading:`阶段`,hint:`项目的阶段显示目录`,toggleLabel:`使用项目自己的阶段目录`,addLabel:`添加阶段`,get:()=>this.draft.config?.stages,set:e=>this.patchConfig(`stages`,e),copyGlobal:()=>this.plugin.settings.stages.map(e=>({...e})),makeEntry:()=>({id:`stage-`+nu().slice(0,6),label:`新阶段`,color:`#8a94a0`,icon:``}),renderEditor:(e,t)=>Xd(e,{app:this.app,priorities:t,onChanged:()=>{}})}),this.renderPaletteOverride(t,{heading:`状态`,hint:`项目的状态显示目录`,toggleLabel:`使用项目自己的状态目录`,addLabel:`添加状态`,get:()=>this.draft.config?.statuses,set:e=>this.patchConfig(`statuses`,e),copyGlobal:()=>this.plugin.settings.statuses.map(e=>({...e})),makeEntry:()=>({id:`status-`+nu().slice(0,6),label:`新状态`,color:`#8a94a0`,icon:``,complete:!1}),renderEditor:(e,t)=>Yd(e,{app:this.app,statuses:t,onChanged:()=>{}})}),this.renderPaletteOverride(t,{heading:`优先级`,hint:`项目的优先级目录`,toggleLabel:`使用项目自己的优先级目录`,addLabel:`添加优先级`,get:()=>this.draft.config?.priorities,set:e=>this.patchConfig(`priorities`,e),copyGlobal:()=>this.plugin.settings.priorities.map(e=>({...e})),makeEntry:()=>({id:`priority-`+nu().slice(0,6),label:`新优先级`,color:`#8a94a0`,icon:``}),renderEditor:(e,t)=>Xd(e,{app:this.app,priorities:t,onChanged:()=>{}})});let x=t.createDiv(`pm-modal-section`),ee=x.createDiv(`pm-modal-section-header`);ee.createSpan({text:`视图与排期`,cls:`pm-modal-subheading`}),ee.createSpan({text:`仅覆盖当前项目的全局设置`,cls:`pm-modal-hint`});let te=x.createDiv(`pm-config-override-grid`);this.renderOverrideSelect(te,`默认视图`,`defaultView`,[{value:`table`,label:`表格`},{value:`gantt`,label:`甘特图`},{value:`kanban`,label:`看板`}]),this.renderOverrideSelect(te,`自动排期`,`autoSchedule`,[{value:!0,label:`开启`},{value:!1,label:`关闭`}]),this.renderOverrideSelect(te,`提前完成时前移后续事项`,`pullForwardOnEarlyFinish`,[{value:!0,label:`开启`},{value:!1,label:`关闭`}]),this.renderOverrideSelect(te,`看板显示子任务`,`kanbanShowSubtasks`,[{value:!0,label:`显示`},{value:!1,label:`隐藏`}]),this.renderOverrideSelect(te,`看板显示描述预览`,`kanbanShowDescriptionPreview`,[{value:!0,label:`显示`},{value:!1,label:`隐藏`}]);let ne=t.createDiv(`pm-modal-footer`);ne.createDiv(`pm-footer-spacer`),new e.ButtonComponent(ne).setButtonText(`取消`).onClick(()=>this.close()),new e.ButtonComponent(ne).setButtonText(this.isNew?`+ 创建项目`:`保存`).setCta().onClick(Y(async()=>{let e=c.value.trim();if(!e){c.addClass(`pm-input-error`),c.focus();return}this.draft.title=e;let t=this.plugin.settings.projectsFolder;if(this.existingProject)await this.plugin.store.updateProject(this.existingProject,this.changedFields()),await this.onSave(this.existingProject);else{let n=iu(e,`${t}/${e.replace(/[\\/:*?"<>|]/g,`-`)}.md`);Object.assign(n,this.draft),await this.plugin.store.ensureFolder(t),await this.plugin.store.saveProject(n),await this.onSave(n)}this.close()}))}patchConfig(e,t){let n=Object.entries({...this.draft.config,[e]:t}).filter(([,e])=>e!==void 0);this.draft.config=n.length?Object.fromEntries(n):void 0}renderPaletteOverride(e,t){let n=e.createDiv(`pm-modal-section`),r=n.createDiv(`pm-modal-section-header`);r.createSpan({text:t.heading,cls:`pm-modal-subheading`}),r.createSpan({text:t.hint,cls:`pm-modal-hint`});let i=n.createEl(`label`,{cls:`pm-status-toggle`}),a=i.createEl(`input`,{type:`checkbox`});a.checked=!!t.get()?.length,i.createSpan({text:t.toggleLabel});let o=n.createDiv(`pm-settings-statuses`),s=n.createDiv(),c=()=>{o.empty(),s.empty();let e=t.get();e?.length&&(t.renderEditor(o,e),Sf(s,t.addLabel,()=>{e.push(t.makeEntry()),c()}))};a.addEventListener(`change`,()=>{t.set(a.checked?t.copyGlobal():void 0),c()}),c()}renderOverrideSelect(e,t,n,r){let i=e.createDiv(`pm-config-override-row`);i.createEl(`label`,{text:t,cls:`pm-label`});let a=i.createEl(`select`,{cls:`pm-input pm-select`}),o=this.draft.config?.[n],s=a.createEl(`option`,{value:``,text:`使用全局设置`});s.selected=o===void 0,r.forEach((e,t)=>{let n=a.createEl(`option`,{value:String(t),text:e.label});o===e.value&&(n.selected=!0)}),a.addEventListener(`change`,()=>{this.patchConfig(n,a.value===``?void 0:r[Number(a.value)].value)})}renderCustomFieldEditor(e,t,n,r){let i=e.createDiv(`pm-cf-row`),a=i.createEl(`input`,{type:`text`,value:t.name,cls:`pm-input pm-cf-name`});a.placeholder=`字段名称`,a.addEventListener(`change`,()=>{this.draft.customFields[n].name=a.value});let o=i.createEl(`select`,{cls:`pm-input pm-select pm-cf-type`});for(let[e,n]of[[`text`,`文本`],[`number`,`数字`],[`date`,`日期`],[`select`,`单选`],[`multiselect`,`多选`],[`person`,`人员`],[`checkbox`,`复选框`],[`url`,`链接`]]){let r=o.createEl(`option`,{value:e,text:n});e===t.type&&(r.selected=!0)}if(o.addEventListener(`change`,()=>{this.draft.customFields[n].type=o.value,r()}),new Ud(i).setIcon(`x`).setTooltip(`移除字段`).onClick(()=>{this.draft.customFields.splice(n,1),r()}),t.type===`select`||t.type===`multiselect`){let e=i.createDiv(`pm-cf-options`),n=t.options??[],r=()=>{e.empty();for(let i=0;i<n.length;i++){let a=e.createDiv(`pm-cf-opt-row`),o=a.createEl(`input`,{type:`text`,value:n[i],cls:`pm-input pm-cf-opt-input`});o.placeholder=`选项 ${i+1}`,o.addEventListener(`change`,()=>{n[i]=o.value,t.options=n}),new Ud(a).setIcon(`x`).setTooltip(`移除选项`).onClick(()=>{n.splice(i,1),t.options=n,r()})}Sf(e,`添加选项`,()=>{n.push(``),t.options=n,r()})};r()}}},If=class extends e.SuggestModal{projects;onChoose;constructor(e,t,n){super(e),this.projects=t,this.onChoose=n,this.setPlaceholder(`选择项目…`)}getSuggestions(e){let t=e.toLowerCase();return this.projects.filter(e=>e.title.toLowerCase().includes(t))}renderSuggestion(e,t){t.createSpan({text:`${e.icon} ${e.title}`})}onChooseSuggestion(e){this.onChoose(e)}},Lf=class extends e.SuggestModal{tasks;onChoose;constructor(e,t,n,r=`选择父任务…`){super(e),this.tasks=t,this.onChoose=n,this.setPlaceholder(r)}getSuggestions(e){let t=e.toLowerCase();return this.tasks.filter(e=>e.title.toLowerCase().includes(t))}renderSuggestion(e,t){t.createSpan({text:e.title})}onChooseSuggestion(e){this.onChoose(e)}};const Rf={DAILY:`daily`,WEEKLY:`weekly`,MONTHLY:`monthly`,YEARLY:`yearly`};function zf(e){let t=e?.match(/FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/);if(!t)return;let n=e?.match(/INTERVAL=(\d+)/);return{interval:Rf[t[1]],every:n?parseInt(n[1],10):1}}function Bf(e){return e?e.slice(0,10):``}function Vf(e,t){let n=e.info,r=ru({title:n.title||e.path.slice(e.path.lastIndexOf(`/`)+1).replace(/\.md$/,``),status:n.status||t.defaultStatus,priority:n.priority||t.defaultPriority,start:Bf(n.scheduled),due:Bf(n.due),completed:Bf(n.completedDate),tags:(n.tags??[]).filter(e=>e!==t.taskTag&&e!==t.archiveTag),recurrence:zf(n.recurrence)});return n.timeEstimate&&n.timeEstimate>0&&(r.timeEstimate=Math.round(n.timeEstimate/60*100)/100),n.dateCreated&&(r.createdAt=n.dateCreated),n.dateModified&&(r.updatedAt=n.dateModified),n.archived&&(r.archived=!0),r}function Hf(e,t){let n=new Map;for(let r of e)n.set(r.path,Vf(r,t));let r=new Map;for(let t of e){let e=t.parentPaths.find(e=>e!==t.path&&n.has(e));if(!e)continue;let i=e,a=!1;for(;i;){if(i===t.path){a=!0;break}i=r.get(i)}a||r.set(t.path,e)}let i=[];for(let t of e){let e=n.get(t.path);if(!e)continue;let a=r.get(t.path);if(a){let t=n.get(a);if(t){e.type=`subtask`,t.subtasks.push(e);continue}}i.push(e)}for(let t of e){let e=n.get(t.path);e&&(e.dependencies=t.blockedByPaths.filter(e=>e!==t.path&&n.has(e)).map(e=>n.get(e)?.id).filter(e=>!!e))}return{roots:i,byPath:n}}var Uf=class extends e.Modal{plugin;files=[];filteredFiles=[];selectedCount=0;searchInput=null;selectAllCheckbox=null;nextButton=null;fileListContainer=null;counterLabel=null;phase=1;defaultStatus;defaultPriority;fileHandling=`move`;project=null;onImportComplete=null;constructor(e,t){super(e),this.plugin=t,this.defaultStatus=ed(t.settings.statuses),this.defaultPriority=td(t.settings.priorities)}get palettes(){return this.project?this.plugin.store.configFor(this.project):this.plugin.settings}onOpen(){let e=this.palettes;this.defaultStatus=ed(e.statuses),this.defaultPriority=td(e.priorities);let{contentEl:t}=this;t.empty(),t.addClass(`import-modal`),this.modalEl.addClass(`import-modal-container`),this.loadVaultFiles(),this.render()}onClose(){this.contentEl.empty()}loadVaultFiles(){let e=this.app.vault.getFiles().filter(e=>e.extension===`md`);this.files=e.map(e=>{let t=e.parent?.path||`/`;return{file:e,folder:t===`/`?`/`:t,selected:!1}}),this.filteredFiles=[...this.files]}render(){this.phase===1?this.renderPhase1():this.renderPhase2()}renderPhase1(){let{contentEl:t}=this;t.empty();let n=t.createDiv(`import-modal-header`);n.createEl(`h2`,{text:`选择要导入的笔记`}),this.counterLabel=n.createDiv(`import-counter`),this.updateCounter();let r=t.createDiv(`import-search-container`);this.searchInput=r.createEl(`input`,{type:`text`,cls:`prompt-input import-search-input`,placeholder:`搜索文件…`}),this.searchInput.addEventListener(`input`,()=>this.handleSearch());let i=t.createDiv(`import-list-wrapper`);this.fileListContainer=i;let a=i.createDiv(`import-select-all-row`);this.selectAllCheckbox=a.createEl(`input`,{type:`checkbox`}),this.selectAllCheckbox.addEventListener(`change`,()=>this.handleSelectAll()),a.createEl(`label`,{text:`全选`}).addEventListener(`click`,()=>{this.selectAllCheckbox&&(this.selectAllCheckbox.checked=!this.selectAllCheckbox.checked,this.handleSelectAll())}),this.renderFileList();let o=t.createDiv(`import-modal-footer`);new e.ButtonComponent(o).setButtonText(`取消`).onClick(()=>this.close()),this.nextButton=new e.ButtonComponent(o).setButtonText(`下一步`).setCta().setDisabled(this.selectedCount===0).onClick(()=>this.handleNext())}renderPhase2(){let{contentEl:t}=this;t.empty(),t.createDiv(`import-options-header`).createEl(`h2`,{text:`导入选项`});let n=t.createDiv(`import-options-content`),r=n.createDiv(`import-option-group`);r.createEl(`label`,{text:`默认状态`});let i=r.createEl(`select`);this.palettes.statuses.forEach(e=>{let t=i.createEl(`option`,{text:e.label});t.value=e.id,e.id===this.defaultStatus&&(t.selected=!0)}),i.addEventListener(`change`,e=>{this.defaultStatus=e.target.value});let a=n.createDiv(`import-option-group`);a.createEl(`label`,{text:`默认优先级`});let o=a.createEl(`select`);this.palettes.priorities.forEach(e=>{let t=o.createEl(`option`,{text:e.label});t.value=e.id,e.id===this.defaultPriority&&(t.selected=!0)}),o.addEventListener(`change`,e=>{this.defaultPriority=e.target.value});let s=n.createDiv(`import-option-group`);s.createEl(`label`,{text:`文件处理方式`});let c=s.createDiv(`import-radio-group`),l=c.createEl(`label`),u=l.createEl(`input`,{type:`radio`});u.name=`file-handling`,u.value=`move`,u.checked=this.fileHandling===`move`,u.addEventListener(`change`,()=>{this.fileHandling=`move`}),l.createSpan({text:`移动到任务目录（默认）`});let d=c.createEl(`label`),f=d.createEl(`input`,{type:`radio`});f.name=`file-handling`,f.value=`copy`,f.checked=this.fileHandling===`copy`,f.addEventListener(`change`,()=>{this.fileHandling=`copy`}),d.createSpan({text:`复制（保留原文件）`});let p=t.createDiv(`import-modal-footer`);new e.ButtonComponent(p).setButtonText(`上一步`).onClick(()=>this.handleBack()),new e.ButtonComponent(p).setButtonText(`导入（${this.selectedCount}）`).setCta().onClick(()=>{this.handleImport()})}applyRowStyles(e,t){e.toggleClass(`import-file-item--selected`,t)}renderFileList(){let e=this.fileListContainer;e&&(e.querySelectorAll(`.import-file-item`).forEach(e=>e.remove()),this.filteredFiles.forEach(t=>{let n=e.createDiv(`import-file-item suggestion-item`);this.applyRowStyles(n,t.selected);let r=n.createEl(`input`,{type:`checkbox`});r.checked=t.selected,r.addEventListener(`change`,e=>{e.stopPropagation(),t.selected=r.checked,this.updateCounter(),this.updateSelectAllCheckbox(),this.updateNextButton(),this.applyRowStyles(n,t.selected)}),n.createSpan({text:t.file.basename,cls:`import-file-name`}),n.createSpan({text:t.folder,cls:`import-file-folder`}),n.addEventListener(`click`,e=>{e.target!==r&&(r.checked=!r.checked,r.dispatchEvent(new Event(`change`,{bubbles:!0})))})}))}handleSearch(){let e=this.searchInput?.value.toLowerCase()||``;this.filteredFiles=this.files.filter(t=>t.file.basename.toLowerCase().includes(e)||t.folder.toLowerCase().includes(e)),this.renderFileList()}handleSelectAll(){let e=this.selectAllCheckbox?.checked||!1;this.filteredFiles.forEach(t=>{t.selected=e}),this.updateCounter(),this.updateNextButton(),this.renderFileList()}updateCounter(){if(!this.counterLabel)return;let e=this.files.filter(e=>e.selected).length;this.selectedCount=e,this.counterLabel.setText(`${e} selected`)}updateSelectAllCheckbox(){if(!this.selectAllCheckbox)return;let e=this.filteredFiles.length>0&&this.filteredFiles.every(e=>e.selected);this.selectAllCheckbox.checked=e}updateNextButton(){this.nextButton?.setDisabled(this.selectedCount===0)}handleNext(){this.selectedCount!==0&&(this.phase=2,this.render())}handleBack(){this.phase=1,this.render()}async handleImport(){if(!this.project){new e.Notice(`导入失败：尚未设置目标项目`,5e3);return}let t=this.files.filter(e=>e.selected).map(e=>e.file),n=0,r=0,i=Pd(this.app),a=i?.hasCapability(`tasks.read`)?i:null,o=[];for(let e of t){let t=this.app.metadataCache.getFileCache(e)?.frontmatter?.[`pm-task`]===!0;if(a&&!t){let t=await a.getTask(e.path).catch(()=>null);if(t){o.push({file:e,info:t});continue}}try{await this.plugin.store.importNoteAsTask(this.project,e,{status:this.defaultStatus,priority:this.defaultPriority,handling:this.fileHandling})===`imported`?r++:n++}catch(t){console.error(`导入 ${e.basename} 失败：`,t),n++}}if(a&&o.length)try{r+=await this.importTaskNotesTasks(a,this.project,o)}catch(e){console.error(`导入 TaskNotes 任务失败：`,e),n+=o.length}this.onImportComplete&&this.onImportComplete();let s=`已导入 ${r} 个任务`;n>0&&(s+=`（跳过 ${n} 个）`),new e.Notice(s,3e3),this.close()}async importTaskNotesTasks(e,t,n){let r=e.hasCapability(`settings.snapshot`)?e.getSettingsSnapshot():{},i=r.taskTag||`task`,a=r.fieldMapping?.archiveTag||`archived`,o=(e,t)=>(e??[]).map(e=>Ld(this.app,e,t)).filter(e=>e!==null),s=n.map(({file:e,info:t})=>({path:e.path,info:t,parentPaths:o(t.projects,e.path),blockedByPaths:o((t.blockedBy??[]).map(e=>typeof e==`string`?e:e.uid),e.path)})),{roots:c,byPath:l}=Hf(s,{defaultStatus:this.defaultStatus,defaultPriority:this.defaultPriority,taskTag:i,archiveTag:a}),u=new Set(s.map(e=>e.info.status).filter(Boolean)),d=new Set(s.map(e=>e.info.priority).filter(Boolean));Rd(e,this.plugin.settings,u,d)>0&&await this.plugin.saveSettings();let f=new Map;for(let{file:e}of n){let t=l.get(e.path);t&&f.set(t.id,e)}return this.plugin.store.importTaskForest(t,c,f,this.fileHandling)}setProject(e){this.project=e}setOnImportComplete(e){this.onImportComplete=e}};function Wf(e,t,n=`删除`){return new Promise(r=>{new Jf(e,t,n,r).open()})}function Gf(e,t){return new Promise(n=>{new Yf(e,t,n).open()})}function Kf(e,t,n=``){return new Promise(r=>{new qf(e,t,n,r).open()})}var qf=class extends e.Modal{label;placeholder;resolve;resolved=!1;constructor(e,t,n,r){super(e),this.label=t,this.placeholder=n,this.resolve=r}finish(e){this.resolved||(this.resolved=!0,this.resolve(e))}onOpen(){let{contentEl:t}=this;this.modalEl.addClass(`pm-prompt-modal`),t.createEl(`p`,{text:this.label,cls:`pm-prompt-text`});let n=t.createEl(`input`,{type:`text`,placeholder:this.placeholder,cls:`pm-prompt-input`}),r=t.createDiv(`pm-modal-btn-row`);new e.ButtonComponent(r).setButtonText(`取消`).onClick(()=>{this.finish(null),this.close()});let i=()=>{let e=n.value.trim();this.finish(e||null),this.close()};new e.ButtonComponent(r).setButtonText(`确定`).setCta().onClick(i),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),i()),e.key===`Escape`&&(e.preventDefault(),this.finish(null),this.close())}),window.setTimeout(()=>n.focus(),10)}onClose(){this.finish(null),this.contentEl.empty()}},Jf=class extends e.Modal{message;confirmLabel;resolve;resolved=!1;constructor(e,t,n,r){super(e),this.message=t,this.confirmLabel=n,this.resolve=r}finish(e){this.resolved||(this.resolved=!0,this.resolve(e))}onOpen(){let{contentEl:t}=this;this.modalEl.addClass(`pm-confirm-modal`),t.createEl(`p`,{text:this.message,cls:`pm-confirm-text`});let n=t.createDiv(`pm-modal-btn-row`);new e.ButtonComponent(n).setButtonText(`取消`).onClick(()=>{this.finish(!1),this.close()}),new e.ButtonComponent(n).setButtonText(this.confirmLabel).setDestructive().onClick(()=>{this.finish(!0),this.close()})}onClose(){this.finish(!1),this.contentEl.empty()}},Yf=class extends e.Modal{taskTitle;resolve;resolved=!1;constructor(e,t,n){super(e),this.taskTitle=t,this.resolve=n}finish(e){this.resolved||(this.resolved=!0,this.resolve(e))}onOpen(){let{contentEl:t}=this;this.modalEl.addClass(`pm-confirm-modal`),t.createEl(`p`,{text:`是否同时复制“${this.taskTitle}”的子任务？`,cls:`pm-confirm-text`});let n=t.createDiv(`pm-modal-btn-row`);new e.ButtonComponent(n).setButtonText(`取消`).onClick(()=>{this.finish(null),this.close()}),new e.ButtonComponent(n).setButtonText(`仅复制任务`).onClick(()=>{this.finish(`task-only`),this.close()}),new e.ButtonComponent(n).setButtonText(`包含子任务`).setCta().onClick(()=>{this.finish(`with-subtasks`),this.close()})}onClose(){this.finish(null),this.contentEl.empty()}};function Q(e,t,n){let r=()=>{new jf(e.app,e,t,n.task??null,n.parentId??null,n.onSave,n.defaults).open()};if(n.task){let t=n.task;(async()=>{await e.store.loadTaskBody(t),r()})()}else r()}function Xf(e,t){let n=()=>{new Ff(e.app,e,t.project??null,t.onSave??(()=>{})).open()};if(t.project){let r=t.project;(async()=>{await e.store.loadProjectBody(r),n()})()}else n()}function Zf(e,t,n){new If(e.app,t,n).open()}function Qf(e,t,n){new Lf(e.app,t,n).open()}function $f(e,t,n){let r=new Uf(e.app,e);r.setProject(t),n&&r.setOnImportComplete(()=>{n()}),r.open()}function ep(e,t,n,r=[],i=[],a=[]){let o=n.sortDir===`asc`?1:-1;switch(n.sortKey){case`title`:return o*e.title.localeCompare(t.title);case`stage`:return o*(ld(e.stage,r)-ld(t.stage,r));case`status`:return o*(nd(e.status,i)-nd(t.status,i));case`priority`:return o*(tp(e.priority,a)-tp(t.priority,a));case`due`:return o*(e.due||`zzz`).localeCompare(t.due||`zzz`);case`assignees`:return o*(e.assignees[0]??``).localeCompare(t.assignees[0]??``);case`progress`:return o*(e.progress-t.progress);default:return 0}}function tp(e,t){let n=t.findIndex(t=>t.id===e);return n>=0?n:999}function np(t,n,r){return t.addItem(e=>e.setTitle(`编辑任务`).setIcon(`pencil`).onClick(()=>{Q(r.plugin,r.project,{task:n,onSave:async()=>{await r.onRefresh()}})})),t.addItem(e=>e.setTitle(`添加子任务`).setIcon(`plus`).onClick(()=>{Q(r.plugin,r.project,{parentId:n.id,onSave:async()=>{await r.onRefresh()}})})),t.addItem(e=>e.setTitle(`复制任务`).setIcon(`copy`).onClick(Y(async()=>{let e=!1;if(n.subtasks.length>0){let t=await Gf(r.plugin.app,n.title);if(t===null)return;e=t===`with-subtasks`}await r.plugin.store.duplicateTask(r.project,n.id,e),await r.onRefresh()}))),t.addSeparator(),n.archived?t.addItem(t=>t.setTitle(`取消归档`).setIcon(`archive-restore`).onClick(Y(async()=>{await r.plugin.store.unarchiveTask(r.project,n.id),new e.Notice(`任务已取消归档`),await r.onRefresh()}))):t.addItem(t=>t.setTitle(`归档`).setIcon(`archive`).onClick(Y(async()=>{await r.plugin.store.archiveTask(r.project,n.id),new e.Notice(`任务已归档`),await r.onRefresh()}))),t.addItem(e=>e.setTitle(`删除任务`).setIcon(`trash`).onClick(Y(async()=>{await Wf(r.plugin.app,`确定删除“${n.title}”吗？`)&&(await r.plugin.store.deleteTask(r.project,n.id),await r.onRefresh())}))),t}var rp=class{el;constructor(e,t){this.el=e.createEl(`tr`,{cls:`pm-table-row`}),this.el.dataset.taskId=t.taskId,t.isDone&&this.el.addClass(`pm-table-row--done`),t.isArchived&&this.el.addClass(`pm-table-row--archived`),t.isSelected&&this.el.addClass(`pm-table-row--selected`),this.el.style.setProperty(`--depth`,String(t.depth)),this.el.addEventListener(`click`,e=>{e.target.closest(`button, input, .pm-chip--interactive, .pm-task-title-text, .pm-table-cell-select, .pm-icon-btn`)||t.onRowClick()})}},ip=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell pm-table-cell-actions`}),new Ud(this.el).setIcon(`more-horizontal`).setTooltip(`任务操作`).setRevealOnHover(!0).onClick(t.onClick)}},ap=class{el;names=[];max=3;size=`md`;constructor(e){this.el=e.createDiv(`pm-avatar-stack`)}setNames(e){return this.names=e,this.render(),this}setMax(e){return this.max=e,this.render(),this}setSize(e){return this.size=e,this.render(),this}render(){this.el.empty();let e=this.names.slice(0,this.max);for(let t of e)new pf(this.el).setName(t).setSize(this.size);let t=this.names.length-e.length;if(t>0){let e=this.el.createSpan({cls:`pm-avatar pm-avatar--more`});e.setText(`+${t}`),this.size===`sm`&&e.addClass(`pm-avatar--sm`)}}},op=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell pm-table-cell-assignees`}),new ap(this.el).setNames(t).setMax(3)}},sp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell`}),this.el.createSpan({text:t||`—`,cls:`pm-cf-value`})}};function cp(e,t,n,r=`md`){let i=new Z(e).setLabel(t).setSize(r);return n===`near`?i.setVariant(`solid`).setColor(`var(--color-orange)`):n===`overdue`&&i.setVariant(`solid`).setColor(`var(--color-red)`).setStrong(),i}var lp=class{el;constructor(e,t){let{task:n}=t;this.el=e.createEl(`td`,{cls:`pm-table-cell`});let r=e=>{vf({container:this.el,display:e,inputType:`date`,value:n.due,onSave:t.onSave})};if(!n.due){let e=new Z(this.el).setLabel(`—`).setColor(`var(--text-faint)`).onClick(t=>{t.stopPropagation(),r(e.el)});return}let i=cp(this.el,$u(n.due),t.urgency);i.onClick(e=>{e.stopPropagation(),r(i.el)})}},up=class{el;constructor(t,n){this.el=t.createDiv({cls:`tree-item-icon collapse-icon pm-collapse-toggle`}),(0,e.setIcon)(this.el,`right-triangle`),this.el.toggleClass(`is-collapsed`,n.collapsed),this.el.setAttr(`aria-label`,n.collapsed?`展开子任务`:`折叠子任务`),this.el.addEventListener(`click`,n.onToggle)}},dp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell-expand`}),t.hasSubtasks&&new up(this.el,{collapsed:t.collapsed,onToggle:t.onToggle})}},fp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell`}),ud(t.priorities,t.task.priority)&&sf(this.el,t.task,t.priorities,t.onChange)}},pp=class{el;fill;labelEl=null;value=0;constructor(e){this.el=e.createDiv(`pm-progress`);let t=this.el.createDiv(`pm-progress-track`);this.fill=t.createDiv(`pm-progress-fill`)}setValue(e){return this.value=Math.max(0,Math.min(100,e)),this.fill.style.width=`${this.value}%`,this.labelEl&&this.labelEl.setText(`${Math.round(this.value)}%`),this}setColor(e){return this.el.style.setProperty(`--pm-progress-color`,e),this}setSize(e){return this.el.toggleClass(`pm-progress--sm`,e===`sm`),this}setShowLabel(e){return e&&!this.labelEl?this.labelEl=this.el.createSpan({cls:`pm-progress-label`,text:`${Math.round(this.value)}%`}):!e&&this.labelEl&&(this.labelEl.remove(),this.labelEl=null),this}},mp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell pm-table-cell-progress`});let n=new pp(this.el).setValue(t.value).setColor(t.color).setShowLabel(!0);n.el.addEventListener(`click`,e=>{e.stopPropagation(),vf({container:this.el,display:n.el,inputType:`number`,value:String(t.value),onSave:e=>t.onSave(Math.max(0,Math.min(100,Math.round(parseFloat(e)||0))))})})}},hp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell-select`});let n=this.el.createEl(`input`,{type:`checkbox`,cls:`pm-select-checkbox`});n.checked=t.checked,n.addEventListener(`click`,e=>{e.stopPropagation(),t.onClick(e)})}},gp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell`}),t.readonly?af(this.el,t.task.status,sd(t.statuses,t.task.status)):sd(t.statuses,t.task.status)?nf(this.el,t.task,t.statuses,t.onChange):af(this.el,t.task.status,void 0)}},_p=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell`}),t.readonly?af(this.el,t.task.stage,cd(t.stages,t.task.stage)):cd(t.stages,t.task.stage)?rf(this.el,t.task,t.stages,t.onChange):af(this.el,t.task.stage,void 0)}};function vp(e,t,n,r=`md`){if(t<=0&&n<=0)return null;let i=n>0?`${t}/${n}h`:`${t}h`,a=new Z(e).setLabel(i).setSize(r);return n>0&&t>n&&a.setVariant(`solid`).setColor(`var(--color-red)`).setStrong(),a}var yp=class{el;constructor(e,t){this.el=e.createEl(`td`,{cls:`pm-table-cell pm-table-cell-time`}),vp(this.el,t.logged,t.estimate)}};function bp(e,t,n){if(t===`zentao`)return null;let r=t===`zentao-requirement`?`需求`:t===`zentao-task`?`任务`:t,i=new Z(e).setLabel(r).setVariant(`outline`).setTag();return t.startsWith(`超时`)?i.setDot(!0).setColor(`var(--color-red)`):n&&i.setDot(!0).setColor(Zu(t)),i}function xp(e){let t=String(e.customFields.zentaoSourceType??``),n=t===`story`?`需求`:t===`task`?`任务`:e.type===`milestone`?`里程碑`:`事项`,r=String(e.customFields.zentaoId??``);return{displayTitle:e.title.replace(/^需求\s*-?\s*#?\d+\s*[·｜|:-]\s*/u,``).replace(/^迭代\s*-?\s*#?\d+\s*[·｜|:-]\s*/u,``).trim()||e.title,typeLabel:n,zentaoId:r}}var Sp=class{el;constructor(e,t){let{task:n}=t,r=xp(n);this.el=e.createEl(`td`,{cls:`pm-table-cell-title`}),this.el.setCssStyles({paddingLeft:`${t.depth*20+8}px`});let i=this.el.createSpan({text:r.displayTitle,cls:`pm-task-title-text`});if(i.addEventListener(`click`,()=>t.onTitleClick()),i.addEventListener(`dblclick`,e=>{t.readonly||(e.stopPropagation(),vf({container:this.el,display:i,inputType:`text`,value:n.title,onSave:t.onTitleSave}))}),t.readonly||new Ud(this.el).setIcon(`plus`).setTooltip(`添加子任务`).setRevealOnHover(!0).onClick(e=>{e.stopPropagation(),t.onAddSubtask()}),n.type===`milestone`&&new Z(this.el).setLabel(`里程碑`).setVariant(`solid`).setSize(`sm`).setColor(`var(--color-purple)`).setTooltip(`里程碑`),n.recurrence&&new Z(this.el).setLabel(`重复`).setVariant(`solid`).setSize(`sm`).setColor(`var(--color-blue)`).setTooltip(`重复任务`),n.archived&&new Z(this.el).setLabel(`已归档`).setVariant(`solid`).setSize(`sm`).setColor(`var(--text-muted)`).setTooltip(`已归档`),n.tags.length){let e=this.el.createDiv(`pm-table-tags`);for(let r of n.tags)bp(e,r,t.showTagColors)}}};function Cp(t,n,r,i,u=`a`){let a=!!n.completed,o=sd(i.statuses,n.status),s=!!n.customFields.zentaoSourceType,{el:c}=new rp(t,{taskId:n.id,depth:r,isDone:a,isArchived:!!n.archived,isSelected:i.state.selectedTaskId===n.id,onRowClick:()=>{i.state.selectedTaskId=n.id,kp(i.state)}});c.addClass(`pm-zentao-type-${Dp(String(n.customFields.zentaoSourceType??`local`))}`),c.addClass(`pm-requirement-group-${u}`),c.addClass(`pm-zentao-stage-${Dp(n.stage||`unset`)}`),c.addClass(`pm-zentao-status-${Dp(n.status||`unset`)}`),new hp(c,{checked:i.state.selectedTaskIds.has(n.id),onClick:e=>{let t=e.target.checked;if(e.shiftKey&&i.state.lastCheckedTaskId){let e=Up(i.state),r=e.indexOf(n.id),a=e.indexOf(i.state.lastCheckedTaskId);if(r!==-1&&a!==-1){let[n,o]=r<a?[r,a]:[a,r];for(let r=n;r<=o;r++)t?i.state.selectedTaskIds.add(e[r]):i.state.selectedTaskIds.delete(e[r]);Vp(i.state)}}else t?i.state.selectedTaskIds.add(n.id):i.state.selectedTaskIds.delete(n.id);i.state.lastCheckedTaskId=n.id,i.onSelectionChange()}}),new dp(c,{hasSubtasks:n.subtasks.length>0,collapsed:n.collapsed,onToggle:Y(async()=>{await i.plugin.toggleTaskCollapsed(i.project,n.id),await i.onRefresh()})}),Tp(c,n),new Sp(c,{task:n,depth:r,showTagColors:i.plugin.settings.showTagColors,onTitleClick:()=>{Q(i.plugin,i.project,{task:n,onSave:async()=>{await i.onRefresh()}})},onTitleSave:async e=>{await i.plugin.store.updateTask(i.project,n.id,{title:e}),await i.onRefresh()},onAddSubtask:()=>{Q(i.plugin,i.project,{parentId:n.id,onSave:async()=>{await i.onRefresh()}})},readonly:s}),new sp(c,id(n.customFields.zentaoModule)),new _p(c,{task:n,stages:i.stages,readonly:s,onChange:Y(async e=>{await i.plugin.store.updateTask(i.project,n.id,{stage:e}),await i.onRefresh()})}),new gp(c,{task:n,statuses:i.statuses,readonly:s,onChange:Y(async e=>{await i.plugin.store.updateTask(i.project,n.id,{status:e}),await i.onRefresh()})}),new fp(c,{task:n,priorities:i.priorities,onChange:Y(async e=>{await i.plugin.store.updateTask(i.project,n.id,{priority:e}),await i.onRefresh()})}),new op(c,n.assignees),new op(c,id(n.customFields.completedBy)?[id(n.customFields.completedBy)]:[]),new lp(c,{task:n,urgency:rd(n,i.statuses),onSave:async e=>{await i.plugin.store.updateTask(i.project,n.id,{due:e}),await i.plugin.store.scheduleAfterChange(i.project,n.id),await i.onRefresh()}}),new mp(c,{value:n.progress,color:o?.color??`var(--interactive-accent)`,onSave:async e=>{await i.plugin.store.updateTask(i.project,n.id,{progress:e}),await i.onRefresh()}}),new yp(c,{logged:gu(n),estimate:projectEstimateHours(n)});for(let e of i.project.customFields.filter(e=>!wp.has(e.id))){let t=n.customFields[e.id];new sp(c,e.id===`storyId`?Ep(i,t):id(t))}new ip(c,{onClick:t=>{let r=new e.Menu;np(r,n,{plugin:i.plugin,project:i.project,onRefresh:i.onRefresh}),r.showAtMouseEvent(t)}})}const wp=new Set([`zentaoType`,`zentaoSourceType`,`zentaoTaskType`,`zentaoId`,`zentaoUrl`,`zentaoStatus`,`zentaoStage`,`zentaoModule`,`executionId`,`storyId`,`sourceUpdatedAt`,`completedBy`]);function Tp(e,t){let n=e.createEl(`td`,{cls:`pm-table-cell pm-table-cell-zentao-id`}),r=xp(t);if(!r.zentaoId)return;let i=id(t.customFields.zentaoUrl),a=i?n.createEl(`a`,{cls:`external-link`,attr:{href:i,target:`_blank`,rel:`noopener noreferrer`}}):n;i&&a.addEventListener(`click`,e=>e.stopPropagation()),new Z(a).setLabel(`${r.typeLabel} #${r.zentaoId}`).setVariant(`plain`).setSize(`sm`).setColor(`var(--text-muted)`)}function Ep(e,t){let n=id(t);if(!n)return``;let r=q(e.project.tasks).find(({task:e})=>String(e.customFields.zentaoSourceType??``)===`story`&&String(e.customFields.zentaoId??``)===n)?.task;return r?`需求 #${n} · ${xp(r).displayTitle}`:`需求 #${n}`}function Dp(e){return e.toLowerCase().replace(/[^a-z0-9_-]+/g,`-`)}function Op(e){if(!e.tableBody)return;let t=e.tableBody.closest(`.pm-table-wrapper`);if(!t)return;let n=t.querySelector(`.pm-select-all-checkbox`);if(!n)return;let r=Up(e);r.length===0?(n.checked=!1,n.indeterminate=!1):r.every(t=>e.selectedTaskIds.has(t))?(n.checked=!0,n.indeterminate=!1):r.some(t=>e.selectedTaskIds.has(t))?(n.checked=!1,n.indeterminate=!0):(n.checked=!1,n.indeterminate=!1)}function kp(e){if(!e.tableBody||(e.tableBody.querySelectorAll(`.pm-table-row--selected`).forEach(e=>e.removeClass(`pm-table-row--selected`)),!e.selectedTaskId))return;let t=e.tableBody.querySelector(`tr[data-task-id="${e.selectedTaskId}"]`);if(!t&&e.wrapper&&e.renderWindow){let n=e.visibleRows.findIndex(t=>t.task.id===e.selectedTaskId);if(n===-1)return;let r=e.wrapper.querySelector(`thead`),i=r instanceof HTMLElement?r.offsetHeight:0;e.wrapper.scrollTop=Math.max(0,n*e.rowHeight+i-e.wrapper.clientHeight/2),e.renderWindow(),t=e.tableBody.querySelector(`tr[data-task-id="${e.selectedTaskId}"]`)}t&&(t.addClass(`pm-table-row--selected`),t.scrollIntoView({block:`nearest`}))}function Ap(e){let t=e.container.createDiv(`pm-table-wrapper`);e.state.wrapper=t;let n=!1;t.addEventListener(`scroll`,()=>{n||(n=!0,window.requestAnimationFrame(()=>{n=!1;let{start:t,end:r}=Np(e.state);(t!==e.state.windowStart||r!==e.state.windowEnd)&&e.state.renderWindow?.()}))});let r=t.createEl(`table`,{cls:`pm-table`}),i=r.createEl(`thead`).createEl(`tr`),a=i.createEl(`th`,{cls:`pm-table-cell-select`}).createEl(`input`,{type:`checkbox`,cls:`pm-select-all-checkbox`});a.addEventListener(`change`,()=>{let t=Up(e.state);if(a.checked)for(let n of t)e.state.selectedTaskIds.add(n);else e.state.selectedTaskIds.clear();Vp(e.state),e.onSelectionChange()});let o=[{id:`expand`,key:null,label:``,width:32},{id:`zentaoId`,key:null,label:`事项 ID`,width:96},{id:`title`,key:`title`,label:`事项`,width:397},{id:`module`,key:null,label:`模块`,width:120},{id:`stage`,key:`stage`,label:`阶段`,width:130},{id:`status`,key:`status`,label:`状态`,width:120},{id:`priority`,key:`priority`,label:`优先级`,width:100},{id:`assignees`,key:`assignees`,label:`负责人`,width:94},{id:`completedBy`,key:null,label:`完成者`,width:102},{id:`due`,key:`due`,label:`截止日期`,width:110},{id:`progress`,key:`progress`,label:`进度`,width:120},{id:`time`,key:null,label:`工时`,width:90}],s=[],c=()=>{for(let{key:t,th:n}of s)n.querySelector(`.pm-sort-indicator`)?.remove(),e.state.sortKey===t&&n.createSpan({text:e.state.sortDir===`asc`?` ↑`:` ↓`,cls:`pm-sort-indicator`})};for(let t of o){let n=i.createEl(`th`);Rp(e,n,t.id,t.width),t.key?(n.addClass(`pm-table-th-sortable`),n.setAttribute(`role`,`button`),n.setAttribute(`aria-label`,`按${t.label}排序`),n.createSpan({text:t.label}),s.push({key:t.key,th:n}),n.addEventListener(`click`,()=>{e.state.sortKey===t.key?e.state.sortDir=e.state.sortDir===`asc`?`desc`:`asc`:(e.state.sortKey=t.key,e.state.sortDir=`asc`),c(),jp(e)})):n.setText(t.label),zp(e,n,t.id)}e.state.updateSortIndicators=c,c();for(let t of Ip(e.project)){let n=i.createEl(`th`,{text:t.name}),r=`custom-${t.id}`;Rp(e,n,r,120),zp(e,n,r)}i.createEl(`th`).setCssStyles({width:`40px`}),e.state.tableBody=r.createEl(`tbody`),Mp(e)}function jp(e){e.state.tableBody&&Mp(e)}function Mp(e){if(!e.state.tableBody)return;let t=q(e.project.tasks),n=Ed(e.state.filter);t=Lp(t,Ad(t,e.state.filter,e.statuses),n);let r=new Set(t.map(e=>e.task.id)),i=new Map;for(let e of t){let t;t=e.parentId===null||n&&!r.has(e.parentId)?null:e.parentId;let a=i.get(t);a||(a=[],i.set(t,a)),a.push(e)}for(let t of i.values())t.sort((t,n)=>ep(t.task,n.task,e.state,e.stages,e.statuses,e.priorities));let a=[],o=e=>{let t=i.get(e);if(t)for(let e of t)a.push(e),o(e.task.id)};o(null);let s=`a`,c=0;for(let e of a){if(e.depth===0&&String(e.task.customFields.zentaoSourceType??``)===`story`)s=c++%2===0?`a`:`b`;e.groupTone=s}e.state.visibleRows=n?a:a.filter(e=>e.visible),e.state.renderWindow=()=>Pp(e),e.state.windowStart=-1,e.state.windowEnd=-1,Pp(e)}function Np(e){if(e.visibleRows.length<=120)return{start:0,end:e.visibleRows.length};let t=e.wrapper;if(!t)return{start:0,end:e.visibleRows.length};let n=t.querySelector(`thead`),r=n instanceof HTMLElement?n.offsetHeight:0,i=Math.max(0,t.scrollTop-r),a=t.clientHeight||600,o=Math.floor(i/e.rowHeight)-8;o<0&&(o=0);let s=Math.ceil((i+a)/e.rowHeight)+8;return s>e.visibleRows.length&&(s=e.visibleRows.length),{start:o,end:s}}function Pp(e){let{state:t}=e,n=t.tableBody;if(!n)return;let r=t.visibleRows,i=14+Ip(e.project).length,{start:a,end:o}=Np(t);t.windowStart=a,t.windowEnd=o,n.empty(),a>0&&Bp(n,i,a*t.rowHeight);for(let t=a;t<o;t++)Cp(n,r[t].task,r[t].depth,e,r[t].groupTone??`a`);if(o<r.length&&Bp(n,i,(r.length-o)*t.rowHeight),Sf(n.createEl(`tr`,{cls:`pm-table-add-row`}).createEl(`td`,{attr:{colspan:String(i)}}),`添加任务`,()=>{Q(e.plugin,e.project,{onSave:()=>e.onRefresh()})}),!t.heightCalibrated){let r=n.querySelector(`tr[data-task-id]`);r instanceof HTMLElement&&r.offsetHeight>0&&(t.heightCalibrated=!0,Math.abs(r.offsetHeight-t.rowHeight)>.5&&(t.rowHeight=r.offsetHeight,Pp(e)))}}const Fp=new Set([`zentaoType`,`zentaoSourceType`,`zentaoTaskType`,`zentaoId`,`zentaoUrl`,`zentaoStatus`,`zentaoStage`,`zentaoModule`,`executionId`,`storyId`,`sourceUpdatedAt`,`completedBy`]);function Ip(e){return e.customFields.filter(e=>!Fp.has(e.id))}function Lp(e,t,n){if(!n)return t;let r=new Map(e.map(e=>[e.task.id,e.parentId])),i=new Set(t.map(e=>e.task.id));for(let e of t){let t=e.parentId;for(;t;)i.add(t),t=r.get(t)??null}return e.filter(e=>i.has(e.task.id))}function Rp(e,t,n,r){let i=e.plugin.settings.tableColumnWidths[n]??r;t.setCssStyles({width:`${i}px`,minWidth:`${i}px`})}function zp(e,t,n){let r=t.createSpan({cls:`pm-table-column-resizer`});r.addEventListener(`pointerdown`,i=>{i.preventDefault(),i.stopPropagation();let a=i.clientX,o=t.getBoundingClientRect().width;r.setPointerCapture(i.pointerId);let s=r=>{let i=Math.max(56,Math.round(o+r.clientX-a));t.setCssStyles({width:`${i}px`,minWidth:`${i}px`}),e.plugin.settings.tableColumnWidths[n]=i},c=()=>{r.removeEventListener(`pointermove`,s),r.removeEventListener(`pointerup`,c),e.plugin.saveSettings()};r.addEventListener(`pointermove`,s),r.addEventListener(`pointerup`,c)})}function Bp(e,t,n){e.createEl(`tr`,{cls:`pm-table-spacer`}).createEl(`td`,{attr:{colspan:String(t)}}).setCssStyles({height:`${n}px`})}function Vp(e){if(!e.tableBody)return;let t=e.tableBody.querySelectorAll(`tr[data-task-id]`);for(let n of Array.from(t)){let t=n.dataset.taskId;if(t===void 0)continue;let r=n.querySelector(`.pm-select-checkbox`);r&&(r.checked=e.selectedTaskIds.has(t))}Op(e)}function Hp(e,t){let n=activeDocument.activeElement,r=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLElement&&n.contentEditable===`true`;if(e.key===`Escape`){if(r){n.blur();return}if(t.state.selectedTaskIds.size>0){t.state.selectedTaskIds.clear(),Vp(t.state),t.onSelectionChange();return}t.state.selectedTaskId=null,kp(t.state);return}if(r)return;let i=Up(t.state);if(i.length)switch(e.key){case`ArrowDown`:case`j`:{e.preventDefault();let n=t.state.selectedTaskId?i.indexOf(t.state.selectedTaskId):-1,r=Math.min(n+1,i.length-1);t.state.selectedTaskId=i[r],kp(t.state);break}case`ArrowUp`:case`k`:{e.preventDefault();let n=t.state.selectedTaskId?i.indexOf(t.state.selectedTaskId):i.length,r=Math.max(n-1,0);t.state.selectedTaskId=i[r],kp(t.state);break}case`Enter`:case`e`:{if(!t.state.selectedTaskId)return;e.preventDefault();let n=J(t.project,t.state.selectedTaskId);n&&Q(t.plugin,t.project,{task:n,onSave:async()=>{await t.onRefresh()}});break}case`Delete`:case`Backspace`:{if(e.preventDefault(),t.state.selectedTaskIds.size>0){t.onBulkDelete();break}if(!t.state.selectedTaskId)return;let n=t.state.selectedTaskId,r=i.indexOf(n),a=r<i.length-1?r+1:r-1;t.state.selectedTaskId=a>=0?i[a]:null,Wp(n,t);break}}}function Up(e){return e.visibleRows.map(e=>e.task.id)}async function Wp(e,t){await t.plugin.store.deleteTask(t.project,e),await t.onRefresh()}function Gp(e){let{ctx:t,onAction:n}=e,r=t.container.querySelector(`.pm-bulk-bar`);if(t.state.selectedTaskIds.size===0){r?.remove();return}qp(r??Kp(t.container),t,n)}function Kp(e){let t=createDiv({cls:`pm-bulk-bar`});return e.prepend(t),t}function qp(t,n,r){t.empty();let i=n.state.selectedTaskIds.size,a=t.createDiv(`pm-bulk-bar-left`);a.createSpan({text:`已选择 ${i} 项`,cls:`pm-bulk-bar-count`}),new e.ButtonComponent(a).setButtonText(`设置阶段`).onClick(t=>{let i=new e.Menu;for(let e of n.stages)i.addItem(t=>t.setTitle(pd(e.icon,e.label)).onClick(()=>r({type:`set-stage`,stage:e.id})));i.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置状态`).onClick(t=>{let i=new e.Menu;for(let e of n.statuses)i.addItem(t=>t.setTitle(pd(e.icon,e.label)).onClick(()=>r({type:`set-status`,status:e.id})));i.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置优先级`).onClick(t=>{let i=new e.Menu;for(let e of n.priorities)i.addItem(t=>t.setTitle(pd(e.icon,e.label)).onClick(()=>r({type:`set-priority`,priority:e.id})));i.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置负责人`).onClick(t=>{let i=new e.Menu,a=mu(n.project.tasks,[...n.project.teamMembers,...n.plugin.settings.globalTeamMembers]);for(let e of a)i.addItem(t=>t.setTitle(e).onClick(()=>r({type:`set-assignee`,assignee:e})));i.addSeparator(),i.addItem(e=>e.setTitle(`+ 新负责人…`).onClick(async()=>{let e=await Kf(n.plugin.app,`请输入负责人姓名：`,`姓名`);e&&r({type:`set-assignee`,assignee:e})})),i.addSeparator(),i.addItem(e=>e.setTitle(`清空负责人`).onClick(()=>r({type:`set-assignee`,assignee:``}))),i.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置标签`).onClick(t=>{let i=new e.Menu,a=hu(n.project.tasks);for(let e of a)i.addItem(t=>t.setTitle(e).onClick(()=>r({type:`set-tag`,tag:e})));i.addSeparator(),i.addItem(e=>e.setTitle(`+ 新标签…`).onClick(async()=>{let e=await Kf(n.plugin.app,`请输入标签：`,`标签`);e&&r({type:`set-tag`,tag:e})})),i.addSeparator(),i.addItem(e=>e.setTitle(`清空标签`).onClick(()=>r({type:`set-tag`,tag:``}))),i.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置截止日期`).onClick(t=>{let n=new e.Menu,i=Zl(),a=e=>i.add({days:e}).toString();n.addItem(e=>e.setTitle(`今天（${a(0)}）`).onClick(()=>r({type:`set-due-date`,due:a(0)}))),n.addItem(e=>e.setTitle(`明天（${a(1)}）`).onClick(()=>r({type:`set-due-date`,due:a(1)}))),n.addItem(e=>e.setTitle(`一周后（${a(7)}）`).onClick(()=>r({type:`set-due-date`,due:a(7)}))),n.addItem(e=>e.setTitle(`两周后（${a(14)}）`).onClick(()=>r({type:`set-due-date`,due:a(14)}))),n.addSeparator(),n.addItem(e=>e.setTitle(`选择日期…`).onClick(()=>{let e=activeDocument.createEl(`input`);e.type=`date`,e.addClass(`pm-offscreen`),activeDocument.body.appendChild(e),e.addEventListener(`change`,()=>{e.value&&r({type:`set-due-date`,due:e.value}),e.remove()}),e.addEventListener(`blur`,()=>window.setTimeout(()=>e.remove(),200)),e.showPicker()})),n.addSeparator(),n.addItem(e=>e.setTitle(`清空截止日期`).onClick(()=>r({type:`set-due-date`,due:``}))),n.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置进度`).onClick(t=>{let n=new e.Menu;for(let e of[0,25,50,75,100])n.addItem(t=>t.setTitle(`${e}%`).onClick(()=>r({type:`set-progress`,progress:e})));n.showAtMouseEvent(t)}),new e.ButtonComponent(a).setButtonText(`设置父事项`).onClick(()=>{let e=new Set(n.state.selectedTaskIds),t=new Set(e);for(let r of e){let e=J(n.project,r);if(e)for(let n of q(e.subtasks))t.add(n.task.id)}let i=q(n.project.tasks).filter(e=>!t.has(e.task.id)).map(e=>e.task);new Lf(n.plugin.app,i,e=>{r({type:`set-parent`,parentId:e.id})}).open()}),new e.ButtonComponent(a).setButtonText(`移除父事项`).onClick(()=>r({type:`remove-parent`}));let o=[...n.state.selectedTaskIds].map(e=>J(n.project,e)).filter(Boolean),s=o.some(e=>e.archived);o.some(e=>!e.archived)&&new e.ButtonComponent(a).setButtonText(`归档`).onClick(()=>r({type:`archive`})),s&&new e.ButtonComponent(a).setButtonText(`取消归档`).onClick(()=>r({type:`unarchive`})),new e.ButtonComponent(a).setButtonText(`删除`).setDestructive().onClick(()=>r({type:`delete`}));let c=t.createDiv(`pm-bulk-bar-right`);new e.ExtraButtonComponent(c).setIcon(`x`).setTooltip(`清空选择`).onClick(()=>{n.state.selectedTaskIds.clear(),n.state.tableBody&&n.state.tableBody.querySelectorAll(`.pm-select-checkbox`).forEach(e=>{e.checked=!1}),Op(n.state),Gp({ctx:n,onAction:r})})}const Jp=e=>`${e} 个事项`;var Yp=class{container;project;plugin;onRefresh;state;pendingScrollTop=null;constructor(e,t,n,r,i,a){this.container=e,this.project=t,this.plugin=n,this.onRefresh=r,this.state={sortKey:a?.sortKey??`stage`,sortDir:a?.sortDir??`asc`,filter:i,selectedTaskId:null,selectedTaskIds:new Set,lastCheckedTaskId:null,tableBody:null,wrapper:null,visibleRows:[],rowHeight:36,heightCalibrated:!1,windowStart:-1,windowEnd:-1,renderWindow:null,updateSortIndicators:null}}getScrollTop(){return this.container.querySelector(`.pm-table-wrapper`)?.scrollTop??0}setPendingScrollTop(e){this.pendingScrollTop=e}getViewState(){return{sortKey:this.state.sortKey,sortDir:this.state.sortDir}}updateFilter(e,t){this.state.filter=e,t&&(this.state.sortKey=t.sortKey??this.state.sortKey,this.state.sortDir=t.sortDir??this.state.sortDir),this.state.selectedTaskId=null,this.state.selectedTaskIds.clear(),this.state.lastCheckedTaskId=null,this.state.updateSortIndicators?.();let n=this.getScrollTop();this.doRefreshTable();let r=this.state.wrapper;r&&(r.scrollTop=Math.min(n,Math.max(0,r.scrollHeight-r.clientHeight)),this.state.renderWindow?.()),this.updateBulkBar()}render(){this.state.tableBody=null,this.container.empty(),this.container.addClass(`pm-table-view`);let e=this.makeTableContext();if(Ap(e),Gp({ctx:e,onAction:Y(e=>this.handleBulkAction(e))}),this.pendingScrollTop!==null){let e=this.container.querySelector(`.pm-table-wrapper`);e&&(e.scrollTop=this.pendingScrollTop,this.state.renderWindow?.()),this.pendingScrollTop=null}}handleKeyDown(e){Hp(e,this.makeTableContext())}refresh(){this.doRefreshTable(),this.updateBulkBar()}doRefreshTable(){this.state.tableBody?jp(this.makeTableContext()):this.render()}async handleBulkAction(t){let n=[...this.state.selectedTaskIds];if(n.length)try{switch(t.type){case`set-stage`:await this.plugin.store.updateTasks(this.project,this.localEditableIds(n),{stage:t.stage});break;case`set-status`:await this.plugin.store.updateTasks(this.project,this.localEditableIds(n),{status:t.status});break;case`set-priority`:await this.plugin.store.updateTasks(this.project,n,{priority:t.priority});break;case`set-assignee`:t.assignee===``?await this.plugin.store.updateTasks(this.project,n,{assignees:[]}):await this.bulkAddToArray(n,`assignees`,t.assignee);break;case`set-tag`:t.tag===``?await this.plugin.store.updateTasks(this.project,n,{tags:[]}):await this.bulkAddToArray(n,`tags`,t.tag);break;case`set-due-date`:if(await this.plugin.store.updateTasks(this.project,n,{due:t.due}),this.plugin.store.configFor(this.project).autoSchedule)for(let e of n)await this.plugin.store.scheduleAfterChange(this.project,e);break;case`set-progress`:await this.plugin.store.updateTasks(this.project,n,{progress:t.progress});break;case`set-parent`:await this.plugin.store.moveTasks(this.project,n,t.parentId),new e.Notice(`已将 ${Jp(n.length)}移动到新的父事项下`);break;case`remove-parent`:await this.plugin.store.moveTasks(this.project,n,null),new e.Notice(`已将 ${Jp(n.length)}移动到顶层`);break;case`archive`:for(let e of n)await this.plugin.store.archiveTask(this.project,e);new e.Notice(`已归档 ${Jp(n.length)}`);break;case`unarchive`:for(let e of n)await this.plugin.store.unarchiveTask(this.project,e);new e.Notice(`已取消归档 ${Jp(n.length)}`);break;case`delete`:if(!await Wf(this.plugin.app,`确定删除 ${Jp(n.length)}吗？此操作无法撤销。`))return;await this.plugin.store.deleteTasks(this.project,n)}this.state.selectedTaskIds.clear(),await this.onRefresh()}catch(t){console.error(`批量操作失败`,t),new e.Notice(`批量操作失败，请重试。`),await this.onRefresh()}}async bulkAddToArray(e,t,n){await this.plugin.store.updateTasks(this.project,e,e=>e[t].includes(n)?null:{[t]:[...e[t],n]})}localEditableIds(e){return e.filter(e=>{let t=J(this.project,e);return t&&!t.customFields.zentaoSourceType})}updateBulkBar(){Gp({ctx:this.makeTableContext(),onAction:Y(e=>this.handleBulkAction(e))})}makeTableContext(){let e=this.plugin.store.configFor(this.project);return{container:this.container,project:this.project,plugin:this.plugin,stages:e.stages,statuses:e.statuses,priorities:e.priorities,state:this.state,onRefresh:this.onRefresh,onSelectionChange:()=>{Op(this.state),this.updateBulkBar()},onBulkDelete:Y(()=>this.handleBulkAction({type:`delete`}))}}},Xp=class{el;constructor(t,n){this.el=t.createDiv(`pm-segmented`);let r=new Map;for(let t of n.options){let i=new e.ButtonComponent(this.el).setButtonText(t.label).onClick(()=>{for(let[e,n]of r)e===t.id?n.setCta():n.removeCta();n.onChange(t.id)});t.id===n.active&&i.setCta(),r.set(t.id,i)}}};const Zp={day:44,week:22,month:9,quarter:5},Qp={day:30,week:90,month:365,quarter:365};function $p(e,t){let n=q(e).map(e=>e.task),r=[];for(let e of n){let t=K(e.start),n=K(e.due);t&&r.push(t),n&&r.push(n)}let i=Zl();r.push(i);let a=r.reduce((e,t)=>G.PlainDate.compare(t,e)<0?t:e,r[0]),o=r.reduce((e,t)=>G.PlainDate.compare(t,e)>0?t:e,r[0]);a=a.subtract({days:7}),o=o.add({days:14});let s=o.since(a,{largestUnit:`days`}).days;if(s<Qp[t]){let e=Math.ceil((Qp[t]-s)/2);a=a.subtract({days:e}),o=o.add({days:e})}(t===`week`||t===`month`||t===`quarter`)&&(a=a.with({day:1}));let c=Zp[t],l=o.since(a,{largestUnit:`days`}).days;return{startDate:a,endDate:o,dayWidth:c,granularity:t,totalDays:l,totalWidth:l*c}}function $(e,t){return t.since(e.startDate,{largestUnit:`days`}).days*e.dayWidth}function em(e,t){return e.startDate.add({days:Math.round(t/e.dayWidth)})}function tm(e){let t=[],{startDate:n,totalDays:r,dayWidth:i,granularity:a}=e;for(let e=0;e<=r;e++){let r=n.add({days:e}),o=e*i;a===`day`?t.push(o):a===`week`?(r.dayOfWeek===1||r.dayOfWeek===4)&&t.push(o):a===`month`?(r.day===1||r.day===8||r.day===15||r.day===22)&&t.push(o):a===`quarter`&&r.day===1&&t.push(o)}return t}function nm(e,t,n){let r=e,i=1/0;for(let a of t){let t=Math.abs(e-a);if(t<i&&(i=t,r=a),a>e+n)break}return i<=n?r:e}function rm(e){return e.weekOfYear??0}function im(){return{isDragging:!1,dragSide:null,dragTask:null,dragStartX:0,dragBarEl:null,dragInitialX:0,dragInitialW:0,dragMoved:!1}}function am(t,n,r,i,a,o,s,c,l,u,d,f){let p=null;return t.addEventListener(`mousedown`,t=>{t.stopPropagation(),t.preventDefault(),l.isDragging=!0,l.dragMoved=!1,l.dragSide=n,l.dragTask=r,l.dragStartX=t.clientX,l.dragBarEl=i,l.dragInitialX=o,l.dragInitialW=s;let m=tm(c),h=c.dayWidth*.4,g=e=>{if(!l.isDragging||!l.dragBarEl)return;let t=e.clientX-l.dragStartX;Math.abs(t)>3&&(l.dragMoved=!0);let n=l.dragInitialX,r;l.dragSide===`left`?(n=Math.max(0,l.dragInitialX+t),n=nm(n,m,h),r=l.dragInitialX+l.dragInitialW-n):(r=l.dragInitialW+t,r=nm(n+r,m,h)-n),r=Math.max(c.dayWidth,r),l.dragBarEl.setAttribute(`x`,String(n)),l.dragBarEl.setAttribute(`width`,String(r)),sm(a,n,r)},_=Y(async()=>{if(activeDocument.removeEventListener(`mousemove`,g),activeDocument.removeEventListener(`mouseup`,_),p=null,!l.isDragging||!l.dragTask||!l.dragBarEl||(l.isDragging=!1,!l.dragMoved))return;let t=parseFloat(l.dragBarEl.getAttribute(`x`)??`0`),n=parseFloat(l.dragBarEl.getAttribute(`width`)??`0`),r=nm(t,m,h),i=nm(t+n,m,h),o=l.dragTask.id,s=l.dragTask.start,v=l.dragTask.due,y={};l.dragSide===`left`?y.start=em(c,r).toString():y.due=em(c,i).subtract({days:1}).toString();try{await u.store.updateTask(d,o,y)}catch(t){l.dragBarEl.setAttribute(`x`,String(l.dragInitialX)),l.dragBarEl.setAttribute(`width`,String(l.dragInitialW)),sm(a,l.dragInitialX,l.dragInitialW),new e.Notice(`保存日期变更失败，请重试。`),console.error(`GanttDragHandler: save failed`,t);return}let b={...y};u.pushUndo({undo:async()=>{await u.store.updateTask(d,o,{start:s,due:v}),u.store.configFor(d).autoSchedule&&new e.Notice(`日期已恢复，相关依赖事项的日期可能需要重新调整。`),await f()},redo:async()=>{await u.store.updateTask(d,o,b),await u.store.scheduleAfterChange(d,o),await f()}}),await u.store.scheduleAfterChange(d,l.dragTask.id),await f()});activeDocument.addEventListener(`mousemove`,g),activeDocument.addEventListener(`mouseup`,_),p=()=>{activeDocument.removeEventListener(`mousemove`,g),activeDocument.removeEventListener(`mouseup`,_)}}),()=>{p&&(p(),p=null,l.isDragging=!1,l.dragBarEl=null)}}function om(t,n,r,i,a,o,s,c,l,u){let d=null;return t.addEventListener(`mousedown`,f=>{if(f.button!==0)return;f.preventDefault(),s.isDragging=!0,s.dragMoved=!1,s.dragSide=`move`,s.dragTask=r,s.dragStartX=f.clientX,s.dragBarEl=t,s.dragInitialX=i,s.dragInitialW=a;let p=tm(o),m=o.dayWidth*.4,h=i,g=e=>{if(!s.isDragging||!s.dragBarEl)return;let t=e.clientX-s.dragStartX;Math.abs(t)>3&&(s.dragMoved=!0),h=Math.max(0,s.dragInitialX+t),h=nm(h,p,m);let r=h-s.dragInitialX;n.setAttribute(`transform`,`translate(${r}, 0)`)},_=Y(async()=>{if(activeDocument.removeEventListener(`mousemove`,g),activeDocument.removeEventListener(`mouseup`,_),t.classList.remove(`pm-gantt-bar-grabbing`),d=null,!s.isDragging||!s.dragTask||!s.dragBarEl)return;if(s.isDragging=!1,!s.dragMoved){n.removeAttribute(`transform`);return}let r=s.dragTask.id,i=s.dragTask.start,a=s.dragTask.due,f=nm(h,p,m),v=nm(f+s.dragInitialW,p,m),y=em(o,f),b=em(o,v).subtract({days:1}),x={start:y.toString(),due:b.toString()};try{await c.store.updateTask(l,r,x)}catch(t){n.removeAttribute(`transform`),new e.Notice(`保存日期变更失败，请重试。`),console.error(`GanttDragHandler: move save failed`,t);return}let ee={...x};c.pushUndo({undo:async()=>{await c.store.updateTask(l,r,{start:i,due:a}),c.store.configFor(l).autoSchedule&&new e.Notice(`日期已恢复，相关依赖事项的日期可能需要重新调整。`),await u()},redo:async()=>{await c.store.updateTask(l,r,ee),await c.store.scheduleAfterChange(l,r),await u()}}),await c.store.scheduleAfterChange(l,s.dragTask.id),await u()});t.classList.add(`pm-gantt-bar-grabbing`),activeDocument.addEventListener(`mousemove`,g),activeDocument.addEventListener(`mouseup`,_),d=()=>{activeDocument.removeEventListener(`mousemove`,g),activeDocument.removeEventListener(`mouseup`,_)}}),()=>{d&&(d(),d=null,s.isDragging=!1,s.dragBarEl=null)}}function sm(e,t,n){let r=e.querySelector(`.pm-gantt-bar-label`);r&&(r.setAttribute(`x`,String(t+8)),n<=55?r.setAttribute(`visibility`,`hidden`):r.removeAttribute(`visibility`));let i=e.querySelectorAll(`.pm-gantt-drag-handle`);i.length===2&&(i[0].setAttribute(`x`,String(t)),i[1].setAttribute(`x`,String(t+n-8)));let a=e.querySelector(`.pm-gantt-bar-progress`);a&&a.setAttribute(`x`,String(t));let o=e.querySelector(`.pm-gantt-bar-icon`);o&&o.setAttribute(`x`,String(t+n+4))}function cm(){return{active:!1,taskId:null,side:null,dotEl:null}}function lm(e){e.dotEl&&e.dotEl.classList.remove(`pm-gantt-link-dot--active`),e.active=!1,e.taskId=null,e.side=null,e.dotEl=null}function um(t,n,r,i,a,o,s){if(!i.active){i.active=!0,i.taskId=n,i.side=r,i.dotEl=t,t.classList.add(`pm-gantt-link-dot--active`);return}if(i.taskId===n){lm(i);return}let c=i.taskId;if(c===null){lm(i);return}if(i.side===r){new e.Notice(`请从右侧连接点（输出）连接到左侧连接点（输入）。`);return}let l=r===`right`?n:c,u=r===`left`?n:c;lm(i);let d=dm(o.tasks),f=d.find(e=>e.id===u);if(f?.dependencies?.includes(l)){new e.Notice(`该依赖关系已存在。`);return}if(d.find(e=>e.id===l)?.dependencies?.includes(u)){new e.Notice(`反向依赖已存在，继续连接会形成循环依赖。`);return}let p=[...f?.dependencies??[],l];Y(async()=>{try{await a.store.updateTask(o,u,{dependencies:p})}catch(t){new e.Notice(`保存依赖关系失败。`),console.error(`GanttLinkHandler: save failed`,t);return}await a.store.scheduleAfterChange(o,u),await s()})()}function dm(e){let t=[],n=e=>{for(let r of e)t.push(r),r.subtasks.length&&n(r.subtasks)};return n(e),t}function fm(e,t){let n=e.add({days:t-1}),r=e.toLocaleString(void 0,{month:`short`});if(e.month===n.month)return`${r} ${e.day}–${n.day}`;let i=n.toLocaleString(void 0,{month:`short`});return`${r} ${e.day} – ${i} ${n.day}`}function pm(e,t,n,r){if(r===`weekNumber`)return`W${n}`;let i=fm(e,t);return r===`dateRange`?i:`W${n}: ${i}`}function mm(e){let t=X(`g`,{class:`pm-gantt-header`});t.appendChild(X(`rect`,{x:0,y:0,width:e.cfg.totalWidth,height:56,class:`pm-gantt-header-bg`}));let{granularity:n}=e.cfg;n===`day`?hm(t,e):n===`week`?gm(t,e):n===`month`?_m(t,e):vm(t,e),e.headerSvgEl.appendChild(t)}function hm(e,t){let{startDate:n,totalDays:r,dayWidth:i}=t.cfg;ym(e,0,24,t);for(let t=0;t<r;t++){let r=n.add({days:t}),a=t*i;if((r.dayOfWeek===6||r.dayOfWeek===7)&&e.appendChild(X(`rect`,{x:a,y:24,width:i,height:32,class:`pm-gantt-weekend-header`})),i>=20){let t=X(`text`,{x:a+i/2,y:42,class:`pm-gantt-header-day`});t.textContent=String(r.day),e.appendChild(t)}}}function gm(e,t){let{startDate:n,totalDays:r,dayWidth:i}=t.cfg;ym(e,0,24,t);let a=n.dayOfWeek===1?0:8-n.dayOfWeek,o=t.plugin.settings.ganttWeekLabel;if(a>0){let t=rm(n),r=X(`text`,{x:a*i/2,y:44,class:`pm-gantt-header-week`});r.textContent=pm(n,a,t,o),e.appendChild(r)}let s=a;for(;s<r;){let t=n.add({days:s}),a=rm(t),c=s*i,l=Math.min(7,r-s),u=X(`text`,{x:c+l*i/2,y:44,class:`pm-gantt-header-week`});u.textContent=pm(t,l,a,o),e.appendChild(u),e.appendChild(X(`line`,{x1:c,y1:24,x2:c,y2:56,class:`pm-gantt-header-tick`})),s+=7}}function _m(e,t){bm(e,0,24,t);let n=t.cfg.startDate.with({day:1});for(;G.PlainDate.compare(n,t.cfg.endDate)<0;){let r=n.add({months:1}),i=Math.max(0,$(t.cfg,n)),a=X(`text`,{x:i+(Math.min(t.cfg.totalWidth,$(t.cfg,r))-i)/2,y:44,class:`pm-gantt-header-month`});a.textContent=n.toLocaleString(void 0,{month:`short`}),e.appendChild(a),e.appendChild(X(`line`,{x1:i,y1:24,x2:i,y2:56,class:`pm-gantt-header-tick`})),n=r}}function vm(e,t){bm(e,0,24,t);let{startDate:n}=t.cfg,r=G.PlainDate.from({year:n.year,month:Math.floor((n.month-1)/3)*3+1,day:1});for(;G.PlainDate.compare(r,t.cfg.endDate)<0;){let n=Math.floor((r.month-1)/3)+1,i=r.add({months:3}),a=Math.max(0,$(t.cfg,r)),o=X(`text`,{x:a+(Math.min(t.cfg.totalWidth,$(t.cfg,i))-a)/2,y:44,class:`pm-gantt-header-quarter`});o.textContent=`${r.year}年第${n}季度`,e.appendChild(o),r=i}}function ym(e,t,n,r){let i=r.cfg.startDate.with({day:1});for(;G.PlainDate.compare(i,r.cfg.endDate)<0;){let a=i.add({months:1}),o=Math.max(0,$(r.cfg,i)),s=Math.min(r.cfg.totalWidth,$(r.cfg,a))-o;e.appendChild(X(`rect`,{x:o,y:t,width:s,height:n,class:(i.month-1)%2==0?`pm-gantt-band-even`:`pm-gantt-band-odd`}));let c=X(`text`,{x:o+6,y:t+n-6,class:`pm-gantt-header-month-top`});c.textContent=i.toLocaleString(void 0,{month:`short`,year:`2-digit`}),e.appendChild(c),i=a}}function bm(e,t,n,r){let i=G.PlainDate.from({year:r.cfg.startDate.year,month:1,day:1});for(;G.PlainDate.compare(i,r.cfg.endDate)<0;){let a=i.add({years:1}),o=Math.max(0,$(r.cfg,i)),s=Math.min(r.cfg.totalWidth,$(r.cfg,a));e.appendChild(X(`rect`,{x:o,y:t,width:s-o,height:n,class:i.year%2==0?`pm-gantt-band-even`:`pm-gantt-band-odd`}));let c=X(`text`,{x:o+6,y:t+n-6,class:`pm-gantt-header-year`});c.textContent=String(i.year),e.appendChild(c),i=a}}function xm(e,t,n,r,i){let a=K(t.start),o=K(t.due);if(!a&&!o){Sm(e,t,n,i);return}let s=sd(i.statuses,t.status),c=s?.color??getComputedStyle(i.svgEl).getPropertyValue(`--interactive-accent`).trim(),l=56+n*44,u=l+8;if(e.appendChild(X(`rect`,{x:0,y:l,width:i.cfg.totalWidth,height:44,class:`pm-gantt-row-hover`})),t.type===`milestone`){Cm(e,t,n,c,i);return}let d=a??o;if(!d)return;let f=(o??d).add({days:1}),p=Math.max(0,$(i.cfg,d)),m=Math.min(i.cfg.totalWidth,$(i.cfg,f)),h=Math.max(8,m-p),g=X(`g`,{class:`pm-gantt-bar-group`});e.appendChild(g);let _=X(`rect`,{x:p,y:u,width:h,height:28,rx:7,ry:7,fill:c,opacity:.4,class:`pm-gantt-bar`});if(g.appendChild(_),t.progress>0){let e=t.progress/100*h;g.appendChild(X(`rect`,{x:p,y:u,width:e,height:28,rx:7,ry:7,fill:c,opacity:.9,class:`pm-gantt-bar-progress`}))}if(t.recurrence){let e=X(`text`,{x:p+h+4,y:u+14+5,class:`pm-gantt-bar-icon`});e.textContent=`↻`,g.appendChild(e)}if(h>55){let e=X(`text`,{x:p+8,y:u+14+5,class:`pm-gantt-bar-label`}),n=Math.max(4,Math.floor((h-16)/7.5));e.textContent=t.title.length>n?t.title.slice(0,n-1)+`…`:t.title,g.appendChild(e)}let v=X(`title`,{}),y=t.assignees.length?`\nAssignees: ${t.assignees.join(`, `)}`:``;v.textContent=`${t.title}\n${s?.label??t.status} \u00b7 ${t.priority}\nStart: ${t.start||`—`}  Due: ${t.due||`—`}\nProgress: ${t.progress}%${y}`,_.appendChild(v);for(let e of[`left`,`right`]){let n=X(`rect`,{x:e===`left`?p:p+h-8,y:u,width:8,height:28,rx:3,ry:3,class:`pm-gantt-drag-handle`,cursor:`ew-resize`}),r=am(n,e,t,_,g,p,h,i.cfg,i.drag,i.plugin,i.project,i.onRefresh);i.cleanupFns.push(r),g.appendChild(n)}for(let e of[`left`,`right`]){let n=X(`circle`,{cx:e===`left`?p-4-4:p+h+4+4,cy:u+14,r:4,class:`pm-gantt-link-dot`,cursor:`crosshair`});n.addEventListener(`mousedown`,e=>{e.stopPropagation()}),n.addEventListener(`click`,r=>{r.stopPropagation(),um(n,t.id,e,i.link,i.plugin,i.project,i.onRefresh)}),g.appendChild(n)}if(t.start&&t.due){let e=om(_,g,t,p,h,i.cfg,i.drag,i.plugin,i.project,i.onRefresh);i.cleanupFns.push(e),_.setAttribute(`cursor`,`grab`)}else _.setAttribute(`cursor`,`pointer`);_.addEventListener(`click`,()=>{if(i.drag.dragMoved){i.drag.dragMoved=!1;return}Q(i.plugin,i.project,{task:t,onSave:()=>i.onRefresh()})})}function Sm(t,n,r,i){let a=56+r*44,o=X(`rect`,{x:0,y:a,width:i.cfg.totalWidth,height:44,fill:`transparent`,cursor:`cell`,class:`pm-gantt-empty-row-hit`}),s=X(`rect`,{x:0,y:a+8,width:Math.max(i.cfg.dayWidth,8),height:28,rx:7,ry:7,class:`pm-gantt-empty-row-preview`,"pointer-events":`none`});s.classList.add(`pm-hidden`),t.appendChild(o),t.appendChild(s);let c=tm(i.cfg),l=i.cfg.dayWidth*.4;o.addEventListener(`mousemove`,e=>{let t=i.svgEl.getBoundingClientRect(),n=nm(e.clientX-t.left,c,l);s.setAttribute(`x`,String(n)),s.classList.remove(`pm-hidden`)}),o.addEventListener(`mouseleave`,()=>{s.classList.add(`pm-hidden`)}),o.addEventListener(`click`,Y(async t=>{let r=i.svgEl.getBoundingClientRect(),a=nm(t.clientX-r.left,c,l),o=em(i.cfg,a).toString();try{await i.plugin.store.updateTask(i.project,n.id,{start:o,due:o})}catch(t){new e.Notice(`设置事项日期失败，请重试。`),console.error(`GanttTaskBarRenderer: click-to-set-dates failed`,t);return}await i.plugin.store.scheduleAfterChange(i.project,n.id),await i.onRefresh()}));let u=X(`title`,{});u.textContent=`点击设置日期`,o.appendChild(u)}function Cm(e,t,n,r,i){let a=K(t.due)??K(t.start);if(!a)return;let o=$(i.cfg,a)+i.cfg.dayWidth/2,s=56+n*44+22,c=X(`polygon`,{points:`${o},${s-12} ${o+12},${s} ${o},${s+12} ${o-12},${s}`,fill:r,opacity:.8,class:`pm-gantt-milestone`,cursor:`pointer`});e.appendChild(c);let l=X(`title`,{});l.textContent=`${t.title} (milestone)\nDate: ${t.due||t.start||`—`}`,c.appendChild(l),c.addEventListener(`click`,()=>{Q(i.plugin,i.project,{task:t,onSave:()=>i.onRefresh()})})}function wm(e){let t=e.flatTasks.filter(e=>e.task.type===`milestone`&&(e.task.due||e.task.start));if(!t.length)return;let n=X(`g`,{class:`pm-gantt-milestone-labels`});for(let{task:r}of t){let t=K(r.due)??K(r.start);if(!t)continue;let i=$(e.cfg,t)+e.cfg.dayWidth/2,a=sd(e.statuses,r.status)?.color??getComputedStyle(e.svgEl).getPropertyValue(`--interactive-accent`).trim(),o=56+e.flatTasks.filter(e=>e.visible||e.depth===0).length*44;n.appendChild(X(`line`,{x1:i,y1:56,x2:i,y2:o,stroke:a,"stroke-width":1,"stroke-dasharray":`4 4`,opacity:.4}));let s=X(`text`,{x:i,y:14,"text-anchor":`middle`,class:`pm-gantt-milestone-label`,fill:a});s.textContent=r.title.length>16?r.title.slice(0,14)+`…`:r.title,e.headerSvgEl.appendChild(s)}e.svgEl.appendChild(n)}function Tm(e){let t=new Map;e.flatTasks.forEach((e,n)=>t.set(e.task.id,n));let n=X(`g`,{class:`pm-gantt-arrows`});for(let{task:r}of e.flatTasks){if(!r.dependencies?.length)continue;let i=t.get(r.id);if(i===void 0)continue;let a=56+i*44+22,o=K(r.start);if(!o)continue;let s=$(e.cfg,o);for(let i of r.dependencies){let r=t.get(i);if(r===void 0)continue;let o=e.flatTasks.find(e=>e.task.id===i)?.task,c=o?K(o.due):null;if(!c)continue;let l=$(e.cfg,c.add({days:1})),u=56+r*44+22,d=(l+s)/2;n.appendChild(X(`path`,{d:`M ${l} ${u} C ${d} ${u}, ${d} ${a}, ${s} ${a}`,class:`pm-gantt-arrow`,"marker-end":`url(#pm-arrowhead)`}))}}let r=Em(e.svgEl),i=X(`marker`,{id:`pm-arrowhead`,markerWidth:8,markerHeight:8,refX:6,refY:3,orient:`auto`});i.appendChild(X(`path`,{d:`M0,0 L0,6 L8,3 z`,class:`pm-gantt-arrowhead`})),r.appendChild(i),e.svgEl.appendChild(n)}function Em(e){return e.querySelector(`defs`)??(()=>{let t=X(`defs`,{});return e.insertBefore(t,e.firstChild),t})()}function Dm(e,t){let n=X(`g`,{class:`pm-gantt-grid`}),r=56+t*44,{startDate:i,totalDays:a,dayWidth:o,granularity:s}=e.cfg;for(let e=0;e<a;e++){let t=i.add({days:e}),a=e*o,c=t.dayOfWeek===6||t.dayOfWeek===7,l=t.dayOfWeek===1,u=t.day===1;c&&s===`day`&&n.appendChild(X(`rect`,{x:a,y:56,width:o,height:r-56,class:`pm-gantt-weekend`})),(s===`day`&&l||s===`week`&&l||s===`month`&&u||s===`quarter`&&u&&(t.month-1)%3==0)&&n.appendChild(X(`line`,{x1:a,y1:56,x2:a,y2:r,class:`pm-gantt-gridline-v`}))}for(let r=0;r<=t;r++){let t=56+r*44;n.appendChild(X(`line`,{x1:0,y1:t,x2:e.cfg.totalWidth,y2:t,class:`pm-gantt-gridline-h`}))}e.svgEl.appendChild(n)}function Om(e,t){let n=$(e.cfg,Zl());n<0||n>e.cfg.totalWidth||(e.svgEl.appendChild(X(`line`,{x1:n,y1:48,x2:n,y2:t,class:`pm-gantt-today-line`})),e.headerSvgEl.appendChild(X(`polygon`,{points:`${n},40 ${n+6},48 ${n},56 ${n-6},48`,class:`pm-gantt-today-diamond`})))}function km(e,t,n,r,i){let a=e.createDiv(`pm-gantt-label-row`);a.style.height=`44px`,a.dataset.taskId=t.id,a.draggable=!0,a.addEventListener(`dragstart`,e=>{e.dataTransfer?.setData(`text/plain`,t.id),a.addClass(`pm-gantt-label-row--dragging`)}),a.addEventListener(`dragend`,()=>{a.removeClass(`pm-gantt-label-row--dragging`)});let o=`before`;a.addEventListener(`dragover`,e=>{e.preventDefault();let t=a.getBoundingClientRect(),n=t.top+t.height/2;o=e.clientY<n?`before`:`after`,a.removeClass(`pm-gantt-label-row--drop-before`,`pm-gantt-label-row--drop-after`),a.addClass(o===`before`?`pm-gantt-label-row--drop-before`:`pm-gantt-label-row--drop-after`)}),a.addEventListener(`dragleave`,()=>{a.removeClass(`pm-gantt-label-row--drop-before`,`pm-gantt-label-row--drop-after`)}),a.addEventListener(`drop`,Y(async e=>{e.preventDefault(),a.removeClass(`pm-gantt-label-row--drop-before`,`pm-gantt-label-row--drop-after`);let n=e.dataTransfer?.getData(`text/plain`);!n||n===t.id||(await i.plugin.store.reorderTask(i.project,n,t.id,o),await i.onRefresh())}));let s=xp(t),c=a.createDiv(`pm-gantt-label-id`);c.setText(s.zentaoId?`${s.typeLabel} #${s.zentaoId}`:`—`);let l=a.createDiv(`pm-gantt-label-item`);l.style.paddingLeft=`${n*18+8}px`,t.subtasks.length>0?new up(l,{collapsed:t.collapsed,onToggle:Y(async()=>{await i.plugin.toggleTaskCollapsed(i.project,t.id),await i.onRefresh()})}):l.createSpan({cls:`pm-gantt-label-spacer`});let w=l.createSpan({text:t.title,cls:`pm-gantt-label-title`});w.setAttr(`title`,t.title),w.addEventListener(`click`,()=>{Q(i.plugin,i.project,{task:t,onSave:()=>i.onRefresh()})}),t.progress>0&&l.createSpan({text:`${t.progress}%`,cls:`pm-gantt-label-progress`}),new Ud(l).setIcon(`plus`).setTooltip(`添加子任务`).setRevealOnHover(!0).onClick(e=>{e.stopPropagation(),Q(i.plugin,i.project,{parentId:t.id,onSave:()=>i.onRefresh()})});let u=a.createDiv(`pm-gantt-label-stage`),d=cd(i.stages,t.stage);af(u,t.stage,d);let f=a.createDiv(`pm-gantt-label-status`),p=sd(i.statuses,t.status);af(f,t.status,p);let m=a.createDiv(`pm-gantt-label-priority`),h=ud(i.priorities,t.priority),g=new Z(m).setLabel(pd(h?.icon,h?.label??(t.priority||`未设置`))).setColor(h?.color??`var(--text-muted)`).setVariant(`plain`),_=tf(h);_?g.setLeadingIcon(_):h?.icon||g.setLeadingIcon(of[t.priority]??`equal`);let v=a.createDiv(`pm-gantt-label-assignees`);t.assignees.length?new ap(v).setNames(t.assignees).setMax(2):v.createSpan({text:`—`,cls:`pm-gantt-label-assignees-empty`});let y=a.createDiv(`pm-gantt-label-completed-by`),b=t.customFields.completedBy;b?new ap(y).setNames([b]).setMax(1):y.createSpan({text:`—`,cls:`pm-gantt-label-assignees-empty`})}var Am=class{container;project;plugin;onRefresh;filter;granularity;scrollEl;svgEl;headerSvgEl;flatTasks=[];cfg;drag=im();link=cm();labelWidth=900;ganttSortKey=null;ganttSortDir=`asc`;getLabelWidth(){return this.labelWidth}setLabelWidth(e){this.labelWidth=Math.max(760,e)}cleanupFns=[];pendingScroll=null;constructor(e,t,n,r,i){this.container=e,this.project=t,this.plugin=n,this.onRefresh=r,this.filter=i,this.granularity=n.settings.ganttGranularity}destroy(){for(let e of this.cleanupFns)e();this.cleanupFns=[]}getScrollPosition(){return{top:this.scrollEl?.scrollTop??0,anchorDate:this.scrollEl?em(this.cfg,this.scrollEl.scrollLeft):Zl()}}setPendingScroll(e){this.pendingScroll=e}refresh(){this.pendingScroll=this.getScrollPosition(),this.render()}render(){this.cleanupFns.forEach(e=>e()),this.cleanupFns=[],lm(this.link),this.container.empty(),this.container.addClass(`pm-gantt-view`);let e=this.getVisibleTasks();this.flatTasks=q(e).filter(e=>e.visible||e.depth===0),this.cfg=$p(e,this.granularity),this.renderGranularityControls(),this.renderGantt()}renderGranularityControls(){let t=this.container.createDiv(`pm-gantt-controls`),n=[`day`,`week`,`month`,`quarter`],r={day:`Day`,week:`Week`,month:`Month`,quarter:`Quarter`};new Xp(t,{options:n.map(e=>({id:e,label:r[e]})),active:this.granularity,onChange:e=>{this.granularity=e,this.plugin.settings.ganttGranularity=e,this.plugin.saveSettings(),this.render()}}),t.createSpan({cls:`pm-gantt-sep`}),new e.ButtonComponent(t).setButtonText(`今天`).onClick(()=>this.scrollToToday()),new e.ButtonComponent(t).setButtonText(`全部展开`).onClick(()=>this.setAllCollapsed(!1)),new e.ButtonComponent(t).setButtonText(`全部折叠`).onClick(()=>this.setAllCollapsed(!0))}renderGantt(){let e=this.container.createDiv(`pm-gantt-wrapper`),t=e.createDiv(`pm-gantt-left`),n=this.plugin.settings.ganttLabelWidth;typeof n===`number`&&(this.labelWidth=Math.max(760,n)),t.style.width=`${this.labelWidth}px`,t.style.minWidth=`${this.labelWidth}px`;for(let[e,n]of Object.entries(this.plugin.settings.ganttColumnWidths??{}))t.style.setProperty(e,`${n}px`);let r=t.createDiv(`pm-gantt-left-header`);r.style.height=`56px`;{let e=[{key:`zentaoId`,label:`事项 ID`,width:`--pm-gantt-id-col`,min:80},{key:`title`,label:`事项`,width:`--pm-gantt-item-min-col`,min:180},{key:`stage`,label:`阶段`,width:`--pm-gantt-stage-col`,min:64},{key:`status`,label:`状态`,width:`--pm-gantt-status-col`,min:64},{key:`priority`,label:`优先级`,width:`--pm-gantt-priority-col`,min:60},{key:`assignees`,label:`负责人`,width:`--pm-gantt-person-col`,min:72},{key:`completedBy`,label:`完成者`,width:`--pm-gantt-person-col`,min:72}],o=[];for(let i of e){let e=r.createSpan({text:i.label,cls:`pm-gantt-left-header-label pm-gantt-left-header-label--sortable`});this.ganttSortKey===i.key&&e.createSpan({text:this.ganttSortDir===`asc`?` ↑`:` ↓`,cls:`pm-sort-indicator`}),e.setAttr(`aria-label`,`按${i.label}排序`),e.addEventListener(`click`,()=>{this.ganttSortKey===i.key?this.ganttSortDir=this.ganttSortDir===`asc`?`desc`:`asc`:(this.ganttSortKey=i.key,this.ganttSortDir=`asc`),this.render()}),o.push(e)}for(let[i,a]of o.entries()){if(i===o.length-1)continue;let r=a.createSpan({cls:`pm-gantt-column-resizer`});r.addEventListener(`click`,e=>e.stopPropagation()),r.addEventListener(`pointerdown`,n=>{n.preventDefault(),n.stopPropagation(),r.setPointerCapture(n.pointerId);let o=a.getBoundingClientRect().width,s=this.labelWidth,c=e[i].width,l=e[i].min,u=n.clientX,d=e=>{let r=Math.max(l,Math.round(o+e.clientX-u));t.style.setProperty(c,`${r}px`),this.plugin.settings.ganttColumnWidths??={},this.plugin.settings.ganttColumnWidths[c]=r;let i=Math.max(760,Math.min(1400,s+r-o));this.labelWidth=i,this.plugin.settings.ganttLabelWidth=i,t.style.width=`${i}px`,t.style.minWidth=`${i}px`};r.addEventListener(`pointermove`,d),r.addEventListener(`pointerup`,()=>{r.removeEventListener(`pointermove`,d),this.plugin.saveSettings()},{once:!0})})}}let q=t.createDiv(`pm-gantt-left-body`),i=e.createDiv(`pm-gantt-resize-handle`),a=!1,o=0,s=0;i.addEventListener(`mousedown`,e=>{e.preventDefault(),a=!0,o=e.clientX,s=this.labelWidth,activeDocument.body.addClass(`pm-resize-active`)});let c=e=>{if(!a)return;let n=Math.max(760,Math.min(1400,s+(e.clientX-o)));this.labelWidth=n,t.style.width=`${n}px`,t.style.minWidth=`${n}px`},l=()=>{a&&(a=!1,this.plugin.settings.ganttLabelWidth=this.labelWidth,this.plugin.saveSettings(),activeDocument.body.removeClass(`pm-resize-active`))};activeDocument.addEventListener(`mousemove`,c),activeDocument.addEventListener(`mouseup`,l),this.cleanupFns.push(()=>{activeDocument.removeEventListener(`mousemove`,c),activeDocument.removeEventListener(`mouseup`,l)});let u=e.createDiv(`pm-gantt-right`);this.scrollEl=u;let d=u.createDiv(`pm-gantt-header-sticky`);d.style.width=`${this.cfg.totalWidth}px`,d.style.height=`56px`,this.headerSvgEl=X(`svg`,{width:this.cfg.totalWidth,height:56,class:`pm-gantt-header-svg`}),d.appendChild(this.headerSvgEl);let f=u.createDiv(`pm-gantt-svg-container`);f.style.width=`${this.cfg.totalWidth}px`,f.style.marginTop=`-56px`;let p=this.flatTasks.filter(e=>e.visible||e.depth===0).length,m=56+(p+1)*44;this.svgEl=X(`svg`,{width:this.cfg.totalWidth,height:m,class:`pm-gantt-svg`}),f.appendChild(this.svgEl);let h=()=>this.container.closest(`.workspace-leaf`)?.classList.contains(`mod-active`)??!1,g=e=>{if(!h()||(e.key===`Escape`&&this.link.active&&lm(this.link),this.drag.isDragging)||!(e.ctrlKey||e.metaKey))return;let t=e.key.toLowerCase();t===`z`&&!e.shiftKey?(e.preventDefault(),this.plugin.undoLastAction()):(t===`z`&&e.shiftKey||t===`y`)&&(e.preventDefault(),this.plugin.redoLastAction())};activeDocument.addEventListener(`keydown`,g),this.cleanupFns.push(()=>activeDocument.removeEventListener(`keydown`,g));let _=this.makeRendererContext();mm(_),Dm(_,p),Om(_,m),this.renderTaskRows(q,_),Tm(_),wm(_);let v=e=>{u.scrollTop+=e.deltaY,u.scrollLeft+=e.deltaX,e.preventDefault()};t.addEventListener(`wheel`,v,{passive:!1}),this.cleanupFns.push(()=>t.removeEventListener(`wheel`,v));let y=q.createDiv(`pm-gantt-label-row pm-gantt-add-row`);y.style.height=`44px`,Sf(y,`Add task`,()=>{Q(this.plugin,this.project,{onSave:()=>this.onRefresh()})});let b=r.createDiv();b.addClass(`pm-no-shrink`);let x=()=>{let e=u.offsetHeight-u.clientHeight;b.style.height=`${e}px`};u.addEventListener(`scroll`,()=>{x(),q.scrollTop=u.scrollTop}),window.requestAnimationFrame(()=>{x(),this.pendingScroll?(this.scrollEl.scrollTop=this.pendingScroll.top,this.scrollEl.scrollLeft=Math.max(0,$(this.cfg,this.pendingScroll.anchorDate)),this.pendingScroll=null):this.scrollToToday()})}renderTaskRows(e,t){let n=X(`g`,{class:`pm-gantt-bars`});this.svgEl.appendChild(n);let r=this.plugin.store.configFor(this.project),i={plugin:this.plugin,project:this.project,stages:r.stages,statuses:r.statuses,priorities:r.priorities,onRefresh:this.onRefresh},a=0,o=(r,s)=>{for(let c of r)km(e,c,s,a,i),xm(n,c,a,s,t),a++,!c.collapsed&&c.subtasks.length&&o(c.subtasks,s+1)};o(this.getVisibleTasks(),0)}makeRendererContext(){return{svgEl:this.svgEl,headerSvgEl:this.headerSvgEl,cfg:this.cfg,plugin:this.plugin,project:this.project,statuses:this.plugin.store.configFor(this.project).statuses,flatTasks:this.flatTasks,drag:this.drag,link:this.link,onRefresh:this.onRefresh,cleanupFns:this.cleanupFns}}ganttSortValue(e){switch(this.ganttSortKey){case`zentaoId`:return String(e.customFields.zentaoId??e.id);case`title`:return e.title;case`assignees`:return e.assignees.join(`、`);case`completedBy`:return String(e.customFields.completedBy??``);default:return String(e[this.ganttSortKey]??``)}}sortGanttTasks(e){let t=e=>[...e].sort((e,t)=>this.ganttSortValue(e).localeCompare(this.ganttSortValue(t),`zh-CN`,{numeric:!0,sensitivity:`base`})*(this.ganttSortDir===`asc`?1:-1)).map(e=>({...e,subtasks:t(e.subtasks)}));return t(e)}getVisibleTasks(){let e=kd(this.project.tasks,this.filter,this.plugin.store.configFor(this.project).statuses);return this.ganttSortKey?this.sortGanttTasks(e):e}scrollToToday(){if(!this.scrollEl)return;let e=$(this.cfg,Zl())-this.scrollEl.clientWidth/2;this.scrollEl.scrollLeft=Math.max(0,e)}setAllCollapsed(e){for(let{task:t}of q(this.project.tasks))t.subtasks.length>0&&(t.collapsed=e);this.plugin.persistCollapsedState(this.project),this.render()}},jm=class{el;constructor(e,t){let{task:n}=t,r=e.createDiv(`pm-kanban-card`);r.draggable=t.draggable!==!1,r.dataset.taskId=n.id,this.el=r,t.priorityColor&&r.createDiv(`pm-kanban-card-priority-bar`).setCssStyles({background:t.priorityColor});let i=r.createDiv(`pm-kanban-card-body`);t.parentTitle&&i.createSpan({text:t.parentTitle,cls:`pm-kanban-card-parent`});let a=i.createDiv(`pm-kanban-card-title-row`);if(a.createSpan({text:n.title,cls:`pm-kanban-card-title`}),n.tags.includes(`zentao-requirement`)&&new Z(a).setLabel(`需求`).setVariant(`solid`).setSize(`sm`).setColor(`var(--color-orange)`).setTooltip(`禅道需求`),n.type===`milestone`&&new Z(a).setLabel(`里程碑`).setVariant(`solid`).setSize(`sm`).setColor(`var(--color-purple)`).setTooltip(`里程碑`),n.recurrence&&new Z(a).setLabel(`重复`).setVariant(`solid`).setSize(`sm`).setColor(`var(--color-blue)`).setTooltip(`重复任务`),t.descriptionPreview&&i.createDiv({cls:`pm-kanban-card-description`,text:t.descriptionPreview}),vp(i,t.loggedHours,projectEstimateHours(n),`sm`),n.tags.length){let e=i.createDiv(`pm-kanban-card-tags`);for(let r of n.tags.slice(0,3))bp(e,r,t.showTagColors)}n.progress>0&&new pp(i).setSize(`sm`).setValue(n.progress);let o=i.createDiv(`pm-kanban-card-footer`);let s=new Z(o).setLabel(t.statusLabel||`未设置`).setColor(t.statusColor??`var(--text-muted)`).setVariant(`solid`).setDot().setSize(`sm`).setTooltip(`当前状态：${t.statusLabel||`未设置`}`);s.el.addClass(`pm-kanban-card-status`);let c=o.createDiv(`pm-kanban-card-people`);n.assignees.length&&new Z(c).setLabel(`负责人 · ${n.assignees.slice(0,2).join(`、`)}`).setLeadingIcon(`user`).setColor(`var(--interactive-accent)`).setVariant(`solid`).setSize(`sm`).setTooltip(`负责人：${n.assignees.join(`、`)}`),n.customFields.completedBy&&new Z(c).setLabel(`完成者 · ${n.customFields.completedBy}`).setLeadingIcon(`circle-check`).setColor(`var(--color-green)`).setVariant(`solid`).setSize(`sm`).setTooltip(`完成者：${n.customFields.completedBy}`),n.due&&cp(o,Qu(n.due),t.overdue?`overdue`:`normal`,`sm`),r.addEventListener(`dragstart`,e=>{if(t.draggable===!1){e.preventDefault();return}e.dataTransfer?.setData(`text/plain`,n.id),r.addClass(`pm-kanban-card--dragging`),window.setTimeout(()=>r.addClass(`pm-dragging`),0),t.onDragStart()}),r.addEventListener(`dragend`,()=>{r.removeClass(`pm-kanban-card--dragging`),r.removeClass(`pm-dragging`),t.onDragEnd()}),r.addEventListener(`click`,()=>t.onClick()),r.addEventListener(`contextmenu`,e=>{e.preventDefault(),t.onContextMenu(e)})}},Mm=class{el;cardsEl;props;cards;devHeight=128;overscan=4;heightCache=new Map;start=-1;end=-1;frame=null;measureFrame=null;dragging=!1;destroyed=!1;viewportObserver=null;constructor(t,n){this.props=n,this.cards=n.cards,this.heightCache=n.heightCache??this.heightCache;let r=t.createDiv(`pm-kanban-col`);r.dataset.status=n.status.id,this.el=r;let i=r.createDiv(`pm-kanban-col-header`);i.style.setProperty(`--col-color`,n.status.color),i.createDiv(`pm-kanban-col-topbar`).setCssStyles({background:n.status.color});let a=i.createDiv(`pm-kanban-col-title-row`),o=a.createSpan({cls:`pm-kanban-col-badge`});n.status.icon&&fd(n.status.icon)?((0,e.setIcon)(o.createSpan({cls:`pm-kanban-col-badge-icon`}),n.status.icon),o.appendText(n.status.label)):o.setText(pd(n.status.icon,n.status.label)),o.style.color=n.status.color,a.createDiv(`pm-kanban-col-header-right`).createSpan({text:String(n.cards.length),cls:`pm-kanban-col-count`});let s=r.createDiv(`pm-kanban-cards pm-kanban-cards--virtual`);this.cardsEl=s,s.dataset.status=n.status.id,s.style.display=`block`,s.addEventListener(`scroll`,()=>this.scheduleRender()),s.addEventListener(`dragover`,e=>{e.preventDefault(),s.addClass(`pm-kanban-drop-target`);let t=Nm(s,e.clientY),n=s.querySelector(`.pm-kanban-card--dragging`);if(n){let e=n.closest(`.pm-kanban-virtual-item`),r=t?.closest(`.pm-kanban-virtual-item`);e&&e.parentElement===s&&(r?s.insertBefore(e,r):s.appendChild(e))}}),s.addEventListener(`dragleave`,()=>{s.removeClass(`pm-kanban-drop-target`)}),s.addEventListener(`drop`,Y(async e=>{e.preventDefault(),s.removeClass(`pm-kanban-drop-target`);let t=e.dataTransfer?.getData(`text/plain`)??``;t&&await n.onDrop(t,n.status.id)})),typeof ResizeObserver!=`undefined`&&(this.viewportObserver=new ResizeObserver(()=>this.scheduleRender(!0)),this.viewportObserver.observe(s)),this.renderWindow(!0),n.scrollTop&&(s.scrollTop=n.scrollTop,this.renderWindow(!0))}offsets(){let e=[0];for(let t=0;t<this.cards.length;t+=1){let n=this.cards[t],r=this.heightCache.get(n.task.id)??this.devHeight;e.push(e[t]+r)}return e}range(e){if(this.cards.length===0)return[0,0];let t=this.cardsEl.scrollTop,n=this.cardsEl.clientHeight||640,r=Math.max(0,t-this.devHeight*this.overscan),i=t+n+this.devHeight*this.overscan,a=0;for(;a<this.cards.length&&e[a+1]<r;)a+=1;let o=a;for(;o<this.cards.length&&e[o]<i;)o+=1;return[a,Math.min(this.cards.length,Math.max(a+1,o))]}scheduleRender(e=!1){if(this.destroyed||this.dragging&&!e)return;this.frame!==null&&cancelAnimationFrame(this.frame),this.frame=requestAnimationFrame(()=>{this.frame=null,this.renderWindow(e)})}renderWindow(e=!1){if(this.destroyed)return;let t=this.offsets(),[n,r]=this.range(t);if(!e&&n===this.start&&r===this.end)return;this.start=n,this.end=r;let i=this.cardsEl.scrollTop;this.cardsEl.empty();let a=this.cardsEl.createDiv(`pm-kanban-virtual-spacer`);a.style.height=`${t[n]}px`;for(let e=n;e<r;e+=1)this.renderCard(this.cards[e],e);let o=this.cardsEl.createDiv(`pm-kanban-virtual-spacer`);o.style.height=`${Math.max(0,t[this.cards.length]-t[r])}px`,this.cardsEl.scrollTop=i,this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),this.measureFrame=requestAnimationFrame(()=>{this.measureFrame=null,this.measureVisible()})}renderCard(e,t){let n=this.cardsEl.createDiv(`pm-kanban-virtual-item`);n.dataset.virtualIndex=String(t),n.style.marginBottom=`8px`,n.style.contain=`layout style`,new jm(n,{task:e.task,draggable:e.draggable,statusLabel:e.statusLabel,statusColor:e.statusColor,priorityColor:e.priorityColor,descriptionPreview:e.descriptionPreview,parentTitle:e.parentTitle,loggedHours:e.loggedHours,overdue:e.overdue,showTagColors:e.showTagColors,onClick:()=>this.props.onCardClick(e.task),onContextMenu:t=>this.props.onCardContextMenu(e.task,t),onDragStart:()=>this.props.onCardDragStart(e.task),onDragEnd:()=>this.props.onCardDragEnd()})}measureVisible(){if(this.destroyed)return;let e=!1;for(let t of this.cardsEl.querySelectorAll(`.pm-kanban-virtual-item`)){let n=Number(t.dataset.virtualIndex),r=t.querySelector(`.pm-kanban-card`);if(!r||!Number.isInteger(n)||!this.cards[n])continue;let i=Math.ceil(r.getBoundingClientRect().height)+8,a=this.cards[n].task.id,o=this.heightCache.get(a);(!o||Math.abs(o-i)>1)&&(this.heightCache.set(a,i),e=!0)}e&&this.renderWindow(!0)}setDragging(e){this.dragging=e;if(e){this.frame!==null&&cancelAnimationFrame(this.frame),this.frame=null,this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),this.measureFrame=null;return}this.scheduleRender(!0)}getScrollTop(){return this.cardsEl.scrollTop}destroy(){this.destroyed=!0,this.frame!==null&&cancelAnimationFrame(this.frame),this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),this.viewportObserver?.disconnect()}};function Nm(e,t){let n=Array.from(e.querySelectorAll(`.pm-kanban-card:not(.pm-kanban-card--dragging)`)),r=null,i=-1/0;for(let e of n){let n=e.getBoundingClientRect(),a=t-n.top-n.height/2;a<0&&a>i&&(i=a,r=e)}return r}let Pm=class{container;project;plugin;onRefresh;filter;groupBy;dragTask=null;config;columns=[];parentTitles=new Map;allTasks=[];includeSubtasks=!1;scrollPositions=new Map;heightCaches=new Map;boardScrollLeft=0;constructor(e,t,n,r,i,a=`stage`){this.container=e,this.project=t,this.plugin=n,this.onRefresh=r,this.filter=i,this.groupBy=a}render(){this.renderBoard(),this.config.kanbanShowDescriptionPreview&&this.hydrateDescriptions()}updateFilter(e,t){this.filter=e,this.renderBoard(t),this.config.kanbanShowDescriptionPreview&&this.hydrateDescriptions()}destroyColumns(){let e=this.container.querySelector(`.pm-kanban-board`);e&&(this.boardScrollLeft=e.scrollLeft);for(let e of this.columns){this.scrollPositions.set(`${this.groupBy}:${e.props.status.id}`,e.getScrollTop()),e.destroy()}this.columns=[]}destroy(){this.destroyColumns()}renderBoard(e=this.groupBy){this.config=this.plugin.store.configFor(this.project),this.destroyColumns(),this.groupBy=e,this.container.empty(),this.container.addClass(`pm-kanban-view`);let t=this.container.createDiv(`pm-kanban-board`),n=this.groupBy===`status`,r=q(this.project.tasks);this.parentTitles=new Map;for(let{task:e}of r)for(let t of e.subtasks)this.parentTitles.set(t.id,e.title);this.includeSubtasks=this.config.kanbanShowSubtasks||this.filter.quickSource!==`requirement`,this.allTasks=this.includeSubtasks?r.map(e=>e.task):this.project.tasks;let i=new Set(this.allTasks.map(e=>n?e.status:e.stage)),a=this.allTasks.filter(e=>Od(e,this.filter,this.config.statuses)),o=new Map;for(let e of a){let t=n?e.status:e.stage,r=o.get(t);r?r.push(e):o.set(t,[e])}let s=(n?this.config.statuses:this.config.stages).filter(e=>i.has(e.id));for(let e of s){let n=(o.get(e.id)??[]).map(e=>this.buildCardData(e)),r=`${this.groupBy}:${e.id}`,i=this.heightCaches.get(r)??new Map;this.heightCaches.set(r,i);let a=new Mm(t,{status:e,cards:n,heightCache:i,scrollTop:this.scrollPositions.get(r)??0,onCardClick:e=>this.openTask(e),onCardContextMenu:(e,t)=>this.openContextMenu(e,t),onCardDragStart:e=>{this.dragTask=e;for(let e of this.columns)e.setDragging(!0)},onCardDragEnd:()=>{this.dragTask=null;for(let e of this.columns)e.setDragging(!1)},onDrop:(e,t)=>this.handleDrop(e,t)});this.columns.push(a)}t.scrollLeft=this.boardScrollLeft}async hydrateDescriptions(){let e=this.allTasks.filter(e=>e.filePath&&!e.description&&Od(e,this.filter,this.config.statuses));e.length&&(await Promise.all(e.map(e=>this.plugin.store.loadTaskBody(e))),e.some(e=>e.description)&&this.renderBoard())}buildCardData(e){let t=ud(this.config.priorities,e.priority),n=sd(this.config.statuses,e.status),r=t&&e.priority!==`medium`&&e.priority!==`low`?t.color:void 0,i;if(this.config.kanbanShowDescriptionPreview&&e.description.trim()){let t=e.description.replace(/```[\s\S]*?```/g,` `).replace(/`([^`]*)`/g,`$1`).replace(/!?\[([^\]]*)\]\([^)]*\)/g,`$1`).replace(/^[ \t]*[#>\-*+]+[ \t]+/gm,``).replace(/[*~]/g,``).replace(/\s+/g,` `).trim();i=t?t.slice(0,240):void 0}let a=this.includeSubtasks&&e.type===`subtask`?this.parentTitles.get(e.id):void 0;return{task:e,draggable:!e.customFields.zentaoSourceType,statusLabel:n?.label??e.status,statusColor:n?.color??`var(--text-muted)`,priorityColor:r,descriptionPreview:i,parentTitle:a,loggedHours:gu(e),overdue:rd(e,this.config.statuses)===`overdue`,showTagColors:this.plugin.settings.showTagColors}}openTask(e){Q(this.plugin,this.project,{task:e,onSave:async()=>{await this.onRefresh()}})}openContextMenu(t,n){let r=new e.Menu;np(r,t,{plugin:this.plugin,project:this.project,onRefresh:this.onRefresh}),r.showAtMouseEvent(n)}async handleDrop(e,t){!this.dragTask||this.dragTask.id!==e||this.dragTask.customFields.zentaoSourceType||t!==this.dragTask.stage&&(await this.plugin.store.updateTask(this.project,this.dragTask.id,{stage:t}),await this.onRefresh())}},Fm=class{el;constructor(t,n){this.el=t.createDiv(`pm-view-switcher`);for(let t of n.options){let r=new e.ExtraButtonComponent(this.el).setIcon(t.icon).setTooltip(t.label);r.extraSettingsEl.addClass(`pm-view-btn`),t.id===n.active&&r.extraSettingsEl.addClass(`pm-view-btn--active`),r.onClick(()=>{this.el.querySelectorAll(`.pm-view-btn`).forEach(e=>e.removeClass(`pm-view-btn--active`)),r.extraSettingsEl.addClass(`pm-view-btn--active`),n.onChange(t.id)})}}},Im=class{el;button;constructor(t){this.button=new e.ButtonComponent(t),this.el=this.button.buttonEl,this.el.addClass(`pm-chip-btn`)}setLabel(e){return this.button.setButtonText(e),this}setActive(e){return this.el.toggleClass(`pm-chip-btn--active`,e),this}setShape(e){return this.el.toggleClass(`pm-chip-btn--pill`,e===`pill`),this}setAriaLabel(e){return this.el.setAttribute(`aria-label`,e),this}onClick(e){return this.el.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),e(t)}),this}onContextMenu(e){return this.el.addEventListener(`contextmenu`,e),this}},QuickFilterBar=class{props;el;expanded=!1;constructor(e,t){this.props=t,this.el=e.createDiv(`pm-project-header-quick`),this.render()}refresh(){this.render()}change(e){Object.assign(this.props.filter,e,{quickPreset:``}),this.props.onChange(e)}group(e,t,n,r,i=!1){let a=this.el.createDiv(`pm-quick-filter-row`);a.createSpan({text:e,cls:`pm-quick-filter-label`});for(let e of t){let t=i?Array.isArray(n)&&n.includes(e.id):n===e.id;new Im(a).setLabel(e.label).setShape(`pill`).setActive(t).onClick(()=>r(e.id))}}summary(e,t){let n=[];t===`requirement`?n.push(`需求`):t===`task`&&n.push(`任务`);let r=e.quickWorkType??`all`;if(r!==`all`){let e=quickStageOptions(this.props.project,this.props.stages,t).find(e=>e.id===r);n.push(e?.label??r)}let i=e.quickCompletion??`all`;i===`unfinished`?n.push(`未完成`):i===`completed`&&n.push(`已完成`);let a=e.quickOwnership??`all`;a===`mine`?n.push(`我负责`):a===`participated`?n.push(`我参与`):a===`unassigned`&&n.push(`未指派`);let o={high:`高优先级`,overdue:`逾期`,blocked:`阻塞`};for(let t of Array.isArray(e.quickAttention)?e.quickAttention:[])o[t]&&n.push(o[t]);return n}render(){this.el.empty();let e=this.props.filter,t=e.quickSource??`all`,s=this.summary(e,t),c=this.el.createDiv(`pm-quick-filter-toggle-row`);new Im(c).setLabel(this.expanded?`快速组合 ▾`:`快速组合 ▸`).setShape(`pill`).setActive(this.expanded).onClick(()=>{this.expanded=!this.expanded,this.render()}),s.length&&c.createSpan({text:`当前组合：${s.join(` / `)}`,cls:`pm-quick-filter-summary`});if(!this.expanded)return;this.group(`对象`,[{id:`all`,label:`全部`},{id:`requirement`,label:`需求`},{id:`task`,label:`任务`}],t,t=>this.change({quickSource:t,quickWorkType:`all`}));if(t===`requirement`||t===`task`){let n=quickStageOptions(this.props.project,this.props.stages,t),r=[{id:`all`,label:`全部`},...n];this.group(t===`task`?`类型`:`阶段`,r,e.quickWorkType??`all`,e=>this.change({quickWorkType:e}))}this.group(`进度`,[{id:`all`,label:`全部`},{id:`unfinished`,label:`未完成`},{id:`completed`,label:`已完成`}],e.quickCompletion??`all`,e=>this.change({quickCompletion:e}));let n=quickCurrentUser(this.props.project),r=[{id:`all`,label:`全部`}];n&&(r.push({id:`mine`,label:`我负责`}),r.push({id:`participated`,label:`我参与`})),r.push({id:`unassigned`,label:`未指派`});this.group(`归属`,r,e.quickOwnership??`all`,t=>this.change({quickOwnership:t,quickOwner:t===`mine`||t===`participated`?n:e.quickOwner??``}));let i=Array.isArray(e.quickAttention)?e.quickAttention:[],a=[{id:`high`,label:`高优先级`},{id:`overdue`,label:`逾期`},{id:`blocked`,label:`阻塞`}],o=[{id:`all`,label:`全部`},...a];this.group(`关注`,o,i,t=>{if(t===`all`){this.change({quickAttention:[]});return}let n=i.includes(t)?i.filter(e=>e!==t):[...i,t];this.change({quickAttention:n})},!0)}};let Lm=class{props;el;volatileEl=null;constructor(e,t){this.props=t,this.el=e.createDiv(`pm-project-header-primary`),this.volatileEl=this.el.createDiv(`pm-project-header-actions`),this.renderVolatile()}setActiveSavedViewId(e){this.props.activeSavedViewId=e,this.renderVolatile()}refresh(){this.renderVolatile()}refreshVolatile(){this.renderVolatile()}renderVolatile(){this.volatileEl&&(this.volatileEl.empty(),this.renderSavedViewPills(this.volatileEl),this.renderSaveViewAction(this.volatileEl))}renderSavedViewPills(t){let n=t.createDiv(`pm-project-header-saved-views`);n.createSpan({text:`常用`,cls:`pm-quick-filter-label`});new Im(n).setLabel(`全部`).setShape(`pill`).setActive(!this.props.activeSavedViewId&&!Ed(this.props.filter)&&!this.props.filter.showArchived).onClick(()=>this.props.onSavedViewSelect(null));let r=[{id:`unfinished-requirements`,label:`未完成需求`},{id:`unfinished-development`,label:`未完成开发`},{id:`my-unfinished-requirements`,label:`我的未完成需求`},{id:`my-unfinished-tasks`,label:`我的未完成任务`},{id:`overdue`,label:`逾期事项`}];for(let e of r)new Im(n).setLabel(e.label).setShape(`pill`).setActive(this.props.filter.quickPreset===e.id).onClick(()=>this.props.onQuickPresetSelect(e.id));let i=this.props.project.savedViews.find(e=>e.id===this.props.activeSavedViewId),a=new Im(n).setLabel(i?`更多 · ${i.name}`:`更多视图`).setShape(`pill`).setActive(Boolean(i)).onClick(t=>{let n=new e.Menu;if(this.props.project.savedViews.length===0)n.addItem(e=>e.setTitle(`暂无其他视图`).setDisabled(!0));else for(let e of this.props.project.savedViews)n.addItem(t=>t.setTitle(e.name).setChecked(this.props.activeSavedViewId===e.id).onClick(()=>this.props.onSavedViewSelect(e.id)));n.showAtMouseEvent(t)});i&&a.onContextMenu(t=>this.showViewContext(t,i))}showViewContext(t,n){t.preventDefault();let r=new e.Menu;r.addItem(e=>e.setTitle(`使用当前筛选更新`).setIcon(`refresh-cw`).onClick(Y(()=>this.props.onSavedViewUpdate(n.id)))),r.addItem(e=>e.setTitle(`删除视图`).setIcon(`trash`).onClick(Y(()=>this.props.onSavedViewDelete(n.id)))),r.showAtMouseEvent(t)}renderSaveViewAction(t){if(!Ed(this.props.filter)&&!this.props.filter.showArchived)return;let n=new e.ButtonComponent(t).setButtonText(`+ 保存视图`);n.onClick(()=>this.beginInlineSave(t,n))}beginInlineSave(e,t){t.buttonEl.addClass(`pm-hidden`);let n=e.createDiv(`pm-project-header-save-input`),r=n.createEl(`input`,{type:`text`,placeholder:`视图名称…`,cls:`pm-project-header-save-input-field`});r.focus();let i=!1,a=()=>{n.remove(),t.buttonEl.removeClass(`pm-hidden`)},o=Y(async()=>{if(i)return;i=!0;let e=r.value.trim();if(!e){a();return}await this.props.onSavedViewSave(e)});r.addEventListener(`keydown`,e=>{e.key===`Enter`?(e.preventDefault(),o()):e.key===`Escape`&&a()}),r.addEventListener(`blur`,()=>{r.value.trim()?o():a()})}};function projectFilterIcon(e){return{阶段:`layers-3`,状态:`workflow`,优先级:`signal-high`,负责人:`users`,标签:`tags`,截止日期:`calendar-clock`}[e]??`list-filter`}function projectFilterMenuBehavior(e,t,n){e.addEventListener(`toggle`,()=>{if(!e.open)return;for(let n of t.querySelectorAll(`.pm-insight-project-filter-menu[open]`))n!==e&&(n.open=!1)}),e.addEventListener(`keydown`,t=>{t.key===`Escape`&&e.open&&(e.open=!1,n.focus(),t.preventDefault(),t.stopPropagation())})}function Rm(t,n,r,i,a){let o=t.createEl(`details`,{cls:`pmi-task-filter-menu pm-insight-project-filter-menu`}),s=o.createEl(`summary`,{attr:{"aria-label":`按${n}筛选`}});(0,e.setIcon)(s.createSpan(`pmi-task-filter-icon`),projectFilterIcon(n));let c=s.createSpan(`pmi-task-filter-copy`);c.createSpan({cls:`pmi-task-filter-label`,text:n});let l=c.createSpan(`pmi-task-filter-value`),u=s.createSpan(`pmi-task-filter-chevron`);(0,e.setIcon)(u,`chevron-down`);let d=o.createDiv(`pmi-task-filter-panel`),f=d.createDiv(`pmi-task-filter-panel-head`);f.createEl(`strong`,{text:n}),f.createSpan({text:`${i.length} 项`});let p=d.createDiv(`pmi-task-filter-actions`),m=p.createEl(`button`,{text:`全部`,attr:{type:`button`}}),h=d.createDiv(`pmi-task-filter-options`),g=[...r],_=()=>{if(g.length===0)return`全部${n}`;if(g.length===1)return i.find(e=>e.id===g[0])?.label??`已选 1 项`;return`已选 ${g.length} 项`},v=t=>{g=[...t],l.setText(_());for(let e of h.querySelectorAll(`input[type="checkbox"]`))e.checked=g.includes(e.dataset.filterValue??``);a([...g])};for(let t of i){let n=h.createEl(`label`,{cls:`pmi-task-filter-option`}),r=n.createEl(`input`,{type:`checkbox`});r.dataset.filterValue=t.id,r.checked=g.includes(t.id);let i=n.createSpan(`pmi-task-filter-option-name`);i.createSpan({cls:`pmi-task-filter-option-label`,text:t.label}),r.addEventListener(`change`,()=>{let e=new Set(g);r.checked?e.add(t.id):e.delete(t.id),v([...e])})}return l.setText(_()),m.addEventListener(`click`,()=>v([])),projectFilterMenuBehavior(o,t,s),o}function projectSingleFilter(t,n,r,i,a,o){let s=t.createEl(`details`,{cls:`pmi-task-filter-menu pm-insight-project-filter-menu`}),c=s.createEl(`summary`,{attr:{"aria-label":r}});(0,e.setIcon)(c.createSpan(`pmi-task-filter-icon`),n);let l=c.createSpan(`pmi-task-filter-copy`);l.createSpan({cls:`pmi-task-filter-label`,text:r});let u=l.createSpan(`pmi-task-filter-value`),d=c.createSpan(`pmi-task-filter-chevron`);(0,e.setIcon)(d,`chevron-down`);let f=s.createDiv(`pmi-task-filter-panel`),p=f.createDiv(`pmi-task-filter-panel-head`);p.createEl(`strong`,{text:r}),p.createSpan({text:`${a.length} 项`});let m=f.createDiv(`pmi-task-filter-options`),h=()=>u.setText(a.find(e=>e.id===i)?.label??r);for(let t of a){let n=m.createEl(`label`,{cls:`pmi-task-filter-option`}),r=n.createEl(`input`,{type:`radio`,attr:{name:`pm-filter-${i}`}});r.checked=t.id===i,n.createSpan({cls:`pmi-task-filter-option-label`,text:t.label}),r.addEventListener(`change`,()=>{if(!r.checked)return;i=t.id,h(),o(i),s.open=!1})}return h(),projectFilterMenuBehavior(s,t,c),s}const zm={any:`截止日期`,overdue:`已逾期`,"this-week":`本周`,"this-month":`本月`,"no-date":`无日期`};var Bm=class{props;el;clearBtn=null;constructor(e,t){this.props=t,this.el=e.createDiv(`pm-project-header-filter`),this.render()}refresh(){this.render()}render(){this.el.empty();let{filter:t,stages:n,statuses:r,priorities:i,project:a}=this.props,o=()=>{this.props.onFilterChange(),this.updateClearButton()},s=this.el.createDiv(`pm-insight-filter-search`);(0,e.setIcon)(s.createSpan(),`search`);let c=s.createEl(`input`,{type:`search`,placeholder:`搜索事项…`,cls:`pm-insight-filter-search-input`});c.value=t.text,c.addEventListener(`input`,()=>{t.text=c.value,o()}),Rm(this.el,`阶段`,t.stages??[],n.map(e=>({id:e.id,label:pd(e.icon,e.label)})),e=>{t.stages=e,o()}),Rm(this.el,`状态`,t.statuses,r.map(e=>({id:e.id,label:pd(e.icon,e.label)})),e=>{t.statuses=e,o()}),Rm(this.el,`优先级`,t.priorities,i.map(e=>({id:e.id,label:pd(e.icon,e.label)})),e=>{t.priorities=e,o()});let l=mu(a.tasks);l.length&&Rm(this.el,`负责人`,t.assignees,l.map(e=>({id:e,label:e})),e=>{t.assignees=e,o()});let u=hu(a.tasks);u.length&&Rm(this.el,`标签`,t.tags,u.map(e=>({id:e,label:e})),e=>{t.tags=e,o()}),this.renderDueDateButton(o),this.renderArchivedButton(o),this.renderClearButton()}renderDueDateButton(t){let{filter:n}=this.props,r=[`any`,`overdue`,`this-week`,`this-month`,`no-date`].map(e=>({id:e,label:zm[e]}));projectSingleFilter(this.el,`calendar-clock`,`截止日期`,n.dueDateFilter,r,e=>{n.dueDateFilter=e,t()})}renderArchivedButton(e){let{filter:t}=this.props,n=new Im(this.el).setLabel(`已归档`).setActive(t.showArchived);n.el.addClass(`pm-insight-filter-archive`),n.onClick(()=>{t.showArchived=!t.showArchived,n.setActive(t.showArchived),e()})}renderClearButton(){let e=Dd(this.props.filter)+(this.props.filter.text?1:0);this.clearBtn=new Im(this.el).setLabel(`重置筛选`),this.clearBtn.el.addClass(`pm-insight-filter-reset`),this.clearBtn.el.disabled=e===0,this.clearBtn.onClick(()=>{if(e===0)return;this.props.onClear(),this.render()})}refreshClearButton(){this.updateClearButton()}updateClearButton(){this.clearBtn&&=(this.clearBtn.el.remove(),null),this.renderClearButton()}},Vm=class{props;el;primaryRow=null;quickRow=null;filterPanel=null;filterRow=null;constructor(e,t){this.props=t,this.el=e.createDiv(`pm-project-header`),this.render()}refresh(){this.render()}notifyMutation(){this.primaryRow?.refreshVolatile(),this.quickRow?.refresh(),this.filterRow?.refreshClearButton()}setActiveSavedViewId(e){this.props.activeSavedViewId=e,this.primaryRow?.setActiveSavedViewId(e),this.quickRow?.refresh(),this.filterRow?.refresh()}render(){this.el.empty(),this.primaryRow=new Lm(this.el,{project:this.props.project,filter:this.props.filter,activeSavedViewId:this.props.activeSavedViewId,onSavedViewSelect:this.props.onSavedViewSelect,onQuickPresetSelect:this.props.onQuickPresetSelect,onSavedViewSave:this.props.onSavedViewSave,onSavedViewUpdate:this.props.onSavedViewUpdate,onSavedViewDelete:this.props.onSavedViewDelete}),this.quickRow=new QuickFilterBar(this.el,{project:this.props.project,stages:this.props.stages,filter:this.props.filter,onChange:this.props.onQuickFilterChange}),this.mountFilterPanel()}mountFilterPanel(){this.filterPanel=this.el.createDiv(`pm-project-header-filter-panel`),this.filterPanel.addClass(`pm-insight-filter-bar`),this.filterRow=new Bm(this.filterPanel,{project:this.props.project,stages:this.props.stages,statuses:this.props.statuses,priorities:this.props.priorities,filter:this.props.filter,onFilterChange:this.props.onFilterChange,onClear:this.props.onClearFilter})}};const Hm=`pm-project`;var Um=class extends e.ItemView{plugin;project=null;filePath=``;currentView;filter=au();activeSavedViewId=null;kanbanGroupBy=`stage`;subview=null;savedTableViewState=null;toolbarEl;headerEl;bodyEl;header=null;titleEl2;keydownHandler=null;pendingRefresh=null;filterRenderTimer=null;initialized=!1;defaultViewAppliedFor=null;constructor(e,t){super(e),this.plugin=t,this.currentView=t.settings.defaultView,this.navigation=!1}getViewType(){return Hm}getDisplayText(){return ad(this.project?.title??`项目`,10)}getIcon(){return`chart-gantt`}async setState(e,t){e.filePath&&e.filePath!==this.filePath&&(this.filePath=e.filePath,await this.loadProject()),await super.setState(e,t)}getState(){return{filePath:this.filePath}}onOpen(){return this.ensureInitialized(),Promise.resolve()}onClose(){return this.keydownHandler&&=(this.containerEl.removeEventListener(`keydown`,this.keydownHandler),null),this.filterRenderTimer!==null&&(window.clearTimeout(this.filterRenderTimer),this.filterRenderTimer=null),this.subview?.destroy?.(),this.subview=null,Promise.resolve()}ensureInitialized(){if(this.initialized)return;this.initialized=!0,this.containerEl.addClass(`pm-view`);let e=this.contentEl;e.empty(),e.addClass(`pm-root`),this.toolbarEl=e.createDiv(`pm-toolbar`),this.headerEl=e.createDiv(`pm-project-header-mount`),this.bodyEl=e.createDiv(`pm-content`),this.keydownHandler=e=>{this.subview?.handleKeyDown?.(e)},this.containerEl.addEventListener(`keydown`,this.keydownHandler),this.containerEl.hasAttribute(`tabindex`)||this.containerEl.setAttribute(`tabindex`,`-1`),this.register(this.plugin.store.onProjectChanged(e=>{e===this.filePath&&this.handleProjectChanged()}))}handleProjectChanged(){if(!this.project)return;if(!(this.app.vault.getAbstractFileByPath(this.filePath)instanceof e.TFile)){this.renderMissingProject();return}let t=activeDocument.activeElement;!this.toolbarEl.contains(t)&&!this.headerEl.contains(t)&&(this.renderProjectToolbar(),this.renderProjectHeader()),this.refreshProject()}async loadProject(){this.ensureInitialized();let t=this.app.vault.getAbstractFileByPath(this.filePath);if(!(t instanceof e.TFile)){this.renderMissingProject();return}if(this.project=await this.plugin.store.loadProject(t),!this.project){this.renderMissingProject();return}this.plugin.applyCollapsedState(this.project),this.defaultViewAppliedFor!==this.filePath&&(this.defaultViewAppliedFor=this.filePath,this.currentView=this.plugin.store.configFor(this.project).defaultView),this.loadFilterFromSettings(),this.leaf.updateHeader?.(),this.renderProjectToolbar(),this.renderProjectHeader(),this.renderCurrentView()}loadFilterFromSettings(){let e=this.plugin.settings.projectFilters[this.filePath];if(e)this.filter=e.filter,this.activeSavedViewId=e.activeSavedViewId;else this.filter=au(),this.activeSavedViewId=null;let t=this.activeSavedViewId&&this.project?.savedViews.find(e=>e.id===this.activeSavedViewId);t&&(this.filter={...t.filter},this.kanbanGroupBy=t.groupBy===`status`?`status`:`stage`)}async persistFilter(){this.filePath&&(this.plugin.settings.projectFilters[this.filePath]={filter:this.filter,activeSavedViewId:this.activeSavedViewId},await this.plugin.saveSettings())}renderMissingProject(){this.toolbarEl.empty(),this.headerEl.empty(),this.header=null,this.bodyEl.empty();let e=this.bodyEl.createDiv(`pm-empty-state`);e.createEl(`h3`,{text:`未找到项目`}),e.createEl(`p`,{text:`路径 ${this.filePath} 下没有项目，文件可能已删除或重命名。`})}renderProjectHeader(){if(!this.project)return;this.headerEl.empty();let e=this.plugin.store.configFor(this.project);this.header=new Vm(this.headerEl,{project:this.project,stages:e.stages,statuses:e.statuses,priorities:e.priorities,filter:this.filter,activeSavedViewId:this.activeSavedViewId,onFilterChange:()=>this.handleFilterMutation(),onClearFilter:()=>this.handleClearDetailedFilter(),onSavedViewSelect:e=>this.handleSavedViewSelect(e),onSavedViewSave:e=>this.handleSavedViewSave(e),onSavedViewUpdate:e=>this.handleSavedViewUpdate(e),onSavedViewDelete:e=>this.handleSavedViewDelete(e),onQuickFilterChange:e=>this.handleQuickFilterMutation(e),onQuickPresetSelect:e=>this.handleQuickPresetSelect(e)})}handleQuickFilterMutation(e){this.activeSavedViewId=null,this.kanbanGroupBy=e.quickSource===`task`?`status`:`stage`,this.header?.setActiveSavedViewId(null),this.persistFilter(),this.scheduleFilterRender()}handleQuickPresetSelect(t){if(!this.project)return;let n=au(),r=quickCurrentUser(this.project);if(t.startsWith(`my-`)&&!r){new e.Notice(`当前项目尚未识别“我的”用户，请先配置包含当前用户的个人视图。`);return}n.quickPreset=t,t===`unfinished-requirements`?(n.quickSource=`requirement`,n.quickCompletion=`unfinished`):t===`unfinished-development`?(n.quickSource=`task`,n.quickWorkType=quickPreferredStage(this.project,this.plugin.store.configFor(this.project).stages,`开发`,[`devel`,`develop`,`development`]),n.quickCompletion=`unfinished`):t===`my-unfinished-requirements`?(n.quickSource=`requirement`,n.quickCompletion=`unfinished`,n.quickOwnership=`mine`,n.quickOwner=r):t===`my-unfinished-tasks`?(n.quickSource=`task`,n.quickCompletion=`unfinished`,n.quickOwnership=`mine`,n.quickOwner=r):t===`overdue`&&(n.quickCompletion=`unfinished`,n.quickAttention=[`overdue`]),Object.assign(this.filter,n),this.activeSavedViewId=null,this.kanbanGroupBy=n.quickSource===`task`?`status`:`stage`,this.persistFilter(),this.header?.setActiveSavedViewId(null),this.scheduleFilterRender()}handleFilterMutation(){this.filter.quickPreset=``,this.activeSavedViewId===null?this.header?.notifyMutation():(this.activeSavedViewId=null,this.header?.setActiveSavedViewId(null)),this.persistFilter(),this.scheduleFilterRender()}handleClearDetailedFilter(){Object.assign(this.filter,{text:``,stages:[],statuses:[],priorities:[],assignees:[],participants:[],tags:[],dueDateFilter:`any`,showArchived:!1}),this.filter.quickPreset=``,this.activeSavedViewId=null,this.persistFilter(),this.header?.setActiveSavedViewId(null),this.scheduleFilterRender()}handleClearFilter(){Object.assign(this.filter,au()),this.activeSavedViewId=null,this.kanbanGroupBy=`stage`,this.persistFilter(),this.header?.setActiveSavedViewId(this.activeSavedViewId),this.scheduleFilterRender()}handleSavedViewSelect(e){if(this.project){if(e===null)Object.assign(this.filter,au()),this.activeSavedViewId=null,this.kanbanGroupBy=`stage`;else{let t=this.project.savedViews.find(t=>t.id===e);if(!t)return;Object.assign(this.filter,t.filter),this.activeSavedViewId=t.id,this.kanbanGroupBy=t.groupBy===`status`?`status`:`stage`,this.subview instanceof Yp&&(this.savedTableViewState={sortKey:t.sortKey,sortDir:t.sortDir})}this.persistFilter(),this.header?.setActiveSavedViewId(this.activeSavedViewId),this.scheduleFilterRender()}}async handleSavedViewSave(e){if(!this.project)return;let t=this.subview instanceof Yp?this.subview.getViewState():{sortKey:`stage`,sortDir:`asc`},n={id:nu(),name:e,filter:{...this.filter},sortKey:t.sortKey,sortDir:t.sortDir,viewMode:this.currentView};this.project.savedViews.push(n),this.activeSavedViewId=n.id,await this.plugin.store.saveProject(this.project),this.persistFilter(),this.header?.setActiveSavedViewId(this.activeSavedViewId)}async handleSavedViewUpdate(e){if(!this.project)return;let t=this.project.savedViews.find(t=>t.id===e);if(t){if(t.filter={...this.filter},t.viewMode=this.currentView,this.subview instanceof Yp){let e=this.subview.getViewState();t.sortKey=e.sortKey,t.sortDir=e.sortDir}await this.plugin.store.saveProject(this.project),this.header?.refresh()}}async handleSavedViewDelete(e){this.project&&(this.project.savedViews=this.project.savedViews.filter(t=>t.id!==e),this.activeSavedViewId===e&&(this.activeSavedViewId=null),await this.plugin.store.saveProject(this.project),this.persistFilter(),this.header?.setActiveSavedViewId(this.activeSavedViewId))}scheduleFilterRender(){this.filterRenderTimer!==null&&window.clearTimeout(this.filterRenderTimer),this.bodyEl.addClass(`pm-filter-switching`),this.filterRenderTimer=window.setTimeout(()=>{this.filterRenderTimer=null,this.subview instanceof Pm?this.subview.updateFilter(this.filter,this.kanbanGroupBy):this.subview instanceof Yp?this.subview.updateFilter(this.filter,this.savedTableViewState):this.renderCurrentView(),this.bodyEl.removeClass(`pm-filter-switching`)},0)}refreshSubview(){this.subview?.render()}renderProjectToolbar(){if(!this.project)return;this.toolbarEl.empty();let t=this.toolbarEl.createDiv(`pm-toolbar-left`);t.createSpan({text:this.project.icon,cls:`pm-toolbar-icon`,attr:{"aria-label":`编辑项目`,role:`button`,tabindex:`0`}}).addEventListener(`click`,()=>{Xf(this.plugin,{project:this.project})}),this.titleEl2=t.createEl(`h2`,{text:this.project.title,cls:`pm-toolbar-title`}),this.titleEl2.contentEditable=`true`,this.titleEl2.addEventListener(`blur`,Y(async()=>{if(!this.project)return;let e=this.titleEl2.textContent?.trim();!e||e===this.project.title||await this.plugin.store.updateProject(this.project,{title:e})})),new Fm(this.toolbarEl,{options:[{id:`table`,icon:`table`,label:`表格`},{id:`gantt`,icon:`git-fork`,label:`甘特图`},{id:`kanban`,icon:`layout-dashboard`,label:`看板`}],active:this.currentView,onChange:e=>{this.currentView=e,this.renderCurrentView()}});let n=this.toolbarEl.createDiv(`pm-toolbar-right`);new e.ButtonComponent(n).setButtonText(`+ 添加任务`).setCta().onClick(()=>{this.project&&Q(this.plugin,this.project,{onSave:async()=>{await this.refreshProject()}})}),this.currentView===`gantt`&&new e.ButtonComponent(n).setButtonText(`+ 里程碑`).onClick(()=>{this.project&&Q(this.plugin,this.project,{defaults:{type:`milestone`},onSave:async()=>{await this.refreshProject()}})}),new e.ExtraButtonComponent(n).setIcon(`settings`).setTooltip(`项目设置`).onClick(()=>{Xf(this.plugin,{project:this.project})})}renderCurrentView(){if(!this.project)return;let e=null,t=null;this.currentView===`gantt`&&this.subview instanceof Am&&(e=this.subview.getScrollPosition(),t=this.subview.getLabelWidth());let n=null;switch(this.subview instanceof Yp?(this.savedTableViewState=this.subview.getViewState(),this.currentView===`table`&&(n=this.subview.getScrollTop())):this.currentView!==`table`&&(this.savedTableViewState=null),this.subview?.destroy?.(),this.bodyEl.empty(),this.subview=null,this.currentView){case`table`:{let e=new Yp(this.bodyEl,this.project,this.plugin,()=>this.refreshProject(),this.filter,this.savedTableViewState??void 0);n!==null&&e.setPendingScrollTop(n),this.subview=e;break}case`gantt`:{let n=new Am(this.bodyEl,this.project,this.plugin,()=>this.refreshProject(),this.filter);e&&n.setPendingScroll(e),t!==null&&n.setLabelWidth(t),this.subview=n;break}case`kanban`:this.subview=new Pm(this.bodyEl,this.project,this.plugin,()=>this.refreshProject(),this.filter,this.kanbanGroupBy)}this.bodyEl.toggleClass(`pm-content--kanban`,this.currentView===`kanban`),this.subview?.render()}refreshProject(){return this.pendingRefresh||=new Promise(e=>{window.setTimeout(()=>{this.pendingRefresh=null,this.project&&(this.subview?.refresh?this.subview.refresh():this.subview?this.subview.render():this.renderCurrentView()),e()},0)}),this.pendingRefresh}},Wm=class{el;iconEl;titleEl;bodyEl;actionEl;constructor(e){this.el=e.createDiv(`pm-empty-state`)}setIcon(e){return this.iconEl??=this.el.createDiv(`pm-empty-icon`),this.iconEl.setText(e),this}setTitle(e){return this.titleEl??=this.el.createEl(`h3`),this.titleEl.setText(e),this}setBody(e){return this.bodyEl??=this.el.createEl(`p`),this.bodyEl.setText(e),this}setAction(t,n){return this.actionEl||=this.el.createDiv(`pm-empty-action`),this.actionEl.empty(),new e.ButtonComponent(this.actionEl).setButtonText(t).setCta().onClick(n),this}},Gm=class{el;constructor(e,t){let n=e.createDiv(`pm-project-card`);this.el=n,n.createDiv(`pm-project-card-bar`).setCssStyles({background:t.color});let r=n.createDiv(`pm-project-card-body`);r.createDiv({text:t.icon,cls:`pm-project-card-icon`}),r.createEl(`h3`,{text:t.title,cls:`pm-project-card-title`}),r.createDiv(`pm-project-card-meta`).createSpan({text:`${t.tasksDone}/${t.tasksTotal} 个事项`,cls:`pm-project-card-tasks`});let i=t.tasksTotal?t.tasksDone/t.tasksTotal*100:0;new pp(r).setSize(`sm`).setValue(i).setColor(t.color),n.addEventListener(`click`,()=>t.onClick()),n.addEventListener(`contextmenu`,e=>t.onContextMenu(e))}};function Km(t){t.toolbarEl.empty(),t.toolbarEl.createEl(`h2`,{text:`项目管理`,cls:`pm-toolbar-title`}),new e.ButtonComponent(t.toolbarEl).setButtonText(`+ 新建项目`).setCta().onClick(()=>Jm(t))}async function qm(t){let n=await t.plugin.store.loadAllProjects(t.plugin.settings.projectsFolder);if(t.isStale())return;if(t.contentEl.empty(),n.length===0){new Wm(t.contentEl).setIcon(`📋`).setTitle(`暂无项目`).setBody(`创建第一个项目即可开始使用。`).setAction(`+ 新建项目`,()=>Jm(t));return}let r=[{id:`active`,label:`进行中`,projects:[]},{id:`pending`,label:`待开始`,projects:[]},{id:`backlog`,label:`待规划`,projects:[]},{id:`completed`,label:`已完成`,projects:[]}];for(let e of n){let t=Xm(e.tasks,!1),n=Xm(e.tasks,!0),i=String(e.status??``).toLowerCase(),a=e.id.endsWith(`-backlog`)?`backlog`:[`done`,`closed`].includes(i)||t>0&&n===t?`completed`:[`wait`,`waiting`,`draft`,`planned`].includes(i)||n===0?`pending`:`active`;r.find(e=>e.id===a)?.projects.push({project:e,tasksTotal:t,tasksDone:n})}for(let n of r){if(!n.projects.length)continue;let r=t.contentEl.createDiv(`pm-project-section`);r.setCssStyles({marginBottom:`28px`});let i=r.createEl(`h3`,{text:`${n.label}（${n.projects.length}）`,cls:`pm-project-section-title`});i.setCssStyles({margin:`0 0 12px`,fontSize:`16px`,color:`var(--text-normal)`});let a=r.createDiv(`pm-project-grid`);for(let r of n.projects){let n=r.project,i=r.tasksTotal,o=r.tasksDone;new Gm(a,{title:n.title,icon:n.icon,color:n.color,tasksDone:o,tasksTotal:i,onClick:Y(async()=>{let r=t.plugin.app.vault.getAbstractFileByPath(n.filePath);r instanceof e.TFile&&await t.openProjectFile(r)}),onContextMenu:e=>Ym(t,n,e)})}}}function Jm(t){Xf(t.plugin,{onSave:async n=>{let r=t.plugin.app.vault.getAbstractFileByPath(n.filePath);r instanceof e.TFile&&await t.openProjectFile(r)}})}function Ym(t,n,r){let i=new e.Menu;i.addItem(e=>e.setTitle(`编辑项目`).setIcon(`settings`).onClick(()=>{Xf(t.plugin,{project:n,onSave:async()=>{await qm(t)}})})),i.addItem(e=>e.setTitle(`删除项目`).setIcon(`trash`).onClick(Y(async()=>{await t.plugin.store.deleteProject(n),await qm(t)}))),i.showAtMouseEvent(r)}function Xm(e,t){let n=0;for(let r of e)(!t||r.completed)&&n++,n+=Xm(r.subtasks,t);return n}const Zm=`pm-dashboard`;var Qm=class extends e.ItemView{plugin;toolbarEl;bodyEl;renderToken=0;reloadDebounceTimer=null;constructor(e,t){super(e),this.plugin=t,this.navigation=!1}getViewType(){return Zm}getDisplayText(){return`项目`}getIcon(){return`chart-gantt`}onOpen(){this.containerEl.addClass(`pm-view`);let e=this.contentEl;return e.empty(),e.addClass(`pm-root`),this.toolbarEl=e.createDiv(`pm-toolbar`),this.bodyEl=e.createDiv(`pm-content`),this.render(),this.registerVaultListeners(),Promise.resolve()}onClose(){return this.reloadDebounceTimer!==null&&(window.clearTimeout(this.reloadDebounceTimer),this.reloadDebounceTimer=null),Promise.resolve()}registerVaultListeners(){let e=e=>{let t=this.plugin.settings.projectsFolder;return e===t||e.startsWith(`${t}/`)},t=t=>{e(t)&&(this.reloadDebounceTimer!==null&&window.clearTimeout(this.reloadDebounceTimer),this.reloadDebounceTimer=window.setTimeout(()=>{this.reloadDebounceTimer=null,this.render()},300))};this.register(this.plugin.store.onProjectChanged(t)),this.registerEvent(this.app.vault.on(`create`,e=>t(e.path))),this.registerEvent(this.app.vault.on(`delete`,e=>t(e.path))),this.registerEvent(this.app.vault.on(`rename`,(e,n)=>{t(e.path),t(n)}))}render(){let e=this.makeCtx();Km(e),this.bodyEl.empty(),this.bodyEl.addClass(`pm-project-list-container`),qm(e)}makeCtx(){let e=++this.renderToken;return{plugin:this.plugin,toolbarEl:this.toolbarEl,contentEl:this.bodyEl,isStale:()=>e!==this.renderToken,openProjectFile:e=>this.plugin.router.openProject(e)}}},$m=class{plugin;constructor(e){this.plugin=e}async openDashboard(){let e=this.plugin.app.workspace,t=e.getLeaf(`tab`);await t.setViewState({type:Zm,state:{}}),await e.revealLeaf(t)}async openProject(e){let t=this.plugin.app.workspace,n=t.getLeaf(`tab`);await n.setViewState({type:Hm,state:{filePath:e.path}}),await t.revealLeaf(n)}async openProjectByPath(t){let n=this.plugin.app.vault.getAbstractFileByPath(t);n instanceof e.TFile&&await this.openProject(n)}},eh=class{plugin;intervalId=null;notifiedIds=new Set;constructor(e){this.plugin=e}start(){this.check(),this.intervalId=window.setInterval(()=>{this.check()},36e5),this.plugin.registerInterval(this.intervalId)}stop(){this.intervalId!==null&&(window.clearInterval(this.intervalId),this.intervalId=null)}async check(){if(!this.plugin.settings.notificationsEnabled)return;let t=this.plugin.settings.notificationLeadDays,n=Zl(),r=n.add({days:t}),i;try{i=await this.plugin.store.loadAllProjects(this.plugin.settings.projectsFolder)}catch{return}for(let t of i){let i=q(t.tasks);for(let{task:a}of i){let i=K(a.due);if(!i||a.completed)continue;let o=G.PlainDate.compare(i,n),s=o<0,c=o>=0&&G.PlainDate.compare(i,r)<=0,l=`${a.id}-${a.due}`;if(s&&!this.notifiedIds.has(l+`-overdue`)){this.notifiedIds.add(l+`-overdue`);let r=n.since(i,{largestUnit:`days`}).days;new e.Notice(`⚠️ 已逾期：${t.title}中的“${a.title}”已逾期 ${r} 天`,8e3)}else if(c&&!this.notifiedIds.has(l+`-soon`)){this.notifiedIds.add(l+`-soon`);let r=i.since(n,{largestUnit:`days`}).days,o=r===0?`📅 今天到期：${t.title}中的“${a.title}”`:`📅 ${r} 天后到期：${t.title}中的“${a.title}”`;new e.Notice(o,6e3)}}}}};async function th(t){let n=t.settings.projectsFolder,r=t.app.vault.getMarkdownFiles().filter(e=>e.path.startsWith(n+`/`)),i=0;for(let n of r)try{let{frontmatter:r}=Ru(await t.app.vault.read(n));if(!r||r[`pm-project`]!==!0||!Vu(r))continue;let a=await t.store.loadProject(n);if(!a||a.tasks.length===0)continue;new e.Notice(`正在迁移项目：${a.title}……`),await t.store.saveProject(a),i++}catch(t){console.error(`[PM] Migration failed for ${n.path}:`,t),new e.Notice(`项目管理：迁移“${n.basename}”失败，请查看控制台了解详情。`)}i>0&&new e.Notice(`项目管理：已将 ${i} 个项目迁移为新格式。`)}var nh=class extends e.Plugin{settings={...tu};store;notifier;router;undoStack=[];redoStack=[];pushUndo(e){this.undoStack.push(e),this.undoStack.length>20&&this.undoStack.shift(),this.redoStack=[]}async undoLastAction(){let e=this.undoStack.pop();e&&(await e.undo(),this.redoStack.push(e))}async redoLastAction(){let e=this.redoStack.pop();e&&(await e.redo(),this.undoStack.push(e))}async onload(){await this.loadSettings(),this.store=new Td(this.app,()=>this.settings),this.store.registerVaultSync(this),this.notifier=new eh(this),this.router=new $m(this),this.registerObsidianProtocolHandler(`open-projects`,async()=>{await this.router.openDashboard()}),this.registerView(Hm,e=>new Um(e,this)),this.registerView(Zm,e=>new Qm(e,this)),this.app.workspace.onLayoutReady(Y(async()=>{await th(this),await this.cleanupStaleProjectFilters()})),this.addRibbonIcon(`chart-gantt`,`项目管理`,async()=>{await this.router.openDashboard()}),this.addCommand({id:`open-projects`,name:`打开项目管理面板`,callback:()=>{this.router.openDashboard()}}),this.addCommand({id:`new-project`,name:`新建项目`,callback:()=>{Xf(this,{onSave:async e=>{await this.router.openProjectByPath(e.filePath)}})}}),this.addCommand({id:`new-task`,name:`新建任务`,callback:()=>{this.pickProjectThenCreateTask(null)}}),this.addCommand({id:`new-subtask`,name:`新建子任务`,callback:()=>{this.pickProjectThenCreateTask(`pick-parent`)}}),this.addCommand({id:`undo-last-action`,name:`撤销上一步操作`,callback:()=>{this.undoLastAction()}}),this.addCommand({id:`redo-last-action`,name:`重做上一步操作`,callback:()=>{this.redoLastAction()}}),this.addCommand({id:`import-notes-as-tasks`,name:`将笔记导入为任务`,callback:()=>{this.importNotes()}}),this.addCommand({id:`create-task-from-selection`,name:`根据选中文本创建任务`,editorCheckCallback:(e,t)=>{let n=t.getSelection().trim();return n?(e||this.createTaskFromText(n),!0):!1}}),this.registerEvent(this.app.workspace.on(`editor-menu`,(e,t)=>{let n=t.getSelection().trim();n&&e.addItem(e=>e.setTitle(`根据选中文本创建任务`).setIcon(`list-plus`).onClick(()=>void this.createTaskFromText(n)))})),this.addCommand({id:`open-current-as-project`,name:`将当前文件作为项目打开`,checkCallback:t=>{let n=this.app.workspace.getActiveViewOfType(e.MarkdownView),r=n?.file;return!r||this.app.metadataCache.getFileCache(r)?.frontmatter?.[`pm-project`]!==!0?!1:(t||n.leaf.setViewState({type:Hm,state:{filePath:r.path}}),!0)}}),this.addSettingTab(new Qd(this.app,this)),this.notifier.start()}onunload(){this.notifier.stop()}async loadSettings(){let e=await this.loadData();this.settings=Object.assign({},tu,e??{}),e?.stages?.length||(this.settings.stages=tu.stages),e?.statuses?.length||(this.settings.statuses=tu.statuses),e?.priorities?.length||(this.settings.priorities=tu.priorities),this.settings.projectFilters||(this.settings.projectFilters={}),this.settings.collapsedTasks||(this.settings.collapsedTasks={}),this.settings.tableColumnWidths||(this.settings.tableColumnWidths={});for(let e of Object.values(this.settings.projectFilters))Array.isArray(e.filter.stages)||(e.filter.stages=[]),Array.isArray(e.filter.participants)||(e.filter.participants=[]);let t=!1;for(let e of this.settings.statuses)e.complete===void 0&&(e.complete=e.id===`done`||e.id===`cancelled`,t=!0);if((e??{}).ganttHideDone===!0){let e=this.settings.statuses.filter(e=>!e.complete).map(e=>e.id);for(let t of Object.values(this.settings.projectFilters))t.filter.statuses.length===0&&(t.filter.statuses=e);t=!0}t&&await this.saveSettings()}async cleanupStaleProjectFilters(){let e=this.settings.projectFilters,t={},n=!1;for(let[r,i]of Object.entries(e))this.app.vault.getAbstractFileByPath(r)?t[r]=i:n=!0;let r={};for(let[e,t]of Object.entries(this.settings.collapsedTasks))this.app.vault.getAbstractFileByPath(e)?r[e]=t:n=!0;n&&(this.settings.projectFilters=t,this.settings.collapsedTasks=r,await this.saveSettings())}applyCollapsedState(e){let t=this.settings.collapsedTasks[e.filePath];if(!t)return;let n=new Set(t);for(let{task:t}of q(e.tasks))t.collapsed=n.has(t.id)}async persistCollapsedState(e){this.settings.collapsedTasks[e.filePath]=q(e.tasks).filter(e=>e.task.collapsed).map(e=>e.task.id),await this.saveSettings()}async toggleTaskCollapsed(e,t){let n=ou(e.tasks,t);n&&(n.collapsed=!n.collapsed,await this.persistCollapsedState(e))}async saveSettings(){await this.saveData(this.settings)}showNotice(t,n=3e3){new e.Notice(t,n)}refreshProjectViews(){for(let e of this.app.workspace.getLeavesOfType(Hm))e.view instanceof Um&&e.view.refreshProject()}async pickProjectThenCreateTask(e){let t=await this.store.loadAllProjects(this.settings.projectsFolder);if(!t.length){this.showNotice(`暂无项目，请先创建项目。`);return}Zf(this,t,t=>{if(e===`pick-parent`){let e=q(t.tasks);if(!e.length){this.showNotice(`当前项目暂无任务，请先创建任务。`);return}Qf(this,e.map(e=>e.task),e=>{this.openTaskModalForProject(t,e.id)})}else this.openTaskModalForProject(t,null)})}openTaskModalForProject(e,t,n){Q(this,e,{parentId:t,defaults:n,onSave:async()=>{await this.store.saveProject(e),await this.router.openProjectByPath(e.filePath)}})}async createTaskFromText(e){let t=e.trim();if(!t)return;let n=t.indexOf(`
`),r=n===-1?{title:t}:{title:t.slice(0,n).trim(),description:t.slice(n+1).trim()},i=await this.store.loadAllProjects(this.settings.projectsFolder);if(!i.length){this.showNotice(`暂无项目，请先创建项目。`);return}if(i.length===1){this.openTaskModalForProject(i[0],null,r);return}Zf(this,i,e=>{this.openTaskModalForProject(e,null,r)})}async importNotes(){let e=this.app.workspace.getLeavesOfType(Hm),t=null;for(let n of e)if(n.view instanceof Um&&n.view.project){t=n.view.project;break}if(t){let e=t;$f(this,t,async()=>{await this.router.openProjectByPath(e.filePath)});return}let n=await this.store.loadAllProjects(this.settings.projectsFolder);if(!n.length){this.showNotice(`暂无项目，请先创建项目。`);return}Zf(this,n,e=>{$f(this,e,async()=>{await this.router.openProjectByPath(e.filePath)})})}};module.exports=nh;

/**
 * 判断当前事项是否直接命中文本搜索条件。
 */
function projectSearchMatchesTaskText(task, text) {
  const keyword = text.trim().toLowerCase();
  if (!keyword) return false;

  const completedBy = String(task.customFields.completedBy ?? ``).toLowerCase();
  return task.id.toLowerCase() === keyword
    || projectSearchMatchesZentaoId(task, keyword)
    || task.title.toLowerCase().includes(keyword)
    || task.stage.includes(keyword)
    || task.status.includes(keyword)
    || task.priority.includes(keyword)
    || task.assignees.some((assignee) => assignee.toLowerCase().includes(keyword))
    || completedBy.includes(keyword)
    || task.tags.some((tag) => tag.toLowerCase().includes(keyword));
}

/**
 * 克隆需求下的可见任务树，避免搜索结果视图直接复用原始层级数组。
 */
function projectSearchCloneVisibleTasks(tasks, showArchived) {
  const visibleTasks = [];

  for (const task of tasks) {
    if (task.archived && !showArchived) continue;

    visibleTasks.push({
      ...task,
      subtasks: projectSearchCloneVisibleTasks(task.subtasks, showArchived),
    });
  }

  return visibleTasks;
}

/**
 * 收集需求下需要随搜索结果展示的任务 ID。
 */
function projectSearchCollectVisibleTaskIds(tasks, showArchived, taskIds) {
  for (const task of tasks) {
    if (task.archived && !showArchived) continue;

    taskIds.add(task.id);
    projectSearchCollectVisibleTaskIds(task.subtasks, showArchived, taskIds);
  }
}

/**
 * 过滤表格使用的扁平事项列表，需求命中搜索时将其后代任务一并加入结果。
 */
function Ad(entries, filter, statuses = []) {
  const matchedTaskIds = new Set();

  for (const entry of entries) {
    if (Od(entry.task, filter, statuses)) matchedTaskIds.add(entry.task.id);
  }

  if (filter.text.trim()) {
    for (const entry of entries) {
      const requirementMatched = matchedTaskIds.has(entry.task.id)
        && quickSourceType(entry.task) === `requirement`
        && projectSearchMatchesTaskText(entry.task, filter.text);

      if (requirementMatched) {
        projectSearchCollectVisibleTaskIds(entry.task.subtasks, filter.showArchived, matchedTaskIds);
      }
    }
  }

  return entries.filter((entry) => matchedTaskIds.has(entry.task.id));
}

/**
 * 按层级过滤事项。文本搜索直接命中需求时，保留该需求下的完整可见任务树。
 */
function kd(tasks, filter, statuses = []) {
  const result = [];

  for (const task of tasks) {
    const filteredSubtasks = task.subtasks.length ? kd(task.subtasks, filter, statuses) : [];

    if (Od(task, filter, statuses)) {
      const requirementMatched = quickSourceType(task) === `requirement`
        && projectSearchMatchesTaskText(task, filter.text);
      const subtasks = requirementMatched
        ? projectSearchCloneVisibleTasks(task.subtasks, filter.showArchived)
        : filteredSubtasks;

      result.push({
        ...task,
        collapsed: requirementMatched ? false : task.collapsed,
        subtasks,
      });
    } else {
      result.push(...filteredSubtasks);
    }
  }

  return result;
}

/**
 * 表格虚拟滚动的缓冲行数和默认可视高度。
 */
const PM_ITERATION_TABLE_OVERSCAN = 8;
const PM_ITERATION_TABLE_VIRTUAL_THRESHOLD = 120;
const PM_ITERATION_TABLE_FALLBACK_VIEWPORT = 600;
const PM_ITERATION_TABLE_PAGE_OVERSCAN = 24;
const PM_ITERATION_TABLE_MEDIUM_OVERSCAN = 48;
const PM_ITERATION_TABLE_FAST_OVERSCAN = 96;
const PM_ITERATION_TABLE_MEDIUM_VELOCITY = 0.8;
const PM_ITERATION_TABLE_FAST_VELOCITY = 2;
const PM_ITERATION_TABLE_INITIAL_BATCH = 24;
const PM_ITERATION_TABLE_APPEND_BATCH = 16;

/**
 * 根据整页滚动位置计算表格可见行，避免进入大迭代时一次创建全部事项节点。
 */
function Np(state) {
  const wrapper = state.wrapper;
  const pageRoot = wrapper?.closest(`.pm-project-detail-root--table`);
  if (wrapper && pageRoot) {
    const rootRect = pageRoot.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const tableHeader = wrapper.querySelector(`thead`);
    const tableHeaderHeight = tableHeader instanceof HTMLElement ? tableHeader.offsetHeight : 0;
    const stickyFilter = pageRoot.querySelector(`:scope > .pm-iteration-filter-sticky`);
    const stickyBottom = stickyFilter instanceof HTMLElement
      ? stickyFilter.getBoundingClientRect().bottom
      : rootRect.top;
    const visibleRowTop = Math.max(0, stickyBottom - wrapperRect.top);
    const visibleRowBottom = Math.max(0, rootRect.bottom - wrapperRect.top - tableHeaderHeight);
    const velocity = Number(state.pageScrollVelocity ?? 0);
    const directionalOverscan = velocity >= PM_ITERATION_TABLE_FAST_VELOCITY
      ? PM_ITERATION_TABLE_FAST_OVERSCAN
      : velocity >= PM_ITERATION_TABLE_MEDIUM_VELOCITY
        ? PM_ITERATION_TABLE_MEDIUM_OVERSCAN
        : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    const scrollingUp = state.pageScrollDirection === `up`;
    const scrollingDown = state.pageScrollDirection === `down`;
    const beforeOverscan = scrollingUp ? directionalOverscan : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    const afterOverscan = scrollingDown ? directionalOverscan : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    let start = Math.floor(visibleRowTop / state.rowHeight) - beforeOverscan;
    let end = Math.ceil(visibleRowBottom / state.rowHeight) + afterOverscan;

    if (start < 0) start = 0;
    if (start > state.visibleRows.length) start = state.visibleRows.length;
    if (end > state.visibleRows.length) end = state.visibleRows.length;
    if (end < start) end = start;
    return { start, end };
  }

  if (state.visibleRows.length <= PM_ITERATION_TABLE_VIRTUAL_THRESHOLD) {
    return { start: 0, end: state.visibleRows.length };
  }

  if (!wrapper) return { start: 0, end: state.visibleRows.length };

  const tableHeader = wrapper.querySelector(`thead`);
  const tableHeaderHeight = tableHeader instanceof HTMLElement ? tableHeader.offsetHeight : 0;
  const scrollTop = Math.max(0, wrapper.scrollTop - tableHeaderHeight);
  const viewportHeight = wrapper.clientHeight || PM_ITERATION_TABLE_FALLBACK_VIEWPORT;
  let start = Math.floor(scrollTop / state.rowHeight) - PM_ITERATION_TABLE_OVERSCAN;
  if (start < 0) start = 0;

  let end = Math.ceil((scrollTop + viewportHeight) / state.rowHeight) + PM_ITERATION_TABLE_OVERSCAN;
  if (end > state.visibleRows.length) end = state.visibleRows.length;
  return { start, end };
}

/**
 * 逐帧追加完整表格行；已经渲染的事项不会再因滚动被删除或替换。
 */
function pmAppendIterationTableBatch(context, generation) {
  const state = context.state;
  const tableBody = state.tableBody;
  if (!tableBody || state.pageProgressiveGeneration !== generation) return;

  const visibleRows = state.visibleRows;
  const start = state.pageProgressiveRendered ?? 0;
  const batchSize = start === 0
    ? PM_ITERATION_TABLE_INITIAL_BATCH
    : PM_ITERATION_TABLE_APPEND_BATCH;
  const end = Math.min(start + batchSize, visibleRows.length);
  const spacer = tableBody.querySelector(`.pm-table-progressive-spacer`);
  if (!(spacer instanceof HTMLElement)) return;

  const stagingBody = activeDocument.createElement(`tbody`);
  for (let index = start; index < end; index += 1) {
    const visibleRow = visibleRows[index];
    Cp(
      stagingBody,
      visibleRow.task,
      visibleRow.depth,
      context,
      visibleRow.groupTone ?? `a`,
    );
  }
  for (const row of [...stagingBody.children]) tableBody.insertBefore(row, spacer);

  state.pageProgressiveRendered = end;
  state.windowStart = 0;
  state.windowEnd = end;

  if (!state.heightCalibrated) {
    const firstRow = tableBody.querySelector(`tr[data-task-id]`);
    if (firstRow instanceof HTMLElement && firstRow.offsetHeight > 0) {
      state.heightCalibrated = true;
      if (Math.abs(firstRow.offsetHeight - state.rowHeight) > 0.5) {
        state.rowHeight = firstRow.offsetHeight;
      }
    }
  }

  if (end >= visibleRows.length) {
    spacer.remove();
    state.pageProgressiveFrame = null;
    return;
  }

  const spacerCell = spacer.firstElementChild;
  if (spacerCell instanceof HTMLElement) {
    spacerCell.style.height = `${(visibleRows.length - end) * state.rowHeight}px`;
  }
  state.pageProgressiveFrame = window.requestAnimationFrame(() => {
    state.pageProgressiveFrame = null;
    pmAppendIterationTableBatch(context, generation);
  });
}

/**
 * 当筛选、排序或数据发生变化时重新启动渐进式完整渲染。
 */
function Pp(context) {
  const state = context.state;
  const tableBody = state.tableBody;
  if (!tableBody) return;

  if (state.pageVisibleRowsReference === state.visibleRows) return;

  if (state.pageProgressiveFrame !== null && state.pageProgressiveFrame !== undefined) {
    window.cancelAnimationFrame(state.pageProgressiveFrame);
  }
  state.pageProgressiveFrame = null;
  state.pageVisibleRowsReference = state.visibleRows;
  state.pageProgressiveRendered = 0;
  state.pageProgressiveGeneration = (state.pageProgressiveGeneration ?? 0) + 1;
  state.windowStart = 0;
  state.windowEnd = 0;

  const columnCount = 14 + Ip(context.project).length;
  const stagingBody = activeDocument.createElement(`tbody`);
  const spacer = stagingBody.createEl(`tr`, {
    cls: `pm-table-spacer pm-table-progressive-spacer`,
  });
  spacer.createEl(`td`, { attr: { colspan: String(columnCount) } }).setCssStyles({
    height: `${state.visibleRows.length * state.rowHeight}px`,
  });
  const addRow = stagingBody.createEl(`tr`, { cls: `pm-table-add-row` });
  const addCell = addRow.createEl(`td`, { attr: { colspan: String(columnCount) } });
  Sf(addCell, `添加任务`, () => {
    Q(context.plugin, context.project, { onSave: () => context.onRefresh() });
  });
  tableBody.replaceChildren(...stagingBody.children);
  pmAppendIterationTableBatch(context, state.pageProgressiveGeneration);
}

const PM_ITERATION_DEVELOPMENT_STAGES = new Set([`devel`, `developing`, `developed`]);
const PM_ITERATION_TEST_STAGES = new Set([`test`, `testing`, `tested`]);
const PM_ITERATION_WAIT_STATUSES = new Set([`draft`, `wait`, `todo`, `planned`]);
const PM_ITERATION_BLOCKED_STATUSES = new Set([`blocked`, `pause`, `paused`, `suspended`]);
const PM_ITERATION_MEMBER_LIMIT = 5;
const PM_ITERATION_UNASSIGNED = `未分配`;
const PM_ITERATION_ROLE_LABELS = {
  'project-management': `项目管理`,
  'product-manager': `产品经理`,
  'frontend-development': `前端开发`,
  'backend-development': `后端开发`,
  testing: `测试`,
};

/**
 * 判断事项是否属于取消状态，取消事项不进入迭代进度和工时分母。
 */
function pmIterationIsCancelled(task) {
  return [`cancel`, `cancelled`, `canceled`].includes(String(task.status ?? ``).trim().toLowerCase());
}

/**
 * 获取事项在迭代概览中的互斥进度状态。
 */
function pmIterationTaskState(task, statuses) {
  if (quickIsComplete(task, statuses)) return `completed`;

  const status = String(task.status ?? ``).trim().toLowerCase();
  const consumedHours = gu(task);
  const started = Number(task.progress ?? 0) > 0
    || consumedHours > 0
    || Boolean(task.customFields?.actualStartedAt)
    || !PM_ITERATION_WAIT_STATUSES.has(status);

  return started ? `ongoing` : `pending`;
}

/**
 * 识别需求、开发任务、测试任务和其他任务，需求优先于阶段判断。
 */
function pmIterationTaskKind(task) {
  const sourceType = quickSourceType(task);
  if (sourceType === `requirement`) return `requirement`;
  if (sourceType !== `task`) return `other`;

  const stage = String(task.stage ?? ``).trim().toLowerCase();
  if (PM_ITERATION_TEST_STAGES.has(stage)) return `testing`;
  if (PM_ITERATION_DEVELOPMENT_STAGES.has(stage)) return `development`;
  return `other`;
}

/**
 * 计算单类事项的数量和完成率。
 */
function pmIterationCategoryMetric(tasks, statuses) {
  const completed = tasks.filter((task) => pmIterationTaskState(task, statuses) === `completed`);
  const ongoing = tasks.filter((task) => pmIterationTaskState(task, statuses) === `ongoing`);
  const pending = tasks.filter((task) => pmIterationTaskState(task, statuses) === `pending`);

  return {
    tasks,
    total: tasks.length,
    completed: completed.length,
    ongoing: ongoing.length,
    pending: pending.length,
    unfinished: ongoing.length + pending.length,
    completionRate: tasks.length > 0 ? Math.round(completed.length / tasks.length * 100) : 0,
  };
}

/**
 * 获取任务剩余工时，禅道同步值优先，本地任务按预计与消耗差额回退。
 */
function pmIterationRemainingHours(task, estimate, consumed, completed) {
  const syncedRemaining = projectSyncedHours(task, `displayRemainingHours`)
    ?? projectSyncedHours(task, `remainingHours`);
  if (syncedRemaining !== null) return syncedRemaining;
  return completed ? 0 : Math.max(estimate - consumed, 0);
}

/**
 * 将工时保留一位小数，并省略无意义的小数零。
 */
function pmIterationFormatHours(value) {
  const rounded = Math.round((Number(value) || 0) * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}h`;
}

/**
 * 汇总全部任务及人员工时，需求汇总字段不参与，避免和需求下任务重复计算。
 */
function pmIterationEffortSummary(tasks, statuses) {
  const summary = {
    estimate: 0,
    consumed: 0,
    remaining: 0,
    overrun: 0,
    unestimated: 0,
    members: new Map(),
  };

  for (const task of tasks) {
    if (quickSourceType(task) !== `task`) continue;

    const state = pmIterationTaskState(task, statuses);
    const completed = state === `completed`;
    const estimate = projectEstimateHours(task);
    const consumed = gu(task);
    const remaining = pmIterationRemainingHours(task, estimate, consumed, completed);
    const overrun = estimate > 0 ? Math.max(consumed - estimate, 0) : 0;
    const completedBy = completed ? String(task.customFields?.completedBy ?? ``).trim() : ``;
    const memberName = completedBy || task.assignees?.[0] || PM_ITERATION_UNASSIGNED;

    summary.estimate += estimate;
    summary.consumed += consumed;
    summary.remaining += remaining;
    summary.overrun += overrun;
    if (estimate <= 0) summary.unestimated += 1;

    let member = summary.members.get(memberName);
    if (!member) {
      member = {
        name: memberName,
        total: 0,
        completed: 0,
        ongoing: 0,
        pending: 0,
        estimate: 0,
        consumed: 0,
        remaining: 0,
        overrun: 0,
      };
      summary.members.set(memberName, member);
    }

    member.total += 1;
    member[state] += 1;
    member.estimate += estimate;
    member.consumed += consumed;
    member.remaining += remaining;
    member.overrun += overrun;
  }

  summary.members = [...summary.members.values()].sort((left, right) => {
    if (right.overrun !== left.overrun) return right.overrun - left.overrun;
    if (right.remaining !== left.remaining) return right.remaining - left.remaining;
    return right.consumed - left.consumed;
  });

  return summary;
}

/**
 * 判断未完成事项是否已经逾期。
 */
function pmIterationIsOverdue(task, statuses) {
  if (quickIsComplete(task, statuses)) return false;

  const due = K(task.due);
  return due ? G.PlainDate.compare(due, Zl()) < 0 : false;
}

/**
 * 生成迭代详情顶部概览所需的全量数据，不受当前临时筛选影响。
 */
function pmIterationSummary(project, statuses) {
  const tasks = q(project.tasks)
    .map((entry) => entry.task)
    .filter((task) => !task.archived && !pmIterationIsCancelled(task));
  const requirements = tasks.filter((task) => pmIterationTaskKind(task) === `requirement`);
  const developmentTasks = tasks.filter((task) => pmIterationTaskKind(task) === `development`);
  const testingTasks = tasks.filter((task) => pmIterationTaskKind(task) === `testing`);
  const actualTasks = tasks.filter((task) => quickSourceType(task) === `task`);
  const effort = pmIterationEffortSummary(actualTasks, statuses);

  return {
    categories: [
      { id: `requirement`, label: `需求`, metric: pmIterationCategoryMetric(requirements, statuses) },
      { id: `development`, label: `开发任务`, metric: pmIterationCategoryMetric(developmentTasks, statuses) },
      { id: `testing`, label: `测试任务`, metric: pmIterationCategoryMetric(testingTasks, statuses) },
    ],
    effort,
    risks: {
      overdueRequirements: requirements.filter((task) => pmIterationIsOverdue(task, statuses)).length,
      blockedTasks: actualTasks.filter((task) => !quickIsComplete(task, statuses)
        && PM_ITERATION_BLOCKED_STATUSES.has(String(task.status ?? ``).toLowerCase())).length,
      unassignedTasks: actualTasks.filter((task) => !quickIsComplete(task, statuses)
        && (!Array.isArray(task.assignees) || task.assignees.length === 0)).length,
      unestimatedTasks: effort.unestimated,
      overrunTasks: actualTasks.filter((task) => {
        const estimate = projectEstimateHours(task);
        return estimate > 0 && gu(task) > estimate;
      }).length,
    },
  };
}

/**
 * 重置临时筛选并设置概览卡片对应的事项类型。
 */
function pmIterationConfigureCategoryFilter(view, categoryId) {
  Object.assign(view.filter, au());

  if (categoryId === `requirement`) {
    view.filter.quickSource = `requirement`;
  } else if (categoryId === `development`) {
    view.filter.quickSource = `task`;
    view.filter.stages = [...PM_ITERATION_DEVELOPMENT_STAGES];
  } else if (categoryId === `testing`) {
    view.filter.quickSource = `task`;
    view.filter.stages = [...PM_ITERATION_TEST_STAGES];
  }
}

/**
 * 将概览交互产生的筛选应用到下方事项视图。
 */
function pmIterationCommitFilter(view) {
  view.activeSavedViewId = null;
  view.kanbanGroupBy = view.filter.quickSource === `task` ? `status` : `stage`;
  view.renderProjectHeader();
  pmRenderIterationSummary(view);
  view.scheduleFilterRender();
}

/**
 * 点击分类及状态指标时，联动下方表格的临时筛选。
 */
function pmIterationApplyCategoryFilter(view, category, state = ``) {
  view.iterationSummaryActiveFilter = {
    kind: `category`,
    categoryId: category.id,
    state,
  };
  pmIterationConfigureCategoryFilter(view, category.id);
  view.filter.statuses = [...new Set(category.metric.tasks
    .map((task) => task.status)
    .filter(Boolean))];

  if (state === `completed`) {
    view.filter.quickCompletion = `completed`;
  } else if (state === `unfinished`) {
    view.filter.quickCompletion = `unfinished`;
  } else if (state === `ongoing` || state === `pending`) {
    view.filter.quickCompletion = `unfinished`;
    view.filter.statuses = [...new Set(category.metric.tasks
      .filter((task) => pmIterationTaskState(task, view.plugin.store.configFor(view.project).statuses) === state)
      .map((task) => task.status)
      .filter(Boolean))];
  }

  pmIterationCommitFilter(view);
}

/**
 * 点击人员行时，按负责人或完成者筛选下方事项。
 */
function pmIterationApplyMemberFilter(view, memberName) {
  view.iterationSummaryActiveFilter = {
    kind: `member`,
    memberName,
  };
  Object.assign(view.filter, au());
  view.filter.quickSource = `task`;

  if (memberName === PM_ITERATION_UNASSIGNED) {
    view.filter.quickOwnership = `unassigned`;
  } else {
    view.filter.participants = [memberName];
  }

  pmIterationCommitFilter(view);
}

/**
 * 点击风险指标时，应用当前筛选模型可以准确表达的风险条件。
 */
function pmIterationApplyRiskFilter(view, riskId) {
  view.iterationSummaryActiveFilter = {
    kind: `risk`,
    riskId,
  };
  Object.assign(view.filter, au());

  if (riskId === `overdue`) {
    view.filter.quickSource = `requirement`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.quickAttention = [`overdue`];
  } else if (riskId === `blocked`) {
    view.filter.quickSource = `task`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.statuses = [...PM_ITERATION_BLOCKED_STATUSES];
  } else if (riskId === `unassigned`) {
    view.filter.quickSource = `task`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.quickOwnership = `unassigned`;
  }

  pmIterationCommitFilter(view);
}

/**
 * 渲染需求、开发和测试任务进度卡片。
 */
function pmRenderIterationCategoryCard(container, view, category) {
  const activeFilter = view.iterationSummaryActiveFilter;
  const categoryActive = activeFilter?.kind === `category`
    && activeFilter.categoryId === category.id;
  const card = container.createDiv({
    cls: `pm-iteration-summary-card pm-iteration-summary-card--${category.id}`,
    attr: { role: `button`, tabindex: `0` },
  });
  card.toggleClass(`is-active`, categoryActive);
  card.addEventListener(`click`, () => pmIterationApplyCategoryFilter(view, category));
  card.addEventListener(`keydown`, (event) => {
    if (event.target !== card) return;
    if (event.key !== `Enter` && event.key !== ` `) return;

    event.preventDefault();
    pmIterationApplyCategoryFilter(view, category);
  });

  const header = card.createDiv(`pm-iteration-summary-card-header`);
  header.createSpan({ text: category.label, cls: `pm-iteration-summary-card-title` });
  header.createSpan({ text: `${category.metric.completionRate}%`, cls: `pm-iteration-summary-card-rate` });
  card.createDiv({ text: `共 ${category.metric.total} 项`, cls: `pm-iteration-summary-card-total` });

  const metrics = card.createDiv(`pm-iteration-summary-card-metrics`);
  const metricItems = [
    [`completed`, `已完成`, category.metric.completed],
    [`ongoing`, `进行中`, category.metric.ongoing],
    [`pending`, `待开始`, category.metric.pending],
    [`unfinished`, `未完成`, category.metric.unfinished],
  ];
  for (const [state, label, value] of metricItems) {
    const metricActive = categoryActive && activeFilter.state === state;
    const metric = metrics.createEl(`button`, {
      text: `${label} ${value}`,
      cls: `pm-iteration-summary-card-metric${metricActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    metric.addEventListener(`click`, (event) => {
      event.stopPropagation();
      pmIterationApplyCategoryFilter(view, category, state);
    });
  }

  const progress = card.createDiv(`pm-iteration-summary-progress`);
  progress.createDiv(`pm-iteration-summary-progress-fill`).setCssStyles({
    width: `${category.metric.completionRate}%`,
  });
}

/**
 * 渲染迭代总工时概览。
 */
function pmRenderIterationEffort(container, effort) {
  const effortContainer = container.createDiv(`pm-iteration-effort`);
  const items = [
    [`预计工时`, effort.estimate, ``],
    [`已消耗`, effort.consumed, ``],
    [`剩余工时`, effort.remaining, effort.remaining > 0 ? `is-warning` : ``],
    [`超时工时`, effort.overrun, effort.overrun > 0 ? `is-danger` : ``],
    [`未估时`, effort.unestimated, effort.unestimated > 0 ? `is-warning` : ``],
  ];

  for (const [label, value, tone] of items) {
    const item = effortContainer.createDiv(`pm-iteration-effort-item ${tone}`.trim());
    item.createSpan({ text: label, cls: `pm-iteration-effort-label` });
    item.createSpan({
      text: label === `未估时` ? `${value} 项` : pmIterationFormatHours(value),
      cls: `pm-iteration-effort-value`,
    });
  }
}

/**
 * 获取人员在当前迭代中的角色文案。
 */
function pmIterationMemberRole(view, memberName) {
  if (memberName === PM_ITERATION_UNASSIGNED) return `未分配`;

  const roles = pmEffectiveMemberRoles({ plugin: view.plugin }, view.project, memberName);
  return roles.length > 0
    ? roles.map((role) => PM_ITERATION_ROLE_LABELS[role] ?? role).join(`、`)
    : `未标记角色`;
}

/**
 * 渲染人员工时汇总，默认展示风险和剩余工时靠前的五人。
 */
function pmRenderIterationMembers(container, view, effort) {
  const section = container.createDiv(`pm-iteration-members`);
  const header = section.createDiv(`pm-iteration-members-heading`);
  header.createSpan({ text: `人员工时`, cls: `pm-iteration-members-title` });
  header.createSpan({ text: `共 ${effort.members.length} 人`, cls: `pm-iteration-members-count` });

  if (effort.members.length === 0) {
    section.createDiv({ text: `暂无人员工时数据`, cls: `pm-iteration-members-empty` });
    return;
  }

  const table = section.createDiv(`pm-iteration-members-table`);
  const tableHeader = table.createDiv(`pm-iteration-members-row pm-iteration-members-row--header`);
  for (const label of [`人员`, `任务进度`, `预计`, `消耗`, `剩余`, `工时状态`]) {
    tableHeader.createSpan({ text: label });
  }

  const visibleMembers = view.iterationSummaryMembersExpanded
    ? effort.members
    : effort.members.slice(0, PM_ITERATION_MEMBER_LIMIT);
  for (const member of visibleMembers) {
    const completionRate = member.total > 0 ? Math.round(member.completed / member.total * 100) : 0;
    const memberActive = view.iterationSummaryActiveFilter?.kind === `member`
      && view.iterationSummaryActiveFilter.memberName === member.name;
    const row = table.createEl(`button`, {
      cls: `pm-iteration-members-row pm-iteration-members-row--data${memberActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    row.addEventListener(`click`, () => pmIterationApplyMemberFilter(view, member.name));

    const identity = row.createSpan(`pm-iteration-member-identity`);
    identity.createSpan({ text: member.name, cls: `pm-iteration-member-name` });
    identity.createSpan({ text: pmIterationMemberRole(view, member.name), cls: `pm-iteration-member-role` });
    row.createSpan({ text: `${member.completed}/${member.total} · ${completionRate}%` });
    row.createSpan({ text: pmIterationFormatHours(member.estimate) });
    row.createSpan({ text: pmIterationFormatHours(member.consumed) });
    row.createSpan({ text: pmIterationFormatHours(member.remaining) });

    const stateText = member.overrun > 0
      ? `超时 ${pmIterationFormatHours(member.overrun)}`
      : member.remaining > 0
        ? `剩余 ${pmIterationFormatHours(member.remaining)}`
        : `正常`;
    row.createSpan({
      text: stateText,
      cls: `pm-iteration-member-effort-state${member.overrun > 0 ? ` is-danger` : ``}`,
    });
  }

  if (effort.members.length > PM_ITERATION_MEMBER_LIMIT) {
    const toggle = section.createEl(`button`, {
      text: view.iterationSummaryMembersExpanded ? `收起人员` : `展开全部人员`,
      cls: `pm-iteration-members-toggle`,
      attr: { type: `button` },
    });
    toggle.addEventListener(`click`, () => {
      view.iterationSummaryMembersExpanded = !view.iterationSummaryMembersExpanded;
      pmRenderIterationSummary(view);
    });
  }
}

/**
 * 渲染迭代风险入口，可准确映射到现有筛选条件的指标支持点击联动。
 */
function pmRenderIterationRisks(container, view, risks) {
  const section = container.createDiv(`pm-iteration-risks`);
  section.createSpan({ text: `风险`, cls: `pm-iteration-risks-title` });
  const clickableRisks = [
    [`overdue`, `逾期需求`, risks.overdueRequirements],
    [`blocked`, `阻塞任务`, risks.blockedTasks],
    [`unassigned`, `未分配任务`, risks.unassignedTasks],
  ];

  for (const [id, label, value] of clickableRisks) {
    const riskActive = view.iterationSummaryActiveFilter?.kind === `risk`
      && view.iterationSummaryActiveFilter.riskId === id;
    const button = section.createEl(`button`, {
      text: `${label} ${value}`,
      cls: `pm-iteration-risk-chip${value > 0 ? ` is-warning` : ``}${riskActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    button.addEventListener(`click`, () => pmIterationApplyRiskFilter(view, id));
  }

  section.createSpan({
    text: `未估时任务 ${risks.unestimatedTasks}`,
    cls: `pm-iteration-risk-chip${risks.unestimatedTasks > 0 ? ` is-warning` : ``}`,
  });
  section.createSpan({
    text: `超时任务 ${risks.overrunTasks}`,
    cls: `pm-iteration-risk-chip${risks.overrunTasks > 0 ? ` is-warning` : ``}`,
  });
}

/**
 * 渲染迭代详情页顶部全量概览。
 */
function pmRenderIterationSummary(view) {
  if (!view.iterationSummaryEl) return;
  view.iterationSummaryEl.empty();
  if (!view.project) return;

  const config = view.plugin.store.configFor(view.project);
  const summary = pmIterationSummary(view.project, config.statuses);
  const section = view.iterationSummaryEl.createDiv(`pm-iteration-summary`);
  const heading = section.createDiv(`pm-iteration-summary-heading`);
  const title = heading.createDiv(`pm-iteration-summary-title`);
  title.createSpan({ text: `迭代概览`, cls: `pm-iteration-summary-title-text` });

  const status = config.statuses.find((item) => item.id === view.project.status);
  title.createSpan({
    text: status?.label ?? view.project.status ?? `未设置状态`,
    cls: `pm-iteration-summary-status`,
  });
  title.createSpan({
    text: `${pmProjectMembers(view.project).length} 人`,
    cls: `pm-iteration-summary-member-count`,
  });

  const collapseButton = heading.createEl(`button`, {
    text: view.iterationSummaryCollapsed ? `展开` : `收起`,
    cls: `pm-iteration-summary-collapse`,
    attr: { type: `button` },
  });
  collapseButton.addEventListener(`click`, () => {
    view.iterationSummaryCollapsed = !view.iterationSummaryCollapsed;
    pmRenderIterationSummary(view);
  });

  if (view.iterationSummaryCollapsed) return;

  const body = section.createDiv(`pm-iteration-summary-body`);
  const cards = body.createDiv(`pm-iteration-summary-cards`);
  for (const category of summary.categories) pmRenderIterationCategoryCard(cards, view, category);

  pmRenderIterationEffort(body, summary.effort);
  pmRenderIterationMembers(body, view, summary.effort);
  pmRenderIterationRisks(body, view, summary.risks);
}

/**
 * 根据完整吸附操作区的实际高度更新表头吸附偏移。
 */
function pmUpdateIterationStickyOffset(view) {
  if (!view.iterationStickyEl) return;

  window.requestAnimationFrame(() => {
    const stickyHeight = view.iterationStickyEl?.offsetHeight ?? 0;
    view.contentEl.style.setProperty(`--pm-iteration-sticky-offset`, `${stickyHeight}px`);
    view.contentEl.style.setProperty(`--pm-iteration-table-header-top`, `${stickyHeight}px`);
  });
}

/**
 * 将常用视图、快速组合和详细筛选整体移动到同一个吸附容器。
 */
function pmMountIterationStickyHeader(view) {
  if (!view.iterationStickyEl) return;

  const projectHeader = view.headerEl.querySelector(`.pm-project-header`);
  view.iterationStickyEl.empty();
  if (projectHeader) view.iterationStickyEl.appendChild(projectHeader);

  view.iterationStickyResizeObserver?.disconnect();
  if (typeof ResizeObserver !== `undefined`) {
    view.iterationStickyResizeObserver = new ResizeObserver(() => pmUpdateIterationStickyOffset(view));
    view.iterationStickyResizeObserver.observe(view.iterationStickyEl);
  }
  pmUpdateIterationStickyOffset(view);
}

const projectTableRender = Yp.prototype.render;

// 表格只执行渐进式完整渲染，不再绑定滚动位置计算。
Yp.prototype.render = function render() {
  projectTableRender.call(this);
};

const projectTableDestroy = Yp.prototype.destroy;

// 切换视图或关闭迭代时取消尚未完成的渐进渲染。
Yp.prototype.destroy = function destroy() {
  if (this.state.pageProgressiveFrame !== null && this.state.pageProgressiveFrame !== undefined) {
    window.cancelAnimationFrame(this.state.pageProgressiveFrame);
  }
  this.state.pageProgressiveFrame = null;
  projectTableDestroy?.call(this);
};

const projectViewEnsureInitialized = Um.prototype.ensureInitialized;

// 在标题和筛选栏之间创建迭代概览挂载点。
Um.prototype.ensureInitialized = function ensureInitialized() {
  projectViewEnsureInitialized.call(this);
  if (this.iterationSummaryEl) return;

  this.contentEl.addClass(`pm-project-detail-root`);
  this.iterationSummaryEl = this.contentEl.createDiv(`pm-iteration-summary-mount`);
  this.headerEl.before(this.iterationSummaryEl);
  this.iterationStickyAnchorEl = this.contentEl.createDiv(`pm-iteration-sticky-anchor`);
  this.bodyEl.before(this.iterationStickyAnchorEl);
  this.iterationStickyEl = this.contentEl.createDiv(`pm-iteration-filter-sticky`);
  this.bodyEl.before(this.iterationStickyEl);
  this.iterationPageScrollEl = this.contentEl.createDiv(`pm-project-detail-scroll`);
  for (const element of [
    this.toolbarEl,
    this.iterationSummaryEl,
    this.headerEl,
    this.iterationStickyAnchorEl,
    this.iterationStickyEl,
    this.bodyEl,
  ]) {
    this.iterationPageScrollEl.appendChild(element);
  }
};

const projectViewRenderProjectHeader = Um.prototype.renderProjectHeader;

// 每次筛选栏重绘后重新挂载到吸附容器。
Um.prototype.renderProjectHeader = function renderProjectHeader() {
  projectViewRenderProjectHeader.call(this);
  pmMountIterationStickyHeader(this);
};

const projectViewHandleSavedViewUpdate = Um.prototype.handleSavedViewUpdate;

// 更新已保存视图会直接刷新头部组件，需要再次挂载完整吸附操作区。
Um.prototype.handleSavedViewUpdate = async function handleSavedViewUpdate(savedViewId) {
  await projectViewHandleSavedViewUpdate.call(this, savedViewId);
  pmMountIterationStickyHeader(this);
};

/**
 * 手动操作筛选栏时清除概览按钮的临时选中态。
 */
function pmClearIterationSummaryActiveFilter(view) {
  if (!view.iterationSummaryActiveFilter) return;

  view.iterationSummaryActiveFilter = null;
  for (const element of view.iterationSummaryEl?.querySelectorAll(`.is-active`) ?? []) {
    element.removeClass(`is-active`);
  }
}

const projectViewHandleQuickFilterMutation = Um.prototype.handleQuickFilterMutation;
Um.prototype.handleQuickFilterMutation = function handleQuickFilterMutation(filter) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleQuickFilterMutation.call(this, filter);
};

const projectViewHandleQuickPresetSelect = Um.prototype.handleQuickPresetSelect;
Um.prototype.handleQuickPresetSelect = function handleQuickPresetSelect(preset) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleQuickPresetSelect.call(this, preset);
};

const projectViewHandleFilterMutation = Um.prototype.handleFilterMutation;
Um.prototype.handleFilterMutation = function handleFilterMutation() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleFilterMutation.call(this);
};

const projectViewHandleClearDetailedFilter = Um.prototype.handleClearDetailedFilter;
Um.prototype.handleClearDetailedFilter = function handleClearDetailedFilter() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleClearDetailedFilter.call(this);
};

const projectViewHandleClearFilter = Um.prototype.handleClearFilter;
Um.prototype.handleClearFilter = function handleClearFilter() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleClearFilter.call(this);
};

const projectViewHandleSavedViewSelect = Um.prototype.handleSavedViewSelect;
Um.prototype.handleSavedViewSelect = function handleSavedViewSelect(savedViewId) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleSavedViewSelect.call(this, savedViewId);
};

const projectViewRenderCurrentView = Um.prototype.renderCurrentView;

// 表格视图启用整页滚动，甘特图和看板继续使用各自的内部布局。
Um.prototype.renderCurrentView = function renderCurrentView() {
  this.contentEl.toggleClass(`pm-project-detail-root--table`, this.currentView === `table`);
  projectViewRenderCurrentView.call(this);
};

const projectViewLoadProject = Um.prototype.loadProject;

// 首次进入或切换迭代后刷新概览。
Um.prototype.loadProject = async function loadProject() {
  await projectViewLoadProject.call(this);
  pmRenderIterationSummary(this);
};

const projectViewRefreshProject = Um.prototype.refreshProject;

// 事项发生变更时同步刷新概览和下方视图。
Um.prototype.refreshProject = function refreshProject() {
  pmRenderIterationSummary(this);
  return projectViewRefreshProject.call(this);
};

const projectViewRenderMissingProject = Um.prototype.renderMissingProject;

// 迭代文件不存在时清空旧概览，避免残留上一迭代数据。
Um.prototype.renderMissingProject = function renderMissingProject() {
  this.project = null;
  this.iterationSummaryEl?.empty();
  projectViewRenderMissingProject.call(this);
};

const PM_ITERATION_OPENING_PROJECTS = new Map();

// 优先复用已打开的迭代页；新页面先切换标签，再在下一帧加载详情内容。
$m.prototype.openProject = async function openProject(file) {
  const existingOpening = PM_ITERATION_OPENING_PROJECTS.get(file.path);
  if (existingOpening) return existingOpening;

  const opening = (async () => {
    const workspace = this.plugin.app.workspace;
    const existingLeaf = workspace.getLeavesOfType(Hm).find((leaf) => {
      const viewFilePath = leaf.view instanceof Um ? leaf.view.filePath : ``;
      const stateFilePath = String(leaf.getViewState()?.state?.filePath ?? ``);
      return viewFilePath === file.path || stateFilePath === file.path;
    });

    if (existingLeaf) {
      await workspace.revealLeaf(existingLeaf);
      return;
    }

    const leaf = workspace.getLeaf(`tab`);
    await workspace.revealLeaf(leaf);
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
    await leaf.setViewState({ type: Hm, state: { filePath: file.path } });
    await workspace.revealLeaf(leaf);
  })();

  PM_ITERATION_OPENING_PROJECTS.set(file.path, opening);
  try {
    await opening;
  } finally {
    PM_ITERATION_OPENING_PROJECTS.delete(file.path);
  }
};

// 当前筛选只在已打开的迭代视图中生效，重新进入迭代时始终使用默认筛选。
Um.prototype.loadFilterFromSettings = function loadFilterFromSettings() {
  this.filter = au();
  this.activeSavedViewId = null;
  this.kanbanGroupBy = `stage`;
  this.iterationSummaryActiveFilter = null;
};

// 禁止将临时筛选状态写入插件配置，避免退出或重启后恢复上次条件。
Um.prototype.persistFilter = async function persistFilter() {};

const projectViewOnClose = Um.prototype.onClose;

// 关闭迭代视图时同步删除可能存在的历史筛选记录。
Um.prototype.onClose = async function onClose() {
  this.iterationStickyResizeObserver?.disconnect();
  this.iterationStickyResizeObserver = null;
  await projectViewOnClose.call(this);

  if (!this.filePath || !Object.prototype.hasOwnProperty.call(this.plugin.settings.projectFilters, this.filePath)) {
    return;
  }

  delete this.plugin.settings.projectFilters[this.filePath];
  await this.plugin.saveSettings();
};

const projectPluginLoadSettings = nh.prototype.loadSettings;

// 插件启动时清理旧版本已经持久化的筛选，覆盖退出或异常关闭的场景。
nh.prototype.loadSettings = async function loadSettings() {
  await projectPluginLoadSettings.call(this);

  if (Object.keys(this.settings.projectFilters).length === 0) return;

  this.settings.projectFilters = {};
  await this.saveSettings();
};
'use strict'

// 项目首页扩展运行在 Project Manager Enhanced 主模块闭包内，可复用项目存储和事项弹窗能力。
const pmDashboardState = {
  selectedSystem: 'all',
  projectSearch: '',
  projectStatus: 'all',
  archiveStatus: 'unarchived',
  riskOnly: false,
  collapsedSystems: new Set(),
  expandedProjectId: null,
  requirementFilters: new Map(),
};
const PM_DASHBOARD_DATES_SETTING = 'dashboardIterationDates';
const PM_ARCHIVED_PROJECTS_SETTING = 'dashboardArchivedProjects';
const PM_MEMBER_ROLES_SETTING = 'dashboardMemberRoles';
const PM_TESTING_DATE_FIELD = 'testingDate';
const PM_MEMBER_ROLE_DEFINITIONS = [
  { id: 'project-management', label: '项目管理' },
  { id: 'product-manager', label: '产品经理' },
  { id: 'frontend-development', label: '前端开发' },
  { id: 'backend-development', label: '后端开发' },
  { id: 'testing', label: '测试' },
];
const PM_REQUIREMENT_METRIC_LABELS = {
  all: '全部需求',
  completed: '已完成',
  unfinished: '未完成',
  'high-priority': '高优先级',
  overdue: '已延期',
  'due-soon': '本周到期',
};

/**
 * 项目面板按项目所在的一级目录归属系统分组，并保留目录编号用于稳定排序。
 */
function pmSystemGroupLabel(project, projectsFolder) {
  const projectPath = String(project.filePath ?? '').replace(/\\/g, '/');
  const root = String(projectsFolder ?? '').replace(/^[/\\]+|[/\\]+$/g, '').replace(/\\/g, '/');
  const relativePath = root && projectPath.startsWith(`${root}/`)
    ? projectPath.slice(root.length + 1)
    : projectPath;
  return relativePath.split('/').filter(Boolean)[0] ?? '未分类';
}

/**
 * 首页只统计禅道需求，避免把需求下的开发、测试任务重复计入进度。
 */
function pmProjectRequirements(project) {
  return q(project.tasks)
    .map((entry) => entry.task)
    .filter((task) => {
      const sourceType = String(task.customFields?.zentaoSourceType ?? '');
      return sourceType === 'story' || (task.tags ?? []).includes('zentao-requirement');
    });
}

function pmProjectIterationId(project) {
  const projectIdMatch = String(project.id ?? '').match(/(?:zentao-)?execution-(\d+)$/u);
  const titleIdMatch = String(project.title ?? '').match(/#(\d+)/u);
  const matchedId = projectIdMatch?.[1] ?? titleIdMatch?.[1];
  return matchedId ? Number.parseInt(matchedId, 10) : Number.NEGATIVE_INFINITY;
}

function pmRequirementCompleted(task) {
  const status = String(task.status ?? '').toLocaleLowerCase('en-US');
  return Boolean(task.completed)
    || Number(task.progress ?? 0) >= 100
    || ['done', 'closed', 'cancel', 'cancelled', 'canceled'].includes(status);
}

function pmValidDate(value) {
  const date = String(value ?? '').trim();
  return /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : '';
}

function pmDaysFromToday(value) {
  const date = pmValidDate(value);
  if (!date) return null;

  const today = new Date(`${Zl().toString()}T00:00:00`);
  const target = new Date(`${date}T00:00:00`);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function pmRequirementOverdue(task) {
  const days = pmDaysFromToday(task.due);
  return !pmRequirementCompleted(task) && days !== null && days < 0;
}

function pmRequirementDueSoon(task) {
  const days = pmDaysFromToday(task.due);
  return !pmRequirementCompleted(task) && days !== null && days >= 0 && days <= 7;
}

function pmProjectStatusInfo(project, requirementTotal, requirementDone) {
  const status = String(project.status ?? '').trim().toLocaleLowerCase('en-US');
  if (['done', 'closed'].includes(status) || (requirementTotal > 0 && requirementDone === requirementTotal)) {
    return { key: 'completed', label: '已完成', rank: 2 };
  }
  if (['wait', 'waiting', 'draft', 'planned'].includes(status)) {
    return { key: 'pending', label: '未开始', rank: 1 };
  }
  if (['pause', 'paused', 'suspended'].includes(status)) {
    return { key: 'paused', label: '已暂停', rank: 1 };
  }
  return { key: 'active', label: '进行中', rank: 0 };
}

function pmFormatDate(value) {
  const date = pmValidDate(value);
  return date ? date.replace(/-/g, '/') : '--';
}

function pmFormatUpdatedAt(value) {
  const date = new Date(String(value ?? ''));
  if (Number.isNaN(date.getTime())) return '--';

  const difference = Date.now() - date.getTime();
  if (difference >= 0 && difference < 60 * 60 * 1000) return `${Math.max(1, Math.floor(difference / 60000))}分钟前`;
  if (difference >= 0 && difference < 24 * 60 * 60 * 1000) return `${Math.floor(difference / 3600000)}小时前`;
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function pmValidMemberRoles(roles) {
  const validRoleIds = new Set(PM_MEMBER_ROLE_DEFINITIONS.map((role) => role.id));
  return [...new Set(Array.isArray(roles) ? roles : [])]
    .filter((role) => validRoleIds.has(role));
}

function pmMemberRoleStore(context) {
  const storedRoles = context.plugin.settings[PM_MEMBER_ROLES_SETTING];
  if (!storedRoles || typeof storedRoles !== 'object' || Array.isArray(storedRoles)) {
    return { global: {}, projects: {} };
  }

  return {
    global: storedRoles.global && typeof storedRoles.global === 'object' && !Array.isArray(storedRoles.global)
      ? storedRoles.global
      : {},
    projects: storedRoles.projects && typeof storedRoles.projects === 'object' && !Array.isArray(storedRoles.projects)
      ? storedRoles.projects
      : {},
  };
}

async function pmSaveMemberRoleStore(context, store) {
  context.plugin.settings[PM_MEMBER_ROLES_SETTING] = store;
  await context.plugin.saveSettings();
}

function pmAddMemberValue(members, value) {
  if (Array.isArray(value)) {
    for (const item of value) pmAddMemberValue(members, item);
    return;
  }
  if (value && typeof value === 'object') {
    pmAddMemberValue(members, value.realname ?? value.name ?? value.account ?? '');
    return;
  }

  const member = String(value ?? '').trim();
  if (member) members.add(member);
}

/**
 * 迭代参与人员同时取团队成员、事项负责人和事项完成者，并统一去重。
 */
function pmProjectMembers(project) {
  const members = new Set();
  pmAddMemberValue(members, project.teamMembers ?? []);
  for (const { task } of q(project.tasks)) {
    pmAddMemberValue(members, task.assignees ?? []);
    pmAddMemberValue(members, task.completedBy);
    pmAddMemberValue(members, task.customFields?.completedBy);
  }
  return [...members].sort((left, right) => left.localeCompare(right, 'zh-CN'));
}

function pmEffectiveMemberRoles(context, project, member) {
  const store = pmMemberRoleStore(context);
  const projectRoles = store.projects[project.id];
  if (projectRoles && Object.prototype.hasOwnProperty.call(projectRoles, member)) {
    return pmValidMemberRoles(projectRoles[member]);
  }
  return pmValidMemberRoles(store.global[member]);
}

function pmProjectMembersByRole(context, project) {
  const result = {
    'project-management': [],
    'product-manager': [],
    'frontend-development': [],
    'backend-development': [],
    testing: [],
    unmarked: [],
  };
  for (const member of pmProjectMembers(project)) {
    const roles = pmEffectiveMemberRoles(context, project, member);
    if (roles.length === 0) result.unmarked.push(member);
    for (const role of roles) result[role].push(member);
  }
  return result;
}

/**
 * 汇总卡片和顶部概览所需的数据，所有风险指标均以未完成需求为口径。
 */
function pmProjectSummary(context, project, system) {
  const requirements = pmProjectRequirements(project);
  const completed = requirements.filter(pmRequirementCompleted);
  const unfinished = requirements.filter((task) => !pmRequirementCompleted(task));
  const overdue = unfinished.filter(pmRequirementOverdue);
  const dueSoon = unfinished.filter(pmRequirementDueSoon);
  const highPriority = unfinished.filter((task) => ['critical', 'high'].includes(String(task.priority ?? '').toLocaleLowerCase('en-US')));
  const startDates = requirements.map((task) => pmValidDate(task.start)).filter(Boolean).sort();
  const dueDates = requirements.map((task) => pmValidDate(task.due)).filter(Boolean).sort();
  const status = pmProjectStatusInfo(project, requirements.length, completed.length);

  return {
    project,
    system,
    archived: pmProjectArchived(context, project),
    iterationId: pmProjectIterationId(project),
    requirements,
    total: requirements.length,
    completed: completed.length,
    unfinished: unfinished.length,
    overdue: overdue.length,
    dueSoon: dueSoon.length,
    highPriority: highPriority.length,
    start: startDates[0] ?? '',
    due: dueDates[dueDates.length - 1] ?? '',
    status,
    progress: requirements.length ? Math.round(completed.length / requirements.length * 100) : 0,
  };
}

function pmArchivedProjectStore(context) {
  const storedProjects = context.plugin.settings[PM_ARCHIVED_PROJECTS_SETTING];
  return storedProjects && typeof storedProjects === 'object' && !Array.isArray(storedProjects)
    ? storedProjects
    : {};
}

function pmProjectArchived(context, project) {
  return pmArchivedProjectStore(context)[project.id] === true;
}

async function pmSetProjectArchived(context, project, archived) {
  const archivedProjects = pmArchivedProjectStore(context);
  if (archived) archivedProjects[project.id] = true;
  else delete archivedProjects[project.id];
  context.plugin.settings[PM_ARCHIVED_PROJECTS_SETTING] = archivedProjects;
  await context.plugin.saveSettings();
}

/**
 * 手工维护的迭代日期独立保存在插件配置中，禅道同步项目文件时不会覆盖这些值。
 */
function pmProjectManualDates(context, project) {
  const settings = context.plugin.settings;
  const storedDates = settings[PM_DASHBOARD_DATES_SETTING];
  if (!storedDates || typeof storedDates !== 'object' || Array.isArray(storedDates)) return {};
  const projectDates = storedDates[project.id];
  return projectDates && typeof projectDates === 'object' && !Array.isArray(projectDates) ? projectDates : {};
}

async function pmSaveProjectManualDate(context, project, field, value) {
  const settings = context.plugin.settings;
  const storedDates = settings[PM_DASHBOARD_DATES_SETTING];
  const dateStore = storedDates && typeof storedDates === 'object' && !Array.isArray(storedDates)
    ? storedDates
    : {};
  const current = dateStore[project.id] && typeof dateStore[project.id] === 'object'
    ? dateStore[project.id]
    : {};

  dateStore[project.id] = { ...current, [field]: pmValidDate(value) };
  settings[PM_DASHBOARD_DATES_SETTING] = dateStore;
  await context.plugin.saveSettings();
}

function pmRenderProjectManualDate(context, container, project, label, field) {
  const dateField = container.createDiv('pm-project-manual-date');
  dateField.createSpan({ text: label, cls: 'pm-project-manual-date-label' });
  const input = dateField.createEl('input', {
    type: 'date',
    cls: 'pm-project-manual-date-input',
    attr: { 'aria-label': label },
  });
  input.value = pmValidDate(pmProjectManualDates(context, project)[field]);

  // 日期控件位于可点击卡片内，需要阻止交互事件触发需求展开。
  for (const eventName of ['click', 'mousedown', 'keydown']) {
    dateField.addEventListener(eventName, (event) => event.stopPropagation());
  }
  input.addEventListener('change', () => {
    void pmSaveProjectManualDate(context, project, field, input.value).catch((error) => {
      console.error(`[PM] 保存${label}失败：`, error);
      context.plugin.showNotice(`${label}保存失败，请稍后重试。`);
    });
  });
}

function pmDefinitionLabel(context, project, type, id) {
  const value = String(id ?? '').trim();
  if (!value) return '--';

  const definitions = context.plugin.store.configFor(project)?.[type] ?? [];
  return definitions.find((definition) => definition.id === value)?.label ?? value;
}

function pmDefaultRequirementFilter() {
  return {
    search: '',
    module: 'all',
    stage: 'all',
    status: 'all',
    assignee: 'all',
    unfinishedOnly: false,
    overdueOnly: false,
    quickMetric: 'all',
  };
}

function pmRequirementFilter(projectId) {
  const existing = pmDashboardState.requirementFilters.get(projectId);
  if (existing) {
    existing.quickMetric ??= 'all';
    return existing;
  }

  const created = pmDefaultRequirementFilter();
  pmDashboardState.requirementFilters.set(projectId, created);
  return created;
}

function pmApplyRequirementMetric(context, summary, summaries, metric) {
  const filter = pmRequirementFilter(summary.project.id);
  Object.assign(filter, pmDefaultRequirementFilter(), { quickMetric: metric });
  pmDashboardState.expandedProjectId = summary.project.id;
  pmRenderDashboard(context, summaries);
}

function pmCreateFilterSelect(container, label, value, options, onChange) {
  const field = container.createDiv('pm-dashboard-filter-field');
  field.createSpan({ text: label, cls: 'pm-dashboard-filter-label' });
  const select = field.createEl('select', { cls: 'pm-dashboard-select' });
  for (const option of options) {
    const optionElement = select.createEl('option', { text: option.label });
    optionElement.value = option.value;
  }
  select.value = value;
  select.addEventListener('change', () => onChange(select.value));
  return select;
}

function pmCreateToggle(container, label, checked, onChange) {
  const toggle = container.createEl('label', { cls: 'pm-dashboard-check' });
  const input = toggle.createEl('input', { type: 'checkbox' });
  input.checked = checked;
  toggle.createSpan({ text: label });
  input.addEventListener('change', () => onChange(input.checked));
}

function pmRenderMemberRoleChoices(container, getRoles, onChange, disabled = false) {
  for (const role of PM_MEMBER_ROLE_DEFINITIONS) {
    const choice = container.createEl('label', {
      cls: `pm-member-role-choice pm-member-role-choice--${role.id}`,
    });
    const input = choice.createEl('input', { type: 'checkbox' });
    input.checked = getRoles().includes(role.id);
    input.disabled = disabled;
    choice.createSpan({ text: role.label });
    input.addEventListener('change', () => {
      const nextRoles = new Set(getRoles());
      if (input.checked) nextRoles.add(role.id);
      else nextRoles.delete(role.id);
      onChange(pmValidMemberRoles([...nextRoles]));
    });
  }
}

function pmRoleLabels(roles) {
  const roleIds = new Set(pmValidMemberRoles(roles));
  const labels = PM_MEMBER_ROLE_DEFINITIONS
    .filter((role) => roleIds.has(role.id))
    .map((role) => role.label);
  return labels.length > 0 ? labels.join('、') : '未配置';
}

/**
 * 全局人员角色作为默认值跨迭代复用，迭代内没有覆盖时自动继承。
 */
async function pmOpenGlobalMemberRoles(context) {
  const projects = await context.plugin.store.loadAllProjects(context.plugin.settings.projectsFolder);
  const store = pmMemberRoleStore(context);
  const draftGlobal = {};
  for (const [member, roles] of Object.entries(store.global)) {
    const validRoles = pmValidMemberRoles(roles);
    if (validRoles.length > 0) draftGlobal[member] = validRoles;
  }

  const members = new Set(Object.keys(store.global));
  for (const project of projects) {
    for (const member of pmProjectMembers(project)) members.add(member);
  }
  for (const projectRoles of Object.values(store.projects)) {
    if (!projectRoles || typeof projectRoles !== 'object' || Array.isArray(projectRoles)) continue;
    for (const member of Object.keys(projectRoles)) members.add(member);
  }
  const sortedMembers = [...members].filter(Boolean)
    .sort((left, right) => left.localeCompare(right, 'zh-CN'));

  const modal = new e.Modal(context.plugin.app);
  modal.setTitle('人员角色管理');
  modal.modalEl.addClass('pm-member-role-modal');
  modal.onOpen = () => {
    const content = modal.contentEl;
    content.empty();
    content.createEl('p', {
      text: '设置人员的默认角色。人员可以同时拥有多个角色，项目中的单独配置会覆盖这里的默认值。',
      cls: 'pm-member-role-description',
    });

    const header = content.createDiv('pm-member-role-header');
    header.createSpan({ text: '人员' });
    header.createSpan({ text: '默认角色' });
    header.createSpan({ text: '标记状态' });

    const list = content.createDiv('pm-member-role-list');
    if (sortedMembers.length === 0) {
      list.createDiv({ text: '当前没有可配置的团队成员', cls: 'pm-member-role-empty' });
    }
    for (const member of sortedMembers) {
      const row = list.createDiv('pm-member-role-row');
      row.createSpan({ text: member, cls: 'pm-member-role-name' });
      const choices = row.createDiv('pm-member-role-choices');
      const status = row.createSpan({ cls: 'pm-member-role-state' });
      const getRoles = () => pmValidMemberRoles(draftGlobal[member]);
      const updateStatus = () => {
        const marked = getRoles().length > 0;
        status.setText(marked ? '已标记' : '未标记');
        status.toggleClass('is-unmarked', !marked);
      };
      pmRenderMemberRoleChoices(choices, getRoles, (roles) => {
        if (roles.length > 0) draftGlobal[member] = roles;
        else delete draftGlobal[member];
        updateStatus();
      });
      updateStatus();
    }

    const footer = content.createDiv('pm-member-role-footer');
    new e.ButtonComponent(footer).setButtonText('取消').onClick(() => modal.close());
    new e.ButtonComponent(footer).setButtonText('保存').setCta().onClick(Y(async () => {
      await pmSaveMemberRoleStore(context, { ...store, global: draftGlobal });
      modal.close();
      await pmRenderProjectsBySystem(context);
    }));
  };
  modal.onClose = () => modal.contentEl.empty();
  modal.open();
}

/**
 * 迭代角色默认继承全局配置；关闭继承后，当前迭代的角色集合完全覆盖默认值。
 */
function pmOpenProjectMemberRoles(context, project) {
  const store = pmMemberRoleStore(context);
  const storedOverrides = store.projects[project.id];
  const draftOverrides = {};
  if (storedOverrides && typeof storedOverrides === 'object' && !Array.isArray(storedOverrides)) {
    for (const [member, roles] of Object.entries(storedOverrides)) {
      draftOverrides[member] = pmValidMemberRoles(roles);
    }
  }
  const members = pmProjectMembers(project);

  const modal = new e.Modal(context.plugin.app);
  modal.setTitle(`${project.title} · 成员角色`);
  modal.modalEl.addClass('pm-member-role-modal', 'pm-project-member-role-modal');
  modal.onOpen = () => {
    const content = modal.contentEl;
    content.empty();
    content.createEl('p', {
      text: '默认继承全局人员角色；取消继承后，可为当前迭代单独指定角色。',
      cls: 'pm-member-role-description',
    });

    const header = content.createDiv('pm-member-role-header pm-project-member-role-header');
    header.createSpan({ text: '人员' });
    header.createSpan({ text: '全局默认角色' });
    header.createSpan({ text: '本迭代角色' });
    header.createSpan({ text: '继承默认' });

    const list = content.createDiv('pm-member-role-list');
    if (members.length === 0) {
      list.createDiv({ text: '当前迭代没有可配置的团队成员', cls: 'pm-member-role-empty' });
    }
    for (const member of members) {
      const row = list.createDiv('pm-member-role-row pm-project-member-role-row');
      row.createSpan({ text: member, cls: 'pm-member-role-name' });
      row.createSpan({
        text: pmRoleLabels(store.global[member]),
        cls: 'pm-member-role-default',
      });
      const choices = row.createDiv('pm-member-role-choices');
      const inherit = row.createEl('label', { cls: 'pm-member-role-inherit' });
      const inheritInput = inherit.createEl('input', { type: 'checkbox' });
      inherit.createSpan({ text: '继承' });

      const hasOverride = () => Object.prototype.hasOwnProperty.call(draftOverrides, member);
      const getRoles = () => hasOverride()
        ? pmValidMemberRoles(draftOverrides[member])
        : pmValidMemberRoles(store.global[member]);
      const renderChoices = () => {
        choices.empty();
        pmRenderMemberRoleChoices(choices, getRoles, (roles) => {
          draftOverrides[member] = roles;
        }, !hasOverride());
        inheritInput.checked = !hasOverride();
      };
      inheritInput.addEventListener('change', () => {
        if (inheritInput.checked) delete draftOverrides[member];
        else draftOverrides[member] = pmValidMemberRoles(store.global[member]);
        renderChoices();
      });
      renderChoices();
    }

    const footer = content.createDiv('pm-member-role-footer');
    new e.ButtonComponent(footer).setButtonText('取消').onClick(() => modal.close());
    new e.ButtonComponent(footer).setButtonText('保存').setCta().onClick(Y(async () => {
      const projects = { ...store.projects };
      if (Object.keys(draftOverrides).length > 0) projects[project.id] = draftOverrides;
      else delete projects[project.id];
      await pmSaveMemberRoleStore(context, { ...store, projects });
      modal.close();
      await pmRenderProjectsBySystem(context);
    }));
  };
  modal.onClose = () => modal.contentEl.empty();
  modal.open();
}

async function pmOpenProject(context, project) {
  const file = context.plugin.app.vault.getAbstractFileByPath(project.filePath);
  if (file instanceof e.TFile) await context.openProjectFile(file);
}

async function pmOpenRequirement(context, project, task) {
  await pmOpenProject(context, project);
  Q(context.plugin, project, {
    task,
    onSave: async () => {
      context.plugin.refreshProjectViews();
    },
  });
}

function pmRenderDashboardSummary(container, summaries) {
  const active = summaries.filter((summary) => summary.status.key === 'active').length;
  const risky = summaries.filter((summary) => summary.overdue > 0).length;
  const unfinished = summaries.reduce((total, summary) => total + summary.unfinished, 0);
  const dueSoon = summaries.reduce((total, summary) => total + summary.dueSoon, 0);
  const overview = container.createDiv('pm-dashboard-overview');
  const items = [
    ['全部迭代', summaries.length],
    ['进行中', active],
    ['存在延期', risky],
    ['未完成需求', unfinished],
    ['本周到期', dueSoon],
  ];

  for (const [label, value] of items) {
    const item = overview.createDiv('pm-dashboard-overview-item');
    item.createSpan({ text: String(value), cls: 'pm-dashboard-overview-value' });
    item.createSpan({ text: label, cls: 'pm-dashboard-overview-label' });
  }
}

function pmRenderDashboardFilters(context, container, summaries, scopedSummaries, systemLabels) {
  const toolbar = container.createDiv('pm-dashboard-controls');
  const systems = toolbar.createDiv('pm-dashboard-systems');
  const systemOptions = [
    { id: 'all', label: '全部', count: scopedSummaries.length },
    ...systemLabels.map((label) => ({
      id: label,
      label,
      count: scopedSummaries.filter((summary) => summary.system === label).length,
    })),
  ];

  for (const option of systemOptions) {
    const button = systems.createEl('button', {
      text: `${option.label} ${option.count}`,
      cls: `pm-dashboard-system${pmDashboardState.selectedSystem === option.id ? ' is-active' : ''}`,
      attr: { type: 'button' },
    });
    button.addEventListener('click', () => {
      pmDashboardState.selectedSystem = option.id;
      pmRenderDashboard(context, summaries);
    });
  }

  const filters = toolbar.createDiv('pm-dashboard-global-filters');
  const search = filters.createEl('input', {
    type: 'search',
    value: pmDashboardState.projectSearch,
    placeholder: '搜索迭代，按 Enter 筛选',
    cls: 'pm-dashboard-search',
  });
  const applySearch = () => {
    const nextValue = search.value.trim();
    if (nextValue === pmDashboardState.projectSearch) return;
    pmDashboardState.projectSearch = nextValue;
    pmRenderDashboard(context, summaries);
  };
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') applySearch();
  });
  search.addEventListener('search', applySearch);

  pmCreateFilterSelect(filters, '状态', pmDashboardState.projectStatus, [
    { value: 'all', label: '全部状态' },
    { value: 'active', label: '进行中' },
    { value: 'pending', label: '未开始' },
    { value: 'paused', label: '已暂停' },
    { value: 'completed', label: '已完成' },
  ], (value) => {
    pmDashboardState.projectStatus = value;
    pmRenderDashboard(context, summaries);
  });

  pmCreateToggle(filters, '只看风险', pmDashboardState.riskOnly, (checked) => {
    pmDashboardState.riskOnly = checked;
    pmRenderDashboard(context, summaries);
  });

  pmCreateFilterSelect(filters, '归档', pmDashboardState.archiveStatus, [
    { value: 'all', label: '全部项目' },
    { value: 'unarchived', label: '未归档项目' },
    { value: 'archived', label: '已归档项目' },
  ], (value) => {
    pmDashboardState.archiveStatus = value;
    pmRenderDashboard(context, summaries);
  });
}

function pmRenderProjectMetric(container, label, value, metricId, active, onClick, warning = false) {
  const metric = container.createEl('button', {
    cls: `pm-project-list-metric${warning ? ' is-warning' : ''}${active ? ' is-active' : ''}`,
    attr: {
      type: 'button',
      'aria-pressed': String(active),
      'aria-label': `筛选${label}需求，共${value}个`,
    },
  });
  metric.createSpan({ text: String(value), cls: 'pm-project-list-metric-value' });
  metric.createSpan({ text: label, cls: 'pm-project-list-metric-label' });
  metric.addEventListener('click', (event) => {
    event.stopPropagation();
    onClick(metricId);
  });
}

function pmRenderProjectCard(context, container, summary, summaries) {
  const expanded = pmDashboardState.expandedProjectId === summary.project.id;
  const card = container.createDiv(`pm-project-list-card${expanded ? ' is-expanded' : ''}${summary.archived ? ' is-archived' : ''}`);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-expanded', String(expanded));
  card.style.setProperty('--pm-project-color', summary.project.color || 'var(--interactive-accent)');

  const heading = card.createDiv('pm-project-list-heading');
  const titleArea = heading.createDiv('pm-project-list-title-area');
  titleArea.createSpan({ text: summary.project.icon || '📋', cls: 'pm-project-list-icon' });
  titleArea.createEl('h3', { text: summary.project.title, cls: 'pm-project-list-title' });
  const manualDates = heading.createDiv('pm-project-manual-dates');
  pmRenderProjectManualDate(context, manualDates, summary.project, '提测时间', PM_TESTING_DATE_FIELD);
  const badges = heading.createDiv('pm-project-list-badges');
  if (summary.archived) badges.createSpan({ text: '已归档', cls: 'pm-project-archived-badge' });
  badges.createSpan({ text: summary.status.label, cls: `pm-project-status pm-project-status--${summary.status.key}` });
  if (summary.overdue > 0) badges.createSpan({ text: '有风险', cls: 'pm-project-risk-badge' });

  const meta = card.createDiv('pm-project-list-meta');
  const period = summary.start || summary.due
    ? `${pmFormatDate(summary.start)} ～ ${pmFormatDate(summary.due)}`
    : '未设置';
  const roleMembers = pmProjectMembersByRole(context, summary.project);
  const generalMeta = meta.createDiv('pm-project-general-meta');
  const generalMetadata = [
    ['需求周期', period],
    ['最近更新', pmFormatUpdatedAt(summary.project.updatedAt)],
  ];
  for (const [label, value] of generalMetadata) {
    const item = generalMeta.createDiv('pm-project-list-meta-item');
    item.createSpan({ text: label, cls: 'pm-project-list-meta-label' });
    item.createSpan({ text: value, cls: 'pm-project-list-meta-value' });
  }

  const roleMeta = meta.createDiv('pm-project-role-meta');
  const roleMetadata = [
    ['项目管理', roleMembers['project-management']],
    ['产品经理', roleMembers['product-manager']],
    ['前端开发', roleMembers['frontend-development']],
    ['后端开发', roleMembers['backend-development']],
    ['测试人员', roleMembers.testing],
  ];
  for (const [label, members] of roleMetadata) {
    const item = roleMeta.createDiv('pm-project-role-meta-item');
    item.createSpan({ text: label, cls: 'pm-project-role-meta-label' });
    item.createSpan({
      text: members.length > 0 ? members.join('、') : '未配置',
      cls: `pm-project-role-meta-value${members.length === 0 ? ' is-empty' : ''}`,
    });
  }
  if (roleMembers.unmarked.length > 0) {
    const warning = roleMeta.createEl('button', {
      text: `还有${roleMembers.unmarked.length}名成员未标记角色`,
      cls: 'pm-project-role-warning',
      attr: { type: 'button' },
    });
    warning.setAttribute('title', roleMembers.unmarked.join('、'));
    warning.addEventListener('click', (event) => {
      event.stopPropagation();
      pmOpenProjectMemberRoles(context, summary.project);
    });
  }

  const metrics = card.createDiv('pm-project-list-metrics');
  const activeMetric = expanded ? pmRequirementFilter(summary.project.id).quickMetric : '';
  const applyMetric = (metric) => pmApplyRequirementMetric(context, summary, summaries, metric);
  pmRenderProjectMetric(metrics, '总需求', summary.total, 'all', activeMetric === 'all', applyMetric);
  pmRenderProjectMetric(metrics, '已完成', summary.completed, 'completed', activeMetric === 'completed', applyMetric);
  pmRenderProjectMetric(metrics, '未完成', summary.unfinished, 'unfinished', activeMetric === 'unfinished', applyMetric);
  pmRenderProjectMetric(metrics, '高优先级', summary.highPriority, 'high-priority', activeMetric === 'high-priority', applyMetric, summary.highPriority > 0);
  pmRenderProjectMetric(metrics, '已延期', summary.overdue, 'overdue', activeMetric === 'overdue', applyMetric, summary.overdue > 0);
  pmRenderProjectMetric(metrics, '本周到期', summary.dueSoon, 'due-soon', activeMetric === 'due-soon', applyMetric, summary.dueSoon > 0);

  const progress = card.createDiv('pm-project-list-progress');
  progress.createSpan({ text: '需求完成进度', cls: 'pm-project-list-progress-title' });
  const track = progress.createDiv('pm-project-list-progress-track');
  track.createDiv('pm-project-list-progress-fill').setCssStyles({ width: `${summary.progress}%` });
  progress.createSpan({ text: `${summary.progress}%`, cls: 'pm-project-list-progress-value' });

  const footer = card.createDiv('pm-project-list-footer');
  const riskText = summary.overdue > 0
    ? `${summary.overdue}个需求已超过截止日期${summary.highPriority > 0 ? `，${summary.highPriority}个高优先级需求尚未完成` : ''}`
    : summary.dueSoon > 0
      ? `${summary.dueSoon}个需求将在7天内到期`
      : summary.highPriority > 0
        ? `${summary.highPriority}个高优先级需求尚未完成`
        : '当前暂无需求延期风险';
  footer.createSpan({
    text: riskText,
    cls: `pm-project-list-risk-text${summary.overdue > 0 ? ' is-warning' : ''}`,
  });

  const actions = footer.createDiv('pm-project-list-actions');
  const requirementButton = actions.createEl('button', {
    text: expanded ? '收起需求 △' : '查看需求 ▽',
    cls: 'pm-project-list-action',
    attr: { type: 'button' },
  });
  requirementButton.addEventListener('click', (event) => {
    event.stopPropagation();
    pmDashboardState.expandedProjectId = expanded ? null : summary.project.id;
    pmRenderDashboard(context, summaries);
  });

  const detailButton = actions.createEl('button', {
    text: '进入迭代详情 →',
    cls: 'pm-project-list-action pm-project-list-action--primary',
    attr: { type: 'button' },
  });
  detailButton.addEventListener('click', (event) => {
    event.stopPropagation();
    void pmOpenProject(context, summary.project);
  });

  const toggleRequirements = () => {
    pmDashboardState.expandedProjectId = expanded ? null : summary.project.id;
    pmRenderDashboard(context, summaries);
  };
  card.addEventListener('click', toggleRequirements);
  card.addEventListener('keydown', (event) => {
    if (event.target !== card) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleRequirements();
  });
  card.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    Ym(context, summary.project, event);
  });

  if (expanded) pmRenderRequirements(context, container, summary, summaries);
}

function pmRequirementFilterOptions(context, summary, requirements) {
  const uniqueOptions = (values, label) => [
    { value: 'all', label },
    ...[...new Set(values.filter(Boolean))]
      .sort((left, right) => left.localeCompare(right, 'zh-CN'))
      .map((value) => ({ value, label: value })),
  ];

  return {
    modules: uniqueOptions(requirements.map((task) => String(task.customFields?.zentaoModule ?? '').trim()), '全部模块'),
    stages: [
      { value: 'all', label: '全部阶段' },
      ...[...new Set(requirements.map((task) => String(task.stage ?? '').trim()).filter(Boolean))]
        .map((value) => ({ value, label: pmDefinitionLabel(context, summary.project, 'stages', value) }))
        .sort((left, right) => left.label.localeCompare(right.label, 'zh-CN')),
    ],
    statuses: [
      { value: 'all', label: '全部状态' },
      ...[...new Set(requirements.map((task) => String(task.status ?? '').trim()).filter(Boolean))]
        .map((value) => ({ value, label: pmDefinitionLabel(context, summary.project, 'statuses', value) }))
        .sort((left, right) => left.label.localeCompare(right.label, 'zh-CN')),
    ],
    assignees: uniqueOptions(requirements.flatMap((task) => task.assignees ?? []), '全部负责人'),
  };
}

function pmFilteredRequirements(summary, filter) {
  const keyword = filter.search.toLocaleLowerCase('zh-CN');
  return summary.requirements
    .filter((task) => {
      const module = String(task.customFields?.zentaoModule ?? '').trim();
      const zentaoId = String(task.customFields?.zentaoId ?? '').trim();
      const searchText = [task.title, module, zentaoId, ...(task.assignees ?? [])].join(' ').toLocaleLowerCase('zh-CN');
      const completed = pmRequirementCompleted(task);
      const priority = String(task.priority ?? '').toLocaleLowerCase('en-US');
      if (filter.quickMetric === 'completed' && !completed) return false;
      if (filter.quickMetric === 'unfinished' && completed) return false;
      if (filter.quickMetric === 'high-priority' && (completed || !['critical', 'high'].includes(priority))) return false;
      if (filter.quickMetric === 'overdue' && !pmRequirementOverdue(task)) return false;
      if (filter.quickMetric === 'due-soon' && !pmRequirementDueSoon(task)) return false;
      if (keyword && !searchText.includes(keyword)) return false;
      if (filter.module !== 'all' && module !== filter.module) return false;
      if (filter.stage !== 'all' && task.stage !== filter.stage) return false;
      if (filter.status !== 'all' && task.status !== filter.status) return false;
      if (filter.assignee !== 'all' && !(task.assignees ?? []).includes(filter.assignee)) return false;
      if (filter.unfinishedOnly && pmRequirementCompleted(task)) return false;
      if (filter.overdueOnly && !pmRequirementOverdue(task)) return false;
      return true;
    })
    .sort((left, right) => {
      const overdueOrder = Number(pmRequirementOverdue(right)) - Number(pmRequirementOverdue(left));
      if (overdueOrder !== 0) return overdueOrder;
      const completedOrder = Number(pmRequirementCompleted(left)) - Number(pmRequirementCompleted(right));
      if (completedOrder !== 0) return completedOrder;
      return String(left.customFields?.zentaoId ?? '').localeCompare(String(right.customFields?.zentaoId ?? ''), 'zh-CN', { numeric: true });
    });
}

function pmRenderRequirementCell(row, text, className, title = '') {
  const cell = row.createEl('td', { text: String(text || '--'), cls: className });
  if (title) cell.setAttribute('title', title);
  return cell;
}

/**
 * 需求面板只展示需求本身，使用独立滚动区承载完整列表，不继续展开子任务。
 */
function pmRenderRequirements(context, container, summary, summaries) {
  const filter = pmRequirementFilter(summary.project.id);
  const panel = container.createDiv('pm-requirement-panel');
  const header = panel.createDiv('pm-requirement-panel-header');
  const heading = header.createDiv('pm-requirement-panel-heading');
  heading.createEl('h4', { text: '需求列表' });
  heading.createSpan({ text: `共${summary.total}个 · 未完成${summary.unfinished}个 · 延期${summary.overdue}个` });
  if (filter.quickMetric !== 'all') {
    const quickFilter = header.createDiv('pm-requirement-quick-filter');
    quickFilter.createSpan({ text: `快捷筛选：${PM_REQUIREMENT_METRIC_LABELS[filter.quickMetric] ?? filter.quickMetric}` });
    const clearButton = quickFilter.createEl('button', {
      text: '清除',
      cls: 'pm-requirement-quick-filter-clear',
      attr: { type: 'button' },
    });
    clearButton.addEventListener('click', () => {
      filter.quickMetric = 'all';
      pmRenderDashboard(context, summaries);
    });
  }

  const filters = panel.createDiv('pm-requirement-filters');
  const search = filters.createEl('input', {
    type: 'search',
    value: filter.search,
    placeholder: '搜索需求，按 Enter 筛选',
    cls: 'pm-dashboard-search pm-requirement-search',
  });
  const applySearch = () => {
    const nextValue = search.value.trim();
    if (nextValue === filter.search) return;
    filter.search = nextValue;
    pmRenderDashboard(context, summaries);
  };
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') applySearch();
  });
  search.addEventListener('search', applySearch);

  const options = pmRequirementFilterOptions(context, summary, summary.requirements);
  pmCreateFilterSelect(filters, '模块', filter.module, options.modules, (value) => {
    filter.module = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '阶段', filter.stage, options.stages, (value) => {
    filter.stage = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '状态', filter.status, options.statuses, (value) => {
    filter.status = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '负责人', filter.assignee, options.assignees, (value) => {
    filter.assignee = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateToggle(filters, '只看未完成', filter.unfinishedOnly, (checked) => {
    filter.unfinishedOnly = checked;
    pmRenderDashboard(context, summaries);
  });
  pmCreateToggle(filters, '只看延期', filter.overdueOnly, (checked) => {
    filter.overdueOnly = checked;
    pmRenderDashboard(context, summaries);
  });

  const requirements = pmFilteredRequirements(summary, filter);
  if (requirements.length === 0) {
    panel.createDiv({ text: '没有符合当前筛选条件的需求', cls: 'pm-requirement-empty' });
    return;
  }

  const wrapper = panel.createDiv('pm-requirement-table-wrapper');
  const table = wrapper.createEl('table', { cls: 'pm-requirement-table' });
  const headerRow = table.createEl('thead').createEl('tr');
  for (const title of ['需求 ID', '需求名称', '模块', '阶段', '状态', '优先级', '负责人', '截止日期', '进度']) {
    headerRow.createEl('th', { text: title });
  }

  const body = table.createEl('tbody');
  for (const task of requirements) {
    const overdue = pmRequirementOverdue(task);
    const completed = pmRequirementCompleted(task);
    const row = body.createEl('tr', {
      cls: `${overdue ? 'is-overdue' : ''}${completed ? ' is-completed' : ''}`.trim(),
    });
    const zentaoId = String(task.customFields?.zentaoId ?? '').trim();
    pmRenderRequirementCell(row, zentaoId ? `需求 #${zentaoId}` : '本地需求', 'pm-requirement-id');

    const titleCell = row.createEl('td', { cls: 'pm-requirement-title-cell' });
    const titleButton = titleCell.createEl('button', {
      text: task.title,
      cls: 'pm-requirement-title',
      attr: { type: 'button' },
    });
    titleButton.setAttribute('title', task.title);
    titleButton.addEventListener('click', () => void pmOpenRequirement(context, summary.project, task));

    const module = String(task.customFields?.zentaoModule ?? '').trim();
    pmRenderRequirementCell(row, module, 'pm-requirement-module', module);
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'stages', task.stage), 'pm-requirement-stage');
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'statuses', task.status), 'pm-requirement-status');
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'priorities', task.priority), 'pm-requirement-priority');
    pmRenderRequirementCell(row, (task.assignees ?? []).join('、') || '未分配', 'pm-requirement-assignee');
    pmRenderRequirementCell(row, overdue ? `已延期${Math.abs(pmDaysFromToday(task.due))}天` : pmFormatDate(task.due), overdue ? 'pm-requirement-due is-overdue' : 'pm-requirement-due');

    const progressCell = row.createEl('td', { cls: 'pm-requirement-progress' });
    const progress = Math.max(0, Math.min(100, Number(task.progress ?? 0)));
    const progressTrack = progressCell.createDiv('pm-requirement-progress-track');
    progressTrack.createDiv('pm-requirement-progress-fill').setCssStyles({ width: `${progress}%` });
    progressCell.createSpan({ text: `${progress}%` });
  }

  panel.createDiv({ text: `已展示 ${requirements.length} / ${summary.total} 条需求`, cls: 'pm-requirement-result-count' });
}

function pmRenderSystemSection(context, container, label, items, summaries) {
  const section = container.createDiv('pm-project-system-section');
  const header = section.createDiv('pm-project-system-header');
  const active = items.filter((summary) => summary.status.key === 'active').length;
  const risky = items.filter((summary) => summary.overdue > 0).length;
  const unfinished = items.reduce((total, summary) => total + summary.unfinished, 0);
  const title = header.createDiv('pm-project-system-title');
  title.createEl('h3', { text: label });
  title.createSpan({ text: `${items.length} 个迭代` });
  title.createSpan({ text: `进行中 ${active}` });
  title.createSpan({ text: `存在延期 ${risky}`, cls: risky > 0 ? 'is-warning' : '' });
  title.createSpan({ text: `未完成需求 ${unfinished}` });

  const collapsed = pmDashboardState.collapsedSystems.has(label);
  const collapseButton = header.createEl('button', {
    text: collapsed ? '展开 ∨' : '收起 ∧',
    cls: 'pm-project-system-collapse',
    attr: { type: 'button' },
  });
  collapseButton.addEventListener('click', () => {
    if (collapsed) pmDashboardState.collapsedSystems.delete(label);
    else pmDashboardState.collapsedSystems.add(label);
    pmRenderDashboard(context, summaries);
  });

  if (collapsed) return;
  const list = section.createDiv('pm-project-list');
  for (const summary of items) pmRenderProjectCard(context, list, summary, summaries);
}

/**
 * 按当前归属和筛选状态重绘首页，数据仍由外层加载逻辑统一提供。
 */
function pmRenderDashboard(context, summaries) {
  context.contentEl.empty();
  const archiveScopedSummaries = summaries.filter((summary) => {
    if (pmDashboardState.archiveStatus === 'archived') return summary.archived;
    if (pmDashboardState.archiveStatus === 'unarchived') return !summary.archived;
    return true;
  });
  pmRenderDashboardSummary(context.contentEl, archiveScopedSummaries);

  const systemLabels = [...new Set(archiveScopedSummaries.map((summary) => summary.system))]
    .sort((left, right) => left.localeCompare(right, 'zh-CN', { numeric: true }));
  if (pmDashboardState.selectedSystem !== 'all' && !systemLabels.includes(pmDashboardState.selectedSystem)) {
    pmDashboardState.selectedSystem = 'all';
  }
  pmRenderDashboardFilters(context, context.contentEl, summaries, archiveScopedSummaries, systemLabels);

  const keyword = pmDashboardState.projectSearch.toLocaleLowerCase('zh-CN');
  const filtered = summaries.filter((summary) => {
    if (pmDashboardState.archiveStatus === 'archived' && !summary.archived) return false;
    if (pmDashboardState.archiveStatus === 'unarchived' && summary.archived) return false;
    if (pmDashboardState.selectedSystem !== 'all' && summary.system !== pmDashboardState.selectedSystem) return false;
    if (pmDashboardState.projectStatus !== 'all' && summary.status.key !== pmDashboardState.projectStatus) return false;
    if (pmDashboardState.riskOnly && summary.overdue === 0) return false;
    if (keyword && !summary.project.title.toLocaleLowerCase('zh-CN').includes(keyword)) return false;
    return true;
  });

  if (filtered.length === 0) {
    context.contentEl.createDiv({ text: '没有符合当前筛选条件的迭代', cls: 'pm-dashboard-empty-filter' });
    return;
  }

  const groups = new Map();
  for (const summary of filtered) {
    const items = groups.get(summary.system) ?? [];
    items.push(summary);
    groups.set(summary.system, items);
  }

  for (const label of systemLabels) {
    const items = groups.get(label);
    if (!items?.length) continue;
    items.sort((left, right) => Number(left.archived) - Number(right.archived)
      || right.iterationId - left.iterationId
      || right.project.title.localeCompare(left.project.title, 'zh-CN', { numeric: true }));
    pmRenderSystemSection(context, context.contentEl, label, items, summaries);
  }
}

async function pmRenderProjectsBySystem(context) {
  const projects = await context.plugin.store.loadAllProjects(context.plugin.settings.projectsFolder);
  if (context.isStale()) return;

  if (projects.length === 0) {
    context.contentEl.empty();
    new Wm(context.contentEl)
      .setIcon('📋')
      .setTitle('暂无项目')
      .setBody('创建第一个项目即可开始使用。')
      .setAction('+ 新建项目', () => Jm(context));
    return;
  }

  const summaries = projects.map((project) => pmProjectSummary(
    context,
    project,
    pmSystemGroupLabel(project, context.plugin.settings.projectsFolder),
  ));
  pmRenderDashboard(context, summaries);
}

/**
 * 首页项目右键菜单增加本地归档操作，归档只影响本地展示和批量同步范围。
 */
function pmShowProjectContextMenu(context, project, event) {
  const menu = new e.Menu();
  const archived = pmProjectArchived(context, project);
  menu.addItem((item) => item
    .setTitle('编辑项目')
    .setIcon('settings')
    .onClick(() => {
      Xf(context.plugin, { project, onSave: async () => pmRenderProjectsBySystem(context) });
    }));
  menu.addItem((item) => item
    .setTitle('配置项目成员角色')
    .setIcon('users')
    .onClick(() => pmOpenProjectMemberRoles(context, project)));
  menu.addItem((item) => item
    .setTitle(archived ? '取消归档' : '归档')
    .setIcon(archived ? 'archive-restore' : 'archive')
    .onClick(Y(async () => {
      await pmSetProjectArchived(context, project, !archived);
      await pmRenderProjectsBySystem(context);
    })));
  menu.addSeparator();
  menu.addItem((item) => item
    .setTitle('删除项目')
    .setIcon('trash')
    .onClick(Y(async () => {
      await context.plugin.store.deleteProject(project);
      await pmSetProjectArchived(context, project, false);
      await pmRenderProjectsBySystem(context);
    })));
  menu.showAtMouseEvent(event);
}

function pmRenderDashboardToolbar(context) {
  context.toolbarEl.empty();
  context.toolbarEl.createEl('h2', { text: '项目管理', cls: 'pm-toolbar-title' });
  new e.ButtonComponent(context.toolbarEl)
    .setButtonText('+ 新建项目')
    .setCta()
    .onClick(() => Jm(context));
  new e.ButtonComponent(context.toolbarEl)
    .setButtonText('人员角色')
    .onClick(() => void pmOpenGlobalMemberRoles(context));
}

Ym = pmShowProjectContextMenu;
Km = pmRenderDashboardToolbar;
qm = pmRenderProjectsBySystem;

})(enhancedModule, enhancedModule.exports, require)

;(function loadInsights(module, exports, require) {
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ProjectManagerInsightsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// src/adapters/project-manager.ts
var DEFAULT_PRIORITIES = [
  { id: "critical", label: "Critical", color: "#c47070" },
  { id: "high", label: "High", color: "#b8a06b" },
  { id: "medium", label: "Medium", color: "#8a94a0" },
  { id: "low", label: "Low", color: "#79b58d" }
];
function text(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function optionalText(value) {
  const result = text(value).trim();
  return result ? result : null;
}
function number(value) {
  const result = typeof value === "number" ? value : Number(value);
  return Number.isFinite(result) && result > 0 ? result : 0;
}
function optionalHours(value) {
  if (value === null || value === void 0 || typeof value === "string" && !value.trim()) return null;
  const result = typeof value === "number" ? value : Number(value);
  return Number.isFinite(result) && result >= 0 ? result : null;
}
function stringList(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  return typeof value === "string" && value.trim() ? [value.trim()] : [];
}
function taskTags(value) {
  return stringList(value).map((tag) => tag.trim().replace(/^#+/u, "")).filter(Boolean);
}
function quickSourceType(task2) {
  // 需求与任务以禅道来源字段为准，业务对象不再依赖事项层级。
  const sourceType = String(task2.customFields?.zentaoSourceType ?? "");
  if (sourceType === "story" || task2.tags.includes("zentao-requirement")) return "requirement";
  if (sourceType === "task" || task2.tags.includes("zentao-task")) return "task";
  if (sourceType === "execution" || task2.type === "milestone" || task2.tags.includes("zentao-milestone")) return "milestone";
  if (task2.type === "task" || task2.type === "subtask") return "task";
  return "local";
}
function loggedHours(value) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return value.reduce((total, item) => {
    if (!item || typeof item !== "object") return total;
    return total + number(item.hours);
  }, 0);
}
function truthy(value) {
  return value === true || value === "true";
}
function settings(value) {
  var _a, _b;
  const completeStatuses = /* @__PURE__ */ new Set(["done", "completed", "cancelled", "canceled"]);
  let priorities = DEFAULT_PRIORITIES.map((priority) => ({ ...priority }));
  const parsed = value;
  for (const status of (_a = parsed == null ? void 0 : parsed.statuses) != null ? _a : []) {
    if (status.complete === true && typeof status.id === "string") {
      completeStatuses.add(status.id);
    }
  }
  const configuredPriorities = ((_b = parsed == null ? void 0 : parsed.priorities) != null ? _b : []).flatMap((priority) => {
    const id = text(priority.id).trim();
    if (!id) return [];
    return [{
      id,
      label: text(priority.label, id).trim() || id,
      color: text(priority.color).trim()
    }];
  });
  if (configuredPriorities.length > 0) priorities = configuredPriorities;
  const definitions = (items) => (Array.isArray(items) ? items : []).flatMap((item) => {
    const id = text(item?.id).trim();
    if (!id) return [];
    return [{ id, label: text(item?.label, id).trim() || id, color: text(item?.color).trim() }];
  });
  return { completeStatuses, priorities, stages: definitions(parsed?.stages), statuses: definitions(parsed?.statuses) };
}
function project(document2) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  const id = text(frontmatter2.id).trim();
  if (!id) return null;
  return {
    id,
    title: text(frontmatter2.title, document2.basename).trim() || document2.basename,
    path: document2.path,
    icon: text(frontmatter2.icon, "\u{1F4CB}")
  };
}
function task(document2, completeStatuses) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  const id = text(frontmatter2.id).trim();
  const projectId = text(frontmatter2.projectId).trim();
  if (!id || !projectId) return null;
  const status = text(frontmatter2.status, "todo");
  const progress = number(frontmatter2.progress);
  const customFields = frontmatter2.customFields && typeof frontmatter2.customFields === "object" ? frontmatter2.customFields : {};
  const tags = taskTags(frontmatter2.tags);
  const type = text(frontmatter2.type, "task");
  const syncedEstimate = optionalHours(customFields.estimatedHours);
  const syncedLogged = optionalHours(customFields.consumedHours);
  const syncedRemaining = optionalHours(customFields.remainingHours);
  const displayEstimate = optionalHours(customFields.displayEstimatedHours);
  const displayLogged = optionalHours(customFields.displayConsumedHours);
  const displayRemaining = optionalHours(customFields.displayRemainingHours);
  const localLogged = loggedHours(frontmatter2.timeLogs);
  const completedAt = optionalText(frontmatter2.completed);
  const hasSyncedHours = Object.prototype.hasOwnProperty.call(customFields, "estimatedHours") || Object.prototype.hasOwnProperty.call(customFields, "consumedHours") || Object.prototype.hasOwnProperty.call(customFields, "remainingHours");
  return {
    id,
    projectId,
    parentId: optionalText(frontmatter2.parentId),
    type,
    sourceType: quickSourceType({ customFields, tags, type }),
    zentaoId: optionalText(customFields.zentaoId),
    module: optionalText(customFields.zentaoModule),
    title: text(frontmatter2.title, document2.basename).trim() || document2.basename,
    path: document2.path,
    status,
    stage: optionalText(frontmatter2.stage),
    start: optionalText(frontmatter2.start),
    due: optionalText(frontmatter2.due),
    priority: optionalText(frontmatter2.priority),
    tags,
    assignees: stringList(frontmatter2.assignees),
    completedBy: optionalText(customFields.completedBy ?? frontmatter2.completedBy),
    // 禅道同步事项以接口返回的三个工时字段为准，本地事项继续使用 Project Manager 原生字段。
    estimate: hasSyncedHours ? syncedEstimate ?? number(frontmatter2.timeEstimate) : number(frontmatter2.timeEstimate),
    logged: hasSyncedHours ? syncedLogged ?? localLogged ?? 0 : localLogged ?? 0,
    remainingOverride: hasSyncedHours ? syncedRemaining : null,
    displayEstimate,
    displayLogged,
    displayRemaining,
    completedAt,
    actualStartedAt: optionalText(customFields.actualStartedAt),
    actualFinishedAt: optionalText(customFields.actualFinishedAt),
    dependencies: stringList(frontmatter2.dependencies),
    progress,
    completed: Boolean(completedAt) || progress >= 100 || completeStatuses.has(status),
    archived: truthy(frontmatter2.archived),
    customFields
  };
}
function entry(document2, completeStatuses) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  if (truthy(frontmatter2["pm-project"])) {
    const record = project(document2);
    return record ? { kind: "project", record } : null;
  }
  if (truthy(frontmatter2["pm-task"])) {
    const record = task(document2, completeStatuses);
    return record ? { kind: "task", record } : null;
  }
  return null;
}
function stringArraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function entriesEqual(left, right) {
  if (!left && !right) return true;
  if (!left || !right || left.kind !== right.kind) return false;
  if (left.kind === "project" && right.kind === "project") {
    return left.record.id === right.record.id && left.record.title === right.record.title && left.record.path === right.record.path && left.record.icon === right.record.icon;
  }
  if (left.kind !== "task" || right.kind !== "task") return false;
  return left.record.id === right.record.id && left.record.projectId === right.record.projectId && left.record.parentId === right.record.parentId && left.record.type === right.record.type && left.record.sourceType === right.record.sourceType && left.record.zentaoId === right.record.zentaoId && left.record.module === right.record.module && left.record.title === right.record.title && left.record.path === right.record.path && left.record.stage === right.record.stage && left.record.start === right.record.start && left.record.due === right.record.due && left.record.status === right.record.status && left.record.priority === right.record.priority && left.record.completedBy === right.record.completedBy && stringArraysEqual(left.record.tags, right.record.tags) && stringArraysEqual(left.record.assignees, right.record.assignees) && stringArraysEqual(left.record.dependencies, right.record.dependencies) && left.record.estimate === right.record.estimate && left.record.logged === right.record.logged && left.record.remainingOverride === right.record.remainingOverride && left.record.displayEstimate === right.record.displayEstimate && left.record.displayLogged === right.record.displayLogged && left.record.displayRemaining === right.record.displayRemaining && left.record.completedAt === right.record.completedAt && left.record.actualStartedAt === right.record.actualStartedAt && left.record.actualFinishedAt === right.record.actualFinishedAt && left.record.progress === right.record.progress && left.record.completed === right.record.completed && left.record.archived === right.record.archived;
}
function prioritiesEqual(left, right) {
  return left.length === right.length && left.every((priority, index) => {
    const candidate = right[index];
    return candidate !== void 0 && priority.id === candidate.id && priority.label === candidate.label && priority.color === candidate.color;
  });
}
var ProjectManagerCatalog = class {
  constructor(source) {
    __publicField(this, "source", source);
    __publicField(this, "entries", /* @__PURE__ */ new Map());
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "current", null);
    __publicField(this, "currentSettings", settings(null));
    __publicField(this, "operation", null);
    __publicField(this, "queuedChanges", []);
    __publicField(this, "reconcileQueued", false);
    __publicField(this, "stopWatching", null);
  }
  async snapshot() {
    if (this.current) return this.current;
    return this.replaceFromSource(false);
  }
  async reconcile() {
    return this.replaceFromSource(true);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.ensureWatching();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.stopWatching) {
        this.stopWatching();
        this.stopWatching = null;
      }
    };
  }
  ensureWatching() {
    if (this.stopWatching) return;
    this.stopWatching = this.source.watch((change) => this.receive(change));
  }
  async replaceFromSource(notify) {
    if (this.operation) return this.operation;
    this.ensureWatching();
    const previous = this.current;
    const operation = (async () => {
      const sourceSnapshot = await this.source.scan();
      const nextSettings = settings(sourceSnapshot.settings);
      const nextEntries = /* @__PURE__ */ new Map();
      for (const document2 of sourceSnapshot.documents) {
        const next = entry(document2, nextSettings.completeStatuses);
        if (next) nextEntries.set(document2.path, next);
      }
      this.entries.clear();
      for (const [path, next] of nextEntries) this.entries.set(path, next);
      this.currentSettings = nextSettings;
      this.current = this.createSnapshot();
      const queued = this.queuedChanges;
      this.queuedChanges = [];
      for (const change of queued) this.apply(change, false);
      if (notify && previous !== null && !this.snapshotsEqual(previous, this.current)) {
        this.notify();
      }
      return this.current;
    })();
    this.operation = operation;
    try {
      return await operation;
    } finally {
      this.operation = null;
      if (this.reconcileQueued) {
        this.reconcileQueued = false;
        void this.reconcile().catch(() => void 0);
      }
    }
  }
  receive(change) {
    if (this.operation) {
      if (change.kind === "reconcile") this.reconcileQueued = true;
      else this.queuedChanges.push(change);
      return;
    }
    if (change.kind === "reconcile") {
      void this.reconcile().catch(() => void 0);
      return;
    }
    if (!this.current) return;
    this.apply(change, true);
  }
  apply(change, notify) {
    if (change.kind === "reconcile") return;
    let changed = false;
    if (change.kind === "upsert") {
      const next = entry(change.document, this.currentSettings.completeStatuses);
      const previous = this.entries.get(change.document.path);
      if (!entriesEqual(previous, next)) {
        if (next) this.entries.set(change.document.path, next);
        else this.entries.delete(change.document.path);
        changed = true;
      }
    } else if (change.recursive) {
      const prefix = `${change.path}/`;
      for (const path of [...this.entries.keys()]) {
        if (path === change.path || path.startsWith(prefix)) {
          this.entries.delete(path);
          changed = true;
        }
      }
    } else {
      changed = this.entries.delete(change.path);
    }
    if (!changed) return;
    this.current = this.createSnapshot();
    if (notify) this.notify();
  }
  createSnapshot() {
    const projects = [];
    const tasks = [];
    for (const catalogEntry of this.entries.values()) {
      if (catalogEntry.kind === "project") projects.push(catalogEntry.record);
      else tasks.push(catalogEntry.record);
    }
    return {
      projects: projects.sort((left, right) => left.title.localeCompare(right.title)),
      tasks,
      priorities: this.currentSettings.priorities.map((priority) => ({ ...priority })),
      stages: this.currentSettings.stages.map((stage) => ({ ...stage })),
      statuses: this.currentSettings.statuses.map((status) => ({ ...status }))
    };
  }
  notify() {
    if (!this.current) return;
    for (const listener of this.listeners) listener(this.current);
  }
  snapshotsEqual(left, right) {
    if (!prioritiesEqual(left.priorities, right.priorities) || !prioritiesEqual(left.stages, right.stages) || !prioritiesEqual(left.statuses, right.statuses)) return false;
    if (left.projects.length !== right.projects.length || left.tasks.length !== right.tasks.length) {
      return false;
    }
    const leftEntries = /* @__PURE__ */ new Map();
    for (const record of left.projects) leftEntries.set(record.path, { kind: "project", record });
    for (const record of left.tasks) leftEntries.set(record.path, { kind: "task", record });
    for (const record of right.projects) {
      if (!entriesEqual(leftEntries.get(record.path), { kind: "project", record })) return false;
    }
    for (const record of right.tasks) {
      if (!entriesEqual(leftEntries.get(record.path), { kind: "task", record })) return false;
    }
    return true;
  }
};

// src/adapters/project-manager-source.ts
var import_obsidian = require("obsidian");
var DEFAULT_PROJECTS_FOLDER = "Projects";
function settingsFolder(settings2) {
  const configured = typeof (settings2 == null ? void 0 : settings2.projectsFolder) === "string" ? settings2.projectsFolder.trim() : "";
  return (0, import_obsidian.normalizePath)(configured || DEFAULT_PROJECTS_FOLDER);
}
function frontmatter(cache) {
  var _a;
  return (_a = cache == null ? void 0 : cache.frontmatter) != null ? _a : null;
}
var ObsidianProjectManagerSource = class {
  constructor(app) {
    __publicField(this, "app", app);
    __publicField(this, "managedFolder", DEFAULT_PROJECTS_FOLDER);
  }
  async scan() {
    const settings2 = await this.readSettings();
    this.managedFolder = settingsFolder(settings2);
    const documents = [];
    const root = this.app.vault.getAbstractFileByPath(this.managedFolder);
    if (root instanceof import_obsidian.TFolder) this.collect(root, documents);
    return { documents, settings: settings2 };
  }
  watch(listener) {
    const metadataRef = this.app.metadataCache.on("changed", (file, _data, cache) => {
      if (!this.isManaged(file.path)) return;
      listener({ kind: "upsert", document: this.document(file, cache) });
    });
    const createRef = this.app.vault.on("create", (file) => {
      if (!(file instanceof import_obsidian.TFile) || file.extension !== "md" || !this.isManaged(file.path)) {
        return;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      if (cache) listener({ kind: "upsert", document: this.document(file, cache) });
    });
    const deleteRef = this.app.vault.on("delete", (file) => {
      if (!this.isManaged(file.path)) return;
      listener({ kind: "remove", path: file.path, recursive: file instanceof import_obsidian.TFolder });
    });
    const renameRef = this.app.vault.on("rename", (file, oldPath) => {
      if (file instanceof import_obsidian.TFolder) {
        if (this.isManaged(oldPath) || this.isManaged(file.path)) listener({ kind: "reconcile" });
        return;
      }
      if (this.isManaged(oldPath)) {
        listener({ kind: "remove", path: oldPath });
      }
      if (!(file instanceof import_obsidian.TFile) || file.extension !== "md" || !this.isManaged(file.path)) {
        return;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      if (cache) listener({ kind: "upsert", document: this.document(file, cache) });
    });
    return () => {
      this.app.metadataCache.offref(metadataRef);
      this.app.vault.offref(createRef);
      this.app.vault.offref(deleteRef);
      this.app.vault.offref(renameRef);
    };
  }
  collect(folder, documents) {
    for (const child of folder.children) {
      if (child instanceof import_obsidian.TFolder) {
        this.collect(child, documents);
      } else if (child instanceof import_obsidian.TFile && child.extension === "md") {
        documents.push(this.document(child, this.app.metadataCache.getFileCache(child)));
      }
    }
  }
  document(file, cache) {
    return {
      path: file.path,
      basename: file.basename,
      frontmatter: frontmatter(cache)
    };
  }
  isManaged(path) {
    return path === this.managedFolder || path.startsWith(`${this.managedFolder}/`);
  }
  async readSettings() {
    const path = `${this.app.vault.configDir}/plugins/project-manager-enhanced/data.json`;
    try {
      if (!await this.app.vault.adapter.exists(path)) return null;
      const parsed = JSON.parse(await this.app.vault.adapter.read(path));
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }
};

// src/adapters/project-manager-navigation.ts
var import_obsidian2 = require("obsidian");
var PROJECT_MANAGER_ID = "project-manager-enhanced";
var PROJECT_VIEW_TYPE = "pm-project";
var COMPATIBLE_VERSION = /^(?:1\.8\.|1\.[0-9]+\.)/u;
var RENDER_TIMEOUT_MS = 2500;
var POLL_INTERVAL_MS = 40;
var DetachedProjectLeaf = class extends import_obsidian2.Events {
  constructor(app) {
    super();
    __publicField(this, "app", app);
    __publicField(this, "containerEl");
    __publicField(this, "history", { backHistory: [], forwardHistory: [] });
    __publicField(this, "rootEl");
    this.rootEl = createDiv("pmi-detached-project-host");
    this.rootEl.setAttribute("aria-hidden", "true");
    this.rootEl.append(createDiv());
    this.containerEl = createDiv("pmi-detached-project-container");
    this.containerEl.append(createDiv(), createDiv());
    this.rootEl.append(this.containerEl);
    document.body.append(this.rootEl);
  }
  updateHeader() {
  }
  destroy() {
    this.rootEl.remove();
  }
};
var ProjectManagerNavigationError = class extends Error {
  constructor(code) {
    super(code);
    __publicField(this, "code", code);
    this.name = "ProjectManagerNavigationError";
  }
};
var ProjectManagerNavigator = class {
  constructor(app) {
    __publicField(this, "app", app);
    __publicField(this, "openingTask", false);
  }
  async openProject(projectPath) {
    var _a;
    const plugin = this.plugin();
    if (!((_a = plugin.router) == null ? void 0 : _a.openProjectByPath)) {
      throw new ProjectManagerNavigationError("project-router-unavailable");
    }
    await plugin.router.openProjectByPath(projectPath);
  }
  async editTask(target) {
    var _a, _b;
    if (this.openingTask) return;
    this.openingTask = true;
    let detachedLeaf = null;
    let projectView = null;
    try {
      const plugin = this.plugin();
      if (!COMPATIBLE_VERSION.test((_b = (_a = plugin.manifest) == null ? void 0 : _a.version) != null ? _b : "")) {
        throw new ProjectManagerNavigationError("unsupported-version");
      }
      const existingModals = new Set(document.querySelectorAll(".modal-container"));
      ({ leaf: detachedLeaf, view: projectView } = await this.createDetachedProjectView(
        target.projectPath
      ));
      const taskButton = await this.findTaskButton(projectView, target.taskId);
      if (!taskButton) throw new ProjectManagerNavigationError("task-not-found");
      taskButton.click();
      const modal = await this.waitFor(
        () => [...document.querySelectorAll(".modal-container")].find(
          (candidate) => !existingModals.has(candidate)
        )
      );
      if (!modal) throw new ProjectManagerNavigationError("task-editor-unavailable");
      await this.waitForRemoval(modal);
    } finally {
      try {
        if (detachedLeaf) await this.disposeDetachedProjectView(detachedLeaf, projectView);
      } finally {
        this.openingTask = false;
      }
    }
  }
  async createDetachedProjectView(projectPath) {
    var _a, _b, _c;
    const registry = this.app.viewRegistry;
    const createView = (_a = registry == null ? void 0 : registry.getViewCreatorByType) == null ? void 0 : _a.call(registry, PROJECT_VIEW_TYPE);
    if (!createView) throw new ProjectManagerNavigationError("task-editor-unavailable");
    const leaf = new DetachedProjectLeaf(this.app);
    let view = null;
    try {
      view = createView(leaf);
      if (!view.setState) throw new ProjectManagerNavigationError("task-editor-unavailable");
      (_b = view.load) == null ? void 0 : _b.call(view);
      await ((_c = view.onOpen) == null ? void 0 : _c.call(view));
      await view.setState({ filePath: projectPath }, {});
      // 隐藏导航视图必须使用表格模式，甘特图和看板没有可供任务定位的表格行状态。
      if (view.currentView !== "table" && typeof view.renderCurrentView === "function") {
        view.currentView = "table";
        view.renderCurrentView();
      }
      return { leaf, view };
    } catch (error) {
      await this.disposeDetachedProjectView(leaf, view).catch(() => void 0);
      throw error;
    }
  }
  async disposeDetachedProjectView(leaf, view) {
    var _a, _b;
    try {
      await ((_a = view == null ? void 0 : view.onClose) == null ? void 0 : _a.call(view));
    } finally {
      try {
        (_b = view == null ? void 0 : view.unload) == null ? void 0 : _b.call(view);
      } finally {
        leaf.destroy();
      }
    }
  }
  plugin() {
    const registry = this.app.plugins;
    const plugin = registry == null ? void 0 : registry.getPlugin(PROJECT_MANAGER_ID);
    if (!plugin) throw new ProjectManagerNavigationError("plugin-unavailable");
    return plugin;
  }
  async findTaskButton(view, taskId) {
    var _a, _b, _c, _d, _e, _f, _g;
    const ready = await this.waitFor(() => {
      var _a2;
      return view.project && ((_a2 = view.subview) == null ? void 0 : _a2.state);
    });
    if (!ready) return null;
    this.revealAllTasks(view);
    await ((_b = (_a = view.subview) == null ? void 0 : _a.refresh) == null ? void 0 : _b.call(_a));
    const firstAttempt = await this.waitFor(() => this.taskButton(view.containerEl, taskId), 400);
    if (firstAttempt) return firstAttempt;
    const state = (_c = view.subview) == null ? void 0 : _c.state;
    const rowIndex = (_e = (_d = state == null ? void 0 : state.visibleRows) == null ? void 0 : _d.findIndex((row) => {
      var _a2;
      return ((_a2 = row.task) == null ? void 0 : _a2.id) === taskId;
    })) != null ? _e : -1;
    const wrapper = state == null ? void 0 : state.wrapper;
    if (rowIndex < 0 || !(wrapper instanceof HTMLElement)) return null;
    const rowHeight = Math.max(1, (_f = state == null ? void 0 : state.rowHeight) != null ? _f : 48);
    wrapper.scrollTop = Math.max(0, rowIndex * rowHeight - rowHeight * 2);
    wrapper.dispatchEvent(new Event("scroll"));
    return (_g = await this.waitFor(() => this.taskButton(view.containerEl, taskId))) != null ? _g : null;
  }
  revealAllTasks(view) {
    var _a, _b, _c, _d;
    const resetFilter = (filter) => {
      if (!filter) return;
      Object.assign(filter, {
        text: "",
        stages: [],
        statuses: [],
        priorities: [],
        assignees: [],
        participants: [],
        tags: [],
        dueDateFilter: "any",
        showArchived: true,
        quickSource: "all",
        quickWorkType: "all",
        quickCompletion: "all",
        quickOwnership: "all",
        quickAttention: [],
        quickOwner: "",
        quickPreset: ""
      });
    };
    resetFilter(view.filter);
    resetFilter((_b = (_a = view.subview) == null ? void 0 : _a.state) == null ? void 0 : _b.filter);
    view.activeSavedViewId = null;
    const expand = (tasks) => {
      var _a2;
      for (const task2 of tasks) {
        task2.collapsed = false;
        expand((_a2 = task2.subtasks) != null ? _a2 : []);
      }
    };
    expand((_d = (_c = view.project) == null ? void 0 : _c.tasks) != null ? _d : []);
  }
  taskButton(container, taskId) {
    const rows = container.querySelectorAll("[data-task-id]");
    for (const row of rows) {
      if (row.dataset.taskId !== taskId) continue;
      const button = row.querySelector(".pm-task-title-text");
      if (button) return button;
    }
    return void 0;
  }
  async waitFor(read, timeout = RENDER_TIMEOUT_MS) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const result = read();
      if (result) return result;
      await new Promise((resolve) => window.setTimeout(resolve, POLL_INTERVAL_MS));
    }
    return null;
  }
  async waitForRemoval(element) {
    if (!element.isConnected) return;
    await new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (element.isConnected) return;
        observer.disconnect();
        resolve();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
};

// src/i18n.ts
var en = {
  viewName: "PM Insights",
  commandOpen: "Open workload insights",
  commandRefresh: "Refresh workload insights",
  toolbarTooltip: "Open assignee insights",
  eyebrow: "PROJECT MANAGER \xB7 CURRENT SNAPSHOT",
  heading: "Assignee workload",
  intro: "Compare planned, logged, and remaining work across projects without changing task data.",
  projects: "Projects",
  projectCount: (count) => `${count} selected`,
  projectSearch: "Find a project\u2026",
  selectAll: "Select all",
  clear: "Clear",
  object: "Object",
  all: "All",
  requirement: "Requirement",
  task: "Task",
  refresh: "Refresh",
  planned: "Planned",
  logged: "Logged",
  remaining: "Remaining",
  overrun: "Overrun",
  personal: "Personal",
  shared: "Shared",
  unassigned: "Unassigned",
  unestimated: "Unestimated",
  qualityTitle: "Data quality",
  qualitySummary: (requirements, tasks, unestimated, unassigned) => `${requirements} requirements \xB7 ${tasks} tasks \xB7 ${unestimated} unestimated \xB7 ${unassigned} unassigned`,
  members: "Assignees",
  memberSearch: "Find an assignee\u2026",
  memberRatios: "Delivery ledger",
  deliveryRatios: "Delivery",
  timeRatios: "Time",
  dataRatios: "Data foundation",
  taskClosureRate: "Task closure",
  taskClosureRateHint: "Completed non-cancelled tasks out of all non-cancelled tasks.",
  plannedClosureRate: "Planned work closed",
  plannedClosureRateHint: "Planned hours on completed tasks out of all estimated hours.",
  timeConsumptionRate: "Time consumed",
  timeConsumptionRateHint: "Logged hours on estimated tasks compared with their planned hours.",
  overrunTaskRate: "Tasks over budget",
  overrunTaskRateHint: "Started estimated tasks whose logged hours exceed their plan.",
  estimateAccuracyRate: "Estimate accuracy",
  estimateAccuracyRateHint: "Completed tasks whose logged hours are within 20% of their estimate.",
  estimateCoverageRate: "Estimate coverage",
  estimateCoverageRateHint: "Non-cancelled tasks that have a time estimate.",
  ratioUnavailable: "\u2014",
  percentage: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 1 })}%`,
  ratioTasks: (numerator, denominator) => `${numerator} / ${denominator} tasks`,
  ratioHours: (numerator, denominator) => `${numerator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h / ${denominator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  tasks: "Tasks",
  taskId: "Item ID",
  item: "Item",
  taskSearch: "Find a task\u2026",
  allProjects: "All projects",
  allTaskStatuses: "All statuses",
  allPriorities: "All priorities",
  noneSelected: "None selected",
  selectedCount: (count) => `${count} selected`,
  optionCount: (count) => `${count} available`,
  resetFilters: "Reset filters",
  taskFilterResult: (visible, total) => `Showing ${visible} of ${total} tasks`,
  memberWorkResult: (visibleTasks, totalTasks, source = "all") => {
    const visibleRequirements = visibleTasks.filter((task2) => task2.sourceType === "requirement").length;
    const totalRequirements = totalTasks.filter((task2) => task2.sourceType === "requirement").length;
    const visibleWorkItems = visibleTasks.length - visibleRequirements;
    const totalWorkItems = totalTasks.length - totalRequirements;
    if (source === "requirement") return `Showing ${visibleRequirements} / ${totalRequirements} requirements`;
    if (source === "task") return `Showing ${visibleWorkItems} / ${totalWorkItems} tasks`;
    return `Showing ${visibleRequirements} requirements · ${visibleTasks.length - visibleRequirements} tasks / ${totalRequirements} requirements · ${totalTasks.length - totalRequirements} tasks`;
  },
  resizeColumn: (column) => `Resize ${column} column`,
  resizeColumnHint: (column) => `Drag to resize the ${column} column. Use the arrow keys for precise adjustment. Double-click to reset all columns.`,
  project: "Project",
  module: "Module",
  stage: "Stage",
  assignee: "Assignee",
  completedBy: "Completed by",
  due: "Due date",
  progress: "Progress",
  work: "Work",
  workHours: (logged, planned) => `${logged.toLocaleString(void 0, { maximumFractionDigits: 2 })}/${planned.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  priority: "Priority",
  status: "Status",
  noPriority: "No priority",
  sortPriority: "Sort by priority",
  priorityHighToLow: "High to low",
  priorityLowToHigh: "Low to high",
  assignment: "Assignment",
  noProjectsTitle: "Choose projects to build a workload view",
  noProjectsBody: "Select one or more Project Manager projects above.",
  noDataTitle: "No Project Manager projects found",
  noDataBody: "Enable Project Manager and create a project. This plugin only reads Project Manager notes.",
  noMembers: "No assignees match this search.",
  noTasks: "No tasks match the current filters.",
  openTask: "Open task",
  openProject: "Open project in a new tab",
  projectManagerUnavailable: "Project Manager is unavailable. Make sure the plugin is enabled.",
  projectManagerVersionUnsupported: "This Project Manager version does not support opening task details from PM Insights.",
  taskEditorUnavailable: "Could not open this task in Project Manager.",
  settingsHeading: "PM Insights",
  language: "Language",
  languageDesc: "Use Obsidian's language or choose a language for this plugin.",
  automatic: "Automatic",
  english: "English",
  chinese: "\u7B80\u4F53\u4E2D\u6587",
  aliases: "Member aliases",
  aliasesDesc: "Combine different assignee spellings under one canonical member. Project Manager data is not changed.",
  canonicalName: "Canonical name",
  aliasNames: "Aliases, separated by commas",
  addAlias: "Add member mapping",
  removeAlias: "Remove member mapping",
  hours: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  taskCount: (count) => `${count} task${count === 1 ? "" : "s"}`,
  memberWorkCount: (tasks, source = "all") => {
    const requirements = tasks.filter((task2) => task2.sourceType === "requirement").length;
    const workItems = tasks.length - requirements;
    if (source === "requirement") return `${requirements} requirement${requirements === 1 ? "" : "s"}`;
    if (source === "task") return `${workItems} task${workItems === 1 ? "" : "s"}`;
    return `${requirements} requirement${requirements === 1 ? "" : "s"} · ${workItems} task${workItems === 1 ? "" : "s"}`;
  },
  archived: "Archived"
};
var zh = {
  viewName: "PM \u6D1E\u5BDF",
  commandOpen: "\u6253\u5F00\u5DE5\u4F5C\u91CF\u6D1E\u5BDF",
  commandRefresh: "\u5237\u65B0\u5DE5\u4F5C\u91CF\u6D1E\u5BDF",
  toolbarTooltip: "\u6253\u5F00\u6210\u5458\u7EDF\u8BA1",
  eyebrow: "PROJECT MANAGER \xB7 \u5F53\u524D\u5FEB\u7167",
  heading: "\u6210\u5458\u5DE5\u4F5C\u91CF",
  intro: "\u8DE8\u9879\u76EE\u6838\u5BF9\u8BA1\u5212\u3001\u5DF2\u767B\u8BB0\u548C\u5269\u4F59\u5DE5\u65F6\uFF0C\u4E0D\u4FEE\u6539\u4EFB\u4F55\u4EFB\u52A1\u6570\u636E\u3002",
  projects: "\u9879\u76EE",
  projectCount: (count) => `\u5DF2\u9009\u62E9 ${count} \u4E2A`,
  projectSearch: "\u67E5\u627E\u9879\u76EE\u2026",
  selectAll: "\u5168\u9009",
  clear: "\u6E05\u7A7A",
  object: "\u5BF9\u8C61",
  all: "\u5168\u90E8",
  requirement: "\u9700\u6C42",
  task: "\u4EFB\u52A1",
  refresh: "\u5237\u65B0",
  planned: "\u8BA1\u5212",
  logged: "\u5DF2\u767B\u8BB0",
  remaining: "\u5269\u4F59",
  overrun: "\u8D85\u51FA",
  personal: "\u4E2A\u4EBA",
  shared: "\u5171\u4EAB",
  unassigned: "\u672A\u5206\u914D",
  unestimated: "\u672A\u4F30\u7B97",
  qualityTitle: "\u6570\u636E\u8D28\u91CF",
  qualitySummary: (requirements, tasks, unestimated, unassigned) => `${requirements} \u4E2A\u9700\u6C42 \xB7 ${tasks} \u4E2A\u4EFB\u52A1 \xB7 ${unestimated} \u4E2A\u672A\u4F30\u7B97 \xB7 ${unassigned} \u4E2A\u672A\u5206\u914D`,
  members: "\u6210\u5458",
  memberSearch: "\u67E5\u627E\u6210\u5458\u2026",
  memberRatios: "\u4E2A\u4EBA\u4EA4\u4ED8\u8D26\u672C",
  deliveryRatios: "\u4EA4\u4ED8",
  timeRatios: "\u5DE5\u65F6",
  dataRatios: "\u6570\u636E\u57FA\u7840",
  taskClosureRate: "\u4EFB\u52A1\u95ED\u73AF",
  taskClosureRateHint: "\u5DF2\u5B8C\u6210\u4E14\u672A\u53D6\u6D88\u7684\u4EFB\u52A1\uFF0C\u5360\u5168\u90E8\u672A\u53D6\u6D88\u4EFB\u52A1\u7684\u6BD4\u4F8B\u3002",
  plannedClosureRate: "\u8BA1\u5212\u5DE5\u65F6\u95ED\u73AF",
  plannedClosureRateHint: "\u5DF2\u5B8C\u6210\u4EFB\u52A1\u7684\u8BA1\u5212\u5DE5\u65F6\uFF0C\u5360\u5168\u90E8\u5DF2\u4F30\u7B97\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  timeConsumptionRate: "\u5DE5\u65F6\u6D88\u8017",
  timeConsumptionRateHint: "\u5DF2\u4F30\u7B97\u4EFB\u52A1\u7684\u767B\u8BB0\u5DE5\u65F6\uFF0C\u76F8\u5BF9\u4E8E\u8BA1\u5212\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  overrunTaskRate: "\u8D85\u652F\u4EFB\u52A1",
  overrunTaskRateHint: "\u5DF2\u5F00\u5DE5\u4E14\u6709\u4F30\u7B97\u7684\u4EFB\u52A1\u4E2D\uFF0C\u767B\u8BB0\u5DE5\u65F6\u8D85\u8FC7\u8BA1\u5212\u7684\u6BD4\u4F8B\u3002",
  estimateAccuracyRate: "\u4F30\u7B97\u547D\u4E2D",
  estimateAccuracyRateHint: "\u5DF2\u5B8C\u6210\u4EFB\u52A1\u4E2D\uFF0C\u767B\u8BB0\u5DE5\u65F6\u5904\u4E8E\u8BA1\u5212\u5DE5\u65F6\u6B63\u8D1F 20% \u8303\u56F4\u5185\u7684\u6BD4\u4F8B\u3002",
  estimateCoverageRate: "\u4F30\u7B97\u8986\u76D6",
  estimateCoverageRateHint: "\u5168\u90E8\u672A\u53D6\u6D88\u4EFB\u52A1\u4E2D\uFF0C\u586B\u5199\u4E86\u8BA1\u5212\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  ratioUnavailable: "\u2014",
  percentage: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 1 })}%`,
  ratioTasks: (numerator, denominator) => `${numerator} / ${denominator} \u4E2A\u4EFB\u52A1`,
  ratioHours: (numerator, denominator) => `${numerator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h / ${denominator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  tasks: "\u4EFB\u52A1",
  taskId: "\u4E8B\u9879 ID",
  item: "\u4E8B\u9879",
  taskSearch: "\u67E5\u627E\u4EFB\u52A1\u2026",
  allProjects: "\u5168\u90E8\u9879\u76EE",
  allTaskStatuses: "\u5168\u90E8\u72B6\u6001",
  allPriorities: "\u5168\u90E8\u4F18\u5148\u7EA7",
  noneSelected: "\u672A\u9009\u62E9",
  selectedCount: (count) => `\u5DF2\u9009 ${count} \u9879`,
  optionCount: (count) => `${count} \u4E2A\u53EF\u9009\u9879`,
  resetFilters: "\u91CD\u7F6E\u7B5B\u9009",
  taskFilterResult: (visible, total) => `\u663E\u793A ${visible} / ${total} \u4E2A\u4EFB\u52A1`,
  memberWorkResult: (visibleTasks, totalTasks, source = "all") => {
    const visibleRequirements = visibleTasks.filter((task2) => task2.sourceType === "requirement").length;
    const totalRequirements = totalTasks.filter((task2) => task2.sourceType === "requirement").length;
    const visibleWorkItems = visibleTasks.length - visibleRequirements;
    const totalWorkItems = totalTasks.length - totalRequirements;
    if (source === "requirement") return `\u663E\u793A ${visibleRequirements} / ${totalRequirements} \u4E2A\u9700\u6C42`;
    if (source === "task") return `\u663E\u793A ${visibleWorkItems} / ${totalWorkItems} \u4E2A\u4EFB\u52A1`;
    return `\u663E\u793A ${visibleRequirements} \u4E2A\u9700\u6C42 \xB7 ${visibleTasks.length - visibleRequirements} \u4E2A\u4EFB\u52A1 / ${totalRequirements} \u4E2A\u9700\u6C42 \xB7 ${totalTasks.length - totalRequirements} \u4E2A\u4EFB\u52A1`;
  },
  resizeColumn: (column) => `\u8C03\u6574\u201C${column}\u201D\u5217\u5BBD`,
  resizeColumnHint: (column) => `\u62D6\u62FD\u53EF\u8C03\u6574\u201C${column}\u201D\u5217\u5BBD\uFF0C\u4E5F\u53EF\u7528\u65B9\u5411\u952E\u7CBE\u7EC6\u8C03\u6574\uFF1B\u53CC\u51FB\u6062\u590D\u6240\u6709\u5217\u7684\u9ED8\u8BA4\u5BBD\u5EA6\u3002`,
  project: "\u9879\u76EE",
  module: "\u6A21\u5757",
  stage: "\u9636\u6BB5",
  assignee: "\u8D1F\u8D23\u4EBA",
  completedBy: "\u5B8C\u6210\u8005",
  due: "\u622A\u6B62\u65E5\u671F",
  progress: "\u8FDB\u5EA6",
  work: "\u5DE5\u65F6",
  workHours: (logged, planned) => `${logged.toLocaleString(void 0, { maximumFractionDigits: 2 })}/${planned.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  priority: "\u4F18\u5148\u7EA7",
  status: "\u72B6\u6001",
  noPriority: "\u65E0\u4F18\u5148\u7EA7",
  sortPriority: "\u6309\u4F18\u5148\u7EA7\u6392\u5E8F",
  priorityHighToLow: "\u4ECE\u9AD8\u5230\u4F4E",
  priorityLowToHigh: "\u4ECE\u4F4E\u5230\u9AD8",
  assignment: "\u5F52\u5C5E",
  noProjectsTitle: "\u9009\u62E9\u9879\u76EE\u4EE5\u751F\u6210\u5DE5\u4F5C\u91CF\u89C6\u56FE",
  noProjectsBody: "\u8BF7\u5728\u4E0A\u65B9\u9009\u62E9\u4E00\u4E2A\u6216\u591A\u4E2A Project Manager \u9879\u76EE\u3002",
  noDataTitle: "\u6CA1\u6709\u627E\u5230 Project Manager \u9879\u76EE",
  noDataBody: "\u8BF7\u542F\u7528 Project Manager \u5E76\u521B\u5EFA\u9879\u76EE\u3002\u672C\u63D2\u4EF6\u53EA\u8BFB\u53D6 Project Manager \u7B14\u8BB0\u3002",
  noMembers: "\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458\u3002",
  noTasks: "\u6CA1\u6709\u7B26\u5408\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u7684\u4EFB\u52A1\u3002",
  openTask: "\u6253\u5F00\u4EFB\u52A1",
  openProject: "\u5728\u65B0\u9875\u7B7E\u6253\u5F00\u9879\u76EE",
  projectManagerUnavailable: "Project Manager \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4\u63D2\u4EF6\u5DF2\u542F\u7528\u3002",
  projectManagerVersionUnsupported: "\u5F53\u524D Project Manager \u7248\u672C\u6682\u4E0D\u652F\u6301\u4ECE PM \u6D1E\u5BDF\u6253\u5F00\u4EFB\u52A1\u8BE6\u60C5\u3002",
  taskEditorUnavailable: "\u65E0\u6CD5\u5728 Project Manager \u4E2D\u6253\u5F00\u6B64\u4EFB\u52A1\u3002",
  settingsHeading: "PM \u6D1E\u5BDF",
  language: "\u8BED\u8A00",
  languageDesc: "\u8DDF\u968F Obsidian\uFF0C\u6216\u5355\u72EC\u6307\u5B9A\u63D2\u4EF6\u754C\u9762\u8BED\u8A00\u3002",
  automatic: "\u81EA\u52A8",
  english: "English",
  chinese: "\u7B80\u4F53\u4E2D\u6587",
  aliases: "\u6210\u5458\u522B\u540D",
  aliasesDesc: "\u628A\u4E0D\u540C\u7684 assignee \u5199\u6CD5\u5408\u5E76\u4E3A\u540C\u4E00\u6210\u5458\uFF0C\u4E0D\u4F1A\u4FEE\u6539 Project Manager \u6570\u636E\u3002",
  canonicalName: "\u89C4\u8303\u540D\u79F0",
  aliasNames: "\u522B\u540D\uFF0C\u4F7F\u7528\u9017\u53F7\u5206\u9694",
  addAlias: "\u6DFB\u52A0\u6210\u5458\u6620\u5C04",
  removeAlias: "\u5220\u9664\u6210\u5458\u6620\u5C04",
  hours: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  taskCount: (count) => `${count} \u4E2A\u4EFB\u52A1`,
  memberWorkCount: (tasks, source = "all") => {
    const requirements = tasks.filter((task2) => task2.sourceType === "requirement").length;
    const workItems = tasks.length - requirements;
    if (source === "requirement") return `${requirements} \u4E2A\u9700\u6C42`;
    if (source === "task") return `${workItems} \u4E2A\u4EFB\u52A1`;
    return `${requirements} \u4E2A\u9700\u6C42 \xB7 ${workItems} \u4E2A\u4EFB\u52A1`;
  },
  archived: "\u5DF2\u5F52\u6863"
};
function translations(settings2) {
  const detected = (document.documentElement.lang || navigator.language || "en").toLowerCase();
  const locale = settings2.locale === "auto" ? detected : settings2.locale;
  return locale.startsWith("zh") ? zh : en;
}

// src/model.ts
var DEFAULT_SETTINGS = {
  locale: "auto",
  aliases: [],
  selectedProjectIds: [],
  memberViewMode: "table",
  memberGanttScale: "week",
  quickFilter: {
    quickSource: "all"
  }
};

// src/settings.ts
var import_obsidian3 = require("obsidian");
var InsightsSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "host");
    this.host = plugin;
  }
  getSettingDefinitions() {
    const t = translations(this.host.settings);
    return [
      {
        type: "group",
        heading: t.settingsHeading,
        items: [
          {
            name: t.language,
            desc: t.languageDesc,
            aliases: [t.aliases, t.aliasesDesc, t.canonicalName, t.aliasNames],
            control: {
              type: "dropdown",
              key: "locale",
              options: {
                auto: t.automatic,
                en: t.english,
                "zh-cn": t.chinese
              }
            }
          }
        ]
      },
      {
        type: "list",
        heading: t.aliases,
        addItem: {
          name: t.addAlias,
          action: () => {
            void this.addAlias();
          }
        },
        onDelete: (index) => {
          void this.deleteAlias(index);
        },
        items: this.host.settings.aliases.map((alias) => this.aliasDefinition(alias, t))
      }
    ];
  }
  getControlValue(key) {
    return key === "locale" ? this.host.settings.locale : void 0;
  }
  async setControlValue(key, value) {
    if (key !== "locale" || !this.isLocale(value)) return;
    this.host.settings.locale = value;
    await this.host.saveSettings();
    await this.host.refreshInsights();
    this.updateDefinitions();
  }
  // Obsidian versions before 1.13 use this imperative fallback.
  display() {
    this.renderLegacySettings();
  }
  renderLegacySettings() {
    const { containerEl } = this;
    const t = translations(this.host.settings);
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName(t.settingsHeading).setHeading();
    new import_obsidian3.Setting(containerEl).setName(t.language).setDesc(t.languageDesc).addDropdown(
      (dropdown) => dropdown.addOption("auto", t.automatic).addOption("en", t.english).addOption("zh-cn", t.chinese).setValue(this.host.settings.locale).onChange(async (value) => {
        this.host.settings.locale = value;
        await this.host.saveSettings();
        await this.host.refreshInsights();
        this.renderLegacySettings();
      })
    );
    new import_obsidian3.Setting(containerEl).setName(t.aliases).setDesc(t.aliasesDesc).setHeading();
    for (const [index, alias] of this.host.settings.aliases.entries()) {
      this.renderAlias(alias, index);
    }
    new import_obsidian3.Setting(containerEl).addButton(
      (button) => button.setButtonText(t.addAlias).setCta().onClick(async () => {
        this.host.settings.aliases.push({ canonical: "", aliases: [] });
        await this.host.saveSettings();
        this.renderLegacySettings();
      })
    );
  }
  aliasDefinition(alias, t) {
    return {
      name: alias.canonical || t.canonicalName,
      desc: alias.aliases.length > 0 ? alias.aliases.join(", ") : t.aliasesDesc,
      render: (setting) => {
        setting.setName("").setDesc("").addText(
          (input) => input.setPlaceholder(t.canonicalName).setValue(alias.canonical).onChange(async (value) => {
            alias.canonical = value;
            await this.host.saveSettings();
            await this.host.refreshInsights();
          })
        ).addText(
          (input) => input.setPlaceholder(t.aliasNames).setValue(alias.aliases.join(", ")).onChange(async (value) => {
            alias.aliases = this.parseAliases(value);
            await this.host.saveSettings();
            await this.host.refreshInsights();
          })
        );
      }
    };
  }
  async addAlias() {
    this.host.settings.aliases.push({ canonical: "", aliases: [] });
    await this.host.saveSettings();
    this.updateDefinitions();
  }
  async deleteAlias(index) {
    this.host.settings.aliases.splice(index, 1);
    await this.host.saveSettings();
    await this.host.refreshInsights();
    this.updateDefinitions();
  }
  isLocale(value) {
    return value === "auto" || value === "en" || value === "zh-cn";
  }
  parseAliases(value) {
    return value.split(/[,，]/u).map((item) => item.trim()).filter(Boolean);
  }
  updateDefinitions() {
    const update = Reflect.get(this, "update");
    if (typeof update === "function") update.call(this);
  }
  renderAlias(alias, index) {
    const t = translations(this.host.settings);
    new import_obsidian3.Setting(this.containerEl).addText(
      (input) => input.setPlaceholder(t.canonicalName).setValue(alias.canonical).onChange(async (value) => {
        alias.canonical = value;
        await this.host.saveSettings();
        await this.host.refreshInsights();
      })
    ).addText(
      (input) => input.setPlaceholder(t.aliasNames).setValue(alias.aliases.join(", ")).onChange(async (value) => {
        alias.aliases = this.parseAliases(value);
        await this.host.saveSettings();
        await this.host.refreshInsights();
      })
    ).addExtraButton(
      (button) => button.setIcon("trash-2").setTooltip(t.removeAlias).onClick(async () => {
        this.host.settings.aliases.splice(index, 1);
        await this.host.saveSettings();
        await this.host.refreshInsights();
        this.renderLegacySettings();
      })
    );
  }
};

// src/toolbar-integration.ts
var import_obsidian4 = require("obsidian");
var ProjectManagerToolbarIntegration = class {
  constructor(app, host) {
    __publicField(this, "app", app);
    __publicField(this, "host", host);
    __publicField(this, "observer", null);
    __publicField(this, "frame", null);
  }
  start() {
    if (this.observer) return;
    this.observer = new MutationObserver((records) => {
      if (records.some((record) => this.affectsProjectToolbar(record))) this.scheduleSync();
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
    this.sync();
  }
  stop() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    this.observer = null;
    if (this.frame !== null) window.cancelAnimationFrame(this.frame);
    this.frame = null;
    document.querySelectorAll(".pmi-open-insights-btn").forEach((element) => element.remove());
  }
  sync() {
    const switchers = document.querySelectorAll(
      ".workspace-leaf-content.pm-view .pm-view-switcher"
    );
    for (const switcher of switchers) {
      if (switcher.querySelector(".pmi-open-insights-btn")) continue;
      const projectPath = this.projectPathFor(switcher);
      if (!projectPath) continue;
      const button = switcher.createEl("button", {
        cls: "clickable-icon pm-view-btn pmi-open-insights-btn",
        attr: {
          type: "button",
          "aria-label": this.host.tooltip(),
          "data-tooltip-position": "top"
        }
      });
      (0, import_obsidian4.setIcon)(button, "chart-no-axes-combined");
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        void this.host.openProjectInsights(projectPath);
      });
    }
  }
  scheduleSync() {
    if (this.frame !== null) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = null;
      this.sync();
    });
  }
  affectsProjectToolbar(record) {
    if (record.target.instanceOf(Element) && record.target.closest(".pm-view-switcher")) return true;
    return [...record.addedNodes].some(
      (node) => node.instanceOf(Element) && (node.matches(".pm-view-switcher, .workspace-leaf-content.pm-view") || Boolean(node.querySelector(".pm-view-switcher")))
    );
  }
  projectPathFor(element) {
    let projectPath = null;
    this.app.workspace.iterateAllLeaves((leaf) => {
      var _a;
      if (projectPath || !leaf.view.containerEl.contains(element)) return;
      const state = leaf.getViewState();
      if (state.type !== "pm-project") return;
      const filePath = (_a = state.state) == null ? void 0 : _a.filePath;
      if (typeof filePath === "string") projectPath = filePath;
    });
    return projectPath;
  }
};

// src/view.ts
var import_obsidian5 = require("obsidian");

// src/domain/identity.ts
function normalizeIdentity(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US");
}
var IdentityResolver = class {
  constructor(aliases) {
    __publicField(this, "canonicalByIdentity", /* @__PURE__ */ new Map());
    for (const entry2 of aliases) {
      const canonical = entry2.canonical.normalize("NFKC").trim();
      if (!canonical) continue;
      this.canonicalByIdentity.set(normalizeIdentity(canonical), canonical);
      for (const alias of entry2.aliases) {
        const key = normalizeIdentity(alias);
        if (key) this.canonicalByIdentity.set(key, canonical);
      }
    }
  }
  resolve(value) {
    var _a;
    const display = value.normalize("NFKC").trim();
    if (!display) return "";
    return (_a = this.canonicalByIdentity.get(normalizeIdentity(display))) != null ? _a : display;
  }
  resolveMany(values) {
    const resolved = /* @__PURE__ */ new Map();
    for (const value of values) {
      const display = this.resolve(value);
      if (display) resolved.set(normalizeIdentity(display), display);
    }
    return [...resolved.values()];
  }
};

// src/domain/aggregate.ts
var UNASSIGNED_KEY = "__unassigned__";
function emptyMetrics() {
  return {
    planned: 0,
    logged: 0,
    remaining: 0,
    overrun: 0,
    taskCount: 0,
    unestimatedCount: 0
  };
}
function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
function addTask(metrics, task2) {
  metrics.planned += task2.estimate;
  metrics.logged += task2.logged;
  metrics.remaining += task2.remaining;
  metrics.overrun += task2.overrun;
  metrics.taskCount += 1;
  if (task2.unestimated) metrics.unestimatedCount += 1;
}
function finalizeMetrics(metrics) {
  return {
    ...metrics,
    planned: round(metrics.planned),
    logged: round(metrics.logged),
    remaining: round(metrics.remaining),
    overrun: round(metrics.overrun)
  };
}
function ratio(numerator, denominator) {
  return {
    numerator: round(numerator),
    denominator: round(denominator),
    percentage: denominator > 0 ? round(numerator / denominator * 100) : null
  };
}
function isCancelled(task2) {
  const status = task2.status.trim().toLocaleLowerCase();
  return status === "cancelled" || status === "canceled";
}
function memberRatios(tasks) {
  const eligible = tasks.filter((task2) => !task2.contextOnly && !isCancelled(task2));
  const completed = eligible.filter((task2) => task2.completed);
  const estimated = eligible.filter((task2) => !task2.unestimated);
  const startedEstimated = estimated.filter((task2) => task2.logged > 0);
  const completedEstimated = startedEstimated.filter((task2) => task2.completed);
  const totalPlanned = estimated.reduce((total, task2) => total + task2.estimate, 0);
  const completedPlanned = estimated.filter((task2) => task2.completed).reduce((total, task2) => total + task2.estimate, 0);
  const estimatedLogged = estimated.reduce((total, task2) => total + task2.logged, 0);
  return {
    taskClosure: ratio(completed.length, eligible.length),
    plannedClosure: ratio(completedPlanned, totalPlanned),
    timeConsumption: ratio(estimatedLogged, totalPlanned),
    overrunTasks: ratio(
      startedEstimated.filter((task2) => task2.logged > task2.estimate).length,
      startedEstimated.length
    ),
    estimateAccuracy: ratio(
      completedEstimated.filter((task2) => {
        const consumption = task2.logged / task2.estimate;
        return consumption >= 0.8 && consumption <= 1.2;
      }).length,
      completedEstimated.length
    ),
    estimateCoverage: ratio(estimated.length, eligible.length)
  };
}
function taskInsight(task2, projectTitle, resolvedAssignees, kind) {
  const unestimated = task2.estimate <= 0;
  const remaining = task2.remainingOverride ?? (!task2.completed && !task2.archived && !unestimated ? Math.max(task2.estimate - task2.logged, 0) : 0);
  const overrun = !unestimated ? Math.max(task2.logged - task2.estimate, 0) : 0;
  return {
    ...task2,
    projectTitle,
    resolvedAssignees,
    assignmentKind: kind,
    remaining: round(remaining),
    overrun: round(overrun),
    unestimated
  };
}
function quickMatches(task2, filter) {
  filter = filter ?? {};
  const source = filter.quickSource ?? "all";
  return source === "all" || task2.sourceType === source;
}
function aggregateInsights(projects, tasks, options) {
  var _a;
  const projectTitles = new Map(projects.map((project2) => [project2.id, project2.title]));
  const selected = tasks.filter((task2) => options.projectIds.has(task2.projectId));
  const resolver = new IdentityResolver(options.aliases);
  // 先按对象组合筛选，再统一汇总工时；需求和任务不再通过父子层级互斥。
  const included = selected.filter(
    (task2) => !task2.archived && quickMatches(task2, options.quickFilter)
  );
  const members = /* @__PURE__ */ new Map();
  const allTasks = [];
  const team = emptyMetrics();
  const getMember = (name, unassigned = false) => {
    const key = unassigned ? UNASSIGNED_KEY : normalizeIdentity(name);
    let member = members.get(key);
    if (!member) {
      member = {
        key,
        name: unassigned ? options.unassignedLabel : name,
        kind: unassigned ? "unassigned" : "member",
        personal: emptyMetrics(),
        shared: emptyMetrics(),
        ratios: memberRatios([]),
        tasks: []
      };
      members.set(key, member);
    }
    return member;
  };
  for (const task2 of included) {
    // 成员归属只认一个人：任务已完成时归到完成人，否则归到负责人。
    const completedBy = resolver.resolve(task2.completedBy ?? "");
    const responsible = resolver.resolveMany(task2.assignees)[0] ?? "";
    const owner = completedBy || responsible;
    const kind = owner ? "personal" : "unassigned";
    const insight = taskInsight(
      task2,
      (_a = projectTitles.get(task2.projectId)) != null ? _a : task2.projectId,
      owner ? [owner] : [],
      kind
    );
    allTasks.push(insight);
    addTask(team, insight);
    if (kind === "unassigned") {
      const member = getMember(options.unassignedLabel, true);
      addTask(member.personal, insight);
      member.tasks.push(insight);
      continue;
    }
    const member = getMember(owner);
    addTask(member.personal, insight);
    member.tasks.push(insight);
  }
  if ((options.quickFilter?.quickSource ?? "all") === "all") {
    const insightById = new Map(allTasks.map((task2) => [task2.id, task2]));
    for (const member of members.values()) {
      const existingIds = new Set(member.tasks.map((task2) => task2.id));
      for (const task2 of [...member.tasks]) {
        const storyId = String(task2.customFields.storyId ?? "");
        if ((task2.parentId && existingIds.has(task2.parentId)) || (!task2.parentId && !storyId)) continue;
        const parent = insightById.get(task2.parentId) ?? allTasks.find((candidate) => candidate.sourceType === "requirement" && candidate.projectId === task2.projectId && String(candidate.zentaoId ?? "") === String(task2.customFields.storyId ?? ""));
        if (!parent) continue;
        if (!task2.parentId) {
          const taskIndex = member.tasks.findIndex((candidate) => candidate.id === task2.id);
          if (taskIndex >= 0) member.tasks[taskIndex] = { ...task2, parentId: parent.id };
        }
        member.tasks.push({ ...parent, contextOnly: true });
        existingIds.add(parent.id);
      }
    }
  }
  const finalizedMembers = [...members.values()].map((member) => {
    const tasks2 = member.tasks.sort(
      (left, right) => right.remaining - left.remaining || left.projectTitle.localeCompare(right.projectTitle)
    );
    return {
      ...member,
      personal: finalizeMetrics(member.personal),
      shared: finalizeMetrics(member.shared),
      ratios: memberRatios(tasks2),
      tasks: tasks2
    };
  }).sort((left, right) => {
    if (left.kind !== right.kind) return left.kind === "unassigned" ? 1 : -1;
    const leftRemaining = left.personal.remaining + left.shared.remaining;
    const rightRemaining = right.personal.remaining + right.shared.remaining;
    return rightRemaining - leftRemaining || left.name.localeCompare(right.name);
  });
  return {
    members: finalizedMembers,
    tasks: allTasks,
    team: finalizeMetrics(team),
    quality: {
      requirementCount: allTasks.filter((task2) => task2.sourceType === "requirement").length,
      taskCount: allTasks.filter((task2) => task2.sourceType === "task").length,
      unassignedCount: allTasks.filter((task2) => task2.assignmentKind === "unassigned").length,
      unestimatedCount: allTasks.filter((task2) => task2.unestimated).length
    }
  };
}

// src/view.ts
var INSIGHTS_VIEW_TYPE = "project-manager-insights-view";
var TASK_PRIORITY_NONE = "";
var TASK_COLUMN_MIN_WIDTHS = [96, 260, 150, 160, 120, 100, 92, 110, 110, 110, 120, 90];
var TASK_COLUMN_GAP = 10;
var TASK_TABLE_INLINE_PADDING = 22;
var TASK_COLUMN_KEYBOARD_STEP = 12;
var MEMBER_GANTT_DAY_MS = 24 * 60 * 60 * 1e3;
var MEMBER_GANTT_MIN_WIDTH = 720;
var MEMBER_GANTT_SCALE_WIDTHS = { day: 132, week: 66, month: 27 };
var MEMBER_GANTT_MIN_DAYS = { day: 30, week: 90, month: 365 };
var MEMBER_GANTT_START_PADDING_DAYS = 7;
var MEMBER_GANTT_END_PADDING_DAYS = 14;
var MEMBER_GANTT_LABEL_DEFAULT_WIDTH = 420;
var MEMBER_GANTT_LABEL_MIN_WIDTH = 300;
var MEMBER_GANTT_LABEL_MAX_WIDTH = 720;
var MEMBER_GANTT_BAR_LABEL_MIN_WIDTH = 56;
function memberDateValue(value) {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/u);
  if (!match) return null;
  const timestamp = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isFinite(timestamp) ? timestamp : null;
}
function memberDateText(timestamp, scale) {
  const options = scale === "month" ? { year: "numeric", month: "short" } : { month: "numeric", day: "numeric" };
  return new Intl.DateTimeFormat(void 0, options).format(new Date(timestamp));
}
function memberCurrentPeriodStart(scale) {
  const now = /* @__PURE__ */ new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  if (scale === "month") return Date.UTC(now.getFullYear(), now.getMonth(), 1);
  if (scale === "week") {
    const day = new Date(today).getUTCDay();
    const offset = day === 0 ? 6 : day - 1;
    return today - offset * MEMBER_GANTT_DAY_MS;
  }
  return today;
}
function memberWeekdayText(timestamp) {
  return new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(new Date(timestamp));
}
function memberIsoWeek(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const year = date.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / MEMBER_GANTT_DAY_MS + 1) / 7);
  return { year, week };
}
var InsightsView = class extends import_obsidian5.ItemView {
  constructor(leaf, host) {
    super(leaf);
    __publicField(this, "host", host);
    __publicField(this, "selectedMemberKey", null);
    __publicField(this, "memberQuery", "");
    __publicField(this, "quickSource", "all");
    __publicField(this, "taskQuery", "");
    __publicField(this, "taskStatuses", null);
    __publicField(this, "taskPriorities", null);
    __publicField(this, "taskPrioritySort", "none");
    __publicField(this, "memberViewMode", "table");
    __publicField(this, "memberGanttScale", "week");
    __publicField(this, "memberGanttLabelWidth", MEMBER_GANTT_LABEL_DEFAULT_WIDTH);
    __publicField(this, "dashboardEl", null);
    __publicField(this, "projectSummaryEl", null);
    __publicField(this, "selectedProjectTagsEl", null);
    __publicField(this, "taskColumnWidths", null);
    __publicField(this, "projectTableColumnWidths", null);
    __publicField(this, "renderVersion", 0);
    this.memberViewMode = ["table", "gantt", "kanban"].includes(host.settings.memberViewMode) ? host.settings.memberViewMode : "table";
    this.memberGanttScale = ["day", "week", "month"].includes(host.settings.memberGanttScale) ? host.settings.memberGanttScale : "week";
    this.navigation = true;
  }
  getViewType() {
    return INSIGHTS_VIEW_TYPE;
  }
  getDisplayText() {
    return translations(this.host.settings).viewName;
  }
  getIcon() {
    return "chart-no-axes-combined";
  }
  async onOpen() {
    this.containerEl.addClass("pmi-view");
    this.registerDomEvent(document, "pointerdown", (event) => {
      const path = event.composedPath();
      const openMenus = this.containerEl.querySelectorAll(
        ".pmi-project-picker[open], .pmi-task-filter-menu[open]"
      );
      for (const menu of openMenus) {
        if (!path.includes(menu)) menu.open = false;
      }
    });
    await this.render();
  }
  async refresh() {
    await this.render();
  }
  async scopeToProjectPath(path) {
    const snapshot = await this.host.readProjectManager();
    const normalizedPath = String(path ?? "").replace(/\\/g, "/");
    const project2 = snapshot.projects.find((candidate) => {
      const candidatePath = String(candidate.path ?? "").replace(/\\/g, "/");
      return candidatePath === normalizedPath || candidatePath.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidatePath}`);
    });
    if (!project2) return;
    this.host.settings.selectedProjectIds = [project2.id];
    this.selectedMemberKey = null;
    await this.host.saveSettings();
    await this.render();
    this.contentEl.scrollTo({ top: 0 });
  }
  async render() {
    const version = ++this.renderVersion;
    const snapshot = await this.host.readProjectManager();
    if (version !== this.renderVersion) return;
    const t = translations(this.host.settings);
    const root = this.contentEl;
    root.empty();
    root.addClass("pmi-root");
    this.renderHeader(root, t);
    if (snapshot.projects.length === 0) {
      this.renderEmpty(root, t.noDataTitle, t.noDataBody, "folder-search-2");
      return;
    }
    const projectIds = new Set(snapshot.projects.map((project2) => project2.id));
    const validSelection = this.host.settings.selectedProjectIds.filter((id) => projectIds.has(id));
    if (validSelection.length !== this.host.settings.selectedProjectIds.length) {
      this.host.settings.selectedProjectIds = validSelection;
      await this.host.saveSettings();
    }
    this.renderControls(root, snapshot, t);
    this.dashboardEl = root.createDiv("pmi-dashboard");
    this.renderDashboard(snapshot, t);
  }
  renderHeader(root, t) {
    const header = root.createDiv("pmi-header");
    const copy = header.createDiv("pmi-header-copy");
    copy.createDiv({ cls: "pmi-eyebrow", text: t.eyebrow });
    copy.createEl("h1", { text: t.heading });
    copy.createEl("p", { text: t.intro });
    const stamp = header.createDiv("pmi-snapshot-stamp");
    (0, import_obsidian5.setIcon)(stamp.createSpan("pmi-snapshot-icon"), "scan-line");
    stamp.createSpan({ text: new Intl.DateTimeFormat(void 0, { hour: "2-digit", minute: "2-digit" }).format(/* @__PURE__ */ new Date()) });
  }
  getQuickFilter() {
    const saved = this.host.settings.quickFilter;
    const filter = saved && typeof saved === "object" ? saved : {};
    this.quickSource = ["all", "requirement", "task"].includes(filter.quickSource) ? filter.quickSource : "all";
    return { quickSource: this.quickSource };
  }
  async saveQuickFilter(filter) {
    this.host.settings.quickFilter = { quickSource: filter.quickSource };
    await this.host.saveSettings();
  }
  renderQuickFilters(root, snapshot, t) {
    const filter = this.getQuickFilter();
    const panel = root.createDiv("pmi-quick-filter-panel");
    const buttons = [];
    // dashboard 只重绘数据区域，按钮选中态需要在当前面板内立即同步。
    const syncButtons = () => {
      for (const button of buttons) {
        const active = filter.quickSource === button.value;
        button.element.classList.toggle("is-active", active);
        button.element.setAttribute("aria-pressed", String(active));
      }
    };
    const update = (patch) => {
      void (async () => {
        Object.assign(filter, patch);
        this.quickSource = filter.quickSource;
        syncButtons();
        await this.saveQuickFilter(filter);
        this.selectedMemberKey = null;
        this.taskQuery = "";
        this.taskStatuses = null;
        this.taskPriorities = null;
        this.renderDashboard(snapshot, t);
      })();
    };
    const group = (label, options) => {
      const row = panel.createDiv("pmi-quick-filter-row");
      row.createSpan({ cls: "pmi-quick-filter-label", text: label });
      for (const option of options) {
        const button = row.createEl("button", {
          cls: "pmi-quick-filter-button",
          text: option.label,
          attr: { type: "button", "aria-pressed": "false" }
        });
        buttons.push({ element: button, value: option.id });
        button.addEventListener("click", () => update({ quickSource: option.id }));
      }
    };
    group(t.object, [
      { id: "all", label: t.all },
      { id: "requirement", label: t.requirement },
      { id: "task", label: t.task }
    ]);
    syncButtons();
  }
  renderControls(root, snapshot, t) {
    const controls = root.createDiv("pmi-controls");
    const picker = controls.createEl("details", { cls: "pmi-project-picker" });
    const summary = picker.createEl("summary");
    (0, import_obsidian5.setIcon)(summary.createSpan(), "layers-3");
    summary.createSpan({ cls: "pmi-control-label", text: t.projects });
    this.projectSummaryEl = summary.createSpan("pmi-project-count");
    this.updateProjectSummary(t);
    const chevron = summary.createSpan("pmi-project-chevron");
    (0, import_obsidian5.setIcon)(chevron, "chevron-down");
    picker.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !picker.open) return;
      picker.open = false;
      summary.focus();
      event.preventDefault();
      event.stopPropagation();
    });
    const panel = picker.createDiv("pmi-project-panel");
    const projectSearch = panel.createEl("input", {
      type: "search",
      placeholder: t.projectSearch,
      cls: "pmi-project-search"
    });
    const actions = panel.createDiv("pmi-project-actions");
    const selectAll = actions.createEl("button", { text: t.selectAll });
    const clear = actions.createEl("button", { text: t.clear });
    const list = panel.createDiv("pmi-project-list");
    const renderProjects = () => {
      const query = projectSearch.value.normalize("NFKC").trim().toLocaleLowerCase();
      list.empty();
      for (const project2 of snapshot.projects) {
        if (query && !project2.title.normalize("NFKC").toLocaleLowerCase().includes(query)) continue;
        const row = list.createEl("label", { cls: "pmi-project-option" });
        const checkbox = row.createEl("input", { type: "checkbox" });
        checkbox.checked = this.host.settings.selectedProjectIds.includes(project2.id);
        row.createSpan({ cls: "pmi-project-icon", text: project2.icon });
        row.createSpan({ text: project2.title });
        checkbox.addEventListener("change", () => {
          void (async () => {
            const selected = new Set(this.host.settings.selectedProjectIds);
            checkbox.checked ? selected.add(project2.id) : selected.delete(project2.id);
            this.host.settings.selectedProjectIds = [...selected];
            this.selectedMemberKey = null;
            await this.host.saveSettings();
            this.updateProjectSummary(t);
            this.updateSelectedProjectTags(snapshot);
            this.renderDashboard(snapshot, t);
          })();
        });
      }
    };
    projectSearch.addEventListener("input", renderProjects);
    selectAll.addEventListener("click", (event) => {
      void (async () => {
        event.preventDefault();
        this.host.settings.selectedProjectIds = snapshot.projects.map((project2) => project2.id);
        this.selectedMemberKey = null;
        await this.host.saveSettings();
        this.updateProjectSummary(t);
        this.updateSelectedProjectTags(snapshot);
        renderProjects();
        this.renderDashboard(snapshot, t);
      })();
    });
    clear.addEventListener("click", (event) => {
      void (async () => {
        event.preventDefault();
        this.host.settings.selectedProjectIds = [];
        this.selectedMemberKey = null;
        await this.host.saveSettings();
        this.updateProjectSummary(t);
        this.updateSelectedProjectTags(snapshot);
        renderProjects();
        this.renderDashboard(snapshot, t);
      })();
    });
    renderProjects();
    this.selectedProjectTagsEl = controls.createDiv("pmi-selected-project-tags");
    this.updateSelectedProjectTags(snapshot);
    this.renderQuickFilters(root, snapshot, t);
    const refresh = controls.createEl("button", {
      cls: "pmi-refresh clickable-icon",
      attr: { "aria-label": t.refresh }
    });
    (0, import_obsidian5.setIcon)(refresh, "refresh-cw");
    refresh.addEventListener("click", () => void this.reconcileAndRender());
  }
  async reconcileAndRender() {
    await this.host.reconcileProjectManager();
    await this.render();
  }
  updateProjectSummary(t) {
    var _a;
    (_a = this.projectSummaryEl) == null ? void 0 : _a.setText(t.projectCount(this.host.settings.selectedProjectIds.length));
  }
  updateSelectedProjectTags(snapshot) {
    if (!this.selectedProjectTagsEl) return;
    this.selectedProjectTagsEl.empty();
    const selectedProjects = snapshot.projects.filter((project2) => this.host.settings.selectedProjectIds.includes(project2.id));
    for (const project2 of selectedProjects) {
      const tag = this.selectedProjectTagsEl.createSpan({ cls: "pmi-selected-project-tag" });
      tag.createSpan({ cls: "pmi-selected-project-icon", text: project2.icon });
      tag.createSpan({ text: project2.title });
    }
  }
  renderDashboard(snapshot, t) {
    var _a, _b;
    const dashboard = this.dashboardEl;
    if (!dashboard) return;
    dashboard.empty();
    const selectedIds = new Set(this.host.settings.selectedProjectIds);
    if (selectedIds.size === 0) {
      this.renderEmpty(dashboard, t.noProjectsTitle, t.noProjectsBody, "list-filter");
      return;
    }
    const insights = aggregateInsights(snapshot.projects, snapshot.tasks, {
      projectIds: selectedIds,
      quickFilter: this.getQuickFilter(),
      aliases: this.host.settings.aliases,
      unassignedLabel: t.unassigned
    });
    this.renderTeamStrip(dashboard, insights.team, t);
    const quality = dashboard.createDiv("pmi-quality-strip");
    (0, import_obsidian5.setIcon)(quality.createSpan(), "scan-search");
    quality.createEl("strong", { text: `${t.qualityTitle}:` });
    quality.createSpan({
      text: t.qualitySummary(
        insights.quality.requirementCount,
        insights.quality.taskCount,
        insights.quality.unestimatedCount,
        insights.quality.unassignedCount
      )
    });
    const layout = dashboard.createDiv("pmi-master-detail");
    const master = layout.createDiv("pmi-master");
    const detail = layout.createDiv("pmi-detail");
    const visibleMembers = insights.members.filter(
      (member) => member.name.normalize("NFKC").toLocaleLowerCase().includes(this.memberQuery)
    );
    if (!visibleMembers.some((member) => member.key === this.selectedMemberKey)) {
      const nextMemberKey = (_b = (_a = visibleMembers[0]) == null ? void 0 : _a.key) != null ? _b : null;
      if (nextMemberKey !== this.selectedMemberKey) {
        this.taskQuery = "";
        this.taskStatuses = null;
        this.taskPriorities = null;
      }
      this.selectedMemberKey = nextMemberKey;
    }
    this.renderMemberList(master, insights.members, visibleMembers, snapshot, t);
    const selected = insights.members.find((member) => member.key === this.selectedMemberKey);
    this.renderTaskDetail(detail, selected, snapshot.projects, snapshot.priorities, snapshot.stages, snapshot.statuses, t);
  }
  renderTeamStrip(root, metrics, t) {
    const strip = root.createDiv("pmi-team-strip");
    this.metric(strip, t.planned, t.hours(metrics.planned));
    this.metric(strip, t.logged, t.hours(metrics.logged));
    this.metric(strip, t.remaining, t.hours(metrics.remaining), "remaining");
    this.metric(strip, t.overrun, t.hours(metrics.overrun), metrics.overrun > 0 ? "overrun" : "");
  }
  metric(root, label, value, kind = "") {
    const item = root.createDiv(`pmi-metric${kind ? ` pmi-metric--${kind}` : ""}`);
    item.createSpan({ cls: "pmi-metric-label", text: label });
    item.createEl("strong", { text: value });
  }
  renderMemberList(root, allMembers, members, snapshot, t) {
    const header = root.createDiv("pmi-pane-header");
    header.createEl("h2", { text: t.members });
    header.createSpan({ text: String(allMembers.length) });
    const search = root.createEl("input", {
      type: "search",
      placeholder: t.memberSearch,
      cls: "pmi-pane-search"
    });
    search.value = this.memberQuery;
    search.addEventListener("input", () => {
      this.memberQuery = search.value.normalize("NFKC").trim().toLocaleLowerCase();
      this.renderDashboard(snapshot, t);
      const next = this.contentEl.querySelector(".pmi-master .pmi-pane-search");
      next == null ? void 0 : next.focus();
      next == null ? void 0 : next.setSelectionRange(next.value.length, next.value.length);
    });
    const list = root.createDiv("pmi-member-list");
    if (members.length === 0) {
      list.createDiv({ cls: "pmi-list-empty", text: t.noMembers });
      return;
    }
    for (const member of members) this.renderMember(list, member, snapshot, t);
  }
  renderMember(root, member, snapshot, t) {
    const active = member.key === this.selectedMemberKey;
    const button = root.createEl("button", {
      cls: `pmi-member${active ? " is-active" : ""}`,
      attr: { "aria-pressed": String(active) }
    });
    const head = button.createDiv("pmi-member-head");
    const avatar = head.createSpan({ cls: "pmi-member-avatar" });
    if (member.kind === "unassigned") (0, import_obsidian5.setIcon)(avatar, "user-round-x");
    else avatar.setText(Array.from(member.name).slice(0, 2).join(""));
    const identity = head.createDiv("pmi-member-identity");
    identity.createEl("strong", { text: member.name });
    identity.createSpan({ text: t.memberWorkCount(member.tasks, this.quickSource) });
    head.createEl("strong", {
      cls: "pmi-member-total",
      text: t.hours(member.personal.remaining + member.shared.remaining)
    });
    this.renderWorkRail(button, t.personal, member.personal, false, t);
    if (member.shared.taskCount > 0) this.renderWorkRail(button, t.shared, member.shared, true, t);
    button.addEventListener("click", () => {
      this.selectedMemberKey = member.key;
      this.taskQuery = "";
      this.taskStatuses = null;
      this.taskPriorities = null;
      this.renderDashboard(snapshot, t);
    });
  }
  renderWorkRail(root, label, metrics, shared, t) {
    const row = root.createDiv(`pmi-work-row${shared ? " is-shared" : ""}`);
    const legend = row.createDiv("pmi-work-legend");
    legend.createSpan({ text: label });
    legend.createSpan({ text: `${t.hours(metrics.logged)} / ${t.hours(metrics.planned)}` });
    const rail = row.createDiv("pmi-work-rail");
    const plannedLogged = metrics.planned > 0 ? Math.min(metrics.logged, metrics.planned) : metrics.logged;
    const scale = Math.max(metrics.planned, plannedLogged + metrics.overrun, 1);
    const logged = rail.createSpan("pmi-work-logged");
    logged.style.width = `${Math.min(plannedLogged / scale * 100, 100)}%`;
    const remaining = rail.createSpan("pmi-work-remaining");
    remaining.style.width = `${Math.min(metrics.remaining / scale * 100, 100)}%`;
    if (metrics.overrun > 0) {
      const overrun = rail.createSpan("pmi-work-overrun");
      overrun.style.width = `${Math.min(metrics.overrun / scale * 100, 100)}%`;
    }
  }
  renderTaskDetail(root, member, projects, priorities, stages, statuses, t) {
    var _a;
    const header = root.createDiv("pmi-pane-header pmi-detail-header");
    const identity = header.createDiv("pmi-detail-identity");
    identity.createEl("h2", { text: (_a = member == null ? void 0 : member.name) != null ? _a : t.tasks });
    identity.createSpan({ text: member ? t.memberWorkCount(member.tasks, this.quickSource) : "0" });
    if (!member) {
      root.createDiv({ cls: "pmi-list-empty", text: t.noTasks });
      return;
    }
    this.renderMemberRatios(header, member, t);
    this.renderMemberViewSwitcher(header, () => {
      root.empty();
      this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
    });
    const statusDefinitions = new Map(statuses.map((status) => [status.id, status]));
    const statusOptions = [...new Set(member.tasks.map((task2) => task2.status))].map((value) => ({
      value,
      label: statusDefinitions.get(value)?.label ?? value,
      count: member.tasks.filter((task2) => task2.status === value).length
    })).sort((left, right) => left.label.localeCompare(right.label));
    const priorityDefinitions = new Map(priorities.map((priority) => [priority.id, priority]));
    const memberPriorityKeys = new Set(
      member.tasks.map((task2) => {
        var _a2;
        return (_a2 = task2.priority) != null ? _a2 : TASK_PRIORITY_NONE;
      })
    );
    const priorityOptions = [
      ...priorities.filter((priority) => memberPriorityKeys.has(priority.id)).map((priority) => ({
        value: priority.id,
        label: priority.label,
        color: priority.color,
        count: member.tasks.filter((task2) => task2.priority === priority.id).length
      })),
      ...[...memberPriorityKeys].filter((value) => value !== TASK_PRIORITY_NONE && !priorityDefinitions.has(value)).sort((left, right) => left.localeCompare(right)).map((value) => ({
        value,
        label: value,
        color: "",
        count: member.tasks.filter((task2) => task2.priority === value).length
      })),
      ...memberPriorityKeys.has(TASK_PRIORITY_NONE) ? [{
        value: TASK_PRIORITY_NONE,
        label: t.noPriority,
        color: "",
        count: member.tasks.filter((task2) => task2.priority === null).length
      }] : []
    ];
    this.taskStatuses = this.normalizeTaskFilter(this.taskStatuses, statusOptions);
    this.taskPriorities = this.normalizeTaskFilter(this.taskPriorities, priorityOptions);
    const filters = root.createDiv("pmi-task-filter-bar");
    const searchWrap = filters.createDiv("pmi-task-filter-search");
    (0, import_obsidian5.setIcon)(searchWrap.createSpan(), "search");
    const search = searchWrap.createEl("input", {
      type: "search",
      placeholder: t.taskSearch,
      cls: "pmi-pane-search"
    });
    search.value = this.taskQuery;
    const result = filters.createDiv({ cls: "pmi-task-filter-result", attr: { "aria-live": "polite" } });
    const reset = filters.createEl("button", {
      cls: "pmi-task-filter-reset",
      attr: { type: "button", title: t.resetFilters, "aria-label": t.resetFilters }
    });
    (0, import_obsidian5.setIcon)(reset, "rotate-ccw");
    reset.createSpan({ text: t.resetFilters });
    const renderRows = () => {
      this.taskQuery = search.value.normalize("NFKC").trim().toLocaleLowerCase();
      const tasks = member.tasks.filter((task2) => {
        var _a2;
        const matchesText = !this.taskQuery || task2.title.normalize("NFKC").toLocaleLowerCase().includes(this.taskQuery) || task2.projectTitle.normalize("NFKC").toLocaleLowerCase().includes(this.taskQuery);
        const matchesStatus = this.taskStatuses === null || this.taskStatuses.has(task2.status);
        const matchesPriority = this.taskPriorities === null || this.taskPriorities.has((_a2 = task2.priority) != null ? _a2 : TASK_PRIORITY_NONE);
        return matchesText && matchesStatus && matchesPriority;
      });
      const priorityRanks = new Map(
        priorityOptions.map((priority, index) => [priority.value, index])
      );
      const sortedTasks = tasks.map((task2, index) => ({ task: task2, index })).sort((left, right) => {
        var _a2, _b, _c, _d;
        if (this.taskPrioritySort === "none") return left.index - right.index;
        if (left.task.priority === null && right.task.priority !== null) return 1;
        if (left.task.priority !== null && right.task.priority === null) return -1;
        const leftRank = (_b = priorityRanks.get((_a2 = left.task.priority) != null ? _a2 : TASK_PRIORITY_NONE)) != null ? _b : Number.MAX_SAFE_INTEGER;
        const rightRank = (_d = priorityRanks.get((_c = right.task.priority) != null ? _c : TASK_PRIORITY_NONE)) != null ? _d : Number.MAX_SAFE_INTEGER;
        const rankDifference = leftRank - rightRank;
        if (rankDifference === 0) return left.index - right.index;
        return this.taskPrioritySort === "high-to-low" ? rankDifference : -rankDifference;
      }).map(({ task: task2 }) => task2);
      result.setText(t.memberWorkResult(tasks, member.tasks, this.quickSource));
      reset.disabled = this.taskQuery.length === 0 && this.taskStatuses === null && this.taskPriorities === null;
      this.renderMemberTaskView(root, sortedTasks, projects, priorities, stages, statuses, t, () => {
        this.taskPrioritySort = this.taskPrioritySort === "none" ? "high-to-low" : this.taskPrioritySort === "high-to-low" ? "low-to-high" : "none";
        renderRows();
      });
    };
    this.renderTaskFilterMenu(
      filters,
      "workflow",
      t.status,
      t.allTaskStatuses,
      statusOptions,
      this.taskStatuses,
      (selection) => {
        this.taskStatuses = selection;
        renderRows();
      },
      t
    );
    this.renderTaskFilterMenu(
      filters,
      "signal-high",
      t.priority,
      t.allPriorities,
      priorityOptions,
      this.taskPriorities,
      (selection) => {
        this.taskPriorities = selection;
        renderRows();
      },
      t
    );
    search.addEventListener("input", renderRows);
    reset.addEventListener("click", () => {
      this.taskQuery = "";
      this.taskStatuses = null;
      this.taskPriorities = null;
      root.empty();
      this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
    });
    renderRows();
  }
  renderMemberViewSwitcher(root, onChange) {
    const switcher = root.createDiv("pm-view-switcher pmi-member-view-switcher");
    const options = [
      { id: "table", icon: "table", label: "表格" },
      { id: "gantt", icon: "git-fork", label: "甘特图" },
      { id: "kanban", icon: "layout-dashboard", label: "看板" }
    ];
    for (const option of options) {
      const button = switcher.createEl("button", {
        cls: `clickable-icon pm-view-btn${this.memberViewMode === option.id ? " pm-view-btn--active" : ""}`,
        attr: { type: "button", title: option.label, "aria-label": option.label, "aria-pressed": String(this.memberViewMode === option.id) }
      });
      (0, import_obsidian5.setIcon)(button, option.icon);
      button.addEventListener("click", () => {
        if (this.memberViewMode === option.id) return;
        this.memberViewMode = option.id;
        this.host.settings.memberViewMode = option.id;
        void this.host.saveSettings();
        onChange();
      });
    }
  }
  renderMemberRatios(root, member, t) {
    const ledger = root.createDiv({
      cls: "pmi-member-ratios",
      attr: { role: "region", "aria-label": t.memberRatios }
    });
    const groups = [
      {
        kind: "delivery",
        icon: "circle-check-big",
        label: t.deliveryRatios,
        metrics: [
          {
            label: t.taskClosureRate,
            hint: t.taskClosureRateHint,
            metric: member.ratios.taskClosure,
            sample: t.ratioTasks
          },
          {
            label: t.plannedClosureRate,
            hint: t.plannedClosureRateHint,
            metric: member.ratios.plannedClosure,
            sample: t.ratioHours
          }
        ]
      },
      {
        kind: "time",
        icon: "timer",
        label: t.timeRatios,
        metrics: [
          {
            label: t.timeConsumptionRate,
            hint: t.timeConsumptionRateHint,
            metric: member.ratios.timeConsumption,
            sample: t.ratioHours
          },
          {
            label: t.overrunTaskRate,
            hint: t.overrunTaskRateHint,
            metric: member.ratios.overrunTasks,
            sample: t.ratioTasks,
            warning: member.ratios.overrunTasks.numerator > 0
          }
        ]
      },
      {
        kind: "data",
        icon: "scan-search",
        label: t.dataRatios,
        metrics: [
          {
            label: t.estimateAccuracyRate,
            hint: t.estimateAccuracyRateHint,
            metric: member.ratios.estimateAccuracy,
            sample: t.ratioTasks
          },
          {
            label: t.estimateCoverageRate,
            hint: t.estimateCoverageRateHint,
            metric: member.ratios.estimateCoverage,
            sample: t.ratioTasks
          }
        ]
      }
    ];
    for (const group of groups) {
      const row = ledger.createDiv(`pmi-ratio-group pmi-ratio-group--${group.kind}`);
      const heading = row.createDiv("pmi-ratio-group-label");
      (0, import_obsidian5.setIcon)(heading.createSpan(), group.icon);
      heading.createSpan({ text: group.label });
      for (const item of group.metrics) {
        const percentage = item.metric.percentage === null ? t.ratioUnavailable : t.percentage(item.metric.percentage);
        const sample = item.sample(item.metric.numerator, item.metric.denominator);
        const metric = row.createDiv({
          cls: `pmi-ratio-metric${item.warning ? " is-warning" : ""}`,
          attr: {
            title: item.hint,
            "aria-label": `${item.label}: ${percentage}; ${sample}. ${item.hint}`
          }
        });
        metric.createSpan({ cls: "pmi-ratio-name", text: item.label });
        metric.createEl("strong", { text: percentage });
      }
    }
  }
  normalizeTaskFilter(selection, options) {
    if (selection === null) return null;
    const available = new Set(options.map((option) => option.value));
    const normalized = new Set([...selection].filter((value) => available.has(value)));
    return normalized.size === available.size ? null : normalized;
  }
  renderTaskFilterMenu(root, icon, label, allLabel, options, selection, onChange, t) {
    const menu = root.createEl("details", { cls: "pmi-task-filter-menu" });
    const summary = menu.createEl("summary", { attr: { "aria-label": label } });
    (0, import_obsidian5.setIcon)(summary.createSpan("pmi-task-filter-icon"), icon);
    const copy = summary.createSpan("pmi-task-filter-copy");
    copy.createSpan({ cls: "pmi-task-filter-label", text: label });
    const value = copy.createSpan("pmi-task-filter-value");
    const chevron = summary.createSpan("pmi-task-filter-chevron");
    (0, import_obsidian5.setIcon)(chevron, "chevron-down");
    const panel = menu.createDiv("pmi-task-filter-panel");
    const panelHead = panel.createDiv("pmi-task-filter-panel-head");
    panelHead.createEl("strong", { text: label });
    panelHead.createSpan({ text: t.optionCount(options.length) });
    const actions = panel.createDiv("pmi-task-filter-actions");
    const selectAll = actions.createEl("button", { text: t.selectAll, attr: { type: "button" } });
    const clear = actions.createEl("button", { text: t.clear, attr: { type: "button" } });
    const list = panel.createDiv("pmi-task-filter-options");
    let currentSelection = selection;
    const summaryText = () => {
      var _a, _b;
      if (currentSelection === null || currentSelection.size === options.length) return allLabel;
      if (currentSelection.size === 0) return t.noneSelected;
      if (currentSelection.size === 1) {
        return (_b = (_a = options.find((option) => currentSelection == null ? void 0 : currentSelection.has(option.value))) == null ? void 0 : _a.label) != null ? _b : t.selectedCount(1);
      }
      return t.selectedCount(currentSelection.size);
    };
    const update = (next) => {
      var _a;
      currentSelection = next;
      value.setText(summaryText());
      for (const checkbox of list.querySelectorAll('input[type="checkbox"]')) {
        checkbox.checked = currentSelection === null || currentSelection.has((_a = checkbox.dataset.filterValue) != null ? _a : "");
      }
      onChange(currentSelection);
    };
    for (const option of options) {
      const row = list.createEl("label", { cls: "pmi-task-filter-option" });
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.dataset.filterValue = option.value;
      checkbox.checked = currentSelection === null || currentSelection.has(option.value);
      const name = row.createSpan("pmi-task-filter-option-name");
      if (option.color) {
        const signal = name.createSpan({ cls: "pmi-priority-signal", attr: { "aria-hidden": "true" } });
        signal.style.backgroundColor = option.color;
      }
      name.createSpan({ cls: "pmi-task-filter-option-label", text: option.label });
      row.createSpan({ cls: "pmi-task-filter-option-count", text: String(option.count) });
      checkbox.addEventListener("change", () => {
        const next = currentSelection === null ? new Set(options.map((candidate) => candidate.value)) : new Set(currentSelection);
        checkbox.checked ? next.add(option.value) : next.delete(option.value);
        update(next.size === options.length ? null : next);
      });
    }
    value.setText(summaryText());
    selectAll.addEventListener("click", () => update(null));
    clear.addEventListener("click", () => update(/* @__PURE__ */ new Set()));
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;
      for (const sibling of root.querySelectorAll(
        ".pmi-task-filter-menu[open]"
      )) {
        if (sibling !== menu) sibling.open = false;
      }
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !menu.open) return;
      menu.open = false;
      summary.focus();
      event.preventDefault();
      event.stopPropagation();
    });
  }
  clearMemberTaskViews(detail) {
    for (const selector of [
      ".pmi-pm-table-wrapper",
      ".pmi-member-kanban",
      ".pmi-member-gantt",
      ".pmi-list-empty.pmi-task-empty"
    ]) {
      for (const element of detail.querySelectorAll(selector)) element.remove();
    }
  }
  orderMemberTasks(tasks) {
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const ordered = [];
    const visited = new Set();
    const visit = (task2, depth = 0) => {
      if (visited.has(task2.id)) return;
      visited.add(task2.id);
      ordered.push({ task: task2, depth });
      for (const child of childrenByParent.get(task2.id) ?? []) visit(child, depth + 1);
    };
    for (const task2 of tasks) if (!task2.parentId || !taskById.has(task2.parentId)) visit(task2);
    for (const task2 of tasks) visit(task2);
    return ordered;
  }
  createMemberChip(root, label, color = "var(--text-muted)", variant = "outline") {
    const chip = root.createSpan({ cls: `pm-chip pm-chip--${variant} pm-chip--sm` });
    chip.style.setProperty("--pm-chip-color", color);
    chip.createSpan({ cls: "pm-chip-dot" });
    chip.createSpan({ text: label });
    return chip;
  }
  renderMemberTaskView(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    if (this.memberViewMode === "kanban") {
      this.renderMemberKanban(detail, tasks, projects, priorities, stages, statuses, t);
      return;
    }
    if (this.memberViewMode === "gantt") {
      this.renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t);
      return;
    }
    this.renderTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort);
  }
  renderMemberKanban(detail, tasks, projects, priorities, stages, statuses, t) {
    this.clearMemberTaskViews(detail);
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const root = detail.createDiv("pm-root pmi-member-kanban");
    const board = root.createDiv("pm-kanban-board");
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const priorityDefinitions = new Map(priorities.map((definition) => [definition.id, definition]));
    const source = this.getQuickFilter().quickSource;
    const groupBy = source === "task" ? "status" : "stage";
    const definitions = groupBy === "status" ? statuses : stages;
    const definitionMap = new Map(definitions.map((definition) => [definition.id, definition]));
    const orderedTasks = this.orderMemberTasks(tasks).map(({ task: task2 }) => task2);
    const groupKeys = new Set(orderedTasks.map((task2) => String(task2[groupBy] ?? "")));
    const columns = [
      ...definitions.filter((definition) => groupKeys.has(definition.id)),
      ...[...groupKeys].filter((key) => !definitionMap.has(key)).sort().map((key) => ({ id: key, label: key || "未设置", color: "var(--text-muted)" }))
    ];
    for (const definition of columns) {
      const columnTasks = orderedTasks.filter((task2) => String(task2[groupBy] ?? "") === definition.id);
      const column = board.createDiv("pm-kanban-col pmi-member-kanban-col");
      const header = column.createDiv("pm-kanban-col-header");
      const topbar = header.createDiv("pm-kanban-col-topbar");
      topbar.style.background = definition.color || "var(--text-muted)";
      const titleRow = header.createDiv("pm-kanban-col-title-row");
      const badge = titleRow.createSpan({ cls: "pm-kanban-col-badge", text: definition.label || definition.id || "未设置" });
      badge.style.color = definition.color || "var(--text-muted)";
      titleRow.createSpan({ cls: "pm-kanban-col-count", text: String(columnTasks.length) });
      const cards = column.createDiv("pm-kanban-cards");
      for (const task2 of columnTasks) {
        const projectRecord = projectRecords.get(task2.projectId);
        const card = cards.createDiv(`pm-kanban-card${task2.completed ? " pm-table-row--done" : ""}`);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        const priority = task2.priority ? priorityDefinitions.get(task2.priority) : null;
        const priorityBar = card.createDiv("pm-kanban-card-priority-bar");
        priorityBar.style.background = priority?.color ?? "var(--background-modifier-border)";
        const body = card.createDiv("pm-kanban-card-body");
        body.createEl("h4", { cls: "pm-kanban-card-title", text: task2.title });
        if (task2.parentId) {
          const parent = orderedTasks.find((candidate) => candidate.id === task2.parentId);
          if (parent) body.createDiv({ cls: "pm-kanban-card-parent", text: parent.title });
        }
        const tags = body.createDiv("pm-kanban-card-tags");
        this.createMemberChip(tags, task2.sourceType === "requirement" ? t.requirement : t.task, task2.sourceType === "requirement" ? "var(--color-yellow)" : "var(--color-pink)");
        if (projectRecord) this.createMemberChip(tags, projectRecord.title, "var(--interactive-accent)");
        for (const tag of task2.tags.filter((tag) => !["zentao", "zentao-task", "zentao-requirement"].includes(tag)).slice(0, 2)) {
          this.createMemberChip(tags, tag, tag.startsWith("超时") ? "var(--color-red)" : "var(--text-muted)");
        }
        const footer = body.createDiv("pm-kanban-card-footer");
        footer.createSpan({ cls: "pmi-member-card-hours", text: t.workHours(task2.displayLogged ?? task2.logged, task2.displayEstimate ?? task2.estimate) });
        footer.createSpan({ cls: "pmi-member-card-date", text: task2.due ?? "—" });
        this.bindCellAction(card, () => {
          if (!projectRecord) return;
          void this.host.openTask(task2.id, projectRecord.path);
        });
      }
    }
  }
  renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t) {
    this.clearMemberTaskViews(detail);
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const root = detail.createDiv("pmi-member-gantt");
    root.toggleClass("is-day-scale", this.memberGanttScale === "day");
    root.toggleClass("is-week-scale", this.memberGanttScale === "week");
    root.toggleClass("is-month-scale", this.memberGanttScale === "month");
    root.style.setProperty("--pmi-member-gantt-label-width", `${this.memberGanttLabelWidth}px`);
    const toolbar = root.createDiv("pmi-member-gantt-toolbar");
    toolbar.createSpan({ cls: "pmi-member-gantt-title", text: "只读排期" });
    const legend = toolbar.createDiv("pmi-member-gantt-legend");
    for (const item of [
      { label: "已消耗", kind: "logged" },
      { label: "剩余", kind: "remaining" },
      { label: "超时", kind: "overrun" },
      { label: "需求推导", kind: "derived" }
    ]) {
      const legendItem = legend.createSpan("pmi-member-gantt-legend-item");
      legendItem.createSpan(`pmi-member-gantt-legend-signal is-${item.kind}`);
      legendItem.createSpan({ text: item.label });
    }
    const locateLabel = this.memberGanttScale === "day" ? "今天" : this.memberGanttScale === "week" ? "本周" : "本月";
    const locate = toolbar.createEl("button", {
      cls: "pmi-member-gantt-locate",
      attr: { type: "button", title: `定位到${locateLabel}`, "aria-label": `定位到${locateLabel}` }
    });
    (0, import_obsidian5.setIcon)(locate, "locate-fixed");
    locate.createSpan({ text: locateLabel });
    const scale = toolbar.createDiv("pm-segmented pmi-member-gantt-scale");
    for (const option of [
      { id: "day", label: "日" },
      { id: "week", label: "周" },
      { id: "month", label: "月" }
    ]) {
      const button = scale.createEl("button", {
        cls: `pm-chip-btn${this.memberGanttScale === option.id ? " pm-chip-btn--active" : ""}`,
        text: option.label,
        attr: { type: "button", "aria-pressed": String(this.memberGanttScale === option.id) }
      });
      button.addEventListener("click", () => {
        if (this.memberGanttScale === option.id) return;
        this.memberGanttScale = option.id;
        this.host.settings.memberGanttScale = option.id;
        void this.host.saveSettings();
        this.renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t);
      });
    }
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const ordered = this.orderMemberTasks(tasks);
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const rangeCache = new Map();
    const resolveRange = (task2, stack = /* @__PURE__ */ new Set()) => {
      if (rangeCache.has(task2.id)) return rangeCache.get(task2.id);
      if (stack.has(task2.id)) return { start: null, end: null, derived: false };
      const nextStack = new Set(stack);
      nextStack.add(task2.id);
      const ownStart = memberDateValue(task2.start);
      const ownEnd = memberDateValue(task2.due);
      const childRanges = (childrenByParent.get(task2.id) ?? []).map((child) => resolveRange(child, nextStack)).filter((range) => range.start !== null && range.end !== null);
      const childStart = childRanges.length > 0 ? Math.min(...childRanges.map((range) => range.start)) : null;
      const childEnd = childRanges.length > 0 ? Math.max(...childRanges.map((range) => range.end)) : null;
      let start = ownStart;
      let end = ownEnd;
      let derived = false;
      if (task2.sourceType === "requirement") {
        if (start === null && childStart !== null) {
          start = childStart;
          derived = true;
        }
        if (end === null && childEnd !== null) {
          end = childEnd;
          derived = true;
        }
      }
      if (start !== null && end === null) end = start;
      if (end !== null && start === null) start = end;
      if (start !== null && end !== null && end < start) [start, end] = [end, start];
      const range = { start, end, derived };
      rangeCache.set(task2.id, range);
      return range;
    };
    const rows = ordered.map((item) => ({ ...item, range: resolveRange(item.task) }));
    const scheduled = rows.filter((item) => item.range.start !== null && item.range.end !== null);
    const unscheduled = rows.filter((item) => item.range.start === null || item.range.end === null);
    locate.disabled = scheduled.length === 0;
    if (scheduled.length > 0) {
      const dayWidth = MEMBER_GANTT_SCALE_WIDTHS[this.memberGanttScale];
      const currentPeriodStart = memberCurrentPeriodStart(this.memberGanttScale);
      let rangeStart = Math.min(currentPeriodStart, ...scheduled.map((item) => item.range.start)) - MEMBER_GANTT_START_PADDING_DAYS * MEMBER_GANTT_DAY_MS;
      let rangeEnd = Math.max(currentPeriodStart, ...scheduled.map((item) => item.range.end)) + MEMBER_GANTT_END_PADDING_DAYS * MEMBER_GANTT_DAY_MS;
      const minimumDays = MEMBER_GANTT_MIN_DAYS[this.memberGanttScale];
      const currentSpan = Math.round((rangeEnd - rangeStart) / MEMBER_GANTT_DAY_MS);
      if (currentSpan < minimumDays) {
        const extraDays = Math.ceil((minimumDays - currentSpan) / 2);
        rangeStart -= extraDays * MEMBER_GANTT_DAY_MS;
        rangeEnd += extraDays * MEMBER_GANTT_DAY_MS;
      }
      if (this.memberGanttScale === "week") {
        const startDay = new Date(rangeStart).getUTCDay() || 7;
        const endDay = new Date(rangeEnd).getUTCDay() || 7;
        rangeStart -= (startDay - 1) * MEMBER_GANTT_DAY_MS;
        rangeEnd += (7 - endDay) * MEMBER_GANTT_DAY_MS;
      } else if (this.memberGanttScale === "month") {
        const startDate = new Date(rangeStart);
        const endDate = new Date(rangeEnd);
        rangeStart = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1);
        rangeEnd = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 0);
      }
      const dayCount = Math.max(1, Math.round((rangeEnd - rangeStart) / MEMBER_GANTT_DAY_MS) + 1);
      const timelineWidth = Math.max(MEMBER_GANTT_MIN_WIDTH, dayCount * dayWidth);
      const stepDays = this.memberGanttScale === "day" ? 1 : this.memberGanttScale === "week" ? 7 : 30;
      const dailyWork = new Map();
      const allocateHours = (hours, start, end, field) => {
        if (!(hours > 0) || start === null || end === null) return;
        const first = Math.min(start, end);
        const last = Math.max(start, end);
        const days = Math.max(1, Math.round((last - first) / MEMBER_GANTT_DAY_MS) + 1);
        const perDay = hours / days;
        for (let timestamp = first; timestamp <= last; timestamp += MEMBER_GANTT_DAY_MS) {
          const current = dailyWork.get(timestamp) ?? { planned: 0, logged: 0 };
          current[field] += perDay;
          dailyWork.set(timestamp, current);
        }
      };
      for (const item of scheduled) {
        const task2 = item.task;
        if (task2.sourceType !== "task" || task2.contextOnly) continue;
        const plannedStart = memberDateValue(task2.start) ?? item.range.start;
        const plannedEnd = memberDateValue(task2.due) ?? item.range.end;
        allocateHours(task2.estimate, plannedStart, plannedEnd, "planned");
        const actualStart = memberDateValue(task2.actualStartedAt) ?? plannedStart;
        const actualEnd = memberDateValue(task2.actualFinishedAt) ?? memberDateValue(task2.completedAt) ?? plannedEnd;
        allocateHours(task2.logged, actualStart, actualEnd, "logged");
      }
      const scroll = root.createDiv("pmi-member-gantt-scroll");
      locate.addEventListener("click", () => {
        const target = memberCurrentPeriodStart(this.memberGanttScale);
        const targetX = (target - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth;
        const viewportWidth = Math.max(0, scroll.clientWidth - this.memberGanttLabelWidth);
        const nextLeft = this.memberGanttScale === "day" ? targetX - viewportWidth / 2 : targetX - 20;
        scroll.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
      });
      const header = scroll.createDiv("pmi-member-gantt-row pmi-member-gantt-row--header");
      const headerLabel = header.createDiv({ cls: "pmi-member-gantt-label", text: "事项 / 项目" });
      const labelResizer = headerLabel.createDiv("pmi-member-gantt-label-resizer");
      labelResizer.setAttribute("role", "separator");
      labelResizer.setAttribute("aria-orientation", "vertical");
      labelResizer.setAttribute("aria-label", "调整事项区域宽度");
      labelResizer.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startWidth = this.memberGanttLabelWidth;
        labelResizer.setPointerCapture(event.pointerId);
        const move = (moveEvent) => {
          const width = Math.min(MEMBER_GANTT_LABEL_MAX_WIDTH, Math.max(MEMBER_GANTT_LABEL_MIN_WIDTH, Math.round(startWidth + moveEvent.clientX - startX)));
          this.memberGanttLabelWidth = width;
          root.style.setProperty("--pmi-member-gantt-label-width", `${width}px`);
        };
        const end = () => {
          labelResizer.removeEventListener("pointermove", move);
          labelResizer.removeEventListener("pointerup", end);
          labelResizer.removeEventListener("pointercancel", end);
          if (labelResizer.hasPointerCapture(event.pointerId)) labelResizer.releasePointerCapture(event.pointerId);
        };
        labelResizer.addEventListener("pointermove", move);
        labelResizer.addEventListener("pointerup", end);
        labelResizer.addEventListener("pointercancel", end);
      });
      const headerTimeline = header.createDiv("pmi-member-gantt-timeline pmi-member-gantt-timeline--header");
      headerTimeline.style.width = `${timelineWidth}px`;
      headerTimeline.style.setProperty("--pmi-member-gantt-day-width", `${dayWidth}px`);
      const periods = [];
      if (this.memberGanttScale === "month") {
        for (let timestamp = rangeStart; timestamp <= rangeEnd; ) {
          const date = new Date(timestamp);
          const next = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
          const end = Math.min(rangeEnd, next - MEMBER_GANTT_DAY_MS);
          periods.push({ start: timestamp, end, offsetDays: Math.round((timestamp - rangeStart) / MEMBER_GANTT_DAY_MS) });
          timestamp = next;
        }
      } else {
        for (let day = 0; day < dayCount; day += stepDays) {
          periods.push({
            start: rangeStart + day * MEMBER_GANTT_DAY_MS,
            end: rangeStart + Math.min(dayCount - 1, day + stepDays - 1) * MEMBER_GANTT_DAY_MS,
            offsetDays: day
          });
        }
      }
      for (const period of periods) {
        const periodDays = Math.max(1, Math.round((period.end - period.start) / MEMBER_GANTT_DAY_MS) + 1);
        const totals = { planned: 0, logged: 0 };
        for (let timestamp = period.start; timestamp <= period.end; timestamp += MEMBER_GANTT_DAY_MS) {
          const daily = dailyWork.get(timestamp);
          if (!daily) continue;
          totals.planned += daily.planned;
          totals.logged += daily.logged;
        }
        const cell = headerTimeline.createDiv(`pmi-member-gantt-period-summary is-${this.memberGanttScale}`);
        cell.style.left = `${period.offsetDays * dayWidth}px`;
        cell.style.width = `${periodDays * dayWidth}px`;
        if (this.memberGanttScale === "week") {
          const week = memberIsoWeek(period.start);
          const heading = cell.createDiv("pmi-member-gantt-week-heading");
          heading.createSpan({ cls: "pmi-member-gantt-week-label", text: `${week.year} · 第 ${week.week} 周` });
          const work = heading.createDiv({ cls: `pmi-member-gantt-day-work${totals.logged > totals.planned ? " is-overrun" : ""}`, attr: { title: `预计 ${t.hours(totals.planned)} · 实际 ${t.hours(totals.logged)}` } });
          work.createSpan({ text: `预计 ${totals.planned.toLocaleString(void 0, { maximumFractionDigits: 1 })}h` });
          work.createSpan({ text: `实际 ${totals.logged.toLocaleString(void 0, { maximumFractionDigits: 1 })}h` });
          const days = cell.createDiv("pmi-member-gantt-week-days");
          for (let timestamp = period.start; timestamp <= period.end; timestamp += MEMBER_GANTT_DAY_MS) {
            const day = days.createDiv("pmi-member-gantt-week-day");
            day.style.width = `${dayWidth}px`;
            day.createSpan({ cls: "pmi-member-gantt-week-date", text: memberDateText(timestamp, "day") });
            day.createSpan({ cls: "pmi-member-gantt-week-weekday", text: memberWeekdayText(timestamp) });
          }
        } else {
          cell.createSpan({ cls: "pmi-member-gantt-day-label", text: memberDateText(period.start, this.memberGanttScale) });
          const work = cell.createDiv({ cls: `pmi-member-gantt-day-work${totals.logged > totals.planned ? " is-overrun" : ""}`, attr: { title: `预计 ${t.hours(totals.planned)} · 实际 ${t.hours(totals.logged)}` } });
          const compact = this.memberGanttScale === "day";
          work.createSpan({ text: `${compact ? "预" : "预计 "}${totals.planned.toLocaleString(void 0, { maximumFractionDigits: 1 })}${compact ? "" : "h"}` });
          work.createSpan({ text: `${compact ? "实" : "实际 "}${totals.logged.toLocaleString(void 0, { maximumFractionDigits: 1 })}${compact ? "" : "h"}` });
        }
      }
      for (const item of scheduled) {
        const task2 = item.task;
        const projectRecord = projectRecords.get(task2.projectId);
        const row = scroll.createDiv("pmi-member-gantt-row");
        const label = row.createDiv(`pmi-member-gantt-label pmi-member-gantt-label--${task2.sourceType}`);
        label.style.paddingInlineStart = `${item.depth * 16 + 10}px`;
        const copy = label.createDiv("pmi-member-gantt-copy");
        const meta = copy.createDiv("pmi-member-gantt-meta");
        const itemType = task2.sourceType === "requirement" ? t.requirement : task2.sourceType === "milestone" ? "里程碑" : t.task;
        const estimatedHours = task2.displayEstimate ?? task2.estimate;
        const loggedHours2 = task2.displayLogged ?? task2.logged;
        const remainingHours = task2.displayRemaining ?? task2.remaining;
        const overrunHours = Math.max(loggedHours2 - estimatedHours, 0);
        const aheadHours = task2.completed ? Math.max(estimatedHours - loggedHours2, 0) : 0;
        meta.createSpan({ cls: "pmi-member-gantt-id", text: task2.zentaoId ? `${itemType} #${task2.zentaoId}` : itemType });
        this.createMemberChip(meta, itemType, task2.sourceType === "requirement" ? "var(--color-yellow)" : task2.sourceType === "milestone" ? "var(--color-purple)" : "var(--color-pink)");
        meta.createSpan({ cls: "pmi-member-gantt-estimate", text: estimatedHours > 0 ? `预计 ${t.hours(estimatedHours)}` : "未估时" });
        const title = copy.createDiv({ cls: "pmi-member-gantt-task", text: task2.title, attr: { role: "button", tabindex: "0", title: task2.title } });
        const bottom = copy.createDiv("pmi-member-gantt-bottom");
        if (projectRecord) {
          const projectLine = bottom.createDiv({ cls: "pmi-member-gantt-project", attr: { title: projectRecord.title } });
          projectLine.createSpan({ cls: "pmi-member-gantt-project-icon", text: projectRecord.icon });
          projectLine.createSpan({ text: projectRecord.title });
        }
        const effortText = estimatedHours > 0 ? `${t.workHours(loggedHours2, estimatedHours)}${overrunHours > 0 ? ` · 超时 ${t.hours(overrunHours)}` : aheadHours > 0 ? ` · 提前 ${t.hours(aheadHours)}` : remainingHours > 0 ? ` · 剩余 ${t.hours(remainingHours)}` : ""}` : `已消耗 ${t.hours(loggedHours2)} · 未估时`;
        bottom.createSpan({ cls: `pmi-member-gantt-effort-text${overrunHours > 0 ? " is-overrun" : aheadHours > 0 ? " is-ahead" : ""}`, text: effortText });
        const effortRail = copy.createDiv(`pmi-member-gantt-effort-rail${estimatedHours <= 0 ? " is-unestimated" : ""}`);
        const effortScale = Math.max(estimatedHours, loggedHours2, 1);
        const plannedLogged = estimatedHours > 0 ? Math.min(loggedHours2, estimatedHours) : loggedHours2;
        const loggedSegment = effortRail.createSpan("pmi-member-gantt-effort-logged");
        loggedSegment.style.width = `${Math.min(plannedLogged / effortScale * 100, 100)}%`;
        if (remainingHours > 0 && estimatedHours > 0) {
          const remainingSegment = effortRail.createSpan("pmi-member-gantt-effort-remaining");
          remainingSegment.style.width = `${Math.min(remainingHours / effortScale * 100, 100)}%`;
        }
        if (overrunHours > 0) {
          const overrunSegment = effortRail.createSpan("pmi-member-gantt-effort-overrun");
          overrunSegment.style.width = `${Math.min(overrunHours / effortScale * 100, 100)}%`;
        }
        const timeline = row.createDiv("pmi-member-gantt-timeline");
        timeline.style.width = `${timelineWidth}px`;
        timeline.style.setProperty("--pmi-member-gantt-day-width", `${dayWidth}px`);
        const left = (item.range.start - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth;
        const width = Math.max(dayWidth, ((item.range.end - item.range.start) / MEMBER_GANTT_DAY_MS + 1) * dayWidth);
        const bar = timeline.createDiv(`pmi-member-gantt-bar${task2.completed ? " is-complete" : ""}${item.range.derived ? " is-derived" : ""}`);
        bar.style.left = `${left}px`;
        bar.style.width = `${width}px`;
        bar.setAttribute("role", "button");
        bar.setAttribute("tabindex", "0");
        bar.setAttribute("title", `${task2.title}\n计划日期：${task2.start ?? "未设置"} → ${task2.due ?? "未设置"}\n预计工时：${estimatedHours > 0 ? t.hours(estimatedHours) : "未估时"}\n已消耗：${t.hours(loggedHours2)}\n剩余：${t.hours(remainingHours)}\n进度：${Math.round(task2.progress)}%`);
        const progress = bar.createSpan("pmi-member-gantt-progress");
        progress.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
        const barHours = bar.createSpan("pmi-member-gantt-bar-hours");
        if (width >= MEMBER_GANTT_BAR_LABEL_MIN_WIDTH) barHours.setText(estimatedHours > 0 ? t.hours(estimatedHours) : "未估时");
        else (0, import_obsidian5.setIcon)(barHours, "clock-3");
        if (task2.completedAt) {
          const completedAt = memberDateValue(task2.completedAt);
          if (completedAt !== null && completedAt >= rangeStart && completedAt <= rangeEnd) {
            const marker = timeline.createSpan("pmi-member-gantt-completed");
            marker.style.left = `${(completedAt - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth}px`;
            marker.setAttribute("title", `完成：${task2.completedAt}`);
          }
        }
        const open = () => {
          if (!projectRecord) return;
          void this.host.openTask(task2.id, projectRecord.path);
        };
        this.bindCellAction(title, open);
        this.bindCellAction(bar, open);
      }
    }
    if (unscheduled.length > 0) {
      const section = root.createDiv("pmi-member-gantt-unscheduled");
      section.createEl("h4", { text: `未排期事项（${unscheduled.length}）` });
      const list = section.createDiv("pmi-member-gantt-unscheduled-list");
      for (const item of unscheduled) {
        const projectRecord = projectRecords.get(item.task.projectId);
        const button = list.createEl("button", { attr: { type: "button" } });
        button.createSpan({ text: item.task.title });
        if (projectRecord) button.createSpan({ cls: "pmi-member-gantt-project", text: projectRecord.title });
        button.createSpan({ cls: "pmi-member-gantt-effort-text", text: t.workHours(item.task.displayLogged ?? item.task.logged, item.task.displayEstimate ?? item.task.estimate) });
        button.addEventListener("click", () => {
          if (!projectRecord) return;
          void this.host.openTask(item.task.id, projectRecord.path);
        });
      }
    }
  }
  renderTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    return this.renderProjectManagerTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort);
    var _a, _b, _c, _d, _e, _f;
    (_a = detail.querySelector(".pmi-task-table")) == null ? void 0 : _a.remove();
    (_b = detail.querySelector(".pmi-list-empty.pmi-task-empty")) == null ? void 0 : _b.remove();
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const table = detail.createDiv({
      cls: "pmi-task-table",
      attr: {
        role: "region",
        tabindex: "0",
        "aria-label": t.tasks
      }
    });
    const columns = table.createDiv("pmi-task-columns");
    const columnLabels = [
      t.taskId,
      t.tasks,
      t.project,
      t.module,
      t.stage,
      t.status,
      t.priority,
      t.assignee,
      t.completedBy,
      t.due,
      t.progress,
      t.work
    ];
    if (this.taskColumnWidths && this.taskColumnWidths.length !== columnLabels.length) this.taskColumnWidths = null;
    if (this.taskColumnWidths) this.applyTaskColumnWidths(table, this.taskColumnWidths);
    const columnHeaders = columnLabels.map((label) => {
      const header = columns.createDiv({ cls: "pmi-task-column", attr: { role: "columnheader" } });
      if (label === t.priority) {
        header.setAttribute(
          "aria-sort",
          this.taskPrioritySort === "high-to-low" ? "descending" : this.taskPrioritySort === "low-to-high" ? "ascending" : "none"
        );
        const sortAccessibleLabel = this.taskPrioritySort === "none" ? t.sortPriority : `${t.priority}: ${this.taskPrioritySort === "high-to-low" ? t.priorityHighToLow : t.priorityLowToHigh}`;
        const sort = header.createEl("button", {
          cls: "pmi-task-sort",
          attr: { type: "button" }
        });
        sort.createSpan({
          cls: "pmi-task-sort-label",
          text: label,
          attr: { "aria-hidden": "true" }
        });
        sort.createSpan({ cls: "pmi-sr-only", text: sortAccessibleLabel });
        (0, import_obsidian5.setIcon)(
          sort.createSpan({ cls: "pmi-task-sort-icon", attr: { "aria-hidden": "true" } }),
          this.taskPrioritySort === "high-to-low" ? "chevron-down" : this.taskPrioritySort === "low-to-high" ? "chevron-up" : "chevrons-up-down"
        );
        sort.addEventListener("click", (event) => {
          var _a2;
          const restoreFocus = event.detail === 0;
          onPrioritySort(restoreFocus);
          if (restoreFocus) (_a2 = detail.querySelector(".pmi-task-sort")) == null ? void 0 : _a2.focus();
        });
      } else {
        header.createSpan({ text: label });
      }
      return header;
    });
    columnHeaders.forEach((header, index) => {
      var _a2;
      this.addTaskColumnResizer(table, columns, header, index, (_a2 = columnLabels[index]) != null ? _a2 : "", t);
    });
    const priorityDefinitions = new Map(priorities.map((priority) => [priority.id, priority]));
    for (const task2 of tasks) {
      const projectRecord = projectRecords.get(task2.projectId);
      const row = table.createDiv({
        cls: "pmi-task-row",
        attr: { role: "row" }
      });
      const taskId = row.createDiv({
        cls: "pmi-task-id pmi-task-open",
        attr: { role: "button", tabindex: "0", "aria-label": `${t.openTask}: ${task2.title}`, title: t.openTask, "data-task-id": task2.id }
      });
      taskId.createSpan({ text: task2.zentaoId ? `${task2.sourceType === "requirement" ? t.requirement : t.task} #${task2.zentaoId}` : "—" });
      const title = row.createDiv({
        cls: "pmi-task-title pmi-task-open",
        attr: {
          role: "button",
          tabindex: "0",
          "aria-label": `${t.openTask}: ${task2.title}`,
          title: t.openTask,
          "data-task-id": task2.id
        }
      });
      title.createEl("strong", { text: task2.title });
      const badges = title.createDiv("pmi-task-badges");
      if (task2.sourceType === "requirement" || task2.sourceType === "task") {
        badges.createSpan({ cls: `pmi-task-type pmi-task-type--${task2.sourceType}`, text: task2.sourceType === "requirement" ? t.requirement : t.task });
      }
      if (task2.assignmentKind === "shared") badges.createSpan({ text: t.shared });
      if (task2.unestimated) badges.createSpan({ text: t.unestimated });
      if (task2.archived) badges.createSpan({ text: t.archived });
      for (const tag of task2.tags) {
        badges.createSpan({ cls: "pmi-task-tag", text: tag });
      }
      const project2 = row.createDiv({
        cls: "pmi-task-project pmi-project-open",
        attr: {
          role: "button",
          tabindex: "0",
          "aria-label": `${t.openProject}: ${task2.projectTitle}`,
          title: t.openProject,
          "data-project-path": (_c = projectRecord == null ? void 0 : projectRecord.path) != null ? _c : ""
        }
      });
      project2.createSpan({ text: (_d = projectRecord == null ? void 0 : projectRecord.icon) != null ? _d : "\u{1F4CB}" });
      project2.createSpan({ text: task2.projectTitle });
      row.createSpan({ cls: "pmi-task-module", text: task2.module ?? "—" });
      row.createSpan({ cls: "pmi-task-stage", text: task2.stage ?? "—" });
      row.createSpan({ cls: "pmi-task-status", text: task2.status });
      const priorityDefinition = task2.priority ? priorityDefinitions.get(task2.priority) : void 0;
      const priority = row.createDiv("pmi-task-priority");
      if (priorityDefinition == null ? void 0 : priorityDefinition.color) {
        const signal = priority.createSpan({
          cls: "pmi-priority-signal",
          attr: { "aria-hidden": "true" }
        });
        signal.style.backgroundColor = priorityDefinition.color;
      }
      priority.createSpan({
        cls: `pmi-task-priority-label${task2.priority ? "" : " is-empty"}`,
        text: (_f = (_e = priorityDefinition == null ? void 0 : priorityDefinition.label) != null ? _e : task2.priority) != null ? _f : t.noPriority
      });
      row.createSpan({ cls: "pmi-task-assignee", text: task2.resolvedAssignees?.join("、") || task2.assignees.join("、") || "—" });
      row.createSpan({ cls: "pmi-task-completed-by", text: task2.completedBy ?? "—" });
      row.createSpan({ cls: "pmi-task-due", text: task2.due ?? "—" });
      const progress = row.createDiv("pmi-task-progress");
      const progressTrack = progress.createDiv("pmi-task-progress-track");
      const progressFill = progressTrack.createDiv("pmi-task-progress-fill");
      progressFill.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
      progress.createSpan({ cls: "pmi-task-progress-label", text: `${Math.round(task2.progress)}%` });
      row.createSpan({ cls: "pmi-task-hours", text: t.workHours(task2.logged, task2.estimate) });
      this.bindCellAction(taskId, () => {
        if (!projectRecord) return;
        void this.host.openTask(task2.id, projectRecord.path);
      });
      this.bindCellAction(title, () => {
        if (!projectRecord) return;
        void this.host.openTask(task2.id, projectRecord.path);
      });
      this.bindCellAction(project2, () => {
        if (!projectRecord) return;
        void this.host.openProject(projectRecord.path);
      });
    }
  }
  renderProjectManagerTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    detail.querySelector(".pmi-task-table")?.remove();
    detail.querySelector(".pmi-pm-table-wrapper")?.remove();
    detail.querySelector(".pmi-list-empty.pmi-task-empty")?.remove();
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }

    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const priorityDefinitions = new Map(priorities.map((definition) => [definition.id, definition]));
    const stageDefinitions = new Map(stages.map((definition) => [definition.id, definition]));
    const statusDefinitions = new Map(statuses.map((definition) => [definition.id, definition]));
    const groupTones = new Map();
    let groupIndex = 0;
    const wrapper = detail.createDiv("pm-root pm-table-wrapper pmi-pm-table-wrapper");
    const table = wrapper.createEl("table", { cls: "pm-table pmi-pm-table" });
    table.setCssStyles({ minWidth: "1560px", tableLayout: "fixed" });
    const headerRow = table.createEl("thead").createEl("tr");
    const headers = [
      [t.taskId, 96], [t.item, 397], [t.module, 180], [t.stage, 130], [t.status, 120],
      [t.priority, 100], [t.progress, 120], [t.work, 90], [t.assignee, 110], [t.completedBy, 110], [t.due, 110]
    ];
    for (const [index, [label, width]] of headers.entries()) {
      const header = headerRow.createEl("th", { text: label });
      const currentWidth = this.projectTableColumnWidths?.[index] ?? width;
      header.setCssStyles({ width: `${currentWidth}px`, minWidth: `${currentWidth}px` });
      if (label === t.priority) {
        header.addClass("pm-table-th-sortable");
        header.addEventListener("click", onPrioritySort);
        header.createSpan({ text: this.taskPrioritySort === "high-to-low" ? " ↓" : this.taskPrioritySort === "low-to-high" ? " ↑" : "", cls: "pm-sort-indicator" });
      }
      const resizer = header.createDiv({ cls: "pm-table-column-resizer", attr: { role: "separator", tabindex: "0", "aria-label": t.resizeColumn(label) } });
      resizer.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.projectTableColumnWidths ??= headers.map(([, defaultWidth]) => defaultWidth);
        const startX = event.clientX;
        const startWidth = this.projectTableColumnWidths[index] ?? width;
        resizer.setPointerCapture(event.pointerId);
        const move = (moveEvent) => {
          const nextWidth = Math.max(64, Math.round(startWidth + moveEvent.clientX - startX));
          this.projectTableColumnWidths[index] = nextWidth;
          header.setCssStyles({ width: `${nextWidth}px`, minWidth: `${nextWidth}px` });
        };
        const end = () => {
          resizer.removeEventListener("pointermove", move);
          resizer.removeEventListener("pointerup", end);
          resizer.removeEventListener("pointercancel", end);
          if (resizer.hasPointerCapture(event.pointerId)) resizer.releasePointerCapture(event.pointerId);
        };
        resizer.addEventListener("pointermove", move);
        resizer.addEventListener("pointerup", end);
        resizer.addEventListener("pointercancel", end);
      });
    }

    const body = table.createEl("tbody");
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const orderedTasks = [];
    const taskDepths = new Map();
    const visited = new Set();
    const visit = (task2, depth = 0) => {
      if (visited.has(task2.id)) return;
      visited.add(task2.id);
      taskDepths.set(task2.id, depth);
      orderedTasks.push(task2);
      for (const child of childrenByParent.get(task2.id) ?? []) visit(child, depth + 1);
    };
    for (const task2 of tasks) if (!task2.parentId || !taskById.has(task2.parentId)) visit(task2);
    for (const task2 of tasks) visit(task2);
    const createChip = (cell, label, color, variant = "solid") => {
      const chip = cell.createSpan({ cls: `pm-chip pm-chip--${variant} pm-chip--sm` });
      chip.style.setProperty("--pm-chip-color", color || "var(--text-muted)");
      chip.createSpan({ cls: "pm-chip-dot" });
      chip.createSpan({ text: label });
      return chip;
    };
    const createPerson = (cell, name) => {
      if (!name) {
        cell.createSpan({ text: "—", cls: "pm-cf-value" });
        return;
      }
      const stack = cell.createDiv("pm-avatar-stack");
      const avatar = stack.createSpan({ cls: "pm-avatar", text: Array.from(name).slice(0, 2).join(""), attr: { "aria-label": name } });
      avatar.style.backgroundColor = "var(--interactive-accent)";
    };

    for (const task2 of orderedTasks) {
      // 需求使用自身禅道 ID，任务使用关联需求 ID，确保父需求及其子任务始终属于同一色组。
      const parentTask = task2.parentId ? taskById.get(task2.parentId) : null;
      const storyId = task2.sourceType === "requirement" ? String(task2.zentaoId ?? task2.id) : String(task2.customFields.storyId || parentTask?.zentaoId || task2.parentId || task2.zentaoId || task2.id);
      const groupKey = `${task2.projectId}:${storyId}`;
      if (!groupTones.has(groupKey)) groupTones.set(groupKey, groupIndex++ % 2 === 0 ? "a" : "b");
      const tone = groupTones.get(groupKey);
      const sourceClass = task2.sourceType === "requirement" ? "story" : "task";
      const row = body.createEl("tr", { cls: `pm-table-row pm-zentao-type-${sourceClass} pm-requirement-group-${tone}${task2.completed ? " pm-table-row--done" : ""}` });
      const projectRecord = projectRecords.get(task2.projectId);

      const idCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-zentao-id" });
      const idLabel = task2.zentaoId ? `${task2.sourceType === "requirement" ? t.requirement : t.task} #${task2.zentaoId}` : "—";
      const idChip = idCell.createSpan({ cls: "pm-chip pm-chip--plain pm-chip--sm", text: idLabel });
      idChip.addEventListener("click", () => projectRecord && void this.host.openTask(task2.id, projectRecord.path));

      const titleCell = row.createEl("td", { cls: "pm-table-cell-title" });
      titleCell.setCssStyles({ paddingLeft: `${(taskDepths.get(task2.id) ?? 0) * 20 + 8}px` });
      const title = titleCell.createSpan({ cls: "pm-task-title-text", text: task2.title });
      title.addEventListener("click", () => projectRecord && void this.host.openTask(task2.id, projectRecord.path));
      const tagRow = titleCell.createDiv("pm-table-tags");
      createChip(tagRow, task2.sourceType === "requirement" ? t.requirement : t.task, task2.sourceType === "requirement" ? "var(--color-yellow)" : "var(--color-pink)", "outline").addClass("pm-chip--tag");
      for (const tag of task2.tags.filter((tag) => !["zentao", "zentao-task", "zentao-requirement"].includes(tag))) createChip(tagRow, tag, tag.startsWith("超时") ? "var(--color-red)" : "var(--text-muted)", "outline").addClass("pm-chip--tag");

      const moduleCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-module" });
      moduleCell.createSpan({ text: task2.module ?? "—", cls: "pm-cf-value" });
      const stageCell = row.createEl("td", { cls: "pm-table-cell" });
      const stage = stageDefinitions.get(task2.stage);
      createChip(stageCell, stage?.label ?? task2.stage ?? "—", stage?.color, "solid");
      const statusCell = row.createEl("td", { cls: "pm-table-cell" });
      const status = statusDefinitions.get(task2.status);
      createChip(statusCell, status?.label ?? task2.status ?? "—", status?.color, "solid");
      const priorityCell = row.createEl("td", { cls: "pm-table-cell" });
      const priority = task2.priority ? priorityDefinitions.get(task2.priority) : null;
      createChip(priorityCell, priority?.label ?? task2.priority ?? t.noPriority, priority?.color, "plain");
      const progressCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-progress" });
      const progress = progressCell.createDiv("pm-progress");
      const progressTrack = progress.createDiv("pm-progress-track");
      const progressFill = progressTrack.createDiv("pm-progress-fill");
      progressFill.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
      progress.createSpan({ cls: "pm-progress-label", text: `${Math.round(task2.progress)}%` });
      const timeCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-time" });
      timeCell.createSpan({ cls: "pm-chip pm-chip--plain pm-chip--sm", text: t.workHours(task2.displayLogged ?? task2.logged, task2.displayEstimate ?? task2.estimate) });
      const assigneeCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-assignees" });
      createPerson(assigneeCell, task2.resolvedAssignees?.[0] ?? task2.assignees[0] ?? "");
      const completedByCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-assignees" });
      createPerson(completedByCell, task2.completedBy ?? "");
      row.createEl("td", { cls: "pm-table-cell", text: task2.due ?? "—" });
    }
  }
  bindCellAction(element, action) {
    element.addEventListener("click", action);
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      action();
    });
  }
  addTaskColumnResizer(table, columns, header, index, label, t) {
    var _a, _b, _c;
    const minimumWidth = (_a = TASK_COLUMN_MIN_WIDTHS[index]) != null ? _a : 64;
    const resizer = header.createDiv({
      cls: "pmi-task-column-resizer",
      attr: {
        role: "separator",
        tabindex: "0",
        "aria-label": t.resizeColumn(label),
        "aria-orientation": "vertical",
        "aria-valuemin": String(minimumWidth),
        title: t.resizeColumnHint(label)
      }
    });
    const currentWidths = () => Array.from(columns.children, (column) => Math.round(column.getBoundingClientRect().width));
    const resize = (width) => {
      var _a2;
      const widths = (_a2 = this.taskColumnWidths) != null ? _a2 : currentWidths();
      widths[index] = Math.max(minimumWidth, Math.round(width));
      this.taskColumnWidths = widths;
      this.applyTaskColumnWidths(table, widths);
      resizer.setAttribute("aria-valuenow", String(widths[index]));
    };
    resizer.setAttribute(
      "aria-valuenow",
      String((_c = (_b = this.taskColumnWidths) == null ? void 0 : _b[index]) != null ? _c : Math.round(header.getBoundingClientRect().width))
    );
    resizer.addEventListener("pointerdown", (event) => {
      var _a2;
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      const widths = currentWidths();
      this.taskColumnWidths = widths;
      this.applyTaskColumnWidths(table, widths);
      const startX = event.clientX;
      const startWidth = (_a2 = widths[index]) != null ? _a2 : minimumWidth;
      resizer.setPointerCapture(event.pointerId);
      resizer.addClass("is-resizing");
      table.addClass("is-resizing-columns");
      const onPointerMove = (moveEvent) => {
        resize(startWidth + moveEvent.clientX - startX);
      };
      const onPointerEnd = (endEvent) => {
        if (resizer.hasPointerCapture(endEvent.pointerId)) {
          resizer.releasePointerCapture(endEvent.pointerId);
        }
        resizer.removeClass("is-resizing");
        table.removeClass("is-resizing-columns");
        resizer.removeEventListener("pointermove", onPointerMove);
        resizer.removeEventListener("pointerup", onPointerEnd);
        resizer.removeEventListener("pointercancel", onPointerEnd);
      };
      resizer.addEventListener("pointermove", onPointerMove);
      resizer.addEventListener("pointerup", onPointerEnd);
      resizer.addEventListener("pointercancel", onPointerEnd);
    });
    resizer.addEventListener("keydown", (event) => {
      var _a2, _b2;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const widths = (_a2 = this.taskColumnWidths) != null ? _a2 : currentWidths();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const step = event.shiftKey ? TASK_COLUMN_KEYBOARD_STEP * 4 : TASK_COLUMN_KEYBOARD_STEP;
      resize(((_b2 = widths[index]) != null ? _b2 : minimumWidth) + direction * step);
    });
    resizer.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.taskColumnWidths = null;
      table.style.removeProperty("--pmi-task-grid-columns");
      table.style.removeProperty("--pmi-task-grid-min-width");
      const headers = columns.querySelectorAll(".pmi-task-column-resizer");
      headers.forEach((handle) => {
        const column = handle.parentElement;
        if (column) handle.setAttribute("aria-valuenow", String(Math.round(column.getBoundingClientRect().width)));
      });
    });
  }
  applyTaskColumnWidths(table, widths) {
    const gridWidth = widths.reduce((total, width) => total + width, 0) + TASK_COLUMN_GAP * (widths.length - 1) + TASK_TABLE_INLINE_PADDING;
    table.style.setProperty("--pmi-task-grid-columns", widths.map((width) => `${width}px`).join(" "));
    table.style.setProperty("--pmi-task-grid-min-width", `${gridWidth}px`);
  }
  renderEmpty(root, title, body, icon) {
    const empty = root.createDiv("pmi-empty");
    (0, import_obsidian5.setIcon)(empty.createSpan("pmi-empty-icon"), icon);
    empty.createEl("h2", { text: title });
    empty.createEl("p", { text: body });
  }
};

// src/main.ts
var ProjectManagerInsightsPlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings", structuredClone(DEFAULT_SETTINGS));
    __publicField(this, "catalog");
    __publicField(this, "navigator");
    __publicField(this, "toolbarIntegration");
    __publicField(this, "refreshTimer", null);
  }
  async onload() {
    await this.loadSettings();
    this.catalog = new ProjectManagerCatalog(new ObsidianProjectManagerSource(this.app));
    this.navigator = new ProjectManagerNavigator(this.app);
    this.toolbarIntegration = new ProjectManagerToolbarIntegration(this.app, this);
    this.registerView(INSIGHTS_VIEW_TYPE, (leaf) => new InsightsView(leaf, this));
    this.registerObsidianProtocolHandler("open-pm-insights", async () => {
      await this.openInsights();
    });
    this.addRibbonIcon("chart-no-axes-combined", translations(this.settings).viewName, () => {
      void this.openInsights();
    });
    this.addCommand({
      id: "open-assignee-workload-insights",
      name: translations(this.settings).commandOpen,
      callback: () => void this.openInsights()
    });
    this.addCommand({
      id: "refresh-assignee-workload-insights",
      name: translations(this.settings).commandRefresh,
      callback: () => void this.reconcileInsights()
    });
    this.register(this.catalog.subscribe(() => this.scheduleRefresh()));
    this.app.workspace.onLayoutReady(() => this.toolbarIntegration.start());
  }
  onunload() {
    this.toolbarIntegration.stop();
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  }
  async loadSettings() {
    const saved = await this.loadData();
    const savedQuickFilter = saved?.quickFilter ?? {};
    this.settings = {
      ...structuredClone(DEFAULT_SETTINGS),
      ...saved,
      aliases: Array.isArray(saved == null ? void 0 : saved.aliases) ? saved.aliases : [],
      selectedProjectIds: Array.isArray(saved == null ? void 0 : saved.selectedProjectIds) ? saved.selectedProjectIds : [],
      quickFilter: {
        ...structuredClone(DEFAULT_SETTINGS.quickFilter),
        ...(savedQuickFilter && typeof savedQuickFilter === "object" ? savedQuickFilter : {})
      }
    };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async readProjectManager() {
    return this.catalog.snapshot();
  }
  async reconcileProjectManager() {
    const snapshot = await this.catalog.reconcile();
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    return snapshot;
  }
  tooltip() {
    return translations(this.settings).toolbarTooltip;
  }
  async openProjectInsights(projectPath) {
    await this.openInsights(projectPath);
  }
  async openInsights(projectPath) {
    let leaf;
    const existing = this.app.workspace.getLeavesOfType(INSIGHTS_VIEW_TYPE)[0];
    if (existing) {
      leaf = existing;
    } else {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({ type: INSIGHTS_VIEW_TYPE, active: true });
    }
    await this.app.workspace.revealLeaf(leaf);
    if (projectPath && leaf.view instanceof InsightsView) {
      await leaf.view.scopeToProjectPath(projectPath);
    } else if (projectPath) {
      const snapshot = await this.readProjectManager();
      const normalizedPath = String(projectPath).replace(/\\/g, "/");
      const project2 = snapshot.projects.find((candidate) => {
        const candidatePath = String(candidate.path ?? "").replace(/\\/g, "/");
        return candidatePath === normalizedPath || candidatePath.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidatePath}`);
      });
      if (project2) {
        this.settings.selectedProjectIds = [project2.id];
        await this.saveSettings();
      }
    }
  }
  async openTask(taskId, projectPath) {
    try {
      await this.navigator.editTask({ taskId, projectPath });
    } catch (error) {
      const t = translations(this.settings);
      const unsupported = error instanceof ProjectManagerNavigationError && error.code === "unsupported-version";
      new import_obsidian6.Notice(unsupported ? t.projectManagerVersionUnsupported : t.taskEditorUnavailable);
    }
  }
  async openProject(projectPath) {
    try {
      await this.navigator.openProject(projectPath);
    } catch (e) {
      new import_obsidian6.Notice(translations(this.settings).projectManagerUnavailable);
    }
  }
  async refreshInsights() {
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    const views = this.app.workspace.getLeavesOfType(INSIGHTS_VIEW_TYPE).map((leaf) => leaf.view).filter((view) => view instanceof InsightsView);
    await Promise.all(views.map((view) => view.refresh()));
    this.toolbarIntegration.sync();
  }
  async reconcileInsights() {
    await this.reconcileProjectManager();
    await this.refreshInsights();
  }
  scheduleRefresh() {
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      void this.refreshInsights();
    }, 250);
  }
};

})(insightsModule, insightsModule.exports, require)

const EnhancedPlugin = enhancedModule.exports.default ?? enhancedModule.exports
const InsightsPlugin = insightsModule.exports.default ?? insightsModule.exports

module.exports = class ProjectManagerEnhancedPlugin extends EnhancedPlugin {
  insightsPlugin = null

  async onload() {
    await super.onload()
    await this.migrateInsightsSettings()

    try {
      const insightsPlugin = new InsightsPlugin(this.app, this.manifest)
      await insightsPlugin.load()
      this.insightsPlugin = insightsPlugin
      this.syncInsightsSettings()
      insightsPlugin.saveSettings = async () => {
        this.syncInsightsSettings()
        await this.saveSettings()
      }
    } catch (error) {
      console.error('Project Manager Insights 内部模块加载失败', error)
    }
  }

  onunload() {
    try {
      this.insightsPlugin?.unload()
      this.insightsPlugin = null
    } finally {
      super.onunload()
    }
  }

  syncInsightsSettings() {
    const insightsSettings = this.insightsPlugin?.settings
    if (!insightsSettings) return

    this.settings.locale = insightsSettings.locale
    this.settings.aliases = structuredClone(insightsSettings.aliases)
    this.settings.selectedProjectIds = [...insightsSettings.selectedProjectIds]
    this.settings.memberViewMode = insightsSettings.memberViewMode
    this.settings.memberGanttScale = insightsSettings.memberGanttScale
    this.settings.quickFilter = structuredClone(insightsSettings.quickFilter ?? {
      quickSource: "all"
    })
  }

  async migrateInsightsSettings() {
    if (Array.isArray(this.settings.selectedProjectIds)) return

    const legacyPath = `${this.app.vault.configDir}/plugins/project-manager-insights/data.json`
    try {
      if (!(await this.app.vault.adapter.exists(legacyPath))) return
      const legacySettings = JSON.parse(await this.app.vault.adapter.read(legacyPath))
      Object.assign(this.settings, legacySettings)
      await this.saveSettings()
    } catch (error) {
      console.error('Project Manager Insights 旧设置迁移失败', error)
    }
  }
}
