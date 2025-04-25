import{createComponent as e,ssr as l,ssrHydrationKey as d,escape as a}from"solid-js/web";import u from"axios";import{createSignal as t,createMemo as f,Switch as h,Match as n}from"solid-js";import{B as g}from"./assets/ButtonSparkle-BxHzGCPC.js";import{S as x,I as y,a as b,g as v}from"./assets/Inputs-D1T1pLkj.js";import{O as S}from"./assets/otpInput-DH-dkh0p.js";import{n as s}from"./assets/index-CI1g57kZ.js";import"solid-js/store";import"gsap";import"./assets/server-fns-runtime-C3tiYEg6.js";import"solid-js/web/storage";import"./assets/fetchEvent-9EzSf9d7.js";import"h3";import"vite-plugin-node-polyfills/shims/global";import"node:async_hooks";import"./assets/db.server-CDeyn5Z_.js";import"vite-plugin-node-polyfills/shims/process";import"pg";import"./assets/action-BR9kmesq.js";import"./assets/routing-BRXp7sqN.js";import"bcryptjs";import"firebase/app";import"firebase/analytics";import"firebase/auth";import"./assets/icons-N8M97GAt.js";var w=["<form",' class="','" style="','"><!--$-->',"<!--/--><!--$-->","<!--/--></form>"];const[m,P]=t("");function U(){const[r,p]=t("wait"),[I,o]=t("");f(()=>{s()==1&&x("email",!1)});async function c(){try{P(Math.floor(1e5+Math.random()*9e5).toString());const C=await u.post("https://api.brevo.com/v3/smtp/email",{sender:{name:"Pulsix",email:"pulsixcustomer@outlook.com"},to:[{email:v("email")}],subject:"Pulsix verification code",htmlContent:`
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
            
            <div class="code">${m()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `},{headers:{"api-key":"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","Content-Type":"application/json"}});o("success")}catch(i){console.error("Error sending email:",i),o("error")}}return e(h,{get children(){return[e(n,{get when(){return r()=="wait"},get children(){return l(w,d(),"w-300 mt-100","justify-items:center",a(e(y,{type:"email",name:"email",placeholder:"Email",get mountOn(){return s()==1},required:!0})),a(e(g,{shadow:10,text:"Send code",get disabled(){return!b()},class:"h-50 mb-30",onClick:()=>{c(),p("sended")}})))}}),e(n,{get when(){return r()=="sended"},get children(){return e(S,{get code(){return m()}})}})]}})}export{m as code,U as default,P as setCode};
