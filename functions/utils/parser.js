class Parser {
    
    parseDate(text){
        return [text || null]
            .map(e => e && e.match(/(?<=date.*)(\d(\d|\/)*)(?=\s)/i))
            .map(e => e && e.shift())
            .map(e => e && e.split('/'))
            .map(e => e && e.map(e => e-0))
            .map(e => e && [ e[2], e[1]-1, e[0] ])
            .map(e => e && new Date(e))
            .shift()
    }
    parseLocation(text){
        return [text || null]
            .map(e => e && e.match(/(?<=held at.*)(\w(\w| )*)(?=\s)/i))
            .map(e => e && e.shift())
            .map(e => e && e.toLowerCase())
            .shift()
    }
    numberAfter(text,pattern){
        return [{text: text || null, pattern: pattern || null}]
            .map(e => e.text && e.pattern && e)
            .map(e => e && {...e, pattern: new RegExp(`(?<=${pattern}.*)(\\d(\\d|,)*)(?=\\D)`,'i')})
            .map(e => e && e.text.match(e.pattern))
            .map(e => e && e.shift())
            .map(e => e && e.replaceAll(',',''))
            .map(e => e && e-0)
            .shift()
    }
    bondIdsBetween(text,pattern1,pattern2){
        return [{text: text || null, pattern1: pattern1 || null, pattern2: pattern2 || null}]
            .map(e => e.text && e.pattern1 && e.pattern2 && e)
            .map(e => e && {...e, pattern: new RegExp(`(?<=${pattern1}(.|\n)*)(\\d{6})(?=(.|\n)*${pattern2})`,'ig')})
            .map(e => e && e.text.match(e.pattern))
            .shift()
    }
}

export default new Parser()