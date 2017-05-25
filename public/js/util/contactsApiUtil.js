
export const fetchContacts = (username) => {
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

export const updateContact = (contact) => {
  console.log(contact)
  return $.ajax({
    method: 'PUT',
    url: `api/contacts/${contact.id}`,
    data: contact
  })
}
