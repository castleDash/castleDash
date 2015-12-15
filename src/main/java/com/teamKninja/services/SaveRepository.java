package com.teamKninja.services;

import com.teamKninja.entities.Save;
import com.teamKninja.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by holdenhughes on 12/10/15.
 */
public interface SaveRepository extends CrudRepository<Save, Integer>{
    List<Save> findAllByUser(User username);
    Save findOneById(int id);
}
