const globalState = {
  allDevs: [],
  filteredDevs: [],
  loadingData: true,
  currentFilter: '',

  radioAnd: false,
  radioOr: true,

  checkboxes: [
    {
      filter: 'java',
      description: 'Java',
      checked: true,
      avatar: './images/java.png',
    },
    {
      filter: 'javascript',
      description: 'Java Script',
      checked: true,
      avatar: './images/javascript.png',
    },
    {
      filter: 'python',
      description: 'Python',
      checked: true,
      avatar: './images/python.png',
    },
  ],
}

const globalDivDevs = document.querySelector('#divDevs')
const globalInputName = document.querySelector('#inputName')
const globalDivCheckboxes = document.querySelector('#checkboxes')
const globalRadioAnd = document.querySelector('#radioAnd')
const globalRadioOr = document.querySelector('#radioOr')

async function start() {
  globalInputName.addEventListener('input', handleInputChange)

  globalRadioAnd.addEventListener('input', handleRadioClick)
  globalRadioOr.addEventListener('input', handleRadioClick)

  renderCheckboxes()

  await fetchAll()

  filterDevs()
}

function renderCheckboxes() {
  const { checkboxes } = globalState

  const inputCheckboxes = checkboxes.map(checkbox => {
    const { filter: id, description, checked } = checkbox

    // prettier-ignore
    return (
      `<label class="option">
        <input 
          id="${id}" 
          type="checkbox" 
          checked="${checked}"
        />
        <span>${description}</span>
      </label>`
    );
  })

  globalDivCheckboxes.innerHTML = inputCheckboxes.join('')

  checkboxes.forEach(checkbox => {
    const { filter: id } = checkbox
    const element = document.querySelector(`#${id}`)
    element.addEventListener('input', handleCheckboxClick)
  })
}

async function fetchAll() {
  const url = 'http://localhost:3001/devs'

  const resource = await fetch(url)
  const json = await resource.json()

  const jsonWithImprovedSearch = json.map(item => {
    const { name, programmingLanguages } = item

    const lowerCaseName = name.toLocaleLowerCase()

    return {
      ...item,
      searchName: removeAccentMarksFrom(lowerCaseName)
        .split('')
        .filter(char => char !== ' ')
        .join(''),
      searchLanguages: getOnlyLanguagesFrom(programmingLanguages),
    }
  })

  globalState.allDevs = [...jsonWithImprovedSearch]
  globalState.filteredDevs = [...jsonWithImprovedSearch]

  globalState.loadingData = false
}

function handleInputChange({ target }) {
  globalState.currentFilter = target.value.toLocaleLowerCase().trim()

  filterDevs()
}

function handleCheckboxClick({ target }) {
  const { id, checked } = target
  const { checkboxes } = globalState

  const checkboxToChange = checkboxes.find(checkbox => checkbox.filter === id)
  checkboxToChange.checked = checked

  filterDevs()
}

function handleRadioClick({ target }) {
  const radioId = target.id

  globalState.radioAnd = radioId === 'radioAnd'
  globalState.radioOr = radioId === 'radioOr'

  filterDevs()
}

function getOnlyLanguagesFrom(languages) {
  return languages.map(language => language.language.toLocaleLowerCase()).sort()
}

function removeAccentMarksFrom(text) {
  const WITH_ACCENT_MARKS = 'áãâäàéèêëíìîïóôõöòúùûüñ'.split('')
  const WITHOUT_ACCENT_MARKS = 'aaaaaeeeeiiiiooooouuuun'.split('')

  const newText = text
    .toLocaleLowerCase()
    .split('')
    .map(char => {
      const index = WITH_ACCENT_MARKS.indexOf(char)

      if (index > -1) {
        return WITHOUT_ACCENT_MARKS[index]
      }

      return char
    })
    .join('')

  return newText
}

function filterDevs() {
  const { allDevs, radioOr, currentFilter, checkboxes } = globalState

  const filterDevs = checkboxes
    .filter(({ checked }) => checked)
    .map(({ filter }) => filter)
    .sort()

  let filteredDevs = allDevs.filter(({ searchLanguages }) => {
    return radioOr
      ? filterDevs.some(item => searchLanguages.includes(item))
      : filterDevs.join('') === searchLanguages.join('')
  })

  if (currentFilter) {
    filteredDevs = filteredDevs.filter(({ searchName }) =>
      searchName.includes(currentFilter)
    )
  }

  globalState.filteredDevs = filteredDevs

  renderDevs()
}

function renderDevs() {
  const { filteredDevs } = globalState

  const countriesToShow = filteredDevs
    .map(dev => {
      return renderDev(dev)
    })
    .join('')

  const renderedHTML = `
     <div>
       <h2>${filteredDevs.length} dev(s) encontrado(s)</h2>
       <div class='row'>
         ${countriesToShow}
       </div>
     </div>
  `

  globalDivDevs.innerHTML = renderedHTML
}

function renderDev(dev) {
  const { name, picture, programmingLanguages } = dev
  return `
    <div class='col s12 m6 l4'>
      <div class='dev-card'>
        <img class='flag' src="${picture}" alt="${name}" />
        <div class='data'>
          <span>${name}</span>
          <span class='language'>
            ${renderLanguages(programmingLanguages)}
          </span>
        </div>
      </div>
    </div>
  `
}

function renderLanguages(languages) {
  const { checkboxes } = globalState

  return languages
    .map(item => {
      return checkboxes.find(
        ck => ck.filter === item.language.toLocaleLowerCase()
      )
    })
    .map(item => {
      return `<img class='tech' src="${item.avatar}" alt="${item.description}" />`
    })
}

start()
