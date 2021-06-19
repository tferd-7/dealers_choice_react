import React, { Component } from "react";
import axios from 'axios'

class Fighter extends Component{
    constructor(){
        super();
        this.state = {
            fighter: {}
        };
    }
    async componentDidUpdate(prevProps){
        if(prevProps.selectedFighterId !== this.props.selectedFighterId){
            const fighter = (await axios.get(`/api/fighters/${this.props.selectedFighterId}`)).data;
            this.setState({ fighter });
        }
    }
    async componentDidMount(){
        const fighter = (await axios.get(`/api/fighters/${this.props.selectedFighterId}`)).data;
        this.setState({ fighter });
    }
    render(){
        const { fighter } = this.state
        return (
            <div>
                <div className='image'>
                    <img src={ fighter.imageUrl } />
                </div>
                <div className='bio'>
                    { fighter.bio }
                </div>
                <div className='signature'>
                    Signature Move: { fighter.signature }
                </div>
            </div>
            
        );
    }
}

/*
<div className='delete'>
    <button className='btn' onClick= { ()=> removeFighter(this.props.selectedFighterId)}>DELETE FIGHTER</button>
</div>
*/

export default Fighter