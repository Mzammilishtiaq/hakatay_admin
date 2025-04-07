import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

interface MessagesState {
  messages: Message[];
  activeTab: 'all' | 'unread' | 'trash';
  filter: 'latest' | 'oldest';
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [
    {
      id: '1',
      user: {
        name: 'User Name',
        avatar: '',
      },
      text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      date: '12:45 PM',
      read: false
    },
    {
      id: '2',
      user: {
        name: 'User Name',
        avatar: '',
      },
      text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      date: '10:30 AM',
      read: true
    }
  ],
  activeTab: 'all',
  filter: 'latest',
  loading: false,
  error: null
};

// Example async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  'messages/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return initialState.messages;
    } catch (error) {
      return rejectWithValue('Failed to fetch messages');
    }
  }
);

export const markMessageAsRead = createAsyncThunk(
  'messages/markAsRead',
  async (messageId: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return messageId;
    } catch (error) {
      return rejectWithValue('Failed to update message');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'all' | 'unread' | 'trash'>) => {
      state.activeTab = action.payload;
    },
    setFilter: (state, action: PayloadAction<'latest' | 'oldest'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const messageId = action.payload;
        const message = state.messages.find(msg => msg.id === messageId);
        if (message) {
          message.read = true;
        }
      });
  },
});

export const { setActiveTab, setFilter } = messagesSlice.actions;
export default messagesSlice.reducer;
