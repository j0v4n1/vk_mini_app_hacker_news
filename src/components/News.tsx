import { Button, CardGrid, Div } from '@vkontakte/vkui';
import NewsItem from './NewsItem';
import { useAppDispatch, useAppSelector } from '../service/store/index.types';
import { useEffect } from 'react';
import { getNews } from '../service/slices/news';

export default function News() {
  const { loading, news } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();

  const refreshNews = () => {
    dispatch(getNews());
  };

  useEffect(() => {
    refreshNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshNews();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [news]);

  return (
    <>
      <Div style={{ paddingTop: 0 }}>
        <Button disabled={loading} onClick={refreshNews} id="1">
          Обновить
        </Button>
      </Div>
      <CardGrid size="l">
        {news.slice(0, 226).map((newsItem: number) => {
          return <NewsItem key={newsItem} id={newsItem} />;
        })}
      </CardGrid>
    </>
  );
}
