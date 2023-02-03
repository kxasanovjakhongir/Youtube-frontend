const token = window.localStorage.getItem('token')
if (token) window.location = '/admin'


//register

registerForm.onsubmit = async event => {
    event.preventDefault()

    let formData = new FormData()

    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('file', uploadInput.files[0])

    let response = await request('/auth/register', 'POST', formData)

    if (response.token) {
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('profileImg', response.user.profileImg)
        window.location = '/admin'
    }

    usernameInput.value = null
    passwordInput.value = null
}

showButton.onclick = () => {
    if (passwordInput.type == 'password') {
        return passwordInput.type = 'text'
    }

    if (passwordInput.type == 'text') {
        return passwordInput.type = 'password'
    }
}