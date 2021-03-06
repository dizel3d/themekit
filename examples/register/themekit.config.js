const { Api } = require('../../src/index')

Api.registerTransform({
  name: 'custom-transform',
  type: 'name',
  transformer(token) {
    return token.path.join('-')
  },
})

Api.registerFormat({
  name: 'custom-format',
  formatter(dictionary) {
    const props = dictionary.allProperties
      .map((token) => `  --${token.name}: ${token.value};`)
      .join('\n')
    return `:root {\n${props}\n}\n`
  },
})

module.exports = {
  entry: {
    default: './themes/default.theme.json',
  },
  output: {
    css: {
      transforms: ['custom-transform'],
      buildPath: './themes',
      files: [
        {
          destination: '[entry]/[platform]/root.css',
          format: 'custom-format',
          options: {
            useAliasVariables: true,
          },
        },
      ],
    },
  },
}
