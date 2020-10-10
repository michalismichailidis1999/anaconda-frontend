export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const scrollOnTopOfThePage = () => {
  window.scrollTo(0, 0);
};

export const getExtraPrice = () => {
  return 6;
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