import { getStorage } from '../../store';

export default function search(): string {
  return `
        <div class="control__header-search">
          <input 
            type="search" 
            class="search__input" 
            autocomplete="off" 
            placeholder="Поиск..."
          />
          <div class="search__icon ${getStorage().name.length === 0 ? 'search' : 'delete'}"></div>
        </div>
        `;
}
