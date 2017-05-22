
export const fetchContacts = (username) => {
  console.log(username)
  debugger
  return $.ajax({
    method: 'GET',
    url: 'api/contacts',
    data: username
  })
}

export const fetchContact = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/contacts/${id}`
  })
}

export const createContact = (contact) => {
  return $.ajax({
    method: 'POST',
    url: 'api/contacts',
    data: contact
  })
}
