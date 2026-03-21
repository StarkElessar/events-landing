---
applyTo: "**/*.scss"
---

# Адаптив — строго Mobile First

Все стили пишутся **сначала для мобильных**. Расширения для больших экранов добавляются через `min-width`.

## Правила

**НЕЛЬЗЯ** — использовать `max-width` как основной способ адаптации:

```scss
// НЕЛЬЗЯ
.block {
	display: flex;
	@include media-mx(768) {
		display: block;
	}
}
```

**НУЖНО** — базовые стили для мобильных, расширения для десктопа:

```scss
// НУЖНО
.block {
	display: block;
	@include media-mn(768) {
		display: flex;
	}
}
```

## Миксины медиазапросов

Файл: `Site.Core/ClientApp/styles/base/_mixins.scss`  
Подключение: `@use "@styles.core/base/mixins" as *;`

Аргумент — всегда **число в пикселях** (без единицы). Внутри миксина оно автоматически переводится в `em`.

| Миксин                    | Медиазапрос | Применение                         |
| ------------------------- | ----------- | ---------------------------------- |
| `media-mn($px)`           | `min-width` | Основной — mobile-first расширение |
| `media-mx($px)`           | `max-width` | Исключение — edge cases            |
| `media-mn-mx($min, $max)` | диапазон    | Точечные диапазоны                 |

```scss
@use "@styles.core/base/mixins" as *;

.card {
	padding: 1rem;

	@include media-mn(768) {
		padding: 1.5rem;
	}

	@include media-mn(1024) {
		padding: 2rem;
	}
}
```

## Функции единиц

Файл: `Site.Core/ClientApp/styles/base/_functions.scss`  
Подключение: `@use "@styles.core/base/functions" as *;`

```scss
rem($px)  // 16 → 1rem
em($px)   // 16 → 1em
```
