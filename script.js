let chance = document.querySelector('#chance');

const endpoint =
  'https://api.coronavirus.data.gov.uk/v1/data?' + 'filters=areaType=nation;areaName=england&' + 'structure={"date":"date","newCases":"newCasesByPublishDate"}';

const getData = async url => {
  const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

  if (status >= 400) throw new Error(statusText);

  return data;
}; // getData

const main = async () => {
  const result = await getData(endpoint);

  console.log(result.data[0]);
  chance.textContent = ((result.data[0].newCases / 56000000) * 100).toFixed(2);
}; // main

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
