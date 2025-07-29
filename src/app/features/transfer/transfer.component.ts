import { BreakpointObserver } from '@angular/cdk/layout';
import {
  StepperOrientation,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user.model';
import { TransferService } from '../../shared/services/transfer.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  transferDataForm!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  sender: User;
  receiver?: User;

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private transferService: TransferService
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.sender = this.authService.getCurrentUser()!;
  }

  ngOnInit() {
    this.buildForm();
  }

  private maxAmountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value > this.sender.amount
        ? { maxAmountExceeded: true }
        : null;
    };
  }

  private selfTransferValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === this.sender.cpf ? { selfTransfer: true } : null;
    };
  }

  private buildForm() {
    this.transferDataForm = this.fb.group({
      receiverId: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          this.selfTransferValidator(),
        ],
      ],
      amount: [
        0.0,
        [Validators.required, Validators.min(1), this.maxAmountValidator()],
      ],
    });
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  private transfer() {
    const { receiverId, amount } = this.transferDataForm.value;
    this.transferService
      .transfer(this.sender.cpf, receiverId, amount)
      .subscribe({
        next: () => {},
        error: (err: any) => {
          this.stepper.selectedIndex = 1;
        },
      });
  }

  private verifyReceiver(): Observable<boolean> {
    const receiverId = this.transferDataForm.get('receiverId')?.value;
    return this.usersService.getByAttribute('cpf', receiverId).pipe(
      map((users: User[]) => {
        if (users.length > 0) {
          this.receiver = users[0];
          return true;
        } else {
          this.receiver = undefined;
          return false;
        }
      })
    );
  }

  onSelectionChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      this.verifyReceiver().subscribe((exists) => {
        if (!exists) {
          this.transferDataForm
            .get('receiverId')
            ?.setErrors({ notFound: true });
          event.previouslySelectedStep.select();
        }
      });
    }

    if (event.selectedIndex === 2) this.transfer();
  }
}
