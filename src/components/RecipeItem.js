import React, { Fragment } from 'react'

export const breakBySearch = (searchString = '', item = '') => {
    const index = item.toUpperCase().indexOf(searchString.toUpperCase())

    if (index <= -1) {
        return [item]
    }

    return [
        item.slice(0, index),
        item.slice(index, index + searchString.length),
        item.slice(index + searchString.length)
   ].filter(piece => piece !== '')
}

export const getString = searchString => piece => {
    if (searchString && piece.toUpperCase() === searchString.toUpperCase()) {
        return <mark key={ piece }>{ piece }</mark>
    }

    return (
        <Fragment key={ piece }>
            { piece }
        </Fragment>
    )
}

const RecipeItem = ({ title, ingredients, searchString, thumbnail, href }) => (
    <div className="col-sm-3 mt-4">
        <div className="card">
            <a
                href={ href }
                target='_blank'
                rel="noopener">
                <img
                    className="card-img-top img-fluid"
                    src={ thumbnail }
                    alt={ title }
                />
            </a>
            <div className="card-body">
                <h5 className="card-title">
                    {
                        breakBySearch(searchString, title)
                            .map(getString(searchString))
                    }
                </h5>
                <p className="card-text">
                    <strong>Ingredients: </strong>
                    {
                        breakBySearch(searchString, ingredients)
                            .map(getString(searchString))
                    }
                </p>
            </div>
        </div>
    </div>
)

export default RecipeItem