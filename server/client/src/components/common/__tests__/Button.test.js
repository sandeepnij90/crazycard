import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Button from '../Button/Button';

describe('<Button />', () => {
    it('should render', () => {
        const wrapper = shallow(<Button text="button" onClick={() => {}}/>)
        expect(wrapper.find('[data-qa="button"]').exists()).toEqual(true);
    })

    it('should disable button if disabled button is passed', () => {
        const wrapper = shallow(<Button  disabled={true} text="button" onClick={() => {}} />)
        expect(wrapper.find('[data-qa="button"]').prop('disabled')).toEqual(true);
    })

    it('should call a function when onClick is passed', () => {
        const func = jest.fn()
        const wrapper = shallow(<Button onClick={func} text="button" />);
        wrapper.find('[data-qa="button"]').simulate('click');
        expect(func).toBeCalled();
    });
})