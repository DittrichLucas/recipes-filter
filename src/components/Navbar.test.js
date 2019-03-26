import React from 'react'
import { mount, shallow } from 'enzyme'
import Navbar from './Navbar'

describe('Navbar', () => {
    test('Should be Navbar', () => {
        const wrapper = mount(<Navbar />)

        expect(wrapper.is('Navbar')).toBeTruthy()
    })

    test('Should contain the logo', () => {
        const wrapper = shallow(<Navbar />)

        expect(wrapper.find('img').get(0).props.src).toEqual('logo.png')
    })

    test('Should have an input with type equals "search"', () => {
        const wrapper = shallow(<Navbar />)

        expect(wrapper.find('input').get(0).props.type).toEqual('search')
    })

    test('Should update input value when searchString was changed', () => {
        const value = 'ging'
        const wrapper = shallow(
            <Navbar searchString={ value } onChange={ () => {} } />)

        expect(wrapper.find('input').get(0).props.value).toEqual(value)

        wrapper.setProps({ searchString: 'bread', onChange: () => {} })

        expect(wrapper.find('input').get(0).props.value).toEqual('bread')
    })
})
