/**
 * @fileoverview Declaration: Assets
 * - For all file types. Previously, the TS compiler would not be able to find
 * some file types like .svg, .pdf and more.
 * @author Rami Abdou
 */

declare module '*.jpg';
declare module '*.pdf';
declare module '*.png';
declare module '*.svg';

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
