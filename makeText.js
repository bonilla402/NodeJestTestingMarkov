/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios'); // legacy way
const markov = require("./markov");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }


function ReadFile(path)
{
    fs.readFile(path, 'utf8', function(err, data) {

        if (err) {
          // handle possible error
          console.error(`Error reading ${path}:
          Error: ${err.message}`);
          // kill the process and tell the shell it errored
          process.exit(1);
        }

        generateText(data);

      });
}

function ReadUrl(Url)
{
  // Make a request
  axios.get(Url)
    .then(function (response) {
      // handle success
      generateText(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(`Error fetching ${Url}
      Error: ${error.message}`);
    });
}

const argv = process.argv;


if (argv.length >= 4 && argv[2].toLowerCase().startsWith("file"))
{
    ReadFile(argv[3]);
}
else if (argv.length >= 4 && argv[2].toLowerCase().startsWith("url"))
{
    ReadUrl(argv[3]);
}
else
{
    console.log("Invalid argument use file|url");
}

