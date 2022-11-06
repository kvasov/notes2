const saveLS = function (data) {
  localStorage.setItem('notes', JSON.stringify(data))
}

const readLS = function () {
  return localStorage.getItem('notes')
}

export { saveLS, readLS }
