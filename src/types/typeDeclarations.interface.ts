
export interface IBOX_CONFIG {
  padding: number;
  margin: {top: number, bottom: number};
  borderColor: string;
  align: string;
  borderStyle: string;
};

export interface ICurrentFile {
  name: string;
  exists: () => '';
  path: string;
}