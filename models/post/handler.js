const { default: mongoose } = require("mongoose");
const connectToDatabase = require("../connectToDatabase");
const { CRUD_MESSAGE } = require("../../utils/constants/index");

class PostHandler {
  _model;
  constructor() {
    try {
      connectToDatabase();
      this._model = mongoose.models.post;

      if (!this._model) {
        this._model = require("./model");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getMany() {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .find({})
          .exec()
          .then((data) => {
            resolve({ status: true, data });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, error });
      }
    });
  }

  async getOne(id) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .findById(id)
          .exec()
          .then((data) => {
            resolve({ status: true, data });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, error });
      }
    });
  }

  async insert(postData) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .create(postData)
          .exec()
          .then(() => {
            resolve({ status: true, message: CRUD_MESSAGE`${postData.title}` });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, error });
      }
    });
  }

  async update(query, data) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .create(query, data)
          .exec()
          .then(() => {
            resolve({ status: true, message: CRUD_MESSAGE`` });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, error });
      }
    });
  }

  async delete(query, data) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .create(query, data)
          .exec()
          .then(() => {
            resolve({ status: true, message: CRUD_MESSAGE`` });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, error });
      }
    });
  }
}

module.exports = PostHandler;
