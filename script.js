// Get modal element
var modal = document.getElementById("loginModal");

// Get the button that opens the modal
var btn = document.getElementById("signInBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Function to play the song
function playSong(audioId) {
    var audio = document.getElementById(audioId);
    audio.play();
}

// Function to pause the song
function pauseSong(audioId) {
    var audio = document.getElementById(audioId);
    audio.pause();
}

// Function to forward the song by 10 seconds
function forwardSong(audioId) {
    var audio = document.getElementById(audioId);
    audio.currentTime += 10;
}

// Function to reverse the song by 10 seconds
function reverseSong(audioId) {
    var audio = document.getElementById(audioId);
    audio.currentTime -= 10;
    if (audio.currentTime < 0) {
        audio.currentTime = 0; // Prevent going into negative time
    }
}
