import React, { Component } from 'react';
import { Option, Button } from '../common';
import { isValidDate } from '../../utils/validateDate';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            houseNumber: '',
            street: '',
            town: '',
            postcode: '',
            dob: '',
            dobDay: '',
            dobMonth: '',
            dobYear: '',
            income: '',
            employmentStatus: 'Full Time',
            dobDayError: false,
            dobMonthError: false,
            dobYearError: false,
            incomeError: false,
        }
    }

    componentDidMount() {
        // to retain user information
        const { name, houseNumber, street, town, postcode, income, dob, employmentStatus, dobDay, dobMonth, dobYear } = this.props.userDetails;
        this.setState({
            name,
            houseNumber,
            street,
            town,
            postcode,
            income,
            dob,
            dobDay,
            dobMonth,
            dobYear,
            employmentStatus
        })
    }

    handleFieldChange = (field, e) => {
        const isDob = field === 'dobDay' || field === 'dobMonth' || field === 'dobYear';

        if (isDob) {
            this.setState({
                dobDayError: false,
                dobMonthError: false,
                dobYearError: false,
            })
        }

        if (field === 'income') {
            this.setState({
                incomeError: false
            })
        }

        this.setState({
            [field]: e.target.value,
        });
    }

    validate = () => {
        const { dobDay, dobMonth, dobYear, income } = this.state;
        const errors = [];
        if (!isValidDate(dobDay, dobMonth, dobYear)) {
            this.setState({
                dobDayError: true,
                dobMonthError: true,
                dobYearError: true,
            })
            errors.push(true);
        } else {
            this.setState({
                dob: `${dobDay}-${dobMonth}-${dobYear}`
            })
        }
        if (isNaN(income)) {
            this.setState({
                incomeError: true
            })
            errors.push(true);
        }
        if(!errors.length) this.getCards()
        
    }

    handleOption = option => {
        this.setState({'employmentStatus': option})
    }

    isFieldsEmpty = () => {
        const {
            name,
            houseNumber,
            street,
            town,
            postcode,
            dob,
            dobDay,
            dobMonth,
            dobYear,
            income
        } = this.state;

        return !name || !houseNumber || !street || !town || !postcode || !dobDay || !dobMonth || !dobYear || !income
    }

    getCards = () => {
        const { name, dob, houseNumber, street, town, postcode, income, employmentStatus, dobDay, dobMonth, dobYear, dobDayError, dobMonthError, dobYearError, incomeError } = this.state;
        if (!dobDayError && !dobMonthError && !dobYearError && !incomeError) {
            const details = { name, dob, dobDay, dobMonth, dobYear, houseNumber, street, town, postcode, income, employmentStatus };
            this.props.updateUserDetails(details);
            this.props.getCards(details);
            this.props.changeView();
        }
    }

    render() {
        const { dobDayError, dobMonthError, dobYearError, incomeError } = this.state;
        const dobError = dobDayError || dobMonthError || dobYearError;
        return (
            <div className="form" data-qa="form">
                <h2 data-qa="title">Your details</h2>
                <div className="fields">
                    <div className="personal">
                        <div className="personal__name">
                            <label>Full name</label>
                            <input type="text" onChange={e => this.handleFieldChange('name', e)} value={this.state.name}/>
                        </div>

                        <div className="personal__dob">
                           <label>Date of birth (DD-MM-YYYY)</label>
                            {dobError && <span className="field-error">Please enter a correct date of birth DD-MM-YYYY</span>}

                            <div data-qa="dob" className="dates">
                                <input className={dobDayError ? 'error' : ''} type="text" maxLength="2" onChange={e => this.handleFieldChange('dobDay', e)} value={this.state.dobDay}></input>
                                <input className={dobMonthError ? 'error' : ''} type="text" maxLength="2" onChange={e => this.handleFieldChange('dobMonth', e)} value={this.state.dobMonth}></input>
                                <input className={dobYearError ? 'error' : ''} type="text" maxLength="4" onChange={e => this.handleFieldChange('dobYear', e)} value={this.state.dobYear}></input>
                            </div>
                        </div>

                        <div className="personal__address">
                            <label>House Number</label>
                            <input type="text" className="personal__address__housenumber" onChange={e => this.handleFieldChange('houseNumber', e)} value={this.state.houseNumber} />

                            <label>Street</label>
                            <input type="text" className="personal__address__street" onChange={e => this.handleFieldChange('street', e)} value={this.state.street}/>

                            <label>Town</label>
                            <input type="text" className="personal__address__town" onChange={e => this.handleFieldChange('town', e)} value={this.state.town} />


                            <label>Postcode</label>
                            <input type="text" className="personal__address__postcode" onChange={e => this.handleFieldChange('postcode', e)} value={this.state.postcode}/>
                        </div>

                        <div className="personal__finance">
                        <label>Employment Status</label>
                        <Option handleClick={this.handleOption} activeOption={this.state.employmentStatus} options={['Full Time', 'Self Employed', 'Unemployed', 'Student', 'Part time', 'Homemaker', 'Retired']} />
                        <label>Annual income (£)</label>
                        {incomeError && <span className="field-error">Please enter a correct annual income</span>}
                            <input data-qa="annual-income" className={incomeError ? 'error' : ''} type="text" onChange={e => this.handleFieldChange('income', e)} value={this.state.income}/> 
                        </div>
                    </div>
                </div>
                <Button data-qa="form-button" className="form__button" text="Find credit cards now" onClick={this.validate} disabled={this.isFieldsEmpty()} title={this.isFieldsEmpty() ? 'Please complete all fields' : ''} />
            </div>
        )
    }
}

Form.propTypes = {
    updateUserDetails: PropTypes.func,
    userDetails: PropTypes.shape({}),
    getCards: PropTypes.func,
    changeView: PropTypes.func
}

Form.defaultProps = {
    userDetails: {},
    updateUserDetails: () => {},
    getCards: () => {},
    changeView: () => {}
}

export default Form;