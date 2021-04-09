import { snakeCase } from 'change-case';

/**
 * Returns the nested fields object that we will later use to clean up.
 *
 * @param acc - Object to build/accumulate with keys and values.
 * @param currFieldValues - Array of fields to store on the acc. The length of
 * this array represents the depth of the object.
 *
 * @example
 * // Returns { member_values: { member: { id: null } } }.
 * buildFieldsObject(['member_values', 'member', 'id'])
 */
const buildFieldsObject = (
  acc: Record<string, any> = {},
  fieldsArr: string[]
): Record<string, any> => {
  // Pick the first value off of the fields array.
  const currKey: string = fieldsArr.shift();

  return {
    ...acc,
    [currKey]: fieldsArr.length
      ? buildFieldsObject(acc[currKey], fieldsArr)
      : null
  };
};

/**
 * Returns the formatted fields string as a GraphQL nested object.
 *
 * @param fields - Array of dot case strings.
 *
 * @example
 * // Returns { id name members { id firstName } }
 * buildFieldsString(['id', 'name', 'members.id', 'members.firstName'])
 */
const buildFieldsString = (
  fields: string[],
  toSnake: boolean = true
): string => {
  const snakeCaseFields: string[] = toSnake
    ? fields.reduce((allFields: string[], currField: string) => {
        // Splits the array by the '.', converts that individual string to
        // snake case, then joins the snake case strings back together.
        // Example: 'memberValues.id' -> 'member_values.id'
        const snakeCaseDotCaseField: string = currField
          .split('.')
          .map((value: string) => snakeCase(value))
          .join('.');

        return [...allFields, snakeCaseDotCaseField];
      }, [])
    : fields;

  const result: Record<string, any> = snakeCaseFields.reduce(
    (acc: Record<string, any>, currField: string) =>
      buildFieldsObject(acc, currField.split('.')),
    {}
  );

  return (
    JSON.stringify(result)
      // Replaces all double quote, colon and null with empty string.
      .replace(/"|:|null/g, '')
      // Replaces the very first '{'.
      .replace(/^\{/, '')
      // Replaces the very last '}'.
      .replace(/\}$/, '')
  );
};

export default buildFieldsString;
