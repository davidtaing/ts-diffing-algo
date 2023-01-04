/**
 * Written by David Taing
 * https://www.linkedin.com/in/teeang/
 *
 * Project inspired by Luke Hovee's post
 * https://www.linkedin.com/feed/update/urn:li:activity:7009170288697311233/
 */

export function diff(left: unknown, right: unknown) {
  if (typeof left !== "object" && typeof left === typeof right) return null;

  if (typeof left === "undefined") return { right };

  if (typeof right === "undefined") return { left };

  if (Array.isArray(left) && Array.isArray(right))
    return compareArrays(left, right);

  if (left instanceof Object && right instanceof Object)
    return compareObjects(left, right);

  return { left, right };
}

function compareArrays(left: Array<unknown>, right: Array<unknown>) {
  if (left.length === 0 && right.length === 0) return null;

  let lIndex = 0;
  let rIndex = 0;
  let isLIndexValid = () => lIndex < left.length;
  let isRIndexValid = () => rIndex < right.length;

  const result: any[] = [];

  while (isLIndexValid() || isRIndexValid()) {
    const arrayItemDiff = diff(left[lIndex], right[rIndex]);

    if (arrayItemDiff) result[lIndex] = arrayItemDiff;

    lIndex++;
    rIndex++;
  }

  return result.length > 0 ? result : null;
}

function compareObjects(left: Object, right: Object) {
  const map: any = {};

  for (const key in left) {
    const leftChild = left[key as keyof typeof left];

    if (!(key in right)) {
      map[key] = { left: leftChild };
      continue;
    }

    const rightChild = right[key as keyof typeof left];

    let result = diff(leftChild, rightChild);

    if (result) {
      map[key] = { ...result };
    }
  }

  for (const key in right) {
    const rightChild = right[key as keyof typeof left];

    if (map.hasOwnProperty(key)) continue;

    if (!(key in left)) {
      map[key] = { right: rightChild };
    }
  }

  if (Object.keys(map).length === 0) return null;

  return map;
}
