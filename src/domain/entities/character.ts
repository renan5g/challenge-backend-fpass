import { ValueObject } from '@core/entities/value-object';

export interface CharacterProps {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

export class Character extends ValueObject<CharacterProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get thumbnail() {
    return this.props.thumbnail;
  }

  static create(props: CharacterProps) {
    return new Character(props);
  }
}
