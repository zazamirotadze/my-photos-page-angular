import { Injectable, ElementRef, DestroyRef, inject, WritableSignal, signal, Renderer2 } from '@angular/core';

/**
 * @service OutsideClickService
 * 
 * ეს სერვისი მართავს მენიუს ხილვადობას გარე დაწკაპუნების და ფანჯრის ზომის პირობების მიხედვით.
 * იყენებს Angular-ის Renderer2-ს მოვლენის დამუშავებისთვის და DestroyRef-ს რესურსების გასაწმენდად.
 */
@Injectable()
export class OutsideClickService {
  private isMenuOpen: WritableSignal<boolean> = signal(false);
  private menuElementRef: ElementRef | null = null;
  private storedMaxWidth?: number;
  private removeClickListener?: () => void;
  private renderer: Renderer2 = inject(Renderer2);
  private destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * კომპონენტის თვისება menuElementRef-ს ენიჭება შესაბამისი მენიუს dom ელემენტი
   * @param {ElementRef | null} elementRef - მენიუს ელემენტი.
   */
  setMenuElement(elementRef: ElementRef | null): void {
    this.menuElementRef = elementRef;
  }

  /**
   * მენიუს მდგომარეობის შეცვლა თუ მენიუ ნაჩვენებია ეკრანზე ბრაუზერის ფანჯარის სიგანის მიხედვით.
   * @param {number} [maxWidth] - მაქსიმალური ეკრანის სიგანე, ზღვარი რომლის მიხედვითაც მენიუს ელემენტია ნაჩვენები ჩამტვირთველში.
   */
  toggleMenu(maxWidth?: number): void {
    const shouldToggle = !maxWidth || window.innerWidth <= maxWidth;
    if (!shouldToggle) return;

    this.isMenuOpen.update(value => {
      const newState = !value;

      if (newState) {
        this.storedMaxWidth = maxWidth;

        this.addClickListener();
      } else {
        this.cleanup();
      }

      return newState;
    });
  }

  /**
   * აბრუნებს მენიუს ამჟამინდელ მდგომარეობას.
   * @returns {boolean} - მენიუ გახსნილია თუ არა.
   */
  get menuOpen(): boolean {
    return this.isMenuOpen();
  }

  /**
   * ამატებს დაწკაპუნების მოსმენას გარე დაწკაპუნების დასადგენად.
   * @private
   */
  private addClickListener(): void {
    this.removeClickListener = this.renderer.listen(
      'document', 
      'click',
      (event: MouseEvent) => this.handleClick(event)
    );

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  /**
   * ამუშავებს დაწკაპუნების მოვლენას და ხურავს მენიუს, თუ საჭიროა.
   * @param {MouseEvent} event - დაწკაპუნების მოვლენა.
   * @private
   */
  private handleClick(event: MouseEvent): void {
    const shouldCheckWidth = !this.storedMaxWidth ||  window.innerWidth <= this.storedMaxWidth;

    if (shouldCheckWidth &&
        this.isMenuOpen() &&
        this.menuElementRef &&
        !this.menuElementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
      this.cleanup();
    }
  }

  /**
   * ასუფთავებს განთავსებულ მაქსიმალურ ეკრანის სიგანეს და შლის დაწკაპუნების მოსმენას.
   * @private
   */
  private cleanup(): void {
    this.removeClickListener?.();
    this.storedMaxWidth = undefined;
  }
}