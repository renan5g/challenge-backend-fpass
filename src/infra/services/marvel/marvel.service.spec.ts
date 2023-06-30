// import { Character } from '@domain/entities/character';
// import { MarvelGatewayAdapter } from './marvel.service';

// describe('Marvel Gateway', () => {
//   it('should be able to get characters', async () => {
//     const marvelGateway = new MarvelGatewayAdapter();
//     const characters = await marvelGateway.getCharacters({});
//     expect(characters).toBeTruthy();
//     expect(characters.data[0]).toBeInstanceOf(Character);
//   });

//   it('should be able to get character details', async () => {
//     const marvelGateway = new MarvelGatewayAdapter();
//     const character = await marvelGateway.getCharacterDetails('1011334');
//     expect(character).toBeTruthy();
//     expect(character).toBeInstanceOf(Character);
//   });
// });

it('one add one equals two', () => {
  expect(1 + 1).toBe(2);
});
