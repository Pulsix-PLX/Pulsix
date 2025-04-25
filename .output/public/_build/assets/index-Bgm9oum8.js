const b="http://localhost:3000",w="/login";function C(t={}){const{widgetId:n,popupOptions:o={},onComplete:r}=t,g=window.location.origin,x=window.location.href;console.log(`Pulsix SDK chiamato da: Origin=${g}, Href=${x}`);let i=`${b}${w}`;if(n){const e=i.includes("?")?"&":"?";i+=`${e}widgetId=${encodeURIComponent(n)}`}const a=new URL(b).origin,u=500,d=700,m={width:u,height:d,left:window.screenX+(window.outerWidth-u)/2,top:window.screenY+(window.outerHeight-d)/2,scrollbars:"yes",...o},c=Object.entries(m).map(([e,f])=>`${e}=${f}`).join(",");console.log("Window Features String:",c),console.log("openURL:",i);const s=window.open(i,"SolidStart_TransactionPopup",c);if(!s||s.closed||typeof s.closed>"u"){alert("Popup bloccata! Abilita le popup per questo sito per continuare.");return}let l=null;r&&typeof r=="function"&&(l=e=>{if(e.origin!==a){console.warn("Ignored message from unexpected origin:",e.origin,"Expected:",a);return}e.source===s&&e.data&&e.data.type==="transactionComplete"&&(r(e.data),l&&window.removeEventListener("message",l))},window.addEventListener("message",l,!1))}let h=null;typeof HTMLElement<"u"&&(h=class extends HTMLElement{constructor(){super(),this._buttonElement=null,this._popupConfig={},this._defaultButtonColor="#007bff",this.handleClick=()=>{this.disabled||C(this._popupConfig)},this.attachShadow({mode:"open"}),console.log("[Pulsix WC] Constructor finished.")}static get observedAttributes(){return["button-text","widget-id","popup-config-json","disabled","button-color"]}attributeChangedCallback(t,n,o){console.log(`[Pulsix WC] attributeChangedCallback: ${t} changed from ${n} to ${o}`),t==="button-text"&&this._buttonElement&&o!==null?this._buttonElement.textContent=o:t==="button-text"&&this._buttonElement&&o===null&&(this._buttonElement.textContent="Pulsix"),t==="widget-id"&&o!==null&&(this._popupConfig={...this._popupConfig,widgetId:o},console.log("[Pulsix WC] Config updated from attribute (widgetId):",this._popupConfig)),t==="disabled"&&this._buttonElement&&(this._buttonElement.disabled=o!==null,console.log(`[Pulsix WC] Button disabled state: ${this._buttonElement.disabled}`)),t==="button-color"&&(o?(this.style.setProperty("--pulsix-button-background",o),console.log(`[Pulsix WC] Applied button-color: ${o}`)):(this.style.removeProperty("--pulsix-button-background"),console.log("[Pulsix WC] Reverted to default button-color.")))}set popupConfig(t){this._popupConfig=t}get popupConfig(){return this._popupConfig}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get disabled(){return this.hasAttribute("disabled")}set buttonColor(t){t?this.setAttribute("button-color",t):this.removeAttribute("button-color")}get buttonColor(){return this.getAttribute("button-color")}connectedCallback(){var t;console.log("[Pulsix WC] connectedCallback: CALLED"),(t=this.shadowRoot)!=null&&t.firstChild||this.render();const n=this.getAttribute("button-color");n&&this.style.setProperty("--pulsix-button-background",n),this.addClickListener(),this.updateInitialDisabledState()}disconnectedCallback(){this._buttonElement&&this._buttonElement.removeEventListener("click",this.handleClick)}addClickListener(){this._buttonElement&&!this._buttonElement.onclick&&this._buttonElement.addEventListener("click",this.handleClick)}updateInitialDisabledState(){this._buttonElement&&this.hasAttribute("disabled")&&(this._buttonElement.disabled=!0)}render(){if(console.log("[Pulsix WC] render: START"),!!this.shadowRoot){this.shadowRoot.innerHTML="";try{const t=document.createElement("style");t.textContent=`
                :host {
                    display: inline-block;
                    font-family: sans-serif;
                    /* Colore di base (default o sovrascritto da attributo/JS) */
                    --pulsix-button-background: ${this._defaultButtonColor}; /* Es: #007bff */
                    --pulsix-button-text-color: white;
                    --pulsix-button-padding: 12px 24px;
                    --pulsix-button-border-radius: 6px;
                    /* Variabili hover/active rimosse - verranno calcolate */
                    --pulsix-button-disabled-background: #cccccc;
                    --pulsix-button-disabled-color: #666666;
                    --pulsix-focus-ring-color: rgba(0, 123, 255, 0.5);
                    transition: transform 0.2s ease-out;
                }
    
                button {
                    cursor: pointer;
                    border: none;
                    background-color: var(--pulsix-button-background); /* Usa la variabile base */
                    color: var(--pulsix-button-text-color);
                    padding: var(--pulsix-button-padding);
                    border-radius: var(--pulsix-button-border-radius);
                    font-size: 1.05rem;
                    font-weight: 500;
                    outline: none;
                    white-space: nowrap;
                    /* Transizione per background-color ora userà i valori calcolati */
                    transition: background-color 0.2s ease-in-out,
                                transform 0.2s ease-out,
                                box-shadow 0.25s ease-in-out;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
    
                /* --- Effetti Hover con color-mix --- */
                button:not([disabled]):hover {
                    /* Mescola il colore base con 15% di nero per scurirlo */
                    /* 'in srgb' è lo spazio colore standard */
                    background-color: color-mix(in srgb, var(--pulsix-button-background) 85%, black 15%);
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }
    
                /* --- Effetti Active con color-mix --- */
                button:not([disabled]):active {
                     /* Mescola il colore base con 30% di nero per scurirlo di più */
                    background-color: color-mix(in srgb, var(--pulsix-button-background) 70%, black 30%);
                    transform: scale(0.99);
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                }
    
                /* Regole :focus-visible e [disabled] come prima */
                button:not([disabled]):focus-visible {
                     box-shadow: 0 0 0 3px var(--pulsix-focus-ring-color),
                                 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                button[disabled] {
                    background-color: var(--pulsix-button-disabled-background);
                    color: var(--pulsix-button-disabled-color);
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
    
                /* Animazione pulse (invariata) */
                @keyframes pulseAnimation { /* ... */ }
                button.pulsing:not([disabled]) { /* ... */ }
            `,this.shadowRoot.appendChild(t),this._buttonElement=document.createElement("button"),this._buttonElement.textContent=this.getAttribute("button-text")||"Pulsix",this.shadowRoot.appendChild(this._buttonElement),console.log("[Pulsix WC] render: Button and style appended.")}catch(t){console.error("[Pulsix WC] render: ERROR!",t)}console.log("[Pulsix WC] render: END")}}});const p=h;typeof window<"u"&&window.customElements&&p&&!window.customElements.get("pulsix-button")&&(window.customElements.define("pulsix-button",p),console.log("Custom element <pulsix-button> registrato."));export{p as PulsixButton,C as openTransactionPopup};
