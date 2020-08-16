const express = require("express");
const router = express.Router();
const { App } = require("@slack/bolt");
const cron = require("node-cron");
const { Event } = require("../models/event.model");
const { Project } = require("../models/project.model");

//https://api.slack.com/web

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SECRET,
});

//Checks DB every monday (1) for slack messages to schedule this week
// cron.schedule("* * * * 1", () => {});

(async () => {
  await app.start(3001);
  console.log("Connected to Slack");
})();

//Finds Id number of channel
router.get("/findId", (req, res) => {
  publishMessage();
  findEvent();
  // findProject();
});

//uses Id number to send message to said channel
router.post("/postMeeting/:id", (req, res) => {
  publishMessage1();
});

async function findConversation(name) {
  try {
    const result = await app.client.conversations.list({
      token: "xoxb-1273107934163-1285590347713-T4jPga74wL2iddE1J1r5w6a0",
    });

    for (var channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        console.log("Found conversation ID: " + conversationId);
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function publishMessage(id, text) {
  try {
    const result = await app.client.chat.postMessage({
      token: "xoxb-1273107934163-1285590347713-IFD6nYKd3E59NMKy3rdr1WSu",
      channel: "C017L4PFAA3",
      text: "Slack Message Publish",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function publishMessage1(id, text) {
  try {
    const result = await app.client.chat.postMessage({
      token: "xoxb-1273107934163-1285590347713-IFD6nYKd3E59NMKy3rdr1WSu",
      channel: id,
      text: text,
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function findEvent(req, res) {
  Event.find({})
    .then((events) => {
      console.log("EVENTS", events);
      res.json(events);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).json({
        message: `/GET Internal server error: ${err}`,
      });
    });
}

async function findProject(req, res) {
  Project.find({})
    .then((project) => {
      project.forEach((cur) => {
        console.log("PROJECT", cur.name);
      });
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).json({
        message: `/GET Internal server error: ${err}`,
      });
    });
}
module.exports = router;
