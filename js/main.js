const table = document.querySelector('.table');
const btn = document.querySelector('.btn');
let amazon = null;
let ebay = null;

const amazonTmp = document.querySelector('.js-amaz');
amazonTmp.addEventListener('blur', (e) => {
  amazon = amazonTmp.value.split('\n');
});

const ebayTmp = document.querySelector('.js-ebay');
ebayTmp.addEventListener('blur', (e) => {
  ebay = ebayTmp.value.split('\n');
  ebay = ebay.map((elem) => {
    if (elem.lastIndexOf('http') > 10) return elem.split(' / ');
    return elem;
  });
});

function colored(e) {
  e.target.closest('tr').classList.add('active');
  if (e.which === 3) {
    console.log('!');
    e.target.closest('tr').classList.remove('active');
    e.target.closest('tr').classList.toggle('error');
    e.target.oncontextmenu = event => event.preventDefault();
  }
}

function open(amaz, eb) {
  const array = [amaz, eb];

  for (let i = 0; i < array[0].length; i += 1) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    tr.appendChild(td);
    table.appendChild(tr);
  }
  array.forEach((arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      const x = document.createElement('a');
      x.setAttribute('href', arr[i]);
      x.setAttribute('target', '_blank');

      if (arr[i].indexOf('amazon') !== -1) {
        x.textContent = `Amazon: ${arr[i].slice(-10)}`;
        table.rows[i].cells[0].append(x);
      } else if (typeof arr[i] !== 'string') {
        for (let j = 0; j < arr[i].length; j += 1) {
          const tmpTd = document.createElement('td');
          const z = document.createElement('a');
          z.setAttribute('href', arr[i][j]);
          z.setAttribute('target', '_blank');
          z.textContent = `e-bay: ${arr[i][j]}`;
          table.rows[i].appendChild(tmpTd);
          tmpTd.appendChild(z);
        }
      } else {
        const td2 = document.createElement('td');
        table.rows[i].appendChild(td2);
        x.textContent = `e-bay: ${arr[i]}`;
        table.rows[i].cells[1].append(x);
      }
    }
  });
}

btn.onclick = e => open(amazon, ebay);
table.addEventListener('mousedown', colored);