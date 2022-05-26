import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import * as moment from 'moment/moment.js';
import {ToastrService} from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-project';
  inputForm!: FormGroup;
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  isShowInfor = false;
  dateOne: any;
  dateTwo: any;
  codeOne: any;
  codeTwo: any;
  bsValue: any;
  address: any;
  addressInput: any;
  isLogin = false;
  userName: any;
  configTime: any;
  listOTP = ['864932', '765992', '664972', '564632', '214932', '364938', '114932', '464942', '969932', '364632']
  constructor(
    public formBuilder: FormBuilder,
    public toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      gioiTinh: ['Nam'],
      cccd: ['', [Validators.minLength(7), Validators.maxLength(20)]],
      bhyt: ['', [Validators.minLength(7), Validators.maxLength(20)]]
    })

    this.loginForm = this.formBuilder.group({
      phoneRegis: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })

    this.otpForm = this.formBuilder.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]],
    })
    this.getDateUser();
  }
  changeAddr() {
    this.addressInput = this.address;
  }
  get f(): any {
    return this.inputForm.controls;
  }
  get lf(): any {
    return this.loginForm.controls;
  }
  get of(): any {
    return this.otpForm.controls;
  }


  changeDate(event: any) {
    if (event) {
      this.bsValue = moment(event).format('DD/MM/YYYY');
    }
  }
  searchInfor() {
    if (this.inputForm.invalid) {
      this.isShowInfor = false;
    } else {
      this.configTime = { stopTime: new Date().getTime() + 1000 * 120 };
      $('#modalOtp').modal('show');
    }
  }
  randomCodeCovid() {
    const baseString =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    const getRandomInt = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const getRandomString = (length: any, base: any) => {
      let result = "";
      const baseLength = base.length;

      for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(0, baseLength);
        result += base[randomIndex];
      }
      return result;
    };
    const getRandomHex2 = () => {
      const baseString = "0123456789ABCDEF";
      return `${getRandomString(7, baseString)}`;
    };
    for (let i = 0; i < 2; i += 1) {
      this.codeOne = `${getRandomHex2()}`;
      this.codeTwo = `${getRandomHex2()}`;
    }
  }
  login() {
    this.isLogin = true;
  }
  doLogin() {
    if (!this.lf.phoneRegis.value || !this.lf.pass.value) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      localStorage.setItem('inforUser', JSON.stringify(this.lf.phoneRegis.value));
      this.getDateUser();
    }
  }
  getDateUser() {
    this.userName = localStorage.getItem('inforUser');
  }

  accessOTP() {
    const otp = String(this.of.otp1.value) + String(this.of.otp2.value) + String(this.of.otp3.value) + String(this.of.otp4.value) + String(this.of.otp5.value) + String(this.of.otp6.value);
    const checkOTP = this.listOTP.find(el => el == otp);
    if (checkOTP) {
      this.isShowInfor = true;
      this.randomCodeCovid();
      const date = moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))
        .format();
      this.dateTwo = moment((new Date(date).getTime() - 12000000000)).format('DD/MM/YYYY');
      this.dateOne = moment((new Date(date).getTime()) - 15000000000).format('DD/MM/YYYY')
      $('#modalOtp').modal('hide');
    } else {
      this.isShowInfor = false;
      this.toastrService.error('Mã OTP không chính xác, vui lòng nhập lại!')
    }
  }
  cancel() {
    this.otpForm.reset();
    $('#modalOtp').modal('hide');
  }
  resetForm() {
    window.location.reload();
  }
}
