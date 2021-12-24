import {readData, deleteData} from "./../js/db.js"
class ClubsFavorite extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = this.preloader()
        this.clubsDb = await readData("clubs")
        this.innerHTML = this.render()
        this.responsiveTable()
        this.handleClick()
    }

    responsiveTable(){
        if(this.clubsDb[0] !== undefined){
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

    render(){
        return /*html*/ `
            <style>
                .club-favorite{
                    display: flex;
                    align-items: center;
                }
                .club-favorite .logo{
                    margin-right: 10px;
                    line-height: 0;
                }
                @media screen and (max-width: 600px){
                    .table-clubs thead tr th:nth-child(2){
                        justify-content: center;
                        display: flex;
                        align-items: center;
                        height: 70px;
                    }
                    .table-clubs tbody tr td:nth-child(2) .club-favorite{
                        display: flex;
                        justify-content: center;
                    }
                }
            </style>
            <div class="card">
                <div class="card-content">
                    ${this.dataClubsFavofite(this.clubsDb)}
                </div>
            </div>
            <div style="text-align: center">
                <button data-target="modalClubsCreate" class="btn modal-trigger">Tambah Data Clubs Favorite</button>
            </div>
        `
    }

    handleClick(clubs){
        const btnDelete = [...this.querySelectorAll(".btn-delete")]
        const cardContent = this.querySelector(".card .card-content")
        btnDelete.map(btn => {
            const id = btn.dataset.idclub
            btn.addEventListener("click", async() => {
                const btnSelectClubs = [...document.querySelectorAll(".btn-select-clubs")]
                const btnClubsCreate = [...document.querySelectorAll(".btn-clubs-create")]
                if(confirm("Anda ingin menghapus data ?")){
                    const status = await deleteData("clubs", parseInt(id))
                    if(status){
                        const toastHTML = `<span>Data Berhasil dihapus</span>`
                        M.toast({html: toastHTML})
                        const clubsDb = await readData("clubs")
                        cardContent.innerHTML = this.dataClubsFavofite(clubsDb)
                        btnSelectClubs.map(async(e, i) => {
                            const clubsDb = await readData("clubs")
                            const cekClub = clubsDb.filter(clubDb => clubDb.id == e.dataset.id)
                            if(cekClub[0] !== undefined){
                                e.classList.add("disabled")
                                btnClubsCreate[i].classList.add("disabled")
                            }else{
                                e.classList.remove("disabled")
                                btnClubsCreate[i].classList.remove("disabled")
                            }
                        })
                        this.handleClick(clubs)
                    }else{
                        const toastHTML = `<span>Data Gagal dihapus</span>`
                        M.toast({html: toastHTML})
                    }
                }
            })
        })
        
        const btnEdit = [...this.querySelectorAll(".btn-edit")]
        btnEdit.map(btn => {
            btn.addEventListener("click", () => {
                const btnSelectClubs = [...document.querySelectorAll(".btn-select-clubs")]
                const idClub = btn.dataset.idclub
                btnSelectClubs.map(btnSelectClub => {
                    btnSelectClub.setAttribute("data-idclub", idClub)
                })
            })
        })
    }
    
    dataClubsFavofite(clubs){
        let template = ""
        clubs.map((club, i) => {
            template += `
                <tr>
                    <td style="font-weight: bold;">${i + 1}</td>
                    <td>
                        <div class="club-favorite">
                            <div class="logo">
                                <a href="detail.html?id=${club.id}">
                                    <img src="${club.crestUrl}" alt="${club.name}" width="40" height="40">
                                </a>
                            </div>
                            <div>
                                <a href="detail.html?id=${club.id}">
                                    ${club.name}
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button class="btn green modal-trigger btn-edit" data-target="modalClubsUpdate" data-idclub="${club.idClub}">UPDATE</button>
                        <button class="btn red btn-delete" data-idclub="${club.idClub}">DELETE</button>
                    </td>
                </tr>
            `
        })
        let content = ""
        if(clubs[0] === undefined){
            content = `<h5 class="center-align">Tidak ada data clubs favorite</h5>`
        }else{
            content =  `
            <table class="striped centered table-clubs">
                <thead>
                    <tr>
                        <th>No</th>
                        <th style="text-align: left">Club</th>
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
customElements.define("clubs-favorite", ClubsFavorite)