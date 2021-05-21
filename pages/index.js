import { useEffect, useState } from "react";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";

export default function Home() {
  const [history, setHistory] = useState({});

  useEffect(async () => {
    const res = await fetch("/api/history").then((res) => res.json());
    const convertedHistory = Object.entries(res).map((entry) => console.log(entry) || ({
      date: entry[0],
      inzidenz: entry[1],
    }));
    setHistory(convertedHistory);
    console.log(convertedHistory);
  }, []);

  return (
    <div className="root">
      <div className="bg"></div>
      <main>
        <section className="container">
          <LineChart
            width={400}
            height={400}
            data={history}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="inzidenz" stroke="#ff7300" yAxisId={0} />
          </LineChart>
        </section>
      </main>
    </div>
  );
}
