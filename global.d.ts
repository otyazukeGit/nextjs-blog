// Since there is no type declaration in packages and DefinitelyTypes, it need to add the follows on top level.
declare module 'remark-html' {
  const html: any
  export default html
}
