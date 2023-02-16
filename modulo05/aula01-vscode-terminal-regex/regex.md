# Tips n
`\w+`: Will return every letter until it reaches a special character or word's end
`\s`: Returns white space
`\S`: skips white space
`()`: groups regex expressions
`\d`: Retrieves Numbers
`{Insert your number here}`: Quantity Identifier
`?`: Stop at the end of the first match
`$`: Is the mark to stop regex at that specif line
`(\w+):\s.*,`

### Retrieve a CPF wit matching: ddd.ddd.ddd.-dd

`^\d{3}.\d{3}.\d{3}-\d{2}$`

![RetrieveAList](/assets/list.jpeg)


### Turning a list of words into a json
![Example](/assets/replaceJson.jpeg)

Initial List:

Everything, Machine
Hell, Lima
Flutter, boy
Bia, bibia

`^(\w+),(\s\w+)$`

replace expression: `{firstName: "$2", lastName: "$1"}`

Grouping regex expressions returns an N list of results. 
The first element of the list is always the full match. The N following results are your groups.

### Turning a markdown example into an html page

Regex Expression: `\[(.*?)\]\(([http|https].*?)\)`

Replace expression: `<a href="$2">"$1"</a>`

`[(.*?)\]`: Returns everything inside []
`(([http|https].*?)\)`: Returns everything inside () starting with http or https

"0 [Erick Wendel](http://www.youtube.com/watch?v=e-ORhEE9VVg) faz palestras e você deveria seguil-lo também lá no [Twitter](https://twitter.com/hell)

Aj e pode pesquisar no[Google](https://www.google.com.br/) ou[https://yahoo.com]

vai que vai"