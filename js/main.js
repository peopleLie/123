const table = document.querySelector('.table');
const btn = document.querySelector('.btnGet');
const clearBtn = document.querySelector('.clear');
let stringNumber = null;
let amazon = null;
let ebay = null;

const stringNumberTmp = document.querySelector('.num');
stringNumberTmp.addEventListener('blur', (e) => {
  stringNumber = stringNumberTmp.value;
});

const amazonTmp = document.querySelector('.js-amaz');
amazonTmp.addEventListener('blur', (e) => {
  amazon = amazonTmp.value.split('\n');
});

const ebayTmp = document.querySelector('.js-ebay');
ebayTmp.addEventListener('blur', (e) => {
  ebay = ebayTmp.value.split('\n');
  ebay = ebay.map((elem) => {
    // если в строке  больше одной ссылки, создаёт массив по разделителю " / "
    if (elem.lastIndexOf('http') > 10) return elem.split(' / ');
    return elem;
  });
});

function colored(e) {
  if (e.which === 1) {
    e.target.closest('tr').classList = '';
    e.target.closest('tr').classList.add('active');
    e.target.onclick = event => event.preventDefault();
  } else if (e.which === 3) {
    e.target.closest('tr').classList = '';
    e.target.closest('tr').classList.add('error');
  } else if (e.which === 2) {
    e.target.closest('tr').classList = '';
    e.target.closest('tr').classList.add('pedding');
    e.target.oncontextmenu = event => event.preventDefault();
  }
}

function clear(e) {
  table.innerHTML = '';
  clearBtn.hidden = true;
  btn.hidden = false;
}

function open(amaz, eb) {
  // проверка на номер строки
  if (stringNumber === null) stringNumber = 2;
  clearBtn.hidden = false;
  btn.hidden = true;

  const array = [amaz, eb]; // создание двумерного массива

  for (let i = 0; i < array[0].length; i += 1) { // создание строк и ячеек в таблице
    const row = table.insertRow(i);
    row.insertCell(0);
    row.insertCell(-1);
  }

  array.forEach((arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      const x = document.createElement('a'); //создание ссылки
      x.setAttribute('href', arr[i]);
      x.setAttribute('target', '_blank');

      if (arr[i].indexOf('amazon') !== -1) { // заполнение номера строки и первой ячейки со ссылкой Амазон
        x.textContent = `Amazon: ${arr[i].slice(-10)}`; // теск ссылки - ASIN
        table.rows[i].cells[0].textContent = +stringNumber + i; // номер строки
        table.rows[i].cells[1].append(x);
      } else if (typeof arr[i] !== 'string') {
        /* если элемента массива не строка (ebayTmp создал массив),
         для каждого елемента массива создаётся новая ячейка */
        for (let j = 0; j < arr[i].length; j += 1) {
          const tmpTd = table.rows[i].insertCell(-1);
          const z = document.createElement('a');
          tmpTd.appendChild(z);
          z.setAttribute('href', arr[i][j]);
          z.setAttribute('target', '_blank');
          z.textContent = `e-bay: ${arr[i][j]}`;
        }
      } else { // если элемент массива строка
        table.rows[i].insertCell(-1);
        x.textContent = `e-bay: ${arr[i]}`;
        table.rows[i].cells[2].append(x);
      }
    }
  });
}

btn.onclick = e => open(amazon, ebay);
clearBtn.onclick = clear;
table.addEventListener('mousedown', colored);