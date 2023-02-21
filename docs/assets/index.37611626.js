(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function b(){}function Q(e){return e()}function T(){return Object.create(null)}function x(e){e.forEach(Q)}function U(e){return typeof e=="function"}function V(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let A;function q(e,t){return A||(A=document.createElement("a")),A.href=t,e===A.href}function ne(e){return Object.keys(e).length===0}function h(e,t){e.appendChild(t)}function W(e,t,n){e.insertBefore(t,n||null)}function H(e){e.parentNode&&e.parentNode.removeChild(e)}function re(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function _(e){return document.createElement(e)}function E(e){return document.createTextNode(e)}function C(){return E(" ")}function ie(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ce(e){return Array.from(e.childNodes)}function F(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function I(e,t,n,r){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}let S;function k(e){S=e}const j=[],K=[],L=[],D=[],le=Promise.resolve();let O=!1;function oe(){O||(O=!0,le.then(X))}function B(e){L.push(e)}const N=new Set;let $=0;function X(){const e=S;do{for(;$<j.length;){const t=j[$];$++,k(t),se(t.$$)}for(k(null),j.length=0,$=0;K.length;)K.pop()();for(let t=0;t<L.length;t+=1){const n=L[t];N.has(n)||(N.add(n),n())}L.length=0}while(j.length);for(;D.length;)D.pop()();O=!1,N.clear(),k(e)}function se(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(B)}}const P=new Set;let w;function ae(){w={r:0,c:[],p:w}}function ue(){w.r||x(w.c),w=w.p}function z(e,t){e&&e.i&&(P.delete(e),e.i(t))}function M(e,t,n,r){if(e&&e.o){if(P.has(e))return;P.add(e),w.c.push(()=>{P.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function fe(e){e&&e.c()}function Y(e,t,n,r){const{fragment:i,after_update:a}=e.$$;i&&i.m(t,n),r||B(()=>{const o=e.$$.on_mount.map(Q).filter(U);e.$$.on_destroy?e.$$.on_destroy.push(...o):x(o),e.$$.on_mount=[]}),a.forEach(B)}function Z(e,t){const n=e.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function de(e,t){e.$$.dirty[0]===-1&&(j.push(e),oe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ee(e,t,n,r,i,a,o,g=[-1]){const f=S;k(e);const u=e.$$={fragment:null,ctx:[],props:a,update:b,not_equal:i,bound:T(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(f?f.$$.context:[])),callbacks:T(),dirty:g,skip_bound:!1,root:t.target||f.$$.root};o&&o(u.root);let m=!1;if(u.ctx=n?n(e,t.props||{},(c,y,...s)=>{const d=s.length?s[0]:y;return u.ctx&&i(u.ctx[c],u.ctx[c]=d)&&(!u.skip_bound&&u.bound[c]&&u.bound[c](d),m&&de(e,c)),y}):[],u.update(),m=!0,x(u.before_update),u.fragment=r?r(u.ctx):!1,t.target){if(t.hydrate){const c=ce(t.target);u.fragment&&u.fragment.l(c),c.forEach(H)}else u.fragment&&u.fragment.c();t.intro&&z(e.$$.fragment),Y(e,t.target,t.anchor,t.customElement),X()}k(f)}class te{$destroy(){Z(this,1),this.$destroy=b}$on(t,n){if(!U(n))return b;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!ne(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const R=[{name:"nnvisualized",description:"A neural network visualized directly in the browser",theme:"#1D3557"},{name:"ktracer",description:"A basic path tracer written in Kotlin",theme:"#C8A2C8",link:"https://github.com/jmaen/ktracer#readme"},{name:"pronit",description:"A tool that automates project initialization",theme:"#A1C8CB",link:"https://github.com/jmaen/pronit#readme"},{name:"rasplicate",description:"A tool that turns your Raspberry Pi into an automatic backup server",theme:"#914F66",link:"https://github.com/jmaen/rasplicate#readme"}];function he(e){let t,n,r,i,a,o,g,f,u,m,c,y,s,d;return{c(){t=_("button"),n=_("div"),r=_("img"),a=C(),o=_("div"),g=_("p"),f=E("/"),u=E(e[0]),m=C(),c=_("p"),y=E(e[1]),q(r.src,i="/icons/"+e[0]+".svg")||p(r,"src",i),p(r,"alt",""),p(r,"class","svelte-16g52hw"),p(n,"class","project-thumbnail svelte-16g52hw"),I(n,"background-color",e[2]),p(g,"class","project-title svelte-16g52hw"),p(c,"class","project-description svelte-16g52hw"),p(o,"class","project-info svelte-16g52hw"),p(t,"class","project svelte-16g52hw")},m(l,v){W(l,t,v),h(t,n),h(n,r),h(t,a),h(t,o),h(o,g),h(g,f),h(g,u),h(o,m),h(o,c),h(c,y),s||(d=ie(t,"click",e[3]),s=!0)},p(l,[v]){v&1&&!q(r.src,i="/icons/"+l[0]+".svg")&&p(r,"src",i),v&4&&I(n,"background-color",l[2]),v&1&&F(u,l[0]),v&2&&F(y,l[1])},i:b,o:b,d(l){l&&H(t),s=!1,d()}}}function me(e,t,n){let{name:r}=t,{description:i}=t,{theme:a}=t,{link:o}=t;function g(){o?window.open(o,"_blank"):window.open(r,"_self")}return e.$$set=f=>{"name"in f&&n(0,r=f.name),"description"in f&&n(1,i=f.description),"theme"in f&&n(2,a=f.theme),"link"in f&&n(4,o=f.link)},[r,i,a,g,o]}class pe extends te{constructor(t){super(),ee(this,t,me,he,V,{name:0,description:1,theme:2,link:4})}}function G(e,t,n){const r=e.slice();return r[0]=t[n],r}function J(e){let t,n;return t=new pe({props:{name:e[0].name,description:e[0].description,theme:e[0].theme,link:e[0].link}}),{c(){fe(t.$$.fragment)},m(r,i){Y(t,r,i),n=!0},p:b,i(r){n||(z(t.$$.fragment,r),n=!0)},o(r){M(t.$$.fragment,r),n=!1},d(r){Z(t,r)}}}function ge(e){let t,n,r,i,a,o,g,f,u,m=R,c=[];for(let s=0;s<m.length;s+=1)c[s]=J(G(e,m,s));const y=s=>M(c[s],1,1,()=>{c[s]=null});return{c(){t=_("main"),n=_("div"),r=_("div"),r.innerHTML=`<h1 class="svelte-138zccn">Hello, welcome to my website!</h1> 
      <h2 class="svelte-138zccn">Here you can find a collection of some of my personal projects.</h2>`,i=C(),a=_("div"),o=_("div");for(let s=0;s<c.length;s+=1)c[s].c();g=C(),f=_("div"),f.innerHTML=`<div class="svelte-138zccn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-138zccn"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> 
      <a href="https://github.com/jmaen" class="svelte-138zccn">/jmaen</a></div> 
    <div class="svelte-138zccn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-138zccn"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg> 
      <a href="https://twitter.com/jannikmaenzer" class="svelte-138zccn">/jannikmaenzer</a></div>`,p(o,"class","projects-grid svelte-138zccn"),p(a,"class","projects svelte-138zccn"),p(f,"class","socials svelte-138zccn"),p(t,"class","svelte-138zccn")},m(s,d){W(s,t,d),h(t,n),h(n,r),h(n,i),h(n,a),h(a,o);for(let l=0;l<c.length;l+=1)c[l].m(o,null);h(t,g),h(t,f),u=!0},p(s,[d]){if(d&0){m=R;let l;for(l=0;l<m.length;l+=1){const v=G(s,m,l);c[l]?(c[l].p(v,d),z(c[l],1)):(c[l]=J(v),c[l].c(),z(c[l],1),c[l].m(o,null))}for(ae(),l=m.length;l<c.length;l+=1)y(l);ue()}},i(s){if(!u){for(let d=0;d<m.length;d+=1)z(c[d]);u=!0}},o(s){c=c.filter(Boolean);for(let d=0;d<c.length;d+=1)M(c[d]);u=!1},d(s){s&&H(t),re(c,s)}}}class _e extends te{constructor(t){super(),ee(this,t,null,ge,V,{})}}new _e({target:document.getElementById("app")});
