import React, {useState} from "react";
import {useSelector} from "react-redux";
import {CurrencyKeys} from "../enums/currencyKeys";
import {downloadCSVfile} from "../Util/ScvHelper";
import moment from "moment";

const downloadHandler = (currencies, tableColums) => {
  const {rub, usd, eur} = currencies;
  const {isShowingRub, isShowingUsd, isShowingEur} = tableColums;

  let options = {};
  if (isShowingRub) {
    Object.assign(options, {rub});
  }
  if (isShowingUsd) {
    Object.assign(options, {usd});
  }
  if (isShowingEur) {
    Object.assign(options, {eur});
  }

  downloadCSVfile(options);
}

const Table = () => {
  const {rub, usd, eur} = useSelector(state => state.currency);
  const [isShowingRub, setIsShowingRub] = useState(false);
  const [isShowingUsd, setIsShowingUsd] = useState(false);
  const [isShowingEur, setIsShowingEur] = useState(false);

  return (
    <div className='table-wrapper'>
      <div className='table'>
        <div className='column'>
          <div className='cell'> </div>
          {rub.map(el => {
            return (
              <div className='cell'>{moment(el.Date).format('DD/MM/YYYY')}</div>
            )
          })}
        </div>
        {isShowingRub &&
        <div className='column'>
          <div className='cell'>{CurrencyKeys.RUB}</div>
          {rub.map(el => {
            return (
              <div className='cell' key={`${CurrencyKeys.RUB}${el.Date}`}>{el.Cur_OfficialRate}</div>
            )
          })}
        </div>
        }
        {isShowingUsd &&
        <div className='column'>
          <div className='cell'>{CurrencyKeys.USD}</div>
          {usd.map(el => {
            return (
              <div className='cell' key={`${CurrencyKeys.USD}${el.Date}`}>{el.Cur_OfficialRate}</div>
            )
          })}
        </div>
        }
        {isShowingEur &&
        <div className='column'>
          <div className='cell'>{CurrencyKeys.EUR}</div>
          {eur.map(el => {
            return (
              <div className='cell' key={`${CurrencyKeys.EUR}${el.Date}`}>{el.Cur_OfficialRate}</div>
            )
          })}
        </div>
        }
      </div>
      <div className='table-history'>
        <div>
          <label htmlFor={CurrencyKeys.RUB}>{CurrencyKeys.RUB}</label>
          <input type="checkbox" name={CurrencyKeys.RUB} onChange={() => setIsShowingRub(!isShowingRub)}/>
        </div>
        <div>
          <label htmlFor={CurrencyKeys.USD}>{CurrencyKeys.USD}</label>
          <input type="checkbox" name={CurrencyKeys.USD} onChange={() => setIsShowingUsd(!isShowingUsd)}/>
        </div>
        <div>
          <label htmlFor={CurrencyKeys.EUR}>{CurrencyKeys.EUR}</label>
          <input type="checkbox" name={CurrencyKeys.EUR} onChange={() => setIsShowingEur(!isShowingEur)}/>
        </div>
        <button onClick={() => downloadHandler({usd, rub, eur}, {isShowingRub, isShowingUsd, isShowingEur})}>Download
        </button>
      </div>
    </div>
  )
};

export default Table
