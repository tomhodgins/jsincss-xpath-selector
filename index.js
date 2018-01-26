export default (selector, rule) => {

  let styles = ''
  let count = 0

  const tags = []
  const result = document.evaluate(
                   selector,
                   document,
                   null,
                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                   null
                 )

  for (let i=0; i < result.snapshotLength; i++) {

    tags.push(result.snapshotItem(i))

  }

  tags.forEach(tag => {

    const attr = selector.replace(/\W/g, '')

    tag.setAttribute(`data-xpath-${attr}`, count)
    styles += `[data-xpath-${attr}="${count}"] { ${rule} }\n`
    count++

  })

  return styles

}