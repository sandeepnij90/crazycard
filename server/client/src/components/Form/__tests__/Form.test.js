import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from '../Form';
Enzyme.configure({ adapter: new Adapter() });

describe('<Form>', () => {
    it('should render', () => {
        const wrapper = shallow(<Form />)
        expect(wrapper.find('[data-qa="form"]').exists()).toEqual(true);
    });

    it('should have one title with the text Your details', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.find('[data-qa="title"]').text()).toEqual('Your details')
    });

    it('should throw error when date of birth is invalid', () => {
        const wrapper = shallow(<Form />);
        wrapper.find('[data-qa="dob"]').find('input').at(0).simulate('change', { target: { value: 'ee'}});
        wrapper.find('[data-qa="dob"]').find('input').at(1).simulate('change', { target: { value: 'ee'}});
        wrapper.find('[data-qa="dob"]').find('input').at(2).simulate('change', { target: { value: 'ee'}});
        wrapper.find('[data-qa="form-button"]').simulate('click');
        expect(wrapper.state('dobDayError')).toEqual(true);
        expect(wrapper.state('dobMonthError')).toEqual(true);
        expect(wrapper.state('dobYearError')).toEqual(true);
    });

    it('should update the dob if day month and year is valid', () => {
        const wrapper = shallow(<Form changeView={() => {}}/>);
        wrapper.find('[data-qa="dob"]').find('input').at(0).simulate('change', { target: { value: '20' } });
        wrapper.find('[data-qa="dob"]').find('input').at(1).simulate('change', { target: { value: '11' } });
        wrapper.find('[data-qa="dob"]').find('input').at(2).simulate('change', { target: { value: '1990' } });
        wrapper.find('[data-qa="form-button"]').simulate('click');
        expect(wrapper.state('dob')).toEqual('20-11-1990');
    })

    it('should throw error when annual income is invalid', () => {
        const wrapper = shallow(<Form />);
        wrapper.find('[data-qa="annual-income"]').simulate('change', { target: { value: 'not a number!!' } });
        wrapper.find('[data-qa="form-button"]').simulate('click');
        expect(wrapper.state('incomeError')).toEqual(true)
    });

    it('should display red error if dob/annual income fields have error', () => {
        const wrapper = shallow(<Form />);
        wrapper.find('[data-qa="dob"]').find('input').at(0).simulate('change', { target: { value: 'ee' } });
        wrapper.find('[data-qa="dob"]').find('input').at(1).simulate('change', { target: { value: 'ee' } });
        wrapper.find('[data-qa="dob"]').find('input').at(2).simulate('change', { target: { value: 'ee' } });
        wrapper.find('[data-qa="annual-income"]').simulate('change', { target: { value: 'not a number!!' } });
        wrapper.find('[data-qa="form-button"]').simulate('click');
        expect(wrapper.find('[data-qa="dob"]').find('input').at(0).hasClass('error')).toEqual(true);
        expect(wrapper.find('[data-qa="dob"]').find('input').at(1).hasClass('error')).toEqual(true);
        expect(wrapper.find('[data-qa="dob"]').find('input').at(2).hasClass('error')).toEqual(true);
        expect(wrapper.find('[data-qa="annual-income"]').hasClass('error')).toEqual(true);
    })

    it('should remove error when changing field', () => {
        const wrapper = shallow(<Form />);
        wrapper.find('[data-qa="annual-income"]')
        wrapper.find('[data-qa="annual-income"]').simulate('change', { target: { value: 'not a number!!' } });
        wrapper.find('[data-qa="form-button"]').simulate('click');
        expect(wrapper.find('[data-qa="annual-income"]').hasClass('error')).toEqual(true);
        expect(wrapper.state('incomeError')).toEqual(true);
        wrapper.find('[data-qa="annual-income"]').simulate('change', { target: { value: '200' } });
        expect(wrapper.state('incomeError')).toEqual(false);
        expect(wrapper.find('[data-qa="annual-income"]').hasClass('error')).toEqual(false);
    });

    it('should disable search field if any fields are empty', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.find('[data-qa="form-button"]').prop('disabled')).toEqual(true);
    })
})