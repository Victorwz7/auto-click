const puppeteer = require('puppeteer');

// A URL pública do seu serviço Chromium
const targetUrl = 'https://chat-oliveiradrops-chromium.n0rb5w.easypanel.host/';

// As coordenadas do clique
const clickX = 371;
const clickY = 426;

async function autoClicker() {
  console.log('Iniciando o robô de clique...');
  let browser;
  try {
    // Inicia uma instância do navegador que vem junto com o Puppeteer
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080' // Define uma resolução grande para a página carregar corretamente
      ]
    });
    console.log('Navegador invisível iniciado com sucesso.');

    // Função que executa a tarefa de clique
    const performClick = async () => {
      let page = null;
      try {
        console.log('Abrindo uma nova aba...');
        page = await browser.newPage();

        // Acessa a sua URL
        console.log(`Navegando para: ${targetUrl}`);
        // Aumentamos o timeout para 60 segundos para dar tempo de carregar a interface pesada
        await page.goto(targetUrl, { timeout: 60000 });

        // Espera 10 segundos extras para garantir que a transmissão de vídeo iniciou
        console.log('Aguardando 10 segundos para a interface estabilizar...');
        await new Promise(resolve => setTimeout(resolve, 10000));

        console.log(`[${new Date().toLocaleTimeString()}] Clicando na posição (${clickX}, ${clickY})...`);
        await page.mouse.click(clickX, clickY);
        console.log('Clique realizado com sucesso.');

      } catch (e) {
        console.error('Ocorreu um erro durante a operação:', e.message);
      } finally {
        // Fecha a aba para economizar CPU e memória
        if (page) {
          await page.close();
          console.log('Aba fechada. Próximo clique em 1 minuto.');
        }
      }
    };

    // Executa a função pela primeira vez após um curto delay
    setTimeout(performClick, 5000); 

    // E depois agenda para rodar a cada 1 minuto
    setInterval(performClick, 60 * 1000);

  } catch (e) {
    console.error('Erro fatal ao iniciar o navegador:', e.message);
    if (browser) await browser.close();
    // Tenta reiniciar o robô se houver uma falha crítica
    setTimeout(autoClicker, 60 * 1000);
  }
}

autoClicker();
