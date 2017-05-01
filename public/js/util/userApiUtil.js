
export const createUser = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'api/users',
    data: user
  })
}
