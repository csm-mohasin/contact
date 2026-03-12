<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Contact Vault</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap" rel="stylesheet"/>
<style>
:root{--bg:#0a0a0f;--surface:#13131a;--surface2:#1c1c27;--border:#2a2a3d;--accent:#00e5ff;--accent2:#7c3aed;--accent3:#f59e0b;--text:#e8e8f0;--muted:#6b6b8a;--danger:#ef4444;--success:#10b981;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0;}
.glow-orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;}
.glow-orb-1{width:400px;height:400px;background:rgba(124,58,237,0.15);top:-100px;right:-100px;}
.glow-orb-2{width:300px;height:300px;background:rgba(0,229,255,0.1);bottom:-50px;left:-50px;}
.screen{display:none;position:relative;z-index:1;min-height:100vh;animation:fadeIn 0.4s ease;}
.screen.active{display:flex;flex-direction:column;align-items:center;justify-content:center;}
#adminScreen.active,#userScreen.active{justify-content:flex-start;}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:40px;width:100%;max-width:440px;box-shadow:0 0 60px rgba(0,229,255,0.05),0 20px 60px rgba(0,0,0,0.4);}
.logo{text-align:center;margin-bottom:32px;}
.logo-icon{width:56px;height:56px;background:linear-gradient(135deg,var(--accent2),var(--accent));border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:12px;box-shadow:0 0 30px rgba(0,229,255,0.2);}
.logo h1{font-family:'Space Mono',monospace;font-size:22px;letter-spacing:-0.5px;}
.logo p{font-size:13px;color:var(--muted);margin-top:4px;}
.form-group{margin-bottom:18px;}
label{display:block;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
input[type="text"],input[type="email"],input[type="password"],input[type="number"],select,textarea{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;color:var(--text);font-family:'Space Mono',monospace;font-size:14px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
select option{background:var(--surface2);}
textarea{resize:vertical;min-height:90px;font-size:13px;line-height:1.7;}
input:focus,textarea:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(0,229,255,0.1);}
.btn{width:100%;padding:13px;border:none;border-radius:10px;font-family:'Sora',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.btn-primary{background:linear-gradient(135deg,var(--accent2),var(--accent));color:#fff;box-shadow:0 4px 20px rgba(0,229,255,0.2);}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(0,229,255,0.3);}
.btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);margin-top:10px;}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent);}
.btn-danger{background:rgba(239,68,68,0.1);color:var(--danger);border:1px solid rgba(239,68,68,0.3);}
.btn-danger:hover{background:rgba(239,68,68,0.2);}
.btn-success{background:rgba(16,185,129,0.1);color:var(--success);border:1px solid rgba(16,185,129,0.3);}
.btn-success:hover{background:rgba(16,185,129,0.2);}
.btn-warn{background:rgba(245,158,11,0.1);color:var(--accent3);border:1px solid rgba(245,158,11,0.3);}
.btn-warn:hover{background:rgba(245,158,11,0.2);}
.btn-sm{width:auto;padding:7px 16px;font-size:12px;border-radius:8px;margin-top:0;}
.btn-xs{width:auto;padding:4px 10px;font-size:11px;border-radius:6px;margin-top:0;}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none!important;}
.switch-link{text-align:center;margin-top:20px;font-size:13px;color:var(--muted);}
.switch-link span{color:var(--accent);cursor:pointer;font-weight:600;}
#toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 24px;font-size:13px;font-weight:600;z-index:99999;transition:transform 0.3s ease,opacity 0.3s ease;opacity:0;max-width:92vw;text-align:center;white-space:nowrap;}
#toast.show{transform:translateX(-50%) translateY(0);opacity:1;}
#toast.success{border-color:var(--success);color:var(--success);}
#toast.error{border-color:var(--danger);color:var(--danger);}
#toast.info{border-color:var(--accent);color:var(--accent);}
#toast.warn{border-color:var(--accent3);color:var(--accent3);}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9998;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);}
.modal-overlay.open{display:flex;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.6);animation:fadeIn 0.25s ease;}
.modal-title{font-family:'Space Mono',monospace;font-size:15px;font-weight:700;margin-bottom:20px;color:var(--accent);}
.modal-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;}
.modal-actions .btn{margin-top:0;}
.admin-layout{display:flex;width:100%;min-height:100vh;}
.sidebar{width:220px;background:var(--surface);border-right:1px solid var(--border);padding:24px 16px;display:flex;flex-direction:column;flex-shrink:0;}
.sidebar-logo{display:flex;align-items:center;gap:10px;margin-bottom:28px;}
.sidebar-logo .icon{width:36px;height:36px;background:linear-gradient(135deg,var(--accent2),var(--accent));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.sidebar-logo span{font-family:'Space Mono',monospace;font-size:13px;font-weight:700;}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;transition:all 0.2s;margin-bottom:4px;border:1px solid transparent;}
.nav-item:hover{background:var(--surface2);color:var(--text);}
.nav-item.active{background:rgba(0,229,255,0.08);color:var(--accent);border-color:rgba(0,229,255,0.15);}
.sidebar-bottom{margin-top:auto;}
.admin-content{flex:1;padding:28px;overflow-y:auto;}
.page-title{font-family:'Space Mono',monospace;font-size:18px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
.page-title::before{content:'';display:inline-block;width:4px;height:20px;background:linear-gradient(var(--accent2),var(--accent));border-radius:2px;}
.tab-content{display:none;}
.tab-content.active{display:block;}
.upload-zone{border:2px dashed var(--border);border-radius:16px;padding:48px 24px;text-align:center;cursor:pointer;transition:all 0.3s;background:var(--surface);}
.upload-zone:hover,.upload-zone.dragover{border-color:var(--accent);background:rgba(0,229,255,0.03);}
.upload-zone .upload-icon{font-size:40px;margin-bottom:12px;}
.upload-zone h3{font-size:15px;font-weight:600;margin-bottom:6px;}
.upload-zone p{font-size:13px;color:var(--muted);}
#vcfFileInput{display:none;}
.dup-banner{background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
.dup-banner-text{font-size:13px;color:var(--danger);font-weight:600;}
.dup-banner-sub{font-size:11px;color:var(--muted);margin-top:2px;}
.search-wrap{position:relative;margin-bottom:14px;}
.search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:14px;pointer-events:none;}
.search-input{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:11px 16px 11px 40px;color:var(--text);font-family:'Sora',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;}
.search-input:focus{border-color:var(--accent);}
.toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;}
.toolbar-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.toolbar-right{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.contacts-count{font-size:13px;color:var(--muted);}
.contacts-count strong{color:var(--accent);}
.icon-btn{display:flex;align-items:center;gap:5px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;transition:all 0.2s;font-family:'Sora',sans-serif;white-space:nowrap;}
.icon-btn:hover,.icon-btn.active{border-color:var(--accent);color:var(--accent);background:rgba(0,229,255,0.08);}
.icon-btn.fav-active{border-color:var(--accent3);color:var(--accent3);background:rgba(245,158,11,0.08);}
.copy-all-btn{display:flex;align-items:center;gap:5px;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:var(--accent);padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Sora',sans-serif;transition:all 0.2s;white-space:nowrap;}
.copy-all-btn:hover{background:rgba(0,229,255,0.15);}
.contacts-table{width:100%;border-collapse:collapse;}
.contacts-table th{text-align:left;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;padding:10px 14px;border-bottom:1px solid var(--border);background:var(--surface);}
.contacts-table td{padding:11px 14px;border-bottom:1px solid var(--border);vertical-align:middle;font-size:13px;}
.contacts-table tr:hover td{background:rgba(0,229,255,0.02);}
.contact-name-cell{font-weight:600;color:var(--text);display:flex;align-items:center;gap:8px;}
.phones-cell{display:flex;flex-wrap:wrap;gap:5px;}
.phone-chip{display:inline-flex;align-items:center;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:3px 9px;font-family:'Space Mono',monospace;font-size:11px;color:var(--accent);cursor:pointer;transition:all 0.2s;}
.phone-chip:hover{background:rgba(0,229,255,0.1);border-color:var(--accent);}
.phone-chip.dup-chip{border-color:rgba(239,68,68,0.5);color:var(--danger);}
.phone-chip.dup-chip:hover{background:rgba(239,68,68,0.1);}
.star-btn{background:none;border:none;cursor:pointer;font-size:17px;padding:2px;transition:transform 0.15s;line-height:1;flex-shrink:0;}
.star-btn:hover{transform:scale(1.3);}
.settings-section{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:20px;}
.settings-section h3{font-size:12px;font-weight:700;color:var(--accent);margin-bottom:16px;font-family:'Space Mono',monospace;letter-spacing:1px;text-transform:uppercase;}
.info-box{background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.15);border-radius:10px;padding:12px 16px;font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.6;}
.info-box strong{color:var(--accent);}
.passcode-row{display:flex;align-items:center;gap:12px;padding:14px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;margin-bottom:8px;}
.passcode-row-info{flex:1;min-width:0;}
.passcode-row-name{font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.passcode-row-code{font-family:'Space Mono',monospace;font-size:13px;color:var(--accent);margin-top:4px;}
.passcode-row-meta{font-size:11px;color:var(--muted);margin-top:3px;}
.badge-enabled{padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(16,185,129,0.15);color:var(--success);border:1px solid rgba(16,185,129,0.3);}
.badge-disabled{padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(239,68,68,0.1);color:var(--danger);border:1px solid rgba(239,68,68,0.3);}
.badge-expired{padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(245,158,11,0.1);color:var(--accent3);border:1px solid rgba(245,158,11,0.3);}
.badge-limited{padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);}
.passcode-actions{display:flex;flex-direction:column;gap:5px;flex-shrink:0;}
.user-header{background:var(--surface);border-bottom:1px solid var(--border);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;width:100%;}
.user-header-logo{font-family:'Space Mono',monospace;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;}
.badge-user{padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;background:rgba(0,229,255,0.1);color:var(--accent);border:1px solid rgba(0,229,255,0.2);}
.user-body{padding:24px;width:100%;max-width:1100px;margin:0 auto;}
.stats-bar{display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;}
.stat-pill{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:7px 14px;font-size:12px;font-weight:600;color:var(--muted);}
.stat-pill strong{color:var(--accent);}
.action-bar{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.action-bar .search-wrap{flex:1;min-width:180px;margin-bottom:0;}
.user-table{width:100%;border-collapse:collapse;}
.user-table th{text-align:left;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;padding:10px 14px;border-bottom:1px solid var(--border);background:var(--surface);}
.user-table td{padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle;}
.user-table tr:hover td{background:rgba(0,229,255,0.02);}
.user-name{font-weight:600;color:var(--text);display:flex;align-items:center;gap:8px;}
.user-number{font-family:'Space Mono',monospace;font-size:13px;color:var(--accent);cursor:pointer;}
.user-number:hover{text-decoration:underline;}
.copy-btn{background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;padding:4px;transition:color 0.2s;}
.copy-btn:hover{color:var(--accent);}
.section-divider{font-size:11px;font-weight:700;color:var(--accent3);letter-spacing:1px;text-transform:uppercase;padding:8px 14px;background:rgba(245,158,11,0.05);border-bottom:1px solid var(--border);border-top:1px solid rgba(245,158,11,0.1);}
.spinner{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin 0.7s linear infinite;margin:40px auto;}
@keyframes spin{to{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:60px 20px;color:var(--muted);}
.empty-state .empty-icon{font-size:48px;margin-bottom:12px;opacity:0.5;}
.highlight{background:rgba(0,229,255,0.2);color:var(--accent);border-radius:3px;padding:0 2px;}
.bulk-bar{display:none;align-items:center;gap:10px;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.2);border-radius:12px;padding:10px 16px;margin-bottom:12px;flex-wrap:wrap;}
.bulk-bar.show{display:flex;}
.bulk-count{font-size:13px;font-weight:700;color:var(--accent);}
.cb-cell{width:36px;text-align:center;}
input[type="checkbox"].row-cb{width:16px;height:16px;accent-color:var(--accent);cursor:pointer;}
.contacts-table tr.selected td{background:rgba(0,229,255,0.04)!important;}
.merge-group{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px;}
.merge-group-phone{font-family:'Space Mono',monospace;font-size:12px;color:var(--danger);font-weight:700;margin-bottom:10px;}
.merge-entry{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--border);}
.merge-entry:last-child{border-bottom:none;}
.merge-entry-name{flex:1;font-size:13px;font-weight:600;}
.merge-keep-badge{font-size:11px;color:var(--success);font-weight:700;}
.log-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px 18px;margin-bottom:10px;transition:border-color 0.2s;}
.log-card:hover{border-color:rgba(0,229,255,0.2);}
.log-card-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px;}
.log-badge-code{font-family:'Space Mono',monospace;font-size:12px;font-weight:700;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:3px 10px;}
.log-badge-master{font-family:'Space Mono',monospace;font-size:12px;font-weight:700;background:rgba(245,158,11,0.15);color:var(--accent3);border:1px solid rgba(245,158,11,0.3);border-radius:6px;padding:3px 10px;}
.log-time{font-size:12px;color:var(--muted);}
.log-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;}
.log-item{background:var(--surface2);border-radius:8px;padding:8px 12px;}
.log-item-label{font-size:10px;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;}
.log-item-value{font-size:12px;color:var(--text);font-family:'Space Mono',monospace;word-break:break-all;}
.err-box{display:none;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:10px;padding:10px 14px;font-size:13px;color:var(--danger);margin-bottom:14px;line-height:1.5;}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;}
.toggle-label{font-size:13px;font-weight:600;}
.toggle-sub{font-size:11px;color:var(--muted);margin-top:2px;}
.toggle-switch{position:relative;width:44px;height:24px;flex-shrink:0;}
.toggle-switch input{opacity:0;width:0;height:0;}
.toggle-slider{position:absolute;inset:0;background:var(--border);border-radius:12px;cursor:pointer;transition:0.3s;}
.toggle-slider:before{content:'';position:absolute;height:18px;width:18px;left:3px;top:3px;background:white;border-radius:50%;transition:0.3s;}
.toggle-switch input:checked+.toggle-slider{background:var(--accent2);}
.toggle-switch input:checked+.toggle-slider:before{transform:translateX(20px);}
@media(max-width:768px){
  /* Admin layout: stack vertically */
  .admin-layout{flex-direction:column;}
  .sidebar{width:100%;flex-direction:row;flex-wrap:nowrap;gap:4px;padding:10px 12px;overflow-x:auto;border-right:none;border-bottom:1px solid var(--border);min-height:unset;}
  .sidebar-logo,.sidebar-bottom{display:none;}
  .nav-item{padding:8px 10px;font-size:12px;white-space:nowrap;flex-shrink:0;margin-bottom:0;}
  .admin-content{padding:14px;}
  .card{padding:24px 18px;}
  /* Hide last action column on small screens */
  .contacts-table th:last-child,.contacts-table td:last-child{display:none;}
  /* Toolbar wrap */
  .toolbar{flex-direction:column;align-items:flex-start;}
  .toolbar-left,.toolbar-right{width:100%;justify-content:flex-start;}
  /* User body full width */
  .user-body{padding:14px;}
  .action-bar{flex-wrap:wrap;}
  /* Stats bar scroll */
  .stats-bar{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;}
  /* Table scroll */
  .contacts-table,.user-table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;}
  /* Modal full width */
  .modal{padding:20px 16px;border-radius:16px;}
  /* Page title smaller */
  .page-title{font-size:15px;}
  /* Upload zone smaller */
  .upload-zone{padding:28px 16px;}
  /* Passcode row stack */
  .passcode-row{flex-direction:column;align-items:flex-start;}
  .passcode-actions{flex-direction:row;width:100%;margin-top:8px;}
}
@media(max-width:480px){
  .toolbar-left,.toolbar-right{gap:6px;}
  .icon-btn{padding:5px 10px;font-size:11px;}
  .copy-all-btn{padding:5px 10px;font-size:11px;}
  .btn-sm{padding:6px 12px;font-size:12px;}
  .user-header{padding:10px 14px;}
  .user-header-logo{font-size:13px;}
}
</style>
</head>
<body>
<div class="glow-orb glow-orb-1"></div>
<div class="glow-orb glow-orb-2"></div>
<div id="to
