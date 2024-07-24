import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';
import { DeletePostProps } from '../interfaces/post.interface'



export const DeletePost: React.FC<DeletePostProps> = ({ idPost, setMessage }) => {
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

                console.log(response);

                if (response.ok) {
                    setMessage('Post deleted successfully');
                } else {
                    const errorMsg = await response.text();
                    setMessage(`Failed to delete post: ${errorMsg}`);
                }
            } catch (error) {
                setMessage('An error occurred');
            }
        };

        deletePost();
    }, [idPost, token, setMessage]);

    return null;
};
