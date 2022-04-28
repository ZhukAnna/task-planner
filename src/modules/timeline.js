const prevBtn = document.querySelector('.timeline_btn--prev');
const nextBtn = document.querySelector('.timeline_btn--next');
const timeline = document.querySelector('.timeline_wrapper');

const currentDate = new Date();
const options = { month: 'numeric', day: 'numeric' };
const today = currentDate.toLocaleString('ru', options);
let weekNumber = 0;

const setWeek = (n) => {
  const week = [];
  timeline.innerHTML = '';
  weekNumber += n;

  for (let i = 1; i <= 7; i++) {
    let day = new Intl.DateTimeFormat('ru', options).format(
      new Date().setDate(currentDate.getDate() - currentDate.getDay() + i + weekNumber)
    );

    week.push(day);

    let date = document.createElement('div');
    day === today
      ? date.classList.add('timeline_item', 'timeline_item--today')
      : date.classList.add('timeline_item');
    date.setAttribute('data-date', day);
    date.innerText = day;
    timeline.append(date);
  }
  console.log(today, week);
};

setWeek(weekNumber);

prevBtn.addEventListener('click', () => setWeek(-7));
nextBtn.addEventListener('click', () => setWeek(7));

// создать функцию для обновления data-date в ячейках задач
