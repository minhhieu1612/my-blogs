export default function getValueFromNestedObject(src: Readonly<any>, propertiesPath: string, defaultValue: any = "") {
  let object = Object.assign({}, src);
  let properties = propertiesPath.toString().split('.');

  for (let i = 0; i < properties.length; i++) {
    if (typeof object[properties[i]] == 'undefined')
      return defaultValue;
    object = object[properties[i]];
  }

  return object ? object : defaultValue;
}