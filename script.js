
let player
/**
 * Callback function triggered when the YouTube IFrame API is ready.
 * Test if the YouTube API has loaded successfully.
 */
function onYouTubeIframeAPIReady () {
    console.log("api is loaded")

    player = new YT.Player('player', {
        height: 200,
        width: 200,
        videoId: 'M7lc1UVf-VE',
        playerVars: {
        playersinline: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

function onPlayerReady (){
    console.log("player is ready")
}

var done = false

function onPlayerStateChange (event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true
    }
}
