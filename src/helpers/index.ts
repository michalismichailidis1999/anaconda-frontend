import {CartItem} from '../interfaces'

export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const scrollOnTopOfThePage = () => {
  window.scrollTo(0, 0);
};

export const getExtraPrice = () => {
  let cart = JSON.parse(localStorage.getItem("cart") + "");

  let totalWeight = 0;
  let total = 0;

  cart.forEach((item: CartItem) => {
    totalWeight += Number((item.quantity * item.weight).toFixed(2));
  });

  if(totalWeight <= 2){
    return 2.4;
  }else{
    total += 2.4;
    totalWeight -= 2;

    while(totalWeight >= 1){
      total += 0.8;
      totalWeight -= 1;
    }

    if(totalWeight > 0){
      total += 0.8;
    }
  }

  return total;
};

export const shuffle = (arr: string[]) => {
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}