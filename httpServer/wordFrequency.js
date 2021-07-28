function wordFrequency(text) {
    let sepGroup = /((\s(\k<grp>|-)\s)|(?<grp>[\r\n\s,\.?!;:"\(\)]+)|((\k<grp>|-)\s)|(\s(\k<grp>|-))|('(?=\s)|(?<=\s)'))(?!$)/gm;
    let words = text.toLowerCase().replace(/[\r\n\s,\.?!;:'"\(\)]+$/gm, '').replace(sepGroup, ' ').split(' ');
    const wordsMap = new Map();
    for(let i = 0; i < words.length; i += 1) {
        if(wordsMap.has(words[i])) {
            wordsMap.set(words[i], wordsMap.get(words[i]) + 1);
        } else {
            wordsMap.set(words[i], 1);
        } 
    }
    return wordsMap;
}

//console.log(wordFrequency('Чистики - небольшие птицы.Чистики (живут) как-то в открытом море.\nТолько на время гнездования, выходят чистики на берег "Чистики" гнездятся на: каменных островах. Гнездовья морских чистиков надежно защищены от врагов? '))
module.exports = wordFrequency;
