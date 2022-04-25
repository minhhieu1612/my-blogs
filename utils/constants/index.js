const CRUD_MESSAGE = {
  CREATE: (name) => `the record ${(name && `of ${name}`) || ''} has been inserted succesfully!!`,
  UPDATE: (name) => `the record ${(name && `of ${name}`) || ''} was updated succesfully!!`,
  DELETE: (name) => `the record ${(name && `of ${name}`) || ''} has been deleted succesfully!!`,
}

const DEFAULT_DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

module.exports = {
  CRUD_MESSAGE,
  DEFAULT_DATE_FORMAT
}