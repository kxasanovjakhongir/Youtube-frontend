const profileImg = window.localStorage.getItem('profileImg')
if (profileImg) {
    avatarImg.src = backendApi + profileImg
}


//function render users
async function renderUsers() {
    const users = await request('/users')
    console.log(users);
    for (let user of users) {
        let li = document.createElement('li')

        li.innerHTML = `
            <a href="#">
                <img src="${backendApi + user.profileImg}" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
		`
        li.onclick = () => renderVideos(user.userId)

        usersList.append(li)
    }
}

//function render users ans search
async function renderVideos(userId, search) {
    const videos = await request(
        '/videos' +
        (userId ? ('?userId=' + userId) : "") +
        (search ? ('?search=' + search) : "")
    )

    if (!search) {
        searchInput.value = null
    }

    if (!userId && !search) {
        datalist.innerHTML = null
        for (let video of videos) {
            let option = document.createElement('option')
            option.value = video.videoTitle
            datalist.append(option)
        }
    }

    let vidStr = ''
    for (let video of videos) {
        let li = `
			<li class="iframe">
                <video src="${backendApi + video.videoUrl}" controls></video>
                <div class="iframe-footer">
                    <img src="${backendApi + video.user.profileImg}" alt="channel-icon">
                    <div class="iframe-footer-text">
                        <h2 class="channel-name">${video.user.username}</h2>
                        <h3 class="iframe-title">${video.videoTitle}</h3>
                        <time class="uploaded-time">${video.videoCreatedAt}</time>
                        <a class="download" href="${backendApi + '/videos/download' + video.videoUrl}">
                            <span>${video.videoSize} MB</span>
                            <img src="./img/download.png">
                        </a>
                    </div>                  
                </div>
            </li>  
		`
        vidStr += li
    }
    videosList.innerHTML = vidStr
}



//input search
searchForm.onsubmit = event => {
    event.preventDefault()
    if (searchInput.value != "") {
        return renderVideos(null, searchInput.value)
    }
}


//voice search
voiceBtn.onclick = () => {
    const voice = new webkitSpeechRecognition()
    voice.lang = 'uz-UZ'

    voice.start()

    voice.onresult = (event) => {
        searchInput.value = event.results[0][0].transcript
        renderVideos(null, event.results[0][0].transcript)
    }

    voice.onaudioend = () => {
        voice.stop()
    }
}


renderVideos()
renderUsers()