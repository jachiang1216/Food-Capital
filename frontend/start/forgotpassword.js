import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";


export default class ForgotPassword extends Component {

    render() {
        return (
            <div> <Link className="Link" to="/" >Return</Link></div>
           
        )
    }
}

export {ForgotPassword}