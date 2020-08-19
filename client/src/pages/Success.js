import React, { useEffect, useState } from "react";

import "../sass/Home.scss";
import "../sass/MagicLink.scss";

const Success = (props) => {
  const eventId = new URLSearchParams(props.location.search).get("eventId");
  const [event, setEvent] = useState([]);

  async function fetchSlackUrl() {
    try {
      const res = await fetch(`/api/events/${eventId}`);
      const resJson = await res.json();

      setEvent(resJson.project.slackUrl);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSlackUrl();
  }, [event]);

  return (
    <div className="flex-container">
      <div className="new">
        <div className="new-headers">
          <h3 className="last-row">Success!</h3>
          <h4 className="last-row">Soon, you'll be able to: </h4>
        </div>
        <div className="future-list">
          <p>👉 View your detailed, personalized journey...</p>
          <p>👉 Get matched with projects that need you...</p>
          <p>👉 Manage your own project!</p>
        </div>

        <div className="success-info">
          <p>
            Thanks for being a part of the alpha test! Your feedback is valued
            and appreciated.
          </p>
          <p>Have fun tonight!</p>
          <a href={event} className={`home-button`}>
            Join us on Slack!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
