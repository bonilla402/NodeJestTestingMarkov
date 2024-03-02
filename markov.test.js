const { MarkovMachine } = require("./markov");


describe('markov machine', function () {
  test('makes chains', function () {
    let mm = new MarkovMachine("aa bb cc aa BB aa BB");

    expect(mm.chains).toEqual(new Map([
      ["aa", ["bb", "BB", "BB"]],
      ["bb", ["cc"]],
      ["cc", ["aa"]],
      ["BB", ["aa", null]]]));
  });

  test('generates semi-predictable text', function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });

  test('generates valid text', function () {
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText();
    expect(output.endsWith('hat')).toBe(true);
  });

  test('cuts off at length', function () {
    let mm = new MarkovMachine("the cat in the hat");
    const maxLength = 2;
    let output = mm.makeText(maxLength);

    // Remove leading and trailing whitespaces and split the string by whitespaces
    const words = output.trim().split(/\s+/);

    expect(words.length).toBeLessThanOrEqual(maxLength)
  });
});
