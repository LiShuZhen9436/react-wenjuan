/**
 * 问卷 相关api接口
 */
import axios, { ResDataType } from './Ajax';

// 自定义搜索参数类型
type searchOption = {
  search: string;
  isStar: boolean;
  isDelete: boolean;
  page: number;
  pageSize: number;
};

// 获取单个问卷
export async function questionList(id: string): Promise<ResDataType> {
  const data = await axios.get(`/api/question/${id}`);
  return data;
}

// 新增问卷
export async function addQuestion(): Promise<ResDataType> {
  const data = await axios.post('/api/question');
  return data;
}

// 获取问卷列表
// Partial 表示参数可以是部分参数，有些参数可有可无
export async function getQuestionList(opt: Partial<searchOption>): Promise<ResDataType> {
  const data = await axios.get('/api/question', { params: opt });
  return data;
}
// 更新 标星/逻辑删除
export async function getQuestionStarList(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const data = await axios.patch(`/api/question/${id}`, { params: opt });
  return data;
}
// 复制
export async function getQuestionCopyList(id: string): Promise<ResDataType> {
  const data = await axios.post(`/api/question/copy/${id}`);
  return data;
}
// 彻底删除
export async function deleteQuestion(opt: Array<string>): Promise<ResDataType> {
  const data = await axios.delete(`/api/question/delete`, { params: opt });
  return data;
}
