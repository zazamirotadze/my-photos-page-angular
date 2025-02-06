/** 
 * აღწერს სახელს ინგლისურ და ქართულ ენაზე.
 */
interface LocalizedName { 
    name: string;
    nameGeo: string;
}

/**
 * ფოტო მეტამონაცემებთან ერთად.
 */
interface Photo extends LocalizedName {
    id: string;
    url: string;
}

/**
 * კატეგორიის ინტერფეისი, რომელიც შეიცავს ფოტოების სიას.
 */
interface Category extends LocalizedName {
    data: Photo[];
}

/**
 * აპლიკაციაში მხარდაჭერილი ენის ინტერფეისი.
 */
interface Language {
    languageCode: string;
    languageName: string;
}

/**
 * ფოტოების საერთო მოდელი, 
 * რომელშიც შედის აპლიკაციაში არსებული ენები და კატეგორიები.
 */
interface PhotosModel {
    languages: Language[];
    categories: Category[];
}

export type { LocalizedName, Photo, Category, Language, PhotosModel };
