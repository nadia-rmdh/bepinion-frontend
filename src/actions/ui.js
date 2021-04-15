export const SET_LOADER = "SET_LOADER";
export const SET_PANEL = "SET_PANEL";
export const PANEL_ADMIN = '2';
export const PANEL_USER = '3';

export const setLoader = ( isLoading ) => ({
    type: SET_LOADER,
    payload: isLoading
});

export const setPanel = (panel) => ({
    type: SET_PANEL,
    value: panel
})
