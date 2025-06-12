const fs = require('fs');
const path = require('path');

// Caminhos
const indexPath = path.join(__dirname, 'index.html');
const musicasDir = path.join(__dirname, '..', 'Musica'); // ajuste para 'Música' se necessário

// Garante que a pasta existe
if (!fs.existsSync(musicasDir)) {
  fs.mkdirSync(musicasDir, { recursive: true });
  console.log(`Pasta criada: ${musicasDir}`);
}

<<<<<<< HEAD
// Le o index.html
=======
// Lê o index.html
>>>>>>> 4208e927c6353a29b750666059bb6ca135888a45
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// Expressão regular para pegar nomes das músicas
const regex = /<div[^>]*class="[^"]*\btrack-name\b[^"]*\btrack\b[^"]*"[^>]*>\s*([^<]+?)(?:<[^>]*>)*\s*<br/gi;

let match;
const musicas = [];

while ((match = regex.exec(indexHtml)) !== null) {
  // Limpa o nome da música
  let nome = match[1].replace(/[\n\r]/g, '').trim();
<<<<<<< HEAD
  // Remove caracteres inválidos pro nome de arquivo
=======
  // Remove caracteres inválidos para nome de arquivo
>>>>>>> 4208e927c6353a29b750666059bb6ca135888a45
  let nomeArquivo = nome.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');
  musicas.push({ nome, nomeArquivo });
}

console.log('Músicas encontradas:', musicas.length, musicas);

// Cria arquivos HTML para cada música
musicas.forEach(({ nome, nomeArquivo }) => {
  const conteudo = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${nome}</title>
</head>
<body>
  <h1>${nome}</h1>
  <p>Você está visualizando a música: ${nome}</p>
</body>
</html>
`;
  try {
    fs.writeFileSync(path.join(musicasDir, `${nomeArquivo}.html`), conteudo, 'utf8');
    console.log(`Criado: ${nomeArquivo}.html`);
  } catch (err) {
    console.error(`Erro ao criar ${nomeArquivo}.html:`, err.message);
  }
});