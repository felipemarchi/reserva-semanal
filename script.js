const VALOR_SEMANAL = document.getElementById('configSemanal').value;

const txt1 = document.getElementById('txt1');
const bar1 = document.getElementById('bar1');
const resto1 = document.getElementById('resto1');
resto1.innerHTML = VALOR_SEMANAL;

const txt2 = document.getElementById('txt2');
const bar2 = document.getElementById('bar2');
const resto2 = document.getElementById('resto2');
resto2.innerHTML = VALOR_SEMANAL;
let bkp2 = 0;

const txt3 = document.getElementById('txt3');
const bar3 = document.getElementById('bar3');
const resto3 = document.getElementById('resto3');
resto3.innerHTML = VALOR_SEMANAL;
let bkp3 = 0;

const txt4 = document.getElementById('txt4');
const bar4 = document.getElementById('bar4');
const resto4 = document.getElementById('resto4');
resto4.innerHTML = VALOR_SEMANAL;
let bkp4 = 0;

const btnNovo = document.getElementById('btnNovo');

txt1.addEventListener('input', () => {
    const value = parseFloat(txt1.value);
    salvarValor("valor1", value);
    update1(value);
});

txt2.addEventListener('input', () => {
    if (isNaN(parseFloat(txt1.value)) || parseFloat(txt1.value) < VALOR_SEMANAL)
    {
        txt2.value = 0        
        return
    }
    const value = parseFloat(txt2.value);
    salvarValor("valor2", value);
    update2(value);
});

txt3.addEventListener('input', () => {
    if (isNaN(parseFloat(txt2.value)) || parseFloat(txt2.value) + bkp2 < VALOR_SEMANAL)
    {
        txt3.value = 0        
        return
    }
    const value = parseFloat(txt3.value);
    salvarValor("valor3", value);
    update3(value);
});

txt4.addEventListener('input', () => {
    if (isNaN(parseFloat(txt3.value)) || parseFloat(txt3.value) + bkp3 < VALOR_SEMANAL)
    {
        txt4.value = 0        
        return
    }
    const value = parseFloat(txt4.value);
    salvarValor("valor4", value);
    update4(value);
});

btnNovo.addEventListener('click', () => {
    zerarValores();
    location.reload();
});

function update1(value) {
    let resto = 1;
    if (!isNaN(value)) {
        bar1.innerHTML = value < VALOR_SEMANAL ? value : VALOR_SEMANAL;
        resto = VALOR_SEMANAL - value;
        resto1.innerHTML = resto > 0 ? resto : '';
        const progress = Math.min(100, Math.max(0, (value / VALOR_SEMANAL) * 100));
        bar1.style.width = progress + '%';
        bar1.setAttribute('aria-valuenow', progress);
    } else {
        bar1.style.width = '0%';
        bar1.setAttribute('aria-valuenow', 0);
        resto1.innerHTML = VALOR_SEMANAL;
        bar1.innerHTML = '';
    }

    bkp2 = 0
    if (resto <= 0) {
        txt1.setAttribute('disabled','disabled')
        bar1.classList.add('bg-success')
        bkp2 = resto * -1;
        update2(0);
    } else bar1.classList.remove('bg-success')
}

function update2(value) {
    let resto = 1;
    if (!isNaN(value)) {
        value += bkp2;
        bar2.innerHTML = value < VALOR_SEMANAL ? value : VALOR_SEMANAL;
        resto = VALOR_SEMANAL - value;
        resto2.innerHTML = resto > 0 ? resto : '';
        const progress = Math.min(100, Math.max(0, (value / VALOR_SEMANAL) * 100));
        bar2.style.width = progress + '%';
        bar2.setAttribute('aria-valuenow', progress);
    } else {
        bar2.style.width = bkp2 + '%';
        bar2.setAttribute('aria-valuenow', 0);
        resto2.innerHTML = VALOR_SEMANAL - bkp2;
        bar2.innerHTML = bkp2 > 0 ? bkp2 : '';
    }

    bkp3 = 0
    if (resto <= 0) {
        txt2.setAttribute('disabled','disabled')
        bar2.classList.add('bg-success')
        bkp3 = resto * -1;
        update3(0);
    } else bar2.classList.remove('bg-success')
}

function update3(value) {
    let resto = 1;
    if (!isNaN(value)) {
        value += bkp3;
        bar3.innerHTML = value < VALOR_SEMANAL ? value : VALOR_SEMANAL;
        resto = VALOR_SEMANAL - value;
        resto3.innerHTML = resto > 0 ? resto : '';
        const progress = Math.min(100, Math.max(0, (value / VALOR_SEMANAL) * 100));
        bar3.style.width = progress + '%';
        bar3.setAttribute('aria-valuenow', progress);
    } else {
        bar3.style.width = bkp3 + '%';
        bar3.setAttribute('aria-valuenow', 0);
        resto3.innerHTML = VALOR_SEMANAL - bkp3;
        bar3.innerHTML = bkp3 > 0 ? bkp3 : '';
    }

    bkp4 = 0
    if (resto <= 0) {
        txt3.setAttribute('disabled','disabled')   
        bar3.classList.add('bg-success')   
        bkp4 = resto * -1;
        update4(0);
    } else bar3.classList.remove('bg-success')
}

function update4(value) {
    let resto = 1;
    if (!isNaN(value)) {
        value += bkp4;
        bar4.innerHTML = value;
        resto = VALOR_SEMANAL - value;
        resto4.innerHTML = resto > 0 ? resto : '';
        const progress = Math.min(100, Math.max(0, (value / VALOR_SEMANAL) * 100));
        bar4.style.width = progress + '%';
        bar4.setAttribute('aria-valuenow', progress);
    } else {
        bar4.style.width = bkp4 + '%';
        bar4.setAttribute('aria-valuenow', 0);
        resto4.innerHTML = VALOR_SEMANAL - bkp4;
        bar4.innerHTML = bkp4 > 0 ? bkp4 : '';
    }

    if (resto <= 0)
        bar4.classList.add('bg-success')   
    else
        bar4.classList.remove('bg-success')   
}

function salvarValor(chave, valor) {
    localStorage.setItem(chave, valor)
}

function pegarValor(chave) {
    return localStorage.getItem(chave) ? localStorage.getItem(chave) : 0;
}

function zerarValores() {
    localStorage.setItem("valor1", 0)
    localStorage.setItem("valor2", 0)
    localStorage.setItem("valor3", 0)
    localStorage.setItem("valor4", 0)
}

function windowLoaded() {
    var v1 = parseFloat(pegarValor("valor1"))
    txt1.value = v1
    if (v1 > 0)
        update1(v1)
    var v2 = parseFloat(pegarValor("valor2"))
    txt2.value = v2
    if (v2 > 0)
        update2(v2)
    var v3 = parseFloat(pegarValor("valor3"))
    txt3.value = v3
    if (v3 > 0)
        update3(v3)
    var v4 = parseFloat(pegarValor("valor4"))
    txt4.value = v4
    if (v4 > 0)
        update4(v4)
}

windowLoaded();