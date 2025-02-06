import { Injectable } from '@angular/core';
import photos from './photosData';
import { LocalizedName, Photo, PhotosModel, Language} from './photosDataModels';
import { freeze } from 'immer';

@Injectable({
  providedIn: 'root'
})
export class PhotosDataService {
  /**
   * ნაგულისხმევი კატეგორიის სახელი.
   */
  private readonly defaultCategory: string = 'All'

  /**
   * ფოტოს მონაცემები, რომელიც შეიცავს კატეგორიებსა და ენების სიას.
   * მონაცემები გაყინულია, რათა თავიდან ავიცილოთ ცვლილებები.
   */
  private readonly photosData: PhotosModel | null = freeze(photos, true) ?? null;

  /**
   * აბრუნებს კატეგორიების სახელებს ინგლისურ და ქართულ ენაზე.
   * @returns {LocalizedName[] | null} კატეგორიების სახელების სია ან null, თუ მონაცემები არ არსებობს.
   */
  getCategoriesNames(): LocalizedName[] | null {
    return this.photosData?.categories?.map(({ name, nameGeo }) => ({ name, nameGeo })) ?? null;
  }

  /**
   * აბრუნებს ყველა ფოტოს მოცემული კატეგორიისთვის. თუ კატეგორია არ არის მითითებული, აბრუნებს ნაგულისხმევ კატეგორიას.
   * @param {string} [categoryName] - კატეგორიის სახელი (არასავალდებულო).
   * @returns {Photo[] | null} ფოტოების სია ან null, თუ კატეგორია ვერ მოიძებნა.
   */
  getAllPhotos(categoryName?: string): Photo[] | null {
    const category = categoryName 
    ? this.photosData?.categories?.find(category => category.name === categoryName) 
    : this.photosData?.categories?.find(category => category.name === this.defaultCategory);

    return category?.data ?? null;
  }

  /**
   * აბრუნებს მხარდაჭერილი ენების სიას.
   * @returns {Language[] | null} ენების სია ან null, თუ მონაცემები არ არსებობს.
   */
  getLanguages(): Language[] | null {
    return this.photosData?.languages ?? null;
  }

  /**
   * პოულობს და აბრუნებს კონკრეტულ ფოტოს მისი უნიკალური ამომცნობის (ID) მიხედვით.
   * თუ ID არგუმენტი არ არის მითითებული, აბრუნებს null.
   * @param {string} id - ფოტოს უნიკალური ამომცნობი.
   * @returns {Photo | null} ფოტო ან null, თუ არ მოიძებნა.
   */
  getPhoto(id?: string): Photo | null {
    if (!id) {
      return null;
    }

    return this.photosData?.categories
    ?.find(category => category.name === this.defaultCategory)
    ?.data
    .find(photo => photo.id === id) ?? null;
  }
}
