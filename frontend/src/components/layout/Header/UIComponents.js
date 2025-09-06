export const pxShadow = (c = "#195d1d") => ({
    boxShadow: `
    0 0 0 2px ${c},
    4px 0 0 0 ${c}, -4px 0 0 0 ${c}, 
    0 4px 0 0 ${c}, 0 -4px 0 0 ${c}
  `,
});