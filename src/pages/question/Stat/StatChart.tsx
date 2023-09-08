import React, { FC, useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { getCOmponentStatService } from '../../../axios/stat';
import { json, useParams } from 'react-router-dom';
import { components } from '../../../commponents/QuestionCompnents';

// 组件参数类型
type propType = {
  selectComponentId: string;
  setSelectComponentId: (fe_id: string) => void;
  setSelectComponentType: (type: string) => void;
  selectComponentType: string;
};
const { Title } = Typography;

const StatChart: FC<propType> = (props) => {
  const [stat, setStat] = useState([]);
  const { selectComponentId, setSelectComponentId, setSelectComponentType, selectComponentType } =
    props;
  const { id } = useParams();
  const { run } = useRequest(
    async (questionId, componentId) => {
      const res = await getCOmponentStatService(questionId, componentId);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    }
  );
  useEffect(() => {
    if (selectComponentId) run(id, selectComponentId);
  }, [selectComponentId]);
  function getELem() {
    console.log('selectComponentType:', selectComponentType);
    const { StatComponent } = components(selectComponentType) || {};
    if (StatComponent == null) return <div> 该组件无统计图表</div>;
    if (selectComponentId)
      return (
        <div>
          <StatComponent stat={stat} />
        </div>
      );
    else return <div> 未选中组件</div>;
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      {getELem()}
    </>
  );
};

export default StatChart;
