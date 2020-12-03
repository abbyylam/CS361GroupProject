import React, { Component } from "react";
import { CreateRecipe } from '../requests/Api';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ManageApp extends Component {
  constructor(props) {
    super(props);

    // Here we initialize our components state
    this.state = {
      showForm: false,
      recipeIngredients: [],
      sharable: false,
      recipe: null
    };

    this.onClick = this.onClick.bind(this);
    this.sharedOnClick = this.sharedOnClick.bind(this);
    this.createRecipeObject = this.createRecipeObject.bind(this);
  }

  onClick() {
    // On click we change our state – this will trigger our `render` method
    this.setState({ showForm: true });

    // On click we iterate through the "saved recipe prop and push all text into recipeIngredients state"
    var recipeTextArray = []
    for (var i = 0; i < this.props.recipe.length; i++){
      recipeTextArray.push(this.props.recipe[i].text);
    }
    this.setState({recipeIngredients: recipeTextArray});
  }

  // Creates a recipe object to pass to API
  createRecipeObject(name) {
    let recipe = {
      "name" : name,
      "ingredients" : this.state.recipeIngredients,
      "shareable" : this.state.sharable
    }

    return recipe;
  }

  handleForm = (event) => {
    event.preventDefault(); // stops form from "refreshing" automatically - it follows action, hence the refresh
   // alert(`We Saved the Recipe: ${event.target.name.value}, Ingredients:  ${this.state.recipeIngredients}`); // show a simple dialog box with the values
   let recipe = this.createRecipeObject(event.target.name.value);
   CreateRecipe(recipe)
   .then(res => res.json())
   .then((result) => {
       if (result.success) {
         alert(result.message);
       }
       alert(result.message);
   });

    this.setState({ showForm: false });
    // INSERT DATABASE CODE
  };

  sharedOnClick(e) {
    this.setState({ sharable: !e.target.checked });
  }

  renderForm() {
    return (
      <div style={styles}>
        <form id="someForm" onSubmit={this.handleForm}>
          {/* the `onSubmit` event-listener of the form, calls the function*/}
          <label htmlFor="name">Recipe Name:</label>
          <input name="name" type="text" required />

          <input style={{width: "100px", height: "40px"}}name="done" type="submit" className="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" />
          <br></br>
          <input
          id="shared"
          type="checkbox"
          onClick={this.sharedOnClick}
          value={!this.state.sharable}
        ></input>
        <label for="shared">Share recipe with other users</label>
        </form>
      </div>
    );
  }

  render() {
    // We get the state for showing the form from our components state
    const { showForm } = this.state;

    return (
      <div className="manage-app">
        
        <div onClick={this.onClick} style={{border: "2px solid"}} className="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" tabIndex="0" role="button"><div className="dx-button-content"><span className="dx-button-text">Save Recipe</span></div></div>
        

        {/* We want to show the form if the state is true */}
        {showForm && this.renderForm()}

      </div>
    );
  }
}

export default ManageApp;
