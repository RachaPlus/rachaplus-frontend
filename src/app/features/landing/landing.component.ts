import { Component, signal, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    /* ── Scroll smooth ── */
    :host { display:block; }

    /* ── Navbar ── */
    .navbar {
      position:fixed;top:0;left:0;right:0;z-index:50;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 48px;height:64px;
      background:rgba(13,13,13,0.85);
      backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(255,255,255,0.06);
      transition:background 0.3s;
    }

    /* ── Section base ── */
    .section { padding:100px 48px;max-width:1200px;margin:0 auto; }

    /* ── Feature card ── */
    .feature-card {
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:16px;
      padding:32px;
      transition:border-color 0.25s,background 0.25s,transform 0.25s;
    }
    .feature-card:hover {
      border-color:rgba(18,185,104,0.35);
      background:rgba(18,185,104,0.04);
      transform:translateY(-4px);
    }

    /* ── Step card ── */
    .step-card {
      background:rgba(255,255,255,0.02);
      border:1px solid rgba(255,255,255,0.06);
      border-radius:16px;
      padding:32px 28px;
    }

    /* ── Testimonial card ── */
    .testi-card {
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:16px;
      padding:28px;
    }

    /* ── Buttons ── */
    .btn-green {
      display:inline-flex;align-items:center;gap:8px;
      background:#12B968;color:#000;
      font-weight:700;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;
      padding:15px 32px;border:none;border-radius:10px;cursor:pointer;
      text-decoration:none;
      transition:background 0.2s,box-shadow 0.2s,transform 0.1s;
      box-shadow:0 0 24px rgba(18,185,104,0.35);
    }
    .btn-green:hover  { background:#0fa358; box-shadow:0 0 40px rgba(18,185,104,0.5); }
    .btn-green:active { transform:scale(0.985); }

    .btn-outline {
      display:inline-flex;align-items:center;gap:8px;
      background:transparent;color:rgba(255,255,255,0.7);
      font-weight:600;font-size:13px;letter-spacing:0.1em;
      padding:15px 32px;
      border:1px solid rgba(255,255,255,0.15);
      border-radius:10px;cursor:pointer;text-decoration:none;
      transition:border-color 0.2s,color 0.2s;
    }
    .btn-outline:hover { border-color:rgba(255,255,255,0.4);color:#fff; }

    /* ── Stat number ── */
    .stat-num {
      font-family:'Bebas Neue',sans-serif;
      font-size:52px;line-height:1;color:#fff;
    }

    /* ── Section tag ── */
    .section-tag {
      display:inline-flex;align-items:center;gap:8px;
      background:rgba(18,185,104,0.1);
      border:1px solid rgba(18,185,104,0.2);
      border-radius:100px;
      padding:6px 14px;
      font-size:11px;font-weight:600;
      letter-spacing:0.15em;text-transform:uppercase;
      color:#12B968;
      margin-bottom:20px;
    }

    /* ── Gradient heading ── */
    .grad-text {
      background:linear-gradient(135deg,#12B968 0%,#F48C06 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity:0;transform:translateY(32px); }
      to   { opacity:1;transform:translateY(0); }
    }
    .fade-up { animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
    .delay-1 { animation-delay:0.1s; }
    .delay-2 { animation-delay:0.2s; }
    .delay-3 { animation-delay:0.3s; }
    .delay-4 { animation-delay:0.4s; }

    /* ── Hero field ── */
    .hero-field { position:absolute;inset:0;width:100%;height:100%;opacity:0.12; }

    /* ── Player dots on hero ── */
    .hplayer { position:absolute;border-radius:50%;width:8px;height:8px; }
    .hg { background:#12B968;box-shadow:0 0 10px rgba(18,185,104,0.9); }
    .ho { background:#F48C06;box-shadow:0 0 10px rgba(244,140,6,0.9); }
    .hball { background:#fff;width:6px;height:6px;box-shadow:0 0 10px rgba(255,255,255,0.9); }

    @keyframes hm1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
    @keyframes hm2 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(-20px,30px)} 80%{transform:translate(40px,10px)} }
    @keyframes hm3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(20px,30px)} 66%{transform:translate(-30px,-10px)} }
    @keyframes hm4 { 0%,100%{transform:translate(0,0)} 45%{transform:translate(-40px,20px)} }
    @keyframes hm5 { 0%,100%{transform:translate(0,0)} 30%{transform:translate(50px,-15px)} 70%{transform:translate(-15px,35px)} }
    @keyframes hmb  { 0%{transform:translate(0,0)} 20%{transform:translate(60px,-30px)} 40%{transform:translate(120px,20px)} 60%{transform:translate(80px,50px)} 80%{transform:translate(20px,20px)} 100%{transform:translate(0,0)} }

    .ha1 { animation:hm1 7s ease-in-out infinite; }
    .ha2 { animation:hm2 8s ease-in-out infinite;animation-delay:-2s; }
    .ha3 { animation:hm3 6s ease-in-out infinite;animation-delay:-4s; }
    .ha4 { animation:hm4 9s ease-in-out infinite;animation-delay:-1s; }
    .ha5 { animation:hm5 7s ease-in-out infinite;animation-delay:-3s; }
    .hab { animation:hmb 5s ease-in-out infinite; }

    /* ── Footer ── */
    footer {
      border-top:1px solid rgba(255,255,255,0.06);
      padding:40px 48px;
      display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:16px;
    }
  `],
  template: `
    <div style="background:#0d0d0d;min-height:100vh;color:#fff">

      <!-- ══════════════════════════════════════════
           NAVBAR
      ══════════════════════════════════════════ -->
      <nav class="navbar">
        <!-- Logo -->
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;background:#12B968;border-radius:8px;
                      display:flex;align-items:center;justify-content:center;
                      box-shadow:0 0 16px rgba(18,185,104,0.4)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:0.2em;color:#fff">RACHA+</span>
        </div>

        <!-- Nav links -->
        <div style="display:flex;align-items:center;gap:32px" class="hidden-mobile">
          @for (link of navLinks; track link.label) {
            <button (click)="scrollTo(link.id)"
               style="font-size:13px;color:rgba(255,255,255,0.45);letter-spacing:0.05em;
                      background:none;border:none;
                      transition:color 0.25s ease;cursor:pointer"
               onmouseenter="this.style.color='#fff'"
               onmouseleave="this.style.color='rgba(255,255,255,0.45)'">
              {{ link.label }}
            </button>
          }
        </div>

        <!-- CTA -->
        <div style="display:flex;align-items:center;gap:12px">
          <a routerLink="/login"
             style="font-size:13px;color:rgba(255,255,255,0.45);letter-spacing:0.05em;
                    text-decoration:none;transition:color 0.2s;cursor:pointer"
             onmouseenter="this.style.color='#fff'"
             onmouseleave="this.style.color='rgba(255,255,255,0.45)'">
            Entrar
          </a>
          <a routerLink="/register" class="btn-green" style="padding:10px 22px;font-size:12px">
            Começar grátis
          </a>
        </div>
      </nav>

      <!-- ══════════════════════════════════════════
           HERO
      ══════════════════════════════════════════ -->
      <section style="position:relative;min-height:100vh;display:flex;align-items:center;
                      overflow:hidden;padding-top:64px">

        <!-- Ambient glows -->
        <div style="position:absolute;width:800px;height:800px;bottom:-200px;right:-100px;
             background:radial-gradient(circle,rgba(244,140,6,0.12) 0%,transparent 60%);
             filter:blur(60px);pointer-events:none"></div>
        <div style="position:absolute;width:600px;height:600px;top:0;left:-100px;
             background:radial-gradient(circle,rgba(18,185,104,0.1) 0%,transparent 60%);
             filter:blur(60px);pointer-events:none"></div>

        <!-- Field mini on hero background (right side) -->
        <div style="position:absolute;right:0;top:50%;transform:translateY(-50%);
                    width:55%;height:80%;pointer-events:none">
          <svg viewBox="0 0 600 420" style="width:100%;height:100%;opacity:0.14">
            <rect x="60" y="30" width="480" height="360" fill="rgba(18,185,104,0.03)"
                  stroke="rgba(18,185,104,0.6)" stroke-width="1.5" rx="2"/>
            <line x1="300" y1="30" x2="300" y2="390" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <circle cx="300" cy="210" r="55" fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <circle cx="300" cy="210" r="4" fill="rgba(18,185,104,0.8)"/>
            <rect x="60" y="117" width="100" height="186" fill="none" stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>
            <rect x="60" y="156" width="40"  height="108" fill="none" stroke="rgba(18,185,104,0.4)"  stroke-width="1.5"/>
            <rect x="40" y="177" width="20"  height="66"  fill="rgba(18,185,104,0.04)" stroke="rgba(244,140,6,0.7)" stroke-width="1.5"/>
            <circle cx="130" cy="210" r="3" fill="rgba(18,185,104,0.7)"/>
            <path d="M160,168 A55,55 0 0,1 160,252" fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>
            <rect x="440" y="117" width="100" height="186" fill="none" stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>
            <rect x="500" y="156" width="40"  height="108" fill="none" stroke="rgba(18,185,104,0.4)"  stroke-width="1.5"/>
            <rect x="540" y="177" width="20"  height="66"  fill="rgba(18,185,104,0.04)" stroke="rgba(244,140,6,0.7)" stroke-width="1.5"/>
            <circle cx="470" cy="210" r="3" fill="rgba(18,185,104,0.7)"/>
            <path d="M440,168 A55,55 0 0,0 440,252" fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>
            <path d="M60,42   A12,12 0 0,1 72,30"    fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M528,30  A12,12 0 0,1 540,42"   fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M60,378  A12,12 0 0,0 72,390"   fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M528,390 A12,12 0 0,0 540,378"  fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
          </svg>
          <!-- Animated players on hero field -->
          <div class="hplayer hg ha1" style="left:22%;top:30%"></div>
          <div class="hplayer hg ha2" style="left:35%;top:55%"></div>
          <div class="hplayer hg ha3" style="left:45%;top:40%"></div>
          <div class="hplayer ho ha4" style="left:60%;top:38%"></div>
          <div class="hplayer ho ha5" style="left:68%;top:58%"></div>
          <div class="hplayer hball hab" style="left:42%;top:48%"></div>
        </div>

        <!-- Hero content -->
        <div class="section" style="padding-top:0;padding-bottom:0;position:relative;z-index:10">
          <div style="max-width:600px">

            <div class="section-tag fade-up">
              <div style="width:6px;height:6px;border-radius:50%;background:#12B968"></div>
              Plataforma esportiva #1 do Brasil
            </div>

            <h1 class="fade-up delay-1"
                style="font-family:'Bebas Neue',sans-serif;
                       font-size:clamp(64px,8vw,108px);
                       line-height:0.92;letter-spacing:-0.01em;
                       color:#fff;margin-bottom:24px">
              ORGANIZE<br>
              SEU TIME.<br>
              <span class="grad-text">DOMINE O JOGO.</span>
            </h1>

            <p class="fade-up delay-2"
               style="font-size:17px;color:rgba(255,255,255,0.45);
                      line-height:1.7;max-width:480px;margin-bottom:40px">
              Crie rachões, monte times, acompanhe estatísticas e divida os custos — tudo em um só lugar. Gratuito para sempre.
            </p>

            <div class="fade-up delay-3" style="display:flex;gap:14px;flex-wrap:wrap">
              <a routerLink="/register" class="btn-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Criar conta grátis
              </a>
              <button (click)="scrollTo('features')" class="btn-outline" style="border:none;cursor:pointer">
                Ver funcionalidades
              </button>
            </div>

            <!-- Social proof bar -->
            <div class="fade-up delay-4"
                 style="display:flex;align-items:center;gap:20px;margin-top:48px;flex-wrap:wrap">
              <!-- Avatar stack -->
              <div style="display:flex">
                @for (av of avatars; track av) {
                  <div style="width:34px;height:34px;border-radius:50%;margin-left:-8px;
                               background:#2C2C2C;border:2px solid #0d0d0d;
                               display:flex;align-items:center;justify-content:center;
                               font-size:13px;font-weight:700;color:#12B968;first:margin-left:0">
                    {{ av }}
                  </div>
                }
              </div>
              <div>
                <div style="display:flex;gap:2px;margin-bottom:3px">
                  @for (s of [1,2,3,4,5]; track s) {
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F48C06">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  }
                </div>
                <p style="font-size:12px;color:rgba(255,255,255,0.3)">
                  <span style="color:#fff;font-weight:600">18.000+</span> atletas ativos
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════
           STATS BAR
      ══════════════════════════════════════════ -->
      <div style="border-top:1px solid rgba(255,255,255,0.06);
                  border-bottom:1px solid rgba(255,255,255,0.06);
                  background:rgba(255,255,255,0.02)">
        <div style="max-width:1200px;margin:0 auto;padding:0 48px;
                    display:grid;grid-template-columns:repeat(4,1fr)">
          @for (stat of stats; track stat.label) {
            <div style="padding:32px 24px;text-align:center;
                        border-right:1px solid rgba(255,255,255,0.06)"
                 [style.border-right]="$last ? 'none' : '1px solid rgba(255,255,255,0.06)'">
              <div class="stat-num" [style.color]="stat.color">{{ stat.value }}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.3);
                          text-transform:uppercase;letter-spacing:0.15em;margin-top:6px">
                {{ stat.label }}
              </div>
            </div>
          }
        </div>
      </div>

      <!-- ══════════════════════════════════════════
           FEATURES
      ══════════════════════════════════════════ -->
      <section id="features">
        <div class="section">
          <div style="text-align:center;margin-bottom:64px">
            <div class="section-tag" style="margin:0 auto 20px">Funcionalidades</div>
            <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px);
                       color:#fff;line-height:0.95;margin-bottom:16px">
              TUDO QUE SEU TIME<br>PRECISA
            </h2>
            <p style="font-size:16px;color:rgba(255,255,255,0.35);max-width:480px;
                      margin:0 auto;line-height:1.6">
              Da organização à análise, o Racha+ cobre todas as etapas do seu jogo.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
            @for (feat of features; track feat.title) {
              <div class="feature-card">
                <div style="width:44px;height:44px;border-radius:12px;margin-bottom:20px;
                             display:flex;align-items:center;justify-content:center"
                     [style.background]="feat.iconBg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                       [attr.stroke]="feat.iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path [attr.d]="feat.iconPath"/>
                  </svg>
                </div>
                <h3 style="font-weight:700;font-size:15px;color:#fff;margin-bottom:10px">{{ feat.title }}</h3>
                <p style="font-size:14px;color:rgba(255,255,255,0.35);line-height:1.65">{{ feat.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════
           HOW IT WORKS
      ══════════════════════════════════════════ -->
      <section id="how" style="background:rgba(255,255,255,0.015)">
        <div class="section">
          <div style="text-align:center;margin-bottom:64px">
            <div class="section-tag" style="margin:0 auto 20px">Como funciona</div>
            <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px);
                       color:#fff;line-height:0.95">
              SIMPLES ASSIM
            </h2>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;
                      position:relative">
            @for (step of steps; track step.num) {
              <div class="step-card" style="position:relative">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:56px;
                             line-height:1;margin-bottom:16px"
                     [style.color]="step.num === '01' ? '#12B968' : step.num === '02' ? '#F48C06' : 'rgba(255,255,255,0.12)'">
                  {{ step.num }}
                </div>
                <h3 style="font-weight:700;font-size:15px;color:#fff;margin-bottom:10px">{{ step.title }}</h3>
                <p style="font-size:14px;color:rgba(255,255,255,0.35);line-height:1.65">{{ step.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════
           TESTIMONIALS
      ══════════════════════════════════════════ -->
      <section id="testi">
        <div class="section">
          <div style="text-align:center;margin-bottom:64px">
            <div class="section-tag" style="margin:0 auto 20px">Depoimentos</div>
            <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5vw,64px);
                       color:#fff;line-height:0.95">
              QUEM JÁ JOGA<br>COM A GENTE
            </h2>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
            @for (t of testimonials; track t.name) {
              <div class="testi-card">
                <!-- Stars -->
                <div style="display:flex;gap:3px;margin-bottom:16px">
                  @for (s of [1,2,3,4,5]; track s) {
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#F48C06">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  }
                </div>
                <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:20px">
                  "{{ t.text }}"
                </p>
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="width:38px;height:38px;border-radius:50%;
                               background:linear-gradient(135deg,#12B968,#F48C06);
                               display:flex;align-items:center;justify-content:center;
                               font-weight:700;font-size:14px;color:#000">
                    {{ t.name[0] }}
                  </div>
                  <div>
                    <div style="font-weight:600;font-size:14px;color:#fff">{{ t.name }}</div>
                    <div style="font-size:12px;color:rgba(255,255,255,0.3)">{{ t.role }}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════
           CTA FINAL
      ══════════════════════════════════════════ -->
      <section style="position:relative;overflow:hidden;
                      background:rgba(18,185,104,0.04);
                      border-top:1px solid rgba(18,185,104,0.12);
                      border-bottom:1px solid rgba(18,185,104,0.12)">
        <div style="position:absolute;inset:0;
             background:radial-gradient(ellipse at 50% 100%,rgba(18,185,104,0.12) 0%,transparent 65%);
             pointer-events:none"></div>
        <div class="section" style="text-align:center;position:relative;z-index:1">
          <div class="section-tag" style="margin:0 auto 24px">Comece agora</div>
          <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,6vw,80px);
                     color:#fff;line-height:0.95;margin-bottom:20px">
            PRONTO PARA<br>ENTRAR EM CAMPO?
          </h2>
          <p style="font-size:16px;color:rgba(255,255,255,0.4);margin-bottom:40px;max-width:440px;margin-left:auto;margin-right:auto">
            Junte-se a mais de 18.000 atletas que já organizam seus jogos com o Racha+.
          </p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
            <a routerLink="/register" class="btn-green" style="font-size:14px;padding:17px 40px">
              Criar conta grátis
            </a>
            <a routerLink="/login" class="btn-outline" style="font-size:14px;padding:17px 40px">
              Já tenho conta
            </a>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════
           FOOTER
      ══════════════════════════════════════════ -->
      <footer>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:28px;height:28px;background:#12B968;border-radius:7px;
                      display:flex;align-items:center;justify-content:center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#000">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:18px;
                       letter-spacing:0.2em;color:#fff">RACHA+</span>
        </div>
        <p style="font-size:12px;color:rgba(255,255,255,0.2)">
          © 2025 Racha+. Todos os direitos reservados.
        </p>
        <div style="display:flex;gap:24px">
          @for (link of footerLinks; track link) {
            <a href="#" style="font-size:12px;color:rgba(255,255,255,0.25);text-decoration:none;
                               transition:color 0.2s"
               onmouseenter="this.style.color='#fff'"
               onmouseleave="this.style.color='rgba(255,255,255,0.25)'">
              {{ link }}
            </a>
          }
        </div>
      </footer>

    </div>
  `,
})
export class LandingComponent {
  navLinks = [
    { label: 'Funcionalidades', id: 'features' },
    { label: 'Como funciona',   id: 'how'      },
    { label: 'Depoimentos',     id: 'testi'    },
  ];

  avatars = ['R', 'J', 'M', 'A', 'L'];

  stats = [
    { value: '2.4K+', label: 'Times criados',   color: '#12B968' },
    { value: '18K+',  label: 'Jogadores ativos', color: '#fff'    },
    { value: '94K+',  label: 'Partidas jogadas', color: '#fff'    },
    { value: '4.9★',  label: 'Avaliação média',  color: '#F48C06' },
  ];

  features = [
    {
      title: 'Criação de Times',
      desc:  'Monte seu elenco, defina posições e gerencie substituições com poucos cliques.',
      iconBg:    'rgba(18,185,104,0.12)',
      iconColor: '#12B968',
      iconPath:  'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z',
    },
    {
      title: 'Organização de Rachões',
      desc:  'Agende partidas, confirme presença e gere times equilibrados automaticamente.',
      iconBg:    'rgba(244,140,6,0.12)',
      iconColor: '#F48C06',
      iconPath:  'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    },
    {
      title: 'Estatísticas & Rankings',
      desc:  'Acompanhe gols, assistências, vitórias e o desempenho de cada jogador.',
      iconBg:    'rgba(18,185,104,0.12)',
      iconColor: '#12B968',
      iconPath:  'M18 20V10M12 20V4M6 20v-6',
    },
    {
      title: 'Divisão de Custos',
      desc:  'Calcule e divida o aluguel da quadra, bola e outros gastos entre os jogadores.',
      iconBg:    'rgba(244,140,6,0.12)',
      iconColor: '#F48C06',
      iconPath:  'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
    },
    {
      title: 'Notificações',
      desc:  'Alertas de confirmação, lembrete de partida e aviso de pagamento pendente.',
      iconBg:    'rgba(18,185,104,0.12)',
      iconColor: '#12B968',
      iconPath:  'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
    },
    {
      title: 'Convites por Link',
      desc:  'Compartilhe um link e qualquer um entra no seu jogo instantaneamente.',
      iconBg:    'rgba(244,140,6,0.12)',
      iconColor: '#F48C06',
      iconPath:  'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
    },
  ];

  steps = [
    { num: '01', title: 'Crie sua conta',    desc: 'Cadastro gratuito em menos de 1 minuto. Sem cartão de crédito.' },
    { num: '02', title: 'Monte seu time',    desc: 'Crie um grupo, adicione jogadores e defina o dia e horário do jogo.' },
    { num: '03', title: 'Jogue e acompanhe', desc: 'Registre o resultado, veja as estatísticas e divida os custos.' },
  ];

  testimonials = [
    {
      name: 'Rafael Souza',
      role: 'Organizador de rachão — SP',
      text: 'Antes era uma bagunça pra organizar os pagamentos e confirmar quem ia jogar. Com o Racha+ virou automático. Não consigo mais imaginar sem.',
    },
    {
      name: 'Juliana Melo',
      role: 'Capitã de time feminino — RJ',
      text: 'As estatísticas de cada jogadora motivaram demais o grupo. Todo mundo quer subir no ranking. O engajamento do time melhorou muito.',
    },
    {
      name: 'Marcos Alves',
      role: 'Jogador amador — BH',
      text: 'Simples, rápido e gratuito. O link de convite é demais — mando no grupo do zap e todo mundo confirma na hora. Nota 10.',
    },
  ];

  footerLinks = ['Termos de Uso', 'Privacidade', 'Contato'];

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;

    const NAVBAR_H = 64;
    const DURATION = 1100;
    const startY   = window.scrollY;
    const targetY  = el.getBoundingClientRect().top + window.scrollY - NAVBAR_H;
    const distance = targetY - startY;
    let   startTime = 0;

    // easeInOutQuart — a mesma curva que o macOS usa nas transições de Spaces:
    // arranca devagar → acelera suavemente no meio → desacelera até parar
    const ease = (t: number): number =>
      t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / DURATION, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
