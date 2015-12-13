package com.teamKninja.services;

import com.teamKninja.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by holdenhughes on 12/10/15.
 */
public interface UserRepository extends CrudRepository<User,Integer> {
    User findOneByUsername(String username);

}
