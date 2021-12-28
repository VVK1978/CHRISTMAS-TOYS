export default function getTreeSrc(count: number) {
  return import(`../../public/assets/images/tree/${count}.png`).then((_data) => _data.default);
}
