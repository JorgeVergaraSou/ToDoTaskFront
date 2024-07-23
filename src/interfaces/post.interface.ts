import { Pet } from './pet.interface'

export interface Post {
  idPost: string
  typePost: string
  title: string
  content: string
  postDate: Date
  isActive: number
  softDeleteDate: Date
  userIdFk: number
  pets: Pet[]
}

export interface PostProps {
  idPost: string | null;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}
