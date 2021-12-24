import {createData, readData} from "../js/db.js"
class ModalSchedulesCreate extends HTMLElement{
    set schedules(schedules){
        this._schedules = schedules
        console.log()
        const dataSchedules = this.dataSchedules(this._schedules.schedules.matches, this._schedules.clubs.teams)
        const content = this.contentModal(dataSchedules)
        this.render(content)
        this.handleClick(dataSchedules)
    }

    dataSchedules(schedules, clubs){
        const dataSchedules = []
        schedules.map((schedule) => {
            const clubAway = clubs.filter(club => club.id === schedule.awayTeam.id)
            const clubHome = clubs.filter(club => club.id === schedule.homeTeam.id)
            let dataSchedule = {
                awayTeam: clubAway[0],
                homeTeam: clubHome[0],
                utcDate: schedule.utcDate,
                id: schedule.id,
                lastUpdated: schedule.lastUpdated,
                matchday: schedule.matchday,
                season: schedule.season
            }
            dataSchedules.push(dataSchedule)
        })
        return dataSchedules
    }
    
    render(contentModal){
        this.innerHTML = /*html*/ `
        <div id="modalSchedulesCreate" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h5 class="center-align">Scehdules Premier League</h5>   
                ${contentModal}         
            </div>
            <div class="modal-footer">
                <button class="modal-close waves-effect waves-green btn-flat red white-text">Close</button>
            </div>
        </div>
        `
    }

    contentModal(schedules){
        let template = ""
        schedules.map(schedule => {
            template += `
                <div class="card">
                    <div class="card-content">
                        <div class="center-align">
                            <p>${schedule.utcDate.split("T")[0]}</p>
                        </div>
                        <div style="display: flex; align-items: center">
                            <div class="center-align" style="flex-basis: 40%;">
                                <img src="${schedule.homeTeam.crestUrl}" alt="${schedule.homeTeam.name}" width="50" height="50">
                                <p>${schedule.homeTeam.name}</p>
                            </div>
                            <p style="flex-basis: 20%; text-align: center">VS</p>
                            <div class="center-align" style="flex-basis: 40%;">
                                <img src="${schedule.awayTeam.crestUrl}" alt="${schedule.awayTeam.name}" width="50" height="50">
                                <p>${schedule.awayTeam.name}</p>
                            </div>
                        </div>
                        <div class="center-align">
                            <button class="btn btn-schedules-create blue" data-id="${schedule.id}">Tambah</button>
                        </div>
                    </div>
                </div>
            `
        })
        if(this._schedules.schedules.matches[0] === undefined){
            template = `<p class="center-align">Tidak ada data schedules yang ditampilkan</p>`
        }
        return template
    }

    handleClick(data){
        const btnTambah = [...this.querySelectorAll(".btn-schedules-create")]
        btnTambah.map(async (btn) => {
            let schedulesDb = await readData("schedules")
            const id = btn.dataset.id
            let cekSchedule = schedulesDb.filter(schedule => schedule.id == id)
            if(cekSchedule[0] !== undefined){
                btn.classList.add("disabled")
            }
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id
                const schedule = data.filter(e => e.id == id)
                const status = await createData("schedules", schedule[0])
                if(status){
                    const toastHTML = `<span>Data Berhasil ditambahkan</span>`
                    M.toast({html: toastHTML})
                    const btnSelect = [...document.querySelectorAll(".btn-schedules-select")]
                    btnTambah.map(async(e, i) => {
                        schedulesDb = await readData("schedules")
                        cekSchedule = schedulesDb.filter(scheduleDb => scheduleDb.id == e.dataset.id)
                        if(cekSchedule[0] !== undefined){
                            e.classList.add("disabled")
                            btnSelect[i].classList.add("disabled")
                        }else{
                            e.classList.remove("disabled")
                            btnSelect[i].classList.remove("disabled")
                        }
                    })
                    document.querySelector(".content-favorite").innerHTML = "<schedules-mathces></schedules-matches>"
                }else{
                    const toastHTML = `<span>Data Gagal ditambahkan</span>`
                    M.toast({html: toastHTML})
                }
            })
        })
    }
}
customElements.define("modal-schedules-create", ModalSchedulesCreate)