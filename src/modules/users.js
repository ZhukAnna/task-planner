import { setWeek } from './timeline';
import { dragOver, dragEnter, dragLeave, dragDrop } from './dnd.js';
export async function getUsers() {
  const response = await fetch(
    'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users'
  );

  if (!response.ok) {
    throw new Error(`Can't get users from server ${response.status}`);
  }

  const users = await response.json();
  return users;
}
getUsers().catch((err) => {
  console.log(err.message);
});

const userList = document.querySelector('.users');
const cells = document.querySelector('.cells');

getUsers().then((users) => {
  users.map((user) => {
    let userDiv = document.createElement('div');
    userDiv.classList.add('users_item');
    userDiv.setAttribute('data-user', user.id);
    userDiv.addEventListener('dragover', dragOver);
    userDiv.addEventListener('dragenter', dragEnter);
    userDiv.addEventListener('dragleave', dragLeave);
    userDiv.addEventListener('drop', dragDrop);
    userDiv.innerText = `${user.surname} ${user.firstName} ${user.secondName}`;
    userList.append(userDiv);
    createCell(user.id);
  });
});

export function createCell(id) {
  const week = setWeek();
  for (let i = 0; i < 7; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cells_item');
    cell.setAttribute('data-user', id);
    cell.setAttribute('data-date', week[i]);
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
    cells.append(cell);
  }
}
