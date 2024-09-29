declare interface ITask {
    id: string;
    title: string;
    project: string;
    description: string;
    deadlineDate: string;  // Формат даты может быть изменен на Date, если вы планируете работать с объектом даты
    executor: string;
    type: "Эпик" | "Баг" | "Задача" | "История" | "Подзадача" | "TASK"; // Перечисляем допустимые типы
    priority: "Low" | "Medium" | "High" | "Critical";  // Перечисляем допустимые уровни приоритета
    status: "Запланировано" | "В работе" | "На рассмотрении" | "Завершено";  // Перечисляем возможные статусы
  }
  