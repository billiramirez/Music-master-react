import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

    constructor(props){
        super(props);


    this.state = { 
        query: "",
        artist: null,
        tracks: []
    };

}

search(){
    //console.log(`This state: ${this.state.query}`);
    console.log('this.state ', this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;  
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";
    var accessToken = "BQChkEcQYq9aZQtJ3trKa8PTR8AWyb9U-LujJ4Uia9Atdimlu2z14nP0lYse3QaG1dWqmqX1JW0z2j4ZwZ03Jqn5k-ylwBnrStK6Bm3CQRckpFm-pc6aWSLVvx6w1UZ7aOwWEtFyCXDX9JPIgbQvYtZJ-D8DQfsQrMxq"; 
    console.log('FETCH_URL', FETCH_URL);
    //var myHeaders = new Headers();

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
      .then(json => {
          const artist = json.artists.items[0];
          console.log('artist: ', artist);
          this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
            console.log('artist\'s top tracks: ', json);
            const {tracks} = json;
            this.setState({
                tracks
            })
        })

      });                                
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
                {
                    this.state.artist !== null
                    ? 
                    <div>
                    <Profile
                    artist ={this.state.artist}
                    />

                    <Gallery
                    tracks={this.state.tracks}
                    />
                    </div>
                    
                    : <div></div>
                    }
            
          </div>;
    }
}

export default App;