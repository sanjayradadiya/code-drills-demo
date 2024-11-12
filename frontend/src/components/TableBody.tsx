import SectionRows from './SectionRows';

const TableBody = ({ rows }: { rows: any }) => {
  return (
    <>
      <tbody>
        {rows?.map((row: any) => {
          if (row?.RowType === 'Section' && row.Title) {
            return (
              <>
                <tr className="title">
                  <th colSpan={4}>{row?.Title}</th>
                </tr>
                <SectionRows row={row} />
              </>
            );
          }
        })}
      </tbody>
    </>
  );
};

export default TableBody;
