import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false
})
export class FilterPipe<T> implements PipeTransform {

  /**
   * look for the items that matches the passed searched text
   * @param items
   * @param text
   * @author Amr
   */
  transform(items: Array<T>, text: string): unknown {
    if (items.length == 0)
      return []
    if (text == '')
      return items
    return items.search(text);
  }

}
