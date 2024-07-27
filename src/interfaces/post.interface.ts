import { Pet } from './pet.interface'

export interface Post {
  id: number;
  title: string;
 
  description: string;

  status: boolean;

  createdAt: Date;

  deletedAt: Date;

  updatedAt: Date;
}

export interface PostProps {
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  onCloseModal: () => void;

}
export interface DeletePostProps {
  idPost: string;
  setMessage: (message: string | null) => void;
  onDeleteSuccess: (idPost: string) => void;
}

