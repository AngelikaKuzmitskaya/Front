// ==== Вопрос 1: встроенные объекты ====
let mathExample = "Math.sqrt(4) = " + Math.sqrt(4);
let dateExample = "new Date().getFullYear() = " + new Date().getFullYear();
let arrayExample = "[1,2,3].length = " + [1, 2, 3, 4, 5].length;
let docExample = "document.title = '" + document.title + "'";
document.getElementById("output1").textContent =
    mathExample + " | " + dateExample + " | " + arrayExample + " | " + docExample;

// ==== Вопрос 2: объекты ====
let animal = {
    name: "Собака",
    age: 3,
    isanimal: true,
    greet: function () {
        return "Привет! Я " + this.name;
    }
};

let animal2 = {
    name: "Косточка",
    isanimal: false,
    greet: function () {
        return "Это не животное. Это " + this.name;
    }
};

document.getElementById("output2").textContent =
    "Создан объект animal: { name: '" + animal.name + "', age: " + animal.age + ", isanimal: true }; " +
    "Создан объект animal2: { name: '" + animal2.name + "', age: " + animal2.age + ", isanimal: false }";

// ==== Вопрос 3: доступ к свойствам ====
document.getElementById("output3").textContent =
    "animal → Имя: " + animal.name + ", возраст: " + animal.age + ", greet(): " + animal.greet() + "; " +
    "animal2 → Имя: " + animal2.name + ", возраст: " + animal2.age + ", greet(): " + animal2.greet();

// ==== Вопрос 4: удаление свойства ====
delete animal.isanimal;
delete animal2.isanimal;
document.getElementById("output4").textContent =
    "Удалено свойство isanimal: animal.isanimal = " + animal.isanimal + ", animal2.isanimal = " + animal2.isanimal;

// ==== Вопрос 5: проверка свойства ====
let check1 = ("name" in animal) + ", " + animal.hasOwnProperty("age");
let check2 = ("name" in animal2) + ", " + animal2.hasOwnProperty("age");
document.getElementById("output5").textContent =
    "animal: (name in animal, hasOwnProperty('age')) = " + check1 + "; " +
    "animal2: (name in animal2, hasOwnProperty('age')) = " + check2;

// ==== Вопрос 6: перебор свойств ====
let result6_1 = "";
for (let key in animal) {
    result6_1 += key + ": " + animal[key] + "; ";
}
let result6_2 = "";
for (let key in animal2) {
    result6_2 += key + ": " + animal2[key] + "; ";
}
document.getElementById("output6").textContent =
    "animal → " + result6_1 + "\nanimal2 → " + result6_2;

