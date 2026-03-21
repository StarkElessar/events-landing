---
applyTo: "**/*.cshtml,**/*.cs,**/*.ts"
---

# Запрет хардкода URL

**Хардкод URL строго запрещён** в любом файле проекта.

## Razor / C# (.cshtml, .cs)

Всегда используй хелперы фреймворка:

```razor
@* НЕЛЬЗЯ *@
<a href="/admin/events">...</a>
<a href="/admin/events/edit/5">...</a>

@* НУЖНО *@
<a href="@Url.Action("Index", "Events")">...</a>
<a href="@Url.Action("Edit", "Events", new { id = item.Id })">...</a>
```

В C# коде контроллеров используй `nameof` и `RedirectToAction`/`CreatedAtAction`:

```csharp
// НЕЛЬЗЯ
return Redirect("/admin/events");

// НУЖНО
return RedirectToAction(nameof(Index));
```

## TypeScript / JavaScript (.ts, .js)

Если URL должен быть доступен на клиенте, его **необходимо передать с сервера** через объект `window.__ROUTES__`, который рендерится серверно в Razor-вьюшке:

```razor
<script>
    window.__ROUTES__ = {
        eventsIndex: "@Url.Action("Index", "Events")",
        eventsEdit: "@Url.Action("Edit", "Events")"
    };
</script>
```

В TypeScript обращаться только через этот объект:

```ts
// НЕЛЬЗЯ
fetch("/admin/events");

// НУЖНО
fetch(window.__ROUTES__.eventsIndex);
```

Объявление типа:

```ts
declare global {
	interface Window {
		__ROUTES__: Record<string, string>;
	}
}
```
