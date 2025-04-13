import{c as f}from"./server-fns-runtime-4T1EILgx.js";import{d as h}from"./db.server-BYnrqg0d.js";import{createComponent as o,ssr as u,ssrHydrationKey as d,ssrAttribute as p,escape as t}from"solid-js/web";import{createSignal as g,Show as y,createResource as b,Switch as x,Match as $,Suspense as W,lazy as D}from"solid-js";import{C as L,a as S,b as v}from"./prova-UkNyxD49.js";import{e as C,s as _}from"./index-CM2EfUOf.js";import{A}from"./components-CJF4pMQg.js";import{I as m}from"./Inputs-CEYxPBfP.js";import{g as O,s as N,a as c,d as k}from"./deleteWallet-D6_HIjzQ.js";import{B as w}from"./ButtonSparkle-DNpTyev3.js";const R=f(async function(r){if(console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${r}`),isNaN(r))throw new Error("User ID non valido fornito a fetchWalletsForUserId.");try{return(await h.query("SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name",[r])).rows??[]}catch(l){throw console.error("[Server Function:fetchWalletsForUserId] Errore DB:",l),new Error("Errore recupero wallets.")}},"src_routes_API_Wallets_getWallets_server_ts--getWallets_1","C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="),re=R,M=f(async function(r,l){const n="[Server Function:getWalletsContainerEnhancedWithDeleteCheck]";if(console.log(`${n} Fetching per userId: ${r}, containerId: ${l}`),isNaN(r))throw console.error(`${n} User ID non valido fornito.`),new Error("User ID non valido fornito.");if(l!==null&&(typeof l!="number"||isNaN(l)))throw console.error(`${n} Container ID non valido fornito (Type: ${typeof l}, Value: ${l}).`),new Error("Container ID non valido fornito.");const i=l===null;try{const a=`
            WITH CombinedWallets AS (
                -- Selezione 1: Figli diretti (Livello N) - Devono essere NON eliminati
                SELECT
                    wn.*
                FROM
                    wallets wn
                WHERE
                    wn.user_id = $1
                    AND ${i?"wn.container_id IS NULL":"wn.container_id = $2"}
                    AND wn.date_of_delete IS NULL  -- <<< Aggiunto: Esclude elementi eliminati al Livello N

                UNION ALL

                -- Selezione 2: Figli dei Sotto-Container (Livello N+1)
                -- Devono essere NON eliminati E il loro genitore container (Livello N) NON deve essere eliminato
                SELECT
                    w_n_plus_1.*
                FROM
                    wallets w_n_plus_1
                JOIN
                    wallets wn ON w_n_plus_1.container_id = wn.id -- Join con il genitore (Livello N)
                WHERE
                    wn.user_id = $1                                   -- Genitore appartiene all'utente
                    AND ${i?"wn.container_id IS NULL":"wn.container_id = $2"} -- Genitore è al Livello N corretto
                    AND wn.type = 'container'                       -- Genitore è un container
                    AND wn.date_of_delete IS NULL                   -- <<< Aggiunto: Genitore NON deve essere eliminato
                    AND w_n_plus_1.user_id = $1                     -- Nipote appartiene all'utente
                    AND w_n_plus_1.date_of_delete IS NULL           -- <<< Aggiunto: Nipote NON deve essere eliminato
                    -- Potresti aggiungere qui "AND w_n_plus_1.type = 'wallet'" se vuoi SOLO i wallet al livello N+1
            )
            -- Seleziona tutto dalla CTE e ordina
            SELECT *
            FROM CombinedWallets
            ORDER BY
                COALESCE(container_id, -1), -- Raggruppa per genitore (root prima)
                type DESC,                  -- Container prima di wallet all'interno del gruppo
                wallet_name;                -- Ordine alfabetico per nome
        `,s=i?[r]:[r,l];return console.log(`${n} Query: ${a.replace(/\s+/g," ").trim()}, Params: ${JSON.stringify(s)}`),(await h.query(a,s)).rows??[]}catch(a){throw console.error(`${n} Errore DB:`,a),a.code&&console.error(`DB Error Code: ${a.code}, Message: ${a.message}`),new Error(`Errore DB durante recupero enhanced wallets (con check delete) per container ${l}.`)}},"src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1","C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="),le=M;f(async function(r){const l="[Server Function:getRecursiveWalletBalance]";if(console.log(`${l} Calcolo somma per container ID: ${r}`),typeof r!="number"||isNaN(r)||r<=0)throw console.error(`${l} ID container non valido fornito: ${r}`),new Error("ID container di partenza non valido.");try{const n=`
            WITH RECURSIVE ContainerHierarchy AS (
                -- Anchor Member: Seleziona i figli diretti del container iniziale ($1)
                -- che NON sono stati eliminati. Include anche il tipo per filtrare dopo.
                SELECT
                    id, balance, container_id, type -- Includi 'type'
                FROM
                    public.wallets
                WHERE
                    container_id = $1
                    AND date_of_delete IS NULL -- <<< Filtro: Esclude figli diretti eliminati

                UNION ALL

                -- Recursive Member: Seleziona i figli (w) degli elementi già trovati (ch)
                -- assicurandosi che i figli (w) NON siano stati eliminati.
                -- La ricorsione si ferma automaticamente se un container 'ch' era eliminato
                -- perché non sarebbe stato selezionato nel passo precedente.
                SELECT
                    w.id, w.balance, w.container_id, w.type -- Includi 'type'
                FROM
                    public.wallets w
                JOIN
                    ContainerHierarchy ch ON w.container_id = ch.id -- Join con il risultato precedente
                WHERE
                    w.date_of_delete IS NULL -- <<< Filtro: Esclude nipoti (o livelli inferiori) eliminati
            )
            -- Seleziona la somma dei bilanci dalla gerarchia risultante,
            -- MA SOLO per gli elementi che sono di tipo 'wallet'.
            -- Usa COALESCE per restituire 0 se non ci sono wallet o SUM è NULL.
            SELECT COALESCE(SUM(balance), 0) AS total_balance
            FROM ContainerHierarchy
            WHERE type = 'wallet'; -- <<< Filtro: Somma solo i bilanci dei WALLET effettivi
        `,i=[r];console.log(`${l} Query: ${n.replace(/\s+/g," ").trim()}, Params: ${JSON.stringify(i)}`);const s=(await h.query(n,i)).rows?.[0]?.total_balance??0;return console.log(`${l} Somma calcolata: ${s} per container ID: ${r}`),s}catch(n){throw console.error(`${l} Errore DB durante calcolo somma ricorsiva per ${r}:`,n),n.code&&console.error(`DB Error Code: ${n.code}, Message: ${n.message}`),new Error(`Errore recupero somma wallets per container ${r}.`)}},"src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1","C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=");const U=f(async function(r){try{return(await h.query("SELECT wallet_name, type FROM wallets WHERE id = $1;",[r])).rows??[]}catch(l){throw console.error("[Server Function:getWalletsSub] Errore DB:",l),new Error("Errore recupero somma wallets.")}},"src_routes_API_Wallets_getWallets_server_ts--getWalletName_1","C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="),oe=U;var F=["<img",' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];function ne(e){const[r,l]=g(!1);return o(A,{get href(){return e.href},onclick:i=>{console.log("Link clicked. Edit mode:",C()),C()?(console.log("Preventing default link action and stopping propagation because edit=true"),i.preventDefault(),i.stopPropagation()):e.onClick&&(console.log("Executing props.onclick"),e.onClick())},onmouseenter:()=>l(!0),onmouseleave:()=>l(!1),get children(){return o(L,{get children(){return o(S,{class:"border-black border-4 w-[20vw] h-[12vw] rounded-xl -mt-100",get color(){return e.color},get children(){return[o(v,{translateZ:10,class:"absolute ml-[16.5vw] mt-[8.6vw]",as:"button",get children(){return o(y,{get when(){return r()},get children(){return u(F,d())}})}}),o(v,{translateZ:20,class:"text-white text-[1vw] text-center mt-[1vw]",get children(){return e.name}}),o(v,{as:"p",translateZ:40,class:"text-white text-[1vw] text-center",get children(){return[e.balance,e.currency=="USD"?"$":e.currency=="EUR"?"€":e.currency]}})]}})}})}})}var I=["<img",' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50">'],P=["<form",' method="post" class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="','"><input type="hidden" name="id"','><input type="hidden" name="type"',"><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->",'<!--/--><button type="button" class="','" style="','">Delete</button></form>'],T=["<img",' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50">'],z=["<form",' method="post" class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="','"><input type="hidden" name="id"','><input type="hidden" name="type"',"><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->","<!--/--><!--$-->",'<!--/--><div class="color-picker-container" style="','">','</div><input type="hidden"',' name="color"><!--$-->','<!--/--><button type="button" class="','" style="','">Delete</button></form>'],B=["<div",' class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>'],H=["<div",' class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50" style="','"><p class="','">Are you sure to delete this wallet?</p><p class="','">It will be in the trash</p><p class="','">you can restore it in 30 days</p><div class="flex flex-row justify-center items-center gap-34 mt-[3vw]"><!--$-->',"<!--/--><!--$-->","<!--/--></div></div>"],q=["<div",">Loading Color Picker...</div>"];const V=D(()=>import("./index-WwoiZKEg.js").then(e=>({default:e.DefaultColorPicker})));function ae(){const[e]=b(C(),O),[r,l]=g(),[n,i]=g(!1),[a,s]=g(null);return o(y,{get when(){return e()},get children(){return[o(x,{get children(){return[o($,{get when(){return e()?.type=="container"},get children(){return[u(I,d()),u(P,d()+p("action",t(N,!0),!1),"border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px",p("value",t(e()?.id,!0),!1),p("value",t(e()?.type,!0),!1),t(o(m,{type:"text",name:"walletName",placeholder:"Wallet Name",get defaultValue(){return e()?.wallet_name}})),t(o(m,{type:"text",name:"category_id",placeholder:"Category",get defaultValue(){return e()?.category_id?.toString()}})),t(o(w,{get text(){return`Set ${e()?.type=="container"?"Container":"Wallet"}`},class:"ml-[auto] mr-[auto]",onClick:()=>setTimeout(()=>_(null),500)})),` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${t(c.buttonDelete,!0)}`,"border:2px solid red;border-radius:20px;width:100px;height:50px")]}}),o($,{get when(){return e()?.type=="wallet"},get children(){return[u(T,d()),u(z,d()+p("action",t(N,!0),!1),`border:3px solid ${t(r(),!0)};border-radius:40px`,p("value",t(e()?.id,!0),!1),p("value",t(e()?.type,!0),!1),t(o(m,{type:"text",name:"walletName",placeholder:"Wallet Name",get defaultValue(){return e()?.wallet_name}})),t(o(m,{type:"text",name:"currency",placeholder:"Currency",get defaultValue(){return e()?.currency}})),t(o(m,{type:"text",name:"category_id",placeholder:"Category",get defaultValue(){return e()?.category_id?.toString()}})),t(o(m,{type:"text",name:"nation",placeholder:"nation",get defaultValue(){return e()?.nation}})),"margin-bottom:2rem",t(o(W,{get fallback(){return u(q,d())},get children(){return o(V,{get value(){return r()||e()?.color||"#ff000000"},onChange:E=>l(E),format:"hex"})}})),p("value",t(r(),!0)||t(e()?.color,!0)||"#ff000000",!1),t(o(w,{get text(){return`Set ${e()?.type=="container"?"Container":"Wallet"}`},class:"ml-[auto] mr-[auto]",size:"large",get shadowColor(){return`${r()}`},shadow:10,onClick:()=>setTimeout(()=>_(null),500)})),` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${t(c.buttonDelete,!0)}`,"border:2px solid red;border-radius:20px;width:100px;height:50px")]}})]}}),o(y,{get when(){return n()},get children(){return[u(B,d()),u(H,d(),`background-color:#151515;border-radius:40px;border:3px solid ${t(r(),!0)||"#ffffffff"}`,`${t(c.text,!0)} text-[1.4vw] font-bold text-center`,`${a()=="cancel"?t(c.textCancel,!0):a()=="confirm"?t(c.textDelete,!0):t(c.paragraf,!0)} text-[1vw] font-bold text-center mt-[2vw]`,`${a()=="cancel"?t(c.textCancel,!0):a()=="confirm"?t(c.textDelete,!0):t(c.paragraf,!0)} text-[1vw] font-bold text-center mt-[0.5vw]`,t(o(w,{text:"Cancel",onClick:()=>i(!1),shadowColor:"hsl(0, 100%, 54%)",onMouseEnter:()=>s("cancel"),onMouseLeave:()=>s(null),shadow:10})),t(o(w,{shadowColor:"hsla(155, 100%, 50%, 0.922)",text:"Delete",shadow:10,onClick:async()=>{await k(e()?.id,e()?.type),setTimeout(()=>_(null),500)},onMouseEnter:()=>s("confirm"),onMouseLeave:()=>s(null)})))]}})]}})}export{ae as S,ne as W,le as a,oe as b,re as g};
