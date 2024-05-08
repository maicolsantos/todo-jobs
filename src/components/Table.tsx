import { Table as AntdTable, TableColumnsType } from "antd";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";
import { sortDates } from "../utils/sortDates";
import { DeleteCell } from "./DeleteCell";
import { EditableCell } from "./EditableCell";
import { GroupButtons } from "./GroupButtons";
import { Link } from "./Link";

const columns: TableColumnsType<Jobs> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "50px",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Work item (URL)",
    dataIndex: "link",
    key: "link",
    width: "300px",
    render: (url, currentItem) => (
      <EditableCell dataKey="link" text={url} currentItem={currentItem}>
        <Link url={url} />
      </EditableCell>
    ),
  },
  {
    title: "Evidências",
    dataIndex: "evidencies",
    key: "evidencies",
    width: "150px",
    sorter: (a, b) => a.evidencies.length - b.evidencies.length,
    render: (evidencies, currentItem) => (
      <GroupButtons items={evidencies} currentItem={currentItem} />
    ),
  },
  {
    title: "Data criação",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "130px",
    sorter: (a, b) => sortDates(a.createdAt, b.createdAt),
  },
  {
    title: "Atualizado em",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: "140px",
    sorter: (a, b) => sortDates(a.updatedAt, b.updatedAt),
  },
  {
    title: "Informação",
    dataIndex: "info",
    key: "info",
    render: (info, currentItem) => (
      <EditableCell dataKey="info" text={info} currentItem={currentItem} />
    ),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: 20,
    render: (id) => <DeleteCell id={id} />,
  },
];

export const Table = () => {
  const { jobs } = useJobs();

  return (
    <>
      <AntdTable
        size="small"
        dataSource={jobs}
        columns={columns}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};
