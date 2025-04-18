// src/components/Loaders/FancySpinner.tsx (Example file path)
import { Component, For } from 'solid-js';

// Define configuration constants (matching the original SCSS variables)
const PARTICLE_COUNT = 50;
const PARTICLE_SIZE_PX = 65;
const RADIUS_PX = 100;
const LAP_DURATION_S = 3;

const FancySpinner: Component = () => {

  // Create an array to iterate over for the particles
  const particles = Array.from({ length: PARTICLE_COUNT });

  // Calculate half particle size for positioning offsets
  const particleOffset = PARTICLE_SIZE_PX / 2;

  return (
    <div class="fancy-spinner-container">
      {/* Style tag to hold the static CSS and keyframes */}
      <style>
        {`
          .fancy-spinner-container {
            /* Positioning and perspective for the container */
            position: relative; /* Changed from absolute for easier embedding */
            width: ${RADIUS_PX * 2 + PARTICLE_SIZE_PX}px; /* Approximate width */
            height: ${RADIUS_PX * 2 + PARTICLE_SIZE_PX}px; /* Approximate height */
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
            margin-left: -${particleOffset}px;
            margin-top: -${particleOffset}px;
            width: ${PARTICLE_SIZE_PX}px; /* Set width/height for transform origin */
            height: ${PARTICLE_SIZE_PX}px;
          }

          .fancy-spinner-particle-b {
            /* Styles for the visible part of the particle */
            display: block;
            width: ${PARTICLE_SIZE_PX}px;
            height: ${PARTICLE_SIZE_PX}px;
            border: 2px solid white; /* White border, adjust color as needed */
            opacity: 0; /* Start invisible */
            transform: scale(0.7); /* Start slightly scaled down */

            /* Apply the animation */
            animation-name: spin;
            animation-duration: ${LAP_DURATION_S}s;
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
              transform: rotate(-180deg) translateX(-${particleOffset}px);
              opacity: 1;
            }
            100% {
              /* Keep rotation, scale down, fade out (back to initial opacity 0) */
              transform: rotate(-180deg) scale(0.7);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* The main spinner element */}
      <div class="fancy-spinner">
        {/* Loop to create each particle */}
        <For each={particles}>
          {(_, index) => {
            // Calculate angle and delay for each particle based on its index
            const particleIndex = index() + 1; // 1-based index
            const angle = (particleIndex / PARTICLE_COUNT) * 360;
            const delay = particleIndex * (LAP_DURATION_S / PARTICLE_COUNT);

            return (
              <i
                class="fancy-spinner-particle-i"
                // Apply dynamic rotation and translation to position particles in a circle
                style={{
                  transform: `rotate(${angle}deg) translate3d(${RADIUS_PX}px, 0, 0)`
                }}
              >
                <b
                  class="fancy-spinner-particle-b"
                  // Apply dynamic animation delay to stagger the effect
                  style={{ 'animation-delay': `${delay}s` }}
                ></b>
              </i>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default FancySpinner;
