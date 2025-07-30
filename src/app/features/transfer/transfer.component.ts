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

enum Step {
  TransferData,
  Review,
  Confirmation,
}

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
        next: () => {
          this.usersService.getById(this.sender.id).subscribe(user => {
            this.authService.updateUser(user);
          });
        },
        error: (err: any) => {
          this.stepper.selectedIndex = Step.Review;
        },
      });
  }

  private verifyReceiver() {
    const receiverId = this.transferDataForm.get('receiverId')?.value;
    this.usersService.getByAttribute('cpf', receiverId).subscribe((users) => {
      this.receiver = users?.[0];
      if (!this.receiver) {
        this.transferDataForm.get('receiverId')?.setErrors({ notFound: true });
        this.stepper.selectedIndex = Step.TransferData;
      }
    });
  }

  private readonly STEP_ACTIONS: Record<
    Step,
    (event: StepperSelectionEvent) => void
  > = {
    [Step.TransferData]: () => {},
    [Step.Review]: () => {
      this.verifyReceiver();
    },
    [Step.Confirmation]: () => {
      this.transfer();
    },
  };

  onSelectionChange(event: StepperSelectionEvent) {
    this.STEP_ACTIONS[event.selectedIndex as Step]?.(event);
  }
}
