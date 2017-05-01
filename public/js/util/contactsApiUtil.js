
export const fetchContacts = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/contacts'
  })
}
