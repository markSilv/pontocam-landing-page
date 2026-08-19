# Landing page PontoCam

Landing page estática, responsiva e pronta para GitHub Pages.

## Estrutura

- `index.html`: página principal.
- `assets/css/style.css`: identidade visual e responsividade.
- `assets/js/main.js`: animações, simulador de valores e formulário por e-mail.
- `assets/img/`: logotipo, imagem original da PontoCam Light e imagem para compartilhamento.
- `assets/docs/`: ficha técnica, FAQ e material técnico completo em PDF.

## Publicação no GitHub Pages

1. Envie todo o conteúdo desta pasta para a raiz do repositório.
2. Em **Settings > Pages**, escolha **Deploy from a branch**.
3. Selecione a branch principal e a pasta `/root`.
4. Salve e aguarde a publicação.

Todos os caminhos são relativos e funcionam em repositórios publicados dentro de uma subpasta do GitHub Pages.

## Domínio próprio

Depois que a página estiver aprovada, configure `www.pontocam.com.br` no GitHub Pages e crie o arquivo `CNAME` na raiz contendo:

```text
www.pontocam.com.br
```

## Formulário

A versão entregue abre o aplicativo de e-mail do visitante com a mensagem pronta para `comercial@realponto.com.br`. Para envio automático sem abrir o e-mail, conecte o formulário a um backend, CRM ou serviço de formulários.

## Pontos fáceis de alterar

Os preços e a taxa de implantação aparecem no bloco `#planos` do `index.html`. O cálculo automático está no arquivo `assets/js/main.js`.

## Versão integrada

Esta versão mantém como base o projeto **Landing_Page_PontoCam_Bootstrap** e incorpora do projeto alternativo:

- hero inicial completo, com novo texto, painel ilustrado e imagem da câmera;
- seção **Mais visão. Mais decisão.** no lugar de **Uma visão completa da operação**;
- seção **Feita para operações em movimento** no lugar de **Para diferentes operações**.

Os estilos importados ficam isolados em `assets/css/imported-sections.css` para não alterar as demais seções do site.
