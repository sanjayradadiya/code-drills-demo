const TableHeader = ({ rows }: { rows: any }) => {
  const headerRow = rows?.filter((row: any) => row.RowType === 'Header');
  const headers = headerRow?.[0]?.Cells?.map((item: any, index: number) => ({
    field: `header-cell-${index}`,
    headerName: item?.Value,
  }));

  return (
    <>
      <thead>
        <tr className="years">
          <td></td>
          {headers?.map((header: any) => {
            return (
              <th>
                <span className="sr-only">{header.headerName}</span>
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
