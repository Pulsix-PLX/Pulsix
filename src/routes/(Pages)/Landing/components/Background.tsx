import { Component } from 'solid-js';


export default function FinancialBackground() {
  return (
    

    <div class="financial-background fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Strati di luce soffusa */}

    

      <div 
        class="absolute top-[-20%] left-[-20%] right-[-20%] bottom-[-20%] 
               bg-[radial-gradient(ellipse_at_top_left,_hsla(177,100%,46%,0.03)_0%,_transparent_60%)] 
               animate-soft-pulse opacity-20"
      ></div>

      <div 
        class="absolute top-[50%] left-[-50%] w-[200%] h-[200%] 
               bg-[radial-gradient(ellipse_at_bottom_right,_hsla(170,100%,48%,0.02)_0%,_transparent_60%)] 
               animate-soft-wave opacity-15 rotate-45"
      ></div>

      <div 
        class="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] 
               bg-[radial-gradient(ellipse_at_center,_rgba(0,224,205,0.01)_0%,_transparent_70%)] 
               animate-soft-glow opacity-10"
      ></div>

      <style>{`
        .financial-background {
          background: linear-gradient(
            160deg, 
            hsl(220, 20%, 5%) 0%, 
            hsl(220, 15%, 10%) 100%
          );
        }

        @keyframes softPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.2;
          }
        }

        @keyframes softWave {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.08;
          }
          50% {
            transform: rotate(90deg) scale(1.01);
            opacity: 0.15;
          }
          100% {
            transform: rotate(180deg) scale(1);
            opacity: 0.08;
          }
        }

        @keyframes softGlow {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-soft-pulse {
          animation: softPulse 10s ease-in-out infinite;
        }

        .animate-soft-wave {
          animation: softWave 15s linear infinite;
        }

        .animate-soft-glow {
          animation: softGlow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

