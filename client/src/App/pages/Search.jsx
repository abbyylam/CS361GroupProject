import React, { useEffect, useState } from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { RecipeSearch } from '../requests/Api';

function Search({ history }) {
    const queryStrings = new URLSearchParams(window.location.search);
    const recipeNameFromUrl = queryStrings.get('name');
    const [searchValue, setSearchValue] = useState(recipeNameFromUrl);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchValue) {
            performSearch(searchValue);
        }
    }, []);

    history.listen((location, action) => {
        var newQueryStrings = new URLSearchParams(window.location.search);
        var newRecipeNameFromUrl = newQueryStrings.get('name');
        setSearchValue(newRecipeNameFromUrl);
        performSearch(newRecipeNameFromUrl);
    });

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    const onSearchSubmit = (e) => {
        performSearch(searchValue);
        e.preventDefault();
    };

    const performSearch = (name) => {
        RecipeSearch(name)
        .then(res => res.json())
        .then((result) => {
            setSearchResults(result);
        });
    };

    const createResultItem = (recipeName) => {
        return (
            <div className="row">
                {recipeName}
            </div>
        );
    }

    // Search menu
    const searchForm = (
        <form className="d-flex">
            <div className="mr-sm-2">
                <input className="form-control mr-sm-2" type="text" placeholder="Search for a recipe" aria-label="Search" value={searchValue} onChange={updateSearchValue} />
                <label><input name="showMine" type="checkbox"/> Show my recipes</label>
            </div>
            <div className="mr-sm-2">
                <button className="btn btn-dark" type="submit" onClick={onSearchSubmit}>Search</button>
            </div>
        </form>
    );

    // Result list
    const resultList = (
        searchResults.length > 0
        ? searchResults.map(x => createResultItem(x))
        : createResultItem('No results')
    );

    // Page
    const page = (
        <div className="d-flex flex-column">
            <div className="p-3 d-flex flex-row flex-grow-1">
                <div className="col-md-4">{searchForm}</div>
                <div className="col-md-8 border flex flex-column overflow-auto">{resultList}</div>
            </div>
        </div>
    );

  return (
    page
  );
}

export default withRouter(Search);