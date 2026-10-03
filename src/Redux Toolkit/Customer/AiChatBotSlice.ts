import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { aiChatBotService } from "../../services/serviceFactory";

interface AiChatBotState {
  response: string | null;
  loading: boolean;
  error: string | null;
  messages: any[];
}

const initialState: AiChatBotState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

export const chatBot = createAsyncThunk<
  any,
  { prompt: any; productId: number | null | undefined; userId: number | null }
>(
  "aiChatBot/generateResponse",
  async ({ prompt, productId, userId }, { rejectWithValue }) => {
    try {
      const data = await aiChatBotService.sendChatPrompt(prompt, productId, userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to generate chatbot response"
      );
    }
  }
);

const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatBot.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const { prompt } = action.meta.arg;
        const userPrompt = { message: prompt.prompt, role: "user" };
        state.messages = [...state.messages, userPrompt];
      })
      .addCase(chatBot.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.messages = [...state.messages, action.payload];
      })
      .addCase(chatBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default aiChatBotSlice.reducer;
