document.getElementById('list').innerHTML = localStorage.getItem('whimlist');

function add() {
    if (document.getElementById('input').value === '') {
        alert('Enter an item');
    } else {
        var li = document.createElement('li');
        li.name = document.getElementById('input').value;
        var t = document.createTextNode(document.getElementById('input').value);
        li.appendChild(t);
        li.classList.add('item'); // adds the 'item' class to the new element
        document.getElementById('list').appendChild(li);

        document.getElementById('input').value = '';

        var div = document.createElement('div');
        div.className = 'opt';

        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-link';

        div.appendChild(icon);

        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-dollar-sign';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash';

        div.appendChild(icon);

        li.appendChild(div);

        localStorage.setItem('whimlist', document.getElementById('list').innerHTML);
        console.log(localStorage.getItem('whimlist'));

        //localStorage.setItem(li.name + 'Name', li.name);
        //console.log(localStorage.getItem(li.name + 'Name'));

        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this);
            }
        }

        for (i = 0; i < tag.length; i++) {
            tag[i].onclick = function () {
                clickTag(this);
            }
        }

        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this);
            }
        }
    }
}

// appends trash and link button to each list item


//I DONT THINK THIS IS NECESSARY, ITS FOR WHEN THERE ARE ALREADY ELEMENTS IN THE LIST, NOT FOR ONES ADDED BY USERS
/* var nodeList = document.getElementsByClassName('item');
for (i = 0; i < nodeList.length; i++) {
    var div = document.createElement('div');
    div.className = 'opt';

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-link';

    div.appendChild(icon);

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-dollar-sign';

    div.appendChild(icon);

    icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';

    div.appendChild(icon);

    nodeList[i].appendChild(div);
} */

var link = document.getElementsByClassName('fa-link');
for (i = 0; i < link.length; i++) {
    link[i].onclick = function () {
        clickLink(this.parentElement.parentElement);
    }
}

var tag = document.getElementsByClassName('fa-dollar-sign');
for (i = 0; i < tag.length; i++) {
    tag[i].onclick = function () {
        clickTag(this.parentElement.parentElement);
    }
}

var trash = document.getElementsByClassName('fa-trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
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
    el.remove();

    localStorage.setItem('whimlist', document.getElementById('list').innerHTML);
    console.log(localStorage.getItem('whimlist'));
}

function clickTag(el) {
    entered = prompt('Enter the price of your desired gift');

    if (entered == null || entered == '') {
        return;
    } else if (isNaN(entered)) {
        alert('Enter a valid number');
    } else if (entered <= 0) {
        alert('Enter a higher price');
    } else if (entered > 999999999) {
        alert('Enter a lower price');
    } else {

        if (el.getElementsByClassName('price')[0]) {
            el.getElementsByClassName('price')[0].remove();
        }

        el.tag = (Math.round(entered * 100)) / 100;

        var span = document.createElement('span');
        var p = document.createTextNode('$' + el.tag);
        span.appendChild(p);
        span.className = 'price';
        el.appendChild(span);
    }
}

function clickLink(el) {
    el.link = localStorage.getItem(el.innerHTML.link + 'Link');

    if (el.link == null) {
        entered = prompt('Enter the link to your desired gift');

        var valid = validURL(entered);

        if (entered == null || entered == '') {
            return;
        } else if (valid == false) {
            alert('Enter a valid URL');
        } else {
            el.link = entered;

            localStorage.setItem(el.innerHTML.link + 'Link', el.link);
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