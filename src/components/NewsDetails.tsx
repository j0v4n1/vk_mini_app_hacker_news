import { Button, Div, Group, SimpleCell, Spinner, Title } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../service/store/index.types';
import { RouterLink } from '@vkontakte/vk-mini-apps-router';
import { Icon56UserSquareOutline } from '@vkontakte/icons';
import { countComments, timeConverter } from '../utils';
import { useEffect, useState } from 'react';
import { getComment } from '../utils/api';
import { TComment } from '../types';
import { clearComments, setComment, setIsKids } from '../service/slices/news';
import Comment from './Comment';

export default function NewsDetails() {
  const { activeNewsItem, comments, isKids } = useAppSelector((store) => store.news);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = !activeNewsItem || comments.length === 0;

  const refreshComments = () => {
    if (activeNewsItem && activeNewsItem.kids.length !== 0) {
      activeNewsItem.kids.map((comm: number) => {
        getComment(comm).then((data: TComment) => {
          dispatch(setComment(data));
        });
      });
    }
  };

  useEffect(() => {
    refreshComments();

    return () => {
      dispatch(clearComments());
      dispatch(setIsKids(false));
    };
  }, []);

  return (
    activeNewsItem && (
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
          <Div
            style={
              isLoading
                ? { display: 'flex', justifyContent: 'space-between', maxWidth: 450 }
                : { display: 'flex', justifyContent: 'space-between', maxWidth: 350 }
            }>
            <Title>Comments: {isLoading ? 'Counting...' : countComments(comments)}</Title>
            <Button
              onClick={() => {
                dispatch(clearComments());
                refreshComments();
              }}>
              Refresh
            </Button>
            <Button disabled={!isKids} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Hide' : 'Expand'}
            </Button>
          </Div>
          {isLoading ? (
            <Div>
              <Spinner />
            </Div>
          ) : (
            comments.map((comment: TComment) => {
              return !comment.deleted && <Comment isExpanded={isExpanded} key={comment.id} comment={comment} />;
            })
          )}
        </Group>
      </Group>
    )
  );
}
