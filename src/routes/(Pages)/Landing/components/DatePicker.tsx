import { createSignal, Index, Show } from "solid-js";
import styles from "./DatePicker.module.scss";

export default function DatePicker() {
  const [date, setDate] = createSignal<Date | null>(null);
  const [isOpen, setIsOpen] = createSignal(false);
  const [view, setView] = createSignal<"day" | "month" | "year">("day");
  const [currentMonth, setCurrentMonth] = createSignal(new Date().getMonth());
  const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());

  const generateMonthGrid = () => {
    const year = currentYear();
    const month = currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();
    
    const weeks: { date: Date; isCurrentMonth: boolean }[][] = [];
    let currentWeek: { date: Date; isCurrentMonth: boolean }[] = [];
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({
        date: new Date(year, month - 1, prevMonthLastDay - firstDayOfWeek + i + 1),
        isCurrentMonth: false
      });
    }
    
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
    
    const daysRemaining = 7 - currentWeek.length;
    for (let day = 1; day <= daysRemaining; day++) {
      currentWeek.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const generateYearGrid = () => {
    const year = currentYear();
    const startYear = year - (year % 12);
    return Array.from({length: 12}, (_, i) => startYear + i);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
  };

  const handleDaySelect = (day: Date) => {
    setDate(day);
    setIsOpen(false);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    setView("day");
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setView("month");
  };

  const navigateYearGrid = (direction: 'prev' | 'next') => {
    const currentStartYear = currentYear() - (currentYear() % 12);
    const newStartYear = direction === 'prev' 
      ? currentStartYear - 12 
      : currentStartYear + 12;
    
    setCurrentYear(newStartYear + 5);
  };

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div 
      class={styles.container} 
      data-open={isOpen()}
      style={{
        position: 'relative',
        width: '100%',
        'max-width': '300px',
      }}
    >
      <div class={styles.control}>
        <input
          type="text"
          class={styles.input}
          placeholder="Pick a date"
          value={formatDate(date())}
          readonly
          onClick={() => setIsOpen(!isOpen())}
        />
        <button class={styles.trigger} onClick={() => setIsOpen(!isOpen())}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
          </svg>
        </button>
      </div>

      <Show when={isOpen()}>
        <div 
          class={styles.calendar}
          style={{
            width: '300px',
            'max-width': '300px',
            position: 'absolute',
            left: '0',
            'z-index': '1000'
          }}
        >
          <Show when={view() === "day"}>
            <div class={styles.viewControl}>
              <button class={styles.viewTrigger} onClick={() => setView("month")}>
                {monthNames[currentMonth()]} {currentYear()}
              </button>
            </div>

            <table class={styles.table}>
              <thead>
                <tr>
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
                                class={styles.cellTrigger}
                                classList={{
                                  [styles.selected]: isCurrentMonth && isSelected,
                                  [styles.today]: isCurrentMonth && isToday,
                                  [styles.disabled]: !isCurrentMonth
                                }}
                                onClick={() => isCurrentMonth && handleDaySelect(dayDate)}
                                disabled={!isCurrentMonth}
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

          <Show when={view() === "month"}>
            <div class={styles.viewControl}>
              <button class={styles.viewTrigger} onClick={() => setView("year")}>
                {currentYear()}
              </button>
            </div>

            <div class={styles.monthGrid}>
              {monthNames.map((month, i) => (
                <button
                  class={styles.monthCell}
                  classList={{[styles.selected]: currentMonth() === i}}
                  onClick={() => handleMonthSelect(i)}
                >
                  {month}
                </button>
              ))}
            </div>
          </Show>

          <Show when={view() === "year"}>
            <div class={styles.viewControl}>
              <button 
                class={styles.navButton} 
                onClick={() => navigateYearGrid('prev')}
              >
                &lt;
              </button>
              <button class={styles.viewTrigger}>
                {currentYear() - (currentYear() % 12)} - {currentYear() - (currentYear() % 12) + 11}
              </button>
              <button 
                class={styles.navButton} 
                onClick={() => navigateYearGrid('next')}
              >
                &gt;
              </button>
            </div>

            <div class={styles.yearGrid}>
              {generateYearGrid().map(year => (
                <button
                  class={styles.yearCell}
                  classList={{[styles.selected]: currentYear() === year}}
                  onClick={() => handleYearSelect(year)}
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