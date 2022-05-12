/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/backlog.css":
/*!*****************************!*\
  !*** ./src/css/backlog.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/cells.css":
/*!***************************!*\
  !*** ./src/css/cells.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/normalize.css":
/*!*******************************!*\
  !*** ./src/css/normalize.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/preloader.css":
/*!*******************************!*\
  !*** ./src/css/preloader.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/task.css":
/*!**************************!*\
  !*** ./src/css/task.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/timeline.css":
/*!******************************!*\
  !*** ./src/css/timeline.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/users.css":
/*!***************************!*\
  !*** ./src/css/users.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/backlog.js":
/*!********************************!*\
  !*** ./src/modules/backlog.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateTasks": () => (/* binding */ updateTasks)
/* harmony export */ });
/* harmony import */ var _dnd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dnd.js */ "./src/modules/dnd.js");


const backlogContainer = document.querySelector('.backlog_task-list');
const backlogSearch = document.querySelector('.backlog_search');
const preloader = document.createElement('div');
preloader.classList.add('preloader');
preloader.innerHTML = '<div class="animated-background"></div>';
for (let i = 1; i < 15; i++) {
  backlogContainer.append(preloader.cloneNode(true));
}

async function getTasks() {
  try {
    const response = await fetch(
      'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks'
    );
    if (!response.ok) {
      throw new Error(`Can't get tasks from server ${response.status}`);
    }
    const tasks = await response.json();
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
  } catch (err) {
    console.log(err.message);
  }
}

if (window.matchMedia('screen and (max-width: 768px)').matches) {
  document.querySelector('.main_wrapper').classList.add('hidden');
}

getTasks().then((tasks) => {
  document.querySelector('.main_wrapper').classList.remove('hidden');
  document.querySelector('.loader').classList.add('hidden');
  updateTasks(tasks);
});

function updateTasks(tasks) {
  backlogContainer.innerHTML = '';
  return tasks.map((item) => {
    let task = document.createElement('div');
    task.classList.add('backlog_task');
    task.draggable = true;
    task.innerHTML = `
    ${item.subject}
    <div class="tooltip" data-start="${item.planStartDate}" data-end="${item.planEndDate}">
    </div>`;
    task.setAttribute('data-id', item.id);
    task.setAttribute('data-start', item.planStartDate);
    task.setAttribute('data-end', item.planEndDate);
    task.addEventListener('dragstart', _dnd_js__WEBPACK_IMPORTED_MODULE_0__.dragStart);
    task.addEventListener('dragend', _dnd_js__WEBPACK_IMPORTED_MODULE_0__.dragEnd);
    if (item.executor) {
      task.classList.add('task');
      const target = document.querySelectorAll(`.cells_item[data-user='${item.executor}']`);
      (0,_dnd_js__WEBPACK_IMPORTED_MODULE_0__.insertMultipleTasks)(target, task);
    } else {
      backlogContainer.append(task);
    }
  });
}

backlogSearch.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const input = backlogSearch.querySelector('input');
  const btn = backlogSearch.querySelector('button');
  let tasks = backlogContainer.querySelectorAll('.backlog_task');

  if (btn.innerText == 'Reset') {
      btn.innerText = 'Search';
      input.value = '';
      tasks.forEach((task) => task.classList.remove('hidden'));
    }
    
  if (input.value) { 
      btn.innerText = 'Reset';
      tasks.forEach((task) => {
        if (!task.innerText.toLowerCase().match(input.value.toLowerCase().trim())) {
          task.classList.add('hidden');
        }
      });

  } 
});


/***/ }),

/***/ "./src/modules/dnd.js":
/*!****************************!*\
  !*** ./src/modules/dnd.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragDrop": () => (/* binding */ dragDrop),
/* harmony export */   "dragEnd": () => (/* binding */ dragEnd),
/* harmony export */   "dragEnter": () => (/* binding */ dragEnter),
/* harmony export */   "dragLeave": () => (/* binding */ dragLeave),
/* harmony export */   "dragOver": () => (/* binding */ dragOver),
/* harmony export */   "dragStart": () => (/* binding */ dragStart),
/* harmony export */   "insertMultipleTasks": () => (/* binding */ insertMultipleTasks)
/* harmony export */ });
let currentTask = null;

function dragStart(e) {
  e.target.classList.add('backlog_task--selected');
  return (currentTask = e.target);
}

function dragEnd(e) {
  e.target.classList.remove('backlog_task--selected');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  if (!e.target.classList.contains('task')) {
    e.target.classList.add('cells_item--target');
  }
}

function dragLeave(e) {
  e.target.classList.remove('cells_item--target');
}

function dragDrop(e) {
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

function insertMultipleTasks(target, task, onUser = true) {
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


/***/ }),

/***/ "./src/modules/theme.js":
/*!******************************!*\
  !*** ./src/modules/theme.js ***!
  \******************************/
/***/ (() => {

const switcher = document.getElementById('switcher');
const mode = {
  dark: true,
};
switcher.addEventListener('click', () => {
  mode.dark = !mode.dark;
  switcher.classList.toggle('btn-toggle--on');

  if (mode.dark) {
    document.documentElement.style.setProperty('--main-bg-color', '#181f33');
    document.documentElement.style.setProperty('--dark-bg-color', '#0d111c');
    document.documentElement.style.setProperty('--light-bg-color', '#283456');
    document.documentElement.style.setProperty('--hover-bg-color', '#232d4a');
    document.documentElement.style.setProperty('--cell-color', '#131827');
    document.documentElement.style.setProperty('--text-color', '#f4f4f4');
  } else {
    document.documentElement.style.setProperty('--main-bg-color', '#fff');
    document.documentElement.style.setProperty('--dark-bg-color', '#cad1e6');
    document.documentElement.style.setProperty('--light-bg-color', '#f8f9fc');
    document.documentElement.style.setProperty('--hover-bg-color', '#e1e5f1');
    document.documentElement.style.setProperty('--cell-color', '#eceff6');
    document.documentElement.style.setProperty('--text-color', '#0d111c');
  }
});


/***/ }),

/***/ "./src/modules/timeline.js":
/*!*********************************!*\
  !*** ./src/modules/timeline.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setWeek": () => (/* binding */ setWeek)
/* harmony export */ });
/* harmony import */ var _users_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users.js */ "./src/modules/users.js");
/* harmony import */ var _backlog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backlog.js */ "./src/modules/backlog.js");



const timeline = document.querySelector('.timeline_wrapper');
const prevBtn = document.querySelector('.timeline_btn--prev');
const nextBtn = document.querySelector('.timeline_btn--next');

const currentDate = new Date();
const options = { month: 'numeric', day: 'numeric' };
const today = currentDate.toLocaleString('ru', options);
let weekNumber = 0;

const setWeek = (n = 0) => {
  const week = [];
  timeline.innerHTML = '';
  weekNumber += n;

  for (let i = 1; i <= 7; i++) {
    let date = document.createElement('div');
    let day = new Date();

    day.setDate(currentDate.getDate() - currentDate.getDay() + i + weekNumber);
    date.setAttribute(
      'data-date',
      day.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
    );
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

prevBtn.addEventListener('click', () => {
  setWeek(-7);
  const tasks = JSON.parse(sessionStorage.getItem('tasks'));
  const users = document.querySelectorAll('.users_item');
  document.querySelectorAll('.cells').forEach((i) => (i.innerHTML = ''));
  for (let i = 0; i < users.length; i++) {
    (0,_users_js__WEBPACK_IMPORTED_MODULE_0__.createCells)(users[i].getAttribute('data-user'));
  }
  (0,_backlog_js__WEBPACK_IMPORTED_MODULE_1__.updateTasks)(tasks);
});

nextBtn.addEventListener('click', () => {
  setWeek(7);
  const tasks = JSON.parse(sessionStorage.getItem('tasks'));
  const users = document.querySelectorAll('.users_item');
  document.querySelectorAll('.cells').forEach((i) => (i.innerHTML = ''));
  for (let i = 0; i < users.length; i++) {
    (0,_users_js__WEBPACK_IMPORTED_MODULE_0__.createCells)(users[i].getAttribute('data-user'));
  }
  (0,_backlog_js__WEBPACK_IMPORTED_MODULE_1__.updateTasks)(tasks);
});

timeline.addEventListener('click', (event) => {
  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    const cells = document.querySelectorAll('.cells_item');
    const date =
      event.target.getAttribute('data-date') || event.target[0].getAttribute('data-date');
    cells.forEach((cell) => {
      cell.getAttribute('data-date') != date
        ? cell.classList.add('hidden')
        : cell.classList.remove('hidden');
    });
    document.querySelector('.header_subtitle').innerText = `Задачи на ${date}:`;
  }
});


/***/ }),

/***/ "./src/modules/users.js":
/*!******************************!*\
  !*** ./src/modules/users.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCells": () => (/* binding */ createCells),
/* harmony export */   "getUsers": () => (/* binding */ getUsers)
/* harmony export */ });
/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline */ "./src/modules/timeline.js");
/* harmony import */ var _dnd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dnd.js */ "./src/modules/dnd.js");


async function getUsers() {
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
    userWrapper.addEventListener('dragover', _dnd_js__WEBPACK_IMPORTED_MODULE_1__.dragOver);
    userWrapper.addEventListener('dragenter', _dnd_js__WEBPACK_IMPORTED_MODULE_1__.dragEnter);
    userWrapper.addEventListener('dragleave', _dnd_js__WEBPACK_IMPORTED_MODULE_1__.dragLeave);
    userWrapper.addEventListener('drop', _dnd_js__WEBPACK_IMPORTED_MODULE_1__.dragDrop);
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

function createCells(id) {
  const week = (0,_timeline__WEBPACK_IMPORTED_MODULE_0__.setWeek)();
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/normalize.css */ "./src/css/normalize.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _css_timeline_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/timeline.css */ "./src/css/timeline.css");
/* harmony import */ var _css_users_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/users.css */ "./src/css/users.css");
/* harmony import */ var _css_cells_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/cells.css */ "./src/css/cells.css");
/* harmony import */ var _css_backlog_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/backlog.css */ "./src/css/backlog.css");
/* harmony import */ var _css_task_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/task.css */ "./src/css/task.css");
/* harmony import */ var _css_preloader_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/preloader.css */ "./src/css/preloader.css");
/* harmony import */ var _modules_users_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/users.js */ "./src/modules/users.js");
/* harmony import */ var _modules_timeline_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/timeline.js */ "./src/modules/timeline.js");
/* harmony import */ var _modules_backlog_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/backlog.js */ "./src/modules/backlog.js");
/* harmony import */ var _modules_theme_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/theme.js */ "./src/modules/theme.js");
/* harmony import */ var _modules_theme_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_modules_theme_js__WEBPACK_IMPORTED_MODULE_11__);














})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map