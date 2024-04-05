const convertBtn = document.querySelector('#convert-btn');
const copyBtn = document.querySelector('#copy-btn');
const textareaDomains = document.querySelector('#textarea-domains');
const info = document.querySelector('.info');
const domainZone = document.getElementsByName('zone');
const domainNumbers = document.getElementsByName('numbers');
const domainCounter = document.querySelector('.input-counter');


convertBtn.addEventListener('click', (event) => {
    event.preventDefault();
    textareaDomains.value = countAddDomain()
    toggleBlock(info, 'Домены конвертированы')
})

copyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(textareaDomains.value).then(function() {
        toggleBlock(info, 'Домены скопированы')
      }, function(err) {
        console.error('Произошла ошибка при копировании текста: ', err);
      });
})


function createDomain(domain){
    let domainsResult = ''
    const domainsArray = domain.split(/\n/);

    domainsArray.forEach(domain => {
        domainsResult += `${domain.toLowerCase().replace(/ /g, '-')}${addNumberForDomain()}${checkedRadio(domainZone)}\n`
    })

    return domainsResult;
}

function countAddDomain() {
    let result = ''
    for(let i = 0; i < domainCounter.value; i++){
        result += createDomain(textareaDomains.value)
    }
    return result
}

function toggleBlock(block, textContent) {
    block.textContent = textContent;
    block.classList.toggle('hidden')
    setTimeout(() => {
        block.classList.toggle('hidden')
    }, 1000)
}

function checkedRadio(radios) {
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            return radios[i].value
        }
    }
}

function addNumberForDomain() {
    if(checkedRadio(domainNumbers) === 'yes') {
        return `-${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)}`
    }
    return ''
}
