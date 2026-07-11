package com.cidsystem.cardealershipinventory.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;
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
}
