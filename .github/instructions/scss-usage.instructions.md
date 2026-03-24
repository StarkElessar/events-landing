---
applyTo: "**/*.scss"
---

# SCSS Style Guide — использовать SCSS и вложения `&`

- Использовать препроцессор SCSS для всех стилей проекта.
- Писать правила в виде вложенных блоков, используя `&` для модификаторов и комбинированных селекторов. Это уменьшает дублирование и делает структуру стилей более явной.
- Не писать одинаковые селекторы раздельно в разных местах — объединяйте их в рамках одного блока с вложениями.
- Придерживаться существующей структуры: mobile-first, `@use`/`@forward`, файлы без ведущего `_`.

## Примеры

- Правильно:

    .card {
    &__title { ... }
    &__body { ... }
    &_active { ... }
    &__box-title { ... }
    }

- Неправильно:

    .card__title { ... }
    .card__body { ... }
    .card--active { ... }
    .card__box-title { ... }
    .card__box {
    &-title { ... }
    }

## Пустые строки перед top-level правилами

Меж между top-level правилами (селекторы, @keyframes, @at-rules на верхнем уровне) **обязательна пустая строка**. Это улучшает читаемость и требуется `rule-empty-line-before`:

```scss
// Правильно
.card {
	margin: 1rem;
}

.button {
	padding: 0.5rem;
}

@keyframes slide {
	from { ... }
	to { ... }
}
```

```scss
// Неправильно — нет пустой строки перед .button и @keyframes
.card {
	margin: 1rem;
}
.button {
	padding: 0.5rem;
}
@keyframes slide {
	from { ... }
	to { ... }
}
```

## Порядок селекторов и специфичность

Когда используете вложенные селекторы, **селекторы с более низкой специфичностью должны идти перед селекторами с более высокой специфичностью**. 

### ❌ Неправильно — нарушает правило specificity:

```scss
.booking {
	&__input,
	&__textarea {
		padding: 12px;
		
		&:focus {
			// После компиляции это станет .booking__textarea:focus
			background: #fff;
		}
	}
	
	&__textarea {
		// Это .booking__textarea — идёт ПОСЛЕ .booking__textarea:focus!
		resize: vertical;
	}
}
```

### ✅ Правильно — разделите на отдельные блоки:

```scss
.booking {
	&__input {
		padding: 12px;
		
		&:focus {
			background: #fff;
		}
	}
	
	&__textarea {
		padding: 12px;
		resize: vertical;
		
		&:focus {
			background: #fff;
		}
	}
}
```

Если стили полностью идентичны для нескольких элементов, можно использовать миксин или переменные, но **не объединяйте селекторы в одном блоке с вложенными псевдоклассами** — это нарушит сортировку по специфичности.

## Инструменты и проверки

- Используется `stylelint` (v16+) с плагинами `stylelint-scss` и `@stylistic/stylelint-plugin`, конфигом `stylelint-config-standard-scss`.
- Конфиг stylelint настроен в обоих проектах: `Site/ClientApp/.stylelintrc.json` и `CMS/ClientApp/.stylelintrc.json`.
- `@stylistic/indentation: tab` — контролирует отступы табами. Поддерживает автоисправление через `--fix`.
- `selector-class-pattern` — BEM-паттерн `.block__element_modifier` (разделитель элемента `__`, модификатора `_`).
- Отключено `alpha-value-notation` — дробные значения (0.3, 0.9) принимаются как есть без преобразования в проценты.
- Отключено `color-function-notation` — допускается как `rgba()`, так и современная CSS4 слеш-нотация `rgb(255 255 255 / 0.5)`.
- Отключено `declaration-block-no-redundant-longhand-properties` — позволяет переопределять только часть shorthand-свойств (например `row-gap` при mobile-first подходе).
- Исключения: генерируемые/внешние CSS-файлы и библиотеки в `ClientApp/styles/libs`.
- Файлы `.scss` не форматируются Prettier (см. `.prettierignore`).

### Команды

```bash
pnpm run lint:scss       # проверить SCSS
pnpm run lint:scss:fix   # автоисправление (отступы, пустые строки и т.п.)
```
