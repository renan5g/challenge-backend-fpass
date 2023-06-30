import { Entity, UniqueEntityID } from '@core/entities';
import { Optional } from '@core/types';
import { Character } from './character';

export interface FavoriteProps {
  createdAt: Date;
  character: Character;
}

export class Favorite extends Entity<FavoriteProps> {
  get character() {
    return this.props.character;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<FavoriteProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    return new Favorite(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
