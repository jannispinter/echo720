if (document.title.startsWith("EchoPlayer")) {
  setTimeout(play, 1000); 
} else if (document.title.startsWith("Echo360")) {
  console.log("Detected Adobe Flash version of Echo360. Reloading page with iOS User-Agent string...");
  browser.runtime.sendMessage({"targetLocation": location.hostname});
}

function play() {
  const video = document.getElementById("video1");
  const playlistUrl = video.src;
  if (video == null) {
    return;
  }


  if (Hls.isSupported()) {

    // disable worker so that we do not conflict with CSP
    Hls.DefaultConfig.enableWorker = false;

    // set audio codec manually
    Hls.DefaultConfig.defaultAudioCodec = "mp4a.40.5";

    var hls = new Hls();
    hls.loadSource(playlistUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = playlistUrl;
    video.addEventListener('loadedmetadata', function() {
      video.play();
    });
  }
}
