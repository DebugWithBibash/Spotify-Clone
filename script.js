console.log("Javscript starts now");

async function getSongs() {
    let response = await fetch("http://127.0.0.1:5500/songs/");
    let songs = await response.text();
    console.log(songs);
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
    let songs = await getSongs();
    console.log(songs);

    let songDisplay = displaySong(songs);
    let play = playSong(songs,songDisplay);
    pausePlay(play);
    
    
    // audio.pay();
    
    
    // audio.addEventListener("timeupdate", () =>{
    //     let duration = audio.duration;
    //     let currentTime = audio.currentTime;
    //     console.log(duration);
    //     console.log(currentTime)
    // })
    
}

function displaySong(songs){

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    
    for(song of songs){
        let part = song.split("/");   //seperating the names using split("/")
        console.log(part);
        let songName = decodeURIComponent(part[part.length - 1]);    //takes URL-encoded text and turns it back into normal text.
        console.log(songName)
        songUl.innerHTML = songUl.innerHTML + `<li>${songName}</li>`;
    }
    let lis = songUl.getElementsByTagName("li");
    
    return lis;
}

function playSong(songs, liss){
    let audio = new Audio();
    
    for (let i = 0; i < liss.length; i++){
        liss[i].addEventListener("click", (e) => {
            let currentSong = e.target;
            console.log(currentSong);
            // audio.currentTime = 0;
            audio.pause();
            audio.src = songs[i]
            audio.play();
        })
    }

    return audio;
}

function pausePlay(audio){
    let pause = document.querySelector(".pause-play");
    pause.addEventListener("click", () => {
        console.log("Clicked");
        console.log(audio.src)
        if(audio.src){
            console.log(audio.src)

            if(audio.paused){
                audio.play();
            }
    
            else{
                audio.pause();
    
            }
        }
    })
}

main();

