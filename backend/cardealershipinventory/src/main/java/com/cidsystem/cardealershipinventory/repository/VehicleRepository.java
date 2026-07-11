package com.cidsystem.cardealershipinventory.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cidsystem.cardealershipinventory.entity.Category;
import com.cidsystem.cardealershipinventory.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

        @Query("SELECT v FROM Vehicle v WHERE " +
           "(CAST(:make AS string) IS NULL OR LOWER(v.make) LIKE LOWER(CONCAT('%', CAST(:make AS string), '%'))) AND " +
           "(CAST(:model AS string) IS NULL OR LOWER(v.model) LIKE LOWER(CONCAT('%', CAST(:model AS string), '%'))) AND " +
           "(:category IS NULL OR v.category = :category) AND " +
           "(:minPrice IS NULL OR v.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR v.price <= :maxPrice)")
        List<Vehicle> searchVehicles(
                        @Param("make") String make,
                        @Param("model") String model,
                        @Param("category") Category category,
                        @Param("minPrice") BigDecimal minPrice,
                        @Param("maxPrice") BigDecimal maxPrice);
}
