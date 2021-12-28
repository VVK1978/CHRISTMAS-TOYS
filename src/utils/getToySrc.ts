export default function getToySrc(count: number): Promise<string> {
  return import(`../../public/assets/images/toys/${count}.png`).then((_data) => _data.default);
}
