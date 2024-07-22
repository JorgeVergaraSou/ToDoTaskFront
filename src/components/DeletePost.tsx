import React, { useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import { PostProps } from '../interfaces/post.interface';

export const DeletePost: React.FC<PostProps> = ({ idPost }) => {
    const context = useContext(UserContext);
    const { token } = context!;

    const deletePost = async () => {
        const response = await fetch('http://localhost:3006/api/v1/posts/${idPost}', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        })
    }
    return (
        <>
        </>
    )
}