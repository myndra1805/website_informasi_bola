class Klasemen extends HTMLElement{
    set dataKlasemen(dataKlasemen){
        this._dataKlasemen = dataKlasemen
        if(this._dataKlasemen === "error"){
            this.showError()
            this.handleClick()
        }else{
            const data = this.dataTable(this._dataKlasemen.standings[0].table)
            this.render(data, this._dataKlasemen)
        }
    }
    
    showError(){
        this.innerHTML = `
            <style>
                .reload-klasemen:hover{
                    cursor: pointer;
                    transform: scale(1.1);
                }
            </style>
            <div class="center-align" style="margin: 50px 0">
                <h4>Gagal menampilkan data</h4>
                <p>Silakan refresh halaman ini kembali</p>
                <i class="material-icons medium reload-klasemen">refresh</i>
            </div>
        `
    }

    handleClick(){
        this.addEventListener("click", event => {
            if(event.target.className === "material-icons medium reload-klasemen"){
                window.location.reload()
            }
        })
    }

    render(dataTable, data){
        this.innerHTML = /*html*/`
            <style>
                .table{
                    margin-top: 20px;
                    width: 100%
                }
                .table thead tr th{
                    text-align: center;
                }
                .table tbody tr td{
                    text-align: center;
                }
                .table .club .box-club:nth-child(2){
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 10px;
                }
                .club{
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                }
                .club .logo-club{
                    margin: 0 15px;
                }
                .club .name-club{
                    color: black
                }
                .club .name-club:hover{
                    color: blue;
                }
                @media screen and (max-width: 992px){
                    .club{
                        padding: 0;
                    }
                    .table thead tr th:nth-child(1){
                        height: 65px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            </style>
            <div class="card card-table">
                <div class="card-content">
                    <span class="title center-align">
                        <h5>${data.competition.name.toUpperCase()}</h5> 
                        <p>MUSIM ${data.season.startDate.split("-")[0]} - ${data.season.endDate.split("-")[0]}</p>
                    </span>
                    <table class="striped responsive-table table">
                        <thead>
                            <tr>
                                <th style="text-align: left">Club</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataTable}
                        </tbody>
                    </table>               
                </div>
            </div>
        `
    }

    dataTable(standings){
        let template = ""
        standings.map(club => {
            template += `
                <tr>
                    <td>
                        <div class="club">
                            <p class="position-club">${club.position}</p>
                            <div class="logo-club">
                                <a href="detail.html?id=${club.team.id}"><img src="${club.team.crestUrl}" alt="" height="30" width="30" class="responsive-img"></a>
                            </div>
                            <a href="detail.html?id=${club.team.id}" class="name-club">${club.team.name}</a>
                        </div>
                    </td>
                    <td>${club.playedGames}</td>
                    <td>${club.won}</td>
                    <td>${club.draw}</td>
                    <td>${club.lost}</td>
                    <td>${club.goalsFor}</td>
                    <td>${club.goalsAgainst}</td>
                    <td>${club.goalDifference}</td>
                    <td>${club.points}</td>
                </tr>
            `
        })
        return template
    }
}
customElements.define("klasemen-app", Klasemen)