import * as actionType from './actions';
import faker from 'faker';

const initialState = {
    persons: [],
}

const reducer = (state = initialState, action) => {
    let newPersons = state.persons.map( per => {
        return Object.assign({}, per);
    });

    switch(action.type){
        case actionType.ADD_PERSON:
            // console.log('adding person');
            console.log(action);
            if(action.name.length >= 1 && action.age > 0){
                const newPerson = {
                    id: Math.random(), // not really unique but good enough here!
                    name: action.name,
                    age: action.age
                };
                newPersons.push(newPerson);
            } else {
                const newPerson = {
                    id: Math.random(), // not really unique but good enough here!
                    name: faker.name.firstName(),
                    age: Math.floor( Math.random() * 40 )
                };
                newPersons.push(newPerson);
            }
            break
        case actionType.REMOVE_PERSON:
            // console.log('removing person ' + action.person_id);
            newPersons = newPersons.filter( p => p.id !== action.person_id)
            break
        default:
            break;
    }

    return {
        ...state,
        persons: newPersons,
    }
}

export default reducer;