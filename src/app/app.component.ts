import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormGroup, FormControl, Validators, FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormService} from "./Services/form-service.service";
import {Stack} from "../Utilis/Stack";
import {FilterPipe} from "./Pipe/filter.pipe";
import {Majors , Examples} from "../Config/User";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, FilterPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * Page title
   */
  title = 'Amr-Test';
  /**
   * form handler
   */
  form: FormGroup;
  /**
   * user's majors list
   */
  majors: Array<Select> = Majors;
  users: Array<User> = [];
  /**
   * this is the stack that handles user's changes
   */
  formChanges: Stack<User> = new Stack();
  /**
   * check if user went to the editing mode
   */
  isEditingMode: boolean = false;
  /**
   * the original copy of the current edited data
   */
  originalUser: User | undefined;
  /**
   * search attribute
   */
  searchText: string = ''

  constructor(private formService: FormService<User>) {
    /**
     * initialize the form
     */
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      major: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      gender: new FormControl('male'),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    /**
     * observe the changes of list
     */
    this.formService.observe().subscribe((users: Array<User>) => this.users = users)
    /**
     * listen to user's changes
     * once, user submit a new change, it will be stored automatically into the stack of changes
     */
    this.form.valueChanges.subscribe((form) => {
      if (this.isEditingMode && !form.equals(this.originalUser))
        this.formChanges.push(form)
    })

    // dummy code, just for Testing
    Examples.forEach(item => this.formService.add(item));
  }

  getMajor(id: number) {
    return this.majors.findById(id)?.option;
  }

  edit(id: number | undefined) {
    this.isEditingMode = true;
    const user: User | undefined = this.users.findById(id ?? 0)
    this.originalUser = user as User;
    this.form.setValue(user ?? {})

  }

  /**
   * undo user's changes
   * @author Amr
   */
  undo() {
    this.form.setValue(this.originalUser ?? {})
  }

  /**
   * return the changes back to user's changes history
   * @author Amr
   */
  reDo() {
    const lastElement: User | undefined = this.formChanges.pop()
    this.form.patchValue(lastElement as User, {emitEvent: false})
  }

  /**
   * update or create item
   * @author Amr
   */
  onSubmit() {
    if (this.form.valid) {
      this.isEditingMode = false;
      const user: User = {...this.form.value as User};
      if (this.form.value.id) {
        this.formService.update(user, this.form.value.id)
      } else {
        user.id = this.users.length + 1;
        this.formService.add(user)
      }
      this.form.reset()
      this.formChanges = new Stack();
    }
  }
}
