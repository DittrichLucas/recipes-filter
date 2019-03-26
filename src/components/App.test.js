import React from 'react'
import { mount, shallow } from 'enzyme'
import App, { normalize } from './App'
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'

describe('App', () => {
    test('Should be App', () => {
        const wrapper = mount(<App />)

        expect(wrapper.is('App')).toBeTruthy()
    })

    test('Should contain the search', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.find(Navbar)).toBeTruthy()
    })

    test('Should contain the some recipe item', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.find(RecipeItem)).toBeTruthy()
    })

    test('Should have initial state searchString as empty', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.state('searchString')).toEqual('')
    })

    test('Should change searchString', () => {
        const wrapper = shallow(<App />)
        const value = 'a'

        wrapper.instance().handleChange({ target: { value }})

        expect(wrapper.state('searchString')).toEqual(value)
    })

    test('Should update listed items when changing searchString', () => {
        const wrapper = shallow(<App />)
        const value = 'ging'

        wrapper.instance().handleChange({ target: { value }})

        const items = wrapper.instance().getBrowseItems()

        expect(items).toHaveLength(2)
    })

    test('Should uppercase an string', () => {
        const value = 'ging'

        expect(normalize(value)).toEqual('GING')
    })
})
