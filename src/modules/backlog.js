export async function getTasks() {
  const response = await fetch(
    'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks'
  );

  if (!response.ok) {
    throw new Error(`Can't get tasks from server ${response.status}`);
  }

  const tasks = await response.json();
  return tasks;
}
getTasks().catch((err) => {
  console.log(err.message);
});

const backlogContainer = document.querySelector('.backlog_task-list');

getTasks().then((tasks) => {
  tasks.map((item) => {
    let task = document.createElement('div');
    task.classList.add('backlog_task');
    task.innerText = item.subject;
    backlogContainer.append(task);
  });
});
