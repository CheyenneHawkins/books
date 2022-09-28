
const container = document.querySelector('#container');


const mid = document.querySelector('#mid');

const menubox = document.getElementById('menubot');

const library = document.getElementById('library');

const abook = document.getElementsByClassName('book');

const entrybutton = document.getElementById('newbutton');   //new entry button

entrybutton.addEventListener('click', (e) => {
    popup.style.display = 'flex';
    // librarybutton.style.transform = 'translateX(-30px)'
    // menubox.style['background-color'] = 'var(--button1)'
})

const librarybutton = document.getElementById('librarybutton'); //library button
librarybutton.addEventListener('click', (e) => {
    popup.style.display = 'none';
    librarybutton.style.transform = 'translateX(0px)'
})

const arraybutton = document.getElementById('arraybutton'); //array button
arraybutton.addEventListener('click', (e) => {
    console.table(myLibrary)
})

const autobutton = document.getElementById('autofill'); //auto button
autobutton.addEventListener('click', (e) => {
    document.getElementById('book_title').value = 'Title -' + Math.floor(Math.random() * 100);
    document.getElementById('book_author').value = 'Mr ' + Math.floor(Math.random() * 100);
    document.getElementById('book_pages').value =  + Math.floor(Math.random() * 11);
})

const clearbutton = document.getElementById('clearlibrary'); //clear button

clearbutton.addEventListener('click', (e) => {
    // console.log("WORKS");
    clearPage();
    }
)

function clearPage (){
    const delbooks = document.querySelectorAll('.book');
    // console.log(delbooks);
    for (i=0; i < delbooks.length; i++){
        // console.table("WORKS");
        // console.table(i)
            library.removeChild(delbooks[i]);
        }
    
}

const popup =document.getElementById('formpopup');

document.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape'){
        popup.style.display = 'none';
    }
})



const sub = document.querySelector('#formbutton');          //submit button runs addBooktoLibrary function
sub.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
}
);

const temptitle = document.getElementById('book_title').value = 'Wow!';
const tempauthor = document.getElementById('book_author').value = 'Jimmy Joyce';
const temppages = document.getElementById('book_pages').value = '453';
// const tempread = document.getElementById('book_read').value = "checked";


let myLibrary = [];
let entrycounter = 0;                                       //counter for array

function Book(title, author, pages, read){                  //prototype for book entry
    this.title = title;
    this.author = author;
    this.pages = pages;
    // read = true ? 'read it, fool' : 'not read yet';
    this.read = read;
    this.info = `${title} by ${author}, ${pages} pages, ${read}. `
    // return this.info;
}
    
function addBookToLibrary() {                               //adds new book to array
    const temptitle = document.getElementById('book_title').value;
    const tempauthor = document.getElementById('book_author').value;
    const temppages = document.getElementById('book_pages').value;
    const tempread = document.getElementById('book_read').checked;
    
    function clearForm(){
        document.getElementById('bookform').reset();
     
    }
    function checkInput(){
        if ((temptitle!="") && (tempauthor!="") && (temppages!="")){
            const newEntry = new Book(temptitle, tempauthor, temppages, tempread) //get info
            myLibrary.push(newEntry);                                             //add array entry
            clearForm();
            clearPage();                                                            //clears cards before redrawing
            for (b=0; b < myLibrary.length; b++){                                   //cycles through array to create current cards
                showBooks();
            }
            popup.style.display = 'none';                                           //hide form 

        } else {
            alert('ENTER INFO, IDJIT!')

        }
    }
    checkInput();
}


function showBooks() {
    const makeBook = document.createElement('div');                             //creates card
        makeBook.classList.add('book');
        makeBook.setAttribute('id', `book${b}`);
            const bookTitle = document.createElement('div');
                bookTitle.textContent = myLibrary[b].title;              //title
                bookTitle.classList.add('booktitle');
                makeBook.appendChild(bookTitle);
            const bookAuthor = document.createElement('div');
                bookAuthor.textContent = myLibrary[b].author;            //author
                makeBook.appendChild(bookAuthor);
            const bookPages = document.createElement('div');
                bookPages.textContent = myLibrary[b].pages + ' pages';    //pages
                makeBook.appendChild(bookPages);
            const bookRead = document.createElement('div');
                switch (myLibrary[b].read){                                //assign read class
                    case true: 
                        bookRead.classList.add('read');
                        break;
                    case false: 
                            bookRead.classList.add('unread');
                        break;
                }
                bookRead.textContent = (myLibrary[b].read == true)         //ternary read statement
                    ? "READ" 
                    : "NOT READ"; 
                makeBook.appendChild(bookRead);
            const bookDelete = document.createElement('div');                   //delete
                const trashimg = document.createElement('img');
                trashimg.src = 'icons/delete.png';
                bookDelete.appendChild(trashimg);
            bookDelete.classList.add('delbutton');
            const tempid = `delbutton${b}`;
            bookDelete.setAttribute('id', tempid);
                const delindex = b;  
                bookDelete.addEventListener('click', (e)=>{ 
                    library.removeChild(makeBook);                          //deletes card
                    tempmyLibrary = myLibrary.splice(delindex,1);           //deletes array index
                })
            makeBook.appendChild(bookDelete);

        library.appendChild(makeBook);                                  //appends card

    };
    


