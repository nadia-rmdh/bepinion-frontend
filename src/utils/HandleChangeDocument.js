export const HandleChangeDocument = (dataProps, e) => {
    if (e.target.files.length) {
        let data = { ...dataProps };
        let preview = [];
        data['document'] = e.target.files[0];
        preview['preview'] = URL.createObjectURL(e.target.files[0]);
        preview['previewType'] = e.target.files[0].type;
        preview['previewName'] = e.target.files[0].name;
        return { data: data, preview: preview };
    }
}