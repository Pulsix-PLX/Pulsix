import{g as y,t as v,b as s,i as l}from"./web-DpIebe6J.js";import{a as S}from"./index-Ckjqp3wL.js";import{k as r,f as $,a as t,M as c,v as P}from"./solid-DuWri35y.js";import{B as w}from"./ButtonSparkle-B8MvXRxa.js";import{S as k,I as C,a as I,g as _}from"./Inputs-DcqJwVVk.js";import{O as E}from"./otpInput-BXc_Jx1f.js";import{n as m}from"./index-BfCmSeNt.js";import"./index-BbP3371Q.js";import"./index-BAMY2Nnw.js";import"./index-CgqXENQe.js";import"./store-EkIb7068.js";import"./server-runtime-G1njbCYf.js";import"./action-Dtdjs7R9.js";import"./routing-CrKy3yVb.js";import"./icons-DnmAahPX.js";var O=v('<form class="w-300 mt-100"><!$><!/><!$><!/>');const[p,M]=r("");function G(){const[a,d]=r("wait"),[T,i]=r("");$(()=>{m()==1&&k("email",!1)});async function u(){try{M(Math.floor(1e5+Math.random()*9e5).toString());const o=await S.post("https://api.brevo.com/v3/smtp/email",{sender:{name:"Pulsix",email:"pulsixcustomer@outlook.com"},to:[{email:_("email")}],subject:"Pulsix verification code",htmlContent:`
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
            
            <div class="code">${p()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `},{headers:{"api-key":"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","Content-Type":"application/json"}});i("success")}catch(e){console.error("Error sending email:",e),i("error")}}return t(P,{get children(){return[t(c,{get when(){return a()=="wait"},get children(){var e=y(O),o=e.firstChild,[n,f]=s(o.nextSibling),g=n.nextSibling,[h,x]=s(g.nextSibling);return e.addEventListener("submit",b=>b.preventDefault()),e.style.setProperty("justify-items","center"),l(e,t(C,{type:"email",name:"email",placeholder:"Email",get mountOn(){return m()==1},required:!0}),n,f),l(e,t(w,{shadow:10,text:"Send code",get disabled(){return!I()},class:"h-50 mb-30",onClick:()=>{u(),d("sended")}}),h,x),e}}),t(c,{get when(){return a()=="sended"},get children(){return t(E,{get code(){return p()}})}})]}})}export{p as code,G as default,M as setCode};
