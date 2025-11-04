import { Stack, Tooltip, IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: <CalendarViewMonthIcon /> },
  { value: 'timeGridWeek', label: 'Week', icon: <CalendarViewWeekIcon /> },
  { value: 'timeGridDay', label: 'Day', icon: <CalendarViewDayIcon /> },
]

export default function CalendarToolbar({ date, view, onNextDate, onPrevDate, onToday, onChangeView }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        backgroundColor: '#FAF5F0',
        borderColor: 'divider',
        flexShrink: 0
      }}
    >
      <div className='flex items-center gap-4'>
        {VIEW_OPTIONS.map((viewOption) => (
          <Tooltip key={viewOption.label} title={viewOption.label}>
            <button onClick={() => onChangeView(viewOption.value)} className={`hover:bg-accent-100 rounded-lg p-1 transition-colors duration-300 ${viewOption.value === view && 'bg-accent-200 rounded-lg p-1'}`}>
              {viewOption.icon}
            </button>
          </Tooltip>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <IconButton onClick={onPrevDate}>
          <ArrowLeft />
        </IconButton>
        <h5 className='text-xl font-semibold text-primary-900'>{date.toISOString().slice(0, 10)}</h5>
        <IconButton onClick={onNextDate}>
          <ArrowRight />
        </IconButton>
      </div>
      <button className='mb-[-2px] uppercase text-lg mr-2 rounded-lg text-accent-600 font-bold hover:text-primary-900 ease-in-out duration-300' onClick={onToday}>
        Today
      </button>
    </Stack>
  );
}