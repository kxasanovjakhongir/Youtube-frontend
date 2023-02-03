const token = window.localStorage.getItem('token')
if (!token) window.location = '/login'

;
(async() => {
    let response = await request('/auth/validateToken')
})()


//renderVideos functions 
async function renderVideos() {
    const videos = await request('/videos')
    videosList.innerHTML = null
    for (let video of videos) {
        let li = document.createElement('li')
        let videoEl = document.createElement('video')
        let p = document.createElement('p')
        let img = document.createElement('img')

        li.className = 'video-item'
        p.className = 'content'
        img.className = 'delete-icon'

        videoEl.setAttribute('controls', true)
        videoEl.setAttribute('src', backendApi + video.videoUrl)
        p.setAttribute('contenteditable', true)
        img.setAttribute('src', './img/delete.png')
        img.width = 25

        p.textContent = video.videoTitle

        li.append(videoEl, p, img)
        videosList.append(li)


    }
}


//video
videoForm.onsubmit = async event => {
    event.preventDefault()
    errorMessage.textContent = null

    if (!uploadInput.files[0]) {
        return errorMessage.textContent = 'Video must be selected!'
    }

    if (uploadInput.files[0].size / (2 ** 20) > 200) {
        return errorMessage.textContent = 'Video must not be larger than 200MB!'
    }

    let formData = new FormData()
    formData.append('videoTitle', videoInput.value)
    formData.append('video', uploadInput.files[0])

    videoForm.reset()

    let response = await request('/videos', 'POST', formData)
    await renderVideos()
}

renderVideos()