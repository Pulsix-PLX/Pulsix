import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { For } from 'solid-js';

var d = ["<div", ` class="fancy-spinner-container"><style>
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
        </style><div class="fancy-spinner">`, "</div></div>"], f = ["<i", ' class="fancy-spinner-particle-i" style="', '"><b class="fancy-spinner-particle-b" style="', '"></b></i>'];
const e = 50, m = 100, y = 3, u = () => {
  const r = Array.from({ length: e });
  return ssr(d, ssrHydrationKey(), escape(createComponent(For, { each: r, children: (h, o) => {
    const i = o() + 1, s = i / e * 360, c = i * (y / e);
    return ssr(f, ssrHydrationKey(), `transform:rotate(${escape(s, true)}deg) translate3d(${escape(m, true)}px, 0, 0)`, `animation-delay:${escape(c, true)}s`);
  } })));
};

export { u as default };
//# sourceMappingURL=Loading.mjs.map
