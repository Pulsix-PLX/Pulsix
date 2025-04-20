import { createSignal, Index, Show, onMount, onCleanup, JSX } from "solid-js";
import styles from "./DatePicker.module.scss";


interface InputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  class?: string;
  style?: string;
  onInput?: (e: any) => void;
  onChange?: (e: any) => void;
  initialValue?: Date;
}

export default function DatePicker(props:InputProps) {
  const [date, setDate] = createSignal<Date | null>(props.initialValue || null);
  const [isOpen, setIsOpen] = createSignal(false);
  const [view, setView] = createSignal<"day" | "month" | "year">("day");
  const [currentMonth, setCurrentMonth] = createSignal(new Date().getMonth());
  const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());

  let containerRef: HTMLDivElement | undefined;

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  const generateMonthGrid = () => {
    const year = currentYear();
    const month = currentMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calcola il giorno della settimana del primo giorno (0=Dom, 1=Lun, ..., 6=Sab)
    const firstDayOfWeek = firstDayOfMonth.getDay(); // getDay() è già 0 per Domenica
    const daysInMonth = lastDayOfMonth.getDate();

    const weeks: { date: Date; isCurrentMonth: boolean }[][] = [];
    let currentWeek: { date: Date; isCurrentMonth: boolean }[] = [];

    // Giorni del mese precedente
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      currentWeek.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }

    // Giorni del mese corrente
    for (let day = 1; day <= daysInMonth; day++) {
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      currentWeek.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }

    // Giorni del mese successivo
    const daysRemaining = 7 - currentWeek.length;
    for (let day = 1; day <= daysRemaining; day++) {
      currentWeek.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }

    if (currentWeek.length > 0) {
      weeks.push([...currentWeek]);
    }

    return weeks;
  };

   const generateYearGrid = () => {
      const year = currentYear();
      const startYear = Math.floor(year / 12) * 12;
      return Array.from({length: 12}, (_, i) => startYear + i);
  };

  // Formato MM/DD/YYYY per corrispondere al placeholder dell'immagine
  const formatDate = (d: Date | null): string => {
      if (!d) return "";
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
  };

  const handleDaySelect = (day: Date) => {
    setDate(day);
    console.log(date())
    setCurrentMonth(day.getMonth());
    setCurrentYear(day.getFullYear());
    setIsOpen(false);
    setView("day");
    if (props.onInput) {
      props.onInput(formatDate(date()));
    }
  };
  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    setView("day");
   };
  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setView("month");
  };
  const navigateMonth = (direction: 'prev' | 'next') => {
      let month = currentMonth(); let year = currentYear();
      if (direction === 'prev') { if (month === 0) { month = 11; year--; } else { month--; } }
      else { if (month === 11) { month = 0; year++; } else { month++; } }
      setCurrentMonth(month); setCurrentYear(year);
  };
  const navigateYearGrid = (direction: 'prev' | 'next') => {
      const currentStartYear = Math.floor(currentYear() / 12) * 12;
      const newStartYear = direction === 'prev' ? currentStartYear - 12 : currentStartYear + 12;
      setCurrentYear(newStartYear + 6);
  };

  // Header giorni USA (inizia da Domenica)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Nomi mesi per il display (Usa nomi completi inglesi per matchare "April" nell'immagine)
  const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // Nomi mesi brevi per la vista mese (inglese)
   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  return (
    <div ref={containerRef} class={`${props.class} ${styles.container}`} data-open={isOpen()}>
      <div class={styles.control}>
        <input
          type="text"
          class={styles.input}
          placeholder={props.placeholder || "mm/dd/yyyy"} // Placeholder come da immagine
          value={formatDate(date())}

          readonly
          onClick={() => setIsOpen(!isOpen())}
          aria-label="Selected date" // Etichetta inglese
        />
        <button
          type="button" // Evita submit form
          class={styles.trigger}
          onClick={() => setIsOpen(!isOpen())}
          aria-label="Open/Close calendar" // Etichetta inglese
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
             <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
          </svg>
        </button>
      </div>

      <Show when={isOpen()}>
        <div class={styles.calendar}>
          {/* Vista Giorno */}
          <Show when={view() === "day"}>
            <div class={styles.viewControl}>
               <button
                 type="button" // Evita submit form
                 class={styles.navButton}
                 onClick={() => navigateMonth('prev')}
                 aria-label="Previous month" // Etichetta inglese
               >
                 &lt;
               </button>
              <button
                type="button" // Evita submit form
                class={`${styles.viewTrigger}`}
                onClick={() => setView("month")}
              >
                 {/* Mostra mese completo inglese */}
                {monthNamesFull[currentMonth()]} {currentYear()}
              </button>
               <button
                 type="button" // Evita submit form
                 class={styles.navButton}
                 onClick={() => navigateMonth('next')}
                 aria-label="Next month" // Etichetta inglese
               >
                 &gt;
               </button>
            </div>

            <table class={styles.table}>
              <thead>
                <tr>
                  {/* Usa header giorni inglesi */}
                  <Index each={weekDays}>
                    {(day) => <th class={styles.tableHeader}>{day()}</th>}
                  </Index>
                </tr>
              </thead>
              <tbody>
                <Index each={generateMonthGrid()}>
                  {(week) => (
                    <tr>
                      <Index each={week()}>
                        {(dayObj) => {
                          const dayDate = dayObj().date;
                          const isCurrentMonth = dayObj().isCurrentMonth;
                          const isToday = dayDate.toDateString() === new Date().toDateString();
                          const isSelected = date()?.toDateString() === dayDate.toDateString();

                          return (
                            <td class={styles.tableCell}>
                              <button
                                type="button" // Evita submit form
                                class={`text-[1.2em] ${styles.cellTrigger}`}
                                classList={{
                                  [styles.selected]: isCurrentMonth && isSelected,
                                  // Applica stile 'today' solo al testo, non classe separata se non serve sfondo/bordo
                                  [styles.otherMonth]: !isCurrentMonth
                                }}
                                // Applica stile inline per 'today' se non selezionato
                                style={ isCurrentMonth && isToday && !isSelected ? { color: styles.accentSecondaryColor } : {} }
                                onClick={(e) =>{ handleDaySelect(dayDate) }}
                                aria-label={`Select ${dayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`} // Etichetta inglese
                              >
                                {dayDate.getDate()}
                              </button>
                            </td>
                          );
                        }}
                      </Index>
                    </tr>
                  )}
                </Index>
              </tbody>
            </table>
          </Show>

          {/* Vista Mese */}
          <Show when={view() === "month"}>
             <div class={styles.viewControl}>
               <button
                 type="button" // Evita submit form
                 class={styles.viewTrigger}
                 onClick={() => setView("year")}
               >
                 {currentYear()}
               </button>
             </div>
            <div class={styles.monthGrid}>
               {/* Usa nomi mesi brevi inglesi */}
              {monthNames.map((month, i) => (
                <button
                  type="button" // Evita submit form
                  class={ ` ${styles.monthCell}`}
                  classList={{[styles.selected]: currentMonth() === i}}
                  onClick={() => handleMonthSelect(i)}
                   aria-label={`Select ${monthNamesFull[i]}`} // Etichetta inglese
                >
                  {month}
                </button>
              ))}
            </div>
          </Show>

          {/* Vista Anno */}
          <Show when={view() === "year"}>
            <div class={`${styles.viewControl}`}>
              <button
                type="button" // Evita submit form
                class={`mt-[1vw] ${styles.navButton}`}
                onClick={() => navigateYearGrid('prev')}
                aria-label="Previous years" // Etichetta inglese
             
              >
                &lt;
              </button>
              <span class={`mt-[1vw] text-[1.4em]`}>
                {generateYearGrid()[0]} - {generateYearGrid()[11]}
              </span>
              <button
                type="button" // Evita submit form
                class={`mt-[1vw] ${styles.navButton}`}
                onClick={() => navigateYearGrid('next')}
                 aria-label="Next years" // Etichetta inglese
                
              >
                &gt;
              </button>
            </div>
            <div class={styles.yearGrid}>
              {generateYearGrid().map(year => (
                <button
                  type="button" // Evita submit form
                  class={styles.yearCell}
                  classList={{[styles.selected]: currentYear() === year}}
                  onClick={() => handleYearSelect(year)}
                   aria-label={`Select year ${year}`} // Etichetta inglese
                >
                  {year}
                </button>
              ))}
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}