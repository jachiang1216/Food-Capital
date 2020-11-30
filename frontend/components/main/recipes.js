import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipes.scss"


export default class Recipes extends Component {

    constructor(props) {
        super(props);
    
    }

    render() {
        return (
            <div>
                <div>My Recipes</div>

                <div>Saved Recipes</div>
            </div>
            
        )
    }
}

export {Recipes}