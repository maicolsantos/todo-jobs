import { Table as AntdTable, TableColumnsType } from "antd";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";
import { DeleteCell } from "./DeleteCell";
import { EditableCell } from "./EditableCell";
import { GroupButtons } from "./GroupButtons";
import { Link } from "./Link";

const columns: TableColumnsType<Jobs> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "URL",
    dataIndex: "link",
    key: "link",
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
    sorter: (a, b) => a.evidencies.length - b.evidencies.length,
    render: (evidencies, currentItem) => (
      <GroupButtons items={evidencies} currentItem={currentItem} />
    ),
  },
  {
    title: "Data criação",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => a.createdAt.length - b.createdAt.length,
  },
  {
    title: "Atualizado em",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
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
