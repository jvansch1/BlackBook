
export const login = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'login',
    data: user
  })
}
