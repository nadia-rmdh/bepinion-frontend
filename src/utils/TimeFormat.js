const TimeFormat = time => {
    let splits = time.split(/[ :]/);
    return `${splits[0]}:${splits[1]}`;
};

export default TimeFormat;
