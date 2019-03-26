import React, { Component } from 'react'
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

export const normalize = text => text.toUpperCase()
export const filterRecipes = (recipes, searchString) => recipes
    .filter(recipe => {
        const title = normalize(recipe.title)
        const ingredients = normalize(recipe.ingredients)

        return title.includes(normalize(searchString))
        || ingredients.includes(normalize(searchString))
    })

class App extends Component {
    constructor(props) {
        super(props)
        this.recipes = recipes.results
        this.state = { searchString: '' }
    }

    handleChange = (e) => {
        this.setState({ searchString: e.target.value })
    }

    getBrowseItems() {
        return filterRecipes(this.recipes, this.state.searchString)
    }

    render() {
        const recipes = this.getBrowseItems()

        return (
            <div className="App">
                <Navbar
                    searchString={ this.state.searchString }
                    onChange={ this.handleChange }
                />
                <div className="container mt-10">
                    <div className="row">
                        {
                            recipes.map(recipe =>
                                <RecipeItem
                                    key={ recipe.title }
                                    title={ recipe.title }
                                    thumbnail={ recipe.thumbnail }
                                    href={ recipe.href }
                                    ingredients={ recipe.ingredients }
                                    searchString={ this.state.searchString }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default App
