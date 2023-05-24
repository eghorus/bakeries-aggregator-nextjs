export const createSlug = (str: string) => str.toLowerCase().replace(/\s\&\s|\s|\&|\//g, "-");
