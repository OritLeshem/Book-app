'use strict'
console.log("js service")
var STORAGE_KEY = 'gBooksDB'
var gBooks
var gFilterBy = { search: "", maxPrice: 150, minRate: 0 }
var gDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloremque, vel magnam corrupti quisquam nesciunt pariatur, inventore velit non deserunt iusto voluptatem quis eum perspiciatis ex error. Commodi, reprehenderit ullam.'
const PAGE_SIZE = 7
var gPageIdx = 0
var isDescPrice = -1
var isDescName = -1

createBooks()

function getBooks() {
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
      {
        id: '13',
        name: "harry potter13",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '14',
        name: "Dani Din14",
        price: 35,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '15',
        name: "On mystic Lake:A Novel15",
        price: 45,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 5
      },
      {
        id: '16',
        name: "mokir3",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '17',
        name: "puki",
        price: 120,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 3
      },
      {
        id: '18',
        name: "bla bla18",
        price: 15,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 1
      },
      {
        id: '19',
        name: "harry potter19",
        price: 115,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 8
      },
      {
        id: '20',
        name: "Dani Din20",
        price: 75,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '21',
        name: "On mystic Lake:A Novel21",
        price: 65,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 2
      },
      {
        id: '22',
        name: "mokir22",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '23',
        name: "puki122",
        price: 40,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 10
      },
      {
        id: '24',
        name: "bla bla24",
        price: 55,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 8
      }, {
        id: '25',
        name: "harry potter25",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '26',
        name: "Dani Din26",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '27',
        name: "On mystic Lake:A Novel27",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 5
      },
      {
        id: '28',
        name: "mokir28",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '29',
        name: "puki29",
        price: 40,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 10
      },
      {
        id: '30',
        name: "bla bla30",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 2
      },
      {
        id: '31',
        name: "harry potter31",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '32',
        name: "Dani Din32",
        price: 25,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 7
      },
      {
        id: '33',
        name: "On mystic Lake:A Novel33",
        price: 35,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 5
      },
      {
        id: '34',
        name: "mokir134",
        price: 135,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      },
      {
        id: '35',
        name: "puki331",
        price: 40,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 10
      },
      {
        id: '36',
        name: "bla bla136",
        price: 76,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 2
      }, {
        id: '37',
        name: "harry potter37",
        price: 105,
        img: "./img/harry-potter-gead88a521_1280.png",
        description: gDescription,
        rating: 9
      }

    ]
    console.log(gBooks)
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
}

function getBookfilter() {
  return gFilterBy
}


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