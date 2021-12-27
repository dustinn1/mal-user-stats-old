import { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import BootstrapTable from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

interface Props {
  data: Array<any>;
  dataIndex: string;
  sortBy?: string;
}

function Table({ columns, data, sortBy }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy,
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <BootstrapTable
        striped
        responsive
        {...getTableProps()}
        className="chart-table"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="chart-table-header">
                    {column.render("Header")}
                    <span className="sort-icon">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faSortDown} />
                        ) : (
                          <FontAwesomeIcon icon={faSortUp} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faSort} />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>
      {pageCount > 1 && (
        <Pagination className="justify-content-end">
          <Pagination.First
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />
          <Pagination.Prev
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
          {[...Array(pageCount)].map((_, index) => {
            return (
              <Pagination.Item
                key={index}
                active={pageIndex === index}
                onClick={() => gotoPage(index)}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </Pagination>
      )}
    </>
  );
}

export default function ChartTable(props: Props) {
  const columns = useMemo(
    () => [
      {
        Header:
          props.dataIndex.charAt(0).toUpperCase() + props.dataIndex.slice(1),
        accessor: props.dataIndex,
      },
      {
        Header: "Count",
        accessor: "count",
      },
      {
        Header: "Chapters Read",
        accessor: "chapters_read",
      },
      {
        Header: "Mean Score",
        accessor: "mean_score",
      },
    ],
    [props.dataIndex]
  );

  const sortBy = useMemo(
    () => [
      {
        id: props.sortBy ?? props.dataIndex,
        desc: false,
      },
    ],
    [props.sortBy, props.dataIndex]
  );

  const tableData = useMemo(() => props.data, [props.data]);

  return <Table columns={columns} data={tableData} sortBy={sortBy} />;
}
