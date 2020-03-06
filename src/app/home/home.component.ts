import { Component, OnInit } from '@angular/core';
import { RestfulApiService } from '../restful-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Clientes: any[] = [];

  Usuario: any = {
    username: 'Carlos'
  };

  username: string = 'Carlos';
  token: string = '';

  displayedColumns: string[] = ['codigo', 'razonSocial', 'estado', 'referencia'];
  dataSource = this.Clientes;

  constructor(private restfulapi: RestfulApiService) { }

  ngOnInit(): void {

    this.restfulapi.Login(this.Usuario).subscribe((res) => {

      let loggedUser: any = {};
      loggedUser = res;

      if (loggedUser) {
        this.token = loggedUser.token;
        this.restfulapi.SetToken(loggedUser.token);
      }

    }, error => {
      console.error
    });

  }

  getAllClientes() {
    this.restfulapi.getAllClientes().subscribe((res) => {
      console.log(res)
      this.Clientes = res;
    }, error => {
      console.error
    });
  }

  create() {
    let Cliente: any = {
      "razonSocial": this.makeid(10),
      "estado": "A",
      "referencia": this.makeid(6)
    }
    this.restfulapi.createCliente(Cliente).subscribe((res) => {
      console.log('res', res)
      this.getAllClientes();
    }, error => {
      console.error
    });
  }

  update() {
    let Cliente: any = {
      "razonSocial": this.makeid(10),
      "estado": "A",
      "referencia": this.makeid(6)
    }
    this.restfulapi.updateCliente(this.Clientes[this.Clientes.length - 1].codigo, Cliente).subscribe((res) => {
      console.log('res', res)
      this.getAllClientes();
    }, error => {
      console.error
    });
  }

  delete() {

    this.restfulapi.deleteCliente(this.Clientes[this.Clientes.length - 1].codigo).subscribe((res) => {
      console.log('res', res)
      this.getAllClientes();
    }, error => {
      console.error
    });
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}