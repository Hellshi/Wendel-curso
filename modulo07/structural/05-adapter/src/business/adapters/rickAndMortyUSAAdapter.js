import RickAndMortyUSA from "../integration/rickAndMortyUSA"

export default class RickAndMortyUSAAdapter {
    static async getCharaters() {
        return RickAndMortyUSA.getCharactersFromXML()
    }
}
