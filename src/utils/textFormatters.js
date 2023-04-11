export const capitaliseLine = (line) => {
    let words = line.split(' ');
    words.map((word, idx) => {
        words[idx] = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    return words.join(' ');
}