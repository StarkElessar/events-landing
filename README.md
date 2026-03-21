# Events Landing

Платформа для создания лендинг-страниц событий (ивентов) на базе ASP.NET Core + Vite + SASS + TypeScript.

## Требования

- [.NET SDK 10+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- EF Core CLI: `dotnet tool install --global dotnet-ef`

## Быстрый старт (Development)

### 1. Установить зависимости

```bash
dotnet restore
npm install
```

### 2. Настроить трансфер

В `appsettings.json` укажите slug трансфера, к которому привязан этот инстанс:

```json
{
	"TransferSlug": "avtobusru"
}
```

Этот параметр определяет, какой трансфер (бренд-перевозчик) обслуживает данный домен. Все лендинги и админка будут работать только с событиями этого трансфера.

### 3. Запустить проект

```bash
dotnet run
```

Это автоматически:

- Применит миграции БД (SQLite)
- Запустит Vite dev server (HMR на порту 5173)
- Запустит ASP.NET Core на `http://localhost:5000`

### 4. Открыть в браузере

| URL                                     | Описание                         |
| --------------------------------------- | -------------------------------- |
| `http://localhost:5000/admin/events`    | Админка — управление событиями   |
| `http://localhost:5000/admin/transfers` | Админка — управление трансферами |
| `http://localhost:5000/{slug}`          | Публичный лендинг события        |

## Структура проекта

```
events-landing/
├── ClientApp/                 # Фронтенд (Vite + SASS + TS)
│   ├── styles/
│   │   ├── base/              # Reset, переменные, типографика
│   │   ├── components/        # Hero, header, footer, button, section
│   │   └── layouts/           # Landing layout
│   ├── scripts/main.ts
│   └── vite.config.ts
├── Data/AppDbContext.cs        # EF Core контекст + seed
├── Models/
│   ├── Transfer.cs            # Бренд-перевозчик
│   └── Event.cs               # Событие (лендинг)
├── Services/
│   └── TransferProvider.cs    # Резолвер текущего трансфера
├── Pages/
│   ├── Admin/                 # CRUD админка
│   ├── Landing.cshtml         # Шаблон лендинга /{slug}
│   └── Shared/_Layout.cshtml  # Layout с CSS-переменными из БД
├── Program.cs
├── appsettings.json           # TransferSlug + ConnectionString
└── package.json
```

## Архитектура

**Transfer** (бренд-перевозчик) → **Event** (лендинг события)

- Transfer хранит: название, лого, цвета бренда (градиент start/end), контакты, реквизиты
- Event привязан к Transfer, наследует дизайн (цвета, лого), может переопределить отдельные поля
- CSS-переменные (`--brand-color-start`, `--brand-color-end`, `--primary-color-start`, `--primary-color-end`) рендерятся серверно в `<head><style>:root{}</style>`

## Команды

| Команда                           | Описание                                      |
| --------------------------------- | --------------------------------------------- |
| `dotnet run`                      | Запуск (ASP.NET + Vite dev server)            |
| `npm run build`                   | Production-сборка фронтенда → `wwwroot/dist/` |
| `npm run dev`                     | Только Vite dev server (без ASP.NET)          |
| `dotnet ef migrations add <Name>` | Создать миграцию                              |
| `dotnet ef database update`       | Применить миграции вручную                    |

## Production-сборка и запуск

### Публикация приложения

```bash
# Publish CMS.API
dotnet publish CMS.API/CMS.API.csproj -c Release -o ./publish/CMS.API

# Publish CMS (автоматически соберёт фронт через MSBuild-таргет)
dotnet publish CMS/CMS.csproj -c Release -o ./publish/CMS

# Publish Site (если используется)
dotnet publish Site/Site.csproj -c Release -o ./publish/Site
```

**Что происходит при публике:**

1. MSBuild-таргет `BuildFrontend` выполнит `pnpm run build` в `ClientApp/`
2. Собранные ассеты попадут в `wwwroot/dist/` (хешированные имена файлов)
3. Весь проект скопируется в `publish/<ProjectName>/`

### Запуск в Production-режиме

**CMS.API:**

```bash
cd publish/CMS.API && dotnet CMS.API.dll
```

**CMS:**

```bash
cd publish/CMS && dotnet CMS.dll
```

**Site (если используется):**

```bash
cd publish/Site && dotnet Site.dll
```

Порты и другие параметры прописаны в `appsettings.Production.json` каждого проекта. Никаких `export` не требуется — при запуске опубликованного бинаря ASP.NET Core автоматически использует окружение `Production`.

### Важные моменты

- **Рабочая директория:** запускайте приложение из его `publish/<ProjectName>/`, иначе не найдутся `wwwroot/` и другие ресурсы
- **`Production` по умолчанию:** `dotnet run` читает `launchSettings.json` и устанавливает `Development`; опубликованный бинарь (`dotnet App.dll`) `launchSettings.json` не читает и использует `Production` автоматически
- **Порты и параметры:** задаются в `appsettings.Production.json` через секцию `Kestrel` — `launchSettings.json` в прод-режиме игнорируется
- **`wwwroot/dist/`:** содержит собранные и оптимизированные ассеты (JS/CSS с хешами), отдаётся через `UseStaticFiles()`

### Systemd unit-файл (Linux)

Пример конфигурации сервиса (`/etc/systemd/system/cms.service`):

```ini
[Unit]
Description=Events Landing CMS
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/opt/events-landing/publish/CMS
ExecStart=/usr/bin/dotnet CMS.dll
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Затем:

```bash
sudo systemctl enable cms.service
sudo systemctl start cms.service
sudo systemctl status cms.service
```
