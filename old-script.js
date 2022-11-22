function add() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('input').value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.classList.add('task'); // adds the 'task' class to the new element

    if (inputValue === '') {
        alert('Enter a task');
    } else {
        document.getElementById('list').appendChild(li);
    }

    document.getElementById('input').value = '';

    var div = document.createElement('div');
    div.className = 'taskOptionsDiv';
    li.appendChild(div);
    console.log(div);

    icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'close');
    icon.setAttribute('aria-label', 'trash');
    icon.className = 'option trash';
    div.appendChild(icon);

    for (i = 0; i < rename.length; i++) {
        rename[i].onclick = function () {
            this.parentElement.parentElement.innerHTML = `aaa<ion-icon name='close' class='option trash'></ion-icon>`;
        }
    }

    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            this.parentElement.parentElement.style.display = 'none';
        }
    }
}

// Create a 'rename' button and append it to each list item
var myNodelist = document.getElementsByClassName('LI');
for (i = 0; i < myNodelist.length; i++) {
    var div = document.createElement('div');
    div.className = 'taskOptionsDiv';
    myNodelist[i].appendChild(div);
    console.log(div);

    var icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'create');
    icon.setAttribute('aria-label', 'Rename');
    icon.className = 'option rename';
    div.appendChild(icon);

    icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'close');
    icon.setAttribute('aria-label', 'trash');
    icon.className = 'option trash';
    div.appendChild(icon);
}

// Click on a rename button to hide the current list item
var rename = document.getElementsByClassName('rename');
for (i = 0; i < rename.length; i++) {
    rename[i].onclick = function () {
        this.parentElement.parentElement.innerHTML = `aaa<div class='taskOptionsDiv'><ion-icon name='create' class='option rename'></ion-icon><ion-icon name='close' class='option trash'></ion-icon></div>`;
    }
}

// Click on a rename button to hide the current list item
var trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        this.parentElement.parentElement.style.display = 'none';
    }
}

var list = document.querySelector('ul'); // sets 'list' to the entire html list, 'myUL'
list.addEventListener('click', function (event) { // add event listener to the list when an item is clicked
    event.target.classList.toggle('done'); // toggles the checked class, if its checked it will uncheck, if its not checked, it will be checked
}, false);