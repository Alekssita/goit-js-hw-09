// 1. Оголошення об'єкта formData
const formData = {
  email: "",
  message: ""
};

// 2. Функція для зберігання даних у локальне сховище
const saveToLocalStorage = () => {
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

// 3. Подія для відстеження змін у формі та збереження в formData
document.querySelector(".feedback-form").addEventListener("input", event => {
  const { name, value } = event.target;
  
  // Оновлюємо відповідне поле у formData
  if (name in formData) {
    formData[name] = value;
  }
  
  // Зберігаємо оновлені дані в локальне сховище
  saveToLocalStorage();
});

// 4. Завантаження даних з локального сховища
window.addEventListener("load", () => {
  const savedData = localStorage.getItem("feedback-form-state");
  
    if (savedData) {
    // Якщо є збережені дані, заповнюємо форму та об'єкт formData
    const { email, message } = JSON.parse(savedData);
    formData.email = email;
    formData.message = message;

    document.querySelector("[name='email']").value = email;
    document.querySelector("[name='message']").value = message;
  }
});

// 5. Відправка форми та перевірка на заповненість полів
document.querySelector(".feedback-form").addEventListener("submit", event => {
  event.preventDefault(); 

  // Перевірка на порожні поля
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
  } else {
    // Виводимо об'єкт formData у консоль
    console.log(formData);

    // Очищаємо локальне сховище, об'єкт formData і поля форми
    localStorage.removeItem("feedback-form-state");
    formData.email = "";
    formData.message = "";

    document.querySelector("[name='email']").value = "";
    document.querySelector("[name='message']").value = "";
  }
});