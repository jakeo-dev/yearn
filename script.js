console.log('v1.0.1');
console.log('whats new: \n • Fixed a renaming issue');

document.getElementById('list').innerHTML = localStorage.getItem('yearnlist');

var whimItems = document.getElementsByTagName('li');

for (var i = 0; i < whimItems.length; i++) {
    el = whimItems[i];

    el.c = localStorage.getItem(el.innerHTML + 'C');

    if (localStorage.getItem(el.c + 'Name') !== null) { // this is just a backup to set el.name for any element that doesnt have it for some reason, may be unnecessary
        el.name = localStorage.getItem(el.c + 'Name');
    }
}

function updateC(el) { // call when html of item is updated
    localStorage.setItem(el.innerHTML + 'C', el.c);
}

function updateList() { // call when anything in list is updated
    localStorage.setItem('yearnlist', document.getElementById('list').innerHTML);
}

function add() {
    if (document.getElementById('input').value === '') {
        alert('Enter a gift');
    } else {
        var el = document.createElement('li');

        el.c = Math.floor(100000000 + Math.random() * 900000000);
        updateC(el);

        el.name = document.getElementById('input').value;
        localStorage.setItem(el.c + 'Name', el.name);
        var t = document.createTextNode(document.getElementById('input').value);
        el.appendChild(t);
        el.classList.add('item');
        document.getElementById('list').appendChild(el);

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
        icon.className = 'fa-solid fa-pen';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash';

        div.appendChild(icon);

        el.appendChild(div);

        updateC(el);
        updateList();

        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < price.length; i++) {
            price[i].onclick = function () {
                clickPrice(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
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

var price = document.getElementsByClassName('fa-dollar-sign');
for (i = 0; i < price.length; i++) {
    price[i].onclick = function () {
        clickPrice(this.parentElement.parentElement);
    }
}

var pen = document.getElementsByClassName('fa-pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        clickPen(this.parentElement.parentElement);
    }
}

var trash = document.getElementsByClassName('fa-trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function (event) {
    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('done');
        updateList();
    }
}, false);

document.body.onkeyup = function (event) {
    if (event.keyCode == 13 && document.getElementById('input') === document.activeElement) {
        document.getElementById('add').click();
    }
}

function clickTrash(el) {
    el.remove();

    updateList();
}

function clickPen(el) {
    entered = prompt('Enter the new name of this gift');

    if (entered == null || entered == '') {
        return;
    } else {
        if (localStorage.getItem(el.c + 'Name') !== null) {
            el.name = localStorage.getItem(el.c + 'Name');
        }

        el.innerHTML = el.innerHTML.replace(el.name, entered);
        el.name = entered;

        localStorage.setItem(el.c + 'Name', el.name);

        updateC(el);
        updateList();

        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < price.length; i++) {
            price[i].onclick = function () {
                clickPrice(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }
    }
}

function clickPrice(el) {
    entered = prompt('Enter the price of your gift');

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

        el.price = (Math.round(entered * 100)) / 100;

        localStorage.setItem(el.c + 'Price', el.price);

        var span = document.createElement('span');
        var p = document.createTextNode('$' + el.price);
        span.appendChild(p);
        span.className = 'price';
        el.appendChild(span);

        updateC(el);
        updateList();
    }
}

function clickLink(el) {
    el.link = localStorage.getItem(el.c + 'Link');

    if (el.link == null) {
        entered = prompt('Enter the link to your gift');

        var valid = validURL(entered);

        if (entered == null || entered == '') {
            return;
        } else if (valid == false) {
            alert('Enter a valid URL');
        } else {
            el.link = entered;

            localStorage.setItem(el.c + 'Link', el.link);
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