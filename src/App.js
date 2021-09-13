
import { Component } from 'react';
import Clarifai from 'clarifai';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Navigation from './component/Navigation';
import Signin from './component/Signin';
import Register from './component/Register';
import FaceRecognition from './component/FaceRecognition';
import Rank from './component/Rank'
import './App.css';

  const app = new Clarifai.App({
    apiKey: '4adfc7e300de40dcaecf4210753199d6'
   });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageUrl:' ',
      box: {},
      route:'signin',
      isSignedIn: false
    };
  } 

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }; 
  };

  displayFaceBox = (box) => {
    this.setState({box: box})
  } 

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}) 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox( this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
   const { isSignedIn, imageUrl, route, box, } = this.state;
  return (
    <div className="App">

    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChnge}/>
    { route === 'home' 
    ? <div>
    <Logo />
    <Rank />
    <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}
    />
    <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
    : (
      route ==='signin'
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange}/> 
    )  
   }
    </div>
  );
  }
}

export default App;
//pre Box adding css