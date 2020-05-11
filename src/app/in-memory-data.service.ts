import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {id: 1, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'},
      {id: 2, surname: 'Додо', name: 'Трафим', patronymic: 'Олегович', email: 'ff5@otlook.com', city: 'Днепр'},
      {id: 3, surname: 'Тестун', name: 'Тест', patronymic: 'Тестович', email: 'formats@otlook.com', city: 'Киев'},
      {id: 4, surname: 'Тест', name: 'Тест', patronymic: 'Тестович', email: 'faraon@otlook.com', city: 'Чернигов'},
      {id: 5, surname: 'Тестов', name: 'Тест', patronymic: 'Тестович', email: 'foot@otlook.com', city: 'Ужгород'},
      {id: 6, surname: 'Тес', name: 'Тест', patronymic: 'Тестович', email: 'ff567567@otlook.com', city: 'Львов'},
      {id: 7, surname: 'Те', name: 'Тест', patronymic: 'Тестович', email: 'ff234234@otlook.com', city: 'Чернигов'}
    ];

    const projects = [
      {id: 1, projectName: 'Теастовый проект №1'},
      {id: 2, projectName: 'Теастовый проект №2'},
      {id: 3, projectName: 'Теастовый проект №3'},
      {id: 4, projectName: 'Теастовый проект №4'}
    ];

    const projectLink = [
      {id: 1, projectId: 1, employeeId: 1 },
      {id: 2, projectId: 1, employeeId: 2 },
      {id: 3, projectId: 2, employeeId: 3 }

    ];

    return {employees, projects, projectLink};
  }

}
