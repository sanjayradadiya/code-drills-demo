const SectionRows = ({ row }: { row: any }) => {
  if (row?.Rows?.length === 0) {
    return (
      <tr className="data">
        <td colSpan={4}>
          <span>No data found</span>
        </td>
      </tr>
    );
  }
  return (
    <>
      {row?.Rows?.map((nestedRow: any, index: number) => (
        <tr
          className={`data ${
            nestedRow?.RowType === 'SummaryRow' ? 'total' : ''
          }`}
        >
          <td></td>
          {nestedRow.Cells.map((cell: any, index: number) => (
            <td className={index === 0 ? 'caption' : ''}>
              <span
                className={nestedRow?.RowType === 'SummaryRow' ? 'total' : ''}
              >
                {cell.Value}
              </span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SectionRows;
