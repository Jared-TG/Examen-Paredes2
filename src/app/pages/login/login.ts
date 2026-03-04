import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutService } from '../../services/aut-service';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject (FormBuilder);
  private auth = inject(AutService);
  private router = inject(Router);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.form.invalid){
      this.form.markAllAsDirty();
      return; 
    }
    console.log(this.form.value);
    const { email, password } = this.form.getRawValue(); 

    const valido = this.auth.Login(email!, password!)
    console.log(valido);

    if (valido) {
      this.router.navigate(['/home']);
      return;
    }
  }
}
