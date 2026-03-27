import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styles: [`
    /* ── Field pitch lines ── */
    .pitch-svg { position:absolute;inset:0;width:100%;height:100%; }

    /* ── Player dots ── */
    .player { position:absolute; border-radius:50%; }

    /* Team green — jogadas ofensivas */
    .p1  { width:10px;height:10px;background:#12B968;box-shadow:0 0 8px rgba(18,185,104,0.9),0 0 20px rgba(18,185,104,0.4);
           animation:move1 8s ease-in-out infinite; }
    .p2  { width:10px;height:10px;background:#12B968;box-shadow:0 0 8px rgba(18,185,104,0.9),0 0 20px rgba(18,185,104,0.4);
           animation:move2 9s ease-in-out infinite; animation-delay:-2s; }
    .p3  { width:10px;height:10px;background:#12B968;box-shadow:0 0 8px rgba(18,185,104,0.9),0 0 20px rgba(18,185,104,0.4);
           animation:move3 7s ease-in-out infinite; animation-delay:-4s; }
    .p4  { width:10px;height:10px;background:#12B968;box-shadow:0 0 8px rgba(18,185,104,0.9),0 0 20px rgba(18,185,104,0.4);
           animation:move4 10s ease-in-out infinite; animation-delay:-1s; }
    .p5  { width:10px;height:10px;background:#12B968;box-shadow:0 0 8px rgba(18,185,104,0.9),0 0 20px rgba(18,185,104,0.4);
           animation:move5 6s ease-in-out infinite; animation-delay:-3s; }

    /* Team orange — jogadas defensivas */
    .p6  { width:10px;height:10px;background:#F48C06;box-shadow:0 0 8px rgba(244,140,6,0.9),0 0 20px rgba(244,140,6,0.4);
           animation:move6 9s ease-in-out infinite; animation-delay:-1.5s; }
    .p7  { width:10px;height:10px;background:#F48C06;box-shadow:0 0 8px rgba(244,140,6,0.9),0 0 20px rgba(244,140,6,0.4);
           animation:move7 8s ease-in-out infinite; animation-delay:-3.5s; }
    .p8  { width:10px;height:10px;background:#F48C06;box-shadow:0 0 8px rgba(244,140,6,0.9),0 0 20px rgba(244,140,6,0.4);
           animation:move8 11s ease-in-out infinite; animation-delay:-2s; }
    .p9  { width:10px;height:10px;background:#F48C06;box-shadow:0 0 8px rgba(244,140,6,0.9),0 0 20px rgba(244,140,6,0.4);
           animation:move9 7s ease-in-out infinite; animation-delay:-5s; }
    .p10 { width:10px;height:10px;background:#F48C06;box-shadow:0 0 8px rgba(244,140,6,0.9),0 0 20px rgba(244,140,6,0.4);
           animation:move10 9s ease-in-out infinite; animation-delay:-0.5s; }

    /* Ball */
    .ball {
      width:8px;height:8px;
      background:#fff;
      box-shadow:0 0 10px rgba(255,255,255,0.9),0 0 24px rgba(255,255,255,0.5);
      animation:moveBall 5s ease-in-out infinite;
    }

    /* Trail lines between players (pass lines) */
    .pass-line {
      position:absolute;height:1px;
      background:linear-gradient(90deg,transparent,rgba(18,185,104,0.25),transparent);
      transform-origin:left center;
    }

    /* ── Player movement keyframes ── */
    @keyframes move1  {
      0%,100% { transform:translate(0,0); }
      25%     { transform:translate(40px,-30px); }
      50%     { transform:translate(80px,10px); }
      75%     { transform:translate(30px,40px); }
    }
    @keyframes move2  {
      0%,100% { transform:translate(0,0); }
      30%     { transform:translate(-30px,50px); }
      60%     { transform:translate(60px,30px); }
    }
    @keyframes move3  {
      0%,100% { transform:translate(0,0); }
      20%     { transform:translate(50px,-20px); }
      50%     { transform:translate(-20px,-50px); }
      80%     { transform:translate(30px,20px); }
    }
    @keyframes move4  {
      0%,100% { transform:translate(0,0); }
      40%     { transform:translate(-50px,30px); }
      70%     { transform:translate(20px,-40px); }
    }
    @keyframes move5  {
      0%,100% { transform:translate(0,0); }
      33%     { transform:translate(60px,20px); }
      66%     { transform:translate(-30px,50px); }
    }
    @keyframes move6  {
      0%,100% { transform:translate(0,0); }
      25%     { transform:translate(-40px,20px); }
      50%     { transform:translate(-70px,-30px); }
      75%     { transform:translate(-20px,-50px); }
    }
    @keyframes move7  {
      0%,100% { transform:translate(0,0); }
      35%     { transform:translate(30px,-40px); }
      65%     { transform:translate(-50px,20px); }
    }
    @keyframes move8  {
      0%,100% { transform:translate(0,0); }
      20%     { transform:translate(-30px,-30px); }
      55%     { transform:translate(40px,-20px); }
      80%     { transform:translate(-20px,40px); }
    }
    @keyframes move9  {
      0%,100% { transform:translate(0,0); }
      45%     { transform:translate(50px,40px); }
      75%     { transform:translate(-40px,20px); }
    }
    @keyframes move10 {
      0%,100% { transform:translate(0,0); }
      30%     { transform:translate(-60px,-20px); }
      60%     { transform:translate(30px,-50px); }
    }
    @keyframes moveBall {
      0%   { transform:translate(0,0); }
      15%  { transform:translate(80px,-40px); }
      30%  { transform:translate(160px,20px); }
      45%  { transform:translate(100px,80px); }
      60%  { transform:translate(40px,40px); }
      75%  { transform:translate(-30px,-20px); }
      100% { transform:translate(0,0); }
    }

    /* ── HUD readout blink ── */
    @keyframes blink {
      0%,100% { opacity:1; } 50% { opacity:0.3; }
    }
    .blink { animation:blink 2s ease-in-out infinite; }
  `],
  template: `
    <div class="min-h-screen flex bg-[#1A1A1A]">

      <!-- ══════════════════════════════════════════════════
           LEFT  —  Tactical Field Panel
      ══════════════════════════════════════════════════ -->
      <div class="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0d0d0d] border-r border-[#222]
                  flex-col justify-between p-14">

        <!-- ─── FIELD + PLAYERS — confined to centre zone ── -->
        <div class="absolute pointer-events-none select-none"
             style="top:15%;bottom:18%;left:0;right:0;display:flex;align-items:center;justify-content:center;z-index:0">

          <!-- Football field SVG — top-down view -->
          <svg class="pitch-svg" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid meet">

            <!-- Field fill (subtle grass tone) -->
            <rect x="60" y="30" width="480" height="360" rx="2"
                  fill="rgba(18,185,104,0.03)"/>

            <!-- Outer boundary -->
            <rect x="60" y="30" width="480" height="360" rx="2"
                  fill="none" stroke="rgba(18,185,104,0.55)" stroke-width="1.5"/>

            <!-- Centre line -->
            <line x1="300" y1="30" x2="300" y2="390"
                  stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>

            <!-- Centre circle -->
            <circle cx="300" cy="210" r="55"
                    fill="none" stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>
            <circle cx="300" cy="210" r="4" fill="rgba(18,185,104,0.7)"/>

            <!-- Left penalty area -->
            <rect x="60" y="117" width="100" height="186" rx="1"
                  fill="rgba(18,185,104,0.02)" stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>
            <!-- Left goal area -->
            <rect x="60" y="156" width="40" height="108" rx="1"
                  fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>
            <!-- Left goal -->
            <rect x="40" y="177" width="20" height="66"
                  fill="rgba(18,185,104,0.05)" stroke="rgba(244,140,6,0.6)" stroke-width="1.5"/>
            <!-- Left penalty spot -->
            <circle cx="130" cy="210" r="3" fill="rgba(18,185,104,0.7)"/>
            <!-- Left penalty arc -->
            <path d="M160,168 A55,55 0 0,1 160,252"
                  fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>

            <!-- Right penalty area -->
            <rect x="440" y="117" width="100" height="186" rx="1"
                  fill="rgba(18,185,104,0.02)" stroke="rgba(18,185,104,0.45)" stroke-width="1.5"/>
            <!-- Right goal area -->
            <rect x="500" y="156" width="40" height="108" rx="1"
                  fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>
            <!-- Right goal -->
            <rect x="540" y="177" width="20" height="66"
                  fill="rgba(18,185,104,0.05)" stroke="rgba(244,140,6,0.6)" stroke-width="1.5"/>
            <!-- Right penalty spot -->
            <circle cx="470" cy="210" r="3" fill="rgba(18,185,104,0.7)"/>
            <!-- Right penalty arc -->
            <path d="M440,168 A55,55 0 0,0 440,252"
                  fill="none" stroke="rgba(18,185,104,0.4)" stroke-width="1.5"/>

            <!-- Corner arcs -->
            <path d="M60,42  A12,12 0 0,1 72,30"    fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M528,30 A12,12 0 0,1 540,42"   fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M60,378 A12,12 0 0,0 72,390"   fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>
            <path d="M528,390 A12,12 0 0,0 540,378" fill="none" stroke="rgba(18,185,104,0.5)" stroke-width="1.5"/>

          </svg>

          <!-- ── Players layer (positioned as % of the container) ── -->
          <!-- Green team — attacking left to right -->
          <div class="player p1"  style="left:18%;top:30%"></div>
          <div class="player p2"  style="left:30%;top:55%"></div>
          <div class="player p3"  style="left:40%;top:38%"></div>
          <div class="player p4"  style="left:35%;top:70%"></div>
          <div class="player p5"  style="left:52%;top:45%"></div>

          <!-- Orange team — defending -->
          <div class="player p6"  style="left:62%;top:35%"></div>
          <div class="player p7"  style="left:68%;top:52%"></div>
          <div class="player p8"  style="left:58%;top:63%"></div>
          <div class="player p9"  style="left:75%;top:42%"></div>
          <div class="player p10" style="left:72%;top:65%"></div>

          <!-- Ball -->
          <div class="player ball" style="left:48%;top:50%"></div>

        </div>

        <!-- HUD overlay — confined so it never overlaps text zones -->
        <div class="absolute pointer-events-none select-none"
             style="top:15%;bottom:18%;left:0;right:0;z-index:0">
          <!-- Team legend — sits inside the field zone, bottom-left -->
          <div style="position:absolute;bottom:8px;left:56px;display:flex;gap:20px">
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:7px;height:7px;border-radius:50%;background:#12B968;
                          box-shadow:0 0 6px rgba(18,185,104,0.8)"></div>
              <span style="font-size:9px;color:rgba(18,185,104,0.5);letter-spacing:0.2em;text-transform:uppercase">Time A</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:7px;height:7px;border-radius:50%;background:#F48C06;
                          box-shadow:0 0 6px rgba(244,140,6,0.8)"></div>
              <span style="font-size:9px;color:rgba(244,140,6,0.5);letter-spacing:0.2em;text-transform:uppercase">Time B</span>
            </div>
          </div>
          <!-- LIVE badge — top-right of field zone -->
          <div style="position:absolute;top:8px;right:56px">
            <p class="blink" style="font-family:'Bebas Neue',sans-serif;font-size:10px;
               color:rgba(18,185,104,0.5);letter-spacing:0.25em">LIVE · TACTICAL</p>
          </div>
        </div>
        <!-- ─── END FIELD ─────────────────────────────── -->

        <!-- Logo — back to home -->
        <a routerLink="/"
           class="flex items-center gap-3 relative z-10 cursor-pointer"
           style="text-decoration:none;width:fit-content"
           title="Voltar ao início">
          <div class="w-8 h-8 flex items-center justify-center" style="background:#12B968;transition:box-shadow 0.2s"
               onmouseenter="this.style.boxShadow='0 0 20px rgba(18,185,104,0.6)'"
               onmouseleave="this.style.boxShadow='none'">
            <svg class="w-4 h-4" fill="#000" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span class="font-display text-white text-xl tracking-widest">RACHA+</span>
        </a>

        <!-- Brand statement -->
        <div class="relative z-10">
          <h2 class="font-display text-white leading-[0.88] tracking-tight"
              style="font-size:clamp(64px,8vw,112px)">
            ORGANIZE.<br>
            COMPETE.<br>
            <span style="color:#12B968">DOMINE.</span>
          </h2>
          <p style="color:#444;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin-top:28px">
            Gerenciamento de times esportivos
          </p>
        </div>

        <!-- Stats -->
        <div class="flex gap-10 relative z-10">
          <div>
            <div class="font-display text-white text-5xl leading-none">2.4K</div>
            <div style="color:#3a3a3a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px">Times</div>
          </div>
          <div>
            <div class="font-display text-white text-5xl leading-none">18K</div>
            <div style="color:#3a3a3a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px">Jogadores</div>
          </div>
          <div>
            <div class="font-display text-white text-5xl leading-none">94K</div>
            <div style="color:#3a3a3a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px">Partidas</div>
          </div>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════════
           RIGHT  —  Form
      ══════════════════════════════════════════════════ -->
      <div class="flex-1 flex flex-col justify-center
                  px-8 sm:px-14 lg:px-16 xl:px-24 py-16 min-h-screen animate-slide-up"
           style="background:#161616">

        <!-- Mobile logo — back to home -->
        <a routerLink="/" class="lg:hidden flex items-center gap-3 mb-12 cursor-pointer" style="text-decoration:none;width:fit-content">
          <div class="w-8 h-8 flex items-center justify-center" style="background:#12B968">
            <svg class="w-4 h-4" fill="#000" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="font-display text-white text-xl tracking-widest">RACHA+</span>
        </a>

        <div class="w-full max-w-[360px]">

          <div class="mb-12">
            <p style="color:#444;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:16px">Área do atleta</p>
            <h1 class="text-white text-3xl font-bold leading-tight tracking-tight">Bem-vindo<br>de volta.</h1>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="space-y-8">

            <div>
              <label class="block text-[10px] uppercase tracking-[0.2em] mb-3" style="color:#444">E-mail</label>
              <input type="email" formControlName="email" placeholder="seu@email.com"
                     autocomplete="email" class="input-line" [class.error]="isInvalid('email')" />
              @if (isInvalid('email')) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">{{ emailError }}</p>
              }
            </div>

            <div>
              <div class="flex items-center justify-between mb-3">
                <label class="text-[10px] uppercase tracking-[0.2em]" style="color:#444">Senha</label>
                <a routerLink="/forgot-password" class="text-[10px] uppercase tracking-wider cursor-pointer"
                   style="color:#444" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#444'">
                  Esqueceu?
                </a>
              </div>
              <div class="relative">
                <input [type]="showPassword() ? 'text' : 'password'" formControlName="password"
                       placeholder="••••••••" autocomplete="current-password"
                       class="input-line pr-8" [class.error]="isInvalid('password')" />
                <button type="button" (click)="showPassword.set(!showPassword())"
                        class="absolute right-0 bottom-3 cursor-pointer transition-colors duration-200"
                        style="color:#555" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#555'">
                  @if (showPassword()) {
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                    </svg>
                  } @else {
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  }
                </button>
              </div>
              @if (isInvalid('password')) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">Senha obrigatória</p>
              }
            </div>

            @if (apiError()) {
              <div class="border-l-2 pl-4 py-1 animate-fade-in" style="border-color:#ef4444">
                <p class="text-xs uppercase tracking-wider" style="color:#ef4444">{{ apiError() }}</p>
              </div>
            }

            <button type="submit" class="btn-primary" [disabled]="isLoading()">
              @if (isLoading()) {
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Entrando
              } @else { Entrar }
            </button>

          </form>

          <div class="flex items-center my-8">
            <div class="flex-1 border-t" style="border-color:#222"></div>
            <span class="px-5 text-[10px] uppercase tracking-widest" style="color:#333">ou</span>
            <div class="flex-1 border-t" style="border-color:#222"></div>
          </div>

          <button type="button" class="btn-ghost">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>

          <p class="text-center text-[11px] uppercase tracking-widest mt-10" style="color:#333">
            Novo no Racha+?
            <a routerLink="/register" class="cursor-pointer font-semibold ml-1"
               style="color:#fff" onmouseenter="this.style.color='#12B968'" onmouseleave="this.style.color='#fff'">
              Criar conta
            </a>
          </p>

        </div>
      </div>

    </div>
  `,
})
export class LoginComponent {
  form: FormGroup;
  showPassword = signal(false);
  isLoading    = signal(false);
  apiError     = signal('');

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isInvalid(f: string) { const c = this.form.get(f); return !!(c?.invalid && c.touched); }

  get emailError() {
    const c = this.form.get('email');
    if (c?.errors?.['required']) return 'E-mail obrigatório';
    if (c?.errors?.['email'])    return 'E-mail inválido';
    return '';
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true); this.apiError.set('');
    const { email, password } = this.form.value;
    try {
      const res = await firstValueFrom(this.auth.login(email, password));
      this.auth.saveToken(res.token);
      this.router.navigate(['/']);
    } catch (err: any) {
      this.apiError.set(err?.error?.message ?? 'E-mail ou senha incorretos.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
