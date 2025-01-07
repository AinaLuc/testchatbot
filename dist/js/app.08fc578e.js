(function(){"use strict";var t={652:function(t,e,s){var n=s(751),a=s(641),o=s(33);const r={key:0};function i(t,e,s,i,c,l){return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("form",{onSubmit:e[2]||(e[2]=(0,n.D$)(((...t)=>l.handleSubmit&&l.handleSubmit(...t)),["prevent"]))},[(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>c.assistantName=t),placeholder:"Enter assistant name",required:""},null,512),[[n.Jo,c.assistantName]]),(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":e[1]||(e[1]=t=>c.firstMessage=t),placeholder:"Enter first message",required:""},null,512),[[n.Jo,c.firstMessage]]),e[3]||(e[3]=(0,a.Lk)("button",{type:"submit"},"Create Assistant",-1))],32),c.assistantCreated?((0,a.uX)(),(0,a.CE)("div",r,[e[4]||(e[4]=(0,a.Lk)("h3",null,"Assistant Created:",-1)),(0,a.Lk)("p",null,(0,o.v_)(c.assistantCreated.name),1),(0,a.Lk)("p",null,(0,o.v_)(c.assistantCreated.firstMessage),1)])):(0,a.Q3)("",!0)])}var c=s(335),l={data(){return{assistantName:"",firstMessage:"",assistantCreated:null}},methods:{async aicom({key:t,assistantId:e,config:s={}}){return console.log("aicom method triggered with assistantId:",e),new Promise(((n,a)=>{let o=null;const r=document.createElement("script");r.src=`https://prod.islandaiforge.us/aicomvi.js?assistantId=${e}`,r.defer=!0,r.async=!0,document.head.appendChild(r),r.onload=()=>{console.log("AICom script loaded successfully");try{o=window.hiddenAI.run({apiKey:t,assistantId:e,config:s}),this.currentAIInstance=o,console.log("AICom initialized:",o),n(o)}catch(r){console.error("Error initializing AICom:",r),a("Error initializing AICom: "+r.message)}},r.onerror=()=>{console.error("Failed to load AICom script."),a("Failed to load AICom script.")}}))},async handleSubmit(){try{console.log("Creating assistant with the following details:",{assistantName:this.assistantName,firstMessage:this.firstMessage});const t=await c.A.post("https://prod.islandaiforge.us/create-assistant-try/",{firstMessage:this.firstMessage,content:this.firstMessage,system:"Default System Message"});console.log("Assistant created successfully:",t.data),this.assistantCreated=t.data,await this.aicom({key:t.data.apiKey,assistantId:t.data.assistantId,config:{}})}catch(t){console.error("Error creating assistant:",t)}}}},u=s(262);const d=(0,u.A)(l,[["render",i],["__scopeId","data-v-6aabcb6e"]]);var f=d;const m=(0,n.Xq)(f);customElements.define("create-assistant",m),document.getElementById("app")&&(0,n.Ef)(f).mount("#app"),console.log=()=>{},console.warn=()=>{},console.error=()=>{}}},e={};function s(n){var a=e[n];if(void 0!==a)return a.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,n,a,o){if(!n){var r=1/0;for(u=0;u<t.length;u++){n=t[u][0],a=t[u][1],o=t[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&o||r>=o)&&Object.keys(s.O).every((function(t){return s.O[t](n[c])}))?n.splice(c--,1):(i=!1,o<r&&(r=o));if(i){t.splice(u--,1);var l=a();void 0!==l&&(e=l)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[n,a,o]}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var a,o,r=n[0],i=n[1],c=n[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(a in i)s.o(i,a)&&(s.m[a]=i[a]);if(c)var u=c(s)}for(e&&e(n);l<r.length;l++)o=r[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(u)},n=self["webpackChunkassistant_form_project"]=self["webpackChunkassistant_form_project"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[504],(function(){return s(652)}));n=s.O(n)})();
//# sourceMappingURL=app.08fc578e.js.map