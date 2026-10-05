/* Demo only; put mount/destroy in the host component lifecycle. */
const demoNames = ['Violet', 'Graphite', 'Pearl'];
window.morgeDemo = Morge.mount(document.querySelector('[data-morge]'), {
  storageKey: 'skill-morge-demo-motion',
  onSelect(index) { document.querySelector('[data-demo-caption]').textContent = demoNames[index]; }
});
