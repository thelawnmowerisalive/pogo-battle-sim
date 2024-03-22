import './App.css';
import { Timeline, TimelineBlip, TimelineEvent } from 'react-event-timeline';
import SmsIcon from '@mui/icons-material/Sms';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { MarkChatRead } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <Timeline>
        <TimelineEvent title="John Doe sent a SMS"
          createdAt="2016-09-12 10:06 PM"
          icon={<SmsIcon />}
        >
          I received the payment for $543. Should be shipping the item within a couple of hours.
        </TimelineEvent>
        <TimelineBlip
          title="just a blip"
          icon={<MarkChatRead />}>
        </TimelineBlip>
        <TimelineEvent
          title="You sent an email to John Doe"
          createdAt="2016-09-11 09:06 AM"
          icon={<MarkEmailReadIcon />}
        >
          Like we talked, you said that you would share the shipment details? This is an urgent order and so I
          am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
          gentle reminder if you are on track already!
        </TimelineEvent>
      </Timeline>
    </div>
  );
}

export default App;
