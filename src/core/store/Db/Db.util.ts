import { Action, action } from 'easy-peasy';
import { normalize } from 'normalizr';

import { DbModel, MergeEntitiesArgs, SetActiveArgs } from './Db.types';
import { IEntities } from './entities';
import { mergeStrategy } from './schema';

/**
 * Main update function that updates all entities (front-end DB). Uses
 * the deepmerge library function to make the updates.
 */
export const mergeEntities: Action<DbModel, MergeEntitiesArgs> = action(
  (state, { data, schema }: MergeEntitiesArgs) => {
    const normalizedEntities = normalize(data, schema).entities;

    const parsedEntities = Object.entries(normalizedEntities).reduce(
      (acc: Record<string, unknown>, [key, value]) => {
        return { ...acc, [key]: { byId: value } };
      },
      {}
    );

    return {
      ...state,
      entities: mergeStrategy(state.entities, parsedEntities) as IEntities
    };
  }
);

/**
 * Updates the activeId of a series of tables or just one table.
 */
export const setActive: Action<
  DbModel,
  SetActiveArgs | SetActiveArgs[]
> = action((state, args: SetActiveArgs | SetActiveArgs[]) => {
  const argsArr = Array.isArray(args) ? args : [args];

  const updatedEntities: IEntities = argsArr.reduce(
    (acc: IEntities, currentArgs: SetActiveArgs) => {
      const { id, table } = currentArgs;
      return { ...acc, [table]: { ...acc[table], activeId: id } };
    },
    { ...state.entities }
  );

  return { ...state, entities: updatedEntities };
});

/**
 * Returns the hue from an RGB 3-tuple. Only a helper function for the next
 * update document colors function.
 */
const getHueFromRGB = ([r, g, b]: number[]): number => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) return 0;

  let hue = (max + min) / 2;
  const diff = max - min;

  if (max === r) hue = (g - b) / diff;
  if (max === g) hue = (b - r) / diff + 2;
  if (max === b) hue = (r - g) / diff + 4;

  hue *= 60;

  return hue < 0 ? hue + 360 : Math.round(hue);
};

/**
 * Updates the CSS global variables with the appropriate primary colors as well
 * as 6 gray values.
 *
 * @param color Hexadecimal representation of the color including the #.
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
export const updateDocumentColors = (color: string): void => {
  // If the document's primary color is up to date, return early.
  const { style } = document.documentElement;
  if (style.getPropertyValue('--primary') === color) return;

  const RGB = color
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => {
      return `#${r}${r}${g}${g}${b}${b}`;
    })
    .substring(1)
    .match(/.{2}/g)
    .map((x) => {
      return parseInt(x, 16);
    });

  const hue = getHueFromRGB(RGB);

  style.setProperty('--primary', color);
  style.setProperty('--primary-hex', `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`);
  style.setProperty('--primary-hue', hue.toString());
  style.setProperty('--gray-1', `hsl(${hue}, 5%, 20%)`);
  style.setProperty('--gray-2', `hsl(${hue}, 5%, 31%)`);
  style.setProperty('--gray-3', `hsl(${hue}, 5%, 51%)`);
  style.setProperty('--gray-4', `hsl(${hue}, 5%, 74%)`);
  style.setProperty('--gray-5', `hsl(${hue}, 5%, 88%)`);
  style.setProperty('--gray-6', `hsl(${hue}, 5%, 96%)`);
};
