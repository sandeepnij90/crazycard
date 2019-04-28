import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })
import Card from '../Card';

describe('<Card>', () => {
    it('should render a card', () => {
        const wrapper = shallow(<Card />);
        expect(wrapper.find('[data-qa="card"]').exists()).toEqual(true);
    });
});