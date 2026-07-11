package com.cidsystem.cardealershipinventory.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;
import com.cidsystem.cardealershipinventory.exception.VehicleNotFoundException;
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
    public List<Vehicle> searchVehicle(
            String make,
            String model,
            Category category,
            BigDecimal minPrice,
            BigDecimal maxPrice) {
        return vehicleRepository.searchVehicles(
                normalizeText(make),
                normalizeText(model),
                category,
                minPrice,
                maxPrice);
    }

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        validateVehicle(vehicle);
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        validateVehicle(vehicle);

        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));

        applyUpdates(existingVehicle, vehicle);
        return vehicleRepository.save(existingVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new VehicleNotFoundException(id);
        }

        vehicleRepository.deleteById(id);
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

    private void applyUpdates(Vehicle existingVehicle, Vehicle updateRequest) {
        existingVehicle.setMake(updateRequest.getMake());
        existingVehicle.setModel(updateRequest.getModel());
        existingVehicle.setCategory(updateRequest.getCategory());
        existingVehicle.setPrice(updateRequest.getPrice());
        existingVehicle.setQuantity(updateRequest.getQuantity());
    }

    private String normalizeText(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}
