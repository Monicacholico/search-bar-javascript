'use strict';

var searchBar = document.getElementById('searchBar');
var bookList = document.getElementById('bookUl');
var searchedBooks = [];

var url = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=UbsMbKtd9JKyBhGjMGGnrcMHjJFctMKw';
var options = {
    method: "GET",
    headers: {
        Accept: "application/json"
    }
};
var loadPosts = function loadPosts() {
    return fetch(url, options).then(function (response) {
        return response.json();
    }).then(function (data) {
        searchedBooks = data.results;
        displayBooks(searchedBooks);
    }).catch(function (err) {
        console.error(err);
    });
};

var displayBooks = function displayBooks(books) {
    var htmlString = books.map(function (book) {
        return '<li class="card py-5>\n                 <h2>' + book.list_name + '</h2>\n                 <p>' + book.oldest_published_date + '</p>\n                 </li>';
    }).join('');
    bookList.innerHTML = htmlString;
};

searchBar.addEventListener('keyup', function (e) {
    var searchString = e.target.value;
    var filteredBooks = searchedBooks.filter(function (book) {
        console.log(searchedBooks);
        return book.list_name.toLowerCase().includes(searchString) || book.oldest_published_date.includes(searchString);
    });

    displayBooks(filteredBooks);
});

loadPosts();