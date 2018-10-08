import { ItemEventData } from "ui/list-view"
import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
    message = "You have successfully authenticated. This is where you build your core application functionality.";
    userList = [] 
    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUserDetails((res) => {
            console.log("Response", res)  
            this.userList = res
        }, (err) => {
            console.log("Error")
            this.alert(JSON.stringify(err))
        })
    }

    
    alert(message: string) {
        return alert({
            title: "Evince Demo",
            okButtonText: "OK",
            message: message
        });
    }
}
