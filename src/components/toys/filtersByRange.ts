import { MIN_COUNT, MAX_COUNT, MIN_YEAR, MAX_YEAR } from '../../constants';
import { Step } from '../../enums/step';
import { setStorage, getStorage } from '../../store';
import { TQuery } from '../../types';
import { sendQuery } from '../../utils';
import { Cards, noUiSlider } from './index';

export default class FiltersByRange {
  public query: TQuery;

  private cards: Cards;

  private elementsCount: string[];

  private elementsYear: string[];

  private countValues: number[];

  private yearValues: number[];

  constructor() {
    this.cards = new Cards();
    this.query = getStorage();
    this.elementsCount = ['.count__min', '.count__max'];
    this.elementsYear = ['.year__min', '.year__max'];
    this.countValues = [MIN_COUNT, MAX_COUNT];
    this.yearValues = [MIN_YEAR, MAX_YEAR];
  }

  render(): string {
    const filters = getStorage();
    const html = `
      <div class="filters__range">
        <h2 class="filter__title">ФИЛЬТРЫ ПО ДИАПАЗОНУ</h2>
          <div class="range__count">
            <span>
              Количество экземпляров:
            </span>
            <div class="slider__container">
              <div class="count__min">${filters.count[0]}</div>
                <div id="slider-count"></div>
              <div class="count__max">${filters.count[1]}</div>
            </div>
          </div>
        <div class="range__year">
          <span>
            Год приобритения:
          </span>
            <div class="slider__container">
              <div class="year__min">${filters.year[0]}</div>
                <div id="slider-year"></div>
              <div class="year__max">${filters.year[1]}</div>
            </div>
        </div>
      </div>
    `;
    return html;
  }

  noUiSlider(): void {
    const sliderCount: noUiSlider.Instance = document.getElementById('slider-count') as HTMLElement;
    this.sliderCreate(sliderCount, this.countValues, 'count', Step.stepCount);
    sliderCount.noUiSlider.on('change', (values: number[]) => {
      this.displayValuesSlider(this.elementsCount, values);
      this.setQuery();
    });

    const sliderYear: noUiSlider.Instance = document.getElementById('slider-year') as HTMLElement;
    this.sliderCreate(sliderYear, this.yearValues, 'year', Step.stepYear);
    sliderYear.noUiSlider.on('change', (values: number[]) => {
      this.displayValuesSlider(this.elementsYear, values);
      this.setQuery();
    });
  }

  sliderCreate(slider: noUiSlider.Instance, startValue: number[], key: string, step: number): void {
    noUiSlider.create(slider, {
      start: [getStorage()[key][0], getStorage()[key][1]],
      connect: true,
      step: step,
      range: {
        min: startValue[0],
        max: startValue[1],
      },
    });
  }

  resetSliders(): void {
    const sliderCount: noUiSlider.Instance = document.getElementById('slider-count') as HTMLElement;
    sliderCount.noUiSlider.set(this.countValues);
    this.displayValuesSlider(this.elementsCount, this.countValues);

    const sliderYear: noUiSlider.Instance = document.getElementById('slider-year') as HTMLElement;
    sliderYear.noUiSlider.set(this.yearValues);
    this.displayValuesSlider(this.elementsYear, this.yearValues);
    sendQuery();
  }

  displayValuesSlider(elementsData: string[], values: number[]): void {
    values.forEach((value, index) => {
      const element = document.querySelector(elementsData[index]) as HTMLElement;
      element.innerHTML = `${parseInt(`${value}`)}`;
    });
  }

  setQuery(): void {
    const sliderCount: noUiSlider.Instance = document.getElementById('slider-count') as HTMLElement;
    const sliderYear: noUiSlider.Instance = document.getElementById('slider-year') as HTMLElement;
    const countValues = sliderCount.noUiSlider.get();
    const yearValues = sliderYear.noUiSlider.get();
    const filters = getStorage();
    filters.count = countValues.map((value: number) => parseInt(`${value}`));
    filters.year = yearValues.map((value: number) => parseInt(`${value}`));
    setStorage(filters);
    sendQuery();
  }
}
