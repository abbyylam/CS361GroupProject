import React from 'react';
import List from "devextreme-react/list";
import ArrayStore from "devextreme/data/array_store";
import { tasks } from "../components/createRecipeIngListData"
import "../components/createRecipe.css";
import  ManageApp  from "../components/savedForm"
import { withRouter } from 'react-router-dom';
import CRModal from "../components/CRModal.js"

const dataSource = new ArrayStore({
  key: "text",
  data: tasks
});

class CreateRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      selectionMode: "single",
      selectAllMode: "page",
      selectedItemKeys: [],
      saved: [],
      numSaved: 0
    };
    this.onSelectionModeChange = this.onSelectionModeChange.bind(this);
    this.onSelectAllModeChange = this.onSelectAllModeChange.bind(this);
    this.onSelectedItemKeysChange = this.onSelectedItemKeysChange.bind(this);
  }

  onSelectionModeChange(args) {
    this.setState({
      selectionMode: args.value
    });
  }

  onSelectAllModeChange(args) {
    this.setState({
      selectAllMode: args.value
    });
  }

  onSelectedItemKeysChange(args) {
    if (args.name === "selectedItemKeys") {
      this.setState({
        selectedItemKeys: args.value
      });
    }
  }

  addClick(item) {
    const newItem = { id: this.state.saved.id + 1, text: item[0] };
    var list = this.state.saved.slice();
    list.push(newItem);
    this.setState({ saved: list });
  }

  removeClick(item) {
    var array = this.state.saved.slice();

    for (var i = 0; i < this.state.saved.length; i++) {
      if (this.state.saved[i].text == item[0].text) {
        array.splice(i, 1);
      }
    }
    this.setState({ saved: array });
  }

  newIngredientList(source) {
      return (
          <List
            text="white"
            dataSource={source}
            height={400}
            showSelectionControls={true}
            selectionMode={this.state.selectionMode}
            selectAllMode={this.state.selectAllMode}
            selectedItemKeys={this.state.selectedItemKeys}
            onOptionChanged={this.onSelectedItemKeysChange}
        ></List>
        );
  }

  render() {
    return (
      <React.Fragment>
         <CRModal/>
        <div className="parent" style={{backgroundColor: "#282c34", color: "white"}}>
          <div id="wrapper" className="center wide"style={{color: "white"}}>
            <p style={{ textAlign: "center" }}> INGREDIENT LIST! </p>
            { this.newIngredientList(dataSource) }
          </div>

          <div id="wrapper" className="center2 narrow">
            <p style={{ textAlign: "center" }}> MY RECIPE! </p>
            { this.newIngredientList(this.state.saved) }
          </div>
        </div>
        <div className="parent2">
          <div id="wrapper2" className="center wide">
          <div onClick={() => this.addClick(this.state.selectedItemKeys)} style={{float: "left",width: "18.5vw", border: "2px solid"}} className="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" tabIndex="0" role="button"><div className="dx-button-content"><span className="dx-button-text">Add Ingredient</span></div></div>

          </div>
          <div id="wrapper2" className="center wide">

          <div onClick={() => this.removeClick(this.state.selectedItemKeys)} style={{float: "right",width: "18.5vw", border: "2px solid"}}className="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" tabIndex="0" role="button"><div className="dx-button-content"><span className="dx-button-text">Remove Ingredient</span></div></div>
          </div>
         
        </div>
        <ManageApp recipe={this.state.saved}/>
      </React.Fragment>
    );
  }
}


export default withRouter(CreateRecipe);