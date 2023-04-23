exports.geocode = (req, res, next) => {
  const { latitude = '', longitude = '' } = req.query;

  res.status(200).json({
    latitude,
    longitude,
  });
};
