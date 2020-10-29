import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Agregar un nuevo usuario
  public addUser(coleccion, data) {
    return this.firestore.collection('users').add(data);
  }

  // Consultar usuarios
  public consultaUser(coleccion) {
    return this.firestore.collection('users').snapshotChanges();
  }

  // Actualizar datos de usuario
  public actualizarUser(coleccion, documentId, data) {
    return this.firestore.collection('users').doc(documentId).update(data);
  }

  // Eliminar un usuario
  public eliminarUser(coleccion, documentId) {
    return this.firestore.collection('users').doc(documentId).delete();
  }

  // Consultar usuario por Id
  public consultaId(coleccion, documentId) {
    return this.firestore.collection('users').doc(documentId).snapshotChanges();
  }
}
