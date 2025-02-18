import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(array: any[], separator: string = ', ', propertyName: string = 'name'): string {
    // Проверяем, что array является массивом
    if (!Array.isArray(array)) {
      return '';
    }

    // Извлекаем значения свойства `propertyName` из каждого объекта в массиве
    const values = array.map(item => item[propertyName]);

    // Объединяем значения в строку с указанным разделителем
    return values.join(separator);
  }
}
