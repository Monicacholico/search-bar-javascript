
const searchBar = document.getElementById('searchBar');
const bookList = document.getElementById('bookUl');
let searchedBooks = [];


const url = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=UbsMbKtd9JKyBhGjMGGnrcMHjJFctMKw';
const options = {
    method: "GET",
    headers : {
        Accept: "application/json"
    }
}
const loadPosts = () =>  {
    return fetch(url, options).then(
        response => {
            return response.json();
        }
    ).then(data => {
        searchedBooks = data.results;
        displayBooks(searchedBooks);

    }).catch(err => {
        console.error(err);
      });

}

const displayBooks = (books) => {
    const htmlString = books.map(book => {
        return `<li class="card py-5>
                 <h2>${book.list_name}</h2>
                 <p>${book.oldest_published_date}</p>
                 </li>`;
    }).join('');
    bookList.innerHTML = htmlString;

}

searchBar.addEventListener('keyup', e => {
    const searchString = e.target.value;
    const filteredBooks = searchedBooks.filter(book => {
        console.log(searchedBooks);
        return (
            book.list_name.toLowerCase().includes(searchString) ||
            book.oldest_published_date.includes(searchString)
        );
    });

    displayBooks(filteredBooks);

})

loadPosts();
