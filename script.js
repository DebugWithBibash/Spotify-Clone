console.log("Javscript starts now");

let pausePlayButton = document.querySelector(".pause-play");
let previousButton = document.querySelector(".previous");
let nextButton = document.querySelector(".next");
let currentIndex = 0;
console.log(`current index ${currentIndex}`)

async function getSongs() {
    let response = await fetch("http://127.0.0.1:5500/songs/");
    let songs = await response.text();
    // console.log(songs);
    let div = document.createElement("div");
    div.innerHTML = songs;
    
    // let lis = div.getElementsByTagName("li");
    // console.log(lis);
    let as = div.getElementsByTagName("a");
    // console.log(as);
    
    let allSongs = [];
    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            allSongs.push(element.href);
        }
    }
    
    return allSongs;
}

async function main() {
    let songs = await getSongs(); //this is the url of the song
    console.log(`These are the songs url ${songs}`);
    
    let songDisplay = displaySong(songs);
    let plays = playSong(songs, songDisplay);
    pausePlay(plays);
    let next_previous_song = nextPrevious(songs, plays, songDisplay);

    songDuration(plays,songs);

    
}

function displaySong(songs) {
    
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    
    for (song of songs) {
        let part = song.split("/"); //seperating the names using split("/")
        console.log(part);
        let songName = decodeURIComponent(part[part.length - 1]); //takes URL-encoded text and turns it back into normal text.
        console.log(`these are the songs name ${songName}`)
        songUl.innerHTML = songUl.innerHTML + `<li>${songName}</li>`;
    }
    
    return songUl;
    
}

function playSong(songs, songUl) {
    let liss = songUl.getElementsByTagName("li");
    let audio = new Audio();
    
    for (let i = 0; i < liss.length; i++) {
        liss[i].addEventListener("click", (e) => {
            currentIndex = i;
            let currentSong = e.target;
            console.log(currentSong);
            // audio.currentTime = 0;
            audio.pause();
            audio.src = songs[i];
            audio.play();
            pausePlayButton.src = "svg/pause.svg";
            
            //Displa name of the song in the audio player
            song_name_duration(currentSong.innerText);
            
            
        })
    }
    return audio;
}

function pausePlay(audio) {
    pausePlayButton.addEventListener("click", () => {
        console.log("before" + audio.src)
        if (audio.paused) {
            audio.play();
            pausePlayButton.src = "svg/pause.svg"
            console.log("after -" + pausePlay.src);
            // pausePlay.style.backgroundColor = "red";
            console.log("play clicked")
        } else {
            audio.pause();
            pausePlayButton.src = "svg/play.svg"
            console.log("after" + pausePlay.src);
            // pausePlay.style.backgroundColor = "blue";
            console.log("pause clicked")
            
        }
    })
    
}

function nextPrevious(songs, playSong, displaySong) {
    console.log(songs.length);
    let liss = displaySong.getElementsByTagName("li");
    let currentSong = liss[0];
    
    nextButton.addEventListener("click", (e) => {
        if (currentIndex < songs.length - 1) {
            currentIndex = currentIndex + 1;
            
            currentSong = liss[currentIndex];
            
            playSong.pause();
            
            playSong.src = songs[currentIndex];
            
            song_name_duration(currentSong.innerText);
            
            playSong.play();

            pausePlayButton.src = "svg/pause.svg";
            
            console.log("This is the current song:", currentSong);
            console.log("Current index:", currentIndex);
        }
    })
    
    previousButton.addEventListener("click", (e) => {
        if (currentIndex != 0) {
            currentIndex = currentIndex - 1;
            playSong.pause();
            currentSong = liss[currentIndex];
            console.log(currentSong);
            playSong.src = songs[currentIndex];
            song_name_duration(currentSong.innerText);
            playSong.play();
            pausePlayButton.src = "svg/pause.svg";
        }
    }) 
    
    return currentSong;
}

function song_name_duration(songName) {
    let songInfo = document.querySelector(".songInfo")
    console.log("Name and timem function is running ")
    songInfo.innerHTML = songName;
}

function songDuration(playAudio, currrentSong){
    let songTime = document.querySelector(".songTime");
    songTime.innerHTML = "00:00";
    let minutes = 0;
    let seconds = 0;
    let song_duration = 0;

    playAudio.addEventListener("loadedmetadata", (e) => {
        console.log(playAudio.duration);
        song_duration = (playAudio.duration);
        seconds = Math.floor(song_duration % 60);
        minutes = Math.floor(song_duration / 60);

        console.log(`Minutes = ${minutes} and seconds = ${seconds}`);
        songTime.innerHTML = `${minutes}:${seconds}`;
    })


}

main();