export function convertMorseStringToChars(morseString) {
  let morseStringChars = [];
  morseString.map(function (c) {
    for (let i = 0; i < c.length; i++) {
      morseStringChars.push(c[i]);
    }
  });
  return morseStringChars;
}
