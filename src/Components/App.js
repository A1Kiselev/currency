import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateEUR, updateRUB, updateUSD} from "../Reducers/Currencies";
import {updateStartDate, updateEndDate} from "../Reducers/Dates";
import Chart from "./Chart";
import {CurrencyKeys} from "../enums/currencyKeys";
import {ModeKeys} from "../enums/modeKeys";
import Table from "./Table";

const App = () => {
  const {rub, usd, eur} = useSelector(state => state.currency);
  const {startDate, endDate} = useSelector(state => state.dates);
  const dispatch = useDispatch()

  const [currencyKey, setCurrencyKey] = useState(CurrencyKeys.RUB);
  const [mode, setMode] = useState(ModeKeys.Chart)

  const getActualCurrency = () => {
    // eslint-disable-next-line default-case
    switch (currencyKey) {
      case CurrencyKeys.RUB:
        return rub;
      case CurrencyKeys.EUR:
        return eur;
      case CurrencyKeys.USD:
        return usd;
    }
  }

  useEffect(() => {
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/298?startDate=${startDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(updateRUB(result));
        }
      );
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/145?startDate=${startDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(updateUSD(result));
        }
      );
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/292?startDate=${startDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(updateEUR(result));
        }
      )
  }, [startDate, endDate, dispatch])


  return (
    <>
      {mode === ModeKeys.Chart
        ? <Chart currency={getActualCurrency()} currencyKey={currencyKey}/>
        : <Table/>
      }
      <div className='app-history'>
        <label htmlFor="mode">Chart / Table</label>
        <input name='mode' type="checkbox"
               onChange={() => setMode(mode === ModeKeys.Chart ? ModeKeys.Table : ModeKeys.Chart)}/>
        <label htmlFor="currencyKey"> Please Choose Currency</label>
        <select name="currencyKey" defaultValue={CurrencyKeys.RUB}
                onChange={(event) => setCurrencyKey(event.target.value)}>
          <option value={CurrencyKeys.RUB} selected>{CurrencyKeys.RUB}</option>
          <option value={CurrencyKeys.USD}>{CurrencyKeys.USD}</option>
          <option value={CurrencyKeys.EUR}>{CurrencyKeys.EUR}</option>
        </select>
        <label htmlFor="startDate">from</label>
        <input name='startDate' type="date" max='2021-07-07' min='2016-07-01' value={startDate}
               onChange={(event) => dispatch(updateStartDate(event.target.value))}/>
        <label htmlFor="endDate">to</label>
        <input name='endDate' type="date" max='2021-07-07' min='2016-07-01' value={endDate}
               onChange={(event) => dispatch(updateEndDate(event.target.value))}/>
      </div>
    </>
  );
}

export default App;
