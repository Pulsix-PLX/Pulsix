import{l as a,g as y,c as t,M as s,n as v,t as S,z as l,q as c,G as $}from"./web-DcXN-p99.js";import{a as P}from"./index-D8rVyQy1.js";import{B as w}from"./ButtonSparkle-CX-W2frl.js";import{S as C,I,b as _,g as k}from"./Inputs-hvbb28Ka.js";import{O as E}from"./otpInput-DeXMA6XN.js";import{n as m}from"./index-DcaoqgVt.js";import"./server-runtime-6wq6LtAi.js";import"./action-CDr_hENZ.js";import"./routing-BUmn5GEU.js";import"./icons-ChlcGNuY.js";var O=S('<form class="w-300 mt-100"><!$><!/><!$><!/>');const[p,M]=a("");function H(){const[r,d]=a("wait"),[T,i]=a("");y(()=>{m()==1&&C("email",!1)});async function u(){try{M(Math.floor(1e5+Math.random()*9e5).toString());const o=await P.post("https://api.brevo.com/v3/smtp/email",{sender:{name:"Pulsix",email:"pulsixcustomer@outlook.com"},to:[{email:k("email")}],subject:"Pulsix verification code",htmlContent:`
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
        `},{headers:{"api-key":"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","Content-Type":"application/json"}});i("success")}catch(e){console.error("Error sending email:",e),i("error")}}return t($,{get children(){return[t(s,{get when(){return r()=="wait"},get children(){var e=v(O),o=e.firstChild,[n,f]=l(o.nextSibling),g=n.nextSibling,[h,x]=l(g.nextSibling);return e.addEventListener("submit",b=>b.preventDefault()),e.style.setProperty("justify-items","center"),c(e,t(I,{type:"email",name:"email",placeholder:"Email",get mountOn(){return m()==1},required:!0}),n,f),c(e,t(w,{shadow:10,text:"Send code",get disabled(){return!_()},class:"h-50 mb-30",onClick:()=>{u(),d("sended")}}),h,x),e}}),t(s,{get when(){return r()=="sended"},get children(){return t(E,{get code(){return p()}})}})]}})}export{p as code,H as default,M as setCode};
