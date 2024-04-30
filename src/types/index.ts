export enum NewsType {
  JOB = 'job',
  STORY = 'story',
  COMMENT = 'comment',
  POLL = 'poll',
  POLLOPT = 'pollopt',
}

export type TNews = {
  id: number;
  deleted: boolean;
  type: NewsType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: string;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
};

export type TComment = {
  by: string;
  deleted: boolean;
  id: number;
  kids: number[];
  parent: number;
  text: 'string';
  time: number;
  type: 'TComment';
};
