import { createSignal, onMount, Show } from 'solid-js';
import Fade from '~/components/Buttons/Fade';

// Data table
export const [Data, SetData] = createSignal<any[]>([]); // Data table

// Controllo delle righe
export const [HoveredRow, SetHoveredRow] = createSignal<number | null>(null);
export const [ActiveRow, SetActiveRow] = createSignal<number | null>(null);

interface Props {
  transactions: any; // Array of transactions
  refetch: () => any; // Function to refetch transactions
}

export default function TableWallet(props: Props) {
  const [Type, SetType] = createSignal<boolean | undefined>(undefined); // Usa undefined per "tutti"
  const [DateFrom, setDateFrom] = createSignal<Date | undefined>(undefined); // Inizializza a null
  const [DateTo, setDateTo] = createSignal<Date | undefined>(undefined); // <<< Inizializza a null
  const [category, setCategory] = createSignal<string | undefined>(undefined); // Usa undefined per "tutti"

  return (
    <>
      <Show when={props.transactions}>
        <div class="ContainerMiddle TableWrapper mt-150">
          <table class="Table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cause</th>
                <th>Amount</th>
                <th>Category</th>
                <th class="text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Se non ci sono ancora transazioni */}
              {!Data().length ? (
                <tr
                  class="text-white text-xl"
                  style={{ 'font-family': 'serif', 'justify-content': 'center' }}
                >
                  <td colSpan={5}>There isn't anything, add a transaction!</td>
                </tr>
              ) : null}
              {props.transactions
                // Incomes / Expenses
                .filter((t: any) => (Type() ? t.Type == Type() : true))
                // Date filters
                .filter((t: any) =>
                  DateFrom() && DateTo()
                    ? t.Date >= (DateFrom() ?? 0) && t.Date <= (DateTo() ?? Infinity)
                    : DateFrom()
                    ? t.Date >= (DateFrom() ?? 0)
                    : DateTo()
                    ? t.Date <= (DateTo() ?? Infinity)
                    : true
                )
                // Category filter
                .filter((t: any) => (category() ? t.CategoryName === category() : true))
                .map((Transaction: any, index: number) => (
                  // Animazione caricamento graduale
                  <Fade
                    in={true}
                    fadeInDuration={1000 + index * 300} 
                    fadeOutDuration={1000} 
                    fadeInEasing="ease-out" 
                    fadeOutEasing="cubic-bezier(0.4, 0.0, 0.2, 1)"
                  >
                    <tr
                      class={
                        HoveredRow() === Transaction.Id
                          ? 'Hover'
                          : ActiveRow() === Transaction.Id
                          ? 'Active'
                          : ''
                      }
                      onMouseEnter={() => SetHoveredRow(Transaction.Id)}
                      onMouseLeave={() => SetHoveredRow(null)}
                      onClick={() =>
                        ActiveRow() !== Transaction.Id
                          ? SetActiveRow(Transaction.Id)
                          : SetActiveRow(null)
                      }
                    >
                      <td>
                        <button>{Transaction.Id}</button>
                      </td>
                      <td class="text-black">
                        <button>{Transaction.Cause}</button>
                      </td>
                      <td class="text-black text-right">
                        <button>{Transaction.Amount}</button>
                      </td>
                      <td>
                        <button>{Transaction.CategoryName}</button>
                      </td>
                      <td class="text-black">
                        <button>{new Date(Transaction.Date).toISOString().split('T')[0]}</button>
                      </td>
                    </tr>
                  </Fade>
                ))}
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
}
