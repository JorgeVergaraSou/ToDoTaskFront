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
  idPost: number | null;
  setIdPost: (id: number | null) => void;
  onCloseModal: () => void;
}
