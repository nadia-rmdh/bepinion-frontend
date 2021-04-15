export const HandleChangeInput = (dataProps, e) => {
    let data = { ...dataProps }
    data[e.target.name] = e.target.value;
    return data;
}