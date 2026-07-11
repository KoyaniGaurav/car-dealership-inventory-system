package com.cidsystem.cardealershipinventory.service;

import java.math.BigDecimal;
import java.util.List;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;

public interface VehicleService {

    List<Vehicle> getAllVehicle();
       
    List<Vehicle> searchVehicle(String make, String model, Category category, BigDecimal minPrice, BigDecimal maxPrice);

    Vehicle addVehicle(Vehicle v);

    Vehicle updateVehicle(Long id, Vehicle v);

    void deleteVehicle(Long id);

    Vehicle purchaseVehicle(Long id);

    Vehicle restockVehicle(Long id, Long quantity);
}
