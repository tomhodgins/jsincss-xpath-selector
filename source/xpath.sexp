mixin('xpath', ['selector', 'rule'],
  prelude('  const tags = []\n\
\n\
  const result = document.evaluate(\n\
    selector,\n\
    document,\n\
    null,\n\
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\n\
    null\n\
  )\n\
\n\
  for (let i=0; i < result.snapshotLength; i++) {\n\
\n\
    tags.push(result.snapshotItem(i))\n\
\n\
  }\n\n',
    returnValue('tags',
      reduceFunc(
        createAttribute(['selector'],
          addAttribute('tag', 'xpath',
            addRule('', '', 'xpath')))))))
