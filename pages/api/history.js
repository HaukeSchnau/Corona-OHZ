const fs = require("fs/promises");

export default async (req, res) => {
  const historyRaw = await fs.readFile("./history/history.json");
  const history = JSON.parse(historyRaw);

  const counterRaw = await fs.readFile("./counter");
  let counter = parseInt(counterRaw);
  counter += 1;
  console.log(counter);
  await fs.writeFile("./counter", counter.toString());

  res.status(200).json(history);
};
