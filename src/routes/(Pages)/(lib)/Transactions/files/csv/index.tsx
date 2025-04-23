import { onMount, Show } from 'solid-js';
import PathWallets from '../../utils/pathWallets';
import { context, initializeData, setStep } from './context';
import UploadFile from './Upload';
import Preview from './Preview';
import { setShowMenu } from '~/components/Menus/Menu';
import Mapper from './mapper';

export default function index() {
  onMount(() => setShowMenu(false));
  const sampleHeaders = ['Date', 'Description', 'Amount', 'Category', 'Status'];
  const sampleRows = [
    {
      Date: '2025-04-21',
      Description: 'Stipendio Aprile',
      Amount: 2500.5,
      Category: 'Income',
      Status: 'Completed',
    },
    {
      Date: '2025-04-20',
      Description: 'Supermercato Esselunga',
      Amount: -75.3,
      Category: 'Groceries',
      Status: 'Completed',
    },
    {
      Date: '2025-04-19',
      Description: 'Bolletta Luce',
      Amount: -55.0,
      Category: 'Utilities',
      Status: 'Completed',
    },
    {
      Date: '2025-04-18',
      Description: "Ristorante 'La Brace'",
      Amount: -42.0,
      Category: 'Dining Out',
      Status: 'Completed',
    },
    {
      Date: '2025-04-17',
      Description: 'Amazon ordine #123',
      Amount: -120.99,
      Category: 'Shopping',
      Status: 'Pending',
    },
    {
      Date: '2025-04-16',
      Description: 'Cinema Odeon',
      Amount: -18.0,
      Category: 'Entertainment',
      Status: 'Completed',
    },
    {
      Date: '2025-04-15',
      Description: 'Rimborso Tasse',
      Amount: 350.0,
      Category: 'Income',
      Status: 'Completed',
    },

    {
      Date: '2025-04-14',
      Description: 'Palestra Mensile',
      Amount: -40.0,
      Category: 'Health & Fitness',
      Status: 'Completed',
    },
    {
      Date: '2025-04-13',
      Description: 'Libri Universitari',
      Amount: -85.5,
      Category: 'Education',
      Status: 'Completed',
    },
    {
      Date: '2025-04-12',
      Description: 'Riparazione Auto',
      Amount: -300.0,
      Category: 'Transport',
      Status: 'Completed',
    },
    {
      Date: '2025-04-15',
      Description: 'Rimborso Tasse',
      Amount: 350.0,
      Category: 'Income',
      Status: 'Completed',
    },

    {
      Date: '2025-04-14',
      Description: 'Palestra Mensile',
      Amount: -40.0,
      Category: 'Health & Fitness',
      Status: 'Completed',
    },
    {
      Date: '2025-04-13',
      Description: 'Libri Universitari',
      Amount: -85.5,
      Category: 'Education',
      Status: 'Completed',
    },
    {
      Date: '2025-04-12',
      Description: 'Riparazione Auto',
      Amount: -300.0,
      Category: 'Transport',
      Status: 'Completed',
    },
    {
      Date: '2025-04-15',
      Description: 'Rimborso Tasse',
      Amount: 350.0,
      Category: 'Income',
      Status: 'Completed',
    },

    {
      Date: '2025-04-14',
      Description: 'Palestra Mensile',
      Amount: -40.0,
      Category: 'Health & Fitness',
      Status: 'Completed',
    },
    {
      Date: '2025-04-13',
      Description: 'Libri Universitari',
      Amount: -85.5,
      Category: 'Education',
      Status: 'Completed',
    },
    {
      Date: '2025-04-12',
      Description: 'Riparazione Auto',
      Amount: -300.0,
      Category: 'Transport',
      Status: 'Completed',
    },
    {
      Date: '2025-04-15',
      Description: 'Rimborso Tasse',
      Amount: 350.0,
      Category: 'Income',
      Status: 'Completed',
    },

    {
      Date: '2025-04-14',
      Description: 'Palestra Mensile',
      Amount: -40.0,
      Category: 'Health & Fitness',
      Status: 'Completed',
    },
    {
      Date: '2025-04-13',
      Description: 'Libri Universitari',
      Amount: -85.5,
      Category: 'Education',
      Status: 'Completed',
    },
    {
      Date: '2025-04-12',
      Description: 'Riparazione Auto',
      Amount: -300.0,
      Category: 'Transport',
      Status: 'Completed',
    },
  ];
  const sampleWalletId = 123; // ID portafoglio fittizio

  // Chiama l'azione del context per inizializzare i dati
  initializeData({ headers: sampleHeaders, rows: sampleRows }, sampleWalletId);
  setStep('mapping')
  return (
    <>
      {/* Step 1: Upload del file */}
      <Show when={context.step === 'upload'}>
        <UploadFile />
      </Show>
      {/* Step 2: Preview */}
      <Show when={context.step === 'preview'}>
        <div class="">
          <Preview />
        </div>
      </Show>
      {/* Step 3: Mapper */}
      <Show when={context.step === 'mapping'}>
          <Mapper />
      </Show>
    </>
  );
}
