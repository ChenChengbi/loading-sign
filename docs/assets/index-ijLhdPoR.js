var v=Object.defineProperty;var k=(i,e,t)=>e in i?v(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var o=(i,e,t)=>k(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function C(i,e){let t=Array.from(i.classList);t.forEach(n=>i.classList.remove(n)),i.classList.add(e),t.forEach(n=>i.classList.add(n))}const w='<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>';class x{constructor(e){o(this,"_target");o(this,"_body");o(this,"_fullscreen");o(this,"_lock");o(this,"_text");o(this,"_spinner");o(this,"_background");o(this,"_customClass");o(this,"_loadingElement");o(this,"_isClosed",!1);const{target:t,body:n,fullscreen:s,lock:r,text:a,spinner:f,background:h,customClass:p,size:m}=e;this._target=t,this._body=n,this._fullscreen=s,this._lock=r,this._text=a,this._background=h,this._customClass=p,f instanceof HTMLElement?this._spinner=f:this._spinner=this.generateDefaultSpinner(m),C(this._spinner,"loading__spinner")}get container(){let e;return this._body?e=document.body:e=this._target,e}get target(){return this._target}get isVisible(){return!this._isClosed}show(){this._loadingElement||(this._loadingElement=this.generateLoadingElement()),this.container.contains(this._loadingElement)||this.container.appendChild(this._loadingElement),this.container.classList.add("loading__parent"),this._lock&&this.container.classList.add("loading__parent-lock"),this._loadingElement.style.display="block",this._isClosed=!1}close(){this._isClosed||(this._loadingElement&&(this._loadingElement.remove(),this._loadingElement=void 0),this.container.classList.remove("loading__parent"),this.container.classList.remove("loading__parent-lock"),this._isClosed=!0)}generateLoadingElement(){const e=this.generateLoadingMask(),t=this.generateSpinnerContainer();if(t.appendChild(this._spinner),this._text){const n=document.createElement("div");n.className="loading__text",n.textContent=this._text,t.appendChild(n)}return e.appendChild(t),e}generateDefaultSpinner(e){const t=document.createElement("div");return t.className="default-spinner",t.innerHTML=w,t.style.width=`${e}px`,t.style.height=`${e}px`,t}generateSpinnerContainer(){const e=document.createElement("div");return e.className="loading__spinner-container",e}generateLoadingMask(){const e=document.createElement("div");e.className="loading__mask",e.style.backgroundColor=this._background;const t=this._spinner;if(e.appendChild(t),this._customClass&&e.classList.add(this._customClass),this._fullscreen&&e.classList.add("loading__mask-fullscreen"),this._body&&e.classList.add("loading__mask-body"),!this._fullscreen&&this._body){const n=this._target.getBoundingClientRect();e.style.top=`${n.top}px`,e.style.left=`${n.left}px`,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`}return e}}const l=class l{static service(e){var _;const{target:t,body:n=!1,fullscreen:s=!1,lock:r=!1,text:a,spinner:f,background:h="rgba(0, 0, 0, 0.7)",customClass:p,size:m=42}=e;if(!n&&!t)throw new Error("[Loading] target is required when body is false");if(!s&&n&&!t)throw new Error("[Loading] target is required when body is true and fullscreen is false");let c;if(t)if(typeof t=="string"){const d=document.querySelector(t);if(d instanceof HTMLElement)c=d;else throw new Error(`[Loading] target is not a valid HTMLElement: ${t}`)}else c=t;else c=document.body;if(s&&l.fullscreenInstance&&l.fullscreenInstance.isVisible)return l.fullscreenInstance;if(!s&&l.loadingUnitsMap.has(c)&&((_=l.loadingUnitsMap.get(c))!=null&&_.isVisible))return l.loadingUnitsMap.get(c);{const d=new x({target:c,body:n,fullscreen:s,lock:r,text:a,spinner:f,background:h,customClass:p,size:m});return s?l.fullscreenInstance=d:l.loadingUnitsMap.set(c,d),d.show(),d}}};o(l,"fullscreenInstance",null),o(l,"loadingUnitsMap",new Map);let u=l;const g=3e3;var y;(y=document.querySelector("#btn-body-full-screen"))==null||y.addEventListener("click",()=>{const i=u.service({body:!0,fullscreen:!0,lock:!0});setTimeout(()=>{i.close()},g)});var b;(b=document.querySelector("#btn-div-specified-region"))==null||b.addEventListener("click",()=>{const i=u.service({target:".specified-region",fullscreen:!1,lock:!0});setTimeout(()=>{i.close()},g)});var E;(E=document.querySelector("#btn-body-specified-region"))==null||E.addEventListener("click",()=>{const i=document.querySelector(".specified-region"),e=u.service({target:i,body:!0,fullscreen:!1,lock:!0});setTimeout(()=>{e.close()},g)});var L;(L=document.querySelector("#btn-div-full-screen"))==null||L.addEventListener("click",()=>{const i=document.querySelector(".specified-region"),e=u.service({target:i,fullscreen:!0,lock:!0});setTimeout(()=>{e.close()},g)});