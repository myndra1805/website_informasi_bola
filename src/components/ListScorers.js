class ListScorers extends HTMLElement{
    set dataScorers(dataScorers){
        this._dataScorers = dataScorers
        this.innerHTML = this.preloader()
        if(this._dataScorers[0].error){
            this.showError()
            this.handleClick()
        }else{
            const name = this._dataScorers[0].competition.name.toUpperCase()
            const musim = this._dataScorers[0].season.startDate.split("-")[0] + " - " + this._dataScorers[0].season.endDate.split("-")[0]
            const judul = `TOP SCORE ${name}<br>${musim}`
            const listData = this.dataList(this._dataScorers)
            this.render(listData, judul)
            this.responsiveTable()
        }
    }

    showError(){
        this.innerHTML = `
            <style>
                .reload-list-scorers:hover{
                    cursor: pointer;
                    transform: scale(1.1);
                }
            </style>
            <div class="center-align" style="margin: 50px 0;">
                <h5>Gagal dapat menampilkan data</h5>
                <p>Silakan refresh halaman ini kembali<p>
                <i class="material-icons medium reload-list-scorers">refresh</i>
            <div>
        `
    }

    handleClick(){
        this.addEventListener("click", event => {
            if(event.target.className === "material-icons medium reload-list-scorers"){
                window.location.reload()
            }
        })
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

    responsiveTable(){
        if(window.outerWidth <= 600){
            this.querySelector(".table-top-scorers").classList.add("responsive-table")
        }
        window.addEventListener("resize", () => {
            if(window.outerWidth <= 600){
                this.querySelector(".table-top-scorers").classList.add("responsive-table")
            }else{
                this.querySelector(".table-top-scorers").classList.remove("responsive-table")
            }
        })
    }

    render(data, judul){
        this.innerHTML = /*html*/`
            <style>
                .container-player{
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                }
                .container-player .club{
                    margin: 0 20px
                }
                .container-player .nomor{
                    width: 20px;
                }
                @media screen and (max-width: 992px){
                    .container-player{
                        padding: 0;
                    }
                    .container-player .club{
                        margin: 0 10px
                    }
                }
                @media screen and (max-width: 600px){
                    .table-top-scorers thead tr th:nth-child(1){
                        height: 75px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            </style>
            <div class="card">
                <div class="card-content">
                    <h5 class="center-align">${judul}</h5>
                    <table class="striped centered table-top-scorers">
                        <thead>
                            <tr>
                                <th style="text-align: left">Nama</th>
                                <th>Asal</th>
                                <th>Gol</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data}
                        </tbody>
                    </table>
                </div>
            </div>
        `
    }

    dataList(data){
        let template = ""
        data.map((topScorer, i) => {
            template += `
                <tr>
                    <td>
                        <div class="container-player">
                            <div class="nomor">
                                <p>${i + 1}</p>
                            </div>
                            <div class="club">
                                <a href="detail.html?id=${topScorer.club.id}">
                                    <img src="${topScorer.club.crestUrl}" alt="${topScorer.club.name}" width="40" height="40" class="responsive-img">  
                                </a>  
                            </div>
                            <div class="nama left-align">
                                ${topScorer.dataPlayer.player.name}
                            </div>
                        </div>
                    
                    </td>
                    <td>${topScorer.dataPlayer.player.nationality}</td>
                    <td>${topScorer.dataPlayer.numberOfGoals}</td>
                </tr>
            `
        })
        return template
    }
}
customElements.define("list-scorers", ListScorers)