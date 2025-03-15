// Libraries
import { A, useLocation } from '@solidjs/router';
import { createSignal, onMount, Show } from 'solid-js';
import './Menu.scss';

export default function Menu() {
  const [extend, setExtend] = createSignal(false);
  const [hoveredIcon, setHoveredIcon] = createSignal(null);

  const IconsPath = [
    {
      name: 'Home',
      svg: (
        <svg
          class="Icon"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{
            overflow: 'visible',
            color: 'currentcolor',
            width: '24px',
            height: '24px'
          }}
        >
          <path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Zm-2-1V9.978l-7-5.445-7 5.445V19h14Z"></path>
        </svg>
      ),
    },
    {
      name: 'Dashboard',
      svg: (
        <svg
          class="Icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{
            overflow: 'visible',
            color: 'currentcolor',
            width: '24px',
            height: '24px'
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 12v-4"></path>
          <path d="M15 12v-2"></path>
          <path d="M12 12v-1"></path>
          <path d="M3 4h18"></path>
          <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"></path>
          <path d="M12 16v4"></path>
          <path d="M9 20h6"></path>
        </svg>
      ),
    },
    {
      name: 'Wallets',
      svg: (
        <svg
          class="Icon"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            overflow: 'none',
            color: 'currentcolor',
            width: '24px',
            height: '24px'
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
          ></path>
        </svg>
      ),
    },
  ];
  // Definizione degli elementi del menu
  const menuItems = [
    { name: 'Home', icon: 'Home', href: '/', svg: IconsPath[0].svg },
    {
      name: 'Dashboard',
      icon: 'Dashboard',
      href: '/',
      svg: IconsPath[1].svg,
    },
    {
      name: 'Wallets',
      icon: 'Wallet',
      href: '/Wallets',
      svg: IconsPath[2].svg,
    },


  ];

  // Funzione per raggruppare le proprietà di hover
  const hoverProps = (icon: any) => ({
    onMouseEnter: () => setHoveredIcon(icon),
    onMouseLeave: () => setHoveredIcon(null),
  });

  return (
    <>
      <div
        class="Menu flex flex-row z-10"
        classList={{ Extend: extend() }}
        onMouseEnter={() => setExtend(true)}
        onMouseLeave={() => {
          setExtend(false);
          setHoveredIcon(null); // Resetta l'icona hoverata quando esci dal menu
        }}
      >
        <div class="flex flex-col ml-15 gap-31 mt-60">
          {menuItems.map((item) => (
            <A
              href={item.href}
              class={`Icon ${hoveredIcon() === item.name ? 'Hover' : ''}`}
              {...hoverProps(item.name)} // Applica le proprietà di hover
            >
              {item.svg}
            </A>
          ))}
        </div>

        <Show when={extend()}>
          <div class="flex flex-col gap-27 mt-60">
            {menuItems.map((item) => (
              <A
                href={item.href}
                class={`Text ${hoveredIcon() === item.name ? 'Hover' : ''} ${
                  hoveredIcon() !== item.name && hoveredIcon() ? 'Blur' : ''
                }`}
                {...hoverProps(item.name)}
              >
                {item.name}
              </A>
            ))}
          </div>
        </Show>
      </div>
    </>
  );
}
export const [showMenu, setShowMenu] = createSignal(true);
export function MenuView(){

  return(
    <Show when={showMenu()}>
      <Menu/>
    </Show>
  )
}
