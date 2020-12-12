import React, {Component} from 'react'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.scss"
import axios from 'axios';


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state={
            username: "",
            password: "",
            id: this.props.id
        }
        
    }

    getDetails = async (id) => {
        try{
            const result = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data){
                    this.setState({
                        username: res.data.username
                    })
                }
            })
        }catch(err){
            console.error(err)

        }
    }

    componentDidMount() {
        const { id } = this.state;
        this.getDetails(this.props.id);
    }
    
    render() {

        return (
            <div className="greeting">Welcome {this.state.username}</div>
        );
    }
}


export default withRouter(Home)
