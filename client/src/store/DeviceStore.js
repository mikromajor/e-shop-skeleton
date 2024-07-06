import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._categories = [];
    this._brands = [];
    this._devices = [
      { id: 1, name: "smartphone" },
      { id: 2, name: "TV" },
      { id: 3, name: "Iron" },
      { id: 4, name: "Car" },
      { id: 5, name: "Bice" },
    ];
    this._selectedCategory = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedCategory(category) {
    this.setPage(1);
    this._selectedCategories = category;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get categories() {
    return this._categories;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
