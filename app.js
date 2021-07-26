var inputName = document.getElementById('bookName');
var inputAuteur = document.getElementById('auteurName');
var inputEdition = document.getElementById('bookEdition');
var inputPage = document.getElementById('nbrPage');
var btn_ajout = document.getElementById('btn-ajout');
var table = document.querySelector('table');
var message = document.querySelector('.message');
var tbody = document.createElement('tbody');
var ArrayInfo = [];
var objBooks = {};
var booksStorage = [];
var objKey = ['book', 'writer', 'edition', 'page'];

if(parseInt(localStorage.getItem('size')) > 0){
    let rlt = localStorage.getItem('books');
    booksStorage = (JSON.parse(rlt)).map(elet =>{
        return elet;
    })
    console.log(booksStorage);
}
//Ecouter les événements
btn_ajout.addEventListener('click', addRow);

//Les fonctions

//fonctions qui test les inputs de types text et number
function NamesTest(valeur) {
    if (/[a-zA-Z]{3,}/.test(valeur.value)) {
        ArrayInfo.push(valeur.value);
        valeur.parentElement.style.borderColor = '#7289da';
        valeur.parentElement.firstElementChild.style.backgroundColor = '#7289da';
    }
    else {
        valeur.parentElement.style.borderColor = '#d9534f';
        valeur.parentElement.firstElementChild.style.backgroundColor = '#d9534f';

    }
}
function NumberTest(nbr) {
    if (/^\d{4,}$/.test(nbr.value)) {
        ArrayInfo.push(nbr.value);
        nbr.parentElement.style.borderColor = '#7289da';
        nbr.parentElement.firstElementChild.style.backgroundColor = '#7289da';

    }
    else {
        nbr.parentElement.style.borderColor = '#d9534f';
        nbr.parentElement.firstElementChild.style.backgroundColor = '#d9534f';

    }
}

function PageTest(Pnbr) {
    if (/^\d{2,}$/.test(Pnbr.value)) {
        ArrayInfo.push(Pnbr.value);
        Pnbr.parentElement.style.borderColor = '#7289da';
        Pnbr.parentElement.firstElementChild.style.backgroundColor = '#7289da';

    }
    else {
        Pnbr.parentElement.style.borderColor = '#d9534f';
        Pnbr.parentElement.firstElementChild.style.backgroundColor = '#d9534f';

    }
}

//fonctions test global
function test() {
    NamesTest(inputName);
    NamesTest(inputAuteur);
    NumberTest(inputEdition);
    PageTest(inputPage);
    return ArrayInfo.length;
}

//fonction clear
function reset(){
    inputName.value = ' ';
    inputAuteur.value = ' ';
    inputEdition.value = 0;
    inputPage.value = 0;
}

//ajout d'un ligne au tableau tbody
function addRow(e) {
    e.preventDefault();
    var len = test();
    if (len >= 4) {
        var line = document.createElement('tr');
        ArrayInfo.forEach((elet, index) => {
            objBooks[objKey[index]] = elet;
            var td = document.createElement('td');
            td.textContent = elet;
            line.appendChild(td);
        })
        objBooks.id = (Math.floor(Math.random()*100)).toString();
        var tdHidden = document.createElement('td');
        tdHidden.textContent = objBooks.id;
        tdHidden.style.visibility = 'hidden';
        line.appendChild(tdHidden);
        booksStorage.push(objBooks);
        localStorage.setItem('books', JSON.stringify(booksStorage));
        localStorage.setItem('size', booksStorage.length.toString());
        var btn_delete = document.createElement('button');
        btn_delete.addEventListener('click', deleteRow);
        var td = document.createElement('td');
        btn_delete.classList.add('btn-delete');
        btn_delete.innerHTML = '<img class="img-event" src="images/trash.png"/>';
        td.appendChild(btn_delete);
        line.appendChild(td);
        tbody.appendChild(line);
        table.appendChild(tbody);
    }
    ArrayInfo = [];
    objBooks = {};
}

function deleteRow(e){
    e.target.parentElement.parentElement.classList.add('anim-delete');
    let val = e.target.parentElement.previousSibling.textContent;
    let rlt = deleteItem(val);
    console.log(rlt);
    e.target.parentElement.parentElement.addEventListener('transitionend', ()=>{
        e.target.parentElement.parentElement.remove();
    });
}

function deleteItem(indice){
    booksStorage = [];
    booksStorage = (JSON.parse(localStorage.getItem('books'))).filter(elet=>{
        return (elet.id != indice);
    });
    localStorage.setItem('books', JSON.stringify(booksStorage));
    localStorage.setItem('size', booksStorage.length.toString());

}