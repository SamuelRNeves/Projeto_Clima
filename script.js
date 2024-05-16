// Adiciona um ouvinte de evento para o evento 'submit' no elemento com classe 'busca'
document.querySelector('.busca').addEventListener('submit', async function(event) {
    // Evita o comportamento padrão do formulário, que é recarregar a página ao ser submetido
    event.preventDefault();

    // Obtém o valor do campo de entrada com o id 'searchInput'
    let input = document.querySelector('#searchInput').value;

    // Verifica se o campo de entrada não está vazio
    if (input !== '') {
        // Limpa as informações anteriores
        clearInfo();
        // Exibe uma mensagem de carregamento
        showWarning('Carregando...');

        // Constrói a URL da API de previsão do tempo com base na entrada do usuário
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=06d8e5eaf4d2d4d7994d5ee347ec5d95&units=metric&pt_lang`;

        // Realiza uma requisição assíncrona para a API de previsão do tempo e aguarda a resposta
        let results = await fetch(url);

        // Converte a resposta da API em formato JSON
        let json = await results.json();

        // Verifica se a resposta da API foi bem-sucedida (código de status 200)
        if (json.cod === 200) {
            // Exibe as informações de previsão do tempo
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            // Exibe uma mensagem de aviso caso a localização não seja encontrada
            showWarning('Localização não encontrada');
        }
    }
});

// Função para exibir as informações de previsão do tempo
function showInfo(json) {
    // Limpa as informações anteriores
    showWarning('');
    // Atualiza o título com o nome da cidade e o país
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    // Atualiza a informação de temperatura
    document.querySelector(`.tempInfo`).innerHTML = `${json.temp} <sup>ºC</sup>`;
    // Atualiza a informação de velocidade do vento
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    // Define o ícone da temperatura com base no código fornecido pela API
    document.querySelector(`.temp img`).setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    // Define a direção do vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    // Exibe o resultado
    document.querySelector('.resultado').style.display = 'block';
}

// Função para limpar as informações de previsão do tempo
function clearInfo() {
    // Limpa as informações anteriores
    showWarning('');
    // Esconde o resultado
    document.querySelector('.resultado').style.display = 'none';
}

// Função para exibir uma mensagem de aviso
function showWarning(msg) {
    // Atualiza o conteúdo da div de aviso com a mensagem fornecida
    document.querySelector('.aviso').innerHTML = msg;
}
