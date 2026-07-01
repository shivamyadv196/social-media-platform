import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        // actions
        setAuthUser:(state,action) => {
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action) => {
            state.suggestedUsers = action.payload;
        },
        removeSuggestedUser: (state, action) => {
            state.suggestedUsers = state.suggestedUsers.filter(
                (user) => user._id !== action.payload
            );
        },
        setUserProfile:(state,action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action) => {
            state.selectedUser = action.payload;
        },
        updateUserFollowing: (state, action) => {
        const userId = action.payload;

        if (!state.user) return;

        if (state.user.following.includes(userId)) {
            state.user.following = state.user.following.filter(
                (id) => id !== userId
            );
        } else {
            state.user.following.push(userId);
        }
        },

        updateUserFollowers: (state, action) => {
            state.user.followers = action.payload;
        },
        }
});
export const {
    setAuthUser, 
    setSuggestedUsers, 
    setUserProfile,
    setSelectedUser,
    removeSuggestedUser,
    updateUserFollowing,
    updateUserFollowers,
} = authSlice.actions;
export default authSlice.reducer;