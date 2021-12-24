import {createData, readData} from "../js/db.js"
class ModalClubsCreate extends HTMLElement{
    set clubs(clubs){
        this._clubs = clubs
        const contentModal = this.dataClubs(this._clubs.teams)
        this.render(contentModal)
        this.handleClick(this._clubs.teams)
    }

    handleClick(clubs){
        const btnTambah = [...this.querySelectorAll(".btn-clubs-create")]
        btnTambah.map( async(btn) => {
            const id = btn.dataset.id
            const dataClub = clubs.filter(club => club.id == id)
            let clubsDb = await readData("clubs")
            let cekClub = clubsDb.filter(clubDb => clubDb.id == id)
            if(cekClub[0] !== undefined){
                btn.classList.add("disabled")
            }
            btn.addEventListener("click", async() => {
                const btnSelectClubs = [...document.querySelectorAll(".btn-select-clubs")]
                const status = await createData("clubs", dataClub[0])
                btn.classList.add("disabled")
                if(status){
                    const toastHTML = `<span>Data Berhasil ditambahkan</span>`
                    M.toast({html: toastHTML})
                    document.querySelector(".content-favorite").innerHTML = `<clubs-favorite></clubs-favorite>`
                    btnSelectClubs.map(async(e) => {
                        clubsDb = await readData("clubs")
                        cekClub = clubsDb.filter(clubDb => clubDb.id == e.dataset.id)
                        if(cekClub[0] !== undefined){
                            e.classList.add("disabled")
                        }else{
                            e.classList.remove("disabled")
                        }
                    })
                }else{
                    const toastHTML = `<span>Data Gagal ditambahkan</span>`
                    M.toast({html: toastHTML})
                }
            })
        })
    }

    render(contentModal){
        this.innerHTML = /*html*/`
        <div id="modalClubsCreate" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h5>Clubs Premier League</h5>   
                ${contentModal}         
            </div>
            <div class="modal-footer">
                <button class="modal-close waves-effect waves-green btn-flat red white-text">Close</button>
            </div>
        </div>
        `
    }

    dataClubs(clubs){
        let template = ""
        clubs.map((club, i) => {
            template += `
                <tr>
                    <td><p style="font-weight: bold">${i + 1}</p></td>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <div style="margin-right: 10px;">
                                <a href="detail.html?id=${club.id}" class="left-align">
                                    <img src="${club.crestUrl}" alt="" width="40" height="40">
                                </a>
                            </div>
                            <div>
                                <a href="detail.html?id=${club.id}">
                                    <p class="left-align">${club.name}</p>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button data-id="${club.id}" class="btn blue btn-clubs-create">Tambah</button>
                    </td>
                </tr>
            `
        })
        return `
            <table class="striped table-clubs-favorite centered">
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

}
customElements.define("modal-clubs-create", ModalClubsCreate)