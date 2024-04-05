const convertBtn = document.querySelector('#convert-btn');
const copyBtn = document.querySelector('#copy-btn');
const textareaKeywords = document.querySelector('#textarea-keywords');
const info = document.querySelector('.info');
const domainZone = document.getElementsByName('zone');
const domainNumbers = document.getElementsByName('numbers');


convertBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let domainsResult = ''
    const domainsArray = textareaKeywords.value.split(/\n/);

    domainsArray.forEach(domain => {
        domainsResult += `${domain.toLowerCase().replace(/ /g, '-')}${addNumberForDomain()}${checkedRadio(domainZone)}\n`
    })

    textareaKeywords.value = domainsResult
    toggleBlock(info, 'Домены конвертированы')
})

copyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(textareaKeywords.value).then(function() {
        toggleBlock(info, 'Домены скопированы')
      }, function(err) {
        console.error('Произошла ошибка при копировании текста: ', err);
      });
})

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
