const CRUD_MESSAGE = {
  CREATE: (name) => `the record ${(name && `of ${name}`) || ''} has been inserted succesfully!!`,
  UPDATE: (name) => `the record ${(name && `of ${name}`) || ''} was updated succesfully!!`,
  DELETE: (name) => `the record ${(name && `of ${name}`) || ''} has been deleted succesfully!!`,
}

module.exports = {
  CRUD_MESSAGE
}