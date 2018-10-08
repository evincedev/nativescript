import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: User;
    processing = false;
    @ViewChild("lastname") lastname: ElementRef;
    @ViewChild("company") company: ElementRef;

    constructor(private page: Page, private userService: UserService, private router: Router) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }


    focusLastName() {
        this.lastname.nativeElement.focus();

    }

    focusCompany() {
        this.company.nativeElement.focus();
    }


    submit() {
        if (!this.user.firstname || !this.user.lastname || !this.user.company) {
            this.alert("Please provide all first name,last name and company.");
            return;
        }
        this.registerUser()
    }




    registerUser() {
        this.processing = true;
        this.userService.insertUserDetails(this.user, () => {
            this.processing = false
            this.user = new User()
            alert("User Added Successfully")
        }, (err) => {
            this.processing = false
        })
    }


    linkToHome() {
        this.router.navigate(["/home"]);
    }
    alert(message: string) {
        return alert({
            title: "Evince Demo",
            okButtonText: "OK",
            message: message
        });
    }
}

