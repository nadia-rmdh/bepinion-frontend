export const HandleChangeDropdown = (name, dataProps, value) => {
    let data = { ...dataProps }
    data[name] = value;
    return data;
}