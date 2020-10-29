import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  editUser: User;
  idUserSelec: string;
  userRef: any;
  arrayColeccionUsers: any = [
    {
      id: '',
      data: {} as User,
    },
  ];
  constructor(private firestore: FirestoreService) {
    this.editUser = {} as User;
    this.listarUsers();
  }

  // Listar usuarios
  listarUsers() {
    this.firestore.consultaUser('users').subscribe((res) => {
      this.arrayColeccionUsers = [];
      res.forEach((dataUser: any) => {
        this.arrayColeccionUsers.push({
          id: dataUser.payload.doc.id,
          data: dataUser.payload.doc.data(),
        });
      });
    });
  }

  // Botón agregar nuevo usuario
  clicAgregarUser() {
    this.firestore.addUser('users', this.editUser).then(
      () => {
        console.log('Usuario agregado correctamente!!!');
        this.editUser = {} as User;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Seleccionar usuario
  selectUser(userSelec) {
    console.log('Usuario seleccionado: ');
    console.log(userSelec);
    this.idUserSelec = userSelec.id;
    this.editUser.birthdate = userSelec.data.birthdate;
    this.editUser.email = userSelec.data.email;
    this.editUser.first_name = userSelec.data.first_name;
    this.editUser.last_name = userSelec.data.last_name;
    this.editUser.gender = userSelec.data.gender;
    this.editUser.city = userSelec.data.city;
    this.editUser.postcode = userSelec.data.postcode;
    this.editUser.state = userSelec.data.state;
    this.editUser.street = userSelec.data.street;
    this.editUser.password = userSelec.data.password;
    this.editUser.phone_number = userSelec.data.phone_number;
    this.editUser.picture = userSelec.data.picture;
    this.editUser.title = userSelec.data.title;
    this.editUser.username = userSelec.data.username;
  }

  // Botón eliminar usuario
  clicEliminarUser() {
    this.firestore.eliminarUser('users', this.idUserSelec).then(() => {
      // Actualizar lista de usuarios
      this.listarUsers();
      // Limpiar vista
      this.editUser = {} as User;
    });
  }

  clicActualizarUser() {
    this.firestore
      .actualizarUser('users', this.idUserSelec, this.editUser)
      .then(() => {
        // Actualizar lista
        this.listarUsers();
        // Limpiar vista
        this.editUser = {} as User;
      });
  }
}
