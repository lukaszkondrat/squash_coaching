'use client';

import { useState, useEffect } from 'react';
import { Card, Dialog, DialogContent } from '@mui/material';
import { useResponsive } from '@/app/_hooks/useResponsive';
import { useCalendar } from '@/app/_hooks/useCalendar';
import { useCreateNewBooking } from '@/app/_hooks/useCreateNewBooking';
import { useGetAllBookings } from '@/app/_hooks/useGetAllBookings';
import { useUpdateMember } from '@/app/_hooks/useUpdateMember';
import { ACCENT_600 } from '@/app/constants';
import { useAuthContext } from '@/app/_components/AuthProvider';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import CalendarToolbar from '@/app/_components/CalendarToolbar';
import DialogContentText from '@/app/_components/DialogContentText';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'

export default function BookingsPage() {
  const { member } = useAuthContext();
  const { createNewBooking } = useCreateNewBooking();
  const { updateMember } = useUpdateMember();
  const { bookings: allBookings } = useGetAllBookings();
  const [bookings, setBookings] = useState([]);
  const [sessionType, setSessionType] = useState('private');
  const [location, setLocation] = useState('Kallang');

  const {
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
    handleDateClick } = useCalendar();

  useEffect(() => {
    if (allBookings) {
      const dataToDisplay = allBookings.map((booking) => {
        const isOwn = booking.memberId === member?.id;
        return {
          title: booking.location,
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
          className: isOwn ? ['event-own'] : [],
        };
      });
      setBookings(dataToDisplay);
    }
  }, [allBookings, member?.id]);

  const handleConfirmBooking = async () => {
    const durationHours = Math.round((new Date(selectedRange.end) - new Date(selectedRange.start)) / 3600000);
    const newBooking = {
      startDate: selectedRange.start,
      endDate: selectedRange.end,
      sessionType: sessionType,
      location: location,
      duration: durationHours,
      status: 'confirmed',
      memberId: member.id
    };
    if (member.sessionsLeft >= 1 && member.sessionsLeft >= newBooking.duration) {
      createNewBooking(newBooking);
      updateMember({ email: member.email, updatedMember: { sessionsLeft: member.sessionsLeft - newBooking.duration } })
      setIsDialogOpen(false);
    } else {
      toast.error('You do not have enough sessions left in your monthly pass to book this session');
    }
  };

  const isDesktop = useResponsive('up', 'sm');

  if (!member?.membershipActive) {
    return <div className='flex flex-col justify-center items-center text-center h-full gap-2'>
      <p className='text-2xl font-medium'>You membership is inactive.</p>
      <p className='text-xl'>Please <Link href="/members" className="text-accent-500 hover:text-accent-600 ease-in-out duration-300">
        activate</Link> your membership to start booking sessions</p>
    </div>
  }

  return <>
    <div className='mb-4 text-md text-primary-100 flex items-center gap-6'>
      <p>Please note that your own bookings are highlighted with darker borders to help you easily identify them.</p>
    </div>
    <Card sx={{
      backgroundColor: '#FAF5F0',
      border: `2px solid ${ACCENT_600}`,
      height: '100%', display: 'flex', flexDirection: 'column'
    }}>
      <CalendarToolbar
        date={date}
        view={view}
        onNextDate={handleClickDateNext}
        onPrevDate={handleClickDatePrev}
        onToday={handleClickToday}
        onChangeView={handleChangeView}
      />
      <FullCalendar
        key={view}
        className="custom-calendar-styles"
        weekends
        selectable={view !== 'dayGridMonth'}
        timeZone='utc'
        firstDay={1}
        events={bookings || []}
        ref={calendarRef}
        rerenderDelay={10}
        initialDate={date}
        initialView={view}
        dayMaxEventRows={3}
        eventDisplay="block"
        headerToolbar={false}
        allDayMaintainDuration
        select={handleSelectRange}
        dateClick={view === 'dayGridMonth' ? handleDateClick : undefined}
        height={isDesktop ? '28rem' : 'auto'}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        slotDuration="01:00:00"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        slotLabelInterval="01:00"
        allDaySlot={false}
        selectMirror
        selectOverlap={false}
        selectConstraint={{
          startTime: '06:00',
          endTime: '22:00',
        }}
        selectMinDistance={isDesktop ? "01:00:00" : "00:30:00"}
        selectMaxDistance="01:00:00"
      />
    </Card>
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      fullWidth
      maxWidth="xs"
      open={isDialogOpen}
      sx={{ p: 4 }}
      TransitionProps={{ timeout: 0 }}
    >
      <DialogContent>
        <DialogContentText
          selectedRange={selectedRange}
          sessionType={sessionType}
          location={location}
          setSessionType={setSessionType}
          setLocation={setLocation}
          handleConfirmBooking={handleConfirmBooking}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  </>
}