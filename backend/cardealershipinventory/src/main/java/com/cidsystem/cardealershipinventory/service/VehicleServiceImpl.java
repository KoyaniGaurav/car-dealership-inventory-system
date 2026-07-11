package com.cidsystem.cardealershipinventory.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cidsystem.cardealershipinventory.entity.Vehicle;
import com.cidsystem.cardealershipinventory.repository.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle searchBVehicle(String keyword) {
        throw new UnsupportedOperationException("Search vehicle is not implemented yet");
    }

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        throw new UnsupportedOperationException("Add vehicle is not implemented yet");
    }

    @Override
    public Vehicle updatVehicle(Vehicle vehicle) {
        throw new UnsupportedOperationException("Update vehicle is not implemented yet");
    }

    @Override
    public void deleteVehicle(Long id) {
        throw new UnsupportedOperationException("Delete vehicle is not implemented yet");
    }
}
