export const allAccess = (req, res) => {
  res.status(200).send({ message: 'You are looking at public content'})
}

export const userContent = (req, res) => {
  res.status(200).send({message: 'You are looking at user content'})
}

export const adminContent = (req, res) => {
  res.status(200).send({message: 'You are looking at admin content'})
}

export const moderatorContent = (req, res) => {
  res.status(200).send({message: 'You are looking at mederator content'})
}