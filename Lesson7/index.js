function getElements() {
    const input = document.getElementById('numberInput')
    const button = document.getElementById('submitButton')
    const pickedColors = document.getElementById('pickedColors')


    return {
      input: input,
      button: button,
      pickedColors: pickedColors,
    }
}

const colors = []


function getInputValue() {
    const elements = getElements()
    if (elements.input !== null) {
      const value = parseInt(elements.input.value)
      colors.length = 0
      document.getElementById('pickedColors').innerHTML = ''

      pickColors(value)
    }
}

function pickColors(item) {
  const elements = getElements()

  for (let i = 0; i <= item-1; i++){
    let color = getRandomColor()
    console.time('time' + i)
    setTimeout(() => {
      console.timeEnd('time' + i)
      console.log(color)
    }, i * 1000)
    colors.push(color)

    const li = document.createElement('li')
    const colorBox = document.createElement('div')

    li.id = color
    colorBox.classList.add('colorBox')
    colorBox.style.backgroundColor = color

    li.append(colorBox)
    elements.pickedColors.append(li)
  }
}

function getRandomColor() {
  // Generates a random integer between 0 and 255 for each color component
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Converts each component to a hexadecimal string and ensures it has two digits
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Concatenates the hex strings and returns the color
  return `#${redHex}${greenHex}${blueHex}`;
}

function fakeApiCall(param) {
  const promise = new Promise((resolve, reject) => {
    if (!param) {
      reject('No param')
    }
    setTimeout(() => {
      resolve('Hello world!')
    }, 1000)
  })

  return promise
}


async function fetchPlaceholder() {
  console.log('fetching')
  const something = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const data = await something.json()

  console.log(data)
  console.log('fetched')

  try {
    console.log(await fakeApiCall())
  } catch (error) {
    throw new Error(error)
  }

  fakeApiCall()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
  })
}

