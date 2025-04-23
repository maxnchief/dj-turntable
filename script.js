let player;
let currentVideoTime = 0;
let timerInterval;

const videoData = [
    { id: 'X_SEwgDl02E', title: 'Solo', artist: 'Frank Ocean' },
    { id: 'k6XBs3P99rc', title: 'Stronger', artist: 'Kanye West' },
    { id: '8UVNT4wvIGY', title: 'Somebody That I Used to Know', artist: 'Gotye' },
    { id: '5uxwgU37KLY', title: 'See You Again', artist: 'Tyler, The Creator ft. Kali Uchis' },
    { id: 'vDUlQw3Oi68', title: 'See You Again', artist: 'Tyler, The Creator ft. Kali Uchis' },
    { id: 'm2OR_JaXDaM', title: 'See You Again', artist: 'Tyler, The Creator ft. Kali Uchis' },
    { id: 'KZADFte021Q', title: 'See You Again', artist: 'Tyler, The Creator ft. Kali Uchis' },
    { id: '', title: 'See You Again', artist: 'Tyler, The Creator ft. Kali Uchis' }
    
];

let current = videoData[Math.floor(Math.random() * videoData.length)];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 300,
        width: 300,
        videoId: current.id,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, modestbranding: 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    updateInfo();
    totalVideoDuration = player.getDuration();
    updateTotalTimeDisplay();
    updateCurrentTimeDisplay(); // show 00:00 at the beginning
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        updateInfo();
        document.querySelector('.disc').style.animationPlayState = 'running';
        startTimer();
    } else if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED
    ) {
        document.querySelector('.disc').style.animationPlayState = 'paused';
        stopTimer();
    }
}

function updateInfo() {
    const data = player.getVideoData();
    document.getElementById('song-title').innerText = `Title: ${data.title}`;
    document.getElementById('song-artist').innerText = `Artist: ${data.author}`;
}

function startTimer() {
    stopTimer(); // avoid multiple intervals
    timerInterval = setInterval(() => {
        currentVideoTime = player.getCurrentTime();
        updateCurrentTimeDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function updateCurrentTimeDisplay() {
    const minutes = Math.floor(currentVideoTime / 60);
    const seconds = Math.floor(currentVideoTime % 60);
    document.getElementById('current-time').innerText = `${padTime(minutes)}:${padTime(seconds)}`;
}

function updateTotalTimeDisplay() {
    const minutes = Math.floor(totalVideoDuration / 60);
    const seconds = Math.floor(totalVideoDuration % 60);
    document.getElementById('total-time').innerText = `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

function startVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function stopVideo() {
    player.stopVideo();
    document.querySelector('.disc').style.animationPlayState = 'paused'; // Stop spinning
    stopTimer();
    currentVideoTime = 0;
    updateCurrentTimeDisplay(); // Reset time to 00:00
}

function volumeChange(v) {
    player.setVolume(v);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('change-video').addEventListener('click', () => {
        const idx = (videoData.indexOf(current) + 1) % videoData.length;
        current = videoData[idx];
        player.loadVideoById(current.id);
    });

    document.getElementById('exit-button').addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim().toLowerCase();
        const found = videoData.find(v => v.title.toLowerCase().includes(query));
        if (found) {
            current = found;
            player.loadVideoById(current.id);
        } else {
            alert('Song not found: ' + query);
        }
    });
});
