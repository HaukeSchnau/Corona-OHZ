const fs = require("fs/promises");

export default async (req, res) => {
  const historyRaw = await fs.readFile("./history/history.json");
  const history = JSON.parse(historyRaw);
  res.status(200).json(history);
};
