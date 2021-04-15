import store from './store';
export const READ_COMPANY_PROFILE = 'read company profile';
export const WRITE_COMPANY_PROFILE = 'write company profile';


function userCan(privilegeNames) {
    const { user } = store.getState();
    
    return privilegeNames.every(p => user.privileges.includes(p));
}