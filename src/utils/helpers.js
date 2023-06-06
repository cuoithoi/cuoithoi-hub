export function youtubeParser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

export function getDayOfWeeks(dateString) {
  // Convert the input string to a Date object
  const dateObj = new Date(dateString)

  // Define an array of Vietnamese week day names
  const weekDays = [
    'thứ 2',
    'thứ 3',
    'thứ 4',
    'thứ 5',
    'thứ 6',
    'thứ 7',
    'Chủ nhật',
  ]

  // Extract components from the Date object
  const weekDay = weekDays[dateObj.getDay()]

  return weekDay
}
export function formatDay(dateString) {
  // Convert the input string to a Date object
  const dateObj = new Date(dateString)

  // Define an array of Vietnamese week day names
  const weekDays = [
    'thứ 2',
    'thứ 3',
    'thứ 4',
    'thứ 5',
    'thứ 6',
    'thứ 7',
    'Chủ nhật',
  ]

  // Extract components from the Date object
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1 // Adding 1 because months are zero-based
  const year = dateObj.getFullYear()

  // Format the date string
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}

export function formatMonth(dateString) {
  // Convert the input string to a Date object
  const dateObj = new Date(dateString)

  // Extract month and year components from the Date object
  const month = dateObj.getMonth() + 1 // Adding 1 because months are zero-based
  const year = dateObj.getFullYear()

  // Format the month string
  const formattedMonth = `${month}/${year}`

  return formattedMonth
}
export function formatDayHero(dateString) {
  // Convert the input string to a Date object
  const dateObj = new Date(dateString)

  // Extract components from the Date object
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1 // Adding 1 because months are zero-based

  // Format the date string
  const formattedDate = `${day < 10 ? '0' : ''}${day}.${
    month < 10 ? '0' : ''
  }${month}`

  return formattedDate
}
export function convertTimeFormat(timeString) {
  const date = new Date(timeString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  const convertedTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
  return convertedTime
}
