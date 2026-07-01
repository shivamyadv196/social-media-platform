import { useEffect, useState } from "react";
import axios from "axios";

const useGetFollowersFollowing = (userId, type, open) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || !userId) return;

        const fetchUsers = async () => {
            try {
                setLoading(true);

                const endpoint =
                    type === "followers"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/user/${userId}/followers`
                        : `${import.meta.env.VITE_API_URL}/api/v1/user/${userId}/following`;

                const res = await axios.get(endpoint, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setUsers(res.data.users);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userId, type, open]);

    return {
        users,
        loading,
    };
};

export default useGetFollowersFollowing;