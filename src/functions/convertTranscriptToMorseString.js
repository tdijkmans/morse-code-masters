export function convertToMorseString(transcript, conversionTable) {
  let morseString = [];
  for (var i = 0; i <= transcript.length; i++) {
    let toConvertChar = transcript.substr(i, 1).toLowerCase();
    let convertedChar = conversionTable[toConvertChar];
    if (convertedChar === undefined) {
      convertedChar = " ";
    }
    morseString.push(convertedChar);
  }
  return morseString;
}
