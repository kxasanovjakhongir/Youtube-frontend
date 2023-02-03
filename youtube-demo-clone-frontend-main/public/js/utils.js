const backendApi = "http://localhost:1515"

async function request(route, method, body) {
    let headers = {
        token: window.localStorage.getItem('token')
    }

    if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    let response = await fetch(backendApi + route, {
        method,
        headers,
        body: (body instanceof FormData) ? body : JSON.stringify(body)
    })

    if ([400, 404, 413, 415].includes(response.status)) {
        response = await response.json()

        if (errorMessage) {
            return errorMessage.textContent = response.message
        }

        return alert(response.message)
    }

    if (response.status == 401) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('profileImg')
        if (window.location.pathname == '/admin') {
            window.location = '/login'
        }
    }

    return await response.json()
}