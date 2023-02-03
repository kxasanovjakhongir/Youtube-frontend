const token = window.localStorage.getItem('token')
if (token) window.location = '/admin'

//login

loginForm.onsubmit = async event => {
    event.preventDefault()

    let user = {
        username: usernameInput.value,
        password: passwordInput.value
    }

    let response = await request('/auth/login', 'POST', user)

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