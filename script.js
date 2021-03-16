const showEl = document.getElementById('show');
const delSuccessEl = document.getElementById('deleteSuccess');
let tasksArr = []

function createTask(moduleName, taskTitle, action, color, priority, status, text, image, taskId, data) {
  // console.log(moduleName, taskTitle, action, color, priority, status, text, image)

  class Task {

    constructor(moduleName, taskTitle, action, color, priority, status, text, image, taskId, data) {
      this.moduleName = moduleName;
      this.taskTitle = taskTitle;
      this.action = action;
      this.color = color;
      this.priority = priority;
      this.data = data;
      this.status = status;
      this.text = text;
      this.image = image;
      this.taskId = taskId;
    }



  }
  const task = new Task(moduleName, taskTitle, action, color, priority, status, text, image, taskId, data);
  tasksArr.push(task)
}

async function getData() {
  const dataRes = await fetch('data.json')
  const dataJson = await dataRes.json()
  // console.log(dataJson.moduły)
  const module = dataJson.moduły

  for (let i = 0; i < module.length; i++) {
    const moduleName = module[i].moduł
    showEl.innerHTML += `<h3>${moduleName}</h3>`

    const taskTitleEl = document.createElement('ol')
    taskTitleEl.setAttribute('id', `${moduleName}`)
    showEl.appendChild(taskTitleEl)

    const tasks = module[i].zadania
    for (let j = 0; j < tasks.length; j++) {
      const taskTitle = tasks[j].tytuł

      const liTaskEl = document.createElement('li')
      liTaskEl.innerText = `${taskTitle}`

      document.getElementById(`${moduleName}`).appendChild(liTaskEl)

      const taskDescEl = document.createElement('ul')
      taskDescEl.setAttribute('id', `${moduleName}${j}`)
      taskDescEl.setAttribute('class', `container`)
      liTaskEl.appendChild(taskDescEl)


      const taskDesc = tasks[j].opis
      console.log(taskDesc)
      taskDesc.sort(function (a, b) {
        return a.priorytet - b.priorytet;
      })
      for (let h = 0; h < taskDesc.length; h++) {
        const action = taskDesc[h].działanie
        const color = taskDesc[h].kolor
        const priority = taskDesc[h].priorytet
        const status = taskDesc[h].status
        const data = taskDesc[h].data
        const text = taskDesc[h].szczegóły.tekst
        const image = taskDesc[h].szczegóły.zdjęcie
        const taskId = `${moduleName}-${j}-${h}`
        console.log(action)
        if (text !== "" || image !== "") {

          document.getElementById(`${moduleName}${j}`).innerHTML += `
          <li class=" row align-items-center  border-bottom ">
            <div class="col-md-9">
              <p class='m-0'> ${action}</p> 
            </div>
            <div class='col-md-3  mb-1'>
              <span class='mx-1  btn  bg-${color} text-${color}  '>${priority}  </span>
              <button id=${taskId} class='mx-1 btn btn-secondary details' value = ${taskId} onclick = "showText(value)" >Więcej...</button> 
              <span>${data} </span>
            </div>
          </li>`
          // document.getElementById(`${moduleName}${j}`).appendChild(btn)

        } else {
          document.getElementById(`${moduleName}${j}`).innerHTML += `
          <li class=" row  border-bottom ">
          <div class="col-md-9">
            <p class=' m-0'> ${action}</p> 
          </div>
          <div class='col-md-3 mb-1'>
            <span class=' mx-1 btn  bg-${color} text-${color}'>${priority} </span>
          </div>
        </li>`
        }

        createTask(moduleName, taskTitle, action, color, priority, status, text, image, taskId, data)
      }
    }
  }
}

getData()

const showText = (value) => {
  const task = tasksArr.find(e => e.taskId == value);
  document.querySelector('.navi').classList.add('noDisplay')
  const infoTextEl = document.createElement('div')
  infoTextEl.classList.add('active', 'shadow', 'border');

  setTimeout(function () { infoTextEl.classList.add('block'); }, 50);




  console.log(`${task}`)
  infoTextEl.innerHTML =
    `
  <div >
    <h4 class='text-dark'>${task.action} </h4>
    <p> ${task.text}</p>
    
    <img src="${task.image}" alt="" class="imageInfo w-75 mh-75"/>
    <button id="closeInfo" class="close btn btn-secondary" onclick = 'closeInfoText()'>Zamknij</button>
  </div>
  `
  console.log(task.action)
  document.getElementById('cont').appendChild(infoTextEl)
  setTimeout(function () { showEl.classList.add('blur') }, 200);
  document.querySelectorAll('.details').forEach(el => { el.setAttribute('disabled', 'disabled') })

}
function closeInfoText() {
  console.log(document.querySelectorAll('.details'))
  // document.querySelector('.navi').classList.remove('noDisplay')
  document.querySelectorAll('.details').forEach(el => { el.removeAttribute('disabled', 'disabled') })
  const activeEl = document.getElementsByClassName('active');
  activeEl[0].classList.remove('block')

  setTimeout(function () { activeEl[0].remove(); document.querySelector('.navi').classList.remove('noDisplay') }, 500);

  showEl.classList.remove('blur')

}






// const x = document.getElementById('closeInfo');
// x.addEventListener('click', function () {

// })
/* <i class="mx-1 status bi bi-arrow-${status}-square-fill"></i>  */

/* <span class="mx-1">     <i class="status bi bi-arrow-${status}-square-fill"></i> </span> */