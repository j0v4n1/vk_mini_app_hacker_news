import { Icon56UserSquareOutline } from '@vkontakte/icons';
import { Div, Group, SimpleCell, Title } from '@vkontakte/vkui';
import { TComment } from '../types';
import { countComments, timeConverter } from '../utils';
import ReactHtmlParser from 'react-html-parser';
import { getComment } from '../utils/api';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../service/store/index.types';
import { setIsKids } from '../service/slices/news';

type Props = {
  comment: TComment;
  isExpanded: boolean;
};

export default function Comment({ comment, isExpanded }: Props) {
  const [kids, setKids] = useState<TComment[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!comment.kids) {
      return;
    }
    dispatch(setIsKids(true));
    comment.kids.map((kid: number) => {
      getComment(kid).then((data) => {
        setKids([...kids, data]);
      });
    });
  }, []);

  return (
    <Group style={{ marginLeft: '50px' }}>
      <SimpleCell before={<Icon56UserSquareOutline />}>Comment posted by: {comment.by}</SimpleCell>
      <SimpleCell>{timeConverter(comment.time)}</SimpleCell>
      <Div>{ReactHtmlParser(comment.text)}</Div>
      {countComments(kids) !== 0 ? (
        <Div>
          <Title>Answers: {countComments(kids)}</Title>
        </Div>
      ) : null}
      {isExpanded
        ? kids.map((kid) => {
            return <Comment isExpanded={isExpanded} key={comment.id} comment={kid} />;
          })
        : null}
    </Group>
  );
}
