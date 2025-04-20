let player;

// Array of video IDs
const videoIds = ['iNP8_xtq8YU', '3Mt-q96kvl0', 'X_SEwgDl02E'];

// Select a random video ID from the array
let videoId = videoIds[Math.floor(Math.random() * videoIds.length)];

/**
 * Callback function triggered when the YouTube IFrame API is ready.
 */
function onYouTubeIframeAPIReady() {
    console.log("API is loaded");

    player = new YT.Player('player', {
        height: 200,
        width: 200,
        videoId: videoId,
        playerVars: {
            playersinline: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function startVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function stopVideo() {
    player.stopVideo();
}

function volumeChange(volume) {
    player.setVolume(volume)
}

function onPlayerReady() {
    console.log("Player is ready");
}

var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

// Add event listener to the button to change the video
document.addEventListener("DOMContentLoaded", () => {
    const changeVideoButton = document.getElementById("change-video");

    // Set a specific video ID to load when the button is clicked
    changeVideoButton.addEventListener("click", () => {
        const specificVideoId = "dQw4w9WgXcQ"; // Replace with your desired YouTube video ID
        videoId = specificVideoId; // Update the videoId variable
        player.loadVideoById(videoId); // Load the new video in the player
    });
});
