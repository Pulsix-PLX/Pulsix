import { createSignal, Index, Show, onMount, onCleanup, createEffect, createMemo, JSX } from "solid-js";
import styles from "./DateRangePicker.module.scss"; // Usa lo SCSS specifico per questo componente

export default function DateRangePicker() {
  const [startDate, setStartDate] = createSignal<Date | null>(null);
  const [endDate, setEndDate] = createSignal<Date | null>(null);
  const [isOpen, setIsOpen] = createSignal(false);
  const [view, setView] = createSignal<"day" | "month" | "year">("day");
  const [currentMonth, setCurrentMonth] = createSignal(startDate()?.getMonth() ?? new Date().getMonth());
  const [currentYear, setCurrentYear] = createSignal(startDate()?.getFullYear() ?? new Date().getFullYear());
  const [selecting, setSelecting] = createSignal<'start' | 'end'>('start'); // Indica se stiamo selezionando 'start' o 'end'

  let containerRef: HTMLDivElement | undefined;

  // --- Gestione Click Outside ---
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node) && isOpen()) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  // --- Generazione Griglia Mesi (con createMemo per reattività) ---
  const monthGridData = createMemo(() => {
    const year = currentYear();
    const month = currentMonth();
    // console.log(`MEMO: generateMonthGrid running for Month: ${month}, Year: ${year}`); // Log per debug (opzionale)

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0=Lun, 6=Dom (o adatta se vuoi Dom=0)
    const daysInMonth = lastDayOfMonth.getDate();
    const weeks: { date: Date; isCurrentMonth: boolean }[][] = [];
    let currentWeek: { date: Date; isCurrentMonth: boolean }[] = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Giorni mese precedente (adatta se firstDayOfWeek cambia)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      currentWeek.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
    }
    // Giorni mese corrente
    for (let day = 1; day <= daysInMonth; day++) {
      if (currentWeek.length === 7) { weeks.push([...currentWeek]); currentWeek = []; }
      currentWeek.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    // Giorni mese successivo
    const daysRemaining = 7 - currentWeek.length;
    for (let day = 1; day <= daysRemaining; day++) {
      currentWeek.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    if (currentWeek.length > 0) { weeks.push([...currentWeek]); }
    return weeks;
  });

  // --- Generazione Griglia Anni ---
  const generateYearGrid = () => {
    const year = currentYear();
    const startYear = Math.floor(year / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  // --- Formattazione Data ---
  const formatDate = (d: Date | null): string => {
    if (!d) return "";
    // Formato italiano dd/mm/yyyy
    return d.toLocaleDateString("it-IT", { day: '2-digit', month: '2-digit', year: 'numeric' });
    // O formato US mm/dd/yyyy:
    // const month = (d.getMonth() + 1).toString().padStart(2, '0');
    // const day = d.getDate().toString().padStart(2, '0');
    // const year = d.getFullYear();
    // return `${month}/${day}/${year}`;
  };

  // --- Logica Selezione Range (con date normalizzate) ---
  const handleDaySelect = (day: Date) => { // 'day' è l'oggetto Date originale della cella cliccata
    const start = startDate();
    const end = endDate();

    // --- Correzione Mutazione: Crea una NUOVA data normalizzata ---
    const normalizedDay = new Date(day); // Copia la data originale
    normalizedDay.setHours(0, 0, 0, 0); // Normalizza la COPIA a mezzanotte
    const normalizedTime = normalizedDay.getTime(); // Ottieni il timestamp normalizzato
    // ---

    if (selecting() === 'start') {
        setStartDate(normalizedDay); // Imposta la nuova data di inizio (normalizzata)

        // Se la data di fine esiste ed è precedente alla nuova data di inizio, cancellala
        if (end && normalizedTime > end.getTime()) {
            setEndDate(null);
        }
        setSelecting('end'); // Passa alla modalità di selezione della data di fine

    } else { // selecting() === 'end'

        // --- Logica Corretta e Type-Safe ---
        if (!start) {
             // CASO 1: Non c'era una data di inizio, quindi questa diventa la data di inizio
             setStartDate(normalizedDay);
             setEndDate(null);    // Assicura che la data di fine sia nulla
             setSelecting('end'); // Rimani in modalità 'selezione fine'
        } else {
             // CASO 2: Una data di inizio ('start') esiste GIA'.
             const startTimeValue = start.getTime(); // Ora siamo sicuri che start non è null, quindi getTime() restituisce number

             if (normalizedTime < startTimeValue) {
                 // La data cliccata è PRIMA della data di inizio esistente.
                 // Tratta questa selezione come la NUOVA data di inizio.
                 setStartDate(normalizedDay);
                 setEndDate(null);    // Cancella la data di fine
                 setSelecting('end'); // Richiedi una nuova data di fine
             } else {
                 // La data cliccata è DOPO o UGUALE alla data di inizio esistente.
                 // Imposta questa come data di fine valida.
                 setEndDate(normalizedDay);
                 setSelecting('start'); // Resetta per la prossima selezione di range
                 setIsOpen(false);    // Chiudi il picker perché l'intervallo è completo
             }
        }
        // --- Fine Logica Corretta ---
      }

    // Aggiorna vista solo se cliccato giorno di un altro mese (usando 'day' originale)
    const clickedOriginalMonth = day.getMonth();
    const clickedOriginalYear = day.getFullYear();
    if (clickedOriginalMonth !== currentMonth() || clickedOriginalYear !== currentYear()) {
      setCurrentMonth(clickedOriginalMonth);
      setCurrentYear(clickedOriginalYear);
    }
    setView('day'); // Torna sempre alla vista giorno dopo selezione
  };

  // --- Selezione Mese/Anno e Navigazione ---
  const handleMonthSelect = (month: number) => { setCurrentMonth(month); setView("day"); };
  const handleYearSelect = (year: number) => { setCurrentYear(year); setView("month"); };
  const navigateMonth = (direction: 'prev' | 'next') => {
    let month = currentMonth(); let year = currentYear();
    if (direction === 'prev') { if (month === 0) { month = 11; year--; } else { month--; } }
    else { if (month === 11) { month = 0; year++; } else { month++; } }
    // console.log(`Navigating ${direction}. New Month: ${month}, New Year: ${year}`); // Debug log
    setCurrentMonth(month); setCurrentYear(year);
  };
  const navigateYearGrid = (direction: 'prev' | 'next') => {
    const currentStartYear = Math.floor(currentYear() / 12) * 12;
    const newStartYear = direction === 'prev' ? currentStartYear - 12 : currentStartYear + 12;
    setCurrentYear(newStartYear + 6);
  };

  // --- Testo Input ---
  const displayText = createMemo(() => {
    const start = startDate();
    const end = endDate();
    if (start && end) {
      const orderedStart = start.getTime() < end.getTime() ? start : end;
      const orderedEnd = start.getTime() < end.getTime() ? end : start;
      return `${formatDate(orderedStart)} - ${formatDate(orderedEnd)}`;
    } else if (start) {
      return `${formatDate(start)} - ...`;
    }
    return "Seleziona intervallo";
  });

  // --- Nomi Giorni/Mesi (Italiano) ---
  const weekDays = ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];
  const monthNamesFull = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

  return (
    <div ref={containerRef} class={`${styles.container} ${isOpen() ? styles.open : ''}`} data-open={isOpen()}>
      {/* Input Control */}
      <div class={styles.control}>
        <input
          type="text"
          class={styles.input}
          placeholder="Seleziona intervallo"
          value={displayText()}
          readonly
          onClick={() => setIsOpen(!isOpen())}
          aria-label="Intervallo di date selezionato"
        />
        <button type="button" class={styles.trigger} onClick={() => setIsOpen(!isOpen())} aria-label="Apri/Chiudi calendario">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" /></svg>
        </button>
      </div>

      {/* Calendario Popup Singolo */}
      <Show when={isOpen()}>
        <div class={styles.calendar}>
          {/* Vista Giorno */}
          <Show when={view() === "day"}>
            <div class={styles.viewControl}>
              <button type="button" class={styles.navButton} onClick={() => navigateMonth('prev')} aria-label="Mese precedente">&lt;</button>
              <button type="button" class={styles.viewTrigger} onClick={() => setView("month")}>{monthNamesFull[currentMonth()]} {currentYear()}</button>
              <button type="button" class={styles.navButton} onClick={() => navigateMonth('next')} aria-label="Mese successivo">&gt;</button>
            </div>
            <table class={styles.table}>
              <thead>
                <tr><Index each={weekDays}>{(day) => <th class={styles.tableHeader}>{day()}</th>}</Index></tr>
              </thead>
              <tbody>
                {/* Usa il memo per la griglia */}
                <Index each={monthGridData()}>
                  {(week) => (
                    <tr>
                      <Index each={week()}>
                        {(dayObj) => {
                          const dayDate = dayObj().date; // Data originale per visualizzazione/mese
                          const normalizedDay = new Date(dayDate); // Crea copia
                          normalizedDay.setHours(0, 0, 0, 0); // Normalizza copia
                          const dayTime = normalizedDay.getTime();

                          const isCurrentMonth = dayObj().isCurrentMonth;
                          const isToday = new Date().setHours(0,0,0,0) === dayTime;

                          // Usa getTime() per confronti sicuri (anche con date nulle)
                          const startTime = startDate()?.getTime();
                          const endTime = endDate()?.getTime();

                          const isStartDate = !!startTime && startTime === dayTime;
                          const isEndDate = !!endTime && endTime === dayTime;
                          const isEdge = isStartDate || isEndDate;

                          // Calcola isInRange in modo robusto
                          const isInRange = isCurrentMonth && !!startTime && !!endTime && startTime !== endTime &&
                                            dayTime > Math.min(startTime, endTime) &&
                                            dayTime < Math.max(startTime, endTime);

                          return (
                            <td class={styles.tableCell} classList={{ [styles.inRange]: isInRange && !isEdge, [styles.rangeEdge]: isEdge && !!startDate() && !!endDate() }}>
                              <button
                                type="button"
                                class={styles.cellTrigger}
                                classList={{
                                  [styles.selected]: isCurrentMonth && isEdge,
                                  [styles.today]: isCurrentMonth && isToday && !isEdge,
                                  [styles.otherMonth]: !isCurrentMonth
                                }}
                                // Rimosso stile inline per 'today', usa la classe CSS .today
                                // style={ isCurrentMonth && isToday && !isEdge ? { color: styles.accentSecondaryColor } : {} }
                                onClick={() => handleDaySelect(dayDate)} // Passa la data originale non normalizzata
                                aria-label={`Seleziona ${dayDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}`}
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
              <button type="button" class={styles.viewTrigger} onClick={() => setView("year")}>{currentYear()}</button>
            </div>
            <div class={styles.monthGrid}>
              {monthNames.map((month, i) => (<button type="button" class={styles.monthCell} classList={{[styles.selected]: currentMonth() === i}} onClick={() => handleMonthSelect(i)} aria-label={`Seleziona ${monthNamesFull[i]}`}>{month}</button>))}
            </div>
          </Show>

          {/* Vista Anno */}
          <Show when={view() === "year"}>
            <div class={styles.viewControl}>
              <button type="button" class={styles.navButton} onClick={() => navigateYearGrid('prev')} aria-label="Anni precedenti">&lt;</button>
              <span class={styles.viewTrigger}>{generateYearGrid()[0]} - {generateYearGrid()[11]}</span>
              <button type="button" class={styles.navButton} onClick={() => navigateYearGrid('next')} aria-label="Anni successivi">&gt;</button>
            </div>
            <div class={styles.yearGrid}>
              {generateYearGrid().map(year => (<button type="button" class={styles.yearCell} classList={{[styles.selected]: currentYear() === year}} onClick={() => handleYearSelect(year)} aria-label={`Seleziona anno ${year}`}>{year}</button>))}
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}