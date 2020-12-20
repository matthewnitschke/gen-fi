export function getFirstOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/// Converts an object into a list
///
/// Object format: {id: {data}}
/// Returned list format: [{id: id, ...data}]
export const objToListConverter = (obj: Object) =>
  Object.keys(obj).reduce((acc, id) => {
    return [...acc, { id: id, ...obj[id] }];
  }, []);
