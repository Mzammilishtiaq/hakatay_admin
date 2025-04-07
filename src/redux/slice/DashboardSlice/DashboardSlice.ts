import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface StatItem {
  title: string;
  value: string;
}

interface ContentItem {
  id: string;
  type: string;
  title: string;
  author: string;
  likes: number;
  image: string;
}

interface DashboardState {
  stats: StatItem[];
  contentItems: ContentItem[];
//   activeTab: 'mostLiked' | 'recent';
//   loading: boolean;
//   error: string | null;
}

const initialState: DashboardState = {
  stats: [
    { title: "Books", value: "2352" },
    { title: "Authors", value: "652" },
    { title: "Quotes", value: "34352" },
    { title: "Hikayat", value: "6298" },
  ],
  contentItems: [
    { 
      id: '1',
      type: "Hikayat", 
      title: "Title of Hikayat", 
      author: "Author Name", 
      likes: 427, 
      image: "https://media.istockphoto.com/id/1453838542/photo/last-light-on-mount-sneffels.jpg?s=2048x2048&w=is&k=20&c=UINUY9pVBNtNF0bAH8zNO-AnIXAe1RBEdCQoPWQrz_A=" 
    },
    { 
      id: '2',
      type: "Book", 
      title: "Title of Book", 
      author: "Author Name", 
      likes: 301, 
      image: "https://media.istockphoto.com/id/1453838445/photo/sneffles-last-light-panorama.webp?s=2048x2048&w=is&k=20&c=cI_zL8zWVXWt3pl2-kur_o-PLaGBbG0lYfd1D_Y0xtQ=" 
    },
    { 
      id: '3',
      type: "Quote", 
      title: "Title of Quote", 
      author: "Author Name", 
      likes: 427, 
      image: "https://media.istockphoto.com/id/685733286/photo/the-dallas-divide-in-autumn-colorado-rocky-mountains.jpg?s=2048x2048&w=is&k=20&c=4jCuTQ2cizybAStRP7GgPX7a42Kaf232SEMxl3GePwc=" 
    },
    { 
      id: '4',
      type: "Poem", 
      title: "Title of Poem", 
      author: "Author Name", 
      likes: 185, 
      image: "https://media.istockphoto.com/id/543213308/photo/autumn-in-the-german-mountains.jpg?s=2048x2048&w=is&k=20&c=AkeKeFAgwBbXowT8T1wSGhf5Az4MN_kky16VLUoDw1g=" 
    }
  ],
//   activeTab: 'mostLiked',
//   loading: false,
//   error: null
};

// Example async thunk for fetching dashboard data (would connect to an API in real app)
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return initialState;
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // setActiveTab: (state, action: PayloadAction<'mostLiked' | 'recent'>) => {
    //   state.activeTab = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchDashboardData.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        // state.loading = false;
        state.stats = action.payload.stats;
        state.contentItems = action.payload.contentItems;
      })
    //   .addCase(fetchDashboardData.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

// export const { setActiveTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
