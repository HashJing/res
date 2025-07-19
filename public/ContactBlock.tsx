// ContactBlock.tsx
import React from "react"

export const ContactBlock = () => {
  const data = {
    email: "datasattva@proton.me",
    discord: "DataSattva",
    x: ["@HashJingNFT", "@DataSattva"],
    demo_render: "https://datasattva.github.io/hashjing/",
  }

  return (
    <div id="main-section">
      <div className="preview-container">
        <div id="preview-section">
          <div className="section-title">Contacts</div>
          <p><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></p>
          <p><strong>Discord:</strong> {data.discord}</p>
          <div>
            <strong>X (Twitter):</strong>
            <ul>
              {data.x.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="preview-container">
        <div id="preview-section">
          <div className="section-title">Resources</div>
          <p><strong>Live Demo:</strong> <a href={data.demo_render} target="_blank" rel="noreferrer">{data.demo_render}</a></p>
        </div>
      </div>
    </div>
  )
}
