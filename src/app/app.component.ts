import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormService} from "./Services/form-service.service";
import {Stack} from "../Utilis/Stack";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Amr-Test';
  form: FormGroup;
  majors: Array<Select> = [
    {id: 1, option: "IT"},
    {id: 2, option: "Doctor"},
    {id: 3, option: "Engineer"},
  ];
  users: Array<User> = [];
  formChanges: Stack<User> = new Stack();
  isEditingMode: boolean = false;

  constructor(private formService: FormService<User>) {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      notes: new FormControl(''),
      major: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.formService.observe().subscribe((users: Array<User>) => {
      this.users = users;
      console.log('Form Data:', this.users);
    })
    this.form.valueChanges.subscribe((form) => {
      if (this.isEditingMode)
        this.formChanges.push(form)
    })
  }

  getMajor(id: number) {
    return this.majors.findById(id)?.option;
  }

  edit(id: number | undefined) {
    this.isEditingMode = true;
    const user: User | undefined = this.users.findById(id ?? 0)
    this.form.setValue(user ?? {})
  }

  onSubmit() {
    if (this.form.valid) {
      this.isEditingMode = false;
      const user: User = {...this.form.value as User};
      user.id = this.users.length + 1;
      this.formService.add(user)
      this.form.reset()
    }
  }
}
