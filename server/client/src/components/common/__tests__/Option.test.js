import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Option from '../Option/Option';
Enzyme.configure({ adapter: new Adapter() });

describe('<Option>', () => {
    it('should render Option component', () => {
        const wrapper = shallow(<Option handleClick={() => {}} options={[]}/>);
        expect(wrapper.find('[data-qa="option"]').exists()).toEqual(true);
    });

    it('should render all the options provided in props', () => {
        const wrapper = shallow(<Option handleClick={() => { }} options={['option 1', 'option 2', 'option 3']} />);
        expect(wrapper.find('[data-qa="option"]').find('li').length).toEqual(3);
    });

    it('should handle click from parent component', () => {
        const func = jest.fn();
        const wrapper = shallow(<Option handleClick={func}  options={['option 1', 'option 2', 'option 3']} />);
        wrapper.find('[data-qa="option"]').find('li').at(2).simulate('click');
        expect(func).toBeCalled();
    })
})