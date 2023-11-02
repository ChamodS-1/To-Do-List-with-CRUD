const form = document.querySelector('form');
const textInput = document.getElementById('exampleInputEmail1');
const tableBody =  document.querySelector('tbody');
const dropDown = document.getElementById('dropdown');
const tableRow = document.getElementById('tableRow');
const maxNumber = document.getElementById('maxNumber');

const allToDos = document.querySelector('.allToDos');
const completedToDos = document.querySelector('.completedToDos');
const deletedToDos = document.querySelector('.deletedToDos');

const allTodosid = document.getElementById('alltodos');
const allCompletedsid = document.getElementById('completetodos');
const allDeletedsid = document.getElementById('deletetodos');

let editeBittons;
let deleteButtons;
let completeButtons;

let array = [];
let deletedArray = [];
let completedArray = [];

let id = 0;
let dataID=0;
let dataID2=0;
let dataID3=0;
let index = -1;
let index2 = -1;
let index3 = -1;
let iterate = -1;
let returnData= "";

let targetIndex = -1;

let xNumber=0;
let inputData="";
let inputSize;

let dropValue="";
let findIndex = -1;

let allToDoss =0;
let allCompltedToDo = 0;
let allDeletedToDo = 0;

textInput.addEventListener('input' , e => {

    inputSize= 29-e.target.value.trim().length;
    maxNumber.innerHTML=inputSize;

    setThemeColour(inputSize)

})

function setThemeColour(inputSize){

    if(inputSize<=20 && inputSize>=15){

        maxNumber.classList.remove('purple');
        maxNumber.classList.remove('red');
        maxNumber.classList.add('blue');
        maxNumber.classList.remove('yellow');

    }else if(inputSize<=14 && inputSize>=10){

        maxNumber.classList.remove('purple');
        maxNumber.classList.remove('red');
        maxNumber.classList.remove('blue');
        maxNumber.classList.add('yellow');

    }else if(inputSize<=9){

        maxNumber.classList.remove('purple');
        maxNumber.classList.remove('yellow');
        maxNumber.classList.remove('blue');
        maxNumber.classList.add('red');
    }
    else{
        maxNumber.classList.remove('red');
        maxNumber.classList.remove('yellow');
        maxNumber.classList.remove('blue');
        maxNumber.classList.add('purple');
    }
}

if(array.length===0){
    tableBody.innerHTML= `<h2>No To-Dos</h2>`
}

dropDown.addEventListener('input',e => {
    dropValue= e.target.value;

    if(dropValue === "deleted"){
        textInput.disabled = true;

        tableRow.innerHTML = `  <th scope="col" id="topic1">#</th>
                                <th scope="col" id="topic2">Deleted Time</th>
                                <th scope="col" id="topic3">To-Do</th>
                                <th scope="col" id="topic4">Restore</th>
                                <th scope="col" id="topic5">Delete Forever</th>`

        allToDos.classList.add('hidden');
        completedToDos.classList.add('hidden');
        deletedToDos.classList.remove('hidden');

        
        deletedItems();
        return;

    }else if (dropValue === "all"){

        textInput.disabled = false;

        tableRow.innerHTML = `  <th scope="col" id="topic1">#</th>
        <th scope="col" id="topic2">Time</th>
        <th scope="col" id="topic3">To-Do</th>
        <th scope="col" id="topic4">Edite</th>
        <th scope="col" id="topic5">Complete</th>
        <th scope="col" id="topic6">Delete</th>`

        deletedToDos.classList.remove('hidden');
        completedToDos.classList.remove('hidden');
        allToDos.classList.remove('hidden');

        allTodosid.innerHTML=array.length;
        
        getResults();
    }

    else if (dropValue === "completed"){

        textInput.disabled = true;

        tableRow.innerHTML = `  <th scope="col" id="topic1">#</th>
        <th scope="col" id="topic2">Completed Time</th>
        <th scope="col" id="topic3">To-Do</th>
        <th scope="col" id="topic4">Status</th>`

        allToDos.classList.add('hidden');
        deletedToDos.classList.add('hidden');
        completedToDos.classList.remove('hidden');
    
        completedItems();
        return;
    }
})

form.addEventListener('submit', e => {

    e.preventDefault();
    const formDate = new FormData(e.target);
    inputData = formDate.get('text-input').trim();

    let getDate = new Date();

    let hours = getDate.getHours();
    let minutes = getDate.getMinutes(); 
    let seconds = getDate.getSeconds();

    let fotmatedDate = `${hours}:${minutes}:${seconds}`;

  // console.log(fotmatedDate);
  //  console.log(inputData);

    if(index != -1){

        iterate=-1;
        array[index].time=fotmatedDate;
        array[index].todoname=inputData;
        array[index].editeValue="Edited";
        array[index].class="btn-info";

        textInput.value = "";
        maxNumber.innerHTML=29;
        maxNumber.classList.remove('red');
        maxNumber.classList.remove('yellow');
        maxNumber.classList.remove('blue');
        maxNumber.classList.add('purple');
            
        index=-1;
        getResults();
        return;
    }

    textInput.value = "";

    maxNumber.innerHTML=29;
    maxNumber.classList.remove('red');
    maxNumber.classList.remove('yellow');
    maxNumber.classList.remove('blue');
    maxNumber.classList.add('purple');

    let object = {

        time:fotmatedDate,
        todoname:inputData,
        id:++dataID,
        editeValue:"Edite",
        editeComplete:"Complete",
        class:"btn-warning",
        complete:"btn-secondary",
        lineStrike:"",
        buttonDisble:""
        
    }

    array.push(object);
    index=-1;

    allTodosid.innerHTML=array.length;

    getResults();

})

function getResults(){

    if(array.length===0){
        tableBody.innerHTML= `<h2>No To-Dos</h2>`;
        return;
    }

    tableBody.textContent="";
    id=0;

    for(const key of array){

    const tr = document.createElement('tr');
    tr.innerHTML = ` <td>${++id}</td>
                    <td>${key.time}</td>
                    <td class="${key.lineStrike}">${key.todoname}</td>
                    <td><input type="button" id="editeID" class="btn ${key.class} editedButtons ${key.buttonDisble}" value="${key.editeValue}" data-playerid="${key.id}"></td>
                    <td><input type="button" id="completeID" class="btn ${key.complete} completeButtons" value="${key.editeComplete}" data-playerid="${key.id}"></td>
                    <td><input type="button" class="btn btn-danger deleteButtons" value="Delete" data-playerid="${key.id}"></td> `

     tableBody.append(tr);

    }

    editeBittons = document.querySelectorAll('.editedButtons');

     editeBittons.forEach(item => {
        item.addEventListener('click', e => {
        
           let xNumber = +e.target.dataset.playerid;

          let returnData=checkArrayIndex(xNumber);
         // console.log(xNumber);
         // console.log(index);

          textInput.value=returnData;
          maxNumber.innerHTML=29-returnData.length;
          setThemeColour(29-returnData.length);



        })
    })

    deleteButtons = document.querySelectorAll('.deleteButtons');

    deleteButtons.forEach(item => {
        item.addEventListener('click', e => {
        
          let xNumber2 = +e.target.dataset.playerid;
          let spliceIndex = checkArrayIndex2(xNumber2);

          console.log(xNumber2);
          console.log(index2);
          console.log(array);

          let getDate = new Date();

          let hours = getDate.getHours();
          let minutes = getDate.getMinutes(); 
          let seconds = getDate.getSeconds();

          let deletedDate = `${hours}:${minutes}:${seconds}`;

          

          if(completedArray.length !=0){

            targetIndex= -1;

            for(const t of completedArray){

                if(t.id===xNumber2){
                    break;
                }

                targetIndex++;
            }
          }

          let object1 = {

            timeDeleted:deletedDate,
            deletedToDo:array[index2].todoname,
            id:xNumber2     
        }

          deletedArray.push(object1);
          completedArray.splice(targetIndex,1);
            
           array.splice(index2,1);
        
          
          //console.log(array);
         // console.log(spliceIndex);

          allDeletedsid.innerHTML=deletedArray.length;
          allTodosid.innerHTML=array.length;
          allCompletedsid.innerHTML=completedArray.length;

          getResults();

        })

    })

    completeButtons = document.querySelectorAll('.completeButtons');

    completeButtons.forEach(item => {
        item.addEventListener('click', e => {

          let getDate = new Date();

          let hours = getDate.getHours();
          let minutes = getDate.getMinutes(); 
          let seconds = getDate.getSeconds();

          let completedDate = `${hours}:${minutes}:${seconds}`;
        
        let x = +e.target.dataset.playerid;
        let completeIndex = checkArrayIndex3(x);

        if(array[index3].complete==="btn-secondary"){
            array[index3].complete="btn-success";
            array[index3].lineStrike="strikethrough";
            array[index3].editeComplete="Completed";
            array[index3].buttonDisble="disabled-button";



            if(completedArray.length===0){

                let object2 = {

                    timeCompleted:completedDate,
                    completedToDo:array[index3].todoname,
                    id:x     
                }
                completedArray.push(object2);
            }else{

                let iterateNum = 0
                for(const key of completedArray){

                    if(key.id===x){
                       break;
                    }
                    else{
                        iterateNum++;
                    }
                }

                if(completedArray.length===iterateNum){

                    let object2 = {

                        timeCompleted:completedDate,
                        completedToDo:array[index3].todoname,
                        id:x     
                    }
                    
                    completedArray.push(object2);
                }
            }

            console.log(completedArray);
            console.log(index3);

          } else {

            findIndex=-1;

            array[index3].complete="btn-secondary";
            array[index3].lineStrike="";
            array[index3].editeComplete="Complete";
            array[index3].buttonDisble="";

            for(const k of completedArray){
                findIndex++;
                if(k.id===x){
                    break
                }
            }

            completedArray.splice(findIndex,1);
            console.log(completedArray);

          }
          //console.log(index3);
          getResults();

        })

        allCompletedsid.innerHTML=completedArray.length;
        


    })
}

function checkArrayIndex(xNumber){
    index=-1;
    for(const key of array){
        index++;
        if(key.id===xNumber){
            returnData=key.todoname;
            break;
        }
    }

    return returnData; 
}

function checkArrayIndex2(xNumber2){
    index2=-1;
    for(const key of array){
        index2++;
        if(key.id===xNumber2){
            break;
        }
    }

    return index2;
}

function checkArrayIndex3(x){
    index3=-1;
    for(const key of array){
        index3++;
        if(key.id===x){
            break;
        }
    }

    return index3;
}




