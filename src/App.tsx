// src/App.tsx

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
  [k: string]: string; // urlKey -> url
};

type Resources = {
  HJ:  ResourceItem[];
  nft?: ResourceItem[]; // optional new block
};

type JsonData = {
  contacts: Contacts;
  resources: Resources;
};

export default function App() {
  const [data, setData] = useState<JsonData | null>(null);

  useEffect(() => {
    fetch("https://datasattva.github.io/hashjing-res/res.json")
    //fetch("./public/res.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading res.json:", err));
  }, []);

  if (!data) return <p className="status">Loading contacts & resources…</p>;

  const { contacts, resources } = data;

  /* helper: extract the single dynamic URL key */
  const getUrlKey = (item: ResourceItem) =>
    Object.keys(item).find((k) => k !== "caption" && k !== "description") as
      | string
      | undefined;

  return (
    <>
      <h1 id="title">Contacts and Resources</h1>

      {/* --------- CONTACTS (unchanged) --------- */}
      <section id="contacts">
        <h2 className="section-title">Contacts</h2>
        <div id="contacts-content">
          {contacts.emails.map(({ email, caption, description }) => (
            <p key={email}>
              <strong>{caption}: </strong>
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              {description}
            </p>
          ))}

          {contacts.discord.map(({ discord, caption, description }) => (
            <p key={discord}>
              <strong>{caption}: </strong>
              <a href={discord} target="_blank" rel="noreferrer">
                {discord}
              </a>
              <br />
              {description}
            </p>
          ))}

          {contacts.x.map(({ x, caption, description }) => (
            <p key={x}>
              <strong>{caption}: </strong>
              <a
                href={`https://x.com/${x.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {x}
              </a>
              <br />
              {description}
            </p>
          ))}
        </div>
      </section>

      {/* --------- GENERAL HJ RESOURCES --------- */}
      <section id="resources-hj">
        <h2 className="section-title">General Resources</h2>
        <div id="contacts-content">
          {resources.HJ.map((item) => {
            const urlKey = getUrlKey(item);
            if (!urlKey) return null;
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

      {/* --------- NFT RESOURCES (new block) --------- */}
      {resources.nft && (
        <section id="resources-nft">
          <h2 className="section-title">NFT Resources</h2>
          <div id="contacts-content">
            {resources.nft.map((item) => {
              const urlKey = getUrlKey(item);
              if (!urlKey) return null;
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
      )}
    </>
  );
}
