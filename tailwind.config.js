module.exports = {
  content: ["./templates/**/*.{pug,html}"],
  theme: {
    variants: {
      borderStyle: ['responsive', 'first', 'last', 'odd', 'even'],
      borderWidth: ['responsive', 'first', 'last', 'odd', 'even'],
      borderColor: ['responsive', 'first', 'last', 'odd', 'even'],
    },
    extend: {

    },
  },
  plugins: [],
}