import { AppRoot, SplitLayout, SplitCol, View, Panel, PanelHeader, usePlatform, Root, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import NewsDetails from './NewsDetails';
import News from './News';

export default function App() {
  const platform = usePlatform();
  const routeNavigator = useRouteNavigator();
  const { view, panel } = useActiveVkuiLocation();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <PanelHeader>
            <Title
              style={{ cursor: 'pointer' }}
              onClick={() => {
                routeNavigator.push('/');
              }}>
              Hacker News
            </Title>
          </PanelHeader>
          <Root activeView={view || ''}>
            <View nav="home_view" activePanel={panel || ''}>
              <Panel nav="home_panel" id="home">
                <News />
              </Panel>
            </View>
            <View nav="news_view" activePanel={panel || ''}>
              <Panel nav="news_panel" id="news">
                <NewsDetails />
              </Panel>
            </View>
          </Root>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
