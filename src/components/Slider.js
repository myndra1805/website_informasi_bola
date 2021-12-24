import gambar1 from "./../../public/gambar/slider1.jpg"
import gambar2 from "./../../public/gambar/slider2.jpeg"
import gambar3 from "./../../public/gambar/slider3.jpeg"
import gambar4 from "./../../public/gambar/slider4.jpeg"
class Slider extends HTMLElement{
    connectedCallback(){
        this.render()
        this.activeSlider()
    }
    
    activeSlider(){
        const slider = document.querySelectorAll('.slider');
        M.Slider.init(slider);
    }

    render(){
        this.innerHTML = /*html*/`
            <div class="slider">
                <ul class="slides">
                    <li>
                        <img src="${gambar4}">
                    </li>
                    <li>
                        <img src="${gambar1}">
                        <div class="caption center-align">
                            <h3>This is our big Tagline!</h3>
                            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                    <li>
                        <img src="${gambar2}">
                        <div class="caption left-align">
                            <h3>Left Aligned Caption</h3>
                            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                    <li>
                        <img src="${gambar3}">
                        <div class="caption right-align">
                            <h3>Right Aligned Caption</h3>
                            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                </ul>
            </div>    
        `
    }
}
customElements.define("slider-app", Slider)