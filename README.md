# Лаборатори №1: UI автомат тест — Playwright

**F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест (2026)**

- **Оюутны нэр:** Э.Бүрэнбаяр
- **Оюутны код:** B242270084

## Орчин

~~~
$ node --version
v22.23.5
$ npx playwright --version
Version 1.65.1
$ lsb_release -d
Description:	Ubuntu 24.04.5 LTS
~~~

## Юу хийсэн бэ

`npm init playwright@latest` командаар TypeScript Playwright төсөл үүсгэж, нээлттэй демо дэлгүүр
**https://www.saucedemo.com** дээр 4 UI тест бичсэн. Бүгд ногоон: `npx playwright test` → **4 passed**.

| # | Тест (`tests/saucedemo.spec.ts`) | Юуг шалгадаг | Assertion |
|---|---|---|---|
| 1 | `Login › successful login shows the Products page` | `standard_user / secret_sauce`-ээр нэвтэрч, гарах | `toHaveURL(/inventory.html/)`, `getByText('Products')` → `toBeVisible()` |
| 2 | `Login › wrong password shows an error message` | Буруу нууц үг (сөрөг тест) | алдааны текст `toBeVisible()`, нэвтрэх хуудсандаа үлдсэн `toHaveURL` |
| 3 | `Login › locked out user cannot log in` | `locked_out_user` (сөрөг тест) | "this user has been locked out" текст `toBeVisible()` |
| 4 | `Cart › logged-in user can add the backpack to the cart` | Нэвтэрсний дараах үйлдэл: бараа сагслах | "Remove" товч, "Cart, 1 items" товч, `toHaveURL(/cart.html/)`, сагсан дахь Backpack |

- **Test isolation:** Playwright тест бүрийг шинэ browser context-д ажиллуулдаг тул cookie, session хуваалцахгүй;
  тест бүр өөрөө нэвтэрч, өөрөө гардаг. Сагсны тест төгсгөлдөө сагсаа хоослоод (`Cart, empty`) гардаг.
- **Logout:** амжилттай нэвтэрсэн тест бүр `logout()` туслах функцээр (☰ цэс → Logout) дуусч, нэвтрэх хуудас руу
  буцсаныг `toHaveURL` ба Login товч харагдаж буйгаар шалгадаг.
- **Тохиргоо** (`playwright.config.ts`): `baseURL`, `trace: 'on'`, `video: 'on'`, `screenshot: 'only-on-failure'`, chromium.

## Төслийн бүтэц

~~~
my-first-test/
├── playwright.config.ts        # baseURL, trace, video, reporter
├── tests/saucedemo.spec.ts     # 4 тест (коммент бүхий)
├── codegen/recorded.spec.ts    # Codegen-ээр бичүүлсэн код (харьцуулах зорилготой, testDir-ээс гадуур)
├── report/                     # HTML тайлан (playwright-report-ийн хуулбар, trace + видео дотроо)
├── videos/                     # тест бүрийн бичлэг (.webm)
├── docs/                       # унагасан тестийн screenshot, trace viewer-ийн зураг
└── .gitignore                  # node_modules/, test-results/, playwright-report/ орохгүй
~~~

HTML тайланг нээх: `npx playwright show-report report`.

## Locator-ын сонголт ба XPath-аас зайлсхийсэн шалтгаан

Тестүүд `getByPlaceholder`, `getByRole`, `getByText` ашигладаг — элементийг хэрэглэгчийн харж буй зүйлээр
(товчны нэр, placeholder, текст) ба хүртээмжийн (ARIA) үүргээр нь олдог. XPath (`//div[3]/form/input[2]`
гэх мэт) DOM-ийн бүтцэд шууд уягддаг тул нэг `div` нэмэгдэхэд л эвддэг, уншихад хэцүү, хэрэглэгчид
юу харагдаж байгаагаас хамааралгүй. Үүний бодит жишээг энэ лабд өөрөө үзсэн: эхлээд
cd ~/my-first-test
{
echo '# Лаборатори №1: UI автомат тест — Playwright'
echo
echo '**F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест (2026)**'
echo
echo '- **Оюутны нэр:** Э.Бүрэнбаяр'
echo '- **Оюутны код:** B242270084'
echo
echo '## Орчин'
echo
echo '~~~'
echo "\$ node --version"; node --version
echo "\$ npx playwright --version"; npx playwright --version
echo "\$ lsb_release -d"; lsb_release -d 2>/dev/null
echo '~~~'
echo
} > README.md
cat >> README.md <<'EOF'
## Юу хийсэн бэ

`npm init playwright@latest` командаар TypeScript Playwright төсөл үүсгэж, нээлттэй демо дэлгүүр
**https://www.saucedemo.com** дээр 4 UI тест бичсэн. Бүгд ногоон: `npx playwright test` → **4 passed**.

| # | Тест (`tests/saucedemo.spec.ts`) | Юуг шалгадаг | Assertion |
|---|---|---|---|
| 1 | `Login › successful login shows the Products page` | `standard_user / secret_sauce`-ээр нэвтэрч, гарах | `toHaveURL(/inventory.html/)`, `getByText('Products')` → `toBeVisible()` |
| 2 | `Login › wrong password shows an error message` | Буруу нууц үг (сөрөг тест) | алдааны текст `toBeVisible()`, нэвтрэх хуудсандаа үлдсэн `toHaveURL` |
| 3 | `Login › locked out user cannot log in` | `locked_out_user` (сөрөг тест) | "this user has been locked out" текст `toBeVisible()` |
| 4 | `Cart › logged-in user can add the backpack to the cart` | Нэвтэрсний дараах үйлдэл: бараа сагслах | "Remove" товч, "Cart, 1 items" товч, `toHaveURL(/cart.html/)`, сагсан дахь Backpack |

- **Test isolation:** Playwright тест бүрийг шинэ browser context-д ажиллуулдаг тул cookie, session хуваалцахгүй;
  тест бүр өөрөө нэвтэрч, өөрөө гардаг. Сагсны тест төгсгөлдөө сагсаа хоослоод (`Cart, empty`) гардаг.
- **Logout:** амжилттай нэвтэрсэн тест бүр `logout()` туслах функцээр (☰ цэс → Logout) дуусч, нэвтрэх хуудас руу
  буцсаныг `toHaveURL` ба Login товч харагдаж буйгаар шалгадаг.
- **Тохиргоо** (`playwright.config.ts`): `baseURL`, `trace: 'on'`, `video: 'on'`, `screenshot: 'only-on-failure'`, chromium.

## Төслийн бүтэц

~~~
my-first-test/
├── playwright.config.ts        # baseURL, trace, video, reporter
├── tests/saucedemo.spec.ts     # 4 тест (коммент бүхий)
├── codegen/recorded.spec.ts    # Codegen-ээр бичүүлсэн код (харьцуулах зорилготой, testDir-ээс гадуур)
├── report/                     # HTML тайлан (playwright-report-ийн хуулбар, trace + видео дотроо)
├── videos/                     # тест бүрийн бичлэг (.webm)
├── docs/                       # унагасан тестийн screenshot, trace viewer-ийн зураг
└── .gitignore                  # node_modules/, test-results/, playwright-report/ орохгүй
~~~

HTML тайланг нээх: `npx playwright show-report report`.

## Locator-ын сонголт ба XPath-аас зайлсхийсэн шалтгаан

Тестүүд `getByPlaceholder`, `getByRole`, `getByText` ашигладаг — элементийг хэрэглэгчийн харж буй зүйлээр
(товчны нэр, placeholder, текст) ба хүртээмжийн (ARIA) үүргээр нь олдог. XPath (`//div[3]/form/input[2]`
гэх мэт) DOM-ийн бүтцэд шууд уягддаг тул нэг `div` нэмэгдэхэд л эвддэг, уншихад хэцүү, хэрэглэгчид
юу харагдаж байгаагаас хамааралгүй. Үүний бодит жишээг энэ лабд өөрөө үзсэн: эхлээд Logout-ыг `link` гэж
бичсэн тест унасан — trace/aria snapshot-оос сайтын одоогийн хувилбарт Logout нь `button` болсныг харж,
locator-ыг засахад хүрсэн. `getByRole` ийм өөрчлөлтийг тодорхой алдаагаар мэдээлдэг бол XPath ихэнхдээ
чимээгүйгээр буруу элемент олдог. Бүх "Add to cart" товч ижил нэртэй тул анхдагч эрэмбээр Backpack эхэнд
байдгийг ашиглан `.first()` хэрэглэж, дараа нь сагсны хуудсанд яг Backpack орсныг шалгасан.

## Codegen ба Trace viewer

**Codegen** (`npx playwright codegen`, [`codegen/recorded.spec.ts`](codegen/recorded.spec.ts)) миний үйлдлийг
хурдан код болгосон ч: (1) голдуу `page.locator('[data-test="username"]')` гэх мэт CSS/data-test locator үүсгэсэн;
(2) хуудасны хоосон газар дарахад `page.locator('div').filter({ hasText: 'Swag Labs' }).nth(4).click()` гэх мэт
хэврэг, утгагүй мөр нэмсэн; (3) санамсаргүй `press('CapsLock')`, `press('Tab')`, хоосон `fill('')`-ийг ч бичсэн;
(4) **нэг ч `expect` байхгүй** — үйлдлийг давтдаг ч үр дүнг шалгадаггүй. Тиймээс codegen бол locator олох,
эхлэл болгох туслах; бэлэн тест биш.

**Trace viewer:** "successful login" тестийн assertion-ыг санаатайгаар `Productz` болгож унагасан
([`docs/trace-failure-screenshot.png`](docs/trace-failure-screenshot.png), [`docs/trace-viewer.png`](docs/trace-viewer.png)).
Trace viewer алхам бүрийг (goto, fill, click, expect) хугацаатай нь харуулж, улаан болсон `expect toBeVisible`-ийг
5 секунд хүлээгээд `element(s) not found` гэж унасныг, тэр мөчийн DOM snapshot дээр хуудас "Products" гэсэн
гарчигтай бүрэн ачаалагдсан байсныг харуулсан — алдаа сайтад биш, assertion-д байгаа нь шууд тодорхой болсон.
Дараа нь assertion-оо буцааж, бүх тест ногоон болсон.

## Playwright ба Selenium — ажиглалт

Playwright-ийн хамгийн мэдрэгдэх давуу тал нь **auto-wait**: `click`, `fill`, `expect` элемент бэлэн болтол өөрөө
хүлээдэг тул нэг ч `sleep` эсвэл explicit wait бичээгүй, гэхдээ тестүүд тогтвортой ажилласан; Selenium-д
`WebDriverWait`-ийг гараар бичих шаардлагатай. Суулгалт хялбар: `npx playwright install --with-deps chromium`
нэг командаар хөтөч ба хамаарлууд суусан, Selenium шиг хөтөч бүрт тусдаа driver-ийн хувилбар тааруулах
шаардлагагүй. Trace viewer нь Selenium-ийн лог, screenshot-оос хамаагүй илүү мэдээлэл өгдөг — алхам бүрийн
DOM snapshot, хугацаа, сүлжээний хүсэлтийг нэг дор харуулдаг тул locator-ын алдааг минутын дотор олсон.
`getByRole` гэх мэт хүртээмжид суурилсан locator-ууд нь тест бичих хэв маягийг "хэрэглэгч юу хардаг" руу
чиглүүлдэг. Тест бүр шинэ browser context-д ажилладаг тул isolation анхдагчаар хангагдаж, 4 тест 4 worker-ээр
зэрэг ~4–5 секундэд дууссан. Нөгөө талаас Selenium илүү олон жил хэрэглэгдсэн, Java/Python экосистемд
том нийгэмлэг, олон хөтөч (хуучин хувилбар ч) дэмждэг, Selenium Grid-ээр том дэд бүтцэд нэвтэрсэн давуу
талтай. Шинэ төсөлд Playwright-ийг сонгох нь илүү үр бүтээлтэй гэж дүгнэв.

## AI туслахын хэрэглээ

Claude (Anthropic) AI туслахыг ашигласан: тест ба тохиргооны кодын ноорог, terminal командууд, README-ийн
текстийн ноорогт. AI-ийн анхны ноорогт сайтын хуучин бүтцэд тулгуурласан locator-ууд (Logout-ыг `link`,
алдааны мессежийг `heading` гэж) байснаас 3 тест унасан; Playwright-ийн error-context болон aria snapshot-ийг
өөрийн машин дээр гаргаж, сайтын одоогийн бүтцээр (Logout = `button`, алдааны мессеж — текст, сагс —
`"Cart, 1 items"` товч) locator-уудыг засаж, бүх тестийг өөрөө ажиллуулж шалгасан.
