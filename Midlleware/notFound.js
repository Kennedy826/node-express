const notFound = (req, res) => res.status(404).send({ msg: 'route not found' })

module.exports = notFound