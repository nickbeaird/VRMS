const { Event } = require('../models');

const EventController = {};

EventController.event_list = async function (req, res) {
  const { query } = req;

  try {
    const events = await Event.find(query).exec();
    res.json(events);
  } catch (err) {
    res.sendStatus(500).json({
      message: `/GET Internal server error: ${err.stack}`,
    });
  }

};

EventController.event_by_id = async function (req, res) {
  const { id } = req.params;

  try {
    const events = await Event.findById(id).populate('project');
    res.json(events);
  } catch (err) {
    res.sendStatus(500).json({
      message: `/GET Internal server error: ${err}`,
    });
  }
};

EventController.create = async function (req, res) {
  const { body } = req;

  try {
    const event = await Event.create(body);
    return res.status(200).json(event)
  } catch (err) {
    return res.status(500).send({
      message: `/GET Internal server error: ${err}`,
    });
  }
};

EventController.destroy = async function (req, res) {
  const { id } = req.params

  try {
    const event = await Event.findByIdAndDelete(id);
    return res.status(200).json(event)
  } catch (err) {
    return res.status(500).send({
      message: `/GET Internal server error: ${err}`,
    });
  }
  
};

EventController.update = async function (req, res) {
  const { id } = req.params

  try {
    const event = await Event.findByIdAndDelete(id);
    return res.status(200).json(event)
  } catch (err) {
    return res.status(500).send({
      message: `/GET Internal server error: ${err}`,
    });
  }
};

EventController.event_member_list = function (req, res) {
  res.send('NOT IMPLEMENTED: Event list UPDATE');
};

module.exports = EventController;