import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { createSignal, Suspense } from 'solid-js';
import './app.css';
import './Style/Layout.scss';
import './Style/Components.scss';
import Menu, { MenuView } from './components/Menus/Menu';
import CustomCursor from './routes/UI/Cursor';

export default function App() {
  
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Pulsix</Title>
          <CustomCursor />
          <MenuView />

          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
   
      <FileRoutes />
    </Router>
  );
}
