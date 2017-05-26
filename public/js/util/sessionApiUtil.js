
export const login = (user) => {
  console.log(user)
  return $.ajax({
    method: 'POST',
    url: 'login',
    data: user
  })
}
