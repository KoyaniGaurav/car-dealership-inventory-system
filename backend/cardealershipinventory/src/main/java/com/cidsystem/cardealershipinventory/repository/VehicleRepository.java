package com.cidsystem.cardealershipinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cidsystem.cardealershipinventory.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
    
}
