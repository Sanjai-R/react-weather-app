export const groupDataByDate = (data) => {
  return data.reduce((acc, item) => {
    const [date, time] = item.dt_txt.split(" ");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({ time, ...item });
    return acc;
  }, {});
};
export const createDataList = (groupedData) => {
  return Object.entries(groupedData).map(([date, data]) => ({
    date,
    data,
  }));
};
