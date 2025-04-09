// ThreeDCardDemo.tsx
import { createSignal, createEffect, onCleanup, Component, JSX, Switch, Match } from "solid-js";
import { A } from "@solidjs/router";
import "./index.scss"; 
// Card Container Component
 export const CardContainer: Component<{class?: string, children: JSX.Element}> = (props) => {
  const [isMouseEntered, setIsMouseEntered] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef) return;
    const { left, top, width, height } = containerRef.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const rotateX = ((mouseY - height / 2) / 25) * -1;
    const rotateY = (mouseX - width / 2) / 25;
    
    containerRef.style.transform = isMouseEntered() 
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
      : `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };
  
  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (containerRef) {
      containerRef.style.transition = "transform 0.1s ease";
    }
  };
  
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef) {
      containerRef.style.transition = "transform 0.5s ease";
      containerRef.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };
  
  createEffect(() => {
    const currentRef = containerRef;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseenter", handleMouseEnter);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }
    
    onCleanup(() => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseenter", handleMouseEnter);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    });
  });
  
  // Use inline style attribute with string to avoid TypeScript errors
  return (
    <div 
      ref={containerRef} 
      class={`transform-gpu ${props.class || ""}`} 
      style="transform-style: preserve-3d; will-change: transform; transform: perspective(1000px) rotateX(0deg) rotateY(0deg);"
    >
      {props.children}
    </div>
  );
};

// Card Body Component
export const CardBody: Component<{class?: string, children: JSX.Element, color:any}> = (props) => {
  return (
    <div
      class={props.class || ""}
      style={{
        'background-color': `${props.color}`,
        'transform-style': 'preserve-3d',
         }}
    >
      {props.children}
    </div>
  );
};

// Card Item Component
export const CardItem: Component<{
  as?: string;
  translateZ?: number | string;
  class?: string;
  children: JSX.Element;
  href?: string;
  target?: string;
  onClick?: (e: MouseEvent) => void;
}> = (props) => {
  // Create style string with the translateZ value
  const styleStr = `transform: translateZ(${props.translateZ || 0}px); transform-style: preserve-3d; transition: transform 0.2s ease;`;
  
  return (
    <Switch>
      <Match when={props.as === "p"}>
        <p class={props.class || ""} style={styleStr}>{props.children}</p>
      </Match>
      <Match when={props.as === "button"}>
        <button 
          class={props.class || ""} 
          style={styleStr}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      </Match>
      <Match when={props.as === "a" || props.href}>
        <a 
          class={props.class || ""} 
          style={styleStr}
          href={props.href}
          target={props.target}
        >
          {props.children}
        </a>
      </Match>
      <Match when={props.as === "A"}>
        <A 
          class={props.class || ""} 
          style={styleStr}
          href={props.href || ""}
          target={props.target}
        >
          {props.children}
        </A>
      </Match>
      <Match when={true}>
        <div class={props.class || ""} style={styleStr}>{props.children}</div>
      </Match>
    </Switch>
  );
};

// Main 3D Card Demo Component
export function ThreeDCardDemo(props: any) {
  return (
    <CardContainer>
      <CardBody class={`border-black border-4 w-[20vw]  h-[12vw] rounded-xl -mt-100`}
          color={props.color}>
        <CardItem 
          translateZ={50} 
          class=" text-white text-[1vw] text-center pt-25"
        >
          {props.name}
        </CardItem>
        
        <CardItem 
          as="p" 
          translateZ={60} 
          class="text-white text-[1vw] text-center"
        >
          {props.balance}{props.currency}
        </CardItem>

        
      </CardBody>
    </CardContainer>
  );
}