const webcamVideo = document.querySelector("#webcam");
const cameraButton = document.querySelector("#camera-button");
const message = document.querySelector("#message");
let webcamStream = null;


async function startWebcam() {
    cameraButton.disabled = true;
    message.hidden = true;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        webcamStream = stream;
        webcamVideo.srcObject = stream;
        document.querySelectorAll(".note video").forEach(video => {
            video.srcObject = stream;
        });
        cameraButton.textContent = "Turn camera off";
        stream.getVideoTracks()[0].addEventListener("ended", stopWebcam);
    } catch (error) {
        message.hidden = false;
        console.log("error accessing webcam:", error.name);
    }
    cameraButton.disabled = false;
}

function stopWebcam() {
    if (webcamStream) webcamStream.getTracks().forEach(track => track.stop());
    webcamStream = null;
    document.querySelectorAll("video").forEach(video => video.srcObject = null);
    cameraButton.textContent = "Turn camera on";
    message.hidden = true;
}

cameraButton.addEventListener("click", () => {
    if (webcamStream) stopWebcam();
    else startWebcam();
});

window.addEventListener("pagehide", stopWebcam);
startWebcam();
