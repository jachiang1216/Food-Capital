import React, {Component} from 'react'
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.scss"
import axios from 'axios';


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state={
            username: "",
            password: "",
            id: this.props.id,

            all_recipe_array: [],
            recipepic_1: "",
            recipepic_2: "",
            recipepic_3: "",
            recipepic_4: "",
            recipeid_1: "",
            recipeid_2: "",
            recipeid_3: "",
            recipeid_4: "",
            recipeid: "",
            recipeauthor_1: "",
            recipeauthor_2: "",
            recipeauthor_3: "",
            recipeauthor_4: "",

            index: 0
        }
        
    }

    arrayBufferToBase64(buffer){
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach(b => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }

    getUsername = async (id) => {
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

    getRecipes = async (id) => {

        try{
            let recipes = await axios.get('http://localhost:4000/home/fetch', {
                params: {
                    userid: id
                }
            }).then(res => {
                if (res.data){
                    return res.data
                }
            })

            for (var i = recipes.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = recipes[i];
                recipes[i] = recipes[j];
                recipes[j] = temp;
            }

            this.setState({
                all_recipe_array: recipes
            }, function () {
            });
            
            if (recipes.length){

                var base64Flag = "data:image/jpeg;base64,";
                if (recipes[0]){
                    var imageStr_1 = this.arrayBufferToBase64(
                        recipes[0].recipepicture.data.data
                    ); 
                    this.setState({
                        recipeid_1: recipes[0]._id
                    }, function () {
                    });

                    const data = await axios.get('http://localhost:4000/home/fetchuser', {
                        params: {
                            recipeid: this.state.recipeid_1
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data;
                        }
                    }) 
                    
                    const name = await axios.get('http://localhost:4000/fetchid', {
                        params: {
                            id: data.userid
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data.username
                        }
                    })

                    this.setState({
                        recipeauthor_1: name,
                        recipepic_1: base64Flag+imageStr_1
                    })
                    
                    
                }
                if (recipes[1]){
                    var imageStr_2 = this.arrayBufferToBase64(
                        recipes[1].recipepicture.data.data
                    ); 
                    this.setState({
                        recipeid_2: recipes[1]._id
                    }, function () {
                    });

                    const data = await axios.get('http://localhost:4000/home/fetchuser', {
                        params: {
                            recipeid: this.state.recipeid_2
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data;
                        }
                    }) 
                    
                    const name = await axios.get('http://localhost:4000/fetchid', {
                        params: {
                            id: data.userid
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data.username
                        }
                    })

                    this.setState({
                        recipeauthor_2: name,
                        recipepic_2: base64Flag+imageStr_2
                    })
                }
                if (recipes[2]){
                    var imageStr_3 = this.arrayBufferToBase64(
                        recipes[2].recipepicture.data.data
                    ); 
                    this.setState({
                        recipeid_3: recipes[2]._id
                    }, function () {
                    });

                    const data = await axios.get('http://localhost:4000/home/fetchuser', {
                        params: {
                            recipeid: this.state.recipeid_3
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data;
                        }
                    }) 
                    
                    const name = await axios.get('http://localhost:4000/fetchid', {
                        params: {
                            id: data.userid
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data.username
                        }
                    })

                    this.setState({
                        recipeauthor_3: name,
                        recipepic_3: base64Flag+imageStr_3
                    })
                }
                if (recipes[3]){
                    var imageStr_4 = this.arrayBufferToBase64(
                        recipes[3].recipepicture.data.data
                    ); 
                    this.setState({
                        recipeid_4: recipes[3]._id
                    }, function () {
                    });

                    const data = await axios.get('http://localhost:4000/home/fetchuser', {
                        params: {
                            recipeid: this.state.recipeid_4
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data;
                        }
                    }) 
                    
                    const name = await axios.get('http://localhost:4000/fetchid', {
                        params: {
                            id: data.userid
                        }
                    }).then(res => {
                        if (res.data){
                            return res.data.username
                        }
                    })

                    this.setState({
                        recipeauthor_4: name,
                        recipepic_4: base64Flag+imageStr_4
                    })
                }
                
            }
        }catch(err){
            console.error(err)

        }
    }

    nextRecipe = async () => {
        
        let index = this.state.index
        let recipes = this.state.all_recipe_array

        var base64Flag = "data:image/jpeg;base64,";
        if (recipes[index+4]){
            var imageStr_1 = this.arrayBufferToBase64(
                recipes[index+4].recipepicture.data.data
            ); 
            this.setState({
                recipeid_1: recipes[index+4]._id
            }, function () {
            });
                    
            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                            recipeid: this.state.recipeid_1
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_1: name,
                recipepic_1: base64Flag+imageStr_1
            })
            
            
        }
        if (recipes[index+5]){
            var imageStr_2 = this.arrayBufferToBase64(
                recipes[index+5].recipepicture.data.data
            ); 
            this.setState({
                recipeid_2: recipes[index+5]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_2
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_2: name,
                recipepic_2: base64Flag+imageStr_2
            })
        }
        if (recipes[index+6]){
            var imageStr_3 = this.arrayBufferToBase64(
                recipes[index+6].recipepicture.data.data
            ); 
            this.setState({
                recipeid_3: recipes[index+6]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_3
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_3: name,
                recipepic_3: base64Flag+imageStr_3
            })
        }
        if (recipes[index+7]){
            var imageStr_4 = this.arrayBufferToBase64(
                recipes[index+7].recipepicture.data.data
            ); 
            this.setState({
                recipeid_4: recipes[index+7]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_4
                }
            }).then(res => {
                if (res.data){
                    return res.data;
                }
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_4: name,
                recipepic_4: base64Flag+imageStr_4
            })

        }
        
        this.setState({ index: this.state.index+4 })
        
    }

    prevRecipe = async () => {
        
        let index = this.state.index
        let recipes = this.state.all_recipe_array

        var base64Flag = "data:image/jpeg;base64,";
        if (recipes[index-4]){
            var imageStr_1 = this.arrayBufferToBase64(
                recipes[index-4].recipepicture.data.data
            ); 
            this.setState({
                recipeid_1: recipes[index-4]._id
            }, function () {
            });
            
            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_1
                }
            }).then(res => {
                return res.data;
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_1: name,
                recipepic_1: base64Flag+imageStr_1
            })
            
            
        }
        if (recipes[index-3]){
            var imageStr_2 = this.arrayBufferToBase64(
                recipes[index-3].recipepicture.data.data
            ); 
            this.setState({
                recipeid_2: recipes[index-3]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_2
                }
            }).then(res => {
                return res.data;
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_2: name,
                recipepic_2: base64Flag+imageStr_2
            })
        }
        if (recipes[index-2]){
            var imageStr_3 = this.arrayBufferToBase64(
                recipes[index-2].recipepicture.data.data
            ); 
            this.setState({
                recipeid_3: recipes[index-2]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_3
                }
            }).then(res => {
                return res.data;
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_3: name,
                recipepic_3: base64Flag+imageStr_3
            })
        }
        if (recipes[index-1]){
            var imageStr_4 = this.arrayBufferToBase64(
                recipes[index-1].recipepicture.data.data
            ); 
            this.setState({
                recipeid_4: recipes[index-1]._id
            }, function () {
            });

            const data = await axios.get('http://localhost:4000/home/fetchuser', {
                params: {
                    recipeid: this.state.recipeid_4
                }
            }).then(res => {
                return res.data;
            }) 
            
            const name = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: data.userid
                }
            }).then(res => {
                if (res.data){
                    return res.data.username
                }
            })

            this.setState({
                recipeauthor_4: name,
                recipepic_4: base64Flag+imageStr_4
            })

        }
        
        this.setState({ index: this.state.index-4 })
        
    }

    gotoRecipe = (index, recipeid) => {
        this.setState({
            referrer: "/otherrecipe",
            recipeid: recipeid
        })
    }
    
    componentDidMount() {
        const { id } = this.state;
        this.getUsername(this.props.id);
        this.getRecipes(this.props.id);
    }
    
    render() {
        const {index, all_recipe_array} = this.state
        const {recipeid} = this.state
        const {recipeid_1, recipeid_2, recipeid_3, recipeid_4} = this.state
        const {recipeauthor_1, recipeauthor_2, recipeauthor_3, recipeauthor_4} = this.state
        let {referrer} = this.state;
        if (referrer) return <Redirect to={{
            pathname: referrer,
            state: {recipeid: recipeid}
        }} /> 

        return (
            <div className="home-container">
                <div className="home-name">Welcome {this.state.username}</div>
                <div className="home-greeting">Browse through recipes shared by our community</div>


                <div className="home-next-button">
                    <button 
                    onClick={() => this.nextRecipe()}
                    disabled={index+3 >= all_recipe_array.length-1}  
                    >Next</button>
                </div> 
                
                <div className="home-card-container">
                    {all_recipe_array[index] ?
                    <div className="card_1">
                        <div onClick={() => this.gotoRecipe(index, recipeid_1)}>
                            <div className="card-title_1" >{all_recipe_array[index].recipename}</div>
                            <img className="card-image_1" src={this.state.recipepic_1}/>
                            <div className="card-rating-title_1"> Rating</div>
                            <div className="card-rating_1">/5</div>
                            <div className="card-author_1">Author: {recipeauthor_1}</div>
                        </div> 
                    </div>
                    : <div></div>}

                    {all_recipe_array[index+1] ?
                    <div className="card_2">
                        <div onClick={() => this.gotoRecipe(index+1, recipeid_2)}>
                            <div className="card-title_2" >{all_recipe_array[index+1].recipename}</div>
                            <img className="card-image_2" src={this.state.recipepic_2}/>
                            <div className="card-rating-title_2"> Rating</div>
                            <div className="card-rating_2">/5</div>
                            <div className="card-author_2">Author: {recipeauthor_2}</div>
                        </div> 
                    </div>
                    : <div></div>}

                    {all_recipe_array[index+2] ?
                    <div className="card_3">
                        <div onClick={() => this.gotoRecipe(index+2, recipeid_3)}>
                            <div className="card-title_3" >{all_recipe_array[index+2].recipename}</div>
                            <img className="card-image_3" src={this.state.recipepic_3}/>
                            <div className="card-rating-title_3"> Rating</div>
                            <div className="card-rating_3">/5</div>
                            <div className="card-author_3">Author: {recipeauthor_3}</div>
                        </div> 
                    </div>
                    : <div></div>}

                    {all_recipe_array[index+3] ?
                    <div className="card_4">
                        <div onClick={() => this.gotoRecipe(index+3, recipeid_4)}>
                            <div className="card-title_4" >{all_recipe_array[index+3].recipename}</div>
                            <img className="card-image_4" src={this.state.recipepic_4}/>
                            <div className="card-rating-title_4"> Rating</div>
                            <div className="card-rating_4">/5</div>
                            <div className="card-author_4">Author: {recipeauthor_4}</div>
                        </div> 
                    </div>
                    : <div></div>}

                    <div className="home-prev-button">
                    <button 
                        onClick={() => this.prevRecipe()}
                        disabled={index === 0}
                        >Prev</button> 
                    </div> 
                </div>

            </div>
        );
    }
}


export default withRouter(Home)
