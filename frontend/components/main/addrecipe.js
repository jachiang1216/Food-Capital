import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import DefaultPic from "./../../../images/Default-Image.png"
import "./addrecipe.scss"

export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            userid: this.props.id,

            referrer: null,

            //Add Recipe States
            recipename: "",
            recipedescription: "",
            addRecipePicture: DefaultPic,
            addrecipepicdata: "",


        }
        this.onSubmit=this.onSubmit.bind(this)
        this.onChangeRecipeName=this.onChangeRecipeName.bind(this)
        this.onChangeRecipeDescription=this.onChangeRecipeDescription.bind(this)
    }
    
    arrayBufferToBase64(buffer){
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach(b => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2){
            this.setState({addRecipePicture: reader.result})
          }
        }
        if (e.target.files[0]){      
          reader.readAsDataURL(e.target.files[0])
        }
        
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("_id", this.state.id);

        this.setState({
            addrecipepicdata: data
        })

    }

    onChangeRecipeName(e) {
        this.setState({
            recipename: e.target.value
        });
    }
  
    onChangeRecipeDescription(e) {
        this.setState({
            recipedescription: e.target.value
        });
    }
  
    saveRecipe = async () => {
    
        let recipe = {
            userid: this.props.id,
            recipename: this.state.recipename,
            recipedescription: this.state.recipedescription
        }
        let id = await axios.post('http://localhost:4000/recipes/add/', recipe)
            .then(res => {
                    return res.data._id;
                }
            )
        return id
    };  

    closeButton=()=>{
        this.setState({
            userid: this.props.id,
            referrer: "/recipes"
        })
    }

    onSubmit = async(e) =>{
        e.preventDefault();

        let data = this.state.addrecipepicdata
        let id = await this.saveRecipe().catch(e=>{throw e;});
        
        axios.post('http://localhost:4000/recipes/upload/'+id, data).then(res =>{
            console.log(res.statusText);
        });

        this.setState({
            userid: this.props.id,
            referrer: "/home"
        })

        alert("Recipe Added")
    }

    render() {

        let {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} /> 
        return (
            <div className="add-recipe-container">
                <button className="recipeClose" onClick={this.closeButton}></button>
                <form onSubmit={this.onSubmit} className="Recipes" >
                    <p>To add a recipe, please enter the following details:</p>
                    <label className='recipe-name'>Recipe Name</label>
                    <input type='text' className='recipe-title' onChange={this.onChangeRecipeName} required/>
                    <label className='recipe-description'>Recipe Description</label>
                    <textarea className='recipe-description-title' onChange={this.onChangeRecipeDescription} />
                    <label className='recipe-img-title'>Upload food image</label>
                    <div className="recipe-img-holder">
                        
                        <label className="recipe-picture-label" htmlFor="file-input">
                            <img className="recipe-img" src={this.state.addRecipePicture} accept="image/*" />
                        </label>

                        <input id="file-input" type="file" required  onChange={this.imageHandler} />
                    </div>
                    
                    <label className='ingredients'>Ingredients</label>

                    <div>
                        Steps
                    </div>

                    
                    
                    
                    <input type='submit'  value='Save Recipe' className="recipe-submit" />
                </form>
            </div>
        )
    }
}

export {AddRecipe}