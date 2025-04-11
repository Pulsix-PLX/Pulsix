import { createSignal, onMount, Show } from 'solid-js';
import Fade from '~/components/Buttons/Fade';
import './index.scss'
// Controllo delle righe
export const [HoveredRow, SetHoveredRow] = createSignal<number | null>(null);
export const [ActiveRow, SetActiveRow] = createSignal<number | null>(null);

interface Props {
  transactions: any; // Array of transactions
  refetch: () => any; // Function to refetch transactions
}

export default function TableWallet(props: Props) {
  const [Type, SetType] = createSignal<string | undefined>('Income'); // Usa undefined per "tutti"
  const [DateFrom, setDateFrom] = createSignal<Date | undefined>(undefined); // Inizializza a null
  const [DateTo, setDateTo] = createSignal<Date | undefined>(undefined); // <<< Inizializza a null
  const [category, setCategory] = createSignal<string | undefined>(undefined); // Usa undefined per "tutti"

  return (
    <>
      <Show when={props.transactions}>
        <div class="TableWrapper">
          <table class="Table">
            <thead>
              <tr>
                <th>Cause</th>
                <th>Amount</th>
                <th>Category</th>
                <th class="text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Se non ci sono ancora transazioni */}
              {!props.transactions.length ? (
                <tr
                  class="text-white text-xl"
                  style={{ 'justify-content': 'center' }}
                >
                  <td colSpan={5}>There isn't anything, add a transaction!</td>
                </tr>
              ) : null}
              {props.transactions
                // Incomes / Expenses
                .filter((t: any) => (Type() ? t.type == Type() : true))
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

                    <tr
                      class={
                        HoveredRow() === Transaction.id
                          ? 'Hover'
                          : ActiveRow() === Transaction.id
                          ? 'Active'
                          : ''
                      }
                      onMouseEnter={() => SetHoveredRow(Transaction.id)}
                      onMouseLeave={() => SetHoveredRow(null)}
                      onClick={() =>
                        ActiveRow() !== Transaction.id
                          ? SetActiveRow(Transaction.id)
                          : SetActiveRow(null)
                      }
                    >
                      <td class="text-black">
                        <button>{Transaction.cause}</button>
                      </td>
                      <td class="text-black text-right">
                        <button>{Transaction.amount}</button>
                      </td>
                      <td>
                        <button>{Transaction.category_id}</button>
                      </td>
                      <td class="text-black">
                        <button>{Transaction.date?new Date(Transaction.date).toISOString().split('T')[0]:''}</button>
                      </td>
                    </tr>
            
                ))}
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
}
