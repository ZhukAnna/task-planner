const timeline = document.querySelector('.timeline_wrapper');

const currentDate = new Date();
const options = { month: 'numeric', day: 'numeric' };
const today = currentDate.toLocaleString('ru', options);
let weekNumber = 0;

export const setWeek = (n = 0) => {
  const week = [];
  timeline.innerHTML = '';
  weekNumber += n;

  for (let i = 1; i <= 7; i++) {
    let date = document.createElement('div');
    let day = new Date();

    day.setDate(currentDate.getDate() - currentDate.getDay() + i + weekNumber);

    week.push(day.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' }));

    day = day.toLocaleString('ru', options);
    day === today
      ? date.classList.add('timeline_item', 'timeline_item--today')
      : date.classList.add('timeline_item');
    date.innerText = day;
    timeline.append(date);
  }
  return week;
};
