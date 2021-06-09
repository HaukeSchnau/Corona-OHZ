import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/de";
import Ampel from "../components/Ampel";

dayjs.locale("de");

const chartPadding = 20;
const referenceOpacity = 0.3;

export default function Home({ currentValue, lastDate, history, maxValue }) {
  useEffect(async () => {
    document.addEventListener("scroll", (e) => {
      const top = document.body.getBoundingClientRect().top;
      const children = document.getElementsByClassName("bg-img");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let factor;
        if (i === 0) factor = 0.6;
        else if (i === 1) factor = 0.3;
        child.style.transform = `translateY(${top * -factor}px)`;
      }
    });
  }, []);

  return (
    <div className="root">
      <Head>
        <title>Corona OHZ</title>
      </Head>
      <main>
        {dayjs().isBefore(dayjs("2021-05-31")) ? (
          <div className="container disclaimer">
            Achtung! Diese Regelungen gelten erst ab dem 31.05.2021
          </div>
        ) :           <div className="container disclaimer">
          Achtung! Je nach Schule könnten die unten genannten Regelungen abweichen!
      </div>}
        <div className="row dist-70-30">
          <section className="container inzidenz">
            <img
              className="bg-img red"
              src="/img/corona-red.svg"
              alt="Coronavirus Icon"
            />
            <h3>Aktuelle Inzidenz im Landkreis Osterholz:</h3>
            <div className="big-number">{formatNumber(currentValue)}</div>
            <ResponsiveContainer width="99%" height={300}>
              <LineChart
                data={history}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis domain={[0, maxValue + chartPadding]} />
                <Tooltip
                  labelFormatter={formatDate}
                  formatter={tooltipFormatter}
                />
                <ReferenceArea
                  y1={0}
                  y2={50}
                  fill="#75B558"
                  fillOpacity={referenceOpacity}
                  label="Szenario A"
                />
                <ReferenceArea
                  y1={50}
                  y2={Math.min(165, maxValue + chartPadding)}
                  fill="#F59F52"
                  fillOpacity={referenceOpacity}
                  label="Szenario B"
                />
                <ReferenceArea
                  y1={165}
                  y2={Math.min(99999, maxValue + chartPadding)}
                  fill="#EA5339"
                  fillOpacity={referenceOpacity}
                  label="Szenario C"
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="natural"
                  dataKey="inzidenz"
                  stroke="#1d3557"
                  strokeWidth="5"
                  yAxisId={0}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="stand">
              Stand: {dayjs.unix(lastDate).format("DD.MM.YYYY")}
              <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0?geometry=-30.805%2C46.211%2C52.823%2C55.839">
                Quelle: Datenhub des Robert-Koch-Instituts
              </a>
            </div>
          </section>
          <section className="container ampel striped">
            <img
              className="bg-img blue"
              src="/img/corona-blue.svg"
              alt="Coronavirus Icon"
            />
            <h3>Szenario in der Schule:</h3>
            <Ampel scenario={getScenarioIndex(currentValue)} />
            <div>
              Dieser neue{" "}
              <a href="https://www.mk.niedersachsen.de/startseite/aktuelles/presseinformationen/szenario-a-bei-inzidenz-bis-50-offnungen-von-kitas-und-schulen-zum-31-mai-tonne-kinder-und-jugendliche-stehen-bei-uns-im-fokus-200627.html">
                Stufenplan
              </a>{" "}
              gilt in Niedersachsen ab dem 31.05.2021
            </div>
          </section>
        </div>
      </main>
      <div className="secondary-headline">
        <h4>kurz und knapp:</h4>
        <h3>Aktuelle Regeln für Schulen in Niedersachsen</h3>
      </div>
      <div className="secondary-containers">
        <div className="row">
          <div className="container striped masks">
            <h3>Masken</h3>
            <div className="content">
              {currentValue > 35 ? (
                <>
                  Da die Inzidenz größer als 35 ist, besteht Maskenpflicht,{" "}
                  <b>auch im Unterricht am Sitzplatz</b>. In Grund- und
                  Förderschulen muss sie nur außerhalb der eigenen Kohorte
                  getragen werden.
                </>
              ) : (
                <>
                  Da die Inzidenz zurzeit unter 35 liegt, muss die Maske nur{" "}
                  <b>außerhalb der eigenen Kohorte</b> getragen werden.
                </>
              )}
            </div>
            <div className="stand">
              <a href="https://www.mk.niedersachsen.de/startseite/aktuelles/presseinformationen/szenario-a-bei-inzidenz-bis-50-offnungen-von-kitas-und-schulen-zum-31-mai-tonne-kinder-und-jugendliche-stehen-bei-uns-im-fokus-200627.html">
                Quelle: Niedersächsisches Kultusministerium
              </a>
            </div>
          </div>
          <div className="container striped masks">
            <h3>Tests</h3>
            <div className="content">
              Jeder Schüler muss weiterhin unabhängig von der Inzidenz{" "}
              <b>zwei mal pro Woche</b> einen Corona-Selbsttest durchführen.
            </div>
            <div className="stand">
              <a href="https://www.mk.niedersachsen.de/startseite/aktuelles/presseinformationen/szenario-a-bei-inzidenz-bis-50-offnungen-von-kitas-und-schulen-zum-31-mai-tonne-kinder-und-jugendliche-stehen-bei-uns-im-fokus-200627.html">
                Quelle: Niedersächsisches Kultusministerium
              </a>
            </div>
          </div>
          <div className="container striped masks">
            <h3>Präsenzpflicht</h3>
            <div className="content">
              Nach wie vor können sich Schüler von dem Präsenzunterricht
              befreien lassen. Diese Schüler müssen ihre Aufgaben dann von
              zuhause aus erledigen.
            </div>
            <div className="stand">
              <a href="https://www.mk.niedersachsen.de/startseite/aktuelles/presseinformationen/szenario-a-bei-inzidenz-bis-50-offnungen-von-kitas-und-schulen-zum-31-mai-tonne-kinder-und-jugendliche-stehen-bei-uns-im-fokus-200627.html">
                Quelle: Niedersächsisches Kultusministerium
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="copy">&copy; 2021 Kreisschülerrat OHZ</div>
        <div className="dev">
          Eine Hauke Schnau Produktion
        </div>
        <Link href="/impressum">
          <a className="legal">Impressum & Datenschutz</a>
        </Link>
      </footer>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const url = "https://corona-ohz.de/api/history";
  const localUrl = "http://localhost:3000/api/history";
  const res = await fetch(url).then((res) => res.json());
  let max = 0;
  const convertedHistory = Object.entries(res).map((entry) => {
    max = Math.max(max, entry[1]);
    return {
      date: dayjs(entry[0]).unix(),
      inzidenz: entry[1],
    };
  });
  convertedHistory.sort((a, b) => dayjs.unix(a.date).diff(dayjs.unix(b.date)));
  return {
    history: convertedHistory,
    lastDate: convertedHistory[convertedHistory.length - 1].date,
    currentValue: convertedHistory[convertedHistory.length - 1].inzidenz,
    maxValue: max,
  };
};

const formatDate = (tick) => {
  return dayjs.unix(tick).format("DD.MM.");
};

const tooltipFormatter = (value, name, props) => {
  return [formatNumber(value), "Inzidenz"];
};

const formatNumber = (num) =>
  num.toLocaleString("de-DE", {
    maximumFractionDigits: 1,
  });

const getScenarioIndex = (inzidenz) => {
  if (inzidenz >= 165) return 0;
  else if (inzidenz >= 50) return 1;
  else return 2;
};
