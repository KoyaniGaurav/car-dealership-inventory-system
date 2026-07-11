package com.cidsystem.cardealershipinventory.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cidsystem.cardealershipinventory.entity.Vehicle;
import com.cidsystem.cardealershipinventory.exception.VehicleValidationException;
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
        validateVehicle(vehicle);
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updatVehicle(Vehicle vehicle) {
        throw new UnsupportedOperationException("Update vehicle is not implemented yet");
    }

    @Override
    public void deleteVehicle(Long id) {
        throw new UnsupportedOperationException("Delete vehicle is not implemented yet");
    }

    private void validateVehicle(Vehicle vehicle) {
        validateRequiredText(vehicle.getMake(), "Vehicle make is required");
        validateRequiredText(vehicle.getModel(), "Vehicle model is required");

        if (vehicle.getCategory() == null) {
            throw new VehicleValidationException("Vehicle category is required");
        }

        if (vehicle.getPrice() == null || vehicle.getPrice().signum() <= 0) {
            throw new VehicleValidationException("Vehicle price must be greater than zero");
        }

        if (vehicle.getQuantity() == null || vehicle.getQuantity() < 0) {
            throw new VehicleValidationException("Vehicle quantity cannot be negative");
        }
    }

    private void validateRequiredText(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new VehicleValidationException(message);
        }
    }
}
