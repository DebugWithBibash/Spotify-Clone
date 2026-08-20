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
            allSongs.push(element.href.split("/songs/")[1]);
        }
    }

    return allSongs;
}
async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for(song of songs){
        songUl.innerHTML = songUl.innerHTML + `<li>${song.replaceAll("%20", " ").replaceAll("%2C", "")}</li>`;
    }

    //play the first song
    var audio = new Audio(songs[0]);
    audio.pay();
    audio.addEventListener("timeupdate", () =>{
        let duration = audio.duration;
        let currentTime = audio.currentTime;
        console.log(duration);
        console.log(currentTime)
    })

}

main();