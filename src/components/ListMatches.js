import "./Match.js"
class ListMatches extends HTMLElement{
    set dataMatches(dataMatches){
        this._dataMatches = dataMatches
        if(this._dataMatches === "error"){
            this.showError()
        }else{
            this.matchday = this._dataMatches.filters.matchday
            this.render()
            this.listMatches(this._dataMatches.matches)
        }
        this.handleClick()
    }

    render(){
        this.innerHTML =  /*html*/`
            <style>
                .container-btn-dropdown{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .btn-dropdown{
                    cursor: pointer;
                }
                .reload-list-matches:hover{
                    cursor: pointer;
                    transform: scale(1.1);
                }
            </style>
            ${this.dropdown()}
            <div class="card">
                <div class="card-content">
                    <div class="container-btn-dropdown">
                        <h5 class="dropdown-trigger btn-dropdown" data-target="dropdownMatchday">
                            MATCHDAY ${this.matchday} OF 38 <i class="material-icons">arrow_drop_down</i>
                        </h5>
                    </div>
                    <div class="list-matches row"></div>
                </div>
            </div>
        `
    }

    listMatches(matches, kondisi = false){
        if(kondisi){
            this.querySelector(".list-matches").innerHTML = ""
        }
        matches.map(match => {
            const div = document.createElement("div")
            div.classList.add("col")
            div.classList.add("s12")
            div.classList.add("m12")
            div.classList.add("l6")
            div.classList.add("xl6")
            div.classList.add("match")
            const matchApp = document.createElement("match-app")
            matchApp.dataMatch = match
            div.appendChild(matchApp)
            this.querySelector(".list-matches").appendChild(div)
        })
    }

    dropdown(){
        let template = ""
        for(let i = 0; i < 38; i++){
            template += `<li><a href="" class="item-dropdown">MATCHDAY ${i + 1} OF 38</a></li>`
        }
        return `
        <ul id="dropdownMatchday" class="dropdown-content">
            ${template}
        </ul>
        `
    }

    handleClick(){
        const itemsDropdown = [...this.querySelectorAll(".item-dropdown")]
        const btnDropdown = this.querySelector(".btn-dropdown")
        itemsDropdown.map((itemDropdown, i) => {
            itemDropdown.addEventListener("click", async(event) => {
                this.matchday = i + 1
                btnDropdown.innerHTML = `MATCHDAY ${this.matchday} OF 38 <i class="material-icons right">arrow_drop_down</i>`
                if(navigator.onLine){
                    event.preventDefault()
                    this.querySelector(".list-matches").innerHTML = this.preloader()
                    const matches = await this.getData("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + (this.matchday))
                    this.listMatches(matches.matches, true)
                }else{
                    event.preventDefault()
                    this.querySelector(".list-matches").innerHTML = this.preloader()
                    setTimeout(()=> {
                        this.querySelector(".list-matches").innerHTML = `
                        <div class='center-align' style="margin: 20px 0">
                            <h5>Koneksi Terputus</h5>
                            <p>Harap Hubungkan Ke Internet dan Refresh Halaman Ini Kembali</p>
                            <i class="material-icons medium reload-list-matches">refresh</i>
                        </div>
                        `
                    }, 1000)
                } 
            })
        })
        this.addEventListener("click", async (event) => {
            if(event.target.className === "material-icons medium reload-list-matches"){
                if(navigator.onLine){
                    this.querySelector(".list-matches").innerHTML = this.preloader()
                    const matches = await this.getData("https://api.football-data.org/v2/competitions/PL/matches?matchday=" + (this.matchday))
                    this.listMatches(matches.matches, true)
                }else{
                    this.querySelector(".list-matches").innerHTML = this.preloader()
                    setTimeout(()=> {
                        this.querySelector(".list-matches").innerHTML = `
                        <div class='center-align' style="margin: 20px 0">
                            <h5>Koneksi Terputus</h5>
                            <p>Harap Hubungkan Ke Internet dan Refresh Halaman Ini Kembali</p>
                            <i class="material-icons medium reload-list-matches">refresh</i>
                        </div>
                        `
                    }, 1000)
                }
            }else if(event.target.className === "material-icons medium reload-halaman-list-matches"){
                window.location.reload()
            }
        })
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
    
    getData(url){
        return fetch(url, {
            headers: {
                "X-Auth-Token": "456b28e3bd1d4bac8b0c4c4f12bce186"
            }
        })
            .then(response => response.json())
            .catch(err => {
                this.querySelector(".list-matches").innerHTML = this.preloader()
                setTimeout(()=> {
                    this.showError()
                }, 1000)
            })
    }

    showError(){
        this.innerHTML = `
        <style>
            .reload-halaman-list-matches:hover{
                cursor: pointer;
                transform: scale(1.1);
            }
        </style>
        <div class='center-align' style="margin: 20px 0">
            <h5>Gagal Menampilkan Halaman</h5>
            <p>Silakan Refresh Halaman Ini Kembali</p>
            <i class="material-icons medium reload-halaman-list-matches">refresh</i>
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
}
customElements.define("list-matches", ListMatches)