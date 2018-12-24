module.exports = (selector, rule) => {
  const attr = selector.replace(/\W/g, '')
  const tags = []
  const query = document.evaluate(
    selector,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  )
  for (let i=0; i < query.snapshotLength; i++) {
    tags.push(query.snapshotItem(i))
  }
  const result = tags
    .reduce((output, tag, count) => {
      output.add.push({tag: tag, count: count})
      output.styles.push(`[data-xpath-${attr}="${count}"] { ${rule} }`)
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-xpath-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-xpath-${attr}`, ''))
  return result.styles.join('\n')
}
