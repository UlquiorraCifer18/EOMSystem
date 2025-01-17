import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  formValues: any;
  public form = {
    name: '',
    birthday: '',
    college: '',
    department: '',
    email: '',
    status: '',
    photo: null,
  };
  constructor(private backend: BackendService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.backend.userById(id).subscribe({
      next: (data) => {
        this.formValues = Object.values(data);
        this.form.name = this.formValues[0].name;
        this.form.birthday = this.formValues[0].birthday;
        this.form.college = this.formValues[0].college;
        this.form.department = this.formValues[0].department;
        this.form.email = this.formValues[0].email;
        this.form.status = this.formValues[0].status;
        this.form.photo = this.formValues[0].photo;
      },
    });
  }

  id = Number(this.route.snapshot.paramMap.get('id'));
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.photo = event.target.files[0];
    } else {
      this.form.photo = null;
    }
  }
  error: any = [];
  editUser() {
    const formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('birthday', this.form.birthday);
    formData.append('college', this.form.college);
    formData.append('department', this.form.department);
    formData.append('email', this.form.email);
    formData.append('status', this.form.status);
    if (this.form.photo) {
      formData.append('photo', this.form.photo);
    }

    return this.backend.editUser(formData, this.id).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        this.handleError(error);
      },
    });
  }
  handleError(error: any) {
    this.error = error.error.errors;
  }
}
