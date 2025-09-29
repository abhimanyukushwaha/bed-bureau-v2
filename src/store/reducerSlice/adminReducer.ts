import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  forgotPassword,
  changePassword,
  resetPassword,
  adminLogin,
  updateProfile,
  getProfile,
  adminLogout,
} from "../actions/adminAction";

// If Profile is imported, extend it; otherwise, ensure index signature matches Profile
// import { Profile } from 'path-to-profile'; // Uncomment and adjust if Profile is imported

export interface AdminDetail {
  id?: string;
  name?: string;
  email?: string;
  // Add other specific properties as needed
}

export interface AdminState {
  isAdminLoggedIn: boolean;
  adminDetail: AdminDetail | null | unknown;
  error: string | null;
  isLoader: boolean;
  isRecordUpdated: boolean;
  invalidJwtToken: boolean;
}

const initialState: AdminState = {
  isAdminLoggedIn: false,
  adminDetail: null,
  error: null,
  isLoader: false,
  isRecordUpdated: false,
  invalidJwtToken: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    checkAdmin: (state, { payload }: PayloadAction<string | null>) => {
      state.isAdminLoggedIn = !!payload;
    },
    adminManage: (state) => {
      state.isAdminLoggedIn = true;
    },
    adminReset: (state) => {
      state.error = null;
      state.isLoader = false;
      state.isRecordUpdated = false;
    },
    resetError: (state) => {
      state.error = null;
      state.isLoader = false;
    },
    adminLogoutSuccess: (state) => {
      state.isAdminLoggedIn = false;
      state.adminDetail = null;
      state.error = null;
      state.isLoader = false;
      state.isRecordUpdated = false;
    },
    adminLogoutFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.error = null;
        state.isAdminLoggedIn = false;
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        console.log("adminLogin payload", payload);
        state.error = null;
        state.isAdminLoggedIn = true;
        state.adminDetail = payload.data ?? null;
      })
      .addCase(adminLogin.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.adminDetail = null;
        state.isAdminLoggedIn = false;
        state.error = payload ?? "Login failed";
      })

      // Admin Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.isAdminLoggedIn = false;
        state.adminDetail = null;
        state.error = null;
        state.isLoader = false;
        state.isRecordUpdated = false;
      })
      .addCase(adminLogout.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Logout failed";
        state.isLoader = false;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.isLoader = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.error = null;
        state.isLoader = false;
        state.isRecordUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Update profile failed";
        state.isLoader = false;
      })

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.error = null;
        state.isLoader = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoader = false;
        state.isAdminLoggedIn = true;
        state.adminDetail = payload.data ?? null;
      })
      .addCase(getProfile.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Get profile failed";
        state.isAdminLoggedIn = false;
        state.isLoader = false;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
        state.isLoader = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.error = null;
        state.isLoader = false;
        state.isRecordUpdated = true;
      })
      .addCase(forgotPassword.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Forgot password failed";
        state.isLoader = false;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.error = null;
        state.isLoader = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.error = null;
        state.isLoader = false;
        state.isRecordUpdated = true;
      })
      .addCase(changePassword.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Change password failed";
        state.isLoader = false;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
        state.isLoader = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
        state.isLoader = false;
        state.isRecordUpdated = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
        state.error = payload ?? "Reset password failed";
        state.isLoader = false;
      });
  },
});

export const {
  adminManage,
  adminReset,
  adminLogoutSuccess,
  adminLogoutFailure,
  checkAdmin,
  resetError,
} = adminSlice.actions;

export default adminSlice.reducer;
