import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

function matchPasswords(ctrl: AbstractControl): ValidationErrors | null {
  const p = ctrl.get('password'), c = ctrl.get('confirmPassword');
  if (!p || !c) return null;
  return p.value !== c.value ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex bg-[#1A1A1A]">

      <!-- ══════════════════════════════════════════════════
           LEFT  —  HUD Animation Panel
      ══════════════════════════════════════════════════ -->
      <div class="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#111111] border-r border-[#222]
                  flex-col justify-between p-14">

        <!-- ─── ANIMATION SYSTEM — confined to centre zone ── -->
        <div class="absolute pointer-events-none select-none"
             style="top:15%;bottom:18%;left:0;right:0;display:flex;align-items:center;justify-content:center;z-index:0">

          <div class="absolute rounded-full animate-spin-slow"
               style="width:580px;height:580px;border:1px dashed rgba(18,185,104,0.18)"></div>
          <div class="absolute rounded-full animate-spin-rev"
               style="width:440px;height:440px;border:1.5px dashed rgba(244,140,6,0.18)"></div>
          <div class="absolute rounded-full animate-pulse-glow"
               style="width:300px;height:300px;border:1px solid rgba(18,185,104,0.25)"></div>
          <div class="absolute rounded-full animate-spin-fast"
               style="width:160px;height:160px;border:1.5px solid rgba(244,140,6,0.3)"></div>

          <div class="absolute w-full h-px"
               style="background:linear-gradient(90deg,transparent,rgba(18,185,104,0.12) 50%,transparent)"></div>
          <div class="absolute h-full w-px"
               style="background:linear-gradient(180deg,transparent,rgba(18,185,104,0.12) 50%,transparent)"></div>

          <div class="absolute w-[300px] h-px animate-scan"
               style="background:linear-gradient(90deg,transparent,rgba(244,140,6,0.5),transparent)"></div>

          <!-- Orbiting dots -->
          <div class="orbit-anchor animate-spin-rev">
            <div class="absolute rounded-full glow-green"
                 style="width:12px;height:12px;background:#12B968;transform:translateX(220px) translateY(-6px)"></div>
          </div>
          <div class="orbit-anchor animate-spin-slow" style="animation-direction:reverse">
            <div class="absolute rounded-full glow-orange"
                 style="width:8px;height:8px;background:#F48C06;transform:translateX(290px) translateY(-4px)"></div>
          </div>
          <div class="orbit-anchor animate-spin-fast">
            <div class="absolute rounded-full"
                 style="width:5px;height:5px;background:#12B968;transform:translateX(80px) translateY(-2.5px);opacity:0.8"></div>
          </div>

          <!-- Central icon -->
          <div class="absolute animate-pulse-glow">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="#12B968"
                 style="filter:drop-shadow(0 0 12px rgba(18,185,104,0.8)) drop-shadow(0 0 24px rgba(18,185,104,0.4))">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>

          <!-- HUD badge — inside field zone only -->
          <div style="position:absolute;top:8px;right:24px">
            <p style="font-family:'Bebas Neue',sans-serif;font-size:10px;
               color:rgba(18,185,104,0.5);letter-spacing:0.25em">NEW.PLAYER</p>
          </div>

        </div>
        <!-- ─── END ANIMATION ─────────────────────────── -->

        <!-- Logo — back to home -->
        <a routerLink="/"
           class="flex items-center gap-3 relative z-10 cursor-pointer"
           style="text-decoration:none;width:fit-content"
           title="Voltar ao início">
          <div class="w-8 h-8 flex items-center justify-center"
               style="background:#12B968;transition:box-shadow 0.2s"
               onmouseenter="this.style.boxShadow='0 0 20px rgba(18,185,104,0.6)'"
               onmouseleave="this.style.boxShadow='none'">
            <svg class="w-4 h-4" fill="#000" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="font-display text-white text-xl tracking-widest">RACHA+</span>
        </a>

        <!-- Brand statement -->
        <div class="relative z-10">
          <h2 class="font-display text-white leading-[0.88] tracking-tight"
              style="font-size:clamp(64px,8vw,112px)">
            JUNTE-SE<br>
            AO<br>
            <span style="color:#F48C06">JOGO.</span>
          </h2>
          <p style="color:#444;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin-top:28px">
            Cadastro 100% gratuito
          </p>
        </div>

        <!-- Features -->
        <div class="space-y-4 relative z-10">
          @for (f of features; track f) {
            <div class="flex items-center gap-4">
              <div class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                   style="border:1px solid #2C2C2C">
                <div class="w-1.5 h-1.5 rounded-full" style="background:#12B968"></div>
              </div>
              <span class="text-[11px] uppercase tracking-widest" style="color:#555">{{ f }}</span>
            </div>
          }
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

          <div class="mb-10">
            <p style="color:#444;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:16px">Cadastro gratuito</p>
            <h1 class="text-white text-3xl font-bold leading-tight tracking-tight">Crie sua<br>conta.</h1>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="space-y-6">

            <!-- Nome -->
            <div>
              <label class="block text-[10px] uppercase tracking-[0.2em] mb-3" style="color:#444">Nome</label>
              <input type="text" formControlName="name" placeholder="Seu nome"
                     autocomplete="name" class="input-line" [class.error]="isInvalid('name')" />
              @if (isInvalid('name')) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">{{ nameError }}</p>
              }
            </div>

            <!-- Email -->
            <div>
              <label class="block text-[10px] uppercase tracking-[0.2em] mb-3" style="color:#444">E-mail</label>
              <input type="email" formControlName="email" placeholder="seu@email.com"
                     autocomplete="email" class="input-line" [class.error]="isInvalid('email')" />
              @if (isInvalid('email')) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">{{ emailError }}</p>
              }
            </div>

            <!-- Senha -->
            <div>
              <label class="block text-[10px] uppercase tracking-[0.2em] mb-3" style="color:#444">Senha</label>
              <div class="relative">
                <input [type]="showPassword() ? 'text' : 'password'" formControlName="password"
                       placeholder="Mínimo 8 caracteres" autocomplete="new-password"
                       class="input-line pr-8" [class.error]="isInvalid('password')" />
                <button type="button" (click)="showPassword.set(!showPassword())"
                        class="absolute right-0 bottom-3 transition-colors duration-200 cursor-pointer"
                        style="color:#555" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#555'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    @if (showPassword()) {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    }
                  </svg>
                </button>
              </div>

              @if (pwdValue().length > 0) {
                <div class="mt-3 space-y-1.5">
                  <div class="flex gap-1">
                    @for (i of [0,1,2,3]; track i) {
                      <div class="h-0.5 flex-1 transition-all duration-300"
                           [style.background]="i < strength() ? strengthColor() : '#2a2a2a'"></div>
                    }
                  </div>
                  <p class="text-[10px] uppercase tracking-widest" [style.color]="strengthColor()">{{ strengthLabel() }}</p>
                </div>
              }
              @if (isInvalid('password')) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">{{ passwordError }}</p>
              }
            </div>

            <!-- Confirmar senha -->
            <div>
              <label class="block text-[10px] uppercase tracking-[0.2em] mb-3" style="color:#444">Confirmar senha</label>
              <input [type]="showPassword() ? 'text' : 'password'" formControlName="confirmPassword"
                     placeholder="Repita sua senha" autocomplete="new-password"
                     class="input-line" [class.error]="mismatch()" />
              @if (mismatch()) {
                <p class="text-[11px] uppercase tracking-wider mt-2" style="color:#ef4444">As senhas não coincidem</p>
              }
            </div>

            <!-- Terms -->
            <div class="flex items-start gap-3 pt-1">
              <div class="w-4 h-4 flex-shrink-0 mt-0.5 cursor-pointer flex items-center justify-center transition-colors duration-200"
                   [style.border]="form.get('terms')?.value ? '1px solid #12B968' : '1px solid #333'"
                   [style.background]="form.get('terms')?.value ? '#12B968' : 'transparent'"
                   (click)="toggleTerms()">
                @if (form.get('terms')?.value) {
                  <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="#000" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                }
              </div>
              <label class="text-[11px] leading-relaxed cursor-pointer" style="color:#555" (click)="toggleTerms()">
                Concordo com os
                <a href="#" style="color:#888" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#888'">Termos</a>
                e
                <a href="#" style="color:#888" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#888'">Privacidade</a>
              </label>
            </div>
            @if (isInvalid('terms')) {
              <p class="text-[11px] uppercase tracking-wider" style="color:#ef4444">Aceite os termos para continuar</p>
            }

            @if (apiError()) {
              <div class="border-l-2 pl-4 py-1 animate-fade-in" style="border-color:#ef4444">
                <p class="text-xs uppercase tracking-wider" style="color:#ef4444">{{ apiError() }}</p>
              </div>
            }
            @if (success()) {
              <div class="border-l-2 pl-4 py-1 animate-fade-in" style="border-color:#12B968">
                <p class="text-xs uppercase tracking-wider" style="color:#12B968">Conta criada! Redirecionando...</p>
              </div>
            }

            <button type="submit" class="btn-primary" [disabled]="isLoading()">
              @if (isLoading()) {
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Criando conta
              } @else { Criar conta grátis }
            </button>

          </form>

          <p class="text-center text-[11px] uppercase tracking-widest mt-10" style="color:#333">
            Já tem uma conta?
            <a routerLink="/login" class="cursor-pointer font-semibold ml-1"
               style="color:#fff" onmouseenter="this.style.color='#12B968'" onmouseleave="this.style.color='#fff'">
              Entrar
            </a>
          </p>

        </div>
      </div>

    </div>
  `,
})
export class RegisterComponent {
  form: FormGroup;
  showPassword = signal(false);
  isLoading    = signal(false);
  apiError     = signal('');
  success      = signal(false);

  features = [
    'Criação e gestão de times',
    'Organização de rachões e partidas',
    'Estatísticas e rankings',
    'Divisão de custos entre jogadores',
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name:            ['', [Validators.required, Validators.minLength(2)]],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms:           [false, Validators.requiredTrue],
    }, { validators: matchPasswords });
  }

  isInvalid(f: string) { const c = this.form.get(f); return !!(c?.invalid && c.touched); }
  mismatch()           { return !!(this.form.errors?.['mismatch'] && this.form.get('confirmPassword')?.touched); }
  toggleTerms()        { const c = this.form.get('terms'); if (c) c.setValue(!c.value); }

  pwdValue  = computed(() => this.form.get('password')?.value ?? '');

  strength(): number {
    const p = this.pwdValue(); let s = 0;
    if (p.length >= 8)           s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p))  s++;
    return s;
  }

  strengthColor()  { return ['#ef4444','#ef4444','#f59e0b','#12B968','#12B968'][this.strength()]; }
  strengthLabel()  { return ['Fraca','Fraca','Razoável','Boa','Forte'][this.strength()]; }

  get nameError()     { const c = this.form.get('name');     return c?.errors?.['required'] ? 'Nome obrigatório' : 'Mínimo 2 caracteres'; }
  get emailError()    { const c = this.form.get('email');    return c?.errors?.['required'] ? 'E-mail obrigatório' : 'E-mail inválido'; }
  get passwordError() { const c = this.form.get('password'); return c?.errors?.['required'] ? 'Senha obrigatória' : 'Mínimo 8 caracteres'; }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true); this.apiError.set('');
    const { name, email, password } = this.form.value;
    try {
      await firstValueFrom(this.auth.register(name, email, password));
      this.success.set(true);
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } catch (err: any) {
      const msg = err?.error?.message ?? err?.error ?? 'Não foi possível criar a conta.';
      this.apiError.set(typeof msg === 'string' ? msg : 'Não foi possível criar a conta.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
