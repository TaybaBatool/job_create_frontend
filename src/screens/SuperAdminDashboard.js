import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: '09:00 NW2023',
    start: new Date('2025-03-03T09:00:00'),
    end: new Date('2025-03-03T10:00:00'),
  },
  {
    title: '13:00 EV1034',
    start: new Date('2025-03-08T13:00:00'),
    end: new Date('2025-03-08T14:00:00'),
  },
];

const MyCalendar = () => (
  <div style={{ height: 600 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      views={['month', 'week', 'day']}
      style={{ height: 600 }}
    />
  </div>
);

export default MyCalendar;
