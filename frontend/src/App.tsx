import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';

const BalanceSheetTable = ({ data }: { data: any }) => {
  const rows = data?.Reports?.[0]?.Rows;

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
  const [data, setData] = useState<any>([]);

  const handleBalanceSheetFetch = useCallback(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/balance-sheet`,
    );
    const balanceSheet = await res.json();
    setData(balanceSheet);
  }, []);

  useEffect(() => {
    handleBalanceSheetFetch();
  }, []);

  const Report = useMemo(() => data?.Reports?.[0], [data?.Reports?.[0]]);
  
  return (
    <div className="container">
      <h2>{Report?.ReportName}</h2>
      <h3>{Report?.ReportTitles?.join(', ')}</h3>
      <h4>{Report?.ReportDate}</h4>
      <BalanceSheetTable data={data} />
    </div>
  );
}
