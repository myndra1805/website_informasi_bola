class Match extends HTMLElement{
    constructor(){
        super();
    }
    set dataMatch(match){
        this._match = match
        this.render(this._match)
    }
    render(match){
        this.innerHTML = /*html*/`
            <style>
                .container-score{
                    display: flex;
                    flex-wrap: wrap;
                }
                .box-score{
                    flex-basis: 80%;
                    display: flex;
                    flex-wrap: wrap;
                }
                .box-score .name{
                    flex-basis: 80%;
                    padding: 10px 0;
                }
                .box-score .score{
                    flex-basis: 20%;
                    padding: 10px 0;
                }
                .box-date{
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex-basis: 20%;
                }@media screen and (max-width: 600px){
                    .box-score{
                        flex-basis: 100%;
                        order: 2;
                    }
                    .box-date{
                        flex-basis: 100%;
                        order: 1;
                        padding: 10px 0;
                        border-left: none;
                    }
                }
            </style>
            <div class="card">
                <div class="card-content container-score">
                    <div class="box-score">
                        <p class="name">${match.awayTeam.name}</p>
                        <p class="score">${(match.score.fullTime.awayTeam == null) ? "-" : match.score.fullTime.awayTeam}</p>
                        <p class="name">${match.homeTeam.name}</p>
                        <p class="score">${(match.score.fullTime.homeTeam == null) ? "-" : match.score.fullTime.homeTeam}</p>
                    </div>
                    <div class="box-date amber darken-4 white-text">
                        <p>${match.lastUpdated.split("T")[0]}</p>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define("match-app", Match)