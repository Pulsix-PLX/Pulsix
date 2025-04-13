import{ssr as h,ssrHydrationKey as g,ssrAttribute as T,escape as t,createComponent as e}from"solid-js/web";import{createSignal as n,createEffect as q,onCleanup as $,onMount as y,createMemo as M,Switch as k,Match as x}from"solid-js";import{s as b}from"./assets/Menu-CNxWw250.js";import{s as F,n as o,P as j}from"./assets/index-CI1g57kZ.js";import{B as O}from"./assets/ButtonSparkle-DNpTyev3.js";import{S as I,a as B,b as f,I as a,g as D}from"./assets/Inputs-BxVpbjg0.js";import{E as K}from"./assets/Title-C8lsFfVd.js";import{s as v}from"./assets/index.module-B9JvMj-k.js";import N from"axios";import{O as V,P as _}from"./assets/otpInput-Jfxp9i2z.js";import"./assets/components-eKl611cl.js";import"./assets/routing-DxIlI4R1.js";import"./assets/icons-N8M97GAt.js";import"solid-js/store";import"gsap";import"./assets/db.server-Cxzv6220.js";import"solid-js/web/storage";import"./assets/fetchEvent-Ce2Ui3zq.js";import"h3";import"node:async_hooks";import"pg";import"./assets/action-DzH6FtPs.js";import"bcryptjs";import"firebase/app";import"firebase/analytics";import"firebase/auth";var z=["<div",' style="','">',"</div>"];function m(r){const[i,c]=n(r.in?0:1),[s,l]=n(r.in?"block":"none"),[d,u]=n(""),E=r.fadeIn||300,w=r.fadeOut||500,P=r.fadeInEasing||"ease-out",S=r.fadeOutEasing||"ease-in";return q(()=>{let p;r.in?(u(`opacity ${E}ms ${P}`),l("block"),p=setTimeout(()=>c(1),10)):(u(`opacity ${w}ms ${S}`),c(0),p=setTimeout(()=>l("none"),w)),$(()=>clearTimeout(p))}),h(z,g()+T("class",t(r.class,!0),!1),"opacity:"+t(i(),!0)+(";display:"+t(s(),!0))+(";transition:"+t(d(),!0))+(";height:"+(s()==="none"?0:"auto"))+";overflow:hidden",t(r.children))}var H=["<div",' class="','" style="','"><!--$-->','<!--/--><form class="','" style="','"><!--$-->',"<!--/--><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->","<!--/--></form></div>"];function L(){return y(()=>{I({}),B({})}),h(H,g(),`w-500 ${t(v.formContainer,!0)} ${f()?t(v.valid,!0):""}`,"justify-items:center",t(e(K,{title:"Credentials",class:"-mt-40"})),"w-300 mt-100","justify-items:center",t(e(a,{name:"username",type:"username",placeholder:"Username",required:!0})),t(e(a,{name:"password",type:"password",placeholder:"Password",required:!0})),t(e(a,{name:"passwordConfirm",type:"passwordConfirm",placeholder:"Confirm",required:!0})),t(e(a,{name:"name",type:"text",placeholder:"Name",required:!0})),t(e(a,{name:"surname",type:"text",placeholder:"Surmane",required:!0})),t(e(a,{name:"dateOfBirthday",type:"date",placeholder:"Surmane",required:!0})),t(e(O,{shadow:10,text:"Next",get disabled(){return!f()},class:"h-50",onClick:()=>{F(o()+1)}})))}var U=["<form",' class="','" style="','"><!--$-->',"<!--/--><!--$-->","<!--/--></form>"];const[C,A]=n("");function G(){const[r,i]=n("wait"),[c,s]=n("");M(()=>{o()==1&&I("email",!1)});async function l(){try{A(Math.floor(1e5+Math.random()*9e5).toString());const u=await N.post("https://api.brevo.com/v3/smtp/email",{sender:{name:"Pulsix",email:"pulsixcustomer@outlook.com"},to:[{email:D("email")}],subject:"Pulsix verification code",htmlContent:`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .code {
                font-size: 24px;
                font-weight: bold;
                color: #4a4a4a;
                background-color: #000000;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                letter-spacing: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h2>Pulsix verification code</h2>
            <p>Ecco il tuo codice di verifica:</p>
            
            <div class="code">${C()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `},{headers:{"api-key":"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","Content-Type":"application/json"}});s("success")}catch(d){console.error("Error sending email:",d),s("error")}}return e(k,{get children(){return[e(x,{get when(){return r()=="wait"},get children(){return h(U,g(),"w-300 mt-100","justify-items:center",t(e(a,{type:"email",name:"email",placeholder:"Email",get mountOn(){return o()==1},required:!0})),t(e(O,{shadow:10,text:"Send code",get disabled(){return!f()},class:"h-50 mb-30",onClick:()=>{l(),i("sended")}})))}}),e(x,{get when(){return r()=="sended"},get children(){return e(V,{get code(){return C()}})}})]}})}const[J]=n(!0);function R(){return y(()=>{const r=i=>{if(J())return i.preventDefault(),i.returnValue="reload","nada"};return window.addEventListener("beforeunload",r),()=>{window.removeEventListener("beforeunload",r)}}),null}function ve(){return y(()=>{b(!1)}),$(()=>{b(!0)}),[e(R,{}),e(m,{in:!0,fadeIn:4e3,fadeOut:300,class:"CM -mt-30",get children(){return e(j,{})}}),e(m,{get in(){return o()==0},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(L,{})}}),e(m,{get in(){return o()==1},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(G,{})}}),e(m,{get in(){return o()==2},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(_,{})}})]}export{ve as default};
