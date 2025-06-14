import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (userId) => {
        if (!userId) return set({ currentUser: null, isLoading: false });

        try {
            // set({ isLoading: true });
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            return set({ currentUser: null, isLoading: false });
        }
    },
}));

export default useUserStore;
