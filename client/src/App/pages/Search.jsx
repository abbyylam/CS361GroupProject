import React, { useState } from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';

function Search({ history }) {
    const queryStrings = new URLSearchParams(window.location.search);
    const recipeNameFromUrl = queryStrings.get('name');
    const [searchValue, setSearchValue] = useState(recipeNameFromUrl);

    history.listen((location, action) => {
        var newQueryStrings = new URLSearchParams(window.location.search);
        var newRecipeNameFromUrl = newQueryStrings.get('name');
        setSearchValue(newRecipeNameFromUrl);
    });

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    // Search menu
    const searchForm = (
        <form className="d-flex">
            <div className="mr-sm-2">
                <input className="form-control mr-sm-2" type="text" placeholder="Search for a recipe" aria-label="Search" value={searchValue} onChange={updateSearchValue} />
                <label><input name="showMine" type="checkbox"/> Show my recipes</label>
            </div>
            <div className="mr-sm-2">
                <button className="btn btn-dark" type="submit">Search</button>
            </div>
        </form>
    );

    // Results menu

    // Page
    const page = (
        <div className="p-3 d-flex flex-row flex-grow-1">
            <div className="col-md-4">{searchForm}</div>
            <div className="col-md-8 border flex flex-column">No results</div>
        </div>
    );

  return (
    page
  );
}

export default withRouter(Search);