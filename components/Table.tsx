import React, { useCallback } from "react";
import getValueFromNestedObject from "../utils/getValueFromNestedObject";

export type TableColumnType<T> = {
  key: string;
  name: string;
  title: string;
  width?: string;
  render?: (label: string, record: T) => JSX.Element | string;
};

export type TableDataSourceType = {
  key: string;
  [key: string]: any;
};

export type TablePaginationType = {
  page?: number;
  totalPage: number;
  onChange: () => Promise<void>;
};

export type TablePropsType = {
  dataSource: TableDataSourceType[];
  column: TableColumnType<any>[];
  pagination?: TablePaginationType;
};

const Table: React.FC<TablePropsType> = ({
  dataSource,
  column,
  pagination,
}) => {
  const renderTableHeader = useCallback(
    () =>
      column.map(({ key, title, width = "auto" }, index) => (
        <th key={key} style={{ width }} className="py-2">
          <div className={`${index < column.length - 1 ? "border-r" : ""} `}>
            {title}
          </div>
        </th>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(column)]
  );

  const renderTableBodyData = useCallback(
    () =>
      dataSource.map((item, index) => (
        <tr
          key={item.key}
          className="border-b border-gray-400 hover:bg-gray-900"
        >
          {column.map(({ key, name, render }) => (
            <td key={`${item.key}_${key}`} className='p-3'>
              {render ? (
                render(getValueFromNestedObject(item, name), item)
              ) : (
                <span>{getValueFromNestedObject(item, name)}</span>
              )}
            </td>
          ))}
        </tr>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(column), JSON.stringify(dataSource)]
  );

  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-600">
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableBodyData()}</tbody>
      </table>
      {pagination ? <div className="pagination"></div> : ""}
    </div>
  );
};

export default Table;
