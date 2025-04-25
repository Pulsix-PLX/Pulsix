import{g as s,t as p,i as y}from"./web-DpIebe6J.js";import{a as h,F as g}from"./solid-DuWri35y.js";var b=p(`<div class=fancy-spinner-container><style>
          .fancy-spinner-container {
            /* Positioning and perspective for the container */
            position: relative; /* Changed from absolute for easier embedding */
            width: 265px; /* Approximate width */
            height: 265px; /* Approximate height */
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 200px; /* For 3D effect */
          }

          .fancy-spinner-particle-i {
            /* Absolute positioning for each particle's container */
            display: block;
            position: absolute;
            /* Center the particle based on its own size */
            left: 50%;
            top: 50%;
            margin-left: -32.5px;
            margin-top: -32.5px;
            width: 65px; /* Set width/height for transform origin */
            height: 65px;
          }

          .fancy-spinner-particle-b {
            /* Styles for the visible part of the particle */
            display: block;
            width: 65px;
            height: 65px;
            border: 2px solid white; /* White border, adjust color as needed */
            opacity: 0; /* Start invisible */
            transform: scale(0.7); /* Start slightly scaled down */

            /* Apply the animation */
            animation-name: spin;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            /* Custom cubic-bezier timing function from original SCSS */
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275);
          }

          /* Keyframes for the spin animation */
          @keyframes spin {
            0% {
              transform: rotate(0deg);
              opacity: 0; /* Ensure starts invisible */
            }
            40% {
              /* Rotate, move slightly, become visible */
              transform: rotate(-180deg) translateX(-32.5px);
              opacity: 1;
            }
            100% {
              /* Keep rotation, scale down, fade out (back to initial opacity 0) */
              transform: rotate(-180deg) scale(0.7);
              opacity: 0;
            }
          }
        </style><div class=fancy-spinner>`),u=p("<i class=fancy-spinner-particle-i><b class=fancy-spinner-particle-b>");const e=50,l=100,x=3,S=()=>{const c=Array.from({length:e});return(()=>{var i=s(b),m=i.firstChild,d=m.nextSibling;return y(d,h(g,{each:c,children:(v,f)=>{const n=f()+1,a=n/e*360,r=n*(x/e);return(()=>{var t=s(u),o=t.firstChild;return`rotate(${a}deg) translate3d(${l}px, 0, 0)`!=null?t.style.setProperty("transform",`rotate(${a}deg) translate3d(${l}px, 0, 0)`):t.style.removeProperty("transform"),`${r}s`!=null?o.style.setProperty("animation-delay",`${r}s`):o.style.removeProperty("animation-delay"),t})()}})),i})()};export{S as default};
