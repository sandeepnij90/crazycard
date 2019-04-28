import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })
import CardList from '../CardList';

describe('<CardList>', () => {
    it('should render cardlist', () => {
        const wrapper = shallow(<CardList />);
        expect(wrapper.find('[data-qa="card-list"]').exists()).toEqual(true);
    })

    it('should render 3 cards if there are 3 available cards', () => {
        const wrapper = shallow(<CardList availableCards={[{ cardKey: 0 }, { cardKey: 1 }, { cardKey: 2 } ]} />);
        expect(wrapper.find('Card').length).toEqual(3);
    });

    it('should update the state when card has been clicked', () => {
        const wrapper = mount(<CardList availableCards={[{ cardKey: 0 }, { cardKey: 1, creditAvailable: 2000 }, { cardKey: 2 }]} />);
        wrapper.find('Card').at(1).simulate('click');
        expect(wrapper.state('selectedKeys')).toEqual([1]);
        expect(wrapper.state('totalCredit')).toEqual(2000)
    })
})