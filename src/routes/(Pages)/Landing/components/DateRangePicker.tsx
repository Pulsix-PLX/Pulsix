import { createSignal, Index, Show, createMemo } from "solid-js";
import styles from "./DateRangePicker.module.scss";

export default function DateRangePicker() {
  const [startDate, setStartDate] = createSignal<Date | null>(null);
  const [endDate, setEndDate] = createSignal<Date | null>(null);
  const [isOpen, setIsOpen] = createSignal(false);
  const [view, setView] = createSignal<"day" | "month" | "year">("day");
  const [currentMonth, setCurrentMonth] = createSignal(new Date().getMonth());
  const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());
  const [activeCalendar, setActiveCalendar] = createSignal<'start' | 'end'>('start');

  // Most of the helper functions will be similar to the original DatePicker
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
    if (activeCalendar() === 'start') {
      // If selecting start date after end date, reset end date
      if (endDate() && day > endDate()) {
        setEndDate(null);
      }
      setStartDate(day);
      setActiveCalendar('end');
    } else {
      // If selecting end date before start date, reset start date
      if (startDate() && day < startDate()) {
        setStartDate(day);
      }
      setEndDate(day);
      setIsOpen(false);
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

  const navigateYearGrid = (direction: 'prev' | 'next') => {
    const currentStartYear = currentYear() - (currentYear() % 12);
    const newStartYear = direction === 'prev' 
      ? currentStartYear - 12 
      : currentStartYear + 12;
    
    setCurrentYear(newStartYear + 5);
  };

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const displayText = createMemo(() => {
    if (startDate() && endDate()) {
      return `${formatDate(startDate())} - ${formatDate(endDate())}`;
    }
    return "Select date range";
  });

  // Utility function to generate classList object
  const generateClassList = (
    isCurrentMonth: boolean, 
    isStartDate: boolean, 
    isEndDate: boolean, 
    isToday: boolean, 
    isInRange: boolean
  ) => {
    return {
      [styles.cellTrigger]: true,
      [styles.selected]: isCurrentMonth && (isStartDate || isEndDate),
      [styles.today]: isCurrentMonth && isToday,
      [styles.disabled]: !isCurrentMonth,
      [styles.inRange]: isCurrentMonth && isInRange
    };
  };

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
          placeholder="Pick a date range"
          value={displayText()}
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
          class={styles.calendarContainer}
          style={{
            display: 'flex',
            gap: '16px',
            position: 'absolute',
            left: '0',
            'z-index': '1000'
          }}
        >
          {/* Start Date Calendar */}
          <div 
            class={`${styles.calendar} ${activeCalendar() === 'start' ? styles.activeCalendar : ''}`}
            style={{
              width: '300px',
              'max-width': '300px',
            }}
          >
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
                          const isStartDate = startDate()?.toDateString() === dayDate.toDateString();
                          const isEndDate = endDate()?.toDateString() === dayDate.toDateString();
                          const isInRange = startDate() && endDate() && 
                            dayDate > startDate() && dayDate < endDate();
                          
                          return (
                            <td class={styles.tableCell}>
                              <button
                                classList={generateClassList(
                                  isCurrentMonth, 
                                  isStartDate, 
                                  isEndDate, 
                                  isToday, 
                                  !!isInRange
                                )}
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
          </div>

          {/* End Date Calendar */}
          <div 
            class={`${styles.calendar} ${activeCalendar() === 'end' ? styles.activeCalendar : ''}`}
            style={{
              width: '300px',
              'max-width': '300px',
            }}
          >
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
                          const isStartDate = startDate()?.toDateString() === dayDate.toDateString();
                          const isEndDate = endDate()?.toDateString() === dayDate.toDateString();
                          const isInRange = startDate() && endDate() && 
                            dayDate > startDate() && dayDate < endDate();
                          
                          return (
                            <td class={styles.tableCell}>
                              <button
                                classList={generateClassList(
                                  isCurrentMonth, 
                                  isStartDate, 
                                  isEndDate, 
                                  isToday, 
                                  !!isInRange
                                )}
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
          </div>
        </div>
      </Show>
    </div>
  );
}
