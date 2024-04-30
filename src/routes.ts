import { RouteWithRoot, createHashRouter } from '@vkontakte/vk-mini-apps-router';

// Массив объектов, указывающих маршруты
const routes: RouteWithRoot[] = [
  {
    path: '/',
    panel: 'home_panel',
    view: 'home_view',
    root: 'home_root',
  },
  {
    path: '/news/:id',
    panel: 'news_panel',
    view: 'news_view',
    root: 'news_root',
  },
];

export const router = createHashRouter(routes);
