console.log('v1.0.6');
console.log('whats new: \n • Improvements and fixes');

document.getElementById('list').innerHTML = localStorage.getItem('yearnlist');

var yearnItems = document.getElementsByTagName('li');

for (var i = 0; i < yearnItems.length; i++) {
    el = yearnItems[i];

    el.c = localStorage.getItem(el.innerHTML + 'C');

    if (localStorage.getItem(el.c + 'Name') !== null) { // this is just a backup to set el.name for any element that doesnt have it for some reason, may be unnecessary
        el.name = localStorage.getItem(el.c + 'Name');
    }

    if (el.price == null || el.price == undefined) {
        el.price = 0;
    }
}

function updateC(el) { // call when html of item is updated
    localStorage.setItem(el.innerHTML + 'C', el.c);
}

function updateList() { // call when anything in list is updated
    localStorage.setItem('yearnlist', document.getElementById('list').innerHTML);
}

function add() {
    let sameN = false;

    for (var i = 0; i < yearnItems.length; i++) {
        el = yearnItems[i];

        if (document.getElementById('input').value == el.name) {
            sameN = true;
        }
    }

    if (document.getElementById('input').value === '') {
        alert('Enter a gift');
    } else if (sameN) {
        alert('There is already a gift with this name');
        sameN = false;
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

        el.price = 0;
        localStorage.setItem(el.c + 'Price', el.price);
        var span = document.createElement('span');
        var p = document.createTextNode('$' + el.price);
        span.appendChild(p);
        span.className = 'attr price text-green-700 hidden';
        span.id = el.c + 'Price';
        el.appendChild(span);

        document.getElementById('input').value = '';

        var div = document.createElement('div');
        div.className = 'opt float-right';

        var icon = document.createElement('i');
        icon.className = 'fas fa-link ml-3';
        icon.ariaLabel = 'Add link to gift';
        icon.title = 'Add link to gift';

        div.appendChild(icon);

        var icon = document.createElement('i');
        icon.className = 'fas fa-dollar-sign ml-3';
        icon.ariaLabel = 'Add price of gift';
        icon.title = 'Add price of gift';

        div.appendChild(icon);

        var icon = document.createElement('i');
        icon.className = 'fas fa-tag ml-3';
        icon.ariaLabel = 'Add an attribute';
        icon.title = 'Add an attribute';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fas fa-pen ml-3';
        icon.ariaLabel = 'Edit gift name';
        icon.title = 'Edit gift name';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fas fa-trash ml-3';
        icon.ariaLabel = 'Remove gift';
        icon.title = 'Remove gift';

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

        for (i = 0; i < tag.length; i++) {
            tag[i].onclick = function () {
                clickTag(this.parentElement.parentElement);
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
    div.className = 'opt float-right';

    var icon = document.createElement('i');
    icon.className = 'fas fa-link ml-3';

    div.appendChild(icon);

    var icon = document.createElement('i');
    icon.className = 'fas fa-dollar-sign ml-3';

    div.appendChild(icon);

    icon = document.createElement('i');
    icon.className = 'fas fa-trash ml-3';

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

var tag = document.getElementsByClassName('fa-tag');
for (i = 0; i < tag.length; i++) {
    tag[i].onclick = function () {
        clickTag(this.parentElement.parentElement);
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

document.querySelector('ul').addEventListener('click', function (event) {
    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('done');
        updateList();
    }
}, false);

document.querySelector('ul').addEventListener('click', function (event) {
    if (event.target.classList.contains('attr')) {
        if (event.target.classList.contains('price')) {
            event.target.classList.add('hidden');
        } else {
            event.target.remove();
        }

        updateC(event.target.parentElement);
        updateList();

        el = event.target.parentElement;
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

function clickTag(el) {
    entered = prompt('Enter an attribute (16 characters max)');

    if (entered == null || entered == '') {
        return;
    } else if (entered.length > 16) {
        alert('Attributes can only have a maximum of 16 characters');
    } else {

        var span = document.createElement('span');
        var p = document.createTextNode(entered);
        span.appendChild(p);
        span.className = 'attr';
        el.appendChild(span);

        updateC(el);
        updateList();
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
    } else if (entered > 9999999999) {
        alert('Enter a lower price');
    } else {
        if (el.getElementsByClassName('price')[0].classList.contains('hidden')) {
            el.getElementsByClassName('price')[0].classList.remove('hidden');
        }

        el.price = (Math.round(entered * 100)) / 100;

        document.getElementById(el.c + 'Price').innerText = '$' + el.price;
        localStorage.setItem(el.c + 'Price', el.price);

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

function share() {
    let text = '';

    for (var i = 0; i < yearnItems.length; i++) {
        el = yearnItems[i];

        localStorage.getItem(el.innerHTML + 'C');
        el.name = localStorage.getItem(el.c + 'Name');
        if (localStorage.getItem(el.c + 'Price') > 0 && localStorage.getItem(el.c + 'Price') !== null && localStorage.getItem(el.c + 'Price') !== undefined) {
            el.price = ' $' + localStorage.getItem(el.c + 'Price');
        } else {
            el.price = '';
        }
        if (localStorage.getItem(el.c + 'Link') !== null && localStorage.getItem(el.c + 'Link') !== undefined) {
            el.link = localStorage.getItem(el.c + 'Link');

            if (!el.link.includes('https://') && !el.link.includes('http://')) {
                el.link = 'https://' + el.link;
            }

            el.link = ' ' + el.link;
        } else {
            el.link = '';
        }

        text = `${text}• ${el.name}${el.price}\n${el.link}\n`
    }

    navigator.clipboard.writeText(text);
}