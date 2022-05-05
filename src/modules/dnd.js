let currentTask = null;

export function dragStart(e) {
  e.target.classList.add('backlog_task--selected');
  console.log(e.target);
  return (currentTask = e.target);
}

export function dragEnd(e) {
  e.target.classList.remove('backlog_task--selected');
}

export function dragOver(e) {
  e.preventDefault();
}

export function dragEnter(e) {
  if (!e.target.classList.contains('task')) {
    e.target.classList.add('cells_item--target');
  }
}

export function dragLeave(e) {
  e.target.classList.remove('cells_item--target');
}

export function dragDrop(e) {
  e.target.classList.remove('cells_item--target');
  currentTask.classList.add('task');
  if (e.target.classList.contains('cells_item')) {
    const target = e.target;
    target.append(currentTask); // переносить несколько в зависимости от длительности задачи
  } else if (e.target.classList.contains('task')) {
    const target =e.target.parentElement;
    target.append(currentTask); // переносить несколько в зависимости от длительности задачи
  } else {
    const currentUser = e.target.getAttribute('data-user');
    const target = document.querySelectorAll(`.cells_item[data-user='${currentUser}']`);
    insertMultipleTasks(target, currentTask);
  }
}

export function insertMultipleTasks(target, task) {
  target.forEach((cell) => {
    const dateFromAttr = Date.parse(
      cell.getAttribute('data-date').replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1')
    );
    if (
      dateFromAttr >= Date.parse(task.getAttribute('data-start')) &&
      dateFromAttr <= Date.parse(task.getAttribute('data-end'))
    ) {
      const taskClone = task.cloneNode(true); 
      taskClone.classList.remove('backlog_task--selected');
      taskClone.draggable = false;
      cell.append(taskClone);
      task.remove();
    }
  });
}