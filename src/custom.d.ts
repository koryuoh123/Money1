declare type RecordItem = {
    currentTags: string[];
    tags: string[];
    notes: string;
    types: string;
    amounts: number;// 数据类型 object | string
    createdAt?: Date; // 类 / 构造函数
  };