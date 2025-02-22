const filterReducer = (state="", action) => {
    switch(action.type){
        case "FILTER":{
            return action.payload
        }
        default:
            return state
    }
}

//action creator: filter
export const applyFilter = (value) => {
    return {
        type: "FILTER",
        payload: value
    }
}


export default filterReducer