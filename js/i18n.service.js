console.log('i18n service')
var gCurrLang = 'en'
var gTrans = {
  'filter-all': {
    en: 'All',
    he: 'הכל',
  },
  'filter-name': {
    en: 'Name',
    he: 'שם',
  },
  'filter-price': {
    en: 'Price',
    he: 'מחיר',
  },
  descending: {
    en: 'Descending',
    he: 'הפוך',
  },
  'min-rating': {
    en: 'Min Rating',
    he: ' רייטינג מינימלי ',
  },
  'max-price': {
    en: 'Max Price',
    he: 'מחיר מקסימלי ',
  },
  search: {
    en: 'Search',
    he: 'חפש',
  },
  name: {
    en: "Name",
    he: 'שם',
  },
  price: {
    en: 'Price',
    he: 'מחיר',
  },
  rating: {
    en: "Rating",
    he: 'רייטינג',
  },
  action: {
    en: "Action",
    he: 'פעולה',
  },
  read: {
    en: "Read",
    he: 'קרא',
  },
  update: {
    en: "Update",
    he: 'עדכן',
  },
  delete: {
    en: "Delete",
    he: 'מחק',
  },
  english: {
    en: "English",
    he: 'אנגלית',
  },
  hebrew: {
    en: 'Hebrew',
    he: 'עברית'
  },
  close: {
    en: 'Close',
    he: 'סגור'
  },
  id: {
    en: 'Id',
    he: 'תז'
  }
}

function setLang(lang) {
  gCurrLang = lang
}

function getLang() {
  return gCurrLang
}
function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    const transKey = el.dataset.trans
    const translation = getTrans(transKey)
    el.innerText = translation
    if (el.placeholder) el.placeholder = translation
  });
}
function getTrans(transKey) {
  // done: if key is unknown return 'UNKNOWN'
  const key = gTrans[transKey]
  if (!key) return 'UNKNOWN'

  // done: get from gTrans
  var translation = key[gCurrLang]

  // done: If translation not found - use english
  if (!translation) translation = key.en

  return translation
}