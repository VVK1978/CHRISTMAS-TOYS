declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.ico' {
  const content: any;
  export default content;
}
declare module '*.jpg' {
  const content: any;
  export default content;
}
declare module '*.webp' {
  const content: any;
  export default content;
}

declare module '*.mp3' {
  const content: any;
  export default content;
}

declare namespace noUiSlider {
  interface noUiSlider {
    start: number[];
  }
  interface Instance extends HTMLElement {
    [x: string]: any;
  }
}
