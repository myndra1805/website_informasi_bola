import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/js/all.min.js"
import "materialize-css/dist/css/materialize.min.css"
import "materialize-css/dist/js/materialize.min.js"
import "regenerator-runtime"
import "./js/components.js"

document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === "/" || window.location.pathname === "/index.html"){
        const page = getUrl()
        loadPage(page)
        loadComponent(page)
    }else if(window.location.pathname === "/detail.html"){
        const detailCLub = document.createElement("detail-club")
        const idClub = window.location.search.substr(1).split("=")[1]
        let dataCLub = await getCaches(`https://api.football-data.org/v2/teams/${idClub}`)
        let matches = await getCaches(`https://api.football-data.org/v2/teams/${idClub}/matches`)
        if(navigator.onLine){
            matches = await getData(`https://api.football-data.org/v2/teams/${idClub}/matches`)
            dataCLub = await getData(`https://api.football-data.org/v2/teams/${idClub}`)
        }
        if(dataCLub === "error" || matches === "error"){
            document.querySelector("main .container").innerHTML = `
            <style>
                .reload-detail:hover{
                    cursor: pointer;
                    transform: scale(1.1);
                }
            </style>
            <div class='center-align' style='margin: 20px 0'>
                <h4>Gagal Menampilkan Halaman</h4>
                <p>Silakan Refresh Halaman Ini Kembali</p>
                <i class="material-icons medium reload-detail" onclick="window.location.reload()">refresh</i>
            </div
            `
        }else if(matches === undefined || dataCLub === undefined){
            document.querySelector("main .container").innerHTML = `
            <style>
                .reload-detail:hover{
                    cursor: pointer;
                    transform: scale(1.1);
                }
            </style>
            <div class='center-align' style='margin: 20px 0'>
                <h4>Koneksi Terputus</h4>
                <p>Silakan Hubungkan ke Internet dan Refresh Halaman Ini Kembali</p>
                <i class="material-icons medium reload-detail" onclick="window.location.reload()">refresh</i>
            </div
            `
        }else{
            const preloader = document.querySelector(".container-preloader")
            dataCLub.matches = matches.matches
            detailCLub.dataClub = dataCLub
            document.querySelector("main .container").replaceChild(detailCLub, preloader)
        }
    }
    if (!('serviceWorker' in navigator)) {
        console.log("Service worker tidak didukung browser ini.");
    }else{
        registerServiceWorker();
        requestPermission();
    }

});

function getCaches(url){
    if("caches" in window){
        return caches.match(url).then(response => {
            if(response){
                return response.json().then(data => {
                    return data
                })
            }
        })
    }
}

const getData = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": "456b28e3bd1d4bac8b0c4c4f12bce186"
        }
    })
        .then(response => response.json())
        .catch(err => "error")
}

async function loadComponent(page){
    if(page === "home"){
        loadComponentHome()     
    }else if(page === "klasemen"){
        loadComponentKlasemen()
    }else if(page === "pertandingan"){
        loadComponentPertandingan()
    }else if(page === "favorite"){
        loadComponentFavorite()
    }
}

async function loadComponentHome(){
    const listScorers = document.createElement("list-scorers")
    let dataScorers = await getCaches("https://api.football-data.org/v2/competitions/PL/scorers")
    let clubs = await getCaches("https://api.football-data.org/v2/competitions/PL/teams")
    if(navigator.onLine){
        dataScorers = await getData("https://api.football-data.org/v2/competitions/PL/scorers")
        clubs = await getData("https://api.football-data.org/v2/competitions/PL/teams")
    }
    const containerListScorers = document.querySelector(".home .list-scorers")
    const data = []
    if(dataScorers === "error" || clubs === "error"){
        data.push({
            "error": true
        })
    }else{
        dataScorers.scorers.map(topScorer => {
            const tempt = clubs.teams.filter(club => club.name === topScorer.team.name)
            data.push({
                club: tempt[0],
                dataPlayer: topScorer,
                competition:  clubs.competition,
                season: clubs.season
            })
        })
    }
    const preloader = document.querySelector(".container-preloader")
    listScorers.dataScorers = data
    containerListScorers.replaceChild(listScorers, preloader)   
}

async function loadComponentKlasemen(){
    const klasemen = document.createElement("klasemen-app")
    let dataKlasemen = await getCaches("https://api.football-data.org/v2/competitions/2021/standings")
    if(navigator.onLine){
        dataKlasemen = await getData("https://api.football-data.org/v2/competitions/2021/standings")
    }
    if(dataKlasemen === "error"){
        dataKlasemen = "error"
    }
    klasemen.dataKlasemen = dataKlasemen
    const preloader = document.querySelector(".klasemen .container-preloader")
    document.querySelector(".klasemen").replaceChild(klasemen, preloader)
}

async function loadComponentPertandingan(){
    const pertandingan = document.createElement("list-matches")
    let dataLiga = await getCaches("https://api.football-data.org/v2/competitions/PL")
    let matchDay = (dataLiga != undefined) ? dataLiga.currentSeason.currentMatchday : ""
    let dataPertandingan = await getCaches("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + matchDay)
    if(navigator.onLine){
        dataLiga = await getData("https://api.football-data.org/v2/competitions/PL")
        if(dataLiga === "error"){
            dataPertandingan = "error"
        }else{
            matchDay = dataLiga.currentSeason.currentMatchday
            dataPertandingan = await getData("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + matchDay)
        }
    }
    pertandingan.dataMatches = dataPertandingan
    const preloader = document.querySelector(".pertandingan .container-preloader")
    document.querySelector(".pertandingan").replaceChild(pertandingan, preloader)
    const dropdown = document.querySelectorAll(".dropdown-trigger")
    M.Dropdown.init(dropdown)
}

async function loadComponentFavorite(){
    let dataClubs = await getCaches("https://api.football-data.org/v2/competitions/PL/teams")
    let dataSchedules = await getCaches("https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED")
    let dataPlayers = await getCaches("https://api.football-data.org/v2/teams/57")
    if(navigator.onLine){
        dataClubs = await getData("https://api.football-data.org/v2/competitions/PL/teams")
        dataSchedules = await getData("https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED")
        dataPlayers = await getData("https://api.football-data.org/v2/teams/57")
    }
    const containerCreate = document.querySelector(".favorite .container-modal-create")
    const containerUpdate = document.querySelector(".favorite .container-modal-update")

    // Modal Clubs Favorite
    const modalClubCreate = document.createElement("modal-clubs-create")
    const modalClubUpdate = document.createElement("modal-clubs-update")
    modalClubCreate.clubs = dataClubs
    modalClubUpdate.clubs = dataClubs
    containerCreate.appendChild(modalClubCreate)
    containerUpdate.appendChild(modalClubUpdate)

    // Modal Player Favorite
    const modalPlayersCreate = document.createElement("modal-players-create")
    const modalPlayersUpdate = document.createElement("modal-players-update")
    const players = {
        players: dataPlayers,
        clubs: dataClubs
    }
    modalPlayersCreate.players = players
    modalPlayersUpdate.players = players
    containerCreate.appendChild(modalPlayersCreate)
    containerUpdate.appendChild(modalPlayersUpdate)
    
    // Modal Schedules Favorite
    const modalSchedulesCreate = document.createElement("modal-schedules-create")
    const modalSchedulesUpdate = document.createElement("modal-schedules-update")
    const schedules = {
        schedules: dataSchedules,
        clubs: dataClubs
    }
    modalSchedulesCreate.schedules = schedules
    modalSchedulesUpdate.schedules = schedules
    containerCreate.appendChild(modalSchedulesCreate)
    containerUpdate.appendChild(modalSchedulesUpdate)

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal)
    const dropdown = document.querySelectorAll(".dropdown-trigger")
    M.Dropdown.init(dropdown)
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function getUrl(){
    let page = window.location.hash.substr(1)
    if(page === ""){
        page = "home"
    }
    return page
}

function registerServiceWorker() {
    navigator.serviceWorker.register('../service-worker.js')
        .then(registration => {
            console.log('Registrasi service worker berhasil.', registration);
        })
        .catch(err => {
            console.error('Registrasi service worker gagal.', err);
        });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BDtsubp4Y2GLpm-INfHP5Ij35QzAtQOeOCc_GhlfnrGzBbj4Z7MHl_JzKkjQR24ELIbW8cUsZsglcfzgH0K2zjU")
                        }).then(function(subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function(e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            })
        });
    }
}

function loadPage(page){
    fetch("pages/" + page + ".html", {
        headers: {
            "Content-Type": "text/plain"
        }
    }).then(response => response.text()).then(responseText => {
        document.querySelector("main").innerHTML = responseText
    }).catch(() => {
        document.querySelector("body").innerHTML = `<h1 class="center-align">PAGE NOT FOUNT<br>404</h1>`
    })
}