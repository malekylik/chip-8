!function(n){var e={};function r(t){if(e[t])return e[t].exports;var u=e[t]={i:t,l:!1,exports:{}};return n[t].call(u.exports,u,u.exports,r),u.l=!0,u.exports}r.m=n,r.c=e,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var u in n)r.d(t,u,function(e){return n[e]}.bind(null,u));return t},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="",r(r.s=0)}([function(n,e,r){"use strict";r.r(e);const t={INIT:0,RUN_LOOP:1,SET_LOOP_MODE:2,EXECUTE_NEXT_INSTRUCTION:3,STOP_LOOP:4},u=0,o=1,c=0,a=1,i=2,f={V0:0,V1:1,V2:2,V3:3,V4:4,V5:5,V6:6,V7:7,V8:8,V9:9,VA:10,VB:11,VC:12,VD:13,VE:14,VF:15};Uint8Array.from([110,5,101,0,107,6,106,0,163,12,218,177,122,4,58,64,18,8,123,2,59,18,18,6,108,32,109,31,163,16,220,209,34,246,96,0,97,0,163,18,208,17,112,8,163,14,208,17,96,64,240,21,240,7,48,0,18,52,198,15,103,30,104,1,105,255,163,14,214,113,163,16,220,209,96,4,224,161,124,254,96,6,224,161,124,2,96,63,140,2,220,209,163,14,214,113,134,132,135,148,96,63,134,2,97,31,135,18,71,31,18,172,70,0,104,1,70,63,104,255,71,0,105,1,214,113,63,1,18,170,71,31,18,170,96,5,128,117,63,0,18,170,96,1,240,24,128,96,97,252,128,18,163,12,208,113,96,254,137,3,34,246,117,1,34,246,69,96,18,222,18,70,105,255,128,96,128,197,63,1,18,202,97,2,128,21,63,1,18,224,128,21,63,1,18,238,128,21,63,1,18,232,96,32,240,24,163,14,126,255,128,224,128,4,97,0,208,17,62,0,18,48,18,222,120,255,72,254,104,255,18,238,120,1,72,2,104,1,96,4,240,24,105,255,18,112,163,20,245,51,242,101,241,41,99,55,100,0,211,69,115,5,242,41,211,69,0,238,224,0,128,0,252,0,170,0,0,0,0,0]),Uint8Array.from([0,224,99,0,100,1,101,238,53,238,19,16,99,0,100,2,101,238,102,238,85,96,19,16,99,0,100,3,101,238,69,253,19,16,99,0,100,4,101,238,117,1,53,239,19,16,99,0,100,5,111,1,101,238,102,239,133,101,63,0,19,16,99,0,100,6,111,0,101,239,102,238,133,101,63,1,19,16,111,0,99,0,100,7,101,238,102,239,133,103,63,1,19,16,99,0,100,8,111,1,101,239,102,238,133,103,63,0,19,16,99,0,100,9,101,240,102,15,133,97,53,255,19,16,99,1,100,0,101,240,102,15,133,98,53,0,19,16,99,1,100,1,101,240,102,15,133,99,53,255,19,16,111,0,99,1,100,2,101,129,133,14,63,1,19,16,99,1,100,3,111,1,101,71,133,14,63,0,19,16,99,1,100,4,111,0,101,1,133,6,63,1,19,16,99,1,100,5,111,1,101,2,133,6,63,0,19,16,99,1,100,6,96,21,97,120,163,208,241,85,241,101,48,21,19,16,49,120,19,16,99,1,100,7,96,138,163,208,240,51,163,208,240,101,48,1,19,16,96,1,240,30,240,101,48,3,19,16,96,1,240,30,240,101,48,8,19,16,19,50,19,14,163,42,96,19,97,9,208,24,243,41,96,34,97,11,208,21,244,41,96,40,97,11,208,21,19,14,255,240,240,255,240,240,240,255,163,88,96,21,97,11,99,8,208,24,112,8,243,30,48,45,19,58,163,112,96,2,97,24,99,8,208,24,112,5,243,30,48,62,19,76,19,14,240,136,136,240,136,136,136,240,120,132,132,132,132,132,132,120,132,196,164,148,140,132,132,132,192,160,160,192,160,160,192,0,0,0,160,160,224,32,32,224,0,0,0,0,0,0,0,0,192,160,160,192,160,160,192,0,0,0,96,160,192,128,96,0,0,0,96,128,64,32,192,0,128,128,192,128,128,128,96,0,224,128,128,128,128,128,224,0,0,0,64,160,160,160,64,0,32,32,32,96,160,160,96,0,0,0,96,160,192,128,96,0,0,0,0,96,64,64,80,0,0,0,0,0,0,0]);function s(n){return l(n,b(n)+2)}function b(n){return n.programCounter[0]}function l(n,e){return n.programCounter[0]=e}function k(n){return n.I[0]}function y(n,e){return n.I[0]=e}function p(n,e){return n.registers[f.VF]=e}function d(n,e){return n.registers[e]}function O(n,e,r){return n.registers[e]=r}const T=1,m=0;function _(n){return n.uint16[0]}function v(n){return function(n){return V(n)>>>4}(n)}function P(n){return function(n){return 15&g(n)}(n)}function E(n){return 4095&_(n)}function g(n){return n.uint8[T]}function V(n){return n.uint8[m]}function I(n){return function(n){return 15&V(n)}(n)}function N(n){return function(n){return g(n)>>>4}(n)}function M(n){return g(n)}const S=64,w=32,U=0,h=5;new Uint8Array([240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]);function L(n,e,r,t){const u=Number(Boolean(t)&&Boolean(C(n,e,r)));return function(n,e,r,t){n.buffer[S*r+e]=t}(n,e,r,C(n,e,r)^t),u}function C(n,e,r){return n.buffer[S*r+e]}function A(n,e,r){return n.buffer[S*r+e]=U}function j(n,e){return n.bytes[e]}function x(n,e,r){return n.bytes[e]=r}const R=0,X=1;function D(n,e){return n.keyboard[e]}function B(n,e){return n%Math.pow(10,e+1)/Math.pow(10,e)|0}function F(n,e){return l(n,e)}function q(n,e,r){d(n,e)===r&&s(n)}function z(n,e,r){d(n,e)!==r&&s(n)}function G(n,e,r){return O(n,e,r)}function H(n,e,r){return function(n,e,r){return O(n,e,d(n,e)+r)}(n,e,r)}function J(n,e,r){return function(n,e,r){return O(n,e,d(n,e)-r)}(n,e,r)}function K(n,e,r){return p(n,1&r),function(n,e,r){return O(n,e,r>>>1)}(n,e,r)}function Q(n,e,r){return p(n,r>>7),function(n,e,r){return O(n,e,r<<1)}(n,e,r)}function W(n,e,r){(function(n,e){return D(n,e)===X})(e,r)&&s(n)}function Y(n,e,r){(function(n,e){return D(n,e)===R})(e,r)&&s(n)}const Z=128,$=Z+1;function nn(n){return j(n,Z)}function en(n){return j(n,$)}function rn(n,e){return x(n,Z,e)}function tn(n,e){return x(n,$,e)}function un(n,e,r,t,o,s){const l=b(n),T=v(e);var m,_;switch(F(n,l+i),T){case 0:switch(g(e)){case 224:!function(n){for(let e=0;e<w;e++)for(let r=0;r<S;r++)A(n,r,e)}(o);break;case 238:!function(n,e){F(n,function(n){const e=n.stack[n.stackPointer];return n.stackPointer-=1,e}(e))}(n,r)}break;case 1:F(n,E(e));break;case 2:!function(n,e,r){!function(n,e){n.stackPointer+=1,n.stack[n.stackPointer]=e}(e,b(n)),F(n,r)}(n,r,E(e));break;case 3:q(n,I(e),M(e));break;case 4:z(n,I(e),M(e));break;case 5:q(n,I(e),d(n,N(e)));break;case 6:G(n,I(e),M(e));break;case 7:H(n,I(e),M(e));break;case 8:switch(P(e)){case 0:G(n,I(e),d(n,N(e)));break;case 1:!function(n,e,r){O(n,e,d(n,e)|d(n,r))}(n,I(e),N(e));break;case 2:!function(n,e,r){O(n,e,d(n,e)&d(n,r))}(n,I(e),N(e));break;case 3:!function(n,e,r){O(n,e,d(n,e)^d(n,r))}(n,I(e),N(e));break;case 4:p(n,H(n,I(e),d(n,N(e)))>255?a:c);break;case 5:p(n,J(n,I(e),d(n,N(e)))>0?a:c);break;case 6:K(n,I(e),d(n,I(e)));break;case 7:p(n,function(n,e,r){return O(n,e,r-d(n,e))}(n,I(e),d(n,N(e)))>0?a:c);break;case 14:Q(n,I(e),d(n,I(e)))}break;case 9:z(n,I(e),d(n,N(e)));break;case 10:y(n,E(e));break;case 11:F(n,E(e)+function(n){return n.registers[f.V0]}(n));break;case 12:!function(n,e,r){O(n,e,(255*Math.random()|0)&r)}(n,I(e),M(e));break;case 13:p(n,function(n,e,r,t,u,o){let c=0;for(let a=0;a<o;a++)for(let o=0;o<8;o++)c|=L(n,(e+o)%S,(r+a)%w,j(t,u+a)>>>7-o&1);return c}(o,d(n,I(e)),d(n,N(e)),t,k(n),P(e)));break;case 14:switch(M(e)){case 158:W(n,s,d(n,I(e)));break;case 161:Y(n,s,d(n,I(e)))}break;case 15:switch(M(e)){case 7:G(n,I(e),nn(t));break;case 10:{const r=function(n){const e=n.keyboard;for(let n=0;n<e.length;n++)if(e[n]===X)return n;return-1}(s);-1!==r?G(n,I(e),r):F(n,l);break}case 21:rn(t,d(n,I(e)));break;case 24:tn(t,d(n,I(e)));break;case 30:y(n,k(n)+d(n,I(e)));break;case 41:y(n,(m=u,_=d(n,I(e)),m+_*h));break;case 51:{const r=d(n,I(e)),u=k(n);x(t,u+2,B(r,0)),x(t,u+1,B(r,1)),x(t,u,B(r,2));break}case 85:{const r=I(e),u=k(n);for(let e=0;e<=r;e++)x(t,u+e,d(n,e));break}case 101:{const r=I(e),u=k(n);for(let e=0;e<=r;e++)G(n,e,j(t,u+e));break}}break}return b(n)}function on(n){const e=(r=function(n,e){return function(n,e,r){return n.bytes.subarray(e,e+r)}(an(n),e,i)}(n,function(n){return b(cn(n))}(n)),{uint8:new Uint8Array(r),uint16:new Uint16Array([r[m]<<8|r[T]])});var r;const t=un(n.processor,e,n.stack,n.memory,n.display,n.keyboard);var u;return nn(u=n.memory)>0&&rn(u,nn(u)-1),function(n,e){en(n)>0&&tn(n,en(n)-1)}(n.memory,n.onSoundTime),t}function cn(n){return n.processor}function an(n){return n.memory}let fn=null,sn=()=>{},bn=1e3/60,ln=null;function kn(){var n;n=ln,Atomics.wait(n.buffer,n.index,o),on(fn)}self.addEventListener("message",n=>{const{data:{eventType:e,payload:r}}=n;switch(e){case t.INIT:fn=r.chip8,ln=function(n,e){return{buffer:new Int32Array(n),index:e}}(function(n){return n.bytes}(an(fn)).buffer,127),self.postMessage(function(n,e=!1){return{eventType:t.INIT,payload:{chip8:n},error:e}}(fn,!1));break;case t.RUN_LOOP:sn(),function(n){e=setInterval(kn,n),sn=function(){clearInterval(e)},kn();var e}(bn),self.postMessage(function(n=!1){return{eventType:t.RUN_LOOP,payload:null,error:n}}(!1));break;case t.SET_LOOP_MODE:bn=r.mode,self.postMessage(function(n,e=!1){return{eventType:t.SET_LOOP_MODE,payload:{mode:n},error:e}}(r.mode,!1));break;case t.EXECUTE_NEXT_INSTRUCTION:on(fn),self.postMessage(function(n=!1){return{eventType:t.EXECUTE_NEXT_INSTRUCTION,payload:null,error:n}}(!1));break;case t.STOP_LOOP:sn(),self.postMessage(function(n=!1){return{eventType:t.STOP_LOOP,payload:null,error:n}}(!1))}})}]);