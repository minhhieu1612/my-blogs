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
        reject({ status: false, message: error.message });
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
        reject({ status: false, message: error.message });
      }
    });
  }

  async insert(postData) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .create({
            title: postData.title,
            description: postData.description,
            createdDate: new Date(),
            updatedDate: new Date(),
          })
          .exec()
          .then(() => {
            resolve({
              status: true,
              message: CRUD_MESSAGE.CREATE`post with title${postData.title}`,
            });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, message: error.message });
      }
    });
  }

  async update(id, data) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .updateOne({ _id: id }, { ...data, updatedDate: new Date() })
          .exec()
          .then(() => {
            resolve({
              status: true,
              message: CRUD_MESSAGE.UPDATE`post with id: ${id}`,
            });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, message: error.message });
      }
    });
  }

  async delete(id, data) {
    const self = this;

    return new Promise(function (resolve, reject) {
      try {
        self._model
          .deleteOne({ _id: id }, data)
          .exec()
          .then(() => {
            resolve({
              status: true,
              message: CRUD_MESSAGE.DELETE`post with id: ${id}`,
            });
          });
      } catch (error) {
        console.error(error);
        reject({ status: false, message: error.message });
      }
    });
  }
}

module.exports = PostHandler;
