// Products where paymont done,
// products list
// {start, end} ....

import { RentalRequest } from '@src/types';

export const mergeBookedDates = (rentalRequests: RentalRequest[]) => {
  const bookedDates = rentalRequests?.map((request) => ({
      startDate: request.startDate.toDate(),
      endDate: request.endDate.toDate(),
    }))
    console.log(bookedDates)
return bookedDates || [];
};

