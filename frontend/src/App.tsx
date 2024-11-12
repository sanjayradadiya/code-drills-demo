import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';

const BalanceSheetTable = ({ data }: { data: any }) => {
  const rows = data?.Reports?.[0]?.Rows;
console.log('rows ==>', data)
  if (rows?.length === 0) {
    return null;
  }
  return (
    <>
      <table>
        <TableHeader rows={rows} />
        <TableBody rows={rows} />
      </table>
    </>
  );
};

export default function App() {
  const [data, setData] = useState([]);

  const handleBalanceSheetFetch = useCallback(async () => {
    const _data = await fetch('http://localhost:3005/BalanceSheet');
    console.log('_data', _data)
    const balanceSheet = await _data.json();
    console.log('balanceSheet', balanceSheet)
    setData(balanceSheet);
  }, []);

  useEffect(() => {
    handleBalanceSheetFetch();
  }, []);
  return <BalanceSheetTable data={data} />;
}
