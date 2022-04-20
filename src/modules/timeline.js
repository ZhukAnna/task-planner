const prevBtn = document.querySelector('.timeline_btn--prev');
const nextBtn = document.querySelector('.timeline_btn--next');
const timeline = document.querySelector('.timeline_wrapper');

let currentDate = new Date();
let options = { month: 'numeric', day: 'numeric' };
let today = new Intl.DateTimeFormat('ru-RU', options).format(currentDate);
//let week = [];

for (let i = 1; i <= 7; i++) {
  let day = new Intl.DateTimeFormat('ru-RU', options).format(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + i)
  );
  //week.push(day);
  let date = document.createElement('div');
  day === today? date.classList.add('timeline_item','timeline_item--today') : date.classList.add('timeline_item');
  date.innerText = day;
  timeline.append(date);
}

//console.log(today, week);
