import "./ClubsFavorite.js"
import "./PlayersFavorite.js"
import "./Schedules.js"
class Favorite extends HTMLElement{
    connectedCallback(){
        this.innerHTML = this.preloader()
        const content = this.contentFavorite("clubs")
        this.innerHTML = this.render(content)
        this.handleClick("clubs")
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

    render(content){
        return /*html*/ `
            <style>
                .active-btn{
                    border-bottom: 2px solid red;
                }
                .btn-favorite:hover{
                    cursor: pointer;
                }
                .clubs-favorite{
                    display: flex;
                    align-items: center;
                }
                .clubs-favorite .img{
                    margin-right: 10px
                }
                .clubs-favorite .name p{
                    color: black
                }
                .clubs-favorite .name p:hover{
                    color: blue
                }
            </style>
            <div class="card" style="overflow: hidden">
                <div class="card-content">
                    <div class="row" style="margin-top: 50px;">
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-favorite center-align active-btn">CLUBS</p>
                        </div>
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-favorite center-align">PLAYERS</p>
                        </div>
                        <div class="col m4 s4 l4 xl4">
                            <p class="btn-favorite center-align">SCHEDULES</p>
                        </div>
                    </div>
                    <div class="content-favorite">
                        ${content}
                    </div>
                </div>
            </div>
        `
    }

    handleClick(){
        const btnFavorite = [...this.querySelectorAll(".btn-favorite")]
        btnFavorite.map(btn => {
            btn.addEventListener("click", async() => {
                const params =  (btn.innerHTML).toLowerCase()
                if(params === "clubs"){
                    this.querySelector(".content-favorite").innerHTML = this.contentFavorite(params)
                }else if(params === "players"){
                    this.querySelector(".content-favorite").innerHTML = this.contentFavorite(params)
                }else if(params === "schedules"){
                    this.querySelector(".content-favorite").innerHTML = this.contentFavorite(params)
                }
                btnFavorite.map(e => e.classList.remove("active-btn"))
                btn.classList.add("active-btn")
            })
        })
    }

    contentFavorite(tableName){  
        if(tableName == "clubs"){  
            return "<clubs-favorite></clubs-favorite>"
        }else if(tableName == "players"){
            return "<players-favorite></players-favorite>"
        }else if(tableName == "schedules"){
            return "<schedules-mathces></schedules-matches>"     
        }
    }
}
customElements.define("favorite-app", Favorite)