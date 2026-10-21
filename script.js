// ---------- گرفتن المنت‌های اصلی صفحه ----------

// اینپوتی که کاربر کار جدید را داخلش تایپ می‌کند
const taskInput = document.getElementById("taskInput");
// دکمه‌ی «Add Task»
const addTaskBtn = document.getElementById("addTaskBtn");
// لیست (ul) که کارها داخلش اضافه می‌شوند
const taskList = document.getElementById("taskList");

// شمارنده برای ساختن id یکتا برای هر کار (task1، task2، ...)
// با اضافه شدن هر کار جدید، یکی زیاد می‌شود
let countItem = 0;

// ---------- اضافه کردن کار جدید ----------

// وقتی روی دکمه کلیک شود، تابع زیر اجرا می‌شود
addTaskBtn.addEventListener("click", () => {
  // مقدار اینپوت را می‌گیریم و فاصله‌های اول و آخر آن را حذف می‌کنیم
  const task = taskInput.value.trim();

  // اگر متن خالی نبود کار را اضافه کن (رشته‌ی خالی در شرط false حساب می‌شود)
  if (task) {
    // شمارنده را زیاد می‌کنیم و با آن یک id یکتا می‌سازیم (مثلاً task1)
    countItem += 1;
    const id = `task${countItem}`;

    // ساخت المنت li برای کار جدید و دادن کلاس task-item به آن
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // داخل li فقط لیبل چک‌باکس را می‌گذاریم (چک‌باکس مخفی + SVG انیمیشنی)
    // قسمت ثابت (چک‌باکس و SVG): امن است چون هیچ ورودی کاربری داخلش نیست
    taskItem.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" name="task" id="${id}" />
        <svg viewBox="0 0 64 64" height="1em" width="1em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            class="path"
          ></path>
        </svg>
      </label>
    `;
    // ساخت یک لیبل جداگانه برای متن کار
    // دلیل جدا ساختن: متن کاربر را با textContent می‌گذاریم تا به‌صورت متن ساده
    // نمایش داده شود و کد مخرب اجرا نشود (جلوگیری از XSS)
    const label = document.createElement("label");
    // اتصال لیبل به چک‌باکس: کلیک روی متن، چک‌باکس را تیک می‌زند
    label.htmlFor = id;
    label.textContent = task;
    // این کلاس برای ساختن خط روی متن در CSS استفاده می‌شود
    label.classList.add("task-text");

    // اضافه کردن لیبل متن به li
    taskItem.appendChild(label);

    // پیدا کردن چک‌باکسِ همین آیتم (نه چک‌باکس‌های بقیه‌ی آیتم‌ها)
    const checkbox = taskItem.querySelector("input");
    // شناسه‌ی تایمر را اینجا نگه می‌داریم تا بتوانیم لغوش کنیم
    // چون داخل تابع کلیک تعریف شده، برای هر آیتم یک timerId جداست
    let timerId;

    // وقتی وضعیت چک‌باکس عوض شود (تیک بخورد یا برداشته شود)
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // بعد از ۱ ثانیه شروع به کم‌رنگ شدن می‌کنه
        timerId = setTimeout(() => {
          // کلاس fade-out باعث می‌شود opacity به ۰ برسد (انیمیشن در CSS)
          taskItem.classList.add("fade-out");

          // بعد از تمام شدن انیمیشن (۰.۵ ثانیه) حذف می‌شه
          setTimeout(() => {
            taskItem.remove();
          }, 500);
        }, 1000);
      } else {
        // اگه کاربر قبل از ۱ ثانیه تیک را برداشت، لغو کن
        clearTimeout(timerId);
      }
    });
    // اضافه کردن آیتم کامل به لیست داخل صفحه
    taskList.appendChild(taskItem);

    // خالی کردن اینپوت برای نوشتن کار بعدی
    taskInput.value = "";
  }
});