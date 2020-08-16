export const groupByFirstLetter = (items) => {
  return items.reduce((acc, currentItem) => {
    const key = currentItem.title[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(currentItem);
    return acc;
  }, {});
};
