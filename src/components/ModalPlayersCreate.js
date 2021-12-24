import { createData, readData } from "../js/db"

class ModalPlayersCreate extends HTMLElement{
    set players(players){
        this._players = players
        const content = this.contentModal(this._players.players.squad, this._players.players.crestUrl)
        this.render(content)
        this.handleClick()
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

    render(contentModal){
        this.innerHTML = /*html*/ `
            <div id="modalPlayersCreate" class="modal modal-fixed-footer">
                <div class="modal-content">
                    ${this.dropdown(this._players.clubs.teams)}
                    <div class="container-players-create">
                        ${contentModal}         
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-close waves-effect waves-green btn-flat red white-text">Close</button>
                </div>
            </div>
        `
    }

    dropdown(data){
        let template = ""
        data.map((club, i) => {
            template += `<li><a href="" class="btn-club" data-id="${club.id}">${club.name}</a></li>`
        })
        return `
            <button class="btn dropdown-trigger btn-dropdown-clubs" data-target="dropdownClubs" style="width: 100%">
                <i class="material-icons right">arrow_drop_down</i>
                ${data[0].name}
            </button>
            <ul class="dropdown-content" id="dropdownClubs">
                ${template}
            </ul>
        `
    }

    contentModal(players, logoClub, classBtn = "btn-players-create"){
        let template = ""
        players.map((player, i) => {
            template += `
                <tr>
                    <td><p style="font-weight: bold">${i + 1}</p></td>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <div style="margin-right: 10px;">
                                <a href="detail.html?id=${player.id}" class="left-align">
                                    <img src="${logoClub}" alt="" width="40" height="40">
                                </a>
                            </div>
                            <div>
                                <a href="detail.html?id=${player.id}">
                                    <p class="left-align">${player.name}</p>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button data-id="${player.id}" data-logo="${logoClub}" class="btn blue ${classBtn}">Tambah</button>
                    </td>
                </tr>
            `
        })
        return `
            <table class="striped table-clubs-favorite centered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th style="text-align: left">Nama</th>
                    </tr>
                </thead>
                <tbody>
                    ${template}
                </tbody>
            </table>
        `
    }

    getData(url){
        return fetch(url, {
            headers: {
                "X-Auth-Token": "456b28e3bd1d4bac8b0c4c4f12bce186"
            }
        })
            .then(response => response.json())
    }

    async handleClick(){
        const btnTambah = [...this.querySelectorAll(".btn-players-create")]
        btnTambah.map(async(btn) => {
            const id = btn.dataset.id
            let playersDb = await readData("players")
            let cekPlayer = playersDb.filter(playerDb => playerDb.id == id)
            if(cekPlayer[0] !== undefined){
                btn.classList.add("disabled")
            }
            btn.addEventListener("click", async() => {
                const btnSelectPlayers = [...document.querySelectorAll(".btn-select-players")]
                const dataPlayer =  this._players.players.squad.filter(player => player.id == id)
                const club = {
                    id: this._players.players.id,
                    name: this._players.players.name,
                    logo: this._players.players.crestUrl
                }
                dataPlayer[0].club = club
                const status = createData("players", dataPlayer[0])
                if(status){
                    const toastHTML = `<span>Data Berhasil ditambahkan</span>`
                    M.toast({html: toastHTML})
                    btnTambah.map(async(e, i) => {
                        playersDb = await readData("players")
                        cekPlayer = playersDb.filter(playerDb => playerDb.id == e.dataset.id)
                        if(cekPlayer[0] !== undefined){
                            e.classList.add("disabled")
                            btnSelectPlayers[i].classList.add("disabled")
                        }else{
                            e.classList.remove("disabled")
                            btnSelectPlayers[i].classList.remove("disabled")
                        }
                    })
                    document.querySelector(".content-favorite").innerHTML = `<players-favorite></players-favorite>`
                }else{
                    const toastHTML = `<span>Data Gagal ditambahkan</span>`
                    M.toast({html: toastHTML})
                }
            })
        })

        const btnClubs = [...this.querySelectorAll(".btn-club")]
        btnClubs.map(btn => {
            btn.addEventListener("click", async(event) => {
                if(navigator.onLine){
                    event.preventDefault()
                    const id = btn.dataset.id
                    this.querySelector(".btn-dropdown-clubs").innerHTML = `<i class="material-icons right">arrow_drop_down</i> ${btn.innerHTML}`
                    this.querySelector(".container-players-create").innerHTML = this.preloader()
                    const players = await this.getData(`https://api.football-data.org/v2/teams/${id}`)
                    const contentCreate = this.contentModal(players.squad, players.crestUrl)
                    const contentUpdate = this.contentModal(players.squad, players.crestUrl, "btn-select-players")
                    let btnSelectUpdate = [...document.querySelectorAll(".btn-select-players")]
                    const idPlayer = btnSelectUpdate[0].getAttribute("data-idplayer")
                    this.querySelector(".container-players-create").innerHTML = contentCreate
                    document.querySelector(".container-players-update").innerHTML = contentUpdate
                    document.querySelector(".dropdown-clubs-update").innerHTML = `<i class="material-icons right">arrow_drop_down</i> ${btn.innerHTML}`
                    this.handleClick()
                    this._players.players = players
                    btnSelectUpdate = [...document.querySelectorAll(".btn-select-players")]
                    const btnTambahPlayers = [...this.querySelectorAll(".btn-players-create")]
                    btnSelectUpdate.map(async (btn, i) => {
                        btn.setAttribute("data-idplayer", idPlayer)
                        const playersDb = await readData("players")
                        const cekPlayer = playersDb.filter(playerDb => playerDb.id == btn.dataset.id)
                        if(cekPlayer[0] !== undefined){
                            btn.classList.add("disabled")
                            btnTambahPlayers[i].classList.add("disabled")
                        }else{
                            btn.classList.remove("disabled")
                            btnTambahPlayers[i].classList.remove("disabled")
                        }
                    })
                }else{
                    event.preventDefault()
                    this.querySelector("tbody").innerHTML = "<tr><td class='center-align'>Koneksi Terputus</td></tr>"

                }
            })
        })
    }
    preloader(){
        return `
        <div style="display: flex; justify-content: center; align-items: center; margin: 50px 0;">
            <div class="preloader-wrapper active">
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
}
customElements.define("modal-players-create", ModalPlayersCreate)