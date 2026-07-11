package com.cidsystem.cardealershipinventory.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;
import com.cidsystem.cardealershipinventory.service.VehicleService;

@ExtendWith(MockitoExtension.class)
public class VehicleControllerTest {

    private MockMvc mockMvc;

    @Mock
    private VehicleService vehicleService;

    @InjectMocks
    private VehicleController vehicleController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(vehicleController).build();
    }

    @Test
    void shouldReturnAllVehicles() throws Exception {
        List<Vehicle> vehicles = List.of(
                new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L));

        when(vehicleService.getAllVehicle()).thenReturn(vehicles);

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].make").value("Toyota"))
                .andExpect(jsonPath("$[0].model").value("RAV4"))
                .andExpect(jsonPath("$[0].category").value("SUV"))
                .andExpect(jsonPath("$[0].price").value(30000))
                .andExpect(jsonPath("$[0].quantity").value(5));
    }
}
