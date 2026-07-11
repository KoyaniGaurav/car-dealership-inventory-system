package com.cidsystem.cardealershipinventory.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle,Long>{

    @Query("""
            SELECT vehicle FROM Vehicle vehicle
            WHERE (:make IS NULL OR LOWER(vehicle.make) LIKE LOWER(CONCAT('%', :make, '%')))
            AND (:model IS NULL OR LOWER(vehicle.model) LIKE LOWER(CONCAT('%', :model, '%')))
            AND (:category IS NULL OR vehicle.category = :category)
            AND (:minPrice IS NULL OR vehicle.price >= :minPrice)
            AND (:maxPrice IS NULL OR vehicle.price <= :maxPrice)
            """)
    List<Vehicle> searchVehicles(
            @Param("make") String make,
            @Param("model") String model,
            @Param("category") Category category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice);
}
