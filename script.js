let player

function onYouTubeIframeAPIReady () {
    console.log("api is loaded")

    player = new YT.Player('player', {
        height: 200,
        width: 200,
        videoId: 'M7lc1UVf-VE',
})}