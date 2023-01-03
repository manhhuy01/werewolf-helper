type item = string | number | undefined;

type items = item[]

export const difference = (arrays: items[] ) => arrays.reduce((a, b) => a.filter(c => !b.includes(c)))