
export const fetchContacts = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/contacts'
  })
}

export const fetchContact = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/contacts/${id}`
  })
}

export const createContact = (contact) => {
  console.log(contact)
  return $.ajax({
    method: 'POST',
    url: 'api/contacts',
    data: contact
  })
}
