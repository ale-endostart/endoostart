# Guia de Deployment - EndoStart

## Deploy em Vercel (Recomendado)

Vercel é a plataforma ideal para Next.js com integração total e performance otimizada.

### Passo 1: Preparar Repositório

```bash
# Inicializar git (se ainda não feito)
git init
git add .
git commit -m "Initial commit: EndoStart landing page"
```

### Passo 2: Criar Repositório no GitHub

1. Acessar https://github.com/new
2. Criar repositório `endostart-landing`
3. Seguir instruções para push:

```bash
git remote add origin https://github.com/seu-usuario/endostart-landing.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy em Vercel

1. Acessar https://vercel.com
2. Fazer login com GitHub
3. Clicar "New Project"
4. Selecionar repositório `endostart-landing`
5. Configurar variáveis de ambiente:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
   - `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`
   - `NEXT_PUBLIC_META_PIXEL_ID`

6. Clicar "Deploy"
7. Aguardar conclusão (~2-3 minutos)

### Passo 4: Configurar Domínio Custom

1. Em Vercel > Settings > Domains
2. Adicionar domínio `endostart.com.br`
3. Seguir instruções DNS de seu registrador
4. Aguardar propagação (até 48h)

## Deploy em AWS Amplify

Alternativa para AWS com pipeline CI/CD automático.

### Passo 1: Conectar GitHub

1. Acessar AWS Amplify
2. "New app" > "Host web app"
3. Conectar GitHub
4. Selecionar repositório

### Passo 2: Configurar Build

1. Seleção automática detectará Next.js
2. Configurar variáveis de ambiente
3. Revisar build settings

### Passo 3: Deploy

1. Clicar "Deploy"
2. Aguardar build e deploy
3. Acessar URL provisória

### Passo 4: Domínio Custom

1. Em App settings > Custom domains
2. Adicionar domínio
3. Configurar DNS

## Deploy em Railway

Mais simples que AWS, otimizado para Next.js.

### Passo 1: Criar Projeto

1. Acessar https://railway.app
2. "Create a new project"
3. Selecionar "Deploy from GitHub"
4. Conectar e selecionar repositório

### Passo 2: Configurar Ambiente

Railway detecta Next.js automaticamente:
- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start`

### Passo 3: Variáveis de Ambiente

1. Na aba "Variables"
2. Adicionar cada variável necessária
3. Deploy automático após salvar

### Passo 4: Domínio

1. Gerar domínio Railway ou adicionar custom
2. Atualizar DNS no registrador

## Verificação Pós-Deploy

### Checklist de Qualidade

```bash
# 1. Verificar HTTPS
curl -I https://endostart.com.br
# Deve retornar "200 OK" com HTTPS

# 2. Verificar Performance
# Abrir em Chrome DevTools > Lighthouse
# Meta: Pontuação > 90 em Mobile

# 3. Verificar Responsividade
# Testar em dispositivos reais:
# - iPhone 12
# - Samsung Galaxy S21
# - iPad
# - Desktop

# 4. Verificar WhatsApp
# Clicar todos os botões WhatsApp
# Confirmar abertura correta com mensagem pré-preenchida

# 5. Verificar Analytics
# Fazer interações e verificar em:
# - Google Analytics
# - Google Tag Manager
# - Meta Pixel
```

### Testes Automatizados (Opcional)

```bash
# Instalar Lighthouse CLI
npm install -g @lhci/cli@latest

# Rodar teste
lhci autorun

# Resultado em relatório HTML
```

## Otimizações Pós-Deploy

### 1. Cache Headers

Configurar em Vercel (`vercel.json`):

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Compressão

Next.js já ativa gzip por padrão. Verificar:

```bash
curl -I -H "Accept-Encoding: gzip" https://endostart.com.br
# Deve incluir: Content-Encoding: gzip
```

### 3. CDN Global

Vercel distribui automaticamente globalmente.
Monitorar em Analytics > Geography.

## Monitoramento

### Google Analytics

1. Criar conta em analytics.google.com
2. Criar property para endostart.com.br
3. Adicionar ID do medição ao `.env`
4. Monitorar:
   - Visitantes
   - Tempo médio na página
   - Taxa de rejeição
   - Conversões (WhatsApp cliques)

### Sentry (Error Tracking - Opcional)

```bash
npm install @sentry/nextjs
```

Configurar em `next.config.js`:

```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

### Uptime Monitoring

Usar serviço como UptimeRobot:
1. https://uptimerobot.com
2. Monitorar endostart.com.br
3. Receber alertas se site cair

## Troubleshooting

### Problema: Deploy falha com erro de build

**Solução**:
```bash
# Verificar build localmente
npm run build

# Se falhar, verificar erros
npm run lint
npm run type-check

# Fixar problemas e fazer commit
git add .
git commit -m "Fix build errors"
git push
```

### Problema: Variáveis de ambiente não funcionam

**Solução**:
1. Verificar que variáveis estão em deployment environment
2. Verificar prefixo `NEXT_PUBLIC_` para públicas
3. Fazer redeployment após adicionar variáveis

### Problema: Imagens não carregam

**Solução**:
1. Verificar paths de imagens em `public/`
2. Verificar configuração de `next.config.js`
3. Limpar cache do navegador (Cmd+Shift+Delete)

### Problema: WhatsApp não funciona em produção

**Solução**:
1. Verificar número WhatsApp correto em variáveis
2. Testar URL manualmente: `https://wa.me/55...`
3. Verificar que site tem HTTPS

## Rollback

Se algo der errado no deployment:

### Vercel
```
Vercel Dashboard > Deployments > [Versão anterior] > Promote to Production
```

### GitHub
```bash
git revert HEAD
git push origin main
```

## Atualizações Futuras

### Padrão de Atualização

1. Fazer mudanças localmente
2. Testar: `npm run dev`
3. Build: `npm run build && npm run start`
4. Commit:
```bash
git add .
git commit -m "Description of changes"
```

5. Push:
```bash
git push origin main
```

6. Vercel faz deploy automático

### Hotfix (Urgente)

```bash
# Criar branch urgente
git checkout -b hotfix/urgente

# Fazer mudança
# Testar

# Merge para main
git checkout main
git merge hotfix/urgente
git push origin main

# Limpar branch
git branch -d hotfix/urgente
```

## Certificado SSL/HTTPS

### Automático (Recomendado)

Vercel/AWS/Railway providenciam SSL automático com Let's Encrypt.

### Manual (Se necessário)

```bash
# Gerar certificado
certbot certonly --standalone -d endostart.com.br

# Arquivos gerados em /etc/letsencrypt/live/endostart.com.br/
# fullchain.pem (certificado)
# privkey.pem (chave privada)
```

## Email & Notificações

### Alertas de Deploy

1. Em Vercel > Project Settings > Integrations
2. Conectar Slack/Discord para notificações
3. Receber alerts de:
   - Deploy iniciado
   - Deploy completado
   - Erros de build

### Notificações de Erro

Configurar Sentry para receber notificações via email.

## Segurança

### Checklist

- [ ] HTTPS ativado em produção
- [ ] Headers de segurança configurados
- [ ] Variáveis sensíveis em environment (não em código)
- [ ] Git history limpo (sem secrets expostos)
- [ ] WAF (Web Application Firewall) ativado
- [ ] Rate limiting configurado
- [ ] CORS properly configured
- [ ] CSP headers set

### Verificar Headers de Segurança

```bash
curl -I https://endostart.com.br | grep -i "Strict-Transport-Security\|X-Frame-Options\|X-Content-Type-Options"
```

Deve incluir:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
```

## Performance Contínua

### Monitorar

1. **PageSpeed Insights**: https://pagespeed.web.dev
   - Alvo: > 90 em Mobile
   - Rodar mensalmente

2. **WebPageTest**: https://www.webpagetest.org
   - Testes detalhados de performance
   - Comparar com concorrentes

3. **Chrome DevTools**
   - Lighthouse
   - Performance tab
   - Network tab

### Otimizações Adicionais

Se pontuação < 90:

1. **Imagens**: Converter para WebP
2. **CSS**: Minificar CSS crítico
3. **JS**: Code splitting adicional
4. **Fontes**: Usar system fonts ou carregamento otimizado

## Backup & Recuperação

### GitHub = Backup Automático

Todo código está versionado no GitHub.

### Recuperar Versão Anterior

```bash
git log --oneline  # Ver histórico
git checkout <HASH>  # Voltar para versão
git checkout main  # Voltar ao main
```

## Custo Estimado

### Vercel (Recomendado)
- **Hobby**: Grátis (até 100GB/mês)
- **Pro**: $20/mês
- Este projeto cabe no plano Hobby

### AWS Amplify
- **Free tier**: 15GB storage, 5GB dados
- **Pago**: A partir de $0.01 por GB

### Railway
- **Hobby**: Grátis
- **Pago**: A partir de $5/mês

## Próximas Fases

### Fase 1 (Agora)
- Landing page pública
- Conversão via WhatsApp

### Fase 2 (Portal do Aluno)
- Autenticação
- Dashboard de módulos
- Visualizador de PDFs
- Reprodutor de vídeos

### Fase 3 (CMS)
- Sanity.io ou Strapi
- Dr. Alessandro gerencia conteúdo
- Upload de PDFs/vídeos

---

**Versão**: 1.0.0
**Última atualização**: Fevereiro 2024
