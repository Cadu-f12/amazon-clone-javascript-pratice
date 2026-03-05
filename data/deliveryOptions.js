import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOption = [{
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
}]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryRadioOption;

  deliveryOption.forEach((option) => {
      if (option.id === deliveryOptionId) {
          deliveryRadioOption = option;
      }
  });

  return deliveryRadioOption || deliveryOption[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
  let dayOfWeek = deliveryDate.format('dddd');

  if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
    let newDate = deliveryDate;
    
    if (dayOfWeek === 'Saturday') {
      newDate = deliveryDate.add(2, 'day');
      dayOfWeek = newDate.format('dddd');

      return newDate.format('dddd, MMMM D');
    } else {
      newDate = deliveryDate.add(1, 'day');
      dayOfWeek = newDate.format('dddd');

      return newDate.format('dddd, MMMM D');
    }
  }

  return deliveryDate.format('dddd, MMMM D');
}