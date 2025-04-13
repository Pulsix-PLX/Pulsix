import{m as J,l as m,H as X,o as N,n as C,t as E,q as o,e as B,B as F,w as O,z as s,c as e,g as Y,G as A,M as k}from"./web-DcXN-p99.js";import{s as q}from"./Menu-kyhemyOT.js";import{s as Q,n as $,P as W}from"./index-DcaoqgVt.js";import{B as j}from"./ButtonSparkle-CX-W2frl.js";import{S as L,a as Z,I as u,b as w,g as ee}from"./Inputs-hvbb28Ka.js";import{E as te}from"./Title-BAWdhi0q.js";import{s as T}from"./index.module-B9JvMj-k.js";import{a as re}from"./index-D8rVyQy1.js";import{O as ne,P as ae}from"./otpInput-DeXMA6XN.js";import"./components-BQhjVazl.js";import"./routing-BUmn5GEU.js";import"./icons-ChlcGNuY.js";import"./server-runtime-6wq6LtAi.js";import"./action-CDr_hENZ.js";var ie=E("<div>");function P(t){const[l,f]=m(t.in?0:1),[c,a]=m(t.in?"block":"none"),[i,d]=m(""),p=t.fadeIn||300,g=t.fadeOut||500,y=t.fadeInEasing||"ease-out",v=t.fadeOutEasing||"ease-in";return X(()=>{let r;t.in?(d(`opacity ${p}ms ${y}`),a("block"),r=setTimeout(()=>f(1),10)):(d(`opacity ${g}ms ${v}`),f(0),r=setTimeout(()=>a("none"),g)),N(()=>clearTimeout(r))}),(()=>{var r=C(ie);return r.style.setProperty("overflow","hidden"),o(r,()=>t.children),B(n=>{var _=t.class,x=l(),h=c(),b=i(),S=c()==="none"?0:"auto";return _!==n.e&&F(r,n.e=_),x!==n.t&&((n.t=x)!=null?r.style.setProperty("opacity",x):r.style.removeProperty("opacity")),h!==n.a&&((n.a=h)!=null?r.style.setProperty("display",h):r.style.removeProperty("display")),b!==n.o&&((n.o=b)!=null?r.style.setProperty("transition",b):r.style.removeProperty("transition")),S!==n.i&&((n.i=S)!=null?r.style.setProperty("height",S):r.style.removeProperty("height")),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),r})()}J(["click"]);var oe=E('<div><!$><!/><form class="w-300 mt-100"><!$><!/><!$><!/><!$><!/><!$><!/><!$><!/><!$><!/><!$><!/>');function se(){return O(()=>{L({}),Z({})}),(()=>{var t=C(oe),l=t.firstChild,[f,c]=s(l.nextSibling),a=f.nextSibling,i=a.firstChild,[d,p]=s(i.nextSibling),g=d.nextSibling,[y,v]=s(g.nextSibling),r=y.nextSibling,[n,_]=s(r.nextSibling),x=n.nextSibling,[h,b]=s(x.nextSibling),S=h.nextSibling,[I,V]=s(S.nextSibling),z=I.nextSibling,[M,K]=s(z.nextSibling),G=M.nextSibling,[H,R]=s(G.nextSibling);return t.style.setProperty("justify-items","center"),o(t,e(te,{title:"Credentials",class:"-mt-40"}),f,c),a.addEventListener("submit",U=>U.preventDefault()),a.style.setProperty("justify-items","center"),o(a,e(u,{name:"username",type:"username",placeholder:"Username",required:!0}),d,p),o(a,e(u,{name:"password",type:"password",placeholder:"Password",required:!0}),y,v),o(a,e(u,{name:"passwordConfirm",type:"passwordConfirm",placeholder:"Confirm",required:!0}),n,_),o(a,e(u,{name:"name",type:"text",placeholder:"Name",required:!0}),h,b),o(a,e(u,{name:"surname",type:"text",placeholder:"Surmane",required:!0}),I,V),o(a,e(u,{name:"dateOfBirthday",type:"date",placeholder:"Surmane",required:!0}),M,K),o(a,e(j,{shadow:10,text:"Next",get disabled(){return!w()},class:"h-50",onClick:()=>{Q($()+1)}}),H,R),B(()=>F(t,`w-500 ${T.formContainer} ${w()?T.valid:""}`)),t})()}var le=E('<form class="w-300 mt-100"><!$><!/><!$><!/>');const[D,de]=m("");function ce(){const[t,l]=m("wait"),[f,c]=m("");Y(()=>{$()==1&&L("email",!1)});async function a(){try{de(Math.floor(1e5+Math.random()*9e5).toString());const d=await re.post("https://api.brevo.com/v3/smtp/email",{sender:{name:"Pulsix",email:"pulsixcustomer@outlook.com"},to:[{email:ee("email")}],subject:"Pulsix verification code",htmlContent:`
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
            
            <div class="code">${D()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `},{headers:{"api-key":"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","Content-Type":"application/json"}});c("success")}catch(i){console.error("Error sending email:",i),c("error")}}return e(A,{get children(){return[e(k,{get when(){return t()=="wait"},get children(){var i=C(le),d=i.firstChild,[p,g]=s(d.nextSibling),y=p.nextSibling,[v,r]=s(y.nextSibling);return i.addEventListener("submit",n=>n.preventDefault()),i.style.setProperty("justify-items","center"),o(i,e(u,{type:"email",name:"email",placeholder:"Email",get mountOn(){return $()==1},required:!0}),p,g),o(i,e(j,{shadow:10,text:"Send code",get disabled(){return!w()},class:"h-50 mb-30",onClick:()=>{a(),l("sended")}}),v,r),i}}),e(k,{get when(){return t()=="sended"},get children(){return e(ne,{get code(){return D()}})}})]}})}const[ue]=m(!0);function me(){return O(()=>{const t=l=>{if(ue())return l.preventDefault(),l.returnValue="reload","nada"};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),null}function Ee(){return O(()=>{q(!1)}),N(()=>{q(!0)}),[e(me,{}),e(P,{in:!0,fadeIn:4e3,fadeOut:300,class:"CM -mt-30",get children(){return e(W,{})}}),e(P,{get in(){return $()==0},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(se,{})}}),e(P,{get in(){return $()==1},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(ce,{})}}),e(P,{get in(){return $()==2},fadeIn:2e3,fadeOut:300,class:"CM mt-140",get children(){return e(ae,{})}})]}export{Ee as default};
