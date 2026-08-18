# Landing Page PontoCam

Landing page comercial e responsiva criada para o lançamento da PontoCam, utilizando Bootstrap 5, CSS personalizado e JavaScript puro.

## Estrutura

```text
pontocam-landing-page/
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── img/
        ├── camera-pontocam-light.png
        ├── favicon.png
        ├── logo-pontocam.png
        ├── logo-pontocam-transparent.png
        └── og-pontocam.jpg
```

## Como visualizar

Abra o arquivo `index.html` no navegador. Para trabalhar no código, o ideal é usar uma extensão como **Live Server** no VS Code.

A página utiliza CDN para carregar:

- Bootstrap 5.3.8
- Bootstrap Icons 1.13.1
- Fonte Manrope, pelo Google Fonts

Por isso, é necessário estar conectado à internet durante a visualização.

## Contatos já configurados

- WhatsApp: `(11) 4126-2929`
- Link do WhatsApp: `551141262929`
- E-mail: `comercial@realponto.com.br`
- Site: `pontocam.com.br`

## Funcionamento do formulário

O formulário não precisa de servidor ou banco de dados. Depois que o visitante preenche os campos, o JavaScript monta uma mensagem e abre o atendimento comercial diretamente no WhatsApp.

O número do WhatsApp está configurado em dois pontos:

1. Nos links do arquivo `index.html`.
2. Na variável `whatsappUrl`, dentro de `assets/js/script.js`.

## Personalização rápida

As cores principais ficam no início do arquivo `assets/css/style.css`, dentro de `:root`:

```css
--pc-navy-950: #04132d;
--pc-navy-900: #071d3f;
--pc-blue-700: #0b438e;
--pc-blue-500: #1e6bd6;
--pc-red: #ff1b2d;
```

## Publicação

A pasta pode ser publicada diretamente em serviços como GitHub Pages, Netlify ou hospedagem convencional. Mantenha a estrutura de pastas para não quebrar os caminhos das imagens, do CSS e do JavaScript.

Antes da publicação definitiva, confirme se o domínio final será exatamente `https://pontocam.com.br/`. Caso seja diferente, atualize no `index.html`:

- `canonical`
- `og:url`
- `og:image`
- JSON-LD

Também atualize o endereço no arquivo `sitemap.xml`.
