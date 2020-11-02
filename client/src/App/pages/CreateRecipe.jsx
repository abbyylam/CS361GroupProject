import React from 'react';
import SelectBox from "devextreme-react/select-box";
import List from "devextreme-react/list";
import ArrayStore from "devextreme/data/array_store";
import { tasks } from "../components/createRecipeIngListData"
import "../components/createRecipe.css";
import { Link, withRouter } from 'react-router-dom';

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
    //console.log("HERE IS THE ITEM");
    //console.log(item[0]);
    const newItem = { id: this.state.saved.id + 1, text: item[0] };
    //this.setState({ saved: tasks });
    //var newList = [];
    //newList.push(item)
    //console.log("THIS IS NEW LIST" + newList)
    var list = this.state.saved.slice();
    list.push(newItem);
    this.setState({ saved: list });

    console.log("THIS IS SAVED" + this.state.saved);
  }

  removeClick(item) {
    //console.log("REMOVE CLICKED");
    ///console.log(item[0].text);
    //console.log(this.state.saved);
    //const newItem = { id: this.state.saved.id + 1, text: item[0] };
    //this.setState({ saved: tasks });
    //var newList = [];
    //newList.push(item)
    //console.log("THIS IS NEW LIST" + newList)
    //var list = this.state.saved.slice();
    //list.push(newItem);
    //this.setState({ saved: list });
    var array = this.state.saved.slice();

    for (var i = 0; i < this.state.saved.length; i++) {
      if (this.state.saved[i].text == item[0].text) {
        array.splice(i, 1);
      }
    }
    this.setState({ saved: array });
    //console.log("THIS IS SAVED" + this.state.saved[0].text);
  }
  render() {
    return (
      <React.Fragment>
        <div className="parent">
          <div id="wrapper" className="center wide">
            <p style={{ textAlign: "center" }}> INGREDIENT LIST! </p>
            <List
              dataSource={dataSource}
              height={400}
              showSelectionControls={true}
              selectionMode={this.state.selectionMode}
              selectAllMode={this.state.selectAllMode}
              selectedItemKeys={this.state.selectedItemKeys}
              onOptionChanged={this.onSelectedItemKeysChange}
            ></List>
          </div>

          <div id="wrapper" className="center2 narrow">
            <p style={{ textAlign: "center" }}> MY RECIPE! </p>
            <List
              dataSource={this.state.saved}
              height={400}
              showSelectionControls={true}
              selectionMode={this.state.selectionMode}
              selectAllMode={this.state.selectAllMode}
              selectedItemKeys={this.state.selectedItemKeys}
              onOptionChanged={this.onSelectedItemKeysChange}
            ></List>
          </div>
        </div>
        <div className="parent2">
          <div id="wrapper2" className="center wide">
            <button style={{float: "left",width: "18.5vw"}} onClick={() => this.addClick(this.state.selectedItemKeys)}>
              {" "}
              Add{" "}
            </button>
          </div>
          <button onClick={() => this.removeClick(this.state.selectedItemKeys)}>
            {" "}
            Remove{" "}
          </button>
          <button onClick="">
            {" "}
            Save{" "}
          </button>
        </div>
      </React.Fragment>
    );
  }
}


export default withRouter(CreateRecipe);