function pl(number, one, few, many) {
    let n = Math.abs(number);
    n = number % 100;
    if (n >= 5 && n <= 20) {
        return `${number} ${many}`;
    }
    n = number % 10;
    if (n === 1) {
        return `${number} ${one}`;
    }
    if (n >= 2 && n <= 4) {
        return `${number} ${few}`;
    }
    return `${number} ${many}`;
}

module.exports = pl;