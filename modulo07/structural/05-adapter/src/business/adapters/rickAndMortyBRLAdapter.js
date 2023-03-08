import RickAndMortyBRL from '../integration/rickAndMortyBRL'

export default class RickAndMortyBRLAdapter {
    static async getCharaters() {
        return RickAndMortyBRL.getCharactersFromJSON()
    }
}
