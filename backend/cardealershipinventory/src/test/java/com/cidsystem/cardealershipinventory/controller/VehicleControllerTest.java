package com.cidsystem.cardealershipinventory.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import org.springframework.http.MediaType;
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

        @Test
        void shouldCreateVehicle() throws Exception {
                Vehicle savedVehicle = new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L);

                when(vehicleService.addVehicle(org.mockito.ArgumentMatchers.any(Vehicle.class)))
                                .thenReturn(savedVehicle);

                mockMvc.perform(post("/api/vehicles")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {
                                                    "make": "Toyota",
                                                    "model": "RAV4",
                                                    "category": "SUV",
                                                    "price": 30000,
                                                    "quantity": 5
                                                }
                                                """))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.make").value("Toyota"))
                                .andExpect(jsonPath("$.model").value("RAV4"))
                                .andExpect(jsonPath("$.category").value("SUV"))
                                .andExpect(jsonPath("$.price").value(30000))
                                .andExpect(jsonPath("$.quantity").value(5));
        }

        @Test
        void shouldUpdateVehicle() throws Exception {
                Vehicle updatedVehicle = new Vehicle(1L, "Honda", "Civic", Category.SEDAN, BigDecimal.valueOf(22000),
                                4L);

                when(vehicleService.updateVehicle(org.mockito.ArgumentMatchers.eq(1L),
                                org.mockito.ArgumentMatchers.any(Vehicle.class))).thenReturn(updatedVehicle);

                mockMvc.perform(put("/api/vehicles/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {
                                                    "make": "Honda",
                                                    "model": "Civic",
                                                    "category": "SEDAN",
                                                    "price": 22000,
                                                    "quantity": 4
                                                }
                                                """))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.make").value("Honda"))
                                .andExpect(jsonPath("$.model").value("Civic"))
                                .andExpect(jsonPath("$.category").value("SEDAN"))
                                .andExpect(jsonPath("$.price").value(22000))
                                .andExpect(jsonPath("$.quantity").value(4));
        }

        @Test
        void shouldSearchVehicles() throws Exception {
                List<Vehicle> vehicles = List.of(
                                new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000), 5L));

                when(vehicleService.searchVehicle(
                                "Toyota",
                                "RAV4",
                                Category.SUV,
                                BigDecimal.valueOf(25000),
                                BigDecimal.valueOf(35000))).thenReturn(vehicles);

                mockMvc.perform(get("/api/vehicles/search")
                                .param("make", "Toyota")
                                .param("model", "RAV4")
                                .param("category", "SUV")
                                .param("minPrice", "25000")
                                .param("maxPrice", "35000"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id").value(1))
                                .andExpect(jsonPath("$[0].make").value("Toyota"))
                                .andExpect(jsonPath("$[0].model").value("RAV4"))
                                .andExpect(jsonPath("$[0].category").value("SUV"))
                                .andExpect(jsonPath("$[0].price").value(30000))
                                .andExpect(jsonPath("$[0].quantity").value(5));
        }

        @Test
        void shouldDeleteVehicle() throws Exception {
                mockMvc.perform(delete("/api/vehicles/1"))
                                .andExpect(status().isNoContent());
        }

        @Test
        void shouldPurchaseVehicle() throws Exception {
                Vehicle purchasedVehicle = new Vehicle(1L, "Toyota", "RAV4", Category.SUV, BigDecimal.valueOf(30000),
                                1L);

                when(vehicleService.purchaseVehicle(1L)).thenReturn(purchasedVehicle);

                mockMvc.perform(post("/api/vehicles/1/purchase"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.make").value("Toyota"))
                                .andExpect(jsonPath("$.model").value("RAV4"))
                                .andExpect(jsonPath("$.category").value("SUV"))
                                .andExpect(jsonPath("$.price").value(30000))
                                .andExpect(jsonPath("$.quantity").value(1));
        }

        @Test
        void shouldRestockVehicle() throws Exception {
                Vehicle restockedVehicle = new Vehicle(1L, "Toyota", "RAV4",
                                Category.SUV,
                                BigDecimal.valueOf(30000),
                                5L);

                when(vehicleService.restockVehicle(1L, 2L))
                                .thenReturn(restockedVehicle);

                mockMvc.perform(post("/api/vehicles/1/restock")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {
                                                  "quantity": 2
                                                }
                                                """))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.make").value("Toyota"))
                                .andExpect(jsonPath("$.model").value("RAV4"))
                                .andExpect(jsonPath("$.category").value("SUV"))
                                .andExpect(jsonPath("$.price").value(30000))
                                .andExpect(jsonPath("$.quantity").value(5));
        }
}
