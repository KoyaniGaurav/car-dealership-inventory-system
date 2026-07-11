package com.cidsystem.cardealershipinventory.service;

import java.util.List;

import com.cidsystem.cardealershipinventory.entity.Vehicle;

public interface VehicleService {

    List<Vehicle> getAllVehicle();
       
    Vehicle searchBVehicle(String keyword);

    Vehicle addVehicle(Vehicle v);

    Vehicle updateVehicle(Long id, Vehicle v);

    void deleteVehicle(Long id);
}
