module.exports.root = (req, res, next) => {
    res.json({
      name: "HomeCrush API",
      version: "1.0",
      website: "SOON 🏃💨",
    });
}