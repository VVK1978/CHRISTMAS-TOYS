import { getSort } from '../store/storage';
import { TQuery, Data } from '../types';
import { sortData } from './';

export default function filterData(query: TQuery, data: Data[]): Data[] {
  const { name = '', count, year, shape, color, size, favorite } = query;
  const sort: string = getSort();
  sortData(data, sort);
  return data
    .filter((_data) => +_data.year >= year[0] && +_data.year <= year[1])
    .filter((_data) => +_data.count >= count[0] && +_data.count <= count[1])
    .filter((_data) =>
      shape!.length > 0
        ? _data.shape === shape![0] || _data.shape === shape![1] || _data.shape === shape![2]
        : _data
    )
    .filter((_data) =>
      color.length > 0
        ? _data.color === color[0] ||
          _data.color === color[1] ||
          _data.color === color[2] ||
          _data.color === color[3] ||
          _data.color === color[4]
        : _data
    )
    .filter((_data) =>
      size.length > 0
        ? _data.size === size[0] || _data.size === size[1] || _data.size === size[2]
        : _data
    )
    .filter((_data) => (favorite ? _data.favorite === true : _data))
    .filter((_data) => _data.name.toLowerCase().match(name.toLowerCase()));
}
