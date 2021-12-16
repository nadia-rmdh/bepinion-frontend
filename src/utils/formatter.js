import React from 'react';
import numeral from 'numeral';

numeral.register('locale', 'indonesia', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'rb',
        million: 'jt',
        billion: 'M',
        trillion: 'T'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'IDR'
    }
});
numeral.locale('indonesia')

export function convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka?.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';

    return rupiah.split('', rupiah.length - 1).reverse().join('');
}

export function convertNumberCurrencies(n) {
    const ranges = [
        { divider: 1e18, suffix: 'E' },
        { divider: 1e15, suffix: 'P' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'B' },
        { divider: 1e6, suffix: 'mio' },
        { divider: 1e3, suffix: 'k' }
    ];

    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return <div className="d-flex justify-content-center align-items-baseline">{(n / ranges[i].divider).toFixed(1).toString()}<span style={{ fontSize: 20 }}>{ranges[i].suffix}</span></div>;
        }
    }
    return n.toString();
}

export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (d.toString() === 'Invalid Date') {
        return null;
    }

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function dataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
}

export function matchWildcard(str, wildcard) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    return new RegExp("^" + wildcard.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

export function convertNumber(numb, format = '0.0a') {
    return numeral(numb).format(format)
}
