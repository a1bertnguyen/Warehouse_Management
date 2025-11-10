import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { TRANSACTIONS } from "../data";

@Component ({
    imports: [RouterModule],
    templateUrl:"./html/transaction-details.html",
    styleUrls:["./css/transaction-details.css"]
})

export class transactionDetail {
  route: ActivatedRoute = inject(ActivatedRoute);
  transaction: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.transaction = TRANSACTIONS.find(t => t.transaction_id === id);
  }
}