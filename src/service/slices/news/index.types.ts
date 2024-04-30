import { TComment, TNews } from '../../../types';

export type State = {
  request: boolean;
  loading: boolean;
  failed: boolean;
  news: number[];
  activeNewsItem: TNews | null;
  comments: TComment[];
  error: string | undefined;
};
