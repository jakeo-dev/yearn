let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

document.getElementById('list').innerHTML = localStorage.getItem('yearnList');

let yearnItems = document.getElementsByTagName('li');

for (let i = 0; i < yearnItems.length; i++) {
    el = yearnItems[i];

    el.price = localStorage.getItem(el.id + 'Price');
}

updateFP();
updateAllItems();

if (yearnItems.length < 1) {
    document.getElementById('listOpts').classList.add('hidden');
    document.getElementById('listOpts').classList.remove('flex');
} else {
    document.getElementById('listOpts').classList.remove('hidden');
    document.getElementById('listOpts').classList.add('flex');
}

function saveList() { // call when anything in list is updated
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
        document.getElementById('shareListBtn').classList.remove('ml-auto');
    } else {
        document.getElementById('listPrice').innerText = fullPrice + ' total';
        document.getElementById('listPrice').classList.remove('hidden');
        document.getElementById('shareListBtn').classList.add('ml-auto');
    }
}

function add() {
    let input = document.getElementById('input').value.trim();

    if (input === '') {
        alert('Enter something you yearn for');
    } else {
        let el = document.createElement('li');
        el.tabIndex = 0;
        el.draggable = true;

        el.id = Math.floor((Math.random() * 900000000) + 100000000);

        el.name = input;
        localStorage.setItem(el.id + 'Name', el.name);
        let t = document.createTextNode(input);
        el.appendChild(t);
        el.classList.add('item');
        document.getElementById('list').appendChild(el);

        el.link = '';
        localStorage.setItem(el.id + 'Link', el.link);
        let btn = document.createElement('button');
        let icon = document.createElement('i');
        icon.className = 'fa-solid fa-arrow-up-right-from-square goto';
        icon.ariaLabel = 'Go to gift link';
        icon.title = 'Go to gift link';
        btn.appendChild(icon);
        btn.className = 'attr gotospan hidden';
        btn.id = el.id + 'Link';
        el.appendChild(btn);

        el.price = '$0';
        localStorage.setItem(el.id + 'Price', el.price);
        btn = document.createElement('button');
        let p = document.createTextNode(el.price);
        btn.appendChild(p);
        btn.className = 'attr price hidden';
        btn.id = el.id + 'Price';
        el.appendChild(btn);

        document.getElementById('input').value = '';

        let div = document.createElement('div');
        div.className = 'opt';

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-link';
        btn.className = 'optBtn link';
        btn.ariaLabel = 'Add link to gift';
        btn.title = 'Add link to gift';

        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-dollar-sign';
        btn.className = 'optBtn dollar-sign';
        btn.ariaLabel = 'Add price of gift';
        btn.title = 'Add price of gift';

        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-tag';
        btn.className = 'optBtn tag';
        btn.ariaLabel = 'Add an attribute';
        btn.title = 'Add an attribute';

        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-pen';
        btn.className = 'optBtn pen';
        btn.ariaLabel = 'Edit gift name';
        btn.title = 'Edit gift name';

        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash';
        btn.className = 'optBtn trash';
        btn.ariaLabel = 'Remove gift';
        btn.title = 'Remove gift';

        btn.appendChild(icon);
        div.appendChild(btn);

        el.appendChild(div);

        div = document.createElement('div');
        div.className = 'attrDiv';

        el.appendChild(div);

        el.addEventListener('dragstart', handleDragStart, false);
        el.addEventListener('dragenter', handleDragEnter, false);
        el.addEventListener('dragover', handleDragOver, false);
        el.addEventListener('dragleave', handleDragLeave, false);
        el.addEventListener('drop', handleDrop, false);
        el.addEventListener('dragend', handleDragEnd, false);

        saveList();

        let link = document.getElementsByClassName('link');
        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this.parentElement.parentElement);
            }
        }

        let price = document.getElementsByClassName('dollar-sign');
        for (i = 0; i < price.length; i++) {
            price[i].onclick = function () {
                clickPrice(this.parentElement.parentElement);
            }
        }

        let tag = document.getElementsByClassName('tag');
        for (i = 0; i < tag.length; i++) {
            tag[i].onclick = function () {
                clickTag(this.parentElement.parentElement);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        yearnItems = document.getElementsByTagName('li');
        if (yearnItems.length < 1) {
            document.getElementById('listOpts').classList.add('hidden');
            document.getElementById('listOpts').classList.remove('flex');
        } else {
            document.getElementById('listOpts').classList.remove('hidden');
            document.getElementById('listOpts').classList.add('flex');
        }
    }
}

let link = document.getElementsByClassName('link');
for (i = 0; i < link.length; i++) {
    link[i].onclick = function () {
        clickLink(this.parentElement.parentElement);
    }
}

let price = document.getElementsByClassName('dollar-sign');
for (i = 0; i < price.length; i++) {
    price[i].onclick = function () {
        clickPrice(this.parentElement.parentElement);
    }
}

let tag = document.getElementsByClassName('tag');
for (i = 0; i < tag.length; i++) {
    tag[i].onclick = function () {
        clickTag(this.parentElement.parentElement);
    }
}

let pen = document.getElementsByClassName('pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        clickPen(this.parentElement.parentElement);
    }
}

let trash = document.getElementsByClassName('trash');
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
        document.getElementById(el.id + 'Price').innerText = el.price;
        localStorage.setItem(el.id + 'Price', el.price);

        updateFP();

    } else if (event.target.classList.contains('goto')) {
        el = event.target.parentElement.parentElement;
        el.link = localStorage.getItem(el.id + 'Link');
        window.open(el.link);

    } else if (event.target.classList.contains('gotospan')) {
        el.link = localStorage.getItem(el.id + 'Link');
        window.open(el.link);

    } else if (event.target.classList.contains('attr')) {
        event.target.remove();

    } else if (event.target.classList.contains('attrDiv')) {
        el = event.target.parentElement;
        if (el.className.includes('done4')) {
            el.classList.remove('done4');
        } else if (el.className.includes('done3')) {
            el.classList.remove('done3');
            el.classList.add('done4');
        } else if (el.className.includes('done2')) {
            el.classList.remove('done2');
            el.classList.add('done3');
        } else if (el.className.includes('done1')) {
            el.classList.remove('done1');
            el.classList.add('done2');
        } else if (el.className.includes('done')) {
            el.classList.remove('done');
            el.classList.add('done1');
        } else {
            el.classList.add('done');
        }

    } else if (event.target.classList.contains('item')) {
        el = event.target;
        if (el.className.includes('done4')) {
            el.classList.remove('done4');
        } else if (el.className.includes('done3')) {
            el.classList.remove('done3');
            el.classList.add('done4');
        } else if (el.className.includes('done2')) {
            el.classList.remove('done2');
            el.classList.add('done3');
        } else if (el.className.includes('done1')) {
            el.classList.remove('done1');
            el.classList.add('done2');
        } else if (el.className.includes('done')) {
            el.classList.remove('done');
            el.classList.add('done1');
        } else {
            el.classList.add('done');
        }
    }

    saveList();

}, false);

document.body.onkeyup = function (event) {
    if (event.keyCode == 13 && document.getElementById('input') === document.activeElement) {
        document.getElementById('add').click();
    }
}

function clickTrash(el) {
    //console.log(el)
    //console.log(el.getElementById('text'));
    if (confirm('Are you sure you want to remove this gift?')) {
        el.remove();

        yearnItems = document.getElementsByTagName('li');
        if (yearnItems.length < 1) {
            document.getElementById('listOpts').classList.add('hidden');
            document.getElementById('listOpts').classList.remove('flex');
        } else {
            document.getElementById('listOpts').classList.remove('hidden');
            document.getElementById('listOpts').classList.add('flex');
        }
    }

    saveList();
    updateFP();
}

function clickPen(el) {
    entered = prompt('Enter the new name of this gift', el.name);

    if (entered == null || entered == '') {
        return;
    } else {
        el.name = localStorage.getItem(el.id + 'Name');

        //console.log(el);
        //console.log(el.name);

        el.innerHTML = el.innerHTML.replace(el.name, entered);
        el.name = entered;

        localStorage.setItem(el.id + 'Name', el.name);

        //console.log(localStorage.getItem(el.id + 'Name'));

        saveList();

        let link = document.getElementsByClassName('link');
        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this.parentElement.parentElement);
            }
        }

        let price = document.getElementsByClassName('dollar-sign');
        for (i = 0; i < price.length; i++) {
            price[i].onclick = function () {
                clickPrice(this.parentElement.parentElement);
            }
        }

        let tag = document.getElementsByClassName('tag');
        for (i = 0; i < tag.length; i++) {
            tag[i].onclick = function () {
                clickTag(this.parentElement.parentElement);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        let trash = document.getElementsByClassName('trash');
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
        let btn = document.createElement('button');
        let p = document.createTextNode(entered);
        btn.appendChild(p);
        btn.className = 'attr';
        el.getElementsByClassName('attrDiv')[0].appendChild(btn);

        saveList();
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
    } else if (entered > 999999) {
        alert('Enter a lower price');
    } else {
        if (el.getElementsByClassName('price')[0].classList.contains('hidden')) {
            el.getElementsByClassName('price')[0].classList.remove('hidden');
        }

        el.price = formatter.format((Math.round(entered * 100)) / 100);

        document.getElementById(el.id + 'Price').innerText = el.price;
        localStorage.setItem(el.id + 'Price', el.price);

        saveList();

        updateFP();
    }
}

function clickLink(el) {
    el.link = localStorage.getItem(el.id + 'Link');

    entered = prompt('Enter the link to your gift', el.link);

    let valid = validURL(entered);

    if (entered == null || entered == '') {
        return;
    } else if (valid == false) {
        alert('Enter a valid URL');
    } else {
        if (!el.getElementsByClassName('gotospan')[0]) {
            el.link = '';
            localStorage.setItem(el.id + 'Link', el.link);
            let btn = document.createElement('button');
            icon = document.createElement('i');
            icon.className = 'fa-solid fa-arrow-up-right-from-square goto';
            icon.ariaLabel = 'Go to gift link';
            icon.title = 'Go to gift link';
            btn.appendChild(icon);
            btn.className = 'attr gotospan hidden';
            btn.id = el.id + 'Link';
            el.appendChild(btn);
        }

        if (el.getElementsByClassName('gotospan')[0].classList.contains('hidden')) {
            el.getElementsByClassName('gotospan')[0].classList.remove('hidden');
        }

        if (entered.startsWith('http')) {
            el.link = entered;
        } else {
            el.link = 'https://' + entered;
        }

        localStorage.setItem(el.id + 'Link', el.link);

        saveList();
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

/* *** drag and drop items *** */
let sourceEl = null;
let srcClasses;
let srcHtml;

function handleDragStart(e) {
    sourceEl = e.srcElement;
    srcHtml = e.srcElement.innerHTML;
    srcId = e.srcElement.id;
    srcClasses = e.srcElement.className;
    srcIndex = getIndex(e.srcElement);
    sourceEl.classList.add('opacity-50');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
    sourceEl.classList.remove('opacity-50');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting
    }

    sourceEl.classList.remove('opacity-50');

    currentEl = this;

    if (sourceEl != currentEl) {
        let newEl = document.createElement('li');
        newEl.innerHTML = sourceEl.innerHTML;
        newEl.id = sourceEl.id
        newEl.className = sourceEl.className;
        newEl.tabIndex = 0;
        newEl.draggable = true;

        currentEl.parentNode.insertBefore(newEl, currentEl.nextSibling);
        sourceEl.remove();

        newEl.addEventListener('dragstart', handleDragStart, false);
        newEl.addEventListener('dragenter', handleDragEnter, false);
        newEl.addEventListener('dragover', handleDragOver, false);
        newEl.addEventListener('dragleave', handleDragLeave, false);
        newEl.addEventListener('drop', handleDrop, false);
        newEl.addEventListener('dragend', handleDragEnd, false);

        let link = document.getElementsByClassName('link');
        for (i = 0; i < link.length; i++) {
            link[i].onclick = function () {
                clickLink(this.parentElement.parentElement);
            }
        }

        let price = document.getElementsByClassName('dollar-sign');
        for (i = 0; i < price.length; i++) {
            price[i].onclick = function () {
                clickPrice(this.parentElement.parentElement);
            }
        }

        let tag = document.getElementsByClassName('tag');
        for (i = 0; i < tag.length; i++) {
            tag[i].onclick = function () {
                clickTag(this.parentElement.parentElement);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }
    }

    saveList();

    return false;
}

function handleDragEnd(e) {
    let allItems = document.querySelectorAll('.item');
    allItems.forEach(function (thing) {
        thing.classList.remove('over');
    });

    saveList();
}

let allItems = document.querySelectorAll('.item');
allItems.forEach(function (el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
});

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
            el.shareName = localStorage.getItem(el.id + 'Name');

            el.sharePrice = '';
            el.shareAttrs = '';
            el.shareLink = '';

            if (localStorage.getItem(el.id + 'Price') !== '$0' && localStorage.getItem(el.id + 'Price') !== null && localStorage.getItem(el.id + 'Price') !== undefined && localStorage.getItem(el.id + 'Price') !== '') {
                el.sharePrice = ' (' + localStorage.getItem(el.id + 'Price') + ')';
            }

            if (document.getElementsByClassName('attrDiv')[i].getElementsByClassName('attr').length > 0) {
                attrs = document.getElementsByClassName('attrDiv')[i].getElementsByClassName('attr');
                attrThing = '\n';
                for (let j = 0; j < attrs.length; j++) {
                    attrThing = attrThing + attrs[j].innerText;
                    if (j != attrs.length - 1) {
                        attrThing += ', ';
                    }
                }

                el.shareAttrs = attrThing;
            }

            if (localStorage.getItem(el.id + 'Link') !== null && localStorage.getItem(el.id + 'Link') !== undefined && localStorage.getItem(el.id + 'Link') !== '') {
                el.shareLink = localStorage.getItem(el.id + 'Link');
                if (!el.shareLink.startsWith('http')) {
                    el.shareLink = 'https://' + el.shareLink;
                }
                el.shareLink = '\n' + el.shareLink;
            }

            text = `${text}• ${el.shareName}${el.sharePrice}${el.shareAttrs}${el.shareLink}\n`

            if (i < yearnItems.length - 1) {
                text = text + '\n';
            }
        }

        text = text + '\nvia https://yearn.jakeo.dev'

        document.getElementById('shareList').innerText = text;
    }

    document.getElementById('shareModal').classList.remove('fadeIn');
    document.getElementById('shareModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function copy() {
    navigator.clipboard.writeText(text);
    document.getElementById('copyB').innerText = 'Copied!';
}

function updateAllItems() {
    currentItems = document.getElementsByClassName('optBtn');

    for (let i = 0; i < currentItems.length; i++) {
        item = currentItems[i];

        if (item.className.includes('fa-link')) {
            item.classList.remove('fa-link');
            item.classList.add('link');
        } else if (item.className.includes('fa-dollar-sign')) {
            item.classList.remove('fa-dollar-sign');
            item.classList.add('dollar-sign');
        } else if (item.className.includes('fa-tag')) {
            item.classList.remove('fa-tag');
            item.classList.add('tag');
        } else if (item.className.includes('fa-pen')) {
            item.classList.remove('fa-pen');
            item.classList.add('pen');
        } else if (item.className.includes('fa-trash')) {
            item.classList.remove('fa-trash');
            item.classList.add('trash');
        }
    }

    currentItems = document.getElementsByClassName('item');
    for (let j = 0; j < currentItems.length; j++) {
        el = currentItems[j];

        if (el.id == null || el.id == undefined || !el.id) {
            el.id = el.c;
        }

        if (el.draggable == false) {
            el.draggable = true;
        }
    }
}

function getIndex(el) {
    var i = 0;
    while (el.previousElementSibling) {
        el = el.previousElementSibling;
        i++;
    }
    return i;
}

window.onclick = function (event) {
    if (event.target == document.getElementById('shareModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('shareModal').classList.add('fadeIn');
    document.getElementById('shareModal').classList.remove('fadeOut');
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    document.getElementById('copyB').innerText = 'Copy';
    text = '';
}