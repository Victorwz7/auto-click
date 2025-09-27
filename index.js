const puppeteer = require('puppeteer-core');

// O nome do seu serviço de Chromium é 'chromium'.
const CHROMIUM_HOST = 'chromium';

async function autoClicker() {
  console.log(`Tentando conectar ao serviço '${CHROMIUM_HOST}' na porta 9222...`);
  const browserURL = `http://${CHROMIUM_HOST}:9222`;

  try {
    const browser = await puppeteer.connect({ browserURL, timeout: 60000 }); // Aumenta o tempo de espera para 60s
    const page = (await browser.pages())[0];

    if (!page) {
        console.error("Nenhuma aba encontrada no Chromium. O navegador pode estar iniciando ou sem abas abertas.");
        browser.disconnect();
        setTimeout(autoClicker, 60 * 1000); // Tenta de novo em 1 minuto
        return;
    }

    console.log('Conexão bem-sucedida! Iniciando cliques a cada 1 minuto.');

    setInterval(async () => {
      try {
        console.log(`[${new Date().toLocaleTimeString()}] Clicando em (1026, 458)...`);
        await page.mouse.click(1026, 458);
      } catch (e) {
        console.error('Erro durante o clique:', e.message);
      }
    }, 60 * 1000); // 1 minuto

  } catch (e) {
    console.error(`Falha ao conectar: ${e.message}. Verifique os logs e as configurações do serviço '${CHROMIUM_HOST}'. Tentando novamente em 1 minuto...`);
    setTimeout(autoClicker, 60 * 1000); // Tenta de novo em 1 minuto
  }
}

autoClicker();
