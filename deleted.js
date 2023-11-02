let allRestore;
let allForever;
let index4 = -1;
let index5 = -1;
let index6 = -1;

function deletedItems(){

    if(deletedArray.length===0){
        tableBody.innerHTML= `<h2>No Deleted To-Dos</h2>`
        return;
    }

    tableBody.textContent="";
    id=0;

    for(const key of deletedArray){

    const tr = document.createElement('tr');
    tr.innerHTML = ` <td>${++id}</td>
                    <td>${key.timeDeleted}</td>
                    <td>${key.deletedToDo}</td>
                    <td><input type="button" class="btn btn-info restore" value="Restore" data-playerid="${key.id}"></td>
                    <td><input type="button" class="btn btn-danger forever" value="Delete Forever" data-playerid="${key.id}"></td>`

     tableBody.append(tr);
}

allRestore = document.querySelectorAll('.restore');

allRestore.forEach(item => {
   item.addEventListener('click', e => {
   
      let x = +e.target.dataset.playerid;

      let getDate = new Date();

          let hours = getDate.getHours();
          let minutes = getDate.getMinutes(); 
          let seconds = getDate.getSeconds();

          let deletedDate = `${hours}:${minutes}:${seconds}`;

      //console.log(x);

     let returnData=checkRestore(x);
    // console.log(index4);

    let restoreObject = {

        time:deletedDate,
        todoname:deletedArray[index4].deletedToDo,
        id:++dataID,
        editeValue:"Edite",
        editeComplete:"Complete",
        class:"btn-warning",
        complete:"btn-secondary",
        lineStrike:"",
        buttonDisble:""
        
    }

    array.push(restoreObject);

    deletedArray.splice(returnData,1);
    allDeletedsid.innerHTML=deletedArray.length;
     deletedItems();
   
   })
})

allForever = document.querySelectorAll('.forever');

allForever.forEach(item => {
   item.addEventListener('click', e => {
   
      let x = +e.target.dataset.playerid;

     let returnData2=checkForever(x);
    // console.log(index4);

    deletedArray.splice(returnData2,1);
     deletedItems();
   
   })
})

}

function checkRestore(x){
    index4=-1;
    for(const key of deletedArray){
        index4++;
        if(key.id===x){
            break;
        }
    }

    return index4;
}

function checkForever(x){
    index5=-1;
    for(const key of deletedArray){
        index5++;
        if(key.id===x){
            break;
        }
    }

    return index5;

}