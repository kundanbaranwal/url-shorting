const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    let shortCode;
    let isUnique = false;
    while (!isUnique) {
      shortCode = nanoid(6);
      const existing = await Url.findOne({ shortCode });
      if (!existing) isUnique = true;
    }

    const newUrl = new Url({
      url,
      shortCode,
    });

    await newUrl.save();

    const responseProxy = newUrl.toJSON();
    delete responseProxy.accessCount;

    res.status(201).json(responseProxy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment access count
    await urlDoc.save();

    const responseProxy = urlDoc.toJSON();
    delete responseProxy.accessCount;

    res.status(200).json(responseProxy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlDoc.url = url;
    await urlDoc.save();

    const responseProxy = urlDoc.toJSON();
    delete responseProxy.accessCount;

    res.status(200).json(responseProxy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOneAndDelete({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json(urlDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
