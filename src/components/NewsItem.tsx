import { useEffect, useState } from 'react';
import { getNewsItem } from '../utils/api';
import { Card, Div, SimpleCell, Title } from '@vkontakte/vkui';
import { TNews } from '../types';
import { timeConverter } from '../utils';
import { useAppDispatch, useAppSelector } from '../service/store/index.types';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { setActiveNewsItem } from '../service/slices/news';
import { Icon56UserSquareOutline } from '@vkontakte/icons';

export default function NewsItem({ id }: { id: number }) {
  const routeNavigator = useRouteNavigator();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<TNews | null>(null);
  const { news } = useAppSelector((store) => store.news);

  useEffect(() => {
    getNewsItem(id).then((data: TNews) => {
      setItem(data);
    });
  }, [news]);

  if (!item || !item.kids || !item.url) {
    return null;
  }
  return (
    <Card
      onClick={() => {
        dispatch(setActiveNewsItem(item));
        routeNavigator.push(`news/${item.id}`);
      }}
      mode="shadow"
      style={{
        cursor: 'pointer',
      }}>
      <Div>
        <Div>
          <Title>{item.title}</Title>
        </Div>
        <SimpleCell before={<Icon56UserSquareOutline />}>{item.by}</SimpleCell>
        <SimpleCell>
          {timeConverter(item.time)}, rating: {item.score}
        </SimpleCell>
      </Div>
    </Card>
  );
}
