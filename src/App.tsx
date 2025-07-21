// src/App.tsx
//
// Reads /public/res.json and prints every contact / resource exactly
// as defined there.  Captions come from JSON; nothing hard-coded except
// the section headings “Contacts” and “Resources”.  Contacts e-mails and
// Discord entries render as <p>,  X/Twitter renders as a bullet <ul>,
// Resources render as <p> blocks.
//

import { useEffect, useState } from "react";

/* ---------- JSON type helpers ---------- */
type Email   = { email: string;   caption: string; description: string };
type XHandle = { x: string;       caption: string; description: string };
type Discord = { discord: string; caption: string; description: string };

type Contacts = {
  emails:  Email[];
  x:       XHandle[];
  discord: Discord[];
};

/* each resource object has 1 dynamic URL key + caption + description */
type ResourceItem = {
  caption: string;
  description: string;
  /* [urlKey: string]: string */
  [k: string]: string;
};

type Resources = { HJ: ResourceItem[] };

type JsonData = {
  contacts: Contacts;
  resources: Resources;
};

export default function App() {
  const [data, setData] = useState<JsonData | null>(null);

  useEffect(() => {
    fetch('https://datasattva.github.io/hashjing-res/res.json')
    //fetch("./public/res.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading res.json:", err));
  }, []);

  if (!data) return <p className="status">Loading contacts & resources…</p>;

  const { contacts, resources } = data;

  return (
    <>
      <h1 id="title">Contacts and resources</h1>

      {/* ------------- CONTACTS ------------- */}
      <section id="contacts">
        <h2 className="section-title">Contacts</h2>
        <div id="contacts-content">
          {/* E-mails */}
          {contacts.emails.map(({ email, caption, description }) => (
            <p key={email}>
              <strong>{caption}: </strong>
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              {description}
            </p>
          ))}

          {/* Discord entries */}
          {contacts.discord.map(({ discord, caption, description }) => (
            <p key={discord}>
              <strong>{caption}: </strong>
              <a
                href={`${discord.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {discord}
              </a>{" "}
              <br />
              {description}
            </p>
          ))}

          {/* X / Twitter list */}
          {contacts.x.map(({ x, caption, description }) => (
            <p key={x}>
              <strong>{caption}: </strong>
              <a
                  href={`https://x.com/${x.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {x}
                </a>{" "}
              <br />
              {description}
            </p>
          ))}
        </div>
      </section>

      {/* ------------- RESOURCES ------------- */}
      <section id="resources">
        <h2 className="section-title">Resources</h2>
        <div id="contacts-content">
          {resources.HJ.map((item) => {
            const urlKey = Object.keys(item).find(
              (k) => k !== "caption" && k !== "description"
            ) as string;
            const url = item[urlKey];
            return (
              <p key={urlKey}>
                <strong>{item.caption}: </strong>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
                <br />
                {item.description}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
}
