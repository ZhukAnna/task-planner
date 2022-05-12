let currentTask = null;

export function dragStart(e) {
  e.target.classList.add('backlog_task--selected');
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
    insertMultipleTasks(e.target, currentTask, false);
  } else if (e.target.classList.contains('task')) {
    insertMultipleTasks(e.target.parentElement, currentTask, false);
  } else {
    const currentUser = e.target.getAttribute('data-user');

    /* add executor to sessionstorage */
    const tasks = JSON.parse(sessionStorage.getItem('tasks'));
    const setUser = {
      id: currentTask.getAttribute('data-id'),
      executor: currentUser,
    };
    Object.assign(
      tasks.find((item) => item.id == setUser.id),
      setUser
    );
    sessionStorage.setItem('tasks', JSON.stringify(tasks));

    const target = document.querySelectorAll(`.cells_item[data-user='${currentUser}']`);
    insertMultipleTasks(target, currentTask);
  }
}

export function insertMultipleTasks(target, task, onUser = true) {
  let startDate = Date.parse(task.getAttribute('data-start'));
  let endDate = Date.parse(task.getAttribute('data-end'));
  const duration = endDate - startDate;
  if (!onUser) {
    startDate = Date.parse(
      target.getAttribute('data-date').replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1')
    );
    endDate = startDate + duration;

    /* set new data attributes */
    const planStartDate = new Date(startDate)
      .toLocaleDateString()
      .replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1');
    const planEndDate = new Date(endDate)
      .toLocaleDateString()
      .replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1');
    task.setAttribute('data-start', planStartDate);
    task.setAttribute('data-end', planEndDate);
    task.querySelector('.tooltip').setAttribute('data-start', planStartDate);
    task.querySelector('.tooltip').setAttribute('data-end', planEndDate);

    /* add dates and executor to sessionstorage */
    const executor = target.getAttribute('data-user');
    const tasks = JSON.parse(sessionStorage.getItem('tasks'));
    const setData = {
      id: task.getAttribute('data-id'),
      executor: executor,
      planStartDate: planStartDate,
      planEndDate: planEndDate,
    };
    Object.assign(
      tasks.find((item) => item.id == setData.id),
      setData
    );
    sessionStorage.setItem('tasks', JSON.stringify(tasks));

    target = document.querySelectorAll(`.cells_item[data-user='${executor}']`);
  }
   let counter = 0;
  target.forEach((cell) => {
    const dateFromAttr = Date.parse(
      cell.getAttribute('data-date').replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1')
    );
    if (dateFromAttr >= startDate && dateFromAttr <= endDate) {
      const taskClone = task.cloneNode(true);
      taskClone.classList.remove('backlog_task--selected');
      taskClone.draggable = false;
      cell.append(taskClone);
      task.remove();
    } else {
      counter++;
      if (counter == target.length) task.remove();
    }
  });
}
