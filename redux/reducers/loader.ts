import { string } from "yup";
import { types } from "../actions/types";

const initialState = {
    isLoading: false,
};

const loader = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case types.OPEN_LOADER:
            return {
                ...state,
                isLoading: true,
            };
        case types.CLOSE_LOADER:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default loader;
