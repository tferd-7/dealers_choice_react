import React, { Component } from 'react'; //want to have this as a component that will load data
import axios from 'axios';
import Fighter from './Fighter';
import Form from './Form';


class App extends Component{
    constructor(){
        super();
        this.state = {
            fighters: [],
            selectedFighterId: ''
        };
    }
    async componentDidMount(){
        const fighters = (await axios.get('/api/fighters')).data;
        this.setState({ fighters });
        window.addEventListener('hashchange', ()=>{
            this.setState({ selectedFighterId: window.location.hash.slice(1) });
        });
        this.setState({ selectedFighterId: window.location.hash.slice(1) });
    }
    render(){
        const { fighters, selectedFighterId } = this.state;
        //console.log(selectedFighterId);
        return (
            <div>
                <div className='split left'>
                    <div className='centered'>
                        <h1 className='title'>FIGHT NIGHT</h1>
                        <h4>Choose a Fighter</h4>
                        <ul className='fighters'>
                            {
                                fighters.map( fighter => {
                                    return (
                                        <li className={ selectedFighterId*1 === fighter.id ? 'selected' : ''}key={ fighter.id }>
                                            <a href={`#${fighter.id}`}>
                                            {fighter.name}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                            <li className={ selectedFighterId === '' ? 'selected' : ''}>
                                <a href='#'>
                                    Create A Fighter
                                </a>
                            </li>
                        </ul>
                    </div> 
                </div>
                <div className='split right'>
                    <div className='centered'>
                        <div>
                        {
                            !!selectedFighterId && <Fighter selectedFighterId={ selectedFighterId }/>
                        }
                        {
                            !selectedFighterId && <Form />
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;