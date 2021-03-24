// add list item function
function loadListItems() {
    fetch('/lists')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    // const input = document.getElementById('input-field');
    const todoList = document.getElementById('todo-list');
    // if (input.value === '') {
    //     return;
    // }
    
    document.getElementById('todo-list').innerHTML = '';
    data.forEach(listItem => {
        todoList.innerHTML += `<li> ${listItem.text} <span onclick="editList(event,'${listItem._id}')" class="edit-btn">✎</span> <span class="close-btn">✖</span> 
    <div id="close-popup">
    <h3>Are you sure to delete this item?</h3>
    <button onclick="deleteListItem(event,'${listItem._id}')" class="confirm-btn">Confirm</button>
    <button class="cancel-btn">Cancel</button>
    </div></li>`;
    });
    
    // input.value = '';
    })

    // setLocalStorage(listItem);
}
loadListItems();

// showing added list item on browser
// const getData = JSON.parse(localStorage.getItem('listItem'));
// document.getElementById('todo-list').innerHTML = getData.join('');
function deleteListItem(e,id){
    fetch(`/delete/${id}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(result => {
        if(result){
            e.target.parentElement.style.display = "none";
            e.target.parentElement.parentElement.style.display = "none";
        }
    })
    console.log(id);
}

// document.getElementById('close-btn').addEventListener('click', function () {
//     document.getElementById("close-popup").style.display = "block";
// })


// delete, confirm, cancel button event handler
document.getElementById('todo-list').addEventListener('click', function (event) {
    const item = event.target;
    if (item.classList.value === 'close-btn') {
        item.nextElementSibling.style.display = 'block';
    }
    if (item.classList.value === 'cancel-btn') {
        item.parentElement.style.display = "none";
    }
});




function editList(e,id) {
    fetch(`/findlistitem/${id}`)
    .then(res => res.json())
    .then(result => {
        e.target.parentElement.innerHTML = `
        <input type="text" id="update-list" name="text" value="${result.text}">
        <button onclick="cancelUpdate(event,'${result._id}')">Cancel</button>
        <button onclick="updateListItem(event,'${result._id}')">Update</button>
        `
        // console.log(e.target.parentElement);
    })
    // console.log('edit',id);
}
function cancelUpdate(e,id){
    e.target.parentElement.innerHTML = `
    ${e.target.previousElementSibling.value} 
    <span onclick="editList(event,'${id}')" class="edit-btn">✎</span> <span class="close-btn">✖</span> 
    <div id="close-popup">
    <h3>Are you sure to delete this item?</h3>
    <button onclick="deleteListItem(event,'${id}')" class="confirm-btn">Confirm</button>
    <button class="cancel-btn">Cancel</button>
    </div>
    `
}

function updateListItem(e,id){
    // console.log(e.target.parentNode.firstElementChild.value);
    const text = e.target.parentNode.firstElementChild.value;
    const listItem = {id,text}
    fetch(`/updatelist/${id}`,{
        method:'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(listItem)
    })
    .then(res => res.json())
    .then(result => {
        if(result){
            // cancelUpdate(event,)
            loadListItems();
            // document.getElementById('todo-list').innerHTML = '';
        }
    })
}
// set list item to local storage 
// function setLocalStorage(data) {
//     const availableData = localStorage.getItem('listItem');
//     if (availableData === null) {
//         localStorage.setItem('listItem', JSON.stringify([data]));
//     }
//     else {
//         fetchedData = JSON.parse(availableData);
//         fetchedData.push(data);
//         localStorage.setItem('listItem', JSON.stringify(fetchedData));

//     }
// };


// enter key event handler
document.getElementById('input-field').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-btn").click();
    }
});