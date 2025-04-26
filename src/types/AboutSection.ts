export type AboutSectionProps = Partial<{
  text: string;
  locale: string;
  title: string;
  bgSrc:
    | string
    | {
        "3xs"?: string | string[];
        "2xs"?: string | string[];
        xs?: string | string[];
        sm?: string | string[];
        def?: string | string[];
      };
  bgAlt: string;
  imgSrc: string | string[];
  imgAlt: string;
  //   ingredients?: unknown; //Ingredient[];
  //   variations?: unknown; //Variation[];
}>;
