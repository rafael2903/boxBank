import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent implements OnInit {
  transferDataForm!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.transferDataForm = this.fb.group({
      senderId: ['', [Validators.required, Validators.maxLength(11)]],
      amount: [0.0, [Validators.required, Validators.min(1)]],
    });
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
