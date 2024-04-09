import { ChatEngine } from 'react-chat-engine';
import ChatFeed from '../components/ChatFeed/ChatFeed';
import './CSS/Forum.css';

export const Forum = () => {

  return (
    <div className='forum'>
      <ChatEngine
        height="90vh"
        projectID="3a2c7ff7-d120-4899-a273-907962b4b4e0"
        userName="abarua"
        userSecret="UD.NZqUP6t@#u-b"
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </div>
  );
}
