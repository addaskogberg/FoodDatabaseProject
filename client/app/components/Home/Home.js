import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import { userInfo } from 'os';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      dbText: 'Här kommer maten'
    };

    const { match, location, history } = this.props

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.firstName = this.firstName.bind(this);
    this.displayFood = this.displayFood.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token});
          setInStorage('the_main_name',  'Välkommen '+ json.firstName );

          
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
      // this.props.history.push(`/DinSida`)
  }

  displayFood(){
    fetch('/api/fooddata/get')
    .then(res => res.json())
    .then(json => {
      console.log('Namn på livsmedel', json.Namn)
      console.log('Energi: ', json.Energi)
      this.setState({
        dbText: json.Namn
      })
      /*
      this.props.history.push({
        pathname: `../Food/Food/mat:` + json.Namn,
        state: { mat: json.Namn }
      })
      */ 
    })
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
             this.props.history.push(`../LogOut/LogOut`) 
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

   firstName(){
    return (getFromStorage('the_main_name'));
   };

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
      dbText
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div >
          <div style={{marginLeft:'30px'}} >
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <h2 style={{color:'#7b667f', marginBottom:'-1px'}} >Logga In</h2>
            <input 
              style={{color:'#7b667f', backgroundColor:'#', borderRadius:'3px', border: '2px solid gray'}}
              type="email"
              placeholder=" Mail"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              style={{color:'#7b667f', backgroundColor:'#', borderRadius:'3px', border: '2px solid gray'}}
              type="password"
              placeholder=" Lösenord"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button style={{color:'#7b667f', borderRadius:'3px', border: '2px solid gray'}} onClick={this.onSignIn}>Logga In</button>
          </div>
          <br />
          <br />
          <div style={{marginRight:'50px',marginTop:'100px', float:'right'}}>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <h2 style={{color:'#7b667f', marginBottom:'-1px'}}>Skapa användare</h2>
            <input 
            style={{color:'#7b667f', borderRadius:'3px', border: '2px solid gray'}}
           type="text" 
           placeholder=" Förnamn" 
           value={signUpFirstName} 
           onChange={this.onTextboxChangeSignUpFirstName}
           />
           <br />
           <input 
           style={{color:'#7b667f', backgroundColor:'#', borderRadius:'3px', border: '2px solid gray'}}
           type="text" 
           placeholder=" Efternamn" 
           value={signUpLastName}
           onChange={this.onTextboxChangeSignUpLastName}
           />
           <br />
            <input
            style={{color:'#7b667f', backgroundColor:'#', borderRadius:'3px', border: '2px solid gray'}}
              type="email"
              placeholder=" Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
            style={{color:'#7b667f', backgroundColor:'#', borderRadius:'3px', border: '2px solid gray'}}
              type="password"
              placeholder=" Lösenord"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button  style={{color:'#7b667f', borderRadius:'3px', border: '2px solid gray'}} onClick={this.onSignUp}>Skapa konto</button>
          </div>

        </div>
      );
    }
    

   const stone = 'assets/img/stones.png';
   // const FoodItems = require('../../../../server/models/FoodItems');
   // console.log(JSON.stringify());

    return (
      <div style={{color:'#fcf4ff', backgroundColor:'red', height: '90%',  position: 'absolute ', bottom:'0', width: '100%', backgroundImage: "url(" + stone + ")"}}>
        {/* <h2> {getFromStorage('the_main_name')}</h2> */}
        <h2> {this.firstName()}.</h2>
        <h2> Dagens datum är </h2>
        <h2> {new Date().toLocaleTimeString()}.</h2>
        <br />
        <br />
        <br />
        <p> Här ska användarens inmatning finnas </p>
        <br />
        <br />
        <br />
        <button onClick={this.displayFood}>Visa mat</button>
        <p> Klicka för användarens sparade data </p>
        <h2></h2>
        <p id="mat">{this.state.dbText}</p>
        <br />
        <br />
        <br />   
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;