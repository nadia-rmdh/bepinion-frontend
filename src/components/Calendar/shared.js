export const iconClassByOptionType = {
    'personnel': 'icon-user text-success',
    'unit'     : 'icon-organization text-info',
    'job'      : 'icon-briefcase text-pink',
    'email'    : 'icon-envelope text-muted',
    'all'      : 'icon-people text-dark',
};

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
