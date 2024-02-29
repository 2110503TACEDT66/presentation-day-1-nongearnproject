const CoWorkingSpace = require('../models/CoWorkingSpace');

exports.getCoWorkingSpaces = async (req, res, next) => {
  try {
    const coWorkingSpaces = await CoWorkingSpace.find();
    res.status(200).json({success: true, count: coWorkingSpaces.length, data: coWorkingSpaces});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.getCoWorkingSpace = async (req, res, next) => {
  try {
    const coWorkingSpace = await CoWorkingSpace.findById(req.params.id);

    if(!coWorkingSpace) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: coWorkingSpace});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.createCoWorkingSpace = async (req, res, next) => {
  const coWorkingSpace = await CoWorkingSpace.create(req.body);
  res.status(201).json({success: true, data: coWorkingSpace});
};
  
exports.updateCoWorkingSpace = async (req, res, next) => {
  try {
    const coWorkingSpace = await CoWorkingSpace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!coWorkingSpace) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: coWorkingSpace});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.deleteCoWorkingSpace = async (req, res, next) => {
  try {
    const coWorkingSpace = await CoWorkingSpace.findByIdAndDelete(req.params.id);

    if(!coWorkingSpace) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: {}});
  } catch(err) {
    res.status(400).json({success: false});
  }
};