console.log("Welcome to Audio Player");

// Initialize the Variables
var songIndex = 0;
var isPlaying = 0;
var currentTime = 0;
let audioElement = new Audio('audios/Jab Tak (slowed + reverbed).mp3');
let masterPlay = document.getElementById('mainplay');
let masterStart = document.getElementById('previous');
let masterEnd = document.getElementById('next');
let myProgressBar = document.getElementById('progressbar');
let masterSongName = document.getElementById('masterSongName');
var songItems = [];
var songs = [
    {songname : "Jab Tak (slowed + reverbed)", location : "audios/Jab Tak (slowed + reverbed).mp3", duration : 256},
    {songname : "Jaan Ban Gaye", location : "audios/Jaan Ban Gaye.mp3", duration : 224},
    {songname : "Tum Tak", location : "audios/Tum Tak.mp3", duration : 304},
    {songname : "Kaise Hua", location : "audios/Kaise Hua.mp3", duration : 254},
    {songname : "Let Me Down X Main Dhoondne", location : "audios/Let Me Down Slowly X Main Dhoondne.mp3", duration : 177},
    {songname : "Agar Tum Saath Ho", location : "audios/Agar Tum Saath Ho.mp3", duration : 341},
    {songname : "Raatan Lambiyan", location : "audios/Raatan Lambiyan.mp3", duration : 230},
    {songname : "I Love You - Akull", location : "audios/I Love You - Akull.mp3", duration : 216},
    {songname : "Lal Chunariya - Akull", location : "audios/Lal Chunariya - Akull.mp3", duration : 199},
    {songname : "Without Me - Halsey", location : "audios/Without Me - Halsey.mp3", duration : 204},
    {songname : "The Script - Hall of Fame", location : "audios/The Script - Hall of Fame.mp3", duration : 203},
    {songname : "The Box - Roddy Ricch", location : "audios/The Box - Roddy Ricch.mp3", duration : 197},
    {songname : "Demons - Imagine Dragon", location : "audios/Demons - Imagine Dragon.mp3", duration : 208},
    {songname : "Tere Nainon Mein - Blitz & Kashif", location : "audios/Tere Nainon Mein - Blitz & Kashif.mp3", duration : 253},
    {songname : "See You Again - Wiz", location : "audios/See You Again - Wiz.mp3", duration : 237},
    {songname : "Ik Kahani - Gajendra Verma", location : "audios/Ik Kahani - Gajendra Verma.mp3", duration : 207},
    {songname : "Freeverse Feast - Emiway Bantai", location : "audios/Freeverse Feast - Emiway Bantai.mp3", duration : 185},
]
let songlists = document.getElementsByClassName("songlist")[0];
for(var i = 0;i<songs.length;i++) {
    let audiomini = new Audio();
    audiomini.src = songs[i].location;
    let songprofile = document.createElement("div");
    songprofile.className = "songprofile";
    songprofile.id = ""+i;
    let songname = document.createElement("span");
    songname.innerHTML = songs[i].songname;
    songname.className = "songname";
    let songwidget = document.createElement("span");
    songwidget.className = "songwidget";
    let timestamp = document.createElement("span");
    timestamp.innerHTML = ""+Math.round(songs[i].duration/60)+":"+songs[i].duration%60;
    timestamp.className = "timestamp";
    let img = document.createElement("img");
    img.src = "images/play.png";
    img.className = "songitemplay";
    songwidget.appendChild(timestamp);
    songwidget.appendChild(img);
    songprofile.appendChild(songname);
    songprofile.appendChild(songwidget);
    songlists.appendChild(songprofile);
    songItems[i] = songprofile;
//    console.log(""+Math.round(songs[i].duration/60)+":"+songs[i].duration%60);
}
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    if(progress==100) {
        next();
    }
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
masterPlay.onclick = play;
masterStart.onclick = previous;
masterEnd.onclick = next;


songItems.forEach((element) => {
    console.log(""+element.id);
    element.getElementsByClassName("songwidget")[0].getElementsByClassName("songitemplay")[0].addEventListener("click",()=> {
        if(songIndex!=parseInt(element.id)) {
            document.getElementById(""+songIndex).lastChild.lastChild.src = "images/play.png";
            songIndex = parseInt(element.id);
            currentTime = 0;
            isPlaying = 0;
        }
       play();
    });
});

function play() {
    if(isPlaying==0) {
        audioElement.src = songs[songIndex].location;
        audioElement.currentTime = currentTime;
        audioElement.play();
        masterPlay.src = "images/pause.png";
        isPlaying = 1;
        document.getElementById(""+songIndex).lastChild.lastChild.src = "images/pause.png"
    } else {
        currentTime = audioElement.currentTime;
        audioElement.pause();
        isPlaying = 0;
        masterPlay.src = "images/play.png";
        document.getElementById(""+songIndex).lastChild.lastChild.src = "images/play.png"
    }
}
function previous() {
    currentTime = 0;
    masterPlay.src = "images/pause.png";
    document.getElementById(""+songIndex).lastChild.lastChild.src = "images/play.png"
    if(songIndex == 0) {
        songIndex = songs.length-1;
    } else {
        songIndex--;
    }
    isPlaying = 1;
    document.getElementById(""+songIndex).lastChild.lastChild.src = "images/pause.png"
    audioElement.src = songs[songIndex].location;
    audioElement.play();
}
function next() {
    currentTime = 0;
    masterPlay.src = "images/pause.png";
    document.getElementById(""+songIndex).lastChild.lastChild.src = "images/play.png"
    if(songIndex==songs.length-1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    isPlaying = 1;
    document.getElementById(""+songIndex).lastChild.lastChild.src = "images/pause.png"
    audioElement.src = songs[songIndex].location;
    audioElement.play();
}