import { Div, Group, SimpleCell, Spinner, Title } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../service/store/index.types';
import { RouterLink } from '@vkontakte/vk-mini-apps-router';
import { Icon56UserSquareOutline } from '@vkontakte/icons';
import { countComments, timeConverter } from '../utils';
import { useEffect } from 'react';
import { getComment } from '../utils/api';
import { TComment } from '../types';
import { clearComments, setComment } from '../service/slices/news';
import Comment from './Comment';

export default function NewsDetails() {
  const { activeNewsItem, comments } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeNewsItem && activeNewsItem.kids.length !== 0) {
      activeNewsItem.kids.map((comm: number) => {
        getComment(comm).then((data: TComment) => {
          dispatch(setComment(data));
        });
      });
    }

    return () => {
      dispatch(clearComments());
    };
  }, []);

  if (!activeNewsItem || comments.length === 0) {
    return (
      <Div style={{ margin: 'auto' }}>
        <Spinner />
      </Div>
    );
  }

  return (
    <Group>
      <Div>
        <Title level="1">{activeNewsItem.title}</Title>
      </Div>
      <SimpleCell before={<Icon56UserSquareOutline />}>News posted by: {activeNewsItem.by}</SimpleCell>
      <Div>
        <RouterLink target="_blank" to={activeNewsItem.url}>
          Open news link
        </RouterLink>
      </Div>
      <SimpleCell>{timeConverter(activeNewsItem.time)}</SimpleCell>
      <Group>
        <Title style={{ padding: '20px' }}>Comments: {countComments(comments)}</Title>
        {comments.map((comment) => {
          return !comment.deleted && <Comment key={comment.id} comment={comment} />;
        })}
      </Group>
    </Group>
  );
}
