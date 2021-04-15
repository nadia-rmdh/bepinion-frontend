export function IsPdf(url) {
    const extension = url.substr((url.lastIndexOf('.') + 1))
    return extension === 'pdf'
}
