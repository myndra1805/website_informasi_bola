import {readData, updateData} from "../js/db.js"
class ModalClubsUpdate extends HTMLElement{
    set clubs(clubs){
        this._clubs = clubs
        const content = this.contentModal(this._clubs.teams)
        this.render(content)
        const modal = this.querySelectorAll(".modal")
        M.Modal.init(modal)
        this.handleClick(this._clubs.teams)
    }
    render(contentModal){
        this.innerHTML = /*html*/`
        <div id="modalClubsUpdate" class="modal modal-fixed-footer">
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
    contentModal(clubs){
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
                    <button class="btn blue btn-select-clubs" data-id="${club.id}">SELECT</button>
                </td>
            </tr>`
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
    handleClick(clubs){
        const btnTambah = [...this.querySelectorAll(".btn-select-clubs")]
        btnTambah.map(async (btn) => {
            const id = btn.dataset.id
            let clubsDb = await readData("clubs")
            let cekClub = clubsDb.filter(clubDb => clubDb.id == id)
            if(cekClub[0] !== undefined){
                btn.classList.add("disabled")
            }
            const dataNewClub = clubs.filter(club => club.id == id)
            btn.addEventListener("click", async() => {
                const idclub = btn.dataset.idclub
                dataNewClub[0].idClub = parseInt(idclub)
                const btnClubsCreate = [...document.querySelectorAll(".btn-clubs-create")]
                const status = await updateData("clubs", dataNewClub[0])
                if(status){
                    const toastHTML = `<span>Data Berhasil Diubah</span>`
                    M.toast({html: toastHTML})
                    document.querySelector(".content-favorite").innerHTML = `<clubs-favorite></clubs-favorite>`
                    btn.classList.add("disabled")
                    const modal = this.querySelector(".modal")
                    M.Modal.getInstance(modal).close()
                    btnTambah.map(async(e, i) => {
                        clubsDb = await readData("clubs")
                        cekClub = clubsDb.filter(clubDb => clubDb.id == e.dataset.id)
                        if(cekClub[0] !== undefined){
                            e.classList.add("disabled")
                            btnClubsCreate[i].classList.add("disabled")
                        }else{
                            e.classList.remove("disabled")
                            btnClubsCreate[i].classList.remove("disabled")
                        }
                    })
                }else{
                    const toastHTML = `<span>Data Gagal diubah</span>`
                    M.toast({html: toastHTML})
                }
            })
        })
    }
}
customElements.define("modal-clubs-update", ModalClubsUpdate)