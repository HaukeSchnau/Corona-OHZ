import styles from "./Ampel.module.scss";
import cn from "classnames";

export default function Ampel({ scenario }) {
  const lights = [
    {
      szenario: "C",
      color: "#ea5339",
      text: "Im Szenario C bleiben alle Schüler*innen im Homeschooling und bearbeiten ihre Aufgaben von Zuhause.",
    },
    {
      szenario: "B",
      color: "#f59f52",
      text: "Im Szenario B werden die Schüler in zwei Gruppen aufgeteilt und arbeiten im Wechselunterricht. Mal von zuhause, mal in der Schule",
    },
    {
      szenario: "A",
      color: "#35db51",
      text: "Im Szenario A befinden sich alle Schüler im Präsenzunterricht.",
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.ampel}>
        {lights.map((light, i) => (
          <div
            className={cn(styles.light, { [styles.active]: scenario === i })}
            style={{ "--color": light.color }}
            key={light.scenario}
          >
            {light.szenario}
          </div>
        ))}
      </div>
      {lights[scenario].text}
    </div>
  );
}
