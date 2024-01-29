// get a string and convert it to camelCase
function camelize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

// get a string and convert it to camelCase
function textAsTitle(str) {
  // return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  return  str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
}

function getEventState(state) {
  return state === 'active'? 'Publicado': 'En proceso' 
}

function getEventStatesAsArray() {
  return [
    {value: 'active', valueDisplay:'Publicado'},
    {value: 'inactive', valueDisplay:'En proceso'}
  ]
}

module.exports = {
  camelize,
  textAsTitle,
  getEventState,
  getEventStatesAsArray
}