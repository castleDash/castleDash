package com.teamKninja.services;

import com.teamKninja.entities.Level;
import com.teamKninja.entities.Save;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by holdenhughes on 12/17/15.
 */
public interface LevelRepository extends CrudRepository<Level, Integer> {
    List<Level> findAllByLevelNumber(int levelNumber);
    List<Level> findAllByVersion(Level version);
    Level findOneByVersion(int version);
}
