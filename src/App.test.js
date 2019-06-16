import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import td from 'testdouble'
import App from './pages/App'

const setUp = (props = {}) => {
    const component = shallow(<Header {...props} />)
    return component
}

// it('renders without crashing', () => {
//     const div = document.createElement('div')
//     ReactDOM.render(<App />, div)
//     ReactDOM.unmountComponentAtNode(div)
// })

it('displays the title', () => {
    const wrapper = shallow(<App />)
    //expect(wrapper.find('h1').text()).toEqual('An album')
    expect(wrapper.contains('An album')).toBe(true)
})

it('displays the img', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.containsMatchingElement(<img />)).toBe(true)
})

it('likes', () => {
    const onRate = () => {}
    const wrapper = shallow(<App onRate={onRate} />)

    expect(wrapper.containsMatchingElement(<Like onRate={onRate} />)).toBe(true)

    // const onRate = td.function('onRate')
    // const wrapper = mount(<App onRate={onRate} />)

    // wrapper.find('[data-icon="thumbsup"]').simulate('click')

    // td.verify(onRate(Rating.liked))
})

it('renders h1', () => {
    const output = renderer.create(<H1List h1list={list} onSelect={() => {}} />)
    expect(output).toMatchSnapshot()
})
