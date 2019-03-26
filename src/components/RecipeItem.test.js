import React from 'react'
import { mount } from 'enzyme'
import RecipeItem, { breakBySearch, getString } from './RecipeItem'

describe('RecipeItem', () => {
    test('Should be RecipeItem', () => {
        const wrapper = mount(<RecipeItem />)

        expect(wrapper.is('RecipeItem')).toBeTruthy()
    })

    test('Should break the title based on searchString', () => {
        const searchString = 'Pota'
        const title = 'Potato and Cheese Frittata'

        expect(breakBySearch(searchString, title)).toEqual([
            'Pota',
            'to and Cheese Frittata'
        ])
    })

    test('Should ignore string case on breaking', () => {
        const searchString = 'POTA'
        const title = 'Potato and Cheese Frittata'

        expect(breakBySearch(searchString, title)).toEqual([
            'Pota',
            'to and Cheese Frittata'
        ])
    })

    test('Should break the title based on searchString', () => {
        const searchString = 'Pota'
        const title = 'cheddar cheese, eggs, olive oil, onions, potato, salt'

        expect(breakBySearch(searchString, title)).toEqual([
            'cheddar cheese, eggs, olive oil, onions, ',
            'pota',
            'to, salt'
        ])
    })

    test('Should mark title', () => {
        const searchString = 'Pota'
        const title = 'Potato and Cheese Frittata'
        const [marked, other] = breakBySearch(searchString, title)
        const markedElement = getString(searchString)(marked)
        const unMarkedElement = getString(searchString)(other)

        expect(markedElement.props.children).toEqual(searchString)
        expect(markedElement.type).toEqual('mark')
        expect(unMarkedElement.props.children).toEqual('to and Cheese Frittata')
        expect(unMarkedElement.type).toEqual(React.Fragment)
    })

    test('Should have string markup case insensitive', () => {
        const searchString = 'POTA'
        const title = 'Potato and Cheese Frittata'
        const [marked, other] = breakBySearch(searchString, title)
        const markedElement = getString(searchString)(marked)
        const unMarkedElement = getString(searchString)(other)

        expect(markedElement.props.children).toEqual('Pota')
        expect(markedElement.type).toEqual('mark')
        expect(unMarkedElement.props.children).toEqual('to and Cheese Frittata')
        expect(unMarkedElement.type).toEqual(React.Fragment)
    })

    test('Should mark ingredients', () => {
        const searchString = 'butter'
        const ingredients = 'brown sugar, butter, butter, powdered sugar, ' +
            'eggs, flour, nutmeg, rum, salt, vanilla extract, sugar'
        const [before, marked, after] = breakBySearch(searchString, ingredients)
        const beforeElement = getString(searchString)(before)
        const markedElement = getString(searchString)(marked)
        const afterElement = getString(searchString)(after)

        expect(beforeElement.props.children).toEqual('brown sugar, ')
        expect(beforeElement.type).toEqual(React.Fragment)
        expect(markedElement.props.children).toEqual(searchString)
        expect(markedElement.type).toEqual('mark')
        expect(afterElement.props.children)
            .toEqual(', butter, powdered sugar, eggs, flour, ' +
                'nutmeg, rum, salt, vanilla extract, sugar')
        expect(afterElement.type).toEqual(React.Fragment)
    })
})
