import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Сервис доступен на уровне всего приложения
})
export class LocalStorageService {
  constructor() { }

  /**
   * Сохраняет данные в localStorage.
   * @param key Ключ, по которому будут сохранены данные.
   * @param value Данные для сохранения (объект, строка, число и т.д.).
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value); // Сериализация данных
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Ошибка при сохранении данных в localStorage:', error);
    }
  }

  /**
   * Получает данные из localStorage.
   * @param key Ключ, по которому нужно получить данные.
   * @returns Данные, если они существуют, или `null`, если данных нет.
   */
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T; // Десериализация данных
    } catch (error) {
      console.error('Ошибка при получении данных из localStorage:', error);
      return null;
    }
  }

  /**
   * Удаляет данные из localStorage по ключу.
   * @param key Ключ, по которому нужно удалить данные.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Ошибка при удалении данных из localStorage:', error);
    }
  }

  /**
   * Очищает все данные из localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Ошибка при очистке localStorage:', error);
    }
  }

  /**
   * Проверяет, существует ли ключ в localStorage.
   * @param key Ключ для проверки.
   * @returns `true`, если ключ существует, иначе `false`.
   */
  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
