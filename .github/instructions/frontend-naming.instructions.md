---
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.jsx,**/*.scss,**/*.css,**/*.html"
---

# Именование фронтенд-файлов и папок

Все файлы и папки в клиентской части проекта именуются **исключительно в стиле `kebab-lower-case`**.

## Правила

- Только строчные буквы и дефисы
- Нет camelCase, нет PascalCase, нет underscores в именах файлов/папок

## Примеры

| Нельзя              | Нужно               |
| ------------------- | ------------------- |
| `MyComponent.tsx`   | `my-component.tsx`  |
| `useMyHook.ts`      | `use-my-hook.ts`    |
| `FormField.tsx`     | `form-field.tsx`    |
| `EventsIndex.tsx`   | `events-index.tsx`  |
| `ColorPicker.tsx`   | `color-picker.tsx`  |
| `FileUpload.tsx`    | `file-upload.tsx`   |

## Исключения

Правило **не распространяется** на файлы C# (`.cs`, `.cshtml`) и конфигурационные файлы, следующие своим собственным конвенциям (`vite.config.ts`, `tsconfig.json` и т.п.).
