import { setWeek } from './timeline';
import { dragOver, dragEnter, dragLeave, dragDrop } from './dnd.js';
export async function getUsers() {
  try {
    const response = await fetch(
      'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users'
    );
    if (!response.ok) {
      throw new Error(`Can't get users from server ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (err) {
    console.log(err.message);
  }
}

const userList = document.querySelector('.users');

getUsers().then((users) => {
  users.map((user) => {
    const userWrapper = document.createElement('div');
    userWrapper.classList.add('users_row');
    userWrapper.addEventListener('dragover', dragOver);
    userWrapper.addEventListener('dragenter', dragEnter);
    userWrapper.addEventListener('dragleave', dragLeave);
    userWrapper.addEventListener('drop', dragDrop);
    userList.append(userWrapper);

    const userDiv = document.createElement('div');
    userDiv.classList.add('users_item');
    userDiv.setAttribute('data-user', user.id);
    userDiv.innerText = `${user.surname} ${user.firstName} ${user.secondName}`;
    userWrapper.append(userDiv);

    const cells = document.createElement('div');
    cells.classList.add('cells');
    cells.setAttribute('data-user', user.id);
    userWrapper.append(cells);

    createCells(user.id);
  });
});

export function createCells(id) {
  const week = setWeek();
  const cells = document.querySelector(`.cells[data-user='${id}']`);
  for (let i = 0; i < 7; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cells_item');
    cell.setAttribute('data-user', id);
    cell.setAttribute('data-date', week[i]);
    if (
      window.matchMedia('screen and (max-width: 768px)').matches &&
      document.querySelector('.timeline_item--today')?.getAttribute('data-date') != week[i]
    ) {
      cell.classList.add('hidden');
    }
    cells.append(cell);
  }
}
