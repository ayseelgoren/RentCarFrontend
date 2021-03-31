import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilterPipe'
})
export class ColorFilterPipePipe implements PipeTransform {

  transform(value: Color[], filterText : string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((c: Color) => c.name.toLocaleLowerCase().indexOf(filterText) !== -1 ) : value;
  }

}
