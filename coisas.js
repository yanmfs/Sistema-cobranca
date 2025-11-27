function openTab(tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

function handleParcelasChange() {
    const parcelasAtrasoInput = document.getElementById('parcelasAtraso');
    const semEntradaCheckbox = document.getElementById('semEntradaCheckbox');

    if (parseInt(parcelasAtrasoInput.value) === 1) {
        semEntradaCheckbox.checked = true;
        semEntradaCheckbox.disabled = true;
    } else {
        semEntradaCheckbox.disabled = false;
    }

    toggleEntrada();
}

function toggleEntrada() {
    const valorEntradaInput = document.getElementById('valorEntrada');
    const semEntradaCheckbox = document.getElementById('semEntradaCheckbox');

    if (semEntradaCheckbox.checked) {
        valorEntradaInput.disabled = true;
        valorEntradaInput.value = ''; 
        valorEntradaInput.placeholder = 'Desativado';
    } else {
        valorEntradaInput.disabled = false;
        valorEntradaInput.placeholder = 'Ex: 300,00';
    }
}

function formatarNome(nome) {
    if (!nome) return "";
    return nome.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function gerarMensagemRenegociacao() {
    const nomeClienteInput = document.getElementById('nomeCliente').value;
    const numContratos = document.getElementById('numContratos').value;
    const nomeLoja = document.getElementById('nomeLoja').value;
    const totalParcelas = document.getElementById('totalParcelas').value;
    const parcelasAtraso = document.getElementById('parcelasAtraso').value;
    const valorTotal = document.getElementById('valorTotal').value;
    const valorEntrada = document.getElementById('valorEntrada').value;
    const semAcordo = document.getElementById('semEntradaCheckbox').checked;

    if (!nomeClienteInput || !numContratos || !nomeLoja || !parcelasAtraso || !valorTotal || (!semAcordo && !valorEntrada)) {
        alert('Por favor, preencha todos os campos obrigatórios para gerar a mensagem.');
        return;
    }

    const parcelasAtrasoNum = parseInt(parcelasAtraso);
    const nomeClienteFormatado = formatarNome(nomeClienteInput);

    let infoParcelas = '';
    if (parseInt(totalParcelas) === parcelasAtrasoNum) {
        infoParcelas = `No total, são ${totalParcelas} parcelas já vencidas.`;
    } else {
        infoParcelas = `No total, são ${totalParcelas} parcelas, com ${parcelasAtrasoNum} delas já vencidas.`;
    }

    let mensagem;
    const mensagemBase = `Então, ${nomeClienteFormatado}. Estou verificando sua situação com a Atlanta e confirmo que você possui ${numContratos} contrato(s) em atraso referente a compras na loja ${nomeLoja}.\n\n${infoParcelas} O valor total em atraso hoje, com os juros, é de R$ ${valorTotal}.`;
    const pixInfo = `\n\nAceitamos pagamentos via PIX ou Boleto Bancário. Com o PIX, a baixa do pagamento em nosso sistema ocorre na hora!`;

    if (parcelasAtrasoNum === 1) {
        mensagem = `${mensagemBase}\n\nPara regularizar sua situação, a opção disponível é a Quitação à Vista, pagando o valor total de R$ ${valorTotal} de uma só vez.${pixInfo}`;
    } 
    else {
        const opcoesBase = `\n\nPara regularizar sua situação, temos as seguintes opções:\n\n1. Quitação à Vista: Você pode pagar o valor total de R$ ${valorTotal} de uma só vez.\n2. Pagamento por Parcela: Você pode pagar uma parcela em atraso por vez, até colocar o contrato em dia.`;
        
        if (semAcordo) {
            mensagem = `${mensagemBase}${opcoesBase}${pixInfo}`;
        } else {
            const opcaoAcordo = `\n3. Fazer um Acordo: Nesta opção, nós unificamos todo o seu débito. Você paga um valor de entrada de R$ ${valorEntrada} e o restante podemos parcelar.`;
            const infoAcordo = `\n\nImportante sobre o acordo: Para que ele seja oficializado, o procedimento é o seguinte: primeiro você realiza o pagamento da entrada. Após a confirmação desse pagamento, é necessário que o titular da compra vá pessoalmente até a Atlanta com seus documentos pessoais (RG e CPF) para assinar o termo de renegociação. OBS: O títular tem até 30 dias para assinar o acordo.`;
            mensagem = `${mensagemBase}${opcoesBase}${opcaoAcordo}${pixInfo}${infoAcordo}`;
        }
    }

    document.getElementById('mensagemRenegociacao').value = mensagem;
}

function gerarMensagemReferencia() {
    const nomeReferenciaInput = document.getElementById('nomeReferencia').value;
    const nomeDevedorInput = document.getElementById('nomeDevedor').value;

    if (!nomeReferenciaInput || !nomeDevedorInput) {
        alert('Por favor, preencha os dois nomes para gerar a mensagem de referência.');
        return;
    }

    const nomeReferenciaFormatado = formatarNome(nomeReferenciaInput);
    const nomeDevedorFormatado = formatarNome(nomeDevedorInput);

    const mensagem = `Olá, ${nomeReferenciaFormatado}. Sou Yan, da Atlanta. Seu número foi indicado como referência por ${nomeDevedorFormatado}. Você teria um contato atualizado para nos informar ou, se preferir, poderia apenas pedir para que essa pessoa fale conosco? Desde já, muito obrigado(a).`;
    document.getElementById('mensagemReferencia').value = mensagem;
}

function limparCamposRenegociacao() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('numContratos').value = '';
    document.getElementById('nomeLoja').value = '';
    document.getElementById('totalParcelas').value = '';
    document.getElementById('parcelasAtraso').value = '';
    document.getElementById('valorTotal').value = '';
    document.getElementById('valorEntrada').value = '';
    document.getElementById('mensagemRenegociacao').value = '';

    const semEntradaCheckbox = document.getElementById('semEntradaCheckbox');
    semEntradaCheckbox.checked = false;
    semEntradaCheckbox.disabled = false; 
    toggleEntrada(); 
}

function limparCamposReferencia() {
    document.getElementById('nomeReferencia').value = '';
    document.getElementById('nomeDevedor').value = '';
    document.getElementById('mensagemReferencia').value = '';
}

function copiarTexto(elementId) {
    const textarea = document.getElementById(elementId);
    if (textarea.value === '') {
        alert('Gere uma mensagem primeiro antes de copiar!');
        return;
    }
    textarea.select();
    document.execCommand('copy');
    
    const copyButton = document.getElementById('copyButton' + (elementId === 'mensagemRenegociacao' ? 'Renegociacao' : 'Referencia'));
    const originalText = copyButton.innerText;
    copyButton.innerText = 'Copiado!';
    setTimeout(() => { copyButton.innerText = originalText; }, 2000);

    if (elementId === 'mensagemRenegociacao') {
        limparCamposRenegociacao();
    } else if (elementId === 'mensagemReferencia') {
        limparCamposReferencia();
    }
}

function parseDate(dateString) {
    const parts = dateString.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
    if (parts) {
        return new Date(parts[3], parts[2] - 1, parts[1]);
    }
    const date = new Date(dateString + 'T00:00:00');
    if (!isNaN(date.getTime())) {
        return date;
    }
    return null;
}

function calcularJuros() {
    const valorOriginal = parseFloat(document.getElementById('valorOriginal').value);
    const diaInicialStr = document.getElementById('diaInicial').value;
    const diaFinalStr = document.getElementById('diaFinal').value;
    const resultadoDiv = document.getElementById('resultadoJuros');

    if (!valorOriginal || !diaInicialStr || !diaFinalStr) {
        alert('Por favor, preencha todos os campos para calcular.');
        return;
    }

    const dataInicial = parseDate(diaInicialStr);
    const dataFinal = parseDate(diaFinalStr);

    if (!dataInicial || !dataFinal) {
        alert('Formato de data inválido. Use DD/MM/AAAA ou AAAA-MM-DD.');
        return;
    }

    if (dataFinal < dataInicial) {
        alert('A data final não pode ser anterior à data de vencimento.');
        return;
    }
    
    const diffTime = dataFinal - dataInicial;
    const diasDeAtraso = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let taxaDiariaPercentual = 0;

    if (diasDeAtraso >= 1 && diasDeAtraso <= 100) {
        taxaDiariaPercentual = 0.40;
    } else if (diasDeAtraso >= 101 && diasDeAtraso <= 180) {
        taxaDiariaPercentual = 0.20;
    } else if (diasDeAtraso >= 181 && diasDeAtraso <= 731) {
        taxaDiariaPercentual = 0.15;
    } else if (diasDeAtraso >= 732) {
        taxaDiariaPercentual = 0.10;
    }
    
    let taxaDiariaDecimal = taxaDiariaPercentual / 100;
    
    const jurosPorDia = valorOriginal * taxaDiariaDecimal;
    const jurosTotais = jurosPorDia * diasDeAtraso;
    const valorFinal = valorOriginal + jurosTotais;

    const formatBRL = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    resultadoDiv.innerHTML = `
        <p><strong>Dias de Atraso:</strong> ${diasDeAtraso}</p>
        <p><strong>Taxa de Juros Aplicada:</strong> ${taxaDiariaPercentual.toFixed(2)}% ao dia</p>
        <p><strong>Valor dos Juros Totais:</strong> ${formatBRL(jurosTotais)}</p>
        <hr>
        <p class="final-value">Valor Final da Parcela: ${formatBRL(valorFinal)}</p>
    `;
    resultadoDiv.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    openTab('renegociacao');
});