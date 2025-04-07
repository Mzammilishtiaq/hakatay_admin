import { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import ShellContainer from "../../Containers/ShellContainer";
import Popup from "../../Shared/Popup/Popup";
import Textarea from "../../Shared/TextArea/TextArea";
import {
  fetchMessages,
  markMessageAsRead,
  setActiveTab,
  setFilter,
} from "../../redux/slice/MessageSlice/MessageSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hook";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

interface Message {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  text: string;
  date: string;
  read: boolean;
}

const ReadList: React.FC<Message> = ({ id, user, text, date }) => {
  const dispatch = useAppDispatch();
  const [replypopup, setReplyPopup] = useState(false);

  const handleMarkAsRead = (messageId: string) => {
    dispatch(markMessageAsRead(messageId));
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatar || "https://via.placeholder.com/40"} />}
          title={user.name}
          subheader={date}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {text}
          </Typography>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleMarkAsRead(id)}
            >
              Mark Unread
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => setReplyPopup((prev) => !prev)}
            >
              Reply
            </Button>
            <Button size="small" color="error">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      {replypopup && (
        <Popup
          isOpen={replypopup}
          handleClose={() => setReplyPopup(false)}
          containerClassName=""
          title="Send Message"
          borderRadius={10}
        >
          <div className="flex flex-col gap-4 px-2 py-2">
            <h5 className="text-lg font-semibold text-black">Reply</h5>
            <Textarea
              className="w-full rounded-md border border-gray-300"
              name={"message"}
              placeholder="Your Message"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outlined"
                onClick={() => setReplyPopup(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

const TrashList: React.FC<Message> = ({ user, text, date }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.avatar || "https://via.placeholder.com/40"} />}
        title={user.name}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {text}
        </Typography>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button size="small" color="primary" startIcon={<IoReloadOutline />}>
            Restore
          </Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

function Message() {
  const dispatch = useAppDispatch();
  const { messages, activeTab, filter } = useAppSelector((state) => state.message);
  const totalCount = messages.length;
  const unreadCount = messages.filter((message) => !message.read).length;

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleActiveTabChange = (value: "all" | "unread" | "trash") => {
    dispatch(setActiveTab(value));
  };

  const handleFilterChange = (value: "latest" | "oldest") => {
    dispatch(setFilter(value));
  };

  return (
    <ShellContainer styleClass="ml-60">
      <div className="p-6 bg-gray-100 flex-1">
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <Tabs
            value={activeTab}
            onChange={(_event, value) => handleActiveTabChange(value)}
          >
            <Tab label={`All (${totalCount})`} value="all" />
            <Tab label={`Unread (${unreadCount})`} value="unread" />
            <Tab label="Trash (1)" value="trash" />
          </Tabs>

          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              className={`mr-2 ${filter === 'latest' ? 'bg-hikayat-accent/20 text-hikayat-accent' : ''}`}
              variant="outlined"
              onClick={() => handleFilterChange("latest")}
            >
              Latest
            </Button>
            <Button
              className={filter === 'oldest' ? 'bg-hikayat-accent/20 text-hikayat-accent' : ''}
              variant="outlined"
              onClick={() => handleFilterChange("oldest")}
            >
              Oldest
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {activeTab === "all" && (
            messages.map((message) => (
              <ReadList key={message.id} {...message} />
            ))
          )}
          {activeTab === "unread" && (
            messages
              .filter((message) => !message.read)
              .map((message) => (
                <ReadList key={message.id} {...message} />
              ))
          )}
          {activeTab === "trash" && (
            messages
              .filter((message) => message.read)
              .map((message) => (
                <TrashList key={message.id} {...message} />
              ))
          )}
        </div>
      </div>
    </ShellContainer>
  );
}

export default Message;