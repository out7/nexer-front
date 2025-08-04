export const items = [
  {
    ios: [
      {
        id: "happ",
        name: "Happ",
        isFeatured: true,
        urlScheme: "happ://add/",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973",
              buttonText: {
                en: "RU App Store",
                fa: "اپ استور روسیه",
                ru: "RU App Store",
              },
            },
            {
              buttonLink:
                "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
              buttonText: {
                en: "Global App Store",
                fa: "اپ استور جهانی",
                ru: "Глобальный App Store",
              },
            },
          ],
          description: {
            en: "Open the page in App Store and install the app. Launch it, in the VPN configuration permission window click Allow and enter your passcode.",
            fa: "صفحه را در App Store باز کنید و برنامه را نصب کنید. آن را اجرا کنید، در پنجره مجوز پیکربندی VPN روی Allow کلیک کنید و رمز عبور خود را وارد کنید.",
            ru: "Откройте страницу в App Store и установите приложение. Запустите его, в окне разрешения VPN-конфигурации нажмите Allow и введите свой пароль.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below — the app will open and the subscription will be added automatically",
            fa: "برای افزودن خودکار اشتراک روی دکمه زیر کلیک کنید - برنامه باز خواهد شد",
            ru: "Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.",
          },
        },
        connectAndUseStep: {
          description: {
            en: "In the main section, click the large power button in the center to connect to VPN. Don't forget to select a server from the server list. If needed, choose another server from the server list.",
            fa: "در بخش اصلی، دکمه بزرگ روشن/خاموش در مرکز را برای اتصال به VPN کلیک کنید. فراموش نکنید که یک سرور را از لیست سرورها انتخاب کنید. در صورت نیاز، سرور دیگری را از لیست سرورها انتخاب کنید.",
            ru: "В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.",
          },
        },
      },
      {
        id: "v2raytun",
        name: "v2RayTun",
        isFeatured: false,
        urlScheme: "v2raytun://import/",
        installationStep: {
          buttons: [
            {
              buttonLink: "https://apps.apple.com/ru/app/v2raytun/id6476628951",
              buttonText: {
                en: "Open in App Store",
                fa: "باز کردن در App Store",
                ru: "Открыть в App Store",
              },
            },
          ],
          description: {
            en: "Open the page in App Store and install the app. Launch it, in the VPN configuration permission window click Allow and enter your passcode.",
            fa: "صفحه را در App Store باز کنید و برنامه را نصب کنید. آن را اجرا کنید، در پنجره مجوز پیکربندی VPN روی Allow کلیک کنید و رمز عبور خود را وارد کنید.",
            ru: "Откройте страницу в App Store и установите приложение. Запустите его, в окне разрешения VPN-конфигурации нажмите Allow и введите свой пароль.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below — the app will open and the subscription will be added automatically",
            fa: "برای افزودن خودکار اشتراک روی دکمه زیر کلیک کنید - برنامه باز خواهد شد",
            ru: "Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.",
          },
        },
        connectAndUseStep: {
          description: {
            en: "In the main section, click the large power button in the center to connect to VPN. Don't forget to select a server from the server list. If needed, choose another server from the server list.",
            fa: "در بخش اصلی، دکمه بزرگ روشن/خاموش در مرکز را برای اتصال به VPN کلیک کنید. فراموش نکنید که یک سرور را از لیست سرورها انتخاب کنید. در صورت نیاز، سرور دیگری را از لیست سرورها انتخاب کنید.",
            ru: "В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.",
          },
        },
      },
    ],
    android: [
      {
        id: "flclash",
        name: "FlClashX",
        isFeatured: true,
        urlScheme: "flclash://install-config?url=",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-android-arm64-v8a.apk",
              buttonText: {
                en: "Download APK",
                fa: "دانلود APK",
                ru: "Скачать APK",
              },
            },
          ],
          description: {
            en: "Download and install FlClash APK",
            fa: "دانلود و نصب FlClash APK",
            ru: "Скачайте и установите FlClash APK",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку",
          },
        },
        additionalAfterAddSubscriptionStep: {
          buttons: [],
          title: {
            en: "If the subscription is not added",
            fa: "اگر اشتراک در برنامه نصب نشده است",
            ru: "Если подписка не добавилась",
          },
          description: {
            en: "If nothing happens after clicking the button, add a subscription manually. Click the Get link button on this page in the upper right corner, copy the link. In FlClash, go to the Profiles section, click the + button, select the URL, paste your copied link and click Send",
            fa: "اگر بعد از کلیک روی دکمه هیچ اتفاقی نیفتاد، اشتراکی را به صورت دستی اضافه کنید. روی دکمه دریافت لینک در این صفحه در گوشه سمت راست بالا کلیک کنید، لینک را کپی کنید. در FlClash به بخش Profiles بروید، دکمه + را کلیک کنید، URL را انتخاب کنید، پیوند کپی شده خود را جایگذاری کنید و روی ارسال کلیک کنید.",
            ru: "Если после нажатия на кнопку ничего не произошло, добавьте подписку вручную. Нажмите на этой страницу кнопку Получить ссылку в правом верхнем углу, скопируйте ссылку. В FlClash перейдите в раздел Профили, нажмите кнопку +, выберите URL, вставьте вашу скопированную ссылку и нажмите Отправить",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Select the added profile in the Profiles section. In the Control Panel, click the Enable button in the bottom right corner. Once it's running, you can change the server you're connected to in the Proxy section.",
            fa: "پروفایل افزوده‌شده را در بخش پروفایل‌ها انتخاب کنید. در پنل کنترل، روی دکمه فعال‌سازی در گوشه پایین سمت راست کلیک کنید. پس از اجرا، می‌توانید در بخش پروکسی، سروری را که به آن متصل می‌شوید تغییر دهید.",
            ru: "Выберите добавленный профиль в разделе Профили. В Панели управления нажмите кнопку включить в правом нижнем углу. После запуска в разделе Прокси вы можете изменить выбор сервера к которому вас подключит. ",
          },
        },
      },
      {
        id: "happ",
        name: "Happ",
        isFeatured: true,
        urlScheme: "happ://add/",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://play.google.com/store/apps/details?id=com.happproxy",
              buttonText: {
                en: "Open in Google Play",
                fa: "باز کردن در Google Play",
                ru: "Открыть в Google Play",
              },
            },
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk",
              buttonText: {
                en: "Download APK",
                fa: "دانلود APK",
                ru: "Скачать APK",
              },
            },
          ],
          description: {
            en: "Open the page in Google Play and install the app. Or install the app directly from the APK file if Google Play is not working.",
            fa: "صفحه را در Google Play باز کنید و برنامه را نصب کنید. یا برنامه را مستقیماً از فایل APK نصب کنید، اگر Google Play کار نمی کند.",
            ru: "Откройте страницу в Google Play и установите приложение. Или установите приложение из APK файла напрямую, если Google Play не работает.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Open the app and connect to the server",
            fa: "برنامه را باز کنید و به سرور متصل شوید",
            ru: "Откройте приложение и подключитесь к серверу",
          },
        },
      },
      {
        id: "v2raytun",
        name: "v2RayTun",
        isFeatured: false,
        urlScheme: "v2raytun://import/",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://play.google.com/store/apps/details?id=com.v2raytun.android&hl=ru",
              buttonText: {
                en: "Open in Google Play",
                fa: "باز کردن در Google Play",
                ru: "Открыть в Google Play",
              },
            },
            {
              buttonLink:
                "https://github.com/DigneZzZ/v2raytun/releases/latest/download/v2RayTun_universal.apk",
              buttonText: {
                en: "Download APK",
                fa: "دانلود APK",
                ru: "Скачать APK",
              },
            },
          ],
          description: {
            en: "Open the page in Google Play and install the app. Or install the app directly from the APK file if Google Play is not working.",
            fa: "صفحه را در Google Play باز کنید و برنامه را نصب کنید. یا برنامه را مستقیماً از فایل APK نصب کنید، اگر Google Play کار نمی کند.",
            ru: "Откройте страницу в Google Play и установите приложение. Или установите приложение из APK файла напрямую, если Google Play не работает.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Open the app and connect to the server",
            fa: "برنامه را باز کنید و به سرور متصل شوید",
            ru: "Откройте приложение и подключитесь к серверу",
          },
        },
      },
    ],
    pc: [
      {
        id: "flclash",
        name: "FlClashX",
        isFeatured: true,
        urlScheme: "flclash://install-config?url=",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-windows-amd64-setup.exe",
              buttonText: {
                en: "Windows",
                fa: "ویندوز",
                ru: "Windows",
              },
            },
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-macos-amd64.dmg",
              buttonText: {
                en: "macOS (Intel)",
                fa: "مک (اینتل)",
                ru: "macOS (Intel)",
              },
            },
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-macos-arm64.dmg",
              buttonText: {
                en: "macOS (Apple Silicon)",
                fa: "مک (Apple Silicon)",
                ru: "macOS (Apple Silicon)",
              },
            },
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/latest",
              buttonText: {
                en: "Linux",
                fa: "لینوکس",
                ru: "Linux",
              },
            },
          ],
          description: {
            en: "Choose the version for your device, click the button below and install the app.",
            fa: "نسخه مناسب برای دستگاه خود را انتخاب کنید، دکمه زیر را فشار دهید و برنامه را نصب کنید",
            ru: "Выберите подходящую версию для вашего устройства, нажмите на кнопку ниже и установите приложение.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку",
          },
        },
        additionalAfterAddSubscriptionStep: {
          buttons: [],
          title: {
            en: "If the subscription is not added",
            fa: "اگر اشتراک در برنامه نصب نشده است",
            ru: "Если подписка не добавилась",
          },
          description: {
            en: "If nothing happens after clicking the button, add a subscription manually. Click the Get link button on this page in the upper right corner, copy the link. In FlClash, go to the Profiles section, click the + button, select the URL, paste your copied link and click Send",
            fa: "اگر بعد از کلیک روی دکمه هیچ اتفاقی نیفتاد، اشتراکی را به صورت دستی اضافه کنید. روی دکمه دریافت لینک در این صفحه در گوشه سمت راست بالا کلیک کنید، لینک را کپی کنید. در FlClash به بخش Profiles بروید، دکمه + را کلیک کنید، URL را انتخاب کنید، پیوند کپی شده خود را جایگذاری کنید و روی ارسال کلیک کنید.",
            ru: "Если после нажатия на кнопку ничего не произошло, добавьте подписку вручную. Нажмите на этой страницу кнопку Получить ссылку в правом верхнем углу, скопируйте ссылку. В FlClash перейдите в раздел Профили, нажмите кнопку +, выберите URL, вставьте вашу скопированную ссылку и нажмите Отправить",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Select the added profile in the Profiles section. In the Dashboard, click the enable button in the lower right corner, and then turn on the switch next to the TUN item. After launching, in the Proxy section, you can change the choice of the server to which you will be connected.",
            fa: "نمایه اضافه شده را در قسمت پروفایل ها انتخاب کنید. در داشبورد، روی دکمه فعال کردن در گوشه پایین سمت راست کلیک کنید و سپس سوئیچ کنار مورد TUN را روشن کنید. پس از راه اندازی در قسمت Proxy می توانید انتخاب سروری که به آن متصل خواهید شد را تغییر دهید.",
            ru: "Выберите добавленный профиль в разделе Профили. В Панели управления нажмите кнопку включить в правом нижнем углу, а затем включите переключатель у пункта TUN. После запуска в разделе Прокси вы можете изменить выбор сервера к которому вас подключит. ",
          },
        },
      },
      {
        id: "koala-clash",
        name: "Koala Clash",
        isFeatured: true,
        urlScheme: "clash://install-config?url=",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://github.com/coolcoala/clash-verge-rev-lite/releases/latest/download/Koala.Clash_x64-setup.exe",
              buttonText: {
                en: "Windows",
                fa: "ویندوز",
                ru: "Windows",
              },
            },
            {
              buttonLink:
                "https://github.com/coolcoala/clash-verge-rev-lite/releases/latest/download/Koala.Clash_x64.dmg",
              buttonText: {
                en: "macOS (Intel)",
                fa: "مک (اینتل)",
                ru: "macOS (Intel)",
              },
            },
            {
              buttonLink:
                "https://github.com/coolcoala/clash-verge-rev-lite/releases/latest/download/Koala.Clash_aarch64.dmg",
              buttonText: {
                en: "macOS (Apple Silicon)",
                fa: "مک (Apple Silicon)",
                ru: "macOS (Apple Silicon)",
              },
            },
            {
              buttonLink:
                "https://github.com/coolcoala/clash-verge-rev-lite/releases/latest/",
              buttonText: {
                en: "Linux",
                fa: "لینوکس",
                ru: "Linux",
              },
            },
          ],
          description: {
            en: "Choose the version for your device, click the button below and install the app.",
            fa: "نسخه مناسب برای دستگاه خود را انتخاب کنید، دکمه زیر را فشار دهید و برنامه را نصب کنید",
            ru: "Выберите подходящую версию для вашего устройства, нажмите на кнопку ниже и установите приложение.",
          },
        },
        additionalBeforeAddSubscriptionStep: {
          buttons: [],
          description: {
            en: "If you have previously used Clash Verge Rev, you need to uninstall it before installing Koala Clash.",
            fa: "اگر قبلاً از Clash Verge Rev استفاده کرده‌اید، باید قبل از نصب Koala Clash آن را حذف کنید.",
            ru: "Если вы ранее использовали Clash Verge Rev, то его требуется удалить перед установкой Koala Clash.",
          },
          title: {
            en: "Warning",
            fa: "هشدار",
            ru: "Предупреждение",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку",
          },
        },
        additionalAfterAddSubscriptionStep: {
          buttons: [],
          title: {
            en: "If the subscription is not added",
            fa: "اگر اشتراک اضافه نشد",
            ru: "Если подписка не добавилась",
          },
          description: {
            en: "If nothing happens after clicking the button, add the subscription manually. Click the Get Link button in the top right corner of this page, copy the link. In Koala Clash, go to the main page, click the Add Profile button, paste the link into the text field, and then click the Import button.",
            fa: "اگر پس از کلیک روی دکمه هیچ اتفاقی نیفتاد، اشتراک را به صورت دستی اضافه کنید. روی دکمه دریافت لینک در گوشه بالا سمت راست این صفحه کلیک کنید و لینک را کپی کنید. در برنامه Koala Clash به صفحه اصلی بروید، روی دکمه افزودن پروفایل کلیک کنید، لینک را در فیلد متنی قرار دهید و سپس روی دکمه وارد کردن کلیک کنید.",
            ru: "Если после нажатия на кнопку ничего не произошло, добавьте подписку вручную. Нажмите на этой странице кнопку Получить ссылку в правом верхнем углу, скопируйте ссылку. В Koala Clash перейдите на главную страницу, нажмите кнопку Добавить профиль и вставьте ссылку в текстовое поле, затем нажмите на кнопку Импорт.",
          },
        },
        connectAndUseStep: {
          description: {
            en: "You can select a server at the bottom of the main page, and enable VPN by clicking on the large button in the center of the main page.",
            fa: "می‌توانید سرور را در پایین صفحه اصلی انتخاب کنید و با کلیک روی دکمه بزرگ در مرکز صفحه اصلی، VPN را فعال کنید.",
            ru: "Выбрать сервер можно внизу на главной странице, включить VPN можно нажав на главной странице на большую кнопку по центру.",
          },
        },
      },
      {
        id: "happ",
        name: "Happ (alpha)",
        isFeatured: false,
        urlScheme: "happ://add/",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x86.exe",
              buttonText: {
                en: "Windows",
                fa: "ویندوز",
                ru: "Windows",
              },
            },
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-desktop/releases/latest/download/Happ.macOS.x86_64.app.tar.gz",
              buttonText: {
                en: "macOS (Intel)",
                fa: "مک (اینتل)",
                ru: "macOS (Intel)",
              },
            },
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-desktop/releases/latest/download/Happ.macOS.arm64.app.tar.gz",
              buttonText: {
                en: "macOS (Apple Silicon)",
                fa: "مک (Apple Silicon)",
                ru: "macOS (Apple Silicon)",
              },
            },
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-desktop/releases/latest/download/Happ.linux.x86.AppImage",
              buttonText: {
                en: "Linux",
                fa: "لینوکس",
                ru: "Linux",
              },
            },
          ],
          description: {
            en: "Choose the version for your device, click the button below and install the app.",
            fa: "نسخه مناسب برای دستگاه خود را انتخاب کنید، دکمه زیر را فشار دهید و برنامه را نصب کنید",
            ru: "Выберите подходящую версию для вашего устройства, нажмите на кнопку ниже и установите приложение.",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below — the app will open and the subscription will be added automatically",
            fa: "برای افزودن خودکار اشتراک روی دکمه زیر کلیک کنید - برنامه باز خواهد شد",
            ru: "Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.",
          },
        },
        connectAndUseStep: {
          description: {
            en: "In the main section, click the large power button in the center to connect to VPN. Don't forget to select a server from the server list. If needed, choose another server from the server list.",
            fa: "در بخش اصلی، دکمه بزرگ روشن/خاموش در مرکز را برای اتصال به VPN کلیک کنید. فراموش نکنید که یک سرور را از لیست سرورها انتخاب کنید. در صورت نیاز، سرور دیگری را از لیست سرورها انتخاب کنید.",
            ru: "В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.",
          },
        },
      },
    ],
    TV: [
      {
        id: "happ",
        name: "Happ",
        isFeatured: true,
        urlScheme: "happ://add/",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://play.google.com/store/apps/details?id=com.happproxy",
              buttonText: {
                en: "Open in Google Play",
                fa: "باز کردن در Google Play",
                ru: "Открыть в Google Play",
              },
            },
            {
              buttonLink:
                "https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk",
              buttonText: {
                en: "Download APK",
                fa: "دانلود APK",
                ru: "Скачать APK",
              },
            },
          ],
          description: {
            en: "Open the page in Google Play and install the app. Or install the app directly from the APK file if Google Play is not working.",
            fa: "صفحه را در Google Play باز کنید و برنامه را نصب کنید. یا برنامه را مستقیماً از فایل APK نصب کنید، اگر Google Play کار نمی کند.",
            ru: "Откройте страницу в Google Play и установите приложение. Или установите приложение из APK файла напрямую, если Google Play не работает.",
          },
        },
        additionalBeforeAddSubscriptionStep: {
          buttons: [
            {
              buttonLink: "https://www.happ.su/main/ru/faq/android-tv",
              buttonText: {
                en: "In Russian",
                fa: "به زبان روسی",
                ru: "На русском",
              },
            },
            {
              buttonLink: "https://www.happ.su/main/faq/android-tv",
              buttonText: {
                en: "In English",
                fa: "به زبان انگلیسی",
                ru: "На английском",
              },
            },
          ],
          description: {
            en: "Detailed instructions to help you set up Happ on your device.",
            fa: "راهنمای دقیق برای کمک به تنظیم Happ روی دستگاه شما.",
            ru: "Подробные инструкции, чтобы помочь вам настроить Happ на вашем устройстве.",
          },
          title: {
            en: "Installation instructions",
            fa: "دستورالعمل نصب",
            ru: "Инструкции по установке",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription, if you opened the subscription page on your TV",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید، اگر صفحه اشتراک را روی تلویزیون باز کرده‌اید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку, если вы открыли страницу подписки на телевизоре",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Open the app and connect to the server",
            fa: "برنامه را باز کنید و به سرور متصل شوید",
            ru: "Откройте приложение и подключитесь к серверу",
          },
        },
      },
      {
        id: "flclash",
        name: "FlClashX",
        isFeatured: true,
        urlScheme: "flclash://install-config?url=",
        installationStep: {
          buttons: [
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-android-arm64-v8a.apk",
              buttonText: {
                en: "Download APK (ARMv8)",
                fa: "دانلود APK (ARMv8)",
                ru: "Скачать APK (ARMv8)",
              },
            },
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-android-armeabi-v7a.apk",
              buttonText: {
                en: "Download APK (ARMv7)",
                fa: "دانلود APK (ARMv7)",
                ru: "Скачать APK (ARMv7)",
              },
            },
            {
              buttonLink:
                "https://github.com/pluralplay/FlClashX/releases/download/v0.0.7/FlClashX-0.0.7-android-x86_64.apk",
              buttonText: {
                en: "Download APK (x86_64)",
                fa: "دانلود APK (x86_64)",
                ru: "Скачать APK (x86_64)",
              },
            },
            {
              buttonLink:
                "https://club.dns-shop.ru/blog/t-132-televizoryi/43999-failyi-apk-dlya-umnyih-televizorov-na-android/?utm_referrer=https%3A%2F%2Fwww.google.com%2F",
              buttonText: {
                en: "How to install APK on TV",
                fa: "نحوه نصب APK روی تلویزیون",
                ru: "Как установить APK на телевизор",
              },
            },
          ],
          description: {
            en: "Download and install FlClash APK on your TV. Most modern TVs use ARMv8 (64-bit). If installation fails, try ARMv7 (32-bit). x86_64 is for TVs or boxes with Intel or AMD processors (rare).",
            fa: "دانلود و نصب FlClash APK روی تلویزیون شما. اکثر تلویزیون‌های جدید از ARMv8 (64 بیتی) استفاده می‌کنند. اگر نصب انجام نشد، ARMv7 (32 بیتی) را امتحان کنید. نسخه x86_64 مخصوص تلویزیون‌ها یا باکس‌هایی با پردازنده‌های اینتل یا AMD است (نادر).",
            ru: "Скачайте и установите FlClash APK на ваш телевизор. Большинство современных телевизоров используют ARMv8 (64-бит). Если установка не удалась, попробуйте ARMv7 (32-бит). x86_64 предназначен для ТВ или приставок с процессорами Intel или AMD (редко).",
          },
        },
        additionalBeforeAddSubscriptionStep: {
          buttons: [],
          description: {
            en: "In the TV app, click the Add Profile button in the Profiles section, select Add from phone. On your phone, in the Profiles section, tap the three-dot menu and choose Send to TV.",
            fa: "در برنامه تلویزیون، روی دکمه افزودن پروفایل در بخش پروفایل‌ها کلیک کنید، گزینه افزودن از تلفن را انتخاب کنید. در تلفن، در بخش پروفایل‌ها روی منوی سه نقطه بزنید و گزینه ارسال به تلویزیون را انتخاب کنید.",
            ru: "В приложении на телевизоре нажмите кнопку Добавить профиль в разделе Профили, выберите пункт Добавить с телефона. На телефоне в разделе Профили нажмите кнопку с тремя точками и выберите пункт Отправить на ТВ.",
          },
          title: {
            en: "How to add a subscription on TV",
            fa: "نحوه افزودن اشتراک در تلویزیون",
            ru: "Как добавить подписку на телевизоре",
          },
        },
        addSubscriptionStep: {
          description: {
            en: "Click the button below to add subscription, if you opened the subscription page on your TV",
            fa: "برای افزودن اشتراک روی دکمه زیر کلیک کنید، اگر صفحه اشتراک را روی تلویزیون باز کرده‌اید",
            ru: "Нажмите кнопку ниже, чтобы добавить подписку, если вы открыли страницу подписки на телевизоре",
          },
        },
        additionalAfterAddSubscriptionStep: {
          buttons: [],
          title: {
            en: "If the subscription is not added",
            fa: "اگر اشتراک در برنامه نصب نشده است",
            ru: "Если подписка не добавилась",
          },
          description: {
            en: "If nothing happens after clicking the button, add a subscription manually. Click the Get link button on this page in the upper right corner, copy the link. In FlClash, go to the Profiles section, click the + button, select the URL, paste your copied link and click Send",
            fa: "اگر بعد از کلیک روی دکمه هیچ اتفاقی نیفتاد، اشتراکی را به صورت دستی اضافه کنید. روی دکمه دریافت لینک در این صفحه در گوشه سمت راست بالا کلیک کنید، لینک را کپی کنید. در FlClash به بخش Profiles بروید، دکمه + را کلیک کنید، URL را انتخاب کنید، پیوند کپی شده خود را جایگذاری کنید و روی ارسال کلیک کنید.",
            ru: "Если после нажатия на кнопку ничего не произошло, добавьте подписку вручную. Нажмите на этой страницу кнопку Получить ссылку в правом верхнем углу, скопируйте ссылку. В FlClash перейдите в раздел Профили, нажмите кнопку +, выберите URL, вставьте вашу скопированную ссылку и нажмите Отправить",
          },
        },
        connectAndUseStep: {
          description: {
            en: "Select the added profile in the Profiles section. In the Control Panel, click the Enable button in the bottom right corner. Once it's running, you can change the server you're connected to in the Proxy section.",
            fa: "پروفایل افزوده‌شده را در بخش پروفایل‌ها انتخاب کنید. در پنل کنترل، روی دکمه فعال‌سازی در گوشه پایین سمت راست کلیک کنید. پس از اجرا، می‌توانید در بخش پروکسی، سروری را که به آن متصل می‌شوید تغییر دهید.",
            ru: "Выберите добавленный профиль в разделе Профили. В Панели управления нажмите кнопку включить в правом нижнем углу. После запуска в разделе Прокси вы можете изменить выбор сервера к которому вас подключит. ",
          },
        },
      },
    ],
  },
];
