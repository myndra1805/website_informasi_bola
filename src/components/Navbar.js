class Navbar extends HTMLElement{
    async connectedCallback(){
        this.render()
        this.activeNav()
        this.handleClick()
    }

    async loadComponentHome(){
        const listScorers = document.createElement("list-scorers")
        let dataScorers = await this.getCaches("https://api.football-data.org/v2/competitions/PL/scorers")
        let clubs = await this.getCaches("https://api.football-data.org/v2/competitions/PL/teams")
        if(navigator.onLine){
            dataScorers = await this.getData("https://api.football-data.org/v2/competitions/PL/scorers")
            clubs = await this.getData("https://api.football-data.org/v2/competitions/PL/teams")
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

    async loadComponentKlasemen(){
        const klasemen = document.createElement("klasemen-app")
        let dataKlasemen = await this.getCaches("https://api.football-data.org/v2/competitions/2021/standings")
        if(navigator.onLine){
            dataKlasemen = await this.getData("https://api.football-data.org/v2/competitions/2021/standings")
        }
        if(dataKlasemen === "error"){
            dataKlasemen = "error"
        }
        klasemen.dataKlasemen = dataKlasemen
        const preloader = document.querySelector(".klasemen .container-preloader")
        document.querySelector(".klasemen").replaceChild(klasemen, preloader)
    }

    async loadComponentPertandingan(){
        const pertandingan = document.createElement("list-matches")
        let dataLiga = await this.getCaches("https://api.football-data.org/v2/competitions/PL")
        let matchDay = (dataLiga != undefined) ? dataLiga.currentSeason.currentMatchday : ""
        let dataPertandingan = await this.getCaches("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + matchDay)
        if(navigator.onLine){
            dataLiga = await this.getData("https://api.football-data.org/v2/competitions/PL")
            if(dataLiga === "error"){
                dataPertandingan = "error"
            }else{
                matchDay = dataLiga.currentSeason.currentMatchday
                dataPertandingan = await this.getData("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + matchDay)
            }
        }
        pertandingan.dataMatches = dataPertandingan
        const preloader = document.querySelector(".pertandingan .container-preloader")
        document.querySelector(".pertandingan").replaceChild(pertandingan, preloader)
        const dropdown = document.querySelectorAll(".dropdown-trigger")
        M.Dropdown.init(dropdown)
    }

    async loadComponentFavorite(){
        let dataClubs = await this.getCaches("https://api.football-data.org/v2/competitions/PL/teams")
        let dataSchedules = await this.getCaches("https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED")
        let dataPlayers = await this.getCaches("https://api.football-data.org/v2/teams/57")
        if(navigator.onLine){
            dataClubs = await this.getData("https://api.football-data.org/v2/competitions/PL/teams")
            dataSchedules = await this.getData("https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED")
            dataPlayers = await this.getData("https://api.football-data.org/v2/teams/57")
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

    async loadComponentPage(page){
        if(page === "home"){
            this.loadComponentHome()
        }else if(page === "klasemen"){
            this.loadComponentKlasemen()
        }else if(page === "pertandingan"){
            this.loadComponentPertandingan()
        }else if(page === "favorite"){
            this.loadComponentFavorite()
        }
    }

    preloader(){
        return `
        <div style="display: flex; justify-content: center; align-items: center; margin: 50px 0;">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    handleClick(){
        [...this.querySelectorAll(".nav-link")].map(nav => {
            nav.addEventListener("click", async () => {
                document.querySelector("main").innerHTML = this.preloader()
                const sidenav = this.querySelector(".sidenav")
                let page = nav.getAttribute("href").substr(1)
                if(page === ""){
                    page = "home"
                }
                this.loadPage(page)
                M.Sidenav.getInstance(sidenav).close()
                window.scrollTo(0, 0)
                this.loadComponentPage(page)
            })
        })
    }

    activeNav(){
        const sidenav = this.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav);
    }

    render(){
        return this.innerHTML = /*html*/`
            <div class="navbar-fixed">
                <nav class="amber darken-4">
                    <div class="container">
                        <div class="nav-wrapper">
                            <a href="#!" class="brand-logo">INFO BOLA</a>
                            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                            <ul class="right hide-on-med-and-down">
                                <li><a class="nav-link" href="#">Home</a></li>
                                <li><a class="nav-link" href="#klasemen">Klasemen</a></li>
                                <li><a class="nav-link" href="#pertandingan">Pertandingan</a></li>
                                <li><a class="nav-link" href="#favorite">Favorite</a></li>
                            </ul>
                        </div>    
                    </div>
                </nav>
            </div>
            <!-- Side Nav -->
            <ul class="sidenav" id="mobile-demo">
                <li><a class="nav-link" href="#">Home</a></li>
                <li><a class="nav-link" href="#klasemen">Klasemen</a></li>
                <li><a class="nav-link" href="#pertandingan">Pertandingan</a></li>
                <li><a class="nav-link" href="#favorite">Favorite</a></li>
            </ul>
        `
    }
    
    loadPage(page){
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

    getCaches(url){
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
    
    getData(url){
        return fetch(url, {
            headers: {
                "X-Auth-Token": "456b28e3bd1d4bac8b0c4c4f12bce186"
            }
        })
            .then(response => response.json())
            .catch(err => "error")
    }
}
customElements.define("nav-bar", Navbar)