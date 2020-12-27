import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import AddIcon from "./../../../images/Add-Icon.PNG";
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

            //Ingredient States
            ingredients: [],
            ingredient_index: 0,

            steps: [],
            step_index: 1

        }
        this.onSubmit=this.onSubmit.bind(this)
        this.onChangeRecipeName=this.onChangeRecipeName.bind(this)
        this.onChangeRecipeDescription=this.onChangeRecipeDescription.bind(this)
        this.deleteIngredient=this.deleteIngredient.bind(this)
        this.onChangeIngredientName=this.onChangeIngredientName.bind(this)
        this.onChangeIngredientQuantity=this.onChangeIngredientQuantity.bind(this)
        this.onChangeIngredientMeasurement=this.onChangeIngredientMeasurement.bind(this)
        this.onChangeIngredientComments=this.onChangeIngredientComments.bind(this)
        this.onChangeStepComments=this.onChangeStepComments.bind(this)
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
            recipedescription: this.state.recipedescription,
            ingredients: this.state.ingredients,
            steps: this.state.steps
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

    onChangeIngredientName(e, index) {
        
        var array = this.state.ingredients;
        /* array = array.filter((j => j[4] == index)) */
        var temp_array = [];
        array.map(k => 
            temp_array.push(k[4])
        );

        for (var i = 0; i < temp_array.length; i++){
            
            if (temp_array[i]===index){
                array[i][0] = e.target.value
            } 
        }

        //array[index][0] = e.target.value
        this.setState({
            ingredients: array
        });
    }

    onChangeIngredientQuantity(e, index) {
        
        var array = this.state.ingredients;

        var temp_array = [];
        array.map(k => 
            temp_array.push(k[4])
        );

        for (var i = 0; i < temp_array.length; i++){
            
            if (temp_array[i]===index){
                array[i][1] = e.target.value
            } 
        }

        this.setState({
            ingredients: array
        });
    }

    onChangeIngredientMeasurement(e, index) {
        
        var array = this.state.ingredients;

        var temp_array = [];
        array.map(k => 
            temp_array.push(k[4])
        );

        for (var i = 0; i < temp_array.length; i++){
            
            if (temp_array[i]===index){
                array[i][2] = e.target.value
            } 
        }

        this.setState({
            ingredients: array
        });
    }

    onChangeIngredientComments(e, index) {
        
        var array = this.state.ingredients;

        var temp_array = [];
        array.map(k => 
            temp_array.push(k[4])
        );

        for (var i = 0; i < temp_array.length; i++){
            
            if (temp_array[i]===index){
                array[i][3] = e.target.value
            } 
        }

        this.setState({
            ingredients: array
        });
    }




    addIngredient = () =>{

        this.setState({
            ingredient_index: this.state.ingredient_index+1}, function () {
            });
        
            
        if (this.state.ingredients){     
            this.setState({
                ingredients: [...this.state.ingredients, ["","","kg", this.state.ingredient_index, this.state.ingredient_index]]
            }, function () {});
        }else{
            this.setState({
                ingredients: [["","","kg", this.state.ingredient_index, this.state.ingredient_index]]
            }, function () {});
        }
    }

    deleteIngredient = (index) => {
        var array = this.state.ingredients;
        /* array = array.filter((j => j[4] == index)) */
        var temp_array = [];
        array.map(k => 
            temp_array.push(k[4])
        );

        var new_array = [];

        for (var i = 0; i < temp_array.length; i++){
            if (temp_array[i]===index){
            }else{
                new_array.push(array[i]);
            }
        }

        this.setState({
            ingredients: new_array
        })  

    }

    onChangeStepComments(e, i){
        var array = this.state.steps;

        var temp_array = array;
        array[i] = e.target.value
        console.log(i)
        this.setState({
            steps: array
        });
    }

    addStep = () =>{

        this.setState({
            step_index: this.state.step_index+1}, function () {
            });

        var step = this.state.steps;
        step.push("")
            
        if (this.state.steps){     
            this.setState({
                steps: step
            }, function () {});
        }else{
            this.setState({
                steps: [""]
            }, function () {});
        }
    }

    deleteStep = () => {
        var step = this.state.steps;
        step.pop()

        this.setState({
            steps: step
        }, function () {});
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
        let {ingredients, steps} = this.state;
        let {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} /> 
        return (
            <div className="add-recipe-container">
                <button className="recipeClose" onClick={this.closeButton}></button>
                <form onSubmit={this.onSubmit} className="Recipes" >
                    <p className='add-recipe-instruction'>To add a recipe, please enter the following details:</p>
                    <label className='recipe-name'>Recipe Name</label>
                    <input type='text' className='recipe-title' onChange={this.onChangeRecipeName} required/>
                    <label className='recipe-description'>Recipe Description</label>
                    <textarea className='recipe-description-title' onChange={this.onChangeRecipeDescription} required/>
                    <label className='recipe-img-title'>Upload food image (REQUIRED)</label>
                    <div className="recipe-img-holder">
                        
                        <label className="recipe-picture-label" htmlFor="file-input">
                            <img className="recipe-img" src={this.state.addRecipePicture} accept="image/*" />
                        </label>

                        <input id="file-input" type="file" required  onChange={this.imageHandler} />
                    </div>
                    
                    <label className='ingredients'>Add an Ingredient</label>
                    <div className='ingredients-container'>
                        <div className='add-ingredient-box'>
                            <div className='add-ingredient-icon' src={AddIcon} onClick={() => this.addIngredient()}></div>
                        
                            <ul className="ingredient-list"> 
                                {ingredients ?
                                    ingredients.map((item, i) => {
                                       return (
                                          <li className="ingredient-input" key={item[4]}>
                                              <input className="ingredient-name" type="text" maxLength="30" placeholder="Ingredient Name" onChange={(e) => this.onChangeIngredientName(e, item[4])} required />
                                              <input className="ingredient-quantity" type="text" maxLength="3" placeholder="Quantity" pattern="^\d+(?:\/\d+)?$" title="Only Numbers" onChange={(e) => this.onChangeIngredientQuantity(e, item[4])} required/>
                                              <select className="ingredient-measurement" onChange={(e) => this.onChangeIngredientMeasurement(e, item[4])}>
                                                <option value=""></option>
                                                <option value="kg">kg</option>
                                                <option value="g">g</option>
                                                <option value="l">l</option>
                                                <option value="ml">ml</option>
                                                <option value="teaspoon">teaspoon</option>
                                                <option value="tablespoon">tablespoon</option> 
                                                <option value="tablespoon">cups</option>  
                                              </select>
                                              <textarea className="ingredient-comments" maxLength="50" defaultValue={item[3]} placeholder="Other Details" onChange={(e) => this.onChangeIngredientComments(e, item[4])}></textarea>
                                              <div className='delete-ingredient-icon' src={AddIcon} onClick={() => this.deleteIngredient(item[4])}></div>
                                          </li>
                                       )
                                    })
                                    : []
                                }
                            </ul>
                        </div>
                    </div>

                    <label className='steps'>Add a Step</label>
                    <div className='steps-container'>
                        <div className='add-steps-box'>
                            <div className='add-step-icon' src={AddIcon} onClick={() => this.addStep()}></div>
                        
                            <ul className="steps-list"> 
                                {steps ?
                                    steps.map((item, i) => {
                                       return (
                                           
                                          <li className="step-input" key={i}>
                                              <input className="step-number" type="text" value={i+1} disabled />
                                              <textarea className="step-comments" defaultValue={item} maxLength="100" placeholder="Write the next step"  onChange={(e) => this.onChangeStepComments(e, i)} required></textarea>
                                              {i === steps.length - 1 ?
                                              <div className='delete-step-icon' src={AddIcon} onClick={() => this.deleteStep(item)} ></div>
                                              : <div></div>
                                              }
                                          </li>
                                       )
                                    })
                                    : []
                                }
                            </ul>
                        </div>
                    </div>
                    
                    
                    
                    <input type='submit'  value='Save Recipe' className="recipe-submit" />
                </form>
            </div>
        )
    }
}

export {AddRecipe}