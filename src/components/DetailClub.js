class DetailClub extends HTMLElement{
    set dataClub(dataCLub){
        this._dataCLub = dataCLub
        const content = this.detailContent(this._dataCLub, "overview")        
        this.render(content, this._dataCLub)
        this.handleClick(this._dataCLub)
    }

    handleClick(dataCLub){
        const btn = [...this.querySelectorAll(".btn-detail")]
        btn.map(elm => {
            elm.addEventListener("click", () => {
                btn.forEach(e => {
                    e.classList.remove("active")
                })
                elm.classList.add("active")
                if((elm.innerHTML).toLowerCase() === "matches"){
                    this.listMathes(dataCLub.matches)
                }else if((elm.innerHTML).toLowerCase() === "overview"){
                    this.querySelector(".content-detail").innerHTML = this.detailContent(dataCLub, "overview")
                }else if((elm.innerHTML).toLowerCase() === "squad"){
                    this.querySelector(".content-detail").innerHTML = this.detailContent(dataCLub.squad, "squad")
                }
            })
        })
    }

    render(detailContent, data){
        this.innerHTML = /*html*/ `
            <style>
                .active{
                    border-bottom: 2px solid red;
                }
                .btn-detail:hover{
                    cursor: pointer;
                }
                .box-detail{
                    display: flex;
                }
                .box-detail p{
                    flex-basis: 50%
                }
            </style>
            <div class="card">
                <div class="card-content">
                    <span class="card-title center-align">
                        <img src="${data.crestUrl}" alt="${data.name}" width="100" class="responsive-img">
                        <h5>${data.name}</h5>
                    </span>

                    <div class="row" style="margin-top: 50px;">
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-detail center-align active">OVERVIEW</p>
                        </div>
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-detail center-align">MATCHES</p>
                        </div>
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-detail center-align">SQUAD</p>
                        </div>
                    </div>
                    
                    <div class="content-detail">
                        ${detailContent}
                    </div>
                </div>
            </div>
        `
    }

    detailContent(data, ket){
        if(ket.toLowerCase() === "overview"){
            return `
            <ul class="collection detail-club">
                <li class="collection-item box-detail">${data.name}</li>
                <li class="collection-item box-detail">${data.tla}</li>
                <li class="collection-item box-detail">${data.phone}</li>
                <li class="collection-item box-detail">${data.address}</li>
                <li class="collection-item box-detail">${data.email}</li>
                <li class="collection-item box-detail">${data.venue}</li>
                <li class="collection-item box-detail"><a target="blank" href="${data.website}">${data.website}</a></li>
            </ul>
            `
        }else if(ket.toLowerCase() === "squad"){
            let dataTBody = ""
            data.map(e => {
                dataTBody += `
                    <tr>
                        <td>${e.name}</td>
                        <td>${(e.position === null) ? e.role : e.position}</td>
                        <td>${e.nationality}</td>
                    </tr>
                `
            })
            return /*html*/`
            <table class="striped centered squad responsive-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Posisi</th>
                        <th>Asal</th>
                    </tr>
                </thead>
        
                <tbody>
                    ${dataTBody}
                </tbody>
            </table>
            `
        }
    }

    listMathes(matches){
        let div = document.createElement("div")
        const detailClub = this.querySelector(".detail-club")
        const squad = this.querySelector(".squad")
        const child = (detailClub === null) ? squad : detailClub
        matches.map(match => {
            const matchApp = document.createElement("match-app")
            matchApp.dataMatch = match
            div.appendChild(matchApp)
        })
        this.querySelector(".content-detail").replaceChild(div, child)
    }
}
customElements.define("detail-club", DetailClub)