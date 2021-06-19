import React, { Component } from "react";
import axios from 'axios'

class Form extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            bio: '',
            signature: 'Cower In Fear',
        }
    }
    
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleBioChange = event => {
        this.setState({
            bio: event.target.value
        })

    }
    handleSignatureChange = event => {
        this.setState({
            signature: event.target.value
        })
    }
    handleSubmit = event => {
        axios.post('/api/fighters', {this.state});

    }

    render(){
        console.log(this.state)
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                </div>
                <div>
                    <label>Fighter's Backstory</label>
                    <textarea
                        value={this.state.bio}
                        onChange = {this.handleBioChange}
                    />
                </div>
                <div>
                    <label>Signature Move</label>
                    <select value={this.state.signature} onChange={this.handleSignatureChange}>
                        <option value='Cower In Fear'>Cower In Fear</option>
                        <option value='Get The Strap'>Get The Strap</option>
                        <option value='Run Away'>Run Away</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Form;