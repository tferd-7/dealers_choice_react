import React, { Component } from "react";
import axios from 'axios'

class Fighter extends Component{
    constructor(){
        super();
        this.state = {
            fighter: {}
        };
    }
    async componentDidMount(){
        const fighter = (await axios.get(`/api/fighters/${this.props.selectedFighterId}`)).data;
        this.setState({ fighter });
    }
    render(){
        const { fighter } = this.state
        return (
            <div>
                { fighter.bio }
            </div>
        );
    }
}

export default Fighter