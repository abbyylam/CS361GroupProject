import React, { Component } from "react";

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
      location: false
    };

    this.onClick = this.onClick.bind(this);
    this.sharedOnClick = this.sharedOnClick.bind(this);
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

  handleForm = (event) => {
    event.preventDefault(); // stops form from "refreshing" automatically - it follows action, hence the refresh
    alert(`We Saved the Recipe: ${event.target.name.value}, Ingredients:  ${this.state.recipeIngredients}`); // show a simple dialog box with the values

    this.setState({ showForm: false });
    // INSERT DATABASE CODE
  };

  sharedOnClick(e) {
    this.setState({ location: !e.target.checked });
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
          value={!this.state.location}
          onChange={console.log(this.state.location)}
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
