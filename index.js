const puppeteer = require('puppeteer');

async function autoClicker() {
  console.log('Iniciando o navegador invisível...');
  let browser;
  try {
    // Inicia uma instância do navegador que vem junto com o Puppeteer
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080' // Define um tamanho de janela para a página carregar corretamente
      ]
    });

    const page = await browser.newPage();
    console.log('Navegador iniciado.');

    // O loop que vai rodar a cada minuto
    setInterval(async () => {
      try {
        // Acessa a URL pública do seu outro container, como um usuário normal
        console.log('Navegando para https://projetoagenda-chromium.egraeo.easypanel.host/ ...');
        await page.goto('https://projetoagenda-chromium.egraeo.easypanel.host/');

        // Espera 5 segundos para garantir que tudo na página carregou
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log(`[${new Date().toLocaleTimeString()}] Clicando em (1026, 458)...`);
        await page.mouse.click(1026, 458);
        console.log('Clique realizado com sucesso.');

      } catch (e) {
        console.error('Erro durante a navegação ou clique:', e.message);
      }
    }, 60 * 1000); // 60 segundos = 1 minuto

  } catch (e) {
    console.error('Erro fatal ao iniciar o navegador:', e.message);
    if (browser) await browser.close();
    // Se falhar, tenta reiniciar em 1 minuto
    setTimeout(autoClicker, 60 * 1000);
  }
}

autoClicker();
