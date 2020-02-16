import React, { Component } from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //We will be using an APi that provide a bunch of meme images
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs: memes })
            })
    }

    //onchange handler to update state
    handleChange(event) {
        console.log("working!")
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        //get a rabdom image (index in the array)
        //get a meme from that index
        //set a random to the url of the item I grabbed
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })


    }

    render() {
        return (
            <div>

                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} /> <br />
                    <input type="text" name="bottomText" placeholder="Bottom text" value={this.state.bottomText} onChange={this.handleChange} /> <br /> <br />

                    <button>Generate</button> <br /> <br />

                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>

        )
    }
}



export default MemeGenerator