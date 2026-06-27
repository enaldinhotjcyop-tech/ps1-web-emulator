<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>my finances — Controle Financeiro Pessoal</title>
<style>
  /* =========================================================
     Design System — my finances
     Identidade: minimalista, moderno, voltada a jovens adultos
     ========================================================= */
  :root{
    --bg:#0f1115;
    --surface:#171a21;
    --surface-2:#1f232c;
    --border:#272c37;
    --text:#eef1f6;
    --muted:#9aa3b2;
    --primary:#7c5cff;
    --primary-2:#5ee0c1;
    --danger:#ff5c7a;
    --success:#3ddc97;
    --warning:#ffb454;
    --radius:14px;
    --shadow:0 8px 30px rgba(0,0,0,.35);
    --font:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:var(--font);font-size:15px;line-height:1.45}
  a{color:var(--primary-2);text-decoration:none}
  button{font-family:inherit;cursor:pointer;border:none;outline:none}
  input,select,textarea{font-family:inherit;font-size:14px}

  /* ---------- Auth ---------- */
  .auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(1200px 600px at 20% 0%,rgba(124,92,255,.18),transparent),radial-gradient(800px 500px at 100% 100%,rgba(94,224,193,.12),transparent),var(--bg)}
  .auth-card{width:100%;max-width:420px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow)}
  .brand{display:flex;align-items:center;gap:10px;margin-bottom:20px}
  .brand-logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;font-weight:800;color:#0f1115}
  .brand-name{font-weight:700;letter-spacing:.3px}
  .auth-tabs{display:flex;gap:8px;margin-bottom:18px}
  .auth-tab{flex:1;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--muted);font-weight:600}
  .auth-tab.active{background:var(--primary);color:#fff;border-color:transparent}
  .field{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
  .field label{font-size:12px;color:var(--muted);font-weight:600}
  .field input{padding:11px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)}
  .field input:focus{border-color:var(--primary)}
  .btn{padding:11px 14px;border-radius:10px;font-weight:600;transition:transform .05s ease,opacity .2s}
  .btn:active{transform:translateY(1px)}
  .btn-primary{background:linear-gradient(135deg,var(--primary),#9b85ff);color:#fff;width:100%}
  .btn-ghost{background:transparent;color:var(--muted)}
  .btn-secondary{background:var(--surface-2);color:var(--text);border:1px solid var(--border)}
  .btn-danger{background:var(--danger);color:#fff}
  .auth-error{color:var(--danger);font-size:13px;min-height:18px;margin-top:4px}

  /* ---------- App layout ---------- */
  .app{display:none;min-height:100vh;grid-template-columns:240px 1fr;grid-template-rows:auto 1fr}
  .app.is-on{display:grid}
  .sidebar{grid-row:1 / span 2;background:var(--surface);border-right:1px solid var(--border);padding:18px;display:flex;flex-direction:column;gap:6px}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:var(--muted);cursor:pointer;font-weight:600}
  .nav-item:hover{background:var(--surface-2);color:var(--text)}
  .nav-item.active{background:linear-gradient(135deg,rgba(124,92,255,.25),rgba(94,224,193,.15));color:var(--text)}
  .nav-ico{width:18px;height:18px;display:inline-block;background:currentColor;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
  .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-bottom:1px solid var(--border);background:var(--surface)}
  .topbar .search{flex:1;max-width:520px;margin:0 18px;position:relative}
  .topbar .search input{width:100%;padding:10px 12px 10px 36px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)}
  .topbar .search .ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);opacity:.6}
  .user-chip{display:flex;align-items:center;gap:10px;cursor:pointer}
  .avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;color:#0f1115;font-weight:700;overflow:hidden}
  .avatar img{width:100%;height:100%;object-fit:cover}
  .main{padding:22px;overflow:auto}
  .section{display:none}
  .section.active{display:block}
  h1,h2,h3{margin:0 0 12px}
  h1{font-size:22px}
  h2{font-size:18px}
  .muted{color:var(--muted)}

  /* ---------- Cards / Grid ---------- */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px}
  .stat .label{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.5px}
  .stat .value{font-size:22px;font-weight:700;margin-top:6px}
  .stat .value.pos{color:var(--success)}
  .stat .value.neg{color:var(--danger)}
  .row{display:grid;grid-template-columns:2fr 1fr;gap:14px}
  @media (max-width: 900px){
    .app{grid-template-columns:1fr}
    .sidebar{grid-row:auto;flex-direction:row;flex-wrap:wrap;overflow-x:auto}
    .stats{grid-template-columns:repeat(2,1fr)}
    .row{grid-template-columns:1fr}
  }

  /* ---------- Tables ---------- */
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--border)}
  th{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.5px}
  tr:hover td{background:rgba(255,255,255,.02)}
  .tag{display:inline-block;padding:2px 8px;border-radius:999px;background:var(--surface-2);border:1px solid var(--border);font-size:12px;color:var(--muted);margin-right:4px}
  .type-receita{color:var(--success);font-weight:600}
  .type-despesa{color:var(--danger);font-weight:600}

  /* ---------- Forms ---------- */
  .form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
  .form-grid .full{grid-column:1 / -1}
  .form-grid input,.form-grid select,.form-grid textarea{padding:10px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text);width:100%}
  .form-grid label{font-size:12px;color:var(--muted);font-weight:600;display:block;margin-bottom:4px}
  .actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}

  /* ---------- Filters ---------- */
  .filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
  .filters select,.filters input{padding:8px 10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)}

  /* ---------- Toast ---------- */
  .toast-wrap{position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:8px;z-index:9999}
  .toast{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--primary);padding:12px 14px;border-radius:10px;box-shadow:var(--shadow);max-width:340px;animation:slidein .2s ease}
  .toast.success{border-left-color:var(--success)}
  .toast.error{border-left-color:var(--danger)}
  .toast.warn{border-left-color:var(--warning)}
  @keyframes slidein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

  /* ---------- Chart ---------- */
  .chart-wrap{position:relative}
  canvas{max-width:100%;display:block}

  /* ---------- Profile ---------- */
  .profile-grid{display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:start}
  .profile-grid .big-avatar{width:160px;height:160px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;font-size:54px;color:#0f1115;font-weight:800;overflow:hidden}
  .profile-grid .big-avatar img{width:100%;height:100%;object-fit:cover}

  /* ---------- Categorias / Tags ---------- */
  .chip{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:var(--surface-2);border:1px solid var(--border);margin:4px 4px 0 0;font-size:13px}
  .chip button{background:transparent;color:var(--muted);font-size:14px}

  /* ---------- Histórico ---------- */
  .log-item{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--border);font-size:14px}
  .log-item .when{color:var(--muted);font-size:12px}

  /* ---------- Print (PDF) ---------- */
  @media print{
    body{background:#fff;color:#000}
    .sidebar,.topbar,.no-print,.toast-wrap{display:none !important}
    .app{display:block}
    .main{padding:0}
    .card{border:1px solid #ddd;box-shadow:none;background:#fff;color:#000}
    .stat .value.pos{color:#0a7}
    .stat .value.neg{color:#c33}
  }
</style>
</head>
<body>

<!-- ============ TELA DE LOGIN / CADASTRO ============ -->
<div class="auth-wrap" id="authScreen">
  <div class="auth-card">
    <div class="brand">
      <div class="brand-logo">$</div>
      <div>
        <div class="brand-name">my finances</div>
        <div class="muted" style="font-size:12px">Controle financeiro pessoal</div>
      </div>
    </div>
    <div class="auth-tabs">
      <button class="auth-tab active" data-tab="login" type="button">Entrar</button>
      <button class="auth-tab" data-tab="signup" type="button">Cadastrar</button>
    </div>

    <form id="loginForm" autocomplete="off" novalidate>
      <div class="field"><label>E-mail</label><input type="email" id="loginEmail" required maxlength="120" placeholder="voce@exemplo.com"></div>
      <div class="field"><label>Senha</label><input type="password" id="loginPass" required maxlength="80" placeholder="••••••••"></div>
      <div class="auth-error" id="loginError"></div>
      <button class="btn btn-primary" type="submit">Entrar</button>
    </form>

    <form id="signupForm" autocomplete="off" novalidate style="display:none">
      <div class="field"><label>Nome</label><input type="text" id="suName" required maxlength="60" placeholder="Seu nome"></div>
      <div class="field"><label>E-mail</label><input type="email" id="suEmail" required maxlength="120" placeholder="voce@exemplo.com"></div>
      <div class="field"><label>Senha (mín. 6)</label><input type="password" id="suPass" required minlength="6" maxlength="80" placeholder="••••••••"></div>
      <div class="auth-error" id="signupError"></div>
      <button class="btn btn-primary" type="submit">Criar conta</button>
    </form>
  </div>
</div>

<!-- ============ APP ============ -->
<div class="app" id="app">
  <aside class="sidebar">
    <div class="brand" style="margin-bottom:18px">
      <div class="brand-logo">$</div>
      <div class="brand-name">my finances</div>
    </div>
    <div class="nav-item active" data-section="dashboard">📊 Painel</div>
    <div class="nav-item" data-section="transacoes">💸 Transações</div>
    <div class="nav-item" data-section="categorias">🏷️ Categorias & Tags</div>
    <div class="nav-item" data-section="resumo">🏆 Resumo & Conquistas</div>
    <div class="nav-item" data-section="historico">📜 Histórico</div>
    <div class="nav-item" data-section="importar">📥 Importar</div>
    <div class="nav-item" data-section="perfil">👤 Perfil</div>
    <div style="margin-top:auto">
      <button class="btn btn-ghost" id="logoutBtn" type="button" style="width:100%;text-align:left;padding:10px 12px">↩︎ Sair</button>
    </div>
  </aside>

  <header class="topbar">
    <div class="muted" id="hello">Olá!</div>
    <div class="search">
      <span class="ico">🔎</span>
      <input type="text" id="globalSearch" placeholder="Buscar transações, categorias ou tags..." maxlength="80" autocomplete="off">
    </div>
    <div class="user-chip" id="userChip">
      <div class="avatar" id="topAvatar">U</div>
    </div>
  </header>

  <main class="main">

    <!-- ===== Painel ===== -->
    <section class="section active" id="sec-dashboard">
      <h1>Painel</h1>
      <div class="stats">
        <div class="card stat"><div class="label">Saldo</div><div class="value" id="kpiSaldo">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Receitas (mês)</div><div class="value pos" id="kpiRec">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Despesas (mês)</div><div class="value neg" id="kpiDesp">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Transações</div><div class="value" id="kpiCount">0</div></div>
      </div>
      <div class="row">
        <div class="card">
          <h2>Despesas por categoria</h2>
          <div class="chart-wrap"><canvas id="chartCats" width="600" height="280"></canvas></div>
        </div>
        <div class="card">
          <h2>Últimas transações</h2>
          <div id="recentList"></div>
        </div>
      </div>
    </section>

    <!-- ===== Transações ===== -->
    <section class="section" id="sec-transacoes">
      <h1>Transações</h1>
      <div class="card" style="margin-bottom:14px">
        <h2 id="txFormTitle">Nova transação</h2>
        <form id="txForm" novalidate>
          <div class="form-grid">
            <div><label>Tipo</label>
              <select id="txType"><option value="receita">Receita</option><option value="despesa">Despesa</option></select>
            </div>
            <div><label>Valor (R$)</label><input type="number" id="txValue" step="0.01" min="0.01" max="9999999" required></div>
            <div><label>Descrição</label><input type="text" id="txDesc" required maxlength="80"></div>
            <div><label>Categoria</label><select id="txCat"></select></div>
            <div><label>Data</label><input type="date" id="txDate" required></div>
            <div><label>Tags (separadas por vírgula)</label><input type="text" id="txTags" maxlength="120" placeholder="trabalho, fixa"></div>
          </div>
          <div class="actions">
            <button class="btn btn-primary" type="submit" id="txSubmit">Salvar</button>
            <button class="btn btn-secondary" type="button" id="txCancel" style="display:none">Cancelar edição</button>
          </div>
          <div class="auth-error" id="txError"></div>
        </form>
      </div>

      <div class="card">
        <div class="filters">
          <input type="text" id="fSearch" placeholder="Buscar descrição/tag..." maxlength="80">
          <select id="fType"><option value="">Todos os tipos</option><option value="receita">Receitas</option><option value="despesa">Despesas</option></select>
          <select id="fCat"><option value="">Todas as categorias</option></select>
          <input type="month" id="fMonth">
          <button class="btn btn-secondary" type="button" id="fClear">Limpar</button>
          <div style="flex:1"></div>
          <button class="btn btn-secondary" type="button" id="exportCsv">⬇️ CSV</button>
          <button class="btn btn-secondary" type="button" id="exportPdf">🖨️ PDF</button>
        </div>
        <div style="overflow:auto">
          <table id="txTable">
            <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Tags</th><th>Tipo</th><th style="text-align:right">Valor</th><th></th></tr></thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="muted" id="txEmpty" style="display:none;padding:14px;text-align:center">Nenhuma transação encontrada.</div>
      </div>
    </section>

    <!-- ===== Categorias ===== -->
    <section class="section" id="sec-categorias">
      <h1>Categorias & Tags</h1>
      <div class="row">
        <div class="card">
          <h2>Categorias</h2>
          <form id="catForm" style="display:flex;gap:8px;flex-wrap:wrap">
            <input type="text" id="catName" placeholder="Nova categoria" maxlength="30" required style="flex:1;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)">
            <button class="btn btn-primary" type="submit">Adicionar</button>
          </form>
          <div id="catList" style="margin-top:10px"></div>
        </div>
        <div class="card">
          <h2>Tags</h2>
          <form id="tagForm" style="display:flex;gap:8px;flex-wrap:wrap">
            <input type="text" id="tagName" placeholder="Nova tag" maxlength="20" required style="flex:1;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)">
            <button class="btn btn-primary" type="submit">Adicionar</button>
          </form>
          <div id="tagList" style="margin-top:10px"></div>
        </div>
      </div>
    </section>

    <!-- ===== Resumo / Conquistas ===== -->
    <section class="section" id="sec-resumo">
      <h1>Resumo & Conquistas</h1>
      <div class="stats">
        <div class="card stat"><div class="label">Total movimentado</div><div class="value" id="rTotal">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Maior receita</div><div class="value pos" id="rMaxRec">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Maior despesa</div><div class="value neg" id="rMaxDesp">R$ 0,00</div></div>
        <div class="card stat"><div class="label">Dias usando</div><div class="value" id="rDias">0</div></div>
      </div>
      <div class="card" style="margin-top:14px">
        <h2>Evolução mensal</h2>
        <div class="chart-wrap"><canvas id="chartEvo" width="900" height="280"></canvas></div>
      </div>
      <div class="card" style="margin-top:14px">
        <h2>Conquistas</h2>
        <div id="achievements"></div>
      </div>
    </section>

    <!-- ===== Histórico ===== -->
    <section class="section" id="sec-historico">
      <h1>Histórico de ações</h1>
      <div class="card">
        <div class="filters">
          <input type="text" id="logSearch" placeholder="Buscar no histórico..." maxlength="60">
          <button class="btn btn-secondary" type="button" id="logClear">Limpar histórico</button>
        </div>
        <div id="logList"></div>
      </div>
    </section>

    <!-- ===== Importar ===== -->
    <section class="section" id="sec-importar">
      <h1>Importar dados</h1>
      <div class="row">
        <div class="card">
          <h2>Google Sheets (CSV)</h2>
          <p class="muted">Cole abaixo um CSV exportado do Google Sheets com colunas: <code>data,descricao,categoria,tipo,valor,tags</code>. Tipo deve ser <b>receita</b> ou <b>despesa</b>.</p>
          <textarea id="impSheets" rows="6" maxlength="200000" placeholder="data,descricao,categoria,tipo,valor,tags&#10;2025-01-10,Salário,Trabalho,receita,3500,fixa"
            style="width:100%;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)"></textarea>
          <div class="actions"><button class="btn btn-primary" id="impSheetsBtn" type="button">Importar do Sheets</button></div>
        </div>
        <div class="card">
          <h2>Google Agenda (ICS)</h2>
          <p class="muted">Cole o conteúdo de um arquivo <code>.ics</code> do Google Agenda. Eventos com valores em R$ no título/descrição viram despesas.</p>
          <textarea id="impCal" rows="6" maxlength="200000" placeholder="BEGIN:VCALENDAR..."
            style="width:100%;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)"></textarea>
          <div class="actions"><button class="btn btn-primary" id="impCalBtn" type="button">Importar do Agenda</button></div>
        </div>
      </div>
    </section>

    <!-- ===== Perfil ===== -->
    <section class="section" id="sec-perfil">
      <h1>Perfil</h1>
      <div class="card">
        <div class="profile-grid">
          <div>
            <div class="big-avatar" id="bigAvatar">U</div>
            <div class="actions" style="margin-top:10px">
              <label class="btn btn-secondary" style="cursor:pointer">
                Trocar foto<input type="file" id="avatarInput" accept="image/*" style="display:none">
              </label>
              <button class="btn btn-ghost" id="avatarRemove" type="button">Remover</button>
            </div>
          </div>
          <form id="profileForm">
            <div class="form-grid">
              <div><label>Nome</label><input type="text" id="pfName" maxlength="60" required></div>
              <div><label>E-mail</label><input type="email" id="pfEmail" disabled></div>
              <div class="full"><label>Bio (opcional)</label><textarea id="pfBio" maxlength="200" rows="3" style="width:100%;padding:10px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;color:var(--text)"></textarea></div>
            </div>
            <div class="actions">
              <button class="btn btn-primary" type="submit">Salvar perfil</button>
              <button class="btn btn-danger" type="button" id="wipeAccount">Apagar minha conta</button>
            </div>
          </form>
        </div>
      </div>
    </section>

  </main>
</div>

<div class="toast-wrap" id="toasts"></div>

<script>
/* =====================================================================
   my finances — app em arquivo único.
   Armazenamento: localStorage (dados ofuscados via btoa, hash SHA-256 senha).
   Sessão: sessionStorage. Sons: Web Audio API. Export: Blob/CSV + window.print.
   ===================================================================== */

(() => {
  'use strict';

  /* -------------------- Util: sanitização e segurança -------------------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const cleanText = (s, max=200) => String(s ?? '').trim().slice(0, max);
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  /** SHA-256 hex usando WebCrypto (senha nunca é salva em texto). */
  async function sha256(text){
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
  }

  /* -------------------- Storage (ofuscado com btoa) -------------------- */
  const LS_USERS = 'mf_users_v1';
  const LS_DATA  = 'mf_data_v1_';   // + email
  const SS_AUTH  = 'mf_session_v1';

  function loadObf(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return fallback;
      // formato: "b1:" + btoa(JSON)
      if(raw.startsWith('b1:')) return JSON.parse(decodeURIComponent(escape(atob(raw.slice(3)))));
      return JSON.parse(raw);
    }catch(e){ console.warn('Falha ao ler', key, e); return fallback; }
  }
  function saveObf(key, value){
    try{
      const json = JSON.stringify(value);
      localStorage.setItem(key, 'b1:' + btoa(unescape(encodeURIComponent(json))));
    }catch(e){ toast('Erro ao salvar dados localmente.', 'error'); }
  }

  /* -------------------- Toasts -------------------- */
  const toastsEl = document.getElementById('toasts');
  function toast(msg, kind='success', ms=2600){
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.textContent = msg;
    toastsEl.appendChild(el);
    setTimeout(() => { el.style.opacity='0'; setTimeout(()=>el.remove(),200); }, ms);
  }

  /* -------------------- Sons (Web Audio API) -------------------- */
  let audioCtx = null;
  function ensureAudio(){
    if(!audioCtx){
      try{ audioCtx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){}
    }
    if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  /** Toca um beep curto. type: 'ok' | 'err' | 'click' */
  function playSound(type='ok'){
    const ctx = ensureAudio(); if(!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    if(type==='ok'){ o.type='sine'; o.frequency.setValueAtTime(660, now); o.frequency.exponentialRampToValueAtTime(990, now+0.12); }
    else if(type==='err'){ o.type='square'; o.frequency.setValueAtTime(220, now); o.frequency.exponentialRampToValueAtTime(140, now+0.18); }
    else { o.type='triangle'; o.frequency.setValueAtTime(520, now); }
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.15, now+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now+0.2);
    o.start(now); o.stop(now+0.22);
  }

  /* -------------------- Estado e sessão -------------------- */
  let state = null;          // dados do usuário logado
  let session = null;        // { email, name }
  const DEFAULT_CATS = ['Alimentação','Transporte','Moradia','Lazer','Trabalho','Educação','Saúde','Outros'];
  const DEFAULT_TAGS = ['fixa','variável','urgente'];

  function newState(name, email){
    return {
      profile:{ name, email, bio:'', avatar:'' },
      categories: DEFAULT_CATS.slice(),
      tags: DEFAULT_TAGS.slice(),
      transactions: [],
      logs: [],
      createdAt: Date.now()
    };
  }

  function persist(){
    if(!session) return;
    saveObf(LS_DATA + session.email, state);
  }

  function loadSession(){
    try{
      const raw = sessionStorage.getItem(SS_AUTH);
      if(!raw) return null;
      return JSON.parse(raw);
    }catch(e){ return null; }
  }
  function setSession(s){
    if(s) sessionStorage.setItem(SS_AUTH, JSON.stringify(s));
    else sessionStorage.removeItem(SS_AUTH);
  }

  function logAction(action, detail=''){
    if(!state) return;
    state.logs.unshift({ at: Date.now(), action: cleanText(action,60), detail: cleanText(detail,120) });
    if(state.logs.length > 500) state.logs.length = 500;
    persist();
  }

  /* -------------------- AUTH -------------------- */
  const authScreen = document.getElementById('authScreen');
  const appEl = document.getElementById('app');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  document.querySelectorAll('.auth-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      loginForm.style.display = tab==='login' ? '' : 'none';
      signupForm.style.display = tab==='signup' ? '' : 'none';
      playSound('click');
    });
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = cleanText(document.getElementById('suName').value, 60);
    const email = cleanText(document.getElementById('suEmail').value, 120).toLowerCase();
    const pass = document.getElementById('suPass').value;
    const errEl = document.getElementById('signupError');
    errEl.textContent = '';
    if(!name){ errEl.textContent='Informe seu nome.'; playSound('err'); return; }
    if(!isEmail(email)){ errEl.textContent='E-mail inválido.'; playSound('err'); return; }
    if(!pass || pass.length < 6){ errEl.textContent='Senha deve ter ao menos 6 caracteres.'; playSound('err'); return; }

    const users = loadObf(LS_USERS, {});
    if(users[email]){ errEl.textContent='Já existe conta com este e-mail.'; playSound('err'); return; }
    users[email] = { name, email, passHash: await sha256(pass + '|' + email), createdAt: Date.now() };
    saveObf(LS_USERS, users);
    // cria estado vazio para o usuário
    saveObf(LS_DATA + email, newState(name, email));
    setSession({ email, name });
    toast('Conta criada com sucesso!','success'); playSound('ok');
    bootApp();
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = cleanText(document.getElementById('loginEmail').value, 120).toLowerCase();
    const pass = document.getElementById('loginPass').value;
    const errEl = document.getElementById('loginError');
    errEl.textContent = '';
    if(!isEmail(email) || !pass){ errEl.textContent='Preencha e-mail e senha.'; playSound('err'); return; }
    const users = loadObf(LS_USERS, {});
    const u = users[email];
    if(!u){ errEl.textContent='Credenciais inválidas.'; playSound('err'); return; }
    const hash = await sha256(pass + '|' + email);
    if(hash !== u.passHash){ errEl.textContent='Credenciais inválidas.'; playSound('err'); return; }
    setSession({ email, name: u.name });
    toast('Bem-vindo de volta!','success'); playSound('ok');
    bootApp();
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    logAction('Logout');
    setSession(null);
    session = null; state = null;
    appEl.classList.remove('is-on');
    authScreen.style.display = 'flex';
    playSound('click');
  });

  /* -------------------- Navegação -------------------- */
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
  function go(section){
    navItems.forEach(n => n.classList.toggle('active', n.dataset.section===section));
    sections.forEach(s => s.classList.toggle('active', s.id === 'sec-' + section));
    // auto-refresh em cada visita à seção
    refreshSection(section);
  }
  navItems.forEach(n => n.addEventListener('click', () => { playSound('click'); go(n.dataset.section); }));

  function refreshSection(section){
    if(!state) return;
    switch(section){
      case 'dashboard': renderDashboard(); break;
      case 'transacoes': renderTxForm(); renderTxTable(); break;
      case 'categorias': renderCatTagLists(); break;
      case 'resumo': renderResumo(); break;
      case 'historico': renderLogs(); break;
      case 'perfil': renderProfile(); break;
    }
  }

  /* -------------------- Boot app -------------------- */
  function bootApp(){
    session = loadSession();
    if(!session){ authScreen.style.display='flex'; appEl.classList.remove('is-on'); return; }
    state = loadObf(LS_DATA + session.email, null);
    if(!state){ state = newState(session.name, session.email); persist(); }
    authScreen.style.display='none';
    appEl.classList.add('is-on');
    document.getElementById('hello').textContent = 'Olá, ' + (state.profile.name || session.name) + '!';
    refreshAvatars();
    populateCategorySelects();
    logAction('Login');
    go('dashboard');
  }

  /* -------------------- Avatares -------------------- */
  function initial(name){ return (name||'U').trim().charAt(0).toUpperCase(); }
  function refreshAvatars(){
    const top = document.getElementById('topAvatar');
    const big = document.getElementById('bigAvatar');
    const av = state.profile.avatar;
    if(av){ top.innerHTML = '<img src="'+esc(av)+'" alt="">'; big.innerHTML = '<img src="'+esc(av)+'" alt="">'; }
    else { top.textContent = initial(state.profile.name); big.textContent = initial(state.profile.name); }
  }

  /* -------------------- Dashboard -------------------- */
  const BRL = (n) => 'R$ ' + (Number(n)||0).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});

  function monthKey(d){ const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth()+1).padStart(2,'0'); }

  function renderDashboard(){
    const txs = state.transactions;
    const now = new Date(); const mk = monthKey(now);
    let rec=0, desp=0, saldo=0;
    txs.forEach(t => {
      if(t.type==='receita') saldo+=t.value; else saldo-=t.value;
      if(monthKey(t.date)===mk){
        if(t.type==='receita') rec+=t.value; else desp+=t.value;
      }
    });
    document.getElementById('kpiSaldo').textContent = BRL(saldo);
    document.getElementById('kpiRec').textContent = BRL(rec);
    document.getElementById('kpiDesp').textContent = BRL(desp);
    document.getElementById('kpiCount').textContent = txs.length;

    // últimas
    const rec5 = txs.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
    const list = document.getElementById('recentList');
    list.innerHTML = rec5.length ? rec5.map(t => `
      <div class="log-item">
        <div>
          <div>${esc(t.desc)} <span class="tag">${esc(t.category||'—')}</span></div>
          <div class="when">${esc(t.date)}</div>
        </div>
        <div class="type-${t.type}">${t.type==='receita'?'+':'−'} ${BRL(t.value)}</div>
      </div>`).join('') : '<div class="muted">Sem transações ainda.</div>';

    drawCategoryChart();
  }

  /* -------------------- Charts (Canvas puro) -------------------- */
  const PALETTE = ['#7c5cff','#5ee0c1','#ffb454','#ff5c7a','#3ddc97','#5aa6ff','#d28bff','#ffd166'];

  function drawCategoryChart(){
    const canvas = document.getElementById('chartCats');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const mk = monthKey(new Date());
    const map = {};
    state.transactions.forEach(t => { if(t.type==='despesa' && monthKey(t.date)===mk){ map[t.category||'Outros'] = (map[t.category||'Outros']||0)+t.value; } });
    const entries = Object.entries(map).sort((a,b)=>b[1]-a[1]);
    if(!entries.length){ ctx.fillStyle='#9aa3b2'; ctx.font='14px Inter'; ctx.fillText('Sem despesas este mês.', 20, 40); return; }
    // doughnut
    const cx=140, cy=140, r=110, ir=60;
    const total = entries.reduce((a,b)=>a+b[1],0);
    let start = -Math.PI/2;
    entries.forEach((e,i)=>{
      const ang = (e[1]/total) * Math.PI*2;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,start,start+ang); ctx.closePath();
      ctx.fillStyle = PALETTE[i%PALETTE.length]; ctx.fill();
      start+=ang;
    });
    ctx.fillStyle = '#171a21'; ctx.beginPath(); ctx.arc(cx,cy,ir,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#eef1f6'; ctx.font='bold 14px Inter'; ctx.textAlign='center';
    ctx.fillText(BRL(total), cx, cy+5);
    // legenda
    ctx.textAlign='left'; ctx.font='13px Inter';
    entries.forEach((e,i)=>{
      const y = 30 + i*22;
      ctx.fillStyle = PALETTE[i%PALETTE.length]; ctx.fillRect(290, y-10, 12,12);
      ctx.fillStyle = '#eef1f6'; ctx.fillText(e[0] + ' — ' + BRL(e[1]), 310, y);
    });
  }

  function drawEvolutionChart(){
    const canvas = document.getElementById('chartEvo');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // aggregate por mês
    const map = {};
    state.transactions.forEach(t => {
      const k = monthKey(t.date);
      if(!map[k]) map[k]={rec:0,desp:0};
      if(t.type==='receita') map[k].rec+=t.value; else map[k].desp+=t.value;
    });
    const keys = Object.keys(map).sort();
    if(!keys.length){ ctx.fillStyle='#9aa3b2'; ctx.font='14px Inter'; ctx.fillText('Sem dados.', 20, 40); return; }
    const W = canvas.width, H = canvas.height, P = 40;
    const max = Math.max(...keys.map(k => Math.max(map[k].rec, map[k].desp)), 1);
    const bw = (W - P*2) / keys.length;
    ctx.strokeStyle='#272c37'; ctx.beginPath(); ctx.moveTo(P,H-P); ctx.lineTo(W-P,H-P); ctx.stroke();
    keys.forEach((k,i)=>{
      const x = P + i*bw;
      const recH = (map[k].rec/max) * (H-P*2);
      const despH = (map[k].desp/max) * (H-P*2);
      ctx.fillStyle = '#3ddc97'; ctx.fillRect(x+bw*0.15, H-P-recH, bw*0.3, recH);
      ctx.fillStyle = '#ff5c7a'; ctx.fillRect(x+bw*0.5,  H-P-despH, bw*0.3, despH);
      ctx.fillStyle = '#9aa3b2'; ctx.font='11px Inter'; ctx.textAlign='center';
      ctx.fillText(k, x+bw/2, H-P+14);
    });
    // legenda
    ctx.fillStyle='#3ddc97'; ctx.fillRect(P, 10, 12,12); ctx.fillStyle='#eef1f6'; ctx.font='12px Inter'; ctx.textAlign='left'; ctx.fillText('Receitas', P+18, 21);
    ctx.fillStyle='#ff5c7a'; ctx.fillRect(P+100,10,12,12); ctx.fillStyle='#eef1f6'; ctx.fillText('Despesas', P+118, 21);
  }

  /* -------------------- Transações -------------------- */
  let editingId = null;

  function populateCategorySelects(){
    const opts = state.categories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
    document.getElementById('txCat').innerHTML = opts;
    document.getElementById('fCat').innerHTML = '<option value="">Todas as categorias</option>' + opts;
  }

  function renderTxForm(){
    document.getElementById('txFormTitle').textContent = editingId ? 'Editar transação' : 'Nova transação';
    document.getElementById('txSubmit').textContent = editingId ? 'Atualizar' : 'Salvar';
    document.getElementById('txCancel').style.display = editingId ? '' : 'none';
    if(!editingId){
      document.getElementById('txDate').value = new Date().toISOString().slice(0,10);
    }
  }

  document.getElementById('txCancel').addEventListener('click', () => {
    editingId = null;
    document.getElementById('txForm').reset();
    renderTxForm();
  });

  document.getElementById('txForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const errEl = document.getElementById('txError'); errEl.textContent='';
    const type = document.getElementById('txType').value;
    const value = parseFloat(document.getElementById('txValue').value);
    const desc = cleanText(document.getElementById('txDesc').value, 80);
    const category = cleanText(document.getElementById('txCat').value, 30);
    const date = document.getElementById('txDate').value;
    const tagsRaw = cleanText(document.getElementById('txTags').value, 120);
    const tags = tagsRaw ? tagsRaw.split(',').map(s => cleanText(s,20)).filter(Boolean).slice(0,10) : [];

    if(!desc){ errEl.textContent='Descrição é obrigatória.'; playSound('err'); return; }
    if(!(value > 0) || !isFinite(value)){ errEl.textContent='Valor deve ser maior que zero.'; playSound('err'); return; }
    if(!date){ errEl.textContent='Selecione uma data.'; playSound('err'); return; }
    if(!['receita','despesa'].includes(type)){ errEl.textContent='Tipo inválido.'; playSound('err'); return; }

    if(editingId){
      const t = state.transactions.find(x => x.id===editingId);
      if(t){ Object.assign(t, { type, value, desc, category, date, tags }); logAction('Editou transação', desc); }
      editingId = null;
    } else {
      const t = { id: 't_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), type, value, desc, category, date, tags };
      state.transactions.push(t);
      logAction('Adicionou transação', desc + ' (' + BRL(value) + ')');
    }
    persist();
    document.getElementById('txForm').reset();
    renderTxForm();
    renderTxTable();
    toast('Transação salva.','success'); playSound('ok');
  });

  function getFilteredTxs(){
    const q = cleanText(document.getElementById('fSearch').value,80).toLowerCase();
    const type = document.getElementById('fType').value;
    const cat = document.getElementById('fCat').value;
    const month = document.getElementById('fMonth').value;
    return state.transactions
      .filter(t => !type || t.type===type)
      .filter(t => !cat || t.category===cat)
      .filter(t => !month || monthKey(t.date)===month)
      .filter(t => !q || t.desc.toLowerCase().includes(q) || (t.tags||[]).join(',').toLowerCase().includes(q) || (t.category||'').toLowerCase().includes(q))
      .sort((a,b)=>b.date.localeCompare(a.date));
  }

  function renderTxTable(){
    const tbody = document.querySelector('#txTable tbody');
    const list = getFilteredTxs();
    document.getElementById('txEmpty').style.display = list.length ? 'none' : '';
    tbody.innerHTML = list.map(t => `
      <tr>
        <td>${esc(t.date)}</td>
        <td>${esc(t.desc)}</td>
        <td>${esc(t.category||'—')}</td>
        <td>${(t.tags||[]).map(tg=>'<span class="tag">'+esc(tg)+'</span>').join('')}</td>
        <td class="type-${t.type}">${t.type==='receita'?'Receita':'Despesa'}</td>
        <td style="text-align:right" class="type-${t.type}">${t.type==='receita'?'+':'−'} ${BRL(t.value)}</td>
        <td class="no-print" style="text-align:right">
          <button class="btn btn-ghost" data-act="edit" data-id="${t.id}">✏️</button>
          <button class="btn btn-ghost" data-act="del" data-id="${t.id}">🗑️</button>
        </td>
      </tr>`).join('');
  }

  document.querySelector('#txTable').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if(!b) return;
    const id = b.dataset.id; const act = b.dataset.act;
    const t = state.transactions.find(x => x.id===id); if(!t) return;
    if(act==='edit'){
      editingId = id;
      document.getElementById('txType').value = t.type;
      document.getElementById('txValue').value = t.value;
      document.getElementById('txDesc').value = t.desc;
      document.getElementById('txCat').value = t.category || '';
      document.getElementById('txDate').value = t.date;
      document.getElementById('txTags').value = (t.tags||[]).join(', ');
      renderTxForm(); playSound('click');
      window.scrollTo({top:0,behavior:'smooth'});
    } else if(act==='del'){
      if(!confirm('Excluir esta transação?')) return;
      state.transactions = state.transactions.filter(x => x.id!==id);
      logAction('Excluiu transação', t.desc);
      persist(); renderTxTable(); toast('Transação excluída.','warn'); playSound('ok');
    }
  });

  ['fSearch','fType','fCat','fMonth'].forEach(id => document.getElementById(id).addEventListener('input', renderTxTable));
  document.getElementById('fClear').addEventListener('click', () => {
    ['fSearch','fType','fCat','fMonth'].forEach(id => document.getElementById(id).value='');
    renderTxTable(); playSound('click');
  });

  /* -------------------- Exportar -------------------- */
  function csvEscape(v){ const s = String(v ?? ''); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s; }
  document.getElementById('exportCsv').addEventListener('click', () => {
    const rows = [['data','descricao','categoria','tipo','valor','tags']];
    getFilteredTxs().forEach(t => rows.push([t.date, t.desc, t.category||'', t.type, String(t.value).replace('.',','), (t.tags||[]).join('|')]));
    const csv = rows.map(r => r.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([new Uint8Array([0xEF,0xBB,0xBF]), csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='my-finances.csv'; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
    logAction('Exportou CSV'); toast('CSV gerado.','success'); playSound('ok');
  });
  document.getElementById('exportPdf').addEventListener('click', () => {
    logAction('Exportou PDF'); playSound('ok'); window.print();
  });

  /* -------------------- Categorias e Tags -------------------- */
  function renderCatTagLists(){
    const cl = document.getElementById('catList');
    cl.innerHTML = state.categories.map(c => `<span class="chip">${esc(c)} <button data-cat="${esc(c)}" type="button" aria-label="Remover">✕</button></span>`).join('') || '<div class="muted">Nenhuma categoria.</div>';
    const tl = document.getElementById('tagList');
    tl.innerHTML = state.tags.map(t => `<span class="chip">${esc(t)} <button data-tag="${esc(t)}" type="button" aria-label="Remover">✕</button></span>`).join('') || '<div class="muted">Nenhuma tag.</div>';
  }
  document.getElementById('catForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = cleanText(document.getElementById('catName').value, 30);
    if(!v){ playSound('err'); return; }
    if(state.categories.includes(v)){ toast('Categoria já existe.','warn'); playSound('err'); return; }
    state.categories.push(v); persist(); populateCategorySelects(); renderCatTagLists();
    document.getElementById('catName').value=''; logAction('Adicionou categoria', v);
    toast('Categoria adicionada.','success'); playSound('ok');
  });
  document.getElementById('catList').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if(!b) return;
    const c = b.dataset.cat;
    state.categories = state.categories.filter(x => x!==c);
    persist(); populateCategorySelects(); renderCatTagLists();
    logAction('Removeu categoria', c); toast('Categoria removida.','warn'); playSound('click');
  });
  document.getElementById('tagForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = cleanText(document.getElementById('tagName').value, 20);
    if(!v){ playSound('err'); return; }
    if(state.tags.includes(v)){ toast('Tag já existe.','warn'); playSound('err'); return; }
    state.tags.push(v); persist(); renderCatTagLists();
    document.getElementById('tagName').value=''; logAction('Adicionou tag', v);
    toast('Tag adicionada.','success'); playSound('ok');
  });
  document.getElementById('tagList').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if(!b) return;
    const t = b.dataset.tag;
    state.tags = state.tags.filter(x => x!==t);
    persist(); renderCatTagLists();
    logAction('Removeu tag', t); toast('Tag removida.','warn'); playSound('click');
  });

  /* -------------------- Resumo / Conquistas -------------------- */
  function renderResumo(){
    const txs = state.transactions;
    const total = txs.reduce((a,t)=>a+t.value,0);
    const maxRec = Math.max(0, ...txs.filter(t=>t.type==='receita').map(t=>t.value));
    const maxDesp = Math.max(0, ...txs.filter(t=>t.type==='despesa').map(t=>t.value));
    const days = Math.max(1, Math.ceil((Date.now()-state.createdAt)/86400000));
    document.getElementById('rTotal').textContent = BRL(total);
    document.getElementById('rMaxRec').textContent = BRL(maxRec);
    document.getElementById('rMaxDesp').textContent = BRL(maxDesp);
    document.getElementById('rDias').textContent = days;
    drawEvolutionChart();

    // conquistas
    const ach = [];
    if(txs.length>=1) ach.push('🎉 Primeira transação registrada');
    if(txs.length>=10) ach.push('🔥 10 transações');
    if(txs.length>=50) ach.push('🚀 50 transações');
    if(state.categories.length > DEFAULT_CATS.length) ach.push('🏷️ Categoria personalizada criada');
    if(state.profile.avatar) ach.push('📸 Foto de perfil enviada');
    if(days>=7) ach.push('📅 1 semana usando o my finances');
    if(days>=30) ach.push('🏆 1 mês usando o my finances');
    document.getElementById('achievements').innerHTML = ach.length ? ach.map(a=>`<div class="chip">${esc(a)}</div>`).join('') : '<div class="muted">Comece a usar para desbloquear conquistas.</div>';
  }

  /* -------------------- Histórico -------------------- */
  function renderLogs(){
    const q = cleanText(document.getElementById('logSearch').value,60).toLowerCase();
    const list = state.logs.filter(l => !q || (l.action+' '+l.detail).toLowerCase().includes(q));
    document.getElementById('logList').innerHTML = list.length ? list.map(l => `
      <div class="log-item">
        <div><b>${esc(l.action)}</b> ${l.detail?'— '+esc(l.detail):''}</div>
        <div class="when">${new Date(l.at).toLocaleString('pt-BR')}</div>
      </div>`).join('') : '<div class="muted">Sem registros.</div>';
  }
  document.getElementById('logSearch').addEventListener('input', renderLogs);
  document.getElementById('logClear').addEventListener('click', () => {
    if(!confirm('Limpar todo o histórico?')) return;
    state.logs = []; persist(); renderLogs(); toast('Histórico limpo.','warn'); playSound('click');
  });

  /* -------------------- Perfil -------------------- */
  function renderProfile(){
    document.getElementById('pfName').value = state.profile.name || '';
    document.getElementById('pfEmail').value = state.profile.email || '';
    document.getElementById('pfBio').value = state.profile.bio || '';
    refreshAvatars();
  }
  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = cleanText(document.getElementById('pfName').value, 60);
    if(!name){ toast('Nome obrigatório.','error'); playSound('err'); return; }
    state.profile.name = name;
    state.profile.bio = cleanText(document.getElementById('pfBio').value, 200);
    persist(); refreshAvatars();
    document.getElementById('hello').textContent = 'Olá, ' + name + '!';
    logAction('Atualizou perfil'); toast('Perfil atualizado.','success'); playSound('ok');
  });
  document.getElementById('avatarInput').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0]; if(!f) return;
    if(!f.type.startsWith('image/')){ toast('Arquivo inválido.','error'); playSound('err'); return; }
    if(f.size > 1024*1024){ toast('Imagem muito grande (máx 1MB).','error'); playSound('err'); return; }
    const r = new FileReader();
    r.onload = () => { state.profile.avatar = String(r.result); persist(); refreshAvatars(); toast('Foto atualizada.','success'); playSound('ok'); };
    r.readAsDataURL(f);
  });
  document.getElementById('avatarRemove').addEventListener('click', () => {
    state.profile.avatar=''; persist(); refreshAvatars(); toast('Foto removida.','warn'); playSound('click');
  });
  document.getElementById('wipeAccount').addEventListener('click', () => {
    if(!confirm('Tem certeza que deseja APAGAR sua conta e todos os dados deste navegador?')) return;
    const users = loadObf(LS_USERS, {});
    delete users[session.email]; saveObf(LS_USERS, users);
    localStorage.removeItem(LS_DATA + session.email);
    setSession(null); session=null; state=null;
    appEl.classList.remove('is-on'); authScreen.style.display='flex';
    toast('Conta apagada.','warn'); playSound('err');
  });

  /* -------------------- Busca global -------------------- */
  document.getElementById('globalSearch').addEventListener('input', (e) => {
    const q = cleanText(e.target.value, 80).toLowerCase();
    if(!q){ return; }
    // mostra seção de transações e aplica filtro
    document.getElementById('fSearch').value = q;
    go('transacoes');
  });

  /* -------------------- Importação -------------------- */
  document.getElementById('impSheetsBtn').addEventListener('click', () => {
    const raw = document.getElementById('impSheets').value.trim();
    if(!raw){ toast('Cole o conteúdo CSV.','error'); playSound('err'); return; }
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const header = lines.shift().split(',').map(s=>s.trim().toLowerCase());
    const idx = (k) => header.indexOf(k);
    let added = 0;
    lines.forEach(line => {
      const cols = parseCsvLine(line);
      const date = cleanText(cols[idx('data')]||'',10);
      const desc = cleanText(cols[idx('descricao')]||'',80);
      const category = cleanText(cols[idx('categoria')]||'Outros',30);
      const type = (cleanText(cols[idx('tipo')]||'',10).toLowerCase()==='receita')?'receita':'despesa';
      const value = parseFloat(String(cols[idx('valor')]||'0').replace(',','.'));
      const tags = cleanText(cols[idx('tags')]||'',120).split(/[|,;]/).map(s=>cleanText(s,20)).filter(Boolean).slice(0,10);
      if(date && desc && value>0){
        state.transactions.push({ id:'t_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), date, desc, category, type, value, tags });
        if(category && !state.categories.includes(category)) state.categories.push(category);
        added++;
      }
    });
    persist(); populateCategorySelects(); refreshSection('transacoes');
    logAction('Importou Sheets', added+' itens');
    toast(added+' transações importadas.','success'); playSound('ok');
  });

  function parseCsvLine(line){
    const out=[]; let cur=''; let q=false;
    for(let i=0;i<line.length;i++){
      const c=line[i];
      if(q){
        if(c=='"' && line[i+1]=='"'){ cur+='"'; i++; }
        else if(c=='"'){ q=false; }
        else cur+=c;
      } else {
        if(c==','){ out.push(cur); cur=''; }
        else if(c=='"'){ q=true; }
        else cur+=c;
      }
    }
    out.push(cur); return out;
  }

  document.getElementById('impCalBtn').addEventListener('click', () => {
    const raw = document.getElementById('impCal').value;
    if(!raw.includes('BEGIN:VEVENT')){ toast('ICS inválido.','error'); playSound('err'); return; }
    const events = raw.split('BEGIN:VEVENT').slice(1);
    let added=0;
    events.forEach(ev => {
      const sum = (ev.match(/SUMMARY:(.*)/)||[])[1] || '';
      const dt  = (ev.match(/DTSTART(?:;[^:]+)?:(\d{8})/)||[])[1] || '';
      const desc = (ev.match(/DESCRIPTION:(.*)/)||[])[1] || '';
      const all = (sum + ' ' + desc).replace(/\\n/g,' ');
      const m = all.match(/R\$\s*([\d.,]+)/);
      if(m && dt){
        const value = parseFloat(m[1].replace(/\./g,'').replace(',','.'));
        const date = dt.slice(0,4)+'-'+dt.slice(4,6)+'-'+dt.slice(6,8);
        if(value>0){
          state.transactions.push({ id:'t_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), date, desc: cleanText(sum||'Evento Agenda',80), category:'Outros', type:'despesa', value, tags:['agenda'] });
          added++;
        }
      }
    });
    persist(); refreshSection('transacoes');
    logAction('Importou Agenda', added+' eventos');
    toast(added+' eventos importados.', added?'success':'warn'); playSound('ok');
  });

  /* -------------------- Inicialização -------------------- */
  // tentar restaurar sessão
  session = loadSession();
  if(session) bootApp();

  // foco para acessibilidade
  document.getElementById('loginEmail').focus();
})();
</script>
</body>
</html>
