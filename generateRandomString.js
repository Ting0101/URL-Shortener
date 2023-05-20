function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateRandomString() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  console.log(collection)

  let RandomString = ''
  for (let i = 0; i < 5; i++) {
    RandomString += sample(collection)
  }


  console.log(RandomString)
  return RandomString
}

module.exports = generateRandomString
