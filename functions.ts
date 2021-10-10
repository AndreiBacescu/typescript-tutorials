const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

const introduce = (salutation: string, ...names: string[]): string => {
  return `${salutation} ${names.join(" ")}`;
};
