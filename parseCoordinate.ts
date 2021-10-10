interface ICoordinate {
  x: number;
  y: number;
}

function parseCoordinate(obj: ICoordinate): ICoordinate;
function parseCoordinate(x: number, y: number): ICoordinate;
function parseCoordinate(x: string): ICoordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): ICoordinate {
  let coord: ICoordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    // we are doing this type check at runtime not at compile time
    (arg1 as string).split(", ").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    // we are doing this type check at runtime not at compile time
    coord = { ...(arg1 as ICoordinate) };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 10, y: 20 }));
console.log(parseCoordinate("x:10, y:20"));
