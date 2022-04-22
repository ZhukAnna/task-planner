const dnd = () => {
  console.log('hi');
  const tasks = document.querySelectorAll('.backlog_task');
  const cells = document.querySelectorAll('.cells_item');
  const users = document.querySelectorAll('.users_item');
  let currentTask = null;

  tasks.forEach((task) => task.addEventListener('dragstart', dragStart));
  tasks.forEach((task) => task.addEventListener('dragend', dragEnd));

  cells.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
  });

  /*   users.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
  }); */

  function dragStart(e) {
    console.log(e.target);
    currentTask = e.target;
    //e.target.classList.add('task');
    //setTimeout(() => e.target.classList.add('hide'), 0);
    return currentTask;
  }
  function dragEnd(e) {
    e.target.classList.add('task');
    e.target.classList.remove('hold');
    e.target.classList.remove('hide');
  }
  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.target.classList.add('cells_item--target');
  }

  function dragLeave(e) {
    e.target.classList.remove('cells_item--target');
  }

  function dragDrop(e) {
    e.target.classList.remove('cells_item--target');
    e.target.append(currentTask);
  }
};

export default dnd;
