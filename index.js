module.exports = (selector, rule) => {

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

  return tags

    .reduce((styles, tag, count) => {

      const attr = selector.replace(/\W/g, '')

      tag.setAttribute(`data-xpath-${attr}`, count)
      styles += `[data-xpath-${attr}="${count}"] { ${rule} }\n`
      count++

      return styles

    }, '')

}
