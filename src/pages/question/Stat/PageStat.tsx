import React, { FC, useState } from 'react';
import { getQuestionStatService } from '../../../axios/stat';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Table, Pagination } from 'antd';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';

const { Title } = Typography;
type propType = {
  selectComponentId: string;
  setSelectComponentId: (fe_id: string) => void;
  setSelectComponentType: (type: string) => void;
};
// 组件
const PageStat: FC<propType> = (props) => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } = props;
  const { componentList } = useGetComponentsInfo() || [];
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [pageSize, setPageSize] = useState(5); // 分页每页的条数
  const [page, setPage] = useState(1); // 当前页
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatService(id, { page: 10, pageSize: 5 });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
        console.log('list:', list);
      },
    }
  );

  //   table 展示的标题行
  const columns = componentList.map((item) => {
    const { fe_id, title, props, type } = item;
    // !. 确定从props获取title属性，报错也没关系(自己有||兜底)
    const colTitle = props!.title || title;
    return {
      //   title: colTitle,
      // title 添加动态其他换颜色显示
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectComponentId(fe_id);
            setSelectComponentType(type);
          }}
        >
          <span style={{ color: fe_id == selectComponentId ? '#4e6ef2' : '' }}>{colTitle}</span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });
  const dataSource = list.map((i: any) => ({ ...i, key: i._id })); // 添加key
  const tableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && tableElem}
    </div>
  );
};
export default PageStat;
