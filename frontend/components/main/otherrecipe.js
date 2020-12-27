import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./otherrecipe.scss"
export default class OtherRecipe extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            userid: this.props.id,

            referrer: null,
            recipeid: this.props.location.state.recipeid,

            //Add Recipe States
            recipename: "",
            recipedescription: "",
            recipeauthor: "",
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
    }

    componentDidMount(prevProps) {
        const { id } = this.state;
        this.getRecipes(this.props.location.state.recipeid);
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
            data = await axios.get('http://localhost:4000/home/fetchrecipe', {
                params: {
                    recipeid: id
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            })

            this.setState({ recipearray: data}, function () {
            });
          
            var base64Flag = "data:image/jpeg;base64,";
            var imageStr = this.arrayBufferToBase64(
                this.state.recipearray.recipepicture.data.data
            ); 
            this.setState({
                recipepic: base64Flag+imageStr,
                recipeid: this.state.recipearray._id,
                steps: this.state.recipearray.steps,
                ingredients: this.state.recipearray.ingredients,
                recipename: this.state.recipearray.recipename,
                recipedescription: this.state.recipearray.recipedescription
            }, function () {
            });

            this.setState({
                tempPicture: this.state.recipepic
            }, function () {});

            var temp_array = this.state.recipearray
            for (var i=0;i<temp_array.ingredients.length;i++){
                temp_array.ingredients[i][4] = i
            }
            this.setState({
                recipearray: temp_array,
                ingredient_index: temp_array.ingredients.length
            })

            var recipedata = ''
            recipedata = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: id
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            })

            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: recipedata.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor: name
            })
            
        }catch(err){
            console.error(err)
        }
    }


    closeButton=()=>{
        this.setState({
            userid: this.props.id,
            referrer: "/home"
        })
    }

    render() {
    
        let {ingredients, steps} = this.state;
        const {recipearray, index} = this.state;
        let {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />
        return (
            <div className="other-recipe-container">
                <button className="other-recipeClose" onClick={this.closeButton}></button>
                {recipearray ?
                <div>
                <form className="form">
                <input className='other-recipe-name' defaultValue={"Author"+this.state.recipename} disabled/>
                <div className='other-author-name'>Author: {this.state.recipeauthor}</div> 
                <div className='other-rating'></div>

                <textarea className='other-recipe-description' disabled defaultValue={this.state.recipedescription} />
                <img className="other-recipe-image" src={this.state.recipepic} />
                <div className='other-ingredients'>Ingredients</div>
                <div className='other-ingredients-container'>
                    <div className='other-ingredient-box'>
                        <ul className="other-ingredient-list"> 
                        
                            {ingredients.length !== 0 ? <div>
                                {ingredients.map((item, i) => {
                                    return (
        
                                        <li className="other-ingredient-input" key={i}>
                                            <input className="other-ingredient-name" maxLength="30" type="text" defaultValue={item[0]} disabled placeholder="Ingredient Name" required/>                                
                                            <input className="other-ingredient-quantity" type="text" defaultValue={item[1]+" "+item[2]} disabled/>
                                            <textarea className="other-ingredient-comments" maxLength="50" defaultValue={item[3]}></textarea>
                                        </li>            

                                    )
                                   })
                                }</div> : <div className="other-no-ingredients">Author has not added any ingredients for this Recipe</div>
                            }
                        </ul>
                    </div>
                </div>
                <div className='other-steps'>Steps</div>
                <div className='other-steps-container'>
                    <div className='other-step-box'>
                        <ul className="other-step-list"> 
                            {(steps.length !== 0) ? <div>
                                {steps.map((item, i) => {
                                    return (
                                        
                                        <li className="other-step-input" key={i}>
                                            <input className="other-step-number" type="text" defaultValue={i+1} disabled/>
                                            <textarea className="other-step-comments" defaultValue={item} disabled/>
                                        </li>            
                                    )
                                   })
                                }</div> : <div className="other-no-steps">Author has not added any steps for this Recipe</div>
                            }
                        </ul>
                    </div>
                </div>
                </form>
                    </div>
                    : <div></div>}

                    
            </div>
        )
    }
}

export {OtherRecipe}