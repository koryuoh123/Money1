type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
  currentRecord?: RecordItem;
}
type RecordItem = {
  tags: Tag[];
  notes: string;
  types: string;
  amounts: number; // 数据类型 object | string
  createdAt?: string; // 类 / 构造函数
  ids?: string;
};
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; // 联合类型
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

