package com.Warehouse_managment.Warehouse_managment.Service;


import com.Warehouse_managment.Warehouse_managment.Enum.TransactionStatus;
import com.Warehouse_managment.Warehouse_managment.Response.Response;
import com.Warehouse_managment.Warehouse_managment.Response.TransactionRequest;

public interface TransactionService {
    Response purchase(TransactionRequest transactionRequest);

    Response sell(TransactionRequest transactionRequest);

    Response returnToSupplier(TransactionRequest transactionRequest);

    Response getAllTransactions(int page, int size, String filter);

    Response getAllTransactionById(Long id);

    Response getAllTransactionByMonthAndYear(int month, int year);

    Response updateTransactionStatus(Long transactionId, TransactionStatus status);
}
