import axios, { ResDataType } from './Ajax';

// 获取答卷信息
export async function getQuestionStatService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = await axios.get(url, { params: opt });
  return data;
}

export async function getCOmponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = await axios.get(url);
  return data;
}
