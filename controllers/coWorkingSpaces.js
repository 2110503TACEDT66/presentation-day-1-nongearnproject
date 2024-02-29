
exports.getCoWorkingSpaces = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all co-working spaces" });
  };
  exports.getCoWorkingSpace = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Show co-working space ${req.params.id}` });
  };
  exports.createCoWorkingSpace = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Create new co-working space" });
  };
  exports.updateCoWorkingSpace = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Update co-working space ${req.params.id}` });
  };
  exports.deleteCoWorkingSpace = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Delete co-working space ${req.params.id}` });
  };