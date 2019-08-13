import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import "@babel/polyfill";
import "regenerator-runtime/runtime";

import { recipes } from "./tempList";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";

export default class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=d16eab216a51abdafb5c4c8f27d41daf",
    details_id: 35379,
    pageIndex: 1
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
        recipes: jsonData.recipes
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
          />
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  render() {
    // console.log(this.state.recipes);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}
