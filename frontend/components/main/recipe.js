import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "./../../../images/EditIconBeige.png"
import AddIcon from "./../../../images/Add-Icon.PNG";
import axios from 'axios';
import "./recipe.scss"
export default class Recipe extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            userid: this.props.id,

            referrer: null,
            index: this.props.location.state.index,

            //Add Recipe States
            recipename: "",
            recipedescription: "",

            recipearray: "",
            //Ingredient States
            ingredients: [],
            ingredient_index: 0,

            steps: [],
            step_index: 1,
            
            //Check if the recipe belongs to you in order to show edit option
            editrecipe: false, 
            recipepic: "",
            tempPicture: "",
            picdata: null

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeRecipeName=this.onChangeRecipeName.bind(this)
        this.onChangeRecipeDescription=this.onChangeRecipeDescription.bind(this)
        this.deleteIngredient=this.deleteIngredient.bind(this)
        this.onChangeIngredientName=this.onChangeIngredientName.bind(this)
        this.onChangeIngredientQuantity=this.onChangeIngredientQuantity.bind(this)
        this.onChangeIngredientMeasurement=this.onChangeIngredientMeasurement.bind(this)
        this.onChangeIngredientComments=this.onChangeIngredientComments.bind(this)
        this.onChangeStepComments=this.onChangeStepComments.bind(this)
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
        try{
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
                    this.state.recipearray[this.state.index].recipepicture.data.data
                ); 
                this.setState({
                    recipepic: base64Flag+imageStr,
                    recipeid: this.state.recipearray[this.state.index]._id,
                    steps: this.state.recipearray[this.state.index].steps,
                    ingredients: this.state.recipearray[this.state.index].ingredients,
                    recipename: this.state.recipearray[this.state.index].recipename,
                    recipedescription: this.state.recipearray[this.state.index].recipedescription
                }, function () {
                });
                this.setState({
                    tempPicture: this.state.recipepic
                }, function () {});

                var temp_array = this.state.recipearray
                for (var i=0;i<temp_array[this.state.index].ingredients.length;i++){
                    temp_array[this.state.index].ingredients[i][4] = i
                }
                this.setState({
                    recipearray: temp_array,
                    ingredient_index: temp_array[this.state.index].ingredients.length
                })
            }
        }catch(err){
            console.error(err)
        }
    }

    imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2){
          this.setState({recipepic: reader.result})
        }
      }
      if (e.target.files[0]){      
        reader.readAsDataURL(e.target.files[0])
      }
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("_id", this.state.id);

      this.setState({
        picdata: data
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

    onChangeIngredientName(e, index) {
        
        var array = this.state.ingredients;
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
        if (step.length===0){
            this.setState({
                steps: []
            }, function () {});
        }else{
        step.pop()
        
        this.setState({
            steps: step
        }, function () {});
    }
    }

    closeButton=()=>{
        this.setState({
            userid: this.props.id,
            referrer: "/recipes"
        })
    }

    toggleEdit=()=>{
        this.setState({
            editrecipe: !this.state.editrecipe
        })
    }

    saveRecipe = async () => {
    
        let recipe = {
            recipeid: this.state.recipeid,
            recipename: this.state.recipename,
            recipedescription: this.state.recipedescription,
            ingredients: this.state.ingredients,
            steps: this.state.steps
        }
        
        let id = await axios.post('http://localhost:4000/recipes/update/', recipe)
            .then(res => {
                    return res.data._id;
                }
            )
        return id
    };  


    onSubmit = async (e) => {
        e.preventDefault();
        
        let id = await this.saveRecipe().catch(e=>{throw e;});

        if (this.state.picdata){
            axios.post('http://localhost:4000/recipes/updatepic/'+this.state.recipeid, this.state.picdata).then(res =>{
                console.log(res.statusText);
            }); 
        }
        
        this.setState({
          editrecipe: !this.state.editrecipe
        })
    }

    render() {
    
        let {ingredients, steps} = this.state;
        const {recipearray, index} = this.state;
        const {editrecipe} = this.state;
        let {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />
        return (
            <div className="show-recipe-container">
                <button className="recipeClose" onClick={this.closeButton}></button>
                
                {recipearray[index] ?
                <div>
                {/* {editrecipe === false ? */}
                <div className="edit">
                    <img className="edit-recipe-icon" title="Edit Recipe" src={EditIcon} onClick={() => this.toggleEdit()} ></img>
                </div> {/* : <div></div>
                } */}
                <form onSubmit={this.onSubmit} className="form">
                <input className={this.state.editrecipe ? 'edit-show-recipe-name' : 'show-recipe-name'} defaultValue={this.state.recipename} disabled={!this.state.editrecipe}/>
                <textarea className={this.state.editrecipe ? 'edit-show-recipe-description' : 'show-recipe-description'} disabled={!this.state.editrecipe}>{this.state.recipedescription}</textarea>

                <label className="pic-label" htmlFor="file-input">
                    <img className="show-recipe-image" src={this.state.recipepic} accept="image/*" />
                </label>

                <input id="file-input" type="file"  onChange={this.imageHandler} disabled={!this.state.editrecipe}/>
                    
                <div className='show-ingredients'>Ingredients</div>
                <div className='show-ingredients-container'>
                    <div className='show-ingredient-box'>
                        <div className={this.state.editrecipe ? 'show-add-ingredient-icon' : ''} src={AddIcon} onClick={() => this.addIngredient()}></div>
                        <ul className="show-ingredient-list"> 
                        
                            {ingredients.length !== 0 ? <div>
                                {ingredients.map((item, i) => {
                                    return (
        
                                        <li className="show-ingredient-input" key={i}>
                                            <input className={this.state.editrecipe ? "edit-show-ingredient-name" : "show-ingredient-name"} maxLength="30" type="text" defaultValue={item[0]} disabled={!this.state.editrecipe} placeholder="Ingredient Name" onChange={(e) => this.onChangeIngredientName(e, item[4])} required/>
                                            {this.state.editrecipe ? 
                                                <div>
                                                    <input className="edit-show-ingredient-quantity" maxLength="5" type="text" defaultValue={item[1]} placeholder="Quantity" pattern="^\d+(?:\/\d+)?$" title="Only Numbers" onChange={(e) => this.onChangeIngredientQuantity(e, item[4])} required />
                                                    <select className="edit-show-ingredient-measurement" value={item[2]} onChange={(e) => this.onChangeIngredientMeasurement(e, item[4])}>
                                                        <option value=""></option>
                                                        <option value="kg">kg</option>
                                                        <option value="g">g</option>
                                                        <option value="l">l</option>
                                                        <option value="ml">ml</option>
                                                        <option value="teaspoon">teaspoon</option>
                                                        <option value="tablespoon">tablespoon</option> 
                                                        <option value="tablespoon">cups</option>  
                                                    </select>
                                                </div>
                                                : <input className="show-ingredient-quantity" type="text" defaultValue={item[1]+" "+item[2]} disabled/>
                                            }
                                            
                                            <textarea className={this.state.editrecipe ? "edit-show-ingredient-comments" : "show-ingredient-comments"} maxLength="50" defaultValue={item[3]} disabled={!this.state.editrecipe}></textarea>
                                            <div className={this.state.editrecipe ? "show-delete-ingredient-icon" : ""} src={AddIcon} onClick={() => this.deleteIngredient(item[4])}></div>
                                        </li>            

                                    )
                                   })
                                }</div> : <div className="show-no-ingredients">Author has not added any ingredients for this Recipe</div>
                            }
                        </ul>
                    </div>
                </div>
                <div className='show-steps'>Steps</div>
                <div className='show-steps-container'>
                    <div className='show-step-box'>
                        <div className={this.state.editrecipe ? 'show-add-step-icon' : ''} src={AddIcon} onClick={() => this.addStep()}></div>
                        <ul className="show-step-list"> 
                            {(steps.length !== 0) ? <div>
                                {steps.map((item, i) => {
                                    return (
                                        
                                        <li className="show-step-input" key={i}>
                                            <input className="show-step-number" type="text" defaultValue={i+1} disabled/>
                                            <textarea className={this.state.editrecipe ? "edit-show-step-comments" : "show-step-comments"} defaultValue={item} onChange={(e) => this.onChangeStepComments(e, i)} disabled={!this.state.editrecipe} />

                                            {i === steps.length - 1 ?
                                              <div className={this.state.editrecipe ? 'show-delete-step-icon' : ''} src={AddIcon} onClick={() => this.deleteStep(item)} ></div>
                                              : <div></div>
                                              }
                                        </li>            
                                    )
                                   })
                                }</div> : <div className="show-no-steps">Author has not added any steps for this Recipe</div>
                            }
                        </ul>
                    </div>
                </div> 
                {editrecipe === true ? <div>
                    <input type='submit'  value='Save Recipe' className="edit-recipe-submit" />
                </div> : <div></div>
                }
                </form>
                    </div>
                    : <div></div>}

                    
            </div>
        )
    }
}

export {Recipe}