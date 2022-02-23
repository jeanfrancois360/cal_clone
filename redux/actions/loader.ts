import { types } from "./types";

export const openLoader = () => {
    return {
        type: types.OPEN_LOADER,
    };
};

export const closeLoader = () => {
    return {
        type: types.CLOSE_LOADER,
    };
};
