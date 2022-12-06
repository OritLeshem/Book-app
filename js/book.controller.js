'use strict'
var gView = 1
var gSelectedBook = null
console.log("js controller")
function onInit() {
  renderFilterByQueryStringParams()
  renderChosenView()



}
function renderChosenView() {
  if (gView === 1) {
    renderBooks()
    document.querySelector('.cards-container').innerHTML = ""
  }
  if (gView === -1) {
    renderCards()
    document.querySelector('.view-table').innerHTML = ""

  }
}
function onView(num) {
  gView = num
  onInit()
}
function renderCards() {

  var books = getBooks()
  var strHtmls = books.map(book => `
  <div class="card" style="width: 18rem;">
  <img src='${book.img}' class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${book.name}</h5>
    <button onclick="onReadBook('${book.id}')">Read</button>
          <button onclick="onUpdateBook('${book.id}')">Update</button>
          <button class="btn-remove" onclick="onRemoveBook('${book.id}')">Delete</button>
  </div>
</div>`
  )
  document.querySelector('.cards-container').innerHTML = strHtmls.join('')
}


{/* <article class="car-preview">
          <button class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button>
          <h5>${book.name}</h5>
          <h6> $ ${book.price}</h6>
          <img width = '80px' src='${book.img}'/>
          <div class= "btns-cards">
          <button onclick="onReadBook('${book.id}')">Read</button>
          <button onclick="onUpdateBook('${book.id}')">Update</button>
          </div>
      </article>  */}


function renderBooks() {
  const books = getBooks()
  console.log(books)
  if (!books) return


  var strHTMLs = `<table class="table table-hover m-3  ">
  <thead>
    <tr>
      <th scope="col">ID</td>
      <th class="text-align-center" scope="col" onclick="onSort('name')">NAME</td>
      <th scope="col" onclick="onSort('price')">PRICE</td>
      <th scope="col" >RATING</td>
      <th colspan="3" class= "text-center">ACTION</td>
    </tr>
  </thead> <tbody>`
  strHTMLs += books.map(book => {
    return `<tr>
      <td>${book.id}</td>
      <td class="text-align-left col-4" >${book.name}</td>
      <td class="col-4">${book.price}</td>
      <td>${book.rating}</td>
      <td><button class= "btn btn-outline-success mx-1" onclick="onReadBook('${book.id}')">Read</button></td>

      <td><button class= "btn btn-outline-success mx-1" onclick="onUpdateBook('${book.id}')">Update</button></td>
      <td><button class= "btn btn-outline-success mx-1 btn-remove" onclick="onRemoveBook('${book.id}')">Delete</button></td>
      </td>
      
      </tr>`
  }).join('')
  strHTMLs += `</tbody></table>`
  document.querySelector('.view-table').innerHTML = strHTMLs
}





function onRemoveBook(bookId) {

  console.log("delete book controller")
  removeBook(bookId)
  renderChosenView()
  renderChosenView()
}
function onAddBook(e) {
  console.log("add book controler")
  e.preventDefault()
  var elName = document.querySelector('input[name="name"]')
  var bookName = elName.value
  var elPrice = document.querySelector('input[name="price"]')
  var bookPrice = elPrice.value
  console.log(bookName, bookPrice)
  if (bookName.length > 0 && bookPrice > 0) {
    addBook(bookName, bookPrice)
    elName.value = ""
    elPrice.value = 0
    renderChosenView()
  }
  else return
}

function onReadBook(bookId) {
  console.log("reading book")
  var book = getBookById(bookId)
  console.log(book)
  gSelectedBook = book
  console.log('gSelectedBook', gSelectedBook)


  var elModal = document.querySelector('.new-modal')
  elModal.querySelector('h3').innerText = book.name
  elModal.querySelector('h4 span').innerText = book.price
  elModal.querySelector('img').src = book.img
  elModal.querySelector('p').innerText = book.description
  document.querySelector('.rating-num').innerText = book.rating

  elModal.classList.add('open')
  // generateQueryStringParams(gFilterBy, gSelectedBook)
}
function onCloseModal() {
  gSelectedBook = null
  document.querySelector('.new-modal').classList.remove('open')
  // console.log(gSelectedBook)
  // generateQueryStringParams(gFilterBy, gSelectedBook)
}
function onRating(num) {
  var elRating = document.querySelector('.rating-num')
  elRating.innerText = applyRating(num)
  renderChosenView()
}

function onUpdateBook(bookId) {
  console.log("updated clicked controller")
  const book = getBookById(bookId)
  var newPrice = +prompt('price?', book.price)
  if (newPrice && book.price !== newPrice) {
    const book = updateBook(bookId, newPrice)
    // flashMsg(`Price updated to: ${book.price}`)
    renderChosenView()
  }
}
function onSetFilterBy(filterBy) {
  // e.preventDefault()
  var elFilterPrice = document.querySelector('.what-the-price')
  var elFilterRate = document.querySelector('.what-the-rate')
  if (filterBy.minRate) elFilterRate.innerText = filterBy.minRate
  if (filterBy.maxPrice) elFilterPrice.innerText = filterBy.maxPrice
  filterBy = setBookFilter(filterBy)
  renderChosenView()
  generateQueryStringParams(filterBy, gSelectedBook)
}

function generateQueryStringParams(filterBy) {
  // if (gSelectedBook && gSelectedBook.id) {
  //   console.log(gSelectedBook.id)
  //   const queryStringParams = `?&minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}&modal=${gSelectedBook.id}`
  //   const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
  //   window.history.pushState({ path: newUrl }, '', newUrl)
  // }
  // if (gSelectedBook === null) {
  console.log(gSelectedBook)
  // const queryStringParams = `?&minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}&modal=${gSelectedBook = null}`
  const queryStringParams = `?&minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}`
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
  // }
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const filterBy = {
    // search: queryStringParams.get('search') || '',
    minRate: +queryStringParams.get('minRate') || 0,
    maxPrice: +queryStringParams.get('maxPrice') || 150,
  }
  // onReadBook(queryStringParams.get('modal'))

  if (!filterBy.minRate && !filterBy.maxPrice) return

  document.querySelector('.filter-price-range').value = filterBy.maxPrice
  document.querySelector('.filter-rate-range').value = filterBy.minRate
  setBookFilter(filterBy)
}
function onChangePage(page) {
  var res = changePage(page)
  var Idx = res.gPageIdx
  var size = res.PAGE_SIZE
  var elPrev = document.querySelector('.prev')
  console.log(Idx)
  console.log(Idx * size + size, gBooks.length)
  var elNext = document.querySelector('.next')
  if (Idx === 0) {
    elPrev.disabled = true
    elPrev.style.opacity = '0.3'
  }
  if ((Idx !== 0)) {

    elPrev.disabled = false
    elPrev.style.opacity = '1'
  }
  if (Idx * size + size >= gBooks.length) {
    elNext.disabled = true
    elNext.style.opacity = '0.3'
  }
  if (Idx * size + size < gBooks.length) {

    elNext.disabled = false
    elNext.style.opacity = '1'
  }
  renderChosenView()
}

function onSort(sortKey) {
  sort(sortKey)
  renderChosenView()
}

function onSortForCards() {
  const prop = document.querySelector('.sort-by').value
  const isDesc = document.querySelector('.sort-desc').checked
  const sortBy = {}
  console.log("sortby", sortBy)

  sortBy[prop] = (isDesc) ? -1 : 1

  SortForCards(sortBy)
  renderChosenView()

}
