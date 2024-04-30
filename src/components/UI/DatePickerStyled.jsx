import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Icon from '@src/components/Design/Icon';
import Box from '@src/components/Layout/Box';
import Column from '@src/components/Layout/Column';
import Row from '@src/components/Layout/Row';
import { Icons } from '@src/constant/icons';
import {
  add,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function CalenderHeader({ content }) {
  return (
    <div className='w-max-w mx-auto text-center'>
      <p className='text-blue-600 font-bold'>{content}</p>
    </div>
  );
}

function CalendarDate({
  day,
  startDate,
  endDate,
  onClick,
  firstDayOfMonth,
  booked,
}) {
  const today = isToday(day);
  const isStartDate = isEqual(day, startDate);
  const isEndDate = isEqual(day, endDate);
  const isInSelectedRange = day > startDate && day < endDate;
  const selected = isStartDate || isEndDate || isInSelectedRange;
  return (
    <button
      className={twMerge(
        'h-8 w-8 flex justify-center items-center ',
        today && 'bg-red-500 text-white',
        day < startOfToday() && 'line-through text-gray-200',
        isStartDate && 'bg-blue-600 rounded-l-full text-white',
        isEndDate && 'bg-blue-600 rounded-r-full text-white',
        isInSelectedRange && 'bg-blue-100',
        startOfToday() <= day &&
          !isSameMonth(day, firstDayOfMonth) &&
          'text-gray-400 invisible',
        booked && 'line-through',
        !selected && 'rounded-full'
      )}
      onClick={booked ? undefined : onClick}
    >
      <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
    </button>
  );
}

function getDays(firstDayOfMonth) {
  return eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });
}

function getFirstDaysForCurrentAndNextMonths(month) {
  const firstDayCurrentMonth = parse(month, 'MMM-yyyy', new Date());
  const firstDayNextMonth = addMonths(firstDayCurrentMonth, 1);
  return { firstDayCurrentMonth, firstDayNextMonth };
}

function Calendar({
  days,
  firstDay,
  bookedDates,
  startDate,
  endDate,
  handleDateClick,
}) {
  const dayTab = (
    <div className='grid grid-cols-7 text-xs leading-6 text-center text-gray-500'>
      {weekDays.map((day) => (
        <span>{day}</span>
      ))}
    </div>
  );
  return (
    <div className='flex flex-col space-y-2'>
      <CalenderHeader content={format(firstDay, 'MMM yyyy')} />
      {dayTab}
      <div className='grid grid-cols-7 text-sm'>
        {days.map((day, dayIdx) => {
          const booked =
            bookedDates.filter(
              ({ startDate, endDate }) => day >= startDate && day <= endDate
            ).length > 0;
          return (
            <CalendarDate
              day={day}
              startDate={startDate}
              endDate={endDate}
              onClick={handleDateClick.bind(null, day)}
              firstDayOfMonth={firstDay}
              booked={booked}
            />
          );
        })}
      </div>
    </div>
  );
}


const DatePickerStyled = ({
  setEndDate,
  setStartDate,
  startDate,
  endDate,
  bookedDates,
}) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  console.log(bookedDates);
  const { firstDayCurrentMonth, firstDayNextMonth } =
    getFirstDaysForCurrentAndNextMonths(currentMonth);
  const currentMonthDays = getDays(firstDayCurrentMonth);
  const nextMonthDays = getDays(firstDayNextMonth);

  function previousMonthHandler() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonthHandler() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  // Step 2: Modify the component to display the selected date range
  // const selectedDateRangeText =
  //   startDate && endDate
  //     ? `${format(startDate, 'MMMM d, yyyy')} - ${format(
  //         endDate,
  //         'MMMM d, yyyy'
  //       )}`
  //     : 'Select a date range';

  // Step 3: Allow users to select a date range by clicking on the calendar cells
  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      // If no start date or both start and end dates are selected, set the start date.
      setStartDate(day);
      setEndDate(null);
    } else if (day >= startDate) {
      // If a start date is already selected and the clicked day is after or equal to it, set the end date.
      setEndDate(day);
    } else {
      // If a start date is selected and the clicked day is before it, update the start date and clear the end date.
      setStartDate(day);
      setEndDate(null);
    }
  };
  const isDateBeforeToday = (date) => date < startOfToday();

  const buttons = (
    <div className='md:relative md:top-9 flex justify-between  '>
      <button
        type='button'
        onClick={previousMonthHandler}
        className='-my-1.5 ml-1 flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition'
      >
        <span className='sr-only'>Previous month</span>
        <Icon name={Icons.ArrowLeft} className='text-lg ' />
      </button>
      <button
        onClick={nextMonthHandler}
        type='button'
        className='-my-1.5 mr-1 flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition'
      >
        <span className='sr-only'>Next month</span>
        <Icon name={Icons.ArrowRight} className='text-lg' />
      </button>
    </div>
  );

  return (
        <Column className='space-y-4 py-4' style = {{height: 'min(50vh, 20rem)'}}>
          {buttons}
            <Row className='space-x-8'>
              <Calendar
                startDate={startDate}
                endDate={endDate}
                bookedDates={bookedDates}
                days={currentMonthDays}
                firstDay={firstDayCurrentMonth}
                handleDateClick={handleDateClick}
              />
              <Calendar
                startDate={startDate}
                endDate={endDate}
                bookedDates={bookedDates}
                days={nextMonthDays}
                firstDay={firstDayNextMonth}
                handleDateClick={handleDateClick}
              />
            </Row>
        </Column>
  );
};

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export default DatePickerStyled;
