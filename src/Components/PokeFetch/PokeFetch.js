import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
    constructor() {
        super()
        this.state = {
            pokeInfo: '',
            pokeSprite: '',
            pokeName: '',
            timer: 10
         }
    }

    fetchPokemon() {
        let min = Math.ceil(1);
        let max = Math.floor(152);
        let pokeNum = Math.floor(Math.random() * (max - min) + min);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
            method: 'GET'
        })  
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                pokeInfo: res,
                pokeSprite: res.sprites.front_default,
                pokeName: res.species.name,
                timer: 10
            })
        })
        .catch((err) => console.log(err))
    }

    countdown = () => {
        let guessTimer = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState({
                    timer: this.state.timer - 1});
            } else if (this.state.timer === 0) {
                clearInterval(guessTimer)
            } 
        }, 1000)
        return ()=> {
            clearInterval(guessTimer);
          };
    };

    render() {
        return (
            <div className={'wrapper'}>
                <button className={'start'} onClick={() => {this.fetchPokemon(); this.countdown();}}>Start!</button>
                <h1 className={'timer'}>Guess that Pokemon in <br />{this.state.timer} seconds!</h1>
                <div className={'pokeWrap'}>
                    <br />
                    <img 
                        className={'pokeImg'} 
                        style={this.state.timer === 0 ? {filter: "brightness(100%)"} : {filter: "brightness(0%)"}}  
                        src={this.state.pokeSprite} 
                        alt=""
                    />
                    <h1 className={'pokeName'} style={this.state.timer === 0 ? {opacity: 1} : {opacity: 0}}>Its {this.state.pokeName}!</h1>
                </div>
            </div>
        )
    }
}

export default PokeFetch;