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