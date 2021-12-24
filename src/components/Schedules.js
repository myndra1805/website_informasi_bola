import {readData, deleteData} from "../js/db.js"
class SchedulesMatches extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = this.preloader()
        const schedules = await readData("schedules")
        const content = this.listScedules(schedules)
        this.innerHTML =  this.render(content)
        this.handleClick()
    }
    render(content){
        return /*html*/ `
            <div class="list-schedules">
                ${content}
            </div>
            <div style="text-align: center">
                <button class="btn modal-trigger" data-target="modalSchedulesCreate">Tambah Jadwal Pertandingan</button>
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
    listScedules(schedules){
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
                    </div>
                    <div class="card-action" style="display: flex; justify-content: space-evenly">
                        <button class="btn green modal-trigger btn-update" data-target="modalSchedulesUpdate" data-id="${schedule.idSchedule}">UPDATE</button>
                        <button class="btn red btn-delete" data-id="${schedule.idSchedule}">DELETE</button>
                    </div>
                </div>       
            `
        })
        if(schedules[0] === undefined){
            template = `
                <div class="card">
                    <div class="card-content">
                        <h5 class="center-align">Tidak ada data schedules favorite</h5>
                    </div>
                </div>`
        }
        return template
    }
    handleClick(){
        const btnDelete = [...this.querySelectorAll(".btn-delete")]
        btnDelete.map(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id
                if(confirm("Anda ingin menghapus data ?")){
                    const status = await deleteData("schedules", parseInt(id))
                    if(status){
                        const toastHTML = `<span>Data Berhasil dihapus</span>`
                        M.toast({html: toastHTML})
                        this.connectedCallback()
                        const btnSchedulesCreate = [...document.querySelectorAll(".btn-schedules-create")]
                        const btnSelect = [...document.querySelectorAll(".btn-schedules-select")]
                        btnSchedulesCreate.map(async(e, i) => {
                            const schedulesDb = await readData("schedules")
                            const cekSchedules = schedulesDb.filter(scheduleDb => scheduleDb.id == e.dataset.id)
                            if(cekSchedules[0] !== undefined){
                                e.classList.add("disabled")
                                btnSelect[i].classList.add("disabled")
                            }else{
                                e.classList.remove("disabled")
                                btnSelect[i].classList.remove("disabled")
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
                const btnSelectSchedules = [...document.querySelectorAll(".btn-schedules-select")]
                btnSelectSchedules.map(btnSelectScehdule => {
                    btnSelectScehdule.setAttribute("data-idschedule", btn.dataset.id)
                })
            })
        })
    }
}
customElements.define("schedules-mathces", SchedulesMatches)