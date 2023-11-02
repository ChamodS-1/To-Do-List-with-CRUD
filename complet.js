let allCompleted;

function completedItems(){

    if(completedArray.length===0){
        tableBody.innerHTML= `<h2>No Completed To-Dos</h2>`
        return;
    }

    tableBody.textContent="";
    id=0;

    for(const key of completedArray){

    const tr = document.createElement('tr');
    tr.innerHTML = ` <td>${++id}</td>
                    <td>${key.timeCompleted}</td>
                    <td>${key.completedToDo}</td>
                    <td><input type="button" class="btn btn-success allcompletedButtons" value="Completed" data-playerid="${key.id}"></td>`

     tableBody.append(tr);
}


}