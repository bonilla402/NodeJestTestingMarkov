/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], 
   * "cat": ["in"],
   *  "in": ["the"],
   *  "hat": [null]} */



  makeChains() {
    this.chains = new Map();

    // Loop through each index of the array
    for (let i = 0; i < this.words.length; i++) {
        // Retrieve the word at the current index
        const word = this.words[i];
        
        // Get the existing chain array for the word, or initialize it to an empty array if it doesn't exist
        const chain = this.chains.get(word) || [];
        
        // Increment the chain for this occurrence of the word by pushing a new word
        if (i + 1 < this.words.length) {
            chain.push(this.words[i + 1]);
        } else {
            chain.push(null);
        }

        // Update the chain array for the word in the Map
        this.chains.set(word, chain);
    }
/*
      //Print the entire Map
        this.chains.forEach((value, key) => {
          console.log(key, value);
      });
*/      
}


  /** return random text from chains */

  makeText(numWords = 100) {
    
    const keysArray = Array.from(this.chains.keys());
    const randomIndex = this.getRandomIndex(keysArray.length);
    const start = keysArray[randomIndex];
    this.output = [];
    this.output.push(start);
    this.appendNextWord(start, numWords);

    return this.output.join(" ");
  }

  appendNextWord(word, numWords)
  {
    const chain = this.chains.get(word);
    const chainIndex = this.getRandomIndex(chain.length);
    let nextWord = chain[chainIndex];

    if(nextWord && this.output.length < numWords){
      this.output.push(nextWord);
      this.appendNextWord(nextWord, numWords);
    }
    
  }

  getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

}

/*
let mm = new MarkovMachine("the cat in the hat");
let text = mm.makeText(6);
console.log(text);*/

module.exports = {
  MarkovMachine,
};