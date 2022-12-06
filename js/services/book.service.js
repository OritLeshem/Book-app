'use strict'
console.log("js service")
var STORAGE_KEY = 'gBooksDB'
var gBooks
var gFilterBy = { search: "", maxPrice: 150, minRate: 0 }
var gDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloremque, vel magnam corrupti quisquam nesciunt pariatur, inventore velit non deserunt iusto voluptatem quis eum perspiciatis ex error. Commodi, reprehenderit ullam.'
const PAGE_SIZE = 3
var gPageIdx = 0

createBooks()

function getBooks() {
  // fix undefind for span filter here
  var books = gBooks.filter(
    book => ((book.rating >= gFilterBy.minRate) && (book.price < gFilterBy.maxPrice) &&
      (book.name.toLowerCase().includes(gFilterBy.search.toLowerCase())))
  )
  var startIdx = gPageIdx * PAGE_SIZE
  return books.slice(startIdx, startIdx + PAGE_SIZE)

}

function createBooks() {
  gBooks = loadFromStorage(STORAGE_KEY)
  if (!gBooks || gBooks.length === 0) {
    gBooks = [
      {
        id: '1',
        name: "harry potter",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '2',
        name: "Dani Din",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '3',
        name: "On mystic Lake:A Novel",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 5
      },
      {
        id: '4',
        name: "mokir",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '5',
        name: "puki",
        price: 40,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 10
      },
      {
        id: '6',
        name: "bla bla",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 2
      },
      {
        id: '7',
        name: "harry potter1",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '8',
        name: "Dani Din1",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '9',
        name: "On mystic Lake:A Novel1",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 5
      },
      {
        id: '10',
        name: "mokir1",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '11',
        name: "puki1",
        price: 40,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 10
      },
      {
        id: '12',
        name: "bla bla1",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 2
      },
    ]
  }
  saveToStorage(STORAGE_KEY, gBooks)
  return gBooks
}
function removeBook(bookId) {
  console.log("delete book service")
  const bookIdx = gBooks.findIndex(book => book.id === bookId)
  console.log(gBooks)
  gBooks.splice(bookIdx, 1)
  saveToStorage(STORAGE_KEY, gBooks)

}

function addBook(elName, elPrice) {
  console.log("addBook service")
  console.log(elName, elPrice)
  var book = {
    id: _makeId(),
    name: elName,
    price: elPrice,
    img: "./img/harry-potter-gead88a521_1280.png",
    description: gDescription,
    rating: 0
  }
  gBooks.unshift(book)
  saveToStorage(STORAGE_KEY, gBooks)
}
function getBookById(bookId) {
  const book = gBooks.find(book => book.id === bookId)
  return book
}
function applyRating(num) {
  console.log(num)
  var book = getBookById(gSelectedBook.id)


  if (num === 1) {
    book.rating++
  }
  if (num === -1) {
    book.rating--

  }
  saveToStorage(STORAGE_KEY, gBooks)
  return book.rating
}
function updateBook(bookId, newPrice) {
  const book = gBooks.find(book => book.id === bookId)
  book.price = newPrice
  saveToStorage(STORAGE_KEY, gBooks)
  return book
}
function setBookFilter(filterBy = {}) {
  gPageIdx = 0
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
  if (filterBy.search !== undefined) gFilterBy.search = filterBy.search
  return gFilterBy

  console.log('gFilterBy', gFilterBy)
}


var isDescPrice = -1
var isDescName = -1
function sort(sortKey) {
  gPageIdx = 0
  console.log('sorted key', sortKey)
  if (sortKey === "price") {
    isDescPrice = -isDescPrice
    gBooks.sort((book1, book2) => isDescPrice * (book1.price - book2.price))
  }
  else {
    isDescName = -isDescName
    if (isDescName === 1) {
      (gBooks.sort((book1, book2) => book1.name.localeCompare(book2.name)))
    } else
      (gBooks.sort((book1, book2) => book2.name.localeCompare(book1.name)))
  }
}

function SortForCards(sortBy) {
  gPageIdx = 0
  if (sortBy.name !== undefined) gBooks.sort((book1, book2) => book1.name.localeCompare(book2.name) * sortBy.name)
  else if (sortBy.price !== undefined) gBooks.sort((book1, book2) => (book1.price - book2.price) * sortBy.price)

}

// changePage()
function changePage(page) {
  gPageIdx += page

  return { gPageIdx, PAGE_SIZE }
}