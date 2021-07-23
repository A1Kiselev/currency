import {CurrencyKeys} from "../enums/currencyKeys";
import moment from "moment";

const prepareDataObject = (options) => {
  const {rub, usd, eur} = options

  const preparedRub = rub
    ? rub.map(el => {
      return {
        name: CurrencyKeys.RUB,
        rate: el.Cur_OfficialRate,
        date: moment(el.Date).format('DD/MM/YYYY'),
      }
    })
    : [];
  const preparedUsd = usd
    ? usd.map(el => {
      return {
        name: CurrencyKeys.USD,
        rate: el.Cur_OfficialRate,
        date: moment(el.Date).format('DD/MM/YYYY'),
      }
    })
    : [];
  const preparedEur = eur
    ? eur.map(el => {
      return {
        name: CurrencyKeys.EUR,
        rate: el.Cur_OfficialRate,
        date: moment(el.Date).format('DD/MM/YYYY'),
      }
    })
    : [];

  return [...preparedRub, ...preparedUsd, ...preparedEur];
}

const convertObjectToCsv = (options) => {
  const items = prepareDataObject(options);

  // const items = data.items
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  return [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');
}

export const downloadCSVfile = (options) => {
  const data = convertObjectToCsv(options);
  const filename = 'kek.csv';
  const blob = new Blob([data], {type: 'text/csv'});
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}
