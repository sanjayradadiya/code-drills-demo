import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BalanceSheetTable = ({ data }: { data: any }) => {
  const rows = data.Reports[0].Rows;
  const headerRow = rows?.filter((row: any) => row.RowType === 'Header');
  const headers = headerRow[0]?.Cells?.map((item: any, index: number) => ({
    field: `header-cell-${index}`,
    headerName: item?.Value,
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              {headers?.map((header: any) => {
                return <StyledTableCell>{header.headerName}</StyledTableCell>;
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => {
              if (row.RowType === 'Section' && row.Title) {
                return (
                  <>
                    <StyledTableRow>
                      {row?.Title ? <StyledTableCell colSpan={3}>{row.Title}</StyledTableCell> : <></>}
                    </StyledTableRow>
                    <StyledTableRow>
                      {row?.Rows?.length ? (
                        row.Rows.map((nestedRow: any, index: number) => (
                          <>
                            <StyledTableRow key={`cell-${index}`}>
                            {nestedRow.Cells.map((cell: any, index: number) => (
                              <StyledTableCell colSpan={3} key={`nested-cell-${index}`}>
                                {cell.Value}
                              </StyledTableCell>
                            ))}
                            </StyledTableRow>
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </StyledTableRow>
                  </>
                );
              }

              <></>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// Sample data passed to the component as props
const data = {
  Reports: [
    {
      ReportID: 'BalanceSheet',
      ReportName: 'Balance Sheet',
      ReportType: 'BalanceSheet',
      ReportTitles: [
        'Balance Sheet',
        'Demo Company (AU)',
        'As at 28 February 2018',
      ],
      ReportDate: '23 February 2018',
      UpdatedDateUTC: '/Date(1519358515899)/',
      Rows: [
        {
          RowType: 'Header',
          Cells: [
            { Value: '' },
            { Value: '28 Feb 2018' },
            { Value: '28 Feb 2017' },
          ],
        },
        {
          RowType: 'Section',
          Title: 'Assets',
        },
        {
          RowType: 'Section',
          Title: 'Bank',
          Rows: [
            {
              RowType: 'Row',
              Cells: [
                { Value: 'Business Bank Account' },
                { Value: '-2894.08' },
                { Value: '0.00' },
              ],
            },
            {
              RowType: 'Row',
              Cells: [
                { Value: 'Business Savings Account' },
                { Value: '6878.28' },
                { Value: '0.00' },
              ],
            },
            {
              RowType: 'SummaryRow',
              Cells: [
                { Value: 'Total Bank' },
                { Value: '3984.20' },
                { Value: '0.00' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function App() {
  return <BalanceSheetTable data={data} />;
}
