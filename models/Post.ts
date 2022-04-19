import shortMongoose from "../utils/built-ins/shortMongoose";

const [postSchema, PostModel] = shortMongoose({
  name: "post",
  schema: {
    id: String,
    title: String,
    description: String,
    createdDate: Date,
    updatedDate: Date,
  },
});

export { postSchema, PostModel as default};