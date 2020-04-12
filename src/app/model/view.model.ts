export interface Viewlist {
  id: number;
  titleName: string;
  flagDocx: boolean;
  flagXlsx: boolean;
  flagPdf: boolean;
  source: string,
  sourceFlag: boolean;
  sourceInprogress: boolean;
  sourceDate: string;
  altText: string;
  altTextFlag: boolean;
  altTextInprogress: boolean;
  altTextDate: string;
  process: string;
  processFlag: boolean;
  processInprogress: boolean;
  processDate: string;
  qa: string;
  qaFlag: boolean;
  qaInprogress: boolean;
  qaDate: string;
  remediatedFile: string;
  remediatedFileFlag: boolean;
  remediatedFileInprogress: boolean;
  remediatedFileDate: string;
}
