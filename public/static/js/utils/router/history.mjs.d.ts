import { IUrlData } from './url-data.mjs';

interface IHistoryData {
  urlData: IUrlData;
  push: (route: string, options?: Record<string, string | boolean>) => void;
}

export function useHistory(): IHistoryData;
