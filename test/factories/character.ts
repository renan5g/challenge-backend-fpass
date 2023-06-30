import { Character, CharacterProps } from '@domain/entities/character';
import { randomUUID } from 'node:crypto';

type Override = Partial<CharacterProps>;

export function makeCharacter(override: Override = {}) {
  return Character.create({
    id: randomUUID(),
    name: 'Character Test',
    description: 'description',
    thumbnail: 'https://picsum.photos/200/300',
    ...override,
  });
}
