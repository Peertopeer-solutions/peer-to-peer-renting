import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid' 
import {
  add,
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { Fragment, useState } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const DatePickerStyled = ({setEndDate,setStartDate, startDate, endDate}) => {
  
  let today = startOfToday()
  
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  let firstDayNextMonth = addMonths(firstDayCurrentMonth,1)

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),  
    end: endOfWeek(endOfMonth(firstDayCurrentMonth))  ,
  })
  let NextMonthdays = eachDayOfInterval({
    start: startOfWeek(firstDayNextMonth) ,
    end: endOfWeek(endOfMonth(firstDayNextMonth)) ,
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -2 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 2 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }


  // Step 2: Modify the component to display the selected date range
  const selectedDateRangeText =
    startDate && endDate
      ? `${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`
      : 'Select a date range';

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
 
  
  return (
    <div className="">
      <div className=" mx-auto  ">
          <div className=" flex flex-col space-y-3">
            <div className="md:relative md:top-16 flex justify-between  ">
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 place-content-center space-x-3 max-w-max mx-auto  h-[50vh] overflow-y-auto'>

            <div className='flex flex-col space-y-4'>
            <div className='w-max-w mx-auto text-center'>
            <p className='font-medium text-blue-500 text-[16px]'> {format(firstDayCurrentMonth, 'MMMM yyyy')}</p>
          </div>

            <div className="grid grid-cols-7  text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7   mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDateBeforeToday(day)}
                    className={classNames(
                      isEqual(day, startDate) && 'bg-blue-600 text-white',
                      isEqual(day, endDate) && 'bg-blue-600 text-white',
                       day > startDate && day < endDate && 'bg-blue-100',
                       day< today && 'line-through text-gray-300',    

                      
                      isSameMonth(day>today, firstDayCurrentMonth) && 'text-gray-900',  
                      isToday(day) && !isEqual(day, startDate) && 'bg-red-500 text-white',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isBefore(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                 
                </div>
              ))}
            </div>
            </div>
          
          <div className='flex flex-col space-y-4'>
          <div className='w-max-w mx-auto text-center'>
            <p className='font-medium text-blue-500 text-[16px]'> {format(firstDayNextMonth, 'MMMM yyyy')}</p>
          </div>

             <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7   mt-2 text-sm">
              {NextMonthdays.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDateBeforeToday(day)}
                    className={classNames(
                      isEqual(day, startDate) && 'bg-blue-600 text-white',
                      isEqual(day, endDate) && 'bg-blue-600 text-white',
                       day > startDate && day < endDate && 'bg-blue-100',
                       day< today && 'line-through text-gray-300',    

                       !isEqual(day, selectedDay) &&
                       !isToday(day) &&
                       !isSameMonth(day, firstDayNextMonth) &&
                       'text-gray-400',
                       !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isBefore(day, firstDayNextMonth) &&
                        'text-gray-400',
                      
                      
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                 
                </div>
              ))}
            </div>
          </div>
            </div>

           
          </div>
          
        </div>
      </div>
    
  
  )
}


let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]


export default DatePickerStyled
