/// <reference types="astro/client" />

declare module "*.jpg" {
  const content: import("astro").ImageMetadata;
  export default content;
}

declare module "*.JPG" {
  const content: import("astro").ImageMetadata;
  export default content;
}

declare module "*.png" {
  const content: import("astro").ImageMetadata;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
