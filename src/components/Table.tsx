import { Table as AntdTable, TableColumnsType } from "antd";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";
import { sortDates } from "../utils/sortDates";
import { DeleteCell } from "./DeleteCell";
import { EditableCell } from "./EditableCell";
import { GroupButtons } from "./GroupButtons";
import { Link } from "./Link";
import { Status } from "./Status";

const columns: TableColumnsType<Jobs> = [
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "150px",
    sorter: (a, b) => (a.status || "")?.length - (b.status || "")?.length,
    render: (_, currentItem) => <Status currentItem={currentItem} />,
  },
  {
    title: "Data criação",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "130px",
    align: "end",
    sorter: (a, b) => sortDates(a.createdAt, b.createdAt),
  },
  {
    title: "Atualizado em",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: "140px",
    align: "end",
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

  const handleStatus = (evidencies: string[]) => {
    switch ((evidencies || [])?.length) {
      case 0:
        return "Active";
      case 1:
      case 2:
        return "Ready2Test";
      default:
        return "Resolved";
    }
  };

  const handleDataSource = () => {
    return jobs.map((job) => ({
      ...job,
      status: handleStatus(job.evidencies),
    }));
  };

  return (
    <>
      <AntdTable
        bordered
        size="small"
        showSorterTooltip={false}
        pagination={false}
        dataSource={handleDataSource()}
        columns={columns}
      />
    </>
  );
};
