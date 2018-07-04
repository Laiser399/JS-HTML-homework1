let ArrayBooks = [];
let numberOfBooks = 0;

let CurrentPage = 1;
let MaxPage = 1;

let ResultOfSearch = [];
let isAfterSearch = false;
let numberOfFoundBooks = 0;

let typeSort = 0; //0 - net sortirovki
let vectorSort = 1; // 1-по увеличению, 2-по убыв


//indexof - podstroka
//localeCompare
//floor - цел часть числа
//27

function AddBook() {
    let Name;
    let Author;
    let Publish;
    let Year;
    //cancel - null, else - ""
    while (true) {
        Name = prompt("Название книги:", "");
        if (Name === null) {
            return;
        }
        else if (Name === '') {
            alert('Ошибка ввода!')
        }
        else {
            break;
        }
    }

    while (true) {
        Author = prompt("Автор:", "");
        if (Author === null) {
            return;
        }
        else if (Author === '') {
            alert('Ошибка ввода!')
        }
        else {
            break;
        }
    }

    while (true) {
        Publish = prompt("Издательство:", "");
        if (Publish === null) {
            return;
        }
        else if (Publish === '') {
            alert('Ошибка ввода!')
        }
        else {
            break;
        }
    }

    while (true) {
        Year = prompt("Год:", "");
        if (Year === null) {
            return;
        }
        else if (Year === '') {
            alert('Ошибка ввода!');
        }
        else if (Year.length > 4) {
            alert('Максимальная длина - 4 символа!');
        }
        else {
            break;
        }
    }

    ArrayBooks[numberOfBooks] = [Name, Author, Publish, Year];
    numberOfBooks++;

    MaxPage = Math.floor(numberOfBooks / 10);
    if (numberOfBooks % 10 !== 0) {
        MaxPage++;
    }
    if (MaxPage === 0) MaxPage = 1;
    if (isAfterSearch) {
        CurrentPage = 1;
        isAfterSearch = false;
    }
    SortBooks();

    RefreshPages();
    DisplayAllBooks();
}

function FindBook() {
    let number;
    let subStr;
    while (true) {
        number = prompt("Выберите параметр поиска:\n1. Название книги;\n2. Автор;\n3. Издательство;\n4. Год.", "");
        if (number == null) return;
        number = +number;
        if ((isNaN(number)) || (number < 1) || (number > 4)) {
            alert('Ошибка чтения номера!');
            continue;
        }
        break;
    }
    while (true) {
        subStr = prompt("Выберите параметр поиска:\n1. Название книги;\n2. Автор;\n3. Издательство;\n4. Год.", "");
        if (subStr == null) return;
        if (subStr === '') {
            alert('Нет смысла искать вхождение пустой строки!');
            continue;
        }
        break;
    }


    ResultOfSearch = [];
    numberOfFoundBooks = 0;
    for (let i = 0; i < numberOfBooks; i++) {
        if (ArrayBooks[i][number - 1].indexOf(subStr) >= 0) {
            let tmp = ArrayBooks[i];
            tmp[4] = i;
            ResultOfSearch[numberOfFoundBooks] = tmp;
            numberOfFoundBooks++;
        }
    }
    alert(`Найдено ${numberOfFoundBooks} книг!`);
    isAfterSearch = true;

    MaxPage = Math.floor(numberOfFoundBooks / 10);
    if (numberOfFoundBooks % 10 !== 0) {
        MaxPage++;
    }
    if (MaxPage === 0) MaxPage = 1;
    CurrentPage = 1;
    RefreshPages();
    DisplayBooks();
}

function DeleteBook() {
    //splice
    let number;
    let answer;
    while (true) {
        number = prompt("Выберите номер книги:", "");
        if (number == null) return;
        number = +number;
        if ((isNaN(number)) || (number < 1) || ((isAfterSearch) && (number > numberOfFoundBooks)) || ((!isAfterSearch) && (number > numberOfBooks))) {
            alert('Номер книги выходит за пределы!');
            continue;
        }
        break;
    }
    if (isAfterSearch) {
        answer = confirm(`Удалить следующую книгу?:\nНазвание книги: ${ResultOfSearch[number - 1][0]}\nАвтор: ${ResultOfSearch[number - 1][1]}\nИздательство: ${ResultOfSearch[number - 1][2]}\nГод: ${ResultOfSearch[number - 1][3]}`);
        if (answer) {
            ArrayBooks.splice(ResultOfSearch[number - 1][4], 1);
            ResultOfSearch.splice(number, 1);
            numberOfFoundBooks--;
            numberOfBooks--;
            MaxPage = Math.floor(numberOfFoundBooks / 10);
            if (numberOfFoundBooks % 10 !== 0) {
                MaxPage++;
            }
            if (MaxPage === 0) MaxPage = 1;
            CurrentPage = 1;
        }
    }
    else {
        answer = confirm(`Удалить следующую книгу?:\nНазвание книги: ${ArrayBooks[number - 1][0]}\nАвтор: ${ArrayBooks[number - 1][1]}\nИздательство: ${ArrayBooks[number - 1][2]}\nГод: ${ArrayBooks[number - 1][3]}`);
        if (answer) {
            ArrayBooks.splice(number - 1, 1);
            numberOfBooks--;
            MaxPage = Math.floor(numberOfBooks / 10);
            if (numberOfBooks % 10 !== 0) {
                MaxPage++;
            }
            if (MaxPage === 0) MaxPage = 1;
        }
    }
    RefreshPages();
    DisplayBooks();


    //TODO в записимости от isAfterSearch
}

function AskSortBooks() {
    let number;
    let vecSort;
    while (true) {
        number = prompt("Выберите параметр сортировки:\n1. Название книги;\n2. Автор;\n3. Издательство;\n4. Год.", "");
        if (number == null) return;
        number = +number;
        if ((isNaN(number)) || (number < 1) || (number > 4)) {
            alert('Ошибка чтения номера!');
            continue;
        }
        break;
    }

    while (true) {
        vecSort = prompt("Выберите тип сортировки:\n1. по увеличению;\n2. по убыванию.", "");
        if (vecSort == null) return;
        vecSort = +vecSort;
        if ((isNaN(vecSort)) || (vecSort < 1) || (vecSort > 2)) {
            alert('Ошибка чтения номера!');
            continue;
        }
        break;
    }

    typeSort = number;
    vectorSort = vecSort;
    SortBooks();
}

function SortBooks() {
    if (typeSort === 0) return;
    isAfterSearch = false;
    //sort
    let tm_book;
    if (vectorSort === 1) {
        // по увелич
        for (let i1 = 0; i1 < numberOfBooks - 1; i1++) {
            for (let i2 = 0; i2 < numberOfBooks - i1 - 1; i2++) {
                if (ArrayBooks[i2 + 1][typeSort - 1].localeCompare(ArrayBooks[i2][typeSort - 1]) === -1) {
                    tm_book = ArrayBooks[i2];
                    ArrayBooks[i2] = ArrayBooks[i2 + 1];
                    ArrayBooks[i2 + 1] = tm_book;
                }
            }
        }
    }
    else if (vectorSort === 2) {
        // по убыв
        for (let i1 = 0; i1 < numberOfBooks - 1; i1++) {
            for (let i2 = 0; i2 < numberOfBooks - i1 - 1; i2++) {
                if (ArrayBooks[i2][typeSort - 1].localeCompare(ArrayBooks[i2 + 1][typeSort - 1]) === -1) {
                    tm_book = ArrayBooks[i2];
                    ArrayBooks[i2] = ArrayBooks[i2 + 1];
                    ArrayBooks[i2 + 1] = tm_book;
                }
            }
        }
    }
    MaxPage = Math.floor(numberOfBooks / 10);
    if (numberOfBooks % 10 !== 0) {
        MaxPage++;
    }
    if (MaxPage === 0) MaxPage = 1;
    RefreshPages();
    DisplayAllBooks();
}

function DisplayAllBooks() {
    isAfterSearch = false;
    MaxPage = Math.floor(numberOfBooks / 10);
    if (numberOfBooks % 10 !== 0) {
        MaxPage++;
    }
    if (MaxPage === 0) MaxPage = 1;
    DisplayBooks();
}

function DisplayBooks() {
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`t_index${i}`).innerText = '';
        document.getElementById(`t_book${i}`).innerText = '';
        document.getElementById(`t_author${i}`).innerText = '';
        document.getElementById(`t_publish${i}`).innerText = '';
        document.getElementById(`t_year${i}`).innerText = '';
    }
    //TODO after search
    if (isAfterSearch) {
        let maxPos = numberOfFoundBooks < 10 * CurrentPage ? numberOfFoundBooks : 10 * CurrentPage;
        for (let i = 10 * (CurrentPage - 1); i < maxPos; i++) {
            document.getElementById(`t_index${i % 10 + 1}`).innerText = i + 1;
            if (ResultOfSearch[i][0].length > 27) {
                document.getElementById(`t_book${i % 10 + 1}`).innerText = ResultOfSearch[i][0].substr(0, 25) + '...'
            }
            else {
                document.getElementById(`t_book${i % 10 + 1}`).innerText = ResultOfSearch[i][0];
            }
            if (ResultOfSearch[i][1].length > 27) {
                document.getElementById(`t_author${i % 10 + 1}`).innerText = ResultOfSearch[i][1].substr(0, 25) + '...'
            }
            else {
                document.getElementById(`t_author${i % 10 + 1}`).innerText = ResultOfSearch[i][1];
            }
            if (ResultOfSearch[i][2].length > 27) {
                document.getElementById(`t_publish${i % 10 + 1}`).innerText = ResultOfSearch[i][2].substr(0, 25) + '...';
            }
            else {
                document.getElementById(`t_publish${i % 10 + 1}`).innerText = ResultOfSearch[i][2];
            }
            document.getElementById(`t_year${i % 10 + 1}`).innerText = ResultOfSearch[i][3];
        }
    }
    else {
        let maxPos = numberOfBooks < 10 * CurrentPage ? numberOfBooks : 10 * CurrentPage;
        for (let i = 10 * (CurrentPage - 1); i < maxPos; i++) {


            document.getElementById(`t_index${i % 10 + 1}`).innerText = i + 1;
            if (ArrayBooks[i][0].length > 27) {
                document.getElementById(`t_book${i % 10 + 1}`).innerText = ArrayBooks[i][0].substr(0, 25) + '...'
            }
            else {
                document.getElementById(`t_book${i % 10 + 1}`).innerText = ArrayBooks[i][0];
            }
            if (ArrayBooks[i][1].length > 27) {
                document.getElementById(`t_author${i % 10 + 1}`).innerText = ArrayBooks[i][1].substr(0, 25) + '...'
            }
            else {
                document.getElementById(`t_author${i % 10 + 1}`).innerText = ArrayBooks[i][1];
            }
            if (ArrayBooks[i][2].length > 27) {
                document.getElementById(`t_publish${i % 10 + 1}`).innerText = ArrayBooks[i][2].substr(0, 25) + '...';
            }
            else {
                document.getElementById(`t_publish${i % 10 + 1}`).innerText = ArrayBooks[i][2];
            }
            document.getElementById(`t_year${i % 10 + 1}`).innerText = ArrayBooks[i][3];
        }
    }

}

function NextPage() {
    CurrentPage = CurrentPage + 1 <= MaxPage ? CurrentPage + 1 : MaxPage;
    RefreshPages();
    DisplayBooks();
}

function PrevPage() {
    CurrentPage = CurrentPage - 1 >= 1 ? CurrentPage - 1 : 1;
    RefreshPages();
    DisplayBooks();
}

function RefreshPages() {
    document.getElementById('pages').innerText = `${CurrentPage} из ${MaxPage}`;
}