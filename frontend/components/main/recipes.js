import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipes.scss"
import AddIcon from "./../../../images/Add-Icon.PNG";
import DefaultPic from "./../../../images/Default-Image.png"
import DeleteIcon from "./../../../images/Trash-Icon.png"
import axios from 'axios';

export default class Recipes extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            addMode: false,
            userid: this.props.id,

            referrer: null,

            //Add Recipe States
            recipename: "",
            recipedescription: "",
            recipeid: "",

            //Show Recipe States
            recipearray: "",
            index: 0,
            recipepic: DefaultPic,
            
            showDialog: false 
        }
    }

    componentDidMount(prevProps) {
        const { id } = this.state;
        this.getRecipes(this.props.id);
    }

    arrayBufferToBase64(buffer){
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach(b => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }
    
    getRecipes = async (id) => {
        var data = ''
        data = await axios.get('http://localhost:4000/recipes/fetch', {
            params: {
                userid: id
            }
        }).then(res => {
            if (res.data){
                return res.data;
            }
        })

        this.setState({ recipearray: data}, function () {
          });

        if (data.length){
            var base64Flag = "data:image/jpeg;base64,";
            var imageStr = this.arrayBufferToBase64(
                this.state.recipearray[0].recipepicture.data.data
            ); 
            this.setState({ recipepic: base64Flag+imageStr}, function () {
            });
            this.setState({
                recipeid: this.state.recipearray[this.state.index]._id
            })
            
        }
    }

    nextRecipe = () => {
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(
            this.state.recipearray[this.state.index+1].recipepicture.data.data
        ); 
        this.setState({ recipepic: base64Flag+imageStr}, function(){});
        this.setState({
            recipeid: this.state.recipearray[this.state.index+1]._id
        })
        this.setState({ index: this.state.index+1 }, function () {
        });
        
    }

    prevRecipe = () => {
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(
            this.state.recipearray[this.state.index-1].recipepicture.data.data
        ); 
        this.setState({ recipepic: base64Flag+imageStr}, function () {
        });
        this.setState({
            recipeid: this.state.recipearray[this.state.index-1]._id
        })
        this.setState({ index: this.state.index-1 }, function () {
        });
        
    }

    toggleDelete = (e) => {
        this.setState({ showDialog: !this.state.showDialog });
    }

    gotoRecipe = () => {
        this.setState({
            referrer: "/recipe"
        })
    }

    gotoAddRecipe = () => {
        this.setState({
            referrer: "/addrecipe"
        })
    }

    deleteRecipe = async (yesOrNo) => {
        
        if (yesOrNo === "yes"){ 
            let recipe = {
                recipeid: this.state.recipeid
            }

            let id = await axios.post('http://localhost:4000/recipes/delete/', recipe)
            .then(res => {
                    return res.data._id;
                }
            )
            alert("Recipe Deleted");
            this.setState({
                referrer: "/home"
            })
                        
            
        }
        this.setState({ showDialog: !this.state.showDialog });
      }
    
    
    
    render() {
        let addMode = this.state.addMode;
        const {index, recipearray} = this.state

        let {referrer} = this.state;
        if (referrer) return <Redirect to={{
            pathname: referrer,
            state: {index: index}
        }} /> 
        return (
            <div>
            <div className="recipe-container">
                <div className="add">
                    <img className="add-icon" title="Add Recipe" src={AddIcon} onClick={() => this.gotoAddRecipe()} ></img>
                </div>
                <div className="my-recipes"><h4>My Recipes</h4></div>
                <div className="next-button">
                    <button 
                    onClick={() => this.nextRecipe()}
                    disabled={index === recipearray.length-1 || recipearray.length === 0} 
                    >Next</button>
                </div>
                
                {recipearray[index] ?
                <div>
                <div className="card">
                    <div onClick={() => this.gotoRecipe()}>
                        <div className="card-title" >{recipearray[index].recipename}</div>
                        <img className="card-image" src={this.state.recipepic}/>
                        <div className="card-rating-title"> Rating</div>
                        <div className="card-rating">/5</div>
                    </div> 
                </div>
                
                <img className="card-delete" title="Delete Recipe" src={DeleteIcon} onClick={() => this.toggleDelete()}></img>
                </div>
                : <div className="no-recipe-array">{/* You have no Recipes. Add some! :) */}</div>}
                
                <div className="prev-button">
                <button 
                    onClick={() => this.prevRecipe()}
                    disabled={index === 0}
                    >Prev</button> 
                </div>
                <div className="favourite-recipes"><h4>Favourite Recipes</h4></div>
            </div>

            {this.state.showDialog ? (
                <ConfirmDelete callback={this.deleteRecipe.bind(this)} />
            ) : null}

            
            </div>
        )
    }
}

class ConfirmDelete extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="delete-dialog">
          <div>Are you sure you want to delete?</div>
          <button className="delete-yes"onClick={() => this.props.callback("yes")}>Yes</button>
          <button className="delete-no" onClick={() => this.props.callback("no")}>No</button>
        </div>
      );
    }
  }

export {Recipes}