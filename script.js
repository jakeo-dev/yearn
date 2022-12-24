console.log('whats new:\n • Shows confirmation before deleting items');

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

document.getElementById('list').innerHTML = localStorage.getItem('yearnList');

let yearnItems = document.getElementsByTagName('li');

for (let i = 0; i < yearnItems.length; i++) {
    el = yearnItems[i];

    el.c = localStorage.getItem(el.innerHTML + 'C');

    if (localStorage.getItem(el.c + 'Name') !== null) { // this is just a backup to set el.name for any element that doesnt have it for some reason, may be unnecessary
        el.name = localStorage.getItem(el.c + 'Name');
    }

    el.price = localStorage.getItem(el.c + 'Price');
}

updateFP();

function updateC(el) { // call when html of item is updated
    localStorage.setItem(el.innerHTML + 'C', el.c);
}

function updateList() { // call when anything in list is updated
    localStorage.setItem('yearnList', document.getElementById('list').innerHTML);
}

function updateFP() {
    let fullPrice = 0;

    for (let i = 0; i < document.getElementsByClassName('price').length; i++) {
        if (document.getElementsByClassName('price')[i].classList.contains('hidden')) {
            document.getElementsByClassName('price')[i].innerText = '$0';
        }

        p = document.getElementsByClassName('price')[i].innerText.replace('$', '').replace(',', '');

        fullPrice = +fullPrice + +p;
    }

    fullPrice = formatter.format(fullPrice);
    localStorage.setItem('fullPrice', fullPrice);

    if (fullPrice == '$0.00') {
        document.getElementById('listPrice').classList.add('hidden');
    } else {
        document.getElementById('listPrice').classList.remove('hidden');
        document.getElementById('listPrice').innerText = 'List Price: ' + fullPrice;
    }
}

function add() {
    let sameN = false;
    let input = document.getElementById('input').value.trim();

    for (let i = 0; i < yearnItems.length; i++) {
        el = yearnItems[i];

        if (input.toLowerCase() == el.name.toLowerCase()) {
            sameN = true;
        }
    }

    if (input === '') {
        alert('Enter a gift');
    } else if (sameN) {
        alert('You already want a gift with that name');
        sameN = false;
    } else {
        let el = document.createElement('li');

        el.c = Math.floor(100000000 + Math.random() * 900000000);
        updateC(el);

        el.name = input;
        localStorage.setItem(el.c + 'Name', el.name);
        let t = document.createTextNode(input);
        el.appendChild(t);
        el.classList.add('item');
        document.getElementById('list').appendChild(el);

        el.link = '';
        localStorage.setItem(el.c + 'Link', el.link);
        let span = document.createElement('span');
        let icon = document.createElement('i');
        icon.className = 'fa-solid fa-arrow-up-right-from-square goto';
        icon.ariaLabel = 'Go to gift link';
        icon.title = 'Go to gift link';
        span.appendChild(icon);
        span.className = 'attr gotospan hidden';
        span.id = el.c + 'Link';
        el.appendChild(span);

        el.price = '$0';
        localStorage.setItem(el.c + 'Price', el.price);
        span = document.createElement('span');
        let p = document.createTextNode(el.price);
        span.appendChild(p);
        span.className = 'attr price hidden';
        span.id = el.c + 'Price';
        el.appendChild(span);

        document.getElementById('input').value = '';

        let div = document.createElement('div');
        div.className = 'opt';

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-link optBtn';
        icon.ariaLabel = 'Add link to gift';
        icon.title = 'Add link to gift';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-dollar-sign optBtn';
        icon.ariaLabel = 'Add price of gift';
        icon.title = 'Add price of gift';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-tag optBtn';
        icon.ariaLabel = 'Add an attribute';
        icon.title = 'Add an attribute';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-pen optBtn';
        icon.ariaLabel = 'Edit gift name';
        icon.title = 'Edit gift name';

        div.appendChild(icon);

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash optBtn';
        icon.ariaLabel = 'Remove gift';
        icon.title = 'Remove gift';

        div.appendChild(icon);

        el.appendChild(div);

        div = document.createElement('div');
        div.className = 'attrDiv';

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

/* let nodeList = document.getElementsByClassName('item');
for (i = 0; i < nodeList.length; i++) {
    let div = document.createElement('div');
    div.className = 'opt float-right';

    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-link ml-3';

    div.appendChild(icon);

    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-dollar-sign ml-3';

    div.appendChild(icon);

    icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash ml-3';

    div.appendChild(icon);

    nodeList[i].appendChild(div);
} */

let link = document.getElementsByClassName('fa-link');
for (i = 0; i < link.length; i++) {
    link[i].onclick = function () {
        clickLink(this.parentElement.parentElement);
    }
}

let price = document.getElementsByClassName('fa-dollar-sign');
for (i = 0; i < price.length; i++) {
    price[i].onclick = function () {
        clickPrice(this.parentElement.parentElement);
    }
}

let tag = document.getElementsByClassName('fa-tag');
for (i = 0; i < tag.length; i++) {
    tag[i].onclick = function () {
        clickTag(this.parentElement.parentElement);
    }
}

let pen = document.getElementsByClassName('fa-pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        clickPen(this.parentElement.parentElement);
    }
}

let trash = document.getElementsByClassName('fa-trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

document.querySelector('ul').addEventListener('click', function (event) {
    el = event.target.parentElement;

    if (event.target.classList.contains('attr') && event.target.classList.contains('price')) {
        event.target.classList.add('hidden');
        el.price = '$0';
        document.getElementById(el.c + 'Price').innerText = el.price;
        localStorage.setItem(el.c + 'Price', el.price);

        updateFP();

    } else if (event.target.classList.contains('goto')) {
        el = event.target.parentElement.parentElement;
        el.link = localStorage.getItem(el.c + 'Link');
        window.open(el.link);

    } else if (event.target.classList.contains('gotospan')) {
        el.link = localStorage.getItem(el.c + 'Link');
        window.open(el.link);

    } else if (event.target.classList.contains('attr')) {
        event.target.remove();

    } else if (event.target.classList.contains('attrDiv')) {
        event.target.parentElement.classList.toggle('done');

    } else if (event.target.classList.contains('item')) {
        el = event.target;
        event.target.classList.toggle('done');
    }

    updateC(el);
    updateList();

}, false);

document.body.onkeyup = function (event) {
    if (event.keyCode == 13 && document.getElementById('input') === document.activeElement) {
        document.getElementById('add').click();
    }
}

function clickTrash(el) {
    if (confirm('Are you sure you want to remove your gift called \"' + el.name + '\"?')) {
        el.remove();
    }

    updateList();
    updateFP();
}

function clickPen(el) {
    entered = prompt('Enter the new name of this gift', el.name);

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

        let tag = document.getElementsByClassName('fa-tag');
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

function clickTag(el) {
    entered = prompt('Enter an attribute (20 characters max)');

    if (entered == null || entered == '') {
        return;
    } else if (entered.length > 20) {
        alert('Attributes can only have a maximum of 20 characters');
    } else {
        let span = document.createElement('span');
        let p = document.createTextNode(entered);
        span.appendChild(p);
        span.className = 'attr';
        el.getElementsByClassName('attrDiv')[0].appendChild(span);

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

        el.price = formatter.format((Math.round(entered * 100)) / 100);

        document.getElementById(el.c + 'Price').innerText = el.price;
        localStorage.setItem(el.c + 'Price', el.price);

        updateC(el);
        updateList();

        updateFP();
    }
}

function clickLink(el) {
    el.link = localStorage.getItem(el.c + 'Link');

    entered = prompt('Enter the link to your gift', el.link);

    let valid = validURL(entered);

    if (entered == null || entered == '') {
        return;
    } else if (valid == false) {
        alert('Enter a valid URL');
    } else {
        if (!el.getElementsByClassName('gotospan')[0]) {
            el.link = '';
            localStorage.setItem(el.c + 'Link', el.link);
            let span = document.createElement('span');
            icon = document.createElement('i');
            icon.className = 'fa-solid fa-arrow-up-right-from-square goto';
            icon.ariaLabel = 'Go to gift link';
            icon.title = 'Go to gift link';
            span.appendChild(icon);
            span.className = 'attr gotospan hidden';
            span.id = el.c + 'Link';
            el.appendChild(span);
        }

        if (el.getElementsByClassName('gotospan')[0].classList.contains('hidden')) {
            el.getElementsByClassName('gotospan')[0].classList.remove('hidden');
        }

        if (entered.startsWith('http')) {
            el.link = entered;
        } else {
            el.link = 'https://' + entered;
        }

        localStorage.setItem(el.c + 'Link', el.link);

        updateC(el);
        updateList();
    }
}

function validURL(string) {
    if (!string.includes('https://') && !string.includes('http://')) {
        string = 'https://' + string;
    }

    // copied from stackoverflow!! https://stackoverflow.com/a/9284473
    const urlPattern = new RegExp('(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?');
    return urlPattern.test(string);
}

let text = '';

function share() {
    if (yearnItems.length < 1) {
        document.getElementById('shareList').innerText = 'Add items to share your list';
        document.getElementById('copyB').classList.add('invisible');
        text = '';
    } else {
        document.getElementById('copyB').classList.remove('invisible');

        for (let i = 0; i < yearnItems.length; i++) {
            el = yearnItems[i];

            localStorage.getItem(el.innerHTML + 'C');
            el.shareName = localStorage.getItem(el.c + 'Name');

            if (localStorage.getItem(el.c + 'Price') !== '$0' && localStorage.getItem(el.c + 'Price') !== null && localStorage.getItem(el.c + 'Price') !== undefined && localStorage.getItem(el.c + 'Price') !== '') {
                el.sharePrice = ' (' + localStorage.getItem(el.c + 'Price') + ')';
            } else {
                el.sharePrice = '';
            }

            if (localStorage.getItem(el.c + 'Link') !== null && localStorage.getItem(el.c + 'Link') !== undefined && localStorage.getItem(el.c + 'Link') !== '') {
                el.shareLink = localStorage.getItem(el.c + 'Link');

                if (!el.shareLink.startsWith('http')) {
                    el.shareLink = 'https://' + el.shareLink;
                }

                el.shareLink = '\n' + el.shareLink;
            } else {
                el.shareLink = '';
            }

            text = `${text}• ${el.shareName}${el.sharePrice}${el.shareLink}\n`

            if (i < yearnItems.length - 1) {
                text = text + '\n';
            }
        }

        text = text + '\nvia https://yearn.jorch.xyz'

        document.getElementById('shareList').innerText = text;
    }

    document.getElementById('modal').classList.remove('fadeIn');
    document.getElementById('modal').classList.add('fadeOut');
}

function copy() {
    navigator.clipboard.writeText(text);
    document.getElementById('copyB').innerText = 'Copied!';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
        hide();
    }
}

function hide() {
    document.getElementById('modal').classList.add('fadeIn');
    document.getElementById('modal').classList.remove('fadeOut');
    document.getElementById('copyB').innerText = 'Copy';
    text = '';
}