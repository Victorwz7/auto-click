const puppeteer = require('puppeteer');

// Pega as credenciais das variáveis de ambiente
const userEmail = process.env.BOOSTEROID_EMAIL;
const userPassword = process.env.BOOSTEROID_PASSWORD;

if (!userEmail || !userPassword) {
  console.error('ERRO: As variáveis de ambiente BOOSTEROID_EMAIL e BOOSTEROID_PASSWORD não foram definidas!');
  process.exit(1); // Encerra o script se as credenciais não forem encontradas
}

async function autoClicker() {
  console.log('Iniciando o navegador invisível...');
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });
    const page = await browser.newPage();
    console.log('Navegador iniciado. Tentando fazer login...');

    // --- ETAPA DE LOGIN ---
    await page.goto('https://cloud.boosteroid.com/auth/login');

    // Espera os campos aparecerem na tela antes de digitar
    await page.waitForSelector('input[type="email"]');
    await page.waitForSelector('input[type="password"]');

    // Preenche o email e a senha
    await page.type('input[type="email"]', userEmail);
    await page.type('input[type="password"]', userPassword);

    // Clica no botão de login e espera a navegação para a próxima página
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }), // Espera a página carregar após o login
      page.click('button.action-login') // O seletor correto para o botão de login
    ]);

    console.log('Login realizado com sucesso! Iniciando o ciclo de cliques.');
    // --- FIM DA ETAPA DE LOGIN ---

    // O loop que vai rodar a cada minuto
    setInterval(async () => {
      try {
        // Agora que está logado, você pode navegar para a página que precisa
        // e realizar a ação de clique.
        
        // Exemplo: Navegar para a página principal após o login
        console.log('Navegando para a página de jogos...');
        await page.goto('https://cloud.boosteroid.com/library'); // <-- TROQUE PELA URL QUE VOCÊ PRECISA ACESSAR

        console.log('Aguardando 10 segundos para a página carregar...');
        await new Promise(resolve => setTimeout(resolve, 10000));

        console.log(`[${new Date().toLocaleTimeString()}] Clicando em (1026, 458)...`);
        await page.mouse.click(1026, 458);
        console.log('Clique realizado com sucesso.');

      } catch (e) {
        console.error('Erro durante a navegação ou clique:', e.message);
      }
    }, 60 * 1000);

  } catch (e) {
    console.error('Erro fatal durante o processo de login ou inicialização:', e.message);
    if (browser) await browser.close();
    setTimeout(autoClicker, 60 * 1000);
  }
}

autoClicker();
