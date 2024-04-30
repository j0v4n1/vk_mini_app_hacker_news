import { Icon56UserSquareOutline } from '@vkontakte/icons';
import { Div, Group, SimpleCell } from '@vkontakte/vkui';
import { TComment } from '../types';
import { timeConverter } from '../utils';
import ReactHtmlParser from 'react-html-parser';

type Props = {
  comment: TComment;
};

export default function Comment({ comment }: Props) {
  return (
    <Group style={{ marginLeft: '50px' }}>
      <SimpleCell before={<Icon56UserSquareOutline />}>Comment posted by: {comment.by}</SimpleCell>
      <SimpleCell>{timeConverter(comment.time)}</SimpleCell>
      <Div>{ReactHtmlParser(comment.text)}</Div>
    </Group>
  );
}
