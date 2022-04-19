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
  users.map((item) => {
    let user = document.createElement('div');
    user.classList.add('users_item');
    user.innerText = `${item.surname} ${item.firstName} ${item.secondName}`;
    userList.append(user);
  });

  repeat(createCell, users.length * 7);
});

function repeat(func, times) {
  func();
  times && --times && repeat(func, times);
}

function createCell() {
  let cell = document.createElement('div');
  cell.classList.add('cells_item');
  cells.append(cell);
}
