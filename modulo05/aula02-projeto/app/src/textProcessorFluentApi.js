/* 

   The objective of this pattern is to execute tasks as pipelines, 
   step by step. At the end a build command is ran. It's very similar to Builder Pattern
   Builder Pattern is, however, about object build and Fluent API is about process

*/
class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {

        /*
            Regex Explanation:

            ?<= extract all data which comes AFTER this group
            [contratada | contratante]: One or the other (i in gmi means this should be case insensitive)
            :\s{1} searches data containing : after a blank space

            (?!\s) negative look around (?!). Since it's followed by \s it will ignore all data that is followed by a blank space and no character
            .*\n matches text after a line break
            .*? non greety the ? makes the match stop in the first occurrence

            $ the search should stop at the end of the line
        */

        const matchPerson = /(?<=[contratada | contratante]:\s{1})(?!\s)(.*\n.*?)$/gmi
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this

    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI