import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { create } from 'zustand';

const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        // if (!uid) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(db, 'users', uid);
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
