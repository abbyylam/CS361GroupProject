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
      showForm: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // On click we change our state – this will trigger our `render` method
    this.setState({ showForm: true });
  }

  handleForm = (event) => {
    event.preventDefault(); // stops form from "refreshing" automatically - it follows action, hence the refresh
    alert(`We Saved the Recipe: ${event.target.name.value} `); // show a simple dialog box with the values

    this.setState({ showForm: false });
    // INSERT DATABASE CODE
  };

  renderForm() {
    return (
      <div style={styles}>
        <form id="someForm" onSubmit={this.handleForm}>
          {/* the `onSubmit` event-listener of the form, calls the function*/}
          <label htmlFor="name">Recipe Name:</label>
          <input name="name" type="text" required />

          <input name="done" type="submit" />
        </form>
      </div>
    );
  }

  render() {
    // We get the state for showing the form from our components state
    const { showForm } = this.state;

    return (
      <div className="manage-app">
        
        <div onClick={this.onClick} style={{border: "2px solid"}} class="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" tabindex="0" role="button"><div class="dx-button-content"><span class="dx-button-text">Save Recipe</span></div></div>

        {/* We want to show the form if the state is true */}
        {showForm && this.renderForm()}
      </div>
    );
  }
}

export default ManageApp;
