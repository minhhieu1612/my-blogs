import mongoose from "mongoose";

const { Schema, model } = mongoose;

type SchemaType =
  | {
      [path: string]: mongoose.SchemaDefinitionProperty<undefined>;
    }
  | {
      [x: string]: mongoose.SchemaDefinitionProperty<any> | undefined;
    }
  | undefined;

export default function shortMongoose({
  name,
  schema,
  schemaOptions = undefined,
  modelCollection = undefined,
  modelOptions = undefined
}: {
  name: string;
  schema: SchemaType;
  schemaOptions?: mongoose.SchemaOptions;
  modelCollection?: string;
  modelOptions?: mongoose.CompileModelOptions
}) {
  const schemaInstance = new Schema(schema, schemaOptions);
  const modelInstance = model(name, schemaInstance, modelCollection, modelOptions);

  return [schemaInstance, modelInstance];
}
