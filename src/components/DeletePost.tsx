// src/components/DeletePost.tsx
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';
import { PostProps } from '../interfaces/post.interface';

export const DeletePost: React.FC<PostProps> = ({ idPost, setErrorMsg }) => {
    const context = useContext(UserContext);
    const { token } = context!;

    useEffect(() => {
        const deletePost = async () => {
            try {
                const response = await fetch(`http://localhost:3006/api/v1/posts/${idPost}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                });

                if (response.ok) {
                    console.log('Post deleted successfully');
                } else {
                    setErrorMsg('Failed to delete post');
                }
            } catch (error) {
                setErrorMsg('An error occurred');
            }
        };

        deletePost();
    }, [idPost, token, setErrorMsg]);

    return null;
}
