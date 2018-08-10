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
    e.target.closest('tr').classList.remove('pedding');
    e.target.closest('tr').classList.add('active');
    e.target.onclick = event => event.preventDefault();
  } else if (e.which === 3) {
    e.target.closest('tr').classList.remove('pedding');
    e.target.closest('tr').classList.remove('active');
    e.target.closest('tr').classList.add('error');
    e.target.oncontextmenu = event => event.preventDefault();
  } else if (e.which === 2) {
    e.target.closest('tr').classList.remove('active');
    e.target.closest('tr').classList.remove('error');
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
  if (stringNumber === null) {
    stringNumberTmp.style.outline = '3px solid red';
    return alert('введите номер строки');
  }
  stringNumberTmp.style.outline = '';
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

const qwe = [
  'https: //www.amazon.com/dp/B0024MKPUC',
  'https: //www.amazon.com/dp/B014U51A8G',
  'https: //www.amazon.com/dp/B004HW88VU',
  'https: //www.amazon.com/dp/B004HW88W4',
  'https: //www.amazon.com/dp/B00ER09BW2',
  'https: //www.amazon.com/dp/B017L7RO26',
  'https: //www.amazon.com/dp/B01G43EU02',
  'https: //www.amazon.com/dp/B003DQVWEQ',
  'https: //www.amazon.com/dp/B00EV9KE48',
  'https: //www.amazon.com/dp/B01J4SC5QU',
  'https: //www.amazon.com/dp/B00EZFPDO4',
  'https: //www.amazon.com/gp/product/B074MJ65P7',
  'https: //www.amazon.com/dp/B01C3Q8Q2M',
  'https: //www.amazon.com/dp/B01EU769TO',
  'https: //www.amazon.com/dp/B00P6RCOKQ',
  'https: //www.amazon.com/dp/B013CTV0OU',
  'https: //www.amazon.com/dp/B017IS057O',
  'https: //www.amazon.com/dp/B01J5LE0R8',
  'https: //www.amazon.com/dp/B01DZZJVR4',
];

const qwe2 = [
  'https: //goo.gl/xofHBm;',
  'https: //goo.gl/ngbaBu;',
  'https: //goo.gl/q3DVRV;',
  'https: //goo.gl/ouZekQ;',
  'https: //goo.gl/6xyQ2A;',
  'https: //goo.gl/gWkpVZ;',
  'https: //goo.gl/cRUkpz;',
  'https: //goo.gl/NqbrVw;',
  'https: //goo.gl/gbxSRY;',
  'https: //goo.gl/EG3zLN;',
  'https: //goo.gl/hzNjfa;',
  'https: //goo.gl/keFKwB;',
  'https: //goo.gl/XJqsfu;',
  'https: //goo.gl/A6pXtv;',
  'https: //goo.gl/Suhpmn;',
  'https: //goo.gl/A77C4c;',
  'https: //goo.gl/nEVMHt;',
  'https: //goo.gl/2td8WD;',
  'https: //goo.gl/rh9Npu;',
];


btn.onclick = e => open(qwe, qwe2);
clearBtn.onclick = clear;
table.addEventListener('mousedown', colored);