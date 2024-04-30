import { Icon56UserSquareOutline } from '@vkontakte/icons';
import { Accordion, Div, Group, SimpleCell } from '@vkontakte/vkui';
import { TComment } from '../types';
import { countComments, timeConverter } from '../utils';
import ReactHtmlParser from 'react-html-parser';
import { getComment } from '../utils/api';
import { useEffect, useState } from 'react';

type Props = {
  comment: TComment;
};

export default function Comment({ comment }: Props) {
  const [kids, setKids] = useState<TComment[]>([]);

  useEffect(() => {
    if (!comment.kids) {
      setKids([]);
      return;
    }
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
      <Accordion>
        <Accordion.Summary>Answers: {countComments(kids)}</Accordion.Summary>
        {kids.map((kid) => {
          return (
            <Accordion.Content key={kid.id}>
              <Comment comment={kid} />
            </Accordion.Content>
          );
        })}
      </Accordion>
    </Group>
  );
}
