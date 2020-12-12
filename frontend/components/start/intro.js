import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import juice from "./../../../images/Juice.gif";
import "./intro.scss";
import Login from "./login.js";
import Register from "./register.js";

const phraseList = ["Share your Recipes", "Post your Restaurant Review", "Upload your Food Pics"]

export default class Intro extends Component {
    

    constructor(props) {
        super(props);
        //default state
        this.state = {
            isMounted: true,
            //TypeWriter Effect
            displayText: '',
            wordIndex: 0,
            isDeleting: false,
            pause: 150,

            //intro
            showLogin: false,
            showGreeting: true,

            isLogginActive: true,
            
            loginActive: "loginBtn",
            registerActive: "noregisterBtn",
        }
    }

    componentDidMount() {
        let isMounted = this.state
        if (isMounted){
            this.myInterval = setInterval(this.typeEffect, this.state.pause)
        }
    }
    
    componentWillUnmount(){
        let isMounted = this.state
        isMounted = false;
        clearInterval(this.myInterval)
    }

    typeEffect = () =>{

        this.state.isDeleting===false 
            ? this.addText() : this.deleteText()
        
    }

    deleteText = () => {
        clearInterval(this.myInterval)
        
        let { displayText, wordIndex } = this.state;
        

        if (displayText.length === 0){
            this.setState({
                wordIndex: wordIndex + 1,
            }) 
        }  
        if ((wordIndex === phraseList.length-1) && (displayText.length === phraseList[wordIndex].length-1)){
            this.setState({
                wordIndex: -1,
            }) 
        } 
        if (phraseList[wordIndex] && (displayText.length === phraseList[wordIndex].length)){
            this.setState({
                pause: 10
            }) 
        }

        this.setState({
            displayText: displayText.substring(0, displayText.length-1)
        })
        
        if (displayText.length === 0){
            this.setState({
                isDeleting: false,
                pause: 150
            }) 
        }

        this.myInterval = setInterval(this.typeEffect, this.state.pause)
    }

    addText = () => {
        clearInterval(this.myInterval)

        let { displayText, wordIndex} = this.state;
        let index = displayText.length + 1
        let change = phraseList[wordIndex].substring(0, index)
        let word = wordIndex
        
        if (displayText.length === phraseList[word].length-1){
            this.setState({
                isDeleting: true,
                pause: 3000
            }) 
        }
        
        this.setState({
            displayText: change,
            wordIndex: word
        }) 
        
        this.myInterval = setInterval(this.typeEffect, this.state.pause)
    }

    
    

    revealLogin=()=> {
        this.setState({showLogin: !this.state.showLogin})
        this.setState({showGreeting: !this.state.showGreeting})
    }

    toggleForm = (state) => {
        this.setState({isLogginActive: state});
        if (state==true){
            this.setState({
                loginActive: "loginBtn",
                registerActive: "noregisterBtn"
            });
        }
        else{
            this.setState({
                loginActive: "nologinBtn",
                registerActive: "registerBtn"
            });
        }
    }

    closeButton=()=>{
        this.setState({showLogin: !this.state.showLogin})
        this.setState({showGreeting: !this.state.showGreeting})
    }

    resetPage=()=>{
        this.setState({
            showLogin: false,
            showGreeting: true,
    
            isLogginActive: true,
                
            loginActive: "loginBtn",
            registerActive: "noregisterBtn"
        })
        
    }

    toggleLogin=(name, id)=>{
        this.props.toggleLogin(name, id);
    }

    render() {
        let login = this.state.showLogin ? "LoginForm" : "noLoginForm";
        let greeting = this.state.showGreeting ? "MainGreeting" : "noMainGreeting";
        let isLogginActive = this.state.isLogginActive ? "Login" : "Register";
        let loginActive = this.state.loginActive;
        let registerActive = this.state.registerActive;

        return (
            <div className="Window" >
                <div className="Image">
                    <img src={juice} style={{width:'650px', height: '612px'}}/>
                </div>
                <div className="Title">
                    Food Capital
                </div>
                <div className={login} >
                    <button className="Close" onClick={this.closeButton}></button>
                    <div className="nav-buttons">
                        <Link to="/" className={loginActive} onClick={() => this.toggleForm(true)}>Login</Link>
                        <Link to="/" className={registerActive} onClick={() => this.toggleForm(false)}>Register</Link>
                    </div>
                    <div className={isLogginActive}>
                        {this.state.isLogginActive ? <Login toggleLogin={this.toggleLogin} /> : <Register resetPage={this.resetPage}/>}
                    </div>
                </div>
                
                <div className={greeting}>
                    <div className="intro-greeting">Greetings and Welcome Foodies</div>
                    <div className="typing">A Place to {this.state.displayText}</div>

                    <button className="StartGroup" onClick={this.revealLogin}>
                        Begin
                    </button>
                </div>
                
            </div>
            
        )
    }  
}
export {Intro}