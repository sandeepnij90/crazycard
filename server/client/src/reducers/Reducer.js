import { UPDATE_USER_DETAILS, GET_CARDS, UPDATE_VIEW } from '../actions/types';

const initState = {
    userDetails: {
        name: '',
        dob: '',
        houseNumber: '',
        street: '',
        postcode: '',
        income: '',
        employmentStatus: 'Full Time',
        dobDay:'',
        dobMonth:'',
        dobYear:'',
        town: ''
    },
    availableCards:[],
};

const Reducer = (state = initState, action) => {
    const { details, availableCards } = action;

    switch(action.type) {
        case UPDATE_USER_DETAILS: 
            return { ...state, userDetails: { ...details } }
        case GET_CARDS:
            return { ...state, availableCards: [... availableCards]  }
        default: return state
    }
}

export default Reducer;