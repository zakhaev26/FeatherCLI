const figlet = require('figlet');

async function KOEL() {

await figlet("KoelJS Music Player",  {
    width: 1100,
  }, function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
}


async function main() {

await KOEL()
}

main()
