import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {isWeekend} from '../scripts/utils/datetime.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption = null;

  deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    // This has id, deliveryDays and priceCents
    deliveryOption = option;
  }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  let currentDate = dayjs();

  // How many days left until delivery which starts at deliverOptions.deliveryDays
  let daysLeft = deliveryOption.deliveryDays;

  while ( daysLeft ) {
     //Increment to the next date
     currentDate = currentDate.add(1, 'days');
     if( !isWeekend(currentDate) ) {
       // This will only decrement on week days
       daysLeft--;     
     }
  }

  return currentDate.format('dddd, MMMM D');
}