import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class App extends Component {

    constructor(props){
        super(props);


    this.state = { 
        query: "",
        artist: null 
    };

}

search(){
    //console.log(`This state: ${this.state.query}`);
    console.log('this.state ', this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;  
    var accessToken = "BQDgyJPHo2VekQlXSoaRPgwc-hiKHhTbCu3O9koySOWwm3q45rsceE3_crh9GWZ0Ynpros_7aV1-6VH4dzqfFpdn182o6LWGm32lFag2C07DRGQ97znxKXIv7VKCIElEptLHY42wGgs1b4qvX7_wPT5QQ4UmHa8Pi4Mv";
    console.log('FETCH_URL', FETCH_URL);
    var myHeaders = new Headers();

    var myOptions = { 
        method: "GET", 
        headers: { 
                'Authorization': 'Bearer ' + accessToken 
                }, 
        mode: 'cors',
        cache: 'default' 
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => console.log(json));                                
}


    render() {
        return <div className="App">
            <div className="App-title">Music Master from App</div>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" 
                placeholder="Search for an Artist" 
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                    if(event.key === 'Enter'){
                        this.search()
                    }
                }}
                />
                <InputGroup.Addon onClick={()=> this.search()}>
                    <Glyphicon glyph="search"></Glyphicon>
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <div className="Profile">
              <div>Artist Picture</div>
              <div>Artist Name</div>
            </div>

            <div className="Gallery">Gallery</div>
          </div>;
    }
}

export default App;