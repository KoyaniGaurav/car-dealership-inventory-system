package com.cidsystem.cardealershipinventory.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;
import com.cidsystem.cardealershipinventory.exception.VehicleNotFoundException;
import com.cidsystem.cardealershipinventory.exception.VehicleValidationException;
import com.cidsystem.cardealershipinventory.repository.VehicleRepository;

@ExtendWith(MockitoExtension.class)
public class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleServiceImpl vehicleService;

    @Test
    void shouldReturnAllVehicles() {
        List<Vehicle> vehicles = List.of(
                new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L),
                new Vehicle(2L, "Honda", "Civic", Category.SEDAN, BigDecimal.valueOf(22000), 3L));

        when(vehicleRepository.findAll()).thenReturn(vehicles);

        List<Vehicle> result = vehicleService.getAllVehicle();

        assertEquals(vehicles, result);
        verify(vehicleRepository).findAll();
    }

    @Test
    void shouldAddVehicle() {
        Vehicle vehicle = validVehicle();
        Vehicle savedVehicle = new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L);

        when(vehicleRepository.save(vehicle)).thenReturn(savedVehicle);

        Vehicle result = vehicleService.addVehicle(vehicle);

        assertEquals(savedVehicle, result);
        verify(vehicleRepository).save(vehicle);
    }

    @Test
    void shouldRejectVehicleWithoutMake() {
        Vehicle vehicle = validVehicle();
        vehicle.setMake(" ");

        VehicleValidationException exception = assertThrows(
                VehicleValidationException.class,
                () -> vehicleService.addVehicle(vehicle));

        assertEquals("Vehicle make is required", exception.getMessage());
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    void shouldRejectVehicleWithoutModel() {
        Vehicle vehicle = validVehicle();
        vehicle.setModel(null);

        VehicleValidationException exception = assertThrows(
                VehicleValidationException.class,
                () -> vehicleService.addVehicle(vehicle));

        assertEquals("Vehicle model is required", exception.getMessage());
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    void shouldRejectVehicleWithoutCategory() {
        Vehicle vehicle = validVehicle();
        vehicle.setCategory(null);

        VehicleValidationException exception = assertThrows(
                VehicleValidationException.class,
                () -> vehicleService.addVehicle(vehicle));

        assertEquals("Vehicle category is required", exception.getMessage());
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    void shouldRejectVehicleWithNonPositivePrice() {
        Vehicle vehicle = validVehicle();
        vehicle.setPrice(BigDecimal.ZERO);

        VehicleValidationException exception = assertThrows(
                VehicleValidationException.class,
                () -> vehicleService.addVehicle(vehicle));

        assertEquals("Vehicle price must be greater than zero", exception.getMessage());
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    void shouldRejectVehicleWithNegativeQuantity() {
        Vehicle vehicle = validVehicle();
        vehicle.setQuantity(-1L);

        VehicleValidationException exception = assertThrows(
                VehicleValidationException.class,
                () -> vehicleService.addVehicle(vehicle));

        assertEquals("Vehicle quantity cannot be negative", exception.getMessage());
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    void shouldUpdateVehicle() {
        Vehicle existingVehicle = new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L);
        Vehicle updateRequest = new Vehicle("Honda", "Civic", Category.SEDAN, BigDecimal.valueOf(22000), 4L);
        Vehicle updatedVehicle = new Vehicle(1L, "Honda", "Civic", Category.SEDAN, BigDecimal.valueOf(22000), 4L);

        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(existingVehicle));
        when(vehicleRepository.save(existingVehicle)).thenReturn(updatedVehicle);

        Vehicle result = vehicleService.updateVehicle(1L, updateRequest);

        assertEquals(updatedVehicle, result);
        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository).save(existingVehicle);
    }

    @Test
    void shouldRejectUpdateWhenVehicleDoesNotExist() {
        Vehicle updateRequest = validVehicle();

        when(vehicleRepository.findById(99L)).thenReturn(Optional.empty());

        VehicleNotFoundException exception = assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.updateVehicle(99L, updateRequest));

        assertEquals("Vehicle not found with id: 99", exception.getMessage());
        verify(vehicleRepository).findById(99L);
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    private Vehicle validVehicle() {
        return new Vehicle("Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L);
    }
}
