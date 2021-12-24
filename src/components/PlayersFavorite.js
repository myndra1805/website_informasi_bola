import {readData, deleteData} from "./../js/db.js"
class PlayersFavorite extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = this.preloader()
        this.players = await readData("players")
        const content = this.contentPlayers()
        this.innerHTML = this.render(content)
        this.handleClick()
        this.responsiveTable()
    }

    responsiveTable(){
        if(this.players[0] !== undefined){
            if(window.innerWidth <= 600){
                this.querySelector("table").classList.add("responsive-table")
            }
            window.addEventListener("resize", () => {
                if(window.innerWidth <= 600){
                    this.querySelector("table").classList.add("responsive-table")
                }else{
                    this.querySelector("table").classList.remove("responsive-table")
                }
            })
        }
    }

    render(content){
        return /*html*/ `
            <style>
                @media screen and (max-width: 600px){
                    .players-favorite thead tr th:nth-child(2){
                        height: 80px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    } 
                    .players-favorite tbody tr td:nth-child(2) .clubs-favorite{
                        display: flex;
                        justify-content: center;
                    }
                }
            </style>
            <div class="card">
                <div class="card-content">
                    ${content}
                </div>
            </div>
            <div style="text-align: center">
                <button data-target="modalPlayersCreate" class="btn modal-trigger">Tambah Data Players Favorite</button>
            </div>
        `
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
        const btnDelete = [...this.querySelectorAll(".btn-delete")]
        btnDelete.map(btn => {
            btn.addEventListener("click", async() => {
                const id = btn.dataset.id
                if(confirm("Anda ingin menghapus data ?")){
                    const status = await deleteData("players", parseInt(id))
                    if(status){
                        const toastHTML = `<span>Data Berhasil dihapus</span>`
                        M.toast({html: toastHTML})
                        this.connectedCallback()
                        const btnCreatePlayers = [...this.querySelectorAll(".btn-players-create")]
                        const btnSelectPlayers = [...document.querySelectorAll(".btn-select-players")]
                        btnCreatePlayers.map(async(e, i) => {
                            const playersDb = await readData("players")
                            const cekPlayer = playersDb.filter(playerDb => playerDb.id == e.dataset.id)
                            if(cekPlayer[0] !== undefined){
                                e.classList.add("disabled")
                                btnSelectPlayers[i].classList.add("disabled")
                            }else{
                                e.classList.remove("disabled")
                                btnSelectPlayers[i].classList.remove("disabled")
                            }
                        })
                    }else{
                        const toastHTML = `<span>Data Gagal dihapus</span>`
                        M.toast({html: toastHTML})
                    }
                }
            })
        })

        const btnUpdate = [...this.querySelectorAll(".btn-update")]
        btnUpdate.map(btn => {
            btn.addEventListener("click", () => {
                const idPlayer = btn.dataset.id
                const btnSelectPlayers = [...document.querySelectorAll(".btn-select-players")]
                btnSelectPlayers.map(btn => {
                    btn.setAttribute("data-idplayer", idPlayer)
                })
            })
        })
    }

    contentPlayers(){
        let template = ""
        let content = ""
        this.players.map((player, i) => {
            template += `
                <tr>
                    <td><p style="font-weight: bold">${i + 1}</p></td>
                    <td>
                        <div class="clubs-favorite">
                            <div class="box-favorite img">
                                <img src="${player.club.logo}" alt="" width="40" height="40">
                            </div>
                            <div class="box-favorite name">
                                <p class="left-align">${player.name}</p>
                            </div>
                        </div>
                    </td>
                    <td>${player.nationality}</td>
                    <td>${player.position}</td>
                    <td>
                        <button class="btn modal-trigger btn-update green" data-target="modalPlayersUpdate" data-id="${player.idPlayer}">UPDATE</button>
                        <button data-id="${player.idPlayer}" class="btn red btn-delete">DELETE</button>
                    </td>
                </tr>
            `
        })
        if(this.players[0] === undefined){
            content = `<h5 class="center-align">Tidak ada data players favorite</h5>`
        }else{
            content = `
            <table class="striped centered players-favorite">
                <thead>
                    <tr>
                        <th>No</th>
                        <th style="text-align: left">Pemain</th>
                        <th>Negara</th>
                        <th>Posisi</th>
                    </tr>
                </thead>
                <tbody>
                    ${template}
                </tbody>
            </table> 
            `
        }
        return content
    }
}
customElements.define("players-favorite", PlayersFavorite)