class Footbar extends HTMLElement{
    connectedCallback(){
        this.render()
    }
    render(){
        this.innerHTML = /*html*/`
            <style>
                .footbar{
                    padding: 50px 0;
                }
                .medsos{
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column
                }
                .text-follow{
                    margin: 50px 0 10px 0;
                    width: 100%;
                }
                .box-medsos{
                    margin-bottom: 50px;
                    display: flex;
                    justify-content: center;
                }
                .fa-facebook-square{
                    color: blue;
                }
                .fa-instagram{
                    color: red;
                }
                .fa-twitter{
                    color: lightblue;
                }
                .fa-youtube{
                    color: red;
                }
                .logo{
                    font-size: 23px;
                }
                .container-logo{
                    margin: 0 10px;
                    background-color: white;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    box-shadow: 0 0 5px black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .detail p, .detail h4{
                    margin: 0;
                }
            </style>
            <div class="row footbar white-text">
                <div class="col s12 l4 m12 xl4 detail">
                    <h4>INFO BOLA</h4>
                    <p>infobola@gmail.com</p>
                </div>
                <div class="col s12 l4 m12 xl4 medsos">
                    <h5 class="center-align text-follow">FOLLOW US</h5>
                    <div class="container box-medsos">
                        <a href="" class="container-logo"><i class="logo fab fa-facebook-square"></i></a>
                        <a href="" class="container-logo"><i class="logo fab fa-instagram"></i></a>
                        <a href="" class="container-logo"><i class="logo fab fa-youtube"></i></a>
                        <a href="" class="container-logo"><i class="logo fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define("foot-bar", Footbar)