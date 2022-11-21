function add() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('input').value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.classList.add('item'); // adds the 'item' class to the new element

    if (inputValue === '') {
        alert('Enter an item');
    } else {
        document.getElementById('list').appendChild(li);
    }

    document.getElementById('input').value = '';

    var div = document.createElement('div');
    div.className = 'opt';

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-link';

    div.appendChild(icon);

    icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';

    div.appendChild(icon);

    nodeList[i].appendChild(div);

    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            clickTrash(this);
        }
    }

    for (i = 0; i < link.length; i++) {
        link[i].onclick = function () {
            clickLink(this);
        }
    }
}

// appends trash and link button to each list item
var nodeList = document.getElementsByClassName('item');
for (i = 0; i < nodeList.length; i++) {
    var div = document.createElement('div');
    div.className = 'opt';

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-link';

    div.appendChild(icon);

    icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';

    div.appendChild(icon);

    nodeList[i].appendChild(div);
}

var trash = document.getElementsByClassName('fa-trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this);
    }
}

var link = document.getElementsByClassName('fa-link');
for (i = 0; i < link.length; i++) {
    link[i].onclick = function () {
        clickLink(this);
    }
}

var list = document.querySelector('ul'); // sets 'list' to the entire html list, 'myUL'
list.addEventListener('click', function (event) { // add event listener to the list for when an item is clicked
    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('done'); // toggles the checked class, if its checked it will uncheck, if its not checked, it will be checked
    }
}, false);

document.body.onkeyup = function (event) {
    if (event.keyCode == 13 && document.getElementById('input') === document.activeElement) {
        document.getElementById('add').click();
    }
}

function clickTrash(el) {
    el.parentElement.parentElement.style.display = 'none';
}

function clickLink(el) {
    if (el.link == null) {
        entered = prompt('Enter the link to your desired gift');

        var valid = validURL(entered);

        if (entered == null || entered == '' || valid == false) {
            alert('Enter a valid URL');
            return
        } else {
            el.link = entered;
        }
    } else {
        if (el.link.startsWith('http')) {
            window.open(el.link);
        } else {
            window.open('https://' + el.link);
        }
    }
}

function validURL(string) {
    if (!string.includes('https://') && !string.includes('http://')) {
        string = 'https://' + string;
    }

    // copied from stackoverflow!! https://stackoverflow.com/a/9284473
    var pattern = new RegExp('(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?');
    return pattern.test(string);
}