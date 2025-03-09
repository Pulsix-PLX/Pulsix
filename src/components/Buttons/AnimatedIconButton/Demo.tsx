// App.tsx
import { Component } from 'solid-js';
import SparkleButton from '~/components/Buttons/AnimatedIconButton/Button';
import '.Button.css';

const RocketIcon = () => (
  <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 16.5L3 21L7.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 12L3 9M16.5 7.5L19.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M11.5 12.5C15.864 8.13604 19.5 8 21 8C21 9.5 20.864 13.136 16.5 17.5C12.136 21.864 8.5 22 7 22C7 20.5 7.13604 16.864 11.5 12.5Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14.5 14.5L11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9 14C9 14 7.5 15.5 6.5 16.5C5.5 17.5 5 18.9 5 18.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C12 6 9 1 5 2C2 3 1 6 2 9C3 12 12 18 12 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 6C12 6 15 1 19 2C22 3 23 6 22 9C21 12 12 18 12 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const LightBulbIcon = () => (
  <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.27 5.27L6.7 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.3 5.27L15.8 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.27 18.73L6.7 17.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.3 18.73L15.8 17.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>
);
const defaultIcon = () => (
  <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const DownloadIcon = () => (
    <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15V3M12 15L7 10M12 15L17 10M2 17H22M2 17V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

// Custom particle icons
const DiamondParticle = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 9L12 22L21.5 9M2.5 9L12 2L21.5 9M2.5 9H21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const HeartParticle = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7C12 7 10 3 6 3C3 3 1 5 1 8C1 11 12 19 12 19C12 19 23 11 23 8C23 5 21 3 18 3C14 3 12 7 12 7Z" fill="currentColor"/>
  </svg>
);

const StarParticle = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L1.91 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
  </svg>
);
const defaultParticleIcon = () => (
  <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
const Home: Component = () => {
  return (
    <div style={{ 
      "background-color": "#111", 
      "min-height": "100vh", 
      "display": "flex", 
      "flex-direction": "column", 
      "align-items": "center", 
      "justify-content": "center", 
      "gap": "2rem"
    }}>
      {/* Default star button */}
      <SparkleButton 
        text="Generate Site" 
        icon={<defaultIcon />} 
        particleIcon={<defaultParticleIcon />} 
        onClick={() => alert('Button clicked!')} 
      />
      
      {/* Rocket icon button */}
      <SparkleButton 
        text="Launch Rocket" 
        icon={<RocketIcon />} 
        particleCount={15}
      />
      
      {/* Heart icon with custom particles */}
      <SparkleButton 
        text="Send Love" 
        icon={<HeartIcon />} 
        particleIcon={<HeartParticle />} 
        particleCount={25}
      />
      
      {/* Diamonds particles */}
      <SparkleButton 
        text="Win Prize" 
        particleIcon={<DiamondParticle />} 
        particleCount={30}
      />

      {/* Light Bulb button */}
      <SparkleButton
          text="Get Inspired"
          icon={<LightBulbIcon />}
          particleIcon={<StarParticle />}
          particleCount={20}
      />

      {/* Download button */}
      <SparkleButton
          text="Download Report"
          icon={<DownloadIcon />}
          particleCount={10}
      />
    </div>
  );
};

export default Home;
