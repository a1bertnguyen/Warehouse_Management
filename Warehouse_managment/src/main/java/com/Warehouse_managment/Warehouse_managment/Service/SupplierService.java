package com.Warehouse_managment.Warehouse_managment.Service;


import com.Warehouse_managment.Warehouse_managment.Response.Response;
import com.Warehouse_managment.Warehouse_managment.Response.SupplierDTO;

public interface SupplierService {

    Response addSupplier(SupplierDTO supplierDTO);

    Response updateSupplier(Long id, SupplierDTO supplierDTO);

    Response getAllSupplier();

    Response getSupplierById(Long id);

    Response deleteSupplier(Long id);

}
