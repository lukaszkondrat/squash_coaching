import { useState, useRef } from 'react';

export function useCalendar() {
  const [view, setView] = useState('timeGridWeek');
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calendarRef = useRef(null);

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
      setIsDialogOpen(true);
      setSelectedRange({
        start: new Date(arg.start),
        end: new Date(arg.end),
      });
    }
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDateClick = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView('timeGridDay', arg.date);
      setView('timeGridDay');
      setDate(arg.date);
    }
  };

  return {
    view,
    date,
    calendarRef,
    isDialogOpen,
    selectedRange,
    setIsDialogOpen,
    handleClickDatePrev,
    handleClickDateNext,
    handleSelectRange,
    handleClickToday,
    handleChangeView,
    handleDateClick,
  }
}